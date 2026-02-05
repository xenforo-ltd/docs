# Nodes and forums

Nodes are XenForo's equivalent to forums and categories in other forum software packages. This term is used because a node is more generic than just a forum.

Nodes are organized into a tree (with parents and children) and form the general structure for your XenForo site. Various permissions and options can be defined for each node.

To end users, the term "node" is never used directly. Either a node-specific term is used (such as forum or category) or the general list is referred to as the "forum list".

Nodes are setup in the **Forums** section of the control panel.

## Node types

XenForo includes four different node types, each providing different functionality and appearance.

1. **Categories**: Categories are simply containers for other nodes, providing little functionality on their own. Clicking on a category will generally take you to a list of any nodes directly under it.
2. **Forums**: Forums contain threads and posts, the primary content type of a XenForo forum. These will generally display information about the number of threads, posts and the last post. Multiple types of forum are supported by XenForo, as described in the [forum and thread types section](forum-thread-types.md).
3. **Link forums / redirects**: These nodes will simply redirect users to the URL you specify in the control panel when clicked. These can be used to direct people to a particular part of your site (even a specific thread) or any other site you wish.
4. **Pages**: Pages allow you to bring general static content into your node tree. In the control panel, you can define the arbitrary HTML you wish to use to display in the page. This can be used for things like frequently asked questions or a manual/knowledge base.

## The node tree

All nodes are organized into a single tree. Each node has a single parent and can have any number of children. Nodes can be nested to whatever level you wish.

The tree is ordered through each node's "display order" value. As this can be hard to manage individually, the tree can be organized using a drag and drop system by clicking the **Sort** button on the node list in the control panel.

While you may structure your nodes as you wish, the most common and recommended setup is to use categories at the top level and then content-containing nodes within that. For example:

* XenForo support (category)
	* Troubleshooting (forum)
	* Styling and customization (forum)
	* XenForo manual (link forum/redirect)
* Official XenForo add-ons (category)
	* Media gallery (forum)
	* Resource manager (forum)
	* Enhanced search (forum)

## Node-specific moderators

Individual users may be set as moderators for a specific node. They will automatically be given moderator permissions for any child nodes as well. Moderators have more privileges than regular users, allowing them to manage messages posted and deal with undesirable content.

To set up a user as a moderator for a node, open the "moderators" menu for that node and select "add moderator". Enter the name of the user and submit. Finally, you will have to choose the permissions you want to give them.

For more details on moderator permissions, see the [moderators](../access-privileges/staff.md#moderators) section.

## Node-specific permissions

Permissions may be set up on nodes on a per-user or per-group level. This can be done by clicking the "permissions" link for the specific node you want to change on the node list. By default, permissions from the parent node will be inherited to its children, unless you override it with a more specific permission value.

Note that if a user cannot view a parent node, they will never be able to view any children of that node, regardless of whether the permissions are overridden in the child node.

Permissions are an intricate subject. For more information, please see the [permissions](../access-privileges/permissions.md) section.

## Example: creating a private staff-only forum

In this example, we will create a forum that is visible only to members of the *Administrative* and *Moderating* user groups, hiding the forum and its content from everyone else.

### Staff room forum

1. Create a new *General discussion forum* using **Forums > Nodes > Add node**.
2. Entitle the forum `Staff room` and provide any other configuration you want.
3. Save the forum.

### Restricting access

1. Back on the node list, click the **Permissions** control for the newly-created forum.
2. At the top of the page, check the **[Private node](../access-privileges/permissions.md#private-nodes)** option and hit the **Save** button below.

### Granting access

3. In the list of User groups below, click on *Administrative* to edit their permissions.
4. Using the permission matrix, set the *View node* permission to **Yes**.
5. Save the permissions.
6. Repeat these steps for the *Moderating* user group.

Your administrators and moderators will now have access to the `Staff room` forum, which will be completely hidden and inaccessible to all other users.

You may adapt this example to create forums access to which is restricted to other user groups you may create, or even [create forums to which your users may pay to subscribe](../users/user-upgrade-premium-forum.md).  
