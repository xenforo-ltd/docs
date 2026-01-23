# The spam cleaner

XenForo includes a tool for use directly on user-generated content, called the Spam cleaner. Its purpose is to quickly and efficiently deal with any spam that has been posted to your forum with just a few clicks.

Content that is eligible for spam cleaning will have a **Spam** link near its normal **Edit** and **Delete** controls.

### Configuring the Spam cleaner

1. Log in to the Admin control panel.
1. Click on [Options](options.md) from the *Setup* section of the navigation panel.
1. Select the **Spam management** group from the list.

There are several sections on the resulting page which work in conjunction to help keep your site free of unwanted visitors and content.

- The Spam Cleaner can be made available for use on members, based on message count, elapsed days since registering, and the number of Likes that member has received. This is configured via the **Spam cleaner user criteria** option.
- For any members who do not meet the criteria, by having a higher message or like count or having been registered for more days than the set limit, the spam cleaner will not be available. It will be necessary to increase the values to make it available for those members.
- The default options control which checkboxes are already selected when running the Spam Cleaner. The checkboxes can be selected or deselected each time it is run, regardless of the settings here.
- The actions to be taken with affected threads and messages include being able to permanently delete them, remove them from public view, and in the case of threads, move them to a specific forum.
- The default email text entered here can also be edited each time the Spam Cleaner is run.
- The IP check will return any matches from other members, for the past number of days specified.

:::note
To make the Spam Cleaner available at all times for all content regardless of its author or age, set all three **Spam cleaner user criteria** options to 0.
:::

### Using the Spam cleaner

To use the spam cleaner, a user must have the appropriate spam cleaner permission enabled. This can be done by way of user group or user permissions, as explained in detail in the [Permissions](permissions.md) section of this manual.

The Spam cleaner itself can be run from several locations:

- On a thread or profile post by clicking the *Spam* link near the *Edit* and *Delete* controls.
- On a member popup, by clicking the *Spam* link in the tools menu.
- On a profile page by clicking the *Spam* link in the Moderator tools menu.

Clicking any of those links will result in a *Spam cleaner* overlay from where you can select the actions to be taken. This can range from a simple IP check, to a permanent ban and removal of all content.

:::note
Banned users do not automatically show as being banned nor do they have any specific markup applied to their user name or title. Refer to the [Discouraging](discouragement.md) and [Banning](banning.md) section for further information.
:::

#### Restoring deleted content

If you wish to restore any deleted content as a result of using the Spam cleaner, you can do so using the **Restore** option.

1. Open the **Tools** section of the admin control panel.
1. Click on **Spam cleaner log**.

From here, you can review all content that has been deleted by the spam cleaner, and restore it selectively if you so choose, by clicking on the **Restore** link for the member in question and then the **Restore data and user status** button.

:::note
It is not possible to restore content which has been permanently deleted.
:::

This video shows the Spam cleaner in action in XenForo 1. The processes are largely identical for XenForo 2.

<iframe src="https://player.vimeo.com/video/14236084?title=0&amp;byline=0&amp;portrait=0" width="570" height="356" frameborder="0" webkitAllowFullScreen="webkitAllowFullScreen" allowFullScreen="allowFullScreen"></iframe>
