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

You can also find some manual instructions [here](http://www.mkdocs.org/#installation).
