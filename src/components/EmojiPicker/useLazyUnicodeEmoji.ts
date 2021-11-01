import React, { useEffect, useState } from "react";
import { BaseEmoji, GroupedBy } from "unicode-emoji";

export const useLazyUnicodeEmoji = () => {
  const [groupedEmojis, setGroupedEmojis] =
    useState<Record<GroupedBy, BaseEmoji[]>>();

  const [baseEmojis, setBaseEmojis] = useState<BaseEmoji[] | undefined>();

  useEffect(() => {
    import("unicode-emoji").then((unicodeEmoji) => {
      setGroupedEmojis(
        unicodeEmoji.getEmojisGroupedBy("category", {
          versionAbove: "12.0",
        })
      );

      setBaseEmojis(unicodeEmoji.getEmojis());
    });
  }, []);

  return { groupedEmojis, baseEmojis };
};
