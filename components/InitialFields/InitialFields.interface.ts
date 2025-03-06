import { CalculationState } from '../Main/Main.interface';

export type ProductFieldKey =
  | 'rateYuan'
  | 'rateDollar'
  | 'costKgDollars'
  | 'costPackDollars';

export interface InitialFieldsProps {
  fields: Pick<CalculationState, ProductFieldKey>;
  onChange: (name: ProductFieldKey, value: number) => void;
}
