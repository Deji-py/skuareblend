import Post_Footer from "./Post_Footer";
import React, { useEffect, useState } from "react";
import TextInput from "../../../components/TextInput";
import YouTubePlayer from "../../../components/ReUsables/YoutubePlayer";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Switch,
} from "@chakra-ui/react";

const ImagePrevImageItems = ({ item }) => {
  return (
    <div className="w-full h-[200px]">
      <Image
        className="w-full h-full object-cover"
        src={URL.createObjectURL(item)}
        alt="image"
      />
    </div>
  );
};

function CreatePostForm({
  onClose,
  images,
  setImages,
  isOpen,
  youtubeLink,
  setYoutubeLink,
  youtubeLinks,
  setYoutubeLinks,
  text,
  setText,
  isDiscreet,
  setIsDiscreet,
  tags,
  setTags,
}) {
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    // Regular expression to match hashtags (#tag)
    const hashtagRegex = /#[^\s#]+/g;
    const extractedTags = text.match(hashtagRegex) || [];
    const tagsFormatted = extractedTags.map((tag) => ({
      tag,
      key: `${tag}-${Date.now()}`,
    }));
    setTags(tagsFormatted);
  }, [text]);

  return (
    <div className=" h-[100vh] mb-[200px] px-2">
      <Post_Footer
        setImage={setImages}
        setYoutube={setYoutubeLink}
        youtubeLink={youtubeLink}
        handleOpen={onClose}
        isOpen={isOpen}
        setYoutubeLinks={setYoutubeLinks}
      />
      <div className="relative ">
        <textarea
          className="w-full pl-2 pt-10 border-none outline-none h-[30vh] mt-[60px]"
          placeholder="What's on Your Mind...."
          value={text}
          onChange={handleInputChange}
        />
        <div className="absolute bottom-2 gap-2 flex flex-row  left-0 right-0 pointer-events-none">
          {tags.map((tag) => (
            <span
              key={tag.key}
              style={{
                color: "blue",
                borderBottom: "1px solid blue",
                cursor: "pointer",
              }}
            >
              {tag.tag}
            </span>
          ))}
        </div>
      </div>

      {/* Enable Discreet Post Toggle */}
      <HStack
        justifyContent={"space-between"}
        className=" border-[1.5px] shadow rounded-full p-2"
      >
        <p className="text-[14px] ml-2 text-gray-500">Enable Discreet Post</p>
        <Switch
          isChecked={isDiscreet}
          onChange={() => setIsDiscreet(!isDiscreet)}
          id="email-alerts"
        />
      </HStack>
      {isDiscreet && (
        <Alert className="mt-2" status="info">
          <AlertIcon />
          <Box>
            <AlertTitle>Discreet Mode enabled</AlertTitle>
            <AlertDescription>
              Please note that your information will not be shared along side
              this post, if you dont want this kindly uncheck
            </AlertDescription>
          </Box>
        </Alert>
      )}
      {/* Create YouTube videos array */}
      <Flex gap={2} flexDir={"column"}>
        {youtubeLinks.map((item, key) => (
          <YouTubePlayer key={key} youtubeUrl={item} />
        ))}
      </Flex>
      <Grid
        gridTemplateColumns={"repeat(2, 1fr)"}
        mt={5}
        flexWrap={"wrap"}
        gap={2}
      >
        {images?.map((item, key) => (
          <GridItem>
            <ImagePrevImageItems key={key} item={item} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}

export default CreatePostForm;
