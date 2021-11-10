import classNames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import { BaseEmoji, Category } from "unicode-emoji";
import { LOCAL_STORAGE_RECENT } from "../constants";

import { ActivityIcon } from "../icons/ActivityIcon";
import { FlagsIcon } from "../icons/FlagsIcon";
import { FoodIcon } from "../icons/FoodIcon";
import { NatureIcon } from "../icons/NatureIcon";
import { ObjectsIcon } from "../icons/ObjectsIcon";
import { PeopleIcon } from "../icons/PeopleIcon";
import { RecentIcon } from "../icons/RecentIcon";
import { SymbolsIcon } from "../icons/SymbolsIcon";
import { TravelIcon } from "../icons/TravelIcon";
import { getItem, useLocalStorage } from "../utils/useLocalStorage";

interface Props {
  variant?: "fullWidth" | "default";
  value: number;
  showIndicator?: boolean;
  onChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: number
  ): void;
}

interface Tab {
  id: Category | "recent";
  name: string;
  icon: JSX.Element;
}

export const categories: Tab[] = [
  {
    id: "recent",
    name: "Recent",
    icon: <RecentIcon />,
  },
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

export const Tabs: FC<Props> = ({
  variant,
  value,

  onChange,
  showIndicator,
}) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  const [indicatorStyles, setIndicatorStyles] = useState({
    width: 96,
    left: 0,
  });

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_RECENT)) {
      setShowRecent(true);
    }

    // Position 0 is for recent and might not be displayed
    if (tabsRef.current[1]) {
      setIndicatorStyles({
        ...indicatorStyles,
        width: tabsRef.current[1].offsetWidth,
      });
    }
  }, [tabsRef]);

  useEffect(() => {
    const tab = tabsRef.current[value];
    if (tab) {
      setIndicatorStyles({
        ...indicatorStyles,
        width: tab.offsetWidth,
        left: tab.offsetLeft,
      });
    }
  }, [value]);

  const classes = classNames(
    "flex items-center text-gray-400 dark:text-primary-300 dark:shadow-sm h-full overflow-hidden",
    {
      "grid grid-flow-col justify-between": variant === "fullWidth",
    }
  );

  return (
    <div className="relative w-full mb-1 text-base">
      <div className={classes}>
        {categories.map((category, index) =>
          category.id === "recent" && !showRecent ? null : (
            <button
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              key={`tabs-${category.id}`}
              onClick={(e) => onChange(e, index)}
              data-id={category.id}
              title={category.name}
              className={classNames("md:px-9 tab outline-none pt-3 pb-2", {
                "text-gray-600 dark:text-secondary-200":
                  showIndicator && value === index,
              })}
            >
              <span className="block">{category.icon}</span>
            </button>
          )
        )}
      </div>

      {showIndicator && (
        <span
          className={classNames("h-1 bg-green-600 block absolute", {
            indicator: showIndicator,
          })}
          style={{
            ...indicatorStyles,
          }}
        />
      )}
    </div>
  );
};
