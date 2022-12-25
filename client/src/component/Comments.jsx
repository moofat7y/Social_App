import React, { useEffect, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { commentOnPost } from "../actions";
import { createNotify } from "../actions/NotifyAction";

import api from "../api/api";
import Comment from "./Comment";
import CommentLoadding from "./CommentLoadding";
const Comments = ({ post, setShowComment, showComments }) => {
  const { token, userData } = JSON.parse(
    window.localStorage.getItem("profile")
  );
  const [comments, setComments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const commentRef = useRef();
  const socket = useSelector((state) => state.socketReduccer);
  useEffect(() => {
    const fetchComments = async () => {
      setLoadding(true);
      const { data } = await api.get(`comment/${post._id}`, {
        headers: {
          Authorization: token,
        },
      });
      setLoadding(false);
      setComments(data.comments);
    };

    if (showComments && post.comments.length > 0) {
      fetchComments();
    }
  }, [showComments]);

  const renderedComments = comments?.map((comment, index) => {
    return (
      <Comment
        comment={comment}
        post={post}
        token={token}
        userData={userData}
        setComments={setComments}
        key={index}
      />
    );
  });
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const { data } = await api.put(
      `comment/addComment/${post._id}`,
      { comment: commentRef.current.value },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setUploading(false);

    setComments((prev) => [...prev, data.comment]);
    const msg = {
      id: data.comment._id,
      text: "comment on your post",
      recipients: [post.userId._id],
      url: `/post/${data.comment.postId}`,
      content: data.comment.comment,
      image: post.image,
    };
    dispatch(createNotify({ msg, token, socket }));
    dispatch(commentOnPost(post._id, data.comment._id));
    commentRef.current.value = "";
  };

  return (
    <>
      {post.comments.length > 0 ? (
        <p
          onClick={() => setShowComment((prev) => !prev)}
          className="fs-7 text-info comment-view"
        >
          View {post.comments.length >= 2 ? "all" : ""} {post.comments.length}{" "}
          comment
          {post.comments.length > 2 ? "s" : ""}
        </p>
      ) : (
        ""
      )}

      {showComments ? (
        <div className="comments-control mt-2">
          <div className="write-comment mb-3 d-flex align-items-center">
            <div
              className={`profilePic rounded-circle d-flex align-items-center justify-content-center ${
                post.userId.profilePicture ? "" : "border border-2 border-light"
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
            </div>
            <form onSubmit={(e) => onSubmit(e)} className="d-flex w-100">
              <input
                ref={commentRef}
                type="text"
                placeholder="Write a comment"
                className="mx-2 reset py-2 bg-light rounded-4 px-3 fs-8 text-info w-100"
              />
              <button
                type="submit"
                disabled={uploading ? true : false}
                className="btn btn-primary rounded-pill py-1 fs-8"
              >
                {uploading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Comment"
                )}
              </button>
            </form>
          </div>

          <div className="comments">
            {loadding ? (
              <>
                <CommentLoadding />
              </>
            ) : (
              renderedComments
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Comments;
