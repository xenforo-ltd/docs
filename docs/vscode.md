# Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/) is an excellent code editor from Microsoft.

Out of the box, it offers syntax highlighting and a certain degree of code intelligence, but easily-installed extensions can turn it into a very powerful development environment.

Begin by downloading and installing [VS Code](https://code.visualstudio.com/Download).

## Workspace folder

As a jumping-off point, you can point VS Code to your www folder.

From the `File` menu, choose `Open Folder...` and point it to your `www` folder.

Now, any files you place in that folder will appear instantly in the Explorer pane of VS Code.

## Extensions

Head to the `Extensions` view in the left panel of the interface - it looks like a group of three blocks with a fourth floating nearby.

### Disable built-in PHP

You must disable the built-in PHP language features, as they are superceded by those of PHP Intelephense, an extension we will install in the next step.

To do so, enter `@builtin php` into the search box at the top of the extensions list. This will bring up two components: PHP Language Basics and PHP Language Features. Use the gear icon to **Disable** PHP Language Features, but leave PHP Language Basics alone, as we will still make use of the syntax highlighting elements of this component.

### Install extensions

You will need to install a selection of extensions to enable the advanced functionality that makes VS Code into a great development environment.

Use the search box to locate and install the following extensions:

* PHP Intelephense
* PHP Debug
* Visual Studio Intellicode
* SQLTools MySQL/MariaDB

After you have completed the installation of the extensions listed here, make sure that they are fully activated by quitting VS Code and restarting it. This helps to clear any cached settings and reinitialize the engine.

## Debugging

[Debugging](https://code.visualstudio.com/docs/editor/debugging) is a powerful programming tool that allows you to halt a program at any point and inspect its environment, status and context, then step around and into the subsequent code.

### Add Xdebug helper

Most of the debugging you do will be triggered from your browser, so you need to install an extension that will instruct the debugger to start.

For the sake of simplicity we'll detail [Xdebug helper for Google Chrome](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc), but the [Xdebug documentation](https://xdebug.org/docs/remote#browser-extensions) lists extensions for other browsers.

Download the extension and install it, then switch it into **Debug** mode as described on the extension's web page.

### Debugging configuration

Before we can start using Xdebug in VS Code, we need to add a Debug configuration.

From the `Run` menu, select `Add Configuration...` and choose `PHP` from the following dialog. This will create a `launch.json` file with two configurations - 'Listen for XDebug' and 'Launch currently open script'.

Switch to the `Run` view in the left panel - it looks like a triangle with a bug overlaid.

At the top of the panel you will find a gadget with a 'Play' (triangle) icon and the text 'Listen for XDebug'. Click the triangle, and you will notice that the status bar at the bottom of the VS Code window changes color to indicate that it is listening.

You may toggle listening mode on and off at any time.

To start debugging a script, place breakpoints in your code by adding a dot in the gutter to the left of the line numbers in a script.

When the script runs, execution will pause whenever it reaches a breakpoint, allowing you to inspect the status and context of the application at that point.

### Example debug

Open the `index.php` script that Laragon placed in the `www` folder.

Place a breakpoint on line 2 - `if (!empty($_GET['q'])) {` and make sure that VS Code is in 'Listen for XDebug' mode.

Open a new browser tab and set the Xdebug helper to **Debug** mode, then enter the URL `http://localhost/?q=info` into the address bar.

Xdebug should trigger VS Code to move into debug mode and pause execution just before it runs the statements on line 2.

In the **VARIABLES** panel, expand the **Superglobals** group, and you will see that `$_GET` is noted as an `array(1)`, meaning that it has one member. Expand the collapsed `$_GET` section, and you will see that its member is `q` with a value of `info`, as we would expect, having just passed `?q=info` via GET to the script.

You can now use the `Step Over` button (or press F10 on the keyboard) on the debug toolbar to allow execution to continue one line at a time until all the PHP is complete and the page will load fully in the browser.

### Advanced debugging

It is beyond the scope of this tutorial to go into detail about how to use a Step Debugger, but there are plenty of resources online to help you get the gist.

* [Visual Studio Debugging](https://code.visualstudio.com/docs/editor/debugging) (Visual Studio Code Docs)
* [Step Into Step-through Debugging](https://www.fourkitchens.com/blog/article/step-step-through-debugging/) (Four Kitchens)

## Links to resources

* [XenForo requirements script](https://xenforo.com/purchase/requirements-zip)
* [XenForo](https://xenforo.com/purchase/)