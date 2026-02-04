# A premium content forum

In this example, we will restrict access to a single forum, then allow users to purchase a recurring subscription that grants access to that forum.

## Subscribers user group

1. Create a new user group using **Groups and permissions > User groups > Add user group**.
2. Give the group the title `Subscribers` and leave all the other options at their defaults.
3. Save the user group.

## Premium content forum

1. Create a new *General discussion forum* using **Forums > Nodes > Add node**.
2. Entitle the forum `Premium content` and provide any other configuration you want.
3. Save the forum.

## Restricting access

1. Back on the node list, click the **Permissions** control for the newly-created forum.
2. At the top of the page, check the **[Private node](../access-privileges/permissions.md#private-nodes)** option and hit the **Save** button below.

## Granting access

3. In the list of User groups below, click on *Subscribers* to edit their permissions.
4. Using the permission matrix, set the *View node* permission to **Yes**.
5. Save the permissions.

:::note
The *Private forum* setting **only** affects the *View node* permission, without which all access to the node is denied. If a group is granted *View node* permission to a private node, the remainder of its permissions, such as *Post new thread* and *Post replies* are inherited from their standard user group permissions - there is no need to explicitly grant these permissions again using node permissions.
:::

## Allowing access to be purchased

1. Create a payment profile using one of the available services, if you have not already done so.
2. Add a new User upgrade at **Users > User customization > User upgrades > Add user upgrade**.
3. Call the new upgrade `Premium forum access` using the *Title* field.
4. Optionally add a description.
5. Set a cost and a currency for your subscription.
6. Change the *Length* from *Permanent* to *1 month* and check the *Recurring payments* option.
7. Select the payment profile(s) you want to use for this subscription.
8. Select the `Subscribers` group under *Additional user groups*.
9. Save the upgrade configuration.

Now, users will be able to purchase the `Premium forum access` subscription from their **Account upgrades** page.

When payment is received, the system will automatically add their membership to the `Subscribers` user group, which grants access to the `Premium content` forum for one month.

When the month is over, the system will automatically take a further payment to continue the subscription.

If the payment fails, or the user cancels their subscription, they will automatically be removed from the `Subscribers` user group and will lose access to the `Premium content` forum when their subscription term ends.

:::note
Don't forget to grant access to your moderators and administrators too, or they will be unable to view the `Premium content` forum.
:::

    You can either add all your moderators and administrators to the `Subscribers` user group, or set permissions for those groups too.