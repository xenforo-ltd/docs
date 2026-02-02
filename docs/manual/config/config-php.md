# Config.php options

All of the information XenForo needs to connect to your database server is located in the `src/config.php` file.

Depending upon how you installed XenForo, config.php may have created by copying the contents of the original `src/config.php.default` file, or the [XenForo installer](../installing-and-upgrading/install.md) may have created if for you.

Normally, the config file contains just a handful of settings, which are just enough to allow your XenForo to function, but there are a range of additional options that you can add to change the way that XenForo operates.

:::warning
These options control fundamental functionality of your XenForo installation, and incorrect configuration may render your site inoperable. If you run into problems, undo your changes to `config.php` and try again.
:::

The following is a list of all settings that can be controlled through `config.php`. These variable names must be entered *exactly* as displayed here, or the setting will be ignored. Variable names and values are **case-sensitive**.

In each case, the variable name is shown with its default value, for example:

`$config['variableName']` = `'default-value'`;

---

## Database connection

- `$config['db']['host']` = `'localhost'`;
- `$config['db']['port']` = `3306`;
- `$config['db']['socket']` = `null`;

The name or IP address, the port and socket of the database server that hosts your XenForo database. This information will be provided to you by your hosting provider.

- `$config['db']['username']` = `''`;
- `$config['db']['password']` = `''`;
- `$config['db']['dbname']` = `''`;

The username and password you use to connect to your database server, and the name of the database hosted on your server within which your forums are installed.

## Full unicode / emoji support

- `$config['fullUnicode']` = `false`;

This setting tells XenForo whether or not you have performed the steps necessary to support full unicode in your forum content. Full unicode is used to support the use of *Emoji* in text.

If your XenForo installation started at version 2, rather than upgrading from XenForo 1, your database will already be in full unicode format, and you may place this setting, along with a `true` value in your config.php file.

If your XenForo installation has been upgraded from XenForo 1, you will need to run the unicode conversion process before you can employ full unicode, and this setting should be left at `false` until you do so.

:::note
Full unicode support requires at least MySQL 5.5.
:::

[How to upgrade to full unicode for Emoji support](unicode.md)

## Advanced options

These options are not included as standard in the config.php, because for the most part, XenForo will use the default values. If you decide to use any of these settings, be sure to fully test the operation of your forums before leaving the system to run in a production environment.

### Site-wide feature disable

Some XenForo systems can disabled completely from the config file, without having to enter the Admin control panel at all. Setting any of these options to `false` will disable the corresponding functionality entirely.

:::note
If a system is disabled through the `config.php` file, it **can not** be re-enabled through the Admin control panel - only an edit to the config file will restore the system's functionality.
:::

The descriptions for these settings describe what will happen if you set their value to `false`.

- `$config['enableMail']` = `true`;
- `$config['enableMailQueue']` = `true`;
- `$config['enableListeners']` = `true`;
- `$config['enableTemplateModificationCallbacks']` = `true`;
- `$config['enableGzip']` = `true`;
- `$config['enableContentLength']` = `true`;
- `$config['enableTfa']` = `true`;
- `$config['enableLivePayments']` = `true`;
- `$config['enableClickjackingProtection']` = `true`;
- `$config['enableReverseTabnabbingProtection']` = `true`;
- `$config['enableApi']` = `true`;
- `$config['enableAddOnArchiveInstaller']` = `false`;
- `$config['enableOneClickUpgrade']` = `true`;

#### enableMail

Completely disables all email-sending features throughout XenForo. No email will be sent at all, ever.

#### enableMailQueue

Disables the email queuing system. Any email remaining in the queue will not be sent, and any new email will be sent as soon as it is generated, rather than being queued for sending in a batch.

#### enableListeners

Disables all code event listeners in XenForo. This will largely turn off all add-on functionality, and can be useful for recovering access to your system and control panel if an add-on has gone wrong and broken your ability to do so.

#### enableTemplateModificationCallbacks

Disables the ability of template modifications to perform their operation using a PHP callback. Similarly to `enableListeners`, this switch can be used to regain access to a system rendered inoperable by a broken callback.

#### enableGzip

By default, XenForo will compress the final HTML and CSS output of pages it generates using the *gzip* compression system, which is then invisibly decompressed by your visitors' browsers when the data is received. This can significantly speed up page loading times, but if you want to disable this feature and have the HTML and CSS sent as uncompressed plain text, disable this setting. 

#### enableContentLength

Normally, XenForo will send a Content-Length HTTP header. In some server configurations, the content may be modified between XenForo sending it and it being received by the end user. In this situation, the Content-Length header may not be updated correctly so it should be disabled.

#### enableTfa

Disables **two-factor authentication** (2FA), the system whereby users need to log in with a username and password, and an additional piece of information, such as a code from their phone. Useful if you have lost access to your admin control panel, or if you want to prevent any users from employing 2FA at all.

#### enableLivePayments

With this disabled, no payments will be processed at all. Payment providers will not be contacted and no transactions will be attempted. Useful for running a test site with a copy of a live database.

#### enableClickjackingProtection

Normally, XenForo sends the `X-Frame-Options` HTTP header with a value of `SAMEORIGIN` as a means to prevent click-jacking from malicious scripts.

When enabled, this option prevents clickjacking attacks by placing your forum in an iframe and tricking the user into clicking something. However, this can also disable valid uses of iframe embedding. Disable this only if you understand the implications.

#### enableReverseTabnabbingProtection

When enabled, this option prevents reverse tabnabbing-based phishing attacks that are triggered when your users click links to external sites. However, this protection may interfere with external services that rely on changing how link clicks are processed (such as to include affiliate links). Disable this only if you understand the implications.

#### enableApi (2.1+)

Disables access to the REST API, normally accessible via `<url>/api/`.

#### enableAddOnArchiveInstaller (2.1+)

This controls access to the control panel-based add-on install/upgrade system. When enabled, this allows an admin with the necessary permissions to upload a zip file containing a XenForo add-on and automatically installs or upgrades it.

This setting is disabled by default for security reasons.

#### enableOneClickUpgrade (2.1+)

Disables access to the one-click XenForo upgrade system in the control panel.

### Cookie settings

If you need to configure settings for how cookies are set on your visitors' browsers, you can use the following settings, but be warned, incorrect or invalid values for these settings may leave you and your visitors unable to log in to your XenForo user account, including the admin control panel.

The primary reason for changing these values is to accommodate multiple XenForo installations on the same domain. If you have only a single XenForo installation on your domain, there is no need to change these settings.

Only change these values if you *really* need to, and you know what you're doing. If you encounter problems, reset these values to their defaults.

- `$config['cookie']['prefix']` = `'xf_'`;

All cookies are identified by name, and the names of cookies set by XenForo are all normally prefixed with `xf_` to allow them to be distinguished from cookies set by other systems. One consequence of changing this value is that it  will reset the **Remember me** setting for all your logged in visitors, who will need to log in again on their next visit to your site.

The value of your prefix should use letters, numbers and underscores **only**, and is case-sensitive.

- `$config['cookie']['path']` = `'/'`;

Using the default value of `/`, cookies set by XenForo will be available in all areas of your website. If you **need** to change this so that XenForo cookies are only available within a specific part of your website, change the value to include the directory path to the correct area of your site, starting with the root location of your site, `/`.

#### Example values

- `'/'` XenForo cookies are available to all areas of your website.
- `'/forum/'` XenForo cookies can only be read by pages located within the `forum` directory, which resides at *'http://example.com/forum'*, where *example.com* is your site address.
- `'/path/to/other/folder/'` XenForo cookies can only be read by pages located in the *path/to/other/folder* directory, located at *http://example.com/path/to/other/folder*.
	- Cookies can **not** be read by pages located in folders above this location, ie:
	- `http://example.com/path`
	- `http://example.com/path/to`
	- `http://example.com/path/to/other`

:::warning
If you specify a cookie path that does not allow cookies to be set within the XenForo root directory, XenForo will be unable to read the cookies it sets, and critical operations like logging in will fail.
:::


- `$config['cookie']['domain']` = `''`;

Similiar to the cookie path setting, this allows you to specify a domain upon which your cookies can be read. It is unusual to need to set this value to anything other than the default, but as with the cookie path, you should be very careful if you change it, because entering a value that prevents XenForo from reading its own cookies will break important functionality, like the ability to stay logged in.

The reason for setting this value would be to allow cookies to be shared on multiple subdomains, for example a setting of `.example.com` would allow cookies to be accessed on all subdomains of *example.com*, such as `www.example.com` and `other.example.com`. In most instances, this setting can be left with its default setting. 

#### Example values

- `''` allows cookies to be read **only** on the domain on which they were set
- `'.example.com'` allows cookies to be read on *example.com* and any subdomain thereof
- `'subdomain.example.com'` allows cookies to be read only on *subdomain.example.com*

### Data and script locations

If you want to change the location that XenForo stores the data and scripts it keeps in files, such as avatars, attachments and javascript files, you can do so by altering these settings.

- `$config['externalDataPath']` = `'data'`;
- `$config['externalDataUrl']` = `'data'`;
- `$config['internalDataPath']` = `'internal_data'`;
- `$config['codeCachePath']` = `'%s/code_cache'`;
- `$config['tempDataPath']` = `'%s/temp'`;
- `$config['javaScriptUrl']` = `'js'`;

#### Path variables

In each of these cases, a variable name ending with **Path** refers to an internal file system path on the server, relative to the directory in which XenForo is installed. Relative paths start at the XenForo installation directory. This can be set outside the web root.

If your XenForo installation lives at `/users/yourname/htdocs/xenforo`, then the following examples show how different values relate to this path:

- `data` - `/users/yourname/htdocs/xenforo/data`
- `../another-folder` - `/users/yourname/htdocs/another-folder`

These variables can also use an absolute path from the server root, such as `/users/yourname/htdocs/xenforo/data`.

#### URL variables

Variables whose name ends with **Url** refer to a the path relative to your XenForo directory as visible from your web root. Relative URLs start at your XenForo installation directory. If your XenForo installation resides at `http://example.com/xenforo`, the following examples show how different values will be evaluated:

- `data` - `http://example.com/xenforo/data`
- `../another-folder` - `http://example.com/another-folder`
- `/a-root-folder` - `http://example.com/a-root-folder`
- `/xenforo/my-folder` - `http://example.com/xenforo/my-folder`

You may use a full URL, including the domain name, such as:

- `http://example.com/xenforo/data`
- `//example.com/xenforo/data` 

:::warning
Directories specified as paths **must** be writeable by the web server (chmod 777) or data will not be able to be stored in these locations by XenForo.

If any of these paths and URLs are set incorrectly, important XenForo functionality will be **broken**. Change them *only* if you know exactly what you're doing.
:::

#### externalDataPath

This defines the path to the 'data' directory, in which XenForo keeps files that are served directly to the browser through the web server, such as avatar images and attachment thumbnails. This directory must be within the web root.

#### externalDataUrl

Defines the location of the 'data' directory, in which XenForo keeps avatars and attachment thumbnails, as visible from your web server.

#### internalDataPath

Defines the path to the 'internal_data' directory, which contains files that are not served directly to web browser clients, such as attachments.

#### codeCachePath

Defines the location of the 'code_cache' directory, which stores cached versions of PHP files used to speed up XenForo's execution. This normally sits in the 'internal_data' directory.

#### tempDataPath

Defines the path to the directory used to store temporary files, such as attachments that have just been uploaded and are being processed prior to being stored in their final location. This normally sits in the 'internal_data' directory.

#### javaScriptUrl

Defines the location of the 'js' folder, in which XenForo expects to find the JavaScript files necessary for its functionality, as a path on the public web server. This directory must be within the web root.

### Database adapter

- `$config['db']['adapterClass']` = `'XF\Db\Mysqli\Adapter'`;

The name of the PHP class that is used to connect to your database. If you use a MySQL server, there is little reason to change this setting.

### HTTP client settings

These settings control the behavior of the internal XenForo HTTP client, which is used to fetch resources from across the internet, such as images and web pages when using the [Image and link proxy](../configuration/proxy.md).

- `$config['http']['sslVerify']` = `null`;
- `$config['http']['proxy']` = `null`;

The `sslVerify` setting will force the system the verify the SSL certificate of any sites it visits using the SSL/HTTPS when requesting resources. Setting this value to `true` can be of benefit in some circumstances, but there are a number of ways that SSL certificate verification can fail, resulting in an inability to fetch the resource requested. If in doubt, leave this setting alone.

If you want the internal XenForo HTTP client to perform its requests through a proxy, enter the proxy server's address in the `proxy` setting.

### Other variables

- `$config['globalSalt']` = `'<unique value>'`;

This variable defines a secret value which is used to *salt* the values of various caches, cookies and other data for the purpose of preventing the data being stolen or faked by malicious agents. Never reveal the global salt value to anyone as this would compromise the security of your XenForo installation.

Normally, XenForo will generate its own secure global salt, and you will only need to change it if you want to define your own.

- `$config['checkVersion']` = `true`;

If enabled, the system will check that the version number stored in the XenForo PHP scripts matches with the version number stored in your XenForo database, and will prevent access to the forums by regular visitors if the numbers do not match, as would be the case when you have just uploaded the files ready to run an upgrade, but have not actually run the upgrade process yet.

- `$config['passwordIterations']` = `10`;

Configures the strength of the bcrypt-based password storage system. Higher numbers are more secure but each increment in the value of this setting will roughly double the amount of time it takes to generate or validate a password, leading to higher server usage.

- `$config['maxImageResizePixelCount']` = `20000000`;

The maximum size of an image (in total numbers of pixels) that XenForo will attempt to resize. Images larger than this will simply not be resized and thus may be rejected. This is calculated using width × height.

- `$config['adminLogLength']` = `60`;

The number of days to keep the log of all administrator activities in the admin control panel. After this number of days have elapsed since an action was logged, it will be pruned from the database.

- `$config['chmodWritableValue']` = `0`;

If this value is non-zero, all files created by XenForo will be automatically chmodded to this value. Directories will be chmodded to this value as well, though they will also always be user-, group-, and world-executable as well. In most situations, XenForo will determine the correct chmod value automatically.

- `$config['proxyUrlFormat']` = `'proxy.php?{type}={url}&hash={hash}'`;

Defines the format for links using the [Image and link proxy](../configuration/proxy.md).

The format must include the tokens `{type}`, `{url}` and `{hash}`, and must target `proxy.php` unless you have an alternative script or system to handle the proxy requests.

- `$config['jobMaxRunTime']` = `8`;

Configures the amount of time in seconds that processing jobs will be allowed to run before they are suspended for further processing on another go-around, if possible.

- `$config['fsAdapters']` = `[]`;

Defines a list of file system adapters that are available for the system to use. This is an advanced power user feature that will be fully documented at a later date.

## Cache settings

For large XenForo sites, it can be advantageous to use a cache mechanism to speed up page generation.

The settings for caching all fall within the `$config['cache']` section, and are discussed in more detail in the [Cache](cache.md) section of this manual.

If you configure a cache, you can disable it at any time by setting the value of this option to `false`:

- `$config['cache']['enabled']` = `false`;

[Cache settings](cache.md)

### Page-level cache settings

When a cache mechanism has been configured, it is possible to cache entire pages for guest users using the [pageCache](cache.md#guest-page-caching). This extremely powerful system can consume large quantities of cache resources, so it is disabled by default until resources are allocated to it. All details and options are described in the [Cache support > Guest page caching](cache.md#guest-page-caching) section of this manual.

- `$config['pageCache']['enabled']` = `false`;

## For developers and designers

### Debug mode

Debug mode is a special state in which XenForo will run for debugging or development purposes.

- `$config['debug']` = `false`;

Setting this to true is necessary for certain functionality to operate, including Designer mode and Developer mode.

:::warning
Never, **never** enable debug mode on a live production site exposed to the Internet.

Not only will execution and page generation run significantly more slowly than with debug mode disabled, but important information such as the state of internal SQL queries can be revealed to visiting users. Only enable debug mode if you are working on a private XenForo installation that is protected from any potential malicious visitors.
:::

### Designer mode

Designer mode is an advanced feature for XenForo style designers, which allows templates to be edited directly within the filesystem, rather than using the template editor in the admin control panel.

- `$config['designer']['enabled']` = `false`;
- `$config['designer']['basePath']` = `'src' . \DIRECTORY_SEPARATOR . 'styles'`;

The `enabled` setting switches designer mode on and off, and the `basePath` value controls the location in which XenForo expects to find the template files etc. with which the designer is working.

A more extensive discussion of [Designer mode](https://xenforo.com/xf2-docs/dev/designing-styles/) can be found in the [XenForo 2 Developer Documentation](https://xenforo.com/xf2-docs/dev/designing-styles/)

### Development mode

Developer mode is another advanced feature, this time for XenForo add-on developers. 

- `$config['development']['enabled']` = `false`;
- `$config['development']['defaultAddOn']` = `''`;

The `enabled` setting switches developer mode on and off. The `defaultAddOn` setting allows you to specify the ID of an add-on, which will then automatically set the *Add on* setting for newly-created material in the admin control panel to the add-on you specify.

- `$config['development']['skipAddOns]` = `null`;

To use this setting, set the value to an array of add-on IDs, such as `['addOn1', 'addOn2']`. Any add-ons specified within the `skipAddOns` array will be skipped when it comes to running development tools such as importing and exporting master data.

- `$config['development']['throwJobErrors']` = `null`;

If this option is set to `true`, any errors that are normally suppressed when running development tools like running the add-on build script, will be thrown and displayed, interrupting the job process. This can be useful when debugging problems with the output of development jobs.

- `$config['development']['fullJs']` = `false`;

Controls whether the system should run using the standard *minified* and *rolled-up* javascript libraries, as in the default XenForo configuration, or if it should instead use the full javascript files.

Setting the value to `true` will cause XenForo to request the full javascript files. The resulting functionality will be the same, but the full, unminified files are easier to step through when debugging any problems you may have when developing your add-ons.

Using the full javascript files will cause your site to generate more HTTP requests and to consume more bandwidth, which will result in a slower experience for your visiting users, so we don't recommend using `fullJs` on live production sites. 

A full explanation of [Developer mode](https://xenforo.com/xf2-docs/dev/development-tools/) is available in the [XenForo 2 Developer Documentation](https://xenforo.com/xf2-docs/dev/development-tools/).
