# Cache

For larger XenForo installations, it can be advantageous to define a **cache** in order to save on processing time and database queries.

XenForo has the ability to store and retrieve various data from a cache, which can be configured in your **src/config.php** file.

## Supported providers

XenForo ships with several popular cache providers including:

* APC
* File system cache
* Memcached
* Redis
* WinCache
* XCache
* ... and more!

Many of the cache providers will require software to be explicitly installed on your server. You may wish to inquire with your host as to which options are available.

Let's look at how to configure some of these cache providers. All configuration is done within **src/config.php**

### APC

```php
$config['cache']['enabled'] = true;
$config['cache']['provider'] = 'ApcCache';
```

This provider has no additional configuration options.

### File system cache

```php
$config['cache']['enabled'] = true;
$config['cache']['provider'] = 'Filesystem';
$config['cache']['config'] = [
    'directory' => '/path/to/your/cache/directory'
];
```

:::note
Ensure that the directory exists, is writable by the web server user, and is not publicly accessible!
:::
### Memcached

```php
$config['cache']['enabled'] = true;
$config['cache']['provider'] = 'Memcached';
$config['cache']['config'] = [
    'server' => '127.0.0.1'
];
```

It is also possible to configure an array of servers, if required.

### Redis

```php
$config['cache']['enabled'] = true;
$config['cache']['provider'] = 'Redis';
$config['cache']['config'] = [
	'host' => '127.0.0.1',
	'password' => 'password'
];
```

Redis has a number of additional configuration options. The following list will demonstrate the default values of all of the supported configuration items available:

```php
'host' => '',
'port' => 6379,
'timeout' => 0.0,
'password' => '',
'database' => 0,
'persistent' => false,
'persistent_id' => ''
```

### WinCache

```php
$config['cache']['enabled'] = true;
$config['cache']['provider'] = 'WinCache';
```

This provider has no additional configuration options.

### XCache

```php
$config['cache']['enabled'] = true;
$config['cache']['provider'] = 'XCache';
```

This provider has no additional configuration options.

## Session caching

In addition to various data caches, it is possible to also cache XenForo user sessions. To cache sessions add the following to **src/config.php**:

```php
$config['cache']['sessions'] = true;
```


:::note
Your cache must have enough space to hold the sessions, or users may not be able to login properly. We do not recommend writing sessions to the cache if you are using APC as your cache provider.
:::

## Cache contexts

Starting in XenForo 2.1, a different cache configuration may be specified for different scenarios (contexts). For example, this allows a global cache to be defined, but for a different cache to be used for sessions or guest page caching.

To specify a cache for a specific context, you would add code similar to the following to **src/config.php**:

```php
$config['cache']['context']['CONTEXT_NAME']['provider'] = 'CacheProvider';
$config['cache']['context']['CONTEXT_NAME']['config'] = [];
```

In this example, `CONTEXT_NAME` would be replaced with the specific cache context (see below), while `CacheProvider` and the configuration value would be replaced with the name of the cache type being used (Memcached, Redis, etc) and the necessary configuration to use it.

In order to use specific cache contexts, caching must globally be enabled using the following **src/config.php** line:

```php
$config['cache']['enabled'] = true;
```

The following cache contexts are used by default in XenForo 2.1:

* css
* page
* registry
* sessions

When specifying a custom provider for a cache context, you may also override the cache namespace if needed via:

```php
$config['cache']['context']['CONTEXT_NAME']['namespace'] = 'value';
```

If not specified, the global cache namespace will be used.

## Guest page caching

XenForo 2.1 has the option to cache guest page views for a period of time. This can reduce the overhead caused by guests browsing the site, potentially reducing overall server load.

Guest page caching can cause a large amount of data to be cached. Therefore, the page cache requires that you setup a specific `page` cache context. If this is not done, page caching will not be enabled. We recommend using a separate cache "instance" for the global and page caches to ensure that the page cache does not force data such as sessions out of the global cache.

A basic page cache setup requires the following code to be added to the **src/config.php** file:

```php
$config['cache']['enabled'] = true;
$config['pageCache']['enabled'] = true;
$config['cache']['context']['page']['provider'] = 'CacheProvider';
$config['cache']['context']['page']['config'] = [];
```

The `CacheProvider` value and the configuration for that provider will need to be modified to refer to a specific cache type and the necessary configuration for it. See the cache contexts section for more detail.

When a page is served from the cache, a `X-XF-Cache-Status: HIT` header will be present in the response.

### Advanced guest page caching configuration

Additional configuration options are available to tune the guest page caching system:

* `$config['pageCache']['lifetime']` (default: `300`) - the amount of time, in seconds, that a page will be cached for.
* `$config['pageCache']['recordSessionActivity']` (default: `true`) - if true, a session activity record will be updated when a page is served from the cache. This will make the online user count more accurate at the expense of requiring additional work when serving a cached page.
* `$config['pageCache']['routeMatches']` (default: `[]`) - an array of route prefixes where the cache is active. For example, `['threads/', 'forums/']` would only cache thread- and forum-related pages. If the first character is a `#`, then the value should be a regular expression to test the route against. 
* `$config['pageCache']['onSetup']` (default: `null`) - a closure that allows custom behavior when setting up the page cache. Receives the `\XF\PageCache` object as an argument. If the closure returns false, the page cache will be disabled for this request.