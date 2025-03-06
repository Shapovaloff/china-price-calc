import { useMemo } from 'react';
import { ResultBlockProps } from './ResultBlock.interface';
import styles from './ResultBlock.module.scss';
import { ResultBlockNames, ResultFieldKey } from '@/data/fieldNames';

function ResultBlock(result: ResultBlockProps) {
  const { total, ...rest } = result;
  const resultEntries = useMemo(
    () => Object.entries(rest) as [ResultFieldKey, string][],
    [rest]
  );

  return (
    <div className={styles['result-block']}>
      {total && (
        <div className={styles['result-block__total']}>
          <p className={styles['result-block__total-label']}>
            {ResultBlockNames.total}
          </p>
          <p className={styles['result-block__total-result']}>{total} ₽</p>
        </div>
      )}
      <div className={styles['result-block__list']}>
        {resultEntries.map(([key, value]) => (
          <div key={key} className={styles['result-block__item']}>
            <p className={styles['result-block__item-label']}>
              {ResultBlockNames[key]}
            </p>
            <p className={styles['result-block__item-value']}>{value} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultBlock;
