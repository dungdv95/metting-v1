const initState = {
  mbps: null,
};

const SET_NETWORK_MBPS = "network/set_mbps";

function networkReducer(state = initState, action) {
  switch (action.type) {
    case SET_NETWORK_MBPS:
      return { ...state, mbps: action.payload };
    default:
      return state;
  }
}

const NetworkActions = {
  setNetworkMbps(mbps) {
    return { type: SET_NETWORK_MBPS, payload: mbps };
  },
};

export { networkReducer, NetworkActions };
