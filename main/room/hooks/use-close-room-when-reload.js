import { useEffect } from "react";
import { useSelector } from "react-redux";

import apis from "api";

function useCloseRoomWhenReloadPage() {
  const roomId = useSelector(({ room }) => room.id);

  useEffect(() => {
    return () => {
      if (roomId) {
        apis.closeRoom({ roomId }).catch(console.log);
      }
    };
  }, [roomId]);
}

export default useCloseRoomWhenReloadPage;
