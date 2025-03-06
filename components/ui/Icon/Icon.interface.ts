export type IconType =
  | 'rub'
  | 'dollar'
  | 'yuan'
  | 'weight'
  | 'amount'
  | 'percent';

export interface IconProps {
  type: IconType;
  size?: number;
  color?: string;
  className?: string;
}
