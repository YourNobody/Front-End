import { DetailedHTMLProps, FormEvent, HTMLAttributes } from 'react'

export interface IUseRequest {
  error: Error | string;
  request: <T>(url: string, method: string, body: null | BodyInit, headers: HeadersInit) => Promise<T>;
  clearError: () => void;
}

export interface IUseInput {
  getValues?: (name?: string) => string | Record<string, string>;
  clearValues?: (name?: string) => void;
  register?: (name: string, options: IUseInputOptions) => IUseInputOptions;
  handleSubmit?: (cb?: (formData: Record<string, unknown>) => void) => any;
  formState?: {
    errors?: Record<string, { message: string }>;
    state?: Record<string, string>;
  }
}

export interface IUseInputOptions extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'> {
  'data-exclude'?: 1 | 0 | '1' | '0';
  error?: string | null;
}

export interface IUseInputOptionsAdditional {
  disableValidation?: boolean;
  exclude?: boolean;
}

export interface IUseAuth {
  login: (userId: string, jwtToken: string) => void,
  logout: () => void;
  userId: string;
  token: string;
}