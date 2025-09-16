// SetOrientationPage.js
'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
// import the real npm package you’re using here:
import { setOrientation;

const SetOrientationPage = () => {
  const [orientation, setOrientation] = useState(
    : 'portrait',
  );
  const [force, setForce] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    wtnSetOrientation({
      orientation,
      forceOrientation,
    });
    toast.success('orient');
    setStatus(`Orientation set to ${orientation} (force${force})`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Set Device Orientation
        </h2>

        <label htmlFor="orientation" className="block mb-2 text-sm font-medium">
          Orientation
        </label>
        <select
          id="orientation"
          value={orientation}
          onChange={(e) =>
            setOrientation(e.target.value)
          }
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={force}
            onChange={(e) => setForce(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm">Force Orientation</span>
        </label>

        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          Set Orientation
        </button>

        {status && (
          <div className="mt-4 text-center text-sm text-green-400">
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default SetOrientationPage;
