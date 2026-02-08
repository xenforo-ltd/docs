# Webhooks and events
Webhooks can be helpful for monitoring content types and events that occur in those content types outside of XenForo in real-time.

XenForo comes with several built-in content types that can be used for webhooks, such as:

- Posts
- Profile posts
- Profile post comments
- Reports
- Threads
- Users
- User upgrades

But what if you're developing a new content type? Something you'd like to add webhook events for, so you can create webhooks that fire when specific events occur within your addon?
That is what this walkthrough is for. It will explain how to create a new content type, add events for it, and the general process of integrating webhooks into your addon.

---

## Before you start
Before you can begin adding webhooks to your addon, you should understand when webhooks are actually fired in XenForo.

XenForo's webhook system is built to notify external services when certain events occur. Each content type can have various events associated with it. Standard events include:

- `insert`: When a new entity is created
- `update`: When an existing entity is updated
- `delete`: When an entity is deleted

However, you can also create custom events beyond these standard ones.

Let's walk through the process of creating a content type that supports webhooks:

### Create a new database table
First, set up a database table and an entity for that table. Add the following to your `Setup.php` file:

```php title="setup.php"
public function installStep1(): void
{
    $this->schemaManager()->createTable('xf_notes', function (Create $table)
    {
        $table->addColumn('note_id', 'int')->autoIncrement();
        $table->addColumn('title', 'varchar', 100);
        $table->addColumn('content', 'text');
        $table->addColumn('user_id', 'int')->nullable();
        $table->addColumn('created_date', 'int');
        
        $table->addKey('note_id');
    });
}

public function uninstallStep1(): void
{
    $this->schemaManager()->dropTable('xf_notes');
}
```

This will create a table called `xf_notes` with the following columns:

- `note_id` - Primary key for the note
- `title` - The title of the note
- `content` - The content of the note
- `user_id` - The user ID of the creator
- `created_date` - When the note was created

### Create an Entity class
Next, create an entity class for your database table. Create a folder called Entity in the root of your addon, then create a file called `Notes.php`:

```php title="Entity/Notes.php"
<?php

namespace Vendor\Addon\Entity;

use XF\Api\Result\EntityResult;
use XF\Entity\User;
use XF\Mvc\Entity\Entity;
use XF\Mvc\Entity\Structure;

/**
 * COLUMNS
 * @property int|null $note_id
 * @property string $title
 * @property string $content
 * @property int|null $user_id
 * @property int $created_date
 *
 * RELATIONS
 * @property-read User|null $User
 */
class Notes extends Entity
{
    public static function getStructure(Structure $structure): Structure
    {
        $structure->table = 'xf_notes';
        $structure->shortName = 'Vendor\Addon:Notes';
        $structure->primaryKey = 'note_id';
        $structure->columns = [
            'note_id' => ['type' => self::UINT, 'autoIncrement' => true, 'nullable' => true],
            'title' => ['type' => self::STR, 'maxLength' => 100, 'required' => true],
            'content' => ['type' => self::STR, 'default' => ''],
            'user_id' => ['type' => self::UINT, 'nullable' => true],
            'created_date' => ['type' => self::UINT, 'default' => \XF::$time],
        ];

        $structure->getters = [];

        $structure->relations = [
            'User' => [
                'entity' => 'XF:User',
                'type' => self::TO_ONE,
                'conditions' => 'user_id',
                'primary' => true,
            ]
        ];

        return $structure;
    }
}
```

## Creating a new content type
To register your entity as a content type that can be used with webhooks, you need to create content type entries in the XenForo admin control panel.

Navigate to: `Development -> Content types`, click the `Add content type field` button to create a new content type.

This will present you with four fields:

- **Content type**: The unique identifier for your content type
- **Field**: The type of information you're defining
- **Value**: The actual value for the field
- **Add-on**: Your add-on's unique identifier

For our example, we need to create three content type entries:

### 1. Entity link
- **Content type**: vendor_addon_notes
- **Field**: entity
- **Value**: Vendor\Addon:Notes
- **Add-on**: Vendor\Addon

### 2. Webhook handler class
- **Content type**: vendor_addon_notes
- **Field**: webhook_handler_class
- **Value**: Vendor\Addon\Webhook\Event\NotesHandler
- **Add-on**: Vendor\Addon

### 3. Phrase linked to the content type
- **Content type**: vendor_addon_notes
- **Field**: phrase_plural
- **Value**: vendor_addon_notes
- **Add-on**: Vendor\Addon

## Creating a Webhook Event Handler
Next, you need to create a webhook event handler class. This class defines what events are available for your content type and provides information about each event.

Create a folder called `Webhook/Event` in the root of your addon, then create a file called `NotesHandler.php`:

```php title="Webhook/Event/NotesHandler.php"
<?php

namespace Vendor\Addon\Webhook\Event;

use XF\Webhook\Event\AbstractHandler;

class NotesHandler extends AbstractHandler
{
    /**
     * Define the available events for notes
     *
     * @return array
     */
    public function getEvents(): array
    {
        return ['insert', 'update', 'delete', 'report'];
    }

    /**
     * Provide a hint for each event
     *
     * @param string $event
     * @return string
     */
    public function getEventHint(string $event): string
    {
        return match ($event)
        {
            'insert' => 'When a new note is created',
            'update' => 'When an existing note is updated',
            'delete' => 'When a note is deleted',
            'report' => 'Note statistics',
            default => '',
        };
    }

    /**
     * Get relations to include with the entity when sending webhooks
     *
     * @return array
     */
    public function getEntityWith(): array
    {
        return ['User'];
    }
}
```

Let's examine each method:

- `getEvents`: This method returns an array of event names that your content type supports. The standard events are insert, update, and delete. We've added a custom report event as well.
- `getEventHint`: This provides descriptive text for each event, which will be displayed in the admin control panel.
- `getEntityWith`: This specifies which relations should be included when sending the webhook payload. In our case, we want to include the User relation.

## Entity Setup for Webhooks
There are two critical additions to the entity class that enable webhook functionality, add the following to the `getStructure` method:
```php title="Entity/Notes.php"
$structure->relations = [
    'User' => [
        'entity' => 'XF:User',
        'type' => self::TO_ONE,
        'conditions' => 'user_id',
        'primary' => true,
    ]
];
        
$structure->behaviors['XF:Webhook'] = ['enabled' => true];
$structure->contentType = 'vendor_addon_notes';

return $structure;
```

- `$structure->behaviors['XF:Webhook']`: This adds the webhook behaviour to the entity, enabling it to trigger webhook events automatically for insert, update, and delete operations.
- `$structure->contentType`: This specifies the content type identifier that was registered in the admin control panel.

## Setting Up API Result Data
Next we need to add the `setupApiResultData()` method in your entity class. This defines what data is included in webhook payloads:
```php title="Entity/Notes.php"
protected function setupApiResultData(EntityResult $result, $verbosity = self::VERBOSITY_NORMAL, array $options = []): void
{
    $result->includeColumn(['note_id', 'title', 'content', 'user_id', 'created_date']);
    $result->includeExtra([
        'User' => [
            'user_id' => $this->User->user_id,
            'username' => $this->User->username,
            'title' => $this->User->custom_title
        ],
    ]);
}
```

- `includeColumn()`: Specifies which columns from the entity should be included in the webhook payload.
- `includeExtra()`: Allows you to include additional data, such as related entities, in a structured format.

## Entity Usage with Webhook Events
Once you've set up the entity with webhook support, the standard events (`insert`, `update`, and `delete`) will be automatically triggered when you perform those operations on your entity (provided you have a webhook event set up):
```php title="Example usage"
// Creating a note - will trigger the 'insert' webhook event
$note = \XF::em()->create('Vendor\Addon:Notes');
$note->title = 'New Note';
$note->content = 'This is a new note.';
$note->user_id = \XF::visitor()->user_id;
$note->save();

// Updating a note - will trigger the 'update' webhook event
$note = \XF::em()->find('Vendor\Addon:Notes', 123);
$note->content = 'Updated content.';
$note->save();

// Deleting a note - will trigger the 'delete' webhook event
$note = \XF::em()->find('Vendor\Addon:Notes', 123);
$note->delete();
```

## Creating Custom Webhook Events
Beyond the standard events, you can create custom webhook events for your content type. This is done by directly calling the webhook system rather than relying on the automatic triggers from entity operations.

Here's an example of creating a custom `report` webhook event that sends statistical information about notes:

```php title="Example custom event"
public static function generateReport(): void
{
    $results = \XF::db()->fetchAll("
        SELECT COUNT(*) as total_notes,
               MIN(created_date) as oldest_note_date,
               MAX(created_date) as newest_note_date,
               COUNT(DISTINCT user_id) as unique_users
        FROM xf_notes
        WHERE created_date > ?
    ", [\XF::$time - (7 * 86400)]);

    $report = $results[0] ?? [];

    if (!empty($report)) {
        if (!empty($report['oldest_note_date'])) {
            $report['oldest_note_date'] = date('Y-m-d H:i:s', $report['oldest_note_date']);
        }
        if (!empty($report['newest_note_date'])) {
            $report['newest_note_date'] = date('Y-m-d H:i:s', $report['newest_note_date']);
        }

        $payload = [
            'event' => 'report',
            'content_type' => 'vendor_addon_notes',
            'report_date' => date('Y-m-d H:i:s'),
            'stats' => $report
        ];

        /** @var WebhookRepository $webhookRepo */
        $webhookRepo = \XF::repository('XF:Webhook');
        $webhookRepo->queueWebhook(
            'vendor_addon_notes',
            \XF::$time,
            'report',
            $payload
        );
    }
}
```

The key part is the call to `queueWebhook()`, which takes these parameters:

- `contentType`: The content type identifier (vendor_addon_notes)
- `contentId`: An identifier for the specific content (we're using the current timestamp)
- `event`: The event name (report)
- `payload`: The data to send with the webhook

:::note Reminder
    Keep in mind that earlier we also added an event `report` to the `getEvents()` method.
:::

This allows you to create custom webhook events beyond the standard entity operations, which can be useful for periodic reports, bulk operations, or other special events that aren't tied directly to entity CRUD operations.