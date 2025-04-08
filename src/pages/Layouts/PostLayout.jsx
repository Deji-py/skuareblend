import CommentCard from "../../components/Comment/CommentCard";
import CommentInput from "../../components/Comment/CommentInput";
import CommentStateCard from "../../components/Comment/Comment_StateCard";
import Post_Card from "../Post_Page/components/Post_Card";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";

import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
} from "@chakra-ui/react";

function PostLayout() {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);
  const [isReplying, setIsReplying] = useState(false);
  const [commenting, setCommenting] = useState(params.id);
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    if (params) {
      try {
        const postRef = doc(db, "feed", params.id); // Assuming "feed" is your Firestore collection
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          setPost(postData);
        } else {
          // Handle the case where the post doesn't exist
          console.log("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    setCommenting(params.id);
  }, [params]);

  useEffect(() => {
    const unsubscribe = fetchComments(params?.id);
    return () => {
      unsubscribe();
    };
  }, [params]);

  const fetchComments = (postId) => {
    if (postId) {
      const commentsRef = collection(db, "feed", postId, "comments");
      const commentsQuery = query(commentsRef);
      return onSnapshot(commentsQuery, (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      });
    }
    return () => {}; // Return an empty function if there's no postId
  };

  const openReplyModal = (index) => {
    setSelectedCommentIndex(index);
    setIsReplying(true);
  };

  if (!post) {
    return (
      <Center height={"100vh"} className="w-[100vw] h-[100wh]">
        <Spinner />
      </Center>
    );
  }

  return (
    <div className="w-full  mb-20">
      <Post_Card item={post} isPage={true} />
      {comments.length === 0 ? (
        <Center py={10} flexDir={"column"} className="bg-white">
          <h2>No comments</h2>
          <h2 className="text-[14px] mb-20 text-gray-500">
            Be the first to comment
          </h2>
        </Center>
      ) : (
        <Stack className="bg-white pt-10 gap-5  px-2 mb-20">
          {comments.map((comment, index) => (
            <CommentCard
              key={comment.id}
              index={index}
              setSelectedCommentIndex={openReplyModal}
              setCommenting={setCommenting}
              setIsReplying={setIsReplying}
              postId={params.id}
              parentId={comment.parentId}
              commentData={comment}
            />
          ))}
        </Stack>
      )}
      <Modal
        isCentered
        isOpen={isReplying}
        onClose={() => setIsReplying(false)}
      >
        <ModalOverlay />
        <ModalContent bottom={0} position={"fixed"}>
          <CommentStateCard commentData={comments[selectedCommentIndex]} />
          <ModalBody px={0}>
            <CommentInput
              parentId={comments[selectedCommentIndex]?.id}
              isReplying={isReplying}
              setIsReplying={setIsReplying}
              friendId={comments[selectedCommentIndex]?.uid}
              id={commenting}
              postId={params.id}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <CommentInput
        isReplying={isReplying}
        parentId={comments[selectedCommentIndex]?.parentId}
        setIsReplying={setIsReplying}
        friendId={post?.uid}
        id={commenting}
        postId={params.id}
      />
    </div>
  );
}

export default PostLayout;
