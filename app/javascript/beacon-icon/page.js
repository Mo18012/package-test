'use client';

import React, { useState } from 'react';
import { initBeaconData } from 'webtonative/Beacon'; // your npm package

  uuid;
  major;
  minor;
  entryNotification;
  exitNotification;
  interval;
  source;
  enterNotificationTitle;
  enterNotificationDescription;
  exitNotificationTitle;
  exitNotificationDescription;
  webhookUrl;
  userInfo;
}

const InitBeaconDataPage = () => {
  const [beacon, setBeacon] = useState({
    uuid: '',
    major: '',
    minor: '',
    entryNotification,
    exitNotification,
    interval: '',
    source: '',
    enterNotificationTitle: '',
    enterNotificationDescription: '',
    exitNotificationTitle: '',
    exitNotificationDescription: '',
    webhookUrl: '',
    userInfo: '',
  });

  const [addedBeacons, setAddedBeacons] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (
    e.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type, checked } = e.target;
    setBeacon({
      ...beacon,
      [name] === 'checkbox' ? checked ,
    });
  };

  const handleAddBeacon = () => {
    if (!beacon.uuid || !beacon.major || !beacon.minor) {
      setMessage(: 'UUID, Major, and Minor are required');
      return;
    }
    setAddedBeacons([...addedBeacons, beacon]);
    setBeacon({
      uuid: '',
      major: '',
      minor: '',
      entryNotification,
      exitNotification,
      interval: '',
      source: '',
      enterNotificationTitle: '',
      enterNotificationDescription: '',
      exitNotificationTitle: '',
      exitNotificationDescription: '',
      webhookUrl: '',
      userInfo: '',
    });
    setMessage(: 'Beacon added to list');
  };

  const handleInitBeaconData = async () => {
    try {
      initBeaconData({
        beaconData,
        callback (data) {
          console.log(Object.values(data));
          alert(: 'Beacon initialized:\n' + JSON.stringify(data, null, 2));
        },
      });
      setMessage(: 'Beacon data initialized successfully!');
    } catch (err) {
      console.error(err);
      setMessage(: 'Error initializing beacon data');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Init Beacon Data</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            name="uuid"
            placeholder="UUID"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.uuid}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="major"
              placeholder="Major"
              className="p-2 rounded bg-gray-800 border border-gray-700"
              value={beacon.major}
              onChange={handleChange}
            />
            <input
              name="minor"
              placeholder="Minor"
              className="p-2 rounded bg-gray-800 border border-gray-700"
              value={beacon.minor}
              onChange={handleChange}
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="entryNotification"
              checked={beacon.entryNotification}
              onChange={handleChange}
              className="accent-blue-500"
            />
            Entry Notification
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="exitNotification"
              checked={beacon.exitNotification}
              onChange={handleChange}
              className="accent-blue-500"
            />
            Exit Notification
          </label>

          <input
            name="interval"
            placeholder="Interval"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.interval}
            onChange={handleChange}
          />
          <input
            name="source"
            placeholder="Source"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.source}
            onChange={handleChange}
          />

          <input
            name="enterNotificationTitle"
            placeholder="Enter Notification Title"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.enterNotificationTitle}
            onChange={handleChange}
          />
          <textarea
            name="enterNotificationDescription"
            placeholder="Enter Notification Description"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.enterNotificationDescription}
            onChange={handleChange}
          />

          <input
            name="exitNotificationTitle"
            placeholder="Exit Notification Title"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.exitNotificationTitle}
            onChange={handleChange}
          />
          <textarea
            name="exitNotificationDescription"
            placeholder="Exit Notification Description"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.exitNotificationDescription}
            onChange={handleChange}
          />

          <input
            name="webhookUrl"
            placeholder="Webhook URL"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.webhookUrl}
            onChange={handleChange}
          />
          <textarea
            name="userInfo"
            placeholder="User Info JSON"
            className="p-2 rounded bg-gray-800 border border-gray-700"
            value={beacon.userInfo}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddBeacon}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Add Beacon
          </button>
          <button
            onClick={handleInitBeaconData}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Initialize Data
          </button>
        </div>

        {message && <p className="mt-4 text-sm">{message}</p>}

        {addedBeacons.length > 0 && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Beacons List</h3>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(addedBeacons, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default InitBeaconDataPage;
