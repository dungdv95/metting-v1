import { useEffect, useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "antd";
import MicStatusIcon from "main/room/components/MicStatusIcon";
import { useMediasoupInstance, useShowViewInfo } from "main/room/hooks";

function RemoteView({ hasConsumer, consumerInfo, ...others }) {
  const mediasoup = useMediasoupInstance();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (hasConsumer) {
      mediasoup
        .createConsumer(consumerInfo)
        .then((consumer) => {
          setTrack(consumer.track);
        })
        .catch(console.log);
      return;
    }

    setTrack(null);
  }, [consumerInfo, hasConsumer, mediasoup]);

  if (track && consumerInfo) {
    return <WithTrack {...others} track={track} consumerId={consumerInfo.id} />;
  }

  return <WithoutTrack {...others} />;
}

function WithoutTrack({ displayName, micEnable }) {
  const showViewInfo = useShowViewInfo({ displayName });

  return (
    <div className="card-user">
      <div className="card-item-default">
        <div className="card-item-avatar-name">
          <span>{displayName.charAt(0).toUpperCase()}</span>
        </div>
      </div>
      <div className="card-mic">
        <MicStatusIcon enable={micEnable} />
        <DisplayName text={displayName} />
      </div>
      <div onClick={showViewInfo}>
        <div className="card-user-info">
          <FaInfoCircle color="white" />
        </div>
      </div>
    </div>
  );
}

function WithTrack({ displayName, micEnable, consumerId, track }) {
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
    <div className="card-user w-100">
      <video
        id="cam-video"
        ref={ref}
        autoPlay
        playsInline
        className="rounded bg-[#4A2F12]"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="card-mic inline-flex w-full">
        <MicStatusIcon enable={micEnable} />
        <DisplayName text={displayName} />
      </div>
      <div onClick={showViewInfo}>
        <div className="card-user-info">
          <FaInfoCircle color="white" />
        </div>
      </div>
    </div>
  );
}
function DisplayName({ text }) {
  if (text.length > 30) {
    return (
      <Tooltip placement="topLeft" title={text}>
        <span>{text.slice(0, 30) + "..."}</span>
      </Tooltip>
    );
  }

  return <span>{text}</span>;
}
export default RemoteView;
