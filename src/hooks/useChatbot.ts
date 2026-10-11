import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { chatbotService } from '../services/chatbotService';
import type { ChatMessage } from '../types/chat.types';
import { useAuthStore } from '../store/authStore';

const getStorageKey = (userId: string) => `lumiere_chat_${userId}`;

const WELCOME_MESSAGE: ChatMessage = {
  id: '0',
  role: 'bot',
  content: "Hello! 💕 I'm your skincare assistant. Ask me about any product or ingredient!",
  timestamp: new Date(),
};

const loadMessages = (storageKey: string | null): ChatMessage[] => {
  if (!storageKey) return [WELCOME_MESSAGE];
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return [WELCOME_MESSAGE];
    return JSON.parse(saved).map((msg: ChatMessage) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch {
    return [WELCOME_MESSAGE];
  }
};

export const useChatbot = () => {
  const { user } = useAuthStore();
  const storageKey = user ? getStorageKey(String(user.id)) : null;

  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages(storageKey));

  const [isTyping, setIsTyping] = useState(false);

  // إذا تغير المستخدم، حمّل محادثته
  const [loadedKey, setLoadedKey] = useState(storageKey);
  if (storageKey !== loadedKey) {
    setLoadedKey(storageKey);
    setMessages(loadMessages(storageKey));
  }

  // حفظ تلقائي كل ما تتغير الرسائل
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!user) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const res = await chatbotService.sendMessage(text);
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: res.data.message ?? 'No response',
          timestamp: new Date(),

          product_name: res.data.product_name,
          product_type: res.data.product_type,
          skin_type_user: res.data.skin_type_user,
          recommendations: res.data.recommendations,
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (error: unknown) {
        const errorMessage =
          (axios.isAxiosError<{ message?: string }>(error) && error.response?.data?.message) ||
          'Something went wrong. Please try again.';

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'bot',
            content: errorMessage,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [user]
  );

  const clearMessages = useCallback(() => {
    if (storageKey) localStorage.removeItem(storageKey);
    setMessages([WELCOME_MESSAGE]);
  }, [storageKey]);

  return { messages, isTyping, sendMessage, clearMessages, isLoggedIn: !!user };
};
