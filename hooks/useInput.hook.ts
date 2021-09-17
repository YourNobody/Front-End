import { useCallback, useState } from "react";
import { IUseInput } from "../interfaces/hooks.interface";

export const useInput = (initialState: Record<string, string> = {}): IUseInput => {
  const [inputsState, setInputsState] = useState<Record<string, string>>(initialState);

  const onChange = useCallback((event: any) => {
    setInputsState({
      ...inputsState,
      [event.target.name]: event.target.value
    });
  }, [inputsState]);

  const clearValue = useCallback((name: string) => {
    if (inputsState[name]) {
      inputsState[name] = '';
    }
  }, [inputsState]);

  const getValue = useCallback((name?: string): any => {
    if (!name) return inputsState;
    if (inputsState[name]) return inputsState[name];
    return '';
  }, [inputsState]);

  return {
    getValue, clearValue, onChange
  };
};