import ReactPlayer from "react-player";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const AudioContext = createContext({
  audioQueue: [],
  currentAudioIndex: 0,
  setCurrentAudioIndex: () => {},
  playAudio: () => {},
  setAudioQueue: () => {},
  handlePlayPause: () => {},
  playing: false,
  progress: null,
  setProgress: () => {},
  setPlaying: () => {},
  handlePlayNext: () => {},
  handlePlayPrev: () => {},
  playMode: "order",
  setPlayMode: () => {},
  elapsedTime: "0:00",
  audioRef: null,
  remainingTime: "0:00",
  playbackSpeed: null,
  setPlaybackSpeed: () => {},
  handleSpeedChange: () => {},
});

export function AudioProvider({ children }) {
  const [audioQueue, setAudioQueue] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [playMode, setPlayMode] = useState("order");
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [playedIndexes, setPlayedIndexes] = useState([]);
  const [elapsedTime, setElapsedTime] = useState("0:00");
  const [remainingTime, setRemainingTime] = useState("0:00");
  const audioRef = useRef(null);

  const [playbackSpeed, setPlaybackSpeed] = useState(1); // Initial playback speed is 1x

  useEffect(() => {
    // Initialize audioRef.current as an HTML5 audio element
    audioRef.current = React.createRef();
  }, []);

  const handleSpeedChange = (newSpeed) => {
    // Check if the new speed is a valid value (e.g., between 0.5x and 2x)
    if (newSpeed >= 0.5 && newSpeed <= 2) {
      setPlaybackSpeed(newSpeed);
      audioRef.current.setPlaybackRate(newSpeed);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleEnded = () => {
    if (playMode === "repeat") {
      audioRef.current.seekTo(0);
      audioRef.current.play();
    } else if (playMode === "shuffle") {
      if (playedIndexes.length === audioQueue.length) {
        setPlaying(false);
      } else {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * audioQueue.length);
        } while (playedIndexes.includes(randomIndex));
        setPlayedIndexes([...playedIndexes, randomIndex]);
        setCurrentAudioIndex(randomIndex);
        setPlaying(true);
      }
    } else if (currentAudioIndex < audioQueue.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const handleProgress = (progressData) => {
    const { playedSeconds, loadedSeconds } = progressData;
    if (!isNaN(playedSeconds) && !isNaN(loadedSeconds)) {
      const percentage =
        loadedSeconds > 0 ? (playedSeconds / loadedSeconds) * 100 : 0;
      setProgress(percentage);
      if (audioRef.current && audioRef.current.getDuration) {
        const duration = audioRef.current.getSecondsLoaded();
        if (!isNaN(duration)) {
          const remainingTimeInSeconds = duration;
          const formattedElapsedTime = formatTime(playedSeconds);
          const formattedRemainingTime = formatTime(remainingTimeInSeconds);
          setElapsedTime(formattedElapsedTime);
          setRemainingTime(formattedRemainingTime);
        }
      }
    }
  };

  const handlePlayNext = () => {
    if (playMode === "shuffle") {
      const randomIndex = Math.floor(Math.random() * audioQueue.length);
      setCurrentAudioIndex(randomIndex);
    } else if (currentAudioIndex < audioQueue.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
      setPlaying(true);
    }
  };

  const handlePlayPrev = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(currentAudioIndex - 1);
      setPlaying(true);
    }
  };

  const handlePlayPause = (src) => {
    if (!playing) {
      setProgress(0);
    }
    setAudioQueue(src);
    setPlaying((prevPlaying) => !prevPlaying);
  };

  return (
    <AudioContext.Provider
      value={{
        audioQueue,
        currentAudioIndex,
        setAudioQueue,
        playing,
        setPlaying,
        setCurrentAudioIndex,
        handlePlayPause,
        handlePlayNext,
        handlePlayPrev,
        playMode,
        setPlayMode,
        progress,
        elapsedTime,
        remainingTime,
        audioRef,
        handleSpeedChange: handleSpeedChange,
        playbackSpeed,
      }}
    >
      {children}
      <ReactPlayer
        url={audioQueue[currentAudioIndex]}
        playing={playing}
        controls={false}
        ref={audioRef}
        width={0}
        height={0}
        style={{ display: "none" }}
        onEnded={handleEnded}
        onProgress={handleProgress}
        progressInterval={100}
      />
    </AudioContext.Provider>
  );
}
