import PulseLoader from "react-spinners/PulseLoader";
import React, { useContext, useState } from "react";
import TextInput from "../../../components/TextInput";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef } from "react";
import { CgNametag } from "react-icons/cg";
import { FaLink } from "react-icons/fa";
import { GoPaste } from "react-icons/go";
import { BottomSheet } from "react-spring-bottom-sheet";
import { db, storage } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from "react-icons/io";

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const SocialModal = ({
  isOpen,
  socialIcon,
  onClose,
  socialType,
  state,
  setState,
  stateColor,
}) => {
  const handlePaste = async () => {
    document.getElementById("linkinput").focus();
    const text = await navigator.clipboard.readText();
    setState(text);
    console.log(text);
  };
  return (
    <BottomSheet
      className="z-[20000]  fixed"
      open={isOpen}
      onDismiss={onClose}
      snapPoints={({ minHeight }) => [minHeight]}
    >
      <div className="px-3">
        <Flex justifyContent={"space-between"} my={4} alignItems={"center"}>
          <p>Paste Your {socialType} Link</p>
          <Button
            onClick={onClose}
            color={!state ? "gray" : "white"}
            size={"sm"}
            bg={!state ? "whitesmoke" : stateColor}
          >
            Save
            <FaLink />
          </Button>
        </Flex>
        <Flex mb={5} gap={1} alignItems={"center"} className="">
          <IconButton onClick={handlePaste} icon={<GoPaste />} />
          <TextInput
            id="linkinput"
            placeholder={
              socialType === "Whatsapp"
                ? " (country code) phone No. e.g +234-765... "
                : "Paste link here"
            }
            setState={setState}
            state={state}
            icon={socialIcon}
          />
        </Flex>
      </div>
    </BottomSheet>
  );
};

export default function EditProfile({
  myusername,
  mynickname,
  mydescription,
  profilePic,
  userId,
  onClose,
}) {
  const docRef = doc(db, "users", userId);
  const toast = useToast();
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [whatsapp, setWhatsApp] = useState(
    userData?.whatsapp ? userData?.whatsapp : null
  );
  const [facebook, setFacebook] = useState(
    userData?.facebook ? userData?.facebook : null
  );
  const [instagram, setInstagram] = useState(
    userData?.instagram ? userData?.instagram : null
  );
  const [youtube, setYoutube] = useState(
    userData?.youtube ? userData?.youtube : null
  );
  const {
    isOpen: whatsappModalOpen,
    onOpen: openSocialWhatsappModal,
    onClose: closeSocialWhatsappModal,
  } = useDisclosure();
  const {
    isOpen: instagramModalOpen,
    onOpen: openSocialInstagramModal,
    onClose: closeSocialInstagramModal,
  } = useDisclosure();
  const {
    isOpen: facebookModalOpen,
    onOpen: openSocialFacebookModal,
    onClose: closeSocialFacebookModal,
  } = useDisclosure();
  const {
    isOpen: youtubeModalOpen,
    onOpen: openSocialYoutubeModal,
    onClose: closeSocialYoutubeModal,
  } = useDisclosure();
  const [username, setUsername] = useState(myusername);
  const [nickname, setNickname] = useState(mynickname);
  const [description, setDescription] = useState(mydescription);
  const [profileImage, setProfileImage] = useState(
    typeof profilePic === "string" ? profilePic : null
  );
  const profilePicRef = useRef();

  const storageRef = ref(storage, `${userId}/profilepic.jpg`);

  const handleProfileImageChange = (event) => {
    let imageFile = event.target.files[0];
    setProfileImage(imageFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (profileImage !== profilePic) {
        await uploadBytes(storageRef, profileImage)
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then((downloadURL) => {
            updateDoc(docRef, {
              username: username,
              nickname: nickname,
              bio: description,
              username_lower: username?.toLowerCase(),
              whatsapp: "wa.me/" + whatsapp,
              facebook,
              instagram,
              youtube,
              profilepic: downloadURL ? downloadURL : profileImage,
            }).then(() => {
              setLoading(false);
              onClose();
              toast({
                title: "Profile Updated",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            });
          });
      } else {
        updateDoc(docRef, {
          username: username,
          nickname: nickname,
          bio: description,
          whatsapp: "wa.me/" + whatsapp,
          facebook,
          instagram,
          username_lower: username?.toLowerCase(),
          youtube,
          profilepic: profilePic,
        }).then(() => {
          setLoading(false);
          onClose();
          toast({
            position: "top",
            title: "Profile Updated",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
      }
    } catch (error) {
      setLoading(false);
      onClose();
      toast({
        position: "top",
        title: "Something went wrong pls retry",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error updating profile:", error);
    }
  };

  const links = [
    {
      socialType: "Whatsapp",
      socialIcon: (
        <IoLogoWhatsapp size={18} color={whatsapp ? "#25D366" : "#6C757D"} />
      ),
      state: whatsapp,
      setState: setWhatsApp,
      isOpen: whatsappModalOpen,
      onClose: closeSocialWhatsappModal,
      onOpen: openSocialWhatsappModal,
      stateColor: "#25D366",
    },
    {
      socialType: "Instagram",
      socialIcon: (
        <IoLogoInstagram color={instagram ? "black" : "#6C757D"} size={20} />
      ),
      state: instagram,
      setState: setInstagram,
      isOpen: instagramModalOpen,
      onClose: closeSocialInstagramModal,
      onOpen: openSocialInstagramModal,
      stateColor: "black",
    },
    {
      socialType: "Facebook",
      socialIcon: (
        <IoLogoFacebook size={18} color={facebook ? "#2364AA" : "#6C757D"} />
      ),
      state: facebook,
      setState: setFacebook,
      isOpen: facebookModalOpen,
      onClose: closeSocialFacebookModal,
      onOpen: openSocialFacebookModal,
      stateColor: "#2364AA",
    },
    {
      socialType: "Youtube",
      socialIcon: (
        <IoLogoYoutube size={18} color={youtube ? "#FF0000" : "#6C757D"} />
      ),
      state: youtube,
      setState: setYoutube,
      isOpen: youtubeModalOpen,
      onClose: closeSocialYoutubeModal,
      onOpen: openSocialYoutubeModal,
      stateColor: "#FF0000",
    },
  ];

  return (
    <Box className=" relative ">
      {loading && (
        <Center className=" w-full h-full z-50 bg-[rgba(255,255,255,0.8)] absolute">
          <PulseLoader
            color={"#4169E1"}
            className=" text-primary"
            loading={true}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Center>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={0}>
          <FormControl className="text-gray-500">
            <FormLabel>Profile Image</FormLabel>
            {profileImage &&
              (typeof profileImage === "string" ? (
                <div className="w-[80px] rounded-full relative h-[80px] overflow-hidden">
                  <img src={profileImage} alt="" width="100%" height="100%" />
                  <Center
                    onClick={() => profilePicRef.current.click()}
                    className="absolute bg-[rgba(0,0,0,0.4)] w-full h-full top-0 z-[1000]"
                  >
                    <p className="text-center px-2 text-white text-[14px]">
                      Click to upload
                    </p>
                  </Center>
                </div>
              ) : (
                <div className="w-[80px] rounded-full relative h-[80px] overflow-hidden">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                  <Center
                    onClick={() => profilePicRef.current.click()}
                    className="absolute bg-[rgba(0,0,0,0.4)] w-full h-full top-0 z-[1000]"
                  >
                    <p className="text-center px-2 text-white text-[14px]">
                      Click to upload
                    </p>
                  </Center>
                </div>
              ))}

            <HStack justify={"end"} className="mt-2 relative ">
              <p className=" text-[12px] absolute top-[-25px]">
                Add Your socials
              </p>
              {links.map((link) => (
                <>
                  <Button
                    onClick={link.onOpen}
                    bg={""}
                    className="bg-slate-50 border-[1.5px]"
                    size={"xs"}
                    py={4}
                  >
                    {link.socialIcon}
                  </Button>
                  <SocialModal
                    isOpen={link.isOpen}
                    onClose={link.onClose}
                    setState={link.setState}
                    socialIcon={link.socialIcon}
                    socialType={link.socialType}
                    state={link.state}
                    stateColor={link.stateColor}
                  />
                </>
              ))}
            </HStack>

            <Input
              className=" hidden"
              type="file"
              accept="image/*"
              ref={profilePicRef}
              onChange={handleProfileImageChange}
            />
          </FormControl>
          <FormControl>
            <TextInput
              label={"Username"}
              icon={<CgNametag />}
              type="text"
              state={username}
              setState={setUsername}
            />
          </FormControl>
          <FormControl className="text-gray-500">
            <TextInput
              icon={<CgNametag />}
              label={"Nickname"}
              type="text"
              state={nickname}
              setState={setNickname}
            />
          </FormControl>
          <FormControl className="text-gray-500 text-[14px] my-5">
            <FormLabel
              fontSize={"sm"}
              fontWeight={"bold"}
              className="text-[12px]"
            >
              Description
            </FormLabel>
            <Textarea
              bg={""}
              rounded={"2xl"}
              fontSize={"sm"}
              className="bg-slate-50 border-[2px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Flex gap={5} className="self-end">
            <Button
              bg={"whitesmoke"}
              color={"gray.700"}
              rounded={""}
              onClick={() => onClose()}
              className="mb-5 rounded-full"
              colorScheme="black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              bg={""}
              rounded={""}
              color={"white"}
              className="mb-5 rounded-full bg-primary"
            >
              Save Changes
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}
