import { useEffect } from 'react';
import { useIMask } from 'react-imask';
import Icon from '@/components/ui/Icon/Icon';
import { InputWithMaskProps } from './InputWithMask.interface';
import styles from './InputWithMask.module.scss';
import cn from 'classnames';

function InputWithMask(props: InputWithMaskProps) {
  const {
    name,
    onChangeInput,
    maxValue,
    defaultValue,
    label,
    disabled,
    iconName,
  } = props;

  const { ref, value, unmaskedValue } = useIMask<HTMLInputElement>(
    {
      mask: Number,
      radix: ',',
      thousandsSeparator: ' ',
      min: 0,
      max: maxValue || 9_999,
      mapToRadix: ['.'],
    },
    {
      defaultUnmaskedValue: defaultValue?.toString(),
    }
  );

  useEffect(() => {
    onChangeInput(name, +unmaskedValue);
  }, [unmaskedValue, name]);

  return (
    <div className={styles['input-with-mask']}>
      <input
        ref={ref}
        id={name}
        disabled={disabled}
        className={cn(styles['input-with-mask__input'], {
          [styles['is-active']]: Boolean(value),
        })}
      />
      {iconName && (
        <Icon type={iconName} className={styles['input-with-mask__icon']} />
      )}
      <label className={styles['input-with-mask__label']} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default InputWithMask;
