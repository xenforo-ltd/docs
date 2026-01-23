# Add-on structure

In previous versions of XF, there were very few standards and conventions surrounding add-on development. We have done
a lot to change that in XF 2.0. Let's look at some of the changes:

## Add-on IDs and add-ons path

Each installed add-on must have a unique ID, and this ID dictates where on the filesystem that an add-on should store
its files. There are two possible formats for an add-on ID.

The first "simple" type should be a single word and not contain any special characters. For example, `Demo`.

Simple add-on IDs must adhere to the following rules:

- Must only contain a-z or A-Z
- Can contain 0-9 but not at the start of the ID
- Can not contain any special characters such as slashes, dashes or underscores

The second contains a vendor prefix, so if you release add-ons under a specific brand or company, the add-on ID can
indicate that. For example, `SomeVendor/Demo`.

The vendor type add-on ID should adhere to the following rules:

- Must only contain a-z or A-Z
- Can contain a single `/` character but not at the start or the end
- Can contain 0-9 but not at the start of either part of the add-on ID

Once you have decided what your add-on ID is, we know exactly where the files for this add-on will be stored. All XF 2.0 add-ons are stored within a subdirectory of the `src/addons` directory.

If you have a simple add-on ID, e.g. `Demo`, the files for your add-on will be stored in the following location:
`src/addons/Demo`.

If you have a vendor based add-on ID, e.g. `SomeVendor/Demo`, the files will be stored in the following location:
`src/addons/SomeVendor/Demo`.

The add-on ID you choose will also become your class namespace prefix (see [Namespaces](general-concepts.md#namespaces) for more information).

## Recommended version string format

XF itself uses a MAJOR.MINOR.PATCH principle (e.g. 2.0.0 for the first stable XF2 release) to its version numbering and we recommend a similar approach is taken towards the versioning of your own add-ons. In basic terms, increment the

- MAJOR version when you make major feature changes, especially changes that break backwards compatibility
- MINOR version when you add functionality preferably in a backwards compatible manner, and
- PATCH version when you make backwards-compatible bug fixes

## Recommended version ID format

Version IDs for add-ons are basic integers which are used for internal version comparisons. It allows us to more easily detect when one version is older than another. Each version of your add-on should increase the version ID by at least 1, but a convention we use internally for XF itself, is potentially useful also for add-ons. Our version IDs are in the format of `aabbccde`.

- `aa` represents the major version
- `bb` represents the minor version
- `cc` represents the patch version
- `d` represents the state, e.g. `1` for alpha releases, `3` for beta releases, `5` for release candidates and `7` for stable releases
- `e` represents the state version

For example, an add-on with version string of 1.7.3 release candidate 4 would have an ID of `1070354`. The final stable release XF2 will have an ID of `2000070`. Version 1.5.0 Beta 3 of XF had an ID of `1050033`. Stable version 99.99.99 would have an ID of `99999970`... and maybe you should slow down a bit :wink:

## Common add-on files and directories

There are a number of files and directories within an add-on's directory that have a special purpose and meaning.

### addon.json file

`addon.json` is a file which contains a number of pieces of information which are required to help XF 2.0 identify the
add-on and display information about it in the Admin CP. At minimum, your `addon.json` file should look like this:

```json title="addon.json"
{
    "title": "My Add-on by Some Company",
    "version_string": "2.0.0",
    "version_id": 2000070,
    "dev": "Some Company"
}
```

A basic file will be created for you automatically when creating the add-on.

Including a valid `addon.json` file is mandatory for your addon to be recognized but you can always [validate your addon.json file](development-tools.md#validate-your-addonjson-file).

#### Properties

| Property          | Description                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `legacy_addon_id` | Used to enable automatic handling of addon ID changes when upgrading from XenForo 1 to XenForo 2.                                                                                                                                    |
| `title`           | The title of the addon. This will show in the Admin Panel.                                                                                                                                                                           |
| `description`     | A description of the addon. This will show in the Admin Panel.                                                                                                                                                                       |
| `version_id`      | The internal ID used by XenForo to track updates to your addon. This must be incremented every release.                                                                                                                              |
| `version_string`  | The human-readable addon version. This will show in the Admin Panel instead of the `version_id` property.                                                                                                                            |
| `dev`             | The name of the developer of the addon. This will show in the Admin Panel.                                                                                                                                                           |
| `dev_url`         | If set, the developer's name will show in the Admin Panel as a hyperlink, with this as the target (href).                                                                                                                            |
| `faq_url`         | If set, an FAQ hyperlink will show in the Admin Panel, with this as the target (href).                                                                                                                                               |
| `support_url`     | If set, a support hyperlink will show in the Admin Panel, with this as the target (href).                                                                                                                                            |
| `extra_urls`      | This allows you to display links to other things related to the add-on (perhaps a bug reports link, a manual - whatever you like). An array of JSON objects, where the key is the link text and the value is the link target (href). |
| `require`         | A set of requirements that need to be met for XenForo to allow installation of the addon. See ['The requirements property'](#the-requirements-property) for more information.                                                        |
| `icon`            | The icon of the resource. This can be a Font Awesome icon name (e.g. `fa-shopping-bag`, or the path to an image file.)                                                                                                               |

##### The requirements property

The require property is the standard way of blocking an add-on install or upgrade if the environment doesn't support or meet the requirements.
You can use it to require other add-ons to be installed first, certain PHP extensions to be present or enabled and/or to enforce a minimum PHP version.

Here's an example snippet:

```json title="addon.json"
...
  "require": {
      "XF": [2000010, "XenForo 2.0.0+"],
      "php": ["5.4.0", "PHP 5.4.0+"],
      "php-ext/json": ["*", "JSON extension"]
  }
...
```

Each requirement, is a named array:

- The name of the array is the product ID (e.g. `XF` or `php`).
- The first array element is the version of the product (e.g. `2000010` or `5.4.0`). You can use use `*` to refer to any version of the product.
- The second element is the human-readable text of that requirement and this is what's used in messages (e.g. `XenForo 2.0.0+` or `PHP 5.4.0+`).

Here's a summary of the supported product IDs:

| Product/requirement name   | Refers to...                                                                                                   | Value                                                                                                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `XF`                       | The XenForo installation version.                                                                              | The XenForo version ID, for example `200010`.<br />You can get your current XenForo version by checking the top of the `/src/XF.php` file for the `$versionId` definion or by printing the value of `\XF::$versionId`. |
| `php`                      | The PHP version.                                                                                               | The PHP version, for example `5.4.0`.<br />It's recommended that you keep this as low as possible; updating a PHP version can be quite a complex task - especially if other add-ons conflict with newer PHP versions.  |
| `php-ext/(extension name)` | A PHP extension - where `(extension name)` is the name of the extension.                                       | The PHP extension version.<br />This is checked using the PHP `version_compare` function, so it even works for version strings in the official full PHP format like `7.1.19-1+ubuntu16.04.1+deb.sury.org+1`.           |
| `(any addon ID)`           | Any XenForo addon such as `Demo/Addon`.<br />If you're unsure about an addon's ID, check it's `addon.json` file. | The addon version ID.<br />You can refer to the [Recommended version ID format](#recommended-version-id-format) for more information.                                                                                  |

### hashes.json file

`hashes.json` is the new way to add support for the File health check system, and the best part is -- it's generated
automatically!

As part of the build process (more on that later) we will do a quick inventory of all your add-on's files and write the calculated hash of the file contents.

### Setup.php file

`Setup.php` is the new home for any code you require to run during install, upgrade or uninstallation of your add-on.

We will go into more detail about how to create a Setup class [below](#setup-class).

### \_data directory

The `_data` directory is where the master data for your add-on is stored. Each add-on data type will have its own XML
file (rather than a single one for all types). The hashes for these files are included inside `hashes.json` so we can
ensure that an add-on has complete and consistent data before allowing an add-on to be installed.

### \_output directory

The `_output` directory is not required for a successful installation of an add-on, and shouldn't be included when releasing the add-on. This directory is purely for development purposes and is only used if development mode is enabled (see [Enabling development mode](development-tools.md#enabling-development-mode)).

Each item of add-on data is stored in a separate file. Mostly they are stored as JSON files, but in the case of phrases they are stored as TXT files and for templates they are stored as HTML/CSS/LESS files. All template types are editable in the filesystem directly, and changes made to these files are written back to the database automatically on load.

## Setup class

To create a Setup class for your add-on, all you need to do is create a file named `Setup.php` in the root of your add-on directory.

The Setup class should extend `\XF\AddOn\AbstractSetup` which requires, at minimum, to implement `install()`, `upgrade()` and `uninstall()` methods. Here's what a simple add-on Setup class might look like:

```php title="Setup.php"
<?php

namespace Demo;

class Setup extends \XF\AddOn\AbstractSetup
{
	public function install(array $stepParams = [])
	{
		$this->schemaManager()->createTable('xf_demo', function(\XF\Db\Schema\Create $table)
		{
			$table->addColumn('demo_id', 'int');
		});
	}

	public function upgrade(array $stepParams = [])
	{
		if ($this->addOn->version_id < 1000170)
		{
			$this->schemaManager()->alterTable('xf_demo', function(\XF\Db\Schema\Alter $table)
			{
				$table->addColumn('foo', 'varchar', 10)->setDefault('');
			});
		}
	}

	public function uninstall(array $stepParams = [])
	{
		$this->schemaManager()->dropTable('xf_demo');
	}
}
```

The Setup class also supports running each of the actions in different steps. To implement this behavior your Setup class can use the `StepRunnerInstallTrait`, `StepRunnerUpgradeTrait` and/or `StepRunnerUninstallTrait` [traits](http://php.net/manual/en/language.oop5.traits.php). These implement the required methods automatically, and you just need to add the relevant steps, e.g. `installStep1()`, `upgrade1000170Step1()`, `upgrade1000170Step2()` and `uninstallStep1()`, where `1000170` etc. in the upgrade methods are the add-on version IDs (see [Recommended version ID format](#recommended-version-id-format)).
