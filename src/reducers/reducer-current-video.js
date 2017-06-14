export default function(state = null, action) {
  switch (action.type) {
    case "CURRENT_VIDEO":
      var obj = $.extend(true, {}, state);
      obj.success = action.payload.success;
      obj.video = action.payload.video;
      obj.waiting = false;
      return obj;
    case "CURRENT_VIDEO_FAIL":
      var obj = $.extend(true, {}, state);
      obj.success = action.payload.success;
      obj.message = action.payload.message;
      return obj;
    case "CURRENT_RATING":
      var obj = $.extend(true, {}, state);
      if (action.payload) {
        obj.like = true;
        obj.dislike = false;
        return obj;
      } else {
        obj.like = false;
        obj.dislike = true;
        return obj;
      }
    case "NO_RATING":
      var obj = $.extend(true, {}, state);
      obj.like = false;
      obj.dislike = false;
      return obj;
    case "LIKE":
      var obj = $.extend(true, {}, state);
      if (!obj.like) {
        if (obj.dislike) obj.video.dislike--;
        obj.video.like++;
      }
      obj.like = true;
      obj.dislike = false;
      return obj;
    case "DISLIKE":
      var obj = $.extend(true, {}, state);
      if (!obj.dislike) {
        if (obj.like) obj.video.like--;
        obj.video.dislike++;
      }
      obj.like = false;
      obj.dislike = true;
      return obj;
    case "WAIT_LOADING_COMMENT":
      var obj = $.extend(true, {}, state);
      obj.loading= true;
      return obj;
    case "GET_COMMENT":
      var obj = $.extend(true, {}, state);
      obj.comments = action.payload.comments;
      obj.count = action.payload.count;
      obj.loading= false;
      return obj;
    case "WAITING_COMMENT":
      var obj = $.extend(true, {}, state);
      obj.waiting = true;
      return obj;
    case "ADD_COMMENT":
      var obj = $.extend(true, {}, state);
      obj.waiting = false;
      obj.comments.unshift(action.payload);
      return obj;
  }
  return state;
}
