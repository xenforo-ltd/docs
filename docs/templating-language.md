The XenForo 2 templating language is heavily inspired by the [Moustache Templating Language](https://github.com/bobthecow/mustache.php), and uses many of the same principles.

## Best Practices
XenForo tags, by convention, are `lowercase`. If you define your own, custom, tags you should absolutely define them in lowercase. All custom tags added by XenForo are prefixed with the `xenforo:` namespace.

The name of your XenForo tag and it's class should, by convention, be in `UpperCamelCase`.

So, for example, if you defined a tag, `addon:myelement`, the tag class for your element - and the tag's name would be `MyElement`. (Where the class is `Vendor\Addon\Template\Tags\MyElement`.)

In general, it's a good idea to consider the XenForo Custom Tags as [XML Namespaced Tags](https://www.w3schools.com/xml/xml_namespaces.asp), as they share many of the same characteristics.

## Useful Information

### Commenting up your Templates
If you want to comment out some template code (or an inspirational message) that you don't want viewable in the final page source, you can use the `xf:comment` tag.

```html
<xf:comment>
If you stop seeing the world in terms of what you like
and what you dislike and saw things for what they truly are in themselves,
you will find a great deal more peace in your life.
</xf:comment>
```

## Template Macros
Template Macros are a very powerful aspect of the XenForo Templating Language.

You should generally use a macro any place you would use a function or subroutine in a programming language.  
For non-programmers, I'd summarize this as: **either** use a macro any place you want to produce the same thing multiple times in multiple different files **or** to produce something different under different circumstances (this would probably make more sense if you check the guide on defining a macro).

!!! warning
	For readability reasons, you should not use a macro tag as a variable. You should instead use the Set tag and treat the variable as you would any template variable.

### Defining a Macro
```html
<xf:macro
    name="my_macro_name">

    <!-- Your macro content -->

</xf:macro>
```
At its simplest, a macro can be defined with a `name` attribute and the content you want repeated inside the macro tag.

!!! note
	When you're using a macro in multiple files, it's best practice to put the macro in it's own template.

#### Macro Arguments
```html
<xf:macro
    name="my_macro_name"
    arg-message="My amazing macro message!">

    <h1>Message</h1>
    <p>{$message}</p>

</xf:macro>
```
In this example, a macro is defined with a default value for `arg-message` (`My amazing macro message!`).
This value would be overridden if the macro was called with the message argument.

!!! note
	Whilst it's not necessary to set a default value for an argument, it's best practice to add a default value anyway as this will prevent a template error.

### Including & Using Macros
```html
<xf:macro template="my_macro_template" name="my_macro_name" />
```
At it's simplest, you include a macro by setting the `name` attribute and leaving the tag empty.

!!! note
	When using a macro tag, you should use the self-closing form of the tag to allow someone to more easily distinguish the difference between a definition and usage of a macro.

#### Macro Arguments
You can also provide arguments to the macro:

```html
<xf:macro template="my_macro_template" name="my_macro_name" arg-argName="argValue" />
```

Where `argName` is the name of the macro argument.

!!! note
	You should use `lowerCamelCase` for your macro argument names.
