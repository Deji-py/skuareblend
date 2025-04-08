import * as React from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { BsMicFill, BsPause, BsRecordFill } from "react-icons/bs";
import { MdStop } from "react-icons/md";

import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Tag,
  useToast,
} from "@chakra-ui/react";

export const RecorderContext = createContext({
  isPaused: null,
  isRecording: null,
  url: null,
  blob: null,
  handleStartRecording: () => {},
  handleStopRecording: () => {},
  handleTogglePlayPause: () => {},
  recordingTimer: null,
  setAutoStopDuration: null,
  setUrl: () => {},
  setBlob: () => {},
});

export default function RecorderProvider({ children }) {
  const recorder = useAudioRecorder({});
  const [isRecording, setIsRecording] = useState(recorder.isRecording);
  const [isPaused, setIsPaused] = useState(recorder.isPaused);
  const [blob, setBlob] = useState();
  const [recordingTimer, setRecordingTimer] = useState("");
  const [autoStopDuration, setAutoStopDuration] = useState(300); // in seconds
  const [url, setUrl] = useState(null);

  const formatTime = () => {
    const mins = Math.floor(recorder.recordingTime / 60);
    const secs = recorder.recordingTime % 60;
    setRecordingTimer(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
  };

  const handleStopRecording = () => {
    recorder.stopRecording();
  };

  const handleSaveAudio = (recordedBlob) => {
    const newUrl = URL.createObjectURL(recordedBlob);
    setUrl(newUrl);
    setBlob(recordedBlob);
  };

  useEffect(() => {
    formatTime();
    setIsRecording(recorder.isRecording);
    setIsPaused(recorder.isPaused);
  }, [recorder.isRecording, recorder.isPaused, recorder.recordingTime]);

  const handleTogglePlayPause = () => {
    recorder.togglePauseResume();
  };

  const handleStartRecording = () => {
    recorder.startRecording();
  };

  useEffect(() => {
    if (recorder.recordingTime >= autoStopDuration && isRecording) {
      handleStopRecording(blob);
      handleStartRecording();
    }
  }, [recorder.recordingTime, autoStopDuration, isRecording, blob]);

  const values = {
    isPaused,
    isRecording,
    url,
    handleStartRecording,
    handleStopRecording,
    recordingTimer,
    setAutoStopDuration,
    handleTogglePlayPause,
    blob,
    setUrl,
    setBlob,
  };

  return (
    <RecorderContext.Provider value={values}>
      <div className="hidden">
        <AudioRecorder
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          onRecordingComplete={(blob) => handleSaveAudio(blob)}
          recorderControls={recorder}
        />
      </div>
      {children}
    </RecorderContext.Provider>
  );
}
