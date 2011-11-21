About
============

If you use JavaScript-Frameworks like Backbone.js, Ext JS and others there is the need to generate URLs in JavaScript.
This plugin enables you to use the Symfony2 routing definitions to generate the URLs.

Installation
============

## Installation

### Step 1) Get the bundle

First, grab the RtxLabsJsRoutingBundle. There are two different ways
to do this:

#### Method a) Using the `deps` file

Add the following lines to your  `deps` file and then run `php bin/vendors
install`:

```
[RtxLabsJsRoutingBundle]
    git=https://github.com/RtxLabs/JsRoutingBundle.git
    target=bundles/RtxLabs/Bundle/JsRoutingBundle
```

#### Method b) Using submodules

Run the following commands to bring in the needed libraries as submodules.

```bash
git submodule add https://github.com/RtxLabs/JsRoutingBundle.git vendor/bundles/RtxLabs/Bundle/JsRoutingBundle
```

### Step 2) Register the namespaces

Add the following namespace entry to the `registerNamespaces` call
in your autoloader:

``` php
<?php
// app/autoload.php
$loader->registerNamespaces(array(
    // ...
    'RtxLabs' => __DIR__.'/../vendor/bundles',
    // ...
));
```

### Step 3) Register the bundle

To start using the bundle, register it in your Kernel:

``` php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new RtxLabs\JsRoutingBundle\RtxLabsJsRoutingBundle(),
    );
    // ...
)
```

Usage
============

The Bundle brings a Controller class that is used to generate a JavaScript-Object with routes on the fly. You need to
add this Controller to your twig template.

```jinja
<script src="{{ asset('routes/routes.js') }}"></script>
```

Please note that you can't use Assetic to load this resource because it only looks like a static resource. It is a
dynamic one generated via a Controller!

You can dump these routes to a static JavaScript files too. This is a good way to improve performance on a production
system. For that you can call the rtx:rout:dump command that writes all routes to a JS-File.

```bash
php app/console rtx:route:dump web
```

Before you can use the routes you need to add another JS-File.

```jinja
{% javascripts '@RtxLabsJsRoutingBundle/Resources/public/js/router.js' %}
    <script src="{{ asset_url }}"></script>
{% endjavascripts %}
```

Afterwards you will be able to use the Symfony routes in JavaScript. You can even replace the route-placeholders with
values from a JS-Object

```js
// Route sales_dashboard = /sales/dashboard
location.href = RtxLabs.router.url('edit_user');

// Route edit_user = /user/edit/{id}
location.href = RtxLabs.router.url('edit_user', {'id': 13});
```

All errors happening during the Routing will logged to the Console-Object (Chrome, Firebug...)

TODO
============

* Add caching