import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

import { useMediasoupTrack } from "main/room/hooks";

function RemoteScreenShare({ top, left, width, height }) {
  const info = useSelector(({ screensharing }) => screensharing.consumerInfo);
  const displayName = useSelector((state) => state.screensharing.displayName);
  const track = useMediasoupTrack(info);

  if (track) {
    return (
      <WithTrack
        top={top}
        left={left}
        width={width}
        height={height}
        track={track}
        displayName={displayName}
      />
    );
  }

  return (
    <WithoutTrack
      top={top}
      left={left}
      width={width}
      height={height}
      displayName={displayName}
    />
  );
}

function WithTrack({ top, left, width, height, track, displayName }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#492D10] group rounded hover:border-2 hover:border-white hover:border-solid flex items-center justify-center">
        <video
          ref={ref}
          autoPlay
          playsInline
          className="w-full h-full rounded"
        />
        <div className="absolute bottom-0 left-0 bg-black/[.4] rounded-tr-lg p-1 inline-flex w-full">
          <span className="text-white">{displayName}</span>
        </div>
      </div>
    </div>
  );
}

function WithoutTrack({ top, left, width, height, displayName }) {
  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#492D10] group rounded hover:border-2 hover:border-white hover:border-solid flex items-center justify-center">
        <Avatar size={50} style={{ backgroundColor: "#F89E3F" }}>
          Y
        </Avatar>
        <div className="absolute bottom-0 left-0 bg-black/[.4] rounded-tr-lg p-1">
          <span className="text-white">{displayName}</span>
        </div>
      </div>
    </div>
  );
}

export default RemoteScreenShare;
