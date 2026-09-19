
import api from './api';

export const chatbotService = {
  sendMessage: (text: string) =>
    api.post('/api/decision/check/', {
      text
    }),
};