import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../actions";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsPerson } from "react-icons/bs";

const ProfileImageControl = ({ user, state }) => {
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const updateImage = async () => {
      const formData = new FormData();
      formData.append("image", file);
      await dispatch(updateProfilePicture(formData, user.token));
      toast.success("Profile picture updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    if (file) {
      updateImage();
    }
  }, [file]);

  return (
    <div
      className={`profile-image bg-white border-5 border border-light
       overflow-hidden d-flex align-items-center justify-content-center rounded-circle position-absolute`}
    >
      {state.user.profilePicture ? (
        <LazyLoadImage
          effect="blur"
          src={file ? URL.createObjectURL(file) : state.user.profilePicture.url}
          className="w-100 border-0 rounded-circle h-100"
          alt=""
        />
      ) : (
        <BsPerson className="fs-1" />
      )}
      {state.user._id === user.userData._id ? (
        <>
          <label htmlFor="image" className="position-absolute text-center pt-3">
            Change
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="image"
            className="d-none"
            id="image"
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileImageControl;
