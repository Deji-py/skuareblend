import React, { useEffect, useState } from "react";
import { collection, getDoc, onSnapshot, query } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebaseConfig";

function StoreChats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const storeId = params.id;

  useEffect(() => {
    const fetchStoreChats = async () => {
      if (storeId) {
        try {
          const storeChatsRef = collection(db, "stores", storeId, "messages");

          const messagers = [];

          const unsubscribe = onSnapshot(storeChatsRef, (snapshot) => {
            snapshot.forEach(async (doc) => {
              console.log("id", doc.id);
              const docRef = doc(db, "users", doc.id);
              const result = await getDoc(docRef);
              messagers.push(result.data());
            });
            setChats(messagers);
          });

          return () => {
            // Unsubscribe when component unmounts
            unsubscribe();
          };
        } catch (error) {
          console.error("Error fetching store chats:", error);
        }
      }
    };

    fetchStoreChats();
  }, [storeId]);

  return (
    <div>
      {chats?.map((chat, index) => (
        <p>{chat?.uid}</p>
      ))}
    </div>
  );
}

export default StoreChats;
