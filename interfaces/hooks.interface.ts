export interface IUseRequest {
  error: Error | string;
  request: <T>(url: string, method: string, body: null | BodyInit, headers: HeadersInit) => Promise<T>;
  clearError: () => void;
}

export interface IUseInput {
  getValue: (name?: string) => any;
  clearValue: (name?: string) => void;
  onChange: (event: any) => void;
  onBlur: (event: any) => void;
  validationErrors: Record<string, { message: string }>;
  bindEvents: {
    onBlur: (event: any) => void;
    onChange: (event: any) => void;
  }
}

export interface IUseAuth {
  login: (userId: string, jwtToken: string) => void,
  logout: () => void;
  userId: string;
  token: string;
}