# Terms and conditions for users

There are two sets of terms and conditions, which you may require your users to accept before contributing to your site.

These are the *Terms and rules*, which governs acceptable use of the site, and the *Privacy policy*, which describes the manner in which your site may use user data in conjunction with *Cookie usage*.

Users will be directed to review and accept the contents of these documents when registering.

### Default documents

Both of these documents are displayed by default among your [Help pages](help.md) and are linked in the footer of your site.

You may edit these documents in the same way as editing any other Help pages, but in order to make these pages available in multiple languages, you will find that their content is largely controlled by phrases, rather than being directly editable in the help page editor.

The specific phrases used are as follows:

- Terms and rules: **terms_rules_text**
- Privacy policy: **privacy_policy_text**

You may edit these using the [Phrase editor](phrases.md#phrase-editor) as with any other phrases in the XenForo system, but for your convenience they may also be edited in the **Commonly edited phrases** section that is available when [editing the settings for a language](languages.md#language-settings).

:::note
If you edit these phrases and you have multiple languages available on your site, don't forget to update all available languages so that all users agree to the same terms, regardless of the language used. 
:::

### Alternative URLs

If you would prefer to use an existing web page to show your *Terms and rules* or the *Privacy policy*, rather than using the built-in system, you may provide an alternative URL for each document in **Setup > Options > Basic options** using the **Terms and rules URL** and **Privacy policy URL** settings.

:::note
If you provide alternate URLs for these documents, editing the original help pages will have no visible effect upon your site. All references to the *Terms and rules* and the *Privacy policy* will point to the URLs you specify, rather than the original help pages.
:::

### Forcing acceptance again

It may occasionally be necessary to force your users to agree to your terms again, such as after you have made changes to the text to which they originally agreed.

To do so, you may use the **Force agreement** tools under **Communication > Help > Force...**

You may individually force agreement to the **Terms and rules** and the **Privacy policy**.

For advanced uses, you may also exclude specific *routes* from being redirected to the agreement page. Routing is an advanced concept - for reference, see [Routing basics in the XenForo Developer Documentation](https://xenforo.com/docs/dev/routing-basics/).