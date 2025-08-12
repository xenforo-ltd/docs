# Demo/ToolTip
This is a step by step tutorial, explaining in detail how we'll be adding a new permission that will let you control what users / user groups will be able to see the pop up you get when hovering over someones name.

## Creating the addon
To start off, just like the other addon Demo/Portal we will need to run a command and input a bit of data.
```sh title="Terminal"
php cmd.php xf-addon:create
```

!!! example "Terminal output"
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

After this has been done, we can do a couple of things to make our development a little easier. All we need to do is make sure this exists:
```php title="config.php"
$config['development']['enabled'] = true;
$config['development']['defaultAddOn'] = 'Demo/ToolTip';
```

## Adding elements
Now the actual addon is created we'll need to create a few elements using the admin control panel.

This is usually done throughout development, unless your very organised, but this addon was planned and documented, so we can just do it all at once.

### Phrases
We're only going to need two actual phrases for this, the rest of them will be created when we define the permission.

To create a phrase go onto your admin control panel, click on the side bar `Appearance` and then click on `Phrases`. The top right of your screen you will see a button called `Add phrase` click that, and you will see where we can input our phrase information.

The phrases will be using are:

```txt title="demo_tooltip_title"
Cannot Load
```

```txt title="demo_tooltip_text"
You lack the permission to view user tooltips. If you believe this be an error, please contact a site administrator.
```

Now you can notice in the phrase title I use the addon name, and sub name. This is a way of standardising your addons. This is a personal preference and up to you.

### Permission Definition
Now to create the permission, we have to have this in our config.php `$config['development']['enabled'] = true;` otherwise this development tab will not appear in our admin control panel.

Once again look at your side bar, and scroll down until you see `Development`, click on that and then click on `Permission definitions`. This will open up a screen showing every permission a user / user group can have.
I suggest taking a look to get an idea of what permissions exist already, but for now we only need to find the section titled `General permissions` on the right of that we need to click on the `Add permission` button.

Now we need to input a bit of information about this permission.

| Field                  | Value                    | Reason                            |
|------------------------|--------------------------|-----------------------------------|
| **Permission group**    | general                  | Default group for general perms   |
| **Permission ID**       | viewProfileToolTip       | Unique ID for this permission     |
| **Title**              | View Profile Tool Tip    | Display name shown in UI          |
| **Depends on permission ID** | *(empty)*            | No dependency set                 |
| **Permission type**     | Flag                     | Boolean flag type permission      |
| **Interface group**     | General permissions      | Grouping for permission categories |
| **Display order**       | 55                       | Position in UI order              |
| **Add-on**             | Demo - ToolTip           | The Addon it's being added to     |

### Template
Next we'll be creating the template. So first off, let's have a look at the `member_tooltip` template. To do this again go onto the side bar and click on the `Appearance` tab, next click on the `Templates` section.
You can see we have Public templates, Email templates, and Admim templates. Right now we're going to be adding a template that users will be able to see, so we'll be creating a public template.

In the public tab you can filter (top right) for the text `member_tooltip`, when you click on it you'll be able to see the template that gets loaded every time someone hovers over a username.

On the top right click `Add template`, ad the top of your area you'll see the Type, make sure that is on Public.
Next fill in the template with this:

```txt title="Template name"
no_permission_member_tooltip
```

```txt title="Template context"
<div class="block-header">{{ phrase('demo_tooltip_title') }}</div>
<div class="block-content">
	<p class="blockMessage blockMessage--important">{{ phrase('demo_tooltip_text') }}</p>
</div>
```

Looks simple, right? And it is that simple, we now have something we can load if the user lacks permission to view member tool tips.

## Modifying the controller
Actions on the site, can be found by looking for something called a controller, if you want to learn more about this I'd suggest looking at [Controller Basics](controller-basics.md).

First off head into your IDE, we're going to have to actually code something now. But have no fear! This will be easy.

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

Now entering our `MemberController.php` we want to start off by doing a little bit of set up:
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

Let's go back to our MemberController and create something similar
```php
public function actionTooltip(ParameterBag $params): View
{
    $this->assertNotEmbeddedImageRequest();

    // Fetch the current visitor
    $visitor = XF::visitor();
    
    // Perform a check on that visitor to see if they have the permission we defined earlier
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
        // 1. We still need to load it as a Tooltip,
        // 2. We are changing the template to the template we created earlier,
        // 3. We don't need to pass the user data, so we just send an empty array instead.
        return $this->view('XF:Member\Tooltip', 'no_permission_member_tooltip', []);
    }
}
```

## Finial element

Finally most of the addon is complete. All that is left is for us to go back into the admin control panel, head on down to `Development`, then into `Class extensions`.

At the top right of your screen you'll see `Add class extension`, click that. Your going to want to fill in this class extension with:
```title="Base class name"
XF\Pub\Controller\MemberController
```

```title="Extension class name"
Demo\ToolTip\XF\Pub\Controller\MemberController
```

The rest of it can be left as is, now just save it.

## Checking it's working
One final time, head into your admin control panel. Click on `Groups & Permissions` then onto `User group permissions`. We want to set the `Guest` group to have `View Profile Tool Tip` set to `No`. Then we want to go into `Registered` and change `View Profile Tool Tip` to `Yes` for them.

Now when you go onto your site, if your logged in you should have no problem viewing user profile tooltips. And if you log out of your account and try again, you should see your template pop up instead.

Congratulations, you've no created an addon that uses; permissions, templates, phrases, and class extensions. :)
