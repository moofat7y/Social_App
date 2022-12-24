import React, { useRef, useEffect, useState } from "react";
import api from "../api/api";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
const UserConversation = ({
  receviedMessage,
  currentUser,
  currentChat,
  setSendMessage,
  isActive,
}) => {
  const userId = currentChat?.members.filter(
    (id) => id !== currentUser.userData._id
  );

  const [newMessage, setNewMessage] = useState("");
  const [loadding, setLoadding] = useState(false);
  const [user, setUser] = useState(null);

  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadding(true);
        const { data } = await api.get(`/user/${userId}`, {
          headers: {
            Authorization: currentUser.token,
          },
        });
        setUser(data.user);
        setLoadding(false);
      } catch (error) {
        setLoadding(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [currentChat]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/message/${currentChat._id}`, {
          headers: {
            Authorization: currentUser.token,
          },
        });
        setMessages([...data.messages]);
      } catch (err) {}
    };

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);
  useEffect(() => {
    if (
      receviedMessage !== null &&
      receviedMessage?.chatId === currentChat?._id
    ) {
      setMessages([...messages, { ...receviedMessage, createdAt: Date.now() }]);
    }
  }, [receviedMessage]);
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const message = {
      senderId: currentUser.userData._id,
      text: newMessage,
      chatId: currentChat._id,
    };
    const receivedId = currentChat.members.find(
      (member) => member !== currentUser.userData._id
    );

    try {
      const { data } = await api.post(
        "message/",
        {
          chatId: currentChat._id,
          text: newMessage,
        },
        {
          headers: {
            Authorization: currentUser.token,
          },
        }
      );
      setNewMessage("");
      setMessages([...messages, data.message]);
    } catch (err) {}

    setSendMessage({ ...message, receivedId });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="rounded-4 bg-white d-flex flex-column h-100">
      <div className="header py-2 px-3 rounded-4 shadow-sm d-flex align-items-center">
        <Link
          to={`/profile/${user?._id}`}
          className={`profilePic nav-link me-2 d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle`}
        >
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture.url}
              className="w-100 h-100 rounded-circle"
              alt=""
            />
          ) : (
            <i className="bi bi-person fs-4"></i>
          )}
        </Link>
        <div className="username">
          <span className="d-block lh-sm">{user?.username}</span>
          <span className="text-info fs-7">{isActive ? "Active" : ""}</span>
        </div>
      </div>

      <div className="user-chat pt-4 d-flex flex-column px-3 h-100">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              ref={scroll}
              className={`message py-2 px-3  mb-3 ${
                message.sender === currentUser.userData._id
                  ? "own bg-primary"
                  : "bg-light "
              }`}
            >
              <span>{message.text}</span>
              <span className="d-block fs-8 text-info">
                {format(message.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="send-message d-flex align-items-center px-3">
        <div>+</div>
        <InputEmoji
          theme="auto"
          borderRadius={20}
          onChange={handleChange}
          onEnter={() => handleSubmit()}
          value={newMessage}
        />
        <button
          className="btn btn-success"
          type="submit"
          disabled={newMessage.length > 0 ? false : true}
          onClick={(e) => handleSubmit(e)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserConversation;
