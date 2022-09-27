const initState = {
  status: "idle", // idle || waiting || rejected
  requestjoins: [],
};

const SET_REQUESTJOIN_STATUS = "requestjoin/set_status";
const SET_REQUESTJOINS = "requestjoin/set";
const APPEND_REQUESTJOIN = "requestjoin/append";
const REMOVE_REQUESTJOIN = "requestjoin/remove";

function requestjoinReducer(state = initState, action) {
  switch (action.type) {
    case SET_REQUESTJOIN_STATUS:
      return { ...state, status: action.payload };
    case SET_REQUESTJOINS:
      return { ...state, requestjoins: action.payload };
    case APPEND_REQUESTJOIN:
      return {
        ...state,
        requestjoins: [...state.requestjoins, action.payload],
      };
    case REMOVE_REQUESTJOIN:
      return {
        ...state,
        requestjoins: state.requestjoins.filter(
          (r) => r.email !== action.payload
        ),
      };
    default:
      return state;
  }
}

const RequestJoinActions = {
  setRequestJoinStatusWaiting() {
    return { type: SET_REQUESTJOIN_STATUS, payload: "waiting" };
  },
  setRequestJoinStatusRejected() {
    return { type: SET_REQUESTJOIN_STATUS, payload: "rejected" };
  },
  setRequestJoins(requestjoins) {
    return { type: SET_REQUESTJOINS, payload: requestjoins };
  },
  appendRequestJoin(requestjoin) {
    return { type: APPEND_REQUESTJOIN, payload: requestjoin };
  },
  removeRequestJoin(email) {
    return { type: REMOVE_REQUESTJOIN, payload: email };
  },
};

export { requestjoinReducer, RequestJoinActions };
