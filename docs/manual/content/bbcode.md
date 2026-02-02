# BB Code

BB code is a widely-used system of  markup that allows text to be formatted with different fonts, colors and sizes, along with other abilities like emboldening or italicising text. It is loosely based on [HTML](https://html.spec.whatwg.org/) markup, so for example the BB code to define bold text is `[b]`, and you would use it like this to use it to embolden the word *bold*:

`This message contains some [b]bold[/b] text.`

It can also be used for more complex structures, like quoting other users' messages, adding spoilers or blocks of code. In these instances, the BB code may be given an option, like this:

`This message contains some text in [font="Helvetica"]a font called Helvetica[/font]...`

## Custom BB codes

In addition to the standard BB codes that come with XenForo, you may also define your own.

The custom BB code manager lists all custom BB codes available on your forum, and allows you to create your own. You may also delete or temporarily disable any custom BB codes using the toggle and delete gadgets available here.

You may import and export multiple custom BB codes using the controls at the top of the manager page.

### Custom BB code editor

Clicking the title of a custom BB code will take you to the editor for that BB code, within which you can lay out exactly how you want your BB code to function.

In this example, we will create a BB code that will draw a box around the tagged text, and allow the user to specify a color for the box.

We will call the BB code 'box', and aim to be able to convert this text:

Input: `[BOX="red"]Here is some text in a red box[/BOX]`

into this HTML:

Output: `<div style="background-color: red">Here is some text in a red box</div>`

#### BB code tag

Enter the key word that will trigger your BB code here. In our example, this is 'BOX'.

#### Title

We'll call this 'Colored box'

#### Replacement mode

For our example, we wil use a *simple replacement*.

A PHP callback may be used for more complex replacements that involve running PHP code to work out what the output HTML should be. This is more of a developer option. If this is used, the callback should be specified using the *Class* and *Method* fields provided below.

#### Supports option parameter

As we need the user to define a color, we must use *Yes* here.

If the BB code we were defining did not need, or would not support an option, we would set this to *Optional* or *No*.

#### HTML replacement

Here, we enter the HTML that will replace our BB code when it is used. We will need to employ the special tokens `{option}` and `{text}` to represent the value of the option and the content of the text respectively.

Our replacement HTML will be as follows:

`<div style="background-color: {option}">{text}</div>`

#### Editor icon

You may want your users to be able to simply click a button in their message editor to insert your BB code. If so, specify a [Font Awesome](https://fontawesome.com/icons?d=gallery) icon, or an image to use for your button, otherwise leave this as *None* and the BB code will only be available through being typed directly.

##### Button manager

You may customize the placement of your custom button (and all other controls) within the XenForo message editor using the [BB code button manager](../appearance/bbcode-button-manager.md).

#### Example usage and output

Use these boxes to provide examples of something that would use your custom BB code, and what that example would output. You can use the Input/Output examples provided above.

#### Allow this BB code in signatures

Some BB codes are large and obnoxious, and are not suitable for use in user signatures. You may prevent any custom BB codes from being used in signatures by leaving this box unchecked.

#### Advanced options

Under the advanced options section, you will find controls to allow you to further refine your custom BB code.

##### Option match regular expression

Allows you to define a regular expression to limit acceptable values for your *option* value. For our example, we could use a regular expression that allows only alphanumeric characters, so that only named colors could be used.

##### Within this BB code

Options here allow you to prevent smilie parsing within your BB code, to prevent line breaks being converted, to disable auto-parsing of hyperlinks and to stop parsing of any other BB codes within the text component of this BB code.

##### Trim line breaks after

You may use this option to prevent lots of white space being left after your BB code has been used. With a value of *0*, no additional line breaks will be permitted, so your HTML output should account for this.

##### HTML email and text replacements

It may be that you want a different output when the final format is HTML email or plain text. Use these boxes to define alternative outputs, using `{option}` and `{text}` as before.
