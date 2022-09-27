import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import SpotlightDisplayName from "main/room/components/LayoutSidebar/SpotlightDisplayName";

function SpotlightLocalScreenShare({
  top,
  left,
  width,
  height,
  localshareStream,
}) {
  if (localshareStream) {
    return (
      <WithStream
        top={top}
        left={left}
        width={width}
        height={height}
        stream={localshareStream}
      />
    );
  }

  return <WithoutStream top={top} left={left} width={width} height={height} />;
}

function WithStream({ top, left, width, height, stream }) {
  const ref = useRef();
  const micEnable = useSelector(({ device }) => device.mic.enable);

  useEffect(() => {
    ref.current.srcObject = new MediaStream(stream.getVideoTracks());
  }, [stream]);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <video ref={ref} autoPlay playsInline className="w-full h-full rounded" />
      <SpotlightDisplayName
        micEnable={micEnable}
        displayName="Bạn - đang chia sẻ"
      />
    </div>
  );
}

function WithoutStream({ top, left, width, height }) {
  const micEnable = useSelector(({ device }) => device.mic.enable);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#4A2F12] flex items-center justify-center rounded">
        <Avatar size={60} style={{ backgroundColor: "#F69C3B" }}>
          Y
        </Avatar>
      </div>
      <SpotlightDisplayName
        micEnable={micEnable}
        displayName="Bạn - đang chia sẻ"
      />
    </div>
  );
}

export default SpotlightLocalScreenShare;
