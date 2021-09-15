import { useState, useCallback, useEffect, useMemo } from 'react';
import { LOCALSTORAGE_USER_DATA_NAME } from './../constants/app';
import { IUseAuth } from './../interfaces/hooks.interface';

interface LocalStorageUserData {
  userId: string;
  token: string;
}

export const useAuth = (): IUseAuth => {
  const [token, setToken] = useState<string>(null);
  const [userId, setUserId] = useState<string>(null);
  
  console.log('inside: ', { token, userId });
  const login = useCallback((jwtToken: string, id: string): void => {
    setToken(jwtToken);
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
    console.log('inside totototo');
    const data: LocalStorageUserData = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));
    
    if (data && data.token && data.userId) {
      login(data.token, data.userId);
    }
  }, [login]);


  return useMemo(() => ({ userId, token, login, logout }), [token, userId, login, logout]);
};