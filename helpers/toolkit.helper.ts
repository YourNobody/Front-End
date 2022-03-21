import { v4 } from 'uuid';
import {ArgumentNames} from "tapable";

export const generateMetaAndError = (meta: any = null, error: string = null) => {
  const metaPayload = { meta, error };
  if (!meta) metaPayload.meta = v4();
  if (!error) metaPayload.error = 'Error';
  return metaPayload;
};

export const generateTypes = <T extends string>(preType: string, ...types: readonly T[]): Record<T, string> => {
  return types.reduce((acc, type) => {
    acc[type] = preType + type;
    return acc;
  }, {} as Record<T, string>);
};

export const createSagaAction = <T extends Function>(type: string, cb?: T): T => {
  if (!cb) return function () {
    return { type };
  } as any;
  return function (...rest) {
    const dataToTransfer = cb(...rest);
    return { type, ...dataToTransfer };
  } as any;
};