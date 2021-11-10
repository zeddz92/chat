import classNames from "classnames";
import inView from "element-in-view";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { BaseEmoji } from "unicode-emoji";

import { EmojiButton } from "./components/EmojiButton";
import { categories, Tabs } from "./components/Tabs";
import { LOCAL_STORAGE_RECENT } from "./constants";
import {
  LocalStorageContext,
  LocalStorageProvider,
} from "./contexts/LocalStorageContext";

import { useLazyUnicodeEmoji } from "./useLazyUnicodeEmoji";
import { smoothScroll } from "./utils/smoothScroll";
import { useLocalStorage } from "./utils/useLocalStorage";
import { Popover, usePopover } from "react-tiny-popover";

interface EmojiPickerProps {
  variant?: "fullWidth" | "default";
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ variant = "default" }) => {
  const { baseEmojis, groupedEmojis } = useLazyUnicodeEmoji();

  const scrollContentRef = useRef<HTMLDivElement>(null);
  const emojiVariationsRef = useRef<HTMLDivElement>(null);
  const resultsEmojiRef = useRef<HTMLDivElement>(null);

  const categoriesScrollRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [recentEmojis, setRecentEmojis] = useLocalStorage<BaseEmoji[]>(
    LOCAL_STORAGE_RECENT,
    []
  );

  const [showEmojiVariations, setShowEmojiVariations] = useState(false);

  const [emojiVariations, setEmojiVariations] = useState<BaseEmoji | undefined>(
    undefined
  );
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

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
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
    },
    []
  );

  const handleTabChange = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ) => {
    setSearch("");
    setTabIndex(newValue);
    setTimeout(() => {
      setShowInput(true);

      scrollContentRef.current?.classList.add("scrolling");
      const categoryElement = categoriesScrollRef.current[newValue]!;
      const block_type = categoryElement.dataset.block as ScrollLogicalPosition;

      smoothScroll(categoryElement, { block: block_type }).then(() => {
        scrollContentRef.current?.classList.remove("scrolling");
      });
    }, 0);
  };

  // const [positionPopover, popoverRef] = usePopover({
  //   childRef: undefined,
  //   // containerClassName: "variants-popover",
  //   // parentElement: resultsEmojiRef.current,
  //   contentLocation: { top: 0, left: 0 },
  //   positions: ["top", "left"],
  //   align: "start",
  //   padding: 10,
  //   boundaryInset: 5,
  //   // boundaryElement,
  //   reposition: true,
  //   onPositionPopover: () => {},
  // });

  const handleEmojiClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: BaseEmoji,
    category?: string
  ) => {
    if (category !== "recent") {
      if (data.variations && !emojiVariations) {
        const clientRects = e.currentTarget.getClientRects();
        const baseEmojiVariationsElement = emojiVariationsRef.current!;
        const resultsElement =
          scrollContentRef.current!.querySelector(".results")!;

        const baseEmoji = e.currentTarget!;

        // const minTargetCenteredX = baseEmojiVariationsElement.offsetWidth / 2;
        // const maxTargetCenteredX =
        //   resultsElement.clientWidth -
        //   baseEmojiVariationsElement.offsetWidth / 2;

        // const currentCenteredX =
        //   baseEmoji.offsetLeft +
        //   baseEmojiVariationsElement.offsetLeft +
        //   baseEmojiVariationsElement.offsetWidth / 2;
        // let targetCenteredX = baseEmoji.offsetLeft + baseEmoji.offsetWidth / 2;

        // // Left overflow
        // if (targetCenteredX < minTargetCenteredX) {
        //   targetCenteredX = minTargetCenteredX;
        // }
        // // Right overflow
        // else if (targetCenteredX > maxTargetCenteredX) {
        //   targetCenteredX = maxTargetCenteredX;
        // }

        // emojiVariationsRef.current?.style.setProperty(
        //   "transform",
        //   `translateX(${targetCenteredX - currentCenteredX}px)`
        // );

        // emojiVariationsRef.current?.style.setProperty(
        //   "left",
        //   `${targetCenteredX - currentCenteredX}px`
        // );

        setTimeout(() => {
          console.log(emojiVariationsRef.current?.firstChild);
          emojiVariationsRef.current?.style.setProperty(
            "top",
            `${clientRects.item(0)!.top - 130}px`
          );
          console.log(baseEmojiVariationsElement.firstChild!.offsetWidth);

          if (
            baseEmoji.offsetLeft +
              baseEmojiVariationsElement.firstChild!.offsetWidth <=
            resultsElement.clientWidth
          ) {
            emojiVariationsRef.current?.style.setProperty(
              "left",
              `${baseEmoji.offsetLeft - 20}px`
            );
          } else {
            // alert("df");
            // emojiVariationsRef.current?.classList.remove("variations-left");
            // emojiVariationsRef.current?.classList.add("variations-right");
            emojiVariationsRef.current?.style.setProperty(
              "left",
              `${
                baseEmoji.offsetLeft -
                baseEmojiVariationsElement.firstChild!.offsetWidth +
                20
              }px`
            );
          }
        }, 0);

        // console.log({
        //   minTargetCenteredX,
        //   maxTargetCenteredX,
        //   currentCenteredX,
        //   targetCenteredX,
        // });

        // const clientRects = e.currentTarget.getClientRects();

        // const parentWidth = e.currentTarget.parentElement!.offsetWidth;
        // const { offsetLeft, offsetWidth } = e.currentTarget;

        // emojiVariationsRef.current?.style.setProperty(
        //   "top",
        //   `${clientRects.item(0)!.top - 130}px`
        // );

        // // console.log({
        // //   width: emojiVariationsRef.current?.scrollWidth,
        // //   offsetLeft,
        // //   offsetWidth,
        // //   parentWidth,
        // // });

        // if (offsetLeft + 185.062 < parentWidth) {
        //   // emojiVariationsRef.current?.classList.add("variations-left");
        //   // emojiVariationsRef.current?.classList.remove("variations-right");
        //   emojiVariationsRef.current?.style.setProperty(
        //     "left",
        //     `${offsetLeft + 5}px`
        //   );
        // } else {
        //   // emojiVariationsRef.current?.classList.remove("variations-left");
        //   // emojiVariationsRef.current?.classList.add("variations-right");
        //   emojiVariationsRef.current?.style.setProperty(
        //     "left",
        //     `${offsetLeft - 135}px`
        //   );
        // }

        setShowEmojiVariations(true);
        setEmojiVariations(data);

        return;
      }
      // setRecentEmojis(
      //   LOCAL_STORAGE_RECENT,
      //   [...recentEmojis, data]
      //     //Remove duplicate
      //     .filter((value, index, self) => self.indexOf(value) === index)
      //   // .sort((a, b) => (a.emoji > b.emoji ? -1 : 1))
      // );
    }
  };

  return (
    <div
      className="text-white w-full h-full flex flex-col bg-primary-600"
      // style={{ height: 300 }}
    >
      <Tabs
        variant={variant}
        value={tabIndex}
        showRecentTab={recentEmojis.length > 0}
        showIndicator={!search && !resultEmojis}
        onChange={handleTabChange}
      />

      <div
        onClick={() => {
          if (showEmojiVariations) {
            setShowEmojiVariations(false);
          }
        }}
        className="overflow-hidden w-full h-full relative"
        id="emoji-container"
      >
        <span className="absolute left-0 right-3 pr-3 top-0 z-20">
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

        <div
          ref={emojiVariationsRef}
          className={"absolute left-8 z-20 shadow-md"}
        >
          <CSSTransition
            in={showEmojiVariations}
            timeout={400}
            classNames="spring"
            unmountOnExit={true}
            onExited={() => {
              setEmojiVariations(undefined);
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="variations py-2 px-3.5 rounded bg-primary-400 text-2xl w-min relative select-none"
            >
              <ul className="flex items-center">
                <li className="border-r border-primary-200 pr-3 mr-3 cursor-pointer">
                  {emojiVariations?.emoji}
                </li>
                {emojiVariations?.variations?.map((emoji) => (
                  <li
                    key={`variation-${emoji.emoji}`}
                    className="cursor-pointer"
                    onClick={() => {
                      setShowEmojiVariations(false);
                    }}
                  >
                    {emoji.emoji}
                  </li>
                ))}
              </ul>
              <div className="arrow" />
            </div>
          </CSSTransition>
        </div>

        <div className="w-full px-3 relative h-full select-none">
          {resultEmojis && (
            <div className="emoji-list">
              <div className="grid grid-cols-flow gap-y-2.5 pr-4">
                {resultEmojis.map((data) => (
                  <EmojiButton
                    key={`search-${data.emoji}`}
                    data={data}
                    onClick={(e) => handleEmojiClick(e, data)}
                  />
                ))}
              </div>
            </div>
          )}

          <div
            className={classNames("emoji-list", {
              hidden: !!resultEmojis,
            })}
            ref={scrollContentRef}
            onScroll={handleScroll}
            onWheel={(e) => {
              const inThreshold = e.currentTarget.scrollTop % 2 === 0;
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
            {groupedEmojis &&
              categories.map(
                ({ id, name }, index) =>
                  groupedEmojis[id] && (
                    <div key={id} className="mb-6 relative">
                      <div className="emoji-category text-primary-200 text-sm mb-2">
                        {name}
                      </div>
                      <span
                        ref={(el) => {
                          categoriesScrollRef.current[index] = el;
                        }}
                        // Match top with parent padding-top
                        className="absolute -top-15"
                      ></span>
                      <div
                        ref={resultsEmojiRef}
                        className="grid grid-cols-flow gap-y-2.5 pr-4 results"
                      >
                        {groupedEmojis[id]!.map((data) => (
                          <EmojiButton
                            key={`${name}-${data.emoji}-${index}`}
                            data={data}
                            onClick={(e) => handleEmojiClick(e, data, id)}
                          />
                        ))}
                      </div>
                      <span
                        data-category={id}
                        className="emoji-category-bottom absolute top-60"
                      />
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
