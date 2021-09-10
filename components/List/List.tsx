import React, { FC } from 'react';
import { ListProps } from './List.props';
import styles from './List.module.css';
import { Button } from '../index';
import cn from 'classnames';

export const List: FC<ListProps> = ({ list, onClose, className,  ...props }) => {
  if (!list || !list.length) return <></>;
  return (
    <ul
      {...props}
      className={cn(className, styles.ul)}
    >
      {
        list.map(item => {
          return (
            <li
              key={item + Math.random()}
              className={styles.li}
            >
              <span>{item}</span>
              {onClose && <Button className={styles.close}>&#215;</Button>}
            </li>
          );
        })
      }
    </ul>
  );
};