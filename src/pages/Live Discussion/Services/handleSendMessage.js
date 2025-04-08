import compressImagesForUpload from "../../../utility/compressImageForUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { db, storage } from "../../../../firebaseConfig";

import {
  addDoc,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const handleAddMessage = async (
  setSending,
  setMessage,
  setUrl,
  blob,
  image,
  message,
  userId,
  userCollectionRef,
  friendCollectionRef,
  scrollToBottom,
  friendDetail,
  setImage,
  currentlyReplying,
  setCurrentlyReplying,
  setBlob,
  chatId
) => {
  setSending(true);
  let audioUrl = null;
  let imageUrl = null;
  const customId = v4();

  if (message.trim() === "" && !blob && !image) {
    setSending(false);
    return;
  }
  setMessage("");
  setUrl("");
  if (blob) {
    const audioRef = ref(storage, `${userId}/messageAudios/${customId}.mp3`);
    let upload = await uploadBytes(audioRef, blob);
    let audioDownloadUrl = await getDownloadURL(upload.ref);
    audioUrl = audioDownloadUrl;
    setBlob(null);
  }
  if (image) {
    const compressedImage = await compressImagesForUpload(image);
    const imageRef = ref(storage, `${userId}/messageImages/${customId}.png`);
    let upload = await uploadBytes(imageRef, compressedImage[0]);
    let imageDownloadUrl = await getDownloadURL(upload.ref);
    imageUrl = imageDownloadUrl;
    setImage(null);
  }
  const friendDocRef = doc(db, "users", friendDetail?.uid);
  const currentTimeStamp = serverTimestamp();

  try {
    const data = {
      replying: currentlyReplying,
      uid: userId,
      id: customId,
      text: message,
      image: imageUrl,
      audio: audioUrl,
      timestamp: currentTimeStamp,
      isSent: true,
      isRead: false,
    };
    setCurrentlyReplying(null);
    await addDoc(userCollectionRef, data);
    await addDoc(friendCollectionRef, { isSent: true, ...data });
    await updateDoc(friendDocRef, { recent_chats: arrayUnion(chatId) });
    scrollToBottom();
    setSending(false);
  } catch (error) {
    console.error("Error sending message:", error);
    setSending(false);
  }
};
