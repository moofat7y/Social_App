import React from "react";
import { useState } from "react";
import api from "../api/api";

const ForgotPassword = ({ setActiveView }) => {
  const [data, setData] = useState({
    result: "",
    loading: false,
    error: null,
    email: "",
  });
  const [emailIsValid, setEmailValid] = useState(null);

  const validateEmail = (email) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    setData((prev) => {
      return { ...prev, email: email };
    });
    if (pattern.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setData((prev) => {
      return { ...prev, loading: true };
    });
    try {
      const res = await api.post("/register/forgotpassword", {
        email: data.email,
      });
      setData((prev) => {
        return {
          ...prev,
          result: res.data.message,
          error: null,
          loading: false,
        };
      });
    } catch (err) {
      setData((prev) => {
        return { ...prev, loading: false, error: err.response.data.message };
      });
    }
  };
  return (
    <div className="signin">
      <p className="fs-2 mb-2 fw-bold text-center text-md-start">
        Forgot Password
      </p>
      <p className="fs-info text-center text-md-start">
        Enter your email to reset your password
      </p>
      <form onSubmit={(e) => onFormSubmit(e)} className="d-flex flex-column">
        <div className="from-group mb-4">
          <label htmlFor="" className="form-label mb-1">
            Email
          </label>
          <input
            onChange={(e) => validateEmail(e.target.value)}
            type="text"
            className="form-control"
            name="data.email"
            id="data.email"
          />
          {data.error ? (
            <p className="text-danger text-center mb-0">{data.error}</p>
          ) : (
            ""
          )}
        </div>
        <button
          disabled={data.loading || data.result || !emailIsValid ? true : false}
          type="submit"
          className="btn mb-4 btn-primary rounded-3 w-100"
        >
          {data.loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : data.result ? (
            <span className="fs-8">{data.result}</span>
          ) : (
            "Verify email"
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

export default ForgotPassword;
