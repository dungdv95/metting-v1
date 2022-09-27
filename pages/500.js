import { Button, Result } from "antd";
import { useRouter } from "next/router";

function Error500Page() {
  const router = useRouter();

  function backToHome() {
    router.push("/");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Result
        status="500"
        title="500"
        subTitle="Opss, Đã có lỗi xảy ra!"
        extra={
          <Button onClick={backToHome} type="primary">
            Quay về trang chủ
          </Button>
        }
      />
    </div>
  );
}

export default Error500Page;
