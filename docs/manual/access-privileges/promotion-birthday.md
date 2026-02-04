# Example birthday promotion

## Birthday user group

1. Create a new [user group](groups-permissions.md) called `Birthday today` at **Groups & permissions > User groups > Add user group**.
1. Set its *Display styling priority* to a very high number so that it overrides styling from any other user groups to which its members belong.
1. Set the *User banner text* to `It's my birthday today!` and choose a *User banner style* you like.
1. Save the user group without editing any of its permissions.

## Birthday promotion

1. Create a new user group promotion called `Birthday promotion`. at **Groups and permissions > User group promotions > Add promotion**.
1. Use the checkboxes to *Add user to user groups* `Birthday today`.
1. Select the *Apply this promotion while...* tab and check the box for *User's birthday is today*.
1. Save the user group promotion.

The next time the *User group promotions* [cron job](../common-concepts/cron.md) runs, any users whose birthday is today will be added to the `Birthday today` group and will have *It's my birthday today* as a banner added underneath their name in any messages they have posted.