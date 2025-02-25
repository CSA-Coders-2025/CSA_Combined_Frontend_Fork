let javaURI
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    javaURI = "ws://localhost:8085/websocket";
} else {
    javaURI = "wss://spring2025.nighthawkcodingsociety.com/websocket";
}

const servers = {
    iceServers: [
        {
            urls:
                [
                    "stun:stun.l.google.com:19302",
                    "stun:stun.l.google.com:5349",
                    "stun:stun1.l.google.com:3478",
                    "stun:stun1.l.google.com:5349",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun2.l.google.com:5349",
                    "stun:stun3.l.google.com:3478",
                    "stun:stun3.l.google.com:5349",
                    "stun:stun4.l.google.com:19302",
                    "stun:stun4.l.google.com:5349"],
        },
    ],
    iceCandidatePoolSize: 10,
}

const socket = new WebSocket(javaURI);
let videoStreamGlobal
let globalPeer //fun trick here, because you can't watch and stream at the same time
//it's actually okay to make this work both for viewer and broadcaster
//is that clean no but neither was the 24th

socket.onmessage = async function (event) {
    const messageData = JSON.parse(event.data);
    switch (messageData["context"]) {
        case "viewerOfferServer": //streamer recieves this
            viewerOfferServer(messageData)
        break;

        case "viewerAcceptServer": //viewer recieves this
            viewerAcceptServer(messageData)
        break;

        case "iceToStreamerServer":
            globalPeer.addIceCandidate(new RTCIceCandidate(JSON.parse(messageData["candidate"])))
        break;

        case "iceToViewerServer":
            globalPeer.addIceCandidate(new RTCIceCandidate(JSON.parse(messageData["candidate"])))
        break;
    }
};

function sendMessage(message) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error("WebSocket connection is not open.");
    }
}

//broadcaster related////////////////////////////////

async function viewerOfferServer(messageData)
{
    const peer = new RTCPeerConnection(servers);
    globalPeer = peer
    let remotedesc = new RTCSessionDescription()
    remotedesc.sdp = messageData["sdp"]
    remotedesc.type = "offer"
    peer.onicecandidate = (e) => sendMessage({context:"iceToViewerClient", candidate: JSON.stringify(e.candidate.toJSON())})
    peer.setRemoteDescription(remotedesc)
    videoStreamGlobal.getTracks().forEach(track => peer.addTrack(track, videoStreamGlobal));
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    let payload =
    {
        context: "viewerAcceptClient",
        sdp: answer.sdp,
        returnID: messageData["returnID"]
    }
    // peer.onnegotiationneeded = (e) => {
    //     videoStreamGlobal.getTracks().forEach(track => peer.addTrack(track, videoStreamGlobal));
    // }
    sendMessage(payload)
}

async function captureScreen() {
    let mediaStream = null;
    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: "always"
            },
            audio: false
        }); //get user video and audio as a media stream
        document.getElementById("streamOffline").style.display = "none"
        document.getElementById("mortStream").style.display = "block"
        document.getElementById("mortStream").srcObject = mediaStream
        if (document.getElementById("endBroadcastButton").style.display == "none") {
            document.getElementById("endBroadcastButton").style.display = "flex"
            document.getElementById("broadcastButton").style.display = "none"
        }
        return mediaStream;
    } catch (ex) {
        console.log("Error occurred", ex);
        document.getElementById("endBroadcastButton").style.display = "none"
    }
}

async function broadcast() {
    const stream = await captureScreen();
    videoStreamGlobal = stream
    document.getElementById("mortStream").srcObject = stream;
    sendMessage({ context: "broadcastRequest" })
}

//viewer related////////////////////

function viewerAcceptServer(messageData)
{
    let remotedesc = new RTCSessionDescription()
    remotedesc.sdp = messageData["sdp"]
    remotedesc.type = "answer"
    globalPeer.setRemoteDescription(remotedesc)
    globalPeer.ontrack = (g) => {
        document.getElementById("mortStream").srcObject = g.streams[0]
        document.getElementById("mortStream").style.display = "block"
        document.getElementById("streamOffline").style.display = "none"
    }
}

async function watch() {
    const peer = new RTCPeerConnection(servers)
    peer.addTransceiver("video", { direction: "recvonly" });
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    peer.onicecandidate = (e) => sendMessage({ context: "iceToStreamerClient", candidate: JSON.stringify(e.candidate.toJSON())})
    globalPeer = peer
    let payload =
    {
        context: "viewerOfferClient",
        sdp: offer.sdp
    }
    sendMessage(payload)
}


//nobody cares related/////
socket.onerror = function (error) {
    console.error("WebSocket error: ", error);
};

socket.onclose = function (event) {
    console.log("WebSocket connection closed:", event);
};

socket.onopen = function (event) {
    console.log("WebSocket connection established.");
};