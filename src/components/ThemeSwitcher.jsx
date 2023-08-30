import React, { useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../features/theme/themeSlice";

const svg = {
  light: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block h-5 w-5"
    >
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  ),
  dark: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((store) => store.theme);

  const switcher = useRef(null);
  const switcherButton = useRef(null);

  const [activeTheme, setActiveTheme] = useState("light");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownMenuClasses = twMerge(
    "min-w-max absolute bg-white text-base z-[1000] overflow-hidden float-left list-none text-left rounded-lg shadow-lg m-0 bg-clip-padding border-none dark:bg-neutral-800",
    showDropdown ? "block -translate-x-full -translate-y-full" : "hidden",
  );

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    document.documentElement.classList.add(theme);

    setActiveTheme(theme);
    setShowDropdown(false);

    dispatch(setTheme(theme));
  }, []);

  const setDarkTheme = () => {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";

    setActiveTheme("dark");
    setShowDropdown(false);
    dispatch(setTheme("dark"));
  };

  const setLightTheme = () => {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";

    setActiveTheme("light");
    setShowDropdown(false);
    dispatch(setTheme("light"));
  };

  const handleClickOutside = (event) => {
    if (!switcher.current?.contains(event.target)) {
      setShowDropdown(false);
      return;
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="fixed bottom-5 right-5 z-[9999]"
        id="theme-switcher"
        ref={switcher}
      >
        <div className="relative">
          <button
            ref={switcherButton}
            className="flex h-[30px] w-[30px] items-center justify-center whitespace-nowrap rounded-full uppercase text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-lg focus:bg-neutral-300 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg motion-reduce:transition-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            type="button"
            id="themeSwitcher"
            aria-expanded="false"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {svg[activeTheme]}
          </button>
          <ul className={dropdownMenuClasses} aria-labelledby="themeSwitcher">
            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-3 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 focus:bg-neutral-200 focus:outline-none active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-100 dark:hover:bg-neutral-600 focus:dark:bg-neutral-600"
                style={
                  activeTheme === "light" ? { color: "rgb(101,144,213)" } : {}
                }
                data-theme="light"
                onClick={setLightTheme}
              >
                <div className="pointer-events-none">
                  <div
                    className="inline-block w-[24px] text-center"
                    data-theme-icon="light"
                  >
                    {svg.light}
                  </div>
                  <span data-theme-name="light">Light</span>
                </div>
              </a>
            </li>
            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-3 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 focus:bg-neutral-200 focus:outline-none active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-100 dark:hover:bg-neutral-600 focus:dark:bg-neutral-600"
                style={
                  activeTheme === "dark" ? { color: "rgb(101,144,213)" } : {}
                }
                data-theme="dark"
                onClick={setDarkTheme}
              >
                <div className="pointer-events-none">
                  <div
                    className="inline-block w-[24px] text-center"
                    data-theme-icon="dark"
                  >
                    {svg.dark}
                  </div>
                  <span data-theme-name="dark">Dark</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ThemeSwitcher;
