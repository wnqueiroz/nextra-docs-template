import type { DocsThemeConfig } from "nextra-theme-docs";
import { Logo } from "./src/components/Logo";
import { Footer } from "./src/components/Footer";

const config: DocsThemeConfig = {
  logo: Logo,
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: <Footer />,
  },
};

export default config;
