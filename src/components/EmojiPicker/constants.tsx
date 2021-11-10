import { Category, Version } from "unicode-emoji";
import { ActivityIcon } from "./icons/ActivityIcon";
import { FlagsIcon } from "./icons/FlagsIcon";
import { FoodIcon } from "./icons/FoodIcon";
import { NatureIcon } from "./icons/NatureIcon";
import { ObjectsIcon } from "./icons/ObjectsIcon";
import { PeopleIcon } from "./icons/PeopleIcon";
import { RecentIcon } from "./icons/RecentIcon";
import { SymbolsIcon } from "./icons/SymbolsIcon";
import { TravelIcon } from "./icons/TravelIcon";

export const EMOJIS_VERSION: Version = "12.0";
export const LOCAL_STORAGE_RECENT = "emoji-picker-recent";

export const CATEGORIES = [
  {
    id: "face-emotion",
    name: "Smileys & People",
    icon: <PeopleIcon />,
  },
  {
    id: "animals-nature",
    name: "Animals & Nature",
    icon: <NatureIcon />,
  },
  {
    id: "food-drink",
    name: "Food & Drink",
    icon: <FoodIcon />,
  },
  {
    id: "activities-events",
    name: "Activity",
    icon: <ActivityIcon />,
  },
  {
    id: "travel-places",
    name: "Travel & Places",
    icon: <TravelIcon />,
  },

  {
    id: "objects",
    name: "Objects",
    icon: <ObjectsIcon />,
  },
  {
    id: "symbols",
    name: "Symbols",
    icon: <SymbolsIcon />,
  },
  {
    id: "flags",
    name: "Flags",
    icon: <FlagsIcon />,
  },
];
