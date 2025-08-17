# Template syntax

The XenForo 2 template syntax is a powerful tool for both developers and forum administrators, giving you complete control over the layout of your XenForo pages.

## Best practices

- XenForo tags, by convention, are `lowercase`.
- All XenForo tags are prefixed with the `xf:` namespace.

## Working with templates
### Commenting up your templates

If you want to comment out some template code (or an inspirational message) that you don't want viewable in the final page source, you can use the `xf:comment` tag.

```html title="Template"
<xf:comment>
    If you stop seeing the world in terms of what you like
    and what you dislike and saw things for what they truly are in themselves,
    you will find a great deal more peace in your life.
</xf:comment>
```

### Including another template in a template

The `xf:include` tag allows you to include a different template in your current template.

```html title="Template"
<xf:include template="my_template" />
```

Simply set the `template  ` attribute to the name of the template you want to include.

## Template macros

Template macros are a very powerful aspect of the XenForo template syntax.

You should generally use a macro any place you would use a function or subroutine in a programming language.
For non-programmers, I'd summarize this as: **either** use a macro any place you want to produce the same thing multiple times in multiple different files **or** to produce something different under different circumstances (this would probably make more sense if you check the guide on defining a macro).

:::warning
For readability reasons, you should not use a macro tag as a variable. You should instead use the Set tag and treat the variable as you would any template variable.

:::

### Defining a macro

```html title="Template"
<xf:macro
    id="my_macro_name">

    <!-- Your macro content -->
</xf:macro>
```

At its simplest, a macro can be defined with a `id` attribute and the content you want repeated inside the macro tag.

:::note
When you're using a macro in multiple files, it's best practice to put the macro in it's own template.

:::

#### Macro arguments

```html title="Template"
<xf:macro
    id="my_macro_name"
    arg-message="My amazing macro message!">

    <h1>Message</h1>
    <p>{$message}</p>

</xf:macro>
```

In this example, a macro is defined with a default value for `arg-message` (`My amazing macro message!`).
This value would be overridden if the macro was called with the message argument.

Sometimes it's necessary to mark an argument as required. This can be done by setting the argument value to `!` in the macro definition.

### Including & using macros

```html title="Template"
<xf:macro template="my_macro_template" id="my_macro_name" />
```

At it's simplest, you include a macro by setting the `id` attribute and leaving the tag empty.

:::note
When using a macro tag, you should use the self-closing form of the tag to allow someone to more easily distinguish the difference between a definition and usage of a macro.

:::

#### Macro arguments

You can also provide arguments to the macro:

```html title="Template"
<xf:macro template="my_macro_template" id="my_macro_name" arg-argName="argValue" />
```

Where `argName` is the name of the macro argument.

:::note
You should use `lowerCamelCase` for your macro argument names.

:::

## Template control structures

The XenForo 2 template syntax supports certain control structures to make certain tasks easier to achieve.

#### xf:if

The if template tag can be used to conditionally display some HTML or a part of a template.

```html title="Template"
<!-- Shows content only if a user is signed in... -->
<xf:if is="$xf.visitor.user_id">
    <!-- Do something... -->
</xf:if>
```

The if tag takes the following attributes:

- `is` - The condition which, when met, the tags contents should be shown.

:::note Conditions
    The `is` attribute supports a few logical operators:

    - `OR` - Used to link alternative conditions. (Alternatives: `||`)
    - `AND` - Used to link additional conditions. (Alternatives: `&&`)
    - `!` - Place before a condition to invert it. (Known as: 'not')
    - `XOR` - Returns true if only one of two conditions is true. (Known as: Exclusive OR)
:::

#### xf:elseif / xf:else
The else and else-if tags are used in conjunction with the if tag to conditionally display HTML in the way that the name suggests.

**Example usage of else:**

```html title="Template"
<xf:if is="$xf.visitor.is_admin">
    <!-- Content here will only be shown to Administrators... -->
<xf:else />
    <!-- Content here will be shown to anyone who is not an Administrator! -->
</xf:if>
```

**Example usage of else-if:**

```html title="Template"
<xf:if is="$xf.visitor.is_admin">

	<!-- Content here will only be shown to Administrators... -->

<xf:elseif is="$xf.visitor.is_moderator" />
    <!--
		Content here will only be shown to Moderators
		(excluding users who are also Administrators).
	-->
<xf:else />
    <!--
		Content here will be shown to anyone who is not
		an Administrator, or a Moderator.
	-->
</xf:if>
```

As you can see, once a condition has been met, the rest of the if statement is ignored. (So, in this case, if the user is an Administrator, the top `xf:if` section is run but then the rest of the if statement is ignored.)

#### xf:foreach
The for-each tag allows you to loop over an array of items, printing a block of HTML for each item.

```html title="Template"
<xf:set var="$names" value="{{ ['Patrick', 'Theresa', 'Kimball', 'Wayne', 'Grace'] }}" />

<xf:foreach loop="$names" key="$key" value="$name" i="$i">
    <p>Hello there, {$name}. This is name number {$i}. Array key of this element: {$key}</p>
</xf:foreach>
```

The for-each tag takes the following attributes:

- `loop` - The array to loop over.
- `key` - A variable name to use in the loop to get current element's array key. Can be integer (ordinary array) or string (associative array).
- `value` - A variable name to use within the loop, containing the current array item.
- `i` - A variable name to use in the loop for the current index.

:::example Example Output
    > Hello there, Patrick. This is name number 1. Array key of this element: 0
    >
    > Hello there, Theresa. This is name number 2. Array key of this element: 1
    >
    > Hello there, Kimball. This is name number 3. Array key of this element: 2
    >
    > Hello there, Wayne. This is name number 4. Array key of this element: 3
    >
    > Hello there, Grace. This is name number 5. Array key of this element: 4
:::

#### xf:set
The set tag allows you to create a reference to another variable or create a new variable. You should use the set tag anywhere you would use a variable in a programming language.

```html title="Template"
<xf:set var="$visitor" value="{$xf.visitor}" />
```

:::warning
    Do not use the Set tag for a group of elements you wish to use in multiple templates, you should instead use the Macro Tag.
:::

:::warning
    The variable name (`var` attribute) must begin with a `$`.
:::

The set tag takes the following attributes:

- `var` - The name of the variable you wish to define (essentially, the alias).
- `value` - A variable to reference to or a variable value.

##### Alternative uses

```html title="Template"
<xf:set var="$myVariableName">
    My Variable Value!
    This could be a callback, or simply a group of phrases.
</xf:set>
```

When the `value` attribute is not provided, and the tag is not empty, the variable value will be set to the contents of the tag.

!!! warning
    When you use the Set tag in this form, the value will be escaped and the resulting value will be a string.
    The `value` attribute, whilst not supporting HTML or HTML-like tags does not have this limitation.

## Template tags

### User tags

#### xf:avatar
Inserts a user's avatar in the page.

```html title="Template"
<xf:avatar user="{$xf.visitor}" size="o" canonical="true" />
```

The avatar tag takes the following attributes:

- `user` - The XenForo User object to generate the avatar for.
- `size` - The size of the image to generate. (See image sizes)
- `canonical` - Whether to use the full SEO-friendly URL. This value is only respected for `custom` avatars.
- `notooltip` - Whether the tool-tip displayed when hovering over the avatar should be disabled.
- `forcetype` - Can be used to force getting the `gravatar` or `custom` avatars by setting the value to either of those.
- `defaultname` - The username to use if the `user` attribute contains an invalid user.

:::note Image sizes
    If an avatar of invalid size is provided, the code will fallback to size '`s`'.
    
    - `o` = `384px`
    - `h` = `384px`
    - `l` = `192px`
    - `m` = `96px`
    - `s` = `48px`

#### xf:username
Displays the user's username, optionally with a tool-tip.

```html title="Template"
<xf:username user="{$xf.visitor.username}" notooltip="true" />
```

The Username tag takes the following attributes:

- `user` - The XenForo User Object to display the name of.
- `notooltip` - Whether or not the tool-tip should be disabled.
- `href` - The link to navigate to when the username is clicked.

!!! warning
    The tool-tip will not be displayed if an `href` is set, as it won't work and might be misleading to users.

#### xf:usertitle
Displays the user's title.

```html title="Template"
<xf:usertitle user="{$xf.visitor}" />
```

The UserTitle tag takes the following attributes:

- `user` - The XenForo User Object to display the user title of.

#### xf:userblurb
Displays a one-line summary of a user's profile.

```html title="Template"
<xf:userblurb user="${xf.visitor}" />
```

The UserBlurb tag takes the following attributes:

- `user` - The XenForo User Object to display the blurb of.

#### xf:userbanners
Displays the user's banners in a horizontal list.

```html title="Template"
<xf:userbanners user="{$xf.visitor}" />
```

The UserBanners tag takes the following attributes:

- `user` - The user to display the user banners of.

!!! example "Example of usage"
    ![An example result of the UserBanners tag.](files/images/example-userbanners-tag.png)
    
    An example result of the UserBanners tag.

#### xf:useractivity
Displays the status of a user, in terms of their last action and when that action occurred.

```html title="Template"
<xf:useractivity user="{$xf.visitor}" />
```

The UserActivity tag takes the following attributes:

- `user` - The user to display the status of.

##### Format

> Viewing page _Latest Case Files_ · 4 minutes ago

The format is **[Activity Name]** **· [Time]**


##### Format

> FBI Consultant · 43 · From United States of America

The format is **[Role / Custom Title] · Age · Location**

### Navigation tags

#### xf:breadcrumb
Modifies the page breadcrumb.

```html title="Template"
<xf:breadcrumb href="{{ link('my_page') }}">{{ phrase('my_page_name') }}</xf:breadcrumb>
```

The breadcrumb tag takes the following attributes:

- `href` - The link to set for the final element in the breadcrumb.

The value of the tag can be used to set the name of the final element in the breadcrumb.

##### Alternative uses
```html title="Template"
<xf:breadcrumb source="$category.getBreadcrumbs(false)" />
```

You can also define your own breadcrumb programmatically by calling your function in the `source` attribute of the breadcrumb tag.

The `source` parameter essentially takes an array of objects with `href` and `value` attributes (multidimensional array), where each object is a breadcrumb element.

:::note
If you want to change the root breadcrumb, you can change the "Root breadcrumb" option in the "Basic board information" options section.

:::

#### xf:title
Sets the page's title, both on the page in the `h1` tag and in the browser tab.

```html title="Template"
<xf:title>{{ phrase('my_page_title') }}</xf:title>
```

:::note Further notes
    Whilst the title can, of course, be hardcoded, it is **highly recommended** that you use a phrase, both for internationalization and for the added customizability on the site administrator's end.
:::

#### xf:sidenav
See [Sectioned Tags](#sectioned-tags).

#### xf:sidebar
See [Sectioned Tags](#sectioned-tags).

### UI Component tags

#### xf:button
Adds a button element with the appropriate classes and optionally an icon.

```html title="Template"
<xf:button icon="save"></xf:button>
```

The button tag takes the following attributes:

- `icon` - The icon class to apply to the button. (See button icons)

:::note "Button icons"
    By default, XenForo buttons support the following icons (created with CSS):
    
    **Content & editing**
    - `add`, `edit`, `save`, `delete`, `undelete`, `copy`, `move`, `merge`, `convert`
    
    **Navigation**
    - `prev`, `next`, `markRead`, `list`
    
    **User actions**
    - `login`, `reply`, `quote`, `conversation`, `notificationsOn`, `notificationsOff`
    
    **Moderation**
    - `approve`, `unapprove`, `stick`, `unstick`, `lock`, `unlock`, `disable`
    
    **Files & media**
    - `upload`, `download`, `import`, `export`, `attach`
    
    **Other**
    - `config`, `refresh`, `translate`, `sort`, `search`, `rate`, `vote`, `result`, `history`, `cancel`, `preview`, `purchase`, `payment`, `bolt`
:::

#### xf:likes
Displays the number of likes on a post and a few of the users who've liked the post.

```html title="Template"
<xf:likes content="{$post}" url="" />
```

The likes tag takes the following attributes:

- `content` - The `XF\Entity\Post` or `XF\Entity\ProfilePost` entity to display the 'likes' text for.
- `url` - The URL to display when the 'likes' text is clicked.

##### Format

> You, tlisbon, kcho and 2 others

The format is [:thumbsup: `abc` and x others] (where the :thumbsup: 'thumbs up' emoji represents the 'likes' icon and `abc` represents the usernames of the last three users who liked the post.)

#### xf:widget
Includes a widget in the page, or adds a widget to a widget position.

```html title="Template"
<xf:widget key="widget_name" />
```

The widget tag takes the following attributes:

- `key` - The widget key, as defined in the widget settings.
- `position` - If set, changes the position that the widget will be rendered.
- `class` - Not to be confused with HTML class, this is the PHP class containing the widget definition.
    - `title` - When the `class` attribute is used, you can use the `title` attribute to set the widget title.
    - You can also provide widget-specific options as attributes when the `class` attribute is used.

:::warning
    The `class` tag cannot be used in conjunction with the `key` tag.
:::

### Asset tags

#### xf:css
Includes a CSS or LESS template file.

```html title="Template"
<xf:css src="mycss_file.css"  />
```

The CSS tag takes the following attributes:

- `src` - The CSS or LESS template file to include.

##### Alternative uses

```html title="Template"
<xf:css>
    html, body {
        font-family: "Roboto", sans-serif;
    }
</xf:css>
```

If the CSS tag is not empty, anything in the tag will be converted into inline CSS.

:::note "Further notes"

    > For [CSS], forget about calling them as files. Copy and paste them into new templates.
    
    Chris D, XenForo developer **Source**: [https://xenforo.com/community/threads/including-external-library-js-and-css.136153/post-1185631](https://xenforo.com/community/threads/including-external-library-js-and-css.136153/post-1185631)
:::

#### xf:js
Includes a JavaScript file.

```html title="Template"
<xf:js src="myaddon/vendor/scripts/myjs_file.js"  />
```

The JS tag takes the following attributes:

- `src` - The JS file to include in the template.
- `prod` - The JS file to include in the template, only for production mode.
- `dev` - The JS file to include in the template, only for development mode.
- `min` - Whether or not to include the minified version of the file. (Replaces `.js` with `.min.js`) - Respected only in production mode.
- `addon` - Whether or not the development JS URL should be used. - Respected only in development mode.

:::warning
The `src` tag cannot be used in conjunction with either the `prod` or `dev` tags.

:::

##### Alternative uses

```html title="Template"
<xf:js>
    alert("The truth hurts, I know. It's biologically based actually.");
</xf:js>
```

If the JS tag is not empty, anything in the tag will be converted to inline JS.

:::note "Further notes"
    JavaScript files are served relative to the `/js` directory. Although not recommended, you can also include external resources with this tag.
    
    A good example of this tag is in the `editor` template.
:::

#### xf:fa
Inserts a Font Awesome icon with the appropriate classes and optional formatting.

```html title="Terminal"
<!-- Basic usage -->
<xf:fa icon="fa-user" />
```

The fa tag takes the following attributes:

- `icon`: The Font Awesome icon class to use (required). Must include the fa- prefix.

:::example "Example of usage"
    ```html title="Template"
    <!-- Spinning animation -->
    <xf:fa icon="fa-circle-notch fa-spin" /> Loading...

    <!-- Pulsing (90-degree step) animation -->
    <xf:fa icon="fa-heart fa-pulse" /> New notification
    
    <!-- Border -->
    <xf:fa icon="fa-camera fa-border" /> Photos
    
    <!-- Horizontal flip -->
    <xf:fa icon="fa-reply fa-flip-horizontal" />
    
    <!-- Vertical flip -->
    <xf:fa icon="fa-arrow-up fa-flip-vertical" />
    
    <!-- Both directions flip -->
    <xf:fa icon="fa-exchange-alt fa-flip-both" />
    
    <!-- Rotate by 90 degrees -->
    <xf:fa icon="fa-arrow-up fa-rotate-90" />
    
    <!-- Rotate by 180 degrees -->
    <xf:fa icon="fa-arrow-up fa-rotate-180" />
    
    <!-- Rotate by 270 degrees -->
    <xf:fa icon="fa-arrow-up fa-rotate-270" />
    
    <!-- Size examples -->
    <xf:fa icon="fa-star fa-xs" />
    <xf:fa icon="fa-star fa-sm" />
    <xf:fa icon="fa-star fa-lg" />
    <xf:fa icon="fa-star fa-2x" />
    <xf:fa icon="fa-star fa-3x" />
    <xf:fa icon="fa-star fa-4x" />
    <xf:fa icon="fa-star fa-5x" />
    <xf:fa icon="fa-star fa-6x" />
    <xf:fa icon="fa-star fa-7x" />
    <xf:fa icon="fa-star fa-8x" />
    <xf:fa icon="fa-star fa-9x" />
    ```

    ![An example of the font awesome icons](files/images/example-font-awesome-icons.png)
:::

### Advanced tags

#### xf:callback
Executes a PHP Callback method.

```html title="Template"
<xf:callback class="Vendor\Addon\Class" method="getX" params="['abc']"></xf:callback>
```

The callback tag takes the following attributes:

- `class` - The class (from the root namespace) containing the method to run.
- `method` - The method to run. (See callback methods)
- `params` - An array of parameters to provide to the method.

For a method to be considered a callback method,
it must be named appropriately or it will throw an error '`callback_method_x_does_not_appear_to_indicate_read_only`'.
For it to be considered read-only, the method name must begin with one of the following prefixes:

:::note Callback methods
    **Checks & existence**
    - `are`, `can`, `does`, `exists`, `has`, `is`, `validate`, `verify`

    **Fetching & data**
    - `count`, `data`, `display`, `fetch`, `filter`, `find`, `get`, `pluck`

    **Rendering & output**
    - `print`, `render`, `return`, `show`, `view`

    **Other**
    - `total`
:::

## Template elements

### Data lists
Data lists are a way to display data in a table using xenforo template tags.

#### xf:datalist
A data list is a container for the tags `datarow` and `cell`. It wraps around the `datarow` tags to create a table.

#### xf:datarow
A data row is a row of data within that datalist. It wraps around the `cell` tags to create a table.

The parameters available to use in the `datarow` are:

- `rowtype` which is where you can define that the row your creating is a `header`.
- `icon` where you can define an icon for the row. (This adds an extra cell to the start of the row, which holds the icon).
- `label` where you can define a label for the row. (This adds an extra cell to the start of the row, which holds the label).
- `hint` This is a conditional argument, it requires a `label` to be set. It adds the hint value after the label text in a muted colour.
- `explain` This is a conditional argument, it requires a `label` to be set. It adds the explain value under the label text in a muted colour.

#### xf:cell
A cell represents a single unit of data within a data row.

The parameters available to use in the `cell` are:

- `class` which is where you can define these classes to get a desired style.

| Class                        | Description                 |
|------------------------------|-----------------------------|
| `dataList-cell--main`        | Primary content cell        |
| `dataList-cell--link`        | Clickable cell              |
| `dataList-cell--alt`         | Alternative styling         |
| `dataList-cell--action`      | Action button cell          |
| `dataList-cell--iconic`      | Cell with an icon           |
| `dataList-cell--min`         | Minimal width cell          |


#### Example of a basic data list
```html title="Template"
<xf:datalist>
    <xf:datarow rowtype="header">
        <xf:cell>Column 1</xf:cell>
        <xf:cell>Column 2</xf:cell>
    </xf:datarow>
    <xf:datarow>
        <xf:cell>Value 1</xf:cell>
        <xf:cell>Value 2</xf:cell>
    </xf:datarow>
</xf:datalist>
```

#### Example of a more advanced data list
```php title="Controller"
$viewParams = [
    'items' => [
        ['title' => 'First item', 'value' => 12.3456, 'created' => XF::$time - 86400],
        ['title' => 'Second item', 'value' => 9876.54321, 'created' => XF::$time - 3600],
        ['title' => 'Third item', 'value' => 42, 'created' => XF::$time],
    ],
];
```

```html title="Template"
<div class="block">
    <div class="block-container">
        <h2 class="block-header">Items Data List</h2>
        
        <xf:datalist>
            <!-- Header row with icon -->
            <xf:datarow rowtype="header" icon="fa-list">
                <xf:cell>Title</xf:cell>
                <xf:cell>Value</xf:cell>
                <xf:cell>Created</xf:cell>
            </xf:datarow>
            
            <!-- Data rows with labels -->
            <xf:foreach loop="{{ $items }}" value="$item" key="$index">
                <xf:datarow
                        label="Item {{ $index + 1 }}"
                        hint="ID: {{ $index }}"
                        explain="Sample item data">
                    <xf:cell class="dataList-cell--main">{{ $item.title }}</xf:cell>
                    <xf:cell class="dataList-cell--iconic">
                        <i class="fa fa-dollar-sign" aria-hidden="true"></i>
                        {{ $item.value | number(2) }}
                    </xf:cell>
                    <xf:cell class="dataList-cell--min">{{ date($item.created, 'M j, Y H:i') }}</xf:cell>
                </xf:datarow>
            </xf:foreach>
        </xf:datalist>
    </div>
</div>
```

### Forms
Forms are a way to create HTML forms using XenForo template tags.

#### xf:form
A form is a container that wraps around form rows and controls to create an HTML form.

The parameters available to use in the `form` are:

- `action` specifies the URL where the form will be submitted.
- `ajax` when set to `true`, enables AJAX form submission.

#### xf:formrow
A form row represents a single form field with its label, input control, and optional explanatory text.
It wraps around input controls to provide consistent styling and structure.

The parameters available to use in the `formrow` are:

- `label` specifies the label text for the form control.
- `hint` adds additional hint text next to the label in muted styling.
- `explain` adds explanatory text below the control to provide additional information.
- `error` displays an error message for the form field. The error message will be displayed under the input area, but above the explain.

#### Example of a basic form
```html title="Template"
<xf:form action="{{ link('test/inputdemo') }}" class="block" ajax="true">
    <div class="block-container">
        <div class="block-body">
            <xf:textboxrow name="user_text"
                           value=""
                           label="Enter your text"
                           explain="Type anything you want to see displayed on the screen."
                           required="required" />

            <xf:formrow label="Custom Input"
                        hint="Optional hint text"
                        explain="This is a custom form row with any HTML content inside"
                        error="This is a error message.">
                <div class="inputGroup">
					<span class="inputGroup-text">
						<i class="fa fa-user" aria-hidden="true"></i>
					</span>
                    <input type="text" name="custom_field" class="input" placeholder="Enter custom value">
                </div>
            </xf:formrow>

            <xf:submitrow sticky="true" icon="submit" />
        </div>
    </div>
</xf:form>
```

```php title="Controller"
public function actionInputDemo(): XF\Mvc\Reply\Error
{
    $userInput = $this->filter('user_text', 'str');
    $customField = $this->filter('custom_field', 'str');
    
    return $this->error("This is not an error, this is your input: $userInput, Custom field: $customField");
}
```

## Sectioned tags

Sectioned Tags all call the function `modifySectionedHtml`.
The HTML element that they change is simply the tag name. So the `sidebar` tag will modify the sidebar HTML, etc.

#### Example

```html title="Template"
<xf:sidebar>
    <h1>My Magical Sidebar!</h1>
</xf:sidebar>
```

#### Common attributes

- `mode` - The mode of the modification. (See Modification modes)

#### Modification modes

By default, the modification mode is `replace`. (i.e. if the attribute is not specified.)

- `prepend` - Places the contents of the tag at the beginning of the element's HTML.
- `append` - Places the contents of the tag at the end of the element's HTML.
- `replace` - Replaces the element's HTML with the contents of the tag.