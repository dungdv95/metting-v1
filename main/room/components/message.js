import { message } from "antd";

function warning(content, duration = 2) {
  return message.warning({
    content,
    className: "NOTI_YELLOW",
    duration,
  });
}

function success(content, duration = 2) {
  return message.success({
    content,
    className: "NOTI_GREEN",
    duration,
  });
}

function error(content, duration = 2) {
  return message.error({
    content,
    className: "NOTI_RED",
    duration,
  });
}

function info(content, duration = 2) {
  return message.info({
    content,
    className: "NOTI_BLUE",
    duration,
  });
}

export default Object.freeze({ warning, success, error, info });
