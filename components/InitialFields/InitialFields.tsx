import { useMemo } from 'react';
import InputWithMask from '@/components/ui/InputWithMask/InputWithMask';
import styles from './InitialFields.module.scss';
import { InitialFieldsNames } from '@/data/fieldNames';
import { InitialFieldsProps, ProductFieldKey } from './InitialFields.interface';

function InitialFields({ fields, onChange }: InitialFieldsProps) {
  const fieldKeys = useMemo<(keyof typeof fields)[]>(
    () => Object.keys(fields) as (keyof typeof fields)[],
    [fields]
  );

  return (
    <ul className={styles['initial-fields']}>
      {fieldKeys.map((key) => {
        const { label, iconName } = InitialFieldsNames[key];
        return (
          <li key={key}>
            <InputWithMask
              label={label}
              defaultValue={Number(fields[key])}
              name={key}
              onChangeInput={(name, value) =>
                onChange(name as ProductFieldKey, Number(value))
              }
              iconName={iconName}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default InitialFields;
