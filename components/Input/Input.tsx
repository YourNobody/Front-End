import React, {createRef, FC, forwardRef, useEffect, useRef} from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const Input: FC<InputProps> = ({
      label,
      error,
      value= '',
      className,
      type= 'text',
      name,
      useInputRef,
      ...props
}) => {
  const inputId: string = label ? createId(label) : null;

  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    if (ref.current) {
      useInputRef(ref);
    }
  }, [ref])

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
        ref={ref}
      />
      {
        error && <ErrorMessage className={styles.error}>{error}</ErrorMessage>
      }
    </div>
  )
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