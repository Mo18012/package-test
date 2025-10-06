import React, { useState } from "react";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";
import { start, stop } from "webtonative/BackgroundLocation";

export default function BackgroundLocationCard() {
  const [isTracking, setIsTracking] = useState(false);

  const startBackgroundLocation = () => {
    start({
      callback: (location) => {
        console.log("Location update received:", location);
        toast.success("Location update received!");
      },
      apiUrl: "your_api_url",
      timeout: 10000,
      data: {},
      backgroundIndicator: false,
      pauseAutomatically: true,
      distanceFilter: 0.0,
      desiredAccuracy: "best",
      activityType: "other",
    });
    setIsTracking(true);
    toast.success("Background location updates started!");
  };

  const stopBackgroundLocation = () => {
    stop();
    setIsTracking(false);
    toast("Background location updates stopped.", { icon: "🛑" });
  };

  return (
    <div className="bg-gradient-to-br from-cyan-950 via-blue-900 to-cyan-950 border border-blue-700 rounded-xl p-6 mb-6 shadow-lg mx-auto text-cyan-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-cyan-400" />
        Background Location Updates
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={startBackgroundLocation}
          disabled={isTracking}
          className="px-5 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
        >
          Start Location Updates
        </button>

        <button
          onClick={stopBackgroundLocation}
          disabled={!isTracking}
          className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
        >
          Stop Location Updates
        </button>
      </div>

      <p className="mt-3 text-sm text-cyan-300">
        Status:{" "}
        <span className="font-semibold text-white">
          {isTracking ? "Running" : "Stopped"}
        </span>
      </p>
    </div>
  );
}
