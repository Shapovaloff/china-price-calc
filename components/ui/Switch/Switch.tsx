import { ChangeEvent } from 'react';
import styles from './Switch.module.scss';
import { SwitchProps } from './Switch.interface';

function Switch({
  id,
  label,
  checked,
  disabled,
  onCheckedChange,
  ...props
}: SwitchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
  };

  return (
    <div className={styles.switch}>
      <input
        className={styles['switch__input']}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        id={id}
        onChange={handleChange}
        {...props}
      />
      <label className={styles['switch__label']} htmlFor={id}>
        <div className={styles['switch__slider']} />
        {label}
      </label>
    </div>
  );
}

export default Switch;
