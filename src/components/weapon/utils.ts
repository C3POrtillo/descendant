import type { RoundsType, TiersType } from '@/components/weapon/types';

import { kebabCase } from '@/utils/utils';

type DPSProps = Record<string, number>;

export const tierToLabelClass = (tier: TiersType): string => `label-${kebabCase(tier)}`;

export const tierToBackgroundClass = (tier: TiersType): string => `bg-${kebabCase(tier)}`;

export const roundsTypeToLabelClass = (roundsType: RoundsType): string => `label-${kebabCase(roundsType)}`;

export const getDPS = ({ firearmAtk, magazineCapacity, fireRate, reloadTime }: DPSProps) =>
  (firearmAtk * magazineCapacity) / (magazineCapacity / (fireRate / 60) + reloadTime);

export const getDPSCritical = ({ dps, criticalChance, criticalDamage }: DPSProps) =>
  dps * (1 + (criticalChance / 100) * (criticalDamage - 1));

export const getDPSCriticalWeakpoint = ({ dpsCritical, weakPointDamage }: DPSProps) =>
  dpsCritical * (weakPointDamage + 0.5);
