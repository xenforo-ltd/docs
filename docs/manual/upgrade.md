# Upgrade

## Upgrading XenForo to a new version

Upgrading XenForo follows a very similar process to [installation](install.md).

You may upgrade from any previous version to the latest version directly. You do not need to upgrade to interim versions first.

:::warning
Before upgrading, it is strongly recommend that you backup your XenForo database and files. It is not possible to downgrade once you start the upgrade!
:::

You may need to upgrade add-ons for them to be compatible with the new version. Contact the add-on authors for details.

### Upgrading from XenForo 1

If you are upgrading from XenForo 1, there are some important things to keep in mind. This is a particularly significant upgrade.

- XenForo 1 add-ons are not compatible with XenForo 2. You will need to contact the add-on author to see if they have an updated version of any add-ons you use. If you do not intend to use an add-on any longer, if possible, we recommend uninstalling it before upgrading. Not doing so may leave orphaned data in your database.
- XenForo 1 styles are not compatible with XenForo 2. The upgrade will not maintain any style property or template modifications. These will need to be redone after upgrading.
- Any other custom integrations you had with XenForo 1 are unlikely to work with XenForo 2 without some amount of changes.

If possible, we strongly recommend that you perform a test upgrade of your site on a test installation before upgrading your production installation.

:::note
It is vital that you backup your site before upgrading to XenForo 2. You **cannot** downgrade after the upgrade starts. The **only** method of downgrading will be to restore from a backup.
:::

<span id="upgrading-in-xenforo-21"></span>
### One-click upgrades

XenForo 2.1 and above includes a "one-click upgrade" system to simplify the upgrade process, providing your server configuration meets the requirements. To upgrade from an earlier version, you will need to use the manual upgrade approach detailed below.

XenForo will periodically check to see if your license has access to a newer version. To manually check, you can go to the **Tools > Upgrade check** page of the control panel. If a new version is available, you will be given the option to upgrade to it. From here, you can follow the on-screen instructions. It is strongly recommended that you backup your XenForo files and database before proceeding.

:::note
You must keep your browser window open until the upgrade is complete.
:::

If a one-click upgrade is not possible because of server configuration or an error occurs while attempting to complete it, please follow the below instructions to perform a manual upgrade as described below.

### 1. Downloading

To begin, you must first download the zip file that contains XenForo from the [XenForo customer area](https://xenforo.com/customers/).

Click the **Download XenForo** link next to the license for the site you are upgrading. Before downloading, ensure that the **Download the upgrade package only** option is selected.

:::note
If you have multiple licenses, please ensure that you use the files associated with the correct license for each site. There may be differences in the downloads (such as branding removal being applied) that could lead to accidental licensing violations.
:::

### 2. Uploading

On your computer, unzip the file that you downloaded in step 1. Within it, you will see an `upload` directory. You will be uploading the contents of this directory to your server (not the directory itself).

Connect to your server using your FTP client and navigate to your XenForo root directory (the directory you installed XenForo into). In this directory, you should see files such as `admin.php` and `css.php`.

Use your FTP client to upload the **contents** of the `upload` directory that was contained within the zip that you extracted earlier to the XenForo root directory on the server. Ensure that all files and sub-directories are uploaded. If done correctly, you will be overwriting a number of existing files; you should allow your FTP client to do this if it prompts you.

:::note
When uploading files, it's very important that you "merge" files with what's on the server. Some FTP clients may simply replace the contents on the server with exactly the contents that you're uploading. If this happens, some files and data may be lost.
:::

This upload may take some time. Once the upload is complete, you must continue with the next step. Your site will be closed until this step is complete.

### 3. Upgrading

Direct your browser to the `install` directory under your XenForo root URL. For example, if your XenForo root URL was `www.example.com/community/`, you would direct your browser to `www.example.com/community/install/`. If you have the correct URL, you should see the XenForo installer.

You may be prompted to login with an administrator user name and password. From there, follow the on-screen instructions to complete the upgrade. Once complete, your site will automatically reopen.

:::note[Upgrades from XenForo 1]
If you are upgrading from XenForo 1, you may need to save a new config file. You will be prompted to do this at the beginning of the upgrade process. If the new config file cannot be written out automatically, you must upload it into the `src` directory under your XenForo root directory.

Additionally, if you'd like to add emoji support see our [Emoji support](https://xenforo.com/xf2-docs/manual/unicode/) page.
:::

### 4. Post-upgrade checks

When you upgrade XenForo, we will not automatically overwrite any template or phrase customizations you have made. You should check if there are any outdated entries here under **Appearance > Outdated templates** and **Appearance > Outdated phrases**. You can use the template merging tools to attempt to automatically incorporate the core changes into your customizations. [Customized phrases](phrases.md#upgrading-with-customized-phrases) are unlikely to have an negative impact upon the version of XenForo to which you are upgrading.

If you are using a third-party provided style or language, you may wish to see if they have a release that is designed for the version of XenForo you are now running.

### Upgrading with customized templates

When you customize a [template](templates.md), the changes are saved and will not be overwritten unless you specifically instruct the system to do so.

While this can prevent unwanted changes, it also means that your customized templates may become outdated when it comes time to upgrade XenForo to a newer version, if that newer version contains an updated version of the template you have customized.

There are two tools available to help you avoid this.

#### Outdated templates

After you run a XenForo upgrade, the system will alert you to any templates that you have customized that have become outdated.

A list of these templates will be displayed, along with a *Merge* option, which will compare your customized template to the new version and attempt to merge your customizations into the newly updated version of the template.

However, if you made custom changes to a section that also changed in the new version of the template, this creates a conflict that you will have to manually resolve. You need to choose which version of the conflicting section to use (or both versions).

When you select the *Merge* link for a template that is listed as being outdated, you will see what the final, merged version of the template will be. Successfully merged sections will be highlighted in blue. Conflicting sections will be highlighted in yellow with buttons to help you resolve the conflict. Once you have resolved any conflict, you may click on the text to edit it to fit your exact needs.

:::note
:::
After running a XenForo upgrade, you should check **immediately** to ensure that your templates are not outdated, because important or new functionality may be broken or missing if an outdated template remains unmanaged.

### Common upgrading problems

#### Attempting a fresh install instead of an upgrade

If after uploading the files and going to `www.example.com/community/install/`, you are taken to perform a fresh install, this indicates that the files have not been merged correctly when uploading. It is possible that files have been removed unexpectedly.

At a minimum, you need to create the `internal_data/install-lock.php` file. The contents do not matter. Once done, you can direct your browser to `www.example.com/community/install/`. If it still takes you to a fresh install, please contact support.

If your `internal_data` or `data` directories are missing or empty, then attachments and avatars may have been removed. We strongly recommend restoring them from a backup.

#### No upgrade found

If after uploading the files and going to `www.example.com/community/install/`, it reports no upgrade is found, then the files have not been uploaded to the correct location.

In many cases, this indicates that the `upload` directory itself has been uploaded, rather than the contents. You should ensure that what you are uploading overwrites existing files.
