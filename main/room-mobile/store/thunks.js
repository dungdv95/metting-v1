import Router from "next/router";
import { Toast } from "antd-mobile";
import { AiOutlineWarning } from "react-icons/ai";

export const thunks = {
  roomClosed() {
    return (_, getStore) => {
      const store = getStore();
      const backUrl = store.room.backUrl;

      Toast.show({
        content: "Phòng đã đóng",
        icon: <AiOutlineWarning />,
        duration: 3,
        afterClose: () => {
          Router.push(backUrl, undefined, { sallow: true });
        },
      });
    };
  },
};
