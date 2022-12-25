import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import SocketClient from "./SocketClient";
const socket = io("https://social-app-socket-aqqi.onrender.com");
const UserConnect = () => {
  const user = JSON.parse(window.localStorage.getItem("profile"));
  console.log(socket);
  const [connect, setConnect] = useState(false);
  const dispatch = useDispatch();
  console.log(connect);

  useEffect(() => {
    if (user) {
      socket.on("connect", () => {
        socket.emit("userConnect", user.userData._id);
        setConnect(true);
        dispatch({ type: "SOCKET", payload: socket });
      });
    }
    return () => socket.close();
  }, []);
  return <div>{connect ? <SocketClient /> : ""}</div>;
};

export default UserConnect;
