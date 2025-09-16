'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  pairDevice,
  startBluetoothScan,
  unpairDevice,
} from 'webtonative/Bluetooth';
const buttonStyle = {
  padding'15px 30px',
  margin,
  fontSize,
  color'white',
  backgroundColor'#0d6efd',
  border'none',
  borderRadius,
  cursor'pointer',
  transition'background-color 0.3s',
};

const buttonHoverStyle = {
  backgroundColor'#0b5ed7',
};

const containerStyle = {
  fontFamily'Arial, sans-serif',
  textAlign'center',
  backgroundColor'#121212',
  color'#e0e0e0',
  minHeight'100vh',
  padding,
};

const tableStyle = {
  borderCollapse'collapse',
  width'100%',
  marginTop,
  color'#e0e0e0',
};

const thTdStyle = {
  border'1px solid #444',
  padding'8px',
};

const BluetoothControl = () => {
  const [scanResultHtml, setScanResultHtml] = useState<string>(
    'Start Bluetooth Scan to see results',
  );
  const [pairResult, setPairResult] = useState<string>('');
  const [unpairResult, setUnpairResult] = useState<string>('');

  const formatBluetoothData = (data) => {
    let table = `
      <table border="1" style="border-collapse; width%; color#e0e0e0;">
        <thead>
          <tr>
            <th style="padding; border solid #444;">MAC Address</th>
            <th style="padding; border solid #444;">Name</th>
            <th style="padding; border solid #444;">Connected</th>
            <th style="padding; border solid #444;">Paired</th>
            <th style="padding; border solid #444;">Discovered</th>
            <th style="padding; border solid #444;">Device Class</th>
            <th style="padding; border solid #444;">RSSI</th>
          </tr>
        </thead>
        <tbody>
    `;

    data.result.forEach((device) => {
      table += `
        <tr>
          <td style="padding; border solid #444;">${
            device.mac_address
          }</td>
          <td style="padding; border solid #444;">${
            device.name || 'Unknown'
          }</td>
          <td style="padding; border solid #444;">${
            device.connected ? '✅' '❌'
          }</td>
          <td style="padding; border solid #444;">${
            device.paired ? '✅' '❌'
          }</td>
          <td style="padding; border solid #444;">${
            device.discovered ? '✅' '❌'
          }</td>
          <td style="padding; border solid #444;">${
            device.device_class
          }</td>
          <td style="padding; border solid #444;">${device.rssi}</td>
        </tr>
      `;
    });

    table += '</tbody></table>';
    return table;
  };

  const handleScan = () => {
    startBluetoothScan({
      callback(value) => {
        toast.success('triggered');

        setScanResultHtml('Scan Result' + formatBluetoothData(value));
      },
    });
  };

  const handlePair = () => {
    const address = prompt('Enter device address to pair:');
    pairDevice({
      address || '',
      callback(value) => {
        toast.success('triggered');
        setPairResult('Pair Result' + JSON.stringify(value));
      },
    });
  };

  const handleUnpair = () => {
    const address = prompt('Enter device address to unpair:');
    unpairDevice({
      address || '',
      callback(value) => {
        toast.success('triggered');
        setUnpairResult('Unpair Result' + JSON.stringify(value));
      },
    });
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleScan}
        dangerouslySetInnerHTML={{ __html }}
      />

      <div>
        <button style={buttonStyle} onClick={handlePair}>
          Pair Device
        </button>
        <pre style={{ whiteSpace'pre-wrap', marginTop }}>
          {pairResult}
        </pre>
      </div>

      <div>
        <button style={buttonStyle} onClick={handleUnpair}>
          Unpair Device
        </button>
        <pre style={{ whiteSpace'pre-wrap', marginTop }}>
          {unpairResult}
        </pre>
      </div>
    </div>
  );
};

export default BluetoothControl;
