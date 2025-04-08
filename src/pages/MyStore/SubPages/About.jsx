import React from "react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { FaMapMarker, FaMapMarkerAlt } from "react-icons/fa";

import {
  Box,
  Divider,
  HStack,
  List,
  ListIcon,
  ListItem,
  VStack,
} from "@chakra-ui/react";

function About({ detail }) {
  return (
    <VStack className="w-screen h-screen px-2">
      <Box className="bg-white w-full shadow  p-2">
        <h2 className="font-bold">Description</h2>
        <Divider />
        <p className="text-[12px] my-2 text-gray-500">{detail?.description}</p>
      </Box>
      <Box className="bg-white shadow w-full  p-2">
        <HStack className="font-bold">
          <FaMapMarkerAlt color="#1D263B" />
          <p>Location</p>
        </HStack>
        <Divider />
        <p className="text-[12px] mt-2 text-gray-500">{detail?.address}</p>
      </Box>
      <Box className="bg-white shadow w-full  p-2">
        <HStack className="font-bold">
          <FaMapMarkerAlt color="#1D263B" />
          <p>Contact</p>
        </HStack>
        <Divider />
        <List className="text-[12px] mt-2">
          <ListItem>
            <HStack>
              <ListIcon as={PhoneIcon} color="#5C6784" />
              <p>{detail?.phoneNo}</p>
            </HStack>
          </ListItem>

          <ListItem>
            <HStack>
              <ListIcon as={EmailIcon} color="#5C6784" />
              <p>vjstore@gmail.com</p>
            </HStack>
          </ListItem>
        </List>
      </Box>
    </VStack>
  );
}

export default About;
