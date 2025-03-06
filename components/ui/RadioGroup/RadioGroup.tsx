import { ChangeEvent, JSX, useState } from 'react';
import { RadioGroupProps } from './RadioGroup.interface';
import styles from './RadioGroup.module.scss';

function RadioGroup<T = string>({
  name,
  options,
  defaultValue,
  onChange,
  groupDisabled,
}: RadioGroupProps<T>): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(
    defaultValue
  );

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value as unknown as T;
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <ul className={styles['radio-group']}>
      {options.map(({ value, label }) => (
        <li key={String(value)} className={styles['radio-group__item']}>
          <input
            type="radio"
            className={styles['radio-group__input']}
            disabled={groupDisabled}
            name={name}
            value={String(value)}
            checked={value === selectedValue}
            onChange={handleChange}
            id={String(value)}
          />
          <label
            htmlFor={String(value)}
            className={styles['radio-group__label']}
          >
            {label}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default RadioGroup;
