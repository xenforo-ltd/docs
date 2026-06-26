# XenForo Documentation

Welcome to the documentation for XenForo, covering both end-user guides and
developer resources.

## Contents

- **Manual** - End-user documentation for installing, configuring, and managing
  XenForo
- **Developers** - Add-on development documentation including entities, finders,
  repositories, and a full portal tutorial
- **API** - REST API reference documentation generated from an OpenAPI spec

## Building Locally

### Requirements

- [pnpm](https://pnpm.io/installation). It downloads the pnpm and Node.js
  versions this project needs automatically (see `devEngines` in
  `package.json`).

### Setup

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm start

# Build for production
pnpm build

# Serve production build locally
pnpm docusaurus:serve
```

### Checks

Pull requests run these checks in CI. Run them all with `pnpm lint`, or
individually:

```bash
pnpm lint:eslint    # ESLint (TypeScript, JSON, CSS)
pnpm lint:prettier  # Prettier (code and config files)
pnpm lint:remark    # remark (Markdown and MDX)
pnpm lint:spell     # cspell
pnpm lint:tsc       # TypeScript
```

Run `pnpm fix` to fix formatting and lint issues automatically.

### API Documentation

The API reference is generated from an OpenAPI spec using
[docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs).
To regenerate the API docs after modifying `static/api/openapi.json`:

```bash
# Clean and regenerate API docs
pnpm docusaurus:api-docs:clean && pnpm docusaurus:api-docs:gen
```

## Contributing

Please feel free to post any
[issues](https://github.com/xenforo-ltd/docs/issues) you may find with the
documentation. If you'd like to contribute changes to our documentation, then
you should first read our guidelines and other useful information in
[CONTRIBUTING.md](https://github.com/xenforo-ltd/docs/blob/main/.github/CONTRIBUTING.md).

Please also use the main [XenForo community](https://xenforo.com/community) for
help with XenForo development, providing feedback on XenForo, and reporting bugs
with the software.
