# Thread prefixes

Thread prefixes allow you to apply pre-defined options to individual threads which is displayed before the thread title. This text can be styled in various ways to allow users to easily identify groups of threads based on their prefix.

Thread prefixes can be setup in the control panel under **Forums > Thread prefixes**.

When viewing a forum, users can filter based on individual prefixes. This makes them very powerful and able to fulfill many roles. For example, on the XenForo community, we use prefixes for:

- Allowing users to select the version their question relates to.
- Tracking the status of bug reports and suggestions.
- Allowing users to select the type of resource they're looking for (add-on, style, etc.).

The prefix is essentially part of the thread title. It will be displayed with the title in virtually all contexts and will be indexed by search engines.

:::note
A thread may only have a single prefix at any time.
:::

### Prefix descriptions

From XenForo 2.2 onwards, thread prefixes may have *descriptions*. These are used as helpers for users to understand their use.

Two description fields are available: [Description](thread-prefixes.md#description) and [Usage help](thread-prefixes.md#usage-help).

#### Description

This field will be displayed underneath the title of a thread that uses the current prefix. Its purpose is to add clarity for readers to the way in which the prefix has been applied. For example, a **Sold** prefix might have a description such as *This item has been sold and is no longer available to purchase*.

#### Usage help

This field is intended to help the thread *creator* when selecting a prefix for their new thread, so that the meaning of each prefix can be explained prior to saving the thread with the prefix attached.

### Availability

When configuring a thread prefix, you can control who can use it and where it can be used.

- If you select specific groups in the **Usable by user groups** option, only a user who is a member of any of the selected groups will be able to create a thread with this prefix.
- A prefix will only be usable within the forums chosen in the **Applicable forums** option.