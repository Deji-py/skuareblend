import BottomSheet from "../../components/BottomSheet";
import CoverImage from "./Components/CoverImage";
import DescriptionBox from "./Components/DescriptionBox";
import EditProfile from "./SubPages/EditProfile";
import ProfileCard from "./Components/ProfileCard";
import ProfileCard_placeholder from "../../components/PlaceHolders/ProfileCard_placeholder";
import ProfileTools from "./Components/ProfileTools";
import { Stack } from "@chakra-ui/layout";
import { useContext } from "react";
import { BsCash } from "react-icons/bs";
import { CgBoard } from "react-icons/cg";
import { GoInfo } from "react-icons/go";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

import {
  Box,
  Grid,
  GridItem,
  HStack,
  Switch,
  useDisclosure,
  Center,
  useToast,
} from "@chakra-ui/react";

function Profile_Page() {
  const { userData, userId } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const options = [
    {
      title: "Monetization",
      icon: <BsCash size={20} color="#2896CC" />,
      color: "#2896CC",
    },
    {
      title: "Billboard Ads",
      icon: <CgBoard size={20} color="black" />,
      color: "black",
    },
    // {
    //   title: "Settings",
    //   icon: <MdSettings size={20} color="#FAB29E" />,
    //   route: "/profile",
    // },
    // {
    //   title: "Theme",
    //   icon: <BsMoonFill size={16} color="#AEAEAD" />,
    //   route: "/profile",
    // },
    // {
    //   title: "Share Profile",
    //   icon: <FaShare size={18} color="#B6DFF6" />,
    //   route: "/profile",
    // },
  ];

  return (
    <Stack className=" overflow-hidden px-2 bg-slate-50 h-screen  w-[100vw] py-[60px] md:pt-0 ">
      <CoverImage />
      {!userId ? <ProfileCard_placeholder /> : <ProfileCard onOpen={onOpen} />}
      <DescriptionBox onOpen={onOpen} bio={userData?.bio} />
      <ProfileTools />

      <Grid gap={2} gridTemplateColumns={"repeat(2, 1fr)"}>
        {options.map((item, key) => (
          <GridItem
            onClick={() => {
              toast({
                position: "top",
                description: "Coming Soon!",
                status: "info",
              });
            }}
            className="w-full"
          >
            <Link to={item?.route} key={key}>
              <Center
                flexWrap={"wrap"}
                justify={"space-between"}
                style={{
                  borderColor: item.color,
                }}
                className="p-2 shadow shadow-slate-200 text-[14px] bg-white border-[1.5px]  py-4 rounded-xl "
              >
                <Center onClick={() => item?.callback()}>
                  {item.icon}
                  <p className="ml-2" style={{ color: item.color }}>
                    {item.title}
                  </p>
                </Center>

                <Center className=" mt-1" gap={2}>
                  <p className="text-[12px] text-gray-400">Activate</p>
                  <Switch disabled />
                  <GoInfo />
                </Center>
              </Center>
            </Link>
          </GridItem>
        ))}
      </Grid>

      {/* <PostChart />
      <StoreChart /> */}
      {/* <FabMainButton subButtons={tools} /> */}
      <BottomSheet title={"Edit Profile"} isOpen={isOpen} onClose={onClose}>
        <EditProfile
          onClose={onClose}
          userId={userId}
          mydescription={userData?.bio}
          mynickname={userData?.nickname}
          profilePic={userData?.profilepic}
          myusername={userData?.username}
        />
      </BottomSheet>
    </Stack>
  );
}

export default Profile_Page;
