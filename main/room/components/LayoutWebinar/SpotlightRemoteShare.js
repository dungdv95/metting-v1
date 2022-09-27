import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useMediasoupInstance } from "main/room/hooks";

function SpotlightRemoteScreenShare() {
  const mediasoup = useMediasoupInstance();
  const info = useSelector(({ screensharing }) => screensharing.consumerInfo);
  const displayName = useSelector((state) => state.screensharing.displayName);

  const [track, setTrack] = useState(null);

  useEffect(() => {
    mediasoup
      .createConsumer(info)
      .then((consumer) => {
        setTrack(consumer.track);
      })
      .catch(console.log);
  }, [mediasoup, info]);

  if (track) {
    return (
      <SpotlightRemoteScreenShareWithTrack
        track={track}
        displayName={displayName}
      />
    );
  }

  return <SpotlightRemoteScreenShareWithoutTrack displayName={displayName} />;
}

function SpotlightRemoteScreenShareWithoutTrack({ displayName }) {
  return (
    <div className="spotlight-screen-center">
      <img src="/svgs/bgmeeting.svg" alt="" />
      <div className="tag-name">
        <div className="tag-name-left">
          <i className="far fa-microphone" />
        </div>
        <div className="tag-name-right">
          <div className="tag-right-top">
            <h3 className="mb-0">{displayName}</h3>
          </div>
          <div className="tag-right-bottom">
            <div className="tag-box-1" />
            <div className="tag-box-2" />
            <div className="tag-box-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightRemoteScreenShareWithTrack({ track, displayName }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);

    return () => {
      track.stop();
    };
  }, [track]);

  return (
    <div className="spotlight-screen-center">
      <video ref={ref} autoPlay playsInline className="w-full rounded" />

      <div className="tag-name">
        <div className="tag-name-left">
          <i className="far fa-microphone" />
        </div>
        <div className="tag-name-right">
          <div className="tag-right-top">
            <h3 className="mb-0">{displayName}</h3>
          </div>
          <div className="tag-right-bottom">
            <div className="tag-box-1" />
            <div className="tag-box-2" />
            <div className="tag-box-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotlightRemoteScreenShare;
