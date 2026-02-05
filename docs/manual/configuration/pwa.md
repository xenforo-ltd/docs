# XenForo PWA

## No need for a separate mobile app

When it comes to providing a rich and intuitive experience of XenForo on mobile devices, rather than requiring users to download a separate app from a third-party app store, the XenForo system is programmed to automatically reconfigure itself into a mobile-optimised mode called a _progressive web app_, or PWA.

## Features of the PWA

As a progressive web app, XenForo provides the following features:

#### Responsive design

When the system detects a small browser viewport, as found on mobile devices, the user interface automatically adjusts into a space-optimised configuration using a principle called _responsive design_.

Multi-column layouts are replaced with single columns, clickable controls are made larger to facilitate touch-based browsing and secondary controls that would otherwise clutter the interface are relocated into menus and other visible-on-demand elements.

#### Installability

Like a native mobile app, the XenForo progressive web app allows your forum to be _installed_ in an app-like manner on users' devices.

When a user installs the PWA for your site, it will appear as an app icon on their device screen like any other app, allowing it to be launched without going via the device's web browser.

Apple mobile devices running iOS 16.4 and newer can install the PWA using the _Add to Home Screen_ feature in Safari. This step is required in order to enable [push notifications](pwa.md#push-notifications) on iOS devices.

#### Push notifications

Mobile users are accustomed to receiving notifications that integrate with the built-in notification system of their device.

XenForo's alerts system integrates with these to provide push notifications that appear even when users are not actively browsing the forums.

The availability of push notifications is dependent upon users' specific devices, but all tier-one devices are currently supported.

#### App badging

As an installed app, a counter of active notifications will appear as a badge on the app icon.

#### Share sheet integration

When users click the _share_ controls to share content from your forum, XenForo will trigger the built-in system share sheet for the user's device, providing a familiar native interface. 

## Requirements

The following are absolute requirements for XenForo to enable its progressive web app functionality:

1. Your site **must** be accessible over HTTPS / SSL.
2. You **must** provide a title for your site of **12 or fewer** characters.
3. You **must** provide a pair of square icons for your site, one at 192 pixels width and one at 512 pixels.

## Configuration

While the responsive design elements require no configuration on your part, and will activate automatically on any small-screen device, the remainder of the PWA technologies require some graphical assets and configuration on your part.

All relevant settings are located in the Admin Control Panel at **Setup > PWA setup**.

#### Board title

If your main _Board title_ is longer than 12 characters, you must enter a shortened version in the _Board short title_ field.

#### Enable push notifications

You may enable push notifications provided your server has PHP 7.1 or newer with the the [gmp](https://secure.php.net/manual/en/book.gmp.php), [mbstring](https://secure.php.net/manual/en/book.mbstring.php) and [openssl](https://secure.php.net/manual/en/book.openssl.php) extensions enabled. XenForo Cloud sites meet and exceed these requirements.

#### Language

You must choose one of the [languages](../appearance/languages.md) installed on your forum to be the primary language for the progressive web app. Options are provided to allow you to make the selection.

#### Colors

While the styling of your progressive web app will be based on the settings of your [default style](../appearance/styles.md#setting-the-default-style), you may provide additional styling for the _Meta theme color_, which often colors the device interface itself, and the _Page background color_, upon which all content is placed. 

#### Icons

You must provide the URLs of, or upload using the provided tools, two square icons to be used for the app.

These icons must measure **192x192** pixels, and **512x512** pixels. As a general rule, you should use PNG image format.

Ideally, these icons should be _maskable_, meaning that any vital graphical elements within them fit within the _minimum safe zone_ when the icons are cropped by differing devices. If your icons are indeed maskable, check the box to confirm this.

[Full details of maskable icons at web.dev](https://web.dev/maskable-icon/)