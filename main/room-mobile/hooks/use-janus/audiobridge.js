import { janusWsEndpoint } from "configs";
import { execCmd } from "main/room-mobile/hooks/use-janus/exec-cmd";
import AudioManager from "main/room-mobile/hooks/use-janus/audio-manager";

import apis from "api";

class AudioBridgePlugin {
  constructor({ roomId, ioConnectionId, onReady } = {}) {
    this.roomId = roomId;
    this.ioConnectionId = ioConnectionId;
    this.callback = { onReady };
    this.pc = null;
    this.ws = null;
    this.sessionId = null;
    this.audiobrideHandlerId = null;
    this.keepaliveInterval = null;
    this.audioManager = new AudioManager();
    this.setupPeerConnection();
    this.setupJanusWebsocketConnection();
  }

  setupPeerConnection() {
    const pc = (this.pc = new RTCPeerConnection());

    pc.addEventListener("icecandidate", ({ candidate }) => {
      this.handleLocalIceCandidate(candidate).catch(console.log);
    });

    pc.addEventListener("track", ({ track }) => {
      this.audioManager.setRecvTrack(track);
      playSoundTrack(track);
      console.log("[janus] audio track playing");
    });
  }

  setupJanusWebsocketConnection() {
    const ws = (this.ws = new WebSocket(janusWsEndpoint, "janus-protocol"));

    ws.addEventListener("open", () => {
      this.onJanusWebsocketOpen(ws).catch(console.log);
    });

    ws.addEventListener("message", (e) => {
      this.onJanusWebsocketMessage(e).catch(console.log);
    });

    return ws;
  }

  async onJanusWebsocketOpen() {
    await this.setupSession();
    await this.attachAudioBridgePlugin();
    await this.joinAudioBridgeRoom();
    await this.setupJsepOffer();
    this.setupKeepaliveInterval();
  }

  async setupSession() {
    const { id } = await execCmd(this.ws, { janus: "create" });
    this.sessionId = id;
  }

  async attachAudioBridgePlugin() {
    const { id } = await execCmd(this.ws, {
      session_id: this.sessionId,
      janus: "attach",
      plugin: "janus.plugin.audiobridge",
    });
    this.audiobrideHandlerId = id;
  }

  async joinAudioBridgeRoom() {
    const joinInfo = await apis.getAudioBridgeJoinRoomInfo({
      roomId: this.roomId,
    });

    await execCmd(this.ws, {
      janus: "message",
      session_id: this.sessionId,
      handle_id: this.audiobrideHandlerId,
      body: {
        request: "join",
        room: joinInfo.jnRoomId,
        token: joinInfo.joinToken,
      },
    });
  }

  async setupJsepOffer() {
    this.pc.addTrack(this.audioManager.getSendTrack());
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    await execCmd(this.ws, {
      janus: "message",
      session_id: this.sessionId,
      handle_id: this.audiobrideHandlerId,
      jsep: offer,
      body: {
        request: "configure",
        muted: true,
      },
    });
  }

  async handleLocalIceCandidate(candidate) {
    if (candidate === null) {
      await execCmd(this.ws, {
        janus: "trickle",
        session_id: this.sessionId,
        handle_id: this.audiobrideHandlerId,
        candidate: { completed: true },
      });
      return;
    }

    await execCmd(this.ws, {
      janus: "trickle",
      session_id: this.sessionId,
      handle_id: this.audiobrideHandlerId,
      candidate,
    });
  }

  setupKeepaliveInterval() {
    this.keepaliveInterval = setInterval(() => {
      execCmd(this.ws, {
        janus: "keepalive",
        session_id: this.sessionId,
      }).catch(console.log);
    }, 8000);
  }

  async onJanusWebsocketMessage(e) {
    const { jsep, janus } = JSON.parse(e.data);

    if (jsep) {
      this.handleJsepAnswer(jsep);
      return;
    }

    if (janus === "webrtcup") {
      this.callback.onReady();
      return;
    }
  }

  handleJsepAnswer(answer) {
    this.pc.setRemoteDescription(answer);
  }

  setMicTrackEnable(enable) {
    this.audioManager.setMicTrackEnable(enable);
  }

  async configureMute(muted) {
    await execCmd(this.ws, {
      janus: "message",
      session_id: this.sessionId,
      handle_id: this.audiobrideHandlerId,
      body: {
        request: "configure",
        muted,
      },
    });
  }

  mixTrack(track) {
    this.audioManager.mixTrack(track);
  }

  mixMicTrack(track) {
    this.audioManager.mixMicTrack(track);
  }

  getSendTrack() {
    return this.audioManager.getSendTrack();
  }

  getRecvTrack() {
    return this.audioManager.getRecvTrack();
  }

  close() {
    this.pc?.close();
    this.ws?.close();
    this.audioManager.close();

    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
    }
  }
}

function playSoundTrack(track) {
  if (typeof document !== undefined) {
    const tag = document.createElement("audio");
    tag.srcObject = new MediaStream([track]);
    tag.play();
  }
}

export default AudioBridgePlugin;
