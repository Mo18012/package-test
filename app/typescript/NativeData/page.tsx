import React, { useState } from 'react';
import { NativeDatastore } from 'webtonative';

const safeParse = (input: string) => {
  if (!input) return '';
  try {
    return JSON.parse(input);
  } catch {
    return eval(`(${input})`);
  }
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>;

const InputRow: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="grid grid-cols-3 gap-2 items-center mb-2">
    <label className="text-sm font-medium">{label}</label>
    <div className="col-span-2">{children}</div>
  </div>
);

const WTNNativeDatastorePage: React.FC = () => {
  // All states for App
  const [appKey, setAppKey] = useState('');
  const [appValue, setAppValue] = useState('');
  const [appResult, setAppResult] = useState('');

  // All states for Cloud
  const [cloudKey, setCloudKey] = useState('');
  const [cloudValue, setCloudValue] = useState('');
  const [cloudResult, setCloudResult] = useState('');

  // Generic Get/Delete
  const [getKey, setGetKey] = useState('');
  const [getResult, setGetResult] = useState('');

  const [deleteKey, setDeleteKey] = useState('');
  const [deleteResult, setDeleteResult] = useState('');

  const setAppData = () => {
    NativeDatastore.setAppData({
      keyName: appKey,
      value: safeParse(appValue) || appValue,
      callback: (res) => setAppResult(JSON.stringify(res)),
    });
  };

  const setCloudData = () => {
    NativeDatastore.setCloudData({
      keyName: cloudKey,
      value: safeParse(cloudValue) || cloudValue,
      callback: (res) => setCloudResult(JSON.stringify(res)),
    });
  };

  const getAppData = () => {
    NativeDatastore.getAppData({
      keyName: getKey,
      callback: (res) => setGetResult(JSON.stringify(res)),
    });
  };

  const getCloudData = () => {
    NativeDatastore.getCloudData({
      keyName: getKey,
      callback: (res) => setGetResult(JSON.stringify(res)),
    });
  };

  const deleteAppData = () => {
    NativeDatastore.deleteAppData({
      keyName: deleteKey,
      callback: (res) => setDeleteResult(JSON.stringify(res)),
    });
  };

  const deleteCloudData = () => {
    NativeDatastore.deleteCloudData({
      keyName: deleteKey,
      callback: (res) => setDeleteResult(JSON.stringify(res)),
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">
        WebToNative Datastore Tester
      </h1>

      {/* App Data Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">App Data</h2>

        <SectionTitle>Set App Data</SectionTitle>
        <InputRow label="Key">
          <input
            className="w-full rounded border px-2 py-1"
            value={appKey}
            onChange={(e) => setAppKey(e.target.value)}
          />
        </InputRow>
        <InputRow label="Value (JSON or primitive)">
          <textarea
            className="w-full rounded border px-2 py-1"
            rows={2}
            value={appValue}
            onChange={(e) => setAppValue(e.target.value)}
          />
        </InputRow>
        <button
          onClick={setAppData}
          className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700"
        >
          Set App Data
        </button>
        {appResult && (
          <p className="mt-2 text-sm text-gray-600">Response: {appResult}</p>
        )}
      </div>

      {/* Cloud Data Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Cloud Data</h2>

        <SectionTitle>Set Cloud Data</SectionTitle>
        <InputRow label="Key">
          <input
            className="w-full rounded border px-2 py-1"
            value={cloudKey}
            onChange={(e) => setCloudKey(e.target.value)}
          />
        </InputRow>
        <InputRow label="Value (JSON or primitive)">
          <textarea
            className="w-full rounded border px-2 py-1"
            rows={2}
            value={cloudValue}
            onChange={(e) => setCloudValue(e.target.value)}
          />
        </InputRow>
        <button
          onClick={setCloudData}
          className="bg-green-600 text-white rounded px-4 py-2 mt-2 hover:bg-green-700"
        >
          Set Cloud Data
        </button>
        {cloudResult && (
          <p className="mt-2 text-sm text-gray-600">Response: {cloudResult}</p>
        )}
      </div>

      {/* Get Data Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Get Data</h2>
        <InputRow label="Key">
          <input
            className="w-full rounded border px-2 py-1"
            value={getKey}
            onChange={(e) => setGetKey(e.target.value)}
          />
        </InputRow>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={getAppData}
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Get App Data
          </button>
          <button
            onClick={getCloudData}
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
          >
            Get Cloud Data
          </button>
        </div>
        {getResult && (
          <p className="mt-2 text-sm text-gray-600">Response: {getResult}</p>
        )}
      </div>

      {/* Delete Data Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Delete Data</h2>
        <InputRow label="Key">
          <input
            className="w-full rounded border px-2 py-1"
            value={deleteKey}
            onChange={(e) => setDeleteKey(e.target.value)}
          />
        </InputRow>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={deleteAppData}
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
          >
            Delete App Data
          </button>
          <button
            onClick={deleteCloudData}
            className="bg-red-700 text-white rounded px-4 py-2 hover:bg-red-800"
          >
            Delete Cloud Data
          </button>
        </div>
        {deleteResult && (
          <p className="mt-2 text-sm text-gray-600">Response: {deleteResult}</p>
        )}
      </div>
    </div>
  );
};

export default WTNNativeDatastorePage;
