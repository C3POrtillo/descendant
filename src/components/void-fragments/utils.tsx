import type { VoidFragmentData } from '@/components/void-fragments/types';

import { voidFragmentData } from '@/components/void-fragments/types';

export const deserializeZoneData = (): VoidFragmentData[] =>
  Object.entries(voidFragmentData).flatMap(([zone, { subregions }]) =>
    subregions.map(subregion => ({ ...subregion, zone })),
  );

export const isHighValue = (value: number): string | undefined =>
  value === 20 || (6 <= value && value <= 7) ? 'label-high-value' : undefined;
