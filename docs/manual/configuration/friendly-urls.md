# Friendly URLs

Friendly URLs (also called SEO URLs) are web page addresses that are more readable and convenient for humans. Without friendly URLs enabled, a thread may have a URL like this:

`http://www.example.com/index.php?threads/thread-title-here.12345/`

With friendly URLs enabled, that URL would become:

`http://www.example.com/threads/thread-title-here.12345/`

Note that to enable friendly URLs, configuration of the web server may be required. This is discussed below.

### Configuring friendly URLs

By default, XenForo does not enable friendly URLs due to the web server configuration requirements. To enable friendly URLs, log in to your admin control panel, and go to **Options** and then **Search engine optimization (SEO)**. There are several options here which you may wish to configure:

- **Use full friendly URLs** - Enabling this will change the structure of the URLs as mentioned at the beginning of this section. The requirements for this vary based on your web server and are discussed below.
- **Include content title in URLs** - Disabling this option will make your URLs much shorter, but less friendly to humans as no keywords will be included in them. For example, with this option disabled, the example URL at the beginning of this section would become: `http://www.example.com/threads/12345/`

:::note
:::
If you enable friendly URLs but your web server can’t support them, your admin control panel will still be accessible.

### Friendly URL web server requirements and setup

Enabling the **Use full friendly URLs** option requires some web server configuration or additional files. Find your web server software in the list below for more details.

#### Apache

Apache is the most common web server available. If you are unsure what web server you are running, it is likely Apache. Therefore, XenForo includes the necessary configuration file in the root directory.

If after uploading XenForo, you do not see an `.htaccess` file in your XenForo root directory, rename `htaccess.txt` to `.htaccess` (be sure to include the `.` prefix). You should now be able to enable friendly URLs. If, after enabling friendly URLs your XenForo installation does not function correctly, please contact your host to confirm that they have **mod_rewrite** installed and allow overrides via an .htaccess file.

#### LiteSpeed web server

LiteSpeed Web Server reads and uses Apache configurations (including .htaccess files) and will work using [the above Apache documentation](friendly-urls.md#apache).

#### IIS 7

To enable friendly URLs in IIS 7, put the following code into a `web.config` file in your XenForo root directory:

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Imported Rule 1" stopProcessing="true">
                    <match url="^.*$" />
                    <conditions logicalGrouping="MatchAny">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" ignoreCase="false" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" ignoreCase="false" />
                    </conditions>
                    <action type="None" />
                </rule>
                <rule name="Imported Rule 2" stopProcessing="true">
                    <match url="^(data|js|styles|install)" />
                    <action type="None" />
                </rule>
                <rule name="Imported Rule 3" stopProcessing="true">
                    <match url="^.*$" />
                    <action type="Rewrite" url="index.php" />
                </rule>
            </rules>
        </rewrite>
        <httpErrors existingResponse="PassThrough" />
    </system.webServer>
</configuration>
```

#### Nginx

To enable friendly URLs in Nginx, you must put the following in your server configuration:

```
location /xf/ {
	try_files $uri $uri/ /xf/index.php?$uri&$args;
	index index.php index.html;
}

location ^~ /xf/install/data/ {
	internal;
}
location ^~ /xf/install/templates/ {
	internal;
}
location ^~ /xf/internal_data/ {
	internal;
}
location ^~ /xf/library/ { #legacy
    internal;
}
location ^~ /xf/src/ {
    internal;
}

location ~ \.php$ {
	try_files $uri =404;
	fastcgi_pass    127.0.0.1:9000;
	fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
	include         fastcgi_params;
}
```

The `/xf/` paths must be changed to match your XenForo installation path.

This configuration also helps protect web-based access to directories that aren't normally accessible.

#### Lighttpd

To enable friendly URLs in Lighttpd, ensure that you have the mod_rewrite module loaded and add the following to your server configuration:

```
url.rewrite = (
	"^/(data|install|js|styles)/(.*)$" => "$0",
	"^/(.*\.php)(.*)$" => "$0",
	"^/.*(\?.*)" => "/index.php$1",
	"" => "/index.php"
)
```
