import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Fingerprint } from 'lucide-react';
import {
  show,
  saveSecret,
  deleteSecret,
  checkStatus,
  biometricAuthWithDismissOnCancel,
} from 'webtonative/Biometric';
import Result from './Result';

const BiometricAuthCard: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [secret, setSecret] = useState('');
  const [dismissPrompt, setDismissPrompt] = useState('');
  const [result, setResult] = useState('');

  const showBiometricFun = () => {
    show({
      prompt,
      callback: (data: any) => {
        toast.success(`Result: ${JSON.stringify(data)}`);
        setResult(JSON.stringify(data)); // ✅ properly set state here
      },
    });
  };

  const saveSecretFun = () => {
    saveSecret({
      secret,
      callback: (data: any) => {
        toast.success(`Result: ${JSON.stringify(data)}`);
        setResult(JSON.stringify(data)); // ✅ properly set state here
      },
    });
  };

  const deleteSecretFun = () => {
    deleteSecret({
      callback: (data: any) => {
        toast.success(`Result: ${JSON.stringify(data)}`);
        setResult(JSON.stringify(data)); // ✅ properly set state here
      },
    });
  };

  const checkStatusFun = () => {
    checkStatus({
      callback: (data: any) => {
        toast.success(`Result: ${JSON.stringify(data)}`);
        setResult(JSON.stringify(data)); // ✅ properly set state here
      },
    });
  };

  const biometricAuthWithDismissFun = () => {
    biometricAuthWithDismissOnCancel({
      prompt: dismissPrompt || 'Default Prompt',
      isAuthenticationOptional: true,
      callback: (data: any) => {
        toast.success(`Result: ${JSON.stringify(data)}`);
        setResult(JSON.stringify(data)); // ✅ properly set state here
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 mb-6 shadow-lg text-white">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Fingerprint className="w-5 h-5 text-cyan-400" /> Biometric
        Authentication
      </h3>

      {/* Show Biometric */}
      <input
        type="text"
        placeholder="Enter Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        onClick={showBiometricFun}
        className="w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-medium mb-4"
      >
        Show
      </button>

      {/* Save Secret */}
      <input
        type="text"
        placeholder="Enter Secret e.g. token"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        onClick={saveSecretFun}
        className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white font-medium mb-4"
      >
        Save Secret
      </button>

      {/* Delete Secret */}
      <button
        onClick={deleteSecretFun}
        className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white font-medium mb-4"
      >
        Delete Secret
      </button>

      {/* Check Status */}
      <button
        onClick={checkStatusFun}
        className="w-full sm:w-auto px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded text-white font-medium mb-4"
      >
        Check Status
      </button>

      {/* Biometric Auth with Dismiss */}
      <input
        type="text"
        placeholder="Enter Prompt for Dismiss Auth"
        value={dismissPrompt}
        onChange={(e) => setDismissPrompt(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        onClick={biometricAuthWithDismissFun}
        className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded text-white font-medium"
      >
        Auth With Dismiss
      </button>
      <Result resultInfo={result} />
    </div>
  );
};

export default BiometricAuthCard;
