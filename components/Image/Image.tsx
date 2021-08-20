import React from 'react';
import { ImageProps } from './Image.props';
import styles from './Image.module.css';
import cn from 'classnames';

export const Image = ({ src, alt, fit = 'containt', className, ...props }: ImageProps): JSX.Element => {
  return (
    <div {...props} className={cn(styles.imageWrapper, className)}>
      <img src={src} alt={alt} className={cn(styles.image, {
        [styles.cover]: fit === 'cover',
        [styles.contain]: fit === 'containt',
        [styles.fill]: fit === 'fill',
        [styles.none]: fit === 'none'
      })} />
    </div>
  );
};