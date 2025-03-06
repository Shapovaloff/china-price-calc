import { CalculationState } from '@/components/Main/Main.interface';
import { useState, useEffect, useRef } from 'react';

export const usePersistedState = (initialState: CalculationState) => {
  const [state, setState] = useState<CalculationState>(() => {
    if (typeof window === 'undefined') return initialState;

    const saved = localStorage.getItem('calculationState');
    if (!saved) return initialState;

    try {
      const parsed = JSON.parse(saved);
      return {
        ...initialState,
        ...parsed,
        calculationType: ['onlyProduct', 'productWithDelivery'].includes(
          parsed.calculationType
        )
          ? parsed.calculationType
          : initialState.calculationType,
      };
    } catch {
      return initialState;
    }
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const persistState: Partial<CalculationState> = {
      rateYuan: state.rateYuan,
      rateDollar: state.rateDollar,
      costKgDollars: state.costKgDollars,
      costPackDollars: state.costPackDollars,
    };

    localStorage.setItem('calculationState', JSON.stringify(persistState));
  }, [state]);

  return [state, setState] as const;
};
