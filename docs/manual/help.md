# About help pages

While help pages do not permit you to contact users directly, they are a means by which you can impart useful information to your visitors.

A number of help pages are created when XenForo is installed, including guidelines and reference for *Smilies*, *BB codes*, *Trophies*, *cookies*, general *Terms and rules* and *Privacy policy*.

Specific information about editing and forcing user-acceptance of *Terms and rules* and *Privacy policy* is available in this manual under the [Terms and rules section](terms.md).

Add-ons may add their own help pages to this list.

The Help page manager lists all available help pages, and allows you to add new pages, toggle the availability of existing pages and delete pages.

### Help page editor

Clicking the title of a help page will open the Help page editor.

#### URL portion

A short string of text entered here will act as the link to this help page. For example, a URL portion of '*getting-started*' will result in a link of `/help/getting-started`, and will load the page you create or edit using the help page editor.

#### Title and description

The title and description will be shown at the top of the help page, and in the help page manager.

#### Display order

The [display order](display-order.md) value dictates where in the help navigation the page will appear. Pages with higher display order values appear after those with lower display order values.

#### Page content

Use this box to enter the HTML for your page. Full XenForo *template syntax* may be used here, as the page effectively will be saved as a template.

If you want complete control over the styling of your help page, check the *Advanced mode* option, in order to omit the usual HTML block that surrounds help pages. If you use this option, you have complete responsibility for ensuring that your page is stylistically in-keeping with the rest of your site.

#### PHP callback

For advanced help pages, you may have PHP code generating variables for your help page template. This is very powerful, but not an easy option for non-developers.
