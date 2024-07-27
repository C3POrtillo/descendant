import React from 'react';

import type { FC, PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => (
  <section className={['px-auto', className].join(' ')} {...props}>
    {children}
  </section>
);

export default Container;
