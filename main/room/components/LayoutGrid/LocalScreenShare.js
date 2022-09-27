import { Avatar } from "antd";
import { useEffect, useRef } from "react";

function LocalScreenShare({ top, left, width, height, localshareStream }) {
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

  useEffect(() => {
    ref.current.srcObject = new MediaStream(stream.getVideoTracks());
  }, [stream]);

  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#492D10] group rounded hover:border-2 hover:border-white hover:border-solid flex items-center justify-center">
        <video
          ref={ref}
          autoPlay
          playsInline
          className="w-full h-full rounded"
        />
        <div className="absolute bottom-0 left-0 bg-black/[.4] rounded-tr-lg p-1">
          <span className="text-white">Bạn - đang chia sẻ</span>
        </div>
      </div>
    </div>
  );
}

function WithoutStream({ top, left, width, height }) {
  return (
    <div className="absolute" style={{ top, left, width, height }}>
      <div className="w-full h-full bg-[#492D10] group rounded hover:border-2 hover:border-white hover:border-solid flex items-center justify-center">
        <Avatar size={50} style={{ backgroundColor: "#F89E3F" }}>
          Y
        </Avatar>
        <div className="absolute bottom-0 left-0 bg-black/[.4] rounded-tr-lg p-1">
          <span className="text-white">Bạn</span>
        </div>
      </div>
    </div>
  );
}

export default LocalScreenShare;
