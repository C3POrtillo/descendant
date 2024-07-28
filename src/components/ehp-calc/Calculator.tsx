import { useEffect, useState } from 'react';

import type { FC } from 'react';

import { getDamageReduction, getEffectiveHealth, handleKeyDown, handlePaste } from '@/components/ehp-calc/utils';
import Text from '@/components/inputs/Text/Text';
import { addSuffixToValue, delimitNumber, roundToHundreth } from '@/utils/utils';

const Calculator: FC = () => {
  const [health, setHealth] = useState('0');
  const [defense, setDefense] = useState('0');
  const [shield, setShield] = useState('0');
  const [damageReduction, setDamageReduction] = useState(0);
  const [effectiveHealth, setEffectiveHealth] = useState(0);

  useEffect(() => {
    setDamageReduction(getDamageReduction(Number(defense)));
    setEffectiveHealth(getEffectiveHealth(Number(health) + Number(shield), damageReduction));
  }, [health, defense, shield]);

  const inputMap = [
    {
      label: 'Health',
      value: health,
      setState: setHealth,
    },
    {
      label: 'Defense',
      value: defense,
      setState: setDefense,
    },
    {
      label: 'Shield',
      value: shield,
      setState: setShield,
    },
  ] as const;

  const displayMap = [
    {
      label: 'Damage Reduction',
      value: addSuffixToValue(roundToHundreth(damageReduction * 100), '%'),
    },
    {
      label: 'Effective HP',
      value: delimitNumber(effectiveHealth),
    },
  ] as const;

  return (
    <fieldset className="rounded-lg border-2 border-solid border-white bg-slate-800 p-4 text-3xl shadow-md shadow-black">
      {inputMap.map(({ label, value, setState }) => (
        <Text
          key={label}
          label={label}
          value={value}
          setState={setState}
          type="number"
          min={0}
          onKeyDown={handleKeyDown}
          onPaste={e => handlePaste(e, setState)}
        />
      ))}
      {displayMap.map(({ label, value }) => (
        <Text key={label} label={label} value={value} disabled />
      ))}
    </fieldset>
  );
};

export default Calculator;