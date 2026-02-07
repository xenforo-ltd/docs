# Thread & forum types
Threads and forums are a huge part of Xenforo.
This page will cover the basics of how you can set up your own custom thread and forum type, and how you can give it basic unique functionality.

## Registering new types
Xenforo stores each type of thread and forum in the database table `xf_thread_type` and `xf_forum_type`.
What we need to do is add a new row to these tables for each new type we want to create and then refresh the cache: `rebuildThreadTypeCache`, and `rebuildForumTypeCache`.

To do this we can use built in methods in our `setup.php`
```php title="setup.php"
<?php

namespace Vendor\Addon;

use XF\AddOn\AbstractSetup;
use XF\AddOn\StepRunnerInstallTrait;
use XF\AddOn\StepRunnerUninstallTrait;
use XF\AddOn\StepRunnerUpgradeTrait;

class Setup extends AbstractSetup
{
	use StepRunnerInstallTrait;
	use StepRunnerUpgradeTrait;
	use StepRunnerUninstallTrait;

    public function installStep1(): void
    {
        $this->insertThreadType('thread_type_identifier', 'Vendor\Addon:Example', 'Vendor/Addon');
    }

    public function installStep2(): void
    {
        $this->insertForumType('forum_type_identifier', 'Vendor\Addon:Example', 'Vendor/Addon');
    }
}
```
What this will do is insert a new row into the `xf_thread_type` and `xf_forum_type` tables with the given identifier, handler and add-on.

The parameters for `insertThreadType` and `insertForumType` are:

- `identifier` - The identifier of the thread or forum type. This is a string you will be using to refer to the type in your code.
- `handler` - The handler class for the thread or forum type. This can be in the format `Vendor\Addon:Class` or a full path to the class `Vendor\Addon\ForumType\ExampleHandler`.
- `addon_id` - The add-on ID of the thread or forum type. This is the ID of the add-on that the thread or forum type belongs to.
- `rebuildCache` - Whether to rebuild the cache. This is set to `true` by default.

### What is a handler?
A handler is a class that is responsible for handling the logic of a specific type of thread or forum.
You can see Xenforo's default handlers in the `XF\ThreadType\*` and `XF\ForumType\*` classes.

You will always want to extend the `XF\ThreadType\AbstractHandler` or `XF\ForumType\AbstractHandler` class when making your own handler.

## Creating type handlers
What is a handler responsible for?

A handler is responsible for handling the logic of a specific type of thread or forum.

### Thread type handlers
To create a thread type handler, you will need to create a new class that extends `XF\ThreadType\AbstractHandler`.
In your add-ons folder you will need to create a new folder called `ThreadType` and then create a new class called `ExampleHandler`.

```php title="ThreadType/ExampleHandler.php"
<?php

namespace Vendor\Addon\ThreadType;

use XF\Entity\Thread;
use XF\ThreadType\AbstractHandler;

class ExampleHandler extends AbstractHandler
{
    // Here we can add a font awesome icon for our thread type.
    public function getTypeIconClass(): string
    {
        return 'fa-user';
    }
}
```

By default, the `getTypeIconClass` method will need to be in your handler.

Let's add some functionality to our handler before moving on.
To see all the methods available to you, I'd highly recommend checking out the class `XF\ThreadType\AbstractHandler`.

```php title="ThreadType/ExampleHandler.php"
public function onThreadPreSave(Thread $thread, bool $isTypeEnter): void
{
    parent::onThreadPreSave($thread, $isTypeEnter);
    \XF::logError("TestHandler: Wow a thread has been saved!");
}
```

What this will do is run this event before a thread is saved.
In this case the method will return a log in the admin console under `Server error log`.

### Forum type handlers
To create a forum type handler, you will need to create a new class that extends `XF\ForumType\AbstractHandler`.
In your add-ons folder you will need to create a new folder called `ForumType` and then create a new class called `ExampleHandler`.

```php title="ForumType/ExampleHandler.php"
<?php

namespace Vendor\Addon\ForumType;

use XF\Entity\Forum;
use XF\ForumType\AbstractHandler;

class ExampleHandler extends AbstractHandler
{
    // Here we can set the default thread type for our forum type.
    // This will be used when a new thread is created in the forum.
    public function getDefaultThreadType(Forum $forum): string
    {
        return 'thread_type_identifier';
    }

    // When creating a node in the admin control panel,
    // this value affects the order in which the forum type appears.
    public function getDisplayOrder(): int
    {
        return 1;
    }
    
    // Here we can add a font awesome icon for our forum type.
    public function getTypeIconClass(): string
    {
        return 'fa-user';
    }
}
```

By default, the `getDefaultThreadType`, `getDisplayOrder`, `getTypeIconClass` methods will need to be in your handler.

Let's add some functionality to our handler before moving on.
To see all the methods available to you, I'd highly recommend checking out the class `XF\ForumType\AbstractHandler`.

```php title="ForumType/ExampleHandler.php"
public function getExtraAllowedThreadTypes(Forum $forum): array
{
    return ['thread_type_identifier', 'discussion'];
}
```

What this will do is add the discussion thread type to the forum type.
Letting users create a discussion thread in the forum, as well as our custom thread type.

## Uninstalling types
To uninstall a type, you will need to remove the row from the `xf_thread_type` and `xf_forum_type` tables.

```php title="setup.php"
    public function uninstallStep1(): void
    {
        $this->db()->delete('xf_thread_type', 'thread_type_id = ?', 'test');

        $iconRepo = $this->app->repository(IconRepository::class);
        $iconRepo->enqueueUsageAnalyzer('thread_type');

        \XF::runOnce('rebuildThreadTypeCache', function ()
        {
            $this->app->repository(ThreadTypeRepository::class)->rebuildThreadTypeCache();
        });
    }

    public function uninstallStep2(): void
    {
        $this->db()->delete('xf_forum_type', 'forum_type_id = ?', 'test');

        $iconRepo = $this->app->repository(IconRepository::class);
        $iconRepo->enqueueUsageAnalyzer('forum_type');

        \XF::runOnce('rebuildForumTypeCache', function ()
        {
            $this->app->repository(ForumTypeRepository::class)->rebuildForumTypeCache();
        });
    }
```

This will remove the row from the `xf_thread_type` and `xf_forum_type` tables and then rebuild the cache.