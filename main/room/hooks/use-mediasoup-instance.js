import { useContext } from "react";

import Context from "main/room/context";

function useMediasoupInstance() {
  const { mediasoup } = useContext(Context);

  return mediasoup;
}

export default useMediasoupInstance;
