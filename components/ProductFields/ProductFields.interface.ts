import { CalculationState } from '../Main/Main.interface';

export type ProductFieldKey = 'cost' | 'amount' | 'weight' | 'isCostPack';

export interface ProductFieldsProps {
  fields: Pick<CalculationState, ProductFieldKey>;
  onChange: (name: ProductFieldKey, value: number | boolean) => void;
  onChangeCostPack: (checked: boolean) => void;
}
