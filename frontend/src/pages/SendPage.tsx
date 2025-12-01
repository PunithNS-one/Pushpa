import React, { useState } from 'react';
import { createSession } from '../api/client';
import ErrorBanner from '../components/ErrorBanner';
import PinDisplay from '../components/PinDisplay';
import { deleteSession } from '../api/client';

const SendPage: React.FC = () => {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState(600); // 10 minutes default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ pin: string; expiresIn: number } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Please enter some content to share');
      return;
    }

    if (mode === 'text' && content.length > 10 * 1024) {
      setError('Text content exceeds 10KB limit');
      return;
    }

    setLoading(true);

    try {
      const response = await createSession({
        type: mode,
        content,
        ttlSeconds: ttl,
      });

      setResult(response);
      setContent(''); // Clear the form
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Failed to create session. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!result) return;

    try {
      await deleteSession(result.pin);
      setResult(null);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete session');
    }
  };

  const handleReset = () => {
    setResult(null);
    setContent('');
    setError('');
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
            Create Another
          </button>
        </div>

        <ErrorBanner message={error} onClose={() => setError('')} />

        <PinDisplay
          pin={result.pin}
          expiresIn={result.expiresIn}
          onDelete={handleDelete}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Data</h1>
        <p className="text-gray-600">
          Create a temporary sync session and share the PIN with another device
        </p>
      </div>

      <ErrorBanner message={error} onClose={() => setError('')} />

      <form onSubmit={handleSubmit} className="card">
        {/* Mode Toggle */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Type
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode('text')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                mode === 'text'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
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
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                Text
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMode('image')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                mode === 'image'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled
            >
              <div className="flex items-center justify-center gap-2">
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Image (Coming Soon)
              </div>
            </button>
          </div>
        </div>

        {/* Content Input */}
        {mode === 'text' && (
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="input-field resize-none"
              placeholder="Enter the text you want to share..."
              maxLength={10 * 1024}
            />
            <p className="text-xs text-gray-500 mt-1">
              {content.length} / {10 * 1024} characters
            </p>
          </div>
        )}

        {/* TTL Selector */}
        <div className="mb-6">
          <label
            htmlFor="ttl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Valid For
          </label>
          <select
            id="ttl"
            value={ttl}
            onChange={(e) => setTtl(Number(e.target.value))}
            className="input-field"
          >
            <option value={300}>5 minutes</option>
            <option value={600}>10 minutes</option>
            <option value={1800}>30 minutes</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !content.trim()}
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
              Creating...
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Generate PIN
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SendPage;
