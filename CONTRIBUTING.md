# Contributing documentation changes

If you're reading this, **THANK YOU** for considering helping us improve and expand our developer documentation 👍

There's three important things to note about documentation, generally:

1. It's the **best** thing ever. We already have a massive pool of talent within the [XenForo community](https://xenforo.com/community) and a considerable number of them got to where they are today with almost no documentation at all! Not everyone can learn a new code language / framework in this way, and so this documentation is important so the massive pool of talent only gets bigger and better.
2. It's the **worst** thing ever. At least for some people. Some developers **hate** writing documentation. It's time consuming and not easy.
3. It's a **rewarding** and **admirable** task to be able to impart our own knowledge onto others. This is the most important bit, so refer back to #1 😉

These guidelines aim to set out some of the processes involved in editing our documentation, and some best practices. Feel free to modify these guidelines in a pull request if required.

#### Table of contents

* [Getting started with MkDocs](#getting-started-with-mkdocs)
  * [What is MkDocs?](#what-is-mkdocs)
  * [Great, but what is Markdown?](#great-but-what-is-markdown)
  * [Installing MkDocs](#installing-mkdocs)
  * [Using MkDocs](#using-mkdocs)
* [Documentation structure](#documentation-structure)
* [Modifying existing pages/sections](#modifying-existing-pages-sections)
* [Adding new pages/sections](#adding-new-pages-sections)
* [Submitting your changes](#submitting-your-changes)
* [General guidelines](#general-guidelines)

## Getting started with MkDocs

### What is MkDocs?

[MkDocs](http://www.mkdocs.org/) is a "static site generator" geared towards building project documentation. We chose MkDocs because of its ease of use and, well, if we're honest, so we didn't have to build our own system like we did for the [XenForo 1 Manual](https://xenforo.com/help/manual/). It also makes it insanely easy for us to be able to accept changes from our contributors.

Not only that, but editing the documentation is as simple as adding or editing files using Markdown.

### Great, but what is Markdown?

Well, generally awesome is what it is 😁 

> Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML).

To put it another way, it's simply a way to write plain text and later have it converted to HTML. All documentation written in MkDocs are simply text files with a `.md` extension. Markdown has become insanely popular over the last few years. If you'd like to learn more about it, GitHub has a [great guide](https://guides.github.com/features/mastering-markdown/) to get you started.

### Installing MkDocs

MkDocs can be installed using a variety of OS package managers, and this is the recommended approach to installing it.

* [Homebrew](http://brew.sh/) (macOS)
* [Chocolatey](https://chocolatey.org/) (Windows)
* [yum](http://yum.baseurl.org/), [apt-get](https://help.ubuntu.com/community/AptGet/Howto), [DNF](http://dnf.readthedocs.io/en/latest/index.html) (Linux)

You can also find some more detailed instructions [here](http://www.mkdocs.org/#installation).

For editing the documentation, installing MkDocs is entirely optional as the documentation can be modified directly via the interface provided on GitHub. If you'd like to learn more about setting up MkDocs you can read the section below.

### Using MkDocs

The first step to using MkDocs alongside this documentation is to pull the documentation down from this repo. You can either use a Git client for this, or use Git on the command line.

In the desired directory, simply run the following command:

```
git clone git@github.com:xenforo-ltd/docs.git
```

This will create a new directory named `docs` containing the contents of this repo.

Using the command line, change directory to the new `docs` directory and run the following command:

```
mkdocs serve
```

This will load up a local web server based on the directory contents which is now accessible from the URL `http://localhost:8000/` and it will start watching the documentation for changes and reload automatically.

## Documentation structure

All of the documentation files will appear in the `docs/docs` directory where you will find the top level pages for each section.

These top level pages are also defined, along with their titles, inside the `docs/mkdocs.yml` file.

Each of the top level pages are split into sections. Each header section (denoted by a heading starting with `##` characters) will appear in the navigation bar for each page.

## Modifying existing pages/sections

Once you've ascertained the section you would like to change, just edit the file directly in your preferred text editor. You can also edit the pages directly on GitHub.

## Adding new pages/sections

If you'd like to add entirely new pages/sections, you can either add new sections to an exisitng page under an appropriate header (again, denoted by `##` characters) or create new pages entirely.

Creating new pages involves creating the actual pages themselves, and also modifying the `docs/mkdocs.yml` file to reference those pages.

We do not generally recommend editing the `docs/mkdocs.yml` file outside of the process of adding new pages.

## Submitting your changes

If you followed the instructions to clone this repo and set up MkDocs, and you want to submit your changes to our repository you will need to create a [pull request](https://git-scm.com/docs/git-request-pull).

If you are editing/adding the files directly on GitHub, a pull request will be submitted automatically.

Once your changes have been submitted, they will periodically be reviewed and either approved and merged, rejected, or discussion will take place related to the desired changes before being accepted.

## General guidelines

We do not want to impose too many rules as a barrier to updating our documentation, but please bear the following in mind:

1. Changes should generally be limited to editing/adding pages/sections.
2. Large changes to the overall documentation structure will not be accepted but if they are necessary they should be discussed first by creating an issue.
3. Similarly, changes to the config `docs/mkdocs.yml` file or changes to the styling of the documentation will not be accepted.
4. Any content submitted should be written in English and not contain any content that would not circumvent our usual [rules for user generated content](https://xenforo.com/community/help/terms/).
5. Finally, by submitting changes to the documentation you:
    1. agree that changes you submit can be included in our published documentation
    2. agree that once the changes are approved they can in the future be modified or removed by us or another contributor if that becomes necessary
    3. agree not to contest any subsequent modification or removal of content you have submitted
    4. agree that the documentation content you submit will ultimately be owned by XenForo Ltd.
