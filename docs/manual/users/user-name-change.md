# Username changes

If a registered [user](index.md) belongs to a [user group](../access-privileges/groups-permissions.md) with the **Change username** [permission](../access-privileges/permissions.md), they will be permitted to change the username with which they log in.

## Logging

This username is also the primary means by which other users can identify that user, so username changes are [logged](../maintenance/logs.md#username-change-log). This log also has the purpose of being able to show a _formerly known as..._' hint against the user's new name.

## Configuration

A variety of options are available at **Setup > Options > User options**.

#### Require reason for username changes

Users will be required to describe why they want to change their name. Staff may then decide whether or not to approve the change.

#### Minimum time between username changes

To restrict spurious username changes, this field allows you to define a minimum number of days that must elapse between username change requests.

#### Username reuse time limit

It is usually undesirable for a user to change their username to one that has been recently vacated by another user, as this could cause confusion and misidentification among your members. Use this field to provide a number of days that must elapse after a user changes their username before another user may adopt their old name.

#### Username change recent limit

This setting allows you to define how old a username change must be before it is no longer considered _recent_. While a change is _recent_, their new username will be accompanied by a hint that allows users to view their previous username.