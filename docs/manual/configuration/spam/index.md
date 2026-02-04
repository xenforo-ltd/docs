# Spam management

XenForo includes a suite of tools designed to prevent, combat, and manage spam.

## Spam prevention

### Registrations

There are several tools that can be used to prevent spammers from registering. These can all be found in the **Spam management** options.

- The [StopForumSpam](http://www.stopforumspam.com/) database can be checked. This is a collaborative databased used by thousands of forums to prevent known spammers from registering. The integration behavior is tunable based on the confidence of the database result. If you register and request a **StopForumSpam API key**, you can submit spam information back to StopForumSpam whenever you ban a spammer using the spam cleaner.
- Check one of several **DNS block lists**, such as the *Tornevall DNSBL*. These simply check the IP of the user registering against known spam IPs and takes an action against them.
- Setting a **Registration timer**. This is a weak defense against spam, but it can catch out some automated scripts and prevents them from submitting the forms too quickly. Setting this value too high may affect human users.

### Content

A spammer may manage to bypass the automated registration checks and successfully register. A second line of defense can be added to prevent them from submitting their spam content. These options are found in the **Spam management** option group.

- Spam phrases can be defined. If any of a user's first few messages matches theses phrases, an action can be taken. For example, some spammers submit messages with "watch film name online". We can match that with "watch * online" and simply block the message.
- For more dynamic content matching, [Akismet](https://akismet.com/) can be checked. This is a service that uses heuristics to determine if the submitted content is spam. If Akismet thinks the content is spam, the content will be placed into your forum's moderation queue and you will need to manually approve (or delete) the message before it is displayed to normal visitors.

### CAPTCHA

There are two CAPTCHA systems available, only one of which can be used at any one time. They work by requiring visitors to carry out tasks that are difficult for machines to perform in the case of ReCAPTCHA, or answering specific questions for the Question & Answer CAPTCHA.

If you decide to use the XenForo question and answer CATCHA system, you will need to define a set of questions and answers which visitors will have to answer correctly when registering or posting messages, if guest posting is allowed. This can be done by clicking on **Q&A CAPTCHA** in the **Setup** section of the Admin control panel.

[More about the XenForo question and answer CATCHA system](../captcha.md)

