import { useEffect, useState } from "react";
import useInterval from "main/room/hooks/use-interval";
import apis from "api";

function usePollingConsumerStat({ roomId, connId, consumerId, stop }) {
  const [stat, setStat] = useState(null);

  useInterval(() => {
    let mounted = true;

    apis
      .getConsumerStat({ roomId, connId, consumerId })
      .then((result) => {
        if (mounted) {
          setStat(result);
        }
      })
      .catch(console.log);

    return () => {
      mounted = false;
    };
  }, !stop && consumerId && 1000);

  useEffect(() => {
    if (stop) {
      setStat(null);
    }
  }, [stop])

  return stat;
}

export default usePollingConsumerStat;
