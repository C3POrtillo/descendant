import React from 'react';

import type { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => (
  <section className="flex w-4/5 content-center justify-center gap-4 place-self-center">{children}</section>
);

export default Container;
