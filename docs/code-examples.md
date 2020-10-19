Appendix: Code Examples

There are those that are new to XenForo that wish to learn how to develop their own add-on or change a few things in a template. This page acts as a general example page to give you an idea of what can be used in files and templates.

# Permission Check

This code can be used in your Controller PHP file to check for proper permissions before allowing access to the page in which case if they do not have permission it will show permission denied page.

```PHP
protected function preDispatchController($action, ParameterBag $params)
    {
        $visitor = \XF::visitor();

        if (!$visitor->canViewAddonPage($error))
        {
            throw $this->exception($this->noPermission($error));
        }
    }
```

The above example uses an if statement to check for proper permission and throws an error exception if the user does not have permission. Within that you have `!$visitor->canViewAddonPage`, this loads the user data then calls the Permission ID for the permission you should have added already via Admin Area -> Develepment (test board must be in debug mode) -> Permission Definitions. You can name the Permission Group and Permission ID the same but that is only ok in the case of a single permission. If you have multiple permissions for a group such as view page, edit page, delete page then name the Permission Group \`addonPagePerms\` for example then label the Permission ID canViewAddonPage, canEditAddonPage, canDeleteAddonPage then you would use the following in this case to call those permissions:

### Can View Permission

```PHP
protected function preDispatchController($action, ParameterBag $params)
    {
        $visitor = \XF::visitor();

        if (!$visitor->hasPermission('canViewAddonPage', 'canViewAddonPage'))
        {
            throw $this->exception($this->noPermission($error));
        }
    }
```

### Can Edit Permission

```PHP
protected function preDispatchController($action, ParameterBag $params)
    {
        $visitor = \XF::visitor();

        if (!$visitor->hasPermission('canEditAddonPage', 'canEditAddonPage'))
        {
            throw $this->exception($this->noPermission($error));
        }
    }
```

### Can Delete Permission

```PHP
protected function preDispatchController($action, ParameterBag $params)
    {
        $visitor = \XF::visitor();

        if (!$visitor->hasPermission('canDeleteAddonPage', 'canDeleteAddonPage'))
        {
            throw $this->exception($this->noPermission($error));
        }
    }
```

## Loading Custom Options

With permissions comes options. Add-ons benefit from options in a manner that an admin using the add-on can enable/disable a specific feature of the add-on. The below are examples on loading your own created options.

### Loading Options Variable in PHP File

```PHP
$options = \XF::options();
```

You can now use the `$options` variable to call your own option in a PHP file. So let's say you have added an option group and now you're adding your first option:

> Option ID: addonTitle\_example\_option  
> Add-on: Select the add-on this option belongs to from the dropdown  
> Title: Give your option a descriptive title such as Enable Example Feature  
> Explanation: Describe in more detail what this option is meant to control  
> Edit Format: This is where you select the type of option this is, enabling features would just be an On/off check box.  
> Format Parameters: In the situation of On/off check box you would leave this blank but don't worry this page will be edited later to include even more option examples.  
> Data Type: There are various data types that can be selected but for now select Boolean  
> Default Value: 0 for off, 1 for on by default after installation of the add-on  
> Array Sub-options: Leave blank  
> Validation Callback: Leave blank  
> Display in Groups: Select the group you created prior to creating your first option then select the order to display it.  
> Show in advanced mode only: Leave this unchecked  
> Just click save and your first option has been save

Now that your first option has been created, we can now call it in a PHP file using the following code after you have initiated the options variable above.

```PHP
// Short hand variable
$exampleOption = $options['addonTitle_example_option'];

// Long hand
$options['addonTitle_example_option'];
```

Honestly, if planning on using the option multiple times in the code, it is a good to assign the option to a variable using short hand above.

**NOTE:** *This page is in no way complete and will continually be updated with examples as they are provided by developers that contribute to this page.*