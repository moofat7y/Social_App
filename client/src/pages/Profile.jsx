import React, { useEffect, useState } from "react";
import CreatePost from "../component/CreatePost";
import TimelinePost from "../component/TimelinePost";
import { useParams } from "react-router-dom";
import PostLoading from "../component/PostLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../actions";
import ProfileCard from "../component/ProfileCard";
import ProfileCardLoadding from "../component/ProfileCardLoadding";
const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { timeLineReduccer, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const isMyAccout = user.userData._id === userId;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchUserAcc = async () => {
      setLoading(true);
      try {
        await dispatch(fetchUserProfile(user.token, userId));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchUserAcc();
  }, [userId]);
  return (
    <div className="my-profile">
      {loading ? (
        <ProfileCardLoadding />
      ) : (
        <ProfileCard
          state={
            isMyAccout
              ? {
                  ...timeLineReduccer,
                  user: {
                    ...auth.userData,
                    followers: timeLineReduccer.user.followers,
                    followings: timeLineReduccer.user.followings,
                  },
                }
              : timeLineReduccer
          }
        />
      )}

      {isMyAccout ? <CreatePost /> : ""}
      <div className="timeline">
        {loading ? (
          <>
            <PostLoading />
            <PostLoading />
            <PostLoading />
          </>
        ) : (
          timeLineReduccer?.posts.map((post, index) => {
            return <TimelinePost post={post} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
