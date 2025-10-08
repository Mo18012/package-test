"use client";
import React from "react";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";
import { request, status } from "webtonative/ATTConsent";

export default function IOSAppTrackingTransparencyCard() {
  const handleRequestPermission = () => {
    try {
      request({
        callback: (result) => {
          if (result?.granted) {
            toast.success("✅ Permission Granted");
          } else {
            toast.error("❌ Permission Denied or Restricted");
          }
        },
      });
    } catch (err) {
      console.error("Error requesting ATT permission:", err);
      toast.error("Error requesting permission");
    }
  };

  const handleCheckStatus = () => {
    try {
      status({
        callback: (result) => {
          if (result?.status) {
            toast(`📱 Status: ${result.status}`);
          } else {
            toast.error("Could not fetch permission status");
          }
        },
      });
    } catch (err) {
      console.error("Error fetching ATT status:", err);
      toast.error("Error fetching status");
    }
  };

  return (
    <div className="bg-white border-2 border-red-400 rounded-2xl p-6 mb-6 shadow-md">
      <h3 className="text-xl font-semibold text-center mb-4 flex justify-center items-center gap-2 text-red-600">
        <Eye className="w-5 h-5" />
        iOS App Tracking Transparency
      </h3>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleRequestPermission}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-yellow-200 rounded-lg transition-colors"
        >
          Request Permission
        </button>

        <button
          onClick={handleCheckStatus}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-yellow-200 rounded-lg transition-colors"
        >
          Check Status
        </button>
      </div>
    </div>
  );
}
