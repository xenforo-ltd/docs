# How permissions are applied

There are multiple permission sets that come together to define a user's final set of permissions. Under the **Groups & permissions** section, these include:

* **User group permissions**: the permissions defined for each user group you have created
* **User permissions**: an optional set of additional permissions to apply to specific users. This is used for things like moderator permissions. However, if you are ever going to apply the same permissions to multiple users, we recommend creating user groups.
* **Node permissions**: these are override permissions for specific nodes. This will be discussed more in the next section.

Add-ons may define additional permission types. These will behave similarly to node permissions.

To determine the global permissions for a user, we collect the permissions from all the groups they're a member of and any custom user permissions. The final value for a permission is then determined by which value has the highest priority.

### Permission value priority

As a user may be in many groups and have their own custom permissions, determining the final permission value is done by determining which value has the highest priority. The priority is defined as: (highest priority first)

1. <span style={{color: '#c84448'}}>**Never**</span>: this is an overriding no and the permission is not granted. It always trumps other values and should only be used in specific scenarios.
2. <span style={{color: '#3d793f'}}>**Yes**</span>: the permission is granted.
3. <span style={{color: '#ecb25e'}}>**No**</span>: the permission is not granted.

To make this clearer, here are some examples of what permission would "win" in various scenarios:

* <span style={{color: '#ecb25e'}}>**No**</span> + <span style={{color: '#3d793f'}}>**Yes**</span> = <span style={{color: '#3d793f'}}>**Yes**</span>
* <span style={{color: '#ecb25e'}}>**No**</span> + <span style={{color: '#c84448'}}>**Never**</span> = <span style={{color: '#c84448'}}>**Never**</span>
* <span style={{color: '#3d793f'}}>**Yes**</span> + <span style={{color: '#c84448'}}>**Never**</span> = <span style={{color: '#c84448'}}>**Never**</span>

For numeric permissions, the highest value from all of the groups and user permissions is used.

:::warning
:::
"Never" is a powerful feature but it can cause problems if used inappropriately. It is designed for being applied to groups that are used for user discipline, such as by removing permissions to users that have a certain number of warning points. Do not use it for the default registered group!

## Node permissions

Node permissions allow you to define permissions that will only apply to a specific node. Like the global permissions, these can be applied to user groups and individual users.

Initially, these permissions are inherited from the global permission values. If you customize a permission for a particular node, that new value will now be inherited by any child nodes as well, unless they too customize the value.

### Differences from global permissions

Node permissions are very similar in concept and application to the global user group and user permissions and the examples given above.

However, instead of defaulting to <span style={{color: '#ecb25e'}}>**No**</span>, node permissions default to <span style={{color: '#a0a0a0'}}>**Inherit**</span>. If any custom permission value is set, it will be used instead of the inherited version; essentially, <span style={{color: '#a0a0a0'}}>**Inherit**</span> is the lowest priority permission value.

:::note
There is one exception to this rule. If the inherited value is <span style={{color: '#c84448'}}>**Never**</span>, it cannot be overridden, even by child nodes.
:::

### Private nodes

When setting the permissions for a node, you have the option to make the node private. Enabling this will prevent all access except where explicitly granted.

This is ideal for creating staff-only forums. To do this, you would make the forum private and then set **View node** to <span style={{color: '#3d793f'}}>**Yes**</span> for the administrative and moderating user groups.

:::note
The *Private forum* setting **only** affects the *View node* permission, without which all access to the node is denied. If a group is granted *View node* permission to a private node, the remainder of its permissions, such as *Post new thread* and *Post replies* are inherited from their standard user group permissions - there is no need to explicitly grant these permissions again using node permissions.
:::

## Confirming permissions are correct

To confirm that a user is receiving the permissions you expect, use the **Groups & permissions > Analyze permissions** system. This allows you to see the final yes/no value for each permission, along with all of the permissions that were considered leading up to that decision.

This analysis can be done for a user's global or node-specific permissions.