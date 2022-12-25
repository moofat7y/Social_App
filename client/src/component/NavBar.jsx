import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalControl from "./ModalControl";
import UserDetailsCard from "./UserDetailsCard";
import NotificationLink from "./NotificationLink";
import {
  BsHouseDoor,
  BsCompass,
  BsBookmarks,
  BsChatRightDots,
  BsGraphUp,
  BsPalette,
  BsGear,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  const [modalShow, setModalShow] = useState(false);

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
            <BsHouseDoor className="bi fs-5 me-md-3" />
            <span className="d-none d-md-inline">Home</span>
          </NavLink>
          <NavLink to="discover" className="nav-link">
            <BsCompass className="bi fs-5 me-md-3 " />
            <span className="d-none d-md-inline">Discover</span>
          </NavLink>
          <NotificationLink />
          <NavLink to="/bookmarks" className="nav-link">
            <BsBookmarks className="bi fs-5 me-md-3" />
            <span className="d-none d-md-inline">Bookmarks</span>
          </NavLink>
          <NavLink to="/chats" className="nav-link">
            <BsChatRightDots className="bi fs-5 me-md-3" />
            <span className="d-none d-md-inline">Message</span>
          </NavLink>

          <Link to="/" className="nav-link">
            <BsGraphUp className="bi fs-5 me-md-3" />
            <span className="d-none d-md-inline">Analytics</span>
          </Link>
          <Link to="#" onClick={() => setModalShow(true)} className="nav-link">
            <BsPalette className="bi fs-5 me-md-3" />
            <span className="d-none d-md-inline">Theme</span>
          </Link>
          <Link to="/" className="nav-link">
            <BsGear className="bi fs-5 me-md-3" />
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
