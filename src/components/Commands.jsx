import About from "./commands/About";
import Banner from "./commands/Banner";
import Help from "./commands/Help";

export const commands = [
  {
    command: "help",
    component: <Help key={`help-${Date.now()}`} />,
  },
  {
    command: "banner",
    component: <Banner key={`banner-${Date.now()}`} />,
  },
  {
    command: "clear",
    component: null,
  },
];
