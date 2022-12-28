import api from "../api/api";

export const createNotify =
  ({ msg, token, socket }) =>
  async (dispatch) => {
    try {
      const { data } = await api.put("notify", msg, {
        headers: {
          Authorization: token,
        },
      });
      socket.emit("createNotify", data.notify);
    } catch (error) {
      dispatch({ type: "ERORR_ALERT", payload: error.response });
    }
  };

export const removeNotify =
  ({ msg, token, socket }) =>
  async (dispatch) => {
    try {
      const { data } = await api.delete(`notify/${msg.id}?url=${msg.url}`, {
        headers: {
          Authorization: token,
        },
      });
      socket.emit("removeNotify", msg);
    } catch (error) {
      dispatch({ type: "ERORR_ALERT", payload: error.response });
    }
  };

export const updatedIsRead = (token, notifyId) => async (dispatch) => {
  try {
    const { data } = await api.patch(
      `notify/${notifyId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "UPDATE_ISREAD", payload: data.notify });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getNotifies = (token) => async (dispatch) => {
  try {
    const { data } = await api.get("notify/getNotifies", {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: "GET_NOTIFY", payload: data.notifies });
  } catch (error) {
    dispatch({ type: "ERORR_ALERT", payload: error.response });
  }
};
