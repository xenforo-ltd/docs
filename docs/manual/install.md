# Install

## Installing XenForo for the first time

To install XenForo you will need the following things:

1. Your XenForo customer account details
2. An FTP client (such as [FileZilla](http://filezilla-project.org/download.php?type=client) or [WinSCP](http://winscp.net/eng/index.php))
3. The FTP login details for your server
4. An empty MySQL database on your server and the details to access it

:::note
These instructions relate to installing XenForo *for the first time*.
:::

    If you are trying to upgrade your existing XenForo installation to a new version, you need to [upgrade](upgrade.md), not install.

### 1. Downloading

To begin, you must first download the zip file that contains XenForo from the [XenForo customer area](https://xenforo.com/customers/).

If you have not already, you must provide information about the site that will be running XenForo. Once this has been done, a download link will be visible. Click this and follow the on-screen instructions.

:::note
Ensure that you deselect the **Download the upgrade package only** option when downloading to do a fresh install.
:::

### 2. Uploading

On your computer, unzip the file that you downloaded in step 1. Within it, you will see an `upload` directory. You will be uploading the contents of this directory to your server (not the directory itself).

Now use your FTP client to connect to your server and create the directory where you want to install XenForo. For example, if you want to access XenForo via `example.com/community/`, you would create a `community` directory within your webroot (such as your `public_html` directory). You will need to make a note of what URL this corresponds to for the next step. This will be known as your "XenForo root URL".

:::note
If you want to install XenForo at the root of your domain, you will generally not need to create a directory. However, XenForo must be installed into a directory that isn't already being used to display pages.
:::

Use your FTP client to upload the **contents** of the `upload` directory that was contained within the zip that you extracted earlier to the directory you just created on the server. Ensure that all files and sub-directories are uploaded. If done correctly, once uploaded, you should see files such as `admin.php` and `css.php` directly within the directory you created on your server.

Uploading may take some time. Please do not proceed until the upload is complete. Keep your FTP client open as you may need it in the next step.

### 3. Installing

Now you're nearly ready to start the XenForo installation.

Direct your browser to the `install` directory under your XenForo root URL. For example, if your XenForo root URL was `www.example.com/community/`, you would direct your browser to `www.example.com/community/install/`. If you have the correct URL, you should see the XenForo installer.

Depending on server configuration, you may receive an error about certain directories not being writable. If so, follow the "setting directory permissions" steps. If you receive any other error messages, your server does not meet XenForo's requirements and your host will need to make changes to their PHP configuration.

:::note[Setting directory permissions]
Depending on your PHP configuration, you may need to manually make certain directories writable. If this is needed, a message will be displayed when starting the installation.

If you receive this message, open your FTP client and navigate to your XenForo root directory (the directory your created earlier). You should see the `data` and `internal_data` directories. You will need to change permissions on these two directories.

In Linux, these should be "chmod 0777". You can generally do this via your FTP client by making sure that the directory has read, write, and execute permissions for user, group and world. In Windows/IIS, you need to grant the "Full Control" permission to the `IUSR_` account.

Once complete, refresh the installer. If changed correctly, the error message regarding directories not being writable should disappear.
:::

If no other errors are displayed, you can begin the XenForo installation process. In the early steps, you will be asked to provide details about your database server. If you do not know what values to use here, you will need to contact your host to get the correct values.

Once the database configuration is verified, if possible, it will be written out to your server automatically. If this is not possible, you will need to download the generated configuration file and upload it manually.

:::note[Uploading the generated config file]
If the configuration file could not be written automatically, you will see a button to download the file to your computer. Click this.

Open your FTP client and navigate to your XenForo root directory. Within this directory, you should see a sub-directory called `src`. Open that directory and upload the `config.php` file you just downloaded here. You can now continue with the installation.
:::

To complete installation, follow the on-screen instructions until it completes. XenForo is now installed and you can begin configuring it.
