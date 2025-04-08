import React, { useContext, useState } from "react";
import { Avatar, Box, Flex, IconButton } from "@chakra-ui/react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { BsEmojiSmile } from "react-icons/bs";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import { MdSend } from "react-icons/md";
import { v4 } from "uuid";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../App";

function AppStyledInput({ postType, postId, state, setState, commenterImage }) {
  const { userData, userId } = useContext(AuthContext);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (text === "") {
      return;
    }
    try {
      const docRef = doc(db, postType, postId);
      await updateDoc(docRef, {
        comments: arrayUnion({
          commenterId: userId,
          id: v4(),
          text: text,
          likes: [],
        }),
      });
      setText("");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Flex
      w={"full"}
      gap={2}
      pos={"fixed"}
      bottom={0}
      left={0}
      px={2}
      className="border-t-2 py-2  "
      justifyContent={"center"}
      alignItems={"center"}
    >
      <div className="">
        <Avatar size={"sm"} src={userData?.profilepic} />
      </div>
      <Flex bg={"white"} className="flex-1 rounded-lg overflow-hidden">
        <input
          onChange={(e) => setText(e.target.value)}
          placeholder="Say Something"
          type="text"
          value={text}
          className="flex-1 bg-[whitesmoke] text-[14px] border-none placeholder:text-[14px] py-2 outline-none "
        />
        <Flex className="gap-4 px-3">
          <button className="cursor-default">
            <BsEmojiSmile />
          </button>
          <button className="cursor-default">
            <GoPaperclip />
          </button>
        </Flex>
      </Flex>
      <IconButton
        onClick={handleSubmit}
        bg={"cyan.600"}
        color={"white"}
        icon={<MdSend />}
        rounded={"lg"}
      />
    </Flex>
  );
}

// Memoize the AppStyledInput component
const MemoizedAppStyledInput = React.memo(AppStyledInput);

export default MemoizedAppStyledInput;
