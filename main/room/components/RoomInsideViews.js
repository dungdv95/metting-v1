import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import {
  useLocalCamTrack,
  useLocalShareStream,
  useSpeakingDetector,
  useSyncLayout,
  useSyncLocalCamTrack,
  useSyncLocalShareStream,
} from "main/room/hooks";

const LayoutSidebar = dynamic(
  () => import("main/room/components/LayoutSidebar"),
  { ssr: false }
);

const LayoutWebinar = dynamic(
  () => import("main/room/components/LayoutWebinar"),
  { ssr: false }
);

const LayoutGrid = dynamic(() => import("main/room/components/LayoutGrid"), {
  ssr: false,
});

function RoomInsideViews() {
  const layout = useSelector(({ layout }) => layout.current);
  const localcamTrack = useLocalCamTrack();
  const localshareStream = useLocalShareStream();

  useSyncLocalCamTrack(localcamTrack);
  useSyncLocalShareStream(localshareStream);
  useSpeakingDetector();
  useSyncLayout();

  if (layout === "sidebar") {
    return (
      <LayoutSidebar
        localcamTrack={localcamTrack}
        localshareStream={localshareStream}
      />
    );
  }

  if (layout === "webinar") {
    return (
      <LayoutWebinar
        localcamTrack={localcamTrack}
        localshareStream={localshareStream}
      />
    );
  }

  if (layout === "grid") {
    return (
      <LayoutGrid
        localcamTrack={localcamTrack}
        localshareStream={localshareStream}
      />
    );
  }

  return null;
}

export default RoomInsideViews;
