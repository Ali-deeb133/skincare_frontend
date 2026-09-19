

import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../../../types/chat.type';

interface Props {
  message: ChatMessageType;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const isBot = message.role === 'bot';

  const time = new Date(message.timestamp).toLocaleTimeString('ar', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex items-end gap-2 ${
        isBot ? 'flex-row' : 'flex-row-reverse'
      } animate-[fadeSlide_0.3s_ease]`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e07aab] to-[#c0508a] flex items-center justify-center text-sm shrink-0 mb-1 shadow-[0_2px_8px_rgba(192,80,138,0.3)]">
          🌸
        </div>
      )}

      <div className="max-w-[85%]">
        <div
          className={`
            px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed
            ${
              isBot
                ? 'bg-white border border-[rgba(240,174,207,0.4)] text-[#2d1a28] rounded-bl-sm shadow-[0_2px_10px_rgba(192,80,138,0.08)]'
                : 'bg-gradient-to-br from-[#e07aab] to-[#c0508a] text-white rounded-br-sm'
            }
          `}
        >
          <p>{message.content}</p>

          {isBot && message.product_name && (
            <div className="mt-3 border-t pt-3">
              <p>
                <strong>Product:</strong> {message.product_name}
              </p>

              <p>
                <strong>Type:</strong> {message.product_type}
              </p>

              <p>
                <strong>Skin Type:</strong> {message.skin_type_user}
              </p>
            </div>
          )}

          {isBot &&
            message.recommendations &&
            message.recommendations.length > 0 && (
              <div className="mt-4 border-t pt-3">
                <h4 className="font-semibold mb-2">
                  Similar Products
                </h4>

                <div className="space-y-2">
                  {message.recommendations.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border p-2 text-xs"
                    >
                      <p className="font-medium">
                        {item.product_name}
                      </p>

                      <p>{item.brand}</p>

                      <p>{item.product_type}</p>

                      <p>£{item.price}</p>

                      {/* <p>
                        Similarity:{' '}
                        {(item.similarity * 100).toFixed(1)}%
                      </p> */}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        <p
          className={`text-[10px] text-[#9e6e8a] mt-1 ${
            isBot ? 'text-right' : 'text-left'
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

