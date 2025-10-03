import React, { useState } from 'react';
import { Monitor } from 'lucide-react';
import { keepScreenNormal, keepScreenOn } from 'webtonative/Screen';

const ScreenControlCard = () => {
  const [screenOn, setScreenOn] = useState(false);

  const screenControlFun = () => {
    if (screenOn) {
      // If checkbox is ON, keep screen awake
      keepScreenOn();
    } else {
      // If checkbox is OFF, revert to normal
      keepScreenNormal();
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 border border-purple-700 rounded-xl p-5 mx-auto mb-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-3">
        <Monitor className="text-purple-200 mr-2 w-5 h-5" />
        <h3 className="text-lg font-semibold text-purple-100">
          Screen Control
        </h3>
      </div>

      {/* Body */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <input
            id="screenStatusBox"
            type="checkbox"
            checked={screenOn}
            onChange={(e) => setScreenOn(e.target.checked)}
            className="w-5 h-5 text-pink-500 bg-indigo-900 border-purple-700 rounded focus:ring-2 focus:ring-pink-400"
          />
          <label
            htmlFor="screenStatusBox"
            className="text-purple-200 cursor-pointer"
          >
            Screen On All Time
          </label>
          <span className="text-xs text-purple-300">
            {screenOn ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        <button
          onClick={screenControlFun}
          className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-medium transition-colors"
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default ScreenControlCard;
