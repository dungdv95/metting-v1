
import { Grid, Popup, Radio, Space } from "antd-mobile";
import { useState } from "react";
import { BsFillFileCodeFill } from "react-icons/bs";
import style from './styles.module.css'


function InformationMetting({ ...props }) {
    const { visible, closed } = props;
    const [cam, setCam] = useState(1);

    return (
        <Popup
            visible={visible}
            onMaskClick={() => {
                closed(false)
            }}
            bodyClassName={`p-8 rounded-t-lg min-h-[30%]`}
        >
            <div className="flex flex-col">
                <div className="flex justify-center 2xl:mb-4 xl:mb-4 lg:mb-4 md:mb-4 sm:mb-4 tn:mb-2 pn:mb-2 zr:mb-2">
                    <span className={`2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl tn:text-2xl pn:text-2xl zr:text-xl`}>MobiFone Meeting V3 - Demo</span>
                </div>
                <div className="flex flex-col p-3 border-2 border-zinc-600 rounded-lg">
                    <Grid columns={11} className='my-2'>
                        <Grid.Item span={3}>
                            <span className="text-3xl">Chủ trì</span>
                        </Grid.Item>
                        <Grid.Item span={8} className='flex'>
                            <span className="text-3xl">Dũng Dương</span>
                        </Grid.Item>
                    </Grid>
                    <Grid columns={11} className='my-2'>
                        <Grid.Item span={3}>
                            <span className="text-3xl">Liên kết</span>
                        </Grid.Item>
                        <Grid.Item span={7} className='flex'>
                            <span className="text-3xl truncate">http://localhost:3000/room?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6Ly9zbWFydG9mZmljZS5tb2JpZm9uZS52bi9pbWFnZXMvYXZhdGFyL2ZkMWE5ZDEyLWEyODItNDU2Mi1hOWUwLTQ1MzVlODViMTBkMC92aWJlcl9pbWFnZV8yMDIyLTA0LTI2XzExLTM4LTM3LTQ4MC5qcGciLCJuYW1lIjoiXHUwMTEwXHUwMGUwbyBOZ1x1MWVjZGMgVGhcdTAwZTBuaC1QQklHREFUQS1UVENOVFQiLCJlbWFpbCI6InRoYW5oLmRhb25nb2NAbW9iaWZvbmUudm4iLCJwYXNzd29yZCI6IjI0NjUiLCJyb29tX25hbWUiOiJkZW1vIiwidXJsIjoiaHR0cHM6Ly9zbWFydG9mZmljZS5tb2JpZm9uZS52bi9tZWV0aW5nLzMwNDEwMzc2MD9wd2Q9MWUwYTg0MDUxZTZhNGE3MzgxNDczMzI4ZjQzYzQ4ODQiLCJyb29tX2NvZGUiOiIzMDQxMDM3NjAiLCJyZWRpcmVjdF91cmwiOiJodHRwczovL3NtYXJ0b2ZmaWNlLm1vYmlmb25lLnZuL21lZXRpbmcifSwib3B0aW9uX2NvZGUiOiJPUEVOIn0sImF1ZCI6Im1vYmltZWV0aW5nIiwiaXNzIjoibW9iaW1lZXRpbmciLCJzdWIiOiJodHRwczovL21lZXRpbmczLm1vYmlmb25lLmFpIiwicm9vbSI6IjMwNDEwMzc2MCIsInVzZXJfaWQiOiJmZDFhOWQxMi1hMjgyLTQ1NjItYTllMC00NTM1ZTg1YjEwZDAiLCJtb2RlcmF0b3IiOnRydWUsImlhdCI6MTY1MzI5OTQ0NiwibG9ja19zdGFydF9kYXRlIjpudWxsLCJyb29tX21vZGUiOiJub3JtYWwiLCJyb29tX3Nlc3Npb25faWQiOjMzNDg1Niwicm9vbV91c2VyX2lkIjoxMjc1ODM2LCJyb29tX2lkIjo2MDMzNn0.3Ftd0_u8TKsL62pUiyPlP3qK14DEcyAjfBi1e01Zs-8</span>
                        </Grid.Item>
                        <Grid.Item span={1} className='flex'>
                            <BsFillFileCodeFill className="text-3xl" />
                        </Grid.Item>
                    </Grid>
                    <Grid columns={11} className='my-2'>
                        <Grid.Item span={3}>
                            <span className="text-3xl">Mã cuộc họp</span>
                        </Grid.Item>
                        <Grid.Item span={7} className='flex'>
                            <span className="text-3xl truncate">731809910</span>
                        </Grid.Item>
                        <Grid.Item span={1} className='flex'>
                            <BsFillFileCodeFill className="text-3xl" />
                        </Grid.Item>
                    </Grid>
                    <Grid columns={11} className='my-2'>
                        <Grid.Item span={3}>
                            <span className="text-3xl">Mật khẩu</span>
                        </Grid.Item>
                        <Grid.Item span={7} className='flex'>
                            <span className="text-3xl truncate">2064</span>
                        </Grid.Item>
                        <Grid.Item span={1} className='flex'>
                            <BsFillFileCodeFill className="text-3xl" />
                        </Grid.Item>
                    </Grid>
                    <Grid columns={11} className='my-2'>
                        <Grid.Item span={3}>
                            <span className="text-3xl">Mời họp nhanh</span>
                        </Grid.Item>
                        <Grid.Item span={7} className='flex'>
                            <span className="text-3xl truncate">http://localhost:3000/room?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6Ly9zbWFydG9mZmljZS5tb2JpZm9uZS52bi9pbWFnZXMvYXZhdGFyL2ZkMWE5ZDEyLWEyODItNDU2Mi1hOWUwLTQ1MzVlODViMTBkMC92aWJlcl9pbWFnZV8yMDIyLTA0LTI2XzExLTM4LTM3LTQ4MC5qcGciLCJuYW1lIjoiXHUwMTEwXHUwMGUwbyBOZ1x1MWVjZGMgVGhcdTAwZTBuaC1QQklHREFUQS1UVENOVFQiLCJlbWFpbCI6InRoYW5oLmRhb25nb2NAbW9iaWZvbmUudm4iLCJwYXNzd29yZCI6IjI0NjUiLCJyb29tX25hbWUiOiJkZW1vIiwidXJsIjoiaHR0cHM6Ly9zbWFydG9mZmljZS5tb2JpZm9uZS52bi9tZWV0aW5nLzMwNDEwMzc2MD9wd2Q9MWUwYTg0MDUxZTZhNGE3MzgxNDczMzI4ZjQzYzQ4ODQiLCJyb29tX2NvZGUiOiIzMDQxMDM3NjAiLCJyZWRpcmVjdF91cmwiOiJodHRwczovL3NtYXJ0b2ZmaWNlLm1vYmlmb25lLnZuL21lZXRpbmcifSwib3B0aW9uX2NvZGUiOiJPUEVOIn0sImF1ZCI6Im1vYmltZWV0aW5nIiwiaXNzIjoibW9iaW1lZXRpbmciLCJzdWIiOiJodHRwczovL21lZXRpbmczLm1vYmlmb25lLmFpIiwicm9vbSI6IjMwNDEwMzc2MCIsInVzZXJfaWQiOiJmZDFhOWQxMi1hMjgyLTQ1NjItYTllMC00NTM1ZTg1YjEwZDAiLCJtb2RlcmF0b3IiOnRydWUsImlhdCI6MTY1MzI5OTQ0NiwibG9ja19zdGFydF9kYXRlIjpudWxsLCJyb29tX21vZGUiOiJub3JtYWwiLCJyb29tX3Nlc3Npb25faWQiOjMzNDg1Niwicm9vbV91c2VyX2lkIjoxMjc1ODM2LCJyb29tX2lkIjo2MDMzNn0.3Ftd0_u8TKsL62pUiyPlP3qK14DEcyAjfBi1e01Zs-8</span>
                        </Grid.Item>
                        <Grid.Item span={1} className='flex'>
                            <BsFillFileCodeFill className="text-3xl" />
                        </Grid.Item>
                    </Grid>
                </div>
            </div>
        </Popup>
    );
}
export default InformationMetting;