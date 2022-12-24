import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalControl from "./ModalControl";
import UserDetailsCard from "./UserDetailsCard";
import NotificationLink from "./NotificationLink";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const location = useLocation();

  return (
    <div className="px-0 sidenav py-2  position-fixed col-sm-2 col-md-6 col-lg-5 col-xl-4">
      <ModalControl show={modalShow} onHide={() => setModalShow(false)} />
      <div className="navbar flex-column">
        <UserDetailsCard />
        <ul className="navbar-nav overflow-hidden bg-white flex-column w-100 rounded-4">
          <NavLink
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/"
            className="nav-link"
          >
            <i className="bi bi-house-door fs-5 me-md-3"></i>
            <span className="d-none d-md-inline">Home</span>
          </NavLink>
          <NavLink to="discover" className="nav-link">
            <i className="bi fs-5 me-md-3 bi-compass"></i>
            <span className="d-none d-md-inline">Discover</span>
          </NavLink>
          <NotificationLink />
          <NavLink to="/bookmarks" className="nav-link">
            <i className="bi bi-bookmarks fs-5 me-md-3"></i>
            <span className="d-none d-md-inline">Bookmarks</span>
          </NavLink>
          <NavLink to="/chats" className="nav-link">
            <i className="bi bi-chat-right-dots fs-5 me-md-3"></i>
            <span className="d-none d-md-inline">Message</span>
          </NavLink>

          <Link to="/" className="nav-link">
            <i className="bi bi-graph-up fs-5 me-md-3"></i>
            <span className="d-none d-md-inline">Analytics</span>
          </Link>
          <Link to="#" onClick={() => setModalShow(true)} className="nav-link">
            <i className="bi bi-palette fs-5 me-md-3"></i>
            <span className="d-none d-md-inline">Theme</span>
          </Link>
          <Link to="/" className="nav-link">
            <i className="bi bi-gear fs-5 me-md-3"></i>
            <span className="d-none d-md-inline">Settings</span>
          </Link>
        </ul>

        <button className="btn mt-3 py-2 btn-primary w-100 rounded-pill d-none d-md-block">
          Create Post
        </button>
      </div>
    </div>
  );
};

export default NavBar;
