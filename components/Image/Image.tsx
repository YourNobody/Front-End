import React from 'react';
import { ImageProps } from './Image.props';
import styles from './Image.module.css';
import cn from 'classnames';

export const Image = ({ isEmpty = true, userInitials, src, alt, fit = 'contain', isCircled = false, className, ...props }: ImageProps): JSX.Element => {
  if (src) {
    isEmpty = false;
  } else {
    isEmpty = true;
  }
  const getFirstLetters = (initials: string): string => {
    if (!initials) return 'YOU';
    const splitted: string[] = initials.split(' ');
    if (splitted.length > 1) {
      return splitted[0][0].toUpperCase() + splitted[1][0].toUpperCase();
    } else if (splitted.length === 1) {
      return splitted[0].toUpperCase();
    }
    return 'YOU';
  };

  const buildImage = (): JSX.Element => {
    return (
      <div {...props}
        className={cn(styles.imageWrapper, className, {
          [styles.circle]: isCircled
        })}
        style={{ backgroundColor: getRandomColor() }}
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
        className={cn(styles.template, {
          [styles.circle]: isCircled
        })}
        style={{ backgroundColor: getRandomColor() }}
      >
        <span 
          className={styles.templateInitials}
        >{getFirstLetters(userInitials)}</span>
      </div>
    );
  };

  if (isEmpty) {
    return buildNoImage();
  }
  return buildImage();
};

function getRandomColor(): string {
  return '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
};