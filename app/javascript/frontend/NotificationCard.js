import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  getFCMToken,
  subscribe,
  unsubscribe,
} from 'webtonative/Firebase/Messaging';
const FirebaseNotificationCard = () => {
  const [topic, setTopic] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  const getFcmTokenFun = () => {
    getFCMToken({
      callback: (data) => {
        setFcmToken(data.value);
      },
    });
  };

  const subscribeTopic = () => {
    subscribe({ toTopic });
  };

  const unsubscribeTopic = () => {
    unsubscribe({ fromTopic });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-sky-900 to-indigo-950 border border-sky-700 rounded-xl p-5 mx-auto mb-6 shadow-lg">
      <div className="flex items-center mb-3">
        <Bell className="text-sky-200 mr-2 w-5 h-5" />
        <h3 className="text-lg font-semibold text-sky-100">
          Firebase Notification
        </h3>
      </div>

      <button
        onClick={getFcmTokenFun}
        className="w-full mb-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors"
      >
        Get FCM Token
      </button>
      <textarea
        readOnly
        value={fcmToken}
        placeholder="FCM Token will appear here"
        className="w-full px-4 py-2 mb-3 rounded-lg bg-sky-900 text-sky-100 placeholder-sky-300 border border-sky-700 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full px-4 py-2 mb-3 rounded-lg bg-sky-900 text-sky-100 placeholder-sky-300 border border-sky-700 focus:outline-none"
      />
      <div className="flex gap-3">
        <button
          onClick={subscribeTopic}
          className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-colors"
        >
          Subscribe
        </button>
        <button
          onClick={unsubscribeTopic}
          className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
        >
          Unsubscribe
        </button>
      </div>
    </div>
  );
};

export default FirebaseNotificationCard;
