import { DynamicModuleLoader } from "redux-dynamic-modules";
import { getRoomModule } from "main/room/store";

import Content from "main/room/components/index";
import { version } from "configs";

function Index(props) {
  console.log("version: ", version);

  return (
    <DynamicModuleLoader modules={[getRoomModule()]}>
      <Content {...props} />
    </DynamicModuleLoader>
  );
}

export default Index;
