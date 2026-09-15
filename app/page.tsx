'use client';
import React, { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal';
import { Hash, Volume2, Mic, MicOff, PhoneOff } from 'lucide-react';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [botUser, setBotUser] = useState<any>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('bot_token');
    if (savedToken) handleLogin(savedToken);
  }, []);

  const handleLogin = async (authToken: string) => {
    try {
      const res = await fetch('/api/discord/users/@me', {
        headers: { 'x-bot-token': authToken },
      });
      const data = await res.json();

      if (res.ok) {
        setToken(authToken);
        setBotUser(data);
        localStorage.setItem('bot_token', authToken);
      } else {
        alert(`Login failed: ${data.message || 'Invalid Token'}`);
        localStorage.removeItem('bot_token');
      }
    } catch (err) {
      alert('Proxy server request error');
    }
  };

  if (!token) return <LoginModal onLogin={handleLogin} />;

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Column 1: Guild Sidebar */}
      <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 space-y-2">
        <div className="w-12 h-12 bg-[#5865f2] rounded-[16px] flex items-center justify-center font-bold">
          Bot
        </div>
        <div className="w-8 h-[2px] bg-[#35363c] rounded" />
      </div>

      {/* Column 2: Channel Sidebar */}
      <div className="w-60 bg-[#2b2d31] flex flex-col justify-between">
        <div>
          <div className="h-12 border-b border-[#1f2023] px-4 flex items-center font-bold text-sm shadow-sm">
            Select Guild
          </div>
          <div className="p-2 space-y-1">
            <div className="flex items-center space-x-2 p-1.5 rounded hover:bg-[#35373c] text-gray-400 hover:text-white cursor-pointer text-sm">
              <Hash className="w-4 h-4" />
              <span>general</span>
            </div>
            <div className="flex items-center space-x-2 p-1.5 rounded hover:bg-[#35373c] text-gray-400 hover:text-white cursor-pointer text-sm">
              <Volume2 className="w-4 h-4 text-green-400" />
              <span>General Voice</span>
            </div>
          </div>
        </div>

        {/* Voice Channel Status Card */}
        <div className="bg-[#111214] p-2 space-y-2">
          <div className="flex items-center justify-between text-xs text-green-400 px-1">
            <span className="font-semibold">Voice Connected</span>
            <PhoneOff className="w-4 h-4 text-red-400 cursor-pointer hover:opacity-80" />
          </div>
          {/* User Profile Footer */}
          <div className="flex items-center justify-between bg-[#232428] p-1.5 rounded">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-xs">
                {botUser?.username?.[0] || 'B'}
              </div>
              <div className="text-xs">
                <p className="font-bold">{botUser?.username || 'Bot User'}</p>
                <p className="text-[10px] text-gray-400">#{botUser?.discriminator || '0000'}</p>
              </div>
            </div>
            <Mic className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Column 3: Main Chat Window */}
      <div className="flex-1 bg-[#313338] flex flex-col justify-between">
        <div className="h-12 border-b border-[#232428] px-4 flex items-center space-x-2">
          <Hash className="w-5 h-5 text-gray-400" />
          <span className="font-bold text-sm">general</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="text-xs text-gray-400">Connected to channel log...</div>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Message #general as Bot..."
            className="w-full bg-[#383a40] p-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
