import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import { Avatar } from "antd";

import { useMediasoupTrack, useShowViewInfo } from "main/room/hooks";
import SpotlightDisplayName from "main/room/components/LayoutSidebar/SpotlightDisplayName";

function SpotlightRemoteScreenShare({ top, left, width, height }) {
  const info = useSelector(({ screensharing }) => screensharing.consumerInfo);
  const track = useMediasoupTrack(info);

  if (track) {
    return (
      <WithTrack
        top={top}
        left={left}
        width={width}
        height={height}
        track={track}
        consumerId={info.id}
      />
    );
  }

  return <WithoutTrack top={top} left={left} width={width} height={height} />;
}

function WithoutTrack({ top, left, width, height }) {
  const displayName = useSelector((state) => state.screensharing.displayName);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#4A2F12] flex items-center justify-center rounded">
        <Avatar size={60} style={{ backgroundColor: "#F69C3B" }}>
          Y
        </Avatar>
      </div>
      <SpotlightDisplayName displayName={`${displayName} - đang chia sẻ`} />
    </div>
  );
}

function WithTrack({ top, left, width, height, track, consumerId }) {
  const ref = useRef();
  const displayName = useSelector((state) => state.screensharing.displayName);

  const showViewInfo = useShowViewInfo({
    displayName,
    consumerId,
    resolution: {
      width: () => ref.current.videoWidth,
      height: () => ref.current.videoHeight,
    },
  });

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <video ref={ref} autoPlay playsInline className="w-full h-full rounded" />
      <SpotlightDisplayName displayName={`${displayName} - đang chia sẻ`} />
      <div onClick={showViewInfo}>
        <div className="absolute top-0 right-0 cursor-pointer m-2">
          <FaInfoCircle color="white" />
        </div>
      </div>
    </div>
  );
}

export default SpotlightRemoteScreenShare;
