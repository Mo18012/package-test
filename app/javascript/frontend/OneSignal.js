import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { setExternalUserId, removeExternalUserId } from 'webtonative/OneSignal';
  darkMode?;
}

const OneSignal = ({ darkMode }) => {
  const [onesignalExternalUserId, setOnesignalExternalUserId] = useState('');

  const setOneSignalExternalUserId = () => {
    setExternalUserId(onesignalExternalUserId);
    toast.success('OneSignal external user ID set');
  };

  const removeOneSignalExternalUserId = () => {
    removeExternalUserId();
    toast.success('OneSignal external user ID removed');
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-red-900 to-rose-800'
          : 'bg-gradient-to-br from-red-500 to-rose-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-red-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
        </span>
        OneSignal Integration
      </h3>

      <div className="bg-white/10 p-4 rounded-lg mb-4">
        <p className="text-white/80 mb-4">
          Manage OneSignal external user ID for push notifications.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={onesignalExternalUserId}
            onChange={(e) => setOnesignalExternalUserId(e.target.value)}
            placeholder="Enter OneSignal External User ID"
            className="flex-grow p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <div className="flex gap-2">
            <button
              onClick={setOneSignalExternalUserId}
              className="bg-white text-red-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
            >
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
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Set ID
            </button>
            <button
              onClick={removeOneSignalExternalUserId}
              className="bg-white/20 text-white font-bold px-5 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
            >
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
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Remove ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneSignal;
