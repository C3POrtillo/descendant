import type { HardPattern, NormalPattern } from '@/components/tfd/patterns/types';

import { descendantParts, enhance, weaponParts } from '@/components/tfd/patterns/types';

export const isNormalPattern = (variable: NormalPattern | HardPattern): variable is NormalPattern =>
  typeof variable === 'object' && variable !== null && '38%' in variable;

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
