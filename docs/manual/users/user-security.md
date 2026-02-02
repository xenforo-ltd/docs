# User security

## Passwords

The primary means of securing your users' accounts is their password. Password manager built into browsers and operating systems provide users with a simple and accessible way to use very strong passwords that are extremely difficult to guess or brute-force, and their use should be encouraged.

### Password storage

XenForo stores users' passwords using a complex one-way hashing algorithm that is unique to each user. It is **impossible** to extract the original password text from the stored hash, so if your users ever ask you to remind them of their password you will be unable to do so. Instead, users who have lost or forgotten their password should use the *lost password* system linked on login screens. 

### Brute-force attack mitigation

To prevent brute-force attacks on your users' passwords, XenForo will monitor all failed logins, and after four unsuccessful attempts to enter the correct password, it will take action.

Using the *Login limit method* at **Setup > Options > User options > Login limit method**, you may choose either to force the user to complete a CAPTCHA, or to lock out their account for fifteen minutes.

A user's ability to use the password reset / lost password system is also time-limited to prevent flooding. Enter a minimum number of seconds users must wait between requests at **Setup > Options > User options > Minimum time between password requests**. You may also force users to complete a CAPTCHA when using the lost password system to prevent robot use.

## Two-factor authentication

Two factor authentication (*2FA*), or two-step verification, is an enhanced security system that requires users to provide an extra level of security when logging in to their accounts.

This may take the form of a code to be entered from an app such as Authy, Google Authenticator or the iCloud Password Manager, or clicking a link in an email sent to your users' registered email address etc.

The 2FA methods available in XenForo are listed at **Setup > Service providers > Two-step verification**. 

### Mandating 2FA for staff accounts

It is a good idea to protect your moderators' and administrators' accounts with two factor authentication.

You may enforce this by setting the *Require two-step verification* option to **Yes** for the *Moderating* and *Administrative* user groups at **Groups & permissions > User groups > **(user group)** > General permissions**.

## Security lock

Occasionally, you may want to protect a user's account, especially if you suspect that a security breach has occurred or that the user's account has otherwise fallen victim to unauthorized access.

In these instances, you may protect accounts with a security lock, which can be applied when editing the account.

1. Log in to the **Admin control panel**.
1. Find the user to whom you want to apply the lock, for example by going to **Users > Search for users**, then click to edit their account.
1. Scroll down to the **Security lock** section, and choose either **Locked: User must change password** or **Locked: User must reset password**.
1. Hit **Save** to commit the change.

**User must change password** will force the user to enter their existing password and create a new, different password when they next log in to their account.

**User must reset password** forces the user to reset their password by responding to a message sent to their registered email address.

:::note
This option should be used if it is suspected that the user's original password has been compromised or guessed by an unauthorized user.
:::
