# Widgets

Widgets are small blocks of content that appear around the main body of your site.

They can contain dynamic content, such a list of users currently online, or the most recent discussions posted on your forum.

XenForo ships with a selection of useful widgets and installs with a collection of them deployed to various site locations.

Standard widgets included with XenForo include, amongst many others:

1. New posts
1. Online statistics
1. Newest members
1. Today's birthdays

Widgets consist of four components:

1. The widget definition
1. A unique identifier, or *widget key*
1. The position to which the widget is attached
1. The parameters for the data to be displayed within the widget

The widget manager displays a list of all widgets that are configured on your site, grouped by their defined positions.

From here, you can add new widgets, or delete existing ones using the delete gadget.

## Widget definitions

Widgets definitions are usually created by developers, who build a widget that can take a number of parameters in order to show dynamic content.

When you hit *Add widget* from the widget manager, the first thing you will be asked to decide is which widget definition you would like to use for your new widget deployment.

For the most part, widget definitions have fairly self-explanitory names, so you can just choose the most appropriate one from the menu.

Behind the scenes, the widget definition will reference PHP code that does all the work to fetch the necessary data for your widget, and format it into the final display that you see on screen.

Once you have selected a widget definition, you will need to give it a unique ID or key, which the system will use to tie together all of your widget configuration.

## Widget positions

Every widget needs a place to live.

Widget positions are defined within XenForo templates, and registered in the database. Once a position has been created and registered, it can be used for any widget.

After you have chosen a widget definition, you can select one or more widget positions in which the widget will display. You should try to avoid having the same widget shown in multiple places on the same page, if you can possibly avoid it.

Like widget definitions, widget positions have descriptive names that should give you a good idea of where the position is located.

When you select a widget position, you will also be prompted to specify a [display order](display-order.md) for this widget within the selected position, so that you can have it display above, below, or in amongst any other widgets that are also attached to the same position. As usual, widgets with higher display order values are displayed after those with lower display order values.

## Widget parameters

Each widget definition defines a list of parameters it can accept in order to control the data it will fetch and display.

These parameters are laid out in the widget editor, and may take the form of controls for the maximum number of items to fetch or specific switches to limit data results to those that match a particular criteria.

Pay close attention when providing parameters to your widgets, as they can have a dramatic effect upon the final output of your widget.

## Special widget definitions

XenForo also comes with a two special widget definitions, which are designed specifically for your own content.

### HTML widget

The HTML widget doesn't do any extra PHP processing behind the scenes, nor does it fetch any data. Its sole purpose is to be a vehicle for an HTML snippet that you enter into the *Template* field of the widget editor.

You can include any HTML, and you may also use XenForo *template syntax* if you wish.

There is also an *Advanced mode* option, which will omit the usual block container for the widget HTML. If you use this mode, it is entirely your responsibility to ensure that the widget HTML is properly contained and appropriately styled to fit with your site.

### PHP callback widget

The PHP callback widget does not include a box for you to define HTML, it offers only a *Class* and *Method* controls, which allow you to have the widget call custom PHP code, which will be responsible both for fetching any data and for rendering the final HTML.

This is an advanced developer option.
