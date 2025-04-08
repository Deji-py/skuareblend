import BlogsPage from "../../components/BlogComponents/BlogsPage";
import BlogsTab from "../../components/BlogComponents/BlogsPage";
import CoverImage from "../Profile_Page/Components/CoverImage";
import DescriptionBox from "../Profile_Page/Components/DescriptionBox";
import FollowButton from "../../components/FollowBtn/FollowButton";
import FriendPostPage from "../../components/BlogComponents/FriendPostPage";
import InitializeChat from "../Live Discussion/Services/InitializeChat";
import LoaderScreen from "../../components/Loader/LoaderScreen";
import ProfileCard from "../Profile_Page/Components/ProfileCard";
import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useContext } from "react";
import { BsLayoutSidebarInset, BsSoundwave } from "react-icons/bs";
import { CgLayoutList } from "react-icons/cg";
import { FaCommentDots } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { MdBolt } from "react-icons/md";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from "react-icons/io";

import {
  Button,
  Center,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

function GlobalProfilePage() {
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);
  const [userProfileData, setUserProfileData] = useState(null);
  const friendId = useParams().id;
  const [initializing, setInitializing] = useState(false);
  const tabRef = useRef();
  const navigate = useNavigate();
  let messageId = userId + userProfileData?.uid; //userId concat friendId
  let alternative = userProfileData?.uid + userId; //friend id concat userId
  const [stick, setStick] = useState(false);

  useEffect(() => {
    // Fetch user data using the friendId
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", friendId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserProfileData(userData);
        } else {
          // Handle the case when the user does not exist
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [friendId]);

  if (loading) {
    return <LoaderScreen />;
  }

  return userProfileData ? (
    <div className=" w-full mt-[60px] md:mt-[0px]">
      <VStack gap={1} className="px-2">
        <CoverImage friendData={userProfileData} />
        <ProfileCard FriendProfileData={userProfileData} />
        <DescriptionBox isFriend={true} bio={userProfileData?.bio} />
      </VStack>
      <VStack justify={"space-between"} className="pr-2 w-full  ">
        <Center className="w-full ">
          <>
            <FollowButton
              style={{
                padding: "20px 25px",
                borderRadius: "10px",
                flex: "1",
                fontSize: "15px",
              }}
              friendId={userProfileData?.uid}
            />
          </>

          <Button
            _hover={{ bg: "black" }}
            onClick={() => {
              InitializeChat(
                setInitializing,
                userProfileData,
                userProfileData?.uid,
                userId,
                navigate,
                messageId,
                alternative
              );
            }}
            bg={""}
            color={"white"}
            className="gap-2 bg-primary"
          >
            Chat {initializing ? <Spinner size={"sm"} /> : <FaCommentDots />}
          </Button>
        </Center>
        <Center gap={3}>
          {userProfileData?.whatsapp && (
            <a target="_blank" href={"http://" + userProfileData?.whatsapp}>
              <Button
                bg=""
                className="bg-[#DCF9E7] border-[1.5px] border-[#1EAE55]"
                size={"xs"}
                py={3}
              >
                <IoLogoWhatsapp color="#25D366" size={18} />
              </Button>
            </a>
          )}
          {userProfileData?.instagram && (
            <a target="_blank" href={userProfileData?.instagram}>
              <Button
                size={"xs"}
                className="bg-[#F4F5F6] border-[1.5px] border-[#9099A2]"
                bg=""
                py={3}
              >
                <IoLogoInstagram color="black" size={18} />
              </Button>
            </a>
          )}
          {userProfileData?.facebook && (
            <a target="_blank" href={userProfileData?.facebook}>
              <Button
                bg=""
                size={"xs"}
                className="bg-[#DDEAF8] border-[1.5px] border-[#5299E0]"
                py={3}
              >
                <IoLogoFacebook color="#2364AA" size={18} />
              </Button>
            </a>
          )}
          {userProfileData?.youtube && (
            <a target="_blank" href={userProfileData?.youtube}>
              <Button
                bg=""
                size={"xs"}
                className="bg-[#FFEBEB] border-[1.5px] border-[#FF7070]"
                py={3}
              >
                <IoLogoYoutube color="#FF0000" size={18} />
              </Button>
            </a>
          )}
        </Center>
      </VStack>
      <Tabs
        ref={tabRef}
        size={"sm"}
        overflow={"hidden"}
        variant="soft-rounded"
        className="md:w-[100%] mt-5 w-fit"
        colorScheme="gray"
      >
        <motion.div
          className={`  bg-white z-[1000] ${
            stick
              ? "md:fixed  top-0 overflow-hidden w-fit md:w-[100vw]  z-[1000]"
              : "md:absolute"
          }`}
          initial={stick ? { y: "-100%" } : { y: "0%" }}
          animate={stick ? { y: "0%" } : { y: "-10%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <TabList
            px={2}
            mt={2}
            justifyContent={"center"}
            className=" border-b-[1.5px] pb-2 w-full overflow-hidden md:w-[100vw] hideScroll  overflow-x-scroll "
            style={{
              boxShadow: stick ? "2px 2px  20px rgba(0,0,0,0.05)" : "none",
            }}
          >
            <Tab>Blogs</Tab>
            <Tab>Posts</Tab>
          </TabList>
        </motion.div>
        <TabPanels className="  pt-10 overflow-hidden w-[100vw] ">
          <TabPanel p={0}>
            <BlogsPage
              friendId={userProfileData?.uid}
              friendBlogs={userProfileData?.blogs}
            />
          </TabPanel>
          <TabPanel p={0}>
            <FriendPostPage friendId={userProfileData?.uid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ) : (
    <p>User not found</p>
  );
}

export default GlobalProfilePage;
