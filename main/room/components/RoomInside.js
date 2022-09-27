import { useSelector } from "react-redux";

import RoomInsideHeader from "main/room/components/RoomInsideHeader";
import RoomInsideFooter from "main/room/components/RoomInsideFooter";
import RoomInsideViews from "main/room/components/RoomInsideViews";
import RoomInsideSideBar from "main/room/components/RoomInsideSideBar";
import FullscreenLoading from "main/room/components/FullscreenLoading";
import ViewInfo from "main/room/components/ViewInfo";

import {
  useJanus,
  useMediasoup,
  useSpeakingDetector,
  useSyncNetworkSpeed,
} from "main/room/hooks";

import Context from "main/room/context";

function RoomInside() {
  const msReady = useSelector(({ room }) => room.mediasoup.ready);
  const jnReady = useSelector(({ room }) => room.janus.ready);

  const janus = useJanus();
  const mediasoup = useMediasoup();

  useSpeakingDetector();
  useSyncNetworkSpeed();

  if (msReady && jnReady) {
    return (
      <Context.Provider value={{ janus, mediasoup }}>
        <div className="meeting">
          <RoomInsideHeader />
          <div className="meeting-center">
            <RoomInsideViews />
            <RoomInsideSideBar />
            <ViewInfo />
          </div>
          <RoomInsideFooter />
        </div>
      </Context.Provider>
    );
  }

  return <FullscreenLoading />;
}

export default RoomInside;
