import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { deleteComment } from "../actions";
import { removeNotify, createNotify } from "../actions/NotifyAction";
import {
  BsCheckCircleFill,
  BsHeart,
  BsHeartFill,
  BsPerson,
} from "react-icons/bs";
import api from "../api/api";
const Comment = ({ comment, userData, token, setComments, post }) => {
  const [likedComment, setLikedComment] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes.length);
  const socket = useSelector((state) => state.socketReduccer);
  useEffect(() => {
    if (comment.likes.length >= 0) {
      comment.likes.findIndex((id) => id === userData._id) >= 0
        ? setLikedComment(true)
        : setLikedComment(false);
    }
    setLikesCount(comment.likes.length);
  }, [comment.likes.length]);
  const onLikePress = async () => {
    setLikedComment((prev) => (likedComment ? prev - 1 : prev + 1));
    setLikedComment((prev) => !prev);
    const { data } = await api.patch(
      `/comment/like/${comment._id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const msg = {
      id: data.comment.userId._id,
      text: "liked your Comment",
      recipients: [data.comment.userId._id],
      url: `/post/${data.comment.postId}`,
      content: data.comment.comment,
    };
    if (!data.comment.likes.includes(userData._id)) {
      dispatch(removeNotify({ msg, token, socket }));
    } else {
      dispatch(createNotify({ msg, token, socket }));
    }
    setComments((prev) =>
      prev.map((comm) => (comm._id === comment._id ? data.comment : comm))
    );
  };
  const dispatch = useDispatch();
  const onDeletePress = async () => {
    const { data } = await api.delete(
      `/comment/delete/${comment._id}/${post._id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch(deleteComment(post._id, comment._id));
    const msg = {
      id: data.comment._id,
      text: "comment on your post",
      recipients: [post.userId._id],
      url: `/post/${data.comment.postId}`,
      content: data.comment.comment,
      image: post.image,
    };
    dispatch(removeNotify({ msg, token, socket }));
    setComments((prev) => prev.filter((comm) => comm._id !== comment._id));
  };
  return (
    <div className={`comment d-flex mb-3 `}>
      <Link
        to={`/profile/${comment.userId._id}`}
        className={`profilePic rounded-circle me-3 nav-link d-flex justify-content-center align-items-center ${
          comment.userId.profilePciture ? "" : "border border-2"
        }`}
      >
        {comment.userId.profilePicture ? (
          <img
            className="rounded-circle w-100 h-100"
            src={comment.userId.profilePicture.url}
            alt=""
          />
        ) : (
          <BsPerson className="fs-5" />
        )}
      </Link>

      <div className="comment-content w-100">
        <div className="name mb-1 lh-sm fs-6 d-flex">
          {comment.userId.username}
          {comment.userId.verified ? (
            <BsCheckCircleFill className="ms-1 fs-8 text-primary my-auto" />
          ) : (
            ""
          )}
        </div>
        <p className="content mb-2 fs-8 lh-sm text-info">{comment.comment}</p>
        <div className="like-time me-2 d-flex align-items-center w-100">
          <div
            onClick={() => onLikePress()}
            className={`like d-flex position-relative align-items-center justify-content-center ${
              likedComment ? "liked" : ""
            }`}
          >
            <BsHeart className="fs-6 " />
            <BsHeartFill className="fs-6 text-primary position-absolute" />
          </div>
          <div className="count fs-7 text-info ms-2">{likesCount} Like</div>
          <div className="delete" onClick={() => onDeletePress()}>
            {comment.userId._id === userData._id ||
            post.userId._id === userData._id ? (
              <div className="delete fs-7 text-info ms-4">Delete</div>
            ) : (
              ""
            )}
          </div>
          <span className="time lh-sm ms-auto fs-8">
            {format(comment.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
