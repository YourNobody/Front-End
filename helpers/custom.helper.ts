import {FC, ReactFragment} from "react";
import {wrapWithFragment} from "./react.helper";

export const checkForValideImageLink = (src: string): boolean => {
  if (!src) return false;
  return !!src.match(/(\.jpg|\.png|\.jpeg|\.jfif|\.gif)$/);
};

export const getFirstLetters = (initials: string): string => {
  if (!initials) return 'YOU';
  const splitted: string[] = initials.split(' ');
  if (splitted.length > 1) {
    return splitted[0][0].toUpperCase() + splitted[1][0].toUpperCase();
  } else if (splitted.length === 1) {
    return splitted[0][0].toUpperCase();
  }
  return 'YOU';
};

export const getEmptyObject = <T>(data: T, returnTheComingObject = false): T => {
  if (!data) return {} as T;
  if (!returnTheComingObject) {
    return Object.keys(data).reduce((R, key) => {
      if (typeof data[key] === 'function') {
        R[key] = null;
      } else if (data[key] instanceof Array) {
        R[key] = [];
      } else if (data[key] instanceof Object) {
        R[key] = {};
      } else {
        R[key] = '';
      }
      return R;
    }, {}) as T || {} as T;
  }

  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'function') {
      data[key] = null;
    } else if (data[key] instanceof Array) {
      data[key] = [];
    } else if (data[key] instanceof Object) {
      data[key] = {};
    } else {
      data[key] = '';
    }
  });

  return data;
};

export const getObjectWithDefinedKeys = (initial: any, keys: string[] | string | Record<string, unknown | string>): any => {
  if (!initial || !Object.keys(initial).length) return {};
  if (!keys) return initial;
  if (typeof keys === 'string') {
    keys = keys.split(' ');
  } else if (keys instanceof Array) {
    return keys.reduce((output, key) => {
      if (initial[key]) {
        output[key] = initial[key];
      }
      return output;
    }, {});
  }
  return Object.keys(keys).reduce((R, key) => {
    if (initial[key]) {
      R[key] = initial[key];
      return R;
    }
  }, {});
};

export const formatDate = (date: number | Date): string => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const formatPrice = (price: number, currency = 'USD', locale = 'en-US'): string => {
  if (!price) return '';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(price);
};

export const changeStatisticsTooltipLabel = (value: number | string, name: string, props: any) => {
  return function (oldLabel: string, newLabel: string): void {
    if (name && oldLabel) {
      props.name = newLabel + ': ' + value;
    }
  };
};

export const saveTemplateHelper = (salt: string) => {
  const templates = {};

  function getTemplate(templateKey: string, props: any): JSX.Element {
    return wrapWithFragment(templates[salt + templateKey], props);
  }

  function toTemplates<T>(templateKey: string, template: FC<T>) {
    templates[salt + templateKey] = template;
  }

  return {
    getTemplate, toTemplates
  };
}
