import styles from './IntermediaryFields.module.scss';
import InputWithMask from '@/components/ui/InputWithMask/InputWithMask';
import RadioGroup from '../ui/RadioGroup/RadioGroup';
import Switch from '../ui/Switch/Switch';
import { IntermediaryFieldsProps } from './IntermediaryFields.interface';
import { CalculationType } from '../Main/Main.interface';

function IntermediaryFields({
  fields,
  onToggleIntermediary,
  onCommissionChange,
  onCalculationTypeChange,
}: IntermediaryFieldsProps) {
  const { isIntermediary, commissionPercent, calculationType } = fields;

  return (
    <div className={styles['intermediary-fields']}>
      <Switch
        id={'isIntermediary'}
        checked={isIntermediary}
        label="Добавить комиссию за заказ"
        onCheckedChange={onToggleIntermediary}
      />

      <div className={styles['intermediary-fields__block']}>
        <InputWithMask
          label="Комиссия за заказ"
          name="commissionPercent"
          onChangeInput={(_, value) => onCommissionChange(+value)}
          defaultValue={commissionPercent}
          maxValue={999}
          disabled={!isIntermediary}
          iconName="percent"
        />

        <RadioGroup<CalculationType>
          name="considerCalcCommission"
          defaultValue={calculationType}
          groupDisabled={!isIntermediary}
          options={[
            {
              value: 'onlyProduct',
              label: 'Только стоимость товаров',
            },
            {
              value: 'productWithDelivery',
              label: 'Стоимость товаров, веса, упаковки',
            },
          ]}
          onChange={onCalculationTypeChange}
        />
      </div>
    </div>
  );
}

export default IntermediaryFields;
