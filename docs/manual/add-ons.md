# Add-ons
XenForo includes an extensive framework for add-ons to extend and change XenForo's functionality, generally without you having to make any changes by hand.

Many add-ons can be downloaded from the [XenForo community resources](https://xenforo.com/community/resources/).

## Support considerations

Although many add-ons focus on adding new areas to XenForo, they always interact with the core of XenForo and thus can introduce unexpected behavior and bugs. Add-ons that change the behavior of or extend existing XenForo functionality are more likely to create bugs and conflicts.

Please be aware that we are unable to provide any support for problems involving or caused by a third-party add-on. You will need to contact the add-on author for guidance.

If you have a problem with XenForo and you are using third-party add-ons, please disable all add-ons and style customizations and see if you can still reproduce the problem. If you cannot, then the problem is likely caused by an add-on or customization. You should re-enable your add-ons one by one until the problem comes back and you've identified the specific cause. If the problem still occurs with add-ons and customizations disabled, it may be a bug or problem within XenForo itself and we can work to resolve this with you through a ticket.

## Installing or upgrading an add-on

### Control panel installation (2.1+)

If you are running XenForo 2.1 or newer, you may be able to install or upgrade an add-on by uploading the zip file directly into the control panel. This requires a compatible server configuration and a change to the src/config.php file.

To enable this feature, you must first add the following line to the **src/config.php** file:

```php
$config['enableAddOnArchiveInstaller'] = true;
```

This feature is disabled by default for security reasons. If this feature is enabled and an admin account is compromised, it may allow an attacker to execute arbitrary code by uploading it from the control panel. You may wish to enable this feature by making the config.php change only when you intend to use it.

Once that change is made, go to the **Add-ons** section of the control panel and click the **Install/upgrade from archive** link.

If your server configuration meets the requirements, a file upload option will be displayed. Select the add-on or add-ons you wish to install or upgrade and submit the form. From there, you can follow the on-screen instructions.

If an error occurs when attempting to install or upgrade an add-on via this method, you should complete the action by following the manual installation process detailed below.

### Manual installation

:::note
In XenForo 2, all add-ons should have a standardized zip format. This guide assumes the add-on is in that format.
:::
The process for installing and upgrading an add-on is essentially identical.

Once you have downloaded the add-on you want, you should unzip the file locally. Inside it, you will see an `upload` directory, just like when XenForo was installed. You'll be uploading the **contents** of this directory.

Using your FTP client, navigate to the XenForo root directory on the server, and upload the **contents** of the `upload` directory into it. Ensure that you "merge" with the existing contents on the server.

If you are upgrading an add-on, this should overwrite some existing files.

Once the files are uploaded, in the XenForo control panel, go to the **Add-ons** section. The add-on you just uploaded should be listed as installable or upgradeable. Click the relevant button and follow the on-screen instructions.

## Disabling an add-on

Disabling an add-on will effectively turn it off, similar to it not being installed in the first place. Any data created by the add-on will remain in the database and be accessible when you re-enable it. An add-on can be disabled by clicking the gear icon and choosing the "disable" option. 

All add-ons can be quickly disabled using the "disable all" link on the top of the add-on list. This will often be required if you contact support. If you disable all add-ons, an "enable" button will appear at the top of the add-on list, allowing you to quickly re-enable your add-ons.

## Uninstalling an add-on

Uninstalling an add-on will remove it from your XenForo installation completely. Any data associated with the add-on will be removed. You will not be able to recover that data after uninstalling the add-on!

To uninstall an add-on, choose "uninstall" from the gear icon menu for the add-on you want to uninstall. The add-on files you uploaded will not be removed when uninstalling an add-on. These must be removed manually via FTP.

## Regaining control panel access

If you find that an add-on is preventing you from accessing the control panel or from disabling add-ons, you can temporarily add the following line to the end of your `src/config.php` file:

```php
$config['enableListeners'] = false;
```

To do this, download this file via your FTP client and open it on your computer in a basic text editor (not a word processor). Save the changes and reupload the file to your server.

This will temporarily disable code being run by all add-ons. Use this to access the control panel and disable the offending add-ons. Once you have done this, remove the line above from your `src/config.php` file.

:::note
This is not equivalent to disabling add-ons via the control panel and is not sufficient for determining if an issue is caused by an add-on.
:::
