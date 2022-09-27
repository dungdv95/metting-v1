import useInterval from "main/room/hooks/use-interval";
import { useDispatch } from "react-redux";
import { actions } from "main/room/store";

const IMAGE_ADDR = "/images/background-13.jpg";
const IMAGE_SIZE = 346538;

function useSyncNetworkSpeed() {
  const dispatch = useDispatch();

  useInterval(() => {
    measureConnectionSpeed((mbps) => {
      dispatch(actions.setNetworkMbps(mbps));
    });
  }, 15000);
}

function measureConnectionSpeed(callback) {
  const download = new Image();
  const startTime = new Date().getTime();

  download.src = IMAGE_ADDR + "?nnn=" + startTime;

  download.onload = () => {
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;
    const bitsLoaded = IMAGE_SIZE * 8;
    const speedBps = (bitsLoaded / duration).toFixed(2);
    const speedKbps = (speedBps / 1024).toFixed(2);
    const speedMbps = (speedKbps / 1024).toFixed(2);
    callback(speedMbps);
  };
}

export default useSyncNetworkSpeed;
