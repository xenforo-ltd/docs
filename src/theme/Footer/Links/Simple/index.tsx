import React, { type ReactNode } from "react";
import clsx from "clsx";
import LinkItem from "@theme/Footer/LinkItem";
import type { Props } from "@theme/Footer/Links/Simple";

function SimpleLinkItem({ item }: { item: Props["links"][number] }) {
  return item.html ? (
    <span
      className={clsx("footer__link-item", item.className)}
      // Developer provided the HTML, so assume it's safe.
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <LinkItem item={item} />
  );
}

export default function FooterLinksSimple({
  links,
  children,
}: Props & { children?: ReactNode }): ReactNode {
  return (
    <ul className="p-footer-simpleLinks">
      {links.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && " "}
          <li>
            <SimpleLinkItem item={item} />
          </li>
        </React.Fragment>
      ))}
      {links.length > 0 && children && " "}
      {children}
    </ul>
  );
}
