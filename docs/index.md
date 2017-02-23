This documentation aims to get you started with XenForo 2.0 development. Pre-requisites for this documentation assume you
will be familiar with, amongst other things, PHP and MySQL. It is not essential to have experience with a previous
version of XenForo, but it would be an advantage.

On the subsequent pages we will walk you through a brief overview of how to setup a local server, getting ready for
installation, doing a clean install of XenForo 2.0, and run through some of the concepts of XF2 development.

## What's new for developers?

Although XenForo 2.0 adds a lot of improvements for your forums and its members, a significant amount of effort has
been put into improving the underlying framework of XenForo. You can read more information about these changes in
the following threads:

 * <a href="https://xf2demo.xenforo.com/threads/whats-new-for-developers-in-xenforo-2-part-1.1297/" target="_blank">
 	What's new for developers in XenForo 2 (part 1)
   </a>
 * <a href="https://xf2demo.xenforo.com/threads/whats-new-for-developers-in-xenforo-2-part-2.1409/" target="_blank">
 	What's new for developers in XenForo 2 (part 2)
   </a>
 
## Getting started

Getting started with XF development is easy. You just need to download the files, upload them to a web server and
trigger the install.

If you don't have a web server, yet, don't worry, you can set one up on your local machine.

## Downloading XF 2.0

To download XF 2.0, just visit the [Customer Area](https://xenforo.com/customers) and log in as normal. Locate the
correct license and click the "Download XenForo" link. Select the version you wish to download, the package type and
accept the license agreement. Finally, click the Download button to download the files.

## XF 2.0 requirements

The requirements for running XF 2.0 have changed since XF 1.5. The recommended requirements are as follows:

* PHP: 5.4.0+
* MySQL: 5.5+
* PHP extensions: MySQLi, GD (with JPEG support), PCRE, SPL, SimpleXML, DOM, JSON, iconv, ctype, cURL

[Download the requirements test script.](/files/xenforo2-requirements-test.zip)

## Setting up a local server

It's often more convenient to set up a local web server for development. There are generally two approaches for this:

1. Install Apache (or nginx), MySQL (or MariaDB) and PHP yourself.
2. Install a pre-built stack.

Setting things up yourself is more complicated, but tends to give you more control over how everything is set up.

A pre-built stack is the likely the easiest way to go. There are many of them out there and they may vary in feature set,
performance and reliability. Bitnami maintain a number of stacks, including [LAMP](https://bitnami.com/stack/lamp),
[MAMP](https://bitnami.com/stack/mamp>) and [WAMP](https://bitnami.com/stack/wamp) stacks for use on Linux, Mac and
Windows respectively. They all include a fully configured installation of Apache, MySQL and PHP and include PhpMyAdmin for
managing MySQL.

## Uploading

To install XF 2.0, you simply need to extract the ZIP file downloaded from the Customer Area and upload
some of the files and directories within.

Once extracted you will see a directory named `upload`. You need to go into
that directory and upload the files and directories to your server's web root. This would usually be in a directory named
`public_html`, `htdocs` or `www`.

## Creating src/config.php

If using the CLI to install XF 2.0, you will need to create the config.php file manually. To do this, enter the `src` directory within the XF 2.0 files you uploaded to your server. Create a new file named config.php and populate it with the host, port, username, password and database name for your MySQL server.

!!! note
	Make sure you create the config file in within the `src` directory. The `library` directory is only used for legacy purposes.

Once finished, it should look like the following:

```php
<?php

$config['db']['host'] = 'localhost';
$config['db']['port'] = '3306';
$config['db']['username'] = 'root';
$config['db']['password'] = 'mypassword';
$config['db']['dbname'] = 'xf2';
```

You're now ready to install!

If you are using MySQL 5.5 and above and you wish to have full unicode support (for things like emoji) you should also add the following before install:

```php
$config['fullUnicode'] = true;
```

## A note on file permissions


When the CLI is involved, this situation gets trickier as there are now potentially two users that need to be able to write to the files. As such, it's important to take steps to avoid problems writing to these files. Here are a few options.

1. Use the same user for the CLI and the web server. This may take the form of you switching to the web server user before running any installation or upgrade command (or any other that will write files).
2. If available, consider applying ACLs to the `data` and `internal_data` directories. This concept varies by OS and configuration, but the general idea is described [here](http://symfony.com/doc/current/setup/file_permissions.html).
3. Force specific permissions on what is written by PHP. This can be done via the src/config.php file with a line like this: `$config['chmodWritableValue'] = 0666;` This approach is potentially the simplest for development purposes.

Note that if you are developing add-ons, you may potentially have other locations that need to be written to by the CLI and web server users. Notably, this includes the `_output` directory within add-ons. In this situation, having your web server run as your CLI user may cause the least friction. If you go down any other route, you may need to ensure that your web server can write to your entire XenForo installation; this is not recommended in production.

## Installation

The current way to install XF 2.0 is via the new CLI system. A lot of development processes can only be performed 
using the CLI so let's get stuck into using it to install XF 2.0. To run these commands, you will need access to a 
terminal/shell, the php CLI command and the current working directory should be the root of where you uploaded the 
XF 2.0 files.

!!! warning
	To eliminate file permission problems, we recommend running the installer as the same user that PHP runs as via your web server. If you don't do this, you should take steps to ensure that permissions are set correctly. See the above section for more details.

To start the install, just enter the below command:

!!! terminal
    *$* php cmd.php xf:install

You will be asked a number of questions, such as the initial administrator username and password, board title. After this, 
the XF 2.0 database tables and master data will be imported.

XF 2.0 is now installed!