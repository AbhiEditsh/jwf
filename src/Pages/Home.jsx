import React from "react";
import MainSlider from "../Home/MainSlider";
import Categoryslider from "../Componet/Home/Categoryslider";
import HomeAbout from "../Componet/Home/HomeAbout";
// import JwelleryGrid from "../Componet/Home/JwelleryGrid";

function Home() {
  return (
    <div>
      <MainSlider />
      <Categoryslider />
      <HomeAbout />
      {/* <JwelleryGrid /> */}
    </div>
  );
}

export default Home;
