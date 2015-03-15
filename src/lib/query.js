/*global exports*/
'use strict';

var utils = require('./utils');

var query, Query;

query = function(name, attr) {
  var i;
  var tag;
  var element;
  var elements;

  if (utils.isString(name)) {
    if (name.charAt(0) === '<') {
      i = name.indexOf('>');
      tag = name.slice(1, i);
      element = document.createElement(tag);
    } else {
      element = document.querySelector(name);
    }
  }
  return new Query(element || elements);
};

Query = function(element) {
  this.el = element;
  this.toggleMap = {}; // a temp location for toggled settings
};

Query.prototype.attr = function(attributeMap) {
  var value;
  var element;
  var property;
  element = this.el;
  if (utils.isObject(attributeMap)) {
    try {
      for (property in attributeMap) {
        value = attributeMap[property];
        if (property === 'id') {
          element.id = value;
        } else {
          element.setAttribute(property, value);
        }
      }
    } catch(err) {
      console.log(err);
    }
  }
  return this;
};

Query.prototype.style = function(styleMap) {
  var value;
  var element;
  var property;
  element = this.el;
  if (utils.isObject(styleMap)) {
    try {
      for (property in styleMap) {
        value = styleMap[property];
        element.style[property] = value;
      }
    } catch(err) {
      console.log(err);
    }
  }
  return this;
};

Query.prototype.append = function(child) {
  this.el.appendChild(child.el);
  return this;
};

Query.prototype.click = function(handler) {
  this.el.addEventListener('click', handler);
  return this;
};

Query.prototype.toggle = function(name, value) {
  var map = this.toggleMap;
  var style = this.el.style;
  if (map.hasOwnProperty(name)) {
    style[name] = map[name];
    delete map[name];
  } else {
    map[name] = (style[name] !== '') ? style[name] : '';
    style[name] = value;
  }
  return this;
};

Query.prototype.hide = function() {
  this.toggle('display', 'none');
  return this;
};

Query.prototype.show = function() {
  this.toggle('display', '')
  return this;
};

Query.prototype.html =function(value) {
  this.el.innerHTML= value;
  return this;
};

module.exports = query;
