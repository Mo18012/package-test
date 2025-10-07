import React, { useState } from 'react';
import { Play, Pause, StopCircle } from 'lucide-react';
import mediaPlayer from 'webtonative/MediaPlayer';
const MediaPlayerCard = () => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const mediaPlayerStart = () => {
    mediaPlayer.playMedia({ url:mediaUrl, imageUrl });
  };
  const mediaPlayerPause = () => {
    mediaPlayer.pauseMedia();
  };
  const mediaPlayerStop = () => {
    mediaPlayer.stopMedia();
  };

  return (
    <div className="bg-gradient-to-br from-teal-950 via-emerald-900 to-teal-950 border border-emerald-700 rounded-xl p-5 mx-auto mb-6 shadow-lg">
      <h3 className="text-lg font-semibold text-emerald-100 mb-4">
        Media Player
      </h3>
      <input
        type="text"
        placeholder="Enter Media URL"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        className="w-full px-4 py-2 mb-3 rounded-lg bg-teal-900 text-emerald-100 placeholder-emerald-300 border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg bg-teal-900 text-emerald-100 placeholder-emerald-300 border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex gap-3">
        <button
          onClick={mediaPlayerStart}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-500 text-white transition-colors"
        >
          <Play size={16} /> Start
        </button>
        <button
          onClick={mediaPlayerPause}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-yellow-700 hover:bg-yellow-400 text-black transition-colors"
        >
          <Pause size={16} /> Pause
        </button>
        <button
          onClick={mediaPlayerStop}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-800 hover:bg-red-500 text-white transition-colors"
        >
          <StopCircle size={16} /> Stop
        </button>
      </div>
    </div>
  );
};

export default MediaPlayerCard;
