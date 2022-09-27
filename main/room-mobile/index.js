import Head from "next/head";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import { getRoomMobileModule } from "main/room-mobile/store";
import RoomMobile from "main/room-mobile/components";

function Home({ data }) {
  return (
    <DynamicModuleLoader modules={[getRoomMobileModule()]}>
      <Head>
        <title>Meeting | Mobile</title>
      </Head>
      <RoomMobile data={data} />
    </DynamicModuleLoader>
  );
}

export default Home;
