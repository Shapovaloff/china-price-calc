import { PiCurrencyRubBold, PiCurrencyDollarBold } from 'react-icons/pi';
import { MdOutlineCurrencyYuan, MdOutlinePercent } from 'react-icons/md';
import { TbWeight } from 'react-icons/tb';
import { BsBoxes } from 'react-icons/bs';
import { IconProps } from './Icon.interface';

const iconMap = {
  rub: PiCurrencyRubBold,
  dollar: PiCurrencyDollarBold,
  yuan: MdOutlineCurrencyYuan,
  weight: TbWeight,
  amount: BsBoxes,
  percent: MdOutlinePercent,
};

const Icon = ({ type, size = 24, className }: IconProps) => {
  const IconComponent = iconMap[type];

  if (!IconComponent) {
    console.error(`Иконка с типом "${type}" не найдена.`);
    return null;
  }

  return <IconComponent className={className} size={size} />;
};

export default Icon;
