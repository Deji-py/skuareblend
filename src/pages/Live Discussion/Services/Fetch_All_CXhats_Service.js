import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

async function FetchRecentChatsService(userData, userId, setRecentChats) {
  try {
    if (!userData?.recent_chats) {
      setRecentChats([]);
      return;
    }

    const recentMessages = userData.recent_chats;
    const recentChatsData = [];

    for (const messageId of recentMessages) {
      try {
        const messageDocRef = doc(db, "users", userId, "messages", messageId);
        const messageDoc = await getDoc(messageDocRef);

        if (messageDoc.exists()) {
          const messageData = messageDoc.data();
          const participants = messageData.participants;
          const otherParticipantId = participants.find((id) => id !== userId);
          const userDocRef = doc(db, "users", otherParticipantId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();

            recentChatsData.push({
              messageId: messageId,
              profilepic: userData.profilepic,
              username: userData.username,
              uid: userData.uid,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching message or user data:", error);
        // Handle the specific error for this message or user retrieval
      }
    }

    // Set the recent chats state after all data is processed
    setRecentChats(recentChatsData);
  } catch (error) {
    console.error("Error fetching recent chats:", error);
    // Handle the general error for the entire operation
  }
}

export default FetchRecentChatsService;
