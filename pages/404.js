import { Button, Result } from "antd";
import { useRouter } from "next/router";

function Error404Page() {
  const router = useRouter();

  function backToHome() {
    router.push("/");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Ops, Không tìm thấy trang"
        extra={
          <Button onClick={backToHome} type="primary">
            Quay về trang chủ
          </Button>
        }
      />
    </div>
  );
}

export default Error404Page;
