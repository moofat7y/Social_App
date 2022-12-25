import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { updateCoverImage } from "../actions";
import { toast } from "react-toastify";
const CoverImageControl = ({ state }) => {
  const { auth } = useSelector((state) => state);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const uploadImage = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", file);
        await dispatch(updateCoverImage(formData, auth.token));
        setLoading(false);
        toast.success("Cover picture updated", {
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
      }
    };
    if (file) {
      uploadImage();
    }
  }, [file]);
  return (
    <div className="cover-image mb-3 d-flex position-relative">
      <label
        role="button"
        htmlFor="upload"
        className="upload  end-0 position-absolute pt-2 px-3"
      >
        <i className="bi bi-image text-info fs-5"></i>
      </label>
      <input
        type="file"
        id="upload"
        className="d-none"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {loading ? (
        <div className="w-100 h-100 rounded-4 skelton"></div>
      ) : state.user.coverPicture ? (
        <LazyLoadImage
          effect="blur"
          className="w-100 h-100 rounded-4"
          src={state.user.coverPicture.url}
          alt=""
        />
      ) : (
        <div className="w-100 h-100 rounded-4 bg-white d-flex justify-content-center align-items-center">
          <i className="bi bi-person text-light display-1"></i>
        </div>
      )}
    </div>
  );
};

export default CoverImageControl;
