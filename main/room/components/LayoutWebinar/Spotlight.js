import { useSelector } from "react-redux";

import SpotlightEmpty from "main/room/components/LayoutWebinar/SpotlightEmpty";
import SpotlightLocalCam from "main/room/components/LayoutWebinar/SpotlightLocalCam";
import SpotlightRemoteView from "main/room/components/LayoutWebinar/SpotlightRemoteView";
import SpotlightLocalShare from "main/room/components/LayoutWebinar/SpotlightLocalShare";
import SpotlightRemoteShare from "main/room/components/LayoutWebinar/SpotlightRemoteShare";

function Spotlight({ localcamTrack, localshareStream }) {
  const sharingMode = useSelector(({ screensharing }) => screensharing.mode);
  const itsYou = useSelector(({ spotlight }) => spotlight.itsYou);
  const ownerId = useSelector(({ spotlight }) => spotlight.ownerId);

  if (sharingMode === "off") {
    if (itsYou) {
      return <SpotlightLocalCam track={localcamTrack} />;
    }

    if (ownerId) {
      return <SpotlightRemoteView />;
    }

    return <SpotlightEmpty />;
  }

  if (sharingMode === "local") {
    return <SpotlightLocalShare stream={localshareStream} />;
  }

  if (sharingMode === "remote") {
    return <SpotlightRemoteShare />;
  }

  return <SpotlightEmpty />;
}

export default Spotlight;
