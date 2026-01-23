# Custom member statistics blocks

Rather than showing a rather dull list of all the users registered on your forum, XenForo offers the ability to show custom statistics blocks with the top x users for a particular search parameter.

For example, you may want to show the top posters, or those users with the most accepted [solutions](questions.md#solutions).

To create a statistics block, that will be shown in the **Notable members** section of your community, go to **Users > Member statistics** in your **Admin control panel**, then either click on **Add member stat** or select an existing statistics block to edit.

After giving your statistics block a title and a unique key (used solely for system identification purposes), you will be able to use [User search criteria](criteria.md#user-criteria) to narrow down the list of users that can be shown in your statistics block, or else apply the statistics search to all valid users.

The users that are shown in the finished statistics block will be determined by the **Sort** order and the **User limit**. For example, setting the **Sort** to `Messages / Descending` and the **User limit** to `10` will show the ten most prolific posters in your community.

:::note
It is possible to create advanced statistics blocks with complex user-searching and filtering capabilities beyond those offered through the main interface by providing PHP callbacks.
:::

You may create as many statistics block as you like.