import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../actions";
import { toast } from "react-toastify";
const SignUp = ({ setActiveView }) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [emailIsValid, setEmailValid] = useState(null);
  const [usernameIsValid, setUsernameValid] = useState(null);
  const [loadding, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [passwordCheck, setPassowrdCheck] = useState({
    upper: null,
    lower: null,
    number: null,
    lenght: null,
  });
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const validateUserName = (username) => {
    setSignUpData((prev) => {
      return { ...prev, username: username };
    });

    if (username.length >= 3) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }
  };
  const validateEmail = (email) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    setSignUpData((prev) => {
      return { ...prev, email: email };
    });
    if (pattern.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const validatePassword = (password) => {
    const lowerPattern = /(?=.*[a-z])/;
    const upperPattern = /(?=.*[A-Z])/;
    const numberPattern = /(?=.*[0-9])/;
    const lengthPattern = /(?=.{8,})/;

    setSignUpData((prev) => {
      return { ...prev, password: password };
    });
    // check for lowercase
    lowerPattern.test(password)
      ? setPassowrdCheck((prev) => {
          return { ...prev, lower: true };
        })
      : setPassowrdCheck((prev) => {
          return { ...prev, lower: false };
        });

    // check for uppercase
    upperPattern.test(password)
      ? setPassowrdCheck((prev) => {
          return { ...prev, upper: true };
        })
      : setPassowrdCheck((prev) => {
          return { ...prev, upper: false };
        });

    // check for contain number
    numberPattern.test(password)
      ? setPassowrdCheck((prev) => {
          return { ...prev, number: true };
        })
      : setPassowrdCheck((prev) => {
          return { ...prev, number: false };
        });

    // check for length
    lengthPattern.test(password)
      ? setPassowrdCheck((prev) => {
          return { ...prev, lenght: true };
        })
      : setPassowrdCheck((prev) => {
          return { ...prev, lenght: false };
        });
  };

  const dispatch = useDispatch();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(signUp(signUpData));
      setLoading(false);
      setActiveView("signin");
      toast.success("Successfuly signup", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      setLoading(false);
      setErr(err.message);
    }
  };
  return (
    <div className="signup">
      {err ? <p className="text-danger text-center mb-0">{err}</p> : ""}
      <p className="fs-2 mt-2 mb-2 fw-bold text-center text-md-start">
        Sign up
      </p>
      <form
        onSubmit={(e) => onFormSubmit(e)}
        action=""
        className="d-flex flex-column mx-0"
      >
        <div className="form-group d-flex mb-3">
          <input
            onChange={(e) =>
              setSignUpData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            name="firstname"
            type="text"
            placeholder="First name*"
            className="form-control me-2 py-2"
            id="fsname"
          />
          <input
            onChange={(e) =>
              setSignUpData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            name="lastname"
            type="text"
            placeholder="Last name*"
            id="lsname"
            className="form-control ms-2 py-2"
          />
        </div>
        <div className="from-group mb-3">
          <input
            onBlur={(e) => validateUserName(e.target.value)}
            onChange={(e) => validateUserName(e.target.value)}
            type="text"
            className="form-control py-2"
            name="username"
            id="username"
            placeholder="username*"
          />
          <span
            className={`form-text ${
              usernameIsValid === false
                ? "text-danger"
                : usernameIsValid === true
                ? "text-primary "
                : ""
            }`}
          >
            Min length 3
          </span>
        </div>

        <div className="from-group mb-3">
          <input
            onBlur={(e) => validateEmail(e.target.value)}
            onChange={(e) => validateEmail(e.target.value)}
            type="text"
            className="form-control py-2"
            name="email"
            id="email"
            placeholder="E-mail*"
          />
          <span
            className={`form-text ${
              emailIsValid === false
                ? "text-danger"
                : emailIsValid === true
                ? "text-primary"
                : ""
            }`}
          >
            Enter A Valid Email
          </span>
        </div>

        <div className="from-group mb-0 position-relative">
          <input
            onBlur={(e) => validatePassword(e.target.value)}
            onChange={(e) => validatePassword(e.target.value)}
            type={`${passwordShow ? "text" : "password"}`}
            className="form-control py-2"
            name="password"
            id="password"
            placeholder="Create password*"
          />

          <div
            onClick={() => setPasswordShow((prev) => !prev)}
            className="show-hide d-flex justify-content-center align-items-center position-absolute"
          >
            {passwordShow ? (
              <i className="bi bi-eye text-primary"></i>
            ) : (
              <i className="bi bi-eye-slash text-primary"></i>
            )}
          </div>
        </div>
        <div className="password-validate">
          <span
            className={`form-text fs-8 lh-sm d-block mb-1 ${
              passwordCheck.lower === false
                ? "text-danger"
                : passwordCheck.lower === true
                ? "text-primary"
                : ""
            }`}
          >
            Must contian at least 1 lowercase characters
          </span>
          <span
            className={`form-text fs-8 lh-sm d-block mb-1 ${
              passwordCheck.upper === false
                ? "text-danger"
                : passwordCheck.upper === true
                ? "text-primary"
                : ""
            }`}
          >
            Must contian at least 1 uppercase characters
          </span>
          <span
            className={`form-text fs-8 lh-sm d-block mb-1 ${
              passwordCheck.number === false
                ? "text-danger"
                : passwordCheck.number === true
                ? "text-primary"
                : ""
            }`}
          >
            Must contian at least 1 numeric characters
          </span>
          <span
            className={`form-text fs-8 lh-sm d-block mb-1 ${
              passwordCheck.lenght === false
                ? "text-danger"
                : passwordCheck.lenght === true
                ? "text-primary"
                : ""
            }`}
          >
            Must be 6 characters length at least
          </span>
        </div>
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
            "Sign up"
          )}
        </button>
        <span className="d-block mx-auto">
          Don't have an account?
          <span
            className="text-primary signup-btn ms-1"
            onClick={() => setActiveView("signin")}
          >
            Sign In
          </span>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
