# Contributing

Thank you for helping improve the XenForo documentation.

## Notes

- Search [existing issues](https://github.com/xenforo-ltd/docs/issues) before opening a new one.
- Open an issue for documentation errors, site problems, or improvements.
- Open a pull request directly for corrections or site bug fixes. Keep each pull request focused on one change.
- Discuss substantial new material, navigation restructuring, and configuration or styling changes in an issue first.
- For product help, bugs, or feature requests, use the [XenForo community](https://xenforo.com/community/) instead of this repository.
- Report security concerns privately as described in [SECURITY.md](SECURITY.md).

## Development

You can edit a page on GitHub for small corrections. A local build is not required
for a typo fix. To preview changes locally, install pnpm as described in the
[README](../README.md), then run:

```sh
pnpm install
pnpm start
```

The development server generates the API documentation and previews the site.
When applicable, verify examples and run these checks:

```sh
pnpm lint
pnpm build
```

In your pull request, report the checks you performed. Pull requests are also
checked automatically.

## Project structure

- `docs/manual/` contains the administrator manual.
- `docs/devs/` contains the developer documentation.
- `static/api/openapi.json` is the source for the REST API reference. Do not edit generated files in `docs/api/`; run `pnpm docusaurus:api-docs:gen`, `pnpm start`, or `pnpm build` to generate them.
- `static/` contains static assets and JSON schemas, and `src/` contains site components and UI code.
- The root contains the site configuration.

Add new manual and developer pages as `.mdx` files in their respective
directories. Sidebars are generated from the directory structure and
`sidebar_position` frontmatter, so normal page additions do not require edits to
`sidebars.ts`.

## Contribution terms

Write content in English and follow the usual
[rules for user-generated content](https://xenforo.com/community/help/terms/).
By submitting documentation, you agree that it may be included in the published
documentation, and that XenForo or another contributor may later modify or
remove it without contest. You agree that the documentation content you submit
will ultimately be owned by XenForo Ltd.

See the [project license](../LICENSE) and the
[Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by
the Code of Conduct.
