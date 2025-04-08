import { Box, Flex, Stack } from "@chakra-ui/layout";

function ProfileCard_placeholder() {
  return (
    <Stack className=" bg-white border-[1.5px] md:px-5 pt-5 w-[500px] md:w-full  px-5 py-2 ">
      <Stack alignItems={"start"}>
        <Flex className="w-full" alignItems={"center"} gap={2}>
          <Box
            w={"60px"}
            borderRadius={100}
            h={"60px"}
            className=" animate-pulse bg-gray-200"
          />
          <Flex className=" items-center justify-between w-full">
            <Stack className="animate-pulse">
              <Box className=" w-[150px] h-4 rounded-full  bg-gray-200" />

              <Box className=" w-[100px]  h-4 rounded-full  bg-gray-200" />
            </Stack>
            <Box className=" w-[30px]  h-[30px] animate-pulse rounded-md  bg-gray-200" />
          </Flex>
        </Flex>
        <Flex
          alignItems={"center"}
          w={"full"}
          my={2}
          justifyContent={"flex-start"}
          gap={5}
        >
          <Stack alignItems={"center"}>
            <Box w={10} h={10} className=" animate-pulse bg-gray-200" />
            <Box className=" w-[60px]  h-4 rounded-md  bg-gray-200" />
          </Stack>
          <Stack alignItems={"center"}>
            <Box w={10} h={10} className=" animate-pulse bg-gray-200" />
            <Box className=" w-[60px]  h-4 rounded-md  bg-gray-200" />
          </Stack>
          <Stack alignItems={"center"}>
            <Box w={10} h={10} className=" animate-pulse bg-gray-200" />
            <Box className=" w-[60px]  h-4 rounded-md  bg-gray-200" />
          </Stack>
        </Flex>
        {/* <Stack className="text-[14px] animate-pulse w-full mt-2">
          <Box className=" w-[100%] h-4 rounded-full  bg-gray-200" />
          <Box className="  h-4 rounded-full  bg-gray-200" />
          <Box className=" w-[60%] h-4 rounded-full  bg-gray-200" />
          <Box className=" w-[200px] h-4 rounded-full  bg-gray-200" />
        </Stack> */}
      </Stack>
    </Stack>
  );
}

export default ProfileCard_placeholder;
