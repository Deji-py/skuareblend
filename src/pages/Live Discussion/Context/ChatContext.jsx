import Fetch_Recent_Chats_Service from "../Services/Fetch_All_CXhats_Service";
import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

// Step 1: Create a ChatContext
const ChatContext = createContext({
  recentChats: null,
  messages: [],
  setMessages: () => {},
  users: [],
  setUsers: () => {},
  hasUnreadMessages: false,
  setHasUnreadMessages: () => {},
});

// Step 2: Create a ChatProvider component
export function ChatProvider({ children }) {
  // Define your chat-related state and functions here
  const [messages, setMessages] = useState([]);
  const { userData, userId } = useContext(AuthContext);
  const [recentChats, setRecentChats] = useState();
  const [users, setUsers] = useState([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(); // New state

  useEffect(() => {
    const fetchRecent = async () => {
      await Fetch_Recent_Chats_Service(userData, userId, setRecentChats);
    };
    if (userData) {
      fetchRecent();
    }
  }, [userData]);

  // Function to check if there are recent chats with unread messages
  useEffect(() => {
    // Create a flag to track if there are any unread messages
    let hasUnread = false;
    if (recentChats && userId) {
      // Iterate through recent chats
      recentChats?.forEach((chat) => {
        const messagesRef = collection(
          db,
          "users",
          userId,
          "messages",
          chat?.messageId,
          "chats"
        );

        // Attach a snapshot listener to each chat's messages
        onSnapshot(messagesRef, (snapshot) => {
          snapshot.forEach((doc) => {
            const messageData = doc.data();

            // Check if the message is from another user and is unread
            if (messageData?.uid !== userId && !messageData?.isRead) {
              hasUnread = true;
              return; // Exit the loop if there's at least one unread message
            }
          });

          // After processing messages for a chat, update the state if needed
          setHasUnreadMessages(hasUnread);
        });
      });

      // You may want to set the state here as well in case there are no recent chats
      setHasUnreadMessages(hasUnread);
    }
  }, [recentChats, userId]);

  // You can define functions and state related to chat here

  return (
    // Step 3: Provide the ChatContext to the component tree
    <ChatContext.Provider
      value={{
        recentChats,
        messages,
        setMessages,
        users,
        setUsers,
        hasUnreadMessages,
        setHasUnreadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Step 4: Create a custom hook to access the ChatContext
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
