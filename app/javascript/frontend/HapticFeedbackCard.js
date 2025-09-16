import { useState } from 'react';
import { trigger } from 'webtonative/Haptics';
export default function HapticFeedbackCard() {
  const [effect, setEffect] = useState('');

  const hapticFeedbackFun = () => {
    trigger({ effect });
  };

  return (
    <div className="bg-gradient-to-r from-[#1b2735] to-[#243b55] border-l-4 border-cyan-400 rounded-2xl p-6 mb-6 mx-auto shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Haptic Feedback</h3>
      <div className="flex gap-3">
        <input
          type="text"
          value={effect}
          onChange={(e) => setEffect(e.target.value)}
          placeholder="Enter Effect"
          className="flex-1 px-4 py-2 bg-[#2c3e50] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onClick={hapticFeedbackFun}
          className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg"
        >
          Trigger
        </button>
      </div>
    </div>
  );
