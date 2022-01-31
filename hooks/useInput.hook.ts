import { validate, ValidationError } from "class-validator";
import { FormEvent, useCallback, useState} from 'react'
import {
  IUseInput,
  IUseInputInitialState,
  IUseInputOptions,
  IUseInputOptionsAdditional
} from '../interfaces/hooks.interface'
import { useResolver } from "./useResolver.hook";
import {getEmptyObject} from "../helpers/custom.helper";
let i = 0;
export const useInput = (initialState: IUseInputInitialState = { values: {}, elements: {} }): IUseInput => {
  const { validators } = useResolver();
  let [forms, setForms] = useState<IUseInputInitialState>(initialState);
  const [validationErrors, setValidationErrors] = useState<Record<string, { message: string }>>({});

  const createNewForm = (formName: string) => {
    setForms({
      ...forms,
      values: {
        ...forms.values,
        [formName]: {}
      },
      elements: {
        ...forms.elements,
        [formName]: {}
      }
    });
  };

  const updateFormElements = (element: any) => {
    if (!element) return;
    const name = element.name.toLowerCase();

    const formName = element.formTarget.toLowerCase();
    if (!formName) return;
    if (forms.elements[formName] && forms.elements[formName][name]) return;
    if (forms.elements[formName] && !forms.elements[formName][name]) {
      forms.elements[formName][name] = element;
    }
  };

  const getValidationErrorMessage = useCallback((name: string): string => {
    name = name.toLowerCase();
    const [relatedFormName, inputName] = name.split('.');
    if (validationErrors[inputName] && validationErrors[inputName].message) {
      return validationErrors[inputName].message;
    }
    return '';
  }, [validationErrors]);

  const onFocus = useCallback((event: Event): void => {
    event && event.target && updateFormElements(event.target);
  }, [forms]);

  const onBlur = useCallback((event: any): void => {
    event && event.target && updateFormElements(event.target);
    const lowerName = event.target.name.toLowerCase();
    const formName = event.target.formTarget.toLowerCase();
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
    event && event.target && updateFormElements(event.target);
    const lowerName = event.target.name.toLowerCase();
    const formName = event.target.formTarget.toLowerCase();
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
    setForms({
      ...forms,
      values: {
        ...forms.values,
        [formName]: {
          ...forms.values[formName],
          [lowerName]: callback ? callback(event.target.value) : event.target.value
        }
      }
    });
  }, [forms, setValidationErrors, validators, validationErrors]);

  const clearValues = useCallback((formName: string, name?: string): void => {
    if (!formName) return;
    formName = formName.toLowerCase();
    if (name && typeof name === 'string') {
      name = name.toLowerCase();
      setForms({
        ...forms,
        values: {
          ...forms.values,
          [formName]: {
            ...forms.values[formName],
            [name]: ''
          }
        }
      })
    } else {
      setForms({
        ...forms,
        values: {
          ...forms.values,
          [formName]: getEmptyObject(forms.values[formName])
        }
      });
    }
  }, [forms, setForms, initialState]);

  const getValues = useCallback((name?: string): string | Record<string, unknown> => {
    if (!name) return '';
    name = name.toLowerCase();
    const [relatedFormName, inputName] = name.split('.');
    const inputState = forms.values[relatedFormName][inputName];
    if (!name) return inputState;
    if (forms.values[relatedFormName][inputName]) return forms.values[relatedFormName][inputName];
    return '';
  }, [forms]);

  const register = useCallback((name: string, options?: IUseInputOptions, additionalOptions?: IUseInputOptionsAdditional): IUseInputOptions => {
    if (!name) throw new Error('Name isn\'t provided');
    if (!additionalOptions) additionalOptions = {};
    name = name.toLowerCase();
    const [relatedFormName, inputName] = name.split('.');
    let initial = '';
    if (forms.values[relatedFormName] && forms.values[relatedFormName][inputName]) {
      initial = forms.values[relatedFormName][inputName];
    }
    const props = {
      onChange: additionalOptions.onChangeCallback ? (e) => onChange(e, additionalOptions.onChangeCallback) : onChange,
      onBlur,
      name: inputName,
      onFocus: onFocus as any,
      value: additionalOptions.initialValue || initial,
      formTarget: relatedFormName,
      useInputRef: (ref) => updateFormElements(ref.current)
    } as IUseInputOptions & IUseInputOptionsAdditional;
    if (!additionalOptions.disableValidation) {
      props.error = getValidationErrorMessage(name);
    }
    if (additionalOptions.exclude) {
      props['data-exclude'] = 1;
    }
    if (!options) options = {};

    if (forms.values[relatedFormName]) {
      if (!(inputName in forms.values[relatedFormName])) {
        setForms({
          ...forms,
          values: {
            ...forms.values,
            [relatedFormName]: {
              ...forms.values[relatedFormName],
              [inputName]: additionalOptions.initialValue || initial
            }
          }
        });
      }
    }

    return { ...props, ...options };
  }, [getValidationErrorMessage, forms, setForms]);

  const handleSubmit = useCallback((formName: string, cb?: (formData: Record<string, unknown>) => Promise<any> | any): any => {
    formName = formName.toLowerCase();
    !forms.values[formName] && !forms.elements[formName] && createNewForm(formName);

    return (event: FormEvent) => {
      event.preventDefault();
      const allErrors = [];
      const formInputsData: any = Object.values(forms.elements[formName]).reduce((data: any, input: HTMLInputElement, index, array) => {
        if (input.dataset.exclude) return data;
        const lowerName = input.name.toLowerCase();
        input.focus();
        input.blur();
        data[lowerName] = input.value;
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
              console.log('errors: ', errors)
              const errorOfThisItem = errors.find((error) => error.value !== undefined && error.property.toLowerCase() === lowerName);
              if (errorOfThisItem) allErrors.push(errorOfThisItem);
            }));
          });
          await Promise.all(promises).then(() => {
            if (index === array.length - 1) {
              // if (!cb || allErrors.length) return;
              return cb(data);
            }
          });
        }();
        return data;
      }, {});
    };
  }, [setForms, createNewForm, forms, validationErrors]);

  return {
    getValues,
    clearValues,
    register,
    handleSubmit,
    formState: {
      errors: validationErrors,
      state: forms
    }
  };
};