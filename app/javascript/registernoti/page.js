'use client';
import React, { useEffect, useState } from 'react';
import { registerNotification } from 'webtonative';

export default function NotificationPermission() {
  const [platform, setPlatform] = useState('unknows');
  const [output, setOutput] = useState('waiting');

  // detect platform
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(ua)) setPlatform('android');
    else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream)
      setPlatform('ios');
    else setPlatform('unknown');
  }, []);

  // request iOS permission
  const handleIOSPermission = () => {
    registerNotification({
      callback: (data) =>
        setOutput('📱 iOS callback JSON:\n' + JSON.stringify(data, null, 2)),
    });
  };

  // request Android permission
  const handleAndroidPermission = () => {
    registerNotification({
      callback: (data) =>
        setOutput(
          '🤖 Android callback JSON:\n' + JSON.stringify(data, null, 2),
        ),
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Notification Permission</h2>

      {platform === 'ios' && (
        <button
          style={{ background: '#007AFF', color: '#fff', padding: '10px' }}
          onClick={handleIOSPermission}
        >
          Request iOS Notification Permission
        </button>
      )}

      {platform === 'android' && (
        <button
          style={{ background: '#3DDC84', color: '#fff', padding: '10px' }}
          onClick={handleAndroidPermission}
        >
          Request Android Notification Permission
        </button>
      )}

      {platform === 'unknown' && <p>❌ Unknown platform detected.</p>}

      <pre
        style={{ background: '#f4f4f4', padding: '10px', marginTop: '20px' }}
      >
        {output}
      </pre>
    </div>
  );
}
