import { IconType } from '../Icon/Icon.interface';

export interface InputWithMaskProps {
  name: string;
  onChangeInput: (name: string, value: string | number) => void;
  maxValue?: number;
  defaultValue?: number;
  disabled?: boolean;
  className?: string;
  label?: string;
  iconName?: IconType;
}
