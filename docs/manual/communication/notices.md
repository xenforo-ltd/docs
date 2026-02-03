# On-screen notices

Notices are messages broadcast to users on all pages, allowing you to alert your visitors to important information.

They take the form of a title and message, in which you can use HTML code. You may also personalize the message using `{name}` within the HTML, which will be replaced by the name of the user viewing the message.

You may display an image with each notice, either the viewing user's own avatar, or a custom image using the **Display image** tools, and you may specify the styling of each notice to suit the message using the **Display styling** tools. A range of styles are provided, or you can use your own custom CSS by entering a class name and then having that reference your own CSS rules.

In order to suit smaller screen sizes, you may hide the notice if the screen width falls below one of the options in the **Visibility** section.

### Notice types

Notices can be of *Block* type, *Scrolling*, *Floating* or *Fixed* - these **Notice type** options control how and where the notice is displayed, and should be set according to how important the message might be.

- **Block** notices are displayed at the top of the page, below the main navigation bar. They are shown until they are dismissed.
- **Scrolling** notices are grouped together, and are shown in a cycle, with the first notice scrolling horizontally to make way for the second notice, which in turn scrolls away to show the third notice etc. Note that scrolling notices will only scroll away if there is more than a single scrolling notice visible.
- **Floating** notices are shown floating over the content in the bottom right corner. They are significantly less intrusive than the types.
- **Fixed** notices are full width and fixed to the bottom of the page covering any content that might be underneath.

Your notices can be set as dismissable, which allows users to click a close gadget on each notice in order to hide it from view once they have read it. Users may review dismissed notices in their own account area.

For floating notices, you may have them automatically dismiss once they have faded out. This is useful for notices that need to be read just once, and are not of critical importance.

The **[display order](../common-concepts/display-order.md)** of notices defines their position relative to other notices of the same type. Notices with higher display order values will display before notices with lower display order values.

### Notice criteria

Notices may be conditionally displayed, based on a selection of criteria from the additional tabs in the notice editor.

For example, you could display a notice only to guest / unregistered users by selecting *User is a guest* under the *User criteria* section, or you could target users that have arrived from a search engine such as Google, who are likely to be first-time viewers, by selecting *User arrived on this site from a search engine* under the *Page criteria* options.

For more information about criteria, see the [Criteria](../common-concepts/criteria.md) section of this manual.