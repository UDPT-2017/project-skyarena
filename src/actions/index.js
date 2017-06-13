import axios from "axios";

export const fetchChatRoom = payload => {
  const url = "/message/" + payload.id.toString();
  return function(dispatch) {
    axios.get(url).then(function(response) {
      dispatch({
        type: "FETCH_CHAT_ROOM",
        payload: response
      });
      console.log(payload);
      payload.socket.emit("LOAD_CHAT_ROOM", {
        user: payload.user,
        friend: payload.friend,
        room: payload.id.toString()
      });
    });
  };
};
export const newMessage = payload => {
  return {
    type: "NEW_MESSAGE",
    payload: payload
  };
};
export const fetchStatus = () => {
  const url = "/message/status";
  return function(dispatch) {
    axios.get(url).then(function(response) {
      dispatch({
        type: "FETCH_STATUS",
        payload: response.data
      });
    });
  };
};
export const fetchOnlineStatus = () => {
  const url = "/message/get";
  return function(dispatch) {
    axios.get(url).then(function(response) {
      dispatch({
        type: "FETCH_ONLINE_STATUS",
        payload: response.data
      });
    });
  };
};
export const closeChatPopUp = () => {
  return function(dispatch) {
    dispatch({
      type: "CLOSE_CHAT_POP_UP",
      payload: null
    });
  };
};
export const removeFriend = (id, page, query) => {
  return function(dispatch) {
    dispatch({
      type: "WAITING_FRIEND"
    });
    axios.get("/friend/remove?id=" + id.toString()).then(function(res) {
      axios.get("/friend/get?page=" + page.toString()).then(response => {
        axios.get("/friend/count").then(response2 => {
          dispatch({
            type: "GET_FRIEND",
            payload: {
              friends: response.data,
              count: parseInt(response2.data.count),
              page,
              query,
              waiting: false
            }
          });
        });
      });
    });
  };
};
export const addFriend = (id, page, query) => {
  return function(dispatch) {
    dispatch({
      type: "WAITING_FRIEND"
    });
    axios.get("/friend/add?id=" + id.toString()).then(function(res) {
      axios.get("/friend/get?page=" + page.toString()).then(response => {
        axios.get("/friend/count").then(response2 => {
          dispatch({
            type: "GET_FRIEND",
            payload: {
              friends: response.data,
              count: parseInt(response2.data.count),
              page,
              query,
              waiting: false
            }
          });
        });
      });
    });
  };
};
export const acceptFriend = (id, page, query) => {
  return function(dispatch) {
    dispatch({
      type: "WAITING_FRIEND"
    });
    axios.get("/friend/accept?id=" + id.toString()).then(function(res) {
      axios.get("/friend/get?page=" + page.toString()).then(response => {
        axios.get("/friend/count").then(response2 => {
          dispatch({
            type: "GET_FRIEND",
            payload: {
              friends: response.data,
              count: parseInt(response2.data.count),
              page,
              query,
              waiting: false
            }
          });
        });
      });
    });
  };
};

export const fetchFriend = (page, query) => {
  return function(dispatch) {
    dispatch({
      type: "WAITING_FRIEND"
    });
    axios
      .get("/friend/get?page=" + page.toString() + "&query=" + query)
      .then(response => {
        axios.get("/friend/count?query=" + query).then(response2 => {
          dispatch({
            type: "GET_FRIEND",
            payload: {
              friends: response.data,
              count: parseInt(response2.data.count),
              page,
              query,
              waiting: false
            }
          });
        });
      });
  };
};
export const successReset = () => {
  return function(dispatch) {
    dispatch({
      type: "SUCCESS_RESET"
    });
  };
};
export const fetchVideo = query => {
  return function(dispatch) {
    axios.get(`/videoAPI/?query=${query}`).then(response => {
      dispatch({
        type: "GET_VIDEO",
        payload: { data: response.data, query }
      });
    });
  };
};
export const fetchMoreVideo = (page, query) => {
  page++;
  return function(dispatch) {
    dispatch({
      type: "WAITING_MORE_VIDEO"
    });
    axios.get(`/videoAPI/?page=${page}&query=${query}`).then(response => {
      console.log(response);
      dispatch({
        type: "GET_MORE_VIDEO",
        payload: response.data
      });
    });
  };
};
export const openUploader = () => {
  return function(dispatch) {
    dispatch({
      type: "OPEN_UPLOADER"
    });
  };
};
export const closeUploader = () => {
  return function(dispatch) {
    dispatch({
      type: "CLOSE_UPLOADER"
    });
  };
};
export const uploadVideo = (title, description, video) => {
  return function(dispatch) {
    dispatch({
      type: "UPLOADING"
    });
    var formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    axios
      .post("/videoAPI/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(function(res) {
        dispatch({
          type: "FINISHED_UPLOAD",
          payload: res.data
        });
      });
  };
};
export const getCurrentVideo = id => {
  return function(dispatch) {
    axios.get("/videoAPI/watch?id=" + id).then(function(res) {
      if (res.data.success) {
        dispatch({
          type: "CURRENT_VIDEO",
          payload: res.data
        });
      } else {
        dispatch({
          type: "CURRENT_VIDEO_FAIL",
          payload: res.data
        });
      }
    });
  };
};
export const getComments = id => {
  console.log("hello");
  return function(dispatch) {
    axios.get("/videoAPI/comments?id=" + id).then(function(res) {
      if (res.data.success) {
        dispatch({
          type: "GET_COMMENT",
          payload: res.data.comments
        });
      } else {
        console.log(res.data.message);
      }
    });
  };
};
export const getCurrentVideoRating = id => {
  return function(dispatch) {
    axios.get("/videoAPI/rating?id=" + id).then(function(res) {
      if (res.data.success) {
        dispatch({
          type: "CURRENT_RATING",
          payload: res.data.like
        });
      } else {
        dispatch({
          type: "NO_RATING"
        });
      }
    });
  };
};
export const like = id => {
  return function(dispatch) {
    dispatch({
      type: "LIKE"
    });
    axios.get("/videoAPI/like?id=" + id).then(function(res) {
      if (!res.data.success) {
        console.log(res.data.message);
      }
    });
  };
};
export const dislike = id => {
  return function(dispatch) {
    dispatch({
      type: "DISLIKE"
    });
    axios.get("/videoAPI/dislike?id=" + id).then(function(res) {
      if (!res.data.success) {
        console.log(res.data.message);
      }
    });
  };
};
export const addComment = (id, text) => {
  return function(dispatch) {
    dispatch({
      type: "WAITING_COMMENT"
    });
    axios
      .post("/videoAPI/postComment", {
        text,
        id
      })
      .then(function(res) {
        if (res.data.success) {
          dispatch({
            type: "ADD_COMMENT",
            payload: res.data.comment
          });
        }
      });
  };
};
