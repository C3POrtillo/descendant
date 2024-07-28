import type { MainStatMapKeys } from '@/components/externalComponents/types';

import {
  type ExternalComponentData,
  type FormattedExternalComponentData,
  mainStatMap,
} from '@/components/externalComponents/types';

export const formatExternalComponentData = (data: ExternalComponentData[]): FormattedExternalComponentData[] =>
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
