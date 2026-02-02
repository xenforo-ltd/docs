# Criteria

## What are criteria?

Multiple systems in XenForo allow you to apply criteria to whether or not an item is visible or available.

These criteria can also be used to fine-tune searching processes.

The uses of criteria are many, but you will most likely use them when searching the control panel for users, or defining when Notices should be displayed.

Data fields containing text will be searched using any text entered into corresponding text boxes, so entering `jo` into a 'username' text box would return users named `Jo`, `John`, `Joanne`, `Bjorn` and `Marjory`.

When searching a numeric field, options are provided to specify a minimum and or maximum value for a particular data field, and to select all users that match the given parameters.

For example, to find all users who have posted at least one message, enter `1` into the first **Message count between** box, and `-1` into the second (to specify no maximum).

:::note
Fields left empty, or with their noted default value, will not be searched.
:::

### User criteria

These criteria draw from information about a user, and include things like being a member of a certain user group, or having a user name containing specific text.

Many of these criteria are of the form 'User has *something*', and are frequently paired with the opposite 'User does not have *something*'.

User search criteria are used across the system, including:

- Users > Search for users
- Users > Member statistics
- Communication > Notices
- Communication > Contact users

### User field criteria

Similar to user criteria, these options refer to custom user fields that have been defined by the site administrator.

The criteria options will be appropriate for each type of user field that has been defined, so for example, if the user field contains text, the criteria option will be *Field contains text* whereas in cases where a user field is a multiple-choice option, the criteria would allow you to specify one or more of the available options.

### Page criteria

Page criteria are more about the current environment, such as the current time and date, or the area of the site within which a user is browsing.

It also contains a very useful criteria which can determine whether or not a user arrived at your site from a search engine.