import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Select, Tag } from "antd";

import media from "main/room/media";
import hark from "hark";

function TestMedia() {
  const [mode, setMode] = useState("");

  return (
    <div>
      <Head>
        <title>test media</title>
      </Head>

      <Select className="w-1/2" value={mode} onChange={setMode}>
        <Select.Option value="">None</Select.Option>
        <Select.Option value="mic">Test Mic</Select.Option>
        <Select.Option value="cam">Test Cam</Select.Option>
        <Select.Option value="share">Test Share</Select.Option>
        <Select.Option value="detecwebrtc">Test DetectRTC</Select.Option>
        <Select.Option value="audiocontext">Test AudioContext</Select.Option>
        <Select.Option value="network">Test Network</Select.Option>
        <Select.Option value="emuratedevices">
          Test EnumerateDevices
        </Select.Option>
      </Select>

      {mode === "mic" && <TestMic />}
      {mode === "cam" && <TestCam />}
      {mode === "share" && <TestShare />}
      {mode === "detecwebrtc" && <TestDetectWebrtc />}
      {mode === "audiocontext" && <TestAudioContext />}
      {mode === "emuratedevices" && <TestEnumerateDevices />}
    </div>
  );
}

function TestEnumerateDevices() {
  const [text, setText] = useState("");
  useEffect(() => {
    media
      .getDevices()
      .then((result) => {
        setText(JSON.stringify(result, undefined, 2));
      })
      .catch(console.log);
  }, []);
  return <pre>{text}</pre>;
}

function TestMic() {
  const ref = useRef();
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    let stream;
    let speechEvents;

    async function run() {
      setDevices(await media.getDevices());

      stream = await media.getMicStream();
      ref.current.srcObject = stream;

      speechEvents = hark(stream);

      speechEvents.on("speaking", () => {
        setSpeaking(true);
      });

      speechEvents.on("stopped_speaking", () => {
        setSpeaking(false);
      });
    }

    run().catch(console.log);

    return (stream) => {
      speechEvents?.stop();
      stream?.getAudioTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div>
      <audio ref={ref} autoPlay playsInline />
      Testing Mic{" "}
      {speaking ? (
        <Tag color="green">speaking</Tag>
      ) : (
        <Tag color="gold">not speaking</Tag>
      )}
    </div>
  );
}

function TestCam() {
  const ref = useRef();
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    media
      .getDevices()
      .then((deviceInfos) => {
        setDevices(deviceInfos.filter((d) => d.kind === "videoinput"));
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    let s;
    if (deviceId) {
      media
        .getCamStream({ deviceId })
        .then((stream) => {
          s = stream;
          ref.current.srcObject = stream;
        })
        .catch(console.log);
    }

    return () => {
      if (s) {
        s.getTracks().forEach((t) => t.stop());
      }
    };
  }, [deviceId]);

  return (
    <div>
      <Select value={deviceId} onChange={setDeviceId} style={{ width: 400 }}>
        {devices.map((d) => (
          <Select.Option key={d.label} value={d.deviceId}>
            {d.label}
          </Select.Option>
        ))}
        <Select.Option value="">None</Select.Option>
      </Select>
      {deviceId && (
        <video
          id="cam-video"
          autoPlay
          playsInline
          ref={ref}
          className="w-1/2"
        />
      )}
    </div>
  );
}

function TestShare() {
  const video = useRef();
  const audio = useRef();

  useEffect(() => {
    let stream;

    async function run() {
      stream = await media.getShareStream();
      video.current.srcObject = new MediaStream(stream.getVideoTracks());
      audio.current.srcObject = new MediaStream(stream.getAudioTracks());
    }

    run().catch(console.log);

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div>
      <video id="cam-video" ref={video} autoPlay playsInline />
      <audio ref={audio} autoPlay playsInline />
    </div>
  );
}

function TestDetectWebrtc() {
  const [text, setText] = useState("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        checkPermissions()
          .then((result) => {
            setText(JSON.stringify(result, undefined, 2));
          })
          .catch(console.log);
      })
      .catch(console.log);
  }, []);

  return <pre>{text}</pre>;
}

function TestAudioContext() {
  useEffect(() => {
    try {
      const ctx = new AudioContext();
      const dest = ctx.createMediaStreamDestination();
    } catch (error) {
      alert(error);
    }
  }, []);
  return null;
}

async function checkPermissions() {
  if (typeof document == "undefined") {
    return {};
  }

  const { default: DetectRTC } = await import("detectrtc");

  return new Promise((resolve) => {
    DetectRTC.load(() => {
      resolve({
        hasCam: DetectRTC.hasWebcam,
        hasMic: DetectRTC.hasMicrophone,
        hasSpeakers: DetectRTC.hasSpeakers,
        hasMicPerm: DetectRTC.isWebsiteHasMicrophonePermissions,
        hasCamPerm: DetectRTC.isWebsiteHasWebcamPermissions,
        isChrome: DetectRTC.browser.isChrome,
        isFirefox: DetectRTC.browser.isFirefox,
        isSafari: DetectRTC.browser.isSafari,
        isIE: DetectRTC.browser.isIE,
        isOpera: DetectRTC.browser.isOpera,
        isEdge: DetectRTC.browser.isEdge,
        isMobile: DetectRTC.isMobileDevice,
        osName: DetectRTC.osName,
        osVersion: DetectRTC.osVersion,
        browserName: DetectRTC.browser.name,
        browserVersion: DetectRTC.browser.version,
      });
    });
  });
}

export default TestMedia;
