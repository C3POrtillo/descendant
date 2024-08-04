import type { HeadersType } from '@/components/table/types';

import { hardHeaders, normalHeaders } from '@/components/patterns/types';
import { calculateAttempts } from '@/utils/utils';

const formatData = (array: readonly (string | number)[]): HeadersType[] =>
  array.map(key => {
    const isNumber = typeof key === 'number';
    const data = isNumber ? `${key}%` : key;
    const { expectedAttempts, nearlyGuaranteed, nearlyGuaranteedRange } = isNumber ? calculateAttempts(key) : {};

    return {
      key: data,
      header: (
        <div key={data}>
          {data}
          {isNumber && (
            <div className="flex flex-col text-nowrap text-sm">
              <div>Expected: {expectedAttempts}</div>
              <div>
                Nearly Guaranteed: {nearlyGuaranteed} ± {nearlyGuaranteedRange}
              </div>
            </div>
          )}
        </div>
      ),
    };
  });

const WeaponHeaders = (type: 'normal' | 'hard'): HeadersType[] =>
  type === 'normal' ? formatData(normalHeaders) : formatData(hardHeaders);

export default WeaponHeaders;
