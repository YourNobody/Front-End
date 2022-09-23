import React, {FC, forwardRef, RefObject, useEffect, useRef} from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.scss';
import cn from 'classnames';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const Input: FC<InputProps> = forwardRef(({
      label,
      error,
      type,
      className,
      hasValue = false,
      ...props
}, ref) => {
  const inputId: string = label ? createId(label) : null;

  if (type === 'file') {
    return <input
      {...props}
      ref={ref}
      type={type}
      style={{display: 'none'}}
    />
  }

  return (
    <div className={styles.wrapper}>
      {label && <label
        className={cn(styles.label, {
          [styles.has]: hasValue,
          [styles.hasError]: error
        })}
        htmlFor={inputId}
      >{label}</label>}
      <input
        {...props}
        type={type || 'text'}
        className={cn(styles.input, className, {
          [styles.errorInput]: error
        })}
        id={inputId}
        ref={ref}
      />
      {
        error && error.message && <ErrorMessage className={styles.error}>{error.message}</ErrorMessage>
      }
    </div>
  )
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