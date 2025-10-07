"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Mic } from "lucide-react";
import { addToSiri } from "webtonative/Siri";

const AddToSiriCard: React.FC = () => {
  const [actionUrl, setActionUrl] = useState("");
  const [title, setTitle] = useState("");
  const [suggestedPhrase, setSuggestedPhrase] = useState("");

  const handleAddToSiri = () => {
    if (!actionUrl || !title) {
      toast.error("Please enter both Action URL and Title.");
      return;
    }

    addToSiri({
      actionUrl,
      title,
      suggestedPhrase,
    });

    toast.success("Added to Siri successfully!");
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg mx-auto text-slate-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Mic className="w-5 h-5 text-cyan-400" />
        Add To Siri Feature
      </h3>

      <div className="space-y-4">
        <input
          type="url"
          required
          value={actionUrl}
          onChange={(e) => setActionUrl(e.target.value)}
          placeholder="Enter Action URL"
          className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="text"
          value={suggestedPhrase}
          onChange={(e) => setSuggestedPhrase(e.target.value)}
          placeholder="Enter Suggested Phrase"
          className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          onClick={handleAddToSiri}
          className="w-full sm:w-auto px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
        >
          Add To Siri
        </button>
      </div>
    </div>
  );
};

export default AddToSiriCard;
