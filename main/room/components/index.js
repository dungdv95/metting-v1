import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JwtDataLoaded from "main/room/components/JwtDataLoaded";
import { actions } from "main/room/store";
import { message } from "antd";

const FullscreenLoading = dynamic(() => import("main/room/components/FullscreenLoading"), { ssr: false })
const AudioSetting = dynamic(() => import("main/room/components/AudioSetting"));
const CamSetting = dynamic(() => import("main/room/components/CameraSetting"));
const BgSetting = dynamic(() => import("main/room/components/BgSetting"));

const ChangeName = dynamic(() =>
  import("main/room/components/DisplayNameSetting")
);

const PolicySetting = dynamic(() =>
  import("main/room/components/PolicySetting")
);

message.config({ maxCount: 2 });

function Index({ data }) {
  const dispatch = useDispatch();
  const ok = useSelector(({ room }) => room.dataOk);

  useEffect(() => {
    run()
      .catch(console.log)
      .finally(() => {
        dispatch(actions.setDataOk());
      });

    async function run() {
      dispatch(actions.setBackUrl(data?.context?.user?.redirect_url));
      dispatch(actions.setAvatarUrl(data?.context?.user?.avatar));
      dispatch(actions.setEmail(data?.context?.user?.email));
      dispatch(actions.setDisplayName(data?.context?.user?.name));
      dispatch(actions.setRoomId(data?.context?.user?.room_code));
      dispatch(actions.setRoomName(data?.context?.user?.room_name));
      dispatch(actions.setRoomPassword(data?.context?.user?.password));
      dispatch(actions.setInviteUrl(data?.context?.user?.url));
      dispatch(actions.setModerator(data?.moderator));

      if (data?.room_mode === "webinar") {
        if (!data?.moderator) {
          dispatch(actions.setCanShareAudio(false));
          dispatch(actions.setCanShareScreen(false));
          dispatch(actions.setCanShareCam(false));
        }
        dispatch(actions.setLayoutWebinar());
      }

      const testStream = await requestMediaPermissions();
      const status = await checkPermissions();

      if (
        status.osName === "iOS" ||
        status.osName == "Mac OS X" ||
        status.isFirefox
      ) {
        if (status.hasCamPerm) {
          dispatch(actions.setCamHasPerm(true));
        }
        if (status.hasMicPerm) {
          dispatch(actions.setMicHasPerm(true));
        }
      } else {
        navigator.permissions
          .query({ name: "microphone" })
          .then((perms) => {
            if (perms.state === "denied" || perms.state === "prompt") {
              dispatch(actions.setMicHasPerm(false));
            }

            if (perms.state === "granted") {
              dispatch(actions.setMicHasPerm(true));
            }

            perms.onchange = function () {
              if (perms.state === "denied" || perms.state === "prompt")
                dispatch(actions.setMicHasPerm(false));

              if (perms.state === "granted") {
                dispatch(actions.setMicHasPerm(true));
              }
            };
          })
          .catch(console.log);

        navigator.permissions
          .query({ name: "camera" })
          .then((perms) => {
            if (perms.state == "denied" || perms.state == "prompt") {
              dispatch(actions.setCamHasPerm(false));
            }

            if (perms.state == "granted") {
              dispatch(actions.setCamHasPerm(true));
            }

            perms.onchange = function () {
              if (perms.state == "denied" || perms.state == "prompt") {
                dispatch(actions.setCamHasPerm(false));
              }

              if (perms.state === "granted") {
                dispatch(actions.setCamHasPerm(true));
              }
            };
          })
          .catch(console.log);
      }

      if (status.hasCam) {
        dispatch(actions.setCamAvailiable(true));
      }

      if (status.hasMic) {
        dispatch(actions.setMicAvailiable(true));
      }

      if (status.hasSpeakers) {
        dispatch(actions.setSpeakerAvailiable(true));
      }

      if (status.osName) {
        dispatch(actions.setOsName(status.osName));
      }

      if (status.osVersion) {
        dispatch(actions.setOsVersion(status.osVersion));
      }

      if (status.browserName) {
        dispatch(actions.setBrowserName(status.browserName));
      }

      if (status.browserVersion) {
        dispatch(actions.setBrowserVersion(status.browserVersion));
      }

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("jwt", data.jwt);

        const bg = JSON.parse(localStorage.getItem("bg"));
        if (bg) {
          dispatch(actions.setBackgroundSetting(bg));
          dispatch(actions.setBackground(bg));
        }
      }

      if (testStream) {
        testStream.getTracks().forEach((t) => t.stop());
      }
    }
  }, [data, dispatch]);

  if (ok) {
    return (
      <>
        <Head>
          <title>MobiMeeting</title>
        </Head>
        <JwtDataLoaded />
        <BgSetting />
        <ChangeName />
        <CamSetting />
        <AudioSetting />
        <PolicySetting />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>MobiMeeting</title>
      </Head>
      <FullscreenLoading />
    </>
  );
}

async function requestMediaPermissions() {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function checkPermissions() {
  if (typeof document === "undefined") {
    return {};
  }

  const { default: DetectRTC } = await import("detectrtc");

  return new Promise((resolve) => {
    DetectRTC.load(() => {
      resolve({
        hasCam: DetectRTC.hasWebcam,
        hasMic: DetectRTC.hasMicrophone,
        hasSpeakers: DetectRTC.hasSpeakers,
        hasMicPerm: DetectRTC.isWebsiteHasMicrophonePermissions,
        hasCamPerm: DetectRTC.isWebsiteHasWebcamPermissions,
        isChrome: DetectRTC.browser.isChrome,
        isFirefox: DetectRTC.browser.isFirefox,
        isSafari: DetectRTC.browser.isSafari,
        isIE: DetectRTC.browser.isIE,
        isOpera: DetectRTC.browser.isOpera,
        isEdge: DetectRTC.browser.isEdge,
        isMobile: DetectRTC.isMobileDevice,
        osName: DetectRTC.osName,
        osVersion: DetectRTC.osVersion,
        browserName: DetectRTC.browser.name,
        browserVersion: DetectRTC.browser.version,
      });
    });
  });
}

export default Index;
