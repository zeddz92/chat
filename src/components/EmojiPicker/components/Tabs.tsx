import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import MoodIcon from "@mui/icons-material/Mood";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import PetsIcon from "@mui/icons-material/Pets";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import classNames from "classnames";
import inView from "element-in-view";
import React, { FC, useEffect, useRef, useState } from "react";

import { debounce } from "../utils/debounce";
import { smoothScroll } from "../utils/smoothScroll";

interface Props {
  isRendered: boolean;
  variant?: "fullWidth" | "default";
  scrollContentRef: React.RefObject<HTMLDivElement>;
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

export const Tabs: FC<Props> = ({ isRendered, variant, scrollContentRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);

  const [indicatorStyles, setIndicatorStyles] = useState({
    width: 96,
    left: 0,
  });

  useEffect(() => {
    if (scrollContentRef.current && isRendered) {
      const target = scrollContentRef.current;
      const elemCategories = target.querySelectorAll(".emoji-category-bottom");

      target.addEventListener(
        "scroll",
        debounce((e: Event) => {
          const isScrolling = target.classList.contains("scrolling");
          if (isScrolling) {
            return;
          }

          elemCategories.forEach((el, index) => {
            if (inView(el) && !isScrolling) {
              const id = el.getAttribute("data-category");
              setSelected(index);
              const tab = target.ownerDocument.querySelector(
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
        }, 100)
      );
    }
  }, [scrollContentRef, isRendered]);

  useEffect(() => {
    if (ref.current) {
      const category = ref.current.firstChild as HTMLElement;
      if (category) {
        setIndicatorStyles({
          ...indicatorStyles,
          width: category.offsetWidth,
        });
      }
    }
  }, [ref]);

  const classes = classNames("flex items-center py-2 pt-0 text-primary-200", {
    "justify-between": variant === "fullWidth",
  });

  return (
    <div className="relative w-full mb-1 pt-2">
      <div ref={ref} className={classes}>
        {categories.map((category, index) => (
          <button
            key={`tabs-${category.id}`}
            onClick={(e) => {
              scrollContentRef.current?.classList.add("scrolling");
              const target = e.currentTarget as HTMLElement;

              setSelected(index);
              setIndicatorStyles({
                ...indicatorStyles,
                width: target.offsetWidth,
                left: target.offsetLeft,
              });

              // Find category to be scrolled to
              const categoryElement = target.ownerDocument.getElementById(
                category.id
              );

              if (categoryElement) {
                const block_type = categoryElement.dataset
                  .block as ScrollLogicalPosition;

                smoothScroll(categoryElement, { block: block_type }).then(
                  () => {
                    scrollContentRef.current?.classList.remove("scrolling");
                  }
                );
              }
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
        className="indicator h-1 bg-red-400 block absolute"
        style={{
          ...indicatorStyles,
        }}
      />
    </div>
  );
};
