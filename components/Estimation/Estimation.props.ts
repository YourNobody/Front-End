import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react'

export interface EstimationProps extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  onRatingClick?: (index?: number | string) => void;
  onRatingHover?: (index?: number | string) => void;
  onRatingOut: () => void;
  ratingArray: JSX.Element[];
  rating: number | string;
  ratingHover: number | string;
}