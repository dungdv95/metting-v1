import message from "main/room/components/message";

import { actions } from "main/room/store";

export const ThunkActions = {
  updateDisplayName({ connectionId, displayName }) {
    return (dispatch, getStore) => {
      const store = getStore();
      const ioConnectionId = store.room.socketio.connectionId;

      dispatch(actions.updateConnDisplayName({ connectionId, displayName }));

      if (ioConnectionId === connectionId) {
        dispatch(actions.setDisplayName(displayName));
        message.info(`Tên của bạn được đổi thành ${displayName}`);
      }
    };
  },
  forceConnectionTurnOffCam() {
    return (dispatch) => {
      message.info("Admin vừa tắt cam của bạn");
      dispatch(actions.setCamEnable(false));
    };
  },
  forceConnectionTurnOffMic() {
    return (dispatch) => {
      message.info("Admin vừa tắt mic của bạn");
      dispatch(actions.setMicEnable(false));
    };
  },
  forceConnectionStopShare() {
    return (dispatch) => {
      message.info("Admin vừa tắt chia sẻ màn hình của bạn");
      dispatch(actions.setScreenSharingModeOff());
    };
  },
  forceConnectionLeaveRoom() {
    return (_, getStore) => {
      const store = getStore();
      const backUrl = store.room.backUrl;

      message.info("Admin vừa mời bạn ra khỏi phòng").then(() => {
        Router.push(backUrl, undefined, { sallow: true });
      });
    };
  },
  unpinThisConnection() {
    return (dispatch) => {
      message.info("Admin vừa gỡ pin bạn", 1);
      dispatch(actions.setPined(false));
      dispatch(actions.setCamEnable(false));
      dispatch(actions.setMicEnable(false));
      dispatch(actions.setScreenSharingModeOff());
    };
  },
  roomClosed() {
    return (_, getStore) => {
      const store = getStore();
      const backUrl = store.room.backUrl;

      message.info("Phòng đã đóng").then(() => {
        Router.push(backUrl, undefined, { sallow: true });
      });
    };
  },
};
