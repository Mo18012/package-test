import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';

export interface IFileDownloadProps {
  darkMode?: boolean;
}

const FileDownload: FC<IFileDownloadProps> = ({ darkMode }) => {
  const [downloadUrl, setDownloadUrl] = useState('');

  const downloadFileFn = () => {
    if (typeof window !== 'undefined' && downloadUrl) {
      window.location.href = downloadUrl + '?wtn-download-file=true';
      toast.success('Download initiated');
    } else {
      toast.error('Please enter a valid URL');
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gradient-to-br from-amber-900 to-orange-800'
          : 'bg-gradient-to-br from-amber-500 to-orange-500'
      } p-6 rounded-xl shadow-lg mb-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-xl font-bold mb-4 text-white flex items-center">
        <span className="bg-white text-amber-600 p-2 rounded-full mr-3 inline-flex items-center justify-center w-8 h-8">
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </span>
        File Download
      </h3>

      <div className="bg-white/10 p-4 rounded-lg mb-4">
        <p className="text-white/80 mb-4">
          Download files directly to the device's storage using WebToNative's file download capability.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
            placeholder="Enter file URL to download"
            className="flex-grow p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            onClick={downloadFileFn}
            className="bg-white text-amber-600 font-bold px-5 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileDownload;