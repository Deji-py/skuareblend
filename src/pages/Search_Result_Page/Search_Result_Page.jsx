import React, { useEffect, useState } from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";

function Search_Result_Page() {
  const params = useParams();
  const encodedQueryString = params?.id;
  const queryString = decodeURIComponent(encodedQueryString).toLowerCase();
  const [feeds, setFeeds] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const feedsRef = collection(db, "feed");
      const usersRef = collection(db, "users");
      const feedQuery = query(
        feedsRef,
        where(
          "title",
          "==",
          "The lost sheep of the family is the link to the classroom to check"
        ),

        where("feedType", "==", "blog")
      );
      const userQuery = query(usersRef, where("username", "==", queryString));

      try {
        const [feedSnapshot, userSnapshot] = await Promise.all([
          getDocs(feedQuery),
          getDocs(userQuery),
        ]);

        const feedResults = feedSnapshot.docs.map((doc) => doc.data());
        const userResults = userSnapshot.docs.map((doc) => doc.data());

        setFeeds(feedResults);
        setUsers(userResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [queryString, feeds, users]);

  return (
    <Box>
      <Tabs>
        <TabList>
          <Tab>Feeds</Tab>
          <Tab>Users</Tab>
          <Tab>Blogs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {feeds.map((feed) => (
              <div key={feed.id}>
                <p>{feed.title}</p>
              </div>
            ))}
          </TabPanel>
          <TabPanel>
            {users.map((user) => (
              <div key={user.id}>
                <p>{user.username}</p>
              </div>
            ))}
          </TabPanel>
          <TabPanel>
            {blogs.map((blog) => (
              <div key={blog.id}>
                <p>{blog.title}</p>
              </div>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Search_Result_Page;
