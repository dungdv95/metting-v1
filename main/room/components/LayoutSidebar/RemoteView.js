import { useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Avatar } from "antd";
import { useMediasoupTrack, useShowViewInfo } from "main/room/hooks";
import SpotlightDisplayName from "main/room/components/LayoutSidebar/SpotlightDisplayName";

function RemoteView({
  top,
  left,
  width,
  height,
  hasConsumer,
  consumerInfo,
  ...others
}) {
  const track = useMediasoupTrack(consumerInfo);

  if (consumerInfo && track) {
    return (
      <RemoteViewWithTrack
        {...others}
        track={track}
        consumerId={consumerInfo.id}
        top={top}
        left={left}
        width={width}
        height={height}
      />
    );
  }

  return (
    <RemoteViewWithoutTrack
      {...others}
      top={top}
      left={left}
      width={width}
      height={height}
    />
  );
}

function RemoteViewWithoutTrack({
  top,
  left,
  width,
  height,
  displayName,
  micEnable,
  ownerId,
}) {
  const showViewInfo = useShowViewInfo({ displayName });

  return (
    <div className="absolute group" style={{ top, left, width, height }}>
      <div className="w-full h-full  bg-[#4A2F12] flex items-center justify-center rounded">
        <Avatar size={45} style={{ backgroundColor: "#F69C3B" }}>
          {displayName.charAt(0)}
        </Avatar>
      </div>
      <SpotlightDisplayName
        displayName={displayName}
        micEnable={micEnable}
        ownerId={ownerId}
      />
      <div onClick={showViewInfo}>
        <div className="hidden group-hover:block absolute top-0 right-0 cursor-pointer m-2">
          <FaInfoCircle color="white" />
        </div>
      </div>
    </div>
  );
}

function RemoteViewWithTrack({
  top,
  left,
  width,
  height,
  displayName,
  consumerId,
  track,
  micEnable,
  ownerId,
}) {
  const ref = useRef();

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
        className="rounded bg-[#4A2F12]"
        style={{ width: "100%", height: "100%" }}
      />
      <SpotlightDisplayName
        displayName={displayName}
        micEnable={micEnable}
        ownerId={ownerId}
      />
      <div onClick={showViewInfo}>
        <div className="hidden group-hover:block absolute top-0 right-0 cursor-pointer m-2">
          <FaInfoCircle color="white" />
        </div>
      </div>
    </div>
  );
}

export default RemoteView;
