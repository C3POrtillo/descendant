import type { HeadersType } from '@/components/table/types';

import { weaponTableHeaders } from '@/components/tfd/weapon/types';

const WeaponHeaders = (): HeadersType[] =>
  weaponTableHeaders.map(key => ({
    key,
    header: <div key={key}>{key}</div>,
  }));

export default WeaponHeaders;
