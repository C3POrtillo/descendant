import type { VoidFragmentData } from '@/components/void-fragments/types';

import { optimal, voidFragmentData } from '@/components/void-fragments/types';

export const deserializeZoneData = (): VoidFragmentData[] =>
  Object.entries(voidFragmentData).flatMap(([zone, { subregions }]) =>
    subregions.map(subregion => ({ ...subregion, zone })),
  );

export const isOptimal = (subregion: string): string | undefined =>
  optimal.includes(subregion) ? 'label-high-value' : undefined;
