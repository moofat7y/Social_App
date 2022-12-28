import React from "react";
import { BsCheckCircleFill, BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
const Notify = ({ notify }) => {
  return (
    <>
      <small>{format(notify.createdAt)}</small>
      <div className="notify mb-2 px-3 py-2 bg-white rounded-4 nav-link align-items-center d-flex">
        <Link
          to={`/profile/${notify.user._id}`}
          className={`profilePic nav-link me-3 d-flex align-items-center justify-content-center ${
            notify.user.profilePicture ? "" : "border border-2 rounded-circle"
          }`}
        >
          {notify.user.profilePicture ? (
            <img
              src={notify.user.profilePicture.url}
              className="w-100 rounded-circle h-100"
              alt=""
            />
          ) : (
            <BsPerson className="fs-4" />
          )}
        </Link>
        <div>
          <div className="d-flex">
            <Link
              to={`/profile/${notify.user._id}`}
              className="me-2 fw-semibold nav-link d-flex"
            >
              {notify.user.username}
              {notify.user.verified ? (
                <BsCheckCircleFill className="ms-1 my-auto fs-8 text-primary" />
              ) : (
                ""
              )}
            </Link>
            <Link to={notify.url} className="fs-7 nav-link text-info">
              {notify.text}
            </Link>
          </div>
          {notify.content && (
            <Link to={notify.url} className="fs-8 nav-link">
              {notify.content.length > 20 ? (
                <>{notify.content.slice(0, 20)}...</>
              ) : (
                notify.content
              )}
            </Link>
          )}
        </div>
        <div className="h-100 ms-auto">
          {notify.image && (
            <img className="image rounded-1" src={notify.image} />
          )}
        </div>
      </div>
    </>
  );
};

export default Notify;
