interface CalculationParams {
  rateYuan: number;
  rateDollar: number;
  costKgDollars: number;
  costPackDollars: number;
  cost: number;
  weight: number;
  amount?: number;
  isCostPack: boolean;
  isIntermediary: boolean;
  commissionPercent: number;
  calculationType?: string;
}

interface CostBreakdown {
  total: string;
  costProducts: string;
  costWeightProducts: string;
  costPack: string;
  costService: string;
}

const numberWithSeparator = (num: number): string => {
  const roundedNumber = Math.round(num * 100) / 100;
  const formatter = Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    notation: Math.abs(roundedNumber) >= 1e6 ? 'compact' : 'standard',
    compactDisplay: 'short',
  });

  return formatter
    .format(roundedNumber)
    .replace(/\u202F/g, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/\./, ',');
};

const calculateWeightCost = (
  weightGrams: number,
  costPerKgDollars: number,
  dollarRate: number
): number => {
  return (weightGrams / 1000) * costPerKgDollars * dollarRate;
};

const calculateProductCost = (
  productCostYuan: number,
  exchangeRateYuan: number,
  quantity: number
): number => {
  return productCostYuan * exchangeRateYuan * quantity;
};

const calculatePackagingCost = (
  includePackaging: boolean,
  packCostDollars: number,
  dollarRate: number
): number => {
  return includePackaging ? packCostDollars * dollarRate : 0;
};

const calculateServiceCommission = (
  isIntermediary: boolean,
  commissionRate: number,
  baseAmount: number,
  calculationType?: string
): number => {
  if (!isIntermediary) return 0;

  const commissionMultiplier = commissionRate / 100;
  return calculationType === 'onlyProduct'
    ? baseAmount * commissionMultiplier
    : baseAmount * commissionMultiplier;
};

const formatCostBreakdown = (breakdown: {
  total: number;
  costProducts: number;
  costWeightProducts: number;
  costPack: number;
  costService: number;
}): CostBreakdown => {
  return {
    total: numberWithSeparator(breakdown.total),
    costProducts: numberWithSeparator(breakdown.costProducts),
    costWeightProducts: numberWithSeparator(breakdown.costWeightProducts),
    costPack: numberWithSeparator(breakdown.costPack),
    costService: numberWithSeparator(breakdown.costService),
  };
};

export const calculateTotalCost = (
  params: CalculationParams
): CostBreakdown => {
  const {
    rateYuan,
    rateDollar,
    costKgDollars,
    costPackDollars,
    cost,
    weight,
    amount,
    isCostPack,
    isIntermediary,
    commissionPercent,
    calculationType = 'onlyProduct',
  } = params;

  const baseAmount = amount || 1;

  // Calculate base costs
  const costProducts = calculateProductCost(cost, rateYuan, baseAmount);
  const costWeightProducts =
    calculateWeightCost(weight, costKgDollars, rateDollar) * baseAmount;
  const costPack = calculatePackagingCost(
    isCostPack,
    costPackDollars,
    rateDollar
  );

  // Calculate commission base amount
  const commissionBase =
    calculationType === 'onlyProduct'
      ? costProducts
      : costProducts + costWeightProducts + costPack;

  // Calculate service commission
  const costService = calculateServiceCommission(
    isIntermediary,
    commissionPercent,
    commissionBase,
    calculationType
  );

  // Sum all costs
  const total = costProducts + costWeightProducts + costPack + costService;

  return formatCostBreakdown({
    total,
    costProducts,
    costWeightProducts,
    costPack,
    costService,
  });
};
