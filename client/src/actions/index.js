import api from "../api/api";
import { createNotify, removeNotify } from "./NotifyAction";
export const signUp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.put("/register/signup", formData);
    dispatch({ type: "AUTH_SUCCESS", payload: data });
  } catch (err) {
    throw new Error(err.response.data.message.msg);
  }
};

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.post("/register/signin", formData);
    dispatch({ type: "SIGN_IN", payload: data });
  } catch (err) {
    dispatch({ type: "SIGNIN_FAILED", payload: err.response.data });
  }
};

export const followUser =
  (userId, token, ownerId, socket) => async (dispatch) => {
    try {
      const { data } = await api.patch(
        `user/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({ type: "FOLLOW_USER", payload: data });
      const msg = {
        id: ownerId,
        text: "has started to follow you",
        recipients: [userId],
        url: `/profile/${ownerId}`,
      };

      dispatch(createNotify({ msg, token, socket }));
    } catch (err) {}
  };

export const unFollowUser =
  (userId, token, ownerId, socket) => async (dispatch) => {
    try {
      const { data } = await api.patch(
        `user/unfollow/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({ type: "UNFOLLOW_USER", payload: data });
      const msg = {
        id: ownerId,
        text: "has started to follow you",
        recipients: [userId],
        url: `/profile/${ownerId}`,
      };

      dispatch(removeNotify({ msg, token, socket }));
    } catch (err) {}
  };

export const likePost = (postId, token, socket, userId) => async (dispatch) => {
  try {
    const { data } = await api.patch(
      `/post/like/${postId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const msg = {
      id: data.post.userId._id,
      text: "liked your post",
      recipients: [data.post.userId._id],
      url: `/post/${data.post._id}`,
      content: data.post.desc,
      image: data.post.image,
    };
    if (!data.post.likes.includes(userId)) {
      dispatch(removeNotify({ msg, token, socket }));
    } else {
      dispatch(createNotify({ msg, token, socket }));
    }
    socket.emit("likePost", data.post);

    dispatch({ type: "LIKE", payload: data });
  } catch (err) {
    dispatch({ type: "LIKE_FAILED" });
  }
};

export const updateProfile = (userId, formData, token) => async (dispatch) => {
  try {
    const { data } = await api.patch(`/user/${userId}`, formData, {
      headers: { Authorization: token },
    });
    dispatch({ type: "UPDATE_AUTH", payload: data });
  } catch (err) {
    throw new Error(err.response.data.message.msg);
  }
};
export const updateProfilePicture = (formData, token) => async (dispatch) => {
  try {
    const { data } = await api.patch("/user/update/profileImage", formData, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: "UPADTE_PROFILEIMAGE", payload: data });
  } catch (err) {
    dispatch({ type: "UPDATED_PRIFLEIMAGEFAILED" });
  }
};
export const updateCoverImage = (formData, token) => async (dispatch) => {
  try {
    const { data } = await api.patch("/user/update/coverImage", formData, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "UPADTE_COVERIMAGE", payload: data.updatedUser });
  } catch (err) {
    dispatch({ type: "UPDATED_COVERFAILED" });
  }
};
export const commentOnPost = (postId, commentId) => (dispatch) => {
  dispatch({ type: "COMMENT", payload: { postId, commentId } });
};

export const deleteComment = (postId, commentId) => (dispatch) => {
  dispatch({ type: "DELETE_COMMENT", payload: { postId, commentId } });
};

export const getSignedUser = () => (dispatch) => {
  const data = JSON.parse(window.localStorage.getItem("store"));
  dispatch({ type: "GET_USER", payload: data ? data : "" });
};

export const getUserTimeline = (token) => async (dispatch) => {
  try {
    const { data } = await api.get("/post/usertimeline/timeline", {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "FETCH_TIMELINE", payload: data });
  } catch (err) {
    dispatch({ type: "TIMELINE_FAILED", payload: err.response.data.message });
  }
};
export const getSinglePost = (token, postId) => async (dispatch) => {
  try {
    const { data } = await api.get(`post/post/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "GET_SINGLEPOST", payload: data.result });
  } catch (error) {
    dispatch({ type: "SINGLE_ERROR", payload: error.response });
  }
};
export const uploadNewPost = (token, formData, socket) => async (dispatch) => {
  try {
    const { data } = await api.put("/post/", formData, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "UPLOAD_POST", payload: data });
    const msg = {
      id: data._id,
      text: "added a new post",
      recipients: data.userId.followers,
      url: `/post/${data._id}`,
      content: data.desc,
      image: data.image,
    };
    dispatch(createNotify({ msg, token, socket }));
  } catch (err) {
    dispatch({ type: "UPLOAD_FAILED", payload: err });
  }
};
export const deletePost = (token, postId, socket) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/post/post/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "DELETE_POST", payload: { postId } });
    const msg = {
      id: data.post._id,
      text: "added a new post",
      recipients: data.post.userId.followers,
      url: `/post/${data.post._id}`,
    };

    dispatch(removeNotify({ msg, token, socket }));
  } catch (err) {
    dispatch({ type: "DELETEPOST_FAILED", payload: err.response });
  }
};
export const fetchUserProfile = (token, userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/post/posts/${userId}`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: "FETCH_PROFILE", payload: data });
  } catch (err) {
    dispatch({ type: "PROFLIE_FAILED", payload: err.response });
  }
};

export const getUserConverstion = (token) => async (dispatch) => {
  try {
    const { data } = await api.get("chat/", {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: "GET_CONVERSATION", payload: data.chats });
  } catch (err) {
    dispatch({ type: "CONVERSATION_FAILED", payload: err.response });
  }
};

export const AddConversation =
  (token, reciverId, socket) => async (dispatch) => {
    try {
      const { data } = await api.post(
        "chat/",
        { reciverId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      socket.emit("add-conversation", data.result);
      dispatch({ type: "ADD_CONVERSATION", payload: data.result });
    } catch (err) {}
  };

export const createStory = (token, fromData, socket) => async (dispatch) => {
  try {
    const { data } = await api.put("/story", fromData, {
      headers: {
        Authorization: token,
      },
    });
    socket.emit("create-story", data.story);
    dispatch({ type: "CREATE_STORY", payload: data.story });
  } catch (err) {}
};

export const getAllFollowingsUsersStories =
  (token, socket) => async (dispatch) => {
    try {
      const { data } = await api.get("/story", {
        headers: {
          Authorization: token,
        },
      });
      dispatch({ type: "STORIES", payload: data.stories });
    } catch (err) {}
  };

export const getUserSuggetions = (token) => async (dispatch) => {
  try {
    const { data } = await api.get("/user/users/suggistion", {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "SUGGITIONS", payload: data.users });
  } catch (error) {}
};
