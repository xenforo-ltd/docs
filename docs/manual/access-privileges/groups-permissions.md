# Group permissions

User groups are XenForo's primary method of assigning roles to the users of your forum. This allows you to assign permissions, titles and other customizations to users.

XenForo's group and permission system is very powerful. However, it may work differently than you're accustomed to with other software. You will find you get better results if you adapt your approaches to work with the concepts presented here.

## User groups as roles

XenForo comes with four default user groups that you cannot remove, though you can rename them:

1. Unregistered / unconfirmed
2. Registered
3. Administrative
4. Moderating

The first two are the most significant initially. `Unregistered / unconfirmed` represents all _guests_ and any users who have an account that is not in a confirmed/valid state. `Registered` represents all registered users, who also referred to as _members_.

All users must belong to _at least one_ user group but can be members of many.

:::note
We strongly recommend that **all** registered users have the `Registered` group as their primary user group _including_ your moderators and administrators!
:::

When a new user registers, they will always be put in the `Registered` group automatically.

If you're coming from a different forum software, having your admins and moderators be members of the `Registered` group may seem awkward. However, if you consider user groups to be _roles_, describing characteristics of the users belonging to them, the concepts will begin to make sense:

- Any user account on your forum is, by definition, a registered member and as such should belong to the `Registered` group.
- A user who is a moderator should **also** be in the `Moderating` group (role). 
- Similarly, if a user is an admin and a moderator, they should be in the `Registered`, `Administrative` **and** `Moderating` groups.

Taking this approach allows you to:

* Define a baseline set of permissions for the `Registered` group. These are the permissions that *all* registered users will have.
* For each additional role, you then *only* need to consider the **additional** [permissions](permissions.md) that they will receive. All other permissions can be left at _No / Inherit_ and will therefore inherit whatever permissions are defined by the `Registered` group.

If done correctly, you will not be duplicating permission configurations across groups. If you find that two groups require nearly identical permissions, consider either merging them or using an additional group to represent the shared components.





## Other uses for groups

Setting custom permissions is probably the most significant use for user groups, but they can also be used to customize how users may appear to others.

If a user is a member of a multiple groups, the configuration of the group with the highest **Display styling priority** value will be used in most of the features listed here.

1. **User title override**: this controls whether a user's title comes from this group or the standard user title ladder. Note that a user-specific custom title will override both.
2. **User name CSS**: this can be used to apply color or other flourishes to the name of users in this group. Note that the user name styling is not used in all scenarios.
3. **User banners**: if specified, a banner will be displayed below the user's name on their posts. Further configuration for this can be found in **Setup > Options > User options > User banners**.

## Automatically adding and removing groups from users

While you can manually add and remove users' membership of secondary groups, the **real power** of the system comes into play when you set up systems to **automatically** add and remove group memberships.

The two primary systems in XenForo for doing this are:

### [User upgrades](../users/user-upgrades.md)
Users can pay for access to specific content or features, such as [premium content forums](../users/user-upgrade-premium-forum.md) or the [ability to upload profile banners](../users/user-upgrade-profile-banners.md).

### [User group promotions](promotions.md)
Users can be added and removed from groups automatically based on criteria you define. For example, you could grant membership of a `Long term users` group that adds a specific user title when users have been registered for over a year, or you could add users to a `Helpful members` group when their [reaction score](../content/reactions.md) exceeds 100 points.