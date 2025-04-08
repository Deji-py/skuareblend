import BigPostBanner from "../../components/BigPostBanner";
import Post_Card from "../Post_Page/components/Post_Card";
import React from "react";
import { Box, Center, HStack, Spinner } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";

function CategorySearchResult() {
  const [categoryFeed, setcategoryFeed] = useState();
  const params = useParams();
  const category = params.id;

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const docRef = collection(db, "feed");
        const q = query(docRef, where("category", "==", category));

        const result = await getDocs(q);
        const similarList = [];

        result.docs.forEach((doc) => {
          const data = doc.data();
          similarList.push(data);
        });

        setcategoryFeed(similarList);
      } catch (error) {
        console.error("Error fetching similar blogs:", error);
      }
    };

    fetchSimilar();
  }, [category]);

  if (!categoryFeed) {
    return (
      <Center className="h-[80vh] w-screen">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box className="grid  grid-cols-2 md:gap-2 w-[80vw] md:w-full md:grid-cols-1 xl:grid-cols-3">
      <Helmet>
        <meta name="theme-color" content="#4169E1" />
      </Helmet>
      <HStack className="py-5 bg-primary px-2">
        <Link to={"/home"}>
          <FaChevronLeft color="white" />
        </Link>
        <h2 className="text-[18px] text-white">
          <span className="font-bold text-pwhite">{category}</span>
        </h2>
      </HStack>
      {categoryFeed?.length === 0 ? (
        <Center flexDir={"column"} className=" h-[70vh]">
          <h2>No Result for category</h2>
          <p className="ml-1 text-gray-400 italic"> "{category}"</p>
        </Center>
      ) : (
        <>
          {categoryFeed.map((item, key) => (
            <div key={key}>
              {item.feedType === "post" && <Post_Card item={item} />}
              {item.feedType === "blog" && <BigPostBanner blog={item} />}
              {/* Add more conditional rendering for other feed types if needed */}
            </div>
          ))}
        </>
      )}
    </Box>
  );
}

export default CategorySearchResult;
