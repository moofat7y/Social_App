import React from "react";

const CommentLoadding = () => {
  return (
    <div className="comment d-flex mb-3 ">
      <div className="profilePic rounded-circle me-3 nav-link d-flex justify-content-center align-items-center ">
        <div className="rounded-circle w-100 h-100 skelton"></div>
      </div>

      <div className="comment-content w-100">
        <div className="name mb-1 skelton fs-6"></div>
        <p className="desc skelton mb-2 fs-8 lh-sm text-info"></p>
        <div className="like-time me-2 d-flex align-items-center w-100">
          <div
            className={`like d-flex position-relative align-items-center justify-content-center`}
          >
            <span className="icon skelton"></span>
          </div>
          <div className="icon skelton fs-7 text-info ms-2"></div>
          <div className="delete"></div>
          <span className="time skelton lh-sm ms-auto fs-8"></span>
        </div>
      </div>
    </div>
  );
};

export default CommentLoadding;
