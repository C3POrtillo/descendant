import type { BasicDataType, FormattedBasicData, MainStatMapKeys } from '@/components/externalComponents/types';

import {
  type ExternalComponentData,
  type FormattedExternalComponentData,
  mainStatMap,
} from '@/components/externalComponents/types';
import { tiers } from '@/utils/types';

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

export const formatBasicComponentData = (data: FormattedExternalComponentData[]): FormattedBasicData =>
  data.reduce((acc, { external_component_equipment_type, external_component_tier, stat, image_url }) => {
    if (!acc[external_component_equipment_type]) {
      acc[external_component_equipment_type] = {} as BasicDataType;
    }

    const basicData = acc[external_component_equipment_type];

    if (!basicData.image_url) {
      acc[external_component_equipment_type]['image_url'] = image_url;
    }

    if (!basicData[external_component_tier]?.length) {
      basicData[external_component_tier] = [stat];
    } else {
      basicData[external_component_tier].push(stat);
    }

    return acc;
  }, {} as FormattedBasicData);
