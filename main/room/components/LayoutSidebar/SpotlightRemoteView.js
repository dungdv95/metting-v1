import { useRef, useEffect } from "react";
import { useMediasoupTrack, useShowViewInfo } from "main/room/hooks";
import { useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import { Avatar } from "antd";
import SpotlightDisplayName from "main/room/components/LayoutSidebar/SpotlightDisplayName";

function SpotlightRemoteView({ top, left, width, height }) {
  const consumerInfo = useSelector(({ spotlight }) => spotlight.consumerInfo);
  const track = useMediasoupTrack(consumerInfo);

  if (consumerInfo && track) {
    return (
      <SpotlightWithTrack
        top={top}
        left={left}
        width={width}
        height={height}
        consumerId={consumerInfo.id}
        track={track}
      />
    );
  }

  return (
    <SpotlightWithoutTrack
      top={top}
      left={left}
      width={width}
      height={height}
    />
  );
}

function SpotlightWithTrack({ top, left, width, height, track, consumerId }) {
  const ref = useRef();
  const displayName = useSelector(({ spotlight }) => spotlight.displayName);
  const micEnable = useSelector(({ spotlight }) => spotlight.micEnable);

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
    <div className="absolute group" style={{ top, left, width, height }}>
      <video
        id="cam-video"
        ref={ref}
        autoPlay
        playsInline
        className="w-full h-full rounded"
      />
      <SpotlightDisplayName micEnable={micEnable} displayName={displayName} />
      <div onClick={showViewInfo}>
        <div className="hidden group-hover:block absolute top-0 right-0 cursor-pointer m-2">
          <FaInfoCircle color="white" />
        </div>
      </div>
    </div>
  );
}

function SpotlightWithoutTrack({ top, left, width, height }) {
  const displayName = useSelector(({ spotlight }) => spotlight.displayName);
  const micEnable = useSelector(({ spotlight }) => spotlight.micEnable);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#4A2F12] flex items-center justify-center rounded">
        <Avatar size={60} className="bg-[#492E10]">
          Y
        </Avatar>
      </div>
      <SpotlightDisplayName micEnable={micEnable} displayName={displayName} />
    </div>
  );
}

export default SpotlightRemoteView;
