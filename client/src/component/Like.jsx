import React, { useState } from "react";
import api from "../api/api";

const Like = ({ likes, postId }) => {
  let user = JSON.parse(window.localStorage.getItem("store"));
  const [liked, setLike] = useState(
    likes.includes(user.userData._id) ? true : false
  );
  const handleLike = async () => {
    const data = await api.put(
      `post/like/${postId}`,
      {},
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
    setLike((prev) => !prev);
  };
  return (
    <div
      onClick={() => handleLike()}
      className={`like position-relative d-flex align-items-center justify-content-center ${
        liked ? "liked" : ""
      }`}
    >
      <i className="bi bi-heart fs-5 "></i>
      <i className="bi bi-heart-fill text-primary fs-5 position-absolute"></i>
    </div>
  );
};

export default Like;
