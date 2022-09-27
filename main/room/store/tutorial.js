const initState = {
  mode: "device", // "off" | "local" | "remote"
  visible: false,
};

const SET_VISIBLE_TUTORIAL = "tutorial/set_visiable_tutorial";
const SET_VISIBLE_TUTORIAL_RECORD = "tutorial/set_visiable_tutorial_record";


function tutorialReducer(state = initState, action) {
  switch (action.type) {
    case SET_VISIBLE_TUTORIAL:
      return {
        ...action.payload
      };
    case SET_VISIBLE_TUTORIAL_RECORD:
      return {
        ...state,
        mode: "record",
        visible: action.payload
      };
    default:
      return state;
  }
}

const TutorialgActions = {
  setVisibleTutorial(visible) {
    return { type: SET_VISIBLE_TUTORIAL, payload: visible };
  },

};

export { tutorialReducer, TutorialgActions };
