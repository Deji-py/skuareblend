import React from "react";
import TextInput from "../../../../components/TextInput";
import { useState } from "react";
import { useContext } from "react";
import { IoIosPaperPlane } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { v4 } from "uuid";
import { db } from "../../../../../firebaseConfig";
import { AuthContext } from "../../../../App";

import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

function StoreMessageDialogue({ isOpen, onClose, storeId }) {
  const [message, setMessage] = useState("");
  const { userId } = useContext(AuthContext);
  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }
    const userDocRef = doc(db, "stores", storeId, "messages", userId);
    const chatsCollectionRef = collection(userDocRef, "chats");
    const chatDocRef = doc(chatsCollectionRef, v4());
    let chat = await getDoc(chatDocRef);

    if (chat.exists()) {
      await updateDoc(chatDocRef, {
        message: message,
        timeStamp: serverTimestamp(),
        uid: userId,
      });
    } else {
      await setDoc(chatDocRef, {
        message: message,
        timeStamp: serverTimestamp(),
        uid: userId,
      });
    }

    setMessage("");
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalHeader>Message Store</ModalHeader>
      <ModalOverlay />
      <ModalContent>
        <ModalBody className="bg-white z-[3000] w-full left-0 py-20">
          <p>Message Store</p>
          <TextInput
            setState={setMessage}
            state={message}
            icon={<MdMessage />}
            placeholder={"message Here"}
          />
          <HStack justify={"end"} bg={""}>
            <Button
              onClick={sendMessage}
              bg={""}
              color={"white"}
              className=" bg-primary mt-5"
            >
              Send <IoIosPaperPlane className="ml-2" />
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default StoreMessageDialogue;
