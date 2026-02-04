# Contributing documentation changes

If you're reading this, **THANK YOU** for considering helping us improve and expand our developer documentation.

There are three important things to note about documentation, generally:

1. It's the **best** thing ever. We already have a massive pool of talent within the [XenForo community](https://xenforo.com/community) and a considerable number of them got to where they are today with almost no documentation at all! Not everyone can learn a new code language / framework in this way, and so this documentation is important so the massive pool of talent only gets bigger and better.
2. It's the **worst** thing ever. At least for some people. Some developers **hate** writing documentation. It's time consuming and not easy.
3. It's a **rewarding** and **admirable** task to be able to impart our own knowledge onto others. This is the most important bit, so refer back to #1.

These guidelines aim to set out some of the processes involved in editing our documentation, and some best practices. Feel free to modify these guidelines in a pull request if required.

#### Table of contents

- [Getting started with Docusaurus](#getting-started-with-docusaurus)
  - [What is Docusaurus?](#what-is-docusaurus)
  - [Great, but what is Markdown?](#great-but-what-is-markdown)
  - [Installing dependencies](#installing-dependencies)
  - [Using Docusaurus](#using-docusaurus)
- [Documentation structure](#documentation-structure)
- [Modifying existing pages/sections](#modifying-existing-pagessections)
- [Adding new pages/sections](#adding-new-pagessections)
- [Submitting your changes](#submitting-your-changes)
- [General guidelines](#general-guidelines)

## Getting started with Docusaurus

### What is Docusaurus?

[Docusaurus](https://docusaurus.io/) is a static site generator built by Meta, designed specifically for building documentation websites. It provides features like versioning, search integration, and a modern React-based architecture out of the box.

Not only that, but editing the documentation is as simple as adding or editing Markdown files.

### Great, but what is Markdown?

Well, generally awesome is what it is.

> Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML).

To put it another way, it's simply a way to write plain text and later have it converted to HTML. All documentation is written in text files with a `.md` extension. Markdown has become insanely popular over the last few years. If you'd like to learn more about it, GitHub has a [great guide](https://guides.github.com/features/mastering-markdown/) to get you started.

### Installing dependencies

You'll need [Node.js](https://nodejs.org/) version 20 or higher installed on your system.

For editing the documentation, installing locally is entirely optional as the documentation can be modified directly via the interface provided on GitHub. If you'd like to preview your changes locally, follow the instructions below.

### Using Docusaurus

The first step is to clone the documentation repository. You can either use a Git client for this, or use Git on the command line.

In the desired directory, simply run the following command:

```
git clone git@github.com:xenforo-ltd/docs.git
```

This will create a new directory named `docs` containing the contents of this repo.

Using the command line, change directory to the new `docs` directory and install the dependencies:

```
npm install
```

Then start the development server:

```
npm start
```

This will load up a local web server accessible from the URL `http://localhost:3000/` and it will start watching the documentation for changes and reload automatically.

## Documentation structure

All of the documentation files are located in the `docs/` directory, organised into subdirectories:

- `docs/manual/` - The XenForo manual for administrators
- `docs/devs/` - Developer documentation
- `docs/api/` - REST API documentation (auto-generated)

The sidebar navigation is defined in the `sidebars.ts` file in the root directory.

## Modifying existing pages/sections

Once you've ascertained the section you would like to change, just edit the file directly in your preferred text editor. You can also edit the pages directly on GitHub.

## Adding new pages/sections

If you'd like to add entirely new pages/sections, you can either add new sections to an existing page under an appropriate header (denoted by `##` characters) or create new pages entirely.

Creating new pages involves creating the actual pages themselves, and also modifying the `sidebars.ts` file to reference those pages in the navigation.

We do not generally recommend editing the `sidebars.ts` file outside of the process of adding new pages.

## Submitting your changes

If you followed the instructions to clone this repo and set up Docusaurus, and you want to submit your changes to our repository you will need to create a [pull request](https://git-scm.com/docs/git-request-pull).

If you are editing/adding the files directly on GitHub, a pull request will be submitted automatically.

Once your changes have been submitted, they will periodically be reviewed and either approved and merged, rejected, or discussion will take place related to the desired changes before being accepted.

## General guidelines

We do not want to impose too many rules as a barrier to updating our documentation, but please bear the following in mind:

1. Changes should generally be limited to editing/adding pages/sections.
2. Large changes to the overall documentation structure will not be accepted but if they are necessary they should be discussed first by creating an issue.
3. Similarly, changes to the config files (`docusaurus.config.ts`, `sidebars.ts`) or changes to the styling of the documentation will not be accepted without prior discussion.
4. Any content submitted should be written in English and not contain any content that would circumvent our usual [rules for user generated content](https://xenforo.com/community/help/terms/).
5. Finally, by submitting changes to the documentation you:
   1. agree that changes you submit can be included in our published documentation
   2. agree that once the changes are approved they can in the future be modified or removed by us or another contributor if that becomes necessary
   3. agree not to contest any subsequent modification or removal of content you have submitted
   4. agree that the documentation content you submit will ultimately be owned by XenForo Ltd.
