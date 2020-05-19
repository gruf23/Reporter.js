import './styles.scss';

window.Reporter = class Reporter {
  constructor() {
    if (window.jQuery) {
      jQuery('body')
        .append('<div id="reporter_topbarHolder"></div>')
        .append('<div id="reporter_messageHolder"></div>');

      this.messagesQueue = [];
      jQuery(document).on('click', '#reporter_topbarHolder .close', (e) => {
        this.removeBar(jQuery(e.target).parent('.rptr-topbar'));
      });
      jQuery(document).on('click', '#reporter_messageHolder .close', (e) => {
        const message = jQuery(e.target).parents('.rptr-message');
        this.removeMessage(message);
      });
      const layerWrap = jQuery('#reporter_topbarHolder');
      jQuery(document).on('headerStickFloat', () => {
        layerWrap.css('top', jQuery('#sticky-header').height());
      });
      jQuery(document).on('headerStickFixed', () => {
        layerWrap.css('top', 0);
      });
    } else {
      console.error('jQuery is not defined. Cannot init Reporter');
    }
  }
  pushBar(payload) {
    const holder = jQuery('#reporter_topbarHolder');
    if (!typeof payload.text === 'string' || !payload.text) {
      console.error('No message to show');
      return false;
    }
    payload.type = payload.type || 'default';
    payload.closable = Object.keys(payload, 'closable') ? payload.closable : true;
    payload.id = payload.id || false;
    const bar = this.constructBar(payload);
    holder.append(bar);
    this.setTopOffset(holder.height());
  }
  // todo: remove bar by id;
  removeBar(bar) {
    bar.remove();
    const holder = jQuery('#reporter_topbarHolder');
    this.setTopOffset(holder.height());
  }
  clearBars() {
    const holder = jQuery('#reporter_topbarHolder');
    holder.html('');
    this.setTopOffset(0);
  }
  setTopOffset(offset) {
    const stickySearch = jQuery('.sticky-search');
    if (stickySearch) stickySearch.css('top', offset);
    jQuery('body').css('padding-top', offset);
  }
  constructBar(payload) {
    const bar = jQuery('<div />');
    bar.addClass(`rptr-topbar ${payload.type}`);
    bar.append(`<div class="text">${payload.text}</div>`);
    if (payload.id) {
      bar.data(payload.id);
    }
    if (payload.closable) {
      bar.append('<span class="close"></span>');
    }
    return bar;
  }
  pushMessage(payload) {
    payload.type = payload.type || 'default';

    this.messagesQueue.push(payload);
    this.displayMessage();
  }
  displayMessage() {
    const holder = jQuery('#reporter_messageHolder');
    if (holder.children().length >= 5) {
      return false;
    }
    if (this.messagesQueue.length > 0) {
      const message = this.messagesQueue[0];
      const item = this.constructMessage(message);
      holder.append(item);
      setTimeout(() => {
        holder.children().last().addClass('visible');
      }, 50);
      this.messagesQueue.shift();
      this.messageCountdown();
    }
  }
  constructMessage(payload) {
    const message = jQuery('<div />');
    message.addClass(`rptr-message ${payload.type}`);
    if (payload.closable) {
      message.append('<span class="close"></span>');
    }
    if (payload.id) {
      message.attr('data-id', payload.id);
    }
    if (payload.image) {
      message.addClass('pictured');
      message.append(`<div class="rptr-message-image"><img src="${payload.image}"></div>`);
    }
    message.append('<div class="rptr-message-wrap" />');
    message.find('.rptr-message-wrap').append('<div class="rptr-message-header" />');
    if (typeof payload.title !== 'undefined') {
      message.find('.rptr-message-header').html(`<span class="rptr-message-title">${payload.title}</span>`)
    }
    if (typeof payload.text !== 'undefined') {
      message.find('.rptr-message-wrap').append(`<div class="rptr-message-content">${payload.text}</div>`);
    }
    return message;
  }
  messageCountdown(t = 10000) {
    setTimeout(() => {
      const oldestMsg = jQuery('#reporter_messageHolder').children().first();
      this.removeMessage(oldestMsg);
    }, t);
  }
  removeMessage(message) {
    if (message.__proto__.jquery === 'undefined') {
      message = jQuery(`.rptr-message[data-id="${message}"]`);
    }
    message.removeClass('visible');
    setTimeout(() => {
      message.remove();
      this.displayMessage();
    }, 400);
  }
  clearMessages() {
    this.messagesQueue = [];
    const messages = jQuery('#reporter_messageHolder .visible');
    messages.removeClass('visible');
    setTimeout(() => {
      messages.remove();
    }, 400);
  }
  emptyMessagesQueue() {
    this.messagesQueue = [];
  }
};
