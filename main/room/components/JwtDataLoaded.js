import dynamic from "next/dynamic";
import { useSyncDevices, useSocketIO } from "main/room/hooks";
import { useSelector } from "react-redux";

const Loading = dynamic(() => import("main/room/components/FullscreenLoading"), { ssr: false });
const Prejoin = dynamic(() => import("main/room/components/Prejoin"));
const RoomInside = dynamic(() => import("main/room/components/RoomInside"));

function JwtDataLoaded() {
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const joined = useSelector(({ room }) => room.joined);

  useSyncDevices();
  useSocketIO();

  if (ioConnectionId && joined) {
    return <RoomInside />;
  }

  if (ioConnectionId) {
    return <Prejoin />;
  }

  return <Loading />;
}

export default JwtDataLoaded;
