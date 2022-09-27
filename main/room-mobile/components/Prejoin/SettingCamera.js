import { Popup, Radio, Space } from "antd-mobile";
import { useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import style from './styles.module.css'

const listCam = [
    {
        id: 1, text: 'Tùy chọn 1',
    },
    {
        id: 2, text: 'Tùy chọn 2',
    },
    {
        id: 3, text: 'Tùy chọn 3',
    },
]

function SettingCamera({ ...props }) {
    const { visible, closed } = props;
    const [cam, setCam] = useState(1);

    return (
        <Popup
            visible={visible}
            onMaskClick={() => {
                closed(false)
            }}
            bodyClassName={`p-10 rounded-t-lg min-h-[25%]`}
        >
            <div className="flex flex-col">
                <div className="flex justify-center 2xl:mb-4 xl:mb-4 lg:mb-4 md:mb-4 sm:mb-4 tn:mb-2 pn:mb-2 zr:mb-2">
                    <span className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl tn:text-2xl pn:text-2xl zr:text-xl`}>Camera Setting</span>
                </div>
                <div className="flex items-center my-2">
                    {/* <BsFillCameraVideoFill className={`text-3xl`} /> */}
                    <span className={`2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl tn:text-2xl pn:text-xl zr:text-lg pl-4`}>Camera</span>
                </div>
                <div className="px-6 my-2">
                    <Radio.Group defaultValue={cam} onChange={(e) => setCam(e)}>
                        <Space direction='vertical'>
                            {listCam.map((item, index) => (
                                <Radio className={style.radio_custom} key={index} value={item.id}>{item.text}</Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        </Popup>
    );
}
export default SettingCamera;