import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { clearAppCache } from 'webtonative';
export default function ClearAppCacheCard() {
  const [reloadApp, setReloadApp] = useState(false);

  const ClearAppCacheFun = () => {
    clearAppCache(reloadApp);
  };

  return (
    <div
      className="
        bg-gradient-to-r from-teal-700 to-cyan-600
        rounded-xl p-6 shadow-lg text-white
        mb-8
      "
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-white/20 p-2 rounded-full">
          <Trash2 className="text-white w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Clear App Cache</h3>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 text-white/90">
        Manage and clear app cache. You can also reload the app after clearing
        cache.
      </p>

      {/* Checkbox */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          id="reloadApp"
          type="checkbox"
          checked={reloadApp}
          onChange={(e) => setReloadApp(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-white"
        />
        <label
          htmlFor="reloadApp"
          className="text-sm cursor-pointer text-white/90"
        >
          Reload App After Clear Cache
        </label>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={ClearAppCacheFun}
          className="
            bg-white text-teal-700 font-medium px-5 py-2 rounded-md
            shadow-sm hover:bg-gray-100 transition-colors
          "
        >
          Clear
        </button>
      </div>
    </div>
  );
