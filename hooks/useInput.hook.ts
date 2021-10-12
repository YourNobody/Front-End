import { validate, ValidationError } from "class-validator";
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { IUseInput, IUseInputOptions, IUseInputOptionsAdditional } from '../interfaces/hooks.interface'
import { useResolver } from "./useResolver.hook";
import { getObjectWithDefinedKeys } from '../helpers/custom.helper'

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

  const clearValues = useCallback((name?: string | Record<string, unknown>): void => {
    if (!name) return;
    if (typeof name === 'string') {
      const lowerName = name.toLowerCase();
      if (!lowerName) setInputsState(initialState);
      if (inputsState[lowerName]) {
        setInputsState({
          ...inputsState,
          [lowerName]: ''
        });
      }
    } else {
      Object.keys(name).forEach(key => {
        if (inputsState[key]) inputsState[key] = '';
      })
    }
  }, [inputsState, setInputsState, initialState]);

  const getValues = useCallback((name?: string): string | Record<string, unknown> => {
    if (!name) return '';
    const lowerName = name.toLowerCase();
    if (!lowerName) return inputsState;
    if (inputsState[lowerName]) return inputsState[lowerName];
    return '';
  }, [inputsState]);

  const register = useCallback((name: string, options: IUseInputOptions & IUseInputOptionsAdditional = {
    disableValidation: false,
    exclude: false
  }): IUseInputOptions => {
    if (!name) throw new Error('Name isn\'t provided');
    const props = {
      onChange, onBlur, name,
      value: inputsState[name]
    } as IUseInputOptions & IUseInputOptionsAdditional;
    if (!options) return props;
    if (options.disableValidation) {
      props.error = getValidationErrorMessage(name);
    }
    if (options.exclude) {
      props['data-exclude'] = 1;
    }
    delete options.disableValidation;
    delete options.exclude;
    return { ...props, ...options };
  }, [inputsState]);

  const handleSubmit = useCallback((cb?: (formData: Record<string, unknown>) => void): any => {
    return (event: FormEvent) => {
      event.preventDefault();
      console.log('inp: ', inputsState);
      const form = event.target as Element;
      const formData = Array.from(form.querySelectorAll('input')).reduce((data, input) => {
        if (input.dataset.exclude) return data;
        input.focus();
        input.blur();
        data[input.name] = inputsState[input.name];
        return data;
      }, {});
      if (!cb || Object.keys(getObjectWithDefinedKeys(validationErrors, formData)).length) return;
      return cb(formData);
    };
  }, [inputsState]);

  return {
    getValues,
    clearValues,
    register,
    handleSubmit,
    formState: {
      errors: validationErrors,
      state: inputsState
    }
  };
};