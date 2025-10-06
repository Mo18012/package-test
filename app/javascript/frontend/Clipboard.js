import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { get, set } from 'webtonative/Clipboard';

const ClipboardCard = () => {
  const [clipText, setClipText] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const getDataFromClipBoard = () => {
    get({
      callback: (data) => {
        console.log(data.value);
        setCopiedText(data.value);
        toast.success(`Data${data.value}`);
      },
    });
  };

  const setDataIntoClipBoard = () => {
    set({
      data:clipText,
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full mx-auto shadow-lg mb-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Clipboard</h3>

      {/* Get data from clipboard */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">
          Get data from clipboard
        </label>
        <button
          onClick={getDataFromClipBoard}
          className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition-colors"
        >
          Get
        </button>
        {copiedText && (
          <div className="text-sm mt-2">{JSON.stringify(copiedText)}</div>
        )}
      </div>

      {/* Store data into clipboard */}
      <div>
        <input
          id="clipboardBox"
          type="text"
          placeholder="Enter Data"
          value={clipText}
          onChange={(e) => setClipText(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={setDataIntoClipBoard}
          className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default ClipboardCard;
