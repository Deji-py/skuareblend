import React from "react";
import { Box, Button, Divider, HStack } from "@chakra-ui/react";

function NotificationHeader({ notificationCount, clearNotification }) {
  return (
    <HStack className="p-2 px-5 w-screen">
      <Box className="w-full ">
        <h1 className="text-[20px] font-bold">Notifications</h1>
        <p className="text-[12px]">
          You have{" "}
          <span className="text-primary">
            {notificationCount} total Notifications
          </span>
        </p>
      </Box>
      {notificationCount > 0 && (
        <Button
          _hover={{ bg: "black" }}
          bg={""}
          onClick={() => clearNotification()}
          color={""}
          className="bg-primary text-white"
          size={"sm"}
        >
          Clear All
        </Button>
      )}
    </HStack>
  );
}

export default NotificationHeader;
