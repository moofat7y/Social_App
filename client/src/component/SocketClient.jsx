import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
const SocketClient = () => {
  const { socketReduccer } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    socketReduccer?.on("likeToClient", (newPost) => {
      dispatch({ type: "LIKE", payload: { post: newPost } });
    });

    return () => socketReduccer.off("likeToClient");
  }, [socketReduccer]);

  useEffect(() => {
    socketReduccer?.on("conversation-client", (data) => {
      dispatch({ type: "ADD_CONVERSATION", payload: data });
    });

    return () => socketReduccer.off("conversation-client");
  }, [socketReduccer]);

  useEffect(() => {
    socketReduccer.on("get-users", (users) => {
      dispatch({ type: "GET_USERS", payload: users });
    });

    return () => socketReduccer.off("get-users");
  }, [socketReduccer]);
  useEffect(() => {
    socketReduccer.on("createStory-client", (data) => {
      dispatch({ type: "CREATE_STORY", payload: data });
    });

    return () => socketReduccer.off("createStory-client");
  }, [socketReduccer]);

  const onRecive = (data) => {
    return toast(`${data.user.username} ${data.text}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    socketReduccer.on("receive-message", (data) => {
      if (!(data.senderId === window.location.pathname.split("/")[2])) {
        return toast(`${data.senderName} send you a message`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return;
    });
    return () => socketReduccer.off("createStory-client");
  }, [socketReduccer]);

  useEffect(() => {
    socketReduccer.on("createNotify-client", (data) => {
      dispatch({ type: "ADD_NOTIFY", payload: data });

      onRecive(data);
    });

    return () => socketReduccer.off("createNotify-client");
  }, [socketReduccer]);
  useEffect(() => {
    socketReduccer.on("removeNotify-client", (data) => {
      dispatch({ type: "DELETE_NOTIFY", payload: data });
    });

    return () => socketReduccer.off("removeNotify-client");
  }, [socketReduccer]);
  return <div></div>;
};

export default SocketClient;
