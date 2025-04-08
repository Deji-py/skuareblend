import AllPostMasonry from "./components/AllPostMasonry";
import CreatePostForm from "./components/CreatePostForm";
import Create_Post from "./Create_Post";
import FabMainButton from "../../components/ReUsables/FAB/FabMainButton";
import LoaderScreen from "../../components/Loader/LoaderScreen";
import Post_Footer from "./components/Post_Footer";
import React, { useContext, useRef, useState } from "react";
import { BsImageFill, BsYoutube } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { GoPulse } from "react-icons/go";
import { MdAdd, MdPostAdd } from "react-icons/md";
import { AuthContext } from "../../App";
import { uploadPostToFirestore } from "./Services/uploadPost";
import { Post_Page_Header } from "./components/Post_Header";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";

export function Post_Page() {
  const [openPostCreator, setOpenPostCreator] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [tags, setTags] = useState([]);
  const [isDiscreet, setIsDiscreet] = useState(false); // State for discreet toggle

  const toast = useToast();

  const handleOpen = () => {
    setOpenPostCreator(true);
  };

  const handleSubmit = () => {
    uploadPostToFirestore(
      userId,
      text,
      youtubeLinks,
      images,
      setText,
      setImages,
      setYoutubeLinks,
      setYoutubeLink,
      setOpenPostCreator,
      setLoading,
      toast,
      isDiscreet,
      tags
    );
  };

  if (loading) {
    toast({
      title: "Uploading Post",
      status: "loading",
      position: "top",
    });
    return <LoaderScreen />;
  }

  return (
    <Center flexDir={"column"} className=" relative mb-20 mt-[62px]">
      <Post_Page_Header />
      <AllPostMasonry />
      {/* <Post_Footer handleOpen={handleOpen} /> */}
      <FabMainButton onClick={handleOpen} icon={<FaPlus />} />
      <Create_Post
        handleSubmit={handleSubmit}
        onClose={() => setOpenPostCreator(false)}
        isOpen={openPostCreator}
      >
        <CreatePostForm
          setYoutubeLinks={setYoutubeLinks}
          youtubeLinks={youtubeLinks}
          setYoutubeLink={setYoutubeLink}
          youtubeLink={youtubeLink}
          setImages={setImages}
          images={images}
          setText={setText}
          text={text}
          tags={tags}
          setTags={setTags}
          isDiscreet={isDiscreet}
          setIsDiscreet={setIsDiscreet}
          onClose={handleOpen}
          isOpen={openPostCreator}
        />
      </Create_Post>
    </Center>
  );
}
