"use client";
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';
import clsx from 'clsx';

const Navbar = ({ isSidebarCollapsed }) => {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm dark:bg-gray-900 dark:border-gray-800 transition-all duration-300">

      {/* Left Side (Breadcrumbs or Page Title could go here) */}
      <div className="flex items-center gap-4">
        {/* Placeholder for future breadcrumbs or title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:bg-gray-800">
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-6 dark:border-gray-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            <FiUser size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
