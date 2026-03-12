# Handlers

XenForo uses a "handler" pattern to allow different content types to plug into shared systems. Rather than having a single monolithic class that knows about every type of content, each system defines an abstract handler class, and individual content types provide their own concrete implementation.

For example, the attachment system doesn't need to know the specifics of how a post or a conversation message works. Instead, each content type provides an attachment handler that tells the system how to check permissions, manage constraints, and clean up when attachments are deleted.

## How handlers work

The handler pattern in XenForo follows a consistent structure:

1. **An abstract base class** defines the contract, including the methods every handler must implement and any optional hooks.
2. **Concrete handler classes** extend the abstract class for each content type that supports the feature.
3. **A content type field** registers the handler class against a content type, so the system can discover and instantiate it at runtime.

## Content type fields

At the heart of the handler system is the `xf_content_type_field` table. This table maps content types (like `post`, `thread`, `profile_post`) to handler classes for each system they participate in.

Each row has three columns:

| Column | Description |
|---|---|
| `content_type` | The content type identifier (e.g. `post`) |
| `field_name` | The system this handler belongs to (e.g. `attachment_handler_class`) |
| `field_value` | The fully qualified class name of the handler |

For example, the post content type registers its attachment handler like this:

| content_type | field_name | field_value |
|---|---|---|
| `post` | `attachment_handler_class` | `XF\Attachment\PostHandler` |

A single content type can register handlers for many different systems. The `post` content type, for instance, has handler registrations for attachments, alerts, reactions, reports, bookmarks, tags, and more.

### Registering a handler

Content type fields are managed through the Admin control panel at **Development > Execution manipulation > Content types**. This area is only available when [development mode](../development-tools.md#enabling-development-mode) is enabled.

From here you can add a new content type field by specifying the content type, field name, and the fully qualified class name of the handler. You will also need to associate the content type field with your add-on.

When your add-on's development output is exported, the content type field will be written to a JSON file in your add-on's `_output/content_type_fields/` directory following the naming convention `{content_type}-{field_name}.json`. For example:

```json title="src/addons/Demo/Portal/_output/content_type_fields/demo_item-attachment_handler_class.json"
{
    "content_type": "demo_item",
    "field_name": "attachment_handler_class",
    "field_value": "Demo\\Portal\\Attachment\\ItemHandler"
}
```

:::note
Your entity structure must also declare the matching `contentType` for the content type system to associate it correctly:

```php
$structure->contentType = 'demo_item';
```

See [Entities, finders and repositories](../entities-finders-repositories.md#content-type) for more details.
:::

### How handlers are discovered

At runtime, the content type fields are cached in the data registry. You can look up all handlers for a given system or retrieve a specific handler for a content type:

```php
// Get all attachment handler classes, keyed by content type
$handlers = \XF::app()->getContentTypeField('attachment_handler_class');
// Returns: ['post' => 'XF\Attachment\PostHandler', 'conversation_message' => 'XF\Attachment\ConversationMessageHandler', ...]

// Get a single handler class for a specific content type
$handlerClass = \XF::app()->getContentTypeFieldValue('post', 'attachment_handler_class');
// Returns: 'XF\Attachment\PostHandler'
```

Each system typically has a repository method that handles instantiation. The general pattern looks like this:

```php
public function getAttachmentHandler(string $type): ?AbstractHandler
{
    $handlerClass = \XF::app()->getContentTypeFieldValue($type, 'attachment_handler_class');
    if (!$handlerClass)
    {
        return null;
    }

    $handlerClass = \XF::extendClass($handlerClass);
    return new $handlerClass($type);
}
```

Note the use of `\XF::extendClass()`. This ensures that any class extensions applied by other add-ons are respected when the handler is instantiated.

## Common handler systems

The following is a list of the handler systems available in XenForo, along with their content type field name and abstract base class:

| System | Field name | Base class |
|---|---|---|
| Activity log | `activity_log_handler_class` | `XF\ActivityLog\AbstractHandler` |
| Alerts | `alert_handler_class` | `XF\Alert\AbstractHandler` |
| Approval queue | `approval_queue_handler_class` | `XF\ApprovalQueue\AbstractHandler` |
| Attachments | `attachment_handler_class` | `XF\Attachment\AbstractHandler` |
| Bookmarks | `bookmark_handler_class` | `XF\Bookmark\AbstractHandler` |
| Change log | `change_log_handler_class` | `XF\ChangeLog\AbstractHandler` |
| Content voting | `content_vote_handler_class` | `XF\ContentVote\AbstractHandler` |
| Edit history | `edit_history_handler_class` | `XF\EditHistory\AbstractHandler` |
| Featured content | `featured_content_handler_class` | `XF\FeaturedContent\AbstractHandler` |
| Find new | `find_new_handler_class` | `XF\FindNew\AbstractHandler` |
| Inline moderation | `inline_mod_handler_class` | `XF\InlineMod\AbstractHandler` |
| Moderator log | `moderator_log_handler_class` | `XF\ModeratorLog\AbstractHandler` |
| News feed | `news_feed_handler_class` | `XF\NewsFeed\AbstractHandler` |
| Polls | `poll_handler_class` | `XF\Poll\AbstractHandler` |
| Reactions | `reaction_handler_class` | `XF\Reaction\AbstractHandler` |
| Reports | `report_handler_class` | `XF\Report\AbstractHandler` |
| Sitemap | `sitemap_handler_class` | `XF\Sitemap\AbstractHandler` |
| Stats | `stats_handler_class` | `XF\Stats\AbstractHandler` |
| Tags | `tag_handler_class` | `XF\Tag\AbstractHandler` |
| Trending content | `trending_content_handler_class` | `XF\TrendingContent\AbstractHandler` |
| Warnings | `warning_handler_class` | `XF\Warning\AbstractHandler` |
| Webhook events | `webhook_handler_class` | `XF\Webhook\Event\AbstractHandler` |
