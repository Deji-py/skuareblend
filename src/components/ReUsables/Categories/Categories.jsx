import React, { useEffect, useState } from "react";
import { Box, Center, HStack, Image, VStack } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../../../firebaseConfig";

const CategoryItem = ({ imageUrl, title }) => {
  return (
    <VStack>
      <Center className="bg-gray-200 overflow-hidden w-[100px] h-[70px] rounded-xl">
        <Image
          alt="categoryImg"
          className="w-full h-full overflow-hidden"
          src={imageUrl}
        />
      </Center>
      <p className="text-[12px]"> {title}</p>
    </VStack>
  );
};

function Categories() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      let categoryList = [];
      let result = await getDocs(collection(db, "categories"));
      result.forEach((item) => {
        categoryList.push(item.data());
      });
      setCategories(categoryList);
    };
    fetchCategory();
  }, []);

  return (
    <Box className=" mt-1">
      <HStack className="p-2 w-full  overflow-x-scroll hideScroll">
        {categories?.map((item, key) => (
          <Link to={"/category/" + item.route}>
            <CategoryItem title={item.title} key={key} imageUrl={item.cover} />
          </Link>
        ))}
      </HStack>
    </Box>
  );
}

export default Categories;
