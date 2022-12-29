import React, { useRef, useEffect, useState } from "react";
import api from "../api/api";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { BsCheckCircleFill, BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import SendMessage from "./SendMessage";
const UserConversation = ({ currentChat, isActive }) => {
  const scroll = useRef();
  const { Messages, auth } = useSelector((state) => state);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages.messages.length]);
  return (
    <div className="rounded-4 bg-white d-flex flex-column h-100">
      <div className="header py-2 px-3 rounded-4 shadow-sm d-flex align-items-center">
        <Link
          to={`/profile/${Messages.chatOwner?._id}`}
          className={`profilePic nav-link me-2 d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle`}
        >
          {Messages.chatOwner?.profilePicture ? (
            <img
              src={Messages.chatOwner?.profilePicture.url}
              className="w-100 h-100 rounded-circle"
              alt=""
            />
          ) : (
            <BsPerson className="fs-4" />
          )}
        </Link>
        <div className="username d-flex flex-column justify-content-start">
          <span className="d-flex lh-sm">
            {Messages.chatOwner?.username}
            {Messages.chatOwner?.verified ? (
              <BsCheckCircleFill className="ms-1 fs-8 text-primary my-auto" />
            ) : (
              ""
            )}
          </span>
          <span className="text-info fs-7 lh-sm">
            {isActive ? "Active" : ""}
          </span>
        </div>
      </div>

      <div className="user-chat pt-4 d-flex flex-column px-3 h-100">
        {Messages.messages.map((message, index) => {
          return (
            <div
              ref={scroll}
              key={index}
              className={`message py-2 px-3  mb-3 ${
                message.sender === auth.userData._id
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

      <SendMessage
        chatId={currentChat._id}
        receivedId={currentChat.members.find(
          (member) => member !== auth.userData._id
        )}
      />
    </div>
  );
};

export default UserConversation;
