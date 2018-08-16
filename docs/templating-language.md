The XenForo 2 templating language is heavily inspired by the [Moustache Templating Language](https://github.com/bobthecow/mustache.php), and uses many of the same principles.

### Best Practices
XenForo tags, by convention, are `lowercase`. If you define your own, custom, tags you should absolutely define them in lowercase. All custom tags added by XenForo are prefixed with the `xenforo:` namespace.

The name of your XenForo tag and it's class should, by convention, be in `UpperCamelCase`.

So, for example, if you defined a tag, `addon:myelement`, the tag class for your element - and the tag's name would be `MyElement`. (Where the class is `Vendor\Addon\Template\Tags\MyElement`.)

In general, it's a good idea to consider the XenForo Custom Tags as [XML Namespaced Tags](https://www.w3schools.com/xml/xml_namespaces.asp), as they share many of the same characteristics.

### Useful Information

#### Commenting up your Templates
If you want to comment out some template code (or an inspirational message) that you don't want viewable in the final page source, you can use the `xf:comment` tag.

```html
<xf:comment>
If you stop seeing the world in terms of what you like
and what you dislike and saw things for what they truly are in themselves,
you will find a great deal more peace in your life.
</xf:comment>
```

### Template Macros
Template Macros are a very powerful aspect of the XenForo Templating Language.

You should generally use a macro any place you would use a function or subroutine in a programming language.
For non-programmers, I'd summarize this as: **either** use a macro any place you want to produce the same thing multiple times in multiple different files **or** to produce something different under different circumstances (this would probably make more sense if you check the guide on defining a macro).

!!! warning
	For readability reasons, you should not use a macro tag as a variable. You should instead use the Set tag and treat the variable as you would any template variable.

#### Defining a Macro
```html
<xf:macro
    name="my_macro_name">

    <!-- Your macro content -->

</xf:macro>
```
At its simplest, a macro can be defined with a `name` attribute and the content you want repeated inside the macro tag.

!!! note
	When you're using a macro in multiple files, it's best practice to put the macro in it's own template.

##### Macro Arguments
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

#### Including & Using Macros
```html
<xf:macro template="my_macro_template" name="my_macro_name" />
```
At it's simplest, you include a macro by setting the `name` attribute and leaving the tag empty.

!!! note
	When using a macro tag, you should use the self-closing form of the tag to allow someone to more easily distinguish the difference between a definition and usage of a macro.

##### Macro Arguments
You can also provide arguments to the macro:

```html
<xf:macro template="my_macro_template" name="my_macro_name" arg-argName="argValue" />
```

Where `argName` is the name of the macro argument.

!!! note
	You should use `lowerCamelCase` for your macro argument names.

## Template Tags
### Avatar Tag

Inserts a user's avatar in the page of the template tag.

<xf:avatar  user="{$xf.visitor}"  size="o"  canonical="true"  />

The avatar tag takes the following arguments:

-   `user` - The XenForo User object to generate the avatar for.
-   `size` - The size of the image to generate. (See image sizes)
-   `canonical` - Whether the URL should be canonicalized. (See [Glossary: Canonical (URL)](/xenforo-2/~/edit/drafts/-LK0rCLloPfLzTsJI22F/glossary#canonical-url)) This can only be used for `custom` avatars.
-   `notooltip` - Whether the tool-tip displayed when hovering over the avatar should be disabled.
-   `forcetype` - Can be used to force getting the `gravatar` or `custom` avatars by setting the value to either of those.
-   `defaultname` - The username to use if the `user` attribute contains an invalid user.

#### Image Sizes

If an avatar of invalid size is provided, the code will fallback to size '`s`'.

-   `o` - `384px`
-   `h` - `384px`
-   `l` - `192px`
-   `m` - `96px`
-   `s` - `48px`

### Breadcrumb Tag

Modifies the page breadcrumb.
```html
<xf:breadcrumb  href="{{ link('my_page') }}">{{ phrase('my_page_name') }}</xf:breadcrumb>
```
The breadcrumb tag takes the following arguments:

-   `href` - The link to set for the final element in the breadcrumb.

The value of the tag can be used to set the name of the final element in the breadcrumb.

#### Alternative Uses
```html
<xf:breadcrumb  source="[{'href': '', 'value': ''}, ...]"></xf:breadcrumb>
```
You can also create your own, custom, breadcrumb (although definitely not recommended, hence not mentioned above) with the `source` parameter.

The `source` parameter essentially takes an array of objects with `href` and `value` attributes, where each object is a breadcrumb element.

!!! note
	It is not possible to remove the 'Home' element from the breadcrumb. Even using the custom `source` parameter method, this element is present.

### Button Tag

Adds a button element with the appropriate classes and optionally an icon.
```html
<xf:button  icon="save"></xf:button>
```
The button tag takes the following arguments:

-   `icon` - The icon class to apply to the button. (See button icons)

#### Button Icons

By default, XenForo buttons support the following icons (created with CSS):

-   `add`
-   `confirm`
-   `write`
-   `import`
-   `export`
-   `download`
-   `disable`
-   `edit`
-   `save`
-   `reply`
-   `quote`
-   `purchase`
-   `payment`
-   `convert`
-   `search`
-   `sort`
-   `upload`
-   `attach`
-   `login`
-   `rate`
-   `config`
-   `refresh`
-   `translate`
-   `vote`
-   `result`
-   `history`
-   `cancel`
-   `preview`
-   `conversation`
-   `bolt`
-   `list`
-   `prev`
-   `next`
-   `markRead`
-   `notificationsOn`
-   `notificationsOff`
-   `merge`
-   `move`
-   `copy`
-   `approve`
-   `unapprove`
-   `delete`
-   `undelete`
-   `stick`
-   `unstick`
-   `lock`
-   `unlock`

### Callback Tag

Executes a PHP Callback method.
```html
<xf:callback  class="Vendor\Addon\Class"  method="getX"  params="['abc']"></xf:callback>
```
The callback tag takes the following arguments:

-   `class` - The class (from the root namespace) containing the method to run.
-   `method` - The method to run. (See callback methods)
-   `params` - An array of parameters to provide to the method.

#### Callback Methods

For a method to be considered a callback method, it must be named appropriately or it will throw an error '`callback_method_x_does_not_appear_to_indicate_read_only`'. For it to be considered read-only, the method name must begin with one of the following prefixes:

-   `are`
-   `can`
-   `count`
-   `data`
-   `display`
-   `does`
-   `exists`
-   `fetch`
-   `filter`
-   `find`
-   `get`
-   `has`
-   `is`
-   `pluck`
-   `print`
-   `render`
-   `return`
-   `show`
-   `total`
-   `validate`
-   `verify`
-   `view`

### Copyright Tag

Prints XenForo copyright message unless the user purchased the XenForo.
```html
<xf:copyright  />
```
Yeah... in hindsight, I don't think this tag really needed documenting.

### CSS Tag

Includes a CSS or LESS template file.
```html
<xf:css  src="mycss_file.css"  />
```
The CSS tag takes the following arguments:

-   `src` - The CSS or LESS template file to include.

#### Alternative Uses
```html
<xf:css>
html, body {
 font-family: "Roboto", sans-serif;
}
</xf:css>
```
If the CSS tag is not empty, anything in the tag will be converted into inline CSS.

#### Further Notes

> For [CSS], forget about calling them as files. Copy and paste them into new templates.

Chris D, XenForo developer **Source**: [https://xenforo.com/community/threads/including-external-library-js-and-css.136153/post-1185631](https://xenforo.com/community/threads/including-external-library-js-and-css.136153/post-1185631)

### JS Tag

Includes a JavaScript file.
```html
<xf:js  src="myaddon/vendor/scripts/myjs_file.js"  />
```
The JS tag takes the following arguments:

-   `src` - The JS file to include in the template.
-   `prod` - The JS file to include in the template, only for production mode.
-   `dev` - The JS file to include in the template, only for development mode.
-   `min` - Whether or not to include the minified version of the file. (Replaces `.js` with `.min.js`)        -   Respected only in production mode.
-   `addon` - Whether or not the development JS URL should be used.        -   Respected only in development mode.

!!! warning
	The `src` tag cannot be used in conjunction with either the `prod` or `dev` tags.

#### Alternative Uses
```html
<xf:js>
alert("The truth hurts, I know. It's biologically based actually.");
</xf:js>
```
If the JS tag is not empty, anything in the tag will be converted to inline JS.

#### Further Notes

JavaScript files are served relative to the `/js` directory. Although not recommended, you can also include external resources with this tag.

A good example of this tag is in the `editor` template.

### Set Tag

The set tag allows you to create a reference to another variable or create a new variable. You should use the set tag anywhere you would use a variable in a programming language.
```html
<xf:set  var="$visitor"  value="{$xf.visitor}"  />
```

!!! warning
	Do not use the Set tag for a group of elements you wish to use in multiple templates, you should instead use the [Macro Tag](/xenforo-2/~/edit/drafts/-LK0rCLloPfLzTsJI22F/xenforo-macro-tags).

!!! warning
	The variable name (`var` attribute) must begin with a `$`.

The set tag takes the following arguments:

-   `var` - The name of the variable you wish to define (essentially, the alias).
-   `value` - A variable to reference to or a variable value.

#### Alternative Uses
```html
<xf:set  var="$myVariableName">
My Variable Value!
This could be a callback, or simply a group of phrases.
</xf:set>
```
When the `value` attribute is not provided, and the tag is not empty, the variable value will be set to the contents of the tag.

### Sidebar Tag

See [Sectioned Tags](/xenforo-2/~/edit/drafts/-LK0rCLloPfLzTsJI22F/xenforo-template-language#sectioned-tags).

### SideNav Tag

See [Sectioned Tags](/xenforo-2/~/edit/drafts/-LK0rCLloPfLzTsJI22F/xenforo-template-language#sectioned-tags).

### Title Tag

Sets the page's title, both on the page in the `h1` tag and in the browser tab.
```html
<xf:title>{{ phrase('my_page_title') }}</xf:title>
```
#### Further Notes

Whilst the title can, of course, be hardcoded, it is **highly recommended** that you use a phrase, both for internationalization and for the added customizability on the site administrator's end.

### Widget Tag

Includes a widget in the page, or adds a widget to a widget position.
```html
<xf:widget  key="widget_name"  />
```
The widget tag takes the following arguments:

-   `key` - The widget key, as defined in the widget settings.
-   `position` - If set, changes the position that the widget will be rendered.

### UserActivity Tag

Displays the status of a user, in terms of their last action and when that action occurred.
```html
<xf:useractivity  user="{$xf.visitor}"  />
```
The UserActivity tag takes the following arguments:

-   `user` - The user to display the status of.

#### Format

> Viewing page _Latest Case Files_ · 4 minutes ago

The format is **[Activity Name]**  **· [Time]**

### UserBanners Tag

Displays the user's banners in a horizontal list.
```html
<xf:userbanners  user="{$xf.visitor}"  />
```
The UserBanners tag takes the following arguments:

-   `user` - The user to display the user banners of.

#### Example

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LJyFqBVfum4xg_rosJb%2F-LJzGeWuwcNialetBoe7%2F-LJzQAfrMPgNw0sSmv4D%2Fimage.png?alt=media&token=9d57a2d3-0cc3-41a6-8109-4049cf3a9720)

An example result of the UserBanners tag.

### UserBlurb Tag

Displays a one-line summary of a user's profile.
```html
<xf:userblurb  user="${xf.visitor}"  />
```
The UserBlurb tag takes the following arguments:

-   `user` - The XenForo User Object to display the blurb of.

#### Format

> FBI Consultant · 43 · From United States of America

The format is **[Role / Custom Title] · Age · Location**

### Username Tag

Displays the user's username, optionally with a tool-tip.
```html
<xf:username  user="{$xf.visitor.username}"  notooltip="true"  />
```
The Username tag takes the following arguments:

-   `user` - The XenForo User Object to display the name of.
-   `notooltip` - Whether or not the tool-tip should be disabled.
-   `href` - The link to navigate to when the username is clicked.

!!! warning
	The tool-tip will not be displayed if an `href` is set, as it won't work and might be misleading to users.

### UserTitle Tag

Displays the user's title.
```html
<xf:usertitle  user="{$xf.visitor}"  />
```
The UserTitle tag takes the following arguments:

-   `user` - The XenForo User Object to display the user title of.

### Sectioned Tags

Sectioned Tags are [pseudo-tags](/xenforo-2/~/edit/drafts/-LK0rCLloPfLzTsJI22F/glossary#pseudo-tags) and call the function `modifySectionedHtml`

The HTML element that they change is simply the tag name. So the `sidebar` tag will modify the sidebar HTML, etc.

#### Example
```html
<xf:sidebar>
 <h1>My Magical Sidebar!</h1>
</xf:sidebar>
```
#### Common Attributes

-   `mode` - The mode of the modification. (See Modification Modes)

#### Modification Modes

By default, the modification mode is `replace`. (i.e. if the attribute is not specified.)

-   `prepend` - Places the contents of the tag at the beginning of the element's HTML.
-   `append` - Places the contents of the tag at the end of the element's HTML.
-   `replace` - Replaces the element's HTML with the contents of the tag.
