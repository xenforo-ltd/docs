# Custom user fields

Custom user fields let you define additional information or preferences that you want to collect from users. These values can be displayed with messages or in profiles, used for internal data, or even to change behaviors in XenForo through template changes.

When creating a field, there are a number of options you can control. First, you must pick an ID for the field. This is how the field will be referred to internally and can only contain alphanumeric characters. Once set, it cannot be changed. For some of the more advanced custom field functionality, you will need to know this ID.

Each field will roughly fall into one of two categories:

* Text fields - these fields are free form and users can enter whatever value they like. You have several different options to control the exact type of content that the field allows (single line, multi line, rich text) and various validation options to provide some control over what users enter.
* Choice fields - with these fields, users will be choosing from a predefined list of options. Each option you define will consist of a value and a text component. The value is what is stored internally for the field (and may only use alphanumeric characters), while the text is what will be displayed to end users.

Beyond this, there are options that apply to all fields. These include controls over how the field is editable and where it is displayed.

For advanced actions, you may access fields in templates via `{$xf.visitor.Profile.custom_fields.fieldId}`. This can be used in conjunction with template conditionals to change the output based on a user's custom field value. Note that this example is accessing the value from the current visitor's custom fields. A different variable may need to be used to access, for example, the user that posted a particular message.