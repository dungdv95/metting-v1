import {
  useRequestCamSpotlight,
  useRequestUpdateScreenShareConsumer,
  useSyncRemoteViewsSidebarLayout,
} from "main/room/hooks";

import CalculatedView from "main/room/components/LayoutSidebar/CalculatedView";

function LayoutSidebar({ localcamTrack, localshareStream }) {
  useSyncRemoteViewsSidebarLayout();
  useRequestCamSpotlight();
  useRequestUpdateScreenShareConsumer();

  return (
    <CalculatedView
      localcamTrack={localcamTrack}
      localshareStream={localshareStream}
    />
  );
}

export default LayoutSidebar;
