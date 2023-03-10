import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import StorieModal from "./StorieModal";
import { BsPlus, BsPerson } from "react-icons/bs";
const AddStorie = () => {
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector((state) => state.auth);
  return (
    <div className="storie position-relative me-2 ">
      {user.userData.coverPicture ? (
        <LazyLoadImage
          effect="blur"
          src={user.userData.coverPicture.url}
          className="rounded-4 storie-image w-100 h-100"
          alt=""
        />
      ) : (
        <div className="position-absolute rounded-4 w-100 h-100 bg-white"></div>
      )}
      <div className="user-image border d-flex justify-content-center align-items-center border-2 border-primary rounded-circle position-absolute">
        {user.userData.profilePicture ? (
          <img
            src={user.userData.profilePicture.url}
            className="w-100 rounded-circle h-100"
            alt=""
          />
        ) : (
          <BsPerson className="fs-4 text-primary" />
        )}
      </div>
      <div
        onClick={() => setModalShow(true)}
        className="upload-storie d-flex align-items-center justify-content-center bg-light rounded-circle position-absolute  top-50 start-50 translate-middle"
      >
        <BsPlus className="fs-5 text-primary fw-bold" />
      </div>
      <StorieModal
        user={user}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default AddStorie;
