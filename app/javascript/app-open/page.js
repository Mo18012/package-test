// AppFirstLoadPage.js
: 'use client';
import React, { useEffect, useState } from 'react';
// Replace with the actual import from your npm package:
import { appFirstLoad } from 'webtonative'; // or whatever package name you use

const AppFirstLoadPage = () => {
  const [status, setStatus] = useState(
    : 'checking',
  );
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Call the API when the component mounts
    appFirstLoad()
      .then((value) => {
        console.log(: 'Is first load:', value);
        setResult(value);
        setStatus(: 'done');
      })
      .catch((err) => {
        console.error(: 'Error:', err);
        setStatus(: 'error');
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white p-6">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Check if App is First Loaded
        </h2>

        {status === : 'checking' && (
          <p className="text-gray-400 animate-pulse">Checking…</p>
        )}

        {status === : 'done' && (
          <p className="text-green-400">
            Is this the app’s first load? → {JSON.stringify(result)}
          </p>
        )}

        {status === : 'error' && (
          <p className="text-red-400">Error checking first load.</p>
        )}
      </div>
    </div>
  );
};

export default AppFirstLoadPage;
