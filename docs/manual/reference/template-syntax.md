# Template syntax

This is a reference for the XenForo template syntax. For a practical guide to using templates in add-on development, see [Template basics](/devs/template-basics).

All XenForo tags are prefixed with the `xf:` namespace and are lowercase by convention.

## Comments

The `<xf:comment>` tag adds a comment that will not appear in the rendered HTML source.

```html title="Template"
<xf:comment>
    This content will not be rendered or visible in the page source.
</xf:comment>
```

## Includes

The `<xf:include>` tag includes another template. Variables can be passed using `<xf:map>` and `<xf:set>` children.

```html title="Template"
<xf:include template="my_template" />

<xf:include template="my_template">
    <xf:map from="$localVar" to="$remoteVar" />
    <xf:set var="$newVar" value="someValue" />
</xf:include>
```

- `template` - The name of the template to include.

See also [`<xf:macro>`](#macros) for reusable blocks with arguments, and [`<xf:extends>`](#extends) for template inheritance.

## Template inheritance

XenForo templates support an inheritance system where a child template extends a parent and overrides specific sections, while the parent defines the overall structure.

### Extends

The `<xf:extends>` tag declares that a template extends a parent template. It must appear at the top level of the template and must be empty.

```html title="Template: demo_custom_page"
<xf:extends template="demo_base_page" />

<xf:extension id="content">
    <h2>Custom page content</h2>
    <p>This replaces the "content" extension point in the parent.</p>
</xf:extension>
```

- `template` - The parent template to extend.

See also [`<xf:wrap>`](#wrap) for the inverse pattern where the content template names its wrapper.

When a child extends a parent:
1. The parent template renders and produces the page output.
2. The child template's `<xf:extension>` blocks override matching extension points in the parent.
3. Any code in the child outside of `<xf:extension>` blocks (such as `<xf:title>`) still executes for side effects, but its HTML output is discarded.

### Extension

The `<xf:extension>` tag defines a named section that can be overridden by child templates. In a parent template, it provides default content. In a child template, it replaces that content.

```html title="Template: demo_base_page (parent)"
<div class="block">
    <xf:extension id="header">
        <h1>Default Header</h1>
    </xf:extension>

    <xf:extension id="content">
        <p>Default content.</p>
    </xf:extension>
</div>
```

```html title="Template: demo_custom_page (child)"
<xf:extends template="demo_base_page" />

<xf:extension id="content">
    <p>Overridden content from the child template.</p>
</xf:extension>
```

The rendered output uses the parent's `header` extension (unchanged) and the child's `content` extension (overridden).

- `id` - The extension name. Must be alphanumeric and underscores only.
- `value` - Short form for setting a single value instead of block content.

The `value` attribute is useful for passing data rather than HTML:

```html title="Template"
<xf:extension id="action" value="{{ link('demo/edit', $item) }}" />
```

### Extension parent

The `<xf:extensionparent>` tag renders the parent's version of an extension from within a child's override. This lets you extend rather than fully replace content.

```html title="Template: child"
<xf:extends template="demo_base_page" />

<xf:extension id="content">
    <xf:extensionparent />
    <p>Additional content appended after the parent's content.</p>
</xf:extension>
```

- `id` - Specific extension ID to render the parent of. If omitted, uses the current extension's ID.

### Extension value

The `<xf:extensionvalue>` tag renders a named extension's content at a specific point in the template. Use this when an extension is defined with `value` or `skipprint="true"` and you need to output it elsewhere.

```html title="Template"
<a href="{{ $extensionValue }}">
    <xf:extensionvalue id="action" />
</a>
```

- `id` - The extension ID to render.

### Wrap

The `<xf:wrap>` tag renders the current template inside a wrapper template. The wrapper receives the current template's output as a special `$innerContent` variable.

```html title="Template: demo_page"
<xf:wrap template="demo_wrapper">
    <xf:map from="$title" to="$pageTitle" />
    <xf:set var="$showSidebar" value="true" />
</xf:wrap>

<h2>{$title}</h2>
<p>Page content here.</p>
```

```html title="Template: demo_wrapper"
<div class="page-layout">
    <h1>{$pageTitle}</h1>
    <div class="page-content">
        {$innerContent|raw}
    </div>
    <xf:if is="$showSidebar">
        <aside>Sidebar</aside>
    </xf:if>
</div>
```

- `template` - The wrapper template to use.
- Child `<xf:map>` tags rename variables for the wrapper.
- Child `<xf:set>` tags pass new variables to the wrapper.

:::warning
The wrapper template must output `{$innerContent|raw}` to render the wrapped content. The `raw` filter is required because the content is pre-escaped HTML.
:::

### Macro extends

Macros also support inheritance. A macro can extend another macro from a different template, overriding specific extension points while reusing the parent's structure.

```html title="Template: demo_item_macros"
<xf:macro id="item_card" extends="shared_macros::card" arg-item="!">
    <xf:extension id="image">
        <xf:extensionparent />
        <span class="badge">{$item.category}</span>
    </xf:extension>
</xf:macro>
```

The `extends` attribute uses the format `template_name::macro_id`.

## Macros

Macros are reusable blocks of template code.

### Defining a macro

```html title="Template"
<xf:macro id="my_macro" arg-message="Default message" arg-type="info">
    <div class="block block--{$type}">
        <p>{$message}</p>
    </div>
</xf:macro>
```

- `id` - The name of the macro.
- `arg-{name}` - Declares an argument. Inside the macro, available as `{$name}` (without the `arg-` prefix). Set the value to `!` to make it required.

:::note
Use `lowerCamelCase` for argument names. When using a macro across multiple templates, place the definition in its own template.
:::

:::warning
Do not use a macro tag as a variable. Use `<xf:set>` instead.
:::

### Calling a macro

Use the self-closing form to call a macro:

```html title="Template"
<!-- Same template -->
<xf:macro id="my_macro" arg-message="Hello!" />

<!-- Different template -->
<xf:macro template="my_macro_template" id="my_macro" arg-message="Hello!" />
```

- `template` - The template containing the macro definition (omit if in the current template).
- `id` - The name of the macro to call.
- `arg-{name}` - Values to pass as arguments.

See also [`<xf:include>`](#includes) for including a full template without arguments.

## Control structures

### Conditionals

The `<xf:if>` tag conditionally renders content. Supports `<xf:elseif>` and `<xf:else>` branches. Once a condition is met, remaining branches are skipped.

```html title="Template"
<xf:if is="$xf.visitor.is_admin">
    <!-- Shown to admins -->
<xf:elseif is="$xf.visitor.is_moderator" />
    <!-- Shown to moderators (but not admins) -->
<xf:else />
    <!-- Shown to everyone else -->
</xf:if>
```

- `is` - The condition to evaluate.

#### Supported operators

| Operator | Description |
|----------|-------------|
| `&&` / `AND` | Logical AND |
| `\|\|` / `OR` | Logical OR |
| `!` | Logical NOT |
| `==`, `!=`, `>`, `<`, `>=`, `<=` | Comparison |
| `===`, `!==` | Strict comparison |
| `+`, `-`, `*`, `/`, `%` | Arithmetic |
| `.` | String concatenation |
| `? :` | Ternary |
| `?:` | Elvis (short ternary) |
| `??` | Null coalesce |
| `is` / `is not` | Type checking (e.g., `$value is empty`) |
| `instanceof` | Object type checking |

### Loops

The `<xf:foreach>` tag iterates over an array. Supports `<xf:else>` as a fallback when the array is empty.

```html title="Template"
<xf:foreach loop="$items" key="$key" value="$item" i="$i">
    <p>{$item.title} (#{$i})</p>
<xf:else />
    <p>No items found.</p>
</xf:foreach>
```

- `loop` - The array to iterate over.
- `value` - Variable name for the current element.
- `key` - Variable name for the current element's array key (optional).
- `i` - Variable name for the 1-based iteration count (optional).
- `if` - Condition that must be true for the loop body to render on each iteration (optional).

### Setting variables

The `<xf:set>` tag creates or aliases a variable within the template scope.

```html title="Template"
<!-- Using the value attribute -->
<xf:set var="$visitor" value="{$xf.visitor}" />

<!-- Using block content -->
<xf:set var="$greeting">
    Hello, {$xf.visitor.username}!
</xf:set>
```

- `var` - The variable name. Must begin with `$`.
- `value` - The value or variable reference to assign.

:::warning
When using the block form (no `value` attribute), the content is escaped and the result is a string. The `value` attribute does not have this limitation.
:::

### Trimming whitespace

The `<xf:trim>` tag removes leading and trailing whitespace from its content.

```html title="Template"
<xf:trim>
    <p>No surrounding whitespace</p>
</xf:trim>
```

## User tags

### Avatar

The `<xf:avatar>` tag inserts a user's avatar.

```html title="Template"
<xf:avatar user="{$xf.visitor}" size="m" canonical="true" />
```

- `user` - The User entity.
- `size` - Image size: `o` (384px), `h` (384px), `l` (192px), `m` (96px), `s` (48px). Falls back to `s` for invalid sizes.
- `canonical` - Whether to use the full SEO-friendly URL. Only respected for custom avatars.
- `notooltip` - Disable the hover tooltip.
- `forcetype` - Force `gravatar` or `custom` avatar type.
- `defaultname` - Fallback username when the `user` is invalid.

### Username

The `<xf:username>` tag displays a username with optional tooltip and styling.

```html title="Template"
<xf:username user="{$xf.visitor}" rich="true" />
```

- `user` - The User entity.
- `rich` - Enable rich username display with group styling.
- `notooltip` - Disable the hover tooltip.
- `href` - Link URL. Disables the tooltip when set.
- `defaultname` - Fallback username when the `user` is invalid.

### User title

The `<xf:usertitle>` tag displays the user's title.

```html title="Template"
<xf:usertitle user="{$xf.visitor}" />
```

- `user` - The User entity.

### User blurb

The `<xf:userblurb>` tag displays a one-line summary of a user's profile.

```html title="Template"
<xf:userblurb user="{$xf.visitor}" />
```

- `user` - The User entity.

### User banners

The `<xf:userbanners>` tag displays the user's banners in a horizontal list.

```html title="Template"
<xf:userbanners user="{$xf.visitor}" />
```

- `user` - The User entity.

### User activity

The `<xf:useractivity>` tag displays the user's last action and when it occurred.

```html title="Template"
<xf:useractivity user="{$xf.visitor}" />
```

- `user` - The User entity.

## Navigation tags

### Breadcrumb

The `<xf:breadcrumb>` tag modifies the page breadcrumb trail.

```html title="Template"
<!-- Simple breadcrumb -->
<xf:breadcrumb href="{{ link('my_page') }}">{{ phrase('my_page_name') }}</xf:breadcrumb>

<!-- Programmatic breadcrumb from a data source -->
<xf:breadcrumb source="$category.getBreadcrumbs(false)" />
```

- `href` - The URL for the breadcrumb element.
- `source` - An array of breadcrumb data (each with `href` and `value` keys). Alternative to inline content.

:::note
The root breadcrumb can be changed via the "Root breadcrumb" option in "Basic board information" options.
:::

### Title

The `<xf:title>` tag sets the page title, displayed in the `<h1>` tag and the browser tab.

```html title="Template"
<xf:title>{{ phrase('my_page_title') }}</xf:title>
```

See also [`<xf:h1>`](#h1) to set the visible heading independently of the browser tab title.

### H1

The `<xf:h1>` tag sets the page `<h1>` independently of `<xf:title>`. Use this when the visible heading should differ from the browser tab title.

```html title="Template"
<xf:h1>{{ phrase('welcome_back', {'name': $xf.visitor.username}) }}</xf:h1>
```

- `hidden` - If `true`, sets the H1 value without rendering it visibly.

### Description

The `<xf:description>` tag sets the page's meta description.

```html title="Template"
<xf:description>{{ $forum.description }}</xf:description>
```

- `meta` - If `true` (default), also sets the `<meta name="description">` tag.

### Head

The `<xf:head>` tag adds content to the `<head>` section of the page. Each usage requires a unique `option` name.

```html title="Template"
<xf:head option="og_image">
    <meta property="og:image" content="{$imageUrl}" />
</xf:head>
```

- `option` - A unique key for this head entry. Subsequent entries with the same key overwrite earlier ones.

### Page

The `<xf:page>` tag sets an arbitrary page parameter that can be read by the page container or other templates via `page_param()`.

```html title="Template"
<xf:page option="allowBookmarkControlMenu" value="1" />
```

- `option` - The parameter name.
- `value` - The parameter value.

### Page action

The `<xf:pageaction>` tag defines the page action area, typically used for floating action buttons or contextual controls.

```html title="Template"
<xf:pageaction>
    <xf:button href="{{ link('threads/create', $forum) }}" icon="add">
        {{ phrase('post_new_thread') }}
    </xf:button>
</xf:pageaction>
```

- `if` - Optional condition. The page action only renders when this evaluates to true.

### Sidebar

The `<xf:sidebar>` tag adds content to the page sidebar.

```html title="Template"
<xf:sidebar>
    <div class="block">
        <h3 class="block-header">{{ phrase('info') }}</h3>
        <div class="block-body block-row">Sidebar content here.</div>
    </div>
</xf:sidebar>
```

- `mode` - How the content modifies the sidebar: `replace` (default), `prepend`, or `append`.

### Side navigation

The `<xf:sidenav>` tag adds content to the page side navigation.

```html title="Template"
<xf:sidenav>
    <div class="block">
        <h3 class="block-header">{{ phrase('navigation') }}</h3>
        <div class="block-body">
            <a href="{{ link('demo') }}">{{ phrase('demo') }}</a>
        </div>
    </div>
</xf:sidenav>
```

- `mode` - How the content modifies the side navigation: `replace` (default), `prepend`, or `append`.

### Page navigation

The `<xf:pagenav>` tag renders pagination controls. This is the tag form of the `page_nav()` function.

```html title="Template"
<xf:pagenav page="{$page}" perpage="{$perPage}" total="{$total}"
    link="forums" data="{$forum}" />
```

- `page` - Current page number.
- `perpage` - Items per page.
- `total` - Total number of items.
- `link` - Route name for generating page URLs.
- `data` - Entity or array passed to the link generator.
- `params` - Additional query parameters for the link.

See also [`page_nav()`](#template-utilities) for the function form.

## UI component tags

### Button

The `<xf:button>` tag renders a button element with XenForo styling and an optional icon.

```html title="Template"
<xf:button icon="save">{{ phrase('save') }}</xf:button>
```

- `icon` - The icon to display. Available icons:
  - **Content & editing**: `add`, `edit`, `save`, `delete`, `undelete`, `copy`, `move`, `merge`, `convert`
  - **Navigation**: `prev`, `next`, `markRead`, `list`
  - **User actions**: `login`, `reply`, `quote`, `conversation`, `notificationsOn`, `notificationsOff`
  - **Moderation**: `approve`, `unapprove`, `stick`, `unstick`, `lock`, `unlock`, `disable`
  - **Files & media**: `upload`, `download`, `import`, `export`, `attach`
  - **Other**: `config`, `refresh`, `translate`, `sort`, `search`, `rate`, `vote`, `result`, `history`, `cancel`, `preview`, `purchase`, `payment`, `bolt`

### Widget

The `<xf:widget>` tag includes a widget by key or class.

```html title="Template"
<xf:widget key="widget_name" />
```

- `key` - The widget key (as defined in widget settings).
- `position` - Override the widget's render position.
- `class` - PHP class containing the widget definition (cannot be used with `key`).
  - `title` - Widget title (used with `class`).

### Date

The `<xf:date>` tag renders a dynamic `<time>` element that displays relative time (e.g., "5 minutes ago") and updates automatically.

```html title="Template"
<xf:date time="{$post.post_date}" />
```

- `time` - The timestamp to format (required).
- `class` - Additional CSS class for the `<time>` element.

See also [`date_dynamic()`](#date-and-time) for the function form.

### React

The `<xf:react>` tag renders a reaction button for content entities that support reactions.

```html title="Template"
<xf:react content="{$post}" link="posts/react" />
```

- `content` - The content entity with reaction support (required).
- `link` - The action URL for the reaction (required).
- `params` - Additional parameters for the link.
- `class` - CSS classes for the button.

See also [`react()`](#content-rendering) for the function form, and [`<xf:reactions>`](#reactions) for displaying the reactions summary.

### Reactions

The `<xf:reactions>` tag renders the reactions summary (emoji icons and count) for a content entity.

```html title="Template"
<xf:reactions content="{$post}" link="posts/reactions" />
```

- `content` - The content entity with reaction data (required).
- `link` - URL for the full reactions list (required).
- `linkparams` - Additional parameters for the link.

For a summary without a specific content entity, use the `summary` attribute with a reactions array:

```html title="Template"
<xf:reactions summary="true" reactions="{$reactionCounts}" />
```

See also [`reactions()`](#content-rendering) for the function form, and [`<xf:react>`](#react) for the reaction button.

### Reaction

The `<xf:reaction>` tag renders a single reaction icon.

```html title="Template"
<xf:reaction id="1" showtitle="true" />
```

- `id` - The reaction ID or a reaction array with a `reaction_id` key (required).
- `showtitle` - If `true`, displays the reaction title text.
- `small` - If `true`, renders in small size.
- `tooltip` - If `true`, shows a tooltip on hover.

### Profile banner

The `<xf:profilebanner>` tag renders a user's profile banner image.

```html title="Template"
<xf:profilebanner user="{$user}" size="l">
    <span class="memberProfileBanner-overlay"></span>
</xf:profilebanner>
```

- `user` - The User entity (required).
- `size` - Size code for the banner image (required).
- `canonical` - If `true`, uses the canonical URL.
- `hideempty` - If `true`, hides the banner when no image exists.
- `href` - Makes the banner a link.

### Show ignored

The `<xf:showignored>` tag renders a "Show hidden content" link for ignored user content. Only visible to logged-in users who have ignored users.

```html title="Template"
<xf:showignored wrapperclass="block-row" />
```

- `wrapperclass` - CSS class for the wrapper element.
- `wrapper` - HTML tag name for the wrapper (e.g., `div`, `span`).
- `class` - CSS classes for the link element.

### Widget position

The `<xf:widgetpos>` tag renders all widgets assigned to a named position.

```html title="Template"
<xf:widgetpos id="forum_list_sidebar" />
```

- `id` - The widget position ID (required).
- `position` - Where to place the widgets: `sidebar` or `sidenav`. When set, the rendered widgets are injected into that page section.
- `context-*` - Dynamic context parameters passed to the widgets (e.g., `context-forum_id="{$forum.node_id}"`).

### Ad

The `<xf:ad>` tag renders an advertisement at a named position.

```html title="Template"
<xf:ad position="forum_list_above" />
```

- `position` - The ad position identifier (required).
- `arg-*` - Dynamic arguments passed to the ad macro (e.g., `arg-forum_id="{$forum.node_id}"`).

### Font Awesome icon

The `<xf:fa>` tag inserts a Font Awesome icon.

```html title="Template"
<xf:fa icon="fa-user" />
<xf:fa icon="fa-circle-notch fa-spin" />
<xf:fa icon="fa-star fa-2x" />
```

- `icon` - The Font Awesome class(es). Must include the `fa-` prefix. Supports modifiers: `fa-spin`, `fa-pulse`, `fa-border`, `fa-flip-horizontal`, `fa-flip-vertical`, `fa-flip-both`, `fa-rotate-90`, `fa-rotate-180`, `fa-rotate-270`, and sizes `fa-xs` through `fa-9x`.

## Asset tags

### CSS

The `<xf:css>` tag includes a CSS/LESS template file, or renders inline CSS.

```html title="Template"
<!-- Include a CSS template -->
<xf:css src="mycss_file.css" />

<!-- Inline CSS -->
<xf:css>
    .my-class { color: red; }
</xf:css>
```

- `src` - The CSS or LESS template to include.

### JavaScript

The `<xf:js>` tag includes a JavaScript file, or renders inline JavaScript.

```html title="Template"
<!-- Include a JS file (relative to /js directory) -->
<xf:js src="myaddon/scripts/main.js" />

<!-- Inline JS -->
<xf:js>
    console.log('Loaded');
</xf:js>
```

- `src` - The JS file to include. Cannot be used with `prod` or `dev`.
- `prod` - JS file to include only in production mode.
- `dev` - JS file to include only in development mode.
- `min` - If true, replaces `.js` with `.min.js`. Respected only in production mode.
- `addon` - If true, uses the development JS URL. Respected only in development mode.

:::note
JavaScript files are served relative to the `/js` directory.
:::

### Core JavaScript

The `<xf:corejs>` tag includes XenForo's core JavaScript bundle. This is used by the page container template and is not normally needed in add-on templates.

```html title="Template"
<xf:corejs />
```

This tag has no attributes.

## Callback

The `<xf:callback>` tag calls a PHP method from a template. The method must be named with a read-only prefix.

```html title="Template"
<xf:callback class="Vendor\Addon\ClassName" method="getStats" params="['sidebar']"></xf:callback>
```

- `class` - The fully qualified PHP class name.
- `method` - The method to call (must use a read-only prefix).
- `params` - An array of parameters to pass to the method.

Allowed method name prefixes:

| Category | Prefixes |
|----------|----------|
| Checks & existence | `are`, `can`, `does`, `exists`, `has`, `is`, `validate`, `verify` |
| Fetching & data | `count`, `data`, `display`, `fetch`, `filter`, `find`, `get`, `pluck` |
| Rendering & output | `print`, `render`, `return`, `show`, `view` |
| Other | `total` |

## Data lists

Data lists display tabular data using XenForo template tags.

The `<xf:datalist>` tag is a container for `<xf:datarow>` elements and renders as a styled table.

### Data row

The `<xf:datarow>` tag represents a row within a datalist, containing `<xf:cell>` elements.

- `rowtype` - Set to `header` for a header row.
- `icon` - Icon for the row (adds an extra cell).
- `label` - Label for the row (adds an extra cell).
- `hint` - Hint text after the label (requires `label`).
- `explain` - Explanatory text below the label (requires `label`).

### Cell

The `<xf:cell>` tag represents a single cell within a data row.

- `width` - Cell width (CSS unit: px, %, rem, etc.).
- `colspan` - Number of columns to span.
- `rowspan` - Number of rows to span.
- `class` - CSS class for styling.

| Class | Description |
|-------|-------------|
| `dataList-cell--main` | Primary content cell |
| `dataList-cell--link` | Clickable cell |
| `dataList-cell--alt` | Alternative styling |
| `dataList-cell--action` | Action button cell |
| `dataList-cell--iconic` | Cell with an icon |
| `dataList-cell--min` | Minimal width cell |

### Data list example

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

## Forms

Most form input tags come in two forms: a **standalone** version that renders just the control, and a **row** version that wraps it in a label, hint, and explanation layout. For example, `<xf:textbox />` renders a plain text input, while `<xf:textboxrow />` renders the same input inside a styled form row. The standalone versions accept the same control attributes (like `name`, `value`, `placeholder`) but not the row-level attributes (like `label`, `hint`, `explain`).

Use the `*row` tags inside `<xf:form>` for standard form layouts. Use the standalone tags when you need a bare input outside of a form row, such as inside a `<xf:formrow>` with custom markup or in a non-form context like a search bar.

```html title="Template"
<!-- Standalone: just the input -->
<xf:textbox name="search" placeholder="{{ phrase('search') }}" />

<!-- Row: input wrapped in a form row with label -->
<xf:textboxrow name="title" value="{$title}" label="{{ phrase('title') }}" />
```

### Form container

The `<xf:form>` tag wraps form elements and renders as an HTML `<form>`.

- `action` - The form submission URL.
- `ajax` - If `true`, enables AJAX form submission.

### CSRF input

The `<xf:csrf>` tag renders a hidden input containing the CSRF token. This is the tag form of the `csrf_input()` function.

```html title="Template"
<form action="{{ link('my-action') }}" method="post">
    <xf:csrf />
    <!-- form fields -->
</form>
```

:::note
When using `<xf:form>`, the CSRF token is included automatically. Use `<xf:csrf>` only when building forms with plain `<form>` tags.
:::

See also [`csrf_input()`](#security) for the function form.

### Hidden value

The `<xf:hiddenval>` tag renders a hidden `<input>` field.

```html title="Template"
<xf:hiddenval name="redirect" value="{{ link('forums') }}" />
```

- `name` - The form field name.
- `value` - The field value.

### Common row attributes

All `*row` form tags share these attributes for controlling the row layout:

- `label` - Label text for the form control.
- `hint` - Hint text next to the label.
- `explain` - Explanatory text below the control.
- `error` - Error message displayed below the input, above the explain text.
- `rowclass` - Additional CSS classes for the row wrapper.
- `rowid` - HTML `id` for the row wrapper.
- `rowtype` - Type modifier for the row styling.
- `html` - Additional HTML after the control.

### Form row

The `<xf:formrow>` tag wraps any content in a styled form row with a label. Use this when none of the specialized `*row` tags fit your needs.

```html title="Template"
<xf:formrow label="{{ phrase('custom_input') }}"
    hint="{{ phrase('optional') }}"
    explain="{{ phrase('custom_input_explain') }}">
    <input type="text" name="custom_field" class="input" />
</xf:formrow>
```

### Info row

The `<xf:inforow>` tag renders a descriptive row without a form control. Use it to display read-only information within a form layout.

```html title="Template"
<xf:inforow label="{{ phrase('status') }}">
    {{ phrase('active_since', {'date': date($user.register_date)}) }}
</xf:inforow>
```

### Text box row

The `<xf:textboxrow>` tag renders a text input with a form row. Also available as `<xf:textbox />` without the row wrapper.

```html title="Template"
<xf:textboxrow name="title"
    value="{$title}"
    label="{{ phrase('title') }}"
    explain="{{ phrase('enter_a_title') }}"
    required="required" />
```

- `name` - Form field name.
- `value` - Current value.
- `type` - Input type: `text` (default), `email`, `url`, `search`, etc.
- `placeholder` - Placeholder text.
- `maxlength` - Maximum character length.
- `readonly` - If set, the input is read-only.
- `required` - If set, the field is required.
- `ac` - Set to `single` to enable autocomplete.

### Textarea row

The `<xf:textarearow>` tag renders a multi-line text input. Also available as `<xf:textarea />` without the row wrapper.

```html title="Template"
<xf:textarearow name="description"
    value="{$description}"
    label="{{ phrase('description') }}"
    autosize="true" />
```

- `name` - Form field name.
- `value` - Current value.
- `autosize` - If set, the textarea automatically resizes to fit content.
- `maxlength` - Maximum character length.
- `code` - If set, enables code highlighting.
- `readonly` - If set, the textarea is read-only.

### Number box row

The `<xf:numberboxrow>` tag renders a numeric input with optional min/max constraints. Also available as `<xf:numberbox />` without the row wrapper.

```html title="Template"
<xf:numberboxrow name="count"
    value="{$count}"
    label="{{ phrase('count') }}"
    min="0" max="100" step="1" />
```

- `name` - Form field name.
- `value` - Current value.
- `min` - Minimum allowed value.
- `max` - Maximum allowed value.
- `step` - Step increment.

### Password box row

The `<xf:passwordboxrow>` tag renders a password input with optional show/hide toggle and strength meter. Also available as `<xf:passwordbox />` without the row wrapper.

```html title="Template"
<xf:passwordboxrow name="password"
    label="{{ phrase('password') }}"
    checkstrength="true" />
```

- `name` - Form field name.
- `hideshow` - If `true` (default), shows a toggle to reveal the password.
- `checkstrength` - If `true`, displays a password strength meter.

### Select row

The `<xf:selectrow>` tag renders a dropdown selection menu in a form row. Also available as `<xf:select />` without the row wrapper.

```html title="Template"
<xf:selectrow name="category"
    value="{$categoryId}"
    label="{{ phrase('category') }}">
    <xf:option value="1">Category A</xf:option>
    <xf:option value="2">Category B</xf:option>
</xf:selectrow>

<!-- With dynamic options -->
<xf:selectrow name="category" value="{$categoryId}" label="{{ phrase('category') }}">
    <xf:options source="{$categories}" />
</xf:selectrow>
```

- `name` - Form field name.
- `value` - Pre-selected value (scalar for single, array for multiple).
- `multiple` - If `true`, allows multiple selections.
- `size` - Number of visible options.

The `<xf:option>` tag defines an option: `value`, `selected`, `disabled`, `hint`.

The `<xf:options>` tag generates options from a data source: `source`.

### Checkbox row

The `<xf:checkboxrow>` tag renders a group of checkboxes. Also available as `<xf:checkbox />` without the row wrapper.

```html title="Template"
<xf:checkboxrow label="{{ phrase('options') }}">
    <xf:option name="options[a]" value="1" selected="{$optionA}">
        {{ phrase('option_a') }}
    </xf:option>
    <xf:option name="options[b]" value="1" selected="{$optionB}">
        {{ phrase('option_b') }}
    </xf:option>
</xf:checkboxrow>
```

Each `<xf:option>` supports: `name`, `value`, `selected`, `label`, `hint`, `readonly`, `disabled`.

### Radio row

The `<xf:radiorow>` tag renders a group of radio buttons. Also available as `<xf:radio />` without the row wrapper. Uses the same `<xf:option>` syntax as checkboxes.

```html title="Template"
<xf:radiorow name="visibility" value="{$visibility}" label="{{ phrase('visibility') }}">
    <xf:option value="public">{{ phrase('public') }}</xf:option>
    <xf:option value="private">{{ phrase('private') }}</xf:option>
</xf:radiorow>
```

### Date input row

The `<xf:dateinputrow>` tag renders a date picker. Also available as `<xf:dateinput />` without the row wrapper.

```html title="Template"
<xf:dateinputrow name="start_date"
    value="{$startDate}"
    label="{{ phrase('start_date') }}" />
```

- `name` - Form field name.
- `value` - Current date value. Format: `Y-m-d`.

### Time input row

The `<xf:timeinputrow>` tag renders a time picker. Also available as `<xf:timeinput />` without the row wrapper.

```html title="Template"
<xf:timeinputrow name="event_time"
    value="{$eventTime}"
    label="{{ phrase('time') }}" />
```

- `name` - Form field name.
- `value` - Current time value. Format: `H:i`.

### Date-time input row

The `<xf:datetimeinputrow>` tag renders a combined date and time picker. Also available as `<xf:datetimeinput />` without the row wrapper.

```html title="Template"
<xf:datetimeinputrow name="scheduled_at"
    value="{$scheduledAt}"
    label="{{ phrase('scheduled_date') }}" />
```

- `name` - Form field name.
- `value` - Current date-time value.

### Upload row

The `<xf:uploadrow>` tag renders a file upload input. Also available as `<xf:upload />` without the row wrapper.

```html title="Template"
<xf:uploadrow name="avatar"
    label="{{ phrase('upload_avatar') }}"
    accept=".jpg,.png,.gif" />
```

- `name` - Form field name.
- `accept` - File type filter for the file browser.

### Editor row

The `<xf:editorrow>` tag renders the rich text (WYSIWYG) editor. Also available as `<xf:editor />` without the row wrapper.

- `name` - Form field name.
- `value` - Current BBCode content.
- `attachments` - Attachments array for the attachment manager.
- `previewable` - If `true` (default), shows a preview button.
- `maxlength` - Maximum character length.
- `removebuttons` - Array of toolbar buttons to hide.

### Code editor row

The `<xf:codeeditorrow>` tag renders a code editor with syntax highlighting. Also available as `<xf:codeeditor />` without the row wrapper.

- `name` - Form field name.
- `value` - Current value.
- `mode` - Syntax highlighting language.
- `rows` - Number of visible rows (default: 8).

### Token input row

The `<xf:tokeninputrow>` tag renders a tag/token input for entering multiple values. Also available as `<xf:tokeninput />` without the row wrapper.

- `name` - Form field name.
- `value` - Current values.
- `href` - URL for autocomplete suggestions.
- `min-length` - Minimum characters before autocomplete triggers (default: 2).
- `max-tokens` - Maximum number of tokens allowed.

### Telephone box row

The `<xf:telboxrow>` tag renders an international telephone input with a dial code selector. Also available as `<xf:telbox />` without the row wrapper.

- `dialcodename` - Form field name for the dial code (required).
- `intlnumbername` - Form field name for the full international number (required).

### Prefix input row

The `<xf:prefixinputrow>` tag renders a content prefix selector combined with a text input. Also available as `<xf:prefixinput />` without the row wrapper.

- `prefixes` - Available prefixes array (required).
- `type` - Content type for the prefixes (required).
- `prefix-name` - Field name for the prefix (default: `prefix_id`).
- `textbox-name` - Field name for the text input (default: `title`).
- `prefix-value` - Currently selected prefix.
- `textbox-value` - Current text input value.
- `href` - URL for dynamic prefix loading.

### Asset upload row

The `<xf:assetuploadrow>` tag renders a combined text input and file upload for managing assets (logos, favicons, etc.). Also available as `<xf:assetupload />` without the row wrapper.

- `asset` - The asset type (required).
- `name` - Form field name.
- `value` - Current value.

### Captcha row

The `<xf:captcharow>` tag renders a CAPTCHA challenge. Only displays when required by the visitor's permissions.

- `force` - If `true`, always shows the CAPTCHA.
- `force-visible` - If `true`, forces the CAPTCHA to be visible.

### Submit row

The `<xf:submitrow>` tag renders form submission buttons.

```html title="Template"
<xf:submitrow submit="{{ phrase('save') }}" sticky="true" />
```

- `submit` - Text for the submit button.
- `icon` - Icon for the submit button.
- `sticky` - If `true`, the submit row sticks to the bottom of the viewport.

### Radio tabs

The `<xf:radiotabs>` tag renders a radio button group styled as tabs. Uses the same `<xf:option>` syntax as radio rows.

```html title="Template"
<xf:radiotabs name="display_mode" value="{$displayMode}">
    <xf:option value="list">{{ phrase('list') }}</xf:option>
    <xf:option value="grid">{{ phrase('grid') }}</xf:option>
</xf:radiotabs>
```

### Captcha

The `<xf:captcha>` tag renders a standalone CAPTCHA challenge outside of a form row. For use within form rows, see `<xf:captcharow>`.

```html title="Template"
<xf:captcha />
```

- `force` - If `true`, always shows the CAPTCHA regardless of visitor permissions.
- `force-visible` - If `true`, forces the CAPTCHA to be visible.
- `context` - A context identifier for the CAPTCHA.

### Redirect input

The `<xf:redirectinput>` tag renders a hidden input that tells XenForo where to redirect after form submission. This is the tag form of the `redirect_input()` function.

```html title="Template"
<xf:redirectinput url="{{ link('forums') }}" />
```

- `url` - Explicit redirect URL.
- `fallback` - Fallback URL if no dynamic redirect is available.
- `referrer` - If `true` (default), uses the HTTP referrer for the redirect.

See also [`redirect_input()`](#template-utilities) for the function form.

### Mustache

The `<xf:mustache>` tag outputs Mustache template syntax for client-side rendering. XenForo uses this internally for JavaScript-rendered templates.

```html title="Template"
<xf:mustache name="username">
    <a href="{{link}}">{{text}}</a>
</xf:mustache>
```

- `name` - The Mustache variable name (required). Must be a string literal.

### Form example

```html title="Template"
<xf:form action="{{ link('test/save') }}" class="block" ajax="true">
    <div class="block-container">
        <div class="block-body">
            <xf:textboxrow name="title"
                value="{$item.title}"
                label="{{ phrase('title') }}"
                explain="{{ phrase('enter_a_title') }}"
                required="required" />

            <xf:selectrow name="category_id"
                value="{$item.category_id}"
                label="{{ phrase('category') }}">
                <xf:options source="{$categoryOptions}" />
            </xf:selectrow>

            <xf:checkboxrow label="{{ phrase('options') }}">
                <xf:option name="is_enabled" value="1" selected="{$item.is_enabled}">
                    {{ phrase('enabled') }}
                </xf:option>
            </xf:checkboxrow>

            <xf:submitrow submit="{{ phrase('save') }}" />
        </div>
    </div>
</xf:form>
```

## Functions

Template functions are called within expression syntax `{{ }}`. XenForo registers over 100 functions; the most commonly used are listed below.

### URL and linking

| Function | Description |
|----------|-------------|
| `link($route, $data, $params, $hash)` | Generates a URL from a route name. `$data` is an entity or array, `$params` is an array of query parameters, `$hash` is an optional URL fragment. |
| `link_type($type, $route, $data, $params)` | Generates a URL using a specific router type (e.g., `public`, `admin`). |
| `base_url($url, $full)` | Converts a relative URL to a full base URL. Set `$full` to `true` for an absolute URL. |

```html title="Template"
<a href="{{ link('threads', $thread) }}">View thread</a>
<a href="{{ link('forums', $forum, {'page': 2}) }}">Page 2</a>
<a href="{{ link('posts', $post, {}, 'post-{$post.post_id}') }}">Jump to post</a>
```

### Phrases

| Function | Description |
|----------|-------------|
| `phrase($name, $params)` | Returns a translated phrase. `$name` must be a string literal. `$params` is an optional key-value array for placeholders. |
| `phrase_dynamic($name, $params)` | Returns a phrase when the name is stored in a variable. Use this when the phrase name is determined at runtime. |

```html title="Template"
{{ phrase('welcome_message') }}
{{ phrase('greeting', {'name': $xf.visitor.username}) }}
{{ phrase_dynamic($phraseName) }}
```

:::warning
The `phrase()` function requires a string literal for the name. Using a variable (e.g., `phrase($myVar)`) will cause a compile error. Use `phrase_dynamic()` for variable phrase names.
:::

### Date and time

| Function | Description |
|----------|-------------|
| `date($timestamp, $format)` | Formats a timestamp as a date. `$format` is an optional PHP date format string. |
| `date_time($timestamp)` | Formats a timestamp as a date and time string. |
| `time($timestamp, $format)` | Formats a timestamp as a time string. |
| `date_dynamic($timestamp, $attributes)` | Renders a dynamic date element that displays relative time (e.g., "5 minutes ago"). |
| `date_from_format($format, $dateString, $timeZone)` | Parses a date string using a PHP date format. `$timeZone` defaults to the current user's timezone. Returns a `DateTime` object. |
| `duration($number, $units)` | Formats a duration as a phrase (e.g., "5 days"). `$units` accepts `years`, `months`, `weeks`, `days`, `hours`, `minutes`, or `seconds`. |

```html title="Template"
{{ date($thread.post_date, 'M j, Y') }}
{{ date_time($thread.post_date) }}
{{ date_dynamic($thread.post_date) }}
```

### Content rendering

| Function | Description |
|----------|-------------|
| `bb_code($bbCode, $context, $content, $options)` | Renders BBCode as HTML. `$context` is the content type, `$content` is the source entity. |
| `bb_code_snippet($bbCode, $context, $content, $maxLength)` | Renders a BBCode snippet truncated to `$maxLength` characters. |
| `snippet($string, $maxLength, $options)` | Creates a plain text snippet, optionally with highlighting. |
| `structured_text($string, $nl2br)` | Converts plain text to HTML with auto-linking and paragraph formatting. |
| `highlight($string, $term, $class)` | Highlights a search term in a string. `$class` defaults to `textHighlight`. |
| `smilie($string)` | Converts smilie codes to images. |
| `prefix($contentType, $prefixId, $format, $append)` | Renders a content prefix. `$format` is `html` (default), `plain`, or `css`. `$append` is an optional separator string. |
| `prefix_title($contentType, $prefixId)` | Returns the title phrase for a content prefix. |
| `react($config)` | Renders a reaction button. `$config` is an array with keys: `content`, `link`, `params`, `class`. The content entity must support reactions. |
| `reactions($content, $link, $linkParams)` | Renders the reactions summary for a content entity that supports reactions. |

```html title="Template"
{$post.message|bb_code('post', $post)|raw}
{{ snippet($thread.FirstPost.message, 150) }}
{{ highlight($result.title, $searchTerm) }}
{{ prefix('thread', $thread.prefix_id) }}{$thread.title}
```

### Security

| Function | Description |
|----------|-------------|
| `csrf_input()` | Returns a hidden `<input>` element containing the CSRF token. Required in manually built forms. |
| `csrf_token()` | Returns the raw CSRF token string. |
| `captcha($force)` | Renders a CAPTCHA challenge if required. |

```html title="Template"
<form action="{{ link('my-action') }}" method="post">
    {{ csrf_input() }}
    <!-- form fields -->
</form>
```

### Numbers and math

| Function | Description |
|----------|-------------|
| `number($value, $precision)` | Formats a number according to locale settings. `$precision` is decimal places (default: 0). |
| `number_short($value, $precision)` | Formats a number in short form (e.g., 1.2K, 3.4M). |
| `file_size($bytes)` | Formats a byte count as a human-readable file size (e.g., "1.5 MB"). |
| `count($value)` | Returns the count of an array or countable object. |
| `ceil($value)` | Rounds a number up. |
| `floor($value)` | Rounds a number down. |
| `min($a, $b, ...)` | Returns the smallest value. |
| `max($a, $b, ...)` | Returns the largest value. |
| `rand($min, $max)` | Generates a random integer between `$min` and `$max`. |
| `range($start, $end, $step)` | Generates a sequential array of numbers. |

```html title="Template"
{{ number($thread.reply_count) }}
{{ number_short($forum.message_count) }}
{{ file_size($attachment.file_size) }}
```

### String utilities

| Function | Description |
|----------|-------------|
| `sprintf($format, ...$args)` | Formats a string using printf-style placeholders. |
| `strlen($string)` | Returns the string length. |
| `contains($haystack, $needle)` | Returns `true` if `$haystack` contains `$needle`. |
| `repeat($string, $count)` | Repeats a string `$count` times. |
| `trim($string)` | Trims whitespace from a string. |

```html title="Template"
{{ sprintf('%s has %d posts', $user.username, $user.message_count) }}
{{ strlen($title) }}
<xf:if is="{{ contains($title, 'important') }}">...</xf:if>
```

### Array utilities

| Function | Description |
|----------|-------------|
| `in_array($needle, $haystack, $strict)` | Tests if a value exists in an array. |
| `is_array($value)` | Tests if a value is an array. |
| `key_exists($array, $key)` | Tests if an array key exists. |
| `array_keys($array)` | Returns all keys of an array. |
| `array_values($array)` | Returns all values of an array. |
| `array_merge($array1, $array2, ...)` | Merges arrays together. |
| `array_reverse($array)` | Reverses array element order. |
| `array_diff($array1, $array2, ...)` | Returns values in the first array that are not in subsequent arrays. |
| `array_first($array)` | Returns the first element of an array. |
| `array_last($array)` | Returns the last element of an array. |
| `array_sum($array)` | Returns the sum of array values. |

```html title="Template"
<xf:if is="{{ in_array($thread.discussion_type, ['question', 'poll']) }}">...</xf:if>
{{ array_first($items).title }}
{{ array_sum($scores) }}
```

### Type checks

| Function | Description |
|----------|-------------|
| `empty($value)` | Tests if a value is empty. |
| `is_scalar($value)` | Tests if a value is a scalar (string, number, boolean). |
| `is_phrase($value)` | Tests if a value is a `Phrase` object. |

```html title="Template"
<xf:if is="{{ !empty($items) }}">...</xf:if>
<xf:if is="{{ is_scalar($value) }}">{{ $value }}<xf:else />Complex value</xf:if>
```

### Template utilities

| Function | Description |
|----------|-------------|
| `unique_id($base)` | Generates a unique ID string, useful for linking labels to inputs. `$base` is an optional prefix. |
| `property($name, $fallback)` | Returns a style property value. Essential for CSS templates. |
| `dump($value)` | Outputs a debug dump of a value. Only works in debug mode. |
| `max_length($entity, $column)` | Returns the maximum length for an entity column. `$entity` can be an entity instance or a short name string (e.g., `'XF:Thread'`). Useful for setting `maxlength` on form inputs. |
| `is_addon_active($addOnId, $versionId, $operator)` | Returns `true` if the specified add-on is active. `$versionId` and `$operator` (default: `>=`) are optional. |
| `is_toggled($storageKey)` | Checks if a UI toggle element is in the toggled state. |
| `page_nav($config)` | Renders pagination. `$config` is an array with keys: `page`, `perPage`, `total`, `link`, `data`, `params`. |
| `redirect_input($url, $fallbackUrl)` | Creates a hidden input for redirect URLs after form submission. |
| `call_macro($template, $name, $arguments)` | Calls a macro programmatically. |

```html title="Template"
<xf:set var="$inputId" value="{{ unique_id('myfield') }}" />
<label for="{$inputId}">{{ phrase('name') }}</label>
<input type="text" id="{$inputId}" name="name" />

<xf:if is="{{ is_addon_active('Demo/Addon') }}">
    <p>Demo add-on features enabled.</p>
</xf:if>
```

## Filters

Filters transform a value using the pipe syntax: `{{ $value | filterName }}` or `{{ $value | filterName(arg1, arg2) }}`.

### Output control

| Filter | Description |
|--------|-------------|
| `raw` | Disables HTML escaping. **Use with caution.** Only apply to values you trust. |
| `escape` | Forces HTML escaping on a value. |
| `preescaped` | Marks a value as already escaped, preventing double-escaping. |
| `for_attr` | Escapes a value for safe use in an HTML attribute. |

```html title="Template"
<!-- Unescaped HTML output (trusted content only) -->
{$htmlContent|raw}

<!-- Force escaping -->
{{ $value | escape }}
```

:::warning
The `raw` filter disables auto-escaping. Never use it with user-supplied content. This creates an XSS vulnerability.
:::

### Number formatting

| Filter | Description |
|--------|-------------|
| `number($precision)` | Formats a number with locale-appropriate separators. `$precision` is decimal places (default: 0). |
| `number_short($precision)` | Abbreviated number (e.g., 1.2K, 3.4M). |
| `currency($code, $format, $showZero)` | Formats as currency. `$code` is the currency code (e.g., `USD`). |
| `file_size` | Formats bytes as a readable file size. |
| `zerofill($length)` | Pads an integer with leading zeros to `$length` digits (default: 3). |

```html title="Template"
{{ $price | number(2) }}
{{ $price | currency('USD') }}
{{ $downloadSize | file_size }}
```

### String manipulation

| Filter | Description |
|--------|-------------|
| `to_lower` | Converts to lowercase. Pass `lcfirst` to lowercase only the first character. |
| `to_upper` | Converts to uppercase. Pass `ucfirst` or `ucwords` for other modes. |
| `substr($start, $length)` | Extracts a substring. |
| `replace($from, $to)` | Replaces occurrences of `$from` with `$to`. |
| `strip_tags($allowed)` | Removes HTML tags. `$allowed` is an optional string of tags to keep. |
| `nl2br` | Converts newlines to `<br>` tags. |
| `nl2nl` | Converts literal `\n` escape sequences to actual newline characters. |
| `de_camel($glue)` | Converts `camelCase` to separated words. `$glue` defaults to a space. |
| `split($delimiter, $limit)` | Splits a string into an array. `$delimiter` defaults to `,`. |
| `censor($char)` | Applies word censoring. |
| `hex` | Converts to hexadecimal representation. |
| `pad($char, $length, $postPad)` | Pads a string to `$length` with `$char`. Set `$postPad` to `true` to pad on the right. |
| `format(...$args)` | Applies `sprintf`-style formatting. |

```html title="Template"
{{ $username | to_lower }}
{{ $title | substr(0, 50) }}
{{ 'camelCaseString' | de_camel }}  <!-- "camel Case String" -->
```

### Array manipulation

| Filter | Description |
|--------|-------------|
| `join($glue)` | Joins array elements into a string. `$glue` defaults to `,`. |
| `pluck($valueField, $keyField)` | Extracts a field from each element in a collection. |
| `count` | Returns the number of elements. |
| `first` | Returns the first element. |
| `last` | Returns the last element. |
| `numeric_keys_only` | Filters an array to contain only numeric keys. |

```html title="Template"
{{ $names | join(', ') }}
{{ $items | pluck('title') | join(', ') }}
{{ $items | count }}
```

### Encoding

| Filter | Description |
|--------|-------------|
| `json($prettyPrint)` | Encodes as JSON. Set `$prettyPrint` to `true` for formatted output. |
| `urlencode` | URL-encodes a string. |
| `url($component, $fallback)` | Parses a URL and optionally extracts a component (e.g., `host`, `path`). |
| `url_display($component, $fallback)` | Like `url`, but first decodes punycode to UTF-8 for display. Returns `$fallback` on invalid URLs. |
| `htmlspecialchars` | Escapes HTML special characters. |
| `ip` | Converts a binary IP address to its string representation. |
| `host` | Resolves an IP address to its hostname. |
| `email_display` | Converts an email address to a UTF-8 display format. |

```html title="Template"
<div data-config='{{ $config | json }}'></div>
{{ $externalUrl | url('host') }}
```

### Other

| Filter | Description |
|--------|-------------|
| `default($fallback)` | Returns `$fallback` if the value is null. |
| `emoji` | Converts emoji shortcodes to images. |
| `parens` | Wraps the value in localized parentheses. |
| `split_long($length, $inserter)` | Inserts a break character every `$length` characters in long words. |
