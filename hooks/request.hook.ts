import { useCallback, useState } from "react";
import { IUseRequest } from "../interfaces/hooks.interface";

export function useRequest(): IUseRequest {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string>(null);

  const request = useCallback(async <T>(url: string, method: string, body: null | BodyInit, headers: HeadersInit): Promise<T> => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-type'] = 'application/json';
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

  const clearError = (): void => {
    setError(null);
  };

  return { loading, error, request, clearError };
}