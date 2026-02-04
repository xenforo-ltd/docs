# Templates

The final output of all XenForo pages is controlled by *Templates*. Templates contain either HTML or CSS/LESS, along with special language enhancements for XenForo called *[template syntax](https://xenforo.com/docs/dev/template-syntax/)*, which allow data to be manipulated directly within the templates rather than having to write PHP code to do the job.

Templates containing CSS/LESS styling rules have a `.less` or `.css` file extension and do not contain HTML. They serve as containers for rules that include [style properties](style-properties.md), and define how the HTML in the remaining templates should be displayed. The values of style properties within LESS/CSS templates are referred to using the `@xf-stylePropertyName` system.

The HTML templates contain the markup that presents your XenForo data to the world, and can contain PHP variables `{$variableName}`, special XenForo tags `<xf:tagname ...>` and XenForo template functions `{{ functionName($arg1, $arg2, ...) }}`.

All templates can be **customized** using the template editor, but you should be aware that careless edits can break important site functionality if you don't know what you're doing.

When you customize a template, the changes are saved and will not be overwritten unless you specifically instruct the system to do so. A customized template can be **reverted** to its original value at any time with a couple of clicks.

### Template inheritance

As with style properties, templates are [inherited](styles.md#inheritance-summary) from parent styles unless they have been customized in the current style.

#### Upgrading with customized templates

During an upgrade, no customized templates will be overwritten, so you should check to ensure that your customizations are both compatible with the new version of XenForo, and also support any and all new functionality. A detailed discussion of this can be found in the [upgrade section of the manual](../installing-and-upgrading/upgrade.md#upgrading-with-customized-templates).

#### Alternative: template modifications

If you want to make relatively simple edits to templates, you may want to check out the [template modifications system](template-modifications.md) instead of directly customizing the templates themselves.