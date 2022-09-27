import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Spotlight from "main/room/components/LayoutWebinar/Spotlight";
import LeftViews from "main/room/components/LayoutWebinar/LeftViews";
import RightViews from "main/room/components/LayoutWebinar/RightViews";

import { useRequestCamSpotlight } from "main/room/hooks";

import { actions } from "main/room/store";
import api from "api";

function ViewLayoutWebinar({ localcamTrack, localshareStream }) {
  useSyncPermissions();
  useRequestCamSpotlight();
  useRequestPinedRemoteViews();
  useSetSpotlightToEmptyWhenComponentUnmount();

  return (
    <div className="spotlight-screen-one">
      <div className="spotlight-screen-container">
        <div className="spotlight-screen-top">
          <LeftViews />
          <Spotlight
            localcamTrack={localcamTrack}
            localshareStream={localshareStream}
          />
          <RightViews localcamTrack={localcamTrack} />
        </div>
      </div>
    </div>
  );
}

function useSetSpotlightToEmptyWhenComponentUnmount() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(actions.setSpotlightEmpty());
    };
  }, [dispatch]);
}

function useSyncPermissions() {
  const dispatch = useDispatch();
  const pined = useSelector(({ user }) => user.pined);
  const isModerator = useSelector(({ user }) => user.isModerator);

  useEffect(() => {
    if (pined || isModerator) {
      dispatch(actions.setCanShareAudio(true));
      dispatch(actions.setCanShareCam(true));
      dispatch(actions.setCanShareScreen(true));
    } else {
      dispatch(actions.setCanShareAudio(false));
      dispatch(actions.setCanShareCam(false));
      dispatch(actions.setCanShareScreen(false));
    }

    return () => {
      dispatch(actions.setCanShareAudio(true));
      dispatch(actions.setCanShareCam(true));
      dispatch(actions.setCanShareScreen(true));
    };
  }, [pined, isModerator, dispatch]);
}

function useRequestPinedRemoteViews() {
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);

  useEffect(() => {
    api.requestPinedRemoteViews({ roomId, ioConnectionId }).catch(console.log);
  }, [roomId, ioConnectionId]);
}

export default ViewLayoutWebinar;
