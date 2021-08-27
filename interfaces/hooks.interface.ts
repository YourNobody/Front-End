export interface IUseRequest {
  error: Error | string;
  loading: boolean;
  request: <T>(url: string, method: string, body: null | BodyInit, headers: HeadersInit) => Promise<T>;
  clearError: () => void;
}