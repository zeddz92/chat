import MoodIcon from "@mui/icons-material/Mood";
import PetsIcon from "@mui/icons-material/Pets";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";

import React from "react";

interface Props {}

export const categories = (props: Props) => {
  return [
    {
      id: "face-emotion",
      name: "Smileys & People",
      icon: () => <MoodIcon />,
    },
  ];
};
