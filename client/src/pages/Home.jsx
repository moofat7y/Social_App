import React from "react";
import StoriesSlide from "../component/StoriesSlide";
import CreatePost from "../component/CreatePost";
import TimeLine from "../component/TimeLine";

const Home = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <section className="home">
      <StoriesSlide />
      <CreatePost />
      <TimeLine />
    </section>
  );
};

export default Home;
