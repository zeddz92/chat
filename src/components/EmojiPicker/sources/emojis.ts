import * as unicodeEmoji from "unicode-emoji";

export const categories: {
  id: unicodeEmoji.Category;
  name: string;
}[] = [
  {
    id: "face-emotion",
    name: "Smileys & People",
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
