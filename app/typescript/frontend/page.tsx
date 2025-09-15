'use client';

import { useState } from 'react';
import Link from 'next/link';
import Statusbar from './Statusbar';
import PullToRefresh from './PullToRefresh';
import DisableScreenshot from './DisableScreenshot';
import BiometricAuthentication from './BiometricAuthentication';
import Permissions from './Permissions';
import DeviceInfo from './DeviceInfo';
import FileDownload from './FileDownload';
import InAppPurchase from './InAppPurchase';
import AppsFlyer from './AppsFlyer';
import Firebase from './Firebase';
import OneSignal from './OneSignal';
import Screens from './Screens';
import Result from './Result';
import { closeApp } from 'webtonative';
import ClearAppCacheCard from './ClearCache';
import GeoLocationCard from './GeoLocation';
import ScanBarcodeCard from './Barcodescan';
import ClipboardCard from './Clipboard';
import ScreenControlCard from './ScreenControl';
import AppReviewCard from './AppReview';
import MediaPlayerCard from './MediaPlayerCard';
import HideBottomNavCard from './BottomNavCard';
import FirebaseNotificationCard from './NotificationCard';
import HapticFeedbackCard from './HapticFeedbackCard';

export default function FrontendPage() {
  // State variables
  const [darkMode, setDarkMode] = useState(true);
  const [resultInfo, setResultInfo] = useState('Result: ');

  // Add custom CSS for toggle switches
  const customStyles = `
    .toggle-checkbox {
      transition: all 0.3s ease;
      z-index: 1;
    }
    .toggle-label {
      transition: background-color 0.3s ease;
    }
  `;

  // Handle result updates from components
  const handleResultUpdate = (result: string) => {
    setResultInfo(result);
  };

  return (
    <div
      className={`min-h-[100dvh] p-4 pb-24 ${
        darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'
      }`}
    >
      <style jsx>{customStyles}</style>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">WebToNative Demo</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full ${
              darkMode
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-800 text-white'
            } transition-all duration-300`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="flex flex-col gap-4 py-10">
          <Statusbar darkMode={darkMode} />
          <div className="flex sm:flex-row flex-col gap-8 w-full">
            <PullToRefresh />
            <DisableScreenshot />
          </div>
        </div>

        {/* Biometric Authentication */}
        <BiometricAuthentication
          darkMode={darkMode}
          onResult={handleResultUpdate}
        />

        {/* Permission Screens */}
        <Permissions darkMode={darkMode} />

        <Screens darkMode={darkMode} />

        {/* Device Info */}
        <DeviceInfo darkMode={darkMode} />

        {/* File Download */}
        <FileDownload darkMode={darkMode} />

        {/* In-App Purchase */}
        <InAppPurchase darkMode={darkMode} onResult={handleResultUpdate} />

        {/* AppsFlyer Integration */}
        <AppsFlyer darkMode={darkMode} />

        {/* Firebase Analytics */}
        <Firebase darkMode={darkMode} />

        {/* OneSignal Integration */}
        <OneSignal darkMode={darkMode} />

        <ClearAppCacheCard />

        <GeoLocationCard />

        <ScanBarcodeCard />

        <ClipboardCard />

        <ScreenControlCard />

        <AppReviewCard />

        <MediaPlayerCard />

        <HideBottomNavCard />

        <FirebaseNotificationCard />

        <HapticFeedbackCard />

        {/* Results Display */}
        <div
          className={`${
            darkMode
              ? 'bg-gradient-to-br from-gray-800 to-gray-700'
              : 'bg-gradient-to-br from-gray-500 to-gray-400'
          } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
        >
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <span className="bg-white text-gray-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Results
          </h3>
          <Result resultInfo={resultInfo} />
        </div>

        <button
          onClick={() => closeApp()}
          className="bg-red-500 w-fit text-white font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Close App{' '}
        </button>
      </div>
    </div>
  );
}
