import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../actions";
import InputEmoji from "react-input-emoji";
const SendMessage = ({ chatId, receivedId }) => {
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, socketReduccer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setLoading(true);
    const socketMsg = {
      senderId: auth.userData._id,
      text: newMessage,
      senderName: auth.userData.username,
      receivedId,
    };

    try {
      await dispatch(
        sendMessage(auth.token, chatId, newMessage, socketReduccer, socketMsg)
      );
      setNewMessage("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleChange = (message) => {
    setNewMessage((prev) => message);
  };
  return (
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
        disabled={newMessage.length <= 0 || loading ? true : false}
        onClick={(e) => handleSubmit(e)}
      >
        Send
      </button>
    </div>
  );
};

export default SendMessage;
