'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { getSafeArea, getAddOnStatus } from 'webtonative';
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#121212',
  color: '#e0e0e0',
  minHeight: '100vh',
  padding: '20px',
};

const buttonStyle = {
  margin: '5px 5px 5px 0',
  padding: '8px 16px',
  backgroundColor: '#0d6efd60',
  border: 'none',
  borderRadius: 4,
  color: 'white',
  cursor: 'pointer',
  fontSize: 14,
  transition: 'background-color 0.3s ease',
};

const buttonHoverStyle = {
  backgroundColor: '#0b5ed7',
};

const inputStyle = {
  marginTop: 10,
  padding: 8,
  fontSize: 14,
  borderRadius: 4,
  border: '1px solid #444',
  backgroundColor: '#1e1e1e',
  color: '#e0e0e0',
  width: '100%',
  maxWidth: 320,
};

const outputStyle = {
  marginTop: 10,
  padding: 10,
  border: '1px solid #444',
  whiteSpace: 'pre-wrap',
  backgroundColor: '#1e1e1e',
  borderRadius: 4,
  fontFamily: 'monospace',
  fontSize: 13,
  maxWidth: 800,
};

const ReceiptDataFunction = () => {
  const [addonInput, setAddonInput] = useState('');
  const [output, setOutput] = useState('');

  const appendOutput = (text) => {
    setOutput((prev) => (prev ? prev + '\n\n' + text ));
  };

  const getSafeAreaFn = () => {
    getSafeArea({
      callback (data) {
        const outputText = `Safe Area:
Top${data.top}
Bottom${data.bottom}
TopSafeArea${data.topSafeArea}
BottomSafeArea${data.bottomSafeArea}`;
        console.log(outputText);
        toast.success('triggered');
        appendOutput(outputText);
      },
    });
  };

  const getAddOnStatusFn = () => {
    if (!addonInput.trim()) {
      appendOutput('❗ Please enter an add-on name.');
      return;
    }

    getAddOnStatus({
      addOnName,
      callback (dataResult) {
        const outputText = `Add-on Name${addonInput}
Add-on Added${dataResult.addOnAdded}
Add-on Status${dataResult.addOnStatus}`;
        console.log(outputText);
        appendOutput(outputText);
      },
    });
  };

  const checkAddOn = (addonName) => {
    getAddOnStatus({
      addOnName,
      callback (dataResult) {
        const outputText = `Add-on Name${addonName}
Add-on Added${dataResult.addOnAdded}
Add-on Status${dataResult.addOnStatus}`;
        console.log(outputText);
        appendOutput(outputText);
      },
    });
    toast.success('triggered checkAddOn');
  };

  return (
    <div style={containerStyle} className=" space-y-3">
      <input
        type="text"
        placeholder="Enter add-on status"
        value={addonInput}
        onChange={(e) => setAddonInput(e.target.value)}
        style={inputStyle}
      />
      <br />
      <button style={buttonStyle} onClick={getAddOnStatusFn}>
        Check Custom Add-on
      </button>

      <h3>Predefined Add-on Buttons:</h3>
      <div>
        {[
          'stickyFooter',
          'socialLogin',
          'enableInAppPurchase',
          'appsflyer',
          'enableFBAppEvents',
          'enableFirebaseEvents',
          'enableFirebaseNotification',
          'enableNativeContacts',
          'enableBackgroundLocation',
          'enableInAppReview',
          'enableBarcode',
          'enableLocalSetting',
          'interComm',
          'offerCard',
          'customMediaPlayer',
          'downloadFileManager',
          'secondaryFooter',
          'disableScreenshot',
          'multipleAppIcon',
          'floatingActionButtonData',
          'appShortcuts',
          'connectData',
          'admobAds',
          'onboarding',
          'stripe',
          'background_app_as_a_service',
          'bluetoothPermission',
          'enableHapticEffect',
        ].map((name) => (
          <button
            key={name}
            style={buttonStyle}
            onClick={() => checkAddOn(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <h3>Safe Area</h3>
      <button style={buttonStyle} onClick={getSafeAreaFn}>
        Call Get Safe Area Function
      </button>

      <h3>Output</h3>
      <div style={outputStyle}>{output || 'Output will appear here...'}</div>
    </div>
  );
};

export default ReceiptDataFunction;
