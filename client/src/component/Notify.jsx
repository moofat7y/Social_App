import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
const Notify = ({ notify }) => {
  console.log(notify);
  return (
    <>
      <small>{format(notify.createdAt)}</small>
      <Link
        to={notify.url}
        className="notify mb-2 px-3 py-2 bg-white rounded-4 nav-link align-items-center d-flex"
      >
        <div
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
            <i className="bi bi-person fs-4"></i>
          )}
        </div>
        <div>
          <div>
            <strong className="me-2">{notify.user.username}</strong>
            <span className="fs-7 text-info">{notify.text}</span>
          </div>
          {notify.content && (
            <small>
              {notify.content.length > 20 ? (
                <>{notify.content.slice(0, 20)}...</>
              ) : (
                notify.content
              )}
            </small>
          )}
        </div>
        <div className="h-100 ms-auto">
          {notify.image && (
            <img className="image rounded-1" src={notify.image} />
          )}
        </div>
      </Link>
    </>
  );
};

export default Notify;
