import React } from 'react';


const Screens = ({ darkMode }) => {
  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-500'
          : 'bg-gradient-to-br from-gray-500 to-gray-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-gray-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </span>
        Screens
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/10 p-4 rounded-lg">
        <a
          href="w2n://notification-screen?title=msg&titleBarContentColor=#000000&titleBarBgColor=#b30fff"
          className="w-full"
        >
          <button className="bg-white w-full text-gray-600 font-bold px-2 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            Notification Screen Color
          </button>
        </a>

        <a href="w2n://notification-screen" className="w-full">
          <button className="bg-white w-full text-gray-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            Notification Screen
          </button>
        </a>

        <a
          href="w2n://download-screen?title=msg&titleBarContentColor=#abcdef&titleBarBgColor=#ffffff"
          className="w-full"
        >
          <button className="bg-white w-full text-gray-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Screen color
          </button>
        </a>

        <a href="w2n://download-screen" className="w-full">
          <button className="bg-white w-full text-gray-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Screen
          </button>
        </a>
      </div>
    </div>
  );
};

export default Screens;
