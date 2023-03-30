# Entities, finders and repositories

There are a number of ways to interact with data within XF2. In XF1 this was mostly geared towards writing out raw SQL statements inside Model files. The approach in XF2 has moved away from this, and we have added a number of new ways in its place. We'll first look at the preferred method for performing database queries - the finder.

## The Finder

We have introduced a new "Finder" system which allows queries to be built up programmatically in a object oriented way so that raw database queries do not need to be written. The Finder system works hand in hand with the Entity system, which we talk about in more detail below. The first argument passed into the finder method is the short class name for the Entity you want to work with. Let's just convert some of the queries mentioned in the section above to use the Finder system instead. For example, to access a single user record:

```php
$finder = \XF::finder('XF:User');
$user = $finder->where('user_id', 1)->fetchOne();
```

One of the main differences between the direct query approach and using the Finder is that the base unit of data returned by the Finder is not an array. In the case of a Finder object which calls the `fetchOne` method (which only returns a single row from the database), a single Entity object will be returned.

Let's look at a slightly different approach which will return multiple rows:

```php
$finder = \XF::finder('XF:User');
$users = $finder->limit(10)->fetch();
```

This example will query 10 records from the xf_user table, and it will return them as an `ArrayCollection` object. This is a special object which acts similarly to an array, in that it is traversable (you can loop through it) and it has some special methods that can tell you the total number of entries it has, grouping by certain values, or other array like operations such as filtering, merging, getting the first or last entry etc.

Finder queries generally should be expected to retrieve all columns from a table, so there's no specific equivalent to fetch only certain values certain columns.

Instead, to get a single value, you would just fetch one entity and read the value directly from that:

```php
$finder = \XF::finder('XF:User');
$username = $finder->where('user_id', 1)->fetchOne()->username;
```

Similarly, to get an array of values from a single column, you can use the `pluckFrom` method:

```php
$finder = \XF::finder('XF:User');
$usernames = $finder->limit(10)->pluckFrom('username')->fetch();
```

So far we've seen the Finder apply somewhat simple where and limit constraints. So let's look at the Finder in more detail, including a bit more detail about the `where` method itself.

### where method

The `where` method can support up to three arguments. The first being the condition itself, e.g. the column you are querying. The second would ordinarily be the operator. The third is the value being searched for. If you supply only two arguments, as you have seen above, then it automatically implies the operator is `=`. Below is a list of the other operators which are valid:

- `=`
- `<>`
- `!=`
- `>`
- `>=`
- `<`
- `<=`
- `LIKE`
- `BETWEEN`

So, we could get a list of the valid users who registered in the last 7 days:

```php
$finder = \XF::finder('XF:User');
$users = $finder->where('user_state', 'valid')->where('register_date', '>=', time() - 86400 * 7)->fetch();
```

As you can see you can call the `where` method as many times as you like, but in addition to that, you can choose to pass in an array as the only argument of the method, and build up your conditions in a single call. The array method supports two types, both of which we can use on the query we built above:

```php
$finder = \XF::finder('XF:User');
$users = $finder->where([
    'user_state' => 'valid',
    ['register_date', '>=', time() - 86400 * 7]
])
->fetch();
```

It wouldn't usually be recommended or clear to mix the usage like this, but it does demonstrate the flexibility of the method somewhat. Now that the conditions are in an array, we can either specify the column name (as the array key) and value for an implied `=` operator or we can actually define another array containing the column, operator and value.

### whereOr method

With the above examples, both conditions need to be met, i.e. each condition is joined by the `AND` operator. However, sometimes it is necessary to only meet part of your condition, and this is possible by using the `whereOr` method. For example, if you wanted to search for users who are either not valid or have posted zero messages, you can build that as follows:

```php
$finder = \XF::finder('XF:User');
$users = $finder->whereOr(
    ['user_state', '<>', 'valid'],
    ['message_count', 0]
)->fetch();
```

Similar to the example in the previous section, as well as passing up to two conditions as separate arguments, you can also just pass an array of conditions to the first argument:

```php
$finder = \XF::finder('XF:User');
$users = $finder->whereOr([
    ['user_state', '<>', 'valid'],
    ['message_count', 0],
    ['is_banned', 1]
])->fetch();
```

### with method

The `with` method is essentially equivalent to using the `INNER|LEFT JOIN` syntax, though it relies upon the Entity having had its "Relations" defined. We won't go into that until the next page, but this should just give you an understanding of how it works. Let's now use the Thread finder to retrieve a specific thread:

```php
$finder = \XF::finder('XF:Thread');
$thread = $finder->with('Forum', true)->where('thread_id', 123)->fetchOne();
```

This query will fetch the Thread entity where the `thread_id = 123` but it will also do a join with the xf_forum table, behind the scenes. In terms of controlling how to do an `INNER JOIN` rather than a `LEFT JOIN`, that is what the second argument is for. In this case we've set the "must exist" argument to true, so it will flip the join syntax to using `INNER` rather than the default `LEFT`.

We'll go into more detail about how to access the data fetched from this join in the next section.

It's also possible to pass an array of relations into the `with` method to do multiple joins.

```php
$finder = \XF::finder('XF:Thread');
$thread = $finder->with(['Forum', 'User'], true)->where('thread_id', 123)->fetchOne();
```

This would join to the xf_user table to get the thread author too. However, with the second argument there still being `true`, we might not need to do an `INNER` join for the user join, so, we could just chain the methods instead:

```php
$finder = \XF::finder('XF:Thread');
$thread = $finder->with('Forum', true)->with('User')->where('thread_id', 123)->fetchOne();
```

### order, limit and limitByPage methods

#### order method

This method allows you to modify your query so the results are fetched in a specific order. It takes two arguments, the first is the column name, and the second is, optionally, the direction of the sort. So, if you wanted to list the 10 users who have the most messages, you could build the query like this:

```php
$finder = \XF::finder('XF:User');
$users = $finder->order('message_count', 'DESC')->limit(10);
```

!!! note
    Now is probably a good time to mention that finder methods can mostly be called in any order. For example: `$threads = $finder->limit(10)->where('thread_id', '>', 123)->order('post_date')->with('User')->fetch();`
    Although if you wrote a MySQL query in that order you'd certainly encounter some syntax issues, the Finder system will still build it all in the correct order and the above code, although odd looking and probably not recommended, is perfectly valid.

As with a standard MySQL query, it is possible to order a result set on multiple columns. To do that, you can just call the order method again. It's also possible to pass multiple order clauses into the order method using an array.

```php
$finder = \XF::finder('XF:User');
$users = $finder->order('message_count', 'DESC')->order('register_date')->limit(10);
```

#### limit method

We've already seen how to limit a query to a specific number of records being returned:

```php
$finder = \XF::finder('XF:User');
$users = $finder->limit(10)->fetch();
```

However, there's actually an alternative to calling the limit method directly:

```php
$finder = \XF::finder('XF:User');
$users = $finder->fetch(10);
```

It's possible to pass your limit directly into the `fetch()` method. It's also worth noting that the `limit` (and `fetch`) method supports two arguments. The first obviously being the limit, the second being the offset.

```php
$finder = \XF::finder('XF:User');
$users = $finder->limit(10, 100)->fetch();
```

The offset value here essentially means the first 100 results will be discarded, and the first 10 after that will be returned. This kind of approach is useful for providing paginated results, though we actually also have an easier way to do that...

#### limitByPage method

This method is a sort of helper method which ultimately sets the appropriate limit and offset based on the "page" you're currently viewing and how many "per page" you require.

```php
$finder = \XF::finder('XF:User');
$users = $finder->limitByPage(3, 20);
```

In this case, the limit is going to be set to 20 (which is our per page value) and the offset is going to be set to 40 because we're starting on page 3.

Occasionally, it is necessary for us to grab additional more data than the limit. Over-fetching can be useful to help detect whether you have additional data to display after the current page, or if you have a need to filter the initial result set down based on permissions. We can do that with the third argument:

```php
$finder = \XF::finder('XF:User');
$users = $finder->limitByPage(3, 20, 1);
```

This will get a total of up to **21** users (20 + 1) starting at page 3.

### getQuery method

When you first start working with the finder, as intuitive as it is, you may occasionally wonder whether you're using it correctly, and whether it is going to build the query you expect it to. We have a method named `getQuery` which can tell us the current query that will be built with the current finder object. For example:

```php
$finder = \XF::finder('XF:User')
	->where('user_id', 1);

\XF::dumpSimple($finder->getQuery());
```

This will output something similar to:

```title="Dump"
string(67) "SELECT `xf_user`.*
FROM `xf_user`
WHERE (`xf_user`.`user_id` = 1)"
```

You probably won't need it very often, but it can be useful if the finder isn't quite returning the results you expected. Read more about the `dumpSimple` method in the [Dump a variable](development-tools.md#dump-a-variable) section.

### Custom finder methods

So far we have seen the finder object get setup with an argument similar to `XF:User` and `XF:Thread`. For the most part, this identifies the Entity class the finder is working with and will resolve to, for example, `XF\Entity\User`. However, it can additionally represent a finder class. Finder classes are optional, but they serve as a way to add custom finder methods to specific finder types. To see this in action, let's look at the finder class that relates to `XF:User` which can be found in the `XF\Finder\User` class.

Here's an example finder method from that class:

```php
public function isRecentlyActive($days = 180)
{
	$this->where('last_activity', '>', time() - ($days * 86400));
	return $this;
}
```

What this allows us to do is to now call that method on any User finder object. So if we take an example earlier:

```php
$finder = \XF::finder('XF:User');
$users = $finder->isRecentlyActive(20)->order('message_count', 'DESC')->limit(10);
```

This query, which earlier just returned 10 users in descending message count order, will now return the 10 users in that order who have been recently active in the last 20 days.

Even though for a lot of entity types a finder class doesn't exist, it is still possible to extend these non existent classes in the same way as mentioned in the [Extending classes](development-tools.md#extending-classes) section.

## The Entity system

If you're familiar with XF1, you may be familiar with some of the concepts behind Entities because they have ultimately derived from the DataWriter system there. In case you're not so familiar with them, the following section should give you some idea.

### Entity structure

The `Structure` object consists of a number of properties which define the structure of the Entity and the database table it relates to. The structure object itself is setup inside the entity it relates to. Let's look at some of the common properties from the User entity:

#### Table

```php
$structure->table = 'xf_user';
```

This tells the Entity which database table to use when updating and inserting records, and also tells the Finder which table to read from when building queries to execute. Additionally, it plays a part in knowing which other tables your query needs to join to.

#### Short name

```php
$structure->shortName = 'XF:User';
```

This is the just the short class name of both the Entity itself and the Finder class (if applicable).

#### Content type

```php
$structure->contentType = 'user';
```

This defines what content type this Entity represents. This will not be needed in most entity structures. It is used to connect to specific things used by the "content type" system (which will be covered in another section).

#### Primary key

```php
$structure->primaryKey = 'user_id';
```

Defines the column which represents the primary key in the database table. If a table supports more than a single column as a primary key, then this can be defined as an array.

#### Columns

```php
$structure->columns = [
    'user_id' => ['type' => self::UINT, 'autoIncrement' => true, 'nullable' => true, 'changeLog' => false],
    'username' => ['type' => self::STR, 'maxLength' => 50,
        'required' => 'please_enter_valid_name'
    ]
    // and many more columns ...
];
```

This is a key part of the configuration of the entity as this goes into a lot of detail to explain the specifics of each database column that the Entity is responsible for. This tells us the type of data that is expected, whether a value is required, what format it should match, whether it should be a unique value, what its default value is, and much more.

Based on the `type`, the entity manager knows whether to encode or decode a value in a certain way. This may be a somewhat simple process of casting a value to a string or an integer, or slightly more complicated such as using `json_encode()` on an array when writing to the database or using `json_decode()` on a JSON string when reading from the database so that the value is correctly returned to the entity object as an array without us needing to manually do that. It can also support comma separated values being encoded/decoded appropriately.

Occasionally it is necessary to do some additional verification or modification of a value before it is written. As an example, in the User entity, look at the `verifyStyleId()` method. When a value is set on the `style_id` field, we automatically check to see if a method named `verifyStyleId()` exists, and if it does, we run the value through that first.

#### Behaviors

```php
$structure->behaviors = [
    'XF:ChangeLoggable' => []
];
```

This is an array of behavior classes which should be used by this entity. Behavior classes are a way of allowing certain code to be reused generically across multiple entity types (only when the entity changes, not on reads). A good example of this is the `XF:Likeable` behavior which is able to automatically execute certain actions on entities which support content which can be "liked". This includes automatically recalculating counts when visibility changes occur within the content and automatically deleting likes when the content is deleted.

#### Getters

```php
$structure->getters = [
    'is_super_admin' => true,
    'last_activity' => true
];
```

Getter methods are automatically called when the named fields are called. For example, if we request `is_super_admin` from a User entity, this will automatically check for, and use the `getIsSuperAdmin()` method. The interesting thing to note about this is that the `xf_user` table doesn't actually have a field named `is_super_admin`. This actually exists on the Admin entity, but we have added it as a getter method as a shorthand way of accessing that value. Getter methods can also be used to override the values of existing fields directly, which is the case for the `last_activity` value here. `last_activity` is actually a cached value which is updated usually when a user logs out. However, we store the user's latest activity date in the xf_session_activity table, so we can use this `getLastActivity` method to return that value instead of the cached last activity value. Should you ever have a need to bypass the getter method entirely, and just get the true entity value, just suffix the column name with an underscore, e.g. `$user->last_activity\_`.

Because an entity is just like any other PHP object, you can add more methods to them. A common use case for this is for adding things like permission check methods that can be called on the entity itself.

#### Relations

```php
$structure->relations = [
    'Admin' => [
        'entity' => 'XF:Admin',
        'type' => self::TO_ONE,
        'conditions' => 'user_id',
        'primary' => true
    ]
];
```

This is how Relations are defined. What are relations? They define the relationship between entities which can be used to perform join queries to other tables or fetch records associated to an entity on the fly. If we remember the `with` method on the finder, if we wanted to fetch a specific user and preemptively fetch the user's Admin record (if it exists) then we would do something like the following:

```php
$finder = \XF::finder('XF:User');
$user = $finder->where('user_id', 1)->with('Admin')->fetchOne();
```

This will use the information defined in the user entity for the `Admin` relation and the details of the `XF:Admin` entity structure to know that this user query should perform a `LEFT JOIN` on the xf_admin table and the `user_id` column. To access the admin last login date from the user entity:

```php
$lastLogin = $user->Admin->last_login; // returns timestamp of the last admin login
```

However, it's not always necessary to do a join in a finder to get related information for an entity. For example, if we take the above example without the `with` method call:

```php
$finder = \XF::finder('XF:User');
$user = $finder->where('user_id', 1)->fetchOne();
$lastLogin = $user->Admin->last_login; // returns timestamp of the last admin login
```

We still get the `last_login` value here. It does this by performing the additional query to get the Admin entity on the fly.

The example above uses the `TO_ONE` type, and this relation, therefore, relates one entity to one other entity. We also have a `TO_MANY` type.

It is not possible to fetch an entire `TO_MANY` relation (e.g. with a join / `with` method on the finder), but at the cost of a query it is possible to read that at any time on the fly, such as in the final `last_login` example above.

One such relation that is defined on the User entity is the `ConnectedAccounts` relation:

```php
$structure->relations = [
    'ConnectedAccounts' => [
    	'entity' => 'XF:UserConnectedAccount',
    	'type' => self::TO_MANY,
    	'conditions' => 'user_id',
    	'key' => 'provider'
    ]
];
```

This relation is able to return the records from the xf_user_connected_account table that match the current user ID as a `FinderCollection`. This is similar to the `ArrayCollection` object we mentioned in [The Finder](#the-finder) section above. The relation definition specifies that the collection should be keyed by the `provider` field.

Although it isn't possible to fetch multiple records while performing a finder query, it is possible to use a `TO_MANY` relation to fetch a **single** record from that relation. As an example, if we wanted to see if the user was associated to a specific connected account provider, we can at least fetch that while querying:

```php
$finder = \XF::finder('XF:User');
$user = $finder->where('user_id', 1)->with('ConnectedAccounts|facebook')->fetchOne();
```

#### Options

```php
$structure->options = [
	'custom_title_disallowed' => preg_split('/\r?\n/', $options->disallowedCustomTitles),
	'admin_edit' => false,
	'skip_email_confirm' => false
];
```

Entity options are a way of modifying the behavior of the entity under certain conditions. For example, if we set `admin_edit` to true (which is the case when editing a user in the Admin CP), then certain checks will be skipped such as to allow a user's email address to be empty.

### The Entity life cycle

The Entity plays a significant job in terms of managing the life cycle of a record within the database. As well as reading values from it, and writing values to it, the Entity can be used to delete records and trigger certain events when all of these actions occur so that certain tasks can be performed, or certain associated records can be updated as well. Let's look at some of these events that happen when an entity is saving:

- `_preSave()` - This happens before the save process begins, and is primarily used to perform any additional pre-save validations or to set additional data before the save happens.
- `_postSave()` - After the data has been saved, but before any transactions are committed, this method is called and you can use it to perform any additional work that should trigger after an entity has been saved.

There are additionally `_preDelete()` and `_postDelete()` which work in a similar way, but when a delete is happening.

The Entity is also able to give information on its current state. For example, there is an `isInsert()` and `isUpdate()` method so you can detect whether this is a new record being inserted or an existing record being updated. There is an `isChanged()` method which can tell you whether a specific field has changed since the last save.

Let's look at some real examples of these methods in action, in the User entity.

```php
 protected function _preSave()
 {
 	if ($this->isChanged('user_group_id') || $this->isChanged('secondary_group_ids'))
 	{
 		$groupRepo = $this->getUserGroupRepo();
 		$this->display_style_group_id = $groupRepo->getDisplayGroupIdForUser($this);
 	}

 	// ...
 }

 protected function _postSave()
 {
    // ...

 	if ($this->isUpdate() && $this->isChanged('username') && $this->getExistingValue('username') != null)
 	{
 		$this->app()->jobManager()->enqueue('XF:UserRenameCleanUp', [
 			'originalUserId' => $this->user_id,
 			'originalUserName' => $this->getExistingValue('username'),
 			'newUserName' => $this->username
 		]);
 	}

 	// ...
```

In the `_preSave()` example we fetch and cache the new display group ID for a user based on their changed user groups. In the `_postSave()` example, we trigger a job to run after a user's name has been changed.

## Repositories

Repositories are a new concept for XF2, but you might not be blamed for comparing them to the "Model" objects from XF1. We don't have a model object in XF2 because we have much better places and ways to fetch and write data to the database. So, rather than having a massive class which contains all of the queries your add-on needs, and all of the various different ways to manipulate those queries, we have the finder which adds a lot more flexibility.

It's also worth bearing in mind that in XF1 the Model objects were a bit of a "dumping ground" for so many things. Many of which are now redundant. For example, in XF1 all of the permission rebuilding code was in the permission model. In XF2, we have specific services and objects which handle this.

So, what are Repositories? They correspond with an entity and a finder and hold methods which generally return a finder object setup for a specific purpose. Why not just return the result of the finder query? Well, if we return the finder object itself then it serves as a useful extension point for add-ons to extend that and modify the finder object before the entity or collection is returned.

Repositories may also contain some specific methods for things like cache rebuilding.
