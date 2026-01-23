# XenForo Enhanced Search (XFES)

XenForo Enhanced Search is an add-on that replaces the built-in XenForo search system and is built to take advantage of [Elasticsearch](https://www.elastic.co/products/elasticsearch) to provide a higher performing and more flexible search system for XenForo. It can be [purchased from XenForo.com](https://xenforo.com/purchase/) directly.

:::note
XenForo Enhanced Search requires Elasticsearch 2.0 or newer. Most shared hosting operators will not have this installed and thus XenForo Enhanced Search will not be usable. Please check with your host if you're not sure.
:::
## Installation, upgrades & uninstallation

The Enhanced Search follows the standard XenForo add-on packaging system and approaches. Full guidance for these actions can be found in the [add-ons section](add-ons.md).

## Configuration

Once installed, XenForo Enhanced Search is configured via **Setup > Enhanced Search** in the admin control panel.

Initially, you will need to enter the details of your Elasticsearch server. Once you have entered the Elasticsearch details, you will be able to configure elements about your index:

* **Stop words**: stop words allow you to control whether any words won't be included in the index. This can reduce the size of the index.
* **Word stemming**: if enabled, this can improve results by considering different forms of the root word to be identical. For example, searching for "tests" would also match "test", "testing" and "tested".
* **Accent removal and character simplification**: if enabled, accents and other characters will be simplified before indexing. This can improve results by allowing you to match a word (such as esta/está), regardless of whether the post or the search included the accent.

:::note
Once the index has been created, you must [rebuild the search index](rebuild-caches.md#rebuild-search-index) in the control panel for all existing documents to be found. If you change your index configuration later, you will need to rebuild the search index again.
:::
