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

  const transformer = useMemo(
    () => createBackgroundTransformer(track),
    [track]
  );

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

function createBackgroundTransformer(track) {
  if (!track) {
    return nullBackgroundTransformer;
  }

  const processor = new MediaStreamTrackProcessor({ track });
  const generator = new MediaStreamTrackGenerator({ kind: "video" });

  const segmentCanvas = new OffscreenCanvas(1, 1);
  const segmentCtx = segmentCanvas.getContext("2d");
  const image = new Image();
  image.src = "/images/background-14.jpg";

  const selfieSegmentation = new SelfieSegmentation({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    },
  });

  selfieSegmentation.setOptions({ modelSelection: 1 });

  track.addEventListener("ended", () => {
    selfieSegmentation.close();
  });

  processor.readable
    .pipeThrough(new TransformStream({ transform }))
    .pipeTo(generator.writable)
    .catch(console.log);

  async function transform(frame, controller) {
    const height = frame.codedHeight;
    const width = frame.codedWidth;

    segmentCanvas.height = height;
    segmentCanvas.width = width;

    segmentCtx.drawImage(frame, 0, 0, width, height);

    selfieSegmentation.onResults(async (results) => {
      segmentCtx.globalCompositeOperation = "copy";
      segmentCtx.drawImage(results.segmentationMask, 0, 0, width, height);
      segmentCtx.globalCompositeOperation = "source-out";
      segmentCtx.drawImage(image, 0, 0, width, height);
      segmentCtx.globalCompositeOperation = "destination-atop";
      segmentCtx.drawImage(results.image, 0, 0, width, height);

      controller.enqueue(
        new VideoFrame(segmentCanvas, { timestamp: frame.timestamp })
      );

      frame.close();
    });

    await selfieSegmentation.send({ image: segmentCanvas });
  }

  return {
    getTrackWithBackground() {
      return generator;
    },
    changeBackground(bg) {
      //
    },
  };
}

const nullBackgroundTransformer = {
  getTrackWithBackground() {
    return null;
  },
  changeBackground(bg) {},
};

export default App;
