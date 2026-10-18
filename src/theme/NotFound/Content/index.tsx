import React, { type ReactNode } from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import type { Props } from "@theme/NotFound/Content";
import Heading from "@theme/Heading";

export default function NotFoundContent({ className }: Props): ReactNode {
  return (
    <main className={clsx("container margin-vert--lg", className)}>
      <Heading as="h1">
        <Translate
          id="theme.NotFound.title"
          description="The title of the 404 page">
          Oops! We ran into some problems.
        </Translate>
      </Heading>
      <p>
        <Translate
          id="theme.NotFound.p1"
          description="The first paragraph of the 404 page">
          The requested page could not be found.
        </Translate>
      </p>
    </main>
  );
}
