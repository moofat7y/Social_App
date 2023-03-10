import React from "react";
import { Modal } from "react-bootstrap";
import { BsCheckCircleFill, BsPerson } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { format } from "timeago.js";
const ViewStoryModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className={`p-0 position-relative storie-modal overflow-hidden rounded-4 text-center d-flex flex-column ${props.story?.bgColor}`}
      >
        <div className="header bg-light d-flex align-items-center px-3 py-2">
          <div
            className={`profilePic me-3 d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle`}
          >
            {props.story?.userId.profilePicture.url ? (
              <img
                src={props.story?.userId.profilePicture.url}
                className="w-100 h-100 rounded-circle"
                alt=""
              />
            ) : (
              <BsPerson className="fs-4" />
            )}
          </div>
          <div className="d-flex flex-column align-items-start">
            <p className="name mb-0 d-flex lh-sm">
              {props.story?.userId.username}
              {props.story?.userId.verified ? (
                <BsCheckCircleFill className="ms-1 fs-8 text-primary my-auto" />
              ) : (
                ""
              )}
            </p>
            <p className="text-info fs-8 mb-0 lh-sm">
              {format(props.story?.createdAt)}
            </p>
          </div>
        </div>

        {props.story?.image ? (
          <div className="image position-absolute w-100 h-100">
            <LazyLoadImage
              effect="blur"
              className="w-100 h-100 rounded-4"
              src={props.story?.image.url}
              alt=""
            />
          </div>
        ) : (
          ""
        )}

        {props.story?.text ? (
          <p
            className={`position-absolute ${props.story?.alignment} px-2 py-1 ${props.story.textBgColor} translate-middle-x`}
          >
            {props.story?.text}
          </p>
        ) : (
          ""
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewStoryModal;
