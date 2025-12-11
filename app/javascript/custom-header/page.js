"use client";

import { useEffect, useState } from "react";

const CustomHeader = () => {
  const [headersData, setHeadersData] = useState < any > null;

  const fetchHeaders = async () => {
    const res = await fetch("/api/custom-header", { method: "GET" });

    const data = await res.json();
    console.log("Response JSON:", data); // visible in browser

    setHeadersData(data.headers);
  };

  useEffect(() => {
    fetchHeaders();
  }, []);

  return (
    <div>
      <h2>CustomHeader</h2>
      <p>Check Vercel logs for request headers</p>
      <p>Check browser console for response JSON</p>

      <h3>Headers Returned from API:</h3>
      <pre className="text-sm bg-gray-100 p-2 mt-2">
        {headersData ? JSON.stringify(headersData, null, 2) : "Loading..."}
      </pre>
    </div>
  );
};

export default CustomHeader;
