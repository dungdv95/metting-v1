import {
  CONNECTION_TURN_MIC,
  UPDATE_DISPLAY_NAME,
} from "main/room/store/connections";

const initState = [];

const REFRESH_REMOTE_VIEWS = "remoteviews/refresh";
const APPEND_REMOTEVIEW = "remoteviews/append";
const REMOVE_REMOTEVIEW = "remoteviews/remove";
const REMOTEVIEW_TURN_ON_CAM = "remoteviews/turn_on_cam";
const REMOTEVIEW_TURN_OFF_CAM = "remoteviews/turn_off_cam";

function remoteviewReducer(state = initState, action) {
  switch (action.type) {
    case REFRESH_REMOTE_VIEWS:
      return action.payload;
    case APPEND_REMOTEVIEW:
      return [...state, action.payload];
    case REMOVE_REMOTEVIEW:
      return state.filter((v) => v.ownerId !== action.payload);
    case REMOTEVIEW_TURN_ON_CAM:
      return state.map((view) => {
        if (view.ownerId === action.payload.ownerId) {
          return {
            ...view,
            hasConsumer: true,
            consumerInfo: action.payload.consumerInfo,
          };
        }
        return view;
      });
    case CONNECTION_TURN_MIC:
      return state.map((v) =>
        v.ownerId === action.payload.connectionId
          ? { ...v, micEnable: action.payload.enable }
          : v
      );
    case REMOTEVIEW_TURN_OFF_CAM:
      return state.map((view) => {
        if (view.ownerId === action.payload) {
          return {
            ...view,
            hasConsumer: false,
            consumerInfo: null,
          };
        }
        return view;
      });
    case UPDATE_DISPLAY_NAME:
      return state.map((v) =>
        v.ownerId === action.payload.connectionId
          ? { ...v, displayName: action.payload.displayName }
          : v
      );
    default:
      return state;
  }
}

const RemoteViewActions = {
  refreshRemoteViews(remoteviews) {
    return { type: REFRESH_REMOTE_VIEWS, payload: remoteviews };
  },
  appendRemoteView(remoteview) {
    return { type: APPEND_REMOTEVIEW, payload: remoteview };
  },
  removeRemoteView(ownerId) {
    return { type: REMOVE_REMOTEVIEW, payload: ownerId };
  },
  remoteViewTurnOnCam({ ownerId, consumerInfo }) {
    return {
      type: REMOTEVIEW_TURN_ON_CAM,
      payload: { ownerId, consumerInfo },
    };
  },
  remoteViewTurnOffCam(ownerId) {
    return { type: REMOTEVIEW_TURN_OFF_CAM, payload: ownerId };
  },
};

export { remoteviewReducer, RemoteViewActions };
