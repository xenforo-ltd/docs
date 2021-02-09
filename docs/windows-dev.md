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

## IDE and debugging

To get the very most out of this powerful web server software suite you have now put together, it's important to go beyond a simple text editor for your coding needs.

Check out our section on [Visual Studio Code and how to use it with Xdebug](vscode.md).

## Links to resources

* [Laragon Lite](https://laragon.org/download/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Xdebug](https://xdebug.org/wizard)
* [Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?hl=en)
* [XenForo requirements script](https://xenforo.com/purchase/requirements-zip)
* [XenForo](https://xenforo.com/purchase/)
* [Video of this process](https://youtu.be/-1TOCDbmZmg)

<!-- test -->