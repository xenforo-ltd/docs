import React, { type ReactNode } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import type { Props } from "@theme/Footer/Layout";

type FooterLayoutProps = Props & {
  actions?: ReactNode;
  socialLinks?: ReactNode;
  legalLinks?: ReactNode;
};

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
  actions,
  socialLinks,
  legalLinks,
}: FooterLayoutProps): ReactNode {
  return (
    <footer
      id="footer"
      className={clsx(ThemeClassNames.layout.footer.container, "p-footer", {
        "p-footer--dark": style === "dark",
      })}>
      <div className="p-footer-inner">
        <nav className="p-footer-block" aria-label="Footer">
          <div className="p-footer-blockColumns">
            <div className="p-footer-logoColumn">
              {logo && <div className="p-footer-logo">{logo}</div>}
              {actions && <div className="p-footer-buttons">{actions}</div>}
              {socialLinks && (
                <div className="p-footer-social">{socialLinks}</div>
              )}
            </div>
            {links}
          </div>
        </nav>

        <div className="p-footer-extra">
          {copyright}
          {legalLinks && (
            <nav className="p-footer-extra-links" aria-label="Legal">
              {legalLinks}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
