/*global exports*/
'use strict';

var COUNTER;

COUNTER = 0;

exports.isString = function isString(obj) {
  return typeof obj === 'string' || false;
};

exports.isNumber = function isNumber(obj) {
  return typeof obj === 'number' || false;
};

exports.isBool = function isBool(obj) {
  return typeof obj === 'boolean' || false;
};

exports.isArray = function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

exports.isObject = function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

exports.mixin = function mixin(receiver, supplier, options) {
  var property;
  for (property in supplier) {
    if (supplier.hasOwnProperty(property) &&
        typeof supplier[property] === 'function') {
      receiver[property] = supplier[property];
    }
  }
  for (property in options) {
    if (options.hasOwnProperty(property)) {
      receiver[property] = options[property];
    }
  }
  return receiver;
};

exports.random = function random(min, max) {
  if (max === null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min +1));
};

exports.uniqueId = function uniqueId(prefix) {
  return prefix ? prefix + '-' + ++COUNTER : ++COUNTER + '';
};

exports.qs = function qs(selector, scope) {
  return (scope || document).querySelector(selector);
};

exports.qsa = function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
};
