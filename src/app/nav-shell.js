/*global exports require */
/**
 * nav-shell.js
 */
'use strict';

var query = require('../lib/query');


var moduleName;

var $header;
var $container;

moduleName = 'nav';

$header = query('<header>')
  .attr({ 'id' : 'app-' + moduleName})
  .html('<h1>Fruit Wars</h1>');

$container = query('<div>')
  .attr({ 'class' : 'wrapper'})
  .append($header);

exports.initialize = function($parent) {
  $parent.append($container);
};
