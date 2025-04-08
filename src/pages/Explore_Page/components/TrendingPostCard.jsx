import Chip from "../../../components/MicroComps/Chip";
import React from "react";
import YouTubePlayer from "../../../components/ReUsables/YoutubePlayer";
import { Box, Image, Tag } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function TrendingPostCard({ item }) {
  return (
    <Link to={"/post/" + item?.id}>
      <Box className=" rounded-2xl flex-none relative overflow-hidden w-[200px] h-[120px]">
        {/* Render the image if there are images */}
        <Chip
          bgColor="white"
          textColor="red"
          icon={BsHeartFill}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            zIndex: 30,
            boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
          label={item?.likes?.length + " Likes"}
        />
        {item?.images && item?.images.length > 0 && (
          <Image
            alt="postCover"
            w={"full"}
            bg={"gray.100"}
            height={"full"}
            objectFit={"cover"}
            src={item?.images[0].src}
          />
        )}

        {/* Render the YouTube player if there are YouTube links */}
        {!item?.images &&
          item?.youtubeLinks &&
          item?.youtubeLinks.length > 0 && (
            <YouTubePlayer youtubeUrl={item?.youtubeLinks[0]} />
          )}
        <Box className=" absolute flex flex-col justify-end items-start py-4 px-2 w-full z-[20] h-full top-0 bg-gradient-to-b from-transparent via-transparent to-black">
          <p className="text-white text-[12px]">
            {item?.text.slice(0, 80) + "..."}
          </p>
        </Box>
      </Box>
    </Link>
  );
}

export default TrendingPostCard;
