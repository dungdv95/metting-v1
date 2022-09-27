class AudioManager {
  constructor() {
    this.audioCtx = new AudioContext();
    this.destNode = this.audioCtx.createMediaStreamDestination();
    this.micTrack = null;
    this.recvTrack = null;
  }

  setRecvTrack(track) {
    this.recvTrack = track;
  }

  getRecvTrack() {
    return this.recvTrack;
  }

  getSendTrack() {
    return this.destNode.stream.getAudioTracks()[0];
  }

  setMicTrackEnable(enabled) {
    if (this.micTrack) {
      this.micTrack.enabled = enabled;
    }
  }

  mixMicTrack(track) {
    this.micTrack = track;
    this.mixTrack(track);
  }

  mixTrack(track) {
    this.audioCtx
      .createMediaStreamSource(new MediaStream([track]))
      .connect(this.destNode);
  }

  close() {
    this.audioCtx.close();
    this.destNode.stream.getTracks().forEach((t) => t.stop());
    this.micTrack?.stop();
    this.recvTrack?.stop();
  }
}

export default AudioManager;
