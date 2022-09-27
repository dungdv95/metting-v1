import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MicStatusIcon from "main/room/components/MicStatusIcon";

function LocalView({ track }) {
  const micEnable = useSelector(({ device }) => device.mic.enable);

  if (track) {
    return <WithTrack track={track} micEnable={micEnable} />;
  }

  return <WithoutTrack micEnable={micEnable} />;
}

function WithoutTrack({ micEnable }) {
  return (
    <div className="card-user">
      <div className="card-item-default">
        <div className="card-item-avatar-name">
          <span>Y</span>
        </div>
      </div>
      <div className="card-mic">
        <MicStatusIcon enable={micEnable} />
        <span>Bạn</span>
      </div>
    </div>
  );
}

function WithTrack({ track, micEnable }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className="card-user w-100">
      <video
        id="cam-video"
        ref={ref}
        autoPlay
        playsInline
        className="rounded bg-[#4A2F12]"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="card-mic">
        <MicStatusIcon enable={micEnable} />
        <span>Bạn</span>
      </div>
    </div>
  );
}

export default LocalView;
