# Staff

In XenForo, there are two types of staff members, moderators and administrators. These are entirely distinct roles in terms of the permissions granted. Making a user an administrator does not make them a moderator; these roles need to be assigned separately.

### Moderators

Moderators are users that are given special privileges on your site, generally to help manage the content other users submit to the site. This includes things like deleting posts that violate rules, moving threads to more appropriate locations, and handing out warnings. The exact permissions that a moderator has can be set when the moderator is configured.

There are two types of moderators: super and forum-specific. Super moderators have permissions in all forums by default, while a forum moderator is only able to use those permissions in the specific forums they're assigned to.

In order to have access to all of the moderator tools and functionality, a user must explicitly be made a moderator. Adding a user to the *Moderating* user group does not make them a moderator. They must be added via **Groups & permissions > Moderators**.

The moderator bar will be displayed at the top of the page for all moderators. This allows them to access the approval queue and reported items.

### Administrators

Administrators are users that can access and perform actions within the administrator control panel. Making someone an administrator does not inherently give them additional access to the forum.

There are two types of administrators: super and regular. Super administrators always have access to all parts of the control panel and can add/remove other administrators. Regular administrators are controlled by the specific permissions applied to them. They are unable to add/remove administrators.

### Staff security

Administrators and moderators have enhanced access to your forum. If an attacker is able to gain access to one of these accounts, they may be able to delete/manipulate content or deface your site. Therefore, it is very important that you and your staff take precautions to ensure that your accounts cannot be accessed unexpectedly. Here are several tips to help avoid that:

1. Use a unique password for your site. Most account takeovers are caused by password reuse. The best method to ensure that you don't reuse passwords is to use a password manager.
2. Enable two-step verification. This ensures that even if an attacker gains access to your password, they will need a second authentication token to login. You can force your staff to enable two-step verification through permissions or by blocking access to the control panel until they enable it. 

### Staff display flag

When editing a [user's profile](../users/user-profile.md#display-user-as-staff), you may set the _Display user as staff_ option. This option will include the specified user in any staff lists you may publish on your forum, such as the _Staff online_ widget, but it does not confer any additional rights, roles or privileges to the user.

Making a user a moderator or an administrator automatically enables the option, but you may go and disable it again afterwards if you wish to do so.