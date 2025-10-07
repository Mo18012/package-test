"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Vibrate } from "lucide-react";
import { trigger } from "webtonative/Haptics";

export default function HapticFeedbackCard() {
  const [effect, setEffect] = useState<string>("");

  const handleHaptic = (effect) => {
    if (!effect) {
      toast.error("Please enter a haptic effect type.");
      return;
    }
    try {
      trigger({ effect });
      toast.success(`Triggered haptic effect: ${effect}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to trigger haptic feedback.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#1b2735] to-[#243b55] border-l-4 border-cyan-400 rounded-2xl p-6 mb-6 mx-auto shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Vibrate className="w-5 h-5 text-cyan-400" />
        Haptic Feedback
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={effect}
          onChange={(e) => setEffect(e.target.value)}
          placeholder="Enter effect (e.g. impactLight)"
          className="flex-1 px-4 py-2 bg-[#2c3e50] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={() => handleHaptic(effect)}
          className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
        >
          Trigger
        </button>
      </div>
    </div>
  );
}
