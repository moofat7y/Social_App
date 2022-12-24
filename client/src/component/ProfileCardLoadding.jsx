import React from "react";

const ProfileCardLoadding = () => {
  return (
    <>
      <div className="cover-image mb-3 bg-white rounded-4">
        <div className=" w-100 h-100 skelton rounded-4"></div>
      </div>
      <div className="profile-detail mb-3 rounded-4 p-3 bg-white position-relative">
        <div className="profile-image bg-white d-flex align-items-center justify-content-center rounded-circle position-absolute ">
          <div className="skelton w-100 h-100 rounded-circle border border-4 border-white"></div>
        </div>
        <div className="details d-flex flex-column align-items-center">
          <span className="d-block name skelton ++fs-5 lh-sm mb-2 fw-bold"></span>
          <span className="d-block mb-2 time skelton lh-sm text-info"></span>
          <p className="desc skelton text-info"></p>
          <div className="user-status d-flex justify-content-center align-items-center">
            <div className="followings d-flex justify-content-center align-items-center flex-column">
              <span className="name skelton mb-2"></span>
              <span className="skelton icon"></span>
            </div>
            <div className="followers mx-5 d-flex align-items-center justify-content-center flex-column">
              <span className="name skelton mb-2"></span>
              <span className="skelton icon"></span>
            </div>
            <div className="posts d-flex justify-content-center align-items-center flex-column">
              <span className="name skelton mb-2"></span>
              <span className="skelton icon"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCardLoadding;
