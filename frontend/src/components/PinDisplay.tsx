import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface PinDisplayProps {
  pin: string;
  expiresIn: number;
  onDelete?: () => void;
}

const PinDisplay: React.FC<PinDisplayProps> = ({ pin, expiresIn, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const receiveUrl = `${window.location.origin}/receive?pin=${pin}`;

  const copyPin = () => {
    navigator.clipboard.writeText(pin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(receiveUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  return (
    <div className="card max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your PIN</h3>
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 mb-4">
          <p className="text-5xl font-mono font-bold text-white tracking-wider">
            {pin}
          </p>
        </div>
        <p className="text-sm text-gray-600">
          Valid for <span className="font-semibold">{formatTime(expiresIn)}</span>
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <button
          onClick={copyPin}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy PIN
            </>
          )}
        </button>

        <button
          onClick={copyLink}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          {linkCopied ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Link Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Link
            </>
          )}
        </button>

        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium w-full py-2 transition"
          >
            Delete Now
          </button>
        )}
      </div>

      <div className="border-t pt-6">
        <p className="text-xs text-gray-500 text-center mb-4">
          Scan QR code to receive on another device
        </p>
        <div className="flex justify-center bg-white p-4 rounded-lg">
          <QRCodeSVG value={receiveUrl} size={200} level="H" />
        </div>
      </div>
    </div>
  );
};

export default PinDisplay;
