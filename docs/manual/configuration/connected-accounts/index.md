# Connected accounts

The ability for visitors to log in and register via various connected account providers benefits site owners due to the ease at which new accounts can be created. This can help reduce the friction of creating an account or remembering login details, leading to increased engagement.

In order to make use of this functionality, it is required to register and fill in some basic developer details to register your **application**. This provides the necessary integration between the forum software and the connected account provider.

## Testing connected accounts

After you have set up a connected account using the instructions for the particular service you want to use (see the [Configuring services](google.md) section of this manual), you will need confirm everything is configured and working correctly. The *test tool* makes this easy.

1. Select **Setup** from the navigation panel, and click on **Connected accounts**.
1. Click on **Test provider** next to the entry you'd like to test in the list of providers.
1. Click on the **Test** button.

If the test is successful, the resulting screen will show the name, email address and profile picture (where applicable) of the account which is associated with the connected account provider.

If the test is unsuccessful, confirm that your **Board URL** is correct and that the correct details have been entered for the key and secret.

After a successful test, visitors will be able to log in and register using their respective accounts. The first time they attempt to do so, they will be required to allow the application access to their account.

## Changing the Metadata share logo

When a user shares a page to various other sites, they will either display a nominated image or attempt to pick an image from the page. To nominate an image for all pages, you may define a **Metadata logo URL** in style properties.

To set this, in the control panel, go to **Appearance > Style properties > Basic options** and change the **Metadata logo URL** to point to a logo you've uploaded. This should generally be a square image and as large as possible.

:::note
Due to caching, it can take several weeks for the image to update on the service provider's servers.
:::
