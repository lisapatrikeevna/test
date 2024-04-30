import React from "react";
import { ReactionSelectorProps } from "../types/types";
import { Box, Button } from "@mui/material";

const ReactionSelector: React.FC<ReactionSelectorProps> = ({ onReact }) => {
  const emojis = [
    { emoji: "👍", type: "ok" },
    { emoji: "🔥", type: "fire" },
    { emoji: "❤️", type: "heart" },
    { emoji: "😄", type: "smile" },
    { emoji: "😂", type: "lol" },
    { emoji: "🎉", type: "party" },
    { emoji: "😷", type: "poorly" },
  ];

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {emojis.map(({ emoji, type }) => (
        <Button
          key={type}
          onClick={() => onReact(type)}
          sx={{ m: 1 }}
          variant="contained"
          aria-label={`React with ${type}`}
        >
          {emoji}
        </Button>
      ))}
    </Box>
  );
};

export default ReactionSelector;
