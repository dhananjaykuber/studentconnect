import React, { useState } from 'react';
import { FaBars, FaSignInAlt } from 'react-icons/fa';
import logo from '../assets/studentconnect-logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

const links = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'About',
    url: '/about',
  },
  {
    label: 'Contact',
    url: '/contact',
  },
];

const dropdown = [
  {
    label: 'Dashboard',
    url: '/dashboard',
  },
  {
    label: 'Settings',
    url: '/settings',
  },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <nav className="bg-white border-gray-100 dark:bg-gray-900 border-b-2 font-montserrat">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src={logo} className="h-12" alt="logo" />
        </a>
        <div className="flex items-center md:order-2">
          {/* <Button
            label={'Login'}
            leftIcon={<FaSignInAlt />}
            onclick={() => navigate('/login')}
          /> */}
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>
          <div className="relative">
            <div
              className={`z-50 absolute top-3 -right-10 md:right-1 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
                !showProfile && 'hidden'
              }`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Dhananjay Kuber
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  dhananjay@gmail.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                {dropdown.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.url}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            !showMobileNav && 'hidden'
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-10 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  className="block py-2 pl-3 pr-4 text-sm text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold"
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
