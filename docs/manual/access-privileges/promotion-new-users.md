# New user restrictions

For the purposes of this example, all members will have their first five posts pre-moderated.

After that they will be promoted into a new user group which will allow them to post freely.

This is a typical use for user group promotions, to allow moderators to vet all initial posts by new members and catch any potential spammers.

## Restricting permissions

The first step is to configure the Registered user group with the base permissions all members will have. Initially, we want all members to have their content pre-moderated (manually approved) before publication.

1. Edit the *Registered* user group at **Users & groups > User groups > Registered**.
2. In the permission matrix, set the permission *Submit content without approval* to **No**.
3. Save the user group.

## Removing restrictions

The next step is to create a new user group, which we will call `Verified Member`, which grants the permission to post without pre-moderation.

1. Create a new user group using **Groups and permissions > User groups > Add user group**.
2. Give the group the title `Verified member`.
3. In the permission matrix, set the *Submit content without approval* permission to **Yes**.
4. Save the user group.

## Creating the promotion

We will now set up a promotion that will automatically promote users to the `Verified member` user group when they have had five messages published.

1. Create a new user group promotion called `Verified`. at **Groups and permissions > User group promotions > Add promotion**.
2. Use the checkboxes to *Add user to user groups* `Verified member`.
3. Select the *Apply this promotion while...* tab.
4. Check the *User has posted at least X messages* criteria and enter a value of **5**.
5. Save the user group promotion.

Once saved, the first 5 posts of all members will be pre-moderated. Once they have made 5 posts they will be automatically promoted and added to the Verified Member user group, allowing them to post normally. Note that their posts will only go through normally after the promotion has run. It is not instantaneous.