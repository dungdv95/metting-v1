import { useContext } from "react";

import Context from "main/room-mobile/context";

function useMediasoupInstance() {
  const { mediasoup } = useContext(Context);

  return mediasoup;
}

export default useMediasoupInstance;
