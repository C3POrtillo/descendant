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
        <div key={data} className="flex flex-row items-center gap-4 px-4 py-1 md:py-4">
          <div className="text-lg lg:text-2xl">{data}</div>
          {isNumber && (
            <div className="flex w-1/2 flex-col text-nowrap text-sm">
              <div className="text-left">Expected: {expectedAttempts}</div>
              <div className="text-left">
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