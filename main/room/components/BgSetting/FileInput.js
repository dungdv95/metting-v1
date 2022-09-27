import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "main/room/store";
import message from "main/room/components/message";

function FileInput() {
  const dispatch = useDispatch();
  const input = useRef();
  const options = useSelector(({ device }) => device.bgSetting.options);
  const visibleImport = useSelector(
    ({ device }) => device.bgSetting.visibleImport
  );

  function onSelectFile(event) {
    if (options.length > 2) {
      input.current.value = "";
      message.error("Chỉ được chọn tối đa 3 ảnh");
      input.current.value = "";
      dispatch(actions.hideImportBG());
    } else {
      const file = event.target.files && event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        if (file.type.indexOf("image") > -1) {
          reader.onload = (event1) => {
            let url = reader.result;
            let check = options.findIndex((x) => x == url);
            if (check == -1) {
              options.push(url);
              let name = url;
              dispatch(actions.setBackgroundSetting(name));
              dispatch(actions.hideImportBG());
              dispatch(actions.importBackgroundSetting(options));
              input.current.value = "";
            } else {
              message.warning("Ảnh đã được thêm");
              input.current.value = "";
              dispatch(actions.hideImportBG());
            }
          };
        } else {
          message.error("Chỉ được chọn định dạng ảnh");
          input.current.value = "";
          dispatch(actions.hideImportBG());
        }
      }
    }
  }
  useEffect(() => {
    if (visibleImport) {
      input.current.click();
      dispatch(actions.hideImportBG());
    }
  }, [visibleImport]);

  return (
    <input
      className="file-upload"
      ref={input}
      id="file-upload"
      type="file"
      hidden
      onChange={onSelectFile}
    />
  );
}
export default FileInput;
