import { useState, useEffect } from "react";
import useMediasoupInstance from "main/room-mobile/hooks/use-mediasoup-instance";

function useMediasoupTrack(consumerInfo) {
  const mediasoup = useMediasoupInstance();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (consumerInfo) {
      let tempTrack;

      mediasoup
        .createConsumer(consumerInfo)
        .then((consumer) => {
          tempTrack = consumer.track;
          setTrack(consumer.track);
        })
        .catch(console.log);

      return () => {
        if (tempTrack) {
          tempTrack.stop();
        }
      };
    }

    setTrack(null);
  }, [consumerInfo, mediasoup]);

  return track;
}

export default useMediasoupTrack;
