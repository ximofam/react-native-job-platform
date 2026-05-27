import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import gotifyAxios from '../apis/gotifyAxios';
import UserContext from './userContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      setMessageCount(0);
      return;
    }

    let ws = null;

    const connectGotify = async () => {
      try {
        const clientResString = await AsyncStorage.getItem('gotify_client');
        if (!clientResString) return;

        const clientRes = JSON.parse(clientResString);
        const clientToken = clientRes.token;

        const historyRes = await gotifyAxios.get('/message?limit=50');
        if (historyRes && historyRes.messages) {
          setMessages(historyRes.messages);
          setMessageCount(historyRes.messages.length);
        }

        const wsBaseUrl = process.env.EXPO_PUBLIC_GOTIFY_URL.replace(/^http/, 'ws');
        ws = new WebSocket(`${wsBaseUrl}/stream?token=${clientToken}`);

        ws.onopen = () => console.log('🟢 Đã kết nối Gotify WS');

        ws.onmessage = (event) => {
          const newMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [newMessage, ...prevMessages]);
          setMessageCount((prevCount) => prevCount + 1);
        };

        ws.onerror = (error) => console.error('Lỗi WS:', error.message);

      } catch (error) {
        console.error("Lỗi khởi tạo Notification Context:", error);
      }
    };

    connectGotify();

    return () => {
      if (ws) {
        ws.close();
        console.log('Đã đóng kết nối Gotify WS');
      }
    };
  }, [user]);

  const deleteMessage = async (messageId) => {
    setMessages((prev) => prev.filter(msg => msg.id !== messageId));
    setMessageCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));

    try {
      await gotifyAxios.delete(`/message/${messageId}`);
    } catch (error) {
      console.error("Lỗi khi xóa thông báo trên server:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ messages, messageCount, deleteMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);