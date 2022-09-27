import { Device } from "mediasoup-client";
import apis from "api";

class Mediasoup {
  constructor({ roomId, ioConnectionId }) {
    if (roomId === "" || ioConnectionId === "") {
      throw new Error("roomId or ioConnectionId can not empty!");
    }

    this.roomId = roomId;
    this.ioConnectionId = ioConnectionId;
    this.device = null;
    this.sendTransport = null;
    this.recvTransport = null;
  }

  async setup() {
    await this.setupDevice();
    await this.setupSendTransport();
    await this.setupRecvTransport();
  }

  async setupDevice() {
    this.device = new Device();

    const capabilities = await apis.getRoomRouterCapabilities({
      roomId: this.roomId,
      ioConnectionId: this.ioConnectionId,
    });
    await this.device.load({ routerRtpCapabilities: capabilities });
    await apis.setDeviceCapabilities({
      roomId: this.roomId,
      ioConnectionId: this.ioConnectionId,
      rtpCapabilities: this.device.rtpCapabilities,
    });
  }

  async setupSendTransport() {
    const sendTransportInfo = await apis.createMediasoupProduceTransport({
      roomId: this.roomId,
      ioConnectionId: this.ioConnectionId,
    });

    const send = this.device.createSendTransport(sendTransportInfo);

    send.on("connect", ({ dtlsParameters }, callback, errback) => {
      apis
        .connectMediasoupProduceTransport({
          roomId: this.roomId,
          ioConnectionId: this.ioConnectionId,
          dtlsParameters,
        })
        .then(callback)
        .catch(errback);
    });

    send.on(
      "produce",
      ({ kind, rtpParameters, appData }, callback, errback) => {
        if (appData.source === "user-media") {
          apis
            .connectionTurnOncam({
              roomId: this.roomId,
              ioConnectionId: this.ioConnectionId,
              kind,
              rtpParameters,
            })
            .then((id) => {
              callback({ id });
            })
            .catch(errback);
          return;
        }

        if (appData.source === "display-media") {
          apis
            .connectionStartShareScreen({
              roomId: this.roomId,
              ioConnectionId: this.ioConnectionId,
              kind,
              rtpParameters,
            })
            .then((id) => {
              callback({ id });
            })
            .catch(errback);
          return;
        }

        console.warn("invalid source:", appData.source);
      }
    );

    this.sendTransport = send;
  }

  async setupRecvTransport() {
    const recvTransportInfo = await apis.createMediasoupConsumeTransport({
      roomId: this.roomId,
      ioConnectionId: this.ioConnectionId,
    });

    const recv = this.device.createRecvTransport(recvTransportInfo);

    recv.on("connect", ({ dtlsParameters }, callback, errback) => {
      apis
        .connectMediasoupConsumeTransport({
          roomId: this.roomId,
          ioConnectionId: this.ioConnectionId,
          dtlsParameters,
        })
        .then(callback)
        .catch(errback);
    });

    this.recvTransport = recv;
  }

  async produce({ track, source, encodings }) {
    return await this.sendTransport.produce({
      track,
      encodings,
      appData: { source },
    });
  }

  async createConsumer(consumerInfo) {
    const consumer = await this.recvTransport.consume(consumerInfo);
    return consumer;
  }

  close() {
    this.sendTransport?.close();
    this.recvTransport?.close();
  }
}

export default Mediasoup;
