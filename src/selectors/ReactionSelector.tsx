import { FC } from "react";
import { ReactionSelectorProps } from "../types/types";
import { Box, Button } from "@mui/material";

// ReactionSelector component to render a list of reaction buttons
const ReactionSelector: FC<ReactionSelectorProps> = ({ onReact }) => {
  // List of emojis with their corresponding reaction types
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
    // Box container to arrange the buttons in a flexbox
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {emojis.map(({ emoji, type }) => (
        // Button component for each emoji reaction
        <Button
          key={type}
          onClick={() => onReact(type)} // Call the onReact function with the reaction type
          sx={{ m: 1 }} // Apply margin around the button
          variant="contained" // Use the contained variant for the button
          aria-label={`React with ${type}`} // Accessibility label for the button
        >
          {emoji}
        </Button>
      ))}
    </Box>
  );
};

export default ReactionSelector;
