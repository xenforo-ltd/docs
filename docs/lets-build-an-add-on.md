For some people, getting stuck straight into a project is the best way to learn, and the aim is that in the following sections you will learn how to build an add-on, from scratch. Be prepared; this isn't a simple 'Hello world' type demo. This is actually a fairly full featured demo add-on which covers a number of concepts within XF2.

The add-on we're going to build will allow users with the appropriate permission to "feature" a thread, and allow that thread to be displayed on a new page. We'll even set up a process which automatically features threads in specific forums. We will use a new route for this named `portal` and eventually set that as the index page route and set the "Home" tab to be selected when viewing that page.

## Create the add-on

Throughout the add-on we will use the add-on ID of `Demo/Portal`. The first thing we need to do is create the add-on, for this we need to open a command prompt / shell / terminal window, change the directory to your XF installation root (where `cmd.php` is located) and run the following command, and enter the responses displayed below:

!!! terminal
    *$* php cmd.php xf-addon:create

    **Enter an ID for this add-on:** Demo/Portal

    **Enter a title:** Demo/Portal

    **Enter a version ID:** 1000010

    ** Version string set to: 1.0.0 Alpha **

    **Should this add-on be enabled? (y/n)** y

    **Add-on created successfully. Should the addon.json file be written out to ../src/addons/Demo/Portal/addon.json? (y/n)** y

    **The addon.json file was successfully written out to ../src/addons/Demo/Portal/addon.json**

    **Does your add-on need a Setup file? (y/n)** y

    **Does your Setup need to support running multiple steps? (y/n)** y

    **The Setup.php file was successfully written out to ../src/addons/Demo/Portal/Setup.php**

The add-on has now been created, you will now find that you have a new directory in the `src/addons` directory, and you will find the add-on in the "Installed add-ons" list of the Admin CP.

One of the files that has been created is the `addon.json` file, which currently looks like this:

```json
{
    "title": "Demo - Portal",
    "version_string": "1.0.0 Alpha",
    "version_id": 1000010
}
```

Let's expand on that a little bit:

```json
{
    "title": "Demo - Portal",
    "description": "Add-on which will display featured threads on the forum home page.",
    "version_string": "1.0.0 Alpha",
    "version_id": 1000010,
    "dev": "You!",
    "icon": "fa-code"
}
```

This is still pretty basic, but we have now added a description, the developer's name and specified that we want to display an icon. The icon can either be a path (relative to your add-on root) or the name of a [FontAwesome icon](http://fontawesome.io/icons/) as we've done here.

## Creating the Setup class

Well, strictly speaking, the class has already been created and written out to `Setup.php` but right now it doesn't really do anything. We've basically got a skeleton class for it which looks like this:

```php
<?php

namespace Demo\Portal;

use XF\Db\Schema\Alter;
use XF\Db\Schema\Create;

class Setup extends \XF\AddOn\AbstractSetup
{
	use \XF\AddOn\StepRunnerInstallTrait;
	use \XF\AddOn\StepRunnerUpgradeTrait;
	use \XF\AddOn\StepRunnerUninstallTrait;
}
```

We talked a little bit already about the Setup class. We're going to be breaking the install, upgrade and uninstall processes into separate steps.

The StepRunner traits here are going to handle the process of cycling through all of the available steps, so all we have to do is start creating those steps. We'll start by adding some code to create a new column in the `xf_forum` table:

```php
<?php

namespace Demo\Portal;

use XF\Db\Schema\Alter;
use XF\Db\Schema\Create;

class Setup extends \XF\AddOn\AbstractSetup
{
	use \XF\AddOn\StepRunnerInstallTrait;
	use \XF\AddOn\StepRunnerUpgradeTrait;
	use \XF\AddOn\StepRunnerUninstallTrait;

	public function installStep1()
	{
		$this->schemaManager()->alterTable('xf_forum', function(Alter $table)
		{
			$table->addColumn('demo_portal_auto_feature', 'tinyint')->setDefault(0);
		});
	}
}
```

This column is being added to the `xf_forum` table so that we can set certain forums up to have threads automatically featured when they are created. The naming here is significant; columns added to core XF tables should always be prefixed. This serves two important purposes. The first being that there is less risk of conflicts happening with duplicate column names, in case XF or another add-on has reason to add that column in the future. The second being that it helps more easily identify which columns belong to which add-ons in case some issues arise in the future.

While we're here, we might as well add another step to the installer. For brevity, we'll just display the new code, rather than the entire class. It should be placed directly below the `installStep1()` method:

```php
public function installStep2()
{
    $this->schemaManager()->alterTable('xf_thread', function(Alter $table)
    {
        $table->addColumn('demo_portal_featured', 'tinyint')->setDefault(0);
    });
}
```

This step, similar to the step above, will add a new column this time to the `xf_thread` table. We'll use this column as a cached value to quickly identify whether a thread is featured or not, without having to perform additional queries or a lookup against the `xf_demo_portal_featured_thread` table.

Speaking of which, we should add that table now. This time directly below `installStep2()`:

```php
public function installStep3()
{
    $this->schemaManager()->createTable('xf_demo_portal_featured_thread', function(Create $table)
    {
        $table->addColumn('thread_id', 'int');
        $table->addColumn('featured_date', 'int');
        $table->addPrimaryKey('thread_id');
    });
}
```

This step is going to create the new table. This table will be used to keep a log of all of the threads that have been featured, and when they were featured.

The same principles apply here in terms of naming. A significant difference is that all tables should additionally be prefixed with `xf_`. The reason for this is so that if a clean XF install is performed, we can remove all tables with the `xf_` prefix, including those created by add-ons.

One of the simplest things to forget when adding the code which adds various schema changes is to forget to apply the schema changes yourself. You can run install/upgrade steps using a CLI command. In this case, execute the following commands:

!!! terminal
    *$* php cmd.php xf-addon:install-step Demo/Portal 1
    *$* php cmd.php xf-addon:install-step Demo/Portal 2
    *$* php cmd.php xf-addon:install-step Demo/Portal 3

## Extending the forum entity

So far we've added a column to the `xf_forum` table, it's now time to extend the Forum entity structure. We need to do this so that the entity knows about our new column, and so that data can be read from and written to it via the entity.

!!! note
    The following steps will require [Development mode](/development-tools/#enabling-development-mode) to be enabled. Remember to set `Demo/Portal` as the `defaultAddOn` value in `config.php`.

The first step in this process is to create a "Code event listener". This can be done in the Admin CP under Development, click the "Code event listeners" link and click the "Add code event listener" button.

We need to listen to the `entity_structure` event. We will use this to modify the default forum entity structure to add our newly created `demo_portal_auto_feature` column.

In the "Event hint" field, we will enter the name of the class we're extending, e.g. `XF\Entity\Forum`. This will ensure our listener only executes on the forum entity.

For the "Execute callback" class enter `Demo\Portal\Listener` and for the method enter `forumEntityStructure`.

It's worth adding a description to explain what this listener is for, as this will help more easily identify the listener in the code event listener list. "Extends the XF\Entity\Forum structure" should be sufficient. Finally, make sure the "Demo - Portal" add-on is selected.

Before we click "Save" we need to actually create the Listener class. So create a new file named `Listener.php` in `src/addons/Demo/Portal`. The contents of this file should be as follows, initially. We know the arguments this function requires from the documentation below the code event selector.

```php
<?php

namespace Demo\Portal;

use XF\Mvc\Entity\Entity;

class Listener
{
	public static function forumEntityStructure(\XF\Mvc\Entity\Manager $em, \XF\Mvc\Entity\Structure &$structure)
	{

	}
}
```

Notice the `use` declaration between the `namespace` and `class` name. We will be referencing the class declared here more than once, so declaring it here does allow us to reference it by its much shorter alias, in this case, `Entity`.

This code won't actually do anything yet, but now is a good time to save the code event listener, so go ahead and click the "Save" button.

Before we add some functional code to our new function, now might be a good time to see how the development output system works. Check out the new directories and files added to your add-on directory. Specifically there is a new JSON file in the `_output/code_event_listeners` directory, which should look like this:

```json
{
    "event_id": "entity_structure",
    "execute_order": 10,
    "callback_class": "Demo\\Portal\\Listener",
    "callback_method": "forumEntityStructure",
    "active": true,
    "hint": "XF\\Entity\\Forum",
    "description": "Extends the XF\\Entity\\Forum structure"
}
```

Whenever changes are made to the listener this file will update automatically.

Right, let's add some more code. Back inside the `Listener` class, add the following to the `forumEntityStructure` function:

```php
$structure->columns['demo_portal_auto_feature'] = ['type' => Entity::BOOL, 'default' => false];
```

The forum entity is now aware of our new column, but there are a few more steps we should take care of first before we can begin to implement a way to actually start setting values on that column.

## Extending the thread entity

Again, as we have added a new column to the xf_thread table, we should make the Thread entity aware of that. This is very similar to what we did above.

Head back to "Add code event listener" and listen to `entity_structure` again. The "Event hint" this time will be `XF\Entity\Thread`. We can use the same callback class as before (`Demo\Portal\Listener`) but this time the method will be named `threadEntityStructure`. Add a description similar to before. Before saving, we should add the code, directly below the `forumEntityStructure` function:

```php
public static function threadEntityStructure(\XF\Mvc\Entity\Manager $em, \XF\Mvc\Entity\Structure &$structure)
{
	$structure->columns['demo_portal_featured'] = ['type' => Entity::BOOL, 'default' => false];
}
```

This code is almost identical to what we added to the forum entity structure; really the only difference is the column name. But, we do need to add something else. We should create an entity relation so that, later on, should we need to access the featured thread entity (which we create in the next section). Below the `$structure->columns` line add:

```php
$structure->relations['FeaturedThread'] = [
	'entity' => 'Demo\Portal:FeaturedThread',
	'type' => Entity::TO_ONE,
	'conditions' => 'thread_id',
	'primary' => true
];
```

See [Relations](/entities-finders-repositories/#relations) for more information about relations. Hit "Save" to save the listener.

## Creating a new entity

Above in `installStep3()` we created a new table. We are going to need to create an entity to interact with and create new records in this table. Because this is a brand new entity we don't need to do anything other than create the class inside `src/addons/Demo/Portal/Entity/FeaturedThread.php`, the skeleton for which will look like this:

```php
<?php

namespace Demo\Portal\Entity;

use XF\Mvc\Entity\Structure;

class FeaturedThread extends \XF\Mvc\Entity\Entity
{

}
```

We need to use this to define the entity structure which represents our new `xf_demo_portal_featured_thread` table which we created earlier. The structure for this entity should look like this:

```php
public static function getStructure(Structure $structure)
{
	$structure->table = 'xf_demo_portal_featured_thread';
	$structure->shortName = 'XF:FeaturedThread';
	$structure->primaryKey = 'thread_id';
	$structure->columns = [
		'thread_id' => ['type' => self::UINT, 'required' => true],
		'featured_date' => ['type' => self::UINT, 'default' => time()]
	];
	$structure->getters = [];
	$structure->relations = [
		'Thread' => [
			'entity' => 'XF:Thread',
			'type' => self::TO_ONE,
			'conditions' => 'thread_id',
			'primary' => true
		],
	];

	return $structure;
}
```

The list of columns is probably self explanatory based on the MySQL we wrote earlier to create the table. The relations includes a `Thread` relation, which will allow us to get the related thread entity record (and even the thread entity relations) from this entity.

## Modifying the forum edit form

We now need a way to modify the `forum_edit` template to add a new checkbox there which can ultimately write back to the new column we have now created. We'll do this by creating a template modification. This is done from the Admin CP under Appearance and then click Template modifications. Click the "Admin" tab followed by the "Add template modification" button.

In the "Template" field, type "forum_edit". This is the template we need to modify.

In the "Modification key" field, type "demo_portal_forum_edit". This is a unique key which identifies your template modification. The preferred convention for this is, at minimum, to mention the add-on followed by the template name being modified.

The "Description" field should contain some text to help you identify the purpose of this modification when looking down the template modifications list. Something like "Adds auto feature checkbox to the forum_edit template" should suffice.

When you entered the template name in the "Template" field, you may notice that a preview of the template contents was displayed. We need to use this to identify the preferred place for our checkbox. While viewing the forum edit page, you may notice there's a series of checkboxes and this looks like a reasonable location.

The simplest way to place a checkbox in this section is to do a simple replacement on the top checkbox, so in the "Find" field add:

```plain
<xf:option name="allow_posting"
```

And in the replace field:

```html
<xf:option name="demo_portal_auto_feature" selected="$forum.demo_portal_auto_feature"
	label="Automatically feature threads in this forum"
	hint="If selected, any new threads posted in this forum will be automatically featured." />
$0
```

We don't need to worry about creating phrases, yet, we can pick those up later. Notice that the name attribute matches the name of the column we created earlier, and more significantly, the checked state of the checkbox row also reads the newly added column from the forum entity.

When we save the template modification later, if the contents of the find field matches any part of the template then it will be replaced with the contents of the replace field. We are not actually removing what we have matched because the `$0` in the replace field is re-inserting the matched text.

We can use the "Test" button to check the replacement is working as expected. When the test button is clicked, an overlay with the modified template will appear. If all goes well, a green area should be highlighted with the new code we want to add.

!!! note
    This is a fairly simple replacement. For more advanced matching, you can also use the "Regular expression" type. A detailed explanation of working with regular expressions is beyond the scope for this guide, but there are lots of resources online which may help.

Finally, click save to save your template modification. If all has gone well, when you return to the template modifications list, you will see the log summary is displaying <span style="color: green; font-weight: 700;">1</span> / 0 / <span style="color: red;">0</span> therefore indicating that the modification successfully applied one time. An even better indicator that it has worked as planned is to go to the "Nodes" page listed under "Forums" in the Admin CP, and edit an existing forum. Our newly added template modification should now appear.

## Extending the forum save process

We have our column, we have a UI to pass an input to that column, now we have to handle saving data to that column. We will do this by extending the Forum controller and extending a special method which is called when a node and its data are saved. First, let's create a "Class extension" which can be found under the "Development" entry in the Admin CP. Click "Add new extension".

Here we need to specify a "Base class name" which is the name of the class we are extending, which in this case will be `XF\Admin\Controller\Forum`. And we need to specify a "Extension class name" which is the class which will extend the base class. Enter this as `Demo\Portal\XF\Admin\Controller\Forum`. We should create that class before clicking Save.

Create a new file in `src/addons/Demo/Portal/XF/Admin/Controller` named `Forum.php`. This might seem like quite a long path, but we recommend a path like this for extended classes. It enables you to more easily identify the files that represent extended classes by virtue of the fact that they are in a directory of the same name as the extended "add-on" ID (in this case `XF`). It also makes it clear exactly which class has been extended as the directory structure follows the same path as the default class. The contents of the file should, for now, look like this:

```php
<?php

namespace Demo\Portal\XF\Admin\Controller;

class Forum extends XFCP_Forum
{

}
```

See [Extending classes](/general-concepts/#extending-classes) and [Type hinting](/general-concepts/#type-hinting) for more information.

Click save to save the Class extension. Now we can add some code. The particular method we need to extend is a protected function called `saveTypeData`. When extending any existing method in any class, it is important to inspect the original method for a couple of reasons. The first being we want to make sure the arguments we use in the extended method, match that of the method we're extending. The second being that we need to know what this method actually does. For example, should the method be returning something of a particular type, or a certain object? This is certainly the case in most controller actions as we mentioned in the [Modifying a controller action reply (properly)](/controller-basics/#modifying-a-controller-action-reply-properly) section. However, although this method is within a controller, it isn't actually a controller action itself. In fact, this particular method is a "void" method; it isn't expected to return anything. However, we should always ensure we call the parent method in our extended method so let's just add the new method itself, without the new code we need to add:

```php
protected function saveTypeData(FormAction $form, \XF\Entity\Node $node, \XF\Entity\AbstractNode $data)
{
	parent::saveTypeData($form, $node, $data);
}
```

!!! Warning
    This particular method's argument list assumes that we have a `use` declaration which aliases the full `\XF\Mvc\FormAction` class to simply `FormAction`. You will therefore need to add that use declaration yourself. Add `use XF\Mvc\FormAction;` between the `namespace` and `class` lines.

So, right now, we've extended that method, and our extension should be called, but right now it isn't doing anything other than calling its parent method. We now need to get the value of the input from the forum edit page and apply that to the `$data` entity (which in this case is the Forum entity).

```php
protected function saveTypeData(FormAction $form, \XF\Entity\Node $node, \XF\Entity\AbstractNode $data)
{
	parent::saveTypeData($form, $node, $data);

	$form->setup(function() use ($data)
	{
		$data->demo_portal_auto_feature = $this->filter('demo_portal_auto_feature', 'bool');
	});
}
```

Using the `FormAction` object allows us to have various extension points into the process that runs during the course of a typical form submission. It isn't available for all controller actions. It is much more prevalent in the Admin CP, for example, which often follow a simple CRUD model (Create, Read, Update, Delete). A lot of other processes within XF happen inside a service object, which usually has specific extension points related to the service that is running. This particular usage of the `FormAction` object is somewhat different to what you would usually encounter. Saving a node is a somewhat different process, because as well as working with the node entity, you'll also be working with an associated type of node, e.g. a forum entity. We do have access to the form action object in this method, though, so we should use it. We've used it here to add a specific behaviour to the "setup" phase of the process. Namely, when the `FormAction` object's `run()` method is called, it will run through the various phases in a specific order. It doesn't matter which order those behaviors were added to the object in, they will still run in the order `setup`, `validate`, `apply`, `complete`.

The code we added above lets us set our `demo_portal_auto_feature` column in the forum entity to whatever value is stored for the `demo_portal_auto_feature` input which we added to the forum edit page. It should now be possible to test that all of this works. Simply edit a forum of your choice and check the checkbox. You should be able to observe two things. First, when you go back into edit that forum, the checkbox should now be checked. Second, if you look in the xf_forum table for the forum you just edited, the `demo_portal_auto_feature` field should now be set to 1. Keep this value enabled for this forum, as we will eventually be automatically featuring threads from that forum.

## Setting a thread to be featured automatically

We've added a new column to the forum entity which will allow us to automatically feature a thread when it is newly created in this forum, so now it's time to add the code which will do this.

In XF2, we make heavy use of Service objects. These typically take a "setup and go" type approach; you setup your configuration and then call a method to complete the action. We use a service object to setup and perform the thread creation, so this is a perfect place to add the code we need. It all starts with another class extension, so go to the "Add class extension" page.

This time, the base class will be `XF\Service\Thread\Creator` and the extension class will be `Demo\Portal\XF\Service\Thread\Creator` and, as usual, this new class will look something like the code below. Create that code in the path `src/addons/Demo/Portal/XF/Service/Thread/Creator.php` then click "Save" to create the extension.

```php
<?php

namespace Demo\Portal\XF\Service\Thread;

class Creator extends XFCP_Creator
{

}
```

While we're here we will also create another extension. The base will be `XF\Pub\Controller\Forum` and the extension class will be `Demo\Portal\XF\Pub\Controller\Forum`.  Creating the following code in the path `src/addons/Demo/Portal/XF/Pub/Controller/Forum.php` and click "Save":

```php
<?php

namespace Demo\Portal\XF\Pub\Controller;

class Forum extends XFCP_Forum
{

}
```

We're ultimately going to extend the `_save()` method in our extended thread creator object so we can feature our thread after it has been created. To fit in with the "setup and go" approach, we will create a method which can be used to indicate whether the thread should be created as featured, or not. For this, we need two things; a class property to store the value (it defaults to null) and a public method to allow that property to be set.

```php
protected $featureThread;

public function setFeatureThread($featureThread)
{
    $this->featureThread = $featureThread;
}
```

Going back to our newly extended forum controller, we will now extend the method that sets up the creator service, and opt in to featuring if the forum entity has the necessary value set. Remember, before extending a method, we need to know what it is expected to return (if anything), and ensure we call the parent method. If the parent method does return something, then it is this which we should return after our code has finished. The `setupThreadCreate()` method in this case returns the set up creator service, so we will start this off as follows:

```php
protected function setupThreadCreate(\XF\Entity\Forum $forum)
{
    /** @var \Demo\Portal\XF\Service\Thread\Creator $creator */
	$creator = parent::setupThreadCreate($forum);

	return $creator;
}
```

As expected, this doesn't actually do anything; the extended code is called, but all it does is return whatever was returned by the parent call. We should now modify the `$creator` to set up featuring if it applies to the forum we're currently working with.

In between the `$creator` line and the `return` line, add:

```php
if ($forum->demo_portal_auto_feature)
{
	$creator->setFeatureThread(true);
}
```

We can now add the `_save()` method to the extended creator class:

```php
protected function _save()
{
	$thread = parent::_save();

	return $thread;
}
```

To make sure this thread gets featured, in between the `$thread` line and the `return` line we just need to add:

```php
if ($this->featureThread && $thread->discussion_state == 'visible')
{
    /** @var \Demo\Portal\Entity\FeaturedThread $featuredThread */
    $featuredThread = $thread->getRelationOrDefault('FeaturedThread');
    $featuredThread->save();

    $thread->fastUpdate('demo_portal_featured', true);
}
```

Because we earlier created the `FeaturedThread` relation on the thread entity, we can actually use that relation for creation too! There is a method named `getRelationOrDefault()` which we use here. This will see if that relation actually returns an existing record, and if it doesn't, it will create the entity and set it up with any default values even the thread ID! This means we actually need to do little more than to get the default relation and save it to insert it into the database.

Additionally, we should set the `demo_portal_featured` field to true. Because the thread entity has already been saved (when the original class saved the entity) we can use the `fastUpdate()` method to quickly update that field.

We now need to try this all out and make sure it works. Go to the forum which you enabled the `demo_portal_auto_feature` option on earlier, and create a new thread. The only way to tell if it is working right now is to check the `xf_demo_portal_featured_thread` table and in doing that we should see a new record in there!

## Create the portal page

There's still a considerable amount of work to do before we're finished, but now we have the ability to feature threads, it certainly would be nice if we could display them somewhere, so let's start creating our portal page.

To do this we need a new public route. Go to the Admin CP and under "Development" click "Routes" then click "Add route: Public". We're going to keep this quite simple, for now. The route prefix is going to be "portal", the section context is going to be "home" and the controller is going to be "Demo\Portal:Portal".

 We should now create that controller at the path `src/addons/Demo/Portal/Pub/Controller/Portal.php` with the following basic contents:

```php
<?php

namespace Demo\Portal\Pub\Controller;

class Portal extends \XF\Pub\Controller\AbstractController
{

}
```

We want our portal to be displayed to people when they visit the `index.php?portal` page. This URL doesn't have an "action" part - just the route prefix we just created. With that in mind, the code we need to add to display the portal page, should be in the `actionIndex()` method. The basic code we will need in that is:

```php
public function actionIndex()
{
	$viewParams = [];
	return $this->view('Demo\Portal:View', 'demo_portal_view', $viewParams);
}
```

Now, this won't exactly work, yet, because we haven't created the template, yet, but this is enough, for now, to at least demonstrate our route and controller are talking to each other. So visiting `index.php?portal` should at the very least display a 'Template error'.

As was mentioned in the [View reply](/controller-basics/#view-reply) section, the first argument is a view class, but we don't need to actually create this class. This class could be extended by other add-ons, if necessary, even if it doesn't exist. The second argument is the template, which we need to create now in the path `src/addons/Demo/Portal/_output/templates/public/demo_portal_view.html`. That template, for now, should simply contain the following:

```html
<xf:title>Portal</xf:title>
```

If we now visit the portal page, the template error will be gone, and although we will still have a fairly blank looking page, it will at least now have the title "Portal".

Now, it's time to start adding the code which will display a list of featured threads. The first step to this is to create a repository for some of our common base finder queries. So, create a new file in the path `src/addons/Demo/Portal/Repository/FeaturedThread.php` and add the following code:

```php
<?php

namespace Demo\Portal\Repository;

use XF\Mvc\Entity\Finder;
use XF\Mvc\Entity\Repository;

class FeaturedThread extends Repository
{
	/**
	 * @return Finder
	 */
	public function findFeaturedThreadsForPortalView()
	{
		$visitor = \XF::visitor();

		$finder = $this->finder('Demo\Portal:FeaturedThread');
		$finder
			->setDefaultOrder('featured_date', 'DESC')
			->with('Thread', true)
			->with('Thread.User')
			->with('Thread.Forum', true)
			->with('Thread.Forum.Node.Permissions|' . $visitor->permission_combination_id)
			->with('Thread.FirstPost', true)
			->with('Thread.FirstPost.User')
			->where('Thread.discussion_type', '<>', 'redirect')
			->where('Thread.discussion_state', 'visible');

		return $finder;
	}
}
```

What we're doing here is using the finder to query for all featured threads, in reverse `featured_date` order, and joining to the `xf_thread` table and from that table joining to the `xf_user` table for the thread creator, `xf_forum` table, the `xf_post` table and from there joining to the `xf_user` table again for the post creator. We've asserted that the thread, forum and first post must exist by specifying `true` for that argument so these will be performed as `INNER JOIN` whereas the user queries will be performed with a `LEFT JOIN`. It's possible that the author of some threads and posts may not exist (for example if they were posted automatically by the RSS feeder system, or posted by guests).

We also have a special join here that fetches the current visitor's permissions along with the query. This will reduce the number of queries needed to render the portal page, as we will be doing a number of things (later) to only display featured threads to users who have permission to view them.

This doesn't return the results of this query. This returns the finder object itself. This enables a clear extension point in case another add-on needs to extend our code, and also allows us to make further changes before fetching that data (such as for setting a limit/offset for pagination, or setting a different order).

Let's now use that in our `actionIndex()` method inside our portal controller. Change the existing `$viewParams = [];` line to the following:

```php
/** @var \Demo\Portal\Repository\FeaturedThread $repo */
$repo = $this->repository('Demo\Portal:FeaturedThread');

$finder = $repo->findFeaturedThreadsForPortalView();

$viewParams = [
	'featuredThreads' => $finder->fetch()
];
```

At this stage, we're not going to worry about modifying the base finder we've retrieved from the repo. Instead, let's start to actually see some results, and update the demo_portal_view template as follows (after the `<xf:title>` tags):

```html
<xf:if is="$featuredThreads is not empty">
	<xf:foreach loop="$featuredThreads" value="$featuredThread">
		<xf:macro name="thread_block"
			arg-thread="{$featuredThread.Thread}"
			arg-post="{$featuredThread.Thread.FirstPost}"
			arg-featuredThread="{$featuredThread}"
		/>
	</xf:foreach>
<xf:else />
	<div class="blockMessage">No threads have been featured yet.</div>
</xf:if>

<xf:macro name="thread_block" arg-thread="!" arg-post="!" arg-featuredThread="!">
	<xf:css src="message.less" />

	<div class="block">
		<div class="block-container" data-xf-init="lightbox">
			<h4 class="block-header"><a href="{{ link('threads', $thread) }}">{$thread.title}</a></h4>
			<div class="block-body">
				<xf:macro name="message"
					arg-post="{$post}"
					arg-thread="{$thread}"
					arg-featuredThread="{$featuredThread}"
				/>
			</div>
			<div class="block-footer">
				<a href="{{ link('threads', $thread) }}">Continue reading...</a>
			</div>
		</div>
	</div>
</xf:macro>

<xf:macro name="message" arg-post="!" arg-thread="!" arg-featuredThread="!">
	<div class="message message--post message--simple">
		<div class="message-inner">
			<div class="message-cell message-cell--main">
				<div class="message-content js-messageContent">
					<div class="message-attribution">
						<div class="contentRow contentRow--alignMiddle">
							<div class="contentRow-figure">
								<xf:avatar user="{$post.User}" size="xxs" defaultname="{$post.username}" href="" />
							</div>
							<div class="contentRow-main contentRow-main--close">
								<ul class="listInline listInline--bullet u-muted">
									<li><xf:username user="{$thread.User}" /></li>
									<li><xf:date time="{$featuredThread.featured_date}" /></li>
									<li><a href="{{ link('forums', $thread.Forum) }}">{$thread.Forum.title}</a></li>
									<li>{{ phrase('replies:') }} {$thread.reply_count|number}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="message-userContent lbContainer js-lbContainer"
						 data-lb-id="post-{$post.post_id}"
						 data-lb-caption-desc="{{ $post.User ? $post.User.username : $post.username }} &middot; {{ date_time($post.post_date) }}"
					>
						<blockquote class="message-body">
							{{ bb_code($post.message, 'post', $post.User, {
								'attachments': $post.attach_count ? $post.Attachments : [],
								'viewAttachments': $thread.canViewAttachments()
							}) }}
						</blockquote>
					</div>
				</div>
			</div>
		</div>
	</div>
</xf:macro>
```

Now, admittedly, there's **a lot** going on here. Although it may look daunting, it's mostly just markup to display our featured threads in a reasonable style. There's a few things worth paying attention to, though.

We start off the template with a condition that reads `<xf:if is="$featuredThreads is not empty">`. This is to chceck that the object returned by the finder actually contains featured thread records. If it doesn't, then we display an appropriate message.

If we do have some records, we need to loop through each to display it. For each record, we call a `macro`. Macros are reusable portions of template code which are self documenting (in that you see which arguments are supported) and maintain their own scope which cannot be polluted with the arguments in the template calling the macro; meaning that macros are only aware of the arguments that are explicitly passed in and the global `$xf` param.

The thread block macro displays the basic block for the featured thread, and then that calls another macro to display each message.

## Implementing the navigation tab

You may have spotted when setting up the route that we specified the section context as "home", and when you visited the portal page, the home tab was selected, or alternatively you may not have seen a home tab at all if a `homePageUrl` is not set in options. We want to use the default home tab rather than creating one ourselves and potentially having a duplicate tab.

To do this, we should use a code event listener to change the URL to our portal URL. In the Admin CP under Development click "Code event listeners" and click "Add code event listener". Listen to the event `home_page_url`, callback class will be `Demo\Portal\Listener` again, and this time the method will be named `homePageUrl`.

The code for this new method should be fairly simple:

```php
public static function homePageUrl(&$homePageUrl, \XF\Mvc\Router $router)
{
	$homePageUrl = $router->buildLink('canonical:portal');
}
```

Finally, we should consider changing the index page route to our portal page. Go to Admin CP and under Setup click Options followed by "Basic board information". Change the "Index page route" option to `portal/`.

While you're in the Admin CP, let's see what happens now when you click on the Board title in the header. This should take you to your index page. All being well, that index page should now be your portal! In addition to that, the Home tab should be visible, and selected.

As an optional step, you may choose to add some additional navigation entries under the home tab. But, for now, let's move on.

## Manually featuring (or unfeaturing) threads

So, we can automatically feature new threads. What about manually featuring existing threads? Or manually featuring threads during creation where auto featuring is not supported? This will be a good way to get our current portal page looking a bit more busy.

To achieve this, we will add a template modification to a specific macro, and this macro is actually used during thread reply, thread edit and when creating a thread. This will involve extending the editor service and making changes to the existing code which handled the auto featuring.

First step then is a new template modification. So go to "Add template modification" (make sure the "Public" tab is selected on the "Template modifications" list). This time the template we are modifying is `helper_thread_options`, we'll use `demo_portal_helper_thread_options` as the key and you can write a reasonable description. We can actually do a "Simple replacement" here so leave that radio selected and in the "Find" field add:

```html
<xf:if is="$thread.canLockUnlock()">
```

In the "Replace" field add:

```html
<xf:if is="($thread.isInsert() AND !$thread.Forum.demo_portal_auto_feature AND $thread.canFeatureUnfeature())
	OR ($thread.isUpdate() && $thread.canFeatureUnfeature())"
>
	<xf:option label="{{ phrase('demo_portal_featured') }}" name="featured" value="1" selected="{$thread.demo_portal_featured}">
		<xf:hint>{{ phrase('demo_portal_featured_hint') }}</xf:hint>
		<xf:afterhtml>
			<xf:hiddenval name="_xfSet[featured]" value="1" />
		</xf:afterhtml>
	</xf:option>
</xf:if>
$0
```

That condition is a little on the lengthy side, but it allows us to show the featured checkbox under two specific conditions: a) If the thread has not yet been created and the auto feature option is disabled for the forum and there is permission to feature or b) it's an existing thread and there is permission to feature/unfeature.

A quick "Test" should show this additional code will be inserted just above the existing "Open" checkbox within the existing `<xf:checkboxrow>`. If that all looks good, click "Save".

We have had to use template code directly within the modification here, because including a template (like we did before) won't work within an existing input or row tag in this way. We'll also need to create the phrases now for the label and hint, because it won't be possible to detect those later.

Under "Appearance" go to "Phrases" and click "Add phrase". Make sure your add-on is selected. The "Title" of the first phrase will be "demo_portal_featured" and the text will be simply "Featured". Click "Save and Exit". Click "Add phrase" again. The "Title" for the second phrase will be "demo_portal_featured_hint" and the text will be "Featured threads will appear on the Portal page."

Back to the template code we just added to the modification; you may have noticed something. We have called a method on the thread entity, `canFeatureUnfeature()`, and this method does not exist, yet. We are going to use this eventually to do a permission check that will control whether a user can manually feature a thread or not.

To add this method, we need a new class extension for the `XF\Entity\Thread` entity. So, do that now similar to how we've done it before. The extended class will be `Demo\Portal\XF\Entity\Thread` so create that in the path `src/addons/Demo/Portal/XF/Entity/Thread.php` with the contents:

```php
<?php

namespace Demo\Portal\XF\Entity;

class Thread extends XFCP_Thread
{
	public function canFeatureUnfeature()
	{
		return true;
	}
}
```

Ok, so, we haven't exactly done much here of value, yet. All the `canFeatureUnfeature()` method does is return `true` right now. Later on, we will implement some proper permissions and add them here.

To test this works so far, open one of the threads you previously featured, and select "Edit thread" from the tools menu. We should see the "Set thread status" checkbox row has the "Featured" checkbox we added, and it should be checked, indicating that this thread is indeed featured.

We can now move on to changing the thread editor service to look for this value and feature or unfeature accordingly. We are going to need two new class extensions for this. Go back to the "Add class extensions" page. The first one will have a base class of `XF\Pub\Controller\Thread` and extension class of `Demo\Portal\XF\Pub\Controller\Thread`. The second one will have a base class of `XF\Service\Thread\Editor` and an extension class of `Demo\Portal\XF\Service\Thread\Editor`.

The editor service is actually going to be very similar to the extended creator service we created earlier, so create that in the relevant location. Here is all of the code for the extended class:

```php
<?php

namespace Demo\Portal\XF\Service\Thread;

class Editor extends XFCP_Editor
{
	protected $featureThread;

	public function setFeatureThread($featureThread)
	{
		$this->featureThread = $featureThread;
	}

	protected function _save()
	{
		$thread = parent::_save();

		if ($this->featureThread !== null && $thread->discussion_state == 'visible')
		{
			/** @var \Demo\Portal\Entity\FeaturedThread $featuredThread */
			$featuredThread = $thread->getRelationOrDefault('FeaturedThread', false);

			if ($this->featureThread)
			{
				if (!$featuredThread->exists())
				{
					$featuredThread->save();
					$thread->fastUpdate('demo_portal_featured', true);
				}
			}
			else
			{
				if ($featuredThread->exists())
				{
					$featuredThread->delete();
					$thread->fastUpdate('demo_portal_featured', false);
				}
			}
		}

		return $thread;
	}
}
```

This is a little bit more involved than the code in the creator service. For example, there may be situations where a thread is edited, and the user has no permission to edit the thread, and therefore we don't show the checkboxes. In these cases, we do not want to automatically assume the thread should be unfeatured. As the class `$featureThread` property defaults to `null` we can use this so that essentially the property has three states. In this case `null` will mean "no change", `true` will mean we feature the thread and `false` will mean we unfeature it.

In the case of unfeaturing, we actually just delete the featured thread entity by calling the `delete()` method. In both cases we use the `fastUpdate()` method again to update the cached value in the thread entity to represent the curent featured state.

Before we finish the process of editing, we need to add code to our extended thread controller, and specifically extend the `setupThreadEdit()` method. The entire extended thread controller code will look like this:

```php
<?php

namespace Demo\Portal\XF\Pub\Controller;

class Thread extends XFCP_Thread
{
	public function setupThreadEdit(\XF\Entity\Thread $thread)
	{
		/** @var \Demo\Portal\XF\Service\Thread\Editor $editor */
		$editor = parent::setupThreadEdit($thread);

		$canFeatureUnfeature = $thread->canFeatureUnfeature();
		if ($canFeatureUnfeature)
		{
			$editor->setFeatureThread($this->filter('featured', 'bool'));
		}

		return $editor;
	}
}
```

This should be enough to be able to edit a thread, and set the status to featured (or unfeatured). If you try this out now, you should be able to see threads appearing and disappearing from your portal page accordingly.

We need to extend another method in the thread controller to handle a situation whereby the thread status controls are shown on some thread reply forms, too.

We just need to add the following code below the `setupThreadEdit()` method we added above:

```php
public function finalizeThreadReply(\XF\Service\Thread\Replier $replier)
{
	parent::finalizeThreadReply($replier);

	$setOptions = $this->filter('_xfSet', 'array-bool');
	if ($setOptions)
	{
		$thread = $replier->getThread();

		if ($thread->canFeatureUnfeature() && isset($setOptions['featured']))
		{
			$replier->setFeatureThread($this->filter('featured', 'bool'));
		}
	}
}
```

Note that we haven't actually returned anything in this method because it isn't expected to return anything.

For the final step in manually featuring/unfeaturing a thread, we need to go back to the forum controller and slightly change our existing code so that if featuring isn't automatic, we can handle it manually, instead. This should be fairly straight forward. Head into your extended forum controller, and replace this:

```php
if ($forum->demo_portal_auto_feature)
{
	$creator->setFeatureThread(true);
}
```

With this:

```php
if ($forum->demo_portal_auto_feature)
{
	$creator->setFeatureThread(true);
}
else
{
	$setOptions = $this->filter('_xfSet', 'array-bool');
	if ($setOptions)
	{
		$thread = $creator->getThread();

		if ($thread->canFeatureUnfeature() && isset($setOptions['featured']))
		{
			$creator->setFeatureThread($this->filter('featured', 'bool'));
		}
	}
}
```

This is mostly the same as we already had, for example, if the forum has auto featuring enabled then we just set the thread as featured, otherwise, we check to see if the checkbox is available and as we've done for the other cases, set that to whatever the checkbox state was.

We should now test creating 3 threads to ensure this is working as expected. The first in a forum with auto featuring enabled, to make sure that is still working, then in a forum without auto featuring enabled with the "Featured" checkbox checked, and again with it unchecked. Assuming that all works, let's move on.

## Improving the portal page

So, the portal page looks reasonable, but we can do a bit better.

First we should adjust our code so we only display X featured threads, and we should also add some page navigation. At this point, if you haven't already, it may be worth featuring some more threads so we can actually test the pagination!

To start, we need to go back to our portal controller, and add some code to the top of the `actionIndex()` method:

```php
$page = $this->filterPage();
$perPage = 5;
```

The first line here is a special helper method to get the current page number. The second is how many items we are going to load per page. This would usually come from an option, but we will hard code this to 5 for now.

The next thing to do is to change this line:

```php
$finder = $repo->findFeaturedThreadsForPortalView();
```

To this:

```php
$finder = $repo->findFeaturedThreadsForPortalView()
	->limitByPage($page, $perPage);
```

This changes our query so that it will limit by the page / per page values we defined above. This will automatically calculate the correct limit (`$perPage`) and offset (`($page - 1) * $perPage`) for the current page. Next, we need to pass a few more params into our view params so change:

```php
$viewParams = [
	'featuredThreads' => $finder->fetch()
];
```

To:

```php
$viewParams = [
	'featuredThreads' => $finder->fetch(),
	'total' => $finder->total(),
	'page' => $page,
	'perPage' => $perPage
];
```

To use display our page navigation, we need to know the total number of entries, which we can get from the finder using the `total()` method, the current page number and how many we are displaying per page.

If you head back on over to the portal, you will now see only 5 featured threads displayed. However, we need to now add the page navigation. So open up the `demo_portal_view` template and directly after the closing `</xf:foreach>` tag add the following:

```html
<xf:pagenav page="{$page}" perpage="{$perPage}" total="{$total}" link="portal" wrapperclass="block" />
```

Reloading the portal page at this point, as long as you have more than 5 featured threads, you will now see page navigation at the bottom of the list of featured threads.

Something else that may be useful to help improve how this page looks is to add a sidebar or, more accurately, a widget position that displays in the sidebar.

Widget positions are added in the Admin CP under "Development". Go to the "Widget positions" page then click "Add widget position". Type a "Position ID" of `demo_portal_view_sidebar`, a "Title" of `Demo portal view: Sidebar` and an appropriate description. After making sure the position is enabled, and the correct add-on ID is selected, click "Save".

To add this position to the template, simply add the following below the `<xf:title>` tag:

```html
<xf:widgetpos id="demo_portal_view_sidebar" position="sidebar" />
```

Of course we still won't see a sidebar until we add some widgets to it. Widgets themselves are not assigned to add-ons, so the widgets you create for this position, if you wish to ship some configured widgets by default, will need to be added to the Setup class.

For the sake of simplicity, we'll just duplicate the widgets that are currently assigned to the `forum_list_sidebar` position (by default). So, we'll add those to a new `installStep4()` method into the Setup class:

```php
public function installStep4()
{
	$this->createWidget('demo_portal_view_members_online', 'members_online', [
		'positions' => ['demo_portal_view_sidebar' => 10]
	]);

	$this->createWidget('demo_portal_view_new_posts', 'new_posts', [
		'positions' => ['demo_portal_view_sidebar' => 20]
	]);

	$this->createWidget('demo_portal_view_new_profile_posts', 'new_profile_posts', [
		'positions' => ['demo_portal_view_sidebar' => 30]
	]);

	$this->createWidget('demo_portal_view_forum_statistics', 'forum_statistics', [
		'positions' => ['demo_portal_view_sidebar' => 40]
	]);

	$this->createWidget('demo_portal_view_share_page', 'share_page', [
		'positions' => ['demo_portal_view_sidebar' => 50]
	]);
}
```

## Implementing permissions & optimizations

Right now, we are displaying all featured threads in the portal, regardless of whether the visitor has permission to view them or not. This isn't ideal; there may be use cases where you want to feature threads from certain restricted forums, and only have those visible by the users who can normally view that forum.

To do this, we need to change our code so that we "over-fetch" the number of records that we need to display, filter out any unviewable results, and then slice the resulting collection to the actual amount we want to display per page. This is somewhat easier than it sounds.

To start, go to the Portal controller, and change this line:

```php
->limitByPage($page, $perPage);
```

To:

```php
->limitByPage($page, $perPage * 3);
```

And below that, add:

```php
$featuredThreads = $finder->fetch()
	->filter(function(\Demo\Portal\Entity\FeaturedThread $featuredThread)
	{
		return ($featuredThread->Thread->canView());
	})
	->slice(0, $perPage, true);
```

Finally change:

```php
'featuredThreads' => $finder->fetch(),
```

To:

```php
'featuredThreads' => $featuredThreads,
```

You may have spotted earlier in the demo_portal_view template that each post we render also specifies its attachments:

```plain
'attachments': $post.attach_count ? $post.Attachments : [],
```

Right now, this is going to generate an additional query for each post. So, we should instead try to do a single query for all of the posts we are displaying and add them to the posts in advance. It probably sounds more complicated than it is. Just add the below code beneath the `->slice(0, $perPage, true);` line.

```php
$threads = $featuredThreads->pluckNamed('Thread');
$posts = $threads->pluckNamed('FirstPost', 'first_post_id');

/** @var \XF\Repository\Attachment $attachRepo */
$attachRepo = $this->repository('XF:Attachment');
$attachRepo->addAttachmentsToContent($posts, 'post');
```

We use the `pluckNamed()` method first to get a collection of threads, then again to get a collection of the posts (keyed by the post ID) from the threads. Once we have the posts, we can just pass them into a special method in the attachment repo, which performs a single query and "hydrates" the Attachments relation for each post.

The final permission related thing to finish up is to create a new permission to control who can feature / unfeature threads manually. To do this, in the Admin CP under "Development" click "Permission definitions" and click "Add permission". The "Permission group" will be "forum", "Permission ID" will be `demoPortalFeature`, "Title" should be `Can feature / unfeature threads`, set "Interface group" to `Forum moderator permissions` and after choosing an appropriate display order and ensuring your add-on is selected, click "Save".

To actually use this permission, we need to go back to our extended thread entity to modify the `canFeatureUnfeature()` method. Replace `return true;` with:

```php
return \XF::visitor()->hasNodePermission($this->node_id, 'demoPortalFeature');
```

At this point, because permissions do not have any default values, if you go to edit any thread, you should find the "Featured" checkbox is missing. But, if you go and give yourself that permission, the checkbox will come back. So, that should demonstrate the permission is working as expected!

## Creating some options

We currently display only 5 featured threads per page, but it would be nice to have the option to display more. Creating options is easy. Although not essential, we'll first create a new option group and then add a new option to that group.

In the Admin CP under Setup then Options click the "Add option group" button. We'll just call the "Group ID" `demoPortal` and give it a title of "Demo - Portal options". Give it an appropriate ̀"Description" and "Display order" and click "Save".

Now click "Add option". Set the "Option ID" to `demoPortalFeaturedPerPage`, "Title" to `Featured threads per page`, edit format to `Spin box`, "Data type" to `Positive integer` and "Default value" to `10`. Click "Save".

To implement that, go back to the portal controller and change:

```php
$perPage = 5;
```

To:

```php
$perPage = $this->options()->demoPortalFeaturedPerPage;
```

It's probably not going to hurt to add another option. Perhaps another useful option would be to be able to change the default sort order from `xf_demo_portal_featured_thread.feartured_date` to `xf_thread.post_date`. Go back to the "Demo - Portal options" group, and click "Add option".

Set "Option ID" to `demoPortalDefaultSort`, "Title" to `Default sort order` and "Edit format" to `Radio buttons`. For the "Format parameters" set those as follows:

 ```plain
 featured_date={{ phrase('demo_portal_featured_date') }}
 post_date={{ phrase('demo_portal_post_date') }}
 ```

Finally set "Default value" to `featured_date` and click "Save".

We'll need to create the phrases used for the radio button labels, similar to how we created the phrases earlier for the template modification.

Set the option value to "Post date".

Strictly speaking, we could just update our repository method to use the new option directly, however, it might be worth looking at how custom finder methods work. Create a new file in the path `src/addons/Demo/Portal/Finder/FeaturedThread.php` with the contents:

```php
<?php

namespace Demo\Portal\Finder;

use XF\Mvc\Entity\Finder;

class FeaturedThread extends Finder
{
	public function applyFeaturedOrder($direction = 'ASC')
	{
		$options = \XF::options();

		if ($options->demoPortalDefaultSort == 'featured_date')
		{
			$this->setDefaultOrder('featured_date', $direction);
		}
		else
		{
			$this->setDefaultOrder('Thread.post_date', $direction);
		}

		return $this;
	}
}
```

As you can see, all we've done here is create a fairly basic class which extends the XF `Finder` object and a simple method which looks at the value of our option, and applies the appropriate default order. We can now update our repository method to use this instead.

Inside our featured thread repository, find:

```php
->setDefaultOrder('featured_date', 'DESC')
```

And change to:

```php
->applyFeaturedOrder('DESC')
```

Finally, it probably makes sense to update our portal view to display the appropriate time stamp - either the featured date or the post date, depending on our option value.

In the demo_portal_view template change:

```html
<li><xf:date time="{$featuredThread.featured_date}" /></li>
```

To:

```html
<li>
	<xf:if is="$xf.options.demoPortalDefaultSort == 'featured_date'">
		<xf:date time="{$featuredThread.featured_date}" />
	<xf:else />
		<xf:date time="{$thread.post_date}" />
	</xf:if>
</li>
```

## Unfeaturing on visibility changes

To approach this, we are going to need to modify the Thread entity again but this time we'll be doing that with the `entity_post_save` event. As we mentioned in [The Entity life cycle](/entities-finders-repositories/#the-entity-life-cycle), the `_postSave()` method is where actions can be performed as a result of an entity being inserted or updated. Initially we will be unfeaturing a thread when that thread is no longer visible.

So, head back into the "Add code event listeners" page, and this time listen to the `entity_post_save` event. The event hint this time will be `XF\Entity\Thread`. For the execute callback, we will use the same class as we did before (`Demo\Portal\Listener`) but we will add a new method here named `threadEntityPostSave`. Let's add that method now so it's there when we save the listener:

```php
public static function threadEntityPostSave(\XF\Mvc\Entity\Entity $entity)
{

}
```

Click "Save" to save the listener.

The contents of this function are fairly simple, let's look at that:

```php
if ($entity->isUpdate())
{
	$visibilityChange = $entity->isStateChanged('discussion_state', 'visible');
	if ($visibilityChange == 'leave')
	{
		$featuredThread = $entity->FeaturedThread;
		if ($featuredThread)
		{
			$featuredThread->delete();
			$entity->fastUpdate('demo_portal_featured', false);
		}
	}
}
```

We've unfeaturd threads before, but this time we want to make that conditional on the state of the thread. We can detect state changes using the `isStateChanged` method. This will return either `enter` or `leave` for the column name and value passed in. For example, if the `discussion_state` changes from `visible` to `deleted` then the method will return `leave` in the example above.

Once we have detected that we are "leaving" the visible state, we can then just make sure we have a featured thread relation, and delete it, and update the cached value.

This would only cover the situation whereby the thread is soft deleted or sent to the approval queue. We also need to cover the situation where the thread is permanently deleted.

For this, we need another listener, this time for the `entity_post_delete` event. So, add that using the same callback class, and this time a method name of `threadEntityPostDelete`. Add the following code to the listener class:

```php
public static function threadEntityPostDelete(\XF\Mvc\Entity\Entity $entity)
{
	$featuredThread = $entity->FeaturedThread;
	if ($featuredThread)
	{
		$featuredThread->delete();
	}
}
```

After clicking "Save" to save the listener, it will be worth giving this a test. To test this, you might actually be better off keeping an eye on the xf_demo_portal_featured_thread table, as so far the code will already not display non-visible threads, but it's always important not to leave orphaned data. All being well, we're very nearly finished...

## Some final loose ends

Speaking of orphaned data, we should tidy up the database whenever the add-on is uninstalled. We can do this in the Setup class we created earlier.

We're going to create 3 new methods which correspond to our first 3 install steps:

```php
public function uninstallStep1()
{
	$this->schemaManager()->alterTable('xf_forum', function(Alter $table)
	{
		$table->dropColumns('demo_portal_auto_feature');
	});
}

public function uninstallStep2()
{
	$this->schemaManager()->alterTable('xf_thread', function(Alter $table)
	{
		$table->dropColumns('demo_portal_featured');
	});
}

public function uninstallStep3()
{
	$this->schemaManager()->dropTable('xf_demo_portal_featured_thread');
}
```

We don't have to create an uninstall step to remove the widgets as they will be removed automatically when the widget positions are removed. The same is true for any other data we created and associated to the add-on -- it will be removed automatically on uninstall.

## Building the add-on

The final step for any add-on, is releasing it! This involves extracting the XML files from the database (which are shipped in the package and used for installation), calculating the hash of each file and adding it to our `hashes.json` and packaging only the relevant files up into a ZIP file.

Thankfully, this can be done with a single CLI command! Just execute the command below:

!!! terminal
    *$* php cmd.php xf-addon:build-release Demo/Portal

    **Performing add-on export.**

    **Exporting data for Demo - Portal to ../src/addons/Demo/Portal/_data.**

    10/10 [============================] 100%

    **Written successfully.**

    **Building release ZIP.**

    **Writing release ZIP to ../src/addons/Demo/Portal/_releases.**

    **Release written successfully.**


So, with that, that concludes our demo add-on! If you would like to download the source code for this add-on, built using the very commands demonstrated above, click here: [Demo-Portal-1.0.0 Alpha.zip](/files/Demo-Portal-1.0.0 Alpha.zip).
