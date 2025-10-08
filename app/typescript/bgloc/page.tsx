"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";
import { start, stop } from "webtonative/BackgroundLocation";



export default function BackgroundLocationCard() {
  const [callback, setCallback] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [data, setData] = useState("");
  const [desiredAccuracy, setDesiredAccuracy] = useState<'best' | 'bestForNavigation' | 'nearestTenMeters' | 'hundredMeters' | 'kilometer' | 'threeKilometers'>("best");
  const [activityType, setActivityType] = useState< 'other' | 'automotiveNavigation' | 'fitness' | 'otherNavigation'>("other");
  const [backgroundIndicator, setBackgroundIndicator] = useState(false);
  const [pauseAutomatically, setPauseAutomatically] = useState(true);

  const handleStart = () => {
    try {
      start({
      //  callback: callback || undefined,
        apiUrl: apiUrl || undefined,
        timeout: 50,
        data: data || undefined,
        backgroundIndicator,
        pauseAutomatically,
        distanceFilter: 0.0,
        desiredAccuracy,
        activityType,
      });
      toast.success("Background Location started!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to start background location.");
    }
  };

  const handleStop = () => {
    try {
      stop();
      toast.success("Background Location stopped!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to stop background location.");
    }
  };

  return (
    <div className="bg-[#f9f9f9] border border-green-600 rounded-2xl p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-semibold text-center mb-6 flex justify-center items-center gap-2 text-green-700">
        <MapPin className="w-5 h-5" /> Background Location
      </h3>

      <div className="flex flex-col gap-4">
        {/* <label className="text-sm">Callback:</label>
        <input
          type="text"
          value={callback}
          onChange={(e) => setCallback(e.target.value as string)}
          placeholder="Optional if API URL is provided"
          className="p-2 border rounded-md"
        /> */}

        <label className="text-sm">API URL:</label>
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="Optional if callback is provided"
          className="p-2 border rounded-md"
        />

        <label className="text-sm">Data:</label>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter data (optional)"
          className="p-2 border rounded-md"
        />

        <label className="text-sm">Desired Accuracy:</label>
        <input
          type="text"
          value={desiredAccuracy}
          onChange={(e) => setDesiredAccuracy(e.target.value as 'best' | 'bestForNavigation' | 'nearestTenMeters' | 'hundredMeters' | 'kilometer' | 'threeKilometers')}
          placeholder="Default: best"
          className="p-2 border rounded-md"
        />

        <label className="text-sm">Activity Type:</label>
        <input
          type="text"
          value={activityType}
          onChange={(e) => setActivityType(e.target.value as  'other' | 'automotiveNavigation' | 'fitness' | 'otherNavigation')}
          placeholder="Default: other"
          className="p-2 border rounded-md"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={backgroundIndicator}
            onChange={(e) => setBackgroundIndicator(e.target.checked)}
          />
          Background Indicator (iOS)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={pauseAutomatically}
            onChange={(e) => setPauseAutomatically(e.target.checked)}
          />
          Pause Automatically (iOS)
        </label>

        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={handleStart}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
