import { useState } from "react";

export async function useRequest<T>(url: string, method: string, body: null | BodyInit, headers: HeadersInit) {
  const [error, setError] = useState<Error>(null);
  const [data, setData] = useState<T>(null);
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
    setData(data);
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
  } catch (err) {
    setError(err);
    throw err;
  }

  return { error, data };
}