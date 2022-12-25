import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadNewPost } from "../actions";
import { BsImages, BsPerson } from "react-icons/bs";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const descRef = useRef();
  const data = JSON.parse(window.localStorage.getItem("profile"));
  const { socketReduccer, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("desc", descRef.current.value);
    formData.append("image", file);
    try {
      await dispatch(uploadNewPost(data?.token, formData, socketReduccer));
      setUploading(false);
      descRef.current.value = "";
      setFile("");
    } catch (err) {
      setUploading(false);
    }
  };
  return (
    <div className="create-post p-3  mb-3 rounded-4 bg-white">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="d-flex align-items-center w-100">
          <div className="profilePic d-flex justify-content-center align-items-center border border-2 border-light rounded-circle me-3">
            {auth.userData.profilePicture ? (
              <img
                src={auth.userData.profilePicture.url}
                className="w-100 h-100 rounded-circle"
                alt=""
              />
            ) : (
              <BsPerson className="fs-5" />
            )}
          </div>
          <input
            required
            autoComplete="off"
            ref={descRef}
            name="desc"
            type="text"
            className="reset bg-white text-info w-100 fs-7"
            placeholder={`What's in your mind, ${data.userData.firstname}?`}
          />
          <button
            type="submit"
            disabled={uploading ? true : false}
            className="btn btn-primary rounded-pill py-1 px-4"
          >
            {uploading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Post"
            )}
          </button>
        </div>
        <div className="px-5">
          <hr className="bg-info w-100 my-3" />
        </div>
        {file ? (
          <div className="postImage w-100 rounded-4 overflow-hidden">
            <img
              className="w-100 h-100"
              src={URL.createObjectURL(file)}
              alt=""
            />
          </div>
        ) : (
          ""
        )}
        <div className="upload px-4">
          <div className="form-group">
            <label htmlFor="file" className="d-flex align-items-center">
              <BsImages className="me-2 fs-5 text-warning" />
              <span className="fs-7">Photo</span>
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              accept=".png,.jpeg,.jpg"
              type="file"
              name="image"
              className="d-none"
              id="file"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
