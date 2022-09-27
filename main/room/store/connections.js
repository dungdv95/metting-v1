const initState = [];
const ADD_CONNECTION = "connections/add";
const REMOVE_CONNECTION = "connections/remove";
const SET_CONNECTIONS = "connections/set";
const CONNECTION_TURN_OFF_CAM = "connections/turn_off_cam";
const CONNECTION_TURN_ON_CAM = "connections/turn_on_cam";
export const CONNECTION_TURN_MIC = "connections/turn_mic";
const UPDATE_PINED_CONNECTION = "connections/update_pined";
export const UPDATE_DISPLAY_NAME = "connections/update_display_name";

function connectionReducer(state = initState, action) {
  switch (action.type) {
    case ADD_CONNECTION:
      return [...state, action.payload];
    case REMOVE_CONNECTION:
      return state.filter((c) => c.id !== action.payload);
    case SET_CONNECTIONS:
      return action.payload;
    case CONNECTION_TURN_ON_CAM:
      return state.map((c) =>
        c.id === action.payload ? { ...c, camEnable: true } : c
      );
    case CONNECTION_TURN_OFF_CAM:
      return state.map((c) =>
        c.id === action.payload ? { ...c, camEnable: false } : c
      );
    case CONNECTION_TURN_MIC:
      return state.map((c) =>
        c.id === action.payload.connectionId
          ? { ...c, micEnable: action.payload.enable }
          : c
      );
    case UPDATE_PINED_CONNECTION:
      return state.map((c) =>
        c.id === action.payload.connectionId
          ? { ...c, pined: action.payload.pined }
          : c
      );
    case UPDATE_DISPLAY_NAME:
      return state.map((c) =>
        c.id === action.payload.connectionId
          ? { ...c, displayName: action.payload.displayName }
          : c
      );
    default:
      return state;
  }
}

const ConnectionActions = {
  addConnection(connection) {
    return { type: ADD_CONNECTION, payload: connection };
  },
  removeConnection(connectionId) {
    return { type: REMOVE_CONNECTION, payload: connectionId };
  },
  setConnections(connections) {
    return { type: SET_CONNECTIONS, payload: connections };
  },
  connectionTurnOnCam(connectionId) {
    return { type: CONNECTION_TURN_ON_CAM, payload: connectionId };
  },
  connectionTurnOffCam(connectionId) {
    return { type: CONNECTION_TURN_OFF_CAM, payload: connectionId };
  },
  connectionTurnMic({ connectionId, enable }) {
    return { type: CONNECTION_TURN_MIC, payload: { connectionId, enable } };
  },
  updatePinedConnection({ connectionId, pined }) {
    return { type: UPDATE_PINED_CONNECTION, payload: { connectionId, pined } };
  },
  updateConnDisplayName({ connectionId, displayName }) {
    return {
      type: UPDATE_DISPLAY_NAME,
      payload: { connectionId, displayName },
    };
  },
};

export { connectionReducer, ConnectionActions };
