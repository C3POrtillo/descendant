import { voidFragmentData } from '@/components/void-fragments/types';

export const deserializeZoneData = () =>
  Object.entries(voidFragmentData).flatMap(([zone, { subregions }]) =>
    subregions.map(subregion => ({ ...subregion, zone })),
  );
