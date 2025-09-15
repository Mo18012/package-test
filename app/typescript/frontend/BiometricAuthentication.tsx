import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import {
  show,
  checkStatus,
  saveSecret,
  deleteSecret,
} from 'webtonative/Biometric';

export interface IBiometricAuthenticationProps {
  darkMode?: boolean;
  onResult?: (result: string) => void;
}

const BiometricAuthentication: FC<IBiometricAuthenticationProps> = ({
  darkMode,
  onResult = () => {},
}) => {
  const [promptMessage, setPromptMessage] = useState('Verify your identity');
  const [secretMessage, setSecretMessage] = useState('Meoww');

  const authenticate = () => {
    show({
      prompt: promptMessage,
      callback: function (data) {
        const result = 'Result: ' + Object.values(data);
        onResult(result);
        toast.success('Biometric authentication triggered');
      },
    });
  };

  const handleCheckStatus = () => {
    checkStatus({
      callback: function (data) {
        const result = 'Result: ' + Object.values(data);
        onResult(result);
        toast.success('Biometric status checked');
      },
    });
  };

  const handleSaveSecret = () => {
    saveSecret({
      secret: secretMessage,
      callback: function (data) {
        const result = 'Result: ' + Object.values(data);
        onResult(result);
        toast.success('Biometric saveSecret triggered');
      },
    });
  };
  const handleDeleteSecret = () => {
    deleteSecret({
      callback: function (data) {
        const result = 'Result: ' + Object.values(data);
        onResult(result);
        toast.success('Biometric deleteSecret triggered');
      },
    });
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-violet-900 to-purple-800'
          : 'bg-gradient-to-br from-violet-500 to-purple-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-violet-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
        </span>
        Biometric Authentication
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 p-4 rounded-lg mb-4">
        <div className="flex flex-col gap-2">
          <p className="text-white/80">
            Authenticate using device biometrics (fingerprint, face recognition)
          </p>
          <div className="text-white/70 text-sm">
            <p>• Secure authentication</p>
            <p>• Uses device native biometric system</p>
            <p>• Falls back to device passcode</p>
          </div>
          <input
            type="text"
            value={promptMessage}
            onChange={(e) => setPromptMessage(e.target.value)}
            placeholder="Enter prompt message"
            className="mt-2 w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={authenticate}
            className="bg-white text-violet-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
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
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            Authenticate
          </button>
          <button
            onClick={handleCheckStatus}
            className="bg-white/20 text-white font-bold px-5 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
          >
            Check Status
          </button>
        </div>
      </div>
      <div>
        <label>Secret</label>
        <div className="flex sm:flex-row flex-col gap-4">
          <input
            type="text"
            value={secretMessage}
            onChange={(e) => setSecretMessage(e.target.value)}
            placeholder="Enter prompt message"
            className="mt-2 w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <div className="flex gap-2 text-sm w-full">
            <button
              onClick={handleSaveSecret}
              className="bg-white/20 text-white font-bold px-5 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
            >
              Add secret
            </button>
            <button
              onClick={handleDeleteSecret}
              className="bg-white/20 text-white font-bold px-5 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
            >
              Delete secret
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricAuthentication;
