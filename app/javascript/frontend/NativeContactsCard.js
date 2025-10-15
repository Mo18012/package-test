'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { Phone, User } from 'lucide-react';
import { getPermissionStatus, getAll } from 'webtonative/NativeContacts';

export default function NativeContactsCard() {
  const getPermissionStatusFun = () => {
    getPermissionStatus({
      callback: (data) => {
        console.log('Permission Status:', data.status);
        toast.success(`Permission: ${Object.values(data.status)}`);
      },
    });
  };

  const getAllContactsFun = () => {
    getAll({
      callback: (data) => {
        console.log('Contacts:', data.contacts);
        if (data.contacts && data.contacts.length > 0) {
          toast.success(`Fetched ${data.contacts.length} contacts`);
        } else {
          toast.error('No contacts found or permission denied');
        }
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg mx-auto text-slate-100">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Native Contacts
      </h3>

      <div className="flex flex-col gap-3">
        <button
          onClick={getPermissionStatusFun}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition-colors"
        >
          <User className="w-4 h-4" /> Check Permission Status
        </button>

        <button
          onClick={getAllContactsFun}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
        >
          <Phone className="w-4 h-4" /> Get All Contacts
        </button>
      </div>
    </div>
  );
}
