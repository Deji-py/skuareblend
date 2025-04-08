import AnimateHeader from "../../../components/AnimateHeader";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { BsShop } from "react-icons/bs";

import {
  Button,
  Center,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

function TabGenerator({ tabs }) {
  return (
    <Tabs size={"sm"} colorScheme={"gray"} variant={"soft-rounded"} py={2}>
      <div className=" fixed top-0 z-[1000]">
        <Center
          justifyContent={"space-between"}
          className="  p-3 bg-white text-black py-4 w-screen"
        >
          <h2 className=" text-md font-poppins font-bold">MarketPlace</h2>
          <Center gap={5}>
            <SearchIcon />
          </Center>
        </Center>
        <TabList
          border={""}
          className=" shadow-xl shadow-[rgba(0,0,0,0.05)]"
          py={2}
          bgColor={"white"}
          pos={"sticky"}
          top={0}
          pl={2}
        >
          {tabs.map((tab, index) => (
            <Tab key={index}>
              {tab.tabIcon}
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </div>

      <TabPanels className="bg-slate-50">
        {tabs.map((tab, index) => (
          <TabPanel pt={"28%"} pl={0} key={index}>
            {tab.tabPage}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default TabGenerator;
