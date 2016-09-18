# night-mode-js

A small javascript tool to automatically add or remove night css class from the `<body>` element. It's lightweight, straightforward and easy to set up. This project was designed with conviction that all software should have a dark theme to reduce eye strain during night-time use.

## Quickstart
Download and place night-mode.min.js in your project. Simply include the script in the `<head>`.
```html
<script src="path/to/night-mode.min.js">
```

The simplest way to use NightMode (See the table below describing default options):
```html
<script>
	var nightMode = new NightMode();
</script>
```

Or with custom options:
```html
<script>
	var nightMode = new NightMode({
    	evening: new DayTime(22, 0), // or evening: DayTime.fromString('22:00')
        morning: new DayTime(5, 30), // or morning: DayTime.fromString('5:30')
        refreshIntervalInSeconds: 30
        ...
    });
</script>
```
### Options

| property                 | default            | description                                                                   |
|--------------------------|--------------------|-------------------------------------------------------------------------------|
| evening                  | new DayTime(21, 0) | The time when the night starts. Seconds aren't supported.                     |
| morning                  | new DayTime(6, 0)  | The time when the night ends. Seconds aren't supported.                       |
| refreshIntervalInSeconds | 20                 | How often the NightMode object checks the time.                               |
| cssNightClassName        | 'night'            | Name of the css class that is added to `<body>` element at night                |
| autoSwitch               | true               | Whether the NightMode object should automatically switch the night css class. |

And you can also disable or enable the nightMode auto-switch if necessary (note that disabling auto-switch doesn't remove the night class from the body if it's currently present):
```js
nightMode.disableAutoSwitch();
nightMode.enableAutoSwitch();
```

You're almost done! You just need to add some css rules:
```css
body {
	background-color: white;
    color: #212121;
}

body.night {
	background-color: #181818;
    color: white;
}
...
```

##Compatibility
This script is written entirely in Typescript and compiled into javascript language level ES5. If you need a different language level, feel free to compile the source yourself.

##Dependencies
No dependencies!

## License & credits

Created by [Marek Kadlčík](http://marekkadlcik.com).

Licensed under [MIT licence](https://github.com/cuddlecheek/night-mode-js/blob/master/LICENSE).
