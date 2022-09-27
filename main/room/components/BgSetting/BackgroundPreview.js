import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import FileInput from "main/room/components/BgSetting/FileInput";
import Loading from "main/room/components/BgSetting/Loading";
import media from "main/room/media";
import { useBackgroundTransformer } from "main/room/hooks";

function BackgroundPreview() {
  return (
    <div className="meet-background">
      <CamSection />
      <Loading />
      <FileInput />
    </div>
  );
}

function CamSection() {
  const mode = useSelector(({ device }) => device.bgSetting.current);

  if (mode === "off") {
    return <BackgroundModeOff />;
  }

  return <BackgroundModeOn />;
}

function BackgroundModeOff() {
  const ref = useRef();
  const deviceId = useSelector(({ device }) => device.cam.current);

  useEffect(() => {
    let s;

    media
      .getCamStream({ deviceId })
      .then((stream) => {
        s = stream;
        ref.current.srcObject = stream;
      })
      .catch(console.log);

    return () => {
      if (s) {
        s.getTracks().forEach((t) => t.stop());
      }
    };
  }, [deviceId]);

  return (
    <video
      id="cam-video"
      autoPlay
      playsInline
      ref={ref}
      className="meet-video"
    />
  );
}

function BackgroundModeOn() {
  const ref = useRef();
  const transformer = useBackgroundTransformer();
  const deviceId = useSelector(({ device }) => device.cam.current);
  const bg = useSelector(({ device }) => device.bgSetting.current);

  useEffect(() => {
    let ignore = false;
    let tempTrack;

    media
      .getCamStream({ deviceId, width: 480, height: 320, frameRate: 15 })
      .then((stream) => {
        if (ignore) {
          return;
        }

        tempTrack = stream.getVideoTracks()[0];
        const transformedTrack = transformer.transform(tempTrack);
        ref.current.srcObject = new MediaStream([transformedTrack]);
      })
      .catch(console.log);

    return () => {
      ignore = true;
      if (tempTrack) {
        tempTrack.stop();
      }
    };
  }, [deviceId, transformer]);

  useEffect(() => {
    transformer.configure({ bg });
  }, [bg, transformer]);

  return (
    <video
      id="cam-video"
      autoPlay
      playsInline
      ref={ref}
      className="meet-video"
    />
  );
}

export default BackgroundPreview;
