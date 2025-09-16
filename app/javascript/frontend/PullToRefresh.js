import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { enablePullToRefresh } from 'webtonative';


const PullToRefresh = ({}) => {
  const [pullToRefresh, setPullToRefresh] = useState(false);

  const pullToRefreshFn = () => {
    enablePullToRefresh(pullToRefresh);
    toast.success('trigger PullToRefresh');
  };

  return (
    <div
      className={`${'bg-gradient-to-br from-purple-900 to-indigo-800'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-full`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-purple-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </span>
        Pull To Refresh
      </h3>

      <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg mb-4">
        <label className="text-white font-medium">Enable</label>
        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            checked={pullToRefresh}
            onChange={(e) => setPullToRefresh(e.target.checked)}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            style={{
              right ? '0' : 'auto',
              left ? 'auto' : '0',
              transition: 'all 0.3s ease',
            }}
          />
          <label
            className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
            style={{
              backgroundColor ? '#EC4899' : '#D1D5DB',
            }}
          ></label>
        </div>
        <button
          onClick={() => {
            pullToRefreshFn();
          }}
          className="ml-auto bg-white text-purple-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
export default PullToRefresh;
