import React from "react";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

async function InitializeChat(
  setLoading,
  item,
  friendId,
  userId,
  navigate,
  messageId,
  alternative
) {
  let currentChatDoc = messageId;

  setLoading(true);
  try {
    // User refs
    const chatDocRef = doc(db, "users", userId, "messages", currentChatDoc);
    const alternativeDocRef = doc(db, "users", userId, "messages", alternative);
    // Friend refs
    const friendChatDocRef = doc(db, "users", friendId, "messages", messageId);
    const friendAlternativeDocRef = doc(
      db,
      "users",
      friendId,
      "messages",
      alternative
    );

    // Get snapshots for user documents
    const chatDocSnapshot = await getDoc(chatDocRef);
    const alternativeDocSnapshot = await getDoc(alternativeDocRef);

    // Get snapshots for friend documents
    const friendChatDocSnapshot = await getDoc(friendChatDocRef);
    const friendAlternativeDocSnapshot = await getDoc(friendAlternativeDocRef);

    if (chatDocSnapshot.exists() || friendChatDocSnapshot.exists()) {
      currentChatDoc = messageId;
    } else if (
      alternativeDocSnapshot.exists() ||
      friendAlternativeDocSnapshot.exists()
    ) {
      currentChatDoc = alternative;
    }
    const friendDocRef = doc(db, "users", friendId, "messages", currentChatDoc);

    await setDoc(chatDocRef, {
      participants: [userId, friendId],
    });
    await setDoc(friendDocRef, {
      participants: [userId, friendId],
    });
    const userDocRef = doc(db, "users", userId);

    // Always add the chat to the user's recent-chats array
    await updateDoc(userDocRef, {
      recent_chats: arrayUnion(currentChatDoc),
    });

    setLoading(false);
    navigate("/discussion/chat/" + currentChatDoc, {
      state: {
        profilepic: item?.profilepic,
        username: item?.username,
        uid: friendId,
      },
    });
  } catch (error) {
    console.error("Error initializing chat:", error);
    // Handle the error as needed
    setLoading(false);
    // You may want to show an error message to the user here
  }
}

export default InitializeChat;
