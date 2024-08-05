import type { FilterOptionsData } from '@/components/inputs/types';
import type { BlueprintFilterMap, MissionFilterMap, Pattern } from '@/components/tfd/patterns/types';

import { descendantParts, enhance, hardRates, normalRates, weaponParts } from '@/components/tfd/patterns/types';

export const getAttribute = (descendant: string) => {
  switch (descendant) {
    case 'Lepic':
    case 'Ultimate Lepic':
      return 'Fire';
    case 'Ultimate Bunny':
      return 'Electric';
    case 'Ultimate Viessa':
    case 'Viessa':
      return 'Chill';
    default:
      return 'Non-attribute';
  }
};

export const getRounds = (weapon: string) => {
  switch (weapon) {
    case 'Afterglow Sword':
    case 'Executor':
    case 'Smithereens':
    case 'Piercing Light':
    case 'Restored Relic':
      return 'High Power Rounds';
    case 'Blue Beetle':
    case "Nazeistra's Devotion":
    case 'Perforator':
    case 'Wave of Light':
      return 'Impact Rounds';
    case 'Clairvoyance':
    case "Greg's Reversed Fate":
    case "King's Guard Lance":
    case 'Secret Garden':
      return 'Special Rounds';
    default:
      return 'General Rounds';
  }
};

export const getRarity = (item: string) => {
  switch (item) {
    case item.match(/Crystallization Catalyst/)?.input:
      return 'Rare';
    default:
      return 'Ultimate';
  }
};

const processParts = (
  blueprint: string,
  parts: readonly string[],
  transform: (part: string) => string,
): string | null => {
  for (const part of parts) {
    if (blueprint.includes(part)) {
      return transform(blueprint.split(part)[0].trim());
    }
  }

  return null;
};

export const getBlueprintClass = (blueprint: string): string => {
  const itemClass = processParts(blueprint, enhance, getRarity);
  if (itemClass) {
    return itemClass;
  }

  const descendantClass = processParts(blueprint, descendantParts, getAttribute);
  if (descendantClass) {
    return descendantClass;
  }

  const weaponClass = processParts(blueprint, weaponParts, getRounds);
  if (weaponClass) {
    return weaponClass;
  }

  return '';
};

export const isEnhance = (blueprint: string) => enhance.some(item => blueprint.includes(item));

export const extractAndAddToSet = (blueprint: string, parts: readonly string[], set: Set<string>) =>
  parts.every(part => {
    if (blueprint.includes(part)) {
      set.add(blueprint.split(part)[0].trim());

      return false;
    }

    return true;
  });

type FilterCount = {
  pattern: Pattern;
  trueCount: number;
};

const getRates = (pattern: Pattern) => (pattern['38%'] ? normalRates : hardRates);
export const getBlueprints = (pattern: Pattern) => {
  const keys = getRates(pattern);

  return keys.map(key => pattern[key]);
};

export const filterAndSortPatterns = (
  patternData: Pattern[],
  itemFilter: BlueprintFilterMap,
  missionFilter: MissionFilterMap,
) => {
  const filteredPatterns = patternData.reduce((acc, pattern) => {
    const { type, stealth } = pattern;
    const isValidMission = missionFilter[type] || (stealth && missionFilter['Stealth']);
    const trueCount =
      isValidMission &&
      getBlueprints(pattern)
        .flatMap(blueprint => blueprint)
        .filter(blueprint => itemFilter[blueprint]).length;

    if (trueCount && trueCount > 0) {
      acc.push({ pattern, trueCount });
    }

    return acc;
  }, [] as FilterCount[]);

  // Sort by trueCount in descending order
  filteredPatterns.sort((a, b) => b.trueCount - a.trueCount);

  // Extract sorted patterns
  return filteredPatterns.map(item => item.pattern);
};

export const createFilterFromSet = (set: Set<string>, parts: readonly string[], transform: (item: string) => string) =>
  Array.from(set).map((item: string) => ({
    label: item,
    name: transform(item),
    data: parts.map(part => ({
      value: `${item} ${part}`,
      label: part,
    })),
    defaultChecked: false,
  })) as FilterOptionsData[];
