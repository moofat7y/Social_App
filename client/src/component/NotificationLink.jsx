import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsBell } from "react-icons/bs";

const NotificationLink = () => {
  const { notify } = useSelector((state) => state);

  return (
    <NavLink
      to="/notifications"
      className="nav-link d-flex align-items-center "
    >
      <div className="position-relative me-md-3">
        <BsBell className="bi bi-bell fs-5 "></BsBell>
        {notify.data.length > 0 ? (
          <span className="notify-length border border-light position-absolute top-0 start-50 text-light d-flex align-items-center justify-content-center my-auto ms-auto rounded-circle bg-primary">
            {notify.data.length}
          </span>
        ) : (
          ""
        )}
      </div>

      <span className="d-none d-md-inline">Notifications</span>
    </NavLink>
  );
};

export default NotificationLink;
