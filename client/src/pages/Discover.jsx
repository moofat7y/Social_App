import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api/api";
import DiscoverPost from "../component/DiscoverPost";
import DiscoverPostLoading from "../component/DiscoverPostLoading";

const Discover = () => {
  const { auth } = useSelector((state) => state);
  const [data, setData] = useState({
    posts: [],
    count: 1,
    loading: false,
    btnLoading: false,
    err: "",
  });
  useEffect(() => {
    const fetchDiscover = async () => {
      setData((prev) => {
        return { ...prev, loading: true, btnLoading: true };
      });
      try {
        const res = await api.get("/post/discover?count=" + data.count, {
          headers: {
            Authorization: auth.token,
          },
        });
        setData((prev) => {
          return {
            ...prev,
            posts: [...prev.posts, ...res.data.posts],
            loading: false,
            btnLoading: res.data.posts.length < 10 ? true : false,
          };
        });
      } catch (error) {
        setData((prev) => {
          return {
            ...prev,
            err: error.response,
            loading: false,
            btnLoading: false,
          };
        });
      }
    };
    if (auth) {
      fetchDiscover();
    }
  }, [data.count]);

  const renderedPosts = () => {
    if (data.posts.length > 0) {
      return data.posts?.map((post, index) => {
        return <DiscoverPost post={post} key={index} />;
      });
    } else {
      return <div>There is not posts</div>;
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
      </div>

      {!data.posts.length === 0 ? (
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            onClick={() =>
              setData((prev) => {
                return { ...prev, count: prev.count + 1 };
              })
            }
            disabled={data.btnLoading ? true : false}
          >
            Load More
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Discover;
