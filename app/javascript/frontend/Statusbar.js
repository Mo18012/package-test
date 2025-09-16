import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { statusBar } from 'webtonative';

const Statusbar = ({ darkMode }) => {
  const [statusBarDarkMode, setStatusBarDarkMode] = useState(true);
  const [statusBarColor, setStatusBarColor] = useState('#1D1B1B');

  const setStatusBarColorFn = () => {
    const theme = statusBarDarkMode ? 'dark' : 'light';
    console.log('statusBarColor', statusBarColor, theme);
    statusBar({
      style,
      color,
      overlay, //only true if 8 digit for opacity
    });
    toast.success('trigger Statusbar');
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-pink-900 to-rose-800'
          : 'bg-gradient-to-br from-pink-500 to-rose-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-pink-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        </span>
        Status Bar Color
      </h3>

      <div className="bg-white/10 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <label className="text-white font-medium min-w-20">Color:</label>
          <input
            type="color"
            value={statusBarColor}
            onChange={(e) => setStatusBarColor(e.target.value)}
            className="h-10 w-20 rounded cursor-pointer"
          />

          <div className="flex gap-2 items-center">
            Dark Mode{' '}
            <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in ">
              <input
                type="checkbox"
                checked={statusBarDarkMode}
                onChange={(e) => setStatusBarDarkMode(e.target.checked)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                style={{
                  right: right ? '0' : 'auto',
                  left: left ? 'auto' : '0',
                  transition: 'all 0.3s ease',
                }}
              />
              <label
                className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                style={{
                  backgroundColor: backgroundColor ? '#EC4899' : '#D1D5DB',
                }}
              ></label>
            </div>
          </div>

          <button
            onClick={() => {
              setStatusBarColorFn();
            }}
            className="bg-white text-pink-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md ml-auto"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
export default Statusbar;
