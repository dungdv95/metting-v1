import media from "main/room/media";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function MicDemo() {
  const micEnable = useSelector(({ device }) => device.mic.enable);

  return micEnable && <MicDemoEnable />;
}

function MicDemoEnable() {
  const ref = useRef();
  const current = useSelector(({ device }) => device.mic.current);

  useEffect(() => {
    let tempStream;
    let mounted = true;

    media
      .getMicStream(current)
      .then((stream) => {
        if (mounted) {
          tempStream = stream;
          ref.current.srcObject = stream;
        }
      })
      .catch(console.log);

    return () => {
      mounted = false;
      tempStream?.getTracks().forEach((t) => t.stop());
    };
  }, [current]);

  return <audio ref={ref} autoPlay playsInline />;
}

export default MicDemo;
