let globalPeer

async function consumerInit() {
    const peer = await consumerCreatePeer()
    peer.addTransceiver("video", { direction: "recvonly" })
    peer.addTransceiver("audio", { direction: "recvonly" })
    globalPeer = peer
}

async function consumerCreatePeer() {
    const peer = new RTCPeerConnection(servers)
    peer.ontrack = ({streams}) => {
                document.getElementById("mortStream").srcObject = streams[0]
                document.getElementById("mortStream").style.display = "block"
                document.getElementById("streamOffline").style.display = "none"
            }
    peer.onnegotiationneeded = () => consumeNegotiation(peer)
    return peer
}

async function consumeNegotiation(peer) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
        sdp: peer.localDescription
    }
    fetch(rtcServer+"/webrtc/consume",
        {
            method:"POST",
            body:JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
              },
        }).then(response => {
            if(response.ok)
            {
                console.log(response)
                return response.json()
            }
            console.log(response)
            throw new Error("consume endpoint failure");
        }).then(data =>{
            console.log(data)
            const desc = new RTCSessionDescription(data);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })
}

async function consumerTrackHandler(e) {
    console.log("test")
    document.getElementById("streamOffline").style.display = "none"
    document.getElementById("mortStream").style.display = "block"
    document.getElementById("mortStream").srcObject = e.streams[0]
}