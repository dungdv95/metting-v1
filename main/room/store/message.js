import { UPDATE_DISPLAY_NAME } from "main/room/store/connections";

const initState = {
  messages: [], // {displayName: String, date: Date, from: String, content: String}
  unreadCount: 0,
  sendTo: {
    id: undefined, // ioConnectionId
    displayName: "Mọi người"
  },
  reactions: [],
  currentReaction: "/emoji/thumbs-up.png",
  contentMessage: "",
  atBottom: true
};

const APPEND_MESSAGE = "message/append_message";
const RESET_UNREAD_COUNT = "message/reset_unread_count";
const INC_ONT_UNREAD_COUNT = "message/inc_one_unread_count";
const SET_SEND_TO = "message/set_send_to";
const UNSET_SEND_TO = "message/unset_send_to";
const APPEND_REACTION = "message/append_reaction";
const REMOVE_REACTION = "message/remove_reaction";
const SET_CURRENT_REACTION = "message/set_current_reaction";
const SET_CONTENT_MESSAGE = "message/set_content_message"
const SET_CAT_BOTTOM = "message/set_at_bottom"
function messageReducer(state = initState, action) {
  switch (action.type) {
    case APPEND_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case RESET_UNREAD_COUNT:
      return { ...state, unreadCount: 0 };
    case INC_ONT_UNREAD_COUNT: {
      return { ...state, unreadCount: state.unreadCount + 1 };
    }
    case SET_SEND_TO: {
      return { ...state, sendTo: action.payload };
    }
    case UNSET_SEND_TO: {
      return {
        ...state,
        sendTo: {
          id: undefined, // ioConnectionId
          displayName: "Mọi người"
        }
      };
    }
    case UPDATE_DISPLAY_NAME: {
      var messageUpdate = state.messages.map((v) => {
        return (v.from === action.payload.connectionId ? { ...v, displayName: action.payload.displayName } : v)
      })
      return {
        ...state, messages: messageUpdate
      };
    }
    case APPEND_REACTION:
      return { ...state, reactions: [...state.reactions, action.payload] };
    case REMOVE_REACTION:
      return { ...state, reactions: [...state.reactions.slice(1, state.reactions.length)] };
    case SET_CURRENT_REACTION:
      return { ...state, reactions: [...state.reactions, action.payload], currentReaction: action.payload.content };
    case SET_CONTENT_MESSAGE:
      return { ...state, contentMessage: action.payload };
    case SET_CAT_BOTTOM:
      return { ...state, atBottom: action.payload };
    default:
      return state;
  }
}

const MessageActions = {
  appendMessage(msg) {
    return { type: APPEND_MESSAGE, payload: msg };
  },
  resetUnreadCount() {
    return { type: RESET_UNREAD_COUNT };
  },
  incUnreacCountOne() {
    return { type: INC_ONT_UNREAD_COUNT };
  },
  setSendTo(ioConnectionId) {
    return { type: SET_SEND_TO, payload: ioConnectionId };
  },
  unsetSendTo() {
    return { type: UNSET_SEND_TO };
  },
  appendReaction({ content, style, id }) {
    return { type: APPEND_REACTION, payload: { content, style, id } };
  },
  removeReaction() {
    return { type: REMOVE_REACTION };
  },
  setCurrentReaction({ content, style, id }) {
    return { type: SET_CURRENT_REACTION, payload: { content, style, id } };
  },
  setContentMessage(content) {
    return { type: SET_CONTENT_MESSAGE, payload: content };
  },
  setAtBottom(content) {
    return { type: SET_CAT_BOTTOM, payload: content };
  },
};

export { messageReducer, MessageActions };
