// AppFirstLoadPage.js
'use client';
import React, { useEffect, useState } from 'react';
// Replace with the actual import from your npm package:
import { appFirstLoad } from 'webtonative'; // or whatever package name you use

const AppFirstLoadPage = () => {
  const [status, setStatus] = useState(
    'checking',
  );
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Call the API when the component mounts
    appFirstLoad()
      .then((value) => {
        console.log('Is first load:', value);
        setResult(value);
        setStatus('done');
      })
      .catch((err) => {
        console.error('Error:', err);
        setStatus('error');
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">App First Load Check</h1>
      
      {status === 'checking' && (
        <p>Checking if this is the first time the app has been opened...</p>
      )}
      
      {status === 'done' && (
        <div>
          <p>Check complete!</p>
          <p>Is first load: {result ? 'Yes' : 'No'}</p>
        </div>
      )}
      
      {status === 'error' && (
        <p className="text-red-500">Error checking app first load status.</p>
      )}
      </div>
    </div>
  );
};

export default AppFirstLoadPage;
