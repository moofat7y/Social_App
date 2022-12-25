import React from "react";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import FollowBtn from "./FollowBtn";
const Suggest = ({ user }) => {
  return (
    <div className="bg-white py-3 px-xl-3 px-xxl-4 rounded-4 w-100 mb-2">
      <div className="user d-flex">
        <Link to={`profile/${user._id}`} className="nav-link d-flex">
          <div className="profilePic me-2 border border-1 border-light d-flex align-items-center justify-content-center rounded-circle">
            {user.profilePicture ? (
              <img
                src={user.profilePicture.url}
                className="w-100 rounded-circle h-100"
                alt=""
              />
            ) : (
              <BsPerson className="fs-4" />
            )}
          </div>
          <div className="name">
            <span className="d-block lh-sm fs-7">{user.username}</span>
            <span className="lh-sm d-block text-info fs-7">
              {user.firstname} {user.lastname}
            </span>
          </div>
        </Link>

        <div className="control ms-auto my-auto">
          <FollowBtn user={user} />
        </div>
      </div>
    </div>
  );
};

export default Suggest;
