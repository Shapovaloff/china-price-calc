export type CalculationType = 'onlyProduct' | 'productWithDelivery';

export interface CalculationState {
  // Initial
  rateYuan: number;
  rateDollar: number;
  costKgDollars: number;
  costPackDollars: number;

  // Product
  cost: number;
  amount: number;
  weight: number;
  isCostPack: boolean;

  // Intermediary
  isIntermediary: boolean;
  commissionPercent: number;
  calculationType: CalculationType;
}
