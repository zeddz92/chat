import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useEffect, useState } from "react";
import MoodIcon from "@mui/icons-material/Mood";
import PetsIcon from "@mui/icons-material/Pets";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import { BaseEmoji } from "unicode-emoji";
import { categories } from "./sources/emojis";
import { useLazyUnicodeEmoji } from "./useLazyUnicodeEmoji";
import { Tabs as CustomTabs } from "./components/Tabs";

// import emojis from "./sources/emojis";

interface Props {}

export const EmojiPicker = (props: Props) => {
  const { baseEmojis, groupedEmojis } = useLazyUnicodeEmoji();

  const [resultEmojis, setResultEmojis] = useState<BaseEmoji[] | undefined>();

  return (
    <div
      className="text-white w-full  flex flex-col bg-primary-600"
      style={{ height: 300 }}
    >
      <CustomTabs isRendered={!!groupedEmojis} />
      {/* <Tabs
        value={1}
        textColor="inherit"
        aria-label="icon tabs example"
        className="text-white mb-2"
      >
        <Tab icon={<MoodIcon />} aria-label="phone" />
        <Tab icon={<PetsIcon />} aria-label="favorite" />
        <Tab icon={<FreeBreakfastIcon />} aria-label="person" />
        <Tab icon={<SportsSoccerIcon />} aria-label="person" />
        <Tab icon={<DirectionsCarIcon />} aria-label="person" />
        <Tab icon={<EmojiObjectsOutlinedIcon />} aria-label="person" />
        <Tab icon={<TagOutlinedIcon />} aria-label="person" />
        <Tab icon={<OutlinedFlagTwoToneIcon />} aria-label="person" />
      </Tabs> */}
      <div className="overflow-y-auto w-full h-full px-3" id="emoji-container">
        <div className="pr-4">
          <input
            type="search"
            className="w-full rounded px-3 py-2 bg-primary-400 outline-none"
            placeholder="Search Emoji"
            onChange={(e) => {
              const value = e.currentTarget.value.toLowerCase();
              if (value) {
                setResultEmojis(
                  baseEmojis?.filter(
                    (emoji) =>
                      emoji.description.toLocaleLowerCase().includes(value) ||
                      emoji.keywords.includes(value)
                  )
                );
              } else {
                setResultEmojis(undefined);
              }
            }}
          />
        </div>
        <div className="w-full relative">
          {resultEmojis && (
            <div className="grid grid-cols-flow gap-y-3 my-4 pr-4">
              {resultEmojis.map(({ emoji }) => (
                <button key={emoji} className="text-3xl">
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* {groupedEmojis && (
            <div className="grid grid-cols-flow gap-y-3 pr-4">
              {groupedEmojis &&
                groupedEmojis["face-emotion"].map((emoji) => (
                  <button className="text-3xl">{emoji.emoji}</button>
                ))}
            </div>
          )} */}

          {!resultEmojis &&
            groupedEmojis &&
            categories.map(({ id, name }) => (
              <div className="my-4 relative h-full" key={id}>
                <div
                  id={id}
                  className="emoji-category text-primary-200 text-sm mb-1.5"
                >
                  {name}
                </div>
                <div className="grid grid-cols-flow gap-y-3 pr-4">
                  {groupedEmojis[id].map(({ emoji }) => (
                    <button key={emoji} className="text-3xl">
                      {emoji}
                    </button>
                  ))}
                </div>
                <span
                  data-category={id}
                  className="emoji-category-bottom absolute bottom-32 top-32 h-full"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
