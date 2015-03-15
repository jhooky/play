/*global exports */
/**
 * events.js
 */
'use strict';

var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

exports.on = function(name, cb, cxt) {
  if ((typeof name !== 'string') &&
      (toString.call(cb) !== '[object Function]')) {
    return this; }
  
  var channels = this._channels || (this._channels = {});
  if (!channels.hasOwnProperty(name)) {
    channels[name] = [];
  }
  channels[name].push({cb: cb, cxt: cxt || this});
  return this;
};

exports.off = function(name, cb, cxt) {
  if ((typeof name !== 'string') &&
      (toString.call(cb) !== '[object Function]')) {
    return this; }

  var i, len, channel, channels;
  channels = this._channels || (this._channels = {});
  channel = (channels.hasOwnProperty(name)) ? channels[name] : null;
  if (channel) {
    for (i = 0, len = channel.length; i < len; i++) {
      if (channel[i].cb === cb) {
        channel.splice(i, 1);
      }
    }
  }
  return this;
};

exports.once = function(name, cb, cxt) {
  if ((typeof name !== 'string') &&
      (toString.call(cb) !== '[object Function]')) {
    return this; }
  
  var off = this.off.bind(this);
  var modified = function() {
    cb.apply(this, arguments);
    off(name, modified);
  };
  this.on(name, modified, cxt);
  return this;
};

exports.trigger = function(name) {
  if (typeof name !== 'string') {
    return this; }
  
  var i, len, args, copy, channel, channels;
  args = slice.call(arguments, 1);
  channels = this._channels || (this._channels = {});
  channel = (channels.hasOwnProperty(name)) ? channels[name] : null;
  if (channel) {
    copy = channel.slice();
    for (i = 0, len = copy.length; i < len; i++) {
      copy[i].cb.apply(copy[i].cxt, args);
    }
  }
  return this;
};

exports.listen = function(obj, name, cb, cxt) {
  if ((typeof name !== 'string') &&
      (toString.call(cb) !== '[object Function]') &&
      (toString.call(obj) !== '[object Object]' && obj.hasOwnProperty('on'))) {
    return this; }

  obj.on(name, cb, cxt);
  return this;
};

exports.stopListening = function(obj, name, cb) {
  if ((typeof name !== 'string') &&
      (toString.call(cb) !== '[object Function]') &&
      (toString.call(obj) !== '[object Object]' && obj.hasOwnProperty('off'))) {
    return this; }
  
  obj.off(name, cb);
  return this;
};

exports.listenOnce = function(obj, name, cb, cxt) {
  if ((typeof name !== 'string') &&
      (toString.call(cb) !== '[object Function]') &&
      (toString.call(obj) !== '[object Object]' && obj.hasOwnProperty('off'))) {
    return this; }
  
  var stopListening = this.stopListening.bind(this);
  var modified = function() {
    cb.apply(this, arguments);
    stopListening(obj, name, modified);
  };
  this.listen(obj, name, modified, cxt);
  return this;
};

