import AnimateHeader from "../../components/AnimateHeader";
import FabMainButton from "../../components/ReUsables/FAB/FabMainButton";
import HotProducts from "./SubPages/HotProducts";
import React from "react";
import TabGenerator from "./Components/TabGenerator";
import { SearchIcon } from "@chakra-ui/icons";
import { Button, Center } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { BsFire, BsShop } from "react-icons/bs";
import { Tabs } from "./TabsConfig";

function MarketPlace() {
  return (
    <div className="py-[60px] bg-slate-50 md:py-0">
      <TabGenerator tabs={Tabs} />
    </div>
  );
}

export default MarketPlace;
