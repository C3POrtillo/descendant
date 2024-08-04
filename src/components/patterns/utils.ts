import type { HardPattern, NormalPattern } from '@/components/patterns/types';

import { descendantParts, enhance, weaponParts } from '@/components/patterns/types';

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

export const getBlueprintClass = (blueprint: string) => {
  let string = '';
  const isNotItem = enhance.every(item => {
    if (blueprint.includes(item)) {
      string = getRarity(item);

      return false;
    }

    return true;
  });

  const isNotDescendant =
    isNotItem &&
    descendantParts.every(part => {
      if (blueprint.includes(part)) {
        string = getAttribute(blueprint.split(part)[0].trim());

        return false;
      }

      return true;
    });

  isNotDescendant &&
    weaponParts.every(part => {
      if (blueprint.includes(part)) {
        string = getRounds(blueprint.split(part)[0].trim());

        return false;
      }

      return true;
    });

  return string;
};
