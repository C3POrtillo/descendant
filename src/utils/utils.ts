import type { WeaponData } from '@/utils/types';

const wordSeparators = /[-_\\.+\s]+/g;
const notAlphaNumericOrSpace = /[^ a-zA-Z0-9]+/g;
const notAlphaNumericSpaceOrDash = /[^ a-zA-Z0-9-]/g;
const capitalizedFirstLetter = /[A-Z]+(?![a-z])|[A-Z]/g;

const cleanStringArray = (str: string): string[] => {
  const cleanedString = str
    .replace(wordSeparators, ' ')
    .replace(notAlphaNumericOrSpace, '')
    .replace(capitalizedFirstLetter, ($, ofs) => (ofs ? ' ' : '') + $.trim().toLowerCase())
    .trim();

  return cleanedString.split(' ');
};

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const titleCase = (str: string): string => {
  const capitalizedWords = cleanStringArray(str).map(word => capitalizeFirstLetter(word));

  return capitalizedWords.join(' ');
};

export const camelCase = (str: string): string => {
  const camelCasedWords = cleanStringArray(str).map((word, index) =>
    index === 0 ? word.toLowerCase() : capitalizeFirstLetter(word),
  );

  return camelCasedWords.join('');
};

export const kebabCase = (str: string) =>
  str
    .trim()
    .replace(wordSeparators, '-')
    .replace(notAlphaNumericSpaceOrDash, '')
    .replace(capitalizedFirstLetter, ($, ofs) => (ofs ? '-' : '') + $.trim().toLowerCase())
    .replace(/--+/g, '-');

export const defaultWeaponSort = (a: WeaponData, b: WeaponData) => {
  const compare = ['weapon_rounds_type', 'weapon_type', 'weapon_name'] as const;

  for (const key of compare) {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
  }

  return 0;
};
