import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Chat from "../component/Chat";
import UserConversation from "../component/UserConversation";
import { IoIosSend } from "react-icons/io";
import { getSelectedUserChat } from "../actions";
const Chats = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { ActiveUsers, auth, UserConversations } = useSelector(
    (state) => state
  );
  let activeUsers = ActiveUsers;
  const currentChat =
    userId && UserConversations?.find((chat) => chat.members.includes(userId));
  useEffect(() => {
    if (currentChat) {
      dispatch(getSelectedUserChat(auth.token, currentChat._id));
    } else {
      dispatch({ type: "SELECTED_NULL" });
    }
  }, [currentChat]);
  const renderedChats = UserConversations.map((chat, index) => {
    return (
      <div className="me-2" key={index}>
        <Chat
          chatData={chat}
          currentUser={auth}
          isActive={activeUsers.findIndex(
            (auser) =>
              auser.userId ===
              chat.members.find((member) => member !== auth.userData._id)
          )}
        />
      </div>
    );
  });

  return (
    <div className="chat d-flex flex-column">
      <div className="user-chats-slider d-flex ">{renderedChats}</div>
      <div className="conversation h-100">
        {currentChat ? (
          <UserConversation
            isActive={
              activeUsers.findIndex(
                (auser) =>
                  auser.userId ===
                  currentChat.members.find(
                    (member) => member !== auth.userData._id
                  )
              ) >= 0
                ? true
                : false
            }
            currentChat={currentChat}
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
