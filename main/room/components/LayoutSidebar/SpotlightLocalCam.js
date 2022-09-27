import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import SpotlightDisplayName from "main/room/components/LayoutSidebar/SpotlightDisplayName";

function SpotlightLocalCam({ top, left, width, height, localcamTrack }) {
  if (localcamTrack) {
    return (
      <WithTrack
        top={top}
        left={left}
        width={width}
        height={height}
        track={localcamTrack}
      />
    );
  }

  return (
    <WithoutTrack
      top={top}
      left={left}
      width={width}
      height={height}
      track={localcamTrack}
    />
  );
}

function WithTrack({ top, left, width, height, track }) {
  const ref = useRef();
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const displayName = useSelector(({ user }) => user.displayName);

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <video
        id="cam-video"
        ref={ref}
        autoPlay
        playsInline
        className="w-full h-full rounded"
      />
      <SpotlightDisplayName
        micEnable={micEnable}
        displayName={`(Bạn) ${displayName}`}
      />
    </div>
  );
}

function WithoutTrack({ top, left, width, height }) {
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const displayName = useSelector(({ user }) => user.displayName);

  return (
    <div className="absolute rounded" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#4A2F12] flex items-center justify-center rounded">
        <Avatar size={60} style={{ backgroundColor: "#F69C3B" }}>
          {displayName.charAt(0)}
        </Avatar>
      </div>
      <SpotlightDisplayName
        micEnable={micEnable}
        displayName={`(Bạn) ${displayName}`}
      />
    </div>
  );
}

export default SpotlightLocalCam;
