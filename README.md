# XenForo Documentation

Welcome to the documentation for XenForo, covering both end-user guides and developer resources.

## Contents

- **Manual** - End-user documentation for installing, configuring, and managing XenForo
- **Developers** - Add-on development documentation including entities, finders, repositories, and a full portal tutorial
- **API** - REST API reference documentation generated from an OpenAPI spec

## Building Locally

### Requirements

- Node.js 20.0 or higher

### Setup

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm start

# Build for production
pnpm build

# Serve production build locally
pnpm serve
```

### API Documentation

The API reference is generated from an OpenAPI spec using [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs). To regenerate the API docs after modifying `static/api/openapi.json`:

```bash
# Clean and regenerate API docs
pnpm clean-api-docs && pnpm gen-api-docs
```

## Contributing

Please feel free to post any [issues](https://github.com/xenforo-ltd/docs/issues) you may find with the documentation. If you'd like to contribute changes to our documentation, then you should first read our guidelines and other useful information [here](https://github.com/xenforo-ltd/docs/blob/master/CONTRIBUTING.md).

Please also use the main [XenForo community](https://xenforo.com/community) for help with XenForo development, providing feedback on XenForo, and reporting bugs with the software.
