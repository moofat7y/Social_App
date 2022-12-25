import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Chat from "../component/Chat";
import SliderChatsLoading from "../component/SliderChatsLoading";
import UserConversation from "../component/UserConversation";
import { IoIosSend } from "react-icons/io";
const Chats = () => {
  const user = useSelector((state) => state.auth);
  const chats = useSelector((state) => state.UserConversation);
  const location = useLocation();
  const [loadding, setLoadding] = useState(false);
  const [sendMessage, setSendMessage] = useState(null);
  const [receviedMessage, setReceivedMessage] = useState(null);
  const { socketReduccer, ActiveUsers } = useSelector((state) => state);
  let activeUsers = ActiveUsers;

  const selectedChatId = location.pathname.split("/")[2];
  const currentChat =
    selectedChatId &&
    (chats?.filter((chat) => chat.members.includes(selectedChatId)))[0];
  useEffect(() => {
    if (socketReduccer.connected) {
      if (sendMessage !== null) {
        socketReduccer.emit("send-message", sendMessage);
      }
    }
  }, [sendMessage]);

  useEffect(() => {
    if (socketReduccer.connected) {
      socketReduccer.on("receive-message", (data) => {
        setReceivedMessage(data);
      });
    }
  }, []);
  const renderedChats = chats.map((chat, index) => {
    return (
      <div className="me-2" key={index}>
        <Chat
          chatData={chat}
          currentUser={user}
          isActive={activeUsers.findIndex(
            (auser) =>
              auser.userId ===
              chat.members.find((member) => member !== user.userData._id)
          )}
        />
      </div>
    );
  });

  return (
    <div className="chat d-flex flex-column">
      <div className="user-chats-slider d-flex ">
        {loadding ? <SliderChatsLoading /> : renderedChats}
      </div>
      <div className="conversation h-100">
        {currentChat ? (
          <UserConversation
            setSendMessage={setSendMessage}
            currentUser={user}
            isActive={
              activeUsers.findIndex(
                (auser) =>
                  auser.userId ===
                  currentChat.members.find(
                    (member) => member !== user.userData._id
                  )
              ) >= 0
                ? true
                : false
            }
            currentChat={currentChat}
            receviedMessage={receviedMessage}
          />
        ) : (
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center text-primary">
            <IoIosSend className="bi bi-send-dash display-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
