import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useServerEvents } from "main/room-mobile/hooks";

const Prejoin = dynamic(() => import("main/room-mobile/components/Prejoin"));
const Inside = dynamic(() => import("main/room-mobile/components/RoomInside"));

function DataOk() {
  const joined = useSelector(({ room }) => room.joined);

  useServerEvents();

  if (joined) {
    return <Inside />;
  }

  return <Prejoin />;
}

export default DataOk;
