import { Popup, Radio, Space } from "antd-mobile";
import { useState } from "react";
import { BsFillMicFill, BsVolumeDownFill } from "react-icons/bs";
import style from './styles.module.css'

const listMic = [
    {
        id: 1, text: 'Tùy chọn 1',
    },
    {
        id: 2, text: 'Tùy chọn 2',
    },
    {
        id: 3, text: 'Tùy chọn 3',
    }
]

const listVoice = [
    {
        id: 1, text: 'Tùy chọn 1',
    },
    {
        id: 2, text: 'Tùy chọn 2',
    },
    {
        id: 3, text: 'Tùy chọn 3',
    }
]

function SettingAudio({ ...props }) {
    const { visible, closed } = props;
    const [mic, setMic] = useState(1);
    const [voice, setVoice] = useState(2);

    return (
        <Popup
            visible={visible}
            onMaskClick={() => {
                closed(false)
            }}
            bodyClassName={`p-10 rounded-t-lg min-h-[35%]`}
        >
            <div className="flex flex-col">
                <div className="flex justify-center 2xl:mb-4 xl:mb-4 lg:mb-4 md:mb-4 sm:mb-4 tn:mb-2 pn:mb-2 zr:mb-2">
                    <span className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl tn:text-2xl pn:text-2xl zr:text-xl`}>Audio Setting</span>
                </div>
                <div className="flex items-center my-2">
                    <BsFillMicFill className={`2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl tn:text-2xl pn:text-xl zr:text-lg`} />
                    <span className={`2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl tn:text-2xl pn:text-xl zr:text-lg pl-4`}>Microphones</span>
                </div>
                <div className="px-6 my-2">
                    <Radio.Group defaultValue={mic} onChange={(e) => setMic(e)}>
                        <Space direction='vertical'>
                            {listMic.map((item, index) => (
                                <Radio className={style.radio_custom} key={index} value={item.id}>{item.text}</Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
                <div className="flex items-center my-2">
                    <BsVolumeDownFill className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl tn:text-3xl pn:text-2xl zr:text-xl`} />
                    <span className={`2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl tn:text-2xl pn:text-xl zr:text-lg pl-4`}>Speakers</span>
                </div>
                <div className="px-6 my-2">
                    <Radio.Group defaultValue={voice} onChange={(e) => setVoice(e)}>
                        <Space direction='vertical'>
                            {listVoice.map((item, index) => (
                                <Radio className={style.radio_custom} key={index} value={item.id}>{item.text}</Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        </Popup>
    );
}
export default SettingAudio;