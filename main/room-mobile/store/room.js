const initState = {
  id: "",
  name: "",
  joined: false,
  dataOk: false,
  backUrl: "",
  inviteUrl: "",
  createdAt: "",
  socketio: {
    connectionId: "",
  },
  mediasoup: {
    ready: false,
  },
  janus: {
    ready: false,
  },
};

const SET_ROOM_ID = "room/set_id";
const SET_ROOM_NAME = "room/set_room_name";
const SET_ROOM_CREATED_AT = "room/set_room_created_at";
const SET_BACK_URL = "room/set_url";
const SET_JOINED = "room/set_joined";
const SET_DATA_OK = "room/set_data_ok";
const SET_INVITE_URL = "room/set_invite_url";
const SET_IO_CONNECTION_ID = "room/set_io_connection_id";
const SET_JANUS_READY = "room/set_janus_ready";
const SET_MEDIASOUP_READY = "room/set_mediasoup_ready";

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_ROOM_ID:
      return { ...state, id: action.payload };
    case SET_ROOM_NAME:
      return { ...state, name: action.payload };
    case SET_ROOM_CREATED_AT:
      return { ...state, createdAt: action.payload };
    case SET_BACK_URL:
      return { ...state, backUrl: action.payload };
    case SET_DATA_OK:
      return { ...state, dataOk: true };
    case SET_JOINED:
      return { ...state, joined: true };
    case SET_INVITE_URL:
      return { ...state, inviteUrl: action.payload };
    case SET_IO_CONNECTION_ID:
      return {
        ...state,
        socketio: { ...state.socketio, connectionId: action.payload },
      };
    case SET_JANUS_READY:
      return { ...state, janus: { ...state.janus, ready: true } };
    case SET_MEDIASOUP_READY:
      return { ...state, mediasoup: { ...state.mediasoup, ready: true } };
    default:
      return state;
  }
}

const actions = {
  setRoomId(roomId) {
    return { type: SET_ROOM_ID, payload: roomId };
  },
  setRoomName(roomName) {
    return { type: SET_ROOM_NAME, payload: roomName };
  },
  setRoomCreatedAt(createdAt) {
    return { type: SET_ROOM_CREATED_AT, payload: createdAt };
  },
  setRoomBackUrl(backUrl) {
    return { type: SET_BACK_URL, payload: backUrl };
  },
  setInviteUrl(inviteUrl) {
    return { type: SET_INVITE_URL, payload: inviteUrl };
  },
  setDataOk() {
    return { type: SET_DATA_OK };
  },
  setJoined() {
    return { type: SET_JOINED };
  },
  setIoConnectionId(connectionId) {
    return { type: SET_IO_CONNECTION_ID, payload: connectionId };
  },
  setJanusReady() {
    return { type: SET_JANUS_READY };
  },
  setMediasoupReady() {
    return { type: SET_MEDIASOUP_READY };
  },
};

export { reducer, actions };
