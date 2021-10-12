import React, { FC, forwardRef, useRef, useState } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const Input: FC<InputProps> = ({ value = '', label, error, className, type, name, ...props }) => {
  const inputId: string = label ? createId(label) : null;
  return (
    <div className={styles.wrapper}>
      {label && <label
        className={cn(styles.label, {
          // [styles.has]: value && String(value).length
        })}
        htmlFor={inputId}
      >{label}</label>}
      <input
        {...props}
        value={value}
        className={cn(styles.input, className, {
          [styles.errorInput]: error
        })}
        type={type}
        name={name}
        id={inputId}
      />
      {
        error && <ErrorMessage className={styles.error}>{error}</ErrorMessage>
      }
    </div>
  );
};

function createId(str: string): string {
  if (!str) return '';
  let id = 'id_';
  if (str.length) {
    id += str[0].charCodeAt(0) * Math.random();
  }
  id = id.replace(/\./g, '');
  return id + '_' + Date.now();
}