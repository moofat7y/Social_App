import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../actions";
const FollowBtn = ({ user }) => {
  const { socketReduccer, auth } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [followedByMe, setFollowedByMe] = useState(
    user?.followers?.findIndex((id) => id === auth.userData._id) >= 0
      ? true
      : false
  );
  const dispatch = useDispatch();
  const handleFollowUser = async () => {
    setLoading(true);
    await dispatch(
      followUser(user._id, auth.token, auth.userData._id, socketReduccer)
    );
    setFollowedByMe(true);
    setLoading(false);
  };

  const handleUnFollowUser = async () => {
    setLoading(true);
    await dispatch(
      unFollowUser(user._id, auth.token, auth.userData._id, socketReduccer)
    );
    setLoading(false);
    setFollowedByMe(false);
  };

  return (
    <>
      {!followedByMe ? (
        <button
          onClick={() => handleFollowUser()}
          className="btn btn-sm btn-primary d-flex align-items-center rounded-pill"
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            ""
          )}
          Follow
        </button>
      ) : (
        <button
          onClick={handleUnFollowUser}
          className="btn btn-sm bg-light d-flex align-items-center text-black rounded-pill"
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            ""
          )}
          Following
        </button>
      )}
    </>
  );
};

export default FollowBtn;
