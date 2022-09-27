import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { useInterval, useJanusInstance, useScript } from "main/room/hooks";
import { IconLive } from "main/room/components/icons";
import { FaRecordVinyl } from "react-icons/fa";
import RecordRTC from "recordrtc";
import media from "main/room/media";
import { actions } from "main/room/store";
import { maxRecordElapsed } from "configs";

function Recorder() {
  const recording = useRecord();

  if (recording) {
    return <TimerMode />;
  }

  return <WaitingMode />;
}

function TimerMode() {
  const dispatch = useDispatch();
  const [elapsed, setElapsed] = useState(0);

  function stopRecord() {
    dispatch(actions.setRecordActive(false));
  }

  useInterval(() => {
    if (elapsed >= maxRecordElapsed) {
      stopRecord();
      return;
    }
    setElapsed(elapsed + 1);
  }, 1000);

  return (
    <Tooltip title="Dừng ghi hình cuộc họp">
      <div className="btn-record cursor-pointer" onClick={stopRecord}>
        <div className="cursor-pointer">
          <IconLive />
          <span className="ml-1">{toHHMMSS(elapsed)}</span>
        </div>
      </div>
    </Tooltip>
  );
}

function WaitingMode() {
  return (
    <div className="btn-rss cursor-pointer btn-meet-disable">
      <FaRecordVinyl size={20} color="gray" />
    </div>
  );
}

function useRecord() {
  const dispatch = useDispatch();
  const janus = useJanusInstance();
  const scriptStatus = useScript("https://www.webrtc-experiment.com/EBML.js");

  const blobs = useRef([]);

  const roomName = useSelector(({ room }) => room.name);
  const [recording, setRecoring] = useState(false);

  useEffect(() => {
    if (scriptStatus === "loading") {
      return;
    }

    let recorder;

    startRecord().catch((error) => {
      console.log(error);
      dispatch(actions.setRecordActive(false));
    });

    async function startRecord() {
      const audioCtx = new AudioContext();
      const destNode = audioCtx.createMediaStreamDestination();
      const stream = await media.getCurrentTabVideoStream();
      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = destNode.stream.getAudioTracks()[0];
      const sendAudioTrack = janus.getSendAudioTrack();
      const recvAudioTrack = janus.getRecvAudioTrack();

      videoTrack.onended = () => {
        dispatch(actions.setRecordActive(false));
      };

      audioCtx
        .createMediaStreamSource(new MediaStream([sendAudioTrack]))
        .connect(destNode);

      audioCtx
        .createMediaStreamSource(new MediaStream([recvAudioTrack]))
        .connect(destNode);

      recorder = new RecordRTC(new MediaStream([videoTrack, audioTrack]), {
        type: "video",
        mimeType: "video/webm",
        disableLogs: true,
        frameRate: 20,
        timeSlice: 5000,
        ondataavailable: (e) => {
          blobs.current.push(e);
        },
        recorderType: RecordRTC.MediaStreamRecorder,
      });

      recorder.startRecording();
      recorder.cleanup = () => {
        videoTrack.stop();
      };
      setRecoring(true);
    }

    function stopRecord() {
      if (recorder && typeof document !== "undefined") {
        recorder.stopRecording(() => {
          RecordRTC.getSeekableBlob(
            new Blob(blobs.current, { type: "video/webm;codecs=vp8,opus" }),
            (seekableBlob) => {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(seekableBlob);
              link.download = `record-meeting-${roomName}-${today()}.mp4`;
              link.click();
            }
          );
          recorder.destroy();
          recorder.cleanup();
        });
      }
    }

    return stopRecord;
  }, [roomName, scriptStatus, dispatch, janus]);

  return recording;
}

function toHHMMSS(elapsed) {
  var hours = Math.floor(elapsed / 3600);
  var minutes = Math.floor((elapsed - hours * 3600) / 60);
  var seconds = elapsed - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

function today() {
  const d = new Date();
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
}

export default Recorder;
