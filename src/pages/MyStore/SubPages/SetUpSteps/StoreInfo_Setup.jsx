import TextInput from "../../../../components/TextInput";
import { Box, Button, Center, Image } from "@chakra-ui/react";
import { useRef } from "react";
import { IoMdInformationCircle } from "react-icons/io";

function StoreInfo_Setup({
  logo,
  setLogo,
  cover,
  setCover,
  storeName,
  setStoreName,
  oneLiner,
  setOneLiner,
}) {
  const logoRef = useRef();
  const coverRef = useRef();

  return (
    <>
      <Center className="pl-5 my-2 gap-5">
        <Box className="w-20 h-20 rounded-md overflow-hidden bg-gray-300">
          <Box className="w-20 h-20 rounded-md overflow-hidden bg-gray-300">
            <Image
              alt="logo_store"
              src={
                !logo
                  ? "https://img.freepik.com/free-photo/colorful-empty-shopping-bags-purple-background_23-2148101561.jpg?w=740&t=st=1696578747~exp=1696579347~hmac=c77dc4b4c6f72e3ee876e8445aaa10c1228aa09186ac8f917f6726d13a4b6f7d"
                  : URL.createObjectURL(logo[0])
              }
              className="w-full h-full object-cover"
            />
          </Box>
        </Box>
        <Box>
          <p className="text-gray-500 text-sm">Update Store Logo</p>
          <Button
            onClick={() => {
              logoRef.current.click();
            }}
            bg={""}
            size={"sm"}
            className=" border-[1.5px] mt-2"
            rounded={"full"}
          >
            Change Logo
          </Button>
        </Box>
      </Center>
      <Center className="pl-5  my-2 gap-5">
        <Box className="w-20 h-20 rounded-md overflow-hidden bg-gray-300">
          <Image
            alt="store_cover"
            src={
              !cover
                ? "https://img.freepik.com/free-photo/colorful-empty-shopping-bags-purple-background_23-2148101561.jpg?w=740&t=st=1696578747~exp=1696579347~hmac=c77dc4b4c6f72e3ee876e8445aaa10c1228aa09186ac8f917f6726d13a4b6f7d"
                : URL.createObjectURL(cover[0])
            }
            className="w-full h-full object-cover"
          />
        </Box>
        <Box>
          <p className="text-gray-500 text-sm">Update Store Cover</p>
          <Button
            bg={""}
            onClick={() => {
              coverRef.current.click();
            }}
            size={"sm"}
            className=" border-[1.5px] mt-2"
            rounded={"full"}
          >
            Change Cover Image
          </Button>
        </Box>
      </Center>

      <Box className="w-full px-5">
        <TextInput
          setState={setStoreName}
          state={storeName}
          icon={<IoMdInformationCircle color="#4F5D75" />}
          label={"Name of Store"}
          placeholder={"Name of Store"}
        />
        <TextInput
          state={oneLiner}
          setState={setOneLiner}
          icon={<IoMdInformationCircle color="#4F5D75" />}
          label={"One Liner"}
          placeholder={"E.g I sell...."}
        />
      </Box>
      <input
        type="file"
        accept="image/*"
        ref={logoRef}
        onChange={(ev) => setLogo(ev.target.files)}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        ref={coverRef}
        onChange={(ev) => setCover(ev.target.files)}
        className="hidden "
      />
      <div className="pb-[100px]" />
    </>
  );
}

export default StoreInfo_Setup;
