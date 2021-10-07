import { validate, ValidationError } from "class-validator";
import { useCallback, useEffect, useState } from "react";
import { IUseInput } from "../interfaces/hooks.interface";
import { useResolver } from "./useResolver.hook";

export const useInput = (initialState: Record<string, string> = {}): IUseInput => {
  const { validators } = useResolver();
  const [inputsState, setInputsState] = useState<Record<string, string>>(initialState);
  const [validationErrors, setValidationErrors] = useState<Record<string, { message: string }>>({});
  const getValidationErrorMessage = useCallback((name: string): string | null => {
    const lowerName = name.toLowerCase();
    if (validationErrors[lowerName] && validationErrors[lowerName].message) {
      return validationErrors[lowerName].message;
    }
    return null;
  }, [validationErrors]);
  
  const onBlur = useCallback((event: any): void => {
    const lowerName = event.target.name.toLowerCase();
    validators.forEach(async (validator) => {
      let v = new validator();
      const fieldsOfValidator = v.getValidatorFields();
      v = Object.assign(v, {
        [lowerName]: event.target.value
      });
      const errors: ValidationError[] = await validate(v);
      const errorOfThisItem = errors.find((error) => error.property.toLowerCase() === lowerName && error.value !== undefined);
      if (errorOfThisItem && fieldsOfValidator.includes(lowerName)) {
        setValidationErrors({
          ...validationErrors,
          [errorOfThisItem.property]: {
            message: Object.values(errorOfThisItem.constraints)[0]
          }
        });
      } else if (fieldsOfValidator.includes(lowerName)) {    
        const copy = JSON.parse(JSON.stringify(validationErrors));
        copy[lowerName] && delete copy[lowerName];
        setValidationErrors(copy);
      } else if (!fieldsOfValidator.includes(lowerName)) {
        const splitted = lowerName.split('_');
        if (splitted.length === 2) {
          const message = v.validateCustomProperty(splitted[1], event.target.value);
          if (message) {
            setValidationErrors({
              ...validationErrors,
              [lowerName]: { message }
            });
          } else {
            const copy = JSON.parse(JSON.stringify(validationErrors));
            copy[lowerName] && delete copy[lowerName];
            setValidationErrors(copy);
          }
        }
      }
    });
  }, [setValidationErrors, validators, validationErrors]);

  const onChange = useCallback((event: any): void => {
    const lowerName = event.target.name.toLowerCase();
    validators.forEach(async (validator) => {
      let v = new validator();
      const fieldsOfValidator = v.getValidatorFields();
      v = Object.assign(v, {
        [lowerName]: event.target.value
      });
      
      const errors: ValidationError[] = await validate(v);
      
      const errorOfThisItem = errors.find((error) => error.property.toLowerCase() === lowerName && error.value);
      if (!errorOfThisItem && fieldsOfValidator.includes(lowerName)) {        
        const copy = JSON.parse(JSON.stringify(validationErrors));
        copy[lowerName] && delete copy[lowerName];
        setValidationErrors(copy);
      } else if (!fieldsOfValidator.includes(lowerName)) {
        const splitted = lowerName.split('_');
        if (splitted.length === 2) {
          const message = v.validateCustomProperty(splitted[1], event.target.value);          
          if (!message && message !== false) {
            const copy = JSON.parse(JSON.stringify(validationErrors));
            copy[lowerName] && delete copy[lowerName];
            setValidationErrors(copy);
          }
        }
      }
    });
    setInputsState({
      ...inputsState,
      [lowerName]: event.target.value
    });
  }, [inputsState, setValidationErrors, validators, validationErrors]);

  const clearValue = useCallback((name?: string): void => {
    const lowerName = name.toLowerCase();
    if (!lowerName) setInputsState(initialState);
    if (inputsState[lowerName]) {
      setInputsState({
        ...inputsState,
        [lowerName]: ''
      });
    }
  }, [inputsState, setInputsState, initialState]);

  const getValue = useCallback((name?: string): string | typeof initialState => {
    const lowerName = name.toLowerCase();
    if (!lowerName) return inputsState;
    if (inputsState[lowerName]) return inputsState[lowerName];
    return '';
  }, [inputsState]);

  return {
    getValue,
    clearValue,
    onChange,
    onBlur,
    getValidationErrorMessage,
    bindEvents: { onChange, onBlur }
  };
};