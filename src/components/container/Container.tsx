import React from 'react';

import type { FC, PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, ...props }) => <section {...props}>{children}</section>;

export default Container;
