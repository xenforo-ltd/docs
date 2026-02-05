# Warnings

Warnings allow you and your moderators to add warning points to users when they violate rules. These points can then be connected to actions that apply restrictions or bans based on how many warning points the user has.

## Warning users

Warnings will be applied by moderators by clicking the *Warn* link on specific content or by applying a warning directly via the user's profile. If a warning is applied to specific content, the moderator may be able to leave a public warning message to indicate to others that the content is not appropriate.

### Review users' warnings

Moderators will be able to see a user's warning history via their profile. This will display the current warning points total and the total number of warnings they have received, regardless of whether those warnings have expired. Each of the warnings can be clicked to receive more information about the warning or to go to the related content.

## Defining warnings

The warning system consists of two parts: the warnings themselves and warning actions.

In the control panel, you may pre-define warnings that your moderators can apply to users. For each warning, you'll be defining things like:

* The title, which will be displayed to moderators viewing the list of warnings a user has received
* The default number of points the warning is worth
* The default time until the points expire (and are no longer counted)
* Any user groups you want to add the user to while this warning is not expired
* And the default conversation settings to notify the user that they have received a warning

:::note
When a user is warned, they will only be notified if the moderator opts to send the user a conversation while applying the warning.
:::

### Warning actions

The second component of the warning system are warning actions. This allows you to define specific actions to take based on the number of warning points a user receives. These actions include banning, discouragement or adding additional user groups. If you choose to add the user to additional groups, you will generally be removing permissions; in this case, you will want to define permissions using the *Never* option.

#### Warning expiry

Each warning action will be applied for a specific length of time. This will either be an explicit amount of time (even permanent) or while the total number of warning points the user has is above the points threshold for the warning action. These settings allow you to apply restrictions using several approaches:

* You can apply restrictions for a short period of time while using long expiration times on warnings. As users receive warnings, their total points will tend to accrue and you can apply more strict restrictions at higher points thresholds.
* You can apply restrictions while above the points threshold, though often with shorter expiration times. This means that subsequent warnings will cause the restrictions to be in place for even longer.

:::note
Warning actions are only applied when crossing a points threshold. If you define a new warning action (or change the points threshold of an existing one), a user that already has more than that number of points will not have the action applied until their points drop below the threshold and then increase above it again.
:::
