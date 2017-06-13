var $ = require("jquery");

export default function(
  state = { waiting: false, upload: false, successReset: false, videos: [], response: null },
  action
) {
  switch (action.type) {
    case "OPEN_UPLOADER":
      var obj = $.extend(true, {}, state);
      obj.upload = true;
      return obj;
    case "CLOSE_UPLOADER":
      var obj = $.extend(true, {}, state);
      obj.upload = false;
      return obj;
    case "UPLOADING":
      var obj = $.extend(true, {}, state);
      obj.waiting = true;
      return obj;
    case "FINISHED_UPLOAD":
      var obj = $.extend(true, {}, state);
      obj.successReset = true;
      obj.waiting = false;
      obj.response = action.payload;
      return obj;
    case "SUCCESS_RESET":
      var obj = $.extend(true, {}, state);
      obj.successReset = false;
      return obj;
  }
  return state;
}
