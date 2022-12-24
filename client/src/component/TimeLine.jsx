import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTimeline } from "../actions";
import TimelinePost from "./TimelinePost";
import PostLoading from "./PostLoading";
const TimeLine = () => {
  const { token, userData } = JSON.parse(
    window.localStorage.getItem("profile")
  );
  const [loadding, setLoadding] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        await dispatch(getUserTimeline(token));
        setLoadding(false);
      } catch (err) {
        setLoadding(false);
      }
    };
    fetchTimeLine();
  }, []);
  const { posts } = useSelector((state) => state.timeLineReduccer);
  const renderedPosts =
    posts.length > 0
      ? posts.map((post, index) => {
          return <TimelinePost post={post} key={index} />;
        })
      : "";

  return (
    <div className="timeline">
      {loadding ? (
        <>
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </>
      ) : renderedPosts.length > 0 ? (
        renderedPosts
      ) : (
        <p className="text-center">No posts yet</p>
      )}
    </div>
  );
};

export default TimeLine;
