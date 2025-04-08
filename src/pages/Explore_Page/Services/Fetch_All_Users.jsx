import React from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

async function Fetch_All_Users(setUsers, setLoading, userId) {
  const usersData = [];

  try {
    // Define the batch size (you can adjust this based on your needs)
    const batchSize = 10;

    // Get a reference to the "users" collection
    const usersCollection = collection(db, "users");

    // Create a query to retrieve all users excluding the current user
    const allUsersQuery = query(
      usersCollection,
      where("uid", "!=", userId),
      limit(5)
    );

    // Fetch all documents in batches
    const snapshot = await getDocs(allUsersQuery);

    // Split the documents into batches and fetch them in parallel
    const batchedPromises = [];
    let batch = [];

    snapshot.forEach((doc) => {
      batch.push(doc);
      if (batch.length === batchSize) {
        batchedPromises.push(fetchBatch(batch));
        batch = [];
      }
    });

    // Fetch the remaining documents (if any)
    if (batch.length > 0) {
      batchedPromises.push(fetchBatch(batch));
    }

    // Wait for all batched queries to complete
    await Promise.all(batchedPromises);

    function fetchBatch(batch) {
      const batchPromises = batch.map(async (doc) => {
        const userData = doc.data();
        usersData.push(userData);
      });
      return Promise.all(batchPromises);
    }
  } catch (error) {
    console.error("Error fetching documents:", error);
  }

  // Set the users and indicate that loading is complete
  setUsers(usersData);
  setLoading(false);
}

export default Fetch_All_Users;
