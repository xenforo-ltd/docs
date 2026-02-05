# XenForo Media Gallery (XFMG)

The XenForo Media Gallery is an add-on that allows you and your users to create galleries of images, videos, and audio in your forum, organized into admin-defined categories or user-created albums. It can be [purchased from XenForo.com](https://xenforo.com/purchase/) directly.

## Installation, upgrades & uninstallation

The Media Gallery follows the standard XenForo add-on packaging system and approaches. Full guidance for these actions can be found in the [add-ons section](../configuration/add-ons.md).

If you are using version 2.1 or above you can also upgrade using the [one-click upgrade](../installing-and-upgrading/upgrade.md#one-click-upgrades) system.

Once installed, you can reach the Media Gallery via the *Media* sections in the front end and admin control panel.

## Media categories

Media will be placed into individual categories that are organized into a tree. In this regard, they are very similar to the [node tree](../forums/nodes-forums.md#the-node-tree).

A category may be one of three types:

1. **Container only**: these categories will not contain media or albums, instead serving to organize sub-categories.
2. **Albums only**: in these categories, users will create albums that can contain one or more media items. When the category is viewed, there will be one entry for each album.
3. **Media items only**: media will be added directly to these categories and not organized into albums. Each media item will be displayed directly when viewing the category.

If your users are likely to upload a number of related pictures (such as from a single event), you will likely want to use album categories. Note that the category type cannot be changed unless the category is empty.

## Media fields

Custom media fields allow you to define additional structured fields for users to fill in when creating a thread. These are similar to [custom thread fields](../forums/thread-fields.md).

Media fields can be displayed in one of several locations:

1. **Below media item**: this will be displayed in the box below the media, with the title and author info.
2. **Bottom of media info block**: in the sidebar opposite the comments, in the media information block.
3. **Extra info block**: in the sidebar opposite the comments, in a new *Extra information* block.
4. **New sidebar block**: in its own sidebar block, using the custom field's name as the header.

## Permissions

The Media Gallery adds a number of new permissions. When installed, reasonable defaults are selected based on existing permissions. However, you should confirm that the permissions meet your needs and that your moderators have the permissions you want.

## Options

The Media Gallery's options can be found in the **XenForo media gallery** option group.
