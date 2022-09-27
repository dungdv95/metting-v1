import { useSelector } from "react-redux";

import SpotlightLocalCam from "main/room/components/LayoutSidebar/SpotlightLocalCam";
import SpotlightRemoteView from "main/room/components/LayoutSidebar/SpotlightRemoteView";
import SpotlightLocalScreenShare from "main/room/components/LayoutSidebar/SpotlightLocalScreenShare";
import SpotlightRemoteScreenShare from "main/room/components/LayoutSidebar/SpotlightRemoteScreenShare";

function Spotlight({
  top,
  left,
  width,
  height,
  localcamTrack,
  localshareStream,
}) {
  const sharingMode = useSelector(({ screensharing }) => screensharing.mode);
  const itsYou = useSelector(({ spotlight }) => spotlight.itsYou);
  const ownerId = useSelector(({ spotlight }) => spotlight.ownerId);

  if (sharingMode === "off") {
    if (itsYou) {
      return (
        <SpotlightLocalCam
          top={top}
          left={left}
          width={width}
          height={height}
          localcamTrack={localcamTrack}
        />
      );
    }

    if (ownerId) {
      return (
        <SpotlightRemoteView
          top={top}
          left={left}
          width={width}
          height={height}
        />
      );
    }

    return (
      <SpotlightLocalCam
        top={top}
        left={left}
        width={width}
        height={height}
        localcamTrack={localcamTrack}
      />
    );
  }

  if (sharingMode === "local") {
    return (
      <SpotlightLocalScreenShare
        top={top}
        left={left}
        width={width}
        height={height}
        localshareStream={localshareStream}
      />
    );
  }

  if (sharingMode === "remote") {
    return (
      <SpotlightRemoteScreenShare
        top={top}
        left={left}
        width={width}
        height={height}
      />
    );
  }

  return (
    <SpotlightLocalCam
      top={top}
      left={left}
      width={width}
      height={height}
      localcamTrack={localcamTrack}
    />
  );
}

export default Spotlight;
