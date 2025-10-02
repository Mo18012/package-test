'use client';
import React, { useState } from "react";

// Import SDK functions
import { 
  setExternalUserId as oneSignalSetExternalUserId,
  removeExternalUserId,
  setTags,
  addTrigger,
  removeTrigger,
  getTriggerValue,
  getPlayerId,
  setEmail as oneSignalSetEmail,
  logoutEmail,
  setSMSNumber,
  logoutSMSNumber
} from "webtonative/OneSignal";

const OneSignalDemo: React.FC = () => {
  // Local state (renamed setters to avoid conflicts)
  const [externalUserId, setExternalUserIdState] = useState("");
  const [tag, setTag] = useState("");
  const [triggerKey, setTriggerKey] = useState("");
  const [triggerValue, setTriggerValue] = useState("");
  const [removeTriggerKey, setRemoveTriggerKey] = useState("");
  const [getTriggerKey, setGetTriggerKey] = useState("");
  const [email, setEmailState] = useState("");
  const [smsNumber, setSmsNumberState] = useState("");

  // === OneSignal Functions ===
  const getPlayerIdFn = () => {
    getPlayerId().then((playerId: string) => {
      alert(playerId || "Player Id not available");
    });
  };

  const handleSetExternalUserId = () =>
    oneSignalSetExternalUserId(externalUserId);

  const handleRemoveExternalUserId = () =>
    removeExternalUserId();

  const handleSetTag = () =>
    setTags({ tags: { type: tag } });

  const handleAddTrigger = () =>
    addTrigger({ key: triggerKey, value: triggerValue });

  const handleRemoveTrigger = () =>
    removeTrigger({ key: removeTriggerKey });

  const handleGetTrigger = () =>
    getTriggerValue({
      key: getTriggerKey,
      callback: (data: any) => alert(JSON.stringify(data)),
    });

  const handleSetEmail = () =>
    oneSignalSetEmail({ emailId: email });

  const handleLogoutEmail = () =>
    logoutEmail();

  const handleSetSmsNumber = () =>
    setSMSNumber({ smsNumber });

  const handleLogoutSmsNumber = () =>
    logoutSMSNumber();

  return (
    <div className="p-4 bg-red-600 rounded-lg border border-gray-400 max-w-md mx-auto my-6 text-white space-y-6">
      <h3 className="text-center text-xl font-bold">
        OneSignal Push Notification
      </h3>

      {/* Get Player Id */}
      <div>
        <label>1. Get Player Id</label>
        <button
          onClick={getPlayerIdFn}
          className="ml-2 bg-white text-red-600 px-3 py-1 rounded"
        >
          Get Id
        </button>
      </div>

      {/* External User Id */}
      <div>
        <label>2. Set External UserId:</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={externalUserId}
            onChange={(e) => setExternalUserIdState(e.target.value)}
            placeholder="Enter user Id"
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={handleSetExternalUserId}
            className="bg-white text-red-600 px-3 py-1 rounded"
          >
            Set Id
          </button>
        </div>
        <button
          onClick={handleRemoveExternalUserId}
          className="mt-2 bg-white text-red-600 px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>

      {/* Tags */}
      <div>
        <label>3. Set Tag:</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter Tag"
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={handleSetTag}
            className="bg-white text-red-600 px-3 py-1 rounded"
          >
            Set
          </button>
        </div>
      </div>

      {/* Triggers */}
      <div>
        <label>4. Add Trigger:</label>
        <input
          type="text"
          value={triggerKey}
          onChange={(e) => setTriggerKey(e.target.value)}
          placeholder="Key"
          className="w-full p-2 mt-1 rounded text-black"
        />
        <input
          type="text"
          value={triggerValue}
          onChange={(e) => setTriggerValue(e.target.value)}
          placeholder="Value"
          className="w-full p-2 mt-1 rounded text-black"
        />
        <button
          onClick={handleAddTrigger}
          className="mt-2 bg-white text-red-600 px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      <div>
        <label>5. Remove Trigger:</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={removeTriggerKey}
            onChange={(e) => setRemoveTriggerKey(e.target.value)}
            placeholder="Enter Key"
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={handleRemoveTrigger}
            className="bg-white text-red-600 px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      </div>

      <div>
        <label>6. Get Trigger:</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={getTriggerKey}
            onChange={(e) => setGetTriggerKey(e.target.value)}
            placeholder="Enter Key"
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={handleGetTrigger}
            className="bg-white text-red-600 px-3 py-1 rounded"
          >
            Get
          </button>
        </div>
      </div>

      {/* Email */}
      <div>
        <label>7. Set Email:</label>
        <div className="flex gap-2 mt-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmailState(e.target.value)}
            placeholder="Enter Email"
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={handleSetEmail}
            className="bg-white text-red-600 px-3 py-1 rounded"
          >
            Set
          </button>
        </div>
        <button
          onClick={handleLogoutEmail}
          className="mt-2 bg-white text-red-600 px-3 py-1 rounded"
        >
          Logout Email
        </button>
      </div>

      {/* SMS */}
      <div>
        <label>8. Set SMS Number:</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={smsNumber}
            onChange={(e) => setSmsNumberState(e.target.value)}
            placeholder="+911234567890"
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={handleSetSmsNumber}
            className="bg-white text-red-600 px-3 py-1 rounded"
          >
            Set
          </button>
        </div>
        <button
          onClick={handleLogoutSmsNumber}
          className="mt-2 bg-white text-red-600 px-3 py-1 rounded"
        >
          Logout SMS
        </button>
      </div>
    </div>
  );
};

export default OneSignalDemo;
