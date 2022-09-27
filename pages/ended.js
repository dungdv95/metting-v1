import { useState } from "react";
import { Button, Result } from "antd";
import { useRouter } from "next/router";
import { useInterval } from "main/room/hooks";

const backUrl = "https://smartoffice.mobifone.vn/meeting";

function EndedPage() {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(10);

  function backToHome() {
    router.push(backUrl, undefined, { sallow: true });
  }

  useInterval(() => {
    if (elapsed === 0) {
      router.push(backUrl, undefined, { sallow: true });
      return;
    }
    setElapsed(elapsed - 1);
  }, 1000);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Result
        status="500"
        title="Cuộc họp đã kết thúc!"
        subTitle={`Quay trở về trang chủ sau ${elapsed} giây`}
        extra={
          <Button onClick={backToHome} type="primary">
            Quay về trang chủ
          </Button>
        }
      />
    </div>
  );
}

export default EndedPage;
