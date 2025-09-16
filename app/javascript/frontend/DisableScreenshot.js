import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { disableScreenshot } from 'webtonative';

const DisableScreenshot = ({}) => {
  const [idDisableScreenshot, setDisableScreenshot] = useState(false);

  const disableScreenshotForPage = () => {
    disableScreenshot({ ssKey });
    toast.success('trigger DisableScreenshot');
  };

  return (
    <div
      className={`${'bg-gradient-to-br from-gray-800 to-gray-700'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-full`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-teal-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </span>
        Disable Screenshot
      </h3>

      <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg mb-4">
        <label className="text-white font-medium">Enable</label>
        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input
            checked={idDisableScreenshot}
            onChange={(e) => setDisableScreenshot(e.target.checked)}
            type="checkbox"
            id="screenshotCheckbox"
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            style={{
              right: idDisableScreenshot ? '0' : 'auto',
              left: idDisableScreenshot ? 'auto' : '0',
              transition: 'all 0.3s ease',
            }}
          />
          <label
            className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
            style={{
              backgroundColor: idDisableScreenshot ? '#10B981' : '#D1D5DB',
            }}
          ></label>
        </div>
        <button
          onClick={() => {
            disableScreenshotForPage();
          }}
          className="ml-auto bg-white text-teal-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
export default DisableScreenshot;
