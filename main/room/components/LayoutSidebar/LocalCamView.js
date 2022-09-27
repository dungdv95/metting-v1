import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import SpotlightDisplayName from "main/room/components/LayoutSidebar/SpotlightDisplayName";

function LocalCamView({ top, left, width, height, track }) {
  if (track) {
    return (
      <WithTrack
        top={top}
        left={left}
        width={width}
        height={height}
        track={track}
      />
    );
  }

  return <WithoutTrack top={top} left={left} width={width} height={height} />;
}

function WithTrack({ top, left, width, height, track }) {
  const ref = useRef();
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);

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
        className="rounded bg-[#4A2F12]"
        style={{ width: "100%", height: "100%" }}
      />
      <SpotlightDisplayName
        displayName="Bạn"
        micEnable={micEnable}
        ownerId={ioConnectionId}
      />
    </div>
  );
}

function WithoutTrack({ top, left, width, height }) {
  const displayName = useSelector(({ user }) => user.displayName);
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#4A2F12] flex items-center justify-center rounded">
        <Avatar size={45} style={{ backgroundColor: "#F69C3B" }}>
          {displayName.charAt(0)}
        </Avatar>
      </div>
      <SpotlightDisplayName
        displayName={`(Bạn) ${displayName}`}
        micEnable={micEnable}
        ownerId={ioConnectionId}
      />
    </div>
  );
}

export default LocalCamView;
