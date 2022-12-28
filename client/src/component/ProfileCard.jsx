import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddConversation, followUser, unFollowUser } from "../actions";
import ProfileModalEdit from "./ProfileModalEdit";
import ProfileImageControl from "./ProfileImageControl";
import { useNavigate } from "react-router-dom";
import CoverImageControl from "./CoverImageControl";
import { BsCheckCircleFill } from "react-icons/bs";
const ProfileCard = ({ state }) => {
  const user = JSON.parse(window.localStorage.getItem("profile"));
  const conversation = useSelector((state) => state.UserConversations);
  const [modalShow, setModalShow] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const socket = useSelector((state) => state.socketReduccer);
  const navigate = useNavigate();
  const [followedByMe, setFollowedByMe] = useState(
    state?.user?.followers?.findIndex((id) => id === user.userData._id) >= 0
      ? true
      : false
  );
  const dispatch = useDispatch();
  const handleFollowUser = async () => {
    setLoadding(true);
    await dispatch(
      followUser(state.user._id, user.token, user.userData._id, socket)
    );
    setLoadding(false);
    setFollowedByMe(true);
  };
  const handleUnFollowUser = async () => {
    setLoadding(true);
    await dispatch(
      unFollowUser(state.user._id, user.token, user.userData._id, socket)
    );
    setLoadding(false);
    setFollowedByMe(false);
  };
  const myConversation = conversation.find((conv) =>
    conv.members.includes(state?.user._id)
  );

  const onMessageClicked = async (e) => {
    e.preventDefault();
    if (!myConversation) {
      await dispatch(AddConversation(user.token, state?.user._id, socket));
      navigate(`/chats/${state.user._id}`);
    } else {
      navigate(`/chats/${state.user._id}`);
    }
  };
  return (
    <>
      <ProfileModalEdit show={modalShow} onHide={() => setModalShow(false)} />
      <CoverImageControl state={state} />
      <div className="profile-detail mb-3 rounded-4 p-3 bg-white position-relative">
        <ProfileImageControl user={user} state={state} />
        <div className="details text-center">
          <span className="d-block name fs-5 lh-sm mb-0 fw-bold">
            {state?.user.firstname} {state?.user.lastname}
          </span>
          <span className="d-flex justify-content-center mb-1 username lh-sm text-info">
            {state?.user.username}
            {state?.user.verified ? (
              <BsCheckCircleFill className="ms-1 my-auto fs-8 text-primary" />
            ) : (
              ""
            )}
          </span>
          <p className="description text-info">{state?.user.des}</p>
          <div className="user-status d-flex justify-content-center align-items-center">
            <div className="followings d-flex justify-content-center flex-column">
              <span className="text-info">Followers</span>
              <span>{state?.user.followers?.length || 0}</span>
            </div>
            <div className="followers mx-5 d-flex justify-content-center flex-column">
              <span className="text-info">Following</span>
              <span>{state?.user.followings?.length || 0}</span>
            </div>
            <div className="posts d-flex justify-content-center flex-column">
              <span className="text-info">Posts</span>
              <span>{state?.posts.length || 0}</span>
            </div>
          </div>
        </div>
        {state.user._id === user.userData._id ? (
          <button
            className="btn btn-primary mt-3 w-100"
            onClick={() => setModalShow(true)}
          >
            Edit Profile
          </button>
        ) : (
          ""
        )}

        {state.user._id !== user.userData._id ? (
          <div className="follow-control d-flex px-3 mt-3">
            {followedByMe ? (
              <button
                disabled={loadding ? true : false}
                className="btn bg-light text-black w-100 me-3"
                onClick={handleUnFollowUser}
              >
                {loadding ? (
                  <span
                    className="spinner-border me-2 spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  ""
                )}
                Following
              </button>
            ) : (
              <button
                disabled={loadding ? true : false}
                className="btn btn-primary w-100 me-3"
                onClick={handleFollowUser}
              >
                {loadding ? (
                  <span
                    className="spinner-border me-2 spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  ""
                )}
                Follow
              </button>
            )}

            <form
              className="d-inline-block w-100"
              onSubmit={(e) => onMessageClicked(e)}
            >
              <button type="submit" className="btn bg-light w-100 text-primary">
                Message
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProfileCard;
