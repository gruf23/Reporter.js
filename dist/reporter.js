!function(e){var s={};function t(r){if(s[r])return s[r].exports;var o=s[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=s,t.d=function(e,s,r){t.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,s){if(1&s&&(e=t(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var o in e)t.d(r,o,function(s){return e[s]}.bind(null,o));return r},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},t.p="",t(t.s=0)}([function(e,s,t){"use strict";t.r(s);t(1);window.Reporter=class{constructor(e){if(window.jQuery){jQuery("body").append('<div id="reporter_topbarHolder"></div>').append('<div id="reporter_messageHolder"></div>'),this.messagesQueue=[],jQuery(document).on("click","#reporter_topbarHolder .close",e=>{this.removeBar(jQuery(e.target).parent(".rptr-topbar"))}),jQuery(document).on("click","#reporter_messageHolder .close",e=>{const s=jQuery(e.target).parents(".rptr-message");this.removeMessage(s)});const e=jQuery("#reporter_topbarHolder");jQuery(document).on("headerStickFloat",()=>{e.css("top",jQuery("#sticky-header").height())}),jQuery(document).on("headerStickFixed",()=>{e.css("top",0)})}else console.error("jQuery is not defined. Cannot init Reporter")}pushBar(e){const s=jQuery("#reporter_topbarHolder");if("string"===(e.text,!1)||!e.text)return console.error("No message to show"),!1;e.type=e.type||"default",e.closable=!Object.keys(e,"closable")||e.closable,e.id=e.id||!1;const t=this.constructBar(e);s.append(t),this.setTopOffset(s.height())}removeBar(e){e.remove();const s=jQuery("#reporter_topbarHolder");this.setTopOffset(s.height())}clearBars(){jQuery("#reporter_topbarHolder").html(""),this.setTopOffset(0)}setTopOffset(e){const s=jQuery(".sticky-search");s&&s.css("top",e),jQuery("body").css("padding-top",e)}constructBar(e){const s=jQuery("<div />");return s.addClass("rptr-topbar "+e.type),s.append(`<div class="text">${e.text}</div>`),e.id&&s.data(e.id),e.closable&&s.append('<span class="close"></span>'),s}pushMessage(e){e.type=e.type||"default",this.messagesQueue.push(e),this.displayMessage()}displayMessage(){const e=jQuery("#reporter_messageHolder");if(e.children().length>=5)return!1;if(this.messagesQueue.length>0){const s=this.messagesQueue[0],t=this.constructMessage(s);e.append(t),setTimeout(()=>{e.children().last().addClass("visible")},50),this.messagesQueue.shift(),this.messageCountdown()}}constructMessage(e){const s=jQuery("<div />");return s.addClass("rptr-message "+e.type),e.closable&&s.append('<span class="close"></span>'),void 0!==e.image&&(s.addClass("pictured"),s.append(`<div class="rptr-message-image"><img src="${msg.image}"></div>`)),s.append('<div class="rptr-message-wrap" />'),s.find(".rptr-message-wrap").append('<div class="rptr-message-header" />'),void 0!==e.title&&s.find(".rptr-message-header").html(`<span class="rptr-message-title">${e.title}</span>`),void 0!==e.text&&s.find(".rptr-message-wrap").append(`<div class="rptr-message-content">${e.text}</div>`),s}messageCountdown(e=1e4){setTimeout(()=>{const e=jQuery("#reporter_messageHolder").children().first();this.removeMessage(e)},e)}removeMessage(e){e.removeClass("visible"),setTimeout(()=>{e.remove(),this.displayMessage()},400)}clearMessages(){this.messagesQueue=[];const e=jQuery("#reporter_messageHolder .visible");e.removeClass("visible"),setTimeout(()=>{e.remove()},400)}emptyMessagesQueue(){this.messagesQueue=[]}}},function(e,s){}]);