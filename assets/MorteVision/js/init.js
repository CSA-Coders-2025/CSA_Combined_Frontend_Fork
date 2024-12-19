let unsetHost = "https://spring2025.nighthawkcodingsociety.com"
const isDebug = false
let webSocketServer = "ws://spring2025.nighthawkcodingsociety.com/socket"
if (isDebug) {
    // unsetHost = "http://localhost:8085"
    unsetHost = "https://spring2025.nighthawkcodingsociety.com"
}
let rtcServer = unsetHost
console.log(rtcServer)
const servers = {
    iceServers:[
      {
        urls:
      [
      "stun:stun.l.google.com:19302",
      /*"stun:stun.l.google.com:5349",
      "stun:stun1.l.google.com:3478",
      "stun:stun1.l.google.com:5349",
      "stun:stun2.l.google.com:19302",
      "stun:stun2.l.google.com:5349",
      "stun:stun3.l.google.com:3478",
      "stun:stun3.l.google.com:5349",
      "stun:stun4.l.google.com:19302",
      "stun:stun4.l.google.com:5349"*/],
      },
    ],
    iceCandidatePoolSize:10,
  }


const signalingServer = new WebSocket(webSocketServer)