# Navigation

On all pages of your XenForo installation, underneath the logo image in the header, you will find a strip of links, each of which navigate to another area of the site, or open up into a menu containing additional links.

This strip of links is called the *Public navigation*, and is controlled with the tools provided in the *Setup* section of your control panel.

## Public navigation

### Concepts

The navigation is divided into *top-level navigation* and *sub-navigation*. Top level navigation items will appear in the top strip of links in your site header, while sub-navigation links will be shown below when their parent top-level navigation item is selected.

Visiting different areas of the site will automatically switch the selected top-level item, so that the displayed sub-navigation items are contextually correct for the area of the site you are viewing.

Sub-navigation items can themselves have child items, which will be displayed in pop-up menus when their parent item is selected.

There are also a collection of sub-navigation items that have no parent item - these are the items that will be displayed in the header when no other top-level item is selected.

### Default navigation

When you first access the public navigation tools, you will find the default navigation layout, which includes top-level navigation items for **Home**, **Forums**, **What's new**, and **Members**.

Within each of these are links that are appropriate for that area of the site, for example, within **Forums** are links to find threads containing your posts, or threads that you started yourself.

The **Home** top-level navigation item is different, in that it has no sub-navigation and acts solely as a link to the URL you specify in the *Home page URL* option of the main XenForo options.

:::note
The default top-level navigation items control important XenForo functionality, so while you may rename and reorder them, and reorganise their sub-navigation items, it is not advised that you should remove them or change their type.
:::

### Editing and adding new items

You can completely customize the public navigation, building trees of links that perfectly suit the needs of your own site.
    
The simplest level of editing involves simply turning navigation items on and off, which can be done with the toggle gadgets in the navigation list. Note that turning off a navigation item will also effectively turn off any child navigation items attached to it.

For further control, click the name of a navigation item, and the editor will load, where you can change the name, the display order and they type of the navigation item.

#### Navigation ID

This is the unique internal name given to each navigation item. While the name is not important, it is advisable to choose a descriptive name, as this value can not be changed once it has been given its initial setting.

#### Title

You may give your navigation items any name you wish, though concise, descriptive titles are always best.

#### Parent navigation entry

If you change the parent navigation entry for an item, it will become a sub-navigation item for the parent you select. Be careful not to move important tools away from their correct parent, or your visitors may find your site confusing to navigate.

#### Display order

The [display order](display-order.md) is a number of your choice. Items with high display order values will display after items with low display order values when attached to the same parent item.

#### Type

Altering the **type** of a navigation item will change the editor to show the appropriate controls for the selected type.

- **Basic**: a basic navigation item is a simple link, or a parent of other links. A text box labelled *Link* will be shown, and the link should be entered either as a full `http://example.com/path/to/my-page.html` style URL, or as a `{{ link('whats-new/posts') }}` style expression if the target page is an internal XenForo page.
- **Node**: this special navigation type will show the node that you select in the *Node* menu, along with a pop-up menu showing the nodes contained within that selected node. It can be useful for providing direct links to nodes/forums that might otherwise not be readily discovered. Note that permissions are applied, and users who can not normally view the selected node or any of its children will not see the node(s) in the navigation item either.
- **Callback**: this advanced option will call the PHP class and method specified in the *Callback* fields. This one is best left for add-on developers.
