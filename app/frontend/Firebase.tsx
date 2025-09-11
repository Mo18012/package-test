import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { events } from 'webtonative/FirebaseAnalytics';
export interface IFirebaseProps {
  darkMode?: boolean;
}

const Firebase: FC<IFirebaseProps> = ({ darkMode }) => {
  const [firebaseUserId, setFirebaseUserId] = useState('');

  const handleSetFirebaseUserId = () => {
    events?.setUserId({ userId: firebaseUserId });
    toast.success('Firebase user ID set');
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-yellow-900 to-amber-800'
          : 'bg-gradient-to-br from-yellow-500 to-amber-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-yellow-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
        Firebase Analytics
      </h3>

      <div className="bg-white/10 p-4 rounded-lg mb-4">
        <p className="text-white/80 mb-4">
          Set Firebase user ID for analytics tracking and user identification.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={firebaseUserId}
            onChange={(e) => setFirebaseUserId(e.target.value)}
            placeholder="Enter Firebase User ID"
            className="flex-grow p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            onClick={handleSetFirebaseUserId}
            className="bg-white text-yellow-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Set User ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Firebase;
