# Contacting your users directly

There are three methods by which users can be contacted directly: **Alerts**, **Email** and **Messages**.

Each of these methods employ [criteria](criteria.md) to determine precisely which users will be contacted.

### Alert users

This method will generate an alert containing your message, and display it along with the target user's other notifications, which would include alerts for replies to their topics, messages posted on their profile page etc.

When creating the alert, you can specify a URL to which the receiving users will be redirected when they click on the alert, along with a message to be used for the alert body text.

The alert method is the least intrusive way to contact users, but it is also possible that a user with many unread alerts may miss the message you send.

### Email users

The email method will generate an email and send it to all the users that match the criteria you specify. You may send a plain text email, or a full HTML email.

To create a consistent look for your email, you may optionally wrap it in the standard XenForo system email wrapper.

You may also include an *unsubscribe* link with your email, in case any of the receiving users do not wish to receive any further emails of this kind.

Finally, you may opt not to actually send an email, but rather just generate a list of email addresses that match the criteria you specify, in order to send a message using a different email system, outside of XenForo itself.

### Message users

The final communication method is similar to the email method, but instead of sending email, it will insert a new conversation with each user targeted by the criteria, containing the message you enter.

To prevent your own inbox receiving a deluge of replies, you may lock the conversations as soon as they are sent, which will essentially turn them into read-only messages.

If you do not lock the conversation, you can optionally leave the conversation and ignore future replies, or leave the conversation and accept future replies, which will discourage users from replying to the conversation even though they are able to do so.