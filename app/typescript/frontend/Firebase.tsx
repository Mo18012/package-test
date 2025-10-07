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
  const [difficulty, setDifficulty] = useState<number | "">("");
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

      <div className="mb-4">
        <label className="block mb-2 font-medium">Enable Data Collection</label>
        <input
          type="checkbox"
          checked={collectionEnabled}
          onChange={(e) => setCollectionEnabled(e.target.checked)}
        />
        <button onClick={handleSetCollection} className="ml-3 bg-blue-400 px-3 py-1 rounded text-white">
          Set Collection
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserIdValue(e.target.value)}
          placeholder="Enter User ID"
          className="border p-1 rounded w-full"
        />
        <button onClick={handleSetUserId} className="mt-2 bg-blue-400 px-3 py-1 rounded text-white">
          Set User ID
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">User Property</label>
        <input
          type="text"
          value={propertyKey}
          onChange={(e) => setPropertyKey(e.target.value)}
          placeholder="Key"
          className="border p-1 rounded w-full mb-2"
        />
        <input
          type="text"
          value={propertyValue}
          onChange={(e) => setPropertyValue(e.target.value)}
          placeholder="Value"
          className="border p-1 rounded w-full"
        />
        <button onClick={handleSetUserProperty} className="mt-2 bg-blue-400 px-3 py-1 rounded text-white">
          Set Property
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Default Event Params</label>
        <input
          type="text"
          value={levelName}
          onChange={(e) => setLevelName(e.target.value)}
          placeholder="Level Name"
          className="border p-1 rounded w-full mb-2"
        />
        <input
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          placeholder="Difficulty (default 4)"
          className="border p-1 rounded w-full"
        />
        <button onClick={handleSetDefaultParams} className="mt-2 bg-blue-400 px-3 py-1 rounded text-white">
          Set Defaults
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Log Event</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          className="border p-1 rounded w-full mb-2"
        />
        <button onClick={handleLogEvent} className="mt-2 bg-blue-400 px-3 py-1 rounded text-white">
          Log Event
        </button>
      </div>

      <div>
        <label className="block mb-2 font-medium">Screen View</label>
        <input
          type="text"
          value={screenName}
          onChange={(e) => setScreenName(e.target.value)}
          placeholder="Screen Name"
          className="border p-1 rounded w-full mb-2"
        />
        <input
          type="text"
          value={screenClass}
          onChange={(e) => setScreenClass(e.target.value)}
          placeholder="Screen Class"
          className="border p-1 rounded w-full"
        />
        <button onClick={handleLogScreen} className="mt-2 bg-blue-400 px-3 py-1 rounded text-white">
          Log Screen
        </button>
      </div>
    </div>
  );
}
