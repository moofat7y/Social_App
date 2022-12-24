import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProfile } from "../actions";
import { toast } from "react-toastify";
const ProfileModalEdit = (props) => {
  const user = JSON.parse(window.localStorage.getItem("profile"));
  const [updatedProfile, setUpdatedProfile] = useState({
    firstname: user.userData.firstname ? user.userData.firstname : "",
    lastname: user.userData.lastname ? user.userData.lastname : "",
    username: user.userData.username ? user.userData.username : "",
    des: user.userData.des ? user.userData.des : "",
    gender: user.userData.gender ? user.userData.gender : "",
    relationShip: user.userData.relationShip ? user.userData.relationShip : "",
    from: user.userData.from ? user.userData.from : "",
    city: user.userData.city ? user.userData.city : "",
  });
  const dispatch = useDispatch();
  const [loadding, setLoadding] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoadding(true);
    try {
      await dispatch(
        updateProfile(user.userData._id, updatedProfile, user.token)
      );
      setLoadding(false);
      props.onHide();
      toast.success("Profile updated", {
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
      setLoadding(false);

      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-4 rounded-4 bg-white text-center">
        <h4 className="mb-3">Edit your profile</h4>

        <div className="body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group d-flex mb-3">
              <input
                onChange={(e) =>
                  setUpdatedProfile((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                value={updatedProfile.firstname}
                name="firstname"
                type="text"
                placeholder="First name*"
                className="form-control bg-light border-light text-black me-2 py-2"
                id="firstname"
              />
              <input
                onChange={(e) =>
                  setUpdatedProfile((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                value={updatedProfile.lastname}
                name="lastname"
                type="text"
                placeholder="Last name*"
                id="lastname"
                className="form-control bg-light border-light text-black ms-2 py-2"
              />
            </div>
            <div className="from-group mb-3">
              <input
                onChange={(e) =>
                  setUpdatedProfile((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                value={updatedProfile.username}
                type="text"
                required
                className="form-control bg-light border-light text-black py-2"
                name="username"
                id="username"
                placeholder="username*"
              />
            </div>

            <div className="from-group mb-3">
              <input
                onChange={(e) =>
                  setUpdatedProfile((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                type="text"
                className="form-control bg-light border-light text-black py-2"
                name="des"
                id="des"
                placeholder="Description*"
                value={updatedProfile.des}
              />
            </div>

            <div className="from-group mb-3 d-flex">
              <select
                onChange={(e) =>
                  setUpdatedProfile((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                value={updatedProfile.gender}
                name="gender"
                className="form-select me-2 bg-light border-light text-info"
                aria-label="Default select example"
              >
                <option
                  value="male"
                  // selected={updatedProfile.gender === "male"}
                >
                  Male
                </option>
                <option
                  value="female"
                  // selected={updatedProfile.gender === "female"}
                >
                  Female
                </option>
              </select>
              <select
                onChange={(e) =>
                  setUpdatedProfile((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                value={updatedProfile.relationShip}
                name="relationShip"
                className="form-select bg-light border-light text-info"
                aria-label="Default select example"
              >
                <option
                  value=""
                  //  selected={updatedProfile.relationShip === ""}
                >
                  None
                </option>
                <option
                  value="Single"
                  //   selected={updatedProfile.relationShip === "Single"}
                >
                  Single
                </option>
                <option
                  value="In a relationship"
                  //   selected={updatedProfile.relationShip === "In a relationship"}
                >
                  In a relationship
                </option>
                <option
                  value="Married"
                  //   selected={updatedProfile.relationShip === "Married"}
                >
                  Married
                </option>
              </select>
            </div>
            <div className="from-group mb-3 d-flex">
              <input
                onChange={(e) =>
                  setUpdatedProfile((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                value={updatedProfile.from}
                type="text"
                className="form-control me-2 bg-light border-light text-black py-2"
                name="from"
                id="from"
                placeholder="From*"
              />

              <input
                onChange={(e) =>
                  setUpdatedProfile((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                value={updatedProfile.city}
                type="text"
                className="form-control bg-light border-light text-black py-2"
                name="city"
                id="city"
                placeholder="City*"
              />
            </div>
            <button
              type="submit"
              disabled={loadding ? true : false}
              className="btn w-100 btn-primary"
            >
              {loadding ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModalEdit;
