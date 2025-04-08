import "react-spring-bottom-sheet/dist/style.css";
import AppStyledInput from "../AppStyledInput";
import CommentCard from "../CommentCard";
import MemoizedAppStyledInput from "../AppStyledInput";
import PlayerUI from "./component/PlayerUI";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AudioContext } from "./context/AudioContext";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

function CommentDrawer({ currentTrack, setShowComments, showComments }) {
  return (
    <Drawer
      placement="bottom"
      isOpen={showComments}
      onClose={() => setShowComments(false)}
    >
      <DrawerOverlay />
      <DrawerContent
        position={"relative"}
        zIndex={1000}
        bg={"white"}
        pb={5}
        shadow={"2xl"}
      >
        <DrawerHeader className="text-xs">Comments</DrawerHeader>
        <DrawerBody className="text-sm">
          {currentTrack?.comments?.length === 0 ? (
            <p className="pb-10">No comments Be the first to comment</p>
          ) : (
            <>
              {currentTrack?.comments.map((comment, index) => (
                <CommentCard commentData={comment} isReply={false} />
              ))}
            </>
          )}
          <MemoizedAppStyledInput
            postType={"podcasts"}
            postId={currentTrack?.id}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function PodcastPlayer({ url, isOpen, onClose, playerData }) {
  const [showComments, setShowComments] = useState(false);

  // Assuming you have these variables declared
  const { audioQueue, currentAudioIndex } = useContext(AudioContext);
  const currentTrack = audioQueue[currentAudioIndex];

  // Wrap the CommentDrawer in useMemo to memoize it
  const memoizedCommentDrawer = useMemo(() => {
    return (
      <CommentDrawer
        currentTrack={currentTrack}
        showComments={showComments}
        setShowComments={setShowComments}
      />
    );
  }, [currentTrack, showComments, setShowComments]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay bg={"white"} />
        <ModalContent h="90vh" overflowX={"hidden"} top={0}>
          <ModalCloseButton />
          <ModalBody px={0}>
            <PlayerUI setShowComments={setShowComments} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {memoizedCommentDrawer}
    </>
  );
}

export default PodcastPlayer;
