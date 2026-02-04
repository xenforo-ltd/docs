# Logs

In addition to the essential logs recorded by your server(s), XenForo itself maintains a variety of logs.

All logs can be reviewed in the Admin Control Panel in the **Logs** section.

## Statistics

The _Statistics_ section reflects records of how many times specific events took place on your site. These events include user registrations, replies to threads, uploads of images and a wide variety of other actions.

By setting a _Date range_ and _Grouping_, together with one or more event types, you can see a graph showing the count of each event for each time division over the time period you specify.

A common configuration would be to show the number of posts and threads posted each day over the past month. To view this, set the date range to one month prior to now using the **One month ago** _Date preset_, set the _Grouping_ to **Daily** and then check the boxes for **Posts** and **Threads** before hitting the **Show** button.

## Logs

### Errors

#### Server error log

When PHP logs an error, XenForo captures a _stack trace_ and records it in its own Server error log.

It can be useful to keep an eye on this log from time to time, as errors recorded here may be affecting your users' experience of the forum.

Clicking on any logged error here will reveal the full stack trace, with as much additional information as was available when the error was generated, which may be useful in isolating the problem.

If the Server error log grows very large as a result of a persistent problem, you may use the **Clear** button to empty the log and start again from scratch when the problem is identified and resolved.

#### Email bounce log

If [configured](../configuration/email.md) to do so, XenForo will log attempts to send email to addresses that bounce the message back due to errors such as the address not existing, the mailbox being full etc.

No action is required on your part, but it may be useful to note any user accounts whose associated email addresses are now bouncing.

### Users

#### User change log

Whenever a user profile is edited, either by the user themselves or by a forum staff member, the date and time of the change is logged.

The original and edited version of the data is also recorded for your reference.

#### Username change log

The most dramatic change to a user profile is when a user [changes their username](../users/user-name-change.md). 

All username changes are logged with the original and new usernames along with the change reason if applicable.

#### Cookie consent log

When users complete the cookie consent challenge to accept or reject cookies set by your forum, their consent is logged in the _Cookie consent log_.

#### Moderator log and admin log

All [moderator](../access-privileges/staff.md#moderators)-specific actions, such as opening and closing or moving threads are logged in the _Moderator log_.

All [administrator](../access-privileges/staff.md#administrators) actions within the Admin Control Panel are logged to the _Admin log_.

These logs also record the IP address of the user who performed the action.

It can be useful to audit these log from time to time for security purposes.

You may filter these logs by user.

### Spam

#### Spam trigger log

When content is posted that is automatically rejected by the spam trigger, the results of the analysis that caused the content to be rejected is logged in the **Spam trigger log**.

These results can be useful in fine-tuning the parameters by which content is rejected as spam.

#### Spam cleaner log

Whenever the spam cleaner is executed, its use is logged along with the user who performed the action.

You may reverse the effects of the spam cleaner, un-banning the posting user and un-deleting their content, by using the **Restore** control if you have reason to believe that the spam cleaner was run in error.

#### Rejected user log

Similar to the [spam trigger log](logs.md#spam-trigger-log), you may review the profiles of users whose registration was automatically rejected as being at high risk of posting spam.

### Content

#### Image proxy log

When the [image proxy](../configuration/proxy.md) is enabled, its use is logged in the _Image proxy log_. From here, you can see the original URL and properties of all proxied images, along with a count of how many times they have been viewed by users through the proxy.

#### Link proxy log

As with the image proxy log, any URLs passed through the [link proxy](../configuration/proxy.md) are logged here together with their hits counter.

#### oEmbed log

When [media is embedded in content](../content/bbcode-media-sites.md) and its containing HTML is fetched via [oEmbed](../content/bbcode-media-sites.md#oembed), statistics about the request and the number of hits on the media is recorded as part of the _oEmbed log_.

### Miscellaneous

#### Payment provider log

Any interactions with your [configured payment providers](../configuration/payments.md) are recorded in the _Payment provider log_. This log can be particularly useful in determining a cause in the event that payments are failing, as a full copy of each request is stored.

#### Sitemap log

When XenForo rebuilds your [XML sitemap](../configuration/sitemap.md), its completion is noted in the _Sitemap log_. The log also notes across how many files the sitemap is spread, and how many URLs are recorded within the complete sitemap.