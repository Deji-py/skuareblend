import FollowButton from "../../../components/FollowBtn/FollowButton";
import Followers from "../../../components/FriendsList/Followers";
import Following from "../../../components/FriendsList/Following";
import ProfileBadging from "./ProfileBadging";
import ProfileCard_placeholder from "../../../components/PlaceHolders/ProfileCard_placeholder";
import Profile_Counters from "./Profile_Counters";
import badge from "../../../assets/newbie.png";
import compressImagesForUpload from "../../../utility/compressImageForUpload";
import updateUserStatus from "../../../updateUserStatus";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Button, HStack, MenuButton, useToast } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaCommentDots, FaEdit } from "react-icons/fa";
import { MdChatBubble, MdLogout } from "react-icons/md";
import { auth, db, storage } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoYoutube,
  IoMdCamera,
} from "react-icons/io";

import {
  Center,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Progress,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

function ProfileCard({ onOpen, FriendProfileData }) {
  const { userId, setUserData, setUserId, userData } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);
  const {
    isOpen: followersModalIsOpen,
    onOpen: openFollowersModal,
    onClose: closeFollowersModal,
  } = useDisclosure();
  const {
    isOpen: followingModalIsOpen,
    onOpen: openFollowingModal,
    onClose: closeFollowingModal,
  } = useDisclosure();

  const isUser = !FriendProfileData;
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files;
    setImage(file);
  };

  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  const handleUpload = async () => {
    try {
      setLoading(true);
      toast({
        title: "Uploading",
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

      const filename = `${userId}/profilepic.jpg`;
      const imageRef = ref(storage, filename);
      const compressedImage = await compressImagesForUpload(image);

      const uploadTask = uploadBytesResumable(imageRef, compressedImage[0]);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      await uploadTask;

      const downloadURL = await getDownloadURL(imageRef);

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { profilepic: downloadURL });
      setLoading(false);
      toast({
        title: "Profile Picture Updated",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });

      setImage(null); // Reset the image state
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setLoading(false);
      toast({
        title: "Error",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      const docRef = doc(db, "users", userId);
      updateUserStatus(docRef, "offline");
      setUserData(null);
      setUserId(null);
      location.reload();
      toast({
        title: "Logged Out Successfully!",
        status: "info",
        position: "top",
      });
    });
  };

  if (!userData) {
    return <ProfileCard_placeholder />;
  }

  return (
    <Stack className=" relative   pt-2 w-[500px]   md:w-full   ">
      <div className=" fixed w-full top-2 left-0">
        {loading && <Progress size="xs" isIndeterminate />}
      </div>

      <Stack
        alignItems={"start"}
        className=" bg-white border-[1.5px] p-5   rounded-xl "
      >
        <Flex className=" items-center w-full justify-between ">
          <Flex className=" flex-1 gap-5 items-center">
            <div className="  relative rounded-full">
              <Avatar
                bg={"whitesmoke"}
                size={"lg"}
                src={
                  isUser ? userData?.profilepic : FriendProfileData?.profilepic
                }
              />
              {isUser && (
                <button
                  onClick={() => inputRef.current.click()}
                  className=" bg-white p-1 rounded-full absolute bottom-0 right-0"
                >
                  <IoMdCamera size={12} />
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={handleFileChange}
              />
            </div>
            <Stack alignItems={"start"} justifyContent={"center"}>
              <h1 className=" text-[18px]  font-bold">
                {isUser ? userData?.username : FriendProfileData?.username}
              </h1>
              <p className="  text-gray-400 text-[12px] mt-[-10px]">
                @{isUser ? userData?.nickname : FriendProfileData?.nickname}
              </p>
              {isUser && (
                <HStack className="mt-2 ">
                  {userData?.whatsapp && (
                    <a target="_blank" href={"http://" + userData?.whatsapp}>
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
                  {userData?.instagram && (
                    <a target="_blank" href={userData?.instagram}>
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
                  {userData?.facebook && (
                    <a target="_blank" href={userData?.facebook}>
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
                  {userData?.youtube && (
                    <a target="_blank" href={userData?.youtube}>
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
                </HStack>
              )}
            </Stack>
          </Flex>

          <div className=" absolute right-5 top-5">
            {isUser && (
              <>
                <Menu size={"xs"}>
                  <MenuButton
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="md"
                    borderWidth="1px"
                  >
                    <BsThreeDots />
                  </MenuButton>
                  <MenuList>
                    <MenuItem bg="" onClick={onOpen} gap={3}>
                      <FaEdit color="gray" />
                      Edit Profile
                    </MenuItem>
                    <MenuItem bg="" onClick={handleLogout} gap={3}>
                      <MdLogout color="gray" />
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </div>
        </Flex>

        <Center className="  mt-5 w-full justify-center">
          {uploadProgress > 0 && (
            <Progress value={uploadProgress} colorScheme="teal" size="sm" />
          )}
          <Profile_Counters
            badge={badge}
            onFollowing={openFollowingModal}
            onFollowers={openFollowersModal}
            profileData={isUser ? userData : FriendProfileData}
          />
        </Center>
      </Stack>
      <Following
        friendData={!isUser && FriendProfileData}
        isOpen={followingModalIsOpen}
        onClose={closeFollowingModal}
      />
      <Followers
        friendData={!isUser && FriendProfileData}
        isOpen={followersModalIsOpen}
        onClose={closeFollowersModal}
      />
    </Stack>
  );
}

export default ProfileCard;
