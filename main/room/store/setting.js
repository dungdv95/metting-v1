const initState = {
  displayName: {
    visible: false,
    current: "",
    connectionId: "",
  },
  policy: {
    visible: false,
    requireApproveToJoin: false,
  },
};

const HIDE_DISPLAYNAME = "setting/hide_displayname";
const SHOW_DISPLAYNAME = "setting/show_displayname";
const SET_CURRENT_DISPLAYNAME = "setting/set_current_displayname";
const HIDE_POLICY = "setting/hide_policy";
const SHOW_POLICY = "setting/show_policy";
const SET_POLICY_REQUIRE_APPROVE_TO_JOIN = "setting/set_policy_private";

function settingReducer(state = initState, action) {
  switch (action.type) {
    case HIDE_DISPLAYNAME:
      return {
        ...state,
        displayName: { ...state.displayName, visible: false },
      };
    case SHOW_DISPLAYNAME:
      return {
        ...state,
        displayName: {
          ...state.displayName,
          visible: true,
          current: action.payload.displayName,
          connectionId: action.payload.ioConnectionId,
        },
      };
    case SET_CURRENT_DISPLAYNAME:
      return {
        ...state,
        displayName: {
          ...state.displayName,
          current: action.payload,
        },
      };
    case HIDE_POLICY:
      return {
        ...state,
        policy: {
          ...state.policy,
          visible: false,
        },
      };
    case SHOW_POLICY:
      return {
        ...state,
        policy: {
          ...state.policy,
          visible: true,
        },
      };
    case SET_POLICY_REQUIRE_APPROVE_TO_JOIN:
      return {
        ...state,
        policy: {
          ...state.policy,
          requireApproveToJoin: action.payload,
        },
      };
    default:
      return state;
  }
}

const SettingActions = {
  hideSettingDisplayName() {
    return { type: HIDE_DISPLAYNAME };
  },
  showSettingDisplayName({ ioConnectionId, displayName }) {
    return {
      type: SHOW_DISPLAYNAME,
      payload: { ioConnectionId, displayName },
    };
  },
  setSettingDisplayNameCurrent(displayName) {
    return { type: SET_CURRENT_DISPLAYNAME, payload: displayName };
  },
  showSettingPolicy() {
    return { type: SHOW_POLICY };
  },
  hideSettingPolicy() {
    return { type: HIDE_POLICY };
  },
  setSettingPolicyRequireApproveToJoin(policyPrivate) {
    return { type: SET_POLICY_REQUIRE_APPROVE_TO_JOIN, payload: policyPrivate };
  },
};

export { settingReducer, SettingActions };
