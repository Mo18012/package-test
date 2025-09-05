'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FrontendPage() {
  // State variables
  const [statusBarColor, setStatusBarColor] = useState('#1D1B1B');
  const [pullToRefresh, setPullToRefresh] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState('Result: ');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [iapProductId, setIapProductId] = useState('com.example.product');
  const [iapProductType, setIapProductType] = useState('inapp');
  const [iapIsConsumable, setIapIsConsumable] = useState(true);
  const [appsflyerCustomerId, setAppsflyerCustomerId] = useState('');
  const [firebaseUserId, setFirebaseUserId] = useState('');
  const [onesignalExternalUserId, setOnesignalExternalUserId] = useState('');
  
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
  
  // Actual WebToNative functions implementation
  const setStatusBarColorFn = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      const theme = darkMode ? 'dark' : 'light';
      window.WTN.statusBar({
        style: theme,
        color: statusBarColor,
        overlay: false // Only for android
      });
    }
  };

  const pullToRefreshFn = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      window.WTN.enablePullToRefresh(pullToRefresh);
    }
  };

  const disableScreenshotForPage = () => {
    if (typeof window !== 'undefined' && window.WebToNativeInterface) {
      window.WebToNativeInterface.disableScreenshotForPage(true);
    }
  };

  const cameraPermissionScreen = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      window.WTN.permission.camera();
    }
  };

  const locationPermissionScreen = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      window.WTN.permission.location();
    }
  };

  const notificationPermissionScreen = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      window.WTN.permission.notification();
    }
  };

  const getDeviceInfoFn = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      window.WTN.deviceInfo().then(function(value: any){
        setDeviceInfo("Result: " + Object.values(value));
      });
    }
  };

  const downloadFileFn = () => {
    if (typeof window !== 'undefined') {
      window.location.href = downloadUrl + "?wtn-download-file=true";
    }
  };

  const biometricAuthentication = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      window.WTN.Biometric.show({
        prompt: "Verify your identity",
        callback: function(data) {
          setDeviceInfo("Result: " + Object.values(data));
        }
      });
    }
  };
  
  // In-App Purchase functions
  const makeInAppPurchase = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      window.WTN.inAppPurchase({
        productId: iapProductId,
        productType: iapProductType,
        isConsumable: iapIsConsumable,
        callback: function(data) {
          setDeviceInfo("Result: " + Object.values(data));
        }
      });
    }
  };

  const getAllPurchases = () => {
    if (typeof window !== 'undefined' && window.WTN) {
      window.WTN.getAllPurchases({
        callback: function(data) {
          setDeviceInfo("Result: " + Object.values(data));
        }
      });
    }
  };
  
  // AppsFlyer functions
  const setAppsflyerCustomerUserId = () => {
    if (typeof window !== 'undefined' && window.WTN && window.WTN.appsflyer) {
      window.WTN.appsflyer.setCustomerUserId(appsflyerCustomerId);
    }
  };
  
  const logAppsflyerEvent = (eventName: string, params: any) => {
    if (typeof window !== 'undefined' && window.WTN && window.WTN.appsflyer) {
      window.WTN.appsflyer.logEvent(eventName, params);
    }
  };
  
  // Firebase functions
  const setFirebaseUserId = (userId: string) => {
    if (typeof window !== 'undefined' && window.WTN && window.WTN.Firebase && window.WTN.Firebase.Analytics) {
      window.WTN.Firebase.Analytics.setUserId({ userId });
    }
  };
  
  // OneSignal functions
  const setOneSignalExternalUserId = () => {
    if (typeof window !== 'undefined' && window.WTN && window.WTN.OneSignal) {
      window.WTN.OneSignal.setExternalUserId(onesignalExternalUserId);
    }
  };
  
  const removeOneSignalExternalUserId = () => {
    if (typeof window !== 'undefined' && window.WTN && window.WTN.OneSignal) {
      window.WTN.OneSignal.removeExternalUserId();
    }
  };

// Add global WTN type for TypeScript
declare global {
  interface Window {
    WTN: {
      statusBar: {
        setColor: (params: { color: string }) => void;
      };
      pullToRefresh: {
        enable: (params: { enabled: boolean }) => void;
      };
      disableScreenshot: {
        enable: (params: { enabled: boolean }) => void;
      };
      Biometric: {
        authenticate: (params: { reason: string }) => Promise<{ success: boolean, message: string }>;
        checkAvailability: () => Promise<{ available: boolean, biometryType: string }>;
      };
      permission: {
        notification: {
          openScreen: () => void;
        };
        camera: {
          openScreen: () => void;
        };
        recordAudio: {
          openScreen: () => void;
        };
        location: {
          openScreen: () => void;
        };
      };
      deviceInfo: {
        get: () => Promise<{ deviceId: string, model: string, osVersion: string, appVersion: string }>;
      };
      downloadFile: {
        download: (params: { url: string, filename: string }) => Promise<{ success: boolean, path: string }>;
      };
      inAppPurchase: {
        purchase: (params: { productId: string, productType: string, isConsumable: boolean }) => Promise<{ success: boolean, message: string, data: any }>;
        getAllPurchases: () => Promise<{ success: boolean, purchases: any[] }>;
      };
      appsflyer: {
        setCustomerUserId: (params: { id: string }) => void;
        logEvent: (params: { eventName: string, eventValues: any }) => void;
      };
      Firebase: {
        Analytics: {
          setCollection: (params: { enabled: boolean }) => void;
          setUserId: (params: { userId: string }) => void;
          setDefaultEventParameters: (params: { parameters: any }) => void;
          setUserProperty: (params: { name: string, value: string }) => void;
          logEvent: (params: { eventName: string, parameters: any }) => void;
          logScreen: (params: { screenName: string, screenClass: string }) => void;
        };
      };
      facebook: {
        events: {
          send: (params: { event: string, valueToSum?: number, parameters?: any }) => void;
          sendPurchase: (params: { amount: string, currency: string, parameters?: any }) => void;
        };
      };
      OneSignal: {
        getPlayerId: () => Promise<string>;
        setExternalUserId: (params: { externalUserId: string }) => Promise<{ success: boolean }>;
        removeExternalUserId: () => Promise<{ success: boolean }>;
      };
    };
  }
}

  return (
    <div className={`min-h-screen p-4 pb-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'}`}>
      {/* Add custom styles */}
      <style jsx>{customStyles}</style>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">WebToNative Demo</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'} transition-all duration-300`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Status Bar Color */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-pink-900 to-rose-800' : 'bg-gradient-to-br from-pink-500 to-rose-500'} p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <span className="bg-white text-pink-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </span>
            Status Bar Color
          </h3>
          
          <div className="bg-white/10 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="text-white font-medium min-w-20">Color:</label>
              <input 
                type="color" 
                value={statusBarColor}
                onChange={(e) => setStatusBarColor(e.target.value)}
                className="h-10 w-20 rounded cursor-pointer"
              />
              <button 
                onClick={() => {
                    setStatusBarColorFn()
                }} 
                className="bg-white text-pink-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md ml-auto"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Pull To Refresh */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-purple-900 to-indigo-800' : 'bg-gradient-to-br from-purple-500 to-pink-500'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="bg-white text-purple-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
              Pull To Refresh
            </h3>
            
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg mb-4">
              <label className="text-white font-medium">Enable</label>
              <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  checked={pullToRefresh}
                  onChange={(e) => setPullToRefresh(e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  style={{
                    right: pullToRefresh ? '0' : 'auto',
                    left: pullToRefresh ? 'auto' : '0',
                    transition: 'all 0.3s ease'
                  }}
                />
                <label 
                  className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                  style={{
                    backgroundColor: pullToRefresh ? '#EC4899' : '#D1D5DB'
                  }}
                ></label>
              </div>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined' && window.WTN) {
                    window.WTN.enablePullToRefresh(pullToRefresh);
                  }
                }} 
                className="ml-auto bg-white text-purple-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Disable Screenshot */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-teal-500 to-emerald-500'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="bg-white text-teal-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </span>
              Disable Screenshot
            </h3>
            
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg mb-4">
              <label className="text-white font-medium">Enable</label>
              <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  id="screenshotCheckbox"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  style={{
                    right: false ? '0' : 'auto',
                    left: false ? 'auto' : '0',
                    transition: 'all 0.3s ease'
                  }}
                />
                <label 
                  className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                  style={{
                    backgroundColor: false ? '#10B981' : '#D1D5DB'
                  }}
                ></label>
              </div>
              <button 
                onClick={() => {
                  const checkbox = document.getElementById('screenshotCheckbox') as HTMLInputElement;
                  if (checkbox && typeof window !== 'undefined' && window.WebToNativeInterface) {
                    window.WebToNativeInterface.disableScreenshotForPage(checkbox.checked);
                  }
                }} 
                className="ml-auto bg-white text-teal-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Biometric Authentication */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-violet-900 to-purple-800' : 'bg-gradient-to-br from-violet-500 to-purple-500'} p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <span className="bg-white text-violet-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </span>
            Biometric Authentication
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 p-4 rounded-lg mb-4">
            <div className="flex flex-col gap-2">
              <p className="text-white/80">Authenticate using device biometrics (fingerprint, face recognition)</p>
              <div className="text-white/70 text-sm">
                <p>• Secure authentication</p>
                <p>• Uses device native biometric system</p>
                <p>• Falls back to device passcode</p>
              </div>
              <input 
                type="text" 
                id="biometricPromptBox"
                placeholder="Enter prompt message" 
                defaultValue="Verify your identity"
                className="mt-2 w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined' && window.WTN) {
                    const promptEl = document.getElementById('biometricPromptBox') as HTMLInputElement;
                    const prompt = promptEl ? promptEl.value : "Verify your identity";
                    window.WTN.Biometric.show({
                      prompt: prompt,
                      callback: function(data: any) {
                        setDeviceInfo("Result: " + Object.values(data));
                      }
                    });
                  }
                }} 
                className="bg-white text-violet-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
                Authenticate
              </button>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined' && window.WTN) {
                    window.WTN.Biometric.checkStatus({
                      callback: function(data: any) {
                        setDeviceInfo("Result: " + Object.values(data));
                      }
                    });
                  }
                }} 
                className="bg-white/20 text-white font-bold px-5 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
              >
                Check Status
              </button>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-white font-medium mb-2">Result:</p>
            <div className="bg-white/20 p-3 rounded-lg text-white/90 min-h-12">
              {deviceInfo}
            </div>
          </div>
        </div>

        {/* Permission Screens */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900 to-indigo-800' : 'bg-gradient-to-br from-blue-500 to-indigo-500'} p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <span className="bg-white text-blue-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            Permission Screens
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex flex-col gap-3">
                <label className="text-white font-medium mb-2">Notification Permission</label>
                <Link href="#" className="bg-white text-blue-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md w-full flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Open Screen
                </Link>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex flex-col gap-3">
                <label className="text-white font-medium mb-2">Camera Permission</label>
                <Link href="#" className="bg-white text-blue-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md w-full flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Open Screen
                </Link>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex flex-col gap-3">
                <label className="text-white font-medium mb-2">Record Audio Permission</label>
                <Link href="#" className="bg-white text-blue-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md w-full flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Open Screen
                </Link>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex flex-col gap-3">
                <label className="text-white font-medium mb-2">Location Permission</label>
                <Link href="#" className="bg-white text-blue-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md w-full flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Open Screen
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Device Info */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-amber-900 to-orange-800' : 'bg-gradient-to-br from-amber-500 to-orange-500'} p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <span className="bg-white text-amber-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
            Device Info
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 p-4 rounded-lg mb-4">
            <div className="flex flex-col gap-2">
              <p className="text-white/80">Get information about the current device</p>
              <div className="text-white/70 text-sm">
                <p>• Device model</p>
                <p>• Operating system</p>
                <p>• App version</p>
                <p>• Other device details</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined' && window.WTN) {
                    window.WTN.deviceInfo().then(function(value){
                      setDeviceInfo("Result: " + Object.values(value));
                    });
                  }
                }} 
                className="bg-white text-amber-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Device Info
              </button>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-white font-medium mb-2">Result:</p>
            <div className="bg-white/20 p-3 rounded-lg text-white/90 min-h-12">
              {deviceInfo}
            </div>
          </div>
        </div>

        {/* Download File */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900 to-indigo-800' : 'bg-gradient-to-br from-blue-500 to-indigo-500'} p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <span className="bg-white text-blue-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </span>
            Download File
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/10 p-4 rounded-lg mb-4">
            <div className="md:col-span-2">
              <input 
                type="text" 
                id="downloadFileUrlBox"
                placeholder="Enter URL to download" 
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = downloadUrl + "?wtn-download-file=true";
                }
              }} 
              className="bg-white text-blue-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        </div>
        
        {/* In-App Purchase */}
        <div className={`${darkMode ? 'bg-gradient-to-br from-green-900 to-emerald-800' : 'bg-gradient-to-br from-green-500 to-emerald-500'} p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
            <span className="bg-white text-green-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            In-App Purchase
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 p-4 rounded-lg mb-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Product ID:</label>
                <input 
                  type="text" 
                  value={iapProductId}
                  onChange={(e) => setIapProductId(e.target.value)}
                  placeholder="Enter product ID" 
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Product Type:</label>
                <select
                  value={iapProductType}
                  onChange={(e) => setIapProductType(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="inapp">In-App</option>
                  <option value="subs">Subscription</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <label className="text-white font-medium">Is Consumable:</label>
                <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    checked={iapIsConsumable}
                    onChange={() => setIapIsConsumable(!iapIsConsumable)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    style={{
                      right: iapIsConsumable ? '0' : 'auto',
                      left: iapIsConsumable ? 'auto' : '0',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <label 
                    className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                    style={{
                      backgroundColor: iapIsConsumable ? '#10B981' : '#D1D5DB'
                    }}
                  ></label>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 justify-end">
              <button 
                onClick={makeInAppPurchase} 
                className="bg-white text-green-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Make Purchase
              </button>
              
              <button 
                onClick={getAllPurchases} 
                className="bg-white/20 text-white font-bold px-5 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Get All Purchases
              </button>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-white font-medium mb-2">Result:</p>
            <div className="bg-white/20 p-3 rounded-lg text-white/90 min-h-12">
              {deviceInfo}
            </div>
          </div>
        </div>
        
        {/* Analytics Integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* AppsFlyer */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-purple-900 to-indigo-800' : 'bg-gradient-to-br from-purple-500 to-indigo-500'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="bg-white text-purple-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              AppsFlyer
            </h3>
            
            <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium">Customer ID:</label>
                <input 
                  type="text" 
                  value={appsflyerCustomerId}
                  onChange={(e) => setAppsflyerCustomerId(e.target.value)}
                  placeholder="Enter customer ID" 
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  onClick={setAppsflyerCustomerUserId} 
                  className="bg-white text-purple-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Set Customer ID
                </button>
                
                <button 
                  onClick={() => logAppsflyerEvent("af_purchase", {price: 9.99, currency: "USD"})} 
                  className="bg-white/20 text-white font-bold px-5 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Log Purchase Event
                </button>
              </div>
            </div>
          </div>
          
          {/* OneSignal */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-red-900 to-rose-800' : 'bg-gradient-to-br from-red-500 to-rose-500'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="bg-white text-red-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </span>
              OneSignal
            </h3>
            
            <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium">External User ID:</label>
                <input 
                  type="text" 
                  value={onesignalExternalUserId}
                  onChange={(e) => setOnesignalExternalUserId(e.target.value)}
                  placeholder="Enter external user ID" 
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  onClick={setOneSignalExternalUserId} 
                  className="bg-white text-red-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Set External User ID
                </button>
                
                <button 
                  onClick={removeOneSignalExternalUserId} 
                  className="bg-white/20 text-white font-bold px-5 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                  </svg>
                  Remove External User ID
                </button>
              </div>
              
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined' && window.WTN && window.WTN.OneSignal) {
                    window.WTN.OneSignal.getPlayerId().then((playerId) => {
                      setDeviceInfo("Result: Player ID - " + playerId);
                    });
                  }
                }} 
                className="bg-white text-red-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                Get Player ID
              </button>
            </div>
          </div>
        </div>

        {/* Firebase Analytics and Facebook Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Firebase Analytics */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-amber-900 to-yellow-800' : 'bg-gradient-to-br from-amber-500 to-yellow-500'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="bg-white text-amber-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              Firebase Analytics
            </h3>
            
            <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <label className="text-white font-medium">User ID:</label>
                <input 
                  type="text" 
                  value={firebaseUserId}
                  onChange={(e) => setFirebaseUserId(e.target.value)}
                  placeholder="Enter user ID" 
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  onClick={() => setFirebaseUserId(firebaseUserId)} 
                  className="bg-white text-amber-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Set User ID
                </button>
                
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.WTN && window.WTN.Firebase && window.WTN.Firebase.Analytics) {
                      window.WTN.Firebase.Analytics.setCollection({ enabled: true });
                    }
                  }} 
                  className="bg-white/20 text-white font-bold px-5 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Enable Collection
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.WTN && window.WTN.Firebase && window.WTN.Firebase.Analytics) {
                      window.WTN.Firebase.Analytics.logEvent({
                        eventName: "purchase", 
                        parameters: {value: 9.99, currency: "USD"}
                      });
                    }
                  }} 
                  className="bg-white text-amber-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Log Purchase Event
                </button>
                
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.WTN && window.WTN.Firebase && window.WTN.Firebase.Analytics) {
                      window.WTN.Firebase.Analytics.logScreen({
                        screenName: "home_screen", 
                        screenClass: "HomeActivity"
                      });
                    }
                  }} 
                  className="bg-white/20 text-white font-bold px-5 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Log Screen View
                </button>
              </div>
            </div>
          </div>
          
          {/* Facebook App Events */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900 to-sky-800' : 'bg-gradient-to-br from-blue-500 to-sky-500'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="bg-white text-blue-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </span>
              Facebook App Events
            </h3>
            
            <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.WTN && window.WTN.facebook && window.WTN.facebook.events) {
                      window.WTN.facebook.events.send({
                        event: "fb_mobile_purchase",
                        valueToSum: 9.99,
                        parameters: {currency: "USD"}
                      });
                    }
                  }} 
                  className="bg-white text-blue-600 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Send Event
                </button>
                
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.WTN && window.WTN.facebook && window.WTN.facebook.events) {
                      window.WTN.facebook.events.sendPurchase({
                        amount: "9.99",
                        currency: "USD",
                        parameters: {item_name: "Premium Subscription"}
                      });
                    }
                  }} 
                  className="bg-white/20 text-white font-bold px-5 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Send Purchase Event
                </button>
              </div>
              
              <div className="mt-2 p-3 bg-white/20 rounded-lg text-white/90 min-h-12 text-center">
                <p>Facebook App Events allow you to track user actions in your app</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}