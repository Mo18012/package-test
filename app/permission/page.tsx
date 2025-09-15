'use client';
import React, { useState } from 'react';
import {
  checkPermission,
  openAppSettingForPermission,
  showPermission,
} from 'webtonative';

const containerStyle: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#121212',
  color: '#e0e0e0',
  minHeight: '100vh',
  padding: 40,
  maxWidth: 600,
  margin: '0 auto',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 24,
  marginBottom: 12,
};

const selectStyle: React.CSSProperties = {
  fontSize: 24,
  padding: '8px',
  borderRadius: 6,
  border: '1px solid #444',
  backgroundColor: '#1e1e1e',
  color: '#e0e0e0',
  width: '100%',
  maxWidth: 300,
  marginBottom: 20,
};

const buttonStyle: React.CSSProperties = {
  fontSize: 24,
  padding: '10px 24px',
  marginTop: 10,
  marginRight: 10,
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#0d6efd',
  color: '#fff',
  transition: 'background-color 0.3s',
};

const checkboxContainerStyle: React.CSSProperties = {
  marginTop: 20,
  marginBottom: 30,
  maxWidth: 320,
};

const checkboxLabelStyle: React.CSSProperties = {
  fontSize: 20,
  display: 'block',
  marginBottom: 14,
  cursor: 'pointer',
};

const outputStyle: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  padding: 15,
  borderRadius: 6,
  border: '1px solid #444',
  whiteSpace: 'pre-wrap',
  fontFamily: 'monospace',
  fontSize: 16,
  minHeight: 100,
};

const permissionsList = [
  'location',
  'record_audio',
  'notification',
  'bluetooth',
  'contact',
  'camera',
];

const WTNPermissionManager: React.FC = () => {
  const [selectedPermission, setSelectedPermission] = useState('location');
  const [checkedPermissions, setCheckedPermissions] = useState<string[]>([]);
  const [resultOutput, setResultOutput] = useState('No result yet.');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPermission(e.target.value);
  };

  const handleCheckboxChange = (perm: string, checked: boolean) => {
    setCheckedPermissions((prev) => {
      if (checked) return [...prev, perm];
      return prev.filter((item) => item !== perm);
    });
  };

  const openAppSetting = () => {
    openAppSettingForPermission({
      values: selectedPermission,
      callback: (value: any) => {
        setResultOutput(
          `openAppSetting ${selectedPermission} callback:\n` +
            JSON.stringify(value, null, 2),
        );
      },
    });
  };

  const requestPermission = () => {
    showPermission({
      permission: selectedPermission,
      callback: (value: any) => {
        setResultOutput(
          'showPermission callback:\n' + JSON.stringify(value, null, 2),
        );
      },
    });
  };

  const requestPermissionWithDialog = () => {
    showPermission({
      permission: selectedPermission,
      openAppSetting: true,
      alertDialogStyle: {
        title: selectedPermission.toUpperCase() + ' Permission',
        message:
          'This app needs access to ' +
          selectedPermission.replace('_', ' ') +
          '.',
        positiveButtonText: 'Allow',
        negativeButtonText: 'Deny',
      },
      callback: (value: any) => {
        setResultOutput(
          'showPermission (with dialog) callback:\n' +
            JSON.stringify(value, null, 2),
        );
      },
    });
  };

  const checkSelectedPermissions = () => {
    if (checkedPermissions.length === 0) {
      setResultOutput('❗ No permissions selected.');
      return;
    }

    checkPermission({
      permissionName: checkedPermissions,
      callback: (value: any) => {
        setResultOutput(
          'checkPermission callback:\n' + JSON.stringify(value, null, 2),
        );
      },
    });
  };

  return (
    <div style={containerStyle}>
      <h2>WTN Permission Handler</h2>

      <label htmlFor="permissionSelect" style={labelStyle}>
        Select One Permission:
      </label>
      <select
        id="permissionSelect"
        value={selectedPermission}
        onChange={handleSelectChange}
        style={selectStyle}
      >
        {permissionsList.map((perm) => (
          <option value={perm} key={perm}>
            {perm}
          </option>
        ))}
      </select>

      <button type="button" style={buttonStyle} onClick={openAppSetting}>
        Open App Setting
      </button>
      <br />
      <br />
      <button type="button" style={buttonStyle} onClick={requestPermission}>
        Request Permission
      </button>
      <br />
      <br />
      <button
        type="button"
        style={buttonStyle}
        onClick={requestPermissionWithDialog}
      >
        Request with Dialog
      </button>

      <h3 style={{ marginTop: 60 }}>Check Multiple Permissions:</h3>
      <div style={checkboxContainerStyle}>
        {permissionsList.map((perm) => (
          <label key={perm} style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="perm"
              value={perm}
              onChange={(e) => handleCheckboxChange(perm, e.target.checked)}
              checked={checkedPermissions.includes(perm)}
            />{' '}
            {perm.charAt(0).toUpperCase() + perm.slice(1).replace('_', ' ')}
          </label>
        ))}
      </div>

      <button
        type="button"
        style={buttonStyle}
        onClick={checkSelectedPermissions}
      >
        Check Selected Permissions
      </button>

      <h3 style={{ marginTop: 40 }}>Permission Result:</h3>
      <pre id="resultOutput" style={outputStyle}>
        {resultOutput}
      </pre>
    </div>
  );
};

export default WTNPermissionManager;
