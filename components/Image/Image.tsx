import React from 'react';
import { ImageProps } from './Image.props';
import styles from './Image.module.css';
import cn from 'classnames';

export const Image = ({ isEmpty, userInitials, src, alt, fit = 'contain', className, ...props }: ImageProps): JSX.Element => {
  const getFirstLetters = (initials: string): string => {
    const splitted: string[] = userInitials.split(' ');
    if (splitted.length > 1) {
      return splitted[0].toUpperCase() + splitted[1].toUpperCase();
    } else if (splitted.length === 1) {
      return splitted[0].toUpperCase();
    }
    return 'YOU';
  };

  const buildImage = (): JSX.Element => {
    return (
      <img src={src} alt={alt} className={cn(styles.image, {
        [styles.cover]: fit === 'cover',
        [styles.contain]: fit === 'contain',
        [styles.fill]: fit === 'fill',
        [styles.none]: fit === 'none'
      })} />
    );
  };

  const buildNoImage = (): JSX.Element => {
    return (
      <div className={styles.template}>
        <span>{getFirstLetters(userInitials)}</span>
      </div>
    );
  };

  return (
    <div {...props} className={cn(styles.imageWrapper, className)}>
      <img src={src} alt={alt} className={cn(styles.image, {
        [styles.cover]: fit === 'cover',
        [styles.contain]: fit === 'contain',
        [styles.fill]: fit === 'fill',
        [styles.none]: fit === 'none'
      })} />
    </div>
  );
};