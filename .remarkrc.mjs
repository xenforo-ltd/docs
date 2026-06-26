import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import remarkLintMaximumLineLength from "remark-lint-maximum-line-length";
import remarkLintHeadingIncrement from "remark-lint-heading-increment";
import remarkLintEmphasisMarker from "remark-lint-emphasis-marker";
import remarkLintListItemSpacing from "remark-lint-list-item-spacing";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";

export default {
	plugins: [
		remarkFrontmatter,
		remarkMdx,
		remarkPresetLintConsistent,
		remarkPresetLintMarkdownStyleGuide,
		remarkPresetLintRecommended,
		[remarkLintEmphasisMarker, "_"],
		[remarkLintHeadingIncrement, false], // TODO: fix this and drop it
		[remarkLintListItemSpacing, { checkBlanks: true }],
		[remarkLintMaximumLineLength, false],
	],
};
