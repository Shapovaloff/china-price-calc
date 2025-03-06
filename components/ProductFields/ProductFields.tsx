import styles from './ProductFields.module.scss';
import { useMemo } from 'react';
import { ProductFieldsProps } from './ProductFields.interface';
import InputWithMask from '../ui/InputWithMask/InputWithMask';
import { InitialFieldsNames } from '@/data/fieldNames';
import Switch from '../ui/Switch/Switch';

function ProductFields({
  fields,
  onChange,
  onChangeCostPack,
}: ProductFieldsProps) {
  const fieldKeys = useMemo<(keyof typeof fields)[]>(
    () =>
      (Object.keys(fields) as (keyof typeof fields)[]).filter(
        (k) => k !== 'isCostPack'
      ),
    [fields]
  );

  return (
    <ul className={styles['product-fields']}>
      {fieldKeys.map((key) => {
        const { label, iconName } = InitialFieldsNames[key];
        return (
          <li key={key}>
            <InputWithMask
              label={label}
              name={key}
              onChangeInput={(_, value) => onChange(key, Number(value))}
              maxValue={999_999}
              iconName={iconName}
            />
          </li>
        );
      })}
      <li className={styles['product-fields__switch']}>
        <Switch
          id="isCostPack"
          checked={fields.isCostPack}
          label={InitialFieldsNames.isCostPack.label}
          onCheckedChange={onChangeCostPack}
        />
      </li>
    </ul>
  );
}

export default ProductFields;
