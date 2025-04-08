import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";

function Paginator({ currentPage, totalPages, onNextPage, onPrevPage }) {
  return (
    <HStack spacing={2} align="center">
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous Page"
        onClick={onPrevPage}
        disabled={currentPage === 1}
      />
      <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next Page"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      />
    </HStack>
  );
}

export default Paginator;
