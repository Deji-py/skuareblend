import ProfileStatCount from "../../Profile_Page/Components/ProfileStatCount";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { BsCheckAll, BsStarFill } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import { MdCircle, MdEdit, MdVerified } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { db } from "../../../../firebaseConfig";

import {
  Avatar,
  Box,
  Button,
  Center,
  Image,
  Spinner,
  VStack,
} from "@chakra-ui/react";

function StoreCard({ isReview, id }) {
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const shopRef = doc(db, "stores", id);
    const unsubscribe = onSnapshot(shopRef, (doc) => {
      setDetail(doc.data());
    });
    return () => unsubscribe();
  }, [id]);

  if (!detail) {
    return (
      <Center className="h-[250px]">
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Center alignItems="start" className="relative w-full h-[250px]">
        {!isReview && (
          <>
            <Link to="/profile">
              <FaChevronLeft
                color="white"
                size={20}
                className="absolute z-[1000] left-2 top-5"
              />
            </Link>
          </>
        )}
        <Center className="bg-black relative w-full h-full">
          <Image
            alt="storeCardImg"
            src={detail?.coverUrl}
            className="w-full h-full   object-cover opacity-30"
          />
          <VStack className="text-white absolute">
            <Avatar
              className="border-2 border-white"
              src={detail?.logoUrl}
              size="lg"
            />
            <Box className="text-center">
              <h2 className="font-bold text-[18px]">
                {detail?.storeName?.slice(0, 40) + "..."}
              </h2>
              <p className="text-[14px]">{detail?.oneLiner?.slice(0, 30)}</p>
            </Box>
          </VStack>
        </Center>

        <Center
          flexDir="column"
          gap={2}
          className="w-[90%] bg-white bottom-[-50px] absolute shadow-lg shadow-gray-200 rounded-2xl pt-5 pb-2"
        >
          <Center justifyContent="space-evenly" className="w-[100%]">
            <ProfileStatCount
              invert={true}
              title={
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  width="24px"
                  height="24px"
                  color="black"
                >
                  <BsCheckAll size={20} />
                </Box>
              }
              count={0}
            />
            <ProfileStatCount
              invert={true}
              title={
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  width="24px"
                  height="24px"
                >
                  <p className="text-[14px]">Products</p>
                </Box>
              }
              count={detail?.products?.length || 0}
            />
            <ProfileStatCount
              invert={true}
              title={
                <Box
                  bgColor="#FEF8EB"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  width="24px"
                  height="24px"
                  color="#F7B538"
                >
                  <BsStarFill size={16} />
                </Box>
              }
              count={detail?.reviews?.length || 0}
            />
          </Center>
        </Center>
      </Center>
    </>
  );
}

export default StoreCard;
