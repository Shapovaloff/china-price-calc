import { CalculationState } from '../Main/Main.interface';

export interface IntermediaryFieldsProps {
  fields: Pick<
    CalculationState,
    'isIntermediary' | 'commissionPercent' | 'calculationType'
  >;
  onToggleIntermediary: (checked: boolean) => void;
  onCommissionChange: (value: number) => void;
  onCalculationTypeChange: (value: CalculationState['calculationType']) => void;
}
