jQuery(document).ready(function () {
  var instance = new Reporter();

  jQuery('#show-bar').on('click', function () {
    instance.pushBar({
      type: jQuery('#bar-style').val(),
      text: jQuery('#bar-text').val(),
      closable: jQuery('#bar-closable').val() === '1',
    })
  });
  jQuery('#hide-bars').on('click', instance.clearBars());

  jQuery('#show-popup').on('click', function () {
    instance.pushMessage({
      type: jQuery('#msg-style').val(),
      title: jQuery('#msg-title').val(),
      text: jQuery('#msg-text').val(),
      closable: jQuery('#msg-closable').val() === '1',
    })
  });
  jQuery('#hide-popup').on('click', function () {

  });
});
