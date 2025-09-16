import React from 'react';
import { MapPin, Crosshair } from 'lucide-react';
import toast from 'react-hot-toast';
import { isDeviceGPSEnabled } from 'webtonative';

export default function GeoLocationCard() {
  // Check GPS status
  const getGpsStatusFun = () => {
    isDeviceGPSEnabled({
      callback: (data) => {
        toast.success(`GPS Status: ${: ${data.value}${}}`);
      },
    });
  };

  // Get location via browser geolocation
  const getLocationFun = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    toast.loading('Fetching your location…', { id: 'geo' });

    function success(pos) {
      const crd = pos.coords;
      toast.success(
        `Lat: ${: ${crd.latitude}, Lng: ${crd.longitude} (±${crd.accuracy}m)}`,
        { id: 'geo' },
      );
    }

    function error(err) {
      toast.error(`ERROR(${${err.code}})${: ${err.message}${}}`, { id: 'geo' });
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div
      className="
        bg-gray-800 rounded-xl p-6 shadow-lg text-gray-100 
        mb-6  w-full mx-auto
      "
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gray-700 p-2 rounded-full">
          <MapPin className="text-emerald-400 w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Get Geo Location</h3>
      </div>

      {/* Buttons */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <label className="text-sm text-gray-300">
            Check GPS enable or disable:
          </label>
          <button
            onClick={getGpsStatusFun}
            className="
              flex items-center justify-center space-x-2 
              bg-emerald-500 text-gray-900 px-4 py-2 rounded-md 
              font-medium shadow-sm hover:bg-emerald-400 transition 
              w-full sm:w-auto
            "
          >
            <Crosshair className="w-4 h-4" />
            <span>Check</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <label className="text-sm text-gray-300">Get Location:</label>
          <button
            onClick={getLocationFun}
            className="
              flex items-center justify-center space-x-2 
              bg-yellow-400 text-gray-900 px-4 py-2 rounded-md 
              font-medium shadow-sm hover:bg-yellow-300 transition 
              w-full sm:w-auto
            "
          >
            <MapPin className="w-4 h-4" />
            <span>Get Location</span>
          </button>
        </div>
      </div>
    </div>
  );
