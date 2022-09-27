import { useEffect, useMemo, useRef, useState } from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { Spin } from "antd";
import media from "main/room/media";

function App() {
  const track = useLocalCamTrack();

  if (track) {
    return <WithTrack track={track} />;
  }

  return <Loading />;
}

function WithTrack({ track }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className="App">
      <video id="cam-video" autoPlay playsInline ref={ref} />
    </div>
  );
}

function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spin size={30} />
    </div>
  );
}

function useLocalCamTrack() {
  const [track, setTrack] = useState(null);

  const transformer = useMemo(() => new BackgroundTranformer(track), [track]);

  useEffect(() => {
    transformer.changeBackground("/images/background-13.jpg");
  }, [transformer]);

  useEffect(() => {
    let tempStream;

    media
      .getCamStream({ frameRate: 15 })
      .then((stream) => {
        tempStream = stream;
        setTrack(stream.getVideoTracks()[0]);
      })
      .catch(console.log);

    return () => {
      tempStream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return transformer.getTrackWithBackground();
}

class BackgroundTranformer {
  constructor(track) {
    if (track) {
      this.mode = "off"; // "off" | "blur" | "[image]"
      this.track = track;
      this.image = this.createImage();
      this.canvas = this.createCanvasElement();
      this.selfieSegmentation = this.createSelfSegmentation();
      this.videoElement = this.createVideoElement(track);

      track.addEventListener("ended", () => {
        this.selfieSegmentation.close();
      });
    }
  }

  createImage() {
    return new Image();
  }

  createCanvasElement() {
    return document.createElement("canvas");
  }

  createSelfSegmentation() {
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });

    selfieSegmentation.setOptions({ modelSelection: 1 });

    return selfieSegmentation;
  }

  createVideoElement(track) {
    const { width, height } = track.getSettings();
    const videoElement = document.createElement("video");
    videoElement.width = width;
    videoElement.height = height;
    videoElement.srcObject = new MediaStream([track]);
    videoElement.play();

    videoElement.onplaying = async () => {
      let lastTime = new Date();

      const getFrames = async () => {
        const now = videoElement.currentTime;
        if (now > lastTime) {
          await this.segment();
        }
        lastTime = now;
        requestAnimationFrame(getFrames);
      };

      await getFrames();
    };

    return videoElement;
  }

  getTrackWithBackground() {
    if (this.track) {
      return this.canvas.captureStream(30).getVideoTracks()[0];
    }
    return null;
  }

  changeBackground(mode) {
    this.mode = mode;
    if (this.image) {
      this.image.src = mode;
    }
  }

  async segment() {
    const width = this.videoElement.width;
    const height = this.videoElement.height;

    this.canvas.width = width;
    this.canvas.height = height;

    this.selfieSegmentation.onResults((results) => {
      const ctx = this.canvas.getContext("2d");

      if (this.mode === "blur") {
        this.blur(ctx, results, width, height);
        return;
      }

      if (this.mode === "off") {
        this.off(ctx, results, width, height);
        return;
      }

      this.background(ctx, results, width, height);
    });

    await this.selfieSegmentation.send({ image: this.videoElement });
  }

  blur(ctx, results, width, height) {
    ctx.globalCompositeOperation = "copy";
    ctx.filter = `blur(10px)`;
    ctx.drawImage(results.segmentationMask, 0, 0, width, height);
    ctx.globalCompositeOperation = "source-in";
    ctx.filter = "none";
    ctx.drawImage(results.image, 0, 0, width, height);
    ctx.globalCompositeOperation = "destination-over";
    ctx.filter = `blur(10px)`;
    ctx.drawImage(results.image, 0, 0, width, height);
  }

  off(ctx, results, width, height) {
    ctx.drawImage(results.image, 0, 0, width, height);
  }

  background(ctx, results, width, height) {
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(results.segmentationMask, 0, 0, width, height);
    ctx.globalCompositeOperation = "source-out";
    ctx.drawImage(this.image, 0, 0, width, height);
    ctx.globalCompositeOperation = "destination-atop";
    ctx.drawImage(results.image, 0, 0, width, height);
  }
}

export default App;
