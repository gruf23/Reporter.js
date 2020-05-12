import './styles.scss';

window.Reporter = class Reporter {
  constructor(args) {
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
    payload.closable = payload.closable || true;
    payload.id = payload.id || false;
    const bar = this.constructBar(payload);
    holder.append(bar);
    this.setTopOffset(holder.height());
  }
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
  constructMessage(msg) {
    const isPictured = typeof msg.image !== 'undefined';
    let classes = msg.type;
    if (isPictured) {
      classes += ' pictured';
    }
    let message = `<div class="rptr-message ${classes}">`;
    if (isPictured) {
      message += `<div class="rptr-message-image"><img src="${msg.image}"></div>`;
    }
    message += '<div class="rptr-message-wrap">';
    message += '<div class="rptr-message-header">';
    if (msg.title) {
      message += `<span class="rptr-message-title">${msg.title}</span>`;
    }
    message += '<span class="close fa fa-times"></span>';
    message += '</div>';
    if (msg.text) {
      message += `<div class="rptr-message-content">${msg.text}</div>`;
    }
    message += '</div></div>';
    return message;
  }
  messageCountdown(t = 10000) {
    setTimeout(() => {
      const oldestMsg = jQuery('#reporter_messageHolder').children().first();
      this.removeMessage(oldestMsg);
    }, t);
  }
  removeMessage(message) {
    message.removeClass('visible');
    setTimeout(() => {
      message.remove();
      this.displayMessage();
    }, 400);
  }
};