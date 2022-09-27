import { janusWsEndpoint } from "configs";
import apis from "api";
import { execCmd } from "main/room-mobile/hooks/use-janus/exec-cmd";

class TextRoomPlugin {
  constructor({ roomId, ioConnectionId, onReady, onReceiveMessage } = {}) {
    this.roomId = roomId;
    this.ioConnectionId = ioConnectionId;
    this.textroomId = null;
    this.pc = null;
    this.ws = null;
    this.dc = null;
    this.sessionId = null;
    this.textroomHandlerId = null;
    this.keepaliveInterval = null;
    this.callback = { onReady, onReceiveMessage };

    this.setupPeerConnection();
    this.setupJanusWebsocketConnection();
  }

  setupPeerConnection() {
    const pc = (this.pc = new RTCPeerConnection({}));

    pc.addEventListener("icecandidate", ({ candidate }) => {
      this.handleLocalIceCandidate(candidate).catch(console.log);
    });

    const dc = (this.dc = pc.createDataChannel("JanusDataChannel"));

    dc.addEventListener("message", (e) => {
      this.onReceiveDataChannelMessage(e).catch(console.log);
    });

    dc.addEventListener("open", () => {
      this.onDataChannelOpen().catch(console.log);
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
    await this.attachTextRoomPlugin();
    await this.setupTextRoom();
    this.setupKeepaliveInterval();
  }

  async setupSession() {
    const { id } = await execCmd(this.ws, { janus: "create" });
    this.sessionId = id;
  }

  async attachTextRoomPlugin() {
    const { id } = await execCmd(this.ws, {
      session_id: this.sessionId,
      janus: "attach",
      plugin: "janus.plugin.textroom",
    });
    this.textroomHandlerId = id;
  }

  async setupTextRoom() {
    await execCmd(this.ws, {
      janus: "message",
      session_id: this.sessionId,
      handle_id: this.textroomHandlerId,
      body: {
        request: "setup",
      },
    });
  }

  async handleLocalIceCandidate(candidate) {
    if (candidate === null) {
      await execCmd(this.ws, {
        janus: "trickle",
        session_id: this.sessionId,
        handle_id: this.textroomHandlerId,
        candidate: { completed: true },
      });
      return;
    }

    await execCmd(this.ws, {
      janus: "trickle",
      session_id: this.sessionId,
      handle_id: this.textroomHandlerId,
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
      await this.handleJsepOffer(jsep);
      return;
    }

    if (janus === "webrtcup") {
      this.callback.onReady();
      return;
    }
  }

  async onDataChannelOpen() {
    const joinInfo = await apis.getTextRoomJoinInfo({ roomId: this.roomId });

    this.textroomId = joinInfo.roomId;

    await execCmd(this.dc, {
      textroom: "join",
      room: joinInfo.roomId,
      username: this.ioConnectionId,
      history: true,
    });
  }

  async onReceiveDataChannelMessage(e) {
    const msg = JSON.parse(e.data);

    if (msg.textroom === "message") {
      const data = JSON.parse(msg.text);

      this.callback.onReceiveMessage({
        displayName: data.displayName,
        date: msg.date,
        from: msg.from,
        whisper: msg.whisper,
        ...data,
      });
    }
  }

  async handleJsepOffer(offer) {
    await this.pc.setRemoteDescription(offer);

    const answer = await this.pc.createAnswer();

    await execCmd(this.ws, {
      janus: "message",
      session_id: this.sessionId,
      handle_id: this.textroomHandlerId,
      jsep: answer,
      body: {
        request: "ack",
      },
    });

    await this.pc.setLocalDescription(answer);
  }

  async sendMessage({ to, senderDisplayName, content, avatarUrl, id }) {
    await execCmd(this.dc, {
      textroom: "message",
      room: this.textroomId,
      to,
      text: JSON.stringify({
        displayName: senderDisplayName,
        content,
        avatarUrl,
        id,
      }),
    });
  }

  close() {
    this.pc?.close();
    this.ws?.close();
    this.dc?.close();

    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
    }
  }
}

export default TextRoomPlugin;
