# BB code images

While users should be encouraged to use [attachments](attachments.md) when embedding images in their messages, support is in place to allow images to be *hot-linked* from external sources.

Users may embed these images either by clicking on the image icon in the message editor toolbar and entering the URL to their image in the provided text box, or by typing the [BB code](bbcode.md) `[IMG]https://example.com/image...[/IMG]` tags manually, with the URL of the image between the tags.

### Proxying remote images

The linked images can either be loaded directly by users viewing the content in which the images are embedded, or you may choose to have your server proxy the images using the [image and link proxy](../configuration/proxy.md).

### Limiting image use

You may also prevent users from posting ridiculous numbers of hot-linked images in their messages by imposing a limit. This limit is controlled through the option at **Setup > Options > Messages > Maximum images per message. A value of `0` will disable the limit. 