import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import SliderChatsLoading from "./SliderChatsLoading";
import { BsPerson } from "react-icons/bs";
import { useDispatch } from "react-redux";

const Chat = ({ chatData, currentUser, isActive }) => {
  const userChatId = chatData.members.filter(
    (id) => id !== currentUser.userData._id
  );
  const dispatch = useDispatch();
  const [userChat, setUserChat] = useState(null);
  const [loadding, setLoadding] = useState(false);
  const { userId } = useParams();

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
        data.user._id === userId
          ? dispatch({ type: "SELECT_CHAT", payload: data.user })
          : "";
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
        onClick={() => dispatch({ type: "SELECT_CHAT", payload: userChat })}
        className="user-cont nav-link d-flex flex-column align-items-center"
      >
        <div
          className={`profilePic position-relative d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle`}
        >
          {isActive >= 0 ? (
            <span className="position-absolute active bg-primary border border-3 border-light rounded-circle">
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
            <BsPerson className=" fs-4" />
          )}
        </div>
        <div className="username text-nowrap">{userChat?.username}</div>
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
