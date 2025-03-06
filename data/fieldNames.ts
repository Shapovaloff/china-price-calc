import { IconType } from '@/components/ui/Icon/Icon.interface';

export const ResultBlockNames = {
  total: 'Итого:',
  costProducts: 'Стоимость товаров:',
  costWeightProducts: 'Стоимость веса товаров:',
  costPack: 'Упаковка:',
  costService: 'Комиссия:',
} as const;

export type ResultFieldKey = keyof typeof ResultBlockNames;

interface InitialFieldsNamesProps {
  [key: string]: {
    label: string;
    iconName?: IconType;
  };
}

export const InitialFieldsNames: InitialFieldsNamesProps = {
  rateYuan: { label: 'Курс ¥', iconName: 'rub' },
  rateDollar: { label: 'Курс $ на ЮВ', iconName: 'rub' },
  costKgDollars: { label: 'Тариф за 1 кг', iconName: 'dollar' },
  costPackDollars: {
    label: 'Стоимость упаковки',
    iconName: 'dollar',
  },
  cost: { label: 'Цена товара', iconName: 'yuan' },
  amount: { label: 'Количество единиц', iconName: 'amount' },
  weight: { label: 'Вес товара (в граммах)', iconName: 'weight' },
  isCostPack: { label: 'Включить стоимость упаковки' },
} as const;

export type InitialFieldKey = keyof typeof InitialFieldsNames;
