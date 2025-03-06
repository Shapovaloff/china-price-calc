'use client';

import { useMemo, useCallback } from 'react';
import { CalculationState } from './Main.interface';
import { calculateTotalCost } from '@/utils/calculateTotalCost';
import InitialFields from '../InitialFields/InitialFields';
import ProductFields from '../ProductFields/ProductFields';
import IntermediaryFields from '../IntermediaryFields/IntermediaryFields';
import ResultBlock from '../ResultBlock/ResultBlock';
import styles from './Main.module.scss';
import { usePersistedState } from '@/hooks/usePersistedState';

export default function Main() {
  const [state, setState] = usePersistedState({
    rateYuan: 13,
    rateDollar: 100,
    costKgDollars: 3.9,
    costPackDollars: 8,
    cost: 0,
    amount: 0,
    weight: 0,
    isCostPack: false,
    isIntermediary: false,
    commissionPercent: 10,
    calculationType: 'onlyProduct',
  });

  const handleChange = useCallback(
    <K extends keyof CalculationState>(name: K, value: CalculationState[K]) => {
      setState((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const resultData = useMemo(() => calculateTotalCost(state), [state]);

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <div className={styles.main__header}>
          <h1 className={styles.main__title}>
            Расчёт стоимости товаров из <span>Китая</span>
          </h1>
        </div>
        <div className={styles['main__wrapper']}>
          <form className={styles.main__form}>
            <InitialFields
              fields={{
                rateYuan: state.rateYuan,
                rateDollar: state.rateDollar,
                costKgDollars: state.costKgDollars,
                costPackDollars: state.costPackDollars,
              }}
              onChange={(name, value) => handleChange(name, value)}
            />

            <ProductFields
              fields={{
                cost: state.cost,
                amount: state.amount,
                weight: state.weight,
                isCostPack: state.isCostPack,
              }}
              onChange={(name, value) => handleChange(name, value)}
              onChangeCostPack={(checked) =>
                handleChange('isCostPack', checked)
              }
            />

            <IntermediaryFields
              fields={{
                isIntermediary: state.isIntermediary,
                commissionPercent: state.commissionPercent,
                calculationType: state.calculationType,
              }}
              onToggleIntermediary={(checked) =>
                handleChange('isIntermediary', checked)
              }
              onCommissionChange={(value) =>
                handleChange('commissionPercent', value)
              }
              onCalculationTypeChange={(value) =>
                handleChange('calculationType', value)
              }
            />
          </form>
          <div className={styles['main__result']}>
            <ResultBlock {...resultData} />
          </div>
        </div>
      </div>
    </div>
  );
}
