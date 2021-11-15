import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import classNames from "classnames";
import Head from "next/head";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import { EmojiPicker } from "../components/EmojiPicker";

export default function Emoji() {
  const [open, setOpen] = useState(true);
  const [emoji, setEmoji] = useState("😀️");
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [tabsVariant, setTabsVariant] = useState<"fullWidth" | "default">(
    "fullWidth"
  );

  const [useCustomStyles, setUseCustomStyles] = useState(false);

  const [styles, setStyles] = useState({
    backgroundColor: "#772CE8",
    indicatorColor: "#69FFC3",
    fontColor: "lightgrey",
    searchBackgroundColor: "#5c16c7",
    tabsFontColor: "lightgrey",
    searchFontColor: "lightgrey",
  });

  return (
    <div className="h-screen md:py-6" data-testid="chat">
      <Head>
        <title>Emoji</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-9/12  mx-auto ">
        <div className="overflow-hidden flex flex-col" style={{ height: 600 }}>
          <div className="flex items-center justify-between">
            <a href="https://www.buymeacoffee.com/zeddz" target="_blank">
              <img
                src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
                alt="Buy Me A Coffee"
                className="shadow-md h-9"
              />
            </a>
            <div className="text-5xl mx-auto pb-3 border-b-4 border-gray-400 mb-4">
              {emoji}
            </div>

            <button
              onClick={() => setOpen(!open)}
              style={{ maxWidth: 165.4 }}
              className="bg-blue-500 text-white py-1.5 px-5 rounded w-full"
            >
              Toggle Picker
            </button>
          </div>

          <CSSTransition
            in={open}
            timeout={500}
            classNames="slide-up"
            unmountOnExit={true}
          >
            <div className="overflow-hidden h-full">
              <EmojiPicker
                mode={mode}
                styles={useCustomStyles ? styles : undefined}
                tabsVariant={tabsVariant}
                onEmojiClick={(emoji) => {
                  setEmoji(emoji);
                }}
              />
            </div>
          </CSSTransition>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-10  text-white ">
          <div>
            <p className="mb-2 font-medium">Mode</p>
            <div className="grid grid-flow-col border rounded-md">
              <button
                className={classNames("p-2.5 border-r", {
                  active: !useCustomStyles && mode === "light",
                })}
                onClick={() => {
                  setMode("light");
                  setUseCustomStyles(false);
                }}
              >
                <LightModeOutlinedIcon />
                <span className="ml-3">Light</span>
              </button>

              <button
                className={classNames("p-2.5", {
                  active: !useCustomStyles && mode === "dark",
                })}
                onClick={() => {
                  setMode("dark");
                  setUseCustomStyles(false);
                }}
              >
                <DarkModeOutlinedIcon />
                <span className="ml-3">Dark</span>
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">Tabs Variant</p>
            <div className="grid grid-flow-col border rounded-md">
              <button
                className={classNames("p-2.5 border-r", {
                  active: tabsVariant === "fullWidth",
                })}
                onClick={() => setTabsVariant("fullWidth")}
              >
                <span className="ml-2">Full Width</span>
              </button>

              <button
                className={classNames("p-2.5", {
                  active: tabsVariant === "default",
                })}
                onClick={() => setTabsVariant("default")}
              >
                <span className="ml-2">Default</span>
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">Custom Styles</p>
            <textarea
              spellCheck={false}
              onChange={(e) => {
                try {
                  const value = JSON.parse(e.currentTarget.value);
                  setStyles(value);
                } catch (error) {}
              }}
              value={JSON.stringify(styles || {}, null, 2)}
              className="rounded w-full bg-primary-300 bg-opacity-20 text-white p-3 resize-none border border-primary-400 shadow"
              rows={8}
            ></textarea>

            <button
              onClick={() => setUseCustomStyles(true)}
              className="bg-blue-500 text-white mb-20 w-full p-2.5 mt-2 rounded"
            >
              Apply custom styles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
