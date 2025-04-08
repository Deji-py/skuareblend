import AgoraRTC from "agora-rtc-sdk-ng";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { Avatar, Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function MyLiveStore() {
  const [users, setUsers] = useState([]);
  const params = useParams();
  const TOKEN =
    "007eJxTYNhfrPPRzqV/Fau15MVl07YnfPphrGKbbW0XqFdgfuXDBWMFBgsD40RLg9TkRMskExNL81RLI3MDC/NkI9OUNHNjY/NU2YVKqQ2BjAz34/8yMjJAIIjPylBckl+UysAAABohHuY=";
  const APP_ID = "803a90eca9b4497e927087c25df7337e";
  const Store = "store";

  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  useEffect(() => {
    client
      .join(APP_ID, Store, TOKEN, null)
      .then((uid) => {
        return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
      })
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setUsers((prevUsers) => [
          ...prevUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });
  }, []);

  return (
    <VStack className="w-full h-screen ">
      <Box className="h-[60%] bg-white w-full">
        {users.map((user) => (
          <VideoPlayer user={user} key={user.uid} />
        ))}
      </Box>
      <Box>
        <p className="my-2">Audience</p>
        <Grid className="w-full" gap={5} gridTemplateColumns={"repeat(6, 1fr)"}>
          {users.map((user) => (
            <GridItem key={user.uid}>
              <Avatar src="" />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </VStack>
  );
}

export default MyLiveStore;
