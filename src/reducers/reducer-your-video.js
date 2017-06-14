var $ = require("jquery");

export default function(
  state = {
    waiting: false,
    upload: false,
    successReset: false,
    lists: [],
    response: null
  },
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
    case "WAITING_YOUR_VIDEO":
      var obj = $.extend(true, {}, state);
      obj.loading = true;
      return obj;
    case "GET_YOUR_VIDEO":
      var obj = $.extend(true, {}, state);
      obj.loading = false;
      obj.lists = action.payload.lists;
      obj.count = action.payload.count;
      return obj;
  }
  return state;
}
