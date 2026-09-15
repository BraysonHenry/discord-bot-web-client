'use client';
import React, { useState } from 'react';
import { Key, ShieldAlert } from 'lucide-react';

interface Props {
  onLogin: (token: string) => void;
}

export default function LoginModal({ onLogin }: Props) {
  const [token, setToken] = useState('');
  const [step, setStep] = useState<'input' | 'confirm'>('input');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) setStep('confirm');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#2b2d31] w-full max-w-md p-6 rounded-lg border border-[#1e1f22] shadow-2xl">
        {step === 'input' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-center">DiscordBotWebClient</h2>
            <p className="text-xs text-gray-400 text-center">Enter your bot token to connect.</p>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Bot Token</label>
              <div className="relative">
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full bg-[#1e1f22] p-2.5 rounded border border-transparent focus:border-[#5865f2] focus:outline-none text-sm text-white"
                  placeholder="MTA2..."
                  required
                />
                <Key className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <button className="w-full bg-[#5865f2] hover:bg-[#4752c4] p-2.5 rounded font-medium text-sm transition">
              Verify Settings
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-lg text-white">Bot Intent Verification</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Ensure <strong>Message Content Intent</strong> and <strong>Server Members Intent</strong> are turned ON inside your Discord Developer Portal for full functionality.
            </p>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setStep('input')}
                className="w-1/2 bg-gray-600 hover:bg-gray-700 p-2 rounded text-sm font-medium"
              >
                Back
              </button>
              <button
                onClick={() => onLogin(token)}
                className="w-1/2 bg-[#23a55a] hover:bg-[#1d8a4b] p-2 rounded text-sm font-medium"
              >
                Confirm & Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
