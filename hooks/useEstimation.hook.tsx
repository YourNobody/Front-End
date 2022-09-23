import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { Estimation } from '../components';
import { IUseEstimation, IUseEstimationReturn } from '../interfaces/hooks.interface';
import { MAX_RATING_NUMBER } from '../constants/app';
import Star from  '../src/assets/icons/star.svg';

export const useEstimation = ({
  range,
  ratingArray,
  rating,
  ratingHover,
  onRatingClick,
  onRatingHover,
  onRatingOut
}: IUseEstimation): IUseEstimationReturn => {
  const [marks, setMarks] = useState<JSX.Element[]>(new Array((range) ? +range : MAX_RATING_NUMBER).fill(<Star/>));
  const [mark, setMark] = useState<number>(-1);
  const [hover, setHover] = useState<number>(-1);

  const handleEstimate = (mark: number) => {
    setMark(mark);
  };

  const handleHoverEstimate = (index: number) => {
    setHover(index);
  };

  const handleMouseOutEstimate = () => {
    setHover(-1);
  };

  return {
    value: mark === -1 ? 0 : mark + 1,
    range: range || MAX_RATING_NUMBER,
    getEstimationElement: (props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
      return <Estimation
        {...props}
        ratingArray={ratingArray || marks}
        rating={rating || mark}
        ratingHover={ratingHover || hover}
        onRatingClick={onRatingClick || handleEstimate}
        onRatingHover={onRatingHover || handleHoverEstimate}
        onRatingOut={onRatingOut || handleMouseOutEstimate }
      />
    }
  };
};
