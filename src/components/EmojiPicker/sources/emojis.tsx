import * as unicodeEmoji from "unicode-emoji";
import React from "react"

export const categories: {
  id: unicodeEmoji.Category;
  name: string;
  icon?: any;
}[] = [
  {
    id: "face-emotion",
    name: "Smileys & People",
    icon: function() => {
      return <></>,
    }
  },
  {
    id: "animals-nature",
    name: "Animals & Nature",
  },
  {
    id: "food-drink",
    name: "Food & Drink",
  },
  {
    id: "activities-events",
    name: "Activity",
  },
  {
    id: "travel-places",
    name: "Travel & Places",
  },

  {
    id: "objects",
    name: "Objects",
  },
  {
    id: "symbols",
    name: "Symbols",
  },
  {
    id: "flags",
    name: "Flags",
  },
];

// export const groupedEmojis = unicodeEmoji.getEmojisGroupedBy("category", {
//   versionAbove: "12.0",
// });

// export const baseEmojis = unicodeEmoji.getEmojis();
