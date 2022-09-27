import { useSelector } from "react-redux";
import {
  useJanus,
  useMediasoup,
  useSyncRemoteviews,
} from "main/room-mobile/hooks";

import Context from "main/room-mobile/context";

import Views from "main/room-mobile/components/Views";
import RoomInsideHeader from "main/room-mobile/components/RoomInsideHeader";
import PopupChat from "main/room-mobile/components/PopupChat";
import PopupPeople from "main/room-mobile/components/PopupPeople";
import InformationMeet from "main/room-mobile/components/InformationMeet";
import PopupSetting from "main/room-mobile/components/PopupSetting";
import FullscreenLoading from "main/room-mobile/components/FullscreenLoading";
import Controller from "main/room-mobile/components/Controller";

function RoomInside() {
  const msReady = useSelector(({ room }) => room.mediasoup.ready);
  const jnReady = useSelector(({ room }) => room.janus.ready);
  const janus = useJanus();
  const mediasoup = useMediasoup();

  useSyncRemoteviews();

  if (msReady && jnReady) {
    return (
      <Context.Provider value={{ janus, mediasoup }}>
        <Controller />
        <RoomInsideHeader />
        <Views />
        <PopupChat />
        <PopupPeople />
        <PopupSetting />
        <InformationMeet />
      </Context.Provider>
    );
  }

  return <FullscreenLoading />;
}

export default RoomInside;
