Within a PHP application, like XF2, we need a way of being able to take a user request for a specific URL, understand which controller, action and what data that URL represents, so that can present the appropriate response to the user. The concept of converting a URL to a location within the code is known as "Routing".

In XF2, routing is almost entirely managed from one location within the Admin CP. That location is `Admin CP > Development > Routes`. Routes are grouped by one of two types, Public and Admin types and they provide the routing of requests within the Public and Admin apps respectively.

## A simple example

On the Routes page (see above) you should see an entry listed for `account/`. This is a public route and provides the routing for requests to the URL `index.php?account/`. This particular route is pretty simple; it only consists of a small amount of configuration. Notably, it consists of a "Route prefix", a section context and a controller class. Let's understand those bits in more detail:

### Route prefix

The route prefix is essentially the bit after `index.php?` and before the first `/`. It is the first step in identifying which controller to route the request to.
 
### Section context

The section context tells the navigation systems within XF which navigation item should be selected when a visitor is viewing a page routed to by this route. For public routes, the section context should be the ID of the top level navigation entry. For admin routes, this should refer to the ID of the most specific admin navigation entry (regardless of depth).  

In the case of the account route, the section context doesn't necessarily apply by default, because we do not have an "account" navigation tab. But, to see this in action, just change the "Section context" value here to "forums", save changes and go to your account on the front end. You should now see that the "Forums" navigation tab is selected!
 
### Controller

This is the class name of the Controller that should be called when a request matches this route. In the case of the "account/" route, we have `XF:Account` specified. This will load the Account controller. (See [Short class names](/general-concepts/#short-class-names) for more information). The code for this is located in the following location `src/XF/Pub/Controller/Account.php`. Notice how short class names are able to resolve to an "infix" as well as a prefix (XF) and a suffix (Account). In this case, the infix for this controller (Pub) is inferred from the Account route type (public).

## Controller actions

Above we explained how a route is matched to a specific controller, but we don't yet know how a specific action within that controller is called. Controllers are essentially classes that contain a number of action methods and it is the part of the URL after the [route prefix](#route-prefix) which indicates the controller action. Given a URL of `index.php?account/account-details`, you should be routed to the class `XF\Pub\Controller\Account` and the method named `actionAccountDetails()`. If a route does not specify an action, then the method called is simply `actionIndex()`.

You can read more about controllers in the [Controller basics](/controller-basics) section.

## A more advanced example (route formats)

Let's look at the `members/` route. This route is still pretty simple, like the `account/` route, but it has an additional field populated; the "Route format". To understand how that works, look at your own user profile on the front end. The URL of that profile will look something like this `index.php?members/your-name.1`. Specifically, take note of the `your-name.1` part. This is the part we're attempting to match using the "Route format".

The "Route format" allows us to extract data from a request URL, so we can pass that information into the controller action so that the action can load specific information; in this case it loads the details for the requested user profile. It also helps us build links from data passed in. Here's the syntax:
 
```plain
:int<user_id,username>/:page
```
 
It's interesting to note at this point that the important part of a profile URL for finding the profile is not actually the `your-name` bit, but it is actually the user ID (`1`). To demonstrate this, change the URL and replace `your-name` with `not-your-name`. You will see that the correct profile is found, and a redirect is performed to the correct URL.
 
The above format indicates that it's an integer based parameter. For building an outgoing link, we pull the integer from the user_id key of the data passed in. If a username key is passed into the data, it will be "slugified" and prepended to the integer ID like you see in the URL to your profile. For matching an incoming URL, this gets turned into a regular expression that matches the integer parameter format.
 
`:page` is a shortcut for generating the page-123 part of a link. In this case, it looks for the page in the link parameters. If found, it's put in the URL and then removed from the params. For incoming parsing, if matched (it can be empty), it will add the page number to the parameters passed to a controller.
 
!!! note "TODO"
    Expand on route formats.
 
## Route parameters
 
When a route is matched to a specific controller and action, any parameters in the URL are wrapped up into a special object we call the `ParameterBag`. This object is specifically designed to separate normal URL parameters with those which come from the route match. The `ParameterBag` object is passed into every controller action, and is used as follows:
 
```php
$userId = $params->user_id;
```
 
## Sub-names
 
It is also possible to split routes into further sub-names. You can see this in action by looking at the `members/following` route. In this example, `following` is the sub-name to the route `members`. Ordinarily, a URL which looks like `index.php?members/following`, the `following` part would indicate the action, and simply match against the normal `members/` route. However, if there's a route that matches the prefix "members" and the "sub-name" following, it will be used instead. This is true here, so it builds a link like the following:

```plain
members/:int<user_id,username>/following/:page
```

For incoming route matching, this route will be tested before the basic members route; if it matches, it will be used.

This sub-name system allows behavior changes, such as changing the position of parameters or sub-grouping routes into different controllers or with different params. You can see an example of the latter in the Resource Manager and Media Gallery add-ons.