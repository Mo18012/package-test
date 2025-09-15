'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { makeTapToPay } from 'webtonative/Stripe';
const containerStyle: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#121212',
  color: '#e0e0e0',
  minHeight: '100vh',
  padding: 20,
  maxWidth: 600,
  margin: '0 auto',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 6,
  fontWeight: '600',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  fontSize: 16,
  borderRadius: 6,
  border: '1px solid #444',
  backgroundColor: '#1e1e1e',
  color: '#e0e0e0',
  marginBottom: 20,
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 24px',
  fontSize: 16,
  backgroundColor: '#0d6efd',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const callbackBoxStyle: React.CSSProperties = {
  marginTop: 20,
  backgroundColor: '#1e1e1e',
  padding: 12,
  borderRadius: 6,
  whiteSpace: 'pre-wrap',
  minHeight: 80,
  fontFamily: 'monospace',
};

const StripeTapToPayDemo: React.FC = () => {
  const [connectionToken, setConnectionToken] =
    useState<string>('Fetching token...');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [stripeLocationId, setStripeLocationId] =
    useState<string>('tml_GD4XLAIu9ajhoD');
  const [callbackData, setCallbackData] = useState<string>(
    'Callback data will appear here.',
  );

  useEffect(() => {
    // Fetch connection token on mount
    async function fetchConnectionToken() {
      try {
        const response = await fetch(
          'http://192.168.1.40:4242/connection_token',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          },
        );
        if (!response.ok) throw new Error('Failed to fetch token');
        const data = await response.json();
        setConnectionToken(data.secret);
        console.log('Fetched connection token:', data.secret);
      } catch (error) {
        console.error('Error fetching connection token:', error);
        setConnectionToken('Error fetching token');
      }
    }
    fetchConnectionToken();
  }, []);

  const makePayment = () => {
    console.log(
      'ConnectionToken:',
      connectionToken,
      'ClientSecret:',
      clientSecret,
      'LocationId:',
      stripeLocationId,
    );

    makeTapToPay({
      connectionToken,
      stripeLocationId,
      clientSecret,
      isSimulated: true,
      amount: 100,
      currency: 'INR',
      callback: (data: any) => {
        const jsonData = JSON.stringify(data, null, 2);
        setCallbackData(jsonData);
        alert(jsonData);
      },
    });
    toast.success('stripe tap to pay');
  };

  return (
    <div style={containerStyle}>
      <h2>Stripe Tap to Pay Demo</h2>

      <label style={labelStyle}>Connection Token:</label>
      <input type="text" value={connectionToken} readOnly style={inputStyle} />

      <label style={labelStyle}>Client Secret:</label>
      <input
        type="text"
        value={clientSecret}
        onChange={(e) => setClientSecret(e.target.value)}
        style={inputStyle}
        placeholder="Enter client secret"
      />

      <label style={labelStyle}>Stripe Location ID:</label>
      <input
        type="text"
        value={stripeLocationId}
        onChange={(e) => setStripeLocationId(e.target.value)}
        style={inputStyle}
      />

      <button style={buttonStyle} onClick={makePayment}>
        Pay Mohit
      </button>

      <div style={callbackBoxStyle}>{callbackData}</div>
    </div>
  );
};

export default StripeTapToPayDemo;
