# Running the importer

After all configuration is successfully completed, the importer will be ready to run.

:::warning
**Always** perform a **full backup** of your XenForo database, and the `data` and  `internal_data` directories before running an import. Your source database and source files will never be modified, but a backup of your XenForo database and files provides for a safety net in the event that the import goes wrong and you need to start again. It is **also** a good idea to close your forums (using the Board active option) for the duration of the import process.
:::

There are two ways to run the import process, either through your web browser in the admin control panel, or via a command line / terminal connected to your web server via SSH or similar.

The command line (CLI) import method is *significantly* faster than the browser method, but requires that you have shell access to your server to run the command.

### Browser importer

If you select the **Browser importer** option, simply click the **Start import** button and follow the on-screen prompts until the import is complete. You will see counters incrementing for each step as it runs, which may give you some indication of the time remaining for your import to complete.

You will need to prompt the browser to continue to the next step each time it completes the previous step.

### CLI importer

To run the CLI importer, you will need to leave your web browser open on the *Start import* page, and log in to your web server using SSH or a similar method that allows you to run commands directly on your server.

Once logged in, change the current working directory to the folder in which your XenForo installation resides, for example `/var/www/public/`. You will know that you are in the correct directory, because it will contain a file called `cmd.php`.

We will use this `cmd.php` file to run the import, using the following command:

`php cmd.php xf:import`

Enter this command and hit the enter key and the import will start. All steps will run sequentially and without interruption, showing you progress indicators for each step.

:::note
Both the browser importer and the CLI importer can be resumed if they are interrupted for any reason. While you should aim to allow the processes to complete without interruption, as some data may be lost, you *can* resume the import process by clicking on **Tools > Import data** in your admin control panel, or running the CLI command again.
:::
