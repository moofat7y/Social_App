import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api/api";
import BookMarkPost from "../component/BookMarkPost";
import DiscoverPostLoading from "../component/DiscoverPostLoading";
const BookMarks = () => {
  const { auth } = useSelector((state) => state);
  const [data, setData] = useState({ posts: [], loading: false, err: "" });
  useEffect(() => {
    const fetchBookMarks = async () => {
      setData((prev) => {
        return { ...prev, loading: true };
      });
      try {
        const res = await api.get("/bookmark", {
          headers: {
            Authorization: auth.token,
          },
        });
        setData((prev) => {
          return { ...prev, loading: false, posts: res.data };
        });
      } catch (error) {
        setData((prev) => {
          return { ...prev, loading: false, err: error.response.data };
        });
      }
    };

    if (auth) {
      fetchBookMarks();
    }
  }, []);
  const renderedPosts = () => {
    if (data.posts.length > 0) {
      return data.posts.map((post, index) => {
        return <BookMarkPost post={post} key={index} />;
      });
    } else {
      return <div>There is no posts</div>;
    }
  };
  return (
    <div className="discover pb-2">
      <div className="discover-posts row">
        {data.loading ? (
          <>
            <DiscoverPostLoading />
            <DiscoverPostLoading />
            <DiscoverPostLoading />
            <DiscoverPostLoading />
            <DiscoverPostLoading />
          </>
        ) : (
          renderedPosts()
        )}
        {/* {data.posts.length > 0 ? (
          renderedPosts
        ) : (
          <>
            <DiscoverPostLoading />
            <DiscoverPostLoading />
            <DiscoverPostLoading />
            <DiscoverPostLoading />
            <DiscoverPostLoading />
          </>
        )} */}
      </div>
    </div>
  );
};

export default BookMarks;
