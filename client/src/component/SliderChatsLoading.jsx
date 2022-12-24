import React from "react";

const SliderChatsLoading = () => {
  return (
    <div className="user-cont d-flex flex-column align-items-center">
      <div
        className={`profilePic mb-2 me-2 d-flex align-items-center justify-content-center  rounded-circle`}
      >
        <div className="w-100 h-100 skelton rounded-circle"></div>
      </div>
      <div className="name skelton"></div>
    </div>
  );
};

export default SliderChatsLoading;
