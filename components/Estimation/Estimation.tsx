import React, { FC, useState } from 'react'
import { EstimationProps } from './Estimation.props';
import styles from './Estimation.module.scss';
import cn from 'classnames'

export const Estimation: FC<EstimationProps> = ({
  ratingArray,
  rating,
  ratingHover,
  onRatingClick,
  onRatingHover,
  onRatingOut,
  ...props
}) => {
  return (
    <div
      {...props}
      className={styles.allMarksWrapper}
      onMouseOut={() => onRatingOut()}
    >
      {
        ratingArray.map((markElement, index) => <span
          onClick={() => onRatingClick(index)}
          onMouseOver={() => onRatingHover(index)}
          className={cn(styles.mark, {
            [styles.markSelected]: rating >= index,
            [styles.markHover]: ratingHover >= index
          })}
          key={index}
        >{markElement}</span>)
      }
    </div>
  );
};