import type { MainStatMapKeys } from '@/components/externalComponents/types';

import {
  type ExternalComponentData,
  type FormattedExternalComponentData,
  mainStatMap,
} from '@/components/externalComponents/types';
import { tiers } from '@/utils/types';

const formatExternalComponentData = (data: ExternalComponentData[]): FormattedExternalComponentData[] =>
  data.map(externalComponent => {
    const statAt100 = externalComponent.base_stat[99];

    return {
      ...externalComponent,
      stat: {
        stat_id: mainStatMap[statAt100.stat_id as MainStatMapKeys],
        stat_value: statAt100.stat_value,
      },
    };
  });

const tiersWeight = tiers.reduce((acc, tier, index) => {
  acc[tier] = index;

  return acc;
}, {} as Record<string, number>);

export const getSortedExternalComponentData = (components: ExternalComponentData[]): FormattedExternalComponentData[] =>
  formatExternalComponentData(components).sort((a, b) => {
    const aTier = tiersWeight[a.external_component_tier];
    const bTier = tiersWeight[b.external_component_tier];

    return bTier - aTier;
  });
