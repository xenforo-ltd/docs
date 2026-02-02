# Articles

Articles are one of XenForo's [forum and thread types](forum-thread-types.md).

### Article threads

Sometimes, threads are less about discussion and more about imparting knowledge. In these cases, **article threads** allow the first post in a thread to be afforded special treatment.

The first post in an article thread has extended limits on the number of embedded media items and attachments, has a greater character limit to allow very long textual content to be posted, and has different styling applied to make it appear distinct from subsequent posts in the thread.

Subsequent posts made to an article thread are considered to be comments on the article. At the point that the comments extend beyond a single page, a compressed version of the article will be shown at the top of each page, rather than being shown only at the top of the first page as would be the case with a [discussion thread](discussions.md#discussion-threads).

Article threads may be posted within [article forums](articles.md#article-forums), or [mixed-type forums](discussions.md#mixed-type-forums) in which articles are permitted.

### Article forums

Dedicated article forums offer specific article-related display options for thread listings.

#### Preview display style

In [preview mode](https://xenforo.com/community/threads/article-thread-and-forum-updates-and-improvements.183723/), article previews are displayed in a masonry-style layout with a large 'cover' image and a snippet of the article text, instead of the basic thread listing style normally seen with [discussion forums](discussions.md#discussion-forums).

The 'cover' image is automatically extracted from the article text, using either the first attached image embedded within the article using the `[ATTACH]` BB code tag, or otherwise the first linked image using the BB code `[IMG]` tag.

:::note
In both cases, a cover image may be specified for the article that is *not* shown within the article body by specifying a zero width and height for the image in the BB code tag.
:::

#### Expanded display style

The [expanded mode](https://xenforo.com/community/threads/article-thread-and-forum-updates-and-improvements.183723/) is intended to replicate the layout of blog-style pages, where full articles are displayed on a single page, ordered chronologically.

Clicking on any of the articles will take the viewer through to the article's own page, on which comments may be posted. 