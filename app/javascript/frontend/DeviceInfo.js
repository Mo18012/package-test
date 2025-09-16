import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { deviceInfo } from 'webtonative';
import Result from './Result';

  darkMode?;
}

const DeviceInfo = ({ darkMode }) => {
  const [result, setResult] = useState('');
  const getDeviceInfoFn = () => {
    deviceInfo().then(function (value) {
      const result = 'Result' + Object.values(value);
      setResult(result);
      toast.success('Device info retrieved');
    });
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-green-900 to-teal-800'
          : 'bg-gradient-to-br from-green-500 to-teal-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-green-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
        Device Information
      </h3>

      <div className="bg-white/10 p-4 rounded-lg mb-4">
        <p className="text-white/80 mb-4">
          Get detailed information about the user's device, including platform,
          model, and operating system.
        </p>
        <button
          onClick={getDeviceInfoFn}
          className="bg-white text-green-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full md:w-auto"
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Get Device Info
        </button>
        <Result resultInfo={result} />
      </div>
    </div>
  );
};

export default DeviceInfo;
