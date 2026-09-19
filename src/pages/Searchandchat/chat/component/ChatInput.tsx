


import React, { useState, useCallback } from 'react';

interface Props {
  onSend: (msg: string) => void;
  disabled?: boolean;
  isLoggedIn: boolean;
}

const ChatInput: React.FC<Props> = ({ onSend, disabled, isLoggedIn }) => {
  const [text, setText] = useState('');
  const [showHint, setShowHint] = useState(false);

  const submit = useCallback(() => {
    if (!text.trim() || disabled || !isLoggedIn) return;
    onSend(text.trim());
    setText('');
  }, [text, disabled, onSend, isLoggedIn]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-[rgba(240,174,207,0.3)] bg-white/60 p-3 space-y-2.5">

      {/* إشعار إذا مش logged in */}
      {!isLoggedIn && showHint && (
        <div className="text-center text-[11px] text-[#c0508a] bg-[rgba(248,215,232,0.5)] rounded-full py-1.5 px-3 animate-[fadeSlide_0.3s_ease]">
          🔒 Please login to start chatting
        </div>
      )}

      <div
        className={`flex items-center gap-2 bg-white border rounded-full px-4 py-2 transition-all duration-200 ${
          !isLoggedIn || disabled
            ? 'opacity-60 cursor-not-allowed'
            : 'border-[rgba(240,174,207,0.5)] focus-within:border-[#e07aab] focus-within:shadow-[0_0_0_3px_rgba(224,122,171,0.1)]'
        }`}
        onClick={() => { if (!isLoggedIn) setShowHint(true); }}
      >
        <input
          dir="rtl"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoggedIn ? 'Type your message...' : '🔒 Login to chat...'}
          disabled={disabled || !isLoggedIn}
          className="flex-1 bg-transparent text-[13px] text-[#2d1a28] placeholder:text-[#9e6e8a] outline-none min-w-0 disabled:cursor-not-allowed"
        />

        <button
          onClick={submit}
          disabled={!text.trim() || disabled || !isLoggedIn}
          className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-[#e07aab] to-[#c0508a] text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 hover:shadow-[0_3px_10px_rgba(192,80,138,0.4)] transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;