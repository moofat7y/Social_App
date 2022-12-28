import React, { useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { signIn } from "../actions";
const SignIn = ({ setActiveView }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loadding, setLoadding] = useState(false);
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoadding(true);
    try {
      await dispatch(
        signIn({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
      setLoadding(false);
      window.location.replace("/");
    } catch (err) {
      setLoadding(false);
      setError(err.message);
    }
  };
  return (
    <div className="signin">
      {error ? <p className="text-danger text-center mb-0">{error}</p> : ""}
      <p className="fs-2 mb-2 fw-bold text-center text-md-start">
        Welcome back
      </p>
      <p className="fs-info text-center text-md-start">
        Welcome back! Please enter your details
      </p>
      <form onSubmit={(e) => onFormSubmit(e)} className="d-flex flex-column">
        <div className="from-group mb-3">
          <label htmlFor="" className="form-label mb-1">
            Email
          </label>
          <input
            ref={emailRef}
            type="text"
            className="form-control"
            name="email"
            id="email"
          />
        </div>

        <div className="from-group mb-3 ">
          <label htmlFor="" className="form-label mb-1">
            Password
          </label>
          <div className="cont-pass position-relative">
            <input
              ref={passwordRef}
              type={`${passwordShow ? "text" : "password"}`}
              className="form-control"
              name="password"
              id="password"
            />

            <div
              onClick={() => setPasswordShow((prev) => !prev)}
              className="show-hide d-flex justify-content-center align-items-center position-absolute"
            >
              {passwordShow ? (
                <BsEye className="text-primary" />
              ) : (
                <BsEyeSlash className="text-primary" />
              )}
            </div>
          </div>
        </div>
        <span
          onClick={() => setActiveView("forgotPassword")}
          className="d-inline my-2 text-primary reset-pass"
        >
          Forgot Password
        </span>
        <button
          disabled={loadding ? true : false}
          type="submit"
          className="btn mb-4 btn-primary rounded-3 w-100"
        >
          {loadding ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Sign in"
          )}
        </button>
        <span className="d-block mx-auto">
          Don't have an account?{" "}
          <span
            className="text-primary signin-btn"
            onClick={() => setActiveView("signup")}
          >
            Sign Up
          </span>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
