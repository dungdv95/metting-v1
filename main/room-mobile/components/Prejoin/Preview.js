import { Avatar, Button, Space } from "antd-mobile";
import { Fragment, useEffect, useRef } from "react";
import {
  BsCameraVideoOff,
  BsMicMute,
  BsCameraVideo,
  BsMic,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room-mobile/store";
import Image from 'next/image'
import style from "main/room-mobile/components/Prejoin/styles.module.css";
import { MdOutlineCameraswitch } from "react-icons/md";
import avatar from '../../../../public/images/back_ground.jpg'

function Preview() {
  return (
    <Fragment>
      {/* <CamPreview /> */}
      <Nocamera />
    </Fragment>

  );
}

function CamPreview() {
  const ref = useRef();
  const camEnable = useSelector(({ device }) => device.cam.enable);

  useEffect(() => {
    if (camEnable) {
      let tempStream;

      navigator.mediaDevices
        .getUserMedia({
          video: { aspectRatio: 16 / 9 },
          audio: false,
        })
        .then((stream) => {
          tempStream = stream;
          ref.current.srcObject = new MediaStream(stream.getVideoTracks());
        });

      return () => {
        if (tempStream) {
          tempStream.getTracks().forEach((t) => t.stop());
        }
      };
    }
  }, [camEnable]);

  return (
    <div className={`h-full bg-zinc-800 border-2 border-slate-500 rounded-lg`}>
      <video className={style.main_video_right} ref={ref} autoPlay playsInline />
    </div>
  );
}

function CamMicButtons() {
  const dispatch = useDispatch();
  const camEnable = useSelector(({ device }) => device.cam.enable);
  const micEnable = useSelector(({ device }) => device.mic.enable);

  function toggleCam() {
    dispatch(actions.setCamEnable(!camEnable));
  }

  function toggleMic() {
    dispatch(actions.setMicEnable(!micEnable));
  }

  return (
    <div className={style.icon_track_custom}>
      <Space wrap>
        <Button className={style.bor_radius_custom} onClick={toggleMic}>
          {micEnable ? <BsMic fontSize={22} /> : <BsMicMute fontSize={22} />}
        </Button>
        <Button className={style.bor_radius_custom} onClick={toggleCam}>
          {camEnable ? (
            <BsCameraVideo fontSize={22} />
          ) : (
            <BsCameraVideoOff fontSize={22} />
          )}
        </Button>
      </Space>
    </div>
  );
}

function Nocamera() {
  // const userAvatar = null;
  const userAvatar = avatar;
  return (
    <Fragment>
      <div className="absolute z-10 2xl:pt-5 xl:pt-5 lg:pt-5 md:pt-5 sm:pt-5 tn:pt-3 pn:pt-3 zr:pt-3 
        2xl:pl-5 xl:pl-5 lg:pl-5 md:pl-5 sm:pl-5 tn:pl-3 pn:pl-3 zr:pl-3"
      >
        <button className="2xl:w-20 xl:w-20 lg:w-20 md:w-20 sm:w-20 tn:w-14 pn:w-14 zr:w-14 
          2xl:h-20 xl:h-20 lg:h-20 md:h-20 sm:h-20 tn:h-14 pn:h-14 zr:h-14 flex items-center justify-center bg-neutral-600 rounded-full text-white"
        >
          <MdOutlineCameraswitch className={`2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl sm:text-5xl tn:text-3xl pn:text-3xl zr:text-3xl`} />
        </button>
      </div>
      {userAvatar ?
        <div className={`2xl:h-64 xl:h-64 lg:h-64 md:h-52 sm:h-52 tn:h-40 pn:h-24 zr:h-24
         2xl:w-64 xl:w-64 lg:w-64 md:w-52 sm:w-52 sm:w-52 tn:w-40 pn:w-24 zr:w-24 absolute z-10 flex items-center border-2 border-slate-300 rounded-full ${style.center_avatar}`}>
          <Image layout="fill" className={`rounded-full`} src={userAvatar} alt="" />
        </div>
        :
        <div className={`absolute z-10 flex items-center border-2 border-slate-300 p-1 rounded-full ${style.center_avatar}`}>
          <div className="2xl:h-64 xl:h-64 lg:h-64 md:h-52 sm:h-52 tn:h-40 pn:h-24 zr:h-24
         2xl:w-64 xl:w-64 lg:w-64 md:w-52 sm:w-52 sm:w-52 tn:w-40 pn:w-24 zr:w-24 
         2xl:text-8xl xl:text-8xl lg:text-8xl md:text-7xl sm:text-6xl tn:text-5xl pn:text-4xl zr:text-3xl
         relative flex justify-center items-center rounded-full bg-orange-500 text-white uppercase">D</div>
        </div>
      }

      <div className={`h-full border-2 border-slate-500 rounded-lg 
      ${userAvatar ? style.back_ground_image : style.back_ground_no_avatar}`}></div>
    </Fragment >
  )
}

export default Preview;
