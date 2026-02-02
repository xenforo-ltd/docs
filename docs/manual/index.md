---
slug: /
title: Getting started
---

# XenForo Administrator's Manual

This manual covers the basics of installing and upgrading XenForo as well as walking you through many of XenForo's concepts and features.

## Installing

If you have purchased the [self-hosted](https://xenforo.com/purchase/self-hosted) version of XenForo but not yet installed it on your webserver, jump ahead to the [Installation](installing-and-upgrading/install.md) section of this manual, then return here when the software is ready.

Alternatively, if you are a [XenForo Cloud](https://xenforo.com/solutions/#cloud) customer, you will find a link to your admin control panel with your subscription details in your [customer account](https://xenforo.com/customers/).

## The admin control panel

This manual primarily concerns operations you will perform within the XenForo *admin control panell*, sometimes known as the *ACP*. Separate from the public-facing side or *front-end* of XenForo that is accessible to regular visitors, the Admin Control Panel is reserved for those with [Administrative](access-privileges/staff.md#administrators) access privileges.

To access the admin control panel, either navigate directly to your site URL with `/admin.php` added to the address, or click the *Admin* link available when logged in to the front-end with a user account that has administrative privileges.

For security reasons, you will be required to log in again to the admin control panel, using the same login as your account uses on the front-end.

[//]: # (![Admin control panel login][acp-login])

### Navigating the admin control panel

After successfully logging-in to the admin control panel, you will see a horizontal bar stuck to the top of the screen, which is called the *header* and a vertical navigation bar containing a number of expandable headings.

[//]: # (![Admin control panel home][acp-home])

#### Header controls

The gadgets in the header offer the following functionality:

* Home: return to the main page of the admin control panel
* Site name: open the main page of the XenForo front-end
* Gears: shortcut to jump to sections of the [Options](configuration/options.md) system
* Magnifier: search the admin control panel - [see below](index.md#searching-the-control-panel).  

#### The navigation panel

The vertical navigation bar is your primary means to access the functionality of the admin control panel.

It is divided into logical sections, which you can expand by clicking on them. When you visit an area of the admin control panel, the corresponding navigation block will automatically expand.

In this manual, when describing the location of a control or feature, we will use the following format:

**Major navigation section > Optional minor navigation block > Navigation link > Item on page...**

For example:

**Setup > Options > Board active > Inactive board message**

[//]: # (![Admin control panel navigation][acp-navigation])

## Searching the control panel

Much of the content and pages within the XenForo admin control panel can be found using the search system. If you are unsure where to find something, this is the first place to check.

The search system can be accessed by clicking the magnifying glass icon in the upper right (or pressing the `/` key on your keyboard) and typing what you're looking for. Any matches will be displayed immediately.

[//]: # (![Admin control panel search][acp-search])

## Automatic update checking and license validation

From version 2.1, XenForo periodically checks whether there is a new version available for your license and displays a message in the control panel when this happens.

It also checks the state of your license, notifying you if your access to updates and support has expired or if the installation URL does not match the URL provided in the customer area.
