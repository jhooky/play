/*global exports Image, Audio*/
'use strict';
/**
 * loader.js
 */

var onload;
var itemLoad;
var itemLoaded;
var loaded = true;
var loadedCount = 0;
var totalCount = 0;
var soundFileExtn

exports.initialize = function(onloadCallback, itemCallback) {
  onload = onloadCallback;
  itemLoad = itemCallback;
  // check for sound support
  var mp3Support, oggSupport;
  var audio = document.createElement('audio');
  if (audio.canPlayType) {
    // currently canPlayType() returns: "", "maybe", "probably"
    mp3Support = '' !== audio.canPlayType('audio/mpeg');
    oggSupport = '' !== audio.canPlayType('audio/ogg; codecs="vorbis"');
  } else {
    mp3Support = oggSupport = false;
  }
  soundFileExtn = oggSupport ? '.ogg' : mp3Support ? '.mp3' : undefined;
};

exports.loadImage = function(url) {
  var image;
  totalCount++;
  loaded = false;
  image = new Image();
  image.src = url;
  image.onload = itemLoaded;
  return image;
};

exports.loadSound = function(url) {
  totalCount++;
  loaded = false;
  var audio = new Audio();
  audio.src = url + soundFileExtn;
  audio.addEventListener('canplaythough', itemLoaded, false);
  return audio;
};

itemLoaded = function() {
  loadedCount++;
  itemLoad(totalCount, loadedCount);
  if (loadedCount === totalCount) {
    // loader has loaded completely
    loaded = true;
    if (onload) {
      onload();
      onload = undefined;
    }
  }
};
