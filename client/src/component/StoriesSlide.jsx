import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowingsUsersStories } from "../actions";
import AddStorie from "./AddStorie";
import Storie from "./Storie";
import ViewStoryModal from "./ViewStoryModal";
const StoriesSlide = () => {
  const dispatch = useDispatch();
  const { socketReduccer, auth, stories } = useSelector((state) => state);

  useEffect(() => {
    if (auth && socketReduccer) {
      dispatch(getAllFollowingsUsersStories(auth.token, socketReduccer));
    }
  }, []);
  const [story, setCurrentStory] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const handleStoryClick = (story) => {
    setCurrentStory(story);
    setModalShow(true);
  };
  const renderedStories = stories.map((story, index) => {
    return (
      <div
        className={`${
          story.userId._id === auth.userData._id ? "order-0" : "order-1"
        }`}
        onClick={() => handleStoryClick(story)}
        key={index}
      >
        <Storie story={story} />
      </div>
    );
  });
  return (
    <div className="stories-slider mb-4 pb-1 rounded-4">
      {stories.findIndex((storie) => storie.userId._id === auth.userData._id) <
      0 ? (
        <AddStorie />
      ) : (
        ""
      )}
      {renderedStories}
      <ViewStoryModal
        story={story}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default StoriesSlide;
