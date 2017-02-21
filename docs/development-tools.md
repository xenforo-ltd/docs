XF2 provides developers with a number of built in tools you can use to expedite development of add-ons and we'll go through some of these below.

## Debug mode

Debug mode can be enabled in your `config.php` which will allow you to access certain development tools in the Admin CP (such as creating routes, permissions, admin navigation etd.) and it will also enable an output at the bottom of every page which details how long the page took to process, how many queries were executed to render the page and how much memory was used. A tooltip containing information about the current controller, action and template name is available on hover. You can also click on the time output and this will give you a detailed look at exactly what queries ran and the stack trace that led to that query being executed.
 
 You can enable debug mode by adding the following to `config.php`:
 
```php
$config['debug'] = true;
``` 

## Enabling development mode

Development mode is a special mode, activated in your `config.php` file which will trigger XF to automatically write out your development files to your `_output` directory. This mode needs to be enabled for filesystem template editing to be enabled. As development mode will be writing files to your file system it is important to ensure you have the appropriate file permissions in place. This may vary depending on environment, but a typical configuration would be to ensure that for any add-on you are working on, you have its `_output` directory set chmod to `0777`. For example, if you are working on an add-on with an ID of `Demo`, its development output will be written out to `src/addons/Demo/_output` and therefore that directory will need to be fully writable.

Enabling development mode, also enables [debug mode](#debug-mode) automatically.

To enable development mode, add the following lines to your `config.php` file:

```php
$config['development']['enabled'] = true;
$config['development']['defaultAddon'] = 'SomeCompany/MyAddOn';
```

The `defaultAddon` value is optional, but adding that will automatically populate the specified add-on in the XF Admin CP when creating new content which will be associated to an add-on.

In addition to the above, you may find it necessary to add some additional configuration, especially if you are using more than one XF installation.

```php
$config['enableMail'] = false;
```

This will disable all mail from being sent from your board. This is especially important if you are using a copy of live data with real users and real email addresses (though we would advise against this!).

As an alternative to disabling mail directly, you may want to consider using a service such as [MailTrap.io](https://mailtrap.io). This provides you with a free mailbox that will receive all emails sent from your board, which is very useful for testing any emails your new add-on may be sending.

```php
$config['cookie']['prefix'] = 'anything_';
```

If you're using two or more XF installs on the same domain, you may experience issues with cookies being overwritten, which is caused by the installations sharing the same cookie prefix. It's therefore recommended to ensure you change the cookie prefix for each XF install you have set up. Without doing that, you will experience issues, for example, getting logged out of one XF install when logging into another.

## Development commands

XF 2.0 ships with a number of general development and add-on CLI commands which are aimed to help you develop more efficiently or even possibly automate/script some common processes.

In this section we'll go through some of the common tools and explain what they do.

## Add-on specific commands

### Creating a new add-on

!!! terminal
    *$* php cmd.php xf-addon:create

The `xf-addon:create` command is how to initially set up and create a new add-on. Once it runs, all you need to answer are some basic questions:

* Enter an ID for this add-on
* Enter a title
* Enter a version string (e.g. 1.0.0 Alpha)
* Enter a version ID (e.g. 1000010)

You will then be given the option to create the add-on and write out its addon.json file, and asked some questions about  whether you want to add a Setup.php file.

### Write hashes.json file

!!! terminal
    *$* php cmd.php xf-addon:write-hashes <ADDON ID>

This command will loop through all of the files which belong to your add-on, calculate a hash of the file and add it to 
your `hashes.json` file.

### Export _data .XML files

!!! terminal
    *$* php cmd.php xf-addon:export <ADDON ID>

This command is what you will use to export all of your add-on's data to XML files inside the `_data` 
directory. After exporting the files, it will automatically run the `xf-addon:write-hashes` command to ensure your 
hashes are up to date. It exports the data from what is currently in the database (rather than from the development output files).

### Build a release

!!! terminal
    *$* php cmd.php xf-addon:build-release <ADDON ID>

When you run this command, it will first run the `xf-addon:export` command, which in turn runs the `xf-addon:write-hashes` 
command before then collecting all of your files together and writing them to a ZIP file. Once the ZIP has been created 
it will be saved to your `_releases` directory named `<ADDON ID>-<VERSION STRING>.zip`.

## Development commands

There are actually quite a few development related commands, but only the two most important ones are being covered here.

To use any of these commands, you must have <a href="#enabling-development-mode">development mode</a> enabled in your 
`config.php` file.

!!! warning
	Both of the following commands can potentially cause data loss if there is a situation whereby the database and `_output` 
	directory become out of sync. It is always recommended to use a VCS (Version Control System) such as 
	[GitHub](https://github.com) to mitigate the impact of such mistakes.

### Import development output

!!! terminal
    *$* php cmd.php xf-dev:import --addon <ADDON ID>

Running this command will import all of the development output files from your add-on `_output` directory into the 
database.

### Export development output

!!! terminal
    *$* php cmd.php xf-dev:export --addon <ADDON ID>

This will export all data currently associated to your add-on in the database to files within your 
`_output` directory.

## Debugging code

It should be possible to set up your favourite debugger tool (XDebug, Zend Debugger etc.) to work with XF2. Though, sometimes, debugging code can be as rudimentary as just quickly seeing what value (or value type) a variable holds at a given time.
 
### Dump a variable

PHP of course has a tool built-in to handle this. You'll likely know it as `var_dump()`. XF ships with two replacements for this:

```php
\XF::dump($var);
\XF::dumpSimple($var);
```

The simple version mostly just dumps out the value of a variable in plain text. For example, if you just use it to dump the value of an array, you will see an output at the top of the page like this:

```plain
array(2) {
  ["user_id"] => int(1)
  ["username"] => string(5) "Admin"
}
```

This is actually the same output as a standard var_dump, but slightly modified for readability and wrapped inside `<pre>` tags to ensure whitespace is maintained when rendering.

The alternative is actually a component named VarDumper from the Symfony project. It outputs HTML, CSS and JS to create a much more functional and potentially easier to read output. It allows you to collapse certain sections, and for certain values which can output a considerable amount of data, such as objects, it can collapse those sections automatically.  