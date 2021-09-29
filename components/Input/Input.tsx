import React, { FC, forwardRef, useRef, useState } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, type, name, ...props}, ref): JSX.Element => {
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
        ref={ref}
        className={cn(styles.input, className, {
          [styles.errorInput]: error
        })}
        type={type}
        name={name}
        id={inputId}
      />
      {
        error && <span className={styles.error}>{error}</span>
      }
    </div>
  );
});

function createId(str: string): string {
  if (!str) return '';
  let id = 'id_';
  if (str.length) {
    id += str[0].charCodeAt(0) * Math.random();
  }
  id = id.replace(/\./g, '');
  return id + '_' + Date.now();
}