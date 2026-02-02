# Setting the index page

Assume that you've installed XenForo into `http://example.com/community/`. When you access this URL or `http://example.com/community/index.php`, a specific page in the XenForo system must be loaded.

By default, this is the list of forums, or an overview of new posts (controlled by the **Forums default page** option). However, you can change this to a page of your choosing. This may be a portal that you've installed, the resource manager, or even a custom page node.

This is controlled by the **Index page route** option in the **Basic board information** group. This defaults to `forums/`. When you change this value, whatever used to be at the index will now be accessible by its default URL. Any links that point to the new index route will simply point to the `http://example.com/community/` or `http://example.com/community/index.php` URL instead.

To change this, you must first identify the route of the page you want to set as the index. This is discussed in the [Route filters](route-filters.md) section. Here are a few examples:

- Forum list: `forums/`
- A page node: `pages/page-name/` (change page-name as necessary)
- The recent activity list: `recent-activity/`
- The resource manager: `resources/` (only applies with the necessary add-on)
- A custom portal: `portal/` (you may need to change this route depending on the portal add-on)

After changing the index route, you should check that the index URL displays the content you expect.