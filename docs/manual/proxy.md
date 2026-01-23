# Image and link proxy

It may be advantageous for your site to act as a proxy for any [hot-linked images](bbcode-images.md) and links posted in user messages.

Proxying images can have several benefits, including the assurance that the image will remain available to your visitors even if the original image is removed from its source site, and allowing you to track metrics of how many times images have been viewed by your visitors.

:::note
Acting as an image proxy will incur an increase in the amount of bandwidth used by your site, as your own server will be responsible for fetching the original image, and then serving it to any visitors who request it.
:::

To enable the image and or link proxying service, visit the **Image and link proxy** section of the options system.

Here, you can set parameters for your proxy, including how often your server will check for updates of the original source image and how large images can be before your site will opt to keep them hot-linked instead of proxying them.