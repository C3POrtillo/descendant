import type { HardPattern, NormalPattern } from '@/components/patterns/types';

export const isNormalPattern = (variable: NormalPattern | HardPattern): variable is NormalPattern =>
  typeof variable === 'object' && variable !== null && '38%' in variable;
