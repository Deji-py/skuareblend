import { useContext, useEffect } from "react";
import { useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { MdGraphicEq, MdRepeat } from "react-icons/md";
import { PlayerContext } from "../Player/PlayerContext";

import {
  Box,
  Button,
  Center,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

function CommentPlayer({ src, style }) {
  const {
    handleSpeed,
    playMode,
    setPlayMode,
    handlePlayPause,
    playbackSpeed,
    audioRef,
    playing,
    progress,
  } = useContext(PlayerContext);
  const [repeating, setRepeating] = useState(false);

  const isCurrentAudio = audioRef?.current.props.url === src;

  const handleSliderChange = (value) => {
    // Calculate the new time position in seconds based on the slider value
    const newTime = (value / 100) * audioRef.current.getDuration();

    // Seek the audio to the new time position
    audioRef.current.seekTo(newTime);
  };

  const toggleRepeatMode = () => {
    if (playMode === "repeat") {
      setPlayMode("");
      setRepeating(false);
    } else {
      setPlayMode("repeat");
      setRepeating(true);
    }
  };

  const handlePlay = () => {
    handlePlayPause(src);
  };
  return (
    <div
      style={style}
      className="w-full  border-[#6381E3] flex-none border-[0.5px] bg-[#fff] mb-2 p-2 rounded-xl"
    >
      <Flex className="w-full ">
        <Center className="gap-2 pr-5">
          <Button
            bg={repeating ? "#6381E3" : "white"}
            fontSize={"10px"}
            color={repeating ? "white" : "#6381E3"}
            size={"xs"}
            rounded={"md"}
            _hover={{
              backgroundColor: repeating ? "#6381E3" : "",
            }}
            onClick={toggleRepeatMode}
          >
            <MdRepeat size={15} />
          </Button>
          <Button
            onClick={handleSpeed}
            bg={"white"}
            fontSize={"10px"}
            color={"#6381E3"}
            size={"xs"}
            onChange={() => {
              console.log("Hello");
            }}
            rounded={"md"}
          >
            {isCurrentAudio ? playbackSpeed : 1}x
          </Button>
        </Center>
        <Slider
          aria-label={"slider-ex-4"}
          min={0}
          isDisabled={false}
          draggable={true}
          max={100}
          value={isCurrentAudio ? progress : 0}
          defaultValue={0}
          onChange={(value) => handleSliderChange(value)}
        >
          <SliderTrack bg="gray.100">
            <SliderFilledTrack bg="#6381E3" />
          </SliderTrack>
          <SliderThumb boxSize={5}>
            <Box color="#6381E3" as={MdGraphicEq} />
          </SliderThumb>
        </Slider>
        <Button
          onClick={handlePlay}
          flex={"none"}
          width={10}
          bg={""}
          height={10}
          rounded={"full"}
          _hover={{ bg: "black" }}
          color={""}
          className="bg-primary text-white"
          size={"sm"}
        >
          {isCurrentAudio && playing ? (
            <BsPauseFill size={25} />
          ) : (
            <BsPlayFill size={25} />
          )}
        </Button>
      </Flex>
    </div>
  );
}

export default CommentPlayer;
