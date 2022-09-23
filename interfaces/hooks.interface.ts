import {DetailedHTMLProps, FormEvent, HTMLAttributes, MutableRefObject} from 'react'
import {ValidationError} from "class-validator";

export interface IUseRequest {
  error: Error | string;
  request: <T>(url: string, method: string, body: null | BodyInit, headers: HeadersInit) => Promise<T>;
  clearError: () => void;
}

export interface IUseInputInitialState {
  values: Record<string, any>;
  elements: Record<string, any>
}

export type IUseInputValidatorsErrorsState = Record<string, Record<string, { message: string }>>;
export type IUseInputArrayValues = Record<string, Record<string, unknown[]>>;

export interface IUpdateValidatorsErrorsOptions {
  inputToBeDeleted?: string;
}

export interface IUseInput {
  getValues?: (name?: string) => string | Record<string, unknown>;
  clearValues?: (formName?: string, name?: string) => void;
  addFormArrayValues?: (arrayName: string, relatedFormName: string, inputToBeTaken: string) => any;
  register?: (name: string, options?: IUseInputOptions, additionalOptions?: IUseInputOptionsAdditional) => IUseInputOptions;
  handleSubmit?: (formName: string, cb?: (formData: Record<string, unknown>) => Promise<any> | any) => any;
  formState?: {
    errors?: Record<string, Record<string, { message: string }>>;
    state?: IUseInputInitialState;
    arrayState?: IUseInputArrayValues;
  }
  disableSubmit?: (formName: string) => boolean;
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

export interface IUseResolver {
  validators: Record<string, unknown>;
  validate: (validators: any[], property: string, propertyValue: string) => Promise<ValidationError | null>;
}

export interface IUseEstimationReturn {
  value: number,
  range: number,
  getEstimationElement: (props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => JSX.Element;
}

export interface IUseEstimation {
  range?: number;
  onRatingClick?: (index?: number | string) => void;
  onRatingHover?: (index?: number | string) => void;
  onRatingOut?: () => void;
  ratingArray?: JSX.Element[];
  rating?: number | string;
  ratingHover?: number | string;
}