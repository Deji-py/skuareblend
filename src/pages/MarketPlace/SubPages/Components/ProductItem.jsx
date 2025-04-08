import ProductViewer from "../../../../components/ProductViewer";
import React from "react";
import { Avatar, Box, Button, Center, Image } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../../../../firebaseConfig";

const ProductItem = React.memo(({ product }) => {
  const randomHeight = 250;

  // Generate a random height between 200 and 400 pixels

  const cardStyle = {
    height: `${randomHeight}px`,
  };
  const [storeDetail, setStoreDetail] = useState(null);
  const [viewProduct, setViewProduct] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "stores", product?.storeId);
    getDoc(docRef).then((doc) => {
      setStoreDetail(doc.data());
    });
  }, []);
  return (
    <div
      onClick={() => setViewProduct(true)}
      className="grid-itemb shadow-xl  text-white w-full overflow-hidden relative rounded-md bg-gray-100    flex flex-col justify-start items-start"
      style={cardStyle}
    >
      <ProductViewer
        isPreview={true}
        onClose={() => setViewProduct(false)}
        isOpen={viewProduct}
        product={product}
      />

      <Center
        justifyContent={"start"}
        p={2}
        className=" gap-2 absolute w-full text-[12px] "
      >
        <Avatar
          className="border-2 border-white"
          size={"xs"}
          src={storeDetail?.logoUrl}
        />
        <Box>
          <p>{storeDetail?.storeName}</p>
        </Box>
      </Center>
      <Image
        alt="productItem"
        className="w-full h-full object-cover"
        src={product?.productImages[0]}
      />
      <Center
        justifyContent={"start"}
        alignItems={"start"}
        flexDir={"column"}
        p={2}
        className="  gap-2 bg-white text-black reverseShadow absolute w-full bottom-0  text-[12px] "
      >
        <h3 className="text-[14px]">
          {product?.productName.length > 20
            ? product?.productName.slice(0, 20) + "..."
            : product?.productName}
        </h3>
        <Center justifyContent={"space-between"} className="w-full">
          <p className=" font-bold text-[14px]">
            {"₦ " + product?.productPrice}
          </p>
          <Button
            _hover={{ bgColor: "white" }}
            bg={""}
            color={""}
            className=" text-primary border-[1.5px] border-primary"
            rounded={"full"}
            size={"xs"}
          >
            <p>View</p>
          </Button>
        </Center>
      </Center>
    </div>
  );
});

export default ProductItem;
