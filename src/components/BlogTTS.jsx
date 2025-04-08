import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import wave from "../assets/lotties/wave.json";
import { Button } from "@chakra-ui/react";
import { BsPlayFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function BlogTTS({ content }) {
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    if (!playing) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  return (
    <div onClick={togglePlaying} className="w-fit mt-[5px] relative h-10">
      <div className="flex flex-row justify-center items-center gap-2">
        {!playing && (
          <div className="p-2 bg-primary rounded-full">
            <BsPlayFill color="white" />
          </div>
        )}
        {playing && (
          <Button
            bg=""
            style={{
              width: 30,
              height: 30,
              position: "relative",
            }}
            rounded="full"
            className="bg-primary"
          >
            <Button
              style={{
                scale: 0.05,
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              rounded="full"
              bg=""
              className="bg-primary animate-ping"
            ></Button>
            <Lottie
              animationData={wave}
              loop={true}
              style={{
                color: "white",
                position: "absolute",
              }}
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export default BlogTTS;
