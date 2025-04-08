import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import {
  Box,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as="div">
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <IconButton
            onClick={onToggle}
            aria-label="Expand menu"
            icon={<ChevronRightIcon />}
            variant="ghost"
            size="sm"
            color={useColorModeValue("gray.600", "gray.200")}
            transform={isOpen ? "rotate(90deg)" : ""}
          />
        )}
      </Box>

      {isOpen && (
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Box
                as="a"
                key={child.label}
                py={1}
                href={child.href}
                _hover={{
                  textDecoration: "none",
                  color: useColorModeValue("gray.800", "white"),
                }}
              >
                {child.label}
              </Box>
            ))}
        </Stack>
      )}
    </Box>
  );
};

export default MobileNavItem;
