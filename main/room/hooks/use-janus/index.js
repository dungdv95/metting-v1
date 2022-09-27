import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioBridgePlugin from "main/room/hooks/use-janus/audiobridge";
import TextRoomPlugin from "main/room/hooks/use-janus/textroom";

import { actions } from "main/room/store";

import media from "main/room/media";
import apis from "api";

import { message } from "antd";

function useJanus() {
  const dispatch = useDispatch();
  const audiobridge = useRef(null);
  const textroom = useRef(null);
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const deviceId = useSelector(({ device }) => device.mic.current);
  const sharingMode = useSelector(({ screensharing }) => screensharing.mode);
  const ready = useSelector(({ room }) => room.janus.ready);

  useEffect(() => {
    audiobridge.current = new AudioBridgePlugin({
      roomId,
      ioConnectionId,
      onReady() {
        dispatch(actions.setJanusReady(true));
      },
    });

    return () => {
      if (audiobridge.current) {
        audiobridge.current.close();
      }
    };
  }, [roomId, ioConnectionId, dispatch]);

  useEffect(() => {
    textroom.current = new TextRoomPlugin({
      roomId,
      ioConnectionId,
      onReceiveMessage(msg) {
        if (msg.content.indexOf("[@reaction]") !== -1) {
          if (ioConnectionId !== msg.from) {
            var id = msg.id;
            var content = msg.content.replace("[@reaction]", "").trim();
            var style = Math.floor(Math.random() * 10 + 1);
            dispatch(actions.appendReaction({ content, style, id }));
            setTimeout(() => {
              dispatch(actions.removeReaction());
            }, 2500);
          }
        } else {
          if (msg.content === "Tôi muốn phát biểu!") {
            message.info(msg.displayName + " muốn phát biểu!", 3);
          }
          dispatch(actions.appendMessage(msg));
        }
      },
      onReady() {
        console.log("[janus] textroom ready");
      },
    });

    return () => {
      if (textroom.current) {
        textroom.current.close();
      }
    };
  }, [roomId, ioConnectionId, dispatch]);

  useEffect(() => {
    apis
      .connectionTurnMic({
        roomId,
        ioConnectionId,
        enable: micEnable,
      })
      .catch(console.log);
  }, [micEnable, ioConnectionId, roomId]);

  useEffect(() => {
    let tempTrack;

    media.getMicStream(deviceId).then((stream) => {
      tempTrack = stream.getAudioTracks()[0];
      audiobridge.current.mixMicTrack(tempTrack);
    });

    return () => {
      if (tempTrack) {
        tempTrack.stop();
      }
    };
  }, [deviceId]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (sharingMode === "local") {
      audiobridge.current.configureMute(false);
    } else {
      audiobridge.current.configureMute(!micEnable);
    }

    audiobridge.current.setMicTrackEnable(micEnable);
  }, [ready, micEnable, sharingMode]);

  return useMemo(() => {
    return {
      async sendAudio(stream) {
        await audiobridge.current.sendAudio(stream.getAudioTracks()[0]);
      },
      async sendMessage({ to, senderDisplayName, avatarUrl, content, id }) {
        await textroom.current.sendMessage({
          to,
          senderDisplayName,
          avatarUrl,
          content,
          id,
        });
      },
      mixAudioTrack(track) {
        audiobridge.current.mixTrack(track);
      },
      getSendAudioTrack() {
        return audiobridge.current.getSendTrack();
      },
      getRecvAudioTrack() {
        return audiobridge.current.getRecvTrack();
      },
    };
  }, []);
}

export default useJanus;
