import { useEffect, useRef } from "react";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import MicStatusIcon from "main/room/components/MicStatusIcon";
import { MdOutlineScreenShare } from "react-icons/md";

function LocalCam({ top, left, width, height, localcamTrack }) {
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const displayName = useSelector(({ user }) => user.displayName);

  if (localcamTrack) {
    return (
      <LocalCamWithTrack
        track={localcamTrack}
        top={top}
        left={left}
        width={width}
        height={height}
        micEnable={micEnable}
        displayName={displayName}
      />
    );
  }

  return (
    <LocalCamWithoutTrack
      top={top}
      left={left}
      width={width}
      height={height}
      micEnable={micEnable}
      displayName={displayName}
    />
  );
}

function LocalCamWithTrack({
  track,
  top,
  left,
  width,
  height,
  micEnable,
  displayName,
}) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#492D10] group rounded hover:border-2 hover:border-white hover:border-solid flex items-center justify-center">
        <video
          id="cam-video"
          ref={ref}
          autoPlay
          playsInline
          className="w-full h-full rounded"
        />
        <InforRemote displayName={displayName} micEnable={micEnable} />
      </div>
    </div>
  );
}

function LocalCamWithoutTrack({
  top,
  left,
  width,
  height,
  micEnable,
  displayName,
}) {
  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#492D10] group rounded hover:border-2 hover:border-white hover:border-solid flex items-center justify-center">
        <Avatar size={50} style={{ backgroundColor: "#F89E3F" }}>
          {displayName.charAt(0).toUpperCase()}
        </Avatar>
        <InforRemote displayName={displayName} micEnable={micEnable} />
      </div>
    </div>
  );
}

function InforRemote({ displayName, micEnable }) {
  const shareMode = useSelector(({ screensharing }) => screensharing.mode);
  return (
    <div className="absolute bottom-0 left-0 bg-black/[.4] rounded-tr-lg p-1 flex items-center max-w-full">
      <MicStatusIcon enable={micEnable} />

      {shareMode == "local" && (
        <MdOutlineScreenShare size={22} color="green" className="inline mr-1" />
      )}

      {displayName.length > 21 ? (
        <span className="text-white">
          (Bạn) {displayName.slice(0, 21) + "..."}
        </span>
      ) : (
        <span className="text-white">(Bạn) {displayName}</span>
      )}
    </div>
  );
}
export default LocalCam;
