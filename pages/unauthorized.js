import { Result, Button } from "antd";

function Page403() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
        extra={<Button type="primary">Quay trở lại</Button>}
      />
    </div>
  );
}

export default Page403;
