# XenForo Documentation

<img src="static/img/icon-rounded.svg" width="96" hspace="16" vspace="4" align="left" alt="XenForo Documentation icon" />

[![XenForo](https://img.shields.io/badge/XenForo-%230F578A)](https://xenforo.com)
[![License](https://img.shields.io/github/license/xenforo-ltd/docs)](https://github.com/xenforo-ltd/docs/blob/main/LICENSE)
[![Status](https://img.shields.io/github/check-runs/xenforo-ltd/docs/main?label=status)](https://github.com/xenforo-ltd/docs/actions)

Documentation for XenForo administrators and developers. The
[manual](https://docs.xenforo.com/) covers installation, configuration, and
managing your community, while the [developer guides](https://docs.xenforo.com/devs)
explain how to build add-ons and extend XenForo. The
[API reference](https://docs.xenforo.com/api) documents the REST API for
integrating XenForo with other applications.

## Prerequisites

Install [pnpm](https://pnpm.io/installation). It automatically downloads the
required Node.js and pnpm versions.

## Quick start

```bash
pnpm install
pnpm start
```

The development server previews the site at [localhost:3000](http://localhost:3000).
To build and preview the production site locally:

```bash
pnpm build
pnpm docusaurus:serve
```

## Checks

Run `pnpm lint` to run the checks used in CI. Run `pnpm fix` to fix formatting
and lint issues automatically.

## API documentation

The API reference is generated from `static/api/openapi.json`. Edit that file
instead of the generated files in `docs/api/`. The `pnpm start` and `pnpm build`
commands regenerate the reference automatically.

## Security

Do not report security vulnerabilities in public issues.

See [SECURITY.md](.github/SECURITY.md) for vulnerability reporting instructions.

## Support

Use the [XenForo community](https://xenforo.com/community/) for product help,
bugs, and feature requests. For documentation errors, site problems, or
improvements, use this repository's [GitHub Issues](https://github.com/xenforo-ltd/docs/issues).

For support guidance, see [SUPPORT.md](.github/SUPPORT.md).

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for development and contribution
guidelines.

## License

Copyright (c) XenForo Ltd. All rights reserved.

This project is licensed under the MIT License. See [LICENSE](LICENSE) for
details.
