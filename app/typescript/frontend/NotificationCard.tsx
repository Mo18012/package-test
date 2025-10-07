"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Bell } from "lucide-react";
import {
  getFCMToken,
  subscribe,
  unsubscribe,
} from "webtonative/Firebase/Messaging";

const FirebaseNotificationCard: React.FC = () => {
  const [token, setToken] = useState("");
  const [topic, setTopic] = useState("");

  const handleGetToken = () => {
  getFCMToken({
    callback: (data) => {
      // You can safely type it here if you want
      const tokenData = data as { token: string };
      setToken(tokenData.token);
      toast.success("FCM Token retrieved successfully!");
    },
  });
};


  const handleSubscribe = () => {
    if (!topic) return toast.error("Please enter a topic.");
    subscribe({ toTopic: topic });
    toast.success(`Subscribed to "${topic}"`);
  };

  const handleUnsubscribe = () => {
    if (!topic) return toast.error("Please enter a topic.");
    unsubscribe({ fromTopic: topic });
    toast.success(`Unsubscribed from "${topic}"`);
  };

  return (
    <div className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 border border-amber-700 rounded-xl p-6 mb-6 shadow-lg mx-auto text-amber-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-amber-400" />
        Firebase Notification
      </h3>

      <div className="space-y-4">
        <button
          onClick={handleGetToken}
          className="w-full sm:w-auto px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-medium transition-colors"
        >
          Get FCM Token
        </button>

        {token && (
          <div className="bg-amber-900/30 p-3 rounded-lg text-sm break-all">
            <strong>Token:</strong> {token}
          </div>
        )}

        <div className="pt-4 space-y-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter Topic"
            className="w-full px-4 py-2 rounded-lg bg-amber-900 text-amber-50 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleSubscribe}
              className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
            >
              Subscribe Topic
            </button>
            <button
              onClick={handleUnsubscribe}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
            >
              Unsubscribe Topic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseNotificationCard;
