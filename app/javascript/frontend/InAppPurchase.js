import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { inAppPurchase, getAllPurchases } from 'webtonative/InAppPurchase';
import Result from './Result';

export interface IInAppPurchaseProps {
  darkMode?;
}

const InAppPurchase<IInAppPurchaseProps> = ({ darkMode }) => {
  const [iapProductId, setIapProductId] = useState('com.example.product');
  const [iapProductType, setIapProductType] = useState('inapp');
  const [iapIsConsumable, setIapIsConsumable] = useState(true);
  const [resultInfo, setResultInfo] = useState('');

  const makeInAppPurchase = () => {
    inAppPurchase({
      productId,
      productType,
      isConsumable,
      callback (data) {
        const result = 'Result' + Object.values(data);
        setResultInfo(result);
        toast.success('In-app purchase initiated');
      },
    });
  };

  const getAllPurchasesFn = () => {
    getAllPurchases({
      callback (data) {
        const result = 'Result' + Object.values(data);

        setResultInfo(result);
        toast.success('Retrieved all purchases');
      },
    });
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-emerald-900 to-green-800'
          'bg-gradient-to-br from-emerald-500 to-green-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-emerald-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
        In-App Purchase
      </h3>

      <div className="bg-white/10 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-white/80 block mb-1">Product ID:</label>
              <input
                type="text"
                value={iapProductId}
                onChange={(e) => setIapProductId(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <label className="text-white/80 block mb-1">Product Type:</label>
              <input
                type="text"
                value={iapProductType}
                onChange={(e) => setIapProductType(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <label className="text-white/80">Consumable:</label>
              <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  checked={iapIsConsumable}
                  onChange={(e) => setIapIsConsumable(e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  style={{
                    right ? '0' 'auto',
                    left ? 'auto' '0',
                    transition'all 0.3s ease',
                  }}
                />
                <label
                  className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                  style={{
                    backgroundColor ? '#10B981' '#D1D5DB',
                  }}
                ></label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-end">
            <button
              onClick={makeInAppPurchase}
              className="bg-white text-emerald-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Make Purchase
            </button>

            <button
              onClick={getAllPurchasesFn}
              className="bg-white/20 text-white font-bold px-5 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2 w-full"
            >
              Get All Purchases
            </button>
          </div>
        </div>
        <Result resultInfo={resultInfo} />
      </div>
    </div>
  );
};

export default InAppPurchase;
