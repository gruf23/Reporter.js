# Reporter.js

A simple, lightweight library for adding info bars/messages to your page. This version is **based on jQuery**

## Init

Create new instance of `Reporter` class:

```javascript
var logHandler = new Reporter({options});
```

Possible options are:  

* `msgHideDelay` - Message visibility time, ms. *Default value is `10000`*
* `maxVisibleMsg` - Count of maximum visible messages. *Default value is `5`*
* `messageBoxPosition` - Position of messages container (`top-left`, `top-right`, `bottom-left`, `bottom-right`). *Default value is `bottom-right`*

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

  Remove bar, that has been provided as **jquery object** or **bar ID**.

* `clearBars()`

  Remove all existing bars.

* `pushMessage({options})`

  Will push a popping-up message in the messages queue. Possible options are:  

  `title` - A text, that will be shown in message heading section;

  `text` - A text, that will be shown in message body;

  `image` - Path to the image;

  `type` - Bar type (`default`, `success`, `warning`, `error`). Basically it's a css class for styling;

  `closable` - Boolean value, that set user possibility to hide bar via close button;
  
  `id` - custom message id;

  Example:

  ```javascript
  logHandler.pushMessage({
    title: 'Success!',
    text: 'Sample test.',
    type: 'success',
    image: 'https://example.com/uploads/test/image.jpg',
    closable: true,
    id: 1,
  })
  ```

* `removeMessage(message)`

  Remove message, that has been provided as **jquery object** or **message ID**.

* `clearMessages()`

  Remove all **visible** messages.

* `emptyMessagesQueue()`

  Clear messages queue. Visible messages will not be affected.

* `destroy()`

  Detach containers and event listeners.

## Browser support
* IE 8+
* Firefox 20+
* Safari 6.1+
* Opera 12.1+
* Chrome 21+
