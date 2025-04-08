import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

import {
  collection,
  getDocs,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

function useRealtimeFetchAllBlogs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Set this based on your logic

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const lastDoc = data[data.length - 1]; // Get the last document in the current data

        let initialQuery = query(
          blogsRef,
          orderBy("createdAt", "desc"),
          limit(5)
        );

        if (lastDoc) {
          initialQuery = query(
            blogsRef,
            orderBy("createdAt", "desc"),
            limit(5),
            startAfter(lastDoc.createdAt)
          );
        }

        const querySnapshot = await getDocs(initialQuery);

        if (querySnapshot.empty) {
          // If the query snapshot is empty, there's no more data to fetch
          setHasMore(false);
        } else {
          const updatedData = [];
          querySnapshot.forEach((doc) => {
            updatedData.push({ id: doc.id, ...doc.data() });
          });
          setData((prevData) => [...prevData, ...updatedData]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // Fetch initial data

    return {
      data,
      loading,
      fetchMoreData: () => {
        if (!loading && hasMore) {
          fetchData(); // Fetch more data when there is more to fetch
        }
      },
    };
  }, []); // Dependency array should be empty to run once on component mount
}

export default useRealtimeFetchAllBlogs;
