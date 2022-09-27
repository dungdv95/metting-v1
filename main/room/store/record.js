const initState = {
  active: false,
};

const SET_RECORD_ACTIVE = "record/set_record_active";

function recordReducer(state = initState, action) {
  switch (action.type) {
    case SET_RECORD_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
}

const RecordActions = {
  setRecordActive(active) {
    return { type: SET_RECORD_ACTIVE, payload: active };
  },
};

export { recordReducer, RecordActions };
