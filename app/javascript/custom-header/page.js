"use client";

import { useEffect } from "react";

const CustomHeader = () => {
  const fetchHeaders = async () => {
    const res = await fetch("/api/custom-header", { method: "GET" });

    const data = await res.json();
    console.log("Response JSON:", data);
  };

  useEffect(() => {
    fetchHeaders();
  }, []);

  return <div>CustomHeader

    <p> check network tab to see the headers in the response and check the vercel logs to see the request headers </p>
  </div>;
};

export default CustomHeader;
