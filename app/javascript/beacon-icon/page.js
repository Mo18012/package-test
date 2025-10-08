"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { initBeaconData } from "webtonative/Beacon"; 

export default function BeaconIntegration() {
  const [form, setForm] = useState({
    uuid: "",
    major: "",
    minor: "",
    entry: "true",
    exit: "true",
    interval: "0",
    source: "PRE_DEFINED",
  });

  const [beaconData, setBeaconData] = useState({
    beaconConfig: [],
    userInfo: {
      userId: "user123",
      userName: "Ravi Saharan",
      userEmail: "ravi.saharan@orufy.com",
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const initBeacons = () => {
    try {
      initBeaconData({
        beaconData,
        callback: (data) => {
          console.log("Beacon initialized:", data);
    toast.success(`✅ Beacon added & initialized! ${JSON.stringify(data)}`);
    alert(`✅ Beacon :${JSON.stringify(data)}`);
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Beacon initialization failed.");
    }
  };

  const addBeacon = () => {
    const newBeacon = {
      uuid: form.uuid,
      major: parseInt(form.major),
      minor: parseInt(form.minor),
      settings: {
        showNotificationOnEntry: form.entry === "true",
        showNotificationOnExit: form.exit === "true",
        notificationInterval: parseInt(form.interval),
        notificationContentSource: form.source,
        defaultNotificationEnterData: {
          title: "Device Connected",
          image: "https://webtonetive.netlify.app/img2.png",
          body: "Beacon connected!",
          deepLink: "https://orufy.com/",
        },
        defaultNotificationExitData: {
          title: "Device Disconnected",
          image: "https://webtonetive.netlify.app/img1.png",
          body: "Beacon disconnected!",
          deepLink: "https://www.webtonative.com/",
        },
      },
      webhookUrl: "https://hdioigjkfdkdngdds.free.beeceptor.com",
    };

    const updatedData = {
      ...beaconData,
      beaconConfig: [...beaconData.beaconConfig, newBeacon],
    };

    setBeaconData(updatedData);
    initBeaconData({
      beaconData: updatedData,
      callback: (data) => {
        console.log("Beacon added & initialized:", data);
        toast.success("✅ Beacon added & initialized!");
      },
    });
  };

  return (
    <div className="bg-white border-2 border-blue-400 rounded-2xl p-6 shadow-md mb-6">
      <h3 className="text-xl font-semibold text-center text-blue-700 mb-4">
        🛰️ Webtonative Beacon Integration
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input
          id="uuid"
          value={form.uuid}
          onChange={handleChange}
          placeholder="UUID"
          className="border p-2 rounded-lg w-full"
        />
        <input
          id="major"
          type="number"
          value={form.major}
          onChange={handleChange}
          placeholder="Major"
          className="border p-2 rounded-lg w-full"
        />
        <input
          id="minor"
          type="number"
          value={form.minor}
          onChange={handleChange}
          placeholder="Minor"
          className="border p-2 rounded-lg w-full"
        />
        <select
          id="entry"
          value={form.entry}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        >
          <option value="true">Show Notification on Entry: true</option>
          <option value="false">false</option>
        </select>
        <select
          id="exit"
          value={form.exit}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        >
          <option value="true">Show Notification on Exit: true</option>
          <option value="false">false</option>
        </select>
        <input
          id="interval"
          type="number"
          value={form.interval}
          onChange={handleChange}
          placeholder="Interval (sec)"
          className="border p-2 rounded-lg w-full"
        />
        <select
          id="source"
          value={form.source}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        >
          <option value="PRE_DEFINED">PRE_DEFINED</option>
          <option value="API_FETCHED">API_FETCHED</option>
        </select>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={addBeacon}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          ➕ Add Beacon
        </button>
        <button
          onClick={initBeacons}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          🚀 Init Beacons
        </button>
      </div>
    </div>
  );
}
