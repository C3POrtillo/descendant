import type { ReactNode } from 'react';

type HeaderElement = {
  key: string;
  header: ReactNode;
};

export type HeadersType = string | HeaderElement;