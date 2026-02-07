# Demo/ToolTip
This step-by-step tutorial explains how to add a custom permission that controls which users and user groups can view the tooltip popup when hovering over usernames.

## Creating the add-on
To begin, similar to the Demo/Portal add-on, we'll run a command and provide some basic information.
```sh title="Terminal"
php cmd.php xf-addon:create
```

:::note Terminal output
    **Enter an ID for this add-on:** Demo/ToolTip

    **Enter a title:** Demo - ToolTip

    **Enter a version ID:** This integer will be used for internal variable comparisons.
    
    Each release of your addon should increase this number:  1000010

    Version string set to: 1.0.0 Alpha

    **Does this add-on supersede a XenForo 1 add-on? (y/n)** n

    The addon.json file was successfully written out to /var/www/src/addons/Demo/ToolTip/addon.json

    **Does your add-on need a Setup file? (y/n)** y

    **Does your Setup need to support running multiple steps? (y/n)** y

    The Setup.php file was successfully written out to /var/www/src/addons/Demo/ToolTip/Setup.php
:::

After this has been done, we can do a couple of things to make our development a little easier. All we need to do is make sure this exists:
```php title="config.php"
$config['development']['enabled'] = true;
$config['development']['defaultAddOn'] = 'Demo/ToolTip';
```

## Adding elements
With the add-on framework in place, we'll now create several elements through the admin control panel.
This is usually done throughout development, but we can add everything at once since this add-on was planned beforehand.

### Phrases
We're only going to need two actual phrases for this, the rest of them will be created when we define the permission.

To create a phrase go onto your admin control panel, click on the sidebar `Appearance` and then click on `Phrases`.
The top right of your screen you will see a button called `Add phrase` click that,
and you will see where we can input our phrase information.

The phrases will be using are:

```txt title="demo_tooltip_title"
Cannot Load
```

```txt title="demo_tooltip_text"
You lack the permission to view user tooltips. If you believe this be an error, please contact a site administrator.
```

Now you can notice in the phrase title I use the add-on name and sub name.
This is a way of standardising your add-ons.
This is a personal preference and up to you.

### Permission Definition
To create the permission, ensure that `$config['development']['enabled'] = true;` is set in your config.php file,
otherwise the Development tab will not appear in your admin control panel.

Once again look at your sidebar, and scroll down until you see `Development`,
click on that and then click on `Permission definitions`.
This will open up a screen showing every permission a user / user group can have.
I suggest taking a look to get an idea of what permissions exist already,
but for now we only need to find the section titled `General permissions` on the right of that we need to click on the `Add permission` button.

Now we need to input a bit of information about this permission.

| Field                        | Value                 | Reason                             |
|------------------------------|-----------------------|------------------------------------|
| **Permission group**         | general               | Default group for general perms    |
| **Permission ID**            | viewProfileToolTip    | Unique ID for this permission      |
| **Title**                    | View Profile Tool Tip | Display name shown in UI           |
| **Depends on permission ID** | *(empty)*             | No dependency set                  |
| **Permission type**          | Flag                  | Boolean flag type permission       |
| **Interface group**          | General permissions   | Grouping for permission categories |
| **Display order**            | 55                    | Position in UI order               |
| **Add-on**                   | Demo - ToolTip        | The add-on it's being added to     |

### Template
Next, we'll create our custom template.
First, let's examine the existing `member_tooltip` template for reference.
To do this again go onto the sidebar and click on the `Appearance` tab, next click on the `Templates` section.
You can see we have Public templates, Email templates, and Admin templates.
Right now we're going to be adding a template that users will be able to see, so we'll be creating a public template.

In the public tab you can filter (top right) for the text `member_tooltip`, when you click on it,
you'll be able to see the template that gets loaded every time someone hovers over a username.

On the top right click `Add template`, at the top of your area you'll see the Type, make sure that is on Public.
Next, fill in the template with this:

```txt title="Template name"
no_permission_member_tooltip
```

```txt title="Template context"
<div class="block-header">{{ phrase('demo_tooltip_title') }}</div>
<div class="block-content">
	<p class="blockMessage blockMessage--important">{{ phrase('demo_tooltip_text') }}</p>
</div>
```

Simple, isn't it?
With this template in place, we now have content to display when users lack permission to view member tooltips.

## Modifying the controller
Site actions are managed through controllers.
For more information on how controllers work, refer to the [Controller Basics](docs/devs/controller-basics.md) page.

Open your IDE. It's time to write some code. Don't worry, this part is straight forward as well!

In the root of your project so `src/addons/Demo/ToolTip` we'll need to create a few folders with the goal of mirroring xenforo a little.
We want our project to end up looking like this:
```title="Folder structure"
├── Setup.php
├── XF
│   └── Pub
│       └── Controller
│           └── MemberController.php
├── _output
│       ├── permissions
│       │   ├── _metadata.json
│       │   └── general-viewProfileToolTip.json
│       └── phrases
│           ├── _metadata.json
│           ├── permission.general_viewProfileToolTip.txt
│           ├── demo_tooltip_text.txt
│           └── demo_tooltip_title.txt
└── addon.json
```
As you can see Add the folders `XF/Pub/Controller` Now this is not required, but I find it easier to work with.

Now entering our `MemberController.php` we want to start off by doing a little bit of set-up:
```php
<?php

namespace Demo\ToolTip\XF\Pub\Controller;

use XF;
use XF\Mvc\ParameterBag;
use XF\Mvc\Reply\Exception;
use XF\Mvc\Reply\View;
use XF\Pub\Controller\MemberController as XFMember;

class MemberController extends XFMember
{
}
```
What is this code doing?

This PHP code creates a class that extends XenForo's built-in MemberController:

1. `use` statements - Import necessary XenForo classes for use in our controller
2. `use XF\Pub\Controller\MemberController as XFMember` - Imports the original controller and gives it an alias
3. `class MemberController extends XFMember` - Creates our controller that extends XenForo's controller

By extending Xenforo's core MemberController, we can override specific methods to add our permission check for tooltips while keeping all the original functionality intact.

Next we want to target the method in the MemberController called actionToolTip:
```php
public function actionTooltip(ParameterBag $params)
{
    $this->assertNotEmbeddedImageRequest();
    
    $user = $this->assertViewableUser($params->user_id, [], true);
    
    $viewParams = [
        'user' => $user,
    ];
    
    return $this->view('XF:Member\Tooltip', 'member_tooltip', $viewParams);
}
```

Let's go back to our MemberController and create something similar.
```php
public function actionTooltip(ParameterBag $params): View
{
    $this->assertNotEmbeddedImageRequest();

    // Fetch the current visitor
    $visitor = XF::visitor();
    
    // Perform a check on that visitor to see if they have the permission we defined earlier.
    $hasPermission = $visitor->hasPermission('general', 'viewProfileToolTip');

    if ($hasPermission) {
        // If the visitor does have permission to view the tool tip.
        // We run the original logic, as it works great as is.
        $user = $this->assertViewableUser($params->user_id, [], true);
        
        $viewParams = [
            'user' => $user,
        ];

        return $this->view('XF:Member\Tooltip', 'member_tooltip', $viewParams);
    } else {
        // If the visitor doesn't have permission, this is where we change what happens.
        
        // This loads in a different template.
        // Parameter1 = $viewClass, Parameter2 = $templateName, Parameter3 = $params
        // 1. We still need to load it as a Tooltip.
        // 2. We are changing the template to the template we created earlier.
        // 3. We don't need to pass the user data, so we just send an empty array instead.
        return $this->view('XF:Member\Tooltip', 'no_permission_member_tooltip', []);
    }
}
```

## Customising the addon.json
When we created our add-on, XenForo automatically generated a basic addon.json file for us.
This file contains information about our add-on and is used by XenForo to identify and display information about it in the Admin control panel.

Let's modify this file to include information that will make our add-on more professional and user-friendly.
Open the file located at src/addons/Demo/ToolTip/addon.json in your IDE:

```json title="Default addon.json"
{
  "legacy_addon_id": "",
  "title": "Demo - ToolTip",
  "description": "",
  "version_id": 1000010,
  "version_string": "1.0.0 Alpha",
  "dev": "",
  "dev_url": "",
  "faq_url": "",
  "support_url": "",
  "extra_urls": [],
  "require": [],
  "icon": ""
}
```

Here's what you need to know when customising this file [add-on structure properties](docs/devs/add-on-structure.md#properties).

## Registering the class extension

Our add-on is nearly complete.
All that is left is for us to go back into the admin control panel,
head on down to `Development`, then into `Class extensions`.

At the top right of your screen you’ll see `Add class extension`, click that.
You’re going to want to fill in this class extension with:
```title="Base class name"
XF\Pub\Controller\MemberController
```

```title="Extension class name"
Demo\ToolTip\XF\Pub\Controller\MemberController
```

The rest of it can be left as is, now just save it.

## Checking the add-on works
One final time, head into your admin control panel.
Click `Groups & Permissions` then onto `User group permissions`.
We want to set the `Guest` group to have `View Profile Tool Tip` set to `No`.
Then we want to go into `Registered` and change `View Profile Tool Tip` to `Yes` for them.

Now when you go onto your site, if you’re logged in, you should have no problem viewing user profile tooltips.
And if you log out of your account and try again, you should see your template pop up instead.

## Building the add-on
Now that your add-on is fully functional, let's package it for distribution.
To build a release ZIP file that you can share or install on other XenForo installations,
you need to run the following command:

```sh title="Terminal"
php cmd.php xf-addon:build-release Demo/ToolTip
```

:::note Terminal output
    Performing add-on export.
    
    Exporting data for Demo - ToolTip to /var/www/html/src/addons/Demo/ToolTip/_data.

    27/27 [============================] 100%

    Written successfully.

    Attempting to validate addon.json file...

    JSON file validates successfully!
    
    Building release ZIP.
    
    Writing release ZIP to /var/www/html/src/addons/Demo/ToolTip/_releases.
    
    Release written successfully.
:::

### What Just Happened?
This command performs several important tasks:

1. Exports all your add-on data to the _data directory
2. Validates your add-on configuration in addon.json
3. Creates a ZIP file in the _releases directory that contains everything needed to install your add-on

Congratulations on completing your XenForo add-on from start to finish!
You have learned how to create permissions, templates, phrases, and extend classes.

You are welcome to download a copy of the completed add-on here: [Demo-ToolTip-1.0.0 Alpha.zip](/files/Demo-ToolTip-1.0.0%20Alpha.zip).
