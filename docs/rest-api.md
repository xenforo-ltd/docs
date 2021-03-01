# REST API

In XenForo 2.1, a REST API was added. This allows you to programmatically interact with many areas of a XenForo installation.

Accessing the API requires generating a key via the admin control panel. There is no unauthenticated access to the API and users cannot generate their own keys to access the API at this time.

The API for a specific XenForo installation is accessible at `<XenForo base URL>/api/`. All endpoints are prefixed by this URL. For example, if XenForo is installed at `https://example.com/community/`, then the API URLs will start with `https://example.com/community/api/`. In this example, accessing a list of threads would be done via `https://example.com/community/api/threads/`.

The API is enabled by default. If necessary, all API access can quickly be disabled by adding the following to **src/config.php**:

```php
$config['enableApi'] = false;
```

## API keys

API keys are created via the admin control panel by going to **Setup > API keys**. As generating API keys can allow access to highly privileged data, only super administrators may access this system. All super admins will receive an email when an API key is generated to ensure that the request is valid.

When a key is created, a random string will be generated and this will be used to authenticate yourself with the API. It is important that this key is kept secret. If you believe an API key has been compromised, you should immediately regenerate the key and update any code using the old key.  

### Key types

All API access is done in the context of a specific user. For example, if I access the API as "John" and I make a request that posts a thread, that thread will have been created by "John". In most cases, the API will also respect permissions specified for this user, so they can't access data they wouldn't see when browsing the forum normally.

To allow control over this, there are three types of API keys:

* **Guest key** - this key always accesses the API as a guest user. These requests will always respect the guest permissions. For example, if guests cannot reply to threads, an API request to reply to a thread would generate a no permission error.
* **User key** - this key always accesses the API as a specified user and always respects that user's permissions, similar to a guest key.
* **Super user key** - this key can access the API as any user by passing an additional value into it. Optionally, this key can bypass the requesting user's permissions, allowing them to take actions or view content they would not normally have access to.

Super user keys are very useful for integrations with other systems or applications. For example, you may integrate with a third-party CMS that creates a thread whenever you post a new article. This type of key would allow you to create a thread with a different user depending on the article author or in a forum that users normally can't post in.


### Key scopes

To help limit the amount of damage a compromised key can inflict, each key can control the API scopes that it can access. Scopes limit access to areas of the API, independent of the requesting user's permissions.

Each endpoint in the API will be covered by one of more scopes. If the API has not been granted any of those scopes, the request will fail.

For security, we recommend you only grant a key the scopes that you require. If you require additional scopes at a later time, they can be added when needed.

## Accessing the API

Once you know the URL to access the API and have a key, you can begin to make requests to it.

All API responses will be returned in JSON format, except in cases where a binary file is specifically requested (such as when downloading an attachment). Errors will always return a response code in the 400 range. Successful requests will return a 200 code. While not commonly used, redirects will return a 300-range code.

Requests bodies must be sent using the `application/x-www-form-urlencoded` encoding or, if a file is being uploaded,  the `multipart/form-data` encoding. Parameters may also be passed via the query string, although for non-GET requests we **strongly** recommend passing parameters via the request body.

All request data must use the UTF-8 character set.

Requests must pass the API key to use via the `XF-Api-Key` header. This must be present in all requests.

If the API key selected is a super user key, you may pass the user ID of the context user via the `XF-Api-User` header. If no user ID is passed, the context will default to a guest.

If the request is made with a super user key and you wish to bypass the context user's permissions, this may be done on a per-request basis by setting the `api_bypass_permissions` parameter to 1. (This can be passed via a query string or as part of the request body.)

### Error handling

When an error is encountered, the response code will be in the 400 range. Occasionally, a 500-range error may occur, though this indicates that the server was unable to process the request. The API may be temporarily disabled or another server error has occurred.

Error messages have a standardized format. Here is an example:

```json
{
    "errors": [
        {
            "code": "api_key_not_found",
            "message": "API key provided in request was not found.",
            "params": []
        }
    ]
}
```

The top level will be an object with an `errors` key. This will be an array with 1 or more entries. Each entry is an object with the following parameters:

* `code` - this is a machine readable code for the error. There are many possible error codes as they are situation dependent.
* `message` - a human readable version of the error. This may change or may be translated and should not be used to identify the type of error.
* `params` - this is a list of key-value parameters that are relevant to the error triggered. They may supplement the error code and message to give more specific details about the error.

## API endpoints

The API features a number of endpoints and actions that can be taken. Additional endpoints and data may be added in the future.

**[View the API endpoint documentation](https://xenforo.com/community/pages/api-endpoints/)**

This endpoint documentation has been generated from the API data and comments in the code. It will be expanded and updated over time.
