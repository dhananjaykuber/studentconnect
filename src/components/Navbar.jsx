import React, { useState } from "react";
import { FaBars, FaSignInAlt } from "react-icons/fa";
import Profile from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import ThemeSwitcher from "./ThemeSwitcher";
import { useSelector } from "react-redux";

const links = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/about",
  },
  {
    label: "Contact",
    url: "/contact",
  },
  {
    label: "Blogs",
    url: "/blogs",
  },
];

const dropdown = [
  {
    label: "Dashboard",
    url: "/dashboard",
  },
  {
    label: "Settings",
    url: "/settings",
  },
];

const Navbar = () => {
  const { theme } = useSelector((store) => store.theme);
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <nav className="border-b-2 border-gray-100 bg-white font-montserrat dark:border-gray-700  dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          to="/"
          className="flex h-12 w-36 items-center bg-cover bg-center"
          style={{
            backgroundImage:
              theme === "dark"
                ? "url('/studentconnect-logo-dark.svg')"
                : "url('/studentconnect-logo-light.svg')",
          }}
          onClick={() => setShowMobileNav(false)}
        ></Link>
        <div className="flex items-center md:order-2">
          {/* <Button
            label={"Login"}
            leftIcon={<FaSignInAlt />}
            onclick={() => navigate("/login")}
          /> */}
          <ThemeSwitcher />
          <button
            type="button"
            className="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowMobileNav(false);
            }}
          >
            <img
              className="h-8 w-8 rounded-full"
              src={Profile}
              alt="user photo"
            />
          </button>
          <div className="relative">
            <div
              className={`absolute -right-10 top-3 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 md:right-1 ${
                !showProfile && "hidden"
              }`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Dhananjay Kuber
                </span>
                <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                  dhananjay@gmail.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                {dropdown.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.url}
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-user"
            aria-expanded="false"
            onClick={() => {
              setShowMobileNav(!showMobileNav);
              setShowProfile(false);
            }}
          >
            <FaBars />
          </button>
        </div>
        <div
          className={`w-full items-center justify-between md:order-1 md:flex md:w-auto ${
            !showMobileNav && "hidden"
          }`}
          id="navbar-user"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-10 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  className="block rounded py-2 pl-3 pr-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  onClick={() => setShowMobileNav(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
