"use client";
import { useState } from "react";
import { bannerAd, fullScreenAd, rewardsAd } from "webtonative/AdMob";

export default function AdMobCard() {
  const [bannerId, setBannerId] = useState("ca-app-pub-3940256099942544/6300978111");
  const [fullScreenId, setFullScreenId] = useState("ca-app-pub-3940256099942544/1033173712");
  const [rewardsId, setRewardsId] = useState("ca-app-pub-3940256099942544/5224354917");
  const [status, setStatus] = useState("Ad Status: Waiting...");

  const showBannerAd = () => {
    bannerAd({ adId: bannerId });
    setStatus("Banner Ad shown.");
  };

  const showFullScreenAd = () => {
    fullScreenAd({
      adId: fullScreenId,
      fullScreenAdCallback: (value) => {
        console.log("Full screen ad callback:", value);
        setStatus("Full screen ad shown.");
      },
    });
  };

  const showRewardsAd = () => {
    rewardsAd({
      adId: rewardsId,
      rewardsAdCallback: (value) => {
        console.log("Rewards ad callback:", value);
        setStatus("Rewards ad shown.");
      },
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#1b2735] to-[#243b55] border-l-4 border-cyan-400 rounded-2xl p-6 mb-6 mx-auto shadow-lg text-white space-y-6">
      <h3 className="text-lg font-semibold mb-4">AdMob</h3>

      {/* Banner Ad */}
      <div>
        <label className="block mb-1 text-sm">Show Banner Ad</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={bannerId}
            onChange={(e) => setBannerId(e.target.value)}
            placeholder="Enter Banner ID"
            className="flex-1 px-4 py-2 bg-[#2c3e50] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={showBannerAd}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg"
          >
            Show
          </button>
        </div>
      </div>

      {/* Full Screen Ad */}
      <div>
        <label className="block mb-1 text-sm">Show Full Screen Ad</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={fullScreenId}
            onChange={(e) => setFullScreenId(e.target.value)}
            placeholder="Enter Fullscreen ID"
            className="flex-1 px-4 py-2 bg-[#2c3e50] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={showFullScreenAd}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg"
          >
            Show
          </button>
        </div>
      </div>

      {/* Rewards Ad */}
      <div>
        <label className="block mb-1 text-sm">Show Rewards Ad</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={rewardsId}
            onChange={(e) => setRewardsId(e.target.value)}
            placeholder="Enter Rewards ID"
            className="flex-1 px-4 py-2 bg-[#2c3e50] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={showRewardsAd}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg"
          >
            Show
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 text-sm font-medium text-gray-300">{status}</div>
    </div>
  );
}
