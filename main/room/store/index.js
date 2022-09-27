import { userReducer, UserActions } from "main/room/store/user";
import { roomReducer, RoomActions } from "main/room/store/room";
import {
  deviceReducer,
  DeviceActions,
  DeviceSelectors,
} from "main/room/store/device";
import {
  screensharingReducer,
  ScreenSharingActions,
} from "main/room/store/screensharing";
import {
  connectionReducer,
  ConnectionActions,
} from "main/room/store/connections";
import {
  remoteviewReducer,
  RemoteViewActions,
} from "main/room/store/remoteviews";
import { layoutReducer, LayoutActions } from "main/room/store/layout";
import { permsReducer, PermActions } from "main/room/store/perms";
import { messageReducer, MessageActions } from "main/room/store/message";
import { recordReducer, RecordActions } from "main/room/store/record";
import { tutorialReducer, TutorialgActions } from "main/room/store/tutorial";
import { spotlightReducer, SpotlightActions } from "main/room/store/spotlight";
import { searchReducer, SearchActions } from "main/room/store/connectionsearch";
import { networkReducer, NetworkActions } from "main/room/store/network";
import { viewinfoReducer, ViewInfoActions } from "main/room/store/viewinfo";
import { settingReducer, SettingActions } from "main/room/store/setting";
import {
  requestjoinReducer,
  RequestJoinActions,
} from "main/room/store/requestjoin";

function getRoomModule() {
  return {
    id: "meeting",
    reducerMap: {
      user: userReducer,
      room: roomReducer,
      setting: settingReducer,
      device: deviceReducer,
      screensharing: screensharingReducer,
      connections: connectionReducer,
      remoteviews: remoteviewReducer,
      layout: layoutReducer,
      perms: permsReducer,
      message: messageReducer,
      record: recordReducer,
      tutorial: tutorialReducer,
      spotlight: spotlightReducer,
      search: searchReducer,
      network: networkReducer,
      viewinfo: viewinfoReducer,
      requestjoin: requestjoinReducer,
    },
  };
}

const actions = {
  ...UserActions,
  ...RoomActions,
  ...DeviceActions,
  ...ScreenSharingActions,
  ...ConnectionActions,
  ...RemoteViewActions,
  ...LayoutActions,
  ...PermActions,
  ...MessageActions,
  ...RecordActions,
  ...TutorialgActions,
  ...SpotlightActions,
  ...SearchActions,
  ...NetworkActions,
  ...ViewInfoActions,
  ...SettingActions,
  ...RequestJoinActions,
};

const selectors = {
  ...DeviceSelectors,
};

export { getRoomModule, actions, selectors };
