# Template Basics
The following sections go into detail about some of the template concepts you will come across while developing a Xenforo add-on or modifying the site's default templates.

## Template Types

Xenforo uses several types of templates:

- **Public templates**: These control the appearance of the public-facing areas of your forum, such as thread listings, post-displays, and user profiles.
- **Admin templates**: These control the appearance of the Admin Control Panel.
- **Email templates**: These define the structure and content of emails sent by Xenforo.
- **CSS templates**: These contain CSS/LESS code that controls the styling of your forum.

## Template Structure

A typical Xenforo template consists of:

1. **HTML**: Standard HTML that forms the structure of the page.
2. **Xenforo template tags**: Special tags prefixed with `xf:`.
3. **Template variables**: Values that are passed from the controller to the template, accessed using `{{ $variableName }}` syntax.
4. **Template macros**: Reusable blocks of template code that can be called from multiple places.

## Accessing Templates

Templates can be accessed and modified in several ways:

1. **Admin Control Panel**: Navigate to Appearance > Templates to edit templates directly in the browser.
2. **Development mode**: When development mode is enabled, templates can be edited directly in the file system under the `_output` directory of your add-on.
3. **Template modifications**: You can create template modifications to alter existing templates without directly editing them.

## Template Variables

Templates receive variables from controllers, which can be displayed or used in logic within the template. Variables are accessed using the `{{ $variableName }}` syntax (with double curly braces).

In a controller, you can pass variables to a template using the `$viewParams` array:

```php title="Controller"
public function actionIndex(): View
{
    $viewParams = [
        'title' => 'Demo Page',
        'active' => true,
        'number' => 12345.6789,
        'items' => [
            ['title' => 'First item', 'value' => 12.3456, 'created' => XF::$time - 86400],
            ['title' => 'Second item', 'value' => 9876.54321, 'created' => XF::$time - 3600],
            ['title' => 'Third item', 'value' => 42, 'created' => XF::$time],
        ],
        // More variables...
    ];

    return $this->view('Namespace:Class', 'template_name', $viewParams);
}
```

These variables are then accessible in your template:

```html title="Template"
<h1>{{ $title }}</h1>
<p>Number: {{ $number }}</p>
```

Common Xenforo variables include:

- `{{ $xf.visitor }}`: Information about the current user
- `{{ $xf.options.optionName }}`: Access to Xenforo options
- `{{ $xf.time }}`: The current server time (for example: `{{ date($xf.time, 'M j, Y H:i') }}`)

Xenforo provides powerful phrase functions for language translation and localisation. Here are examples from the sample template:

### Static Phrases

Static phrases are defined using the `phrase()` function:

```html title="Template"
<h1>{{ phrase('demo_page_header') }}</h1>
<h2 class="block-header">{{ phrase('quick_summary') }}</h2>
<div class="block-row">{{ phrase('the_feature_is_active') }}</div>
```

### Dynamic Phrases

For cases where you need to use a variable as the phrase name, use the `phrase_dynamic()` function:

```html title="Template"
<!-- Using a variable as the phrase name -->
{{ phrase_dynamic($phraseName) }}
```

In the controller, you would pass the phrase name as a variable:

```php title="Controller"
$viewParams = [
    'phraseName' => 'demo_test_phrase',
    // other variables...
];
```

### Phrases with Parameters

You can also pass parameters to phrases:

```html
<!-- With additional parameters -->
{{ phrase_dynamic('greeting_with_name', {'username': $xf.visitor.username}) }}
```

This would reference a phrase like `Hello, {username}!` and insert the current user's username where the variable is in the phrase.

## Template Logic

### Conditional Logic

To create an if statement in a template, we use `<xf:if>` tags for conditional logic. Here's a real example from a template:

```html title="Template"
<xf:if is="{{ $xf.visitor.user_id }}">
    <strong>{{ $xf.visitor.username }}</strong>
    <xf:else />
    <strong>{{ phrase('guest') }}</strong>
</xf:if>
```

You can also base conditions on variables passed from the controller:

```html title="Template"
<xf:if is="{{ $active }}">
    <div class="block-row">{{ phrase('the_feature_is_active') }}</div>
    <xf:else />
    <div class="block-row">{{ phrase('the_feature_is_inactive') }}</div>
</xf:if>
```

### Loops

To create a loop we can use `<xf:foreach>` to iterate through arrays. Here's an example that loops through an array of items:

```html title="Template"
<xf:foreach loop="{{ $items }}" value="$item">
    <div class="block-row">
        <h3 class="block-textHeader">{{ $item.title }}</h3>
        <div>
            {{ phrase('value') }}: <strong>{{ $item.value | number(2) }}</strong>
            •
            {{ phrase('created') }}: <strong>{{ date($item.created, 'M j, Y H:i') }}</strong>
        </div>
    </div>
</xf:foreach>
```

This matches with the array structure in the controller:

```php title="Controller"
'items' => [
    ['title' => 'First item', 'value' => 12.3456, 'created' => XF::$time - 86400],
    ['title' => 'Second item', 'value' => 9876.54321, 'created' => XF::$time - 3600],
    ['title' => 'Third item', 'value' => 42, 'created' => XF::$time],
],
```

### Setting Variables

```html title="Template"
<xf:set var="$myVariable" value="Some value" />
<!-- Now you can use {{ $myVariable }} elsewhere in the template -->
```

## Template Macros

Macros are reusable blocks of template code. Here's a real example of defining and using a macro:

```html title="Template"
<!-- Macro definition -->
<xf:macro id="alert" arg-type="info" arg-message="">
    <div class="block block--{{ $type }}">
        <div class="block-container">
            <h3 class="block-header">{{ phrase('notice') }}</h3>
            <div class="block-body block-row">
                {{ $message }}
            </div>
        </div>
    </div>
</xf:macro>

<!-- Using the macro -->
<xf:macro id="alert" arg-type="success" arg-message="{{ phrase('operation_completed_successfully') }}" />
```

The macro defines reusable content with customisable parameters (`arg-type` and `arg-message`). When you call the macro, you can provide different values for these parameters to customise the output.

### Macro Parameters

Parameters in macros are defined with the `arg-` prefix followed by the parameter name. In the example above:

- `arg-type`: This parameter defines the type of alert to display. The macro uses this value in `block--{{ $type }}` to set a CSS class that will style the alert differently based on the type (success, info, warning, error, etc.). In the macro call, we set it to "success" to display a success-styled alert.

- `arg-message`: This parameter sets the content to be displayed in the alert box. In our example, it's set to a phrase that displays "Operation completed successfully". You can pass static text, phrases, or dynamic content from variables.

Inside the macro, these parameters become regular variables without the `arg-` prefix (e.g., `{{ $type }}` and `{{ $message }}`). Default values can be set when defining the macro (like `arg-type="info"`) which will be used if not specified in the macro call.

### Example: Item Card Macro

This macro creates a reusable card component for displaying items with consistent styling:

```php title="Controller"
$viewParams = [
    'items' => [
        ['title' => 'First item', 'value' => 12.3456, 'created' => XF::$time - 86400],
        ['title' => 'Second item', 'value' => 9876.54321, 'created' => XF::$time - 3600],
        ['title' => 'Third item', 'value' => 42, 'created' => XF::$time],
    ]
]
```

```html title="Template"
<!-- Macro definition -->
<xf:macro id="item_card" arg-title="" arg-value="0" arg-created="{{ $xf.time }}" arg-showDate="true">
    <div class="block-row itemCard">
        <div class="itemCard-header">
            <h3 class="block-textHeader">{{ $title }}</h3>
        </div>
        <div class="itemCard-body">
            <div class="itemCard-value">
                {{ phrase('value') }}: <strong>{{ $value | number(2) }}</strong>
            </div>
            <xf:if is="{{ $showDate }}">
                <div class="itemCard-meta">
                    {{ phrase('created') }}: <span class="u-muted">{{ date($created, 'M j, Y H:i') }}</span>
                </div>
            </xf:if>
        </div>
    </div>
</xf:macro>

<!-- Using the macro to display items -->
<div class="block">
    <div class="block-container">
        <h2 class="block-header">{{ phrase('items') }}</h2>
        <div class="block-body">
            <xf:if is="{{ $items }}">
                <xf:foreach loop="{{ $items }}" value="$item">
                    <xf:macro id="item_card" 
                        arg-title="{{ $item.title }}" 
                        arg-value="{{ $item.value }}" 
                        arg-created="{{ $item.created }}" />
                </xf:foreach>
            <xf:else />
                <div class="block-row">
                    {{ phrase('no_items_to_display') }}
                </div>
            </xf:if>
        </div>
    </div>
</div>
```

How This Macro Works

1. **Definition**:
    - The `item_card` macro takes four parameters:
        - `arg-title`: The title of the item (required, but defaults to empty string)
        - `arg-value`: The numeric value of the item (defaults to 0)
        - `arg-created`: The timestamp when the item was created (defaults to current time)
        - `arg-showDate`: Boolean to control whether to show the date (defaults to true)

2. **Structure**:
    - The macro creates a consistent card layout with a header and body.
    - The header contains the item title
    - The body displays the formatted value and conditionally shows the creation date.
    - The value is formatted with the `number` filter to display 2 decimal places.
    - The date is formatted using the `date` function with a specific format string.

3. **Usage**:
    - Inside a foreach loop, the macro is called for each item in the `$items` array.
    - Parameters are passed directly from each item's properties.
    - This creates a consistent display for all items without repeating markup.
    - The conditional statement (`<xf:if is="{{ $items }}">`) ensures a fallback message is shown if no items exist.

## UI Components and Form Elements

Xenforo provides template tags for common UI components and form elements. Here are examples:

### Buttons

```html title="Template"
<!-- Primary button with link -->
<xf:button class="button--primary" href="{{ link('index') }}">
    {{ phrase('go_to_home') }}
</xf:button>

<!-- Regular button with link -->
<xf:button href="{{ link('whats-new') }}">
    {{ phrase('view_whats_new') }}
</xf:button>
```

### Form Elements

```html title="Template"
<!-- Complete form with action and method -->
<xf:form action="{{ link('test') }}" method="post">
    <!-- Text input with current value from controller -->
    <xf:textbox name="title" value="{{ $title }}" label="{{ phrase('title') }}" />

    <!-- Select dropdown with options -->
    <xf:select name="type" value="{{ $type }}" label="{{ phrase('type') }}">
        <xf:option value="type1">{{ phrase('type_1') }}</xf:option>
        <xf:option value="type2">{{ phrase('type_2') }}</xf:option>
    </xf:select>

    <!-- Checkbox group with a single option -->
    <xf:checkboxrow>
        <xf:option name="is_enabled" value="1" selected="{{ $isEnabled }}">
            {{ phrase('active') }}
        </xf:option>
    </xf:checkboxrow>

    <!-- Form submission button -->
    <xf:submitrow submit="{{ phrase('save_changes') }}" />
</xf:form>
```

These form elements use variables from the controller:

```php title="Controller"
$viewParams = [
    'title' => 'Demo Page',
    'type' => 'type1',          // For select dropdown default
    'isEnabled' => false,       // For checkbox default state
    // other variables...
];
```