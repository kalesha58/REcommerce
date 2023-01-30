import React from "react";
import { Announcement } from "../Components/Announcement";
import { Categories } from "../Components/Categories";
import { Navbar } from "../Components/Navbar";
import { Slider } from "../Components/Slider";

export const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
    </div>
  );
};