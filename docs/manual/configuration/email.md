# Email

Immediately after installation, XenForo will be able to send email on most servers using PHP's default mailing settings. However, if you wish to control more aspects of the mail sent by XenForo, log into your admin control panel, go to **Options** and into the **Email options** group.

### Transport configuration

The *Email transport method* controls the approach to sending mail. The two methods supported by XenForo are:

- **PHP built-in mail** – This uses the default configuration of PHP to send email. In general, this is the preferred option as it offloads the actual act of sending the mail to a dedicated program on the server, giving you better performance.
- **SMTP** – This uses an outside server to send emails. In some situations, this can reduce the likelihood of your mails been seen as spam. While this option does give you a lot of flexibility when sending email, sending emails with this method will be slower than in the default method. This is because each mail is sent by XenForo, rather than handing it off to a dedicated program.
- **Google OAuth** - Google are moving towards a time when they will not accept standard SMTP credentials for their mail servers, and will instead expect an OAuth token as a security measure. To use this, you will need to navigate to Google's [Developer Console](https://console.developers.google.com/) and set up a new project with OAuth 2.0 credentials for a web application. Step-by-step instructions are available on-screen as part of the OAuth setup process within XenForo.

[More info regarding OAuth options](https://xenforo.com/community/threads/assorted-improvements.181954/post-1437261)

### Additional options

There are several additional email options that you should consider setting.

- **Default email address** – Most emails sent from your XenForo installation appear to be sent by this account. This must be a valid email address.
- **Bounced email address** – When an email cannot be delivered, a message indicating this will be sent to the address you specify here. If you don't specify anything, it will go to your **Default email address**.
- **Default email sender name** – Normally emails sent via XenForo will have a sender name of your **Board title**. This option can override that with a more reasonable name.