# Smilies

Smilies, also known as *emoticons* are small graphical items that can be used to convey emotion or meaning in textual content. While their use has been diminished by the advent of *Emoji*, there is still a place for them in forums, where specific text combinations are automatically converted into iconic imagery. The most common smilie in use is the `:)` combination, which is replaced by a smiling face icon.

XenForo comes with a collection of default smilies, and can be extended to add any number of additional smilies as suits the needs of your forum. The smilie manager can be found in the *Content* section of your admin control panel.

### Smilie manager

All the smilies currently available for use are listed within the smilie manager, along with their name and any text combinations that can be used to trigger them. For example, the *Smile* smilie can be triggered with any one of `:)`, `:-)` or `(:`.

Individual smilies can be removed from the system using the delete icon, or they can be edited by clicking on their name. New smilies can be added by clicking the *Add smilie* button at the top of the page.

#### Categories

For ease of management, smilies in XenForo can be attached to smilie categories, and the manager will display all your smilies in their respective categories if you choose to use this system.

#### Import and export

If you have built a large collection of smilies and you'd like to share them, you can use the *Export* tools in the smilie manager to do so. Similarly, if you have acquired a collection of smilies from another source, you can import them into your own XenForo system using the *Import* tool, available in the drop-down menu in the bar of controls with *Add smilie*.

### Smilie editor

Within the smilie editor, you can make all necessary changes to your smilies. The most important, non-obvious controls are described here:

#### Text to replace

Use this box to enter the text combination(s) that you would like to have replaced by this smilie icon. If you would like to have multiple text combinations apply to a single smilie, enter each one on a single line in the text box.

:::note
Smilie text combinations **must** be unique. If you try to apply the same combination to more than one smilie, the system will alert you that the text combinaiton is already in use, and prevent you from saving the smilie data.
:::

#### Image replacement URL

Enter the path to your smilie icon graphic in this box. Using an absolute URL can be useful here, but if you use a relative URL, it should be relative to the XenForo home directory (where `index.php` lives).

#### 2x image replacement URL

Many web users now use devices with high-pixel-density devices (think iPhone's *Retina* screen) and for these users, normal resolution graphics may appear blocky and unimpressive. You may use the *2x* box to define a path to a higher resolution version of your smilie icon for these users.

:::note
As of XenForo 2.2, it is possible to upload smilie graphics from your computer directly from the control panel by clicking the gadget attached to the URL text fields.
:::

#### Smilie category, Display order and Show this smilie in text editor

These fields control how smilies are presented to users when they are viewing all available smilies in the text editor and smilie help page:

Smilies with higher [display order](../common-concepts/display-order.md) values are shown after those with low display order values.

If you want to attach a smilie to a category but none are shown in the list, you can go back and create new categories from the manager page.

:::note
Turning off *Show this smilie* will only prevent it from being shown in the list of smilies that appears when users click the smilie button on the text editor, but it will **not** prevent it from being used, if users enter its text replacement combination.
:::

#### Sprite mode

In some cases (such as the default XenForo smilies), smilies will come as part of a large sheet of images, rather than being separate, individual images. The sprite mode controls allow you to define coordinates to pick out a single smilie from within the sheet of images.
