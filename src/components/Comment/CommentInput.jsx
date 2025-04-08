import CommentPlayer from "./CommentPlayer";
import Notifier from "../../pages/Notifications/Services/Notifier";
import React, { useEffect, useState } from "react";
import beepSound from "../../assets/Beep.mp3";
import fetchUser from "../../Services/fetchUser";
import { ur } from "@faker-js/faker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import { BsMicFill, BsX } from "react-icons/bs";
import { MdSend, MdStop } from "react-icons/md";
import { v4 } from "uuid";
import { db, storage } from "../../../firebaseConfig";
import { AuthContext } from "../../App";
import { RecorderContext } from "../Recorder/RecorderContext";

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Import the beep sound (adjust the path accordingly)

function CommentInput({
  id,
  postId,
  isReplying,
  setIsReplying,
  friendId,
  parentId,
}) {
  const {
    handleStartRecording,
    recordingTimer,
    handleStopRecording,
    isRecording,
    url,
    blob,
    setUrl,
    setBlob,
  } = useContext(RecorderContext);

  const [beepAudio] = useState(new Audio(beepSound)); // Create an Audio object
  const [text, setText] = useState(null);
  // const userDetail = useFetchUser(friendId);
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    if (friendId) {
      const getUserData = async () => {
        const userData = await fetchUser(friendId);
        setUserDetail(userData);
      };
      getUserData();
    }
  }, [friendId]);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    // Load the audio file when the component is mounted
    beepAudio.load();
  }, [beepAudio]);

  const handleRecording = () => {
    beepAudio.play();
    handleStartRecording();
  };

  const handleSubmit = async () => {
    if (!blob && !text) {
      return;
    }

    try {
      const key = v4();
      let postRef;

      if (isReplying) {
        // You are replying to a comment, so get the reference to the parent comment
        postRef = doc(db, "feed", id, "comments", parentId); // Assuming parentId contains the ID of the parent comment
      } else {
        // You are commenting on the main post
        postRef = doc(db, "feed", id);
      }

      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        setText("");
        setUrl(null);
        setIsReplying(false);
        let downloadurl = null;

        if (url) {
          // Create a storage reference using the storage() object
          const storageRef = ref(storage, `${userId}/postAudio/${key}`);

          // Upload the audio blob to Firebase Storage
          let audioSnapshot = await uploadBytes(storageRef, blob);

          // Get the download URL for the uploaded audio
          let downloadSnapshot = await getDownloadURL(audioSnapshot.ref);
          downloadurl = downloadSnapshot;
        }

        // Create the comment data
        const commentData = {
          id: key,
          uid: userId,
          createdAt: serverTimestamp(),
          text,
          audioUrl: downloadurl,
          likes: [],
          postId: postId,
          parentId: isReplying ? parentId : null,
          // Add other comment properties as needed
        };

        // Reference the "replies" subcollection of the comment
        const repliesCollectionRef = collection(postRef, "comments");

        // Use the custom key as the document ID when adding the comment
        await setDoc(doc(repliesCollectionRef, key), commentData);
        await Notifier(userId, friendId, postId, "commented", text, "post");
        // Clear the input field and recorded file (if any)
        setBlob(null);
      } else {
        // The post or comment does not exist, handle this case according to your application logic
        console.log("The post or comment does not exist. Handle this case.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box
      width={"full"}
      bg={"white"}
      className="reverseShadow"
      position={isReplying ? "relative" : "fixed"}
      zIndex={1000}
      bottom={0}
    >
      {url && !isRecording && (
        <div className="px-2">
          <CommentPlayer src={url} />
        </div>
      )}
      <>
        {isReplying && (
          <p className="text-[13px] ml-5 mt-2">
            Replying:
            <span className="text-cyan-800 font-bold">
              {userDetail?.username}
            </span>
          </p>
        )}
        <Flex alignItems={"center"} className="p-2  ">
          <Flex
            alignItems={"center"}
            className="bg-gray-100 h-[35px] rounded-l-full flex-1"
          >
            {url ? (
              <Button
                onClick={() => {
                  setBlob(null);
                  setUrl("");
                }}
                color={"gray"}
                bg={"none"}
                padding={0}
                _hover={{ bg: "" }}
                rounded={"full"}
                className={`w-10 p-0  `}
              >
                <BsX size={20} />
              </Button>
            ) : (
              <Button
                onClick={handleRecording}
                color={isRecording ? "cyan.600" : "gray"}
                bg={"none"}
                padding={0}
                _hover={{ bg: "" }}
                rounded={"full"}
                className={`w-10 p-0  ${isRecording && " animate-pulse "}`}
              >
                <BsMicFill size={20} />
              </Button>
            )}

            {isRecording ? (
              <Flex
                justifyContent={"space-between"}
                className="w-full  px-2"
                alignItems={"center"}
              >
                <Box className="w-full text-sm text-cyan-700">Recording...</Box>
                <p className="text-sm text-gray-500">{recordingTimer}</p>
              </Flex>
            ) : (
              <input
                onChange={(e) => setText(e.target.value)}
                className="flex-1 placeholder:text-[14px] outline-none bg-gray-100  border-none"
                type="text"
                value={text}
                autoFocus={false}
                placeholder="Type Comment..."
              />
            )}
          </Flex>
          {!isRecording ? (
            <Button
              onClick={handleSubmit}
              rounded={""}
              bg={""}
              height={"35px"}
              color={"white"}
              _hover={{
                bg: "rgb(0 78 100)",
              }}
              className={` bg-primary  rounded-r-full`}
            >
              <MdSend size={20} />
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleStopRecording();
              }}
              rounded={""}
              bg={""}
              height={"35px"}
              color={"white"}
              _hover={{
                bg: "black",
              }}
              className={` bg-primary  rounded-r-full`}
            >
              <MdStop size={20} />
            </Button>
          )}
        </Flex>
      </>
    </Box>
  );
}

export default CommentInput;
