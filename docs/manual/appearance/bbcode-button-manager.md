# BB code button manager

When composing a message with the XenForo message editor, controls are provided to allow users to easily format their text with styles of their choice.

The layout of the buttons within the editor is customizable through the BB code button manager, located in the Admin control panel at **Content > BB code > BB code button manager**.

On the main button manager page, several *editor toolbars* are listed, along with a variety of *dropdowns*.

### Editor dropdowns

A dropdown is a button that expands when clicked to reveal additional buttons.

Click on an existing dropdown or click **Add dropdown** to enter the dropdown editor.

Within the dropdown editor, you must provide a command ID (for internal system identification use only) together with a title and a [Font Awesome](https://fontawesome.com/icons?d=gallery) icon class name, such as [`fa-align-center`](https://fontawesome.com/icons/align-center?style=solid), which will be used as the graphical representation for the button.

To define the contents of the dropdown, drag buttons from the **Available buttons** area into the **Dropdown buttons** area and arrange them as you see fit. The first icon shown will be displayed first in the dropdown.

When all edits are complete, hit the **Save** button to commit changes.

### Editor toolbars

With each toolbar is listed a size range. This range denotes the width in pixels of the browser window at which size the toolbar will be shown.

The actual ranges are subject to change, but at the time of writing the *large* toolbar is shown when the browser window measures 900 pixels wide or more. Shrinking the toolbar below this size will activate the *medium* toolbar, until the width of the window is less than 575 pixels, at which point the *small* toolbar will be used. An *extra small* toolbar is used below viewport widths of 420 pixels.

Clicking on any toolbar will open the editor for that toolbar.

At the top of the window is a 'pool' of **Available buttons and dropdown menus**. Any of these buttons and dropdowns may be dragged from the 'pool' into one of the available slots below, the buttons within which can be dragged into whatever order is appropriate.

Each slot has a set of controls, within which it is possible to define the *alignment* of the group and the number of *buttons visible*, which controls the number of buttons shown for each toolbar group before additional buttons are pushed to the 'more' toolbar, accessed with the vertical ellipsis control next to each button group.

A preview of the finished toolbar is displayed at the bottom of the page.

When all edits are complete, hit the **Save** button to commit changes.