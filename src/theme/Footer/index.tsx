import React, { type ReactNode } from "react";

import {
  isMultiColumnFooterLinks,
  useThemeConfig,
} from "@docusaurus/theme-common";
import FooterLinks from "@theme/Footer/Links";
import ColorModeToggle from "@theme/Navbar/ColorModeToggle";
import FooterLogo from "@theme/Footer/Logo";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLayout from "./Layout";
import FooterLinksSimple from "./Links/Simple";
import "./styles.css";

const sectionClasses = [
  "p-footer-buttons",
  "p-footer-social",
  "p-footer-extra-links",
];

function Footer(): ReactNode {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;
  const getColumns = (footerLinks: typeof links | undefined) =>
    footerLinks &&
    footerLinks.length > 0 &&
    isMultiColumnFooterLinks(footerLinks)
      ? footerLinks
      : [];
  const columns = getColumns(links);
  const getNavigation = (
    columnsToRender: typeof columns,
    fallback: typeof links | undefined,
  ) =>
    columnsToRender.length > 0
      ? columnsToRender.filter(
          (column) => !sectionClasses.includes(column.className ?? ""),
        )
      : fallback;
  const navigation = getNavigation(columns, links);

  const renderSection = (className: string, children?: ReactNode) => {
    const column = columns.find((column) => column.className === className);
    if (!column && !children) {
      return null;
    }
    return (
      <FooterLinksSimple links={column?.items ?? []}>
        {children}
      </FooterLinksSimple>
    );
  };

  return (
    <FooterLayout
      style={style}
      links={
        navigation &&
        navigation.length > 0 && <FooterLinks links={navigation} />
      }
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
      actions={renderSection("p-footer-buttons")}
      socialLinks={renderSection("p-footer-social")}
      legalLinks={renderSection(
        "p-footer-extra-links",
        <li>
          <ColorModeToggle className="p-footer-colorMode" />
        </li>,
      )}
    />
  );
}

export default React.memo(Footer);
