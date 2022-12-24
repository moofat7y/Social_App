import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Storie = ({ story }) => {
  return (
    <div className={`storie position-relative me-2 rounded-4 ${story.bgColor}`}>
      {story.image ? (
        <LazyLoadImage
          src={story.image.url}
          className="rounded-4 storie-image w-100 h-100"
          alt=""
        />
      ) : (
        ""
      )}
      <div className="user-image border d-flex justify-content-center aling-items-center border-2 border-primary rounded-circle position-absolute">
        {story.userId.profilePicture ? (
          <img
            effect="blur"
            src={story.userId.profilePicture.url}
            className="w-100 rounded-circle h-100"
            alt=""
          />
        ) : (
          <i className="bi bi-person fs-4 text-primary"></i>
        )}
      </div>
      <p className="username position-absolute fs-8">{story.userId.username}</p>
    </div>
  );
};

export default Storie;
