'use client';
import React, { useState } from 'react';
// replace with your actual npm package import:
import { showDateTimePicker } from 'webtonative'; // e.g. import { showDateTimePicker } from "@webtonative/core";

const DateTimePickerPage = () => {
  const [result, setResult] = useState('');

  const handlePickDateTime = () => {
    showDateTimePicker({
      showDate,
      showTime,
      callback(data) => {
        console.log('Date Data ->', data);
        setResult(JSON.stringify(data));
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white p-6">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">
          WebToNative Date &amp; Time Picker
        </h2>

        <button
          onClick={handlePickDateTime}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          Pick Date &amp; Time
        </button>

        <p className="mt-6 text-sm text-gray-300">
          {result ? (
            <>
              <span className="text-green-400">Selected</span>
              {result}
            </>
          ) (
            : 'Result will appear here.'
          )}
        </p>
      </div>
    </div>
  );
};

export default DateTimePickerPage;
