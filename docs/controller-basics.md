# Controller basics

At a basic level, Controllers are the code that is executed when you visit a page within XF. Controllers are generally responsible for handling user input and passing that user input to the appropriate place which, generally, would be to perform some sort of database action (Model) or load visual content (View).

When a user clicks a link, the requested URL is routed to a specific controller and controller action. See [Routing basics](routing-basics.md). For example, in XF if you click a URL like `index.php?conversations/add` you will be routed to the `XF\Pub\Controller\Conversation` controller and to the `add` action.

If you look at this class in the file system (see [Autoloader](general-concepts.md#autoloader) for a description of how classes and file paths map to each other) you will notice that there are a number of methods named with a prefix of `action`. All of these methods indicate a specific controller action. So, to see the code involved when viewing the conversations/add page mentioned above, look in this file for `public function actionAdd()`.

XF controllers are responsible for returning a reply object which generally consist of one of the following types:

## View reply

This is one of the most common replies you will deal with during XF development. A controller which returns a view reply will usually require up to three arguments to be passed in. A view class (more on that below), a template name, and an array of `$viewParams` which is the data that should be available to the template.

Here's a typical example of a controller action which returns a View reply:

```php
public function actionExample()
{
    $hello = 'Hello';
    $world = 'world!';

    $viewParams = [
        'hello' => $hello,
        'world' => $world
    ];
    return $this->view('Demo:Example', 'demo_example', $viewParams);
}
```

The first argument is the short class name for a specific View class. This class may or may not exist (often it won't need to exist, we'll cover view classes more later) but it should have a roughly unique name for the controller and action. As with other [Short class names](general-concepts.md#short-class-names), the particular short class name above will resolve to `Demo\Pub\View\Example`. Again, `Pub` is inferred automatically from the controller type.

The second argument is the template name. In this case, we're looking for a template named `demo_example`.

The third argument is an array of template parameters/variables that should be available to the view. This array should generally be `key => value` pairs. The above example is passing two template params to the template. The `key` part of the array indicates the name of the variable available within the template. The `value` part of the array indicates the value.

So, if we had the following contents in the `demo_example` template:

```html
{$hello} {$world}
```

The template would output the following:

```html
Hello world!
```

## Redirect reply

This reply is returned when you wish to redirect a user to a different URL after they have completed some sort of action.

A common use case here is after a user has submitted data through a form you may wish to redirect them to a different page, for example returning a user to a list of items.

Here's an example of a typical controller action that performs a redirect:

```php
public function actionRedirect()
{
    return $this->redirect($this->buildLink('demo/example'), 'This is a redirect message.', 'permanent');
}
```

The first argument is the URL to redirect to. This example will redirect the user to the `index.php?demo/example` URL.

The second argument will only display if the form is submitted over an AJAX request which opts to prevent redirecting. The result will be a "flash message" which appears from the top of the screen with your chosen message. You do not have to supply your own message. If it is not provided it will default to "Your changes have been saved".

The third argument defaults to `temporary`, but you can also opt to set this to permanent as per the example. The only difference here is the type of HTTP response code provided by the server. Temporary is ideal in most cases, and this will respond with a 303 code. `permanent` will issue a 301 response code.

Although you can trigger a permanent redirect in this way, there's actually a specific method for this, which can be used as follows. It also takes a 'message' argument, but as above it is optional.

```php
public function actionRedirect()
{
    return $this->redirectPermanently($this->buildLink('demo/example'));
}
```

## Error reply

As the name suggests, this reply is what you will return if you need to display an error to the user. It's somewhat simple, here's an example:

```php
public function actionError()
{
    return $this->error('Unfortunately the thing you are looking for could not be found.', 404);
}
```

There are only two arguments supported here. The first is the error message you want to display, and the second is the HTTP response code you want the server to send. 404 would represent an appropriate response when something was not found.

## Message reply

This reply is very much similar to the error reply, and supports the same arguments. The main difference is, in terms of appearance, the message displayed is not presented as an error.

## Exception reply

It is sometimes necessary to interrupt the normal flow of your controller code, and reply with an Exception instead. Exception replies do not necessarily have to represent an error; for example, they can be used to force your controller to perform a redirect. However, typically, they will often be used to halt the flow of your controller to display an error, as in the following example:

```php
public function actionException()
{
    throw $this->exception($this->error('An unexpected error occurred'));
}
```

Exception replies only accept a single argument, and actually that argument must be some other form of Reply object, such as an [Error reply](#error-reply). This particular example throws an exception, and the entire controller code at that point will stop, and a standard error will be displayed.

Note that exception replies must be "thrown" using `throw` rather than being "returned" with `return`.

## Reroute reply

Under certain conditions, it is necessary to reroute a user to an entirely different controller or action within the same controller, without performing a full redirect, without changing the URL the user has landed on, and without having to duplicate the code of the target action.

That looks a little bit like this:

```php
public function actionReroute()
{
    return $this->rerouteController(__CLASS__, 'error');
}

public function actionError()
{
    return $this->error('Oops! Something went wrong!');
}
```

In this particular example, if a user navigated to the `index.php?demo/reroute` URL, they would see the error reply from the `actionError()` method. They would not be redirected, nor would the URL in their browser change; they would simply just receive the reply from the error action.

The reroute reply also supports a third argument which allows various parameters to be passed from one controller action to the other. This can either be an array or a `ParameterBag` object (more on that later).

## Modifying a controller action reply (properly)

In the [Extending classes](general-concepts.md#extending-classes) section, we've already seen how simple it is to extend a class, but extra care needs to be taken when extending a controller action that already exists.

Unless you have a specific need to override an existing action entirely, and replace it with something new (which is generally not recommended), instead you should be modifying the existing reply of the parent class. That is done quite simply, as an example let's modify the view reply from the [View reply](#view-reply) example above.

```php
public function actionExample()
{
    $reply = parent::actionExample();

    return $reply;
}
```

Assuming the above is added to an extended controller where the `actionExample()` method already exists, the above doesn't actually do anything other than return the original view reply. Let's now change the existing `hello` parameter to read "Bonjour" instead of "Hello".

```php
public function actionExample()
{
    $reply = parent::actionExample();

    if ($reply instanceof \XF\Mvc\Reply\View)
    {
        $reply->setParam('hello', 'Bonjour');
    }

    return $reply;
}
```

Because a controller reply can actually represent a number of different objects that have different behaviors and methods, it is imperative that we only attempt to extend the correct reply type. We do that in the example above by checking to see if the parent `$reply` object is actually a `View` type. If we didn't do this, we extended this action and the controller action replies with a redirect instead, then there would likely be an error.

Before extending this action visiting this page would display "Hello world!". After extending it, the view will now display "Bonjour world!".
