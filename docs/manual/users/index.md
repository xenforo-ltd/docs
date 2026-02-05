---
title: Users
---

import DocCardList from '@theme/DocCardList';

# Users

Arguably the most important part of a forum is its user base. XenForo contains a wide range of user management tools in the **Users** section of the admin control panel.

All _visitors_ to your forum are considered to be _users_. Those users that complete the registration process and log-in are considered to be [members](../access-privileges/groups-permissions.md#user-groups-as-roles), while users who have not registered or are not logged-in are [guests](../access-privileges/groups-permissions.md#user-groups-as-roles).

While individual users may have configuration and customization applied to them according to the data in their _user profile_, the majority of their abilities, access rights and restrictions is provided through their membership of [user groups](../access-privileges/groups-permissions.md), where [permissions](../access-privileges/permissions.md) are defined.

This section covers the more complex features that relate to users in XenForo.

## Searching and listing

A comprehensive search system exists to find users registered on your forum. You may search either using data or statistics related to user accounts, or you may search by IP address.

Search results are shown in the *user list*, which can be sorted by username, join date or a range of other criteria.

Data about the users in the list may be [exported to a file](index.md#batch-export). 

## User customization and gamification

There are a variety of tools to allow you to customize your users' experience of your site including additional data collection tools such as [custom user fields](user-fields.md) and gamification options like [trophies](user-trophies.md).

XenForo also offers the facility to have your users pay for access to content or functionality via [user upgrades](user-upgrades.md).

## User discipline

Enforcing your site's rules is an important part of running a forum. XenForo supports both incremental and absolute approaches to dealing with user discipline. XenForo provides a range of tools including [a warning system](warnings.md) and [banning options](banning.md).

## Importing and exporting single users

XenForo provides functionality to import and export user profile data via **Users > Data portability**.

Both import and export functions operate with XML files, which are sufficiently generic to allow import into other forum software systems that offer such functionality.

The exported data includes the username, email address, timezone, date of birth, website URL, location, _Signature_ and _About_ fields from the user's profile. Additionally, the values of all [custom user fields](user-fields.md) are included in the exported XML data.

## Batch export

The users shown in the [user list](index.md#searching-and-listing), either as the result of a search or having clicked on _List all users_, may be exported as a CSV (comma separated values) file using the *Export user list* control above the list, which can be opened in any spreadsheet application, such as Microsoft Excel or Google Sheets.

The resulting CSV contains the most important data elements of each user account such as username, email address and registration date. It can be used to build an email list or similar, but does not contain a complete copy of the user data for archive or migration purposes.

<DocCardList />
