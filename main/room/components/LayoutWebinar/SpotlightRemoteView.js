import { useRef, useEffect, useState } from "react";
import { useMediasoupInstance, useMediasoupTrack } from "main/room/hooks";
import { useSelector } from "react-redux";
import MicStatusIcon from "main/room/components/MicStatusIcon";

function SpotlightRemoteView() {
  const displayName = useSelector(({ spotlight }) => spotlight.displayName);
  const consumerInfo = useSelector(({ spotlight }) => spotlight.consumerInfo);
  const micEnable = useSelector(({ spotlight }) => spotlight.micEnable);
  const track = useMediasoupTrack(consumerInfo);

  if (track) {
    return (
      <SpotlightWithTrack
        displayName={displayName}
        track={track}
        micEnable={micEnable}
      />
    );
  }

  return (
    <SpotlightWithoutTrack displayName={displayName} micEnable={micEnable} />
  );
}

function SpotlightWithTrack({ displayName, micEnable, track }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className="spotlight-screen-center">
      <video
        id="cam-video"
        ref={ref}
        className="rounded-lg w-3/4 object-fill"
        autoPlay
        playsInline
      />

      <div className="tag-name">
        <div className="tag-name-left">
          <MicStatusIcon enable={micEnable} size={20} />
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

function SpotlightWithoutTrack({ displayName, micEnable }) {
  return (
    <div className="spotlight-screen-center">
      <img src="/svgs/bgmeeting.svg" alt="" className="rounded-lg" />

      <div className="tag-name">
        <div className="tag-name-left">
          <MicStatusIcon enable={micEnable} size={20} />
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

export default SpotlightRemoteView;
