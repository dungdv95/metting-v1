import { UPDATE_DISPLAY_NAME } from "main/room/store/connections";

const initState = {
  mode: "off", // "off" | "local" | "remote" | "requesting"
  ownerId: "",
  displayName: "",
  consumerInfo: null,
};

const SET_SCREEN_SHARING_MODE_LOCAL = "screensharing/set_mode_local";
const SET_SCREEN_SHARING_MODE_OFF = "screensharing/set_mode_off";
const SET_SCREEN_SHARING_MODE_REMOTE = "screensharing/set_mode_remote";
const SET_SCREEN_SHARING_MODE_REQUESTING = "screensharing/set_mode_requesting";
const SET_SCREEN_SHARING_CONSUMER = "screensharing/set_consumer";

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_SCREEN_SHARING_MODE_LOCAL:
      return {
        ...state,
        mode: "local",
        ownerId: "",
        displayName: "",
        consumerInfo: null,
      };
    case SET_SCREEN_SHARING_MODE_OFF:
      return {
        ...state,
        mode: "off",
        ownerId: "",
        displayName: "",
        consumerInfo: null,
      };
    case SET_SCREEN_SHARING_MODE_REMOTE:
      return {
        ...state,
        mode: "remote",
        ownerId: action.payload.ownerId,
        displayName: action.payload.ownerDisplayName,
        consumerInfo: action.payload.consumerInfo,
      };
    case UPDATE_DISPLAY_NAME:
      return state.ownerId === action.payload.connectionId
        ? { ...state, displayName: action.payload.displayName }
        : state;
    case SET_SCREEN_SHARING_CONSUMER:
      return {
        ...state,
        consumerInfo: action.payload,
      };
    case SET_SCREEN_SHARING_MODE_REQUESTING:
      return {
        ...state,
        mode: "requesting",
        ownerId: "",
        displayName: "",
        consumerInfo: null,
      };
    default:
      return state;
  }
}

const actions = {
  setScreenSharingModeLocal() {
    return { type: SET_SCREEN_SHARING_MODE_LOCAL };
  },
  setScreenSharingModeRequesting() {
    return { type: SET_SCREEN_SHARING_MODE_REQUESTING };
  },
  setScreenSharingModeOff() {
    return { type: SET_SCREEN_SHARING_MODE_OFF };
  },
  setScreenSharingModeRemote({ ownerId, ownerDisplayName, consumerInfo }) {
    return {
      type: SET_SCREEN_SHARING_MODE_REMOTE,
      payload: { ownerId, ownerDisplayName, consumerInfo },
    };
  },
  setScreenShareConsumer(consumerInfo) {
    return {
      type: SET_SCREEN_SHARING_CONSUMER,
      payload: consumerInfo,
    };
  },
};

export { reducer, actions };
