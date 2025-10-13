"use client";
import React, { useState } from "react";
import {
  setAppData,
  getAppData,
  deleteAppData,
  setCloudData,
  getCloudData,
  deleteCloudData,
} from "webtonative/NativeDatastore";

export default function NativeDatastorePage() {
  const [response, setResponse] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  // Helper to safely parse JSON or JS-like values
  const parseValue = (val) => {
    try {
      return eval("(" + val + ")");
    } catch {
      return val;
    }
  };

  const handleSetAppData = () => {
    setAppData({
      keyName: key,
      value: parseValue(value),
      callback: (res) => {
        console.log("Set App Data:", res);
        setResponse(JSON.stringify(res));
      },
    });
  };

  const handleGetAppData = () => {
    getAppData({
      keyName: key,
      callback: (res) => {
        console.log("Get App Data:", res);
        setResponse(JSON.stringify(res));
      },
    });
  };

  const handleDeleteAppData = () => {
    deleteAppData({
      keyName: key,
      callback: (res) => {
        console.log("Delete App Data:", res);
        setResponse(JSON.stringify(res));
      },
    });
  };

  const handleSetCloudData = () => {
    setCloudData({
      keyName: key,
      value: parseValue(value),
      callback: (res) => {
        console.log("Set Cloud Data:", res);
        setResponse(JSON.stringify(res));
      },
    });
  };

  const handleGetCloudData = () => {
    getCloudData({
      keyName: key,
      callback: (res) => {
        console.log("Get Cloud Data:", res);
        setResponse(JSON.stringify(res));
      },
    });
  };

  const handleDeleteCloudData = () => {
    deleteCloudData({
      keyName: key,
      callback: (res) => {
        console.log("Delete Cloud Data:", res);
        setResponse(JSON.stringify(res));
      },
    });
  };

  return (
    <div className="p-5 max-w-2xl mx-auto space-y-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-center">Native Datastore</h2>

      <div>
        <label>Key:</label>
        <input
          className="border w-full p-2 rounded mt-1"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <div>
        <label>Value (JSON, String, Number, etc.):</label>
        <textarea
          className="border w-full p-2 rounded mt-1"
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded"
          onClick={handleSetAppData}
        >
          Set App Data
        </button>
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded"
          onClick={handleGetAppData}
        >
          Get App Data
        </button>
        <button
          className="bg-red-600 text-white px-3 py-2 rounded"
          onClick={handleDeleteAppData}
        >
          Delete App Data
        </button>

        <button
          className="bg-green-600 text-white px-3 py-2 rounded"
          onClick={handleSetCloudData}
        >
          Set Cloud Data
        </button>
        <button
          className="bg-green-600 text-white px-3 py-2 rounded"
          onClick={handleGetCloudData}
        >
          Get Cloud Data
        </button>
        <button
          className="bg-red-600 text-white px-3 py-2 rounded"
          onClick={handleDeleteCloudData}
        >
          Delete Cloud Data
        </button>
      </div>

      <p className="bg-white border p-3 rounded text-sm break-words">
        <strong>Response:</strong> {response || "No response yet"}
      </p>
    </div>
  );
}
