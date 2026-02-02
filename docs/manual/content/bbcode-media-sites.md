# BB code media sites

BB code media sites are a means by which links to content hosted on external sites, such as YouTube or Instagram can be converted into embedded media in users' messages automatically.

XenForo comes with a collection of predefined BB code media sites for popular sources including Facebook, Twitter, Flickr and Spotify.

Links posted in user messages will automatically be processed and turned into embedded media if the **Auto-embed media links** option is enabled under the **Media embedding** section of [XenForo's options system](../configuration/options.md).

### BB code media site manager

Within the BB code media site manager, you can view all of the available media sites and temporarily disable each of them with a single click on the toggle gadget. You can also delete sites or add a new one.

Clicking the title of a BB code media site will load the editor for that site.

### BB code media site editor

BB code media sites work by extracting data from the URL posted by the user and translating that into a snippet of HTML that can be used to embed the referenced media in a message. In some cases, this is a simple case of taking a piece of the URL and inserting it into the HTML, and in other cases further steps are required to convert the URL into usable HTML.

This can be a complex process, but for the purpose of this document we will look at a relatively simple example: *Pinterest*, which is simple because Pinterest URLs contain all the information we need to create the embedded HTML.

#### Match URLs

In this box, we define all the URLs that we would like to have converted into embedded HTML. Each URL goes on a separate line, and includes an `{id}` token, which represents the data in which we are interested.

In the case of Pinterest, the data is always a number, so we extend `{id}` to `{id:digits}`, which will force the pattern to only match whole numbers. The other available extension is `{id:alphanum}`, which limits the match to numbers and letters only. You may use a `*` as a wildcard in the match URLs to match anything.

Under *Advanced options* is a setting that allows these match URLs to be regular expressions. If you use regular expressions, each line must define delimiters and switches.

#### Embed template

This box is used to define the HTML that will be output if a matching URL is found. You may use any HTML, but it's a good idea to wrap your output in the `<div class="bbMediaWrapper"><div class="bbMediaWrapper-inner">` code that is used by most of the default XenForo sites, as this handles styling to match the rest of the site,

Within your HTML, you may use `{$id}` to refer to the `{id}` value fetched by the Match URL. You may also use `{$idDigits}` or `{$idAlphanum}` if you used those extensions in the Match URLs.

In the case of Pinterest, the important section is the `href` attribute, in which we define the source of the link to be `https://www.pinterest.com/pin/{$idDigits}`, making use of the data grabbed by the Match URLs.


#### oEmbed

oEmbed is an open format that allows sites to return information about a URL, including embed HTML. In some cases, when the embed HTML cannot be constructed directly from the URL, it may be possible to use oEmbed to query the site for oEmbed data and get the HTML that way.

In order to use oEmbed, you must know the oEmbed API endpoint for the site you are querying, and the format of the URLs their API expects.

For example, Flickr's oEmbed API endpoint lives at `https://www.flickr.com/services/oembed` and their URL scheme is `https://flic.kr/p/{$id}`, where (again), `{$id}` represents the data matched by the Match URLs.

Finally, you must decide whether or not to execute any Javascript code that is returned from the oEmbed site along with the embed HTML. If you decide not to allow the foreign Javascript to run, you must handle any required initialization for the embedded HTML with your own Javascript routines.

[Further information about oEmbed can be found at oEmbed.com](https://oembed.com), including a regularly-updated list of sites that make use of oEmbed.

#### Advanced options

Sometimes, even further processing is required in order to get workable embed HTML. In these cases, a PHP callback is available both for matching and embedding purposes.

It is beyond the scope of this document to go into exactly how this works, but developers will be able to inspect the code for sites in the default XenForo installation that make use of matching and embedding callbacks.

