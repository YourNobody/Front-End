import React, { FC, forwardRef } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className, type, name, value, ...props}, ref): JSX.Element => {
  const inputId: string = label ? createId(label) : null;

  return (
    <>
      {label && <label
        className={cn(styles.label, {
          [styles.has]: String(value).length
        })}
        htmlFor={inputId}
      >{label}</label>}
      <input
        {...props}
        ref={ref}
        className={cn(styles.input, className)}
        type={type}
        name={name}
        id={inputId}
        value={value}
      />
    </>
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