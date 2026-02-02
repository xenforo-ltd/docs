# Styling

While XenForo ships with a stylish and modern appearance, there will always be sites that need their forum to match the style of their existing material and theme, and will need to modify XenForo to fit in.

XenForo is equipped with a range of tools to allow you to re-style your forum in as subtle or radical a fashion as you wish.

You may want to simply adjust some colors, or you might want to dramatically change the way everything looks by making completely custom HTML templates.

The tools available for style adjustment and modification range from simple, easy-to-use controls to adjust things like colors, fonts and sizes, right through to code editors for experts, that allow you to edit the CSS and HTML upon which the entire system is built.

## Styles

All stylistic tools in XenForo are bundled into collections of data called **Styles**, which are sometimes referred to as *Skins* or *Themes*.

Styles consist of HTML templates, CSS/LESS templates and **Style properties**, which are collections of values that are used to inject stylistic choices into templates. More on style properties later...

When you first install it, XenForo comes with a single default style, called *Default style*. You are free to edit any aspect of this style, but you could also make use of another of XenForo's abilities, namely the ability to have *multiple* styles available.

By adding a second style, you can freely switch your view between your new style and the default style to ensure that everything is going to plan.

### Pre-built styles

There are a host of designers and programmers producing styles for the XenForo system, so you may be able to find a professionally-designed, pre-built style that meets your needs.

Applying a pre-built style to your own XenForo installation takes only a few minutes and is easy enough for most site administrators to manage.

[A wide variety of pre-built styles are available in the XenForo Resource Manager](https://xenforo.com/community/resources/categories/styles-2-x.45/).

### Setting the default style

When your site has multiple styles installed, you can specify which of the installed styles will be served to visitors who have not specified their own preference.

To do this, visit the **Appearance** section of the main XenForo options system, and select the style you want to act as the default using the **Default style** option.

:::note
The default style for your site need not be the style called *Default style* - this is just the name applied to the style that is created with your initial XenForo installation, which you can rename if you wish.
:::

You can also specify the default style for HTML email in the same place.

## Style inheritance

When you add a new style, you will need to choose whether or not your new style will be a child of an existing style.

If you choose not to have a parent style, your new style will automatically inherit all of its data from the invisible *Master style*, which is normally hidden from view.

Alternatively, if you create a new style as a child of the *Default style*, it will automatically inherit all of the data from the *Default style*, which in turn inherits its data from the *Master style*. Any changes made at any time to the *Default style* will instantly be inherited by your new child style, **unless** the child style has itself made modifications to the data item(s) that were changed in the parent style.

Confused yet?

Don't worry, it's much more simple than it sounds.

Let's look at an example, in which we are going to work with a style called '*My style*', which was created as a child of *Default style*.

 - (1) Default style
    - (2) My style

We are going to imagine that we are changing the value of a Style property called `textColor`, which controls the color of most of the text seen within XenForo.

Before we change anything at all, the value of `textColor` is `@xf-paletteNeutral3`, which is itself a reference to a color in the XenForo palette that is a very, very dark grey. It's basically black.

This value is set in the *Master style*, is inherited by the *Default style*, and is therefore also inherited by *My style*.

Now let's imagine that we change the value of `textColor` in *Default style* to `blue`. As soon as we do this, the effective value of `textColor` in *My style* will also become `blue`, because the change is inherited from *Default style*.

### Changing inheritance

In the example above, *My style* inherited a customized `blue` value for the `textColor` style property from its parent style, *Default style*.

However, this `blue` value was only ever inherited, so if we went back to the style manager and changed *My style* to have no parent, the `blue` customization would disappear from *My style*.

### Overriding inheritance

With *My style* inheriting `blue` as the value of `textColor` from its parent, *Default style*, it is possible to override this inheritance by customizing the value within *My style* itself.

If we edit the value of `textColor` in *My style* and set it to `red`, the `blue` value will no longer be inherited from *Default style*, because *My style* has its own customized value, which overrides the inherited value.

### Inheritance summary

XenForo's style inheritance abilities allow you to build collections of styles that inherit from one another, so you only need to make minor changes in child styles, which inherit customizations from their parents.

Consider the following tree of styles, where each style's name describes a customization made to that style.

 - (1) Default style
    - (2) Custom header
	    - (3) Big footer
	        - (5) Red background
	        - (6) Blue background
	    - (4) Small text
	        - (7) Red background
	        - (8) Blue background

In this example, *(2) Custom header* is a style that customizes the appearance of the main site *header* in order to fit in stylistically with the rest of the site.

Both *(3) Big footer* and *(4) Small text* inherit this custom header from their parent style. Each of these styles has two child styles, which customize the color of the background to red or blue. All of these styles inherit the custom header from the top-level custom style.



