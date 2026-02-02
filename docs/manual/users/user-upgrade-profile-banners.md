# Purchasable profile banners

User profile banners are images your users may upload to use as a custom background for their public user profile page. 

In this example, we will remove this ability from normal users and put the feature behind a paywall, allowing paying users to distinguish themselves from those who have not contributed.

## Restricting access

1. Edit the permissions for the *Registered* user group at **Groups & permissions > User groups > Registered**.
2. In the permission matrix, set the *Upload a profile banner* permission to **No**.
3. Save the permissions.

Now, nobody will have access to upload profile banners.

## Granting access

1. Create a new user group using **Groups and permissions > User groups > Add user group**.
2. Give the group the title `Has profile banners`.
3. In the permission matrix, set the *Upload a profile banner* permission to **Yes**.
4. Save the user group.

## Allowing access to be purchased

1. Create a payment profile using one of the available services, if you have not already done so.
2. Add a new User upgrade at **Users > User customization > User upgrades > Add user upgrade**.
3. Call the new upgrade `Profile banners` using the *Title* field.
4. Optionally add a description.
5. Set a cost and a currency for your subscription.
6. Leave the *Length* as *Permanent*.
7. Select the payment profile(s) you want to use for this subscription.
8. Select the `Has profile banners` group under *Additional user groups*.
9. Save the upgrade configuration.

Now, users will be able to purchase the `Profile banners` subscription from their **Account upgrades** page.

When payment is received, the system will automatically add their membership to the `Has profile banners` user group, which permanently grants permission to upload profile banners.