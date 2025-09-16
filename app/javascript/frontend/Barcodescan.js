import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ScanLine } from 'lucide-react';
import { BarcodeScan, Format } from 'webtonative/barcode';

export default function ScanBarcodeCard() {
  const [barcodeFormat, setBarcodeFormat] = useState();

  const scanBarcodeFun = () => {
    const storeFormat = barcodeFormat ?? 1; // default 1

    BarcodeScan({
      format: storeFormat,
      onBarcodeSearch: (value) => {
        toast.success(`Scanned Barcode${value}`);
      },
    });
  };

  return (
    <div
      className="
        bg-cyan-950 border border-cyan-700 rounded-xl p-6 mb-6
        shadow-lg  mx-auto text-cyan-100
        transition-transform transform hover:scale-[1.01] hover:shadow-xl
      "
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ScanLine className="w-5 h-5 text-cyan-400" />
        Scan Barcode
      </h3>

      <input
        type="number"
        placeholder="Barcode Format e.g. 1 (optional)"
        className="
          w-full px-4 py-2 rounded-lg 
          bg-cyan-900 text-cyan-100 placeholder-cyan-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500
          mb-4
        "
        value={barcodeFormat ?? ''}
        onChange={(e) => setBarcodeFormat(Number(e.target.value))}
      />

      <button
        onClick={scanBarcodeFun}
        className="
          w-full sm:w-auto px-5 py-2 rounded-lg
          bg-cyan-600 text-cyan-50 font-medium
          hover:bg-cyan-500
          flex items-center justify-center gap-2 transition-colors
        "
      >
        <ScanLine className="w-4 h-4" />
        Scan
      </button>
    </div>
  );
}
