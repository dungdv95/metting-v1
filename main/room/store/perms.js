const initState = {
  canShareAudio: true,
  canShareCam: true,
  canShareScreen: true,
  canRecord: true,
};

const SET_PERM_CAN_SHARE_AUDIO = "permissions/set_perm_can_share_audio";
const SET_PERM_CAN_SHARE_CAM = "permissions/set_perm_can_share_cam";
const SET_PERM_CAN_SHARE_SCREEN = "permissions/set_perm_can_share_screen";
const SET_PERM_CAN_RECORD = "permissions/set_perm_can_share_record";

function permsReducer(state = initState, action) {
  switch (action.type) {
    case SET_PERM_CAN_SHARE_AUDIO:
      return { ...state, canShareAudio: action.payload };
    case SET_PERM_CAN_SHARE_CAM:
      return { ...state, canShareCam: action.payload };
    case SET_PERM_CAN_SHARE_SCREEN:
      return { ...state, canShareScreen: action.payload };
    case SET_PERM_CAN_RECORD:
      return { ...state, canRecord: action.payload };
    default:
      return state;
  }
}

const PermActions = {
  setCanShareAudio(canShareAudio) {
    return { type: SET_PERM_CAN_SHARE_AUDIO, payload: canShareAudio };
  },
  setCanShareCam(canShareCam) {
    return { type: SET_PERM_CAN_SHARE_CAM, payload: canShareCam };
  },
  setCanShareScreen(canShareScreen) {
    return { type: SET_PERM_CAN_SHARE_SCREEN, payload: canShareScreen };
  },
  setCanRecord(canRecord) {
    return { type: SET_PERM_CAN_RECORD, payload: canRecord };
  },
};

export { permsReducer, PermActions };
