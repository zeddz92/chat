import Head from "next/head";
import { useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";

import { Container } from "../components/Container";
import { Conversation } from "../components/Conversation";
import { EmojiPicker } from "../components/EmojiPicker";

import { SidePanel } from "../components/SidePanel/SidePanel";
import { CSSTransition } from "react-transition-group";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import classNames from "classnames";

export default function Emoji() {
  const [open, setOpen] = useState(true);
  const [emoji, setEmoji] = useState("😀️");
  const [mode, setMode] = useState("light");
  const [variant, setVariant] = useState("fullWidth");

  const styles = { height: 400 };
  return (
    <div className="h-screen md:py-6" data-testid="chat">
      <Head>
        <title>Emoji</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-9/12  mx-auto ">
        <div className="overflow-hidden flex flex-col" style={{ height: 600 }}>
          <div className="text-5xl mx-auto pb-3 border-b-4 border-gray-400 mb-4">
            {emoji}
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
                variant={variant}
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
                  active: mode === "light",
                })}
                onClick={() => setMode("light")}
              >
                <LightModeOutlinedIcon />
                <span className="ml-2">Light</span>
              </button>

              <button
                className={classNames("p-2.5", {
                  active: mode === "dark",
                })}
                onClick={() => setMode("dark")}
              >
                <DarkModeOutlinedIcon />
                <span className="ml-2">Dark</span>
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">Variant</p>
            <div className="grid grid-flow-col border rounded-md gap-5">
              <button
                className=" py-2.5  px-2.5 border-r"
                onClick={() => setVariant("fullWidth")}
              >
                <span className="ml-2">Full Width</span>
              </button>

              <button
                className=" py-2.5  px-2.5"
                onClick={() => setVariant("default")}
              >
                <span className="ml-2">Default</span>
              </button>
            </div>
          </div>

          {/* <div className="text-white">
            <ToggleButtonGroup
              color="standard"
              className="text-white"
              value={mode}
              style={{ color: "white" }}
              exclusive
              fullWidth
              onChange={(event, newMode) => {
                setMode(newMode);
              }}
            >
              <ToggleButton value="light">
                <LightModeOutlinedIcon />
                <span>Light</span>
              </ToggleButton>
              <ToggleButton value="system">
                <SettingsBrightnessOutlinedIcon />
                <span>System</span>
              </ToggleButton>
              <ToggleButton value="dark">
                <DarkModeOutlinedIcon />
                <span>Dark</span>
              </ToggleButton>
            </ToggleButtonGroup>
          </div> */}

          {/* <div className="mt-4">
            <p className="mb-2 font-medium">Variant</p>
            <div className="grid grid-flow-col border rounded-md gap-5">
              <button
                className="flex py-2.5  px-2.5"
                onClick={() => setMode("light")}
              >
                <LightModeOutlinedIcon />
                <span className="ml-2">Default</span>
              </button>

              <button
                className="flex py-2.5  px-2.5"
                onClick={() => setMode("dark")}
              >
                <DarkModeOutlinedIcon />
                <span className="ml-2">Full width</span>
              </button>
            </div>
          </div> */}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="bg-green-800 text-white mb-20"
        >
          show
        </button>

        {/* <div className="overflow-hidden mb-20" style={styles}>
          <EmojiPicker mode="light" variant="fullWidth" />
        </div> */}

        {/* <div className="overflow-hidden" style={styles}>
          <EmojiPicker mode="dark" variant="fullWidth" />
        </div> */}
      </div>
    </div>
  );
}
