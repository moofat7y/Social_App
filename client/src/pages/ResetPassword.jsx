import React from "react";
import ResetPass from "../component/ResetPass";

const ResetPassword = () => {
  return (
    <div className="auth d-flex flex-column flex-md-row vh-100">
      <div className="left-side h-100 d-flex flex-column w-50">
        <div className="header d-none d-md-block w-100 px-4 py-4 fs-4 fw-bold">
          SocialApp
        </div>
        <div className="auth-switch my-auto d-flex align-items-center justify-content-center">
          <ResetPass />
        </div>
      </div>
      <div className="right-side bg-white w-50 d-flex justify-content-center align-items-center">
        <div className="circle rounded-circle bg-primary"></div>
      </div>
    </div>
  );
};

export default ResetPassword;
