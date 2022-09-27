import { createStore } from "redux-dynamic-modules";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { getThunkExtension } from "redux-dynamic-modules-thunk";

const store = createStore({
  advancedComposeEnhancers: composeWithDevTools({
    maxAge: 500,
  }),
  extensions: [getThunkExtension()],
});

export default store;
