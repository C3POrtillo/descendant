import type { DirectionValues } from '@/components/inputs/types';
import type { ModuleTiersType } from '@/components/tfd/module/types';

const wordSeparators = /[-_\\.+\s]+/g;
const notAlphaNumericOrSpace = /[^ a-zA-Z0-9]+/g;
const notAlphaNumericSpaceOrDash = /[^ a-zA-Z0-9-]/g;
const capitalizedFirstLetter = /[A-Z]+(?![a-z])|[A-Z]/g;

const cleanStringArray = (string: string): string[] => {
  const cleanedString = string
    .replace(wordSeparators, ' ')
    .replace(notAlphaNumericOrSpace, '')
    .replace(capitalizedFirstLetter, ($, ofs) => (ofs ? ' ' : '') + $.trim().toLowerCase())
    .trim();

  return cleanedString.split(' ');
};

const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const titleCase = (string: string): string => {
  const capitalizedWords = cleanStringArray(string).map(word => capitalizeFirstLetter(word));

  return capitalizedWords.filter(str => str).join(' ');
};

export const camelCase = (string: string): string => {
  const camelCasedWords = cleanStringArray(string).map((word, index) =>
    index === 0 ? word.toLowerCase() : capitalizeFirstLetter(word),
  );

  return camelCasedWords.join('');
};

export const kebabCase = (string: string) =>
  string
    .trim()
    .replace(wordSeparators, '-')
    .replace(notAlphaNumericSpaceOrDash, '')
    .replace(capitalizedFirstLetter, ($, ofs) => (ofs ? '-' : '') + $.trim().toLowerCase())
    .replace(/--+/g, '-');

export const stringCompare = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};

export const sortData = (a: string | number, b: string | number, sortDirection?: DirectionValues) => {
  const isReversed = sortDirection === 2;

  if (typeof a === 'number' && typeof b === 'number') {
    if (a === 0 && b !== 0) {
      return 1;
    }
    if (b === 0 && a !== 0) {
      return -1;
    }

    return isReversed ? b - a : a - b;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return isReversed ? stringCompare(b, a) : stringCompare(a, b);
  }

  return 0;
};

export const delimitNumber = (number: number) => Number(number.toFixed(0)).toLocaleString('en', { useGrouping: true });

export const roundToHundreth = (number: number) => number.toFixed(2);

export const addSuffixToValue = (value: string | number, string: string) => `${value}${string}`;

export const getBackgroundLinear = (tier: ModuleTiersType): string => `bg-${kebabCase(tier)}`;
export const getBackgroundRadial = (tier: ModuleTiersType): string => `${getBackgroundLinear(tier)}-radial`;

export const getLabelClass = (name: string): string => `label-${kebabCase(name)}`;

export const createLabelClass = (name: string, value: string): string => {
  switch (name) {
    case 'weapon-tier':
    case 'rounds-type':
    case 'attribute':
    case 'zone':
    case 'external_component_tier':
    case 'weapon-type':
    case 'enhance':
    case 'tier':
      return getLabelClass(value);
    default:
      return getLabelClass(name);
  }
};

export const calculateAttempts = (probability: number) => {
  const p = probability / 100;

  const expectedAttempts = Math.ceil(1 / p).toFixed(0);
  const nearlyGuaranteedLower = Math.log(0.01) / Math.log(1 - p); // 99%;
  const nearlyGuaranteedUpper = Math.log(0.001) / Math.log(1 - p); // 99.9%;

  return {
    expectedAttempts,
    nearlyGuaranteed: Math.ceil((nearlyGuaranteedLower + nearlyGuaranteedUpper) / 2).toFixed(0),
    nearlyGuaranteedRange: Math.ceil((nearlyGuaranteedUpper - nearlyGuaranteedLower) / 2).toFixed(0),
  };
};

export const createFilterMap = (array: readonly string[]) =>
  array.reduce((acc, key) => {
    acc[key] = true;

    return acc;
  }, {} as { [key: string]: boolean });
