import React, { useState, ChangeEvent, forwardRef, FC } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';

export const Input: FC<InputProps> = forwardRef(({ label, type, name, ...props}, ref) => {
  const inputId: string = label ? createId(label) : null;

  const [inputValue, setInputValue] = useState<string>('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value.trim();
    setInputValue(value);
  };

  return (
    <>
      {label && <label
        className={cn(styles.label, {
          [styles.has]: inputValue.length
        })}
        htmlFor={inputId}
      >{label}</label>}
      <input
        ref={ref}
        {...props}
        className={styles.input}
        type={type}
        name={name}
        id={inputId}
        value={inputValue}
        onChange={handleOnChange}
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