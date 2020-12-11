# Managing the schema

We've taken a look at some of the new approaches available for interacting with data. Of course there are specific circumstances where interacting with the database directly may be necessary.

## The database adapter

The default database adapter in XF2 is based on MySQL and PHP's mysqli extension. The configured database adapter is accessible in any XF class using the following:

```php
$db = \XF::db();
```

The adapter has a number of methods available which will execute a SQL query and then format the results into an array. For example, to access a single user record:

```php
$db = \XF::db();
$user = $db->fetchRow('SELECT * FROM xf_user WHERE user_id = ?', 1);
```

The `$user` variable will now contain an array of all values from the first row found in the query result. To get a single value from that query, such as the username, you can do the following:

```php
$username = $user['username'];
```

!!! warning
    Database queries written directly and passed to the database adapter are not automatically "safe". They pose a risk of a SQL injection vulnerability if user input is not sanitised and not passed into the query without being prepared. The way to do that properly is using prepared statements, like in the example above. Parameters are represented in the query itself using the `?` placeholder. These placeholders are then replaced with the values in the next argument after they have been appropriately escaped. If you have the need to use more than a single parameter, that should be passed into the fetch type method as an array. Should the need arise, you can escape or quote values directly using `$db->quote($value)`.

    You can find more information about prepared statements [here](http://php.net/manual/en/mysqli.quickstart.prepared-statements.php).

It's also possible to query for a single value from a record. For example:

```php
$db = \XF::db();
$username = $db->fetchOne('SELECT username FROM xf_user WHERE user_id = ?', 1);
```

If you have a query that needs to return multiple rows, you can use either `fetchAll`:

```php
$db = \XF::db();
$users = $db->fetchAll('SELECT * FROM xf_user LIMIT 10');
```

Or `fetchAllKeyed`:

```php
$db = \XF::db();
$users = $db->fetchAllKeyed('SELECT * FROM xf_user LIMIT 10', 'user_id');
```

Both of these methods will return an array of arrays that represent each user record. The difference between the `fetchAll` and `fetchAllKeyed` methods is that the returned array will be keyed differently. With `fetchAll` the array will be keyed with numerically consecutive integers. With `fetchAllKeyed` the array will be keyed by the name of the field named in the second argument.

!!! note
    If you are using `fetchAllKeyed` note that the second argument is the field to key the array by, but the **third** argument is where you pass in the param values to match the `?` placeholders.

There are some other fetch type methods available including `fetchAllColumn` for grabbing an array of a specific column's values from all returned rows:

```php
$db = \XF::db();
$usernames = $db->fetchAllColumn('SELECT username FROM xf_user LIMIT 10');
```

The above example would return an array of 10 usernames found from the resulting query.

Finally, you may not actually want or need any data returned, in which case you can just do a plain query:

```php
$db = \XF::db();
$db->query('DELETE FROM xf_user WHERE user_id = ?', 1);
```

## Schema management

XF2 includes an all new way to manage the database schema which takes an object oriented approach to performing certain table operations. Let's first look at a traditional alter, using the database adapter like we have above:

```php
$db = \XF::db();
$db->query("
    ALTER TABLE xf_some_existing_table
    ADD COLUMN new_column INT(10) UNSIGNED NOT NULL DEFAULT 0,
    MODIFY COLUMN some_existing_column varchar(250) NOT NULL DEFAULT ''
");
```

And also let's look at a typical create table query:

```php
$db = \XF::db();
$sm = $db->getSchemaManager();

$defaultTableConfig = $sm->getTableConfigSql();

$db->query("
    CREATE TABLE xf_some_table (
        some_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        some_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (user_id)
    ) {$defaultTableConfig}
");
```

The alternative and preferred approach in XF2 uses the new `SchemaManager` object. Let's look at both of these queries, as performed by the schema manager, starting with the alter:

```php
$sm = \XF::db()->getSchemaManager();
$sm->alterTable('xf_some_existing_table', function(\XF\Db\Schema\Alter $table)
{
    $table->addColumn('new_column', 'int')->setDefault(0);
    $table->changeColumn('some_existing_column')->length(250);
});
```

And the table creation:

```php
$sm = \XF::db()->getSchemaManager();
$sm->createTable('xf_some_table', function(\XF\Db\Schema\Create $table)
{
    $table->addColumn('some_id', 'int')->autoIncrement();
    $table->addColumn('some_name', 'varchar', 50);
});
```

!!! warning
	When you alter the existing XenForo tables, or create your own tables, you **MUST** specify a default value otherwise you will encounter problems when querying the table.

Both of these examples produce the exact same query as their more direct counterparts above. Though you might notice that some things are (deliberately) missing. For example, none of the examples specify a length for the `int` fields. This is simply because by omitting that, MySQL will provide it with a default, which is 10 for unsigned integers. Speaking of which, we also don't specify that the `some_id` column is unsigned. Using unsigned integers within XF is by far the most common use case, so it is automatically added. If you genuinely need the ability to support negative integers, you can reverse that with the `->unsigned(false)` method. Another omission is the lack of defining `NOT NULL` for everything. Again, this is applied automatically, but you can reverse that with `->nullable(true)`.

It may not be clear from the alter example, but when changing existing fields, the existing field definition is automatically retained. This means that, rather than having to specify the full column definition, including all of the bits that haven't actually changed, you can just specify the parts you want to change.

There is some other automatic inference that happens with regards to primary keys. You can explicitly define the primary key (or any other type of key) if you wish, but often auto incremented fields will usually be your primary key for the table. So in the create table example, the `some_id` field is automatically assigned as the primary key for that table.

Finally, for the create table approach, we can automatically add the correct table config for the storage engine specified (which defaults to `InnoDB` but can be changed easily to other engine types).
