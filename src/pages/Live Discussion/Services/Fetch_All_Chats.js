import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

async function Fetch_All_Chats(userData, setFriendsList, setLoading, userId) {
  const data = [];

  try {
    const followedChannels = userData?.followedChannels;

    if (followedChannels && followedChannels.length > 0) {
      // Create an array to store batched queries
      const batchedQueries = [];

      // Define a batch size (you can adjust this based on your needs)
      const batchSize = 10;

      // Split followedChannels into batches
      for (let i = 0; i < followedChannels.length; i += batchSize) {
        const batch = followedChannels.slice(i, i + batchSize);

        // Create a query for each batch
        const q = query(
          collection(db, "users"),
          where("uid", "in", batch),
          where("uid", "!=", userId)
        );

        // Add the query to the batchedQueries array
        batchedQueries.push(q);
      }

      // Execute all batched queries in parallel
      const queryPromises = batchedQueries.map(async (q) => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            // Document exists, extract data
            data.push(doc.data());
          } else {
            console.log("No such document for user: " + doc.id);
          }
        });
      });

      // Wait for all queries to complete
      await Promise.all(queryPromises);
    }
  } catch (error) {
    console.error("Error fetching documents:", error);
  }

  setFriendsList(data);
  setLoading(false);
}

export default Fetch_All_Chats;
