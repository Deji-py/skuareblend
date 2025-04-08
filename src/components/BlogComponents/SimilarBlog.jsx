import React, { useEffect, useState } from "react";
import { Box, Center, Grid, GridItem, HStack, Image } from "@chakra-ui/react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { BsHeartFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";

function SimilarBlog({ category, postId }) {
  const [similarBlogs, setSimilarBlogs] = useState(null);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const docRef = collection(db, "feed");
        const q = query(
          docRef,
          where("feedType", "==", "blog"),
          where("category", "==", category)
        );

        const result = await getDocs(q);
        const similarList = [];

        result.docs.forEach((doc) => {
          const data = doc.data();
          if (data.id !== postId) {
            similarList.push(data);
          }
        });

        setSimilarBlogs(similarList);
      } catch (error) {
        console.error("Error fetching similar blogs:", error);
      }
    };

    fetchSimilar();
  }, [category, postId]); // Include category and postId in the dependency array if they can change

  return (
    <Center flexDir={"column"} alignItems={"start"}>
      {similarBlogs && similarBlogs?.length > 0 && (
        <>
          <p className="font-bold text-[1.1rem] mb-2">Similar Blogs</p>
          <Grid
            gap={2}
            className="w-full"
            gridTemplateColumns={"repeat(2, 1fr)"}
          >
            {similarBlogs?.map((item) => (
              <Link to={"/blog/" + item?.id}>
                <GridItem className="w-full border-[1.5px] shadow-gray-100 shadow-xl rounded-xl ">
                  <Box className="w-full overflow-hidden rounded-t-xl h-[100px]">
                    <Image
                      alt="cover"
                      className="w-full h-full object-cover"
                      src={item?.cover}
                    />
                  </Box>
                  <Box className="mt-2 p-2">
                    <p className="text-[12px]">
                      {item?.title.length > 50
                        ? item?.title.slice(0, 50) + "..."
                        : item?.title}
                    </p>
                    <HStack mt={2}>
                      <Center gap={1} className="text-[10px] text-red-400">
                        <BsHeartFill />
                        <p>{item?.likes?.length}</p>
                      </Center>
                      <Center gap={1} className="text-[10px] text-green-600">
                        <FaComments />
                        <p>{item?.comments?.length}</p>
                      </Center>
                    </HStack>
                  </Box>
                </GridItem>
              </Link>
            ))}
          </Grid>
        </>
      )}
    </Center>
  );
}

export default SimilarBlog;
