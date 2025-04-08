import React from "react";
import ReactPlayer from "react-player/youtube";

function YouTubePlayer({ youtubeUrl, height }) {
  return (
    <div className="youtube-player">
      <ReactPlayer
        url={youtubeUrl}
        controls={true} // Enable player controls
        width="100%" // Set the width of the player
        height={height ? height : "250px"} // Set the height of the player
      />
    </div>
  );
}

export default YouTubePlayer;
