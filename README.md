# jquery-singleclick
jQuery plugin for adding a custom 'singleclick' event to differentiate a single click from a double-click. The custom 'singleclick' event is fired after a standard click event with a small delay to make sure that the original first click wasn't a part of a double-click.

### Installation
Clone this repository or install via [Bower](http://bower.io/) or [npm](https://www.npmjs.org/).

```sh
bower install jquery-singleclick
npm install jquery-singleclick
```

### Usage
Start by including the plugin in your app.
##### Using a simple HTML script tag:
```html
<script src="jquery-2.1.4.js"></script>
<script src="jquery-singleclick.js"></script>
```
##### Or using an AMD loader:
```js
require('jquery-singleclick', function($) {
    // When using AMD the plugin will look for the 'jquery' dependancy.
});
```

After including the plugin, you'll be able to register handlers the custom 'singleclick' event as you would register any other jQuery handler:
```js
$('#someElement').on('singleclick', function(e) {
    console.log('I was clicked once only');
});

$('#someElement').on('click', function(e) {
    console.log('I was clicked');
});

$('#someElement').on('dblclick', function(e) {
    console.log('I was double-clicked');
});
```
In the above example, double-clicking the element will trigger 2 'click' events followed by a 'dblclick' event, but no 'singleclick' event.
However, if the element is only clicked once, a 'click' event will be immediately fired, followed by a delayed 'singleclick' fired after we are certain that this is not a double-click.

### Configuration
The default delay time to account for a double-click is 250 miliseconds. This can be configured:
```js
// Two clicks 750ms apart will be considered as a double-click and the 'singleclick' event will not be fired.
$.event.special.singleclick.timeout = 750;
```
