import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "main/room-mobile/store/thunks";
import { actions } from "main/room-mobile/store";
import { ioEndpoint } from "configs";

function useServerEvents() {
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

    socket.on("room-closed", () => {
      dispatch(thunks.roomClosed());
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, dispatch]);
}

export default useServerEvents;
