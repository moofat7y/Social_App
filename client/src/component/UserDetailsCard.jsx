import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCheckCircleFill, BsPerson } from "react-icons/bs";
const UserDetailsCard = () => {
  const user = useSelector((state) => state.auth);
  return (
    <Link
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      to={`/profile/${user.userData._id}`}
      className={`profile nav-link d-none rounded-4 bg-white px-3 py-3 mb-3 w-100 d-md-flex align-items-center `}
    >
      <div
        className={`profilePic me-2 d-flex align-items-center justify-content-center ${
          user.userData.profilePicture ? "" : "border border-2 rounded-circle"
        }`}
      >
        {user.userData.profilePicture ? (
          <img
            src={user.userData.profilePicture.url}
            className="w-100 h-100 rounded-circle"
            alt=""
          />
        ) : (
          <BsPerson className="fs-4" />
        )}
      </div>

      <div className="details d-flex flex-column">
        <span className=" fw-bold name">
          {user.userData.firstname} {user.userData.lastname}
        </span>
        <span className="username d-flex text-info">
          @{user.userData.username}
          {user.userData.verified ? (
            <BsCheckCircleFill className="ms-1 my-auto fs-8 text-primary" />
          ) : (
            ""
          )}
        </span>
      </div>
    </Link>
  );
};

export default UserDetailsCard;
