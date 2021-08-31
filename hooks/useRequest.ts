import { useCallback, useState } from "react";

interface IUseRequest {
  data: any;
  error: string;
  request: (url: string, method?: string, body?: null | BodyInit, headers?: HeadersInit) => void;
  clearError: () => void;
  clearData: () => void;
}

export function useRequest(): IUseRequest {
  const [error, setError] = useState<string>(null);
  const [data, setData] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const request = useCallback(async (url: string, method: string = 'GET', body: null | BodyInit = null, headers: HeadersInit = {}): Promise<any> => {
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-type'] = 'application/json';
      }
    
      if (method === 'GET') {
        body = null;
      }
    
      const response: Response = await fetch(url, { method, body, headers });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setData(data);
      return data;
    } catch (err) {
      setData(null);
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearData = useCallback(() => setData(null), []);

  return { error, request, clearError, clearData, data };
}