import { FC, ReactElement } from "react";

import { About, Careers, Contact, FloatingWhatsApp, Home, Products, VisionMission, WhyChooseUs } from "./batches";

export const Main: FC = (): ReactElement => (
  <main>
    <Home />
    <About />
    <VisionMission />
    <Products />
    <WhyChooseUs />
    <Careers />
    <Contact />
    <FloatingWhatsApp />
  </main>
);
