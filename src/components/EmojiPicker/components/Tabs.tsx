import React, { FC, useEffect, useRef, useState } from "react";
import MoodIcon from "@mui/icons-material/Mood";
import PetsIcon from "@mui/icons-material/Pets";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import classNames from "classnames";
import { isScrolledIntoView } from "../utils/isScrolledIntoView";
import inView from "element-in-view";
import { debounce } from "../utils/debounce";
import { smoothScroll } from "../utils/smoothScroll";

interface Props {
  isRendered: boolean;
}

const categories = [
  {
    id: "face-emotion",
    name: "Smileys & People",
    icon: <MoodIcon />,
  },
  {
    id: "animals-nature",
    name: "Animals & Nature",
    icon: <PetsIcon />,
  },
  {
    id: "food-drink",
    name: "Food & Drink",
    icon: <FreeBreakfastIcon />,
  },
  {
    id: "activities-events",
    name: "Activity",
    icon: <SportsSoccerIcon />,
  },
  {
    id: "travel-places",
    name: "Travel & Places",
    icon: <DirectionsCarIcon />,
  },

  {
    id: "objects",
    name: "Objects",
    icon: <EmojiObjectsOutlinedIcon />,
  },
  {
    id: "symbols",
    name: "Symbols",
    icon: <TagOutlinedIcon />,
  },
  {
    id: "flags",
    name: "Flags",
    icon: <OutlinedFlagTwoToneIcon />,
  },
];

export const Tabs: FC<Props> = ({ isRendered }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [indicatorStyles, setIndicatorStyles] = useState({});

  useEffect(() => {
    if (isRendered) {
      //   const elemCategories = document.querySelectorAll(
      //     ".emoji-category-bottom"
      //   );
      //   document.getElementById("emoji-container")?.addEventListener(
      //     "scroll",
      //     debounce(() => {
      //       elemCategories.forEach((el, index) => {
      //         if (inView(el)) {
      //           const id = el.getAttribute("data-category");
      //           setSelected(index);
      //           const tab = el.ownerDocument.querySelector(
      //             `button[data-id="${id}"]`
      //           ) as HTMLElement;
      //           if (tab) {
      //             setIndicatorStyles({
      //               ...indicatorStyles,
      //               width: tab?.offsetWidth,
      //               left: tab?.offsetLeft,
      //             });
      //           }
      //         }
      //       });
      //     }, 0)
      //   );
    }
  }, [isRendered]);
  useEffect(() => {
    let isScrolling = false;
    if (isRendered) {
      console.log("rendering");
    }
    if (ref.current && isRendered) {
      const elemCategories = document.querySelectorAll(
        ".emoji-category-bottom"
      );

      document
        .getElementById("emoji-container")
        ?.addEventListener("scroll", (e) => {
          if (isScrolling) {
            // e.currentTarget. = true;
            return;
          }
          elemCategories.forEach((el, index) => {
            if (inView(el) && !isScrolling) {
              const id = el.getAttribute("data-category");
              setSelected(index);
              const tab = el.ownerDocument.querySelector(
                `button[data-id="${id}"]`
              ) as HTMLElement;

              if (tab) {
                setIndicatorStyles({
                  ...indicatorStyles,
                  width: tab?.offsetWidth,
                  left: tab?.offsetLeft,
                });
              }
            }
          });
        });
      // othjer
      const child = ref.current.childNodes;

      child.forEach((el, index) => {
        el.addEventListener("click", (e) => {
          const target = e.currentTarget as HTMLElement;
          setSelected(index);
          setIndicatorStyles({
            ...indicatorStyles,
            width: target.offsetWidth,
            left: target.offsetLeft,
          });
          const id = target.getAttribute("data-id");

          if (id) {
            const el = target.ownerDocument.getElementById(id);
            if (el) {
              const block_type = el.dataset.block;
              isScrolling = true;
              smoothScroll(el, { block: block_type }).then(() => {
                isScrolling = false;
              });
            }
          }
        });
      });
      const firstChild = ref.current.firstChild;

      if (firstChild) {
        setIndicatorStyles({
          width: firstChild.offsetWidth,
        });
      }
    }
  }, [isRendered]);

  return (
    <div className="relative w-full mb-2.5 pt-2">
      <div
        ref={ref}
        className="flex items-center  justify-between py-2 pt-0 text-primary-200"
      >
        {categories.map((category, index) => (
          <button
            key={`tabs-${category.id}`}
            onAnimationIteration={() => {
              console.log("anime ended");
            }}
            data-id={category.id}
            title={category.name}
            className={classNames("px-9 tab", {
              "text-white": selected === index,
            })}
          >
            {category.icon}
          </button>
        ))}
      </div>
      <span
        className="indicator h-1 bg-red-400  block absolute"
        style={{
          ...indicatorStyles,
        }}
      />
    </div>
  );
};
