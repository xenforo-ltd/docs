import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkLintEmphasisMarker from "remark-lint-emphasis-marker";
import remarkLintFileExtension from "remark-lint-file-extension";
import remarkLintListItemSpacing from "remark-lint-list-item-spacing";
import remarkLintMaximumLineLength from "remark-lint-maximum-line-length";
import remarkLintNoFileNameIrregularCharacters from "remark-lint-no-file-name-irregular-characters";
import remarkLintOrderedListMarkerValue from "remark-lint-ordered-list-marker-value";
import remarkMdx from "remark-mdx";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";

export default {
  // Output style for `pnpm fix:remark`, matching the lint rules below
  settings: {
    bullet: "-",
    emphasis: "_",
    strong: "*",
    rule: "-",
    listItemIndent: "one",
  },
  plugins: [
    remarkFrontmatter,
    remarkMdx,
    remarkDirective, // Docusaurus admonitions (:::note)
    remarkPresetLintConsistent,
    remarkPresetLintMarkdownStyleGuide,
    remarkPresetLintRecommended,
    [remarkLintEmphasisMarker, "_"],
    [remarkLintFileExtension, false], // Docs pages are .mdx
    [remarkLintListItemSpacing, { checkBlanks: true }],
    [remarkLintMaximumLineLength, false], // Prose lines aren't wrapped
    [remarkLintNoFileNameIrregularCharacters, /[^-._\dA-Za-z]/],
    [remarkLintOrderedListMarkerValue, "ordered"], // Number lists 1, 2, 3
  ],
};
