'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { makeTapToPay } from 'webtonative/Stripe';
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#121212',
  color: '#e0e0e0',
  minHeight: '100vh',
  padding: '20px',
  maxWidth: 600,
  margin: '0 auto',
};

const labelStyle = {
  display: 'block',
  marginBottom: 40,
  fontWeight: '600',
};


const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #444',
  backgroundColor: '#1e1e1e',
  color: '#e0e0e0',
  marginBottom: 4,
};

const buttonStyle = {
  padding: '10px 24px',
  fontSize: '16px',
  backgroundColor: '#0d6efd',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const callbackBoxStyle = {
  marginTop: '20px',
  backgroundColor: '#1e1e1e',
  padding: '20px',
  borderRadius: '5px',
  whiteSpace: 'pre-wrap',
  minHeight: 100,
  fontFamily: 'monospace',
};

const StripeTapToPayDemo = () => {
  const [connectionToken, setConnectionToken] = useState('Fetching token...');
  const [clientSecret, setClientSecret] = useState('');
  const [stripeLocationId, setStripeLocationId] =
    useState('tml_GD4XLAIu9ajhoD');
  const [callbackData, setCallbackData] = useState(
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
      isSimulated,
      amount,
      currency: 'INR',
      callback: (data) => {
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
