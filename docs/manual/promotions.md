# User group promotions

User group promotions are a means of automatically adding members to user groups, to alter their user title, user name styling, or permissions.

All controls for creating and managing promotions are located in the Admin Control Panel at **Groups & Permissions > User group promotions**.

## Utility

While this system is called *promotions*, its utility is far more broad. You can *promote* users to additional user groups to achieve all manner of results. Here are just a few examples:

* Membership segmentation for A/B testing
* Identification of users whose birthday is today
* Special badges for users who have contributed a lot
* Username styling to identify new users

## Creating a promotion

To create a new user group promotion, click on the **Add promotion** button. After giving the promotion a title and selecting the user groups to add the promoted users to, various criteria can then be defined.

The criteria that can be used is discussed in the [Criteria](criteria.md) section. If no criteria is selected, the promotion will never be awarded automatically.

Once the promotion has been saved, any members active recently, who match all of the criteria, will be promoted [when the promotion job runs](promotions.md#how-promotions-are-applied).

If a member no longer qualifies for the promotion, due to their status or the promotion criteria changing, then they will be demoted and removed from the user groups(s).

## How promotions are applied

#### Promotions scheduled job

Promotions are governed by a routine [cron](cron.md) task, which runs every hour.

If you need to process promotions immediately, you can do so by manually running the *User group promotions* [cron](cron.md) entry at **Tools > Cron entries > User group promotions**

When the job runs, users who match the criteria of each promotion will be added to the user group(s) specified by each promotion. Users who no longer match the criteria will be removed from the applicable user group(s) _unless_ their membership of said user group(s) is as a result of being manually added to that group by an administrator editing their user profile, or as the result of another promotion whose criteria they match.

#### Active users only

By design, user group changes through promotions are applied only to **recently-active users**. Inactive members (who have not logged in an interacted with your forum in some time) will not be processed for promotions, nor will they have promotions removed that have already been applied until they become active.

#### Alternative approach

If you want to apply a group membership via [criteria](criteria.md) to a selection of your entire registered user base regardless of whether or not they have been recently active, the correct way to do so is through [batch updates](user-batch-update.md) rather than promotions.

## Managing promotions

All promotions are listed at **Groups & Permissions > User group promotions**.

Clicking the title of each promotion will allow you to view, edit, and delete it.

Promotions can be disabled and re-enabled via the checkbox.

:::note
Disabling an active promotion will prevent the promotion from being applied to any additional users. It will _not_ demote any users that have already been promoted.
:::

## Managing promoted users

Clicking the **Manage promoted users** button will allow you to view any previously promoted users and also manually apply or prohibit promotions to individual users.

## Promotion history

To view promotion history, enter a user name and/or select a promotion. If no user name is entered, a full list of all users affected by that particular promotion is returned.

Any users who have been automatically promoted will appear in the list with user name, date and promotion title; any who have been prevented from being promoted will have their entry appended with **Promotion disabled**, any who have been manually promoted will be appended with **Manually applied**.

:::note
Any users manually demoted will no longer be eligible for that particular promotion, even if they meet the criteria.
:::

Users can be demoted by clicking the delete icon. The entry in the list will then be appended with **Promotion disabled**.

Clicking the delete icon again will make the user eligible for that promotion once more and remove the user from the list, until the next time the [cron](cron.md) task runs, assuming they still meet the criteria.

## Manual promotion

Users can be manually promoted or prevented from being promoted.

To manually promote a user, enter the user name and select the desired promotion. Manual promotions override the criteria and the promotion will remain in effect indefinitely, even if the user does not meet the criteria.

Similarly, users can be prevented from being promoted, which will also override the criteria.

Manual promotions can be removed in the same way as automatic promotions, via the promotion history page.

## Undoing a promotion

Occasionally, you may want to undo the user group assignments done by an active promotion, either because you made a mistake or because the promotion is no longer relevant. 

_Deleting_ or _deactivating_ the promotion will **not** undo any user group assignments made as a result of the promotion, but there are a number of ways to do so:

1. If the promotion was set to add users to a specific user group, the sole purpose of which was related to the promotion, you may simply delete the user group, followed by the promotion definition itself.
2. Alternatively, if you don't want to delete the user group but you want to remove all users from it, you may use [batch updates](user-batch-update.md) to identify all members of a specific group, and then remove their membership. You can then delete the promotion definition.
3. If the promotion provides membership of a user group that has a wider purpose and may also be the target of other promotions, the best way to undo the promotions done by one specific promotion is to leave it active but change its [criteria](criteria.md) such that it will not match any users. For example, you could change the criteria to match only users registered before January 1990, causing no users to match. As promoted users interact with the forum, their membership of the user group provided by the promotion will be removed.
