import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import StorieModal from "./StorieModal";
const AddStorie = () => {
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector((state) => state.auth);
  return (
    <div className="storie position-relative me-2 ">
      <LazyLoadImage
        effect="blur"
        src={user.userData.coverPicture.url}
        className="rounded-4 storie-image w-100 h-100"
        alt=""
      />
      <div className="user-image border d-flex justify-content-center aling-items-center border-2 border-primary rounded-circle position-absolute">
        {user.userData.profilePicture ? (
          <img
            src={user.userData.profilePicture.url}
            className="w-100 rounded-circle h-100"
            alt=""
          />
        ) : (
          <i className="bi bi-person fs-4 text-primary"></i>
        )}
      </div>
      <div
        onClick={() => setModalShow(true)}
        className="upload-storie d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute  top-50 start-50 translate-middle"
      >
        <i className="bi bi-plus-lg fs-5 text-primary fw-bold"></i>
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
