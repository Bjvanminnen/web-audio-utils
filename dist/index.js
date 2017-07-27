"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContext = getContext;
exports.loadBuffer = loadBuffer;
exports.playData = playData;
exports.playBuffer = playBuffer;
var context = void 0;
function getContext() {
  if (context) {
    return context;
  }

  if (typeof AudioContext !== "undefined") {
    context = new AudioContext();
  } else if (typeof window.webkitAudioContext !== "undefined") {
    context = new window.webkitAudioContext();
  } else {
    throw new Error('AudioContext not supported. :(');
  }

  return context;
}

/**
 * Decodes the audio resource at url.
 * @param {string} url
 * @param {AudioContext}
 * @returns Promise<ArrayBuffer>
 */
function loadBuffer(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // Our asynchronous callback
    request.onload = function () {
      getContext().decodeAudioData(request.response).then(function (buffer) {
        resolve(buffer);
      });
    };

    request.onerror = function (err) {
      console.log(err);
      reject(err);
    };

    request.send();
  });
};

/**
 * @param {Float32Array}
 * @returns {AudioBufferSourceNode}
 */
function playData(data) {
  var audioCtx = getContext();
  var buffer = audioCtx.createBuffer(1, data.length, audioCtx.sampleRate);
  var channel = buffer.getChannelData(0);
  for (var i = 0; i < data.length; i++) {
    channel[i] = data[i];
  }

  return playBuffer(buffer);
}

/**
 * @param {AudioBuffer}
 * @returns {AudioBufferSourceNode}
 */
function playBuffer(buffer) {
  var audioCtx = getContext();
  var source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
  return source;
}