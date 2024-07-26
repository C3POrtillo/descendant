import type { VoidFragmentData } from '@/components/void-fragments/types';

import { voidFragmentData } from '@/components/void-fragments/types';

export const deserializeZoneData = (): VoidFragmentData[] =>
  Object.entries(voidFragmentData).flatMap(([zone, { subregions }]) =>
    subregions.map(subregion => ({ ...subregion, zone })),
  );
