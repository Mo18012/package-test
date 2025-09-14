import React from 'react';
import { Star } from 'lucide-react';
import { prompt } from 'webtonative/AppReview';

const AppReviewCard: React.FC = () => {
  const appReviewFun = () => {
    prompt();
  };

  return (
    <div className="bg-gradient-to-br from-teal-950 via-emerald-900 to-teal-950 border border-emerald-700 rounded-xl p-5 mx-auto mb-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-3">
        <Star className="text-amber-300 mr-2 w-5 h-5" />
        <h3 className="text-lg font-semibold text-emerald-100">App Review</h3>
      </div>

      {/* Body */}
      <button
        onClick={appReviewFun}
        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-medium transition-colors"
      >
        App Review
      </button>
    </div>
  );
};

export default AppReviewCard;
