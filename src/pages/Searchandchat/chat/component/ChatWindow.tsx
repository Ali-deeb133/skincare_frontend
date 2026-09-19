

import React, { useRef, useEffect } from 'react';
import { useChatbot } from '../../../../hooks/usechatbot';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<Props> = ({ isOpen, onClose }) => {
  const { messages, isTyping, sendMessage, clearMessages, isLoggedIn } = useChatbot();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      <aside
        style={{
          top: '7rem',
          height: 'calc(100vh - 7rem)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 1000ms cubic-bezier(0.22,1,0.36,1), opacity 1000ms cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        className="fixed right-0 bottom-0 z-50 w-[340px] flex flex-col bg-white/85 backdrop-blur-2xl border-l border-[rgba(240,174,207,0.4)] rounded-3xl shadow-[0_4px_30px_rgba(192,80,138,0.1)] will-change-transform"
      >
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4 bg-gradient-to-r from-[rgba(248,215,232,0.5)] to-white/60 border-b border-[rgba(240,174,207,0.3)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e07aab] to-[#c0508a] flex items-center justify-center text-xl shadow-[0_4px_12px_rgba(192,80,138,0.3)] shrink-0">
              🌸
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[14px] font-bold text-[#2d1a28]">Glōw AI — Your Consultant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.6)] animate-pulse" />
              </div>
            </div>

            {/* زر الحذف */}
            <button
              onClick={clearMessages}
              title="Clear chat"
              className="w-7 h-7 rounded-full bg-white border border-[rgba(240,174,207,0.4)] flex items-center justify-center text-[#9e6e8a] hover:bg-[rgba(248,215,232,0.4)] hover:text-[#c0508a] transition-all text-sm"
            >
              🗑️
            </button>

            {/* زر الإغلاق */}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white border border-[rgba(240,174,207,0.4)] flex items-center justify-center text-[#9e6e8a] hover:bg-[rgba(248,215,232,0.4)] hover:text-[#c0508a] transition-all text-sm"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-[#9e6e8a] mt-2 mr-[52px]">
            Ask me about skincare routines, product recommendations, or ingredient info!
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[rgba(240,174,207,0.5)] scrollbar-track-transparent">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e07aab] to-[#c0508a] flex items-center justify-center text-sm shrink-0">
                🌸
              </div>
              <div className="px-4 py-3 bg-white border border-[rgba(240,174,207,0.4)] rounded-2xl rounded-bl-sm shadow-[0_2px_10px_rgba(192,80,138,0.08)] flex gap-1.5">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#e07aab] animate-bounce"
                    style={{ animationDelay:` ${delay}s `}}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>{/* Input */}
        <ChatInput onSend={sendMessage} disabled={isTyping} isLoggedIn={isLoggedIn} />
      </aside>
    </>
  );
};

export default ChatWindow;