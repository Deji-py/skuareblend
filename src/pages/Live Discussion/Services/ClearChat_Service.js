import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { ref } from "firebase/storage";
import { db, storage } from "../../../../firebaseConfig";
import { deleteAllFilesInStorageRef } from "../../../utility/clearStorageDirectory";

export const ClearChat = async (userId, closeDialog, chatId) => {
  // Assuming closeDialog is a function to close a chat dialog
  closeDialog();

  const chatsCollectionRef = collection(
    db,
    "users",
    userId,
    "messages",
    chatId,
    "chats"
  );

  const querySnapshot = await getDocs(chatsCollectionRef);
  const audioRef = ref(storage, `${userId}/messageAudios`);
  const imageRef = ref(storage, `${userId}/messageImages`);
  deleteAllFilesInStorageRef(imageRef);
  deleteAllFilesInStorageRef(audioRef);

  try {
    // Iterate through the documents and delete them one by one
    querySnapshot.forEach(async (snapshot) => {
      const docRef = doc(chatsCollectionRef, snapshot.id);
      await deleteDoc(docRef);
    });

    console.log("Chat cleared successfully");
  } catch (error) {
    console.error("Error clearing chat:", error);
  }
};
