import React, { FC } from 'react';
import { ImageProps } from './Image.props';
import styles from './Image.module.css';
import cn from 'classnames';
import { getRandomColor } from '../../helpers/css.helper';
import { getFirstLetters } from '../../helpers/custom.helper';

export const Image = ({ fully = false, text, src, alt, fit = 'contain', isCircled = false, className, ...props }: ImageProps): JSX.Element => {
  const buildImage = (): JSX.Element => {
    return (
      <div {...props}
        className={cn(styles.imageWrapper, className, {
          [styles.circle]: isCircled
        })}
      >
        <img src={src} alt={alt} className={cn(styles.image, {
          [styles.cover]: fit === 'cover',
          [styles.contain]: fit === 'contain',
          [styles.fill]: fit === 'fill',
          [styles.none]: fit === 'none',
        })} />
      </div>
    );
  };

  const buildNoImage = (): JSX.Element => {
    return (
      <div
        {...props}
        className={cn(styles.template, className, {
          [styles.circle]: isCircled
        })}
      >
        <span 
          className={styles.templateInitials}
        >{fully ? text : getFirstLetters(text)}</span>
      </div>
    );
  };

  if (!src) {
    return buildNoImage();
  }
  return buildImage();
};