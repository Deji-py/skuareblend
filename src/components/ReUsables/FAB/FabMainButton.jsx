import FabSubButtons from "./FabSubButtons";
import React, { useState } from "react";
import { Box, Button, Center, IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { BsX } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

function FabMainButton({
  onClick,
  subButtons,
  icon = <MdAdd />,
  bottom = "70px",
  label,
  bgcolor = "#4169E1",
  color = "white",
}) {
  const [showSubButtons, setShowSubButtons] = useState(false);
  if (subButtons) {
    const staggerVariants = {
      open: {
        transition: { staggerChildren: 0.1 },
      },
      closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
      },
    };

    const itemVariants = {
      open: {
        opacity: 1,
        scale: 1,
      },
      closed: {
        opacity: 0,
        scale: 0,
      },
    };

    return (
      <>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          pos={"fixed"}
          right={"20px"}
          bottom={bottom}
        >
          <AnimatePresence>
            {showSubButtons && (
              <motion.div
                className=" fixed bottom-[120px] right-[20px]"
                initial="closed"
                animate={showSubButtons ? "open" : "closed"}
                variants={staggerVariants}
              >
                {subButtons.map((item, key) => (
                  <motion.div key={key} variants={itemVariants}>
                    <FabSubButtons
                      color={item.color}
                      label={item?.title}
                      textColor={item.textColor}
                      icon={item.icon}
                      route={item.route}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <IconButton
            onClick={() => setShowSubButtons(!showSubButtons)}
            size={"lg"}
            shadow={"md"}
            bg={bgcolor}
            _hover={{ bg: "#246EE9" }}
            color={color}
            icon={showSubButtons ? <BsX size={20} /> : <MdAdd size={20} />}
          />
        </Box>
      </>
    );
  }
  if (label) {
    return (
      <Button
        pos={"fixed"}
        color={color}
        onClick={() => onClick()}
        height={"50px"}
        size={"lg"}
        rounded={"2xl"}
        bg={bgcolor}
        bottom={bottom}
        shadow={"xl"}
        gap={2}
        zIndex={1000}
        right={5}
        _hover={{ bg: "black" }}
      >
        <p className="text-[15px]">{label}</p>
        {icon}
      </Button>
    );
  }

  return (
    <IconButton
      bg={""}
      onClick={() => onClick()}
      size={"lg"}
      shadow={"xl"}
      _hover={{ bg: "black" }}
      color={"white"}
      icon={icon}
      pos={"fixed"}
      right={5}
      rounded={"2xl"}
      height={"55px"}
      width={"55px"}
      className="bg-primary"
      bottom={bottom}
    />
  );
}

export default FabMainButton;
