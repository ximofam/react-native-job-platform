import React, { createContext, useEffect, useState, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutApi } from '../apis/services/authService';
import { getCurrentUserApi } from '../apis/services/userService';

const UserContext = createContext();
const USER_STORAGE_KEY = 'user';

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);

      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setUser = async (userData) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUserState(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    const user = await getCurrentUserApi()
    setUser(user)
  };

  const logout = async () => {
    try {
      await logoutApi()
      setUserState(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, updateUser, logout, }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;