import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { ActionSheet, Button, Divider, Ellipsis, Grid, Popover, SearchBar, TabBar } from "antd-mobile";
import { Fragment } from "react";
import { LeftOutline, InformationCircleOutline } from "antd-mobile-icons";
import { useDispatch, useSelector } from "react-redux";

import Preview from "main/room-mobile/components/Prejoin/Preview";
import JoinButton from "main/room-mobile/components/Prejoin/JoinButton";
import { actions } from "main/room-mobile/store";
import style from "main/room-mobile/components/Prejoin/styles.module.css";
import { BsFillMicMuteFill, BsCameraVideoOffFill, BsImageFill, BsFillMicFill, BsCameraVideoFill } from "react-icons/bs";
import { MdKeyboardArrowUp, MdPerson } from "react-icons/md";
import SettingAudio from "./SettingAudio";
import SettingCamera from "./SettingCamera";
import SettingBackground from "./SettingBackground";
import InformationMetting from "./InformationMetting";

const actionCam = [
  { key: 'cam1', text: 'Camera 1' },
  { key: 'cam2', text: 'Camera 2' },
  { key: 'cam3', text: 'Camera 3' }
]

function Prejoin() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("user");
  const [cameraSetting, setCameraSetting] = useState(false);
  const [audioSetting, setAudioSetting] = useState(false);
  const [bgroundSetting, setBgroundSetting] = useState(false);
  const [inforMetting, setInforMetting] = useState(false);
  const displayname = useSelector(({ user }) => user.displayName);
  const audioVisible = useSelector(({ device }) => device?.mic?.enable);
  const cameraVisible = useSelector(({ device }) => device?.cam?.enable);

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      'data-prefers-color-scheme',
      'dark'
    )
  }, [])

  const changeDisplayName = (e) => {
    dispatch(actions.setDisplayName(e.target.value));
  }

  const joinMetting = () => {
    console.log("join")
  }

  const handleMic = () => {
    dispatch(actions.setMicEnable(!audioVisible));
  }

  const hanleCamera = () => {
    dispatch(actions.setCamEnable(!cameraVisible));
  }

  return (
    <Fragment>
      <div className={`${style.prejoin_content} flex flex-col h-screen w-full`}>
        <Grid columns={10} className={`2xl:h-28 xl:h-24 lg:h-24 md:h-20 sm:h-20 tn:h-16 pn:h-16 zr:h-16`}>
          <Grid.Item span={1} className={`flex items-center justify-center`}>
            <LeftOutline className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl tn:text-2xl pn:text-2xl zr:text-xl`} />
          </Grid.Item>
          <Grid.Item span={8} className={`flex items-center justify-center`}>
            <Ellipsis className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl tn:text-2xl pn:text-2xl zr:text-xl`} direction='end' content="MobiFone Meetting V3" />
          </Grid.Item>
          <Grid.Item className={`flex items-center justify-center`} span={1} >
            <InformationCircleOutline onClick={() => setInforMetting(true)} className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl tn:text-2xl pn:text-2xl zr:text-xl`} />
          </Grid.Item>
        </Grid>
        <Grid columns={20}
          className={`2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-20 tn:px-16 pn:px-14 zr:px-12 
          2xl:py-6 xl:py-6 lg:py-6 md:py-6 sm:py-6 tn:py-6 pn:py-4 zr:py-3 
          2xl:h-2/3 xl:h-2/3 lg:h-2/3 md:h-2/3 sm:h-2/3 tn:h-2/3 pn:h-1/2 zr:h-1/2`}
        >
          <Grid.Item span={20} className={`relative`}>
            <Preview />
          </Grid.Item>
        </Grid>
        <Grid columns={9} className={`h-32 mb-6 2xl:px-16 xl:px-16 lg:px-16 md:px-16 sm:px-16 tn:px-12 pn:px-12 zr:px-12`}>
          <Grid.Item span={3} className={`flex items-center justify-center`} >
            <div className={`flex flex-col items-center justify-center border-2 border-slate-500 rounded-lg bg-zinc-600 w-11/12
              2xl:p-2.5 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 tn:p-2.5 pn:p-2 zr:p-2
              2xl:h-full xl:h-full lg:h-full md:h-full sm:h-full tn:h-full pn:h-5/6 zr:h-5/6`}>
              <span className={`2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-xl tn:text-lg pn:text-sm zr:text-xs pb-4`}>
                Audio
              </span>
              <div className={`flex w-full`}>
                <div className="flex flex-1 items-center justify-center">
                  {audioVisible ?
                    <BsFillMicFill onClick={handleMic} className={`2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl tn:text-xl pn:text-lg zr:text-base`} />
                    :
                    <BsFillMicMuteFill onClick={handleMic} className={`2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl tn:text-xl pn:text-lg zr:text-base`} />
                  }
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <Divider direction='vertical' className={style.h_full_devider} />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <MdKeyboardArrowUp onClick={() => setAudioSetting(true)} className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl tn:text-2xl pn:text-2xl zr:text-xl`} />
                </div>
              </div>
            </div>
          </Grid.Item>
          <Grid.Item span={3} className={`flex items-center justify-center`} >
            <div className={`h-full flex flex-col items-center justify-center border-2 border-slate-500 rounded-lg bg-zinc-600 w-11/12
            2xl:p-2.5 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 tn:p-2.5 pn:p-2 zr:p-2
            2xl:h-full xl:h-full lg:h-full md:h-full sm:h-full tn:h-full pn:h-5/6 zr:h-5/6`}>
              <span className={`2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-xl tn:text-lg pn:text-sm zr:text-xs pb-4`}>
                Camera
              </span>
              <div className={`flex w-full`}>
                <div className="flex flex-1 items-center justify-center">
                  {cameraVisible ?
                    <BsCameraVideoFill onClick={hanleCamera} className={`2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl tn:text-xl pn:text-lg zr:text-base`} />
                    :
                    <BsCameraVideoOffFill onClick={hanleCamera} className={`2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl tn:text-xl pn:text-lg zr:text-base`} />
                  }

                </div>
                <div className="flex flex-1 items-center justify-center">
                  <Divider direction='vertical' className={style.h_full_devider} />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <MdKeyboardArrowUp onClick={() => setCameraSetting(true)} className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl tn:text-2xl pn:text-2xl zr:text-xl`} />
                </div>
              </div>
            </div>
          </Grid.Item>
          <Grid.Item span={3} className={`flex items-center justify-center`} >
            <div className={`h-full flex flex-col items-center justify-center border-2 border-slate-500 rounded-lg bg-zinc-600 w-11/12
            2xl:p-2.5 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 tn:p-2.5 pn:p-2 zr:p-2
            2xl:h-full xl:h-full lg:h-full md:h-full sm:h-full tn:h-full pn:h-5/6 zr:h-5/6`}>
              <span className={`2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-xl tn:text-lg pn:text-sm zr:text-xs pb-4`}>
                Background
              </span>
              <div className={`flex w-full`}>
                <div className="flex flex-1 items-center justify-center">
                  <BsImageFill className={`2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl tn:text-xl pn:text-lg zr:text-base`} />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <Divider direction='vertical' className={style.h_full_devider} />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <MdKeyboardArrowUp onClick={() => setBgroundSetting(true)} className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl tn:text-2xl pn:text-2xl zr:text-xl`} />
                </div>
              </div>
            </div>
          </Grid.Item>
        </Grid>
        <Grid columns={20} className={`h-16 mb-6 2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-20 tn:px-16 pn:px-14 zr:px-14`}>
          <Grid.Item span={20}>
            <input
              value={displayname}
              onChange={changeDisplayName}
              type="text"
              className="h-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5
              2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-xl tn:text-xl pn:text-lg zr:text-lg
              2xl:pl-10 xl:pl-10 lg:pl-10 md:pl-10 sm:pl-10 tn:pl-8 pn:pl-8 zr:pl-8"
              placeholder="Tên của bạn"
            />
          </Grid.Item>
        </Grid>
        <Grid columns={20} className={`h-16 mb-3 2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-20 tn:px-16 pn:px-14 zr:px-14`}>
          <Grid.Item span={20}>
            <button
              onClick={joinMetting}
              type="button"
              disabled={!displayname ? true : false}
              className="h-full w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 font-medium rounded-lg px-5 py-2.5 text-center
              2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-xl tn:text-xl pn:text-lg zr:text-lg"
            >Tham gia</button>
          </Grid.Item>
        </Grid>
      </div>



      {/* <div className={style.header_custom}>
        <Grid columns={20} className={style.grid_header_custom}>
          <Grid.Item span={5} />
          <Grid.Item span={10}>
            <Image
              src="/images/logo-mobi.png"
              layout="responsive"
              width={400}
              height={100}
              alt=""
              priority={2}
            />
          </Grid.Item>
          <Grid.Item span={5} />
        </Grid>
      </div>
      <Divider className={style.devider_custom} />
      <div className={`${style.header_custom}`}>
        <div className={`${style.join_text_custom}`}>
          <span className={style.text_join}>Sẵn sàng tham gia?</span>
          <JoinButton />
        </div>
      </div>
      <Grid columns={20}>
        <Grid.Item span={20}>
          <Preview />
        </Grid.Item>
      </Grid>
      <TabBar className={style.tab_custom} onChange={setTab}>
        <TabBar.Item
          key="user"
          className={style.tab_child_icon}
          icon={<UserCircleOutline className={style.fs_icon_custom} />}
          title={<span className={style.fs_18}>Đăng nhập</span>}
        />
        <TabBar.Item
          key="device"
          className={style.tab_child_icon}
          icon={<SetOutline className={style.fs_icon_custom} />}
          title={<span className={style.fs_18}>Âm thanh và Hình ảnh</span>}
        />
      </TabBar>
      <div className={style.pad_12}>
        {tab === "user" ? <User /> : <Devices />}
      </div> */}

      <SettingAudio visible={audioSetting} closed={setAudioSetting} />
      <SettingCamera visible={cameraSetting} closed={setCameraSetting} />
      <SettingBackground visible={bgroundSetting} closed={setBgroundSetting} />
      <InformationMetting visible={inforMetting} closed={setInforMetting} />
      {/* <ActionSheet
        popupClassName={style.pop_cam_custom}
        cancelText='Hủy Bỏ'
        visible={cameraSetting}
        actions={actionCam}
        onClose={() => setCameraSetting(false)} /> */}
    </Fragment>
  );
}

function User() {
  const dispatch = useDispatch();
  const displayname = useSelector(({ user }) => user.displayName);
  const roomName = useSelector(({ room }) => room.name);
  const roomId = useSelector(({ room }) => room.id);

  function changeDisplayName(value) {
    dispatch(actions.setDisplayName(value));
  }

  return (
    <Fragment>
      <div
        className={`${style.info_metting_custom} ${style.flex_info_metting}`}
      >
        <div className={style.m_top_bot}>
          <span>Id cuộc họp : </span>
          <b>{roomId}</b>
        </div>
        <div className={style.m_top_bot}>
          <span>Tên cuộc họp : </span>
          <b>{roomName}</b>
        </div>
      </div>
      <div
        className={`${style.info_metting_custom} ${style.name_metting_input}`}
      >
        <span className={style.m_top_bot}></span>
        <SearchBar
          value={displayname}
          className={style.input_info_name_custom}
          icon={null}
          onChange={changeDisplayName}
          clearable={false}
          placeholder="Nhập tên"
        />
      </div>
    </Fragment>
  );
}

function Devices() {
  const actionVoice = [
    {
      key: "default",
      icon: null,
      text: "Default - Speakers (Realtek(R) Audio)",
    },
    {
      key: "communication",
      icon: null,
      text: "Communications - Speakers (Realtek(R) Audio)",
    },
    {
      key: "realtek",
      icon: null,
      text: "Realtek Digital Output (Realtek(R) Audio)",
    },
    { key: "speaker", icon: null, text: "Speakers (Realtek(R) Audio)" },
  ];

  return (
    <Fragment>
      <h3 className={style.title_info_custom}>Chọn thiết bị</h3>
      <div className={`${style.info_metting_custom}`}>
        <span>Máy ảnh</span>
        <Popover.Menu
          actions={actionVoice}
          placement="bottom-start"
          onAction={console.log}
          trigger="click"
        >
          <Button>click me</Button>
        </Popover.Menu>
      </div>
    </Fragment>
  );
}

export default Prejoin;
