const initState = {
  checkName: "",
  checkType: "all",
  lengthFilter: 0,
};

const SET_CONTENT_SEARCH_NAME = "layout/set_content_search_name";
const SET_CONTENT_SEARCH_TYPE = "layout/set_content_search_type";
const UPDATE_LENGTH_FILTER = "layout/update_length_filter";

function searchReducer(state = initState, action) {
  switch (action.type) {
    case SET_CONTENT_SEARCH_NAME:
      return {
        ...state,
        checkName: action.payload,
      };
    case SET_CONTENT_SEARCH_TYPE:
      return {
        ...state,
        checkType: action.payload,
      };
    case UPDATE_LENGTH_FILTER:
      return {
        ...state,
        lengthFilter: action.payload,
      };
    default:
      return state;
  }
}

const SearchActions = {
  setContentSearchName(content) {
    return { type: SET_CONTENT_SEARCH_NAME, payload: content };
  },
  setContentSearchType(content) {
    return { type: SET_CONTENT_SEARCH_TYPE, payload: content };
  },
  updateLengthFilter(length) {
    return { type: UPDATE_LENGTH_FILTER, payload: length };
  },
};

export { searchReducer, SearchActions };
