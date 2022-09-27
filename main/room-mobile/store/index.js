import {
  reducer as layoutReducer,
  actions as layoutActions,
  selectors as layoutSelectors,
} from "main/room-mobile/store/layout";
import {
  reducer as userReducer,
  actions as userActions,
} from "main/room-mobile/store/user";
import {
  reducer as roomReducer,
  actions as roomActions,
} from "main/room-mobile/store/room";
import {
  reducer as deviceReducer,
  actions as deviceActions,
} from "main/room-mobile/store/device";
import {
  reducer as settingReducer,
  actions as settingActions,
} from "main/room-mobile/store/setting";
import {
  reducer as screensharingReducer,
  actions as screensharingActions,
} from "main/room-mobile/store/screensharing";
import {
  reducer as connectionReducer,
  actions as connectionActions,
} from "main/room-mobile/store/connections";
import {
  reducer as remoteviewReducer,
  actions as remoteviewActions,
} from "main/room-mobile/store/remoteview";
import {
  reducer as messageReducer,
  actions as messageActions,
} from "main/room-mobile/store/message";
import {
  reducer as spotlightReducer,
  actions as spotlightActions,
} from "main/room-mobile/store/spotlight";

function getRoomMobileModule() {
  return {
    id: "meeting-mobile",
    reducerMap: {
      user: userReducer,
      layout: layoutReducer,
      room: roomReducer,
      device: deviceReducer,
      setting: settingReducer,
      screensharing: screensharingReducer,
      connections: connectionReducer,
      remoteview: remoteviewReducer,
      message: messageReducer,
      spotlight: spotlightReducer,
    },
  };
}

const actions = {
  ...layoutActions,
  ...userActions,
  ...roomActions,
  ...deviceActions,
  ...settingActions,
  ...screensharingActions,
  ...connectionActions,
  ...remoteviewActions,
  ...messageActions,
  ...spotlightActions,
};

const selectors = { ...layoutSelectors };

export { getRoomMobileModule, actions, selectors };
