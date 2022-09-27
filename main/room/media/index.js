function getCamStream({
  deviceId,
  width = 1280,
  height = 720,
  frameRate = 20,
} = {}) {
  return navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: deviceId ? { exact: deviceId } : undefined,
      width,
      height,
      frameRate,
      aspectRatio: 16 / 9,
    },
  });
}

function getMicStream(deviceId) {
  return navigator.mediaDevices.getUserMedia({
    video: false,
    audio: deviceId ? { deviceId } : true,
  });
}

async function getShareStream() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: {
      autoGainControl: false,
      echoCancellation: false,
      noiseSuppression: false,
    },
  });
  return stream;
}

function getDevices() {
  return navigator.mediaDevices.enumerateDevices();
}

function getCurrentTabVideoStream() {
  return navigator.mediaDevices.getDisplayMedia({
    video: {
      frameRate: 15,
      width: 1920,
      height: 1080,
    },
    audio: false,
    preferCurrentTab: true,
  });
}

function playSoundTrack(track) {
  if (typeof document !== undefined) {
    const tag = document.createElement("audio");
    tag.srcObject = new MediaStream([track]);
    tag.play();
  }
}

export default Object.freeze({
  getCamStream,
  getMicStream,
  getShareStream,
  getDevices,
  getCurrentTabVideoStream,
  playSoundTrack,
});
