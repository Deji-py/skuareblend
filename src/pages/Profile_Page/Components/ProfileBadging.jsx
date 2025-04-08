import React from "react";
import { Box, Image } from "@chakra-ui/react";

function ProfileBadging({ icon }) {
  return (
    <Box>
      <Image alt="badge" src={icon} className="w-[45px]" />
    </Box>
  );
}
export default ProfileBadging;
