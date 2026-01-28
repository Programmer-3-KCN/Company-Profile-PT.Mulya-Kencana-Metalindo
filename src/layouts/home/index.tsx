import { FC, ReactElement } from "react";

import { Footer, Main, Nav } from "./modules";

const HomeLayout: FC = (): ReactElement => (
  <>
    <Nav />
    <Main />
    <Footer />
  </>
);

export default HomeLayout;
