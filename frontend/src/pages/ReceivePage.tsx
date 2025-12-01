import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSession } from '../api/client';
import ErrorBanner from '../components/ErrorBanner';

const ReceivePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [pin, setPin] = useState(searchParams.get('pin') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ type: string; content: string } | null>(
    null
  );

  useEffect(() => {
    const pinFromUrl = searchParams.get('pin');
    if (pinFromUrl && pinFromUrl.length === 6) {
      setPin(pinFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 6) {
      setError('PIN must be exactly 6 digits');
      return;
    }

    if (!/^\d{6}$/.test(pin)) {
      setError('PIN must contain only numbers');
      return;
    }

    setLoading(true);

    try {
      const response = await fetchSession({ pin });
      setResult(response);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error;
      
      if (errorMessage === 'PIN expired or not found') {
        setError("This PIN doesn't exist or has expired.");
      } else if (errorMessage === 'Data already consumed') {
        setError('This PIN has already been used.');
      } else {
        setError('Failed to fetch data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setPin('');
    setError('');
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleReset}
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Receive Another
          </button>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Received Data</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Success
            </span>
          </div>

          {result.type === 'text' && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-800 whitespace-pre-wrap break-words">
                {formatContent(result.content)}
              </p>
            </div>
          )}

          {result.type === 'image' && (
            <div className="mb-6">
              <img
                src={result.content}
                alt="Received content"
                className="max-w-full rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-yellow-600 mr-3 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This data was delivered once and is now
                invalid. The PIN cannot be used again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Receive Data</h1>
        <p className="text-gray-600">
          Enter the 6-digit PIN to retrieve data from another device
        </p>
      </div>

      <ErrorBanner message={error} onClose={() => setError('')} />

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-6">
          <label
            htmlFor="pin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter PIN
          </label>
          <input
            type="text"
            id="pin"
            value={pin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setPin(value);
            }}
            className="input-field text-center text-3xl font-mono tracking-widest"
            placeholder="000000"
            maxLength={6}
            autoComplete="off"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            Enter the 6-digit PIN you received
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || pin.length !== 6}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Fetching...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Fetch Data
            </>
          )}
        </button>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start text-sm text-gray-600">
            <svg
              className="w-5 h-5 text-gray-400 mr-3 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-medium text-gray-700 mb-1">Privacy Notice</p>
              <p>
                Data can only be retrieved once. After successful retrieval, the
                PIN becomes invalid and the data is permanently deleted.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReceivePage;
