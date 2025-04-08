import PodcastHeader from "./components/PodcastHeader";
import PodcastPlayer from "../../components/PodCastPlayer/PodcastPlayer";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import SmallPlayer from "../../components/PodCastPlayer/SmallPlayer";
import SpotLights from "./components/SpotLight/SpotLights";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import TopCategories from "./components/TopCategories/TopCategories";
import TrendingPods from "./components/Trending/TrendingPods";
import Updates from "./components/Updates/Updates";

function PodCasts_Page() {
  return (
    <div className="w-screen">
      <PodcastHeader />
      <SpotLights />
      <TopCategories />
      <Subscriptions />
      <TrendingPods />
      <Updates />
      <SmallPlayer />
    </div>
  );
}

export default PodCasts_Page;
