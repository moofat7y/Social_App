import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
const BookMarkPost = ({ post }) => {
  return (
    <div className="col-9 col-sm-6 p-1 p-lg-2">
      <Link
        to={`/post/${post.postId._id}`}
        className=" nav-link position-relative post rounded-4 overflow-hidden"
      >
        {post.postId.image ? (
          <LazyLoadImage
            effect="blur"
            src={post.postId.image.url}
            className="w-100 h-100 position-absolute"
          />
        ) : (
          <div className="w-100 position-absolute p-2 h-100 bg-white d-flex align-items-center justify-content-center">
            <p className="fs-8 mb-0">{post.postId.desc}</p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default BookMarkPost;
