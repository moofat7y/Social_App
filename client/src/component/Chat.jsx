import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import SliderChatsLoading from "./SliderChatsLoading";

const Chat = ({ chatData, currentUser, isActive }) => {
  const userChatId = chatData.members.filter(
    (id) => id !== currentUser.userData._id
  );
  const [userChat, setUserChat] = useState(null);
  const [loadding, setLoadding] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadding(true);
        const { data } = await api.get(`/user/${userChatId}`, {
          headers: {
            Authorization: currentUser.token,
          },
        });
        setLoadding(false);
        setUserChat(data.user);
      } catch (error) {
        setLoadding(false);
      }
    };

    if (userChatId) {
      fetchUser();
    }
  }, []);

  const renderedChat = () => {
    return (
      <Link
        to={`/chats/${userChatId}`}
        className="user-cont nav-link d-flex flex-column align-items-center"
      >
        <div
          className={`profilePic position-relative d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle`}
        >
          {isActive >= 0 ? (
            <span className="position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-3 border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          ) : (
            ""
          )}
          {userChat?.profilePicture ? (
            <img
              src={userChat?.profilePicture.url}
              className="w-100 h-100 rounded-circle"
              alt=""
            />
          ) : (
            <i className="bi bi-person fs-4"></i>
          )}
        </div>
        <div className="username">{userChat?.username}</div>
      </Link>
    );
  };
  return (
    <div className="user">
      {loadding ? <SliderChatsLoading /> : renderedChat()}
    </div>
  );
};

export default Chat;
