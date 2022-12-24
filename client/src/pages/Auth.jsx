import React, { useState } from "react";
import ForgotPassword from "../component/ForgotPassword";
import SignIn from "../component/SignIn";
import SignUp from "../component/SignUp";
const Auth = () => {
  const [activeView, setActiveView] = useState("signin");
  return (
    <div className="auth d-flex flex-column flex-md-row vh-100">
      <div className="left-side h-100 d-flex flex-column w-50">
        <div className="header d-none d-md-block w-100 px-4 py-4 fs-4 fw-bold">
          SocialApp
        </div>
        <div className="auth-switch my-auto d-flex align-items-center justify-content-center">
          {activeView === "signin" ? (
            <SignIn setActiveView={setActiveView} />
          ) : activeView === "signup" ? (
            <SignUp setActiveView={setActiveView} />
          ) : (
            <ForgotPassword setActiveView={setActiveView} />
          )}
        </div>
      </div>
      <div className="right-side bg-white w-50 d-flex justify-content-center align-items-center">
        <div className="circle rounded-circle bg-primary"></div>
      </div>
    </div>
  );
};

export default Auth;
