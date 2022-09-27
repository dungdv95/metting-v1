const initState = {
  itsYou: false,
  ownerId: "",
  displayName: "",
  hasConsumer: false,
  consumerInfo: null,
};

const SET_SPOTLIGHT = "layout/set_spotlight";
const SET_CAM_SPOTLIGHT_OFF = "layout/set_cam_spotlight_off";
const SET_CAM_SPOTLIGHT_ON = "layout/set_cam_spotlight_on";
const SET_SPOTLIGHT_TO_EMPTY = "layout/set_spotlight_to_empty";

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_SPOTLIGHT:
      return action.payload;
    case SET_CAM_SPOTLIGHT_OFF:
      return {
        ...state,
        hasConsumer: false,
        consumerInfo: null,
      };
    case SET_CAM_SPOTLIGHT_ON:
      return {
        ...state,
        hasConsumer: true,
        consumerInfo: action.payload,
      };
    case SET_SPOTLIGHT_TO_EMPTY:
      return initState;
    default:
      return state;
  }
}

const actions = {
  setSpotlight(payload) {
    return { type: SET_SPOTLIGHT, payload };
  },
  setSpotlightEmpty() {
    return { type: SET_SPOTLIGHT_TO_EMPTY };
  },
  setCamSpotlightOff() {
    return { type: SET_CAM_SPOTLIGHT_OFF };
  },
  setCamSpotlightOn(consumerInfo) {
    return { type: SET_CAM_SPOTLIGHT_ON, payload: consumerInfo };
  },
};

export { reducer, actions };
