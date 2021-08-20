import React from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';

export const Input = ({ label, type, name }: InputProps): JSX.Element => {
  const inputId = label ? createId(label) : null;
  return (
    <>
      {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
      <input className={styles.input} type={type} name={name} id={inputId}/>
    </>
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