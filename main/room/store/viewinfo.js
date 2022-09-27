const initState = {
  visible: false,
  connId: "",
  consumerId: "",
  displayName: "",
  resolution: null,
};

const HIDE_VIEW_INFO = "viewinfo/hide";
const SHOW_VIEW_INFO = "viewinfo/show";

function viewinfoReducer(state = initState, action) {
  switch (action.type) {
    case HIDE_VIEW_INFO:
      return {
        visible: false,
        connId: "",
        consumerId: "",
        displayName: "",
        resolution: null,
      };
    case SHOW_VIEW_INFO:
      return {
        ...state,
        visible: true,
        connId: action.payload.connId,
        consumerId: action.payload.consumerId,
        displayName: action.payload.displayName,
        resolution: action.payload.resolution,
      };
    default:
      return state;
  }
}

const ViewInfoActions = {
  hideViewInfo() {
    return { type: HIDE_VIEW_INFO };
  },
  showViewInfo({ connId, consumerId, displayName, resolution }) {
    return {
      type: SHOW_VIEW_INFO,
      payload: { connId, consumerId, displayName, resolution },
    };
  },
};

export { viewinfoReducer, ViewInfoActions };
