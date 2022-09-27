import { useSelector } from "react-redux";

import Grid from "main/room/components/LayoutGrid/Grid";

import {
  useRequestCamSpotlight,
  useRequestUpdateScreenShareConsumer,
  useSyncRemoteViewsGridLayout,
} from "main/room/hooks";

function LayoutGrid({ localcamTrack, localshareStream }) {
  useRequestCamSpotlight();
  useSyncRemoteViewsGridLayout();
  useRequestUpdateScreenShareConsumer();

  const shareMode = useSelector(({ screensharing }) => screensharing.mode);
  const remoteviews = useSelector((state) => state.remoteviews);

  return (
    <Grid
      localcamTrack={localcamTrack}
      localshareStream={localshareStream}
      shareMode={shareMode}
      remoteviews={remoteviews}
    />
  );
}

export default LayoutGrid;
