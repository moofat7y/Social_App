import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../actions";
import BookMark from "./BookMark";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  BsChatDots,
  BsHeart,
  BsHeartFill,
  BsPerson,
  BsShare,
  BsThreeDots,
} from "react-icons/bs";
const TimelinePost = ({ post }) => {
  let user = JSON.parse(window.localStorage.getItem("profile"));
  const [liked, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes.length);

  const [showComments, setShowComment] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const socket = useSelector((state) => state.socketReduccer);
  const dispatch = useDispatch();
  const handleLike = async () => {
    dispatch(likePost(post._id, user.token, socket, user.userData._id));
    if (post.likes.findIndex((id) => id === user.userData._id) >= 0) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLike((prev) => !prev);
  };
  useEffect(() => {
    setLike(
      post.likes.find((like) => like === user.userData._id) ? true : false
    );
    setLikesCount(post.likes.length);
  }, [post.likes.length]);

  const likes = () => {
    if (likesCount > 0) {
      return post.likes.find((like) => like === user.userData._id) ? (
        <>
          {likesCount > 2
            ? `you and ${post.likes.length - 1} others`
            : `${likesCount} like${likesCount > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          {likesCount} {likesCount > 1 ? "likes" : "like"}{" "}
        </>
      );
    }

    return "";
  };
  const onPostDelete = () => {
    dispatch(deletePost(user.token, post._id, socket));
  };
  return (
    <div className="post mb-3 p-3 bg-white rounded-4">
      <div className="control  mb-3 d-flex">
        <Link
          to={`/profile/${post.userId._id}`}
          className={`profilePic nav-link me-2 d-flex align-items-center justify-content-center ${
            post.userId.profilePicture ? "" : "border border-2 rounded-circle"
          }`}
        >
          {post.userId.profilePicture ? (
            <img
              src={post.userId.profilePicture.url}
              className="w-100 rounded-circle h-100"
              alt=""
            />
          ) : (
            <BsPerson className="fs-4" />
          )}
        </Link>
        <div className="post-user">
          <span className="d-block lh-sm fs-6 mb-0 name fw-bold">
            {post.userId.username}
          </span>
          <span className="d-block fs-8 text-dark">
            {format(post.createdAt)}
          </span>
        </div>
        <div
          className="post-control ms-auto position-relative ps-1 mb-auto"
          onClick={() => setDropDown((prev) => !prev)}
        >
          <BsThreeDots className="fs-6 text-dark" />
          {dropDown ? (
            <div className="dropdown shadow-sm position-absolute top-50 end-100 d-flex flex-column align-items-center">
              {post.userId._id === user.userData._id ? (
                <button
                  className="btn bg-light rounded-0 text-info fs-7 px-3 py-1"
                  onClick={() => onPostDelete()}
                >
                  delete
                </button>
              ) : (
                ""
              )}

              <button
                className="btn bg-light w-100 rounded-0 text-info fs-7 px-3 py-1"
                onClick={() =>
                  navigator.clipboard.writeText(
                    window.location.origin + "/post/" + post._id
                  )
                }
              >
                link
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {post.image ? (
        <div className="postImage mb-2">
          <LazyLoadImage
            // placeholderSrc={post.image.url}
            effect="blur"
            src={post.image.url}
            className="w-100 h-100 rounded-4"
            alt=""
          />
        </div>
      ) : (
        <p className="post-description lh-sm mb-1 px-1 fs-7">{post.desc}</p>
      )}

      <div className="post-reaction mb-2 px-3 d-flex align-items-center">
        <div
          onClick={() => handleLike()}
          className={`like position-relative d-flex align-items-center justify-content-center ${
            liked ? "liked" : ""
          }`}
        >
          <BsHeart className="fs-5 " />
          <BsHeartFill className="text-primary fs-5 position-absolute" />
        </div>
        <BsChatDots
          onClick={() => setShowComment((prev) => !prev)}
          className="fs-5 mx-3 comment"
        />
        <BsShare className="fs-5 share" />
        <BookMark post={post} />
      </div>

      <div className="likes fs-7 px-1">{likes()}</div>
      {post.image ? (
        <p className="post-description lh-sm mb-1 px-1 fs-7">{post.desc}</p>
      ) : (
        ""
      )}
      <Comments
        post={post}
        setShowComment={setShowComment}
        showComments={showComments}
      />
    </div>
  );
};

export default TimelinePost;
