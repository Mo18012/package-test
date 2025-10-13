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

interface DatastoreResponse {
  success?: boolean;
  keyName?: string;
  value?: any;
  message?: string;
  [key: string]: any;
}

export default function NativeDatastorePage(){
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const parseValue = (val: string): any => {
    try {
      return eval("(" + val + ")");
    } catch {
      return val;
    }
  };

  const handleAction = (
    action:
      | "setApp"
      | "getApp"
      | "deleteApp"
      | "setCloud"
      | "getCloud"
      | "deleteCloud"
  ) => {
    const parsedValue = parseValue(value);

    const callback = (res: DatastoreResponse) => {
      console.log(`${action} ->`, res);
      setResponse(JSON.stringify(res, null, 2));
    };

    switch (action) {
      case "setApp":
        return setAppData({ keyName: key, value: parsedValue, callback });
      case "getApp":
        return getAppData({ keyName: key, callback });
      case "deleteApp":
        return deleteAppData({ keyName: key, callback });
      case "setCloud":
        return setCloudData({ keyName: key, value: parsedValue, callback });
      case "getCloud":
        return getCloudData({ keyName: key, callback });
      case "deleteCloud":
        return deleteCloudData({ keyName: key, callback });
    }
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
          onClick={() => handleAction("setApp")}
        >
          Set App Data
        </button>
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded"
          onClick={() => handleAction("getApp")}
        >
          Get App Data
        </button>
        <button
          className="bg-red-600 text-white px-3 py-2 rounded"
          onClick={() => handleAction("deleteApp")}
        >
          Delete App Data
        </button>

        <button
          className="bg-green-600 text-white px-3 py-2 rounded"
          onClick={() => handleAction("setCloud")}
        >
          Set Cloud Data
        </button>
        <button
          className="bg-green-600 text-white px-3 py-2 rounded"
          onClick={() => handleAction("getCloud")}
        >
          Get Cloud Data
        </button>
        <button
          className="bg-red-600 text-white px-3 py-2 rounded"
          onClick={() => handleAction("deleteCloud")}
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
