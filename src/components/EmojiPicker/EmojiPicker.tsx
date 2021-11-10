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
import { useLazyUnicodeEmoji } from "./useLazyUnicodeEmoji";
import { smoothScroll } from "./utils/smoothScroll";
import { useLocalStorage } from "./utils/useLocalStorage";

interface EmojiPickerProps {
  mode?: "dark" | "light";
  variant?: "fullWidth" | "default";
  onEmojiClick?(emoji: string): void;
}

export const EmojiPicker: FC<EmojiPickerProps> = ({
  variant = "default",
  mode = "light",
  onEmojiClick,
}) => {
  const { baseEmojis, groupedEmojis } = useLazyUnicodeEmoji();

  const scrollContentRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [recentEmojis, setRecentEmojis] = useLocalStorage<BaseEmoji[]>(
    LOCAL_STORAGE_RECENT,
    []
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

      smoothScroll(categoryElement, scrollContentRef.current!).then(() => {
        scrollContentRef.current?.classList.remove("scrolling");
      });
    }, 0);
  };

  const handleEmojiClick = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: BaseEmoji,
    category?: string
  ) => {
    if (category !== "recent") {
      if (!recentEmojis.some(({ emoji }) => emoji === data.emoji)) {
        setRecentEmojis(
          LOCAL_STORAGE_RECENT,
          [...recentEmojis, { ...data, keywords: [], variations: [] }].sort(
            (a, b) => (a.emoji > b.emoji ? -1 : 1)
          )
        );
      }
    }
    onEmojiClick && onEmojiClick(data.emoji);
  };

  return (
    <div className={classNames("w-full h-full flex flex-col", mode)}>
      <div className="dark:text-white w-full h-full flex flex-col bg-gray-100 dark:bg-primary-500 ">
        <Tabs
          variant={variant}
          value={tabIndex}
          showIndicator={!search && !resultEmojis}
          onChange={handleTabChange}
        />

        <div className="overflow-hidden w-full h-full relative">
          <span className="absolute left-0 right-3 pr-3 top-0 z-20">
            <CSSTransition
              in={showInput}
              timeout={500}
              classNames="slide"
              unmountOnExit={true}
            >
              <div
                id="search-input"
                className="pr-2 bg-gray-100 dark:bg-primary-500 px-3 py-1.5"
              >
                <input
                  value={search}
                  type="search"
                  className="cancel-button w-full rounded px-3 py-2 text-gray-600 dark:text-white  bg-gray-200 dark:bg-primary-400 outline-none"
                  placeholder="Search Emoji"
                  onChange={(e) => setSearch(e.currentTarget.value)}
                />
              </div>
            </CSSTransition>
          </span>

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
                        <div className="emoji-category text-gray-400 dark:text-secondary-100 text-sm mb-2">
                          {name}
                        </div>
                        <span
                          ref={(el) => {
                            categoriesScrollRef.current[index] = el;
                          }}
                          // Match top with parent padding-top
                          className="absolute -top-15"
                        ></span>
                        <div className="grid grid-cols-flow gap-y-2.5 pr-4">
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
    </div>
  );
};
