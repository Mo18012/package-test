'use client';
import React, { useState } from 'react';
import {
  checkPermission,
  openAppSettingForPermission,
  showPermission,
} from 'webtonative';

const containerStyle = {
  fontFamily'Arial, sans-serif',
  backgroundColor'#121212',
  color'#e0e0e0',
  minHeight'100vh',
  padding,
  maxWidth,
  margin'0 auto',
};

const labelStyle = {
  display'block',
  fontSize,
  marginBottom,
};

const selectStyle = {
  fontSize,
  padding'8px',
  borderRadius,
  border'1px solid #444',
  backgroundColor'#1e1e1e',
  color'#e0e0e0',
  width'100%',
  maxWidth,
  marginBottom,
};

const buttonStyle = {
  fontSize,
  padding'10px 24px',
  marginTop,
  marginRight,
  borderRadius,
  border'none',
  cursor'pointer',
  backgroundColor'#0d6efd',
  color'#fff',
  transition'background-color 0.3s',
};

const checkboxContainerStyle = {
  marginTop,
  marginBottom,
  maxWidth,
};

const checkboxLabelStyle = {
  fontSize,
  display'block',
  marginBottom,
  cursor'pointer',
};

const outputStyle = {
  backgroundColor'#1e1e1e',
  padding,
  borderRadius,
  border'1px solid #444',
  whiteSpace'pre-wrap',
  fontFamily'monospace',
  fontSize,
  minHeight,
};

const permissionsList = [
  'location',
  'record_audio',
  'notification',
  'bluetooth',
  'contact',
  'camera',
];

const WTNPermissionManager = () => {
  const [selectedPermission, setSelectedPermission] = useState('location');
  const [checkedPermissions, setCheckedPermissions] = useState<string[]>([]);
  const [resultOutput, setResultOutput] = useState('No result yet.');

  const handleSelectChange = (e.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPermission(e.target.value);
  };

  const handleCheckboxChange = (perm, checked) => {
    setCheckedPermissions((prev) => {
      if (checked) return [...prev, perm];
      return prev.filter((item) => item !== perm);
    });
  };

  const openAppSetting = () => {
    openAppSettingForPermission({
      values,
      callback(value) => {
        setResultOutput(
          `openAppSetting ${selectedPermission} callback:\n` +
            JSON.stringify(value, null, 2),
        );
      },
    });
  };

  const requestPermission = () => {
    showPermission({
      permission,
      callback(value) => {
        setResultOutput(
          'showPermission callback:\n' + JSON.stringify(value, null, 2),
        );
      },
    });
  };

  const requestPermissionWithDialog = () => {
    showPermission({
      permission,
      openAppSetting,
      alertDialogStyle{
        title.toUpperCase() + ' Permission',
        message:
          'This app needs access to ' +
          selectedPermission.replace('_', ' ') +
          '.',
        positiveButtonText'Allow',
        negativeButtonText'Deny',
      },
      callback(value) => {
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
      permissionName,
      callback(value) => {
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

      <h3 style={{ marginTop }}>Check Multiple Permissions:</h3>
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

      <h3 style={{ marginTop }}>Permission Result:</h3>
      <pre id="resultOutput" style={outputStyle}>
        {resultOutput}
      </pre>
    </div>
  );
};

export default WTNPermissionManager;
