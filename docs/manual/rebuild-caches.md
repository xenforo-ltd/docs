# Rebuilding caches

In order to provide maximum performance of your forum, XenForo maintains a range of caches that allow it to efficiently access various data.

Normally there is no need to concern yourself with the operation of these caches, but there may be occasions where it is desirable to rebuild some of them, such as after [importing data](importing.md).

## Operation

Tools to rebuild all the caches maintained by XenForo are available in the Admin Control Panel at **Tools > Data maintenance > Rebuild caches**.

On this page, you will find a list of tools to individually rebuild specific caches.

Some of the cache rebuilding tools require some options to tailor their operation, such as whether or not to delete existing cache data, or which content types to process.

In each case, a **Rebuild** control will initiate the cache rebuild process. 

Some caches will be rebuild very quickly while others may take several minutes, depending on the amount and the complexity of the data being processed. You will often find that the page will refresh several times during the cache rebuild process. This is normal, and is an important aspect of the manner in which the data is processed.

## Rebuild search index

If you change the **Setup > Options > Search options > Search minimum word length** option, or switch from the standard built-in search engine to [XenForo Enhanced Search](enhanced-search.md) or vice versa, it will be necessary to rebuild the search index.

You may choose to rebuild the search index for all content types, or for a single content type using the provided options.

Depending upon the reason _why_ you are (re)building the search index, you may choose to delete the existing index data before your rebuild, or not. For example, if you are running the rebuild because you have just imported new content data, it would not be necessary to delete the existing data.

Before starting the rebuild process, you must specify a number of content items to process per page. The default, suggested value is suitable for most purposes, but you may tune the number as you desire.

## Other cache rebuilding jobs

There are a large range of other cache rebuild jobs that can be triggered from this page.

During normal operation of your forum, you are unlikely to need to run any of them, unless directed to do so by XenForo support staff, or to achieve a specific goal.

However, none of the jobs are destructive or delete primary data, so it is safe to run any rebuild job at any time without fear of breakage or data loss.