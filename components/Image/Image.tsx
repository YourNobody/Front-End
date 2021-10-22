import React, { FC } from 'react';
import { ImageProps } from './Image.props';
import styles from './Image.module.css';
import cn from 'classnames';
import { getRandomColor } from '../../helpers/css.helper';
import { getFirstLetters } from '../../helpers/custom.helper';

export const Image: FC<ImageProps> = ({ fully = false, text, src, alt, fit = 'contain', isCircled = false, className, ...props }) => {
  const formatText = (textToFormat: string) => {
    if (!textToFormat) return 'YOU';
    const splitted = textToFormat.split(/\s/g);
    
    if (splitted.length >= 2) {
      return splitted[0].substring(0, 1).toUpperCase() + splitted[1].substring(0, 1).toUpperCase();
    } else if (splitted.length === 1) {
      return splitted[0].substring(0, 1).toUpperCase();
    }
    return 'YOU';
  };

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
        >{fully ? text : formatText(text)}</span>
      </div>
    );
  };

  if (!src) {
    return buildNoImage();
  }
  return buildImage();
};