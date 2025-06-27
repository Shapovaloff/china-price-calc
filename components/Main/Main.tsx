'use client';

import { useMemo, useCallback, useState, useLayoutEffect } from 'react';
import { CalculationState } from './Main.interface';
import { calculateTotalCost } from '@/utils/calculateTotalCost';
import InitialFields from '../InitialFields/InitialFields';
import ProductFields from '../ProductFields/ProductFields';
import IntermediaryFields from '../IntermediaryFields/IntermediaryFields';
import ResultBlock from '../ResultBlock/ResultBlock';
import styles from './Main.module.scss';
import { usePersistedState } from '@/hooks/usePersistedState';
import Auth from '../Auth/Auth';

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

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useLayoutEffect(() => {
    const saved = localStorage.getItem('chinaCalcPassword');
    setIsAuthorized(!!saved);
    setIsAuthChecked(true);
  }, []);

  const handleChange = useCallback(
    <K extends keyof CalculationState>(name: K, value: CalculationState[K]) => {
      setState((prev) => ({ ...prev, [name]: value }));
    },
    [setState]
  );

  const resultData = useMemo(() => calculateTotalCost(state), [state]);

  if (!isAuthChecked) return null;
  if (!isAuthorized) {
    return <Auth onAuthSuccess={() => setIsAuthorized(true)} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <div className={styles.main__header}>
          <div className={styles['main__top-block']}>
            <h1 className={styles.main__title}>
              Расчёт стоимости товаров из <span>Китая</span>
            </h1>
            <a
              target="_blank"
              href="https://boosty.to/china-price-calc/about"
              className={styles.main__btn}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.08461 9.25304L5.26635 1.56104H8.61485L7.93753 3.94584C7.93037 3.95953 7.92454 3.97391 7.92014 3.98876L6.14226 10.286H7.80179C7.10865 12.0517 6.56617 13.436 6.17435 14.439C3.11336 14.4042 2.25484 12.1686 3.00638 9.52355L3.08461 9.25304ZM6.18639 14.439L10.2222 8.51512H8.50987L9.99958 4.72056C12.5564 4.99311 13.7553 7.04335 13.0505 9.52287C12.2936 12.1904 9.23066 14.439 6.24857 14.439H6.18639Z"
                  fill="white"
                />
              </svg>
              Поддержать проект
            </a>
          </div>
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
