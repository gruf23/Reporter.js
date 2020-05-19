# Reporter.js

A simple, lightweight library for adding info bars/messages to your page. This version is **based on jQuery**

## Init

Create new instance of `Reporter` class:

```javascript
var logHandler = new Reporter();
```

That will append holders for bars and message to body of your page.

## Usage

* `pushBar({options})`

  Will append a bar to the top of a viewport. Possible options are:  

  `text` - A text, that will be shown in bar body;

  `type` - Bar type (`default`, `success`, `warning`, `error`). Basically it's a css class for styling;

  `closable` - Boolean value, that set user possibility to hide bar via close button. Default value is `false`;

  `id` - custom bar id;

  Example: 

  ```js
  logHandler.PushBar({
    text: 'Sample test.',
    type: 'warning',
    closable: true,
    id: 1
  })
  ```

  

* `removeBar(bar)`

  Remove bar, that has been provided as jquery object.

* `clearBars()`

  Remove all existing bars.

* `pushMessage({options})`

  Will push a popping-up message in the messages queue. Possible options are:  

  `title` - A text, that will be shown in message heading section;

  `text` - A text, that will be shown in message body;

  `image` - Path to the image;

  `type` - Bar type (`default`, `success`, `warning`, `error`). Basically it's a css class for styling;

  `closable` - Boolean value, that set user possibility to hide bar via close button;

  Example:

  ```javascript
  logHandler.pushMessage({
    title: 'Success!'
    text: 'Sample test.',
    type: 'success',
    image: 'https://example.com/uploads/test/image.jpg',
    closable: true,
  })
  ```

  

* `removeBar(bar)`

  Remove message, that has been provided as jquery object.

* `clearMessages()`

  Remove all **visible** messages;

* `emptyMessagesQueue()`

  Clear messages queue. Visible messages will not be affected.

## Browser support
* IE 8+
* Firefox 20+
* Safari 6.1+
* Opera 12.1+
* Chrome 21+
