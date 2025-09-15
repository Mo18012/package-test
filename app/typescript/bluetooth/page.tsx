'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  pairDevice,
  startBluetoothScan,
  unpairDevice,
} from 'webtonative/Bluetooth';
const buttonStyle: React.CSSProperties = {
  padding: '15px 30px',
  margin: 10,
  fontSize: 16,
  color: 'white',
  backgroundColor: '#0d6efd',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: '#0b5ed7',
};

const containerStyle: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
  backgroundColor: '#121212',
  color: '#e0e0e0',
  minHeight: '100vh',
  padding: 20,
};

const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: 20,
  color: '#e0e0e0',
};

const thTdStyle: React.CSSProperties = {
  border: '1px solid #444',
  padding: '8px',
};

const BluetoothControl: React.FC = () => {
  const [scanResultHtml, setScanResultHtml] = useState<string>(
    'Start Bluetooth Scan to see results',
  );
  const [pairResult, setPairResult] = useState<string>('');
  const [unpairResult, setUnpairResult] = useState<string>('');

  const formatBluetoothData = (data: any) => {
    let table = `
      <table border="1" style="border-collapse: collapse; width: 100%; color: #e0e0e0;">
        <thead>
          <tr>
            <th style="padding: 8px; border: 1px solid #444;">MAC Address</th>
            <th style="padding: 8px; border: 1px solid #444;">Name</th>
            <th style="padding: 8px; border: 1px solid #444;">Connected</th>
            <th style="padding: 8px; border: 1px solid #444;">Paired</th>
            <th style="padding: 8px; border: 1px solid #444;">Discovered</th>
            <th style="padding: 8px; border: 1px solid #444;">Device Class</th>
            <th style="padding: 8px; border: 1px solid #444;">RSSI</th>
          </tr>
        </thead>
        <tbody>
    `;

    data.result.forEach((device: any) => {
      table += `
        <tr>
          <td style="padding: 8px; border: 1px solid #444;">${
            device.mac_address
          }</td>
          <td style="padding: 8px; border: 1px solid #444;">${
            device.name || 'Unknown'
          }</td>
          <td style="padding: 8px; border: 1px solid #444;">${
            device.connected ? '✅' : '❌'
          }</td>
          <td style="padding: 8px; border: 1px solid #444;">${
            device.paired ? '✅' : '❌'
          }</td>
          <td style="padding: 8px; border: 1px solid #444;">${
            device.discovered ? '✅' : '❌'
          }</td>
          <td style="padding: 8px; border: 1px solid #444;">${
            device.device_class
          }</td>
          <td style="padding: 8px; border: 1px solid #444;">${device.rssi}</td>
        </tr>
      `;
    });

    table += '</tbody></table>';
    return table;
  };

  const handleScan = () => {
    startBluetoothScan({
      callback: (value: any) => {
        toast.success('triggered');

        setScanResultHtml('Scan Result: ' + formatBluetoothData(value));
      },
    });
  };

  const handlePair = () => {
    const address = prompt('Enter device address to pair:');
    pairDevice({
      address: address || '',
      callback: (value: any) => {
        toast.success('triggered');
        setPairResult('Pair Result: ' + JSON.stringify(value));
      },
    });
  };

  const handleUnpair = () => {
    const address = prompt('Enter device address to unpair:');
    unpairDevice({
      address: address || '',
      callback: (value: any) => {
        toast.success('triggered');
        setUnpairResult('Unpair Result: ' + JSON.stringify(value));
      },
    });
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleScan}
        dangerouslySetInnerHTML={{ __html: scanResultHtml }}
      />

      <div>
        <button style={buttonStyle} onClick={handlePair}>
          Pair Device
        </button>
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>
          {pairResult}
        </pre>
      </div>

      <div>
        <button style={buttonStyle} onClick={handleUnpair}>
          Unpair Device
        </button>
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>
          {unpairResult}
        </pre>
      </div>
    </div>
  );
};

export default BluetoothControl;
