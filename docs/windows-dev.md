# Windows development environment 

To get the most out of the XenForo framework, you'll want to have a local webserver capable of running XenForo, along with  capable debugger and a code editor that understands the code and can help you get around it.

Thankfully, these requirements are now simple to meet and won't cost you anything.

The following document and accompanying video will guide you step-by-step to installing everything you need to get started on a Windows machine.

<iframe width="560" height="315" src="https://www.youtube.com/embed/-1TOCDbmZmg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Laragon

[Laragon](https://laragon.org) is an installable package that includes the essential Apache, PHP and MySQL components that you will need to run XenForo.

It is noteworthy that it's fully extensible, easy to maintain and easy to remove should you ever choose to do so.

Begin by downloading and installing [Laragon Lite](https://laragon.org/download/) from laragon.org. It's fine to allow a completely default installation without changing any configuration.

### Add Laragon to path

Once installed, Laragon will open up a window with a large gear icon in the top right corner, which you should right-click to access the quick menu.

From here, select Tools > Path > Add Laragon to Path.

This will ensure that all the binary files added by Laragon, such as `php` and `mysql` are accessible to all applications without having to manually specify the full path to the binaries.

### Check PHP version

Open a new command prompt window (it must be a new window in order to benefit from the changes to the system PATH variable we just made) and type `php -v`. With a little luck, PHP will return information about its version number.

```
C:\Users\Kier>php -v
PHP 7.2.19 (cli) (built: May 29 2019 13:58:59) ( ZTS MSVC15 (Visual C++ 2017) x64 )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
```

## Xdebug

The default version of Laragon has almost everything we need, with the exception of [Xdebug](https://xdebug.org), an indispensable tool for PHP developers.

It's important to get precisely the correct version of Xdebug to work with the version of PHP installed on your computer, so we will collect information about your PHP installation using the command-line version of phpinfo.

### Collecting phpinfo

In your command prompt window, enter the following:
```
php -i > Desktop\info.txt
```

This will write out the complete phpinfo output to a file called `info.txt` on your Desktop.

### Xdebug wizard

Next, open https://xdebug.org/wizard in a browser window, paste the contents of your `info.php` file into the text box on the page and click the **[ Analyse my phpinfo() output ]** button below.

Follow the instructions that are presented after the summary on the subsequent page, to download the php_xdebug DLL file and move it into place, and to copy the *zend_extension* configuration line into your clipboard.

### Edit php.ini

You can quickly edit your `php.ini` file with a Laragon shortcut - right click the gear icon and select PHP > php.ini from the menu that pops up.

At the end of the file, add the following:
```
[xdebug]
xdebug.remote_enable= 1
xdebug.remote_autostart = 1
```
... and immediately after that, add the line from the Xdebug wizard that begins `zend_extension = C:\...`. My completed php.ini additions look like this:
```
[xdebug]
xdebug.remote_enable= 1
xdebug.remote_autostart = 1
zend_extension = C:\laragon\bin\php\php-7.2.19-Win32-VC15-x64\ext\php_xdebug-2.9.8-7.2-vc15-x86_64.dll
```

Save and close the `php.ini` file.

### Test the Xdebug installation

In your command line window, type `php -v` again, and this time we should see output that indicates that Xdebug is properly installed.
```
C:\Users\Kier>php -v
PHP 7.2.19 (cli) (built: May 29 2019 13:58:59) ( ZTS MSVC15 (Visual C++ 2017) x64 )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
    with Xdebug v2.9.8, Copyright (c) 2002-2020, by Derick Rethans
```

### Add Xdebug helper

Most of the debugging you do will be triggered from your browser, so you need to install an extension that will instruct the debugger to start.

For the sake of simplicity we'll detail [Xdebug helper for Google Chrome](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc), but the [Xdebug documentation](https://xdebug.org/docs/remote#browser-extensions) lists extensions for other browsers.

Download the extension and install it, then switch it into **Debug** mode as described on the extension's web page.

## Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/) is an excellent code editor from Microsoft.

Out of the box, it offers syntax highlighting and a certain degree of code intelligence, but easily-installed extensions can turn it into a very powerful development environment.

Begin by downloading and installing [VS Code](https://code.visualstudio.com/Download), then head to the `Extensions` view in the left panel of the interface - it looks like a group of three blocks with a fourth floating nearby.

### Disable built-in PHP

You must disable the built-in PHP language features, as they are superceded by those of PHP Intelephense, an extension we will install in the next step.

To do so, enter `@builtin php` into the search box at the top of the extensions list. This will bring up two components: PHP Language Basics and PHP Language Features. Use the gear icon to **Disable** PHP Language Features, but leave PHP Language Basics alone, as we will still make use of the syntax highlighting elements of this component.

### Extensions

You will need to install a selection of extensions to enable the advanced functionality that makes VS Code into a great development environment.

Use the search box to locate and install the following extensions:
* PHP Intelephense
* PHP Debug
* Visual Studio Intellicode
* SQLTools MySQL/MariaDB

After you have completed the installation of the extensions listed here, make sure that they are fully activated by quitting VS Code and restarting it. This helps to clear any cached settings and reinitialize the engine.

### Workspace folder

As a jumping-off point, you can point VS Code to your Laragon www folder.

From the `File` menu, choose `Open Folder...` and point it to your C:\laragon\www folder.

Now, the `index.php` file created by Laragon, and any other files you place in that folder will appear instantly in the Explorer pane of VS Code.

## Debugging

[Debugging](https://code.visualstudio.com/docs/editor/debugging) is a powerful programming tool that allows you to halt a program at any point and inspect its environment, status and context, then step around and into the subsequent code.

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

* [Laragon Lite](https://laragon.org/download/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Xdebug](https://xdebug.org/wizard)
* [Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?hl=en)
* [XenForo requirements script](https://xenforo.com/purchase/requirements-zip)
* [XenForo](https://xenforo.com/purchase/)
* [Video of this process](https://youtu.be/-1TOCDbmZmg)

<!-- test -->