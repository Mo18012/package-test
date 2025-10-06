import React from "react";
import toast from "react-hot-toast";
import { AppWindow } from "lucide-react";
import { updateAppIcon } from "webtonative";

const DynamicAppIconCard: React.FC = () => {
  const handleSetIcon = (iconName?: string) => {
    updateAppIcon({ iconName });
    toast.success(iconName ? `App icon set to ${iconName}` : "App icon reset");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 border border-purple-700 rounded-xl p-6 mb-6 shadow-lg text-white mx-auto">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <AppWindow className="w-5 h-5 text-purple-300" />
        Dynamic App Icon
      </h3>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleSetIcon("icon1")}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium"
        >
          Set Icon 1
        </button>

        <button
          onClick={() => handleSetIcon("icon2")}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium"
        >
          Set Icon 2
        </button>

        <button
          onClick={() => handleSetIcon("icon3")}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-medium"
        >
          Set Icon 3
        </button>

        <button
          onClick={() => handleSetIcon()}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium"
        >
          Reset Icon
        </button>
      </div>
    </div>
  );
};

export default DynamicAppIconCard;
