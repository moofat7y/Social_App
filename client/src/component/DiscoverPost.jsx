import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const DiscoverPost = ({ post }) => {
  return (
    <div className="col-9 col-sm-6 p-1 p-lg-2">
      <Link
        to={`/post/${post._id}`}
        className=" nav-link position-relative post rounded-4 overflow-hidden"
      >
        {post.image ? (
          <LazyLoadImage
            effect="blur"
            src={post.image.url}
            className="w-100 h-100 position-absolute"
          />
        ) : (
          <div className="w-100 position-absolute h-100 bg-primary"></div>
        )}

        <div className="post-reactions d-flex justify-content-center align-items-center w-100 h-100 position-absolute">
          <span className="likes d-block me-3 text-center d-flex flex-column justify-content-center">
            <i className="bi bi-heart-fill fs-4 text-primary"></i>
            <span className="text-info">{post.likes.length}</span>
          </span>
          <span className="comments d-block me-2 text-center d-flex flex-column justify-content-center">
            <i className="bi bi-chat-dots fs-4 text-primary"></i>
            <span className="text-info"> {post.comments.length}</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default DiscoverPost;