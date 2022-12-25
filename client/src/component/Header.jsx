import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { BsPerson, BsBoxArrowLeft } from "react-icons/bs";
const Header = () => {
  const onLogout = () => {
    window.localStorage.removeItem("profile");
    window.location.reload();
  };
  const { auth } = useSelector((state) => state);
  return (
    <div className="header bg-white">
      <div className="container">
        <div className="header-container py-2 row justify-content-between align-items-center">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center px-0 px-sm-1 col-1  col-md-3 fs-4 text-black fw-bold"
          >
            <Logo />
            <span className="d-none d-md-inline ms-2">SocialApp</span>
          </Link>
          <div className="col-12 col-sm-13 col-md-10 px-1 px-sm-0 px-xl-5">
            <SearchBar />
          </div>

          <div className="account d-flex col-4 col-sm-3 col-md-3 px-0 pe-2 align-items-center justify-content-end ">
            <div
              onClick={() => onLogout()}
              className="logout me-2 btn bg-light d-flex justify-content-center align-items-center rounded-circle"
            >
              <BsBoxArrowLeft className="fs-6 text-primary flex-1" />
            </div>
            <Link
              to={`profile/${auth.userData._id}`}
              className={`profilePic nav-link d-flex align-items-center justify-content-center ${
                auth.userData.profilePicture
                  ? ""
                  : "border border-2 rounded-circle"
              }`}
            >
              {auth.userData.profilePicture ? (
                <img
                  src={auth.userData.profilePicture.url}
                  className="w-100 h-100 rounded-circle"
                  alt=""
                />
              ) : (
                <BsPerson className="fs-4" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
