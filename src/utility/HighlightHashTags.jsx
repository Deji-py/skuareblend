import React from "react";
import { Box } from "@chakra-ui/react";

function HighlightHashTags({ text }) {
  // Regular expression to match words starting with #
  const hashtagRegex = /#(\w+)/g;

  // Split the text into an array of words
  const words = text.split(" ");

  // Map over the words and add a span with a class for hashtags
  const highlightedText = words.map((word, index) => {
    if (word.match(hashtagRegex)) {
      // If the word starts with #, apply a class for styling and add spaces
      return (
        <span key={index}>
          {" "}
          <span className="blue-tag">{word}</span>{" "}
        </span>
      );
    } else {
      // Otherwise, display the word as is with spaces
      return <span key={index}> {word} </span>;
    }
  });

  return (
    <Box className="text-[14px]">
      <p>{highlightedText}</p>
    </Box>
  );
}

export default HighlightHashTags;
