import { validate, ValidationError } from "class-validator";
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { IUseInput, IUseInputOptions, IUseInputOptionsAdditional } from '../interfaces/hooks.interface'
import { useResolver } from "./useResolver.hook";

export const useInput = (initialState: Record<string, string> = {}): IUseInput => {
  const { validators } = useResolver();
  const [inputsState, setInputsState] = useState<Record<string, string>>(initialState);
  const [validationErrors, setValidationErrors] = useState<Record<string, { message: string }>>({});

  const getValidationErrorMessage = useCallback((name: string): string => {
    name = name.toLowerCase();
    if (validationErrors[name] && validationErrors[name].message) {
      return validationErrors[name].message;
    }
    return '';
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
          let message = v.validateCustomProperty(splitted[1], event.target.value);
          if (message) message = v.validateCustomProperty(splitted[2], event.target.value);
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

  const onChange = useCallback((event: any, callback?: (value: string) => string): void => {
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
    if (callback) {
      setInputsState({
        ...inputsState,
        [lowerName]: callback(event.target.value)
      });
    } else {
      setInputsState({
        ...inputsState,
        [lowerName]: event.target.value
      });
    }
  }, [inputsState, setValidationErrors, validators, validationErrors]);

  const clearValues = useCallback((name?: string | Record<string, unknown>): void => {
    if (!name) return;
    if (typeof name === 'string') {
      name = name.toLowerCase();
      if (!name) setInputsState(initialState);
      if (inputsState[name]) {
        setInputsState({
          ...inputsState,
          [name]: ''
        });
      }
    } else {
      Object.keys(name).forEach(key => {
        if (inputsState[key]) inputsState[key] = '';
      });
    }
  }, [inputsState, setInputsState, initialState]);

  const getValues = useCallback((name?: string): string | Record<string, unknown> => {
    if (!name) return '';
    name = name.toLowerCase();
    if (!name) return inputsState;
    if (inputsState[name]) return inputsState[name];
    return '';
  }, [inputsState]);

  const register = useCallback((name: string, options?: IUseInputOptions, additionalOptions?: IUseInputOptionsAdditional): IUseInputOptions => {
    if (!name) throw new Error('Name isn\'t provided');
    if (!additionalOptions) additionalOptions = {};
    name = name.toLowerCase();
    const props = {
      onChange: additionalOptions.onChangeCallback ? (e) => onChange(e, additionalOptions.onChangeCallback) : onChange,
      onBlur, name,
      value: additionalOptions.initialValue || inputsState[name]
    } as IUseInputOptions & IUseInputOptionsAdditional;
    if (!additionalOptions.disableValidation) {
      props.error = getValidationErrorMessage(name);
    }
    if (additionalOptions.exclude) {
      props['data-exclude'] = 1;
    }
    if (!options) options = {};
    return { ...props, ...options };
  }, [getValidationErrorMessage, inputsState, setInputsState]);

  const handleSubmit = useCallback((cb?: (formData: Record<string, unknown>) => Promise<any> | any): any => {
    return (event: FormEvent) => {
      event.preventDefault();
      const form = event.target as Element;
      const allErrors = [];
      const formInputs = Array.from(form.querySelectorAll('input'));
      const formInputsData = formInputs.reduce((data, input, index, array) => {
        if (input.dataset.exclude) return data;
        const lowerName = input.name.toLowerCase();
        input.focus();
        input.blur();
        data[lowerName] = inputsState[lowerName];
        void async function() {
          const promise = Promise.resolve();
          const promises = [];

          validators.forEach(validator => {
            promises.push(promise.then(async () => {
              let v = new validator();
              v = Object.assign(v, {
                [lowerName]: input.value
              });
              const errors: ValidationError[] = await validate(v);
              const errorOfThisItem = errors.find((error) => error.value !== undefined && error.property.toLowerCase() === lowerName);
              if (errorOfThisItem) allErrors.push(errorOfThisItem);
            }));
          });
          await Promise.all(promises).then(() => {
            if (index === array.length - 1) {
              if (!cb || allErrors.length) return;
              return cb(formInputsData);
            }
          });
        }();
        return data;
      }, {});
    };
  }, [inputsState, validationErrors]);

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