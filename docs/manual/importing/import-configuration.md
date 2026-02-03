# Configuring an import

Each importer defines its own requirements, and will present you with a series of forms to complete in order to gather the information it needs in order to proceed. Generally, this will involve the database connection details for the source system.

Some importers will attempt to make your life easier, by looking for a config file for the source system, assuming that your XenForo is installed in the same location as the source system was previously. If a config file is found, the import system will attempt to fill in as many of the form fields as possible with the data from the config file.

After you have completed the necessary details, click the **Continue** button and the importer will attempt to connect to the source database. If a successful connection is made, the system will be able to proceed. If not, the system will show an error message that may help you to diagnose the connection problem.

## Selecting import steps

On the next page, you will be presented with a list of steps that the importer can run, each corresponding to a different data type. Some steps are dependent on other steps - for example, posts can not be imported without threads, and threads can not be imported without forums.

Notwithstanding step dependencies, you may un-check the steps that you want to skip - for example you might want to import users but not bother with their avatars.

:::note
Once the import has started, you can not go back and change the steps you want to import. Ensure that you have selected **all** the steps you want to import before you set the system running.
:::

### Retain content IDs

At this point, you will also be asked if you want to **Retain content IDs**. This option can only be used on a completely empty XenForo installation, that has no threads and posts. The setting will attempt to retain the IDs of the data that is imported, so that a thread that has an ID of 2563 in the source database will be imported with an ID of 2563 in the XenForo database.

If **Retain content IDs** is not selected, data will be imported with sequential IDs that do not match the source database. This is the default option, and in most cases is faster and more reliable.

Don't worry about existing links in search engines etc. pointing to URLs using the old source IDs. Many importers supply [redirection scripts](import-redirection.md) that can seamlessly redirect visits to old pages in your source system to their corresponding new pages in XenForo.

### Import log table

You will also be asked to provide the name of a database table that can be used to store the log of the import. You can use any valid database table name, provided that the table does not already exist, or is an empty table.

We would suggest a name using only lower-case letters, digits and underscores, such as `import_log`.

If the table does not exist, the system will attempt to create it. If it does exist but already contains data, you should run a `TRUNCATE TABLE your_table_name;` query, assuming that you are **certain** that the data contained within the `your_table_name` table is okay to delete.

Once you have completed the form successfully, hit the **Continue** button...

## Step configuration

In some cases, some steps will require additional configuration before the import can commence.

If the system imports users, you will usually be asked if you want to automatically merge users with the same email address, and if you want to merge users with the same user name. These options are particularly important if you are importing into a XenForo installation that is already live and has a collection of users.

It is usually a good idea to enable these user-merge options, particularly the *same email* option, as it is highly likely that two users with the same email address are in fact the same person. Whether or not you enable the *same user name* option depends on whether or not you know that some of the users in your source database share names with users in your XenForo database, and are in fact the same user.

For example, if your XenForo installation has a user called 'Admin', and so does your source database, the merge option will import all data belonging to 'Admin' in the source system as data belonging to 'Admin' in your XenForo installation, rather than creating an 'Admin2' user and attributing all the threads and posts to them.

Depending on the source system, other steps may need configuration. For example, the *vBulletin* importers need you to verify the location of your *avatar* and *attachment* files if they are not stored in the database.

Sometimes, the system will make a best-guess, based on the information it can retrieve from the database, but this often needs to be double-checked in order to ensure that the information is correct before starting the import. Most importers will do as much error-checking as is necessary to ensure a successful import before allowing you to proceed.

When your steps are configured, click the **Continue** button, hopefully for the last time.