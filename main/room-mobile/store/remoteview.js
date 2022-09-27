const initState = {
  page: 1,
  pageSize: 4,
  remoteviews: [],
};

const REFRESH_REMOTE_VIEWS = "remoteviews/refresh";
const APPEND_REMOTEVIEW = "remoteviews/append";
const REMOVE_REMOTEVIEW = "remoteviews/remove";
const REMOTEVIEW_TURN_ON_CAM = "remoteviews/turn_on_cam";
const REMOTEVIEW_TURN_OFF_CAM = "remoteviews/turn_off_cam";

function reducer(state = initState, action) {
  switch (action.type) {
    case REFRESH_REMOTE_VIEWS:
      return { ...state, remoteviews: action.payload };
    case APPEND_REMOTEVIEW:
      return { ...state, remoteviews: [...state.remoteviews, action.payload] };
    case REMOVE_REMOTEVIEW:
      return {
        ...state,
        remoteviews: state.remoteviews.filter(
          (v) => v.ownerId !== action.payload
        ),
      };
    case REMOTEVIEW_TURN_ON_CAM:
      return {
        ...state,
        remoteviews: state.remoteviews.map((view) => {
          if (view.ownerId === action.payload.ownerId) {
            return {
              ...view,
              hasConsumer: true,
              consumerInfo: action.payload.consumerInfo,
            };
          }
          return view;
        }),
      };
    default:
      return state;
  }
}

const actions = {
  refreshRemoteViews(remoteviews) {
    return { type: REFRESH_REMOTE_VIEWS, payload: remoteviews };
  },
  appendRemoteView(remoteview) {
    return { type: APPEND_REMOTEVIEW, payload: remoteview };
  },
  removeRemoteView(ownerId) {
    return { type: REMOVE_REMOTEVIEW, payload: ownerId };
  },
  remoteViewTurnOnCam({ ownerId, consumerInfo }) {
    return {
      type: REMOTEVIEW_TURN_ON_CAM,
      payload: { ownerId, consumerInfo },
    };
  },
  remoteViewTurnOffCam(ownerId) {
    return { type: REMOTEVIEW_TURN_OFF_CAM, payload: ownerId };
  },
};

export { reducer, actions };
