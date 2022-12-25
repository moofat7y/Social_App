import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const ResetPass = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    cpassword: "",
    err: "",
    loading: "",
  });
  const [passwordShow, setPasswordShow] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.cpassword) {
      return setData((prev) => {
        return { ...prev, err: "Passwords not matched" };
      });
    }
    setData((prev) => {
      return { ...prev, loading: true };
    });
    try {
      const res = await api.post(
        "/register/resetpassword",
        { password: data.password },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData((prev) => {
        return { ...prev, loading: false };
      });
      navigate("/auth");
    } catch (error) {
      setData((prev) => {
        return { ...prev, loading: false };
      });

      setData((prev) => {
        return { ...prev, err: error.response.data.message };
      });
    }
  };

  return (
    <div className="">
      {data.err ? (
        <p className="text-danger text-center mb-0">{data.err}</p>
      ) : (
        ""
      )}

      <p className="fs-2 mb-2 fw-bold text-center text-md-start">
        Reset Password
      </p>
      <p className="fs-info text-center text-md-start">
        Enter your new password
      </p>
      <form onSubmit={(e) => onFormSubmit(e)} className="d-flex flex-column">
        <label htmlFor="" className="form-label">
          Password
        </label>
        <div className="from-group mb-0 position-relative">
          <input
            // onBlur={(e) => validatePassword(e.target.value)}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            type={`${passwordShow ? "text" : "password"}`}
            className="form-control py-2"
            name="password"
            id="password"
          />

          <div
            onClick={() => setPasswordShow((prev) => !prev)}
            className="show-hide d-flex justify-content-center align-items-center position-absolute"
          >
            {" "}
            {passwordShow ? (
              <BsEye className="]text-primary" />
            ) : (
              <BsEyeSlash className="text-primary" />
            )}
          </div>
        </div>
        <span className={`form-text `}>Min length 6</span>
        <label htmlFor="" className="form-label">
          Confirm Password
        </label>
        <div className="from-group mb-3 position-relative">
          <input
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            type="password"
            className="form-control py-2"
            name="cpassword"
            id="cpassword"
          />
        </div>
        <button
          disabled={
            data.loading ||
            data.success ||
            data.password.length === 0 ||
            data.cpassword.length === 0
              ? true
              : false
          }
          type="submit"
          className="btn mb-4 btn-primary rounded-3 w-100"
        >
          {data.loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : data.success ? (
            <span className="fs-8">{data.success}</span>
          ) : (
            "Confirm"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
