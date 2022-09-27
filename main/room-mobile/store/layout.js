import { createSelector } from "reselect";

const TAB_SIZE = 1025;

const initState = {
  showConnectionList: false,
  showRemoteviewList: true,
  showRoomInsideHeader: true,
  showChat: false,
  windowWidth: 0,
};

const SET_SHOW_CHAT = "layout/set_show_chat";
const SET_SHOW_CONNECTION_LIST = "layout/set_show_connection_list";
const SET_SHOW_REMOTEVIEW_LIST = "layout/set_show_remoteview_list";
const SET_SHOW_ROOM_INSIDE_HEADER = "layout/set_show_room_inside_header";
const SET_WINDOW_WIDTH = "layout/set_window_width";

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_WINDOW_WIDTH:
      return { ...state, windowWidth: action.payload };
    case SET_SHOW_CONNECTION_LIST:
      return { ...state, showConnectionList: action.payload };
    case SET_SHOW_REMOTEVIEW_LIST:
      return { ...state, showRemoteviewList: action.payload };
    case SET_SHOW_ROOM_INSIDE_HEADER:
      return { ...state, showRoomInsideHeader: action.payload };
    case SET_SHOW_CHAT:
      return { ...state, showChat: action.payload };
    default:
      return state;
  }
}

const actions = {
  setWindowWidth(width) {
    return { type: SET_WINDOW_WIDTH, payload: width };
  },
  setShowConnectionList(show) {
    return { type: SET_SHOW_CONNECTION_LIST, payload: show };
  },
  setShowRemoteviewList(show) {
    return { type: SET_SHOW_REMOTEVIEW_LIST, payload: show };
  },
  setShowRoomInsideHeade(show) {
    return { type: SET_SHOW_ROOM_INSIDE_HEADER, payload: show };
  },
  setShowChat(show) {
    return { type: SET_SHOW_CHAT, payload: show };
  },
};

const selectors = {
  isSmallWindow: createSelector(
    ({ layout }) => layout.windowWidth,
    (windowWidth) => windowWidth < TAB_SIZE
  ),
};

export { reducer, actions, selectors };
