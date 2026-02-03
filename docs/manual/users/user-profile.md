# Viewing and editing user profile data

After you have [listed users](index.md#searching-and-listing), either as a result of a search or by selecting _List all users_, you may click on any user to access the administrator's view of their user profile data. 

This profile data includes the values of any [custom user fields](user-fields.md) you may have defined.

The page is divided into several sections:

- [User details](user-profile.md#user-details)
- [Extra](user-profile.md#extra)
- [IP addresses](user-profile.md#ip-addresses)
- [Change log](user-profile.md#change-log)
- [Permissions](user-profile.md#permissions)

:::note
If you edit a user who is an [administrator](../access-privileges/staff.md#administrators), you will be prompted to enter your own password to confirm any changes to their user profile.
:::

## User details

### Essentials

The _user details_ section allows you to review and edit the data and settings attached to the user including their username, email address, avatar etc.

While you may set a new password for a user, or initiate the password reset system for them, it is _impossible_ to _view_ a user's current password.

If a user has [two-step verification](user-security.md#two-factor-authentication) enabled and has managed to lock themselves out, you may disable it for them using the option available here.

#### User groups

The user's primary [user group](../access-privileges/groups-permissions.md) and secondary user group memberships are displayed and editable here. Users must belong to one primary user group, and may belong to any number of secondary groups.

As discussed in the [user groups](../access-privileges/groups-permissions.md) section of this manual, we do not advise changing the primary user group to anything other than `Registered` here.

#### Display user as staff

An option is available to include the user in any staff lists published on your forum.

Note that this option is for display purposes only, and does not grant any additional permissions, rights or roles to the user. This is instead handled through the [moderator](../access-privileges/staff.md#moderators) and [administrator](../access-privileges/staff.md#administrators) systems.

#### User state

This special option is normally used to identify users who have registered on your forum **and** have completed the email verification step, where they confirm their email address by clicking on a special link sent to them when they register. This will set a state of **Valid**.

All other states are self-explanatory, but it should be noted that all states other than _Valid_ will _effectively_ apply the permissions granted by the `Unregistered / unconfirmed` [user group](../access-privileges/groups-permissions.md), rather than the standard `Registered` group.

#### Security lock

Set one of the [security lock](user-security.md#security-lock) options to protect a user's account if you suspect that a third party may be accessing it without authorisation.

[Security lock details](user-security.md#security-lock)

#### Discouraged

Enable this option to apply the dreaded [discourager](discouragement.md) to the current user.

### Personal details

The personal details section includes fields that are more for information purposes than forum functionality, including the user's location and website URL if provided.

The free-form _About_ text field is also included here, where users may write a little about themselves for others to read.

### Profile info

#### Custom title

When this box contains text, it will be used instead of any _user title_ that would normally be attached to members of specific user groups, or earned via the [user title ladder](user-title-ladder.md). Regular users are usually unable to edit this field themselves.

#### Signature

This free-form text box contains anything the user would like to display as part of their signature - a snippet of BB code text that is appended to the end of messages they post on the forum.

#### Counters

The total number of messages posted, [trophy points](user-trophies.md) awarded and the total [reaction score](../content/reactions.md) for the user are displayed and editable here.

### Additional contact

The values of any [custom user fields](user-fields.md) relating to contact details are shown here. These usually take the form of handles or user names.

### Preferences

The user's preferences for how the forum should operate are displayed here. You may edit the preferences, but the user whose preferences you change may not be entirely impressed that you did so!

### Privacy

As with [preferences](user-profile.md#preferences), these are the user's own choices. Do not change privacy settings without consent, as this would constitute a clear breach of the user's privacy.

## Extra

This section displays any active [user upgrades](user-upgrades.md), and any [connected accounts](../configuration/connected-accounts/index.md) in use by the current user.

Third party add-ons may also display their data here.

## IP addresses

A complete log of all IP addresses recorded for this user is available here.

Using the _More users_ control associated with each IP address, you may check to see if any other users have also used that IP address, if you suspect that individuals may be visiting your forum using multiple identities.

You may also [ban](banning.md#banning-by-ip-address) or [discourage](discouragement.md#discouraging-by-ip-address) any IP address listed. 

## Change log

The change log section shows the [user change log](../maintenance/logs.md#user-change-log) filtered to show only changed logged against this user.

## Permissions

The permissions section allows you to set [permissions](../access-privileges/permissions.md) that apply **solely** to this user.

This ability is rarely required, as the majority of permission assignments may be achieved using membership of user groups, but if you absolutely positively must override user group permissions for a single user, this would be the place to do it.

With regard to inheritance, user permissions have no greater precedence than user group permissions, in fact it can be useful to consider that all users belong to a primary user group, multiple secondary user groups and a final single user group that has only one member (themselves, with their user permissions). Inheritance for user permissions therefore works in the same way as user group permissions:

- A **Yes** in any of the groups to which the user belongs, or in their user permissions, will override any **No** from any other group or their user permissions.
- A **Never** in any of the user's groups or in their user permissions will override any **Yes** and deny the user from ever being granted that permission. 