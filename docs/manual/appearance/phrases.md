# User interface text: Phrases

All the user interface text in XenForo is stored in predefined text snippets called *Phrases*.

When XenForo needs to place some text on a page, rather than calling the text directly, it calls for the appropriate phrase that contains the desired text.

For the most part, phrases are named according to their content, so a phrase whose content is `Please click the 'Save' button` would most likely be stored in a phrase called `please_click_the_save_button`.

Sometimes, when the text in a phrase is too long to be reasonably used as the phrase name, or if the phrase must serve a specific programmatic task, the phrase may have a name that describes its content, rather than directly reflecting its content. For example, the text that explains the use of the *Background size* parameter in the [Smilie editor](../content/smilies.md#smilie-editor) is named `background_size_explain`.

When a phrase needs to include an important variable, like the name of a piece of content it is describing, the variable will be represented in the phrase name with a letter, like `x` or `y`. For example, `your_thread_x_has_been_updated`.

Within the phrase, the variable is represented as a word in curly braces:

`Your thread, {name} has been updated.`

XenForo template syntax will take care of inserting the correct value into the `{name}` variable.

### Phrase editor

The phrase editor is your primary tool to edit the content of phrases in any language. It can be found in the *Appearance > Languages & phrases > Phrases* section of the Admin Control Panel.

Upon opening the phrase editor and selecting the appropriate language from the drop-down menu, you will see a list of phrases you can edit. You may filter or search the list by typing into the filter box at the top of the list. Note that this is a special filter box, which not only filters the list of phrases currently shown on screen, but also searches all other pages for matches to your filter text.

Click on a phrase to edit it and you will find yourself on a page that shows not only the editable text, but also a copy of the *Master value* for your reference.

When you are finished editing the text, hit the **Save** button to save the text but remain within the editor for further edits, or **Save and exit** to save your work and return to the phrase list.

The results of your changes will be visible as soon as a page displaying them is refreshed.

### Mass-edit phrases

You may also edit multiple phrases at the same time on the same page.

To do so, click the **Refine and translate** control at the top of the phrase list, enter any filters you need and then set the *Phrase status* options to **Unmodified** only - leave the other options unchecked.

Click the **Translate** button and you will be presented with a page showing editable versions of all the phrases that match your filter.

You may translate any of these phrases and click their **Save** button without having to leave the page, which can make for very rapid progress.

At the bottom of the page is a **More** button, to load the next batch of matching phrases.

### Phrase inheritance

As properties of languages, phrases inherit their content from parent languages unless they have been customized in the current language.

### Upgrading with customized phrases

Unlike templates, phrases can only contain simple data, so it is highly unlikely that customizing or translating a phrase will result in broken functionality after a XenForo upgrade, provided that all `{variable}` variables that existed in the original version of the phrase remain in your customized or translated version.