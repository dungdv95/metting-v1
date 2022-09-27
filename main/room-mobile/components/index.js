import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "main/room-mobile/store";

const DataOk = dynamic(() => import("main/room-mobile/components/DataOk"));
const FullscreenLoading = dynamic(() => import("main/room-mobile/components/FullscreenLoading"), { ssr: false })

function Index({ data }) {
  const dispatch = useDispatch();
  const ok = useSelector(({ room }) => room.dataOk);

  useEffect(() => {
    run();

    async function run() {
      dispatch(actions.setRoomBackUrl(data?.context?.user?.redirect_url));
      dispatch(actions.setAvatarUrl(data?.context?.user?.avatar));
      dispatch(actions.setEmail(data?.context?.user?.email));
      dispatch(actions.setDisplayName(data?.context?.user?.name));
      dispatch(actions.setRoomId(data?.context?.user?.room_code));
      dispatch(actions.setRoomName(data?.context?.user?.room_name));
      dispatch(actions.setInviteUrl(data?.context?.user?.url));
      dispatch(actions.setModerator(data?.moderator));

      const perms = await requestMediaPermissions();
      dispatch(actions.setMicPermGranted(perms.micPermGranted));
      dispatch(actions.setCamPermGranted(perms.camPermGranted));

      const { micOptions, camOptions } = await queryDevices();
      dispatch(actions.setMicOptions(micOptions));
      dispatch(actions.setCamOptions(camOptions));

      dispatch(actions.setDataOk());
    }
  }, [dispatch, data]);

  return (
    <>
      <Head>
        <title>MobiMeeting | Mobileaa</title>
      </Head>
      {ok ? <DataOk /> : <FullscreenLoading />}
    </>
  );
}

async function requestMediaPermissions() {
  let tempStream;
  const perms = { camPermGranted: false, micPermGranted: false };

  try {
    tempStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    perms.camPermGranted = true;
    perms.micPermGranted = true;
  } catch (error) {
    console.log("request media perms failed", error);
  } finally {
    if (tempStream) {
      tempStream.getTracks().forEach((t) => t.stop());
    }
    return perms
  }
}

async function queryDevices() {
  const micOptions = [];
  const camOptions = [];

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();

    for (const device of devices) {
      if (device.kind === "audioinput") {
        micOptions.push({ label: device.label, id: device.deviceId });
        continue;
      }

      if (device.kind === "videoinput") {
        camOptions.push({ label: device.label, id: device.deviceId });
        continue;
      }
    }
  } catch (error) {
    console.log("enumerate devices", error);
  } finally {
    return { micOptions, camOptions };
  }
}

export default Index;
