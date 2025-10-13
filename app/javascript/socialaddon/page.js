'use client';

import React from 'react';
import toast from 'react-hot-toast';

import {
  login as loginFacebook,
  logout as logoutFacebook,
} from 'webtonative/SocialLogin/facebook';
import {
  login as loginGoogle,
  logout as logoutGoogle,
} from 'webtonative/SocialLogin/google';
import { login as loginApple } from 'webtonative/SocialLogin/apple';

export default function SocialLoginCard() {
  const handleGoogleLogin = () => {
    loginGoogle({
      callback: (value) => {
        console.log(value);
        toast.success(`Google Login: ${Object.values(value)}`);
      },
    });
  };

  const handleGoogleLogout = () => {
    logoutGoogle({
      callback: (value) => {
        console.log(value);
        toast(`Google Logout: ${Object.values(value)}`, { icon: '👋' });
      },
    });
  };

  const handleFacebookLogin = () => {
    loginFacebook({
      callback: (value) => {
        console.log(value);
        toast.success(`Facebook Login: ${Object.values(value)}`);
      },
    });
  };

  const handleFacebookLogout = () => {
    logoutFacebook({
      callback: (value) => {
        console.log(value);
        toast(`Facebook Logout: ${Object.values(value)}`, { icon: '👋' });
      },
    });
  };

  const handleAppleLogin = () => {
    loginApple({
      callback: (value) => {
        console.log(value);
        toast.success(`Apple Login: ${Object.values(value)}`);
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg mx-auto text-slate-100">
      <h3 className="text-lg font-semibold mb-4">Social Login</h3>

      <div className="grid sm:grid-cols-2 gap-3">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg font-medium transition-colors"
        >
          <Chrome className="w-4 h-4" /> Google Login
        </button>

        <button
          onClick={handleGoogleLogout}
          className="flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          <Chrome className="w-4 h-4" /> Google Logout
        </button>

        <button
          onClick={handleFacebookLogin}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition-colors"
        >
          <Facebook className="w-4 h-4" /> Facebook Login
        </button>

        <button
          onClick={handleFacebookLogout}
          className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          <Facebook className="w-4 h-4" /> Facebook Logout
        </button>

        <button
          onClick={handleAppleLogin}
          className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors sm:col-span-2"
        >
          <Apple className="w-4 h-4" /> Apple Login
        </button>
      </div>
    </div>
  );
}
