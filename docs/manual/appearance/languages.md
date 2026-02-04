# User interface text: Language

All user interface text in XenForo can be translated into other languages without having to edit any HTML or templates at all.

This is achieved through a system of *[Phrases](phrases.md)*, which in turn belong to *[Languages](languages.md#languages)*. A single XenForo installation may have multiple languages available, and these can be selected by your visiting users.

## Languages

In XenForo, *Languages* function in a similar manner to *[Styles](styles.md)*, in that they represent a collection of data that is grouped together for ease of management.

### Pre-built languages

While you can translate the entire XenForo system text yourself, you may find that the translation you want already exists.

Installing a new language is a simple task and can be managed by most administrators.

If you complete your own translation, you might want to use the *Export* tools available in the language manager, and add your translation to the collection of language translations already available in the [XenForo Resource Manager](https://xenforo.com/community/resources/categories/translations-2-x.48/) for the benefit of other XenForo administrators.

### Setting the default language

When your site has multiple languages installed, you can specify which of the installed languages will be used for visitors who have not specified their own preference.

To do this, visit the **Appearance** section of the main XenForo options system, and select the language you want to act as the default using the **Default language** option.

By default, all installed languages are selectable by your visitors, but you may prevent selection of specific languages with a toggle on the **Appearance > Languages** list page.

### Language inheritance

Also like styles, languages in XenForo can be arranged into parent/child relationships, such that a child language may inherit all of the data from a parent language, and customize only those items that require change.

A simple example of this would be UK English, which can inherit most of the settings from US English, except for a few differences like *color* vs *colour* and *7/28/2010* vs *28/07/2010*.

A full description of the way inheritance works can be found in the [styles section of this manual](styles.md#style-inheritance).

### Language settings

When you click on a language in the language manager, you will be presented with the language editor, where you can define some basic rules for the language, like the locale, the text direction (left-to-right or right-to-left), the decimal point character, the week start day and the date format.

These settings have wide-ranging effects, so ensure that you set them carefully.

