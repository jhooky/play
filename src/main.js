/*global exports global require*/
/**
 * main.js
 */
'use strict';

var query = require('./lib/Query');
var shell = require('./app/shell');

var $container;
var initialize;
var moduleName;

moduleName = 'app';
$container = query('#app');

global.query = query;

(function() {
  shell.initialize($container);
}());



