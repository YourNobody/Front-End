import { DetailedHTMLProps, FormEvent, HTMLAttributes } from 'react'

export interface IUseRequest {
  error: Error | string;
  request: <T>(url: string, method: string, body: null | BodyInit, headers: HeadersInit) => Promise<T>;
  clearError: () => void;
}

export interface IUseInput {
  getValues?: (name?: string) => string | Record<string, unknown>;
  clearValues?: (name?: string) => void;
  register?: (name: string, options?: IUseInputOptions, additionalOptions?: IUseInputOptionsAdditional) => IUseInputOptions;
  handleSubmit?: (cb?: (formData: Record<string, unknown>) => Promise<any> | any) => any;
  formState?: {
    errors?: Record<string, { message: string }>;
    state?: Record<string, string>;
  }
}

export interface IUseInputOptions extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  'data-exclude'?: 1 | 0 | '1' | '0';
  error?: string | null;
}

export interface IUseInputOptionsAdditional {
  disableValidation?: boolean;
  exclude?: boolean;
  onChangeCallback?: (value: string) => string;
}

export interface IUseAuth {
  login: (userId: string, jwtToken: string) => void,
  logout: () => void;
  userId: string;
  token: string;
}

export interface IUseEstimationReturn {
  value: number,
  getEstimationElement: (props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element;
}

export interface IUseEstimation {
  range?: number | string;
  onRatingClick?: (index?: number | string) => void;
  onRatingHover?: (index?: number | string) => void;
  onRatingOut?: () => void;
  ratingArray?: JSX.Element[];
  rating?: number | string;
  ratingHover?: number | string;
}