import { FC, PropsWithChildren, ReactElement } from "react";

import { Content } from "./batches";

type T = Readonly<PropsWithChildren>;

export const Main: FC<T> = (props): ReactElement => (
  <main>
    <Content />
    {props.children}
  </main>
);
