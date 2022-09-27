import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MicStatusIcon from "../MicStatusIcon";

function SpotlightLocalCam({ track }) {
  const micEnable = useSelector(({ device }) => device.mic.enable);

  if (track) {
    return <SpotlightLocalCamWithTrack track={track} micEnable={micEnable} />;
  }

  return <SpotlightLocalCamWithoutTrack micEnable={micEnable} />;
}

function SpotlightLocalCamWithTrack({ track, micEnable }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className="spotlight-screen-center">
      <video
        id="cam-video"
        ref={ref}
        autoPlay
        playsInline
        className="w-full rounded"
      />
      <div className="tag-name">
        <div className="tag-name-left">
          <MicStatusIcon enable={micEnable} size={20} />
        </div>
        <div className="tag-name-right">
          <div className="tag-right-top">
            <h3 className="mb-0">Bạn</h3>
          </div>
          <div className="tag-right-bottom">
            <div className="tag-box-1" />
            <div className="tag-box-2" />
            <div className="tag-box-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightLocalCamWithoutTrack({ micEnable }) {
  return (
    <div className="spotlight-screen-center">
      <img src="/svgs/bgmeeting.svg" alt="" className="rounded-lg" />
      <div className="tag-name">
        <div className="tag-name-left">
          <MicStatusIcon enable={micEnable} size={20} />
        </div>
        <div className="tag-name-right">
          <div className="tag-right-top">
            <h3 className="mb-0">Bạn</h3>
          </div>
          <div className="tag-right-bottom">
            <div className="tag-box-1" />
            <div className="tag-box-2" />
            <div className="tag-box-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotlightLocalCam;
