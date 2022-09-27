import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "main/room/store";
import { ThunkActions } from "main/room/store/thunks";
import { ioEndpoint } from "configs";

import message from "main/room/components/message";

function useSocketIO() {
  const dispatch = useDispatch();
  const roomId = useSelector(({ room }) => room.id);

  useEffect(() => {
    const socket = io(ioEndpoint, { query: { roomId } });

    socket.on("disconnect", () => {
      console.log("[socketio] disconnected");
    });

    socket.on("warning", (message) => {
      console.log("[warning]", message);
    });

    socket.on("connect", () => {
      console.log("[socketio] connected");
      dispatch(actions.setIoConnectionId(socket.id));
    });

    socket.on("disconnect", () => {
      console.log("[socketio] disconnected");
    });

    socket.on("connection-join-room", (connection) => {
      dispatch(actions.addConnection(connection));
    });

    socket.on("update-connection-list", (connections) => {
      dispatch(actions.setConnections(connections));
    });

    socket.on("connection-disconnect", ({ connectionId }) => {
      dispatch(actions.removeConnection(connectionId));
    });

    socket.on("connection-turnon-cam", ({ connectionId }) => {
      dispatch(actions.connectionTurnOnCam(connectionId));
    });

    socket.on("connection-turnoff-cam", ({ connectionId }) => {
      dispatch(actions.connectionTurnOffCam(connectionId));
    });

    socket.on("connection-turn-mic", ({ connectionId, enable }) => {
      dispatch(actions.connectionTurnMic({ connectionId, enable }));
    });

    socket.on("refresh-remote-views", (remoteViews) => {
      dispatch(actions.refreshRemoteViews(remoteViews));
    });

    socket.on("append-remote-view", (remoteView) => {
      dispatch(actions.appendRemoteView(remoteView));
    });

    socket.on("remove-remote-view", (ownerId) => {
      dispatch(actions.removeRemoteView(ownerId));
    });

    socket.on("remote-view-turnon-cam", ({ ownerId, consumerInfo }) => {
      dispatch(actions.remoteViewTurnOnCam({ ownerId, consumerInfo }));
    });

    socket.on("remote-view-turnoff-cam", (ownerId) => {
      dispatch(actions.remoteViewTurnOffCam(ownerId));
    });

    socket.on(
      "connection-start-share-screen",
      ({ ownerId, ownerDisplayName, consumerInfo }) => {
        dispatch(
          actions.setScreenSharingModeRemote({
            ownerId,
            ownerDisplayName,
            consumerInfo,
          })
        );
      }
    );

    socket.on("connection-stop-share-screen", () => {
      dispatch(actions.setScreenSharingModeOff());
    });

    socket.on("force:connection-turn-off-mic", () => {
      dispatch(ThunkActions.forceConnectionTurnOffMic());
    });

    socket.on("force:connection-turn-off-cam", () => {
      dispatch(ThunkActions.forceConnectionTurnOffCam());
    });

    socket.on("force:connection-stop-share", () => {
      dispatch(ThunkActions.forceConnectionStopShare());
    });

    socket.on("force:connection-leave-room", () => {
      dispatch(ThunkActions.forceConnectionLeaveRoom());
    });

    socket.on("pin-this-connection", () => {
      message.info("Admin vừa pin bạn", 1);
      dispatch(actions.setPined(true));
    });

    socket.on("unpin-this-connection", () => {
      dispatch(ThunkActions.unpinThisConnection());
    });

    socket.on("connection-pin-change", ({ pinedConnectionId, pined }) => {
      dispatch(
        actions.updatePinedConnection({
          connectionId: pinedConnectionId,
          pined,
        })
      );
    });

    socket.on(
      "set-spotlight",
      ({ itsYou, ownerId, hasConsumer, displayName, consumerInfo }) => {
        dispatch(
          actions.setSpotlight({
            itsYou,
            ownerId,
            hasConsumer,
            displayName,
            consumerInfo,
          })
        );
      }
    );

    socket.on("unset-spotlight", () => {
      dispatch(
        actions.setSpotlight({
          itsYou: false,
          ownerId: "",
          hasConsumer: false,
          displayName: "",
          consumerInfo: null,
        })
      );
    });

    socket.on("spotlight-turn-off-cam", () => {
      dispatch(actions.setCamSpotlightOff());
    });

    socket.on("spotlight-turn-on-cam", ({ consumerInfo }) => {
      dispatch(actions.setCamSpotlightOn(consumerInfo));
    });

    socket.on("room-closed", () => {
      dispatch(ThunkActions.roomClosed());
    });

    socket.on("update-screen-share-consumer", ({ consumerInfo }) => {
      dispatch(actions.setScreenShareConsumer(consumerInfo));
    });

    socket.on(
      "connection-update-display-name",
      ({ connectionId, displayName }) => {
        dispatch(ThunkActions.updateDisplayName({ connectionId, displayName }));
      }
    );

    socket.on("request-join-accepted", () => {
      dispatch(actions.setJoined());
    });

    socket.on("request-join-canceled", ({ email }) => {
      dispatch(actions.removeRequestJoin(email));
    });

    socket.on("request-join-rejected", () => {
      dispatch(actions.setRequestJoinStatusRejected());
    });

    socket.on("request-join-queued", () => {
      dispatch(actions.setRequestJoinStatusWaiting());
    });

    socket.on("request-join-tackled", ({ email }) => {
      dispatch(actions.removeRequestJoin(email));
    });

    socket.on("new-request-join", ({ email, avatarUrl }) => {
      message.info(`Thành viên ${email} đang yêu cầu vào phòng`);
      dispatch(actions.appendRequestJoin({ email, avatarUrl }));
    });

    socket.on("set:policy:require-approve-to-join", ({ value }) => {
      const openess = value ? "KÍN" : "MỞ";

      message.info(
        `Phòng họp được quản trị viên cấu hình thành phòng họp ${openess} `
      );
      dispatch(actions.setSettingPolicyRequireApproveToJoin(value));
      if (!value) {
        dispatch(actions.setRequestJoins([]));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, roomId]);
}

export default useSocketIO;
