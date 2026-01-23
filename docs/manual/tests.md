# Checks and tests

XenForo provides a range of testing tools for your use, which can assist in verifying correct functionality, diagnosing problems and alerting you to potential vulnerabilities.

## Test URL unfurling

**Tools > Checks and tests > Test URL unfurling**

When users include URL links in their posts, your server is instructed to visit those links and fetch an _unfurled_ preview of the content at the URL specified.

You may test how your server behaves when attempting a URL unfurl by entering a URL into the _test URL unfurling_ tool.

## Test outbound email

**Tools > Checks and tests > Test outbound email**

Use this tool to verify that your server is able to successfully send email, and to diagnose any problems it may be having in doing so.

## Test image proxy

**Tools > Checks and tests > Test image proxy**

This tool allows you to inspect the inner workings of the [image proxy](proxy.md), to ensure that it is able to successfully fetch the requested image and serve it to your visitors.

## File health check

**Tools > Checks and tests > File health check**

When you download a copy of the XenForo software from xenforo.com, each separate file in the .zip archive is inspected and logged.

From time to time, your site will inspect its own files and compare their contents against those logged at download time.

If differences are detected, it could be an indication that there has been tampering with the files, which could indicate the presence of bad actors. Alternatively, missing files could be a warning that important features are not currently operational. 

You may run the file health check manually using this tool.

## Check for upgrades

**Tools > Checks and tests > Check for upgrades**

XenForo will periodically check to see if a new version is available. If a new version exists, you will be notified in the admin control panel.

You may manually check for updates using this tool.

## PWA setup

**Setup > PWA setup**

The configuration page for the [XenForo progressive web app](pwa.md) also automatically tests and reports the ability of your system to provide the PWA functionality.