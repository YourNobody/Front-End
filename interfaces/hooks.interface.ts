import {DetailedHTMLProps, FormEvent, HTMLAttributes, MutableRefObject} from 'react'

export interface IUseRequest {
  error: Error | string;
  request: <T>(url: string, method: string, body: null | BodyInit, headers: HeadersInit) => Promise<T>;
  clearError: () => void;
}

export interface IUseInputInitialState {
  values: Record<string, any>,
  elements: Record<string, any>
}

export interface IUseInput {
  getValues?: (name?: string) => string | Record<string, unknown>;
  clearValues?: (formName?: string, name?: string) => void;
  register?: (name: string, options?: IUseInputOptions, additionalOptions?: IUseInputOptionsAdditional) => IUseInputOptions;
  handleSubmit?: (formName: string, cb?: (formData: Record<string, unknown>) => Promise<any> | any) => any;
  formState?: {
    errors?: Record<string, { message: string }>;
    state?: IUseInputInitialState;
  }
}

export interface IUseInputOptions extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  'data-exclude'?: 1 | 0 | '1' | '0';
  error?: string | null;
  value?: string;
  useInputRef?: (ref: MutableRefObject<HTMLInputElement>) => void;
}

export interface IUseInputOptionsAdditional {
  disableValidation?: boolean;
  exclude?: boolean;
  onChangeCallback?: (value: string) => string;
  initialValue?: string;
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