import BigPostBanner from "../../components/BigPostBanner";
import Categories from "../../components/ReUsables/Categories/Categories";
import Header from "../../components/ReUsables/Header";
import HomeBannerCarousel from "../../components/HomeBannerCarousel";
import InfiniteScroll from "react-infinite-scroll-component";
import Post_Card from "../Post_Page/components/Post_Card";
import React, { useEffect, useState } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { db } from "../../../firebaseConfig";

import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";

function Home_Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [lastItemIdentifier, setLastItemIdentifier] = useState(null);

  const itemsPerPage = 5;

  const fetchInitialData = async () => {
    try {
      const feedRef = collection(db, "feed");
      const feedQuery = query(
        feedRef,
        orderBy("createdAt", "desc"),
        limit(itemsPerPage)
      );

      const feedSnapshot = await getDocs(feedQuery);
      const feedData = feedSnapshot.docs.map((doc) => doc.data());
      if (feedData.length < 5) {
        setHasMore(false);
      }
      if (feedData.length > 0 && feedData.length >= 5) {
        setLastVisible(feedSnapshot.docs[feedData.length - 1]);
        setLastItemIdentifier(feedData[feedData.length - 1].identifier);
        // Replace with your identifier field
        setHasMore(true);
      }

      setData(feedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const fetchMoreData = async () => {
    if (loading) return;

    try {
      const feedRef = collection(db, "feed");
      const feedQuery = query(
        feedRef,
        orderBy("createdAt", "desc"),
        limit(itemsPerPage),
        startAfter(lastVisible)
      );

      const feedSnapshot = await getDocs(feedQuery);
      const feedData = feedSnapshot.docs.map((doc) => doc.data());

      if (feedData.length > 0) {
        setLastVisible(feedSnapshot.docs[feedData.length - 1]);
        setLastItemIdentifier(feedData[feedData.length - 1].identifier); // Replace with your identifier field
      } else {
        setHasMore(false); // No more data to fetch
      }

      setData((prevData) => [...prevData, ...feedData]);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <Box className="overflow-hidden bg-slate-50  py-[60px] relative md:block flex flex-col justify-center md:items-start items-center">
      <Header />

      {loading ? (
        <Center className="h-[100vh]">
          <Spinner />
        </Center>
      ) : (
        <div className="w-[100vw] flex-1">
          <HomeBannerCarousel />
          <Categories />
          <Box className="grid  grid-cols-2 md:gap-2 w-[80vw] md:w-full md:grid-cols-1 xl:grid-cols-3">
            {data.map((item, key) => (
              <div key={key}>
                {item.feedType === "post" && <Post_Card item={item} />}
                {item.feedType === "blog" && <BigPostBanner blog={item} />}
                {/* Add more conditional rendering for other feed types if needed */}
              </div>
            ))}
          </Box>
        </div>
      )}
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        className="h-screen w-screen"
        hasMore={hasMore}
        pullDownToRefresh={true}
        refreshFunction={fetchMoreData}
        loader={
          <Center className="my-2">
            <Spinner size={"sm"} />
          </Center>
        }
      ></InfiniteScroll>
    </Box>
  );
}

export default Home_Page;
