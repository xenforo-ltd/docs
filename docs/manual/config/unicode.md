# Emoji and unicode support

XenForo 2 supports full unicode text, which means that [emoji](https://en.wikipedia.org/wiki/Emoji) can be used in almost all locations that users can enter text.

Full unicode support requires that your server is running a version of MySQL 5.5 or newer, and your database tables need to use a particular *collation* called **UTF8mb4**. If your database tables are not in this format, they will need to be converted before your forum will support emoji.

## New installs

If you are installing a brand new XenForo, rather than upgrading from an existing version, you may include emoji support from the outset. The installer will add the necessary line to your `src/config.php` file automatically, if you allow the installation system to build your config file for you.

If you want to build your config file manually, simply add the following line to the end of the file using a text editor before you run the installation script:

`$config['fullUnicode'] = true;`

## Upgrading existing installations

If you are working with a database that already holds XenForo content, you will need to convert your tables before you can enable emoji support.

A script is provided with XenForo to perform this conversion for you, which needs to be run on a *command line*. If you have the ability to log in to your server via SSH or some other form of remote access, you can run the command yourself, otherwise you may need to ask your host to run the script for you - direct them to this document for instructions.

### Running the conversion script

Log in to your server using SSH, or open a command prompt over Remote Desktop if you are using a Windows server.

When you have a command line available, change your current working directory to your XenForo directory. You will know that you are in the correct directory, as it will contain a script called `cmd.php`.

You can now run the following command:

`php cmd.php xf:convert-utf8mb4`

The command may complete very quickly for a small database, or it may take quite some time for a database with lots of content. Be patient, and the script will complete eventually.

No damage will be done by running the script multiple times - if the script finds a database table that is already using UTF8mb4, it will not attempt to convert it again.

### After running the script

Once the script has finished its work, open your `src/config.php` file in a text editor and add the following line to the end of the file:

`$config['fullUnicode'] = true;`

Your forum will now fully support emoji in user generated content.

:::note
Emoji should not be confused with [Smilies](../content/smilies.md), though they serve a similar purpose. Emoji are typed directly from an emoji keyboard layout, while smilies are typed as strings of characters that are converted to iconic images when the text is processed by XenForo.
:::
