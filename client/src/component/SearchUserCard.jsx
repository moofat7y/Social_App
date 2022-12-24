import React from "react";
import { Link } from "react-router-dom";
const SearchUserCard = ({ user, setShowDropDown }) => {
  return (
    <Link
      to={`/profile/${user._id}`}
      onClick={() => setShowDropDown(false)}
      className="user-card nav-link py-3 px-3 d-flex align-items-center"
    >
      <div
        className={`profilePic nav-link me-2 d-flex align-items-center justify-content-center ${
          user.profilePicture ? "" : "border border-2 rounded-circle"
        }`}
      >
        {user.profilePicture ? (
          <img
            src={user.profilePicture.url}
            className="w-100 rounded-circle h-100"
            alt=""
          />
        ) : (
          <i className="bi bi-person fs-4"></i>
        )}
      </div>
      <div className="username">{user.username}</div>
    </Link>
  );
};

export default SearchUserCard;
