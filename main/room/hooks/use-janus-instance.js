import { useContext } from "react";

import Context from "main/room/context";

function useJanusInstance() {
  const { janus } = useContext(Context);
  return janus;
}

export default useJanusInstance;
