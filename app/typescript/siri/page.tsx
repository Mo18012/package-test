'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { addToSiri } from 'webtonative';
const SiriPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [suggestTest, setSuggestTest] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addToSiri({
      title: text,
      suggestedPhrase: suggestTest,
      actionUrl: url,
    });
    toast.success('Added to Siri');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Siri Integration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter title text"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">suggestTest</label>
             <input
              type="text"
              value={suggestTest}
              onChange={(e) => setSuggestTest(e.target.value)}
              placeholder="Enter suggest text"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2 rounded-md"
          >
            Add to Siri
          </button>
        </form>
      </div>
    </div>
  );
};

export default SiriPage;
