import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';

export interface IAppsFlyerProps {
  darkMode?: boolean;
}

const AppsFlyer: FC<IAppsFlyerProps> = ({ darkMode }) => {
  const [appsflyerCustomerId, setAppsflyerCustomerId] = useState('');
  const [eventName, setEventName] = useState('purchase');
  const [eventParams, setEventParams] = useState('{ "price": 9.99, "currency": "USD" }');

  const setAppsflyerCustomerUserId = () => {
    if (typeof window !== 'undefined' && window.WTN && window.WTN.appsflyer) {
      window.WTN.appsflyer.setCustomerUserId(appsflyerCustomerId);
      toast.success('AppsFlyer customer ID set');
    }
  };

  const logAppsflyerEvent = () => {
    if (typeof window !== 'undefined' && window.WTN && window.WTN.appsflyer) {
      try {
        const params = JSON.parse(eventParams);
        window.WTN.appsflyer.logEvent(eventName, params);
        toast.success('AppsFlyer event logged');
      } catch (error) {
        toast.error('Invalid JSON parameters');
      }
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-cyan-900 to-blue-800'
          : 'bg-gradient-to-br from-cyan-500 to-blue-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-cyan-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </span>
        AppsFlyer Integration
      </h3>

      <div className="bg-white/10 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-white/80 block mb-1">Customer ID:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={appsflyerCustomerId}
                  onChange={(e) => setAppsflyerCustomerId(e.target.value)}
                  placeholder="Enter customer ID"
                  className="flex-grow p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  onClick={setAppsflyerCustomerUserId}
                  className="bg-white text-cyan-600 font-bold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md whitespace-nowrap"
                >
                  Set ID
                </button>
              </div>
            </div>

            <div>
              <label className="text-white/80 block mb-1">Event Name:</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-white/80 block mb-1">Event Parameters (JSON):</label>
              <textarea
                value={eventParams}
                onChange={(e) => setEventParams(e.target.value)}
                placeholder='{ "key": "value" }'
                rows={3}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <button
              onClick={logAppsflyerEvent}
              className="bg-white text-cyan-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-auto"
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Log Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppsFlyer;