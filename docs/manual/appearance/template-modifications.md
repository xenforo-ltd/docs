# Template modifications

As an alternative to customizing templates directly, XenForo also offers a system called *Template modifications*, which works by allowing you to pick a template, specify a section of the template to find, and a way to insert new template code to modify the specified section.

In the template modification manager, you will find a list of all template modifications currently in use, grouped by the [add-on](../configuration/add-ons.md) which has defined them. You may quickly disable and re-enable any template modification by using the toggle gadget in the list.

Clicking on one of these modifications, or clicking the *Add template modification* button, will load the template modification editor.

Within the editor, the controls available, along with the name of the template to be modified, are as follows:

### Modification key

Use this to define a unique identifier for your modification. Letters, numbers and underscores are allowed.

### Description

Should contain a short description of the functionality of your modification, like *Adds a new tab to the member profile page*.

### Template contents

This box is for reference only, and contains the full text of the template to be modified.

### Search type

In many cases, you will want to use a *Simple replacement* here, whereby the system will search for some text and then replace it in its entirety.

You may also use a regular expression if you want to do more complex matching, or if you want to maintain some or all of the matched text in your modification.

Advanced users may specify a PHP callback to have full control over the way the modification operates.

### Find

Enter the text here that the modification is going to replace, the type of text you specify should match the requirements of the *Search type*.

Many XenForo templates include special `<!--[XF:name_goes_here]-->` place holders in useful locations, which allow you to quickly and easily enter the token code as the *Find* text for your modification.


### Replace

Here, you should enter the HTML code that will replace the text you specified in *Find*.

As this HTML will be inserted into a template, you may make full use of XenForo *template syntax* within your code.

If you would like to include the text that was found along with your new HTML, you can include by using the token `$0` in your HTML.

If your *Find* text was a regular expression, any additional matches from that expression can be inserted using `$1`, `$2` etc.

### Execution order

Several template modifications may attach to the same template. The *Execution order* value is used to determine the order in which these modifications will be applied. Modifications with lower execution order numbers will run before those with higher values.

:::note
:::
Even though template modifications are the safest way to customize XenForo templates, it is still wise to double-check that your modifications have not blocked or broken any new or altered functionality if the templates to which they attach have been modified following a XenForo upgrade.
