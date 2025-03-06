export interface SwitchProps {
  id: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
