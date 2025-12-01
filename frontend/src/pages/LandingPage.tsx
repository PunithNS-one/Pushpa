import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Share Data Instantly
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transfer text between devices using a simple 6-digit PIN. No login, no
          accounts, completely temporary.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Link
          to="/send"
          className="card hover:shadow-xl transition-shadow duration-300 group"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-primary-100 rounded-lg p-3 group-hover:bg-primary-200 transition">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Data</h2>
              <p className="text-gray-600 mb-4">
                Create a temporary sync session and get a PIN to share
              </p>
              <div className="flex items-center text-primary-600 font-medium">
                Get started
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/receive"
          className="card hover:shadow-xl transition-shadow duration-300 group"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-lg p-3 group-hover:bg-purple-200 transition">
              <svg
                className="w-8 h-8 text-purple-600"
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
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Receive Data
              </h2>
              <p className="text-gray-600 mb-4">
                Enter a PIN to retrieve data from another device
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                Enter PIN
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="card bg-gradient-to-r from-primary-50 to-purple-50 border-primary-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">How it works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-3 shadow">
              <span className="text-xl font-bold text-primary-600">1</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Create</h4>
            <p className="text-sm text-gray-600">
              Enter your text and generate a 6-digit PIN
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-3 shadow">
              <span className="text-xl font-bold text-primary-600">2</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Share</h4>
            <p className="text-sm text-gray-600">
              Share the PIN with another device via QR or link
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-3 shadow">
              <span className="text-xl font-bold text-primary-600">3</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Retrieve</h4>
            <p className="text-sm text-gray-600">
              Enter the PIN on another device to get the data
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-yellow-600 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">
              Privacy Notice
            </h4>
            <p className="text-sm text-yellow-700">
              All data is temporary and automatically deleted after first retrieval
              or expiration. We don't store any data permanently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
