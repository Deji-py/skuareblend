import React from "react";
import { Button, HStack } from "@chakra-ui/react";

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from "react-icons/io";

function Socials({ isUser, userData }) {
  return (
    <>
      {isUser && (
        <HStack className="mt-2 ">
          {userData?.whatsapp && (
            <a target="_blank" href={"http://" + userData?.whatsapp}>
              <Button
                bg=""
                className="bg-[#DCF9E7] border-[1.5px] border-[#1EAE55]"
                size={"xs"}
                py={3}
              >
                <IoLogoWhatsapp color="#25D366" size={18} />
              </Button>
            </a>
          )}
          {userData?.instagram && (
            <a target="_blank" href={userData?.instagram}>
              <Button
                size={"xs"}
                className="bg-[#F4F5F6] border-[1.5px] border-[#9099A2]"
                bg=""
                py={3}
              >
                <IoLogoInstagram color="black" size={18} />
              </Button>
            </a>
          )}
          {userData?.facebook && (
            <a target="_blank" href={userData?.facebook}>
              <Button
                bg=""
                size={"xs"}
                className="bg-[#DDEAF8] border-[1.5px] border-[#5299E0]"
                py={3}
              >
                <IoLogoFacebook color="#2364AA" size={18} />
              </Button>
            </a>
          )}
          {userData?.youtube && (
            <a target="_blank" href={userData?.youtube}>
              <Button
                bg=""
                size={"xs"}
                className="bg-[#FFEBEB] border-[1.5px] border-[#FF7070]"
                py={3}
              >
                <IoLogoYoutube color="#FF0000" size={18} />
              </Button>
            </a>
          )}
        </HStack>
      )}
    </>
  );
}

export default Socials;
