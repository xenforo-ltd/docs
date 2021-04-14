# macOS development environment with concurrent PHP versions

To get the most out of the XenForo framework, you'll want to have a local webserver capable of running XenForo, along with  capable debugger and a code editor that understands the code and can help you get around it.

Thankfully, these requirements are now simple to meet and won't cost you anything.

This document and its accompanying video will help you to get started on a Macintosh running macOS 11 *Big Sur* or later. If you want to skip the explanations, you can skip the document and just read the [summary](#summary).

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/kiFqrd_dHz8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
---

As a bonus, this approach will allow you to run **multiple versions of PHP *at the same time***, so you could run instances of XenForo 1.5 on PHP 5.6, XenForo 2.1 on PHP 7.4 and XenForo 2.2 on PHP 8.0 if you wanted to, **without** having to manually switch the PHP version whenever you want to access a particular version. More on that later.

!!! note
	You must be logged into macOS with a user account with administrative privileges in order to complete the steps in this document.

## Homebrew
[Homebrew](https://brew.sh) is a package manager for macOS that provides a relatively easy way to install all the components you need to run a local web and database server. It can do a lot more than that too, but that's beyond the scope of this document.

One great thing about Homebrew is that it installs its packages into a single directory tree, so it is nicely walled-off from the rest of your Mac, making maintenance and uninstallation far less painful than other methods.

Although the installation is done over the command line, don't let that put you off, because the results are well worth it.

As an extra bonus, literally as I am writing this, Homebrew have [announced version 3.0](https://brew.sh/2021/02/05/homebrew-3.0.0/) with support for [Apple Silicon](https://support.apple.com/en-gb/HT211814).

### Xcode command line tools

To get Homebrew installed, we need to grab some developer tools from Apple.

[Xcode](https://developer.apple.com/xcode/features/) is Apple IDE for developing apps for macOS and iOS. It includes a wide variety of command line tools that are necessary for general application building, and helpfully, these are available as a separate package without having to install the entire Xcode suite.

Open a **Terminal** window on your Mac and enter the following command:

```bash
sudo xcode-select --install;
```

This will prompt you for your password on the command line, and will then open an installation window that will allow you to download and install the tools.

!!! note
	You should run this command again whenever you install a macOS update, because *sometimes* your Mac will not retain the command line tools through the update process.

### Installing Homebrew

In your terminal window, enter the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)";
```

Watch the output and confirm as necessary.

## Installing Homebrew packages

Now it's time to use Homebrew to install some packages. We are going to give Homebrew some information about some additional package sources, then install (almost) everything we need with one long command.

### PHP, Apache, MariaDB, ElasticSearch, Mailhog, ImageMagick

The following command will install three versions of [PHP](https://www.php.net) , the [Apache HTTP Server](http://httpd.apache.org),  [MariaDB](https://mariadb.com) (which we will be using as our [MySQL](https://www.mysql.com) engine), [ElasticSearch](https://www.elastic.co), [MailHog](https://github.com/mailhog/MailHog) and [ImageMagick](https://imagemagick.org).

If you would rather install [MySQL](https://www.mysql.com) than [MariaDB](https://mariadb.com), [read this note](#note-for-cjk-users).

```bash
brew tap elastic/tap;
brew tap shivammathur/php;
brew install pkg-config mariadb httpd mailhog imagemagick elastic/tap/elasticsearch-full shivammathur/php/php@5.6 shivammathur/php/php@7.4 shivammathur/php/php@8.0;
```

This command will take a few minutes to complete, as there is a lot of software to install here, but all good things come to those who wait...

### Multiple PHP versions with Xdebug and ImageMagick

As I said earlier, this process will provide the ability to run several versions of PHP at the same time, without having to run a script to switch between them.

Run the following commands in order to deploy [Xdebug](https://xdebug.org) and ImageMagick into each version of PHP you installed.

```bash
brew unlink php;

brew link --force php@5.6;
pecl install xdebug-2.5.5;
printf "\n" | pecl install imagick;
brew unlink php@5.6;

brew link --force php@7.4;
pecl install xdebug;
printf "\n" | pecl install imagick;
brew unlink php@7.4;

brew link --force php@8.0;
pecl install xdebug;
printf "\n" | pecl install imagick;
```

Again, this will take a few minutes to download and install all the necessary software.

!!! note
	At the time of writing, ImageMagick does not work properly with PHP 8, but I've left the command in place as this may have changed by the time you are running the commands. If the `pecl install imagick` command fails for PHP 8, you can [manually build the imagick extension](#build-imagick-manually).

![Screenshot: macOS running XenForo, being debugged by Xdebug with Visual Studio Code](files/images/macos-debugging.jpg)

## Configuring

As far as possible, we are going to try to minimise the amount of changes we make to the default configuration files for each software component, and instead have the server look at additional configuration files with our own specific instructions in them.

!!! note
	The configurations I am showing here contain my own macOS username, `kier`, but in each instance you will need to replace `kier` with your own username. If you are not sure what your Mac username is, use the command `whoami` in a Terminal window.

### MariaDB

We now need to get MariaDB up and running.

In your terminal window, enter the following commands:

```bash
brew services start mariadb;
sudo /usr/local/bin/mysql_upgrade;
```

You will be asked the MySQL root password - there isn't one yet, so just press enter when prompted.

Next up:

```bash
sudo /usr/local/bin/mysql_secure_installation;
```

You can press enter to accept the defaults for most of the questions this script will ask, except for the root password, which you will need to set. As this is only a development installation, a password of `root` is fine.

### Apache

Begin by editing the following file: `/usr/local/etc/httpd/httpd.conf`

Leave the entire contents of the configuration file unchanged, but at the very end of the file, add the following line:

```apacheconf
Include /usr/local/etc/httpd/extra/httpd-dev.conf
```

Now, create and edit the file `/usr/local/etc/httpd/extra/httpd-dev.conf`

And within it, add the following contents:

```apacheconf
User kier
Group staff

Listen 80
ServerName localhost
Timeout 3600

LoadModule vhost_alias_module lib/httpd/modules/mod_vhost_alias.so
LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
LoadModule deflate_module lib/httpd/modules/mod_deflate.so
LoadModule mime_magic_module lib/httpd/modules/mod_mime_magic.so
LoadModule expires_module lib/httpd/modules/mod_expires.so
LoadModule proxy_module lib/httpd/modules/mod_proxy.so
LoadModule proxy_http_module lib/httpd/modules/mod_proxy_http.so
LoadModule proxy_fcgi_module lib/httpd/modules/mod_proxy_fcgi.so

<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule>

<VirtualHost *:80>
    DocumentRoot "/Users/kier/Documents/www"

    <Directory "/Users/kier/Documents/www">
        Options Indexes FollowSymLinks
        AllowOverride all
        Require all granted
    </Directory>

    <FilesMatch \.php$>
        SetHandler "proxy:fcgi://localhost:9080"
    </FilesMatch>
</VirtualHost>
```

!!! note
	Assuming that you change the three instances of `kier` to your own username, this configuration will expect to serve your web files out of a `www` directory in your `Documents` folder. You will need to create this directory, or change both instances of the path in the configuration if you want to serve from another directory.

### PHP

Each version of PHP requires its own configuration edits, but thankfully they are minor.

#### Xdebug and Mailhog

We need to set up some sensible defaults and enable Xdebug for each PHP version.

Begin by editing the `php.ini` files at `/usr/local/etc/php/5.6/php.ini`, `/usr/local/etc/php/7.4/php.ini` and  `/usr/local/etc/php/8.0/php.ini` and remove any lines at the top of the file referencing xdebug or imagick, then save the files.

Next, create, edit and save the following three *ini* files with the noted contents for each:

##### `/usr/local/etc/php/5.6/conf.d/php-dev.ini`
```ini
post_max_size = 20M
upload_max_filesize = 10M
date.timezone = UTC

[mailhog]
smtp_port = 1025
sendmail_path = "/usr/local/bin/mhsendmail"

[xdebug]
zend_extension = "xdebug.so"
xdebug.remote_enable = 1
xdebug.remote_connect_back = 1
xdebug.remote_port = 9000

[imagick]
extension = "imagick.so"
```
---
##### `/usr/local/etc/php/7.4/conf.d/php-dev.ini` **and** `/usr/local/etc/php/8.0/conf.d/php-dev.ini`
```ini
post_max_size = 20M
upload_max_filesize = 10M
date.timezone = UTC

[mailhog]
smtp_port = 1025
sendmail_path = "/usr/local/bin/mhsendmail"

[xdebug]
zend_extension = "xdebug.so"
xdebug.mode = "debug,develop"
xdebug.discover_client_host = 1
xdebug.client_port = 9000

[imagick]
extension = "imagick.so"
```

!!! warning
	At the time of writing, `pecl install imagick` does not work properly with PHP 8. If you receive errors when trying to run this command, and you don't want to [build the imagick extension manually](#build-imagick-manually), then you will need to comment-out the `extension = "imagick.so"` line from the PHP 8 php-dev.ini, by adding a leading semi-colon.

---

#### Fast CGI (php-fpm)

We are going to be using the FastCGI Process Manager (FPM) implementation of PHP to allow version switching, but first we need to tell each PHP version how to respond in order to let us run multiple versions at the same time.

Create the following file, then enter and save the contents noted below, changing the username to be your own:

`/usr/local/etc/php/5.6/php-fpm.d/x.conf`
```apacheconf
user = kier
group = staff
listen = 127.0.0.1:9056
```
Note the use of port `9056` there. I got `9056` by removing the decimal point from the PHP version number `5.6` and adding the concatenated value `56` to `9000`, resulting in `9056`.

Next, you will need to copy this file to the following locations, changing the port number as required:

`/usr/local/php/7.4/php-fpm.d/x.conf` (using port `9074`)

`/usr/local/php/8.0/php-fpm.d/x.conf` (using port `9080`)

While PHP 7.4 and 8.0 will slurp up our newly-specified FPM config, PHP 5.6 needs a little help. Edit the file `/usr/local/etc/php/5.6/php-fpm.conf` and at the very bottom of the file, add the following:

```apacheconf
include=/usr/local/etc/php/5.6/php-fpm.d/*.conf
```

#### Auto-start

Now that all that has been configured, we can start the servers and instruct them to load at system startup.

```bash
brew services start elasticsearch-full;
brew services start php@5.6;
brew services start php@7.4;
brew services start php@8.0;
brew services start httpd;
```

## Selecting a PHP version

This is the clever part. We can instruct Apache to pass PHP scripts to any of our installed PHP versions with a little configuration in a `.htaccess` file.

The configuration we built [above](#apache) will default the server to use PHP 8.0, but it's easy to override this on a directory by directory basis.

In your `Documents/www` folder, create the following tree of folders and files (or download [this zip](files/info.zip), which contains the same contents):

- Documents
	- www
		- info
			- php5.6
			  	- info.php
			- php7.4
			 	 - info.php
			- php8.0
			  	- info.php
			  
In each of these `index.php` files, add the following contents:
```php
<?php

phpinfo();
```

If you visit any of these locations using your browser, you will see **PHP 8.0** reported as the version in use.

!!! note
	Because we placed the `www` directory inside your `Documents` folder, which gives some advantages like potentially automatically backing-up your www folder to iCloud, it will also cause some slightly irritating permission prompts when Apache and each version of PHP first tries to access the www directory. Just watch for the prompts and confirm them when they appear.

Next, create a `.htaccess` file in each php version directory alongside the `info.php` file, and add the following contents:

### .htaccess for PHP 5.6
```apacheconf
<FilesMatch \.php$>
    SetHandler "proxy:fcgi://localhost:9056"
</FilesMatch>
```

### .htaccess for PHP 7.4
```apacheconf
<FilesMatch \.php$>
    SetHandler "proxy:fcgi://localhost:9074"
</FilesMatch>
```

### .htaccess for PHP 8.0
```apacheconf
<FilesMatch \.php$>
    SetHandler "proxy:fcgi://localhost:9080"
</FilesMatch>
```

Note the use of our custom port numbers from our [FPM config](#fast-cgi-php-fpm) here.

With those files in place, refreshing the PHP info pages for any of those PHP version directories should show the correctly-targeted PHP version. Any PHP files served from those directories should also use that same PHP version.

You can now liberally sprinkle these .htaccess files across your `www` directory to have any directory select any version of PHP you choose.

![Screenshot: Three versions of PHP running concurrently through the Apache webserver](files/images/macos-php-versions.png)

!!! note
	The `.htaccess` files within the [downloadable zip](files/info.zip) have the `SetHandler` directive commented-out, you will need to remove the leading `#` from that line before the directive will operate.

## IDE, debugging and DB manager

To get the very most out of this powerful web server software suite you have now put together, it's important to go beyond a simple text editor for your coding needs.

Check out our section on [Visual Studio Code and how to use it with Xdebug](vscode.md).

## Links to resources

* [Visual Studio Code](https://code.visualstudio.com/)
* [TablePlus](https://tableplus.io/)
* [Homebrew](https://brew.sh)
* [Xdebug](https://xdebug.org)
* [XdebugToggle for Safari](https://apps.apple.com/gb/app/xdebugtoggle/id1437227804?mt=12)
* [Video of this process](https://youtu.be/kiFqrd_dHz8)

---
## Summary

### Terminal command summary

```bash
#!/bin/bash

# install macOS command line development tools
sudo xcode-select --install;

# install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)";

# additional homebrew package sources
brew tap elastic/tap;
brew tap shivammathur/php;

# install homebrew packages
brew install pkg-config mariadb httpd mailhog imagemagick elastic/tap/elasticsearch-full;

# install php 5.6
brew install shivammathur/php/php@5.6;
pecl install xdebug-2.5.5;
printf "\n" | pecl install imagick;

# install php 7.4
brew install shivammathur/php/php@7.4;
pecl install xdebug;
printf "\n" | pecl install imagick;

# install php 8.0
brew install shivammathur/php/php@8.0;
pecl install xdebug;
# this command fails with PHP 8.0 at the time of writing
printf "\n" | pecl install imagick;

# start and setup mariadb
brew services start mariadb;
sudo /usr/local/bin/mysql_upgrade;
sudo /usr/local/bin/mysql_secure_installation;

#
# Edit config files for Apache and PHP at this point,
# see the 'Configuration summary' below
#

# start the rest of the services
brew services start elasticsearch-full;
brew services start php@5.6;
brew services start php@7.4;
brew services start php@8.0;
brew services start httpd;
```

### Configuration summary

#### Make the following edits

Edit the following files as described:

At the end of `/usr/local/etc/httpd/httpd.conf`, add
```apacheconf
Include /usr/local/etc/httpd/extra/httpd-dev.conf
``` 
Within `/usr/local/etc/php/`, edit the files `5.6/php.ini`, `7.4/php.ini` and `8.0/php,ini`, find the *imagick.so* and *xdebug.so* extension lines at the top of the file and if either exists, comment them out as follows:
```ini
; extension="imagick.so"
; zend_extension="xdebug.so"
```

At the end of `/usr/local/etc/php/5.6/php-fpm.conf`, add
```apacheconf
include=/usr/local/etc/php/5.6/php-fpm.d/*.conf
```

#### Add the following files

Download the linked files and place them in the noted directories, creating the containing directory if it does not already exist, and replacing instances of my username `kier` with your own macOS username. Find your own username by running `whoami` in a terminal:

1. `/usr/local/etc/httpd/extra/`[`httpd-dev.conf`](files/macos/httpd/httpd-dev.conf)
1. `/usr/local/etc/php/5.6/conf.d/`[`php-dev.ini`](files/macos/php56/php-dev.ini)
1. `/usr/local/etc/php/5.6/php-fpm.d/`[`x.conf`](files/macos/php56/x.conf)
1. `/usr/local/etc/php/7.4/conf.d/`[`php-dev.ini`](files/macos/php74/php-dev.ini)
1. `/usr/local/etc/php/7.4/php-fpm.d/`[`x.conf`](files/macos/php74/x.conf)
1. `/usr/local/etc/php/8.0/conf.d/`[`php-dev.ini`](files/macos/php80/php-dev.ini)
1. `/usr/local/etc/php/8.0/php-fpm.d/`[`x.conf`](files/macos/php80/x.conf)

### PHP-version-targeting .htaccess files

The following files can be placed inside a directory on your webserver to have all PHP files within that folder use a particular version of PHP.

Rename the files from `htaccess.txt` to `.htaccess` after placing them in their destination folder.

1. PHP 5.6 [`.htaccess`](files/macos/php56/htaccess.txt)
1. PHP 7.4 [`.htaccess`](files/macos/php74/htaccess.txt)
1. PHP 8.0 [`.htaccess`](files/macos/php80/htaccess.txt)

## Note for CJK users

It has been pointed out that [MariaDB does not work particularly well with CJK languages](https://xenforo.com/community/threads/developer-ide-and-server-software-setup-guides.191195/post-1499966). If CJK support is important in your development process, you should replace commands referencing `mariadb` with `mysql`, which will cause MySQL 8.0 to be installed instead.

Specifically, the commands that should change are:
```bash
# install packages including MariaDB:
brew install pkg-config mariadb httpd mailhog imagemagick elastic/tap/elasticsearch-full shivammathur/php/php@5.6 shivammathur/php/php@7.4 shivammathur/php/php@8.0;

# install packages using MySQL instead:
brew install pkg-config mysql httpd mailhog imagemagick elastic/tap/elasticsearch-full shivammathur/php/php@5.6 shivammathur/php/php@7.4 shivammathur/php/php@8.0;

# start MariaDB service
brew services start mariadb

# start MySQL service instead
brew services start mysql
```

![Screenshot: XenForo admin control panel reporting MySQL installed instead of MariaDB](files/images/server-report.png)

## Build imagick manually

In the event that the standard `pecl install imagick` command fails for PHP 8, which it does at the time of writing, it is possible to install the `imagick.so` extension by building it manually, which is not as arduous as it may sound.

Find a place on your workstation in which to work - I tend to create a directory called `/usr/local/build` for this purpose, and `cd` to that directory. Once there, run the following commands:

```bash
brew link --force --overwrite php@8.0
git clone https://github.com/Imagick/imagick
cd imagick
phpize && ./configure
make
make install
```

Assuming no problems occurred, this should have placed a newly-built `imagick.so` into the correct modules directory, namely `/usr/local/lib/php/pecl/20200930/imagick.so`, where `20200930` represents the build number of your version of PHP 8.

At this point, the `extension = "imagick.so"` directive in your `/usr/local/etc/php/8.0/conf.d/php-dev.ini` file will automatically find the correct extension when you start PHP 8.