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
  bindEvents: {
    onBlur: (event: any) => void;
    onChange: (event: any) => void;
  },
  getValidationErrorMessage: (name: string) => string | null;
}

export interface IUseAuth {
  login: (userId: string, jwtToken: string) => void,
  logout: () => void;
  userId: string;
  token: string;
}