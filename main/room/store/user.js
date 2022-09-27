const initState = {
  avatarUrl: "",
  email: "",
  displayName: "",
  isModerator: false,
  isPined: false,
};

const SET_AVATAR_URL = "user/set_avatar_url";
const SET_EMAIL = "user/set_email";
const SET_DISPLAY_NAME = "user/set_display_name";
const SET_IS_MODERATOR = "user/set_is_moderator";
const SET_IS_PINED = "user/set_is_pined";

function userReducer(state = initState, action) {
  switch (action.type) {
    case SET_AVATAR_URL:
      return { ...state, avatarUrl: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_DISPLAY_NAME:
      return { ...state, displayName: action.payload };
    case SET_IS_MODERATOR:
      return { ...state, isModerator: action.payload };
    case SET_IS_PINED:
      return { ...state, pined: action.payload };
    default:
      return state;
  }
}

const UserActions = {
  setAvatarUrl(avatarUrl) {
    return { type: SET_AVATAR_URL, payload: avatarUrl };
  },
  setEmail(email) {
    return { type: SET_EMAIL, payload: email };
  },
  setDisplayName(displayName) {
    return { type: SET_DISPLAY_NAME, payload: displayName };
  },
  setModerator(isModerator) {
    return { type: SET_IS_MODERATOR, payload: isModerator };
  },
  setPined(pined) {
    return { type: SET_IS_PINED, payload: pined };
  },
};

export { userReducer, UserActions };
