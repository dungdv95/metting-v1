
import { Grid, Popup, Radio, Space } from "antd-mobile";
import { useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import style from './styles.module.css'


function SettingBackground({ ...props }) {
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
                    <span className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl tn:text-2xl pn:text-2xl zr:text-xl`}>Background Setting</span>
                </div>
                <Grid columns={9}>
                    <Grid.Item span={3}>

                    </Grid.Item>
                    <Grid.Item span={3}>

                    </Grid.Item>
                    <Grid.Item span={3}>

                    </Grid.Item>
                </Grid>
            </div>
        </Popup>
    );
}
export default SettingBackground;