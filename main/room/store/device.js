import { createSelector } from "reselect";

const initState = {
  browserName: "",
  browserVersion: "",
  osName: "",
  osVersion: "",
  mic: {
    enable: false,
    current: "",
    availiable: false,
    hasPerm: false,
  },
  micSetting: {
    visible: false,
    options: [],
  },
  cam: {
    enable: false,
    current: "",
    bg: {
      current: "off", // "off" | <bg-image-name.(png,jpg)>
    },
    availiable: false,
    hasPerm: false,
  },
  camSetting: {
    visible: false,
    current: "",
    options: [],
  },
  bgSetting: {
    visible: false,
    current: "off", // "off" | <bg-image-name.(png,jpg)>
    options: [],
    visibleImport: false,
    loading: false,
  },
  speaker: {
    current: "",
    availiable: false,
  },
  speakerSetting: {
    current: "",
    options: [],
  },
};

const SET_MIC_ENABLE = "device/set_mic_enable";
const SET_CAM_ENABLE = "device/set_cam_enable";
const SET_BACKGROUND = "device/set_background";
const SET_BACKGROUND_SETTING = "device/set_background_setting";
const TOGGLE_MIC_ENABLE = "device/toggle_mic_enable";
const TOGGLE_CAM_ENABLE = "device/toggle_cam_enable";
const SHOW_MIC_SETTING = "device/show_mic_setting";
const SHOW_CAM_SETTING = "device/show_cam_setting";
const SHOW_BG_SETTING = "device/show_bg_setting";
const HIDE_MIC_SETTING = "device/hide_mic_setting";
const HIDE_CAM_SETTING = "device/hide_cam_setting";
const HIDE_BG_SETTING = "device/hide_bg_setting";
const SET_MIC_OPTIONS = "device/set_mic_options";
const SET_CAM_OPTIONS = "device/set_cam_options";
const SET_SPEAKER_OPTIONS = "device/set_speaker_options";
const SET_MIC = "device/set_mic";
const SET_CAM = "device/set_cam";
const SET_CAM_SETTING = "device/set_cam_setting";
const SET_MIC_SETTING = "device/set_mic_setting";
const SET_SPEAKER = "device/set_speaker";
const SET_BROWSER_NAME = "device/set_browser_name";
const SET_BROWSER_VERSION = "device/set_browser_version";
const SET_OS_NAME = "device/set_os_name";
const SET_OS_VERSION = "device/set_os_version";
const SET_MIC_AVAILIABLE = "device/set_mic_availiable";
const SET_MIC_HAS_PERM = "device/set_mic_has_perm";
const SET_CAM_AVAILIABLE = "device/set_cam_availiable";
const SET_CAM_HAS_PERM = "device/set_cam_has_perm";
const SET_SPEAKER_AVAILIABLE = "device/set_speaker_availiable";
const SHOW_IMPORT_BG_SETTING = "device/show_import_bg_setting";
const HIDE_IMPORT_BG_SETTING = "device/hide_import_bg_setting";
const IMPORT_BACKGROUND_SETTING = "device/import_background_setting";
const DELETE_IMPORT_BACKGROUND_SETTING =
  "device/delete_import_background_setting";
const SET_BG_SETTING_LOADING = "device/set_bg_setting_loading";

function deviceReducer(state = initState, action) {
  switch (action.type) {
    case SET_BROWSER_NAME:
      return { ...state, browserName: action.payload };
    case SET_BROWSER_VERSION:
      return { ...state, browserVersion: action.payload };
    case SET_OS_NAME:
      return { ...state, osName: action.payload };
    case SET_OS_VERSION:
      return { ...state, osVersion: action.payload };
    case SET_MIC_AVAILIABLE:
      return { ...state, mic: { ...state.mic, availiable: action.payload } };
    case SET_MIC_HAS_PERM:
      return { ...state, mic: { ...state.mic, hasPerm: action.payload } };
    case SET_CAM_AVAILIABLE:
      return { ...state, cam: { ...state.cam, availiable: action.payload } };
    case SET_CAM_HAS_PERM:
      return { ...state, cam: { ...state.cam, hasPerm: action.payload } };
    case SET_SPEAKER_AVAILIABLE:
      return {
        ...state,
        speaker: { ...state.speaker, availiable: action.payload },
      };
    case SET_MIC_ENABLE:
      return { ...state, mic: { ...state.mic, enable: action.payload } };
    case SET_CAM_ENABLE:
      return { ...state, cam: { ...state.cam, enable: action.payload } };
    case TOGGLE_MIC_ENABLE:
      return { ...state, mic: { ...state.mic, enable: !state.mic.enable } };
    case TOGGLE_CAM_ENABLE:
      return { ...state, cam: { ...state.cam, enable: !state.cam.enable } };
    case SET_BACKGROUND:
      let checkBgInput = state.bgSetting.options.findIndex(
        (x) => x == action.payload
      );
      if (checkBgInput == -1) {
        localStorage.setItem("bg", JSON.stringify(action.payload));
      }
      return {
        ...state,
        cam: { ...state.cam, bg: { ...state.bg, current: action.payload } },
        bgSetting: { ...state.bgSetting, visible: false },
      };
    case SET_BACKGROUND_SETTING:
      return {
        ...state,
        bgSetting: { ...state.bgSetting, current: action.payload },
      };
    case SHOW_MIC_SETTING:
      return { ...state, micSetting: { ...state.micSetting, visible: true } };
    case SHOW_CAM_SETTING:
      return { ...state, camSetting: { ...state.camSetting, visible: true } };
    case SHOW_BG_SETTING:
      return { ...state, bgSetting: { ...state.bgSetting, visible: true } };
    case HIDE_MIC_SETTING:
      return { ...state, micSetting: { ...state.micSetting, visible: false } };
    case HIDE_CAM_SETTING:
      return { ...state, camSetting: { ...state.camSetting, visible: false } };
    case HIDE_BG_SETTING:
      return { ...state, bgSetting: { ...state.bgSetting, visible: false } };
    case SET_MIC_OPTIONS:
      return {
        ...state,
        micSetting: { ...state.micSetting, options: action.payload },
      };
    case SET_CAM_OPTIONS:
      return {
        ...state,
        camSetting: { ...state.camSetting, options: action.payload },
      };
    case SET_SPEAKER_OPTIONS:
      return {
        ...state,
        speakerSetting: { ...state.speakerSetting, options: action.payload },
      };
    case SET_MIC:
      return { ...state, mic: { ...state.mic, current: action.payload } };
    case SET_CAM:
      return { ...state, cam: { ...state.cam, current: action.payload } };
    case SET_CAM_SETTING:
      return {
        ...state,
        camSetting: { ...state.camSetting, current: action.payload },
      };
    case SET_MIC_SETTING:
      return {
        ...state,
        micSetting: { ...state.micSetting, current: action.payload },
      };
    case SET_SPEAKER:
      return {
        ...state,
        speaker: { ...state.speaker, current: action.payload },
      };
    case SET_BACKGROUND:
      return {
        ...state,
        cam: { ...state.cam, bg: action.payload },
        bgSetting: { ...state.bgSetting, visible: false },
      };
    case IMPORT_BACKGROUND_SETTING:
      return {
        ...state,
        bgSetting: { ...state.bgSetting, options: action.payload },
      };
    case DELETE_IMPORT_BACKGROUND_SETTING:
      const check = state.bgSetting.options.findIndex(
        (x) => x === action.payload
      );
      return {
        ...state,
        bgSetting: {
          ...state.bgSetting,
          options: [
            ...state.bgSetting.options.slice(0, check),
            ...state.bgSetting.options.slice(check + 1),
          ],
        },
      };
    case SHOW_IMPORT_BG_SETTING:
      return {
        ...state,
        bgSetting: { ...state.bgSetting, visibleImport: true },
      };
    case HIDE_IMPORT_BG_SETTING:
      return {
        ...state,
        bgSetting: { ...state.bgSetting, visibleImport: false },
      };
    case SET_BG_SETTING_LOADING:
      return {
        ...state,
        bgSetting: { ...state.bgSetting, loading: action.payload },
      };
    default:
      return state;
  }
}

const DeviceActions = {
  setBrowserName(browserName) {
    return { type: SET_BROWSER_NAME, payload: browserName };
  },
  setBrowserVersion(version) {
    return { type: SET_BROWSER_VERSION, payload: version };
  },
  setOsName(osName) {
    return { type: SET_OS_NAME, payload: osName };
  },
  setOsVersion(osVersion) {
    return { type: SET_OS_VERSION, payload: osVersion };
  },
  setMicAvailiable(availiable) {
    return { type: SET_MIC_AVAILIABLE, payload: availiable };
  },
  setCamAvailiable(availiable) {
    return { type: SET_CAM_AVAILIABLE, payload: availiable };
  },
  setSpeakerAvailiable(availiable) {
    return { type: SET_SPEAKER_AVAILIABLE, payload: availiable };
  },
  setMicHasPerm(hasPerm) {
    return { type: SET_MIC_HAS_PERM, payload: hasPerm };
  },
  setCamHasPerm(hasPerm) {
    return { type: SET_CAM_HAS_PERM, payload: hasPerm };
  },
  setMicEnable(enable) {
    return { type: SET_MIC_ENABLE, payload: enable };
  },
  setCamEnable(enable) {
    return { type: SET_CAM_ENABLE, payload: enable };
  },
  toggleMicEnable() {
    return { type: TOGGLE_MIC_ENABLE };
  },
  toggleCamEnable() {
    return { type: TOGGLE_CAM_ENABLE };
  },
  showMicSetting() {
    return { type: SHOW_MIC_SETTING };
  },
  showCamSetting() {
    return { type: SHOW_CAM_SETTING };
  },
  showBgSetting() {
    return { type: SHOW_BG_SETTING };
  },
  hideMicSetting() {
    return { type: HIDE_MIC_SETTING };
  },
  hideCamSetting() {
    return { type: HIDE_CAM_SETTING };
  },
  hideBgSetting() {
    return { type: HIDE_BG_SETTING };
  },
  setMicOptions(options) {
    return { type: SET_MIC_OPTIONS, payload: options };
  },
  setCamOptions(options) {
    return { type: SET_CAM_OPTIONS, payload: options };
  },
  setSpeakerOptions(options) {
    return { type: SET_SPEAKER_OPTIONS, payload: options };
  },
  setMic(id) {
    return { type: SET_MIC, payload: id };
  },
  setMicSetting(id) {
    return { type: SET_MIC_SETTING, payload: id };
  },
  setCam(id) {
    return { type: SET_CAM, payload: id };
  },
  setCamSetting(id) {
    return { type: SET_CAM_SETTING, payload: id };
  },
  setSpeaker(id) {
    return { type: SET_SPEAKER, payload: id };
  },
  setBackground(name) {
    return { type: SET_BACKGROUND, payload: name };
  },
  setBackgroundSetting(name) {
    return { type: SET_BACKGROUND_SETTING, payload: name };
  },
  importBackgroundSetting(name) {
    return { type: IMPORT_BACKGROUND_SETTING, payload: name };
  },
  deleteImportBackgroundSetting(name) {
    return { type: DELETE_IMPORT_BACKGROUND_SETTING, payload: name };
  },
  showImportBG() {
    return { type: SHOW_IMPORT_BG_SETTING };
  },
  hideImportBG() {
    return { type: HIDE_IMPORT_BG_SETTING };
  },
  setBgSettingLoading(loading) {
    return { type: SET_BG_SETTING_LOADING, payload: loading };
  },
};

const DeviceSelectors = {
  camAvailiable: createSelector(
    ({ device }) => device.camSetting.options,
    (options) => options.length > 0
  ),
  micAvailiable: createSelector(
    ({ device }) => device.micSetting.options,
    (options) => options.length > 0
  ),
};

export { deviceReducer, DeviceActions, DeviceSelectors };
