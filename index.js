let context;
function getContext () {
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
export function loadBuffer(url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // Our asynchronous callback
    request.onload = () => {
      getContext().decodeAudioData(request.response)
      .then(buffer => {
        resolve(buffer);
      });
    };

    request.onerror = err => {
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
export function playData(data) {
  const audioCtx = getContext();
  const buffer = audioCtx.createBuffer(1, data.length, audioCtx.sampleRate);
  let channel = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    channel[i] = data[i];
  }

  return playBuffer(buffer);
}

/**
 * @param {AudioBuffer}
 * @returns {AudioBufferSourceNode}
 */
export function playBuffer(buffer) {
  const audioCtx = getContext();
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
  return source;
}
export function getContext () {
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
export function loadBuffer(url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // Our asynchronous callback
    request.onload = () => {
      getContext().decodeAudioData(request.response)
      .then(buffer => {
        resolve(buffer);
      });
    };

    request.onerror = err => {
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
export function playData(data) {
  const audioCtx = getContext();
  const buffer = audioCtx.createBuffer(1, data.length, audioCtx.sampleRate);
  let channel = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    channel[i] = data[i];
  }

  return playBuffer(buffer);
}

/**
 * @param {AudioBuffer}
 * @returns {AudioBufferSourceNode}
 */
export function playBuffer(buffer) {
  const audioCtx = getContext();
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
  return source;
}
