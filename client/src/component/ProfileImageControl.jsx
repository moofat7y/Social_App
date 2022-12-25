import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../actions";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsPerson } from "react-icons/bs";

const ProfileImageControl = ({ user, state }) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const updateImage = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      try {
        await dispatch(updateProfilePicture(formData, user.token));
        setLoading(false);
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
      } catch (error) {
        setLoading(false);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
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
      {loading ? (
        <div className="w-100 h-100 rounded-circle skelton"></div>
      ) : state.user.profilePicture ? (
        <LazyLoadImage
          effect="blur"
          src={state.user.profilePicture.url}
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
