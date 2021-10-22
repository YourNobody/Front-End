import React, { FC, useState } from 'react'
import { EstimationProps } from './Estimation.props';
import styles from './Estimation.module.css';
import cn from 'classnames'
import { MAX_RATING_NUMBER } from '../../constants/app'
import Star from '../../src/assets/icons/star.svg'

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