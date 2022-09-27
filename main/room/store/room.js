const initState = {
  id: "",
  name: "",
  inviteUrl: "",
  password: "",
  joined: false,
  dataOk: false,
  backUrl: "",
  createdAt: "",
  backUrl: "",
  visibleConfirmLeaveRoom: false,
  visibleConfirmEndRoom: false,
  socketio: {
    connectionId: "",
  },
  mediasoup: {
    ready: false,
  },
  janus: {
    ready: false,
  },
  connectionsPending: {
    modePending: "start", // start || waiting || pending || result
    listRequestJoin: [],
  },
};

const SET_BACK_URL = "room/set_back_url";
const SET_ROOM_ID = "room/set_id";
const SET_ROOM_NAME = "room/set_room_name";
const SET_ROOM_PASSWORD = "room/set_room_password";
const SET_ROOM_CREATED_AT = "room/set_room_created_at";
const SET_DATA_OK = "room/set_data_ok";
const SET_JOINED = "room/set_joined";
const SET_IO_CONNECTION_ID = "room/set_io_connection_id";
const SET_JANUS_READY = "room/set_janus_ready";
const SET_MEDIASOUP_READY = "room/set_mediasoup_ready";
const SET_INVITE_URL = "room/set_invite_url";
const SET_ROOM_INFO_POPUP_VISIBLE = "room/set_room_info_popup_visible";
const VISIBLE_CONFIRM_LEAVE_ROOM = "room/visible_confirm_leave";
const SHOW_CONFIRM_END_ROOM = "room/show_confirm_end";
const HIDE_CONFIRM_END_ROOM = "room/hide_confirm_end";
const ADD_CONNECTION_PENDINNG = "room/add_connections_pending";
const REMOVE_CONNECTION_PENDINNG = "room/remove_connections_pending";
const SET_CONNECTIONS_PENDINNG = "room/set_connections_pending";
const CLEAR_LIST_REQUET_JOIN = "room/claer_list_request_join";

function roomReducer(state = initState, action) {
  switch (action.type) {
    case SET_ROOM_INFO_POPUP_VISIBLE:
      return { ...state, infoPopupVisible: action.payload };
    case SET_BACK_URL:
      return { ...state, backUrl: action.payload };
    case SET_ROOM_ID:
      return { ...state, id: action.payload };
    case SET_ROOM_NAME:
      return { ...state, name: action.payload };
    case SET_ROOM_PASSWORD:
      return { ...state, password: action.payload };
    case SET_DATA_OK:
      return { ...state, dataOk: true };
    case SET_JOINED:
      return { ...state, joined: true };
    case SET_IO_CONNECTION_ID:
      return {
        ...state,
        socketio: { ...state.socketio, connectionId: action.payload },
      };
    case SET_JANUS_READY:
      return { ...state, janus: { ready: action.payload } };
    case SET_ROOM_CREATED_AT:
      return { ...state, createdAt: action.payload };
    case SET_MEDIASOUP_READY:
      return { ...state, mediasoup: { ready: action.payload } };
    case SET_INVITE_URL:
      return { ...state, inviteUrl: action.payload };
    case VISIBLE_CONFIRM_LEAVE_ROOM:
      return {
        ...state,
        visibleConfirmLeaveRoom: action.payload,
      };
    case SHOW_CONFIRM_END_ROOM:
      return {
        ...state,
        visibleConfirmEndRoom: true,
        visibleConfirmLeaveRoom: false,
      };
    case HIDE_CONFIRM_END_ROOM:
      return {
        ...state,
        visibleConfirmEndRoom: false,
      };
    case ADD_CONNECTION_PENDINNG:
      const checkConnection =
        state.connectionsPending.listRequestJoin.findIndex(
          (x) => x.Email == action.payload.Email
        );
      if (checkConnection > -1) {
        return state;
      }
      return {
        ...state,
        connectionsPending: {
          ...state.connectionsPending,
          listRequestJoin: state.connectionsPending.listRequestJoin.concat(
            action.payload
          ),
        },
      };
    case REMOVE_CONNECTION_PENDINNG:
      return {
        ...state,
        connectionsPending: {
          ...state.connectionsPending,
          listRequestJoin: state.connectionsPending.listRequestJoin.filter(
            (c) => c.Email !== action.payload
          ),
        },
      };
    case SET_CONNECTIONS_PENDINNG:
      return {
        ...state,
        connectionsPending: {
          ...state.connectionsPending,
          listRequestJoin: action.payload,
        },
      };
    case CLEAR_LIST_REQUET_JOIN:
      return {
        ...state,
        connectionsPending: {
          listRequestJoin: [],
        },
      };
    default:
      return state;
  }
}

const RoomActions = {
  setBackUrl(url) {
    return { type: SET_BACK_URL, payload: url };
  },
  setRoomId(id) {
    return { type: SET_ROOM_ID, payload: id };
  },
  setRoomName(name) {
    return { type: SET_ROOM_NAME, payload: name };
  },
  setRoomPassword(password) {
    return { type: SET_ROOM_PASSWORD, payload: password };
  },
  setDataOk() {
    return { type: SET_DATA_OK };
  },
  setIoConnectionId(id) {
    return { type: SET_IO_CONNECTION_ID, payload: id };
  },
  setJoined() {
    return { type: SET_JOINED };
  },
  setJanusReady(ready) {
    return { type: SET_JANUS_READY, payload: ready };
  },
  setMediasoupReady(ready) {
    return { type: SET_MEDIASOUP_READY, payload: ready };
  },
  setInviteUrl(inviteUrl) {
    return { type: SET_INVITE_URL, payload: inviteUrl };
  },
  setRoomInfoPopupVisible(visible) {
    return { type: SET_ROOM_INFO_POPUP_VISIBLE, payload: visible };
  },
  setRoomCreatedAt(createdAt) {
    return { type: SET_ROOM_CREATED_AT, payload: createdAt };
  },
  setVisibleConfirmLeaveRoom(visible) {
    return { type: VISIBLE_CONFIRM_LEAVE_ROOM, payload: visible };
  },
  showVisibleConfirmEndRoom() {
    return { type: SHOW_CONFIRM_END_ROOM };
  },
  hideVisibleConfirmEndRoom() {
    return { type: HIDE_CONFIRM_END_ROOM };
  },
  addConnectionsPending(listRequestJoin) {
    return { type: ADD_CONNECTION_PENDINNG, payload: listRequestJoin };
  },
  removeConnectionsPending(email) {
    return { type: REMOVE_CONNECTION_PENDINNG, payload: email };
  },
  setConnectionsPending(connections) {
    return { type: SET_CONNECTIONS_PENDINNG, payload: connections };
  },
  setConnectionsPending(result) {
    return { type: SET_RESULT_REQUEST_JOIN_ROOM, payload: result };
  },
  clearListRequestJoin() {
    return { type: CLEAR_LIST_REQUET_JOIN };
  },
};

export { roomReducer, RoomActions };
