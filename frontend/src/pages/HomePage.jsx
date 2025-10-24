import React from "react";
import LeftFeed from "../components/LeftFeed";
import Feed from "../components/Feed";
import RightFeed from "../components/RightFeed";

const HomePage = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <LeftFeed></LeftFeed>
      <Feed></Feed>
      <RightFeed></RightFeed>
    </div>
  );
};

export default HomePage;
