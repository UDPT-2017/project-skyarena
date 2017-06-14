export default function(state = null, action) {
  switch (action.type) {
    case "GET_VIDEO":
      return {
        lists: action.payload.data.lists,
        count: action.payload.data.count,
        page: 0,
        query: action.payload.query,
        waiting: false
      };
    case "WAITING_MORE_VIDEO":
      var obj = $.extend(true, {}, state);
      obj.page++;
      obj.waiting = true;
      return obj;
  }
  return state;
}
