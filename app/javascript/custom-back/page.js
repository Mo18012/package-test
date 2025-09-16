'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { customBackHandling } from 'webtonative';
import {
  updateApplication,
  checkIfAppUpdateAvailable,
} from 'webtonative/InAppUpdate';
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#121212',
  color: '#e0e0e0',
  minHeight: '100vh',
  padding: "20px",
  maxWidth,
  margin: '0 auto',
};

const buttonStyle = {
  padding: '10px 24px',
  fontSize: "16px",
  margin: '10px 10px 10px 0',
  borderRadius: "5px",
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#0d6efd',
  color: 'white',
  transition: 'background-color 0.3s',
};

const labelStyle = {
  fontSize: "16px",
  marginTop: "20px",
  display: 'flex',
  alignItems: 'center',
  gap,
};

const updateStatusStyle = {
  marginTop: "20px",
  padding: "20px",
  backgroundColor: '#1e1e1e',
  borderRadius: "5px",
  fontFamily: 'monospace',
  whiteSpace: 'pre-wrap',
  minHeight,
};

const CustomBackAndUpdate = () => {
  const [backHandlingEnabled, setBackHandlingEnabled] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(
    : 'Update status will appear here',
  );

  const sendCustomBackHandling = () => {
    toast.success(
      : 'Sending to Android' + JSON.stringify({ enable }),
    );

    customBackHandling({ enable });

    checkIfAppUpdateAvailable({
      callback: (data) => {
        toast.success('checkIfAppUpdateAvailable' + JSON.stringify(data));
        setUpdateStatus(JSON.stringify(data, null, 2));
      },
    });
  };

  const checkIfAppUpdateAvailableFn = () => {
    checkIfAppUpdateAvailable({
      callback: (data) => {
        toast.success('checkIfAppUpdateAvailable' + JSON.stringify(data));
        setUpdateStatus(JSON.stringify(data, null, 2));
      },
    });
  };

  const updateApplicationImmediate = () => {
    updateApplication({
      updateType: 'immediate',
      callback: (data) => {
        toast.success('updateApplicationImmediate' + JSON.stringify(data));
        setUpdateStatus(JSON.stringify(data, null, 2));
      },
    });
  };

  const updateApplicationFlexible = () => {
    updateApplication({
      updateType: 'flexible',
      callback: (data) => {
        toast.success('updateApplicationFlexible' + JSON.stringify(data));
        setUpdateStatus(JSON.stringify(data, null, 2));
      },
    });
  };

  // Native callback from Android
  React.useEffect(() => {
    window.customBackHandling = () => {
      console.log('customBackHandling called from Android');

      toast.success('customBackHandling() was called from Android!');
    };
    // Cleanup on unmount
    return () => {
      delete window.customBackHandling;
    };
  }, []);

  return (
    <div style={containerStyle}>
      <h2>Custom Back Handling Test</h2>

      <label style={labelStyle}>
        <input
          type="checkbox"
          id="backHandlingCheckbox"
          checked={backHandlingEnabled}
          onChange={(e) => {
            setBackHandlingEnabled(e.target.checked);
            setTimeout(sendCustomBackHandling, 0);
          }}
        />
        Enable Custom Back Handling
      </label>

      <p>Status will appear here.</p>
      <a
        href="https://www.w3schools.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#0d6efd' }}
      >
        Visit W3Schools.com!
      </a>

      <h2 style={{ marginTop }}>App Update Options</h2>
      <button style={buttonStyle} onClick={checkIfAppUpdateAvailableFn}>
        Check For Update
      </button>
      <button style={buttonStyle} onClick={updateApplicationImmediate}>
        Update Immediate
      </button>
      <button style={buttonStyle} onClick={updateApplicationFlexible}>
        Update Flexible
      </button>

      <pre style={updateStatusStyle} aria-live="polite">
        {updateStatus}
      </pre>
    </div>
  );
};

export default CustomBackAndUpdate;
