"use client";

import React, { useState } from "react";
import {
  setCollection,
  setUserId,
  setDefaultEventParameters,
  setUserProperty,
  logEvent,
  logScreen,
} from "webtonative/Firebase/Analytics";
import toast from "react-hot-toast";

export default function FirebaseAnalyticsPage() {
  const [collectionEnabled, setCollectionEnabled] = useState(false);
  const [userId, setUserIdValue] = useState("");
  const [propertyKey, setPropertyKey] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [levelName, setLevelName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [eventName, setEventName] = useState("");
  const [screenName, setScreenName] = useState("");
  const [screenClass, setScreenClass] = useState("");

  const handleSetCollection = () => {
    setCollection({ enabled: collectionEnabled });
    toast.success(`Collection set to ${collectionEnabled}`);
  };

  const handleSetUserId = () => {
    setUserId({ userId });
    toast.success(`User ID set: ${userId}`);
  };

  const handleSetUserProperty = () => {
    setUserProperty({ key: propertyKey, value: propertyValue });
    toast.success(`Property set: ${propertyKey} = ${propertyValue}`);
  };

  const handleSetDefaultParams = () => {
    const diff = difficulty || 4;
    setDefaultEventParameters({
      parameters: { level_name: levelName, level_difficulty: diff },
    });
    toast.success("Default event parameters set");
  };

  const handleLogEvent = () => {
    const diff = difficulty || 4;
    logEvent({
      eventName,
      parameters: { level_name: levelName, level_difficulty: diff },
    });
    toast.success(`Event '${eventName}' logged`);
  };

  const handleLogScreen = () => {
    logScreen({ screenName, screenClass });
    toast.success(`Screen logged: ${screenName}`);
  };

  return (
    <div className="p-6 border rounded-lg bg-yellow-100 border-gray-400">
      <h3 className="text-center mb-4 text-xl font-semibold">
        Firebase Analytics
      </h3>

      {/* Rest same UI as TSX version */}
    </div>
  );
}
