import type { DescendantAPIData, DescendantStat, FormattedDescendantData } from '@/components/tfd/descendants/types';

import { sortData } from '@/utils/utils';

const isRegularGley = (id: string, stats: DescendantStat) => {
  const match = id === '101000009';
  match &&
    stats.stat_detail.length < 6 &&
    stats.stat_detail.push({
      stat_type: 'Shield Recovery In Combat',
      stat_value: 0,
    });
};

export const formatDescendantData = (descendants: DescendantAPIData[]) =>
  descendants
    .map(({ descendant_stat, descendant_name, descendant_skill, ...data }) => {
      const maxStats = descendant_stat[39];
      const [ultimate, ...name] = descendant_name.split(' ');
      const is_ultimate = ultimate === 'Ultimate';
      const attribute = descendant_skill[0].element_type;
      isRegularGley(data.descendant_id, maxStats);

      return {
        ...data,
        descendant_name,
        is_ultimate,
        attribute,
        descendant_stat: maxStats,
        descendant_skill,
        sort_name: is_ultimate ? [...name].join(' ') : descendant_name,
      };
    })
    .sort((a, b) => sortData(a.sort_name, b.sort_name)) as FormattedDescendantData[];