import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MicStatusIcon from "main/room/components/MicStatusIcon";

function SpotlightLocalShare({ stream }) {
  const micEnable = useSelector(({ device }) => device.mic.enable);

  if (stream) {
    return (
      <SpotlightLocalShareWithStream stream={stream} micEnable={micEnable} />
    );
  }

  return <SpotlightLocalShareWithoutStream micEnable={micEnable} />;
}

function SpotlightLocalShareWithStream({ stream, micEnable }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream(stream.getVideoTracks());
  }, [stream]);

  return (
    <div className="spotlight-screen-center">
      <video ref={ref} autoPlay playsInline className="w-full rounded" />

      <div className="tag-name">
        <div className="tag-name-left">
          <MicStatusIcon enable={micEnable} size={20} />
        </div>
        <div className="tag-name-right">
          <div className="tag-right-top">
            <h3 className="mb-0">Bạn đang chia sẻ</h3>
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

function SpotlightLocalShareWithoutStream({ micEnable }) {
  return (
    <div className="spotlight-screen-center">
      <img src="/svgs/bgmeeting.svg" alt="" />
      <div className="tag-name">
        <div className="tag-name-left">
          <MicStatusIcon enable={micEnable} size={20} />
        </div>
        <div className="tag-name-right">
          <div className="tag-right-top">
            <h3 className="mb-0">Bạn đang chia sẻ</h3>
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

export default SpotlightLocalShare;
