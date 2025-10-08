"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { makeTapToPay } from "webtonative/Stripe"; // ✅ Correct import

const StripeTapToPay: React.FC = () => {
  const [connectionToken, setConnectionToken] = useState("");
  const [clientSecret, setClientSecret] = useState(
    "pi_3SFs2CF5uCWG6brT0mJyFyhZ_secret_8NsWQTHjLD0oqnT6GtefuBmK8"
  );
  const [stripeLocationId, setStripeLocationId] = useState(
    "tml_GD4XLAIu9ajhoD"
  );
  const [callbackData, setCallbackData] = useState<any>(null);

  const makePayment = () => {
    if (!connectionToken || !clientSecret || !stripeLocationId) {
      toast.error("⚠️ Please fill all fields before continuing!");
      return;
    }

    try {
      makeTapToPay({
  connectionToken,
  stripeLocationId,
  clientSecret,
  isSimulated: true,
  amount: 1000,        // Amount in cents, e.g., $10.00
  currency: "usd",     // Currency code
  callback: (data) => {
    console.log("Stripe callback:", data);
    setCallbackData(data);
    toast.success("✅ Payment completed!");
  },
});

    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast.error("❌ Payment initialization failed.");
    }
  };

  return (
    <div className="bg-white border-2 border-purple-500 rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4 text-purple-700">
        💳 Stripe Tap To Pay (Webtonative)
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Connection Token"
          value={connectionToken}
          onChange={(e) => setConnectionToken(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Client Secret"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Stripe Location ID"
          value={stripeLocationId}
          onChange={(e) => setStripeLocationId(e.target.value)}
          className="border p-2 rounded-lg"
        />
      </div>

      <button
        onClick={makePayment}
        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 mt-4 w-full"
      >
        💰 Pay Mohit
      </button>

      {callbackData && (
        <pre className="mt-4 bg-gray-100 p-3 rounded-lg text-sm break-words">
          {JSON.stringify(callbackData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default StripeTapToPay;
