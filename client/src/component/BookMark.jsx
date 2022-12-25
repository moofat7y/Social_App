import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api/api";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const BookMark = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const [bookmark, setBookmark] = useState(false);
  useEffect(() => {
    setBookmark(
      post.bookmark.findIndex((id) => id === auth.userData._id.toString()) < 0
        ? false
        : true
    );
  }, [post]);
  const handleBookMark = async () => {
    setBookmark((prev) => !prev);
    await api.put(
      "/bookmark/",
      { postId: post._id },
      {
        headers: {
          Authorization: auth.token,
        },
      }
    );
  };
  return (
    <div
      className={`bookmark d-flex justify-content-center align-items-center ms-auto position-relative ${
        bookmark ? "bookmarked" : ""
      }`}
      onClick={() => handleBookMark()}
    >
      <BsBookmark className="fs-5" />
      <BsBookmarkFill className=" text-black fs-5 position-absolute" />
    </div>
  );
};

export default BookMark;
