import { useSelector } from "react-redux";
import SpotlightLocalCam from "main/room-mobile/components/Spotlight/SpotlightLocalCam";
import SpotlightRemoteCam from "main/room-mobile/components/Spotlight/SpotlightRemoteCam";
import SpotlightRemoteShare from "main/room-mobile/components/Spotlight/SpotlightRemoteShare";

function Spotlight({ localcamTrack }) {
  const sharingMode = useSelector(({ screensharing }) => screensharing.mode);
  const ownerId = useSelector(({ spotlight }) => spotlight.ownerId);

  if (sharingMode === "off") {
    if (ownerId) {
      return <SpotlightRemoteCam />;
    }

    return <SpotlightLocalCam localcamTrack={localcamTrack} />;
  }

  if (sharingMode === "remote") {
    return <SpotlightRemoteShare />;
  }

  return <SpotlightLocalCam localcamTrack={localcamTrack} />;
}

export default Spotlight;
