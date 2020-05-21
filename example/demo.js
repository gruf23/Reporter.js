jQuery(document).ready(function () {
  var instance;
  instance = new Reporter();

  jQuery('#show-bar').on('click', function () {
    instance.pushBar({
      type: jQuery('#bar-style').val(),
      text: jQuery('#bar-text').val(),
      closable: jQuery('#bar-closable').is(':checked'),
    })
  });
  jQuery('#hide-bars').on('click', () => instance.clearBars());

  jQuery('#show-popup').on('click', function () {
    instance.pushMessage({
      type: jQuery('#msg-style').val(),
      title: jQuery('#msg-title').val(),
      text: jQuery('#msg-text').val(),
      closable: jQuery('#msg-closable').is(':checked'),
      image: jQuery('#msg-picture').is(':checked') ? 'https://source.unsplash.com/random/100x100' : false
    })
  });
  jQuery('#hide-popup').on('click', () => instance.clearMessages());

  jQuery('.position input[type="radio"]').on('change', () => {
    const newPosition = jQuery('.position input[type="radio"]:checked').attr('id');
    instance.destroy();
    instance = new Reporter({
      messageBoxPosition: newPosition
    });
  })
});
