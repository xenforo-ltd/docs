import React, { type ReactNode } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import LinkItem from "@theme/Footer/LinkItem";
import type { Props } from "@theme/Footer/Links/MultiColumn";

type ColumnType = Props["columns"][number];
type ColumnItemType = ColumnType["items"][number];

function ColumnLinkItem({ item }: { item: ColumnItemType }) {
  return item.html ? (
    <li
      className={clsx("footer__item", item.className)}
      // Developer provided the HTML, so assume it's safe.
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({ column }: { column: ColumnType }) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        "footer__col",
        column.className,
      )}>
      {column.title && <div className="footer__title">{column.title}</div>}
      <ul className="footer__items">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({ columns }: Props): ReactNode {
  return (
    <>
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </>
  );
}
