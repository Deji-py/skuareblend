import React from "react";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { createContext } from "react";

export const PlayerContext = createContext({
  reapeating: false,
  setReapeating: () => {},
  playing: false,
  setPlaying: () => {},
  progress: 0,
  setProgress: () => {},
  playMode: "order",
  setPlayMode: () => {},
  handleSpeed: () => {},
  handlePlayPause: () => {},
  src: "",
  setSrc: () => {},
  playbackSpeed: 1,
  audioRef: null,
  progressData: null,
});

function PlayerProvider({ children }) {
  const [src, setSrc] = useState("");
  const [reapeating, setReapeating] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playMode, setPlayMode] = useState("order");
  const audioRef = useRef(null);

  const [playbackSpeed, setPlaybackSpeed] = useState(1); // Initial playback speed is 1x

  const handleEnded = () => {
    setPlaying(false);
    audioRef.current.seekTo(0);
    setPlaying(true);
  };

  const handlePlayPause = (src) => {
    setSrc(src);
    setPlaying((prevPlaying) => !prevPlaying);
  };

  useEffect(() => {
    setPlaying(true);
  }, [src]);

  const handleProgress = (progressData) => {
    const { playedSeconds, loadedSeconds } = progressData;

    const percentage =
      loadedSeconds > 0 ? (playedSeconds / loadedSeconds) * 100 : 0;
    setProgress(percentage);
  };

  const handleSpeed = () => {
    if (playbackSpeed === 0.5) {
      setPlaybackSpeed(1);
    }
    if (playbackSpeed === 1) {
      setPlaybackSpeed(2);
    }
    if (playbackSpeed === 2) {
      setPlaybackSpeed(0.5);
    }
  };

  useEffect(() => {
    if (playMode === "repeat") {
      setReapeating(true);
    } else {
      setReapeating(false);
    }
  }, []);

  const values = {
    handleSpeed,
    reapeating,
    setReapeating,
    playing,
    setPlaying,
    progress,
    setProgress,
    playMode,
    setPlayMode,
    handlePlayPause,
    src,
    setSrc,
    playbackSpeed,
    audioRef,
  };

  return (
    <PlayerContext.Provider value={values}>
      {children}

      <ReactPlayer
        url={src}
        playing={playing}
        controls={false}
        ref={audioRef}
        width={0}
        height={0}
        playbackRate={playbackSpeed}
        style={{ display: "none" }}
        onEnded={handleEnded}
        onProgress={(progressData) => handleProgress(progressData)}
        progressInterval={100}
      />
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
