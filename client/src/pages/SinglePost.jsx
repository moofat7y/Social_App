import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../actions";
import PostLoading from "../component/PostLoading";
import TimelinePost from "../component/timelinePost";

const SinglePost = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    setLoading(true);
    const fetchSingle = async () => {
      try {
        await dispatch(getSinglePost(user.token, id));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (user) {
      fetchSingle();
    }
  }, [id]);
  const { posts } = useSelector((state) => state.timeLineReduccer);
  return (
    <div className="timeline">
      {loading ? (
        <PostLoading />
      ) : posts.length > 0 ? (
        <TimelinePost post={posts[0]} />
      ) : (
        <div>Post not found</div>
      )}
    </div>
  );
};

export default SinglePost;
