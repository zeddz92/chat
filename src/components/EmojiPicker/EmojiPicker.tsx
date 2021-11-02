import React, { useEffect, useState, FC, useRef } from "react";

import { BaseEmoji } from "unicode-emoji";
import { categories } from "./sources/emojis";
import { useLazyUnicodeEmoji } from "./useLazyUnicodeEmoji";
import { Tabs as CustomTabs } from "./components/Tabs";
import classNames from "classnames";
import { CSSTransition, Transition } from "react-transition-group";

// import emojis from "./sources/emojis";

interface EmojiPickerProps {
  variant?: "fullWidth" | "default";
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ variant = "default" }) => {
  const { baseEmojis, groupedEmojis } = useLazyUnicodeEmoji();
  const ref = useRef<HTMLDivElement>(null);
  const [showInput, setShowInput] = useState(true);

  const [resultEmojis, setResultEmojis] = useState<BaseEmoji[] | undefined>();

  return (
    <div
      className="text-white w-full flex flex-col bg-primary-600"
      style={{ height: 300 }}
    >
      <CustomTabs
        scrollContentRef={ref}
        variant={variant}
        isRendered={!!groupedEmojis}
      />

      <div
        className="overflow-y-auto w-full h-full  relative"
        id="emoji-container"
        ref={ref}
        onWheel={(e) => {
          const inThreshold = e.currentTarget.scrollTop % 15 === 0;
          if (!inThreshold) {
            return;
          }

          if (e.nativeEvent.deltaY > 0) {
            setShowInput(false);
          } else {
            setShowInput(true);
          }
        }}
      >
        {/* {
                "h-0": !showInput,
                "h-auto": showInput,
              } */}
        <span className="block pr-2 sticky top-0 z-20 bg-primary-600 ease-animation">
          <CSSTransition
            in={showInput}
            timeout={{ enter: 1800, exit: 1800 }}
            classNames="slide"
            onExit={() => {
              console.log("on exit");
            }}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <div className="px-3 py-1.5">
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
                          emoji.description
                            .toLocaleLowerCase()
                            .includes(value) || emoji.keywords.includes(value)
                      )
                    );
                  } else {
                    setResultEmojis(undefined);
                  }
                }}
              />
            </div>
          </CSSTransition>
        </span>

        <div className="w-full relative px-3">
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
              <div className="my-4 relative" key={id}>
                <div
                  id={id}
                  className="emoji-category text-primary-200 text-sm mb-2"
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
