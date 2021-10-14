export const request = async <T>(url: string, method: string = 'GET', body: null | any = null, headers: HeadersInit = {}): Promise<T> => {
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

    return data;
  } catch (err) {
    throw err;
  }
};