export interface RadioGroupProps<T = string> {
  name: string;
  options: { value: T; label: string }[];
  defaultValue?: T;
  onChange?: (value: T) => void;
  groupDisabled?: boolean;
}
