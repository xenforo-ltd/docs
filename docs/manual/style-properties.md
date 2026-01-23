# Style properties

Style properties allow administrators to quickly and easily adjust things like colors, sizes and fonts for their styles.

The values for all properties in a style are inherited from its parent style(s), unless they are specifically customized within the current style.

All properties are arranged into logical groupings on the *Style properties* manager page. Clicking on a group name will open the editor for that group of style properties.

Style properties can be any of a number of property types, depending on the data they are designed to control.

Some properties are designed to hold a single value, including the following types:

- Colors
- Text values
- Numbers with units (like 10px)
- Numbers without units
- On/off switches
- Multiple-choice options

Other properties are designed to hold a collection of values which are grouped together to define styling rules for particular interface elements. These *CSS* type properties can include values for any of the following:

- Text color, size, font and style
- Background style
- Border size, style, color and radius
- Padding and margin
- Extra CSS rules

### Colors

Let's look at a simple group of properties, which are viewable under the *Color palette* group in the style property manager.

Here, we have a number of colors defined, which are used to define the complete color palette used by XenForo to build its interface. Changing any of these colors will replace all instances of that color throughout the system.

Additionally, there is a switch to set the style type as *Light* or *Dark*. This switch is used to define how colors are modified when the system wants to mix, intensify or diminish a color. For example, if the style type is set to *Light* and the system wants to intensify a color, the color will be darkened, while the color would be lightened if the style type were set to *Dark*.

The colors set in the palette are referenced throughout the XenForo system, most importantly in the second group of properties in the style property manager, *Basic colors*.

In the *Basic colors* group, colors from the *Color palette* are assigned to roles, such as *Text color* and *Content background color*. Style properties are referenced using the prefix `@xf-` followed by the unique ID of the style property to be referenced, so to reference the style property *Neutral 3* from the *Color palette*, whose unique ID is `paletteNeutral3`, we refer to `@xf-paletteNeutral3`. You can see that in the *Default style*, the *Text color* style property (`textColor`) uses the value from this property.

### More advanced properties

From the style property manager, open the *Header and navigation* group.

Here, you will find style properties that control the appearance of the top of all your XenForo pages, including the header and the [public navigation](navigation.md#public-navigation).

Some of the properties here are single-value properties, such as the *Header adjustment color*, which defines a color for the background of the inbox and alerts area in the header.

Further down the page, you will find some advanced properties, which are arranged into logical groups.

Opening up the *Header/logo row* group, you will find a collection of properties that are used to style the main section of the header. In the *Default style*, we only make use of two values here, namely the color for any text in the header, which we set to use *Color 2* from the palette, or `@xf-paletteColor2`, and the main background color, which we set to use *Color 5* from the palette, or `@xf-paletteColor5`.

Clicking on the color chip next to the name of the color in use will open a popup, in which you can select a different color from either the basic colors range or the color palette, or you can use the *Picker* to choose a completely new color. Once you have selected the color you want, click the **Update** button, and the control will be updated. Hit the **Save** button and you will see the change you have made when you next load a page on the public-facing area of your XenForo installation.

By building a collection of customized style properties in this way, you can dramatically change the appearance of your XenForo site.
