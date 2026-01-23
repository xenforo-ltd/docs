# XenForo Resource Manager (XFRM)

The XenForo Resource Manager is an add-on that allows you to manage resources such as files and tutorials or other article-like content along side your normal forum. The aim is allow content such as files to be listed with a focus on the initial content rather than discussion surrounding it. It can be [purchased from XenForo.com](https://xenforo.com/purchase/) directly.

## Installation, upgrades & uninstallation

The Resource Manager follows the standard XenForo add-on packaging system and approaches. Full guidance for these actions can be found in the [add-ons section](add-ons.md).


If you are using version 2.1 or above you can also upgrade using the [one-click upgrade](upgrade.md#one-click-upgrades) system.

Once installed, you can reach the Resource Manager via the *Resources* sections in the front end and admin control panel.

## Resource categories

Resources will be placed into individual categories that are organized into a tree. In this regard, they are very similar to the [node tree](nodes-forums.md#the-node-tree).

Each category can control the types of resources that can be added to that category via the *Allowed resource types* option. If a category has any children, their resources will be listed when viewing the parent category. To create a category that is only used for organizing other categories, deselect all *Allowed resource types* from it.

Whenever a resource is posted into a category, a thread can automatically be created in a designated forum. This allows a separate discussion for each resource. If the *Automatically create thread in forum* option is configured, the resource will link to the discussion thread and the discussion thread will link back to the related resource. If this value is changed, it will not apply to any existing resources.

## Resource prefixes

Resource prefixes function identically to thread prefixes. This can be used to allow additional organization without creating more categories. More details are available within the [thread prefixes](thread-prefixes.md) section.

## Resource fields

Custom resource fields allow you to define additional structured fields for users to fill in when creating a thread. These are similar to [custom thread fields](thread-fields.md).

Resource fields can be displayed in one of several locations:

1. **Above resource description**: with the resource description, directly before it.
2. **Below resource description**: with the resource description, directly after it.
3. **Extra information tab**: on a separate tab named *Extra*. All fields set to this value will be displayed on this tab.
4. **Own tab**: on its own tab, named by the field name. This is helpful if you have a custom field where users are likely to enter a lot of content (such as in a FAQ).

## Permissions

The Resource Manager adds a number of new permissions. When installed, reasonable defaults are selected based on existing permissions. However, you should confirm that the permissions meet your needs and that your moderators have the permissions you want.

## Options

The Resource Manager's options can be found in the **XenForo resource manager** option group.
