import React from "react";
import MainSlider from "../Componet/Home/MainSlider";
import Categoryslider from "../Componet/Home/Categoryslider";
import HomeAbout from "../Componet/Home/HomeAbout";
import JwelleryGrid from "../Componet/Home/JwelleryGrid";
import ClientTestimonial from "../Componet/Home/ClientTestimonial";
import FullSection from "../Componet/Home/FullSection";

function Home() {
  return (
    <div>
      <MainSlider />
      <Categoryslider />
      <HomeAbout />
      <FullSection/>
      <JwelleryGrid />
      <ClientTestimonial/>
    </div>
  );
}

export default Home;
