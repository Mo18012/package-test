import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ScanLine } from 'lucide-react';
import { BarcodeScan, Format } from 'webtonative/barcode';
import Result from './Result';

const ScanBarcodeCard: React.FC = () => {
  const [barcodeFormat, setBarcodeFormat] = useState<number | undefined>(
    Format.ALL_FORMATS,
  );
  
  const [result,setResult]=useState("")

  const scanBarcodeFun = () => {
    const storeFormat = barcodeFormat ?? Format.ALL_FORMATS; // Default to 1 if not provided

    BarcodeScan({
      format: storeFormat,
      onBarcodeSearch: (value: string) => {
        setResult(value)
        console.log('Scanned value:', value);
        toast.success(`Scanned Barcode: ${value}`);
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-sky-950 via-cyan-900 to-sky-950 border border-cyan-700 rounded-xl p-6 mb-6 shadow-lg mx-auto text-white">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ScanLine className="w-5 h-5 text-cyan-400" />
        Scan Barcode
      </h3>

      {/* Input */}
      <input
        id="barcodeFormatBox"
        type="number"
        value={barcodeFormat ?? ''}
        onChange={(e) => setBarcodeFormat(Number(e.target.value))}
        placeholder="Barcode Format e.g. 1 (optional)"
        className="w-full px-4 py-2 mb-4 rounded-lg bg-cyan-950 text-cyan-100 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Button */}
      <button
        onClick={scanBarcodeFun}
        className="w-full sm:w-auto px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <ScanLine className="w-4 h-4" />
        Scan
      </button>

      <Result resultInfo={result}/>
    </div>
  );
};

export default ScanBarcodeCard;
