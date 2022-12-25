import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  BsAlignBottom,
  BsAlignEnd,
  BsAlignStart,
  BsAlignTop,
  BsBack,
  BsImage,
  BsPerson,
  BsType,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createStory } from "../actions";
const StorieModal = (props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [typeInput, setTypeInput] = useState(false);
  const [type, setType] = useState("");
  const [alignment, setAlignment] = useState("top-25 start-50");
  const colors = ["", "bg-info", "bg-white"];
  const backGroundColors = [
    "bg-white",
    "bg-danger",
    "bg-default",
    "bg-success",
    "bg-blue",
    "bg-warning",
  ];

  const [backColor, setBackColor] = useState(0);
  const [bgColors, setBgColors] = useState(0);
  const { auth, socketReduccer } = useSelector((state) => state);
  const handleSave = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("text", type);
      formData.append("alignment", alignment);
      formData.append("textBgColor", colors[bgColors]);
      formData.append("bgColor", backGroundColors[backColor]);
      dispatch(createStory(auth.token, formData, socketReduccer));
    } else {
      dispatch(
        createStory(
          auth.token,
          {
            text: type,
            alignment,
            textBgColor: colors[bgColors],
            bgColor: backGroundColors[backColor],
          },
          socketReduccer
        )
      );
    }

    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className={`p-0 position-relative storie-modal overflow-hidden rounded-4 text-center d-flex flex-column ${backGroundColors[backColor]}`}
      >
        <div className="header bg-light d-flex align-items-center p-3">
          <div
            className={`profilePic me-3 d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle`}
          >
            {props.user.userData.profilePicture ? (
              <img
                src={props.user.userData.profilePicture.url}
                className="w-100 h-100 rounded-circle"
                alt=""
              />
            ) : (
              <BsPerson className="fs-4" />
            )}
          </div>
          <div className="name ">{props.user.userData.username}</div>
        </div>

        <div className="storie-control align-items-center bg-light d-flex w-100 py-2 px-4 mt-auto">
          <div className="upload-photo me-3">
            <label htmlFor="storie-photo">
              <BsImage className="fs-4" />
            </label>
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="d-none"
              id="storie-photo"
            />
          </div>

          <div
            className="type me-3"
            onClick={() => setTypeInput((prev) => !prev)}
          >
            <BsType className="fs-4"></BsType>
          </div>
          <div
            onClick={() =>
              setBgColors((prev) => (prev === 2 ? (prev = 0) : prev + 1))
            }
            className="bg-color px-2 me-3 rounded-3 bg-white"
          >
            <BsType className="fs-4" />
          </div>

          <div
            className="background-control me-3"
            onClick={() =>
              setBackColor((prev) => (prev === 5 ? (prev = 0) : prev + 1))
            }
          >
            <BsBack className="fs-4" />
          </div>
          <div className="type-control">
            <DropdownButton
              drop="up"
              id="dropdown-item-button"
              title="alignment"
              size="sm"
            >
              <Dropdown.Item
                className="bg-light text-info text-center"
                as="button"
                onClick={() => setAlignment("start-75 top-50")}
              >
                <BsAlignEnd />
              </Dropdown.Item>
              <Dropdown.Item
                className="bg-light text-info text-center"
                as="button"
                onClick={() => setAlignment("start-25 top-50")}
              >
                <BsAlignStart />
              </Dropdown.Item>
              <Dropdown.Item
                className="bg-light text-info text-center"
                as="button"
                onClick={() => setAlignment("start-50 top-25")}
              >
                <BsAlignTop />
              </Dropdown.Item>
              <Dropdown.Item
                className="bg-light text-info text-center"
                as="button"
                onClick={() => setAlignment("top-75 start-50")}
              >
                <BsAlignBottom className="" />
              </Dropdown.Item>
            </DropdownButton>
          </div>

          <button onClick={handleSave} className="btn btn-primary ms-auto">
            Save
          </button>
        </div>

        {file ? (
          <div className="image position-absolute w-100 h-100">
            <img
              className="w-100 h-100 rounded-4"
              src={URL.createObjectURL(file)}
              alt=""
            />
          </div>
        ) : (
          ""
        )}

        {typeInput ? (
          <div className="text-input d-flex align-items-center justify-content-center position-absolute top-0 left-0 w-100 h-100">
            <input
              type="text"
              onChange={(e) => setType(e.target.value)}
              placeholder="type..."
            />
          </div>
        ) : (
          ""
        )}

        {type ? (
          <p
            className={`position-absolute ${alignment} px-2 py-1 ${
              colors[`${bgColors}`]
            } translate-middle-x`}
          >
            {type}
          </p>
        ) : (
          ""
        )}
      </Modal.Body>
    </Modal>
  );
};

export default StorieModal;
