import { useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Avatar } from "antd";
import { useMediasoupTrack, useShowViewInfo } from "main/room/hooks";
import MicStatusIcon from "main/room/components/MicStatusIcon";
import { MdOutlineScreenShare } from "react-icons/md";
import { useSelector } from "react-redux";

function RemoteView({ hasConsumer, consumerInfo, micEnable, ...others }) {
  const track = useMediasoupTrack(consumerInfo);
  if (consumerInfo && track) {
    return (
      <WithTrack
        track={track}
        micEnable={micEnable}
        {...others}
        consumerId={consumerInfo.id}
      />
    );
  }
  return <WithoutTrack {...others} micEnable={micEnable} consumerId={null} />;
}
function WithTrack({
  top,
  left,
  width,
  height,
  track,
  consumerId,
  displayName,
  micEnable,
  ownerId,
}) {
  const ref = useRef();
  const showViewInfo = useShowViewInfo({
    consumerId,
    displayName,
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
      <div className="group w-full h-full bg-[#4A2F12] bg-[#4A2F12] rounded hover:border-2 hover:border-white hover:border-solid">
        <video
          id="cam-video"
          ref={ref}
          autoPlay
          playsInline
          className="w-full h-full rounded"
        />
        <div onClick={showViewInfo}>
          <div className="hidden group-hover:block absolute top-0 right-0 bg-black/[.4] p-2 rounded m-2 cursor-pointer">
            <FaInfoCircle color="white" size={16} />
          </div>
        </div>
        <InforRemote
          micEnable={micEnable}
          displayName={displayName}
          ownerId={ownerId}
        />
      </div>
    </div>
  );
}

function WithoutTrack({
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
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="group w-full h-full bg-[#4A2F12] rounded hover:border-2 hover:border-white hover:border-solid w-full h-full bg-[#492D10] flex items-center justify-center">
        <Avatar size={50} style={{ backgroundColor: "#F89E3F" }}>
          {displayName.charAt(0).toUpperCase()}
        </Avatar>
        <div onClick={showViewInfo}>
          <div className="hidden group-hover:block absolute top-0 right-0 bg-black/[.4] p-2 rounded m-2 cursor-pointer">
            <FaInfoCircle color="white" size={16} />
          </div>
        </div>
        <InforRemote
          micEnable={micEnable}
          displayName={displayName}
          ownerId={ownerId}
        />
      </div>
    </div>
  );
}

function InforRemote({ micEnable, displayName, ownerId }) {
  const ownerIdShare = useSelector(
    ({ screensharing }) => screensharing.ownerId
  );
  return (
    <div className="absolute bottom-0 left-0 bg-black/[.4] rounded-tr-lg p-1 flex items-center max-w-full">
      <MicStatusIcon enable={micEnable} />
      {ownerIdShare == ownerId && (
        <MdOutlineScreenShare size={22} color="green" className="inline mr-1" />
      )}
      {displayName.length > 45 ? (
        <span className="text-white">{displayName.slice(0, 45) + "..."}</span>
      ) : (
        <span className="text-white">{displayName}</span>
      )}{" "}
    </div>
  );
}

export default RemoteView;
