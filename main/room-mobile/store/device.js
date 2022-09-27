const initState = {
  cam: {
    enable: false,
    current: "",
    availiable: false,
    permGranted: false,
    options: [],
  },
  mic: {
    enable: false,
    current: "",
    availiable: false,
    permGranted: false,
    options: [],
  },
};

const SET_MIC_ENABLE = "device/set_mic_enable";
const SET_CAM_ENABLE = "device/set_cam_enable";
const SET_MIC = "device/set_mic";
const SET_CAM = "device/set_cam";
const SET_MIC_AVAILIABLE = "device/set_mic_availiable";
const SET_CAM_AVAILIABLE = "device/set_cam_availiable";
const SET_MIC_PERM_GRANTED = "device/set_mic_perm_granted";
const SET_CAM_PERM_GRANTED = "device/set_cam_perm_granted";
const SET_MIC_OPTIONS = "device/set_mic_options";
const SET_CAM_OPTIONS = "device/set_cam_options";

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_MIC_ENABLE:
      return { ...state, mic: { ...state.mic, enable: action.payload } };
    case SET_CAM_ENABLE:
      return { ...state, cam: { ...state.cam, enable: action.payload } };
    case SET_MIC:
      return { ...state, mic: { ...state.mic, current: action.payload } };
    case SET_CAM:
      return { ...state, cam: { ...state.cam, current: action.payload } };
    case SET_MIC_AVAILIABLE:
      return { ...state, mic: { ...state.mic, availiable: action.payload } };
    case SET_CAM_AVAILIABLE:
      return { ...state, cam: { ...state.cam, availiable: action.payload } };
    case SET_MIC_PERM_GRANTED:
      return { ...state, mic: { ...state.mic, permGranted: action.payload } };
    case SET_CAM_PERM_GRANTED:
      return { ...state, cam: { ...state.cam, permGranted: action.payload } };
    case SET_MIC_OPTIONS:
      return { ...state, mic: { ...state.mic, options: action.payload } };
    case SET_CAM_OPTIONS:
      return { ...state, cam: { ...state.cam, options: action.payload } };
    default:
      return state;
  }
}

const actions = {
  setMicEnable(enable) {
    return { type: SET_MIC_ENABLE, payload: enable };
  },
  setCamEnable(enable) {
    return { type: SET_CAM_ENABLE, payload: enable };
  },
  setMic(deviceId) {
    return { type: SET_MIC, payload: deviceId };
  },
  setCam(deviceId) {
    return { type: SET_CAM, payload: deviceId };
  },
  setMicAvailiable(availiable) {
    return { type: SET_MIC_AVAILIABLE, payload: availiable };
  },
  setCamAvailiable(availiable) {
    return { type: SET_CAM_AVAILIABLE, payload: availiable };
  },
  setMicPermGranted(granted) {
    return { type: SET_MIC_PERM_GRANTED, payload: granted };
  },
  setCamPermGranted(granted) {
    return { type: SET_CAM_PERM_GRANTED, payload: granted };
  },
  setMicOptions(options) {
    return { type: SET_MIC_OPTIONS, payload: options };
  },
  setCamOptions(options) {
    return { type: SET_CAM_OPTIONS, payload: options };
  },
};

export { reducer, actions };
