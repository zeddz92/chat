import React, { useEffect, useState, FC, useRef, useCallback } from "react";

import { BaseEmoji } from "unicode-emoji";
import { categories } from "./sources/emojis";
import { useLazyUnicodeEmoji } from "./useLazyUnicodeEmoji";
import { Tabs as CustomTabs } from "./components/Tabs";
import classNames from "classnames";
import { CSSTransition, Transition } from "react-transition-group";
import { smoothScroll } from "./utils/smoothScroll";
import { debounce } from "./utils/debounce";
import inView from "element-in-view";
import { writeStorage, useLocalStorage } from "@rehooks/local-storage";
import { EmojiButton } from "./components/EmojiButton";

// import emojis from "./sources/emojis";

interface EmojiPickerProps {
  variant?: "fullWidth" | "default";
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ variant = "default" }) => {
  const { baseEmojis, groupedEmojis } = useLazyUnicodeEmoji();

  const scrollContentRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [showInput, setShowInput] = useState(true);
  const [search, setSearch] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [resultEmojis, setResultEmojis] = useState<BaseEmoji[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (search.trim()) {
      const value = search.toLowerCase();

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
  }, [search]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.currentTarget;
    const isScrolling = e.currentTarget.classList.contains("scrolling");
    if (isScrolling && !search) {
      return;
    }
    const elemCategories = target.querySelectorAll(".emoji-category-bottom");
    elemCategories.forEach((el, index) => {
      if (!isScrolling && !search && inView(el)) {
        setTabIndex(index);
      }
    });
  };

  const handleTabChange = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ) => {
    setSearch("");
    setTabIndex(newValue);
    setShowInput(true);

    scrollContentRef.current?.classList.add("scrolling");
    const categoryElement = categoriesScrollRef.current[newValue]!;
    const block_type = categoryElement.dataset.block as ScrollLogicalPosition;

    setTimeout(() => {
      smoothScroll(categoryElement, { block: block_type }).then(() => {
        scrollContentRef.current?.classList.remove("scrolling");
      });
    }, 0);
  };

  return (
    <div
      className="text-white w-full flex flex-col bg-primary-600"
      style={{ height: 300 }}
    >
      <CustomTabs
        variant={variant}
        value={tabIndex}
        showIndicator={!search && !resultEmojis}
        onChange={handleTabChange}
      />

      <div
        className="overflow-y-scroll w-full h-full relative"
        id="emoji-container"
        ref={scrollContentRef}
        onScroll={handleScroll}
        onWheel={(e) => {
          const inThreshold = e.currentTarget.scrollTop % 2 === 0;
          if (!inThreshold) {
            return;
          }

          if (!search && e.nativeEvent.deltaY > 0) {
            setShowInput(false);
          } else {
            setShowInput(true);
          }
        }}
      >
        <span className="block sticky top-0 z-20">
          <CSSTransition
            in={showInput}
            timeout={400}
            classNames="slide"
            unmountOnExit={true}
          >
            <div id="search-input" className="pr-2 bg-primary-600 px-3 py-1.5">
              <input
                value={search}
                type="search"
                className="w-full rounded px-3 py-2 bg-primary-400 outline-none"
                placeholder="Search Emoji"
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
          </CSSTransition>
        </span>

        <div className="w-full px-3 my-2 relative">
          {resultEmojis && (
            <div className="grid grid-cols-flow gap-y-3 pr-4">
              {resultEmojis.map((data) => (
                <EmojiButton key={data.emoji} data={data} />
              ))}
            </div>
          )}

          {groupedEmojis &&
            categories.map(({ id, name }, index) => (
              <div
                key={id}
                className={classNames("mb-6 relative", {
                  hidden: !!resultEmojis,
                })}
              >
                <div
                  // id={id}
                  className="emoji-category text-primary-200 text-sm mb-2"
                >
                  {name}
                </div>
                <span
                  ref={(el) => {
                    categoriesScrollRef.current[index] = el;
                  }}
                  className="absolute -top-12.5"
                ></span>
                <div className="grid grid-cols-flow gap-y-3 pr-4">
                  {groupedEmojis[id].map((data) => (
                    <EmojiButton key={data.emoji} data={data} />
                  ))}
                </div>
                <span
                  data-category={id}
                  className="emoji-category-bottom absolute top-60"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
