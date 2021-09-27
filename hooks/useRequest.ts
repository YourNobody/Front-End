import { useCallback, useEffect, useState } from "react";

interface IUseRequest {
  error: string;
  request: <T>(url: string, method?: string, body?: null | any, headers?: HeadersInit) => Promise<T>;
  clearError: () => void;
  loading: boolean;
}

export function useRequest(): IUseRequest {
  const [error, setError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const request = useCallback(async <T>(url: string, method: string = 'GET', body: null | any = null, headers: HeadersInit = {}): Promise<T> => {
    setLoading(true);
    
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
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { error, request, clearError, loading };
}