import React from 'react';
import { Layout } from 'lucide-react';
import { hide, show } from 'webtonative/BottomNavigation';
const HideBottomNavCard: React.FC = () => {
  const hideBottomNav = () => {
    hide();
  };

  return (
    <div className="bg-gradient-to-br from-fuchsia-950 via-pink-900 to-fuchsia-950 border border-black rounded-xl p-5 mx-auto mb-6 shadow-lg">
      <div className="flex items-center mb-3">
        <Layout className="text-pink-200 mr-2 w-5 h-5" />
        <h3 className="text-lg font-semibold text-pink-100">
          Hide Bottom Navigation
        </h3>
      </div>

      <button
        onClick={hideBottomNav}
        className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-medium transition-colors"
      >
        Hide Bottom Nav
      </button>

      <button
        onClick={() => show()}
        className="px-4 py-2 ml-4 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-medium transition-colors"
      >
        Show
      </button>
    </div>
  );
};

export default HideBottomNavCard;
