import { useState, useCallback, useEffect } from 'react';
import { LOCALSTORAGE_USER_DATA_NAME } from './../constants/app';
import { IUseAuth } from './../interfaces/hooks.interface';

interface LocalStorageUserData {
  userId: string;
  token: string;
}

export const useAuth = (): IUseAuth => {
  const [token, setToken] = useState<string>(null);
  const [userId, setUserId] = useState<string>(null);

  const login = useCallback((jwtToken: string, id: string): void => {
    setToken(token);
    setUserId(id);

    localStorage.setItem(LOCALSTORAGE_USER_DATA_NAME, JSON.stringify({
      userId: id, token: jwtToken
    }));    
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(LOCALSTORAGE_USER_DATA_NAME);
  }, []);

  useEffect(() => {
    const data: LocalStorageUserData = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));

    if (data && data.token && data.userId) {
      login(data.token, data.userId);
    }
  }, [login]);


  return { userId, token, login, logout };
};