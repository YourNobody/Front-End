import { validate, ValidationError } from "class-validator";
import { useCallback, useEffect, useState } from "react";
import { IUseInput } from "../interfaces/hooks.interface";
import { useResolver } from "./useResolver.hook";

export const useInput = (initialState: Record<string, string> = {}): IUseInput => {
  const { validators } = useResolver();
  const [inputsState, setInputsState] = useState<Record<string, string>>(initialState);
  const [validationErrors, setValidationErrors] = useState<Record<string, { message: string }>>({});
  const onBlur = useCallback((event: any): void => {
    validators.forEach(async (validator) => {
      let v = new validator();
      const fieldsOfValidator = v.getValidatorFields();
      v = Object.assign(v, {
        [event.target.name]: event.target.value
      });
      const errors: ValidationError[] = await validate(v);
      const errorOfThisItem = errors.find((error) => error.property === event.target.name && error.value !== undefined);
      if (errorOfThisItem && fieldsOfValidator.includes(event.target.name)) {
        setValidationErrors({
          ...validationErrors,
          [errorOfThisItem.property]: {
            message: Object.values(errorOfThisItem.constraints)[0]
          }
        });
      } else if (fieldsOfValidator.includes(event.target.name)) {    
        const copy = JSON.parse(JSON.stringify(validationErrors));
        copy[event.target.name] && delete copy[event.target.name];
        setValidationErrors(copy);
      }
    });
    
  }, [setValidationErrors, validators, validationErrors]);

  const onChange = useCallback((event: any): void => {
    validators.forEach(async (validator) => {
      let v = new validator();
      const fieldsOfValidator = v.getValidatorFields();
      v = Object.assign(v, {
        [event.target.name]: event.target.value
      });
      
      const errors: ValidationError[] = await validate(v);
      
      const errorOfThisItem = errors.find((error) => error.property === event.target.name && error.value);
      if (!errorOfThisItem && fieldsOfValidator.includes(event.target.name)) {        
        const copy = JSON.parse(JSON.stringify(validationErrors));
        copy[event.target.name] && delete copy[event.target.name];
        setValidationErrors(copy);
      }
    });
    setInputsState({
      ...inputsState,
      [event.target.name]: event.target.value
    });
  }, [inputsState, setValidationErrors, validators, validationErrors]);

  const clearValue = useCallback((name?: string): void => {
    if (!name) setInputsState(initialState);
    if (inputsState[name]) {
      setInputsState({
        ...inputsState,
        [name]: ''
      });
    }
  }, [inputsState, setInputsState, initialState]);

  const getValue = useCallback((name?: string): string | typeof initialState => {
    if (!name) return inputsState;
    if (inputsState[name]) return inputsState[name];
    return '';
  }, [inputsState]);

  return {
    getValue, clearValue, onChange, validationErrors, onBlur, bindEvents: { onChange, onBlur }
  };
};