import React from "react";

const PostLoading = () => {
  return (
    <div className="post skelton mb-3 p-3 bg-white rounded-4">
      <div className="control  mb-3 d-flex">
        <div className="profilePic nav-link me-2">
          <div className="w-100 skelton rounded-circle h-100" />
        </div>
        <div className="post-user">
          <span className="d-block lh-sm fs-6 mb-0 name fw-bold mb-1 skelton"></span>
          <span className="d-block fs-8 text-dark time skelton"></span>
        </div>
        <div className="post-control ms-auto">
          <div className="icon skelton"></div>
        </div>
      </div>

      <div className="postImage mb-2">
        <div className="w-100 h-100 rounded-4 image skelton" />
      </div>

      <div className="post-reaction mb-2 px-3 d-flex align-items-center">
        <div className="likes skelton"></div>
      </div>

      <div className="desc skelton mb-1"></div>
      <div className="comment skelton"></div>
    </div>
  );
};

export default PostLoading;
