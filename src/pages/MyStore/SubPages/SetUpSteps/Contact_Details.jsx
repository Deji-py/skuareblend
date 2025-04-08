import React from "react";
import TextInput from "../../../../components/TextInput";
import { PhoneIcon } from "@chakra-ui/icons";
import { Box, Textarea, VStack } from "@chakra-ui/react";
import { FaAddressCard } from "react-icons/fa";
import { MdAddLocation } from "react-icons/md";

function Contact_Details({
  description,
  setDescription,
  phoneNo,
  setPhoneNo,
  address,
  setAddress,
}) {
  return (
    <VStack className="w-full px-5">
      <Box className="w-full">
        <label className="text-gray-600 text-[14px] font-bold">
          Description
        </label>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          bg={""}
          value={description}
          w={"full"}
          h={"150px"}
          rounded={"xl"}
          border={""}
          className="w-full border-[1.5px] bg-gray-100"
          placeholder="Short discription about your store"
        />
        <TextInput
          setState={setPhoneNo}
          state={phoneNo}
          label={"Phone Number"}
          type="number"
          icon={<PhoneIcon color={"#596D88"} />}
          placeholder={"+234-907..."}
        />
        <TextInput
          setState={setAddress}
          state={address}
          label={"Address"}
          type="text"
          icon={<MdAddLocation color={"#596D88"} size={18} />}
          placeholder={"..."}
        />
      </Box>
    </VStack>
  );
}

export default Contact_Details;
