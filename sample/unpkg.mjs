var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// build/process-shim.js
var init_process_shim = __esm({
  "build/process-shim.js"() {
    "use strict";
    window.process = window.process || {
      env: {
        NODE_ENV: "development",
      },
      browser: true,
      argv: [],
      version: "",
      cwd: () => ".",
      platform: "",
    };
  },
});

// node-modules-polyfills:node:process
function unimplemented(name) {
  throw new Error(
    "Node.js process " +
      name +
      " is not supported by JSPM core outside of Node.js",
  );
}
function cleanUpNextTick() {
  if (!draining || !currentQueue) return;
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) drainQueue();
}
function drainQueue() {
  if (draining) return;
  var timeout = setTimeout(cleanUpNextTick, 0);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  clearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) setTimeout(drainQueue, 0);
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {}
function _linkedBinding(name) {
  unimplemented("_linkedBinding");
}
function dlopen(name) {
  unimplemented("dlopen");
}
function _getActiveRequests() {
  return [];
}
function _getActiveHandles() {
  return [];
}
function assert(condition, message) {
  if (!condition) throw new Error(message || "assertion error");
}
function hasUncaughtExceptionCaptureCallback() {
  return false;
}
function uptime() {
  return _performance.now() / 1e3;
}
function hrtime(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance.now()) * 1e-3);
  var clocktime = _performance.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor((clocktime % 1) * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec;
    }
  }
  return [seconds, nanoseconds];
}
function on() {
  return process2;
}
function listeners(name) {
  return [];
}
var queue,
  draining,
  currentQueue,
  queueIndex,
  title,
  arch,
  platform,
  env,
  argv,
  execArgv,
  version,
  versions,
  emitWarning,
  binding,
  umask,
  cwd,
  chdir,
  release,
  browser,
  _rawDebug,
  moduleLoadList,
  domain,
  _exiting,
  config,
  reallyExit,
  _kill,
  cpuUsage,
  resourceUsage,
  memoryUsage,
  kill,
  exit,
  openStdin,
  allowedNodeEnvironmentFlags,
  features,
  _fatalExceptions,
  setUncaughtExceptionCaptureCallback,
  _tickCallback,
  _debugProcess,
  _debugEnd,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  stdout,
  stderr,
  stdin,
  abort,
  pid,
  ppid,
  execPath,
  debugPort,
  argv0,
  _preload_modules,
  setSourceMapsEnabled,
  _performance,
  nowOffset,
  nanoPerSec,
  _maxListeners,
  _events,
  _eventsCount,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  prependListener,
  prependOnceListener,
  process2;
var init_node_process = __esm({
  "node-modules-polyfills:node:process"() {
    init_process_shim();
    init_Buffer();
    init_process();
    queue = [];
    draining = false;
    queueIndex = -1;
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    title = "browser";
    arch = "x64";
    platform = "browser";
    env = {
      PATH: "/usr/bin",
      LANG:
        typeof navigator !== "undefined"
          ? navigator.language + ".UTF-8"
          : void 0,
      PWD: "/",
      HOME: "/home",
      TMP: "/tmp",
    };
    argv = ["/usr/bin/node"];
    execArgv = [];
    version = "v16.8.0";
    versions = {};
    emitWarning = function (message, type) {
      console.warn((type ? type + ": " : "") + message);
    };
    binding = function (name) {
      unimplemented("binding");
    };
    umask = function (mask) {
      return 0;
    };
    cwd = function () {
      return "/";
    };
    chdir = function (dir) {};
    release = {
      name: "node",
      sourceUrl: "",
      headersUrl: "",
      libUrl: "",
    };
    browser = true;
    _rawDebug = noop;
    moduleLoadList = [];
    domain = {};
    _exiting = false;
    config = {};
    reallyExit = noop;
    _kill = noop;
    cpuUsage = function () {
      return {};
    };
    resourceUsage = cpuUsage;
    memoryUsage = cpuUsage;
    kill = noop;
    exit = noop;
    openStdin = noop;
    allowedNodeEnvironmentFlags = {};
    features = {
      inspector: false,
      debug: false,
      uv: false,
      ipv6: false,
      tls_alpn: false,
      tls_sni: false,
      tls_ocsp: false,
      tls: false,
      cached_builtins: true,
    };
    _fatalExceptions = noop;
    setUncaughtExceptionCaptureCallback = noop;
    _tickCallback = noop;
    _debugProcess = noop;
    _debugEnd = noop;
    _startProfilerIdleNotifier = noop;
    _stopProfilerIdleNotifier = noop;
    stdout = void 0;
    stderr = void 0;
    stdin = void 0;
    abort = noop;
    pid = 2;
    ppid = 1;
    execPath = "/bin/usr/node";
    debugPort = 9229;
    argv0 = "node";
    _preload_modules = [];
    setSourceMapsEnabled = noop;
    _performance = {
      now:
        typeof performance !== "undefined"
          ? performance.now.bind(performance)
          : void 0,
      timing: typeof performance !== "undefined" ? performance.timing : void 0,
    };
    if (_performance.now === void 0) {
      nowOffset = Date.now();
      if (_performance.timing && _performance.timing.navigationStart) {
        nowOffset = _performance.timing.navigationStart;
      }
      _performance.now = () => Date.now() - nowOffset;
    }
    nanoPerSec = 1e9;
    hrtime.bigint = function (time) {
      var diff = hrtime(time);
      if (typeof BigInt === "undefined") {
        return diff[0] * nanoPerSec + diff[1];
      }
      return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
    };
    _maxListeners = 10;
    _events = {};
    _eventsCount = 0;
    addListener = on;
    once = on;
    off = on;
    removeListener = on;
    removeAllListeners = on;
    emit = noop;
    prependListener = on;
    prependOnceListener = on;
    process2 = {
      version,
      versions,
      arch,
      platform,
      browser,
      release,
      _rawDebug,
      moduleLoadList,
      binding,
      _linkedBinding,
      _events,
      _eventsCount,
      _maxListeners,
      on,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      prependListener,
      prependOnceListener,
      listeners,
      domain,
      _exiting,
      config,
      dlopen,
      uptime,
      _getActiveRequests,
      _getActiveHandles,
      reallyExit,
      _kill,
      cpuUsage,
      resourceUsage,
      memoryUsage,
      kill,
      exit,
      openStdin,
      allowedNodeEnvironmentFlags,
      assert,
      features,
      _fatalExceptions,
      setUncaughtExceptionCaptureCallback,
      hasUncaughtExceptionCaptureCallback,
      emitWarning,
      nextTick,
      _tickCallback,
      _debugProcess,
      _debugEnd,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      stdout,
      stdin,
      stderr,
      abort,
      umask,
      chdir,
      cwd,
      env,
      title,
      argv,
      execArgv,
      pid,
      ppid,
      execPath,
      debugPort,
      hrtime,
      argv0,
      _preload_modules,
      setSourceMapsEnabled,
    };
  },
});

// .yarn/__virtual__/esbuild-plugins-node-modules-polyfill-virtual-ed4c3dcd97/5/AppData/Local/Yarn/Berry/cache/esbuild-plugins-node-modules-polyfill-npm-1.7.0-d8f8684805-10c0.zip/node_modules/esbuild-plugins-node-modules-polyfill/globals/process.js
var init_process = __esm({
  ".yarn/__virtual__/esbuild-plugins-node-modules-polyfill-virtual-ed4c3dcd97/5/AppData/Local/Yarn/Berry/cache/esbuild-plugins-node-modules-polyfill-npm-1.7.0-d8f8684805-10c0.zip/node_modules/esbuild-plugins-node-modules-polyfill/globals/process.js"() {
    init_node_process();
  },
});

// node-modules-polyfills:node:buffer
function dew$2() {
  if (_dewExec$2) return exports$2;
  _dewExec$2 = true;
  exports$2.byteLength = byteLength;
  exports$2.toByteArray = toByteArray;
  exports$2.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - (validLen % 4);
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp =
        (revLookup[b64.charCodeAt(i2)] << 18) |
        (revLookup[b64.charCodeAt(i2 + 1)] << 12) |
        (revLookup[b64.charCodeAt(i2 + 2)] << 6) |
        revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = (tmp >> 16) & 255;
      arr[curByte++] = (tmp >> 8) & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp =
        (revLookup[b64.charCodeAt(i2)] << 2) |
        (revLookup[b64.charCodeAt(i2 + 1)] >> 4);
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp =
        (revLookup[b64.charCodeAt(i2)] << 10) |
        (revLookup[b64.charCodeAt(i2 + 1)] << 4) |
        (revLookup[b64.charCodeAt(i2 + 2)] >> 2);
      arr[curByte++] = (tmp >> 8) & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return (
      lookup[(num >> 18) & 63] +
      lookup[(num >> 12) & 63] +
      lookup[(num >> 6) & 63] +
      lookup[num & 63]
    );
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output2 = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp =
        ((uint8[i2] << 16) & 16711680) +
        ((uint8[i2 + 1] << 8) & 65280) +
        (uint8[i2 + 2] & 255);
      output2.push(tripletToBase64(tmp));
    }
    return output2.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (
      var i2 = 0, len22 = len2 - extraBytes;
      i2 < len22;
      i2 += maxChunkLength
    ) {
      parts.push(
        encodeChunk(
          uint8,
          i2,
          i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength,
        ),
      );
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 63] + "==");
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 10] +
          lookup[(tmp >> 4) & 63] +
          lookup[(tmp << 2) & 63] +
          "=",
      );
    }
    return parts.join("");
  }
  return exports$2;
}
function dew$1() {
  if (_dewExec$1) return exports$1;
  _dewExec$1 = true;
  exports$1.read = function (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & ((1 << -nBits) - 1);
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
    m = e & ((1 << -nBits) - 1);
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  exports$1.write = function (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (
      ;
      mLen >= 8;
      buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8
    ) {}
    e = (e << mLen) | m;
    eLen += mLen;
    for (
      ;
      eLen > 0;
      buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8
    ) {}
    buffer[offset + i - d] |= s * 128;
  };
  return exports$1;
}
function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  const base64 = dew$2();
  const ieee754 = dew$1();
  const customInspectSymbol =
    typeof Symbol === "function" && typeof Symbol["for"] === "function"
      ? Symbol["for"]("nodejs.util.inspect.custom")
      : null;
  exports.Buffer = Buffer22;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  const K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  Buffer22.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (
    !Buffer22.TYPED_ARRAY_SUPPORT &&
    typeof console !== "undefined" &&
    typeof console.error === "function"
  ) {
    console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
    );
  }
  function typedArraySupport() {
    try {
      const arr = new Uint8Array(1);
      const proto = {
        foo: function () {
          return 42;
        },
      };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  Object.defineProperty(Buffer22.prototype, "parent", {
    enumerable: true,
    get: function () {
      if (!Buffer22.isBuffer(this)) return void 0;
      return this.buffer;
    },
  });
  Object.defineProperty(Buffer22.prototype, "offset", {
    enumerable: true,
    get: function () {
      if (!Buffer22.isBuffer(this)) return void 0;
      return this.byteOffset;
    },
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError(
        'The value "' + length + '" is invalid for option "size"',
      );
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer22.prototype);
    return buf;
  }
  function Buffer22(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer22.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof value,
      );
    }
    if (
      isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))
    ) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (
      typeof SharedArrayBuffer !== "undefined" &&
      (isInstance(value, SharedArrayBuffer) ||
        (value && isInstance(value.buffer, SharedArrayBuffer)))
    ) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer22.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b) return b;
    if (
      typeof Symbol !== "undefined" &&
      Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === "function"
    ) {
      return Buffer22.from(
        value[Symbol.toPrimitive]("string"),
        encodingOrOffset,
        length,
      );
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof value,
    );
  }
  Buffer22.from = function (value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer22.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer22, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError(
        'The value "' + size + '" is invalid for option "size"',
      );
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string"
        ? createBuffer(size).fill(fill, encoding)
        : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer22.alloc = function (size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer22.allocUnsafe = function (size) {
    return allocUnsafe(size);
  };
  Buffer22.allocUnsafeSlow = function (size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer22.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      const copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer22.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer22.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          K_MAX_LENGTH.toString(16) +
          " bytes",
      );
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer22.alloc(+length);
  }
  Buffer22.isBuffer = function isBuffer2(b) {
    return b != null && b._isBuffer === true && b !== Buffer22.prototype;
  };
  Buffer22.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer22.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer22.from(b, b.offset, b.byteLength);
    if (!Buffer22.isBuffer(a) || !Buffer22.isBuffer(b)) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
      );
    }
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  Buffer22.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer22.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer22.alloc(0);
    }
    let i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    const buffer = Buffer22.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list.length; ++i) {
      let buf = list[i];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer.length) {
          if (!Buffer22.isBuffer(buf)) buf = Buffer22.from(buf);
          buf.copy(buffer, pos);
        } else {
          Uint8Array.prototype.set.call(buffer, buf, pos);
        }
      } else if (!Buffer22.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer, pos);
      }
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer22.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof string,
      );
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    let loweredCase = false;
    for (;;) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer22.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding) encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer22.prototype._isBuffer = true;
  function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer22.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer22.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer22.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer22.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer22.prototype.toLocaleString = Buffer22.prototype.toString;
  Buffer22.prototype.equals = function equals(b) {
    if (!Buffer22.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer22.compare(this, b) === 0;
  };
  Buffer22.prototype.inspect = function inspect2() {
    let str = "";
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max)
      .replace(/(.{2})/g, "$1 ")
      .trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer22.prototype[customInspectSymbol] = Buffer22.prototype.inspect;
  }
  Buffer22.prototype.compare = function compare(
    target,
    start,
    end,
    thisStart,
    thisEnd,
  ) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer22.from(target, target.offset, target.byteLength);
    }
    if (!Buffer22.isBuffer(target)) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
          typeof target,
      );
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (
      start < 0 ||
      end > target.length ||
      thisStart < 0 ||
      thisEnd > this.length
    ) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1;
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1;
    }
    if (typeof val === "string") {
      val = Buffer22.from(val, encoding);
    }
    if (Buffer22.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (
        encoding === "ucs2" ||
        encoding === "ucs-2" ||
        encoding === "utf16le" ||
        encoding === "utf-16le"
      ) {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    let i;
    if (dir) {
      let foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (
          read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)
        ) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found) return i;
      }
    }
    return -1;
  }
  Buffer22.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer22.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer22.prototype.lastIndexOf = function lastIndexOf(
    val,
    byteOffset,
    encoding,
  ) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i;
    for (i = 0; i < length; ++i) {
      const parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed)) return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(
      utf8ToBytes(string, buf.length - offset),
      buf,
      offset,
      length,
    );
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(
      utf16leToBytes(string, buf.length - offset),
      buf,
      offset,
      length,
    );
  }
  Buffer22.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0) encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining) length = remaining;
    if (
      (string.length > 0 && (length < 0 || offset < 0)) ||
      offset > this.length
    ) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for (;;) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer22.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0),
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while (i < end) {
      const firstByte = buf[i];
      let codePoint = null;
      let bytesPerSequence =
        firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint =
                ((firstByte & 15) << 12) |
                ((secondByte & 63) << 6) |
                (thirdByte & 63);
              if (
                tempCodePoint > 2047 &&
                (tempCodePoint < 55296 || tempCodePoint > 57343)
              ) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if (
              (secondByte & 192) === 128 &&
              (thirdByte & 192) === 128 &&
              (fourthByte & 192) === 128
            ) {
              tempCodePoint =
                ((firstByte & 15) << 18) |
                ((secondByte & 63) << 12) |
                ((thirdByte & 63) << 6) |
                (fourthByte & 63);
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(((codePoint >>> 10) & 1023) | 55296);
        codePoint = 56320 | (codePoint & 1023);
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  const MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH)),
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for (let i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer22.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer22.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer22.prototype.readUintLE = Buffer22.prototype.readUIntLE =
    function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
  Buffer22.prototype.readUintBE = Buffer22.prototype.readUIntBE =
    function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
  Buffer22.prototype.readUint8 = Buffer22.prototype.readUInt8 =
    function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
  Buffer22.prototype.readUint16LE = Buffer22.prototype.readUInt16LE =
    function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | (this[offset + 1] << 8);
    };
  Buffer22.prototype.readUint16BE = Buffer22.prototype.readUInt16BE =
    function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return (this[offset] << 8) | this[offset + 1];
    };
  Buffer22.prototype.readUint32LE = Buffer22.prototype.readUInt32LE =
    function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (
        (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) +
        this[offset + 3] * 16777216
      );
    };
  Buffer22.prototype.readUint32BE = Buffer22.prototype.readUInt32BE =
    function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (
        this[offset] * 16777216 +
        ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3])
      );
    };
  Buffer22.prototype.readBigUInt64LE = defineBigIntMethod(
    function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo =
        first +
        this[++offset] * 2 ** 8 +
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 24;
      const hi =
        this[++offset] +
        this[++offset] * 2 ** 8 +
        this[++offset] * 2 ** 16 +
        last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    },
  );
  Buffer22.prototype.readBigUInt64BE = defineBigIntMethod(
    function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi =
        first * 2 ** 24 +
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 8 +
        this[++offset];
      const lo =
        this[++offset] * 2 ** 24 +
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 8 +
        last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    },
  );
  Buffer22.prototype.readIntLE = function readIntLE(
    offset,
    byteLength2,
    noAssert,
  ) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer22.prototype.readIntBE = function readIntBE(
    offset,
    byteLength2,
    noAssert,
  ) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    let i = byteLength2;
    let mul = 1;
    let val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer22.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128)) return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer22.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | (this[offset + 1] << 8);
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer22.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | (this[offset] << 8);
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer22.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (
      this[offset] |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
    );
  };
  Buffer22.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (
      (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3]
    );
  };
  Buffer22.prototype.readBigInt64LE = defineBigIntMethod(
    function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val =
        this[offset + 4] +
        this[offset + 5] * 2 ** 8 +
        this[offset + 6] * 2 ** 16 +
        (last << 24);
      return (
        (BigInt(val) << BigInt(32)) +
        BigInt(
          first +
            this[++offset] * 2 ** 8 +
            this[++offset] * 2 ** 16 +
            this[++offset] * 2 ** 24,
        )
      );
    },
  );
  Buffer22.prototype.readBigInt64BE = defineBigIntMethod(
    function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val =
        (first << 24) + // Overflow
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 8 +
        this[++offset];
      return (
        (BigInt(val) << BigInt(32)) +
        BigInt(
          this[++offset] * 2 ** 24 +
            this[++offset] * 2 ** 16 +
            this[++offset] * 2 ** 8 +
            last,
        )
      );
    },
  );
  Buffer22.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer22.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer22.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer22.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer22.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
  }
  Buffer22.prototype.writeUintLE = Buffer22.prototype.writeUIntLE =
    function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = (value / mul) & 255;
      }
      return offset + byteLength2;
    };
  Buffer22.prototype.writeUintBE = Buffer22.prototype.writeUIntBE =
    function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = (value / mul) & 255;
      }
      return offset + byteLength2;
    };
  Buffer22.prototype.writeUint8 = Buffer22.prototype.writeUInt8 =
    function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
  Buffer22.prototype.writeUint16LE = Buffer22.prototype.writeUInt16LE =
    function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
  Buffer22.prototype.writeUint16BE = Buffer22.prototype.writeUInt16BE =
    function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
  Buffer22.prototype.writeUint32LE = Buffer22.prototype.writeUInt32LE =
    function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
  Buffer22.prototype.writeUint32BE = Buffer22.prototype.writeUInt32BE =
    function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
  function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number((value >> BigInt(32)) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number((value >> BigInt(32)) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer22.prototype.writeBigUInt64LE = defineBigIntMethod(
    function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(
        this,
        value,
        offset,
        BigInt(0),
        BigInt("0xffffffffffffffff"),
      );
    },
  );
  Buffer22.prototype.writeBigUInt64BE = defineBigIntMethod(
    function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(
        this,
        value,
        offset,
        BigInt(0),
        BigInt("0xffffffffffffffff"),
      );
    },
  );
  Buffer22.prototype.writeIntLE = function writeIntLE(
    value,
    offset,
    byteLength2,
    noAssert,
  ) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (((value / mul) >> 0) - sub) & 255;
    }
    return offset + byteLength2;
  };
  Buffer22.prototype.writeIntBE = function writeIntBE(
    value,
    offset,
    byteLength2,
    noAssert,
  ) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (((value / mul) >> 0) - sub) & 255;
    }
    return offset + byteLength2;
  };
  Buffer22.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
    if (value < 0) value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer22.prototype.writeInt16LE = function writeInt16LE(
    value,
    offset,
    noAssert,
  ) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer22.prototype.writeInt16BE = function writeInt16BE(
    value,
    offset,
    noAssert,
  ) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer22.prototype.writeInt32LE = function writeInt32LE(
    value,
    offset,
    noAssert,
  ) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer22.prototype.writeInt32BE = function writeInt32BE(
    value,
    offset,
    noAssert,
  ) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer22.prototype.writeBigInt64LE = defineBigIntMethod(
    function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(
        this,
        value,
        offset,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    },
  );
  Buffer22.prototype.writeBigInt64BE = defineBigIntMethod(
    function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(
        this,
        value,
        offset,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    },
  );
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer22.prototype.writeFloatLE = function writeFloatLE(
    value,
    offset,
    noAssert,
  ) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer22.prototype.writeFloatBE = function writeFloatBE(
    value,
    offset,
    noAssert,
  ) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer22.prototype.writeDoubleLE = function writeDoubleLE(
    value,
    offset,
    noAssert,
  ) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer22.prototype.writeDoubleBE = function writeDoubleBE(
    value,
    offset,
    noAssert,
  ) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer22.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer22.isBuffer(target))
      throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (
      this === target &&
      typeof Uint8Array.prototype.copyWithin === "function"
    ) {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, end),
        targetStart,
      );
    }
    return len;
  };
  Buffer22.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer22.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code = val.charCodeAt(0);
        if ((encoding === "utf8" && code < 128) || encoding === "latin1") {
          val = code;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      const bytes = Buffer22.isBuffer(val) ? val : Buffer22.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError(
          'The value "' + val + '" is invalid for argument "value"',
        );
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  const errors = {};
  function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true,
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true,
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function (name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    },
    RangeError,
  );
  E(
    "ERR_INVALID_ARG_TYPE",
    function (name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    },
    TypeError,
  );
  E(
    "ERR_OUT_OF_RANGE",
    function (str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (
          input > BigInt(2) ** BigInt(32) ||
          input < -(BigInt(2) ** BigInt(32))
        ) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    },
    RangeError,
  );
  function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
  }
  function checkBounds(buf, offset, byteLength2) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
      boundsError(offset, buf.length - (byteLength2 + 1));
    }
  }
  function checkIntBI(value, min, max, buf, offset, byteLength2) {
    if (value > max || value < min) {
      const n = typeof min === "bigint" ? "n" : "";
      let range;
      {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
        } else {
          range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
        }
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength2);
  }
  function validateNumber(value, name) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE("offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(
      "offset",
      `>= ${0} and <= ${length}`,
      value,
    );
  }
  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint =
          (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(
          (codePoint >> 12) | 224,
          ((codePoint >> 6) & 63) | 128,
          (codePoint & 63) | 128,
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(
          (codePoint >> 18) | 240,
          ((codePoint >> 12) & 63) | 128,
          ((codePoint >> 6) & 63) | 128,
          (codePoint & 63) | 128,
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i;
    for (i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return (
      obj instanceof type ||
      (obj != null &&
        obj.constructor != null &&
        obj.constructor.name != null &&
        obj.constructor.name === type.name)
    );
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  const hexSliceLookupTable = (function () {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i = 0; i < 16; ++i) {
      const i16 = i * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table;
  })();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
  return exports;
}
var exports$2,
  _dewExec$2,
  exports$1,
  _dewExec$1,
  exports,
  _dewExec,
  exports2,
  Buffer2,
  INSPECT_MAX_BYTES,
  kMaxLength;
var init_node_buffer = __esm({
  "node-modules-polyfills:node:buffer"() {
    init_process_shim();
    init_Buffer();
    init_process();
    exports$2 = {};
    _dewExec$2 = false;
    exports$1 = {};
    _dewExec$1 = false;
    exports = {};
    _dewExec = false;
    exports2 = dew();
    exports2["Buffer"];
    exports2["SlowBuffer"];
    exports2["INSPECT_MAX_BYTES"];
    exports2["kMaxLength"];
    Buffer2 = exports2.Buffer;
    INSPECT_MAX_BYTES = exports2.INSPECT_MAX_BYTES;
    kMaxLength = exports2.kMaxLength;
  },
});

// .yarn/__virtual__/esbuild-plugins-node-modules-polyfill-virtual-ed4c3dcd97/5/AppData/Local/Yarn/Berry/cache/esbuild-plugins-node-modules-polyfill-npm-1.7.0-d8f8684805-10c0.zip/node_modules/esbuild-plugins-node-modules-polyfill/globals/Buffer.js
var init_Buffer = __esm({
  ".yarn/__virtual__/esbuild-plugins-node-modules-polyfill-virtual-ed4c3dcd97/5/AppData/Local/Yarn/Berry/cache/esbuild-plugins-node-modules-polyfill-npm-1.7.0-d8f8684805-10c0.zip/node_modules/esbuild-plugins-node-modules-polyfill/globals/Buffer.js"() {
    init_node_buffer();
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/color-name-npm-1.1.4-025792b0ea-10c0.zip/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/color-name-npm-1.1.4-025792b0ea-10c0.zip/node_modules/color-name/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    module.exports = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50],
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/color-convert-npm-2.0.1-79730e935b-10c0.zip/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/color-convert-npm-2.0.1-79730e935b-10c0.zip/node_modules/color-convert/conversions.js"(
    exports5,
    module,
  ) {
    init_process_shim();
    init_Buffer();
    init_process();
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] },
    };
    module.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function (rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function (rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function (c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [h * 360, s * 100, v * 100];
    };
    convert.rgb.hwb = function (rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = (1 / 255) * Math.min(r, Math.min(g, b));
      b = 1 - (1 / 255) * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function (rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function (rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function (keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function (rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function (rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function (hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + (1 / 3) * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function (hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function (hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function (hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function (hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function (cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function (xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function (xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function (lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function (lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = (hr * 360) / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function (lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = (h / 360) * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function (args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi =
        30 +
        ((Math.round(b / 255) << 2) |
          (Math.round(g / 255) << 1) |
          Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function (args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function (args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round(((r - 8) / 247) * 24) + 232;
      }
      const ansi =
        16 +
        36 * Math.round((r / 255) * 5) +
        6 * Math.round((g / 255) * 5) +
        Math.round((b / 255) * 5);
      return ansi;
    };
    convert.ansi16.rgb = function (args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = (color / 10.5) * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = ((color >> 1) & 1) * mult * 255;
      const b = ((color >> 2) & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function (args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = (Math.floor(args / 36) / 5) * 255;
      const g = (Math.floor((rem = args % 36) / 6) / 5) * 255;
      const b = ((rem % 6) / 5) * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function (args) {
      const integer =
        ((Math.round(args[0]) & 255) << 16) +
        ((Math.round(args[1]) & 255) << 8) +
        (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function (args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString
          .split("")
          .map((char) => {
            return char + char;
          })
          .join("");
      }
      const integer = parseInt(colorString, 16);
      const r = (integer >> 16) & 255;
      const g = (integer >> 8) & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function (rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = ((g - b) / chroma) % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function (hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function (hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function (hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = (h % 1) * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255,
      ];
    };
    convert.hcg.hsv = function (hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function (hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function (hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function (hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function (apple) {
      return [
        (apple[0] / 65535) * 255,
        (apple[1] / 65535) * 255,
        (apple[2] / 65535) * 255,
      ];
    };
    convert.rgb.apple = function (rgb) {
      return [
        (rgb[0] / 255) * 65535,
        (rgb[1] / 255) * 65535,
        (rgb[2] / 255) * 65535,
      ];
    };
    convert.gray.rgb = function (args) {
      return [
        (args[0] / 100) * 255,
        (args[0] / 100) * 255,
        (args[0] / 100) * 255,
      ];
    };
    convert.gray.hsl = function (args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function (gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function (gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function (gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function (gray) {
      const val = Math.round((gray[0] / 100) * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function (rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [(val / 255) * 100];
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/color-convert-npm-2.0.1-79730e935b-10c0.zip/node_modules/color-convert/route.js
var require_route = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/color-convert-npm-2.0.1-79730e935b-10c0.zip/node_modules/color-convert/route.js"(
    exports5,
    module,
  ) {
    init_process_shim();
    init_Buffer();
    init_process();
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          // http://jsperf.com/1-vs-infinity
          // micro-opt, but this is simple.
          distance: -1,
          parent: null,
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue4 = [fromModel];
      graph[fromModel].distance = 0;
      while (queue4.length) {
        const current = queue4.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue4.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function (args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path;
      return fn;
    }
    module.exports = function (fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/color-convert-npm-2.0.1-79730e935b-10c0.zip/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/color-convert-npm-2.0.1-79730e935b-10c0.zip/node_modules/color-convert/index.js"(
    exports5,
    module,
  ) {
    init_process_shim();
    init_Buffer();
    init_process();
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function (...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function (...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", {
        value: conversions[fromModel].channels,
      });
      Object.defineProperty(convert[fromModel], "labels", {
        value: conversions[fromModel].labels,
      });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module.exports = convert;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/ansi-styles-npm-4.3.0-245c7d42c7-10c0.zip/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/ansi-styles-npm-4.3.0-245c7d42c7-10c0.zip/node_modules/ansi-styles/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var wrapAnsi16 =
      (fn, offset) =>
      (...args) => {
        const code = fn(...args);
        return `\x1B[${code + offset}m`;
      };
    var wrapAnsi256 =
      (fn, offset) =>
      (...args) => {
        const code = fn(...args);
        return `\x1B[${38 + offset};5;${code}m`;
      };
    var wrapAnsi16m =
      (fn, offset) =>
      (...args) => {
        const rgb = fn(...args);
        return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
      };
    var ansi2ansi = (n) => n;
    var rgb2rgb = (r, g, b) => [r, g, b];
    var setLazyProperty = (object, property, get) => {
      Object.defineProperty(object, property, {
        get: () => {
          const value = get();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true,
          });
          return value;
        },
        enumerable: true,
        configurable: true,
      });
    };
    var colorConvert;
    var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29],
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39],
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49],
        },
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`,
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false,
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false,
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      setLazyProperty(styles.color, "ansi", () =>
        makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false),
      );
      setLazyProperty(styles.color, "ansi256", () =>
        makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false),
      );
      setLazyProperty(styles.color, "ansi16m", () =>
        makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false),
      );
      setLazyProperty(styles.bgColor, "ansi", () =>
        makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true),
      );
      setLazyProperty(styles.bgColor, "ansi256", () =>
        makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true),
      );
      setLazyProperty(styles.bgColor, "ansi16m", () =>
        makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true),
      );
      return styles;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles,
    });
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/supports-color-npm-7.2.0-606bfcf7da-10c0.zip/node_modules/supports-color/browser.js
var require_browser = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/supports-color-npm-7.2.0-606bfcf7da-10c0.zip/node_modules/supports-color/browser.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    module.exports = {
      stdout: false,
      stderr: false,
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/chalk-npm-4.1.2-ba8b67ab80-10c0.zip/node_modules/chalk/source/util.js
var require_util = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/chalk-npm-4.1.2-ba8b67ab80-10c0.zip/node_modules/chalk/source/util.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var stringReplaceAll = (string, substring, replacer) => {
      let index = string.indexOf(substring);
      if (index === -1) {
        return string;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue +=
          string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    var stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string[index - 1] === "\r";
        returnValue +=
          string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) +
          prefix +
          (gotCR ? "\r\n" : "\n") +
          postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    module.exports = {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex,
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/chalk-npm-4.1.2-ba8b67ab80-10c0.zip/node_modules/chalk/source/templates.js
var require_templates = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/chalk-npm-4.1.2-ba8b67ab80-10c0.zip/node_modules/chalk/source/templates.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var TEMPLATE_REGEX =
      /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX =
      /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"],
    ]);
    function unescape(c) {
      const u = c[0] === "u";
      const bracket = c[1] === "{";
      if (
        (u && !bracket && c.length === 5) ||
        (c[0] === "x" && c.length === 3)
      ) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, arguments_) {
      const results = [];
      const chunks = arguments_.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        const number = Number(chunk);
        if (!Number.isNaN(number)) {
          results.push(number);
        } else if ((matches = chunk.match(STRING_REGEX))) {
          results.push(
            matches[2].replace(ESCAPE_REGEX, (m, escape, character) =>
              escape ? unescape(escape) : character,
            ),
          );
        } else {
          throw new Error(
            `Invalid Chalk template style argument: ${chunk} (in style '${name}')`,
          );
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk;
      for (const [styleName, styles2] of Object.entries(enabled)) {
        if (!Array.isArray(styles2)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error(`Unknown Chalk style: ${styleName}`);
        }
        current =
          styles2.length > 0
            ? current[styleName](...styles2)
            : current[styleName];
      }
      return current;
    }
    module.exports = (chalk, temporary) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      temporary.replace(
        TEMPLATE_REGEX,
        (m, escapeCharacter, inverse, style, close, character) => {
          if (escapeCharacter) {
            chunk.push(unescape(escapeCharacter));
          } else if (style) {
            const string = chunk.join("");
            chunk = [];
            chunks.push(
              styles.length === 0 ? string : buildStyle(chalk, styles)(string),
            );
            styles.push({ inverse, styles: parseStyle(style) });
          } else if (close) {
            if (styles.length === 0) {
              throw new Error("Found extraneous } in Chalk template literal");
            }
            chunks.push(buildStyle(chalk, styles)(chunk.join("")));
            chunk = [];
            styles.pop();
          } else {
            chunk.push(character);
          }
        },
      );
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMessage);
      }
      return chunks.join("");
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/chalk-npm-4.1.2-ba8b67ab80-10c0.zip/node_modules/chalk/source/index.js
var require_source = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/chalk-npm-4.1.2-ba8b67ab80-10c0.zip/node_modules/chalk/source/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var ansiStyles = require_ansi_styles();
    var { stdout: stdoutColor, stderr: stderrColor } = require_browser();
    var { stringReplaceAll, stringEncaseCRLFWithFirstIndex } = require_util();
    var { isArray: isArray2 } = Array;
    var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
    var styles = /* @__PURE__ */ Object.create(null);
    var applyOptions = (object, options = {}) => {
      if (
        options.level &&
        !(
          Number.isInteger(options.level) &&
          options.level >= 0 &&
          options.level <= 3
        )
      ) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    var ChalkClass = class {
      constructor(options) {
        return chalkFactory(options);
      }
    };
    var chalkFactory = (options) => {
      const chalk2 = {};
      applyOptions(chalk2, options);
      chalk2.template = (...arguments_) =>
        chalkTag(chalk2.template, ...arguments_);
      Object.setPrototypeOf(chalk2, Chalk.prototype);
      Object.setPrototypeOf(chalk2.template, chalk2);
      chalk2.template.constructor = () => {
        throw new Error(
          "`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.",
        );
      };
      chalk2.template.Instance = ChalkClass;
      return chalk2.template;
    };
    function Chalk(options) {
      return chalkFactory(options);
    }
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(
            this,
            createStyler(style.open, style.close, this._styler),
            this._isEmpty,
          );
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        },
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      },
    };
    var usedModels = [
      "rgb",
      "hex",
      "keyword",
      "hsl",
      "hsv",
      "hwb",
      "ansi",
      "ansi256",
    ];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const { level } = this;
          return function (...arguments_) {
            const styler = createStyler(
              ansiStyles.color[levelMapping[level]][model](...arguments_),
              ansiStyles.color.close,
              this._styler,
            );
            return createBuilder(this, styler, this._isEmpty);
          };
        },
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const { level } = this;
          return function (...arguments_) {
            const styler = createStyler(
              ansiStyles.bgColor[levelMapping[level]][model](...arguments_),
              ansiStyles.bgColor.close,
              this._styler,
            );
            return createBuilder(this, styler, this._isEmpty);
          };
        },
      };
    }
    var proto = Object.defineProperties(() => {}, {
      ...styles,
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        },
      },
    });
    var createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent,
      };
    };
    var createBuilder = (self2, _styler, _isEmpty) => {
      const builder = (...arguments_) => {
        if (isArray2(arguments_[0]) && isArray2(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag(builder, ...arguments_));
        }
        return applyStyle(
          builder,
          arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "),
        );
      };
      Object.setPrototypeOf(builder, proto);
      builder._generator = self2;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    };
    var applyStyle = (self2, string) => {
      if (self2.level <= 0 || !string) {
        return self2._isEmpty ? "" : string;
      }
      let styler = self2._styler;
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.indexOf("\x1B") !== -1) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(
          string,
          closeAll,
          openAll,
          lfIndex,
        );
      }
      return openAll + string + closeAll;
    };
    var template;
    var chalkTag = (chalk2, ...strings) => {
      const [firstString] = strings;
      if (!isArray2(firstString) || !isArray2(firstString.raw)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts = [firstString.raw[0]];
      for (let i = 1; i < firstString.length; i++) {
        parts.push(
          String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
          String(firstString.raw[i]),
        );
      }
      if (template === void 0) {
        template = require_templates();
      }
      return template(chalk2, parts.join(""));
    };
    Object.defineProperties(Chalk.prototype, styles);
    var chalk = Chalk();
    chalk.supportsColor = stdoutColor;
    chalk.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
    chalk.stderr.supportsColor = stderrColor;
    module.exports = chalk;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-get-type-npm-26.3.0-a481f14d96-10c0.zip/node_modules/jest-get-type/build/index.js
var require_build = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-get-type-npm-26.3.0-a481f14d96-10c0.zip/node_modules/jest-get-type/build/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    function getType(value) {
      if (value === void 0) {
        return "undefined";
      } else if (value === null) {
        return "null";
      } else if (Array.isArray(value)) {
        return "array";
      } else if (typeof value === "boolean") {
        return "boolean";
      } else if (typeof value === "function") {
        return "function";
      } else if (typeof value === "number") {
        return "number";
      } else if (typeof value === "string") {
        return "string";
      } else if (typeof value === "bigint") {
        return "bigint";
      } else if (typeof value === "object") {
        if (value != null) {
          if (value.constructor === RegExp) {
            return "regexp";
          } else if (value.constructor === Map) {
            return "map";
          } else if (value.constructor === Set) {
            return "set";
          } else if (value.constructor === Date) {
            return "date";
          }
        }
        return "object";
      } else if (typeof value === "symbol") {
        return "symbol";
      }
      throw new Error(`value of unknown type: ${value}`);
    }
    getType.isPrimitive = (value) => Object(value) !== value;
    module.exports = getType;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/collections.js
var require_collections = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/collections.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.printIteratorEntries = printIteratorEntries;
    exports5.printIteratorValues = printIteratorValues;
    exports5.printListItems = printListItems;
    exports5.printObjectProperties = printObjectProperties;
    var getKeysOfEnumerableProperties = (object) => {
      const keys = Object.keys(object).sort();
      if (Object.getOwnPropertySymbols) {
        Object.getOwnPropertySymbols(object).forEach((symbol) => {
          if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
            keys.push(symbol);
          }
        });
      }
      return keys;
    };
    function printIteratorEntries(
      iterator,
      config4,
      indentation,
      depth,
      refs,
      printer,
      separator = ": ",
    ) {
      let result = "";
      let current = iterator.next();
      if (!current.done) {
        result += config4.spacingOuter;
        const indentationNext = indentation + config4.indent;
        while (!current.done) {
          const name = printer(
            current.value[0],
            config4,
            indentationNext,
            depth,
            refs,
          );
          const value = printer(
            current.value[1],
            config4,
            indentationNext,
            depth,
            refs,
          );
          result += indentationNext + name + separator + value;
          current = iterator.next();
          if (!current.done) {
            result += "," + config4.spacingInner;
          } else if (!config4.min) {
            result += ",";
          }
        }
        result += config4.spacingOuter + indentation;
      }
      return result;
    }
    function printIteratorValues(
      iterator,
      config4,
      indentation,
      depth,
      refs,
      printer,
    ) {
      let result = "";
      let current = iterator.next();
      if (!current.done) {
        result += config4.spacingOuter;
        const indentationNext = indentation + config4.indent;
        while (!current.done) {
          result +=
            indentationNext +
            printer(current.value, config4, indentationNext, depth, refs);
          current = iterator.next();
          if (!current.done) {
            result += "," + config4.spacingInner;
          } else if (!config4.min) {
            result += ",";
          }
        }
        result += config4.spacingOuter + indentation;
      }
      return result;
    }
    function printListItems(list, config4, indentation, depth, refs, printer) {
      let result = "";
      if (list.length) {
        result += config4.spacingOuter;
        const indentationNext = indentation + config4.indent;
        for (let i = 0; i < list.length; i++) {
          result +=
            indentationNext +
            printer(list[i], config4, indentationNext, depth, refs);
          if (i < list.length - 1) {
            result += "," + config4.spacingInner;
          } else if (!config4.min) {
            result += ",";
          }
        }
        result += config4.spacingOuter + indentation;
      }
      return result;
    }
    function printObjectProperties(
      val,
      config4,
      indentation,
      depth,
      refs,
      printer,
    ) {
      let result = "";
      const keys = getKeysOfEnumerableProperties(val);
      if (keys.length) {
        result += config4.spacingOuter;
        const indentationNext = indentation + config4.indent;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const name = printer(key, config4, indentationNext, depth, refs);
          const value = printer(
            val[key],
            config4,
            indentationNext,
            depth,
            refs,
          );
          result += indentationNext + name + ": " + value;
          if (i < keys.length - 1) {
            result += "," + config4.spacingInner;
          } else if (!config4.min) {
            result += ",";
          }
        }
        result += config4.spacingOuter + indentation;
      }
      return result;
    }
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/AsymmetricMatcher.js
var require_AsymmetricMatcher = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = exports5.test = exports5.serialize = void 0;
    var _collections = require_collections();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var asymmetricMatcher =
      typeof Symbol2 === "function" && Symbol2.for
        ? Symbol2.for("jest.asymmetricMatcher")
        : 1267621;
    var SPACE = " ";
    var serialize = (val, config4, indentation, depth, refs, printer) => {
      const stringedValue = val.toString();
      if (
        stringedValue === "ArrayContaining" ||
        stringedValue === "ArrayNotContaining"
      ) {
        if (++depth > config4.maxDepth) {
          return "[" + stringedValue + "]";
        }
        return (
          stringedValue +
          SPACE +
          "[" +
          (0, _collections.printListItems)(
            val.sample,
            config4,
            indentation,
            depth,
            refs,
            printer,
          ) +
          "]"
        );
      }
      if (
        stringedValue === "ObjectContaining" ||
        stringedValue === "ObjectNotContaining"
      ) {
        if (++depth > config4.maxDepth) {
          return "[" + stringedValue + "]";
        }
        return (
          stringedValue +
          SPACE +
          "{" +
          (0, _collections.printObjectProperties)(
            val.sample,
            config4,
            indentation,
            depth,
            refs,
            printer,
          ) +
          "}"
        );
      }
      if (
        stringedValue === "StringMatching" ||
        stringedValue === "StringNotMatching"
      ) {
        return (
          stringedValue +
          SPACE +
          printer(val.sample, config4, indentation, depth, refs)
        );
      }
      if (
        stringedValue === "StringContaining" ||
        stringedValue === "StringNotContaining"
      ) {
        return (
          stringedValue +
          SPACE +
          printer(val.sample, config4, indentation, depth, refs)
        );
      }
      return val.toAsymmetricMatcher();
    };
    exports5.serialize = serialize;
    var test = (val) => val && val.$$typeof === asymmetricMatcher;
    exports5.test = test;
    var plugin = {
      serialize,
      test,
    };
    var _default = plugin;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/ansi-regex-npm-5.0.1-c963a48615-10c0.zip/node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/ansi-regex-npm-5.0.1-c963a48615-10c0.zip/node_modules/ansi-regex/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    module.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/ConvertAnsi.js
var require_ConvertAnsi = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/ConvertAnsi.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = exports5.serialize = exports5.test = void 0;
    var _ansiRegex = _interopRequireDefault(require_ansi_regex());
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toHumanReadableAnsi = (text) =>
      text.replace((0, _ansiRegex.default)(), (match) => {
        switch (match) {
          case _ansiStyles.default.red.close:
          case _ansiStyles.default.green.close:
          case _ansiStyles.default.cyan.close:
          case _ansiStyles.default.gray.close:
          case _ansiStyles.default.white.close:
          case _ansiStyles.default.yellow.close:
          case _ansiStyles.default.bgRed.close:
          case _ansiStyles.default.bgGreen.close:
          case _ansiStyles.default.bgYellow.close:
          case _ansiStyles.default.inverse.close:
          case _ansiStyles.default.dim.close:
          case _ansiStyles.default.bold.close:
          case _ansiStyles.default.reset.open:
          case _ansiStyles.default.reset.close:
            return "</>";
          case _ansiStyles.default.red.open:
            return "<red>";
          case _ansiStyles.default.green.open:
            return "<green>";
          case _ansiStyles.default.cyan.open:
            return "<cyan>";
          case _ansiStyles.default.gray.open:
            return "<gray>";
          case _ansiStyles.default.white.open:
            return "<white>";
          case _ansiStyles.default.yellow.open:
            return "<yellow>";
          case _ansiStyles.default.bgRed.open:
            return "<bgRed>";
          case _ansiStyles.default.bgGreen.open:
            return "<bgGreen>";
          case _ansiStyles.default.bgYellow.open:
            return "<bgYellow>";
          case _ansiStyles.default.inverse.open:
            return "<inverse>";
          case _ansiStyles.default.dim.open:
            return "<dim>";
          case _ansiStyles.default.bold.open:
            return "<bold>";
          default:
            return "";
        }
      });
    var test = (val) =>
      typeof val === "string" && !!val.match((0, _ansiRegex.default)());
    exports5.test = test;
    var serialize = (val, config4, indentation, depth, refs, printer) =>
      printer(toHumanReadableAnsi(val), config4, indentation, depth, refs);
    exports5.serialize = serialize;
    var plugin = {
      serialize,
      test,
    };
    var _default = plugin;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/DOMCollection.js
var require_DOMCollection = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/DOMCollection.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = exports5.serialize = exports5.test = void 0;
    var _collections = require_collections();
    var SPACE = " ";
    var OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
    var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
    var testName = (name) =>
      OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
    var test = (val) =>
      val &&
      val.constructor &&
      !!val.constructor.name &&
      testName(val.constructor.name);
    exports5.test = test;
    var isNamedNodeMap = (collection) =>
      collection.constructor.name === "NamedNodeMap";
    var serialize = (
      collection,
      config4,
      indentation,
      depth,
      refs,
      printer,
    ) => {
      const name = collection.constructor.name;
      if (++depth > config4.maxDepth) {
        return "[" + name + "]";
      }
      return (
        (config4.min ? "" : name + SPACE) +
        (OBJECT_NAMES.indexOf(name) !== -1
          ? "{" +
            (0, _collections.printObjectProperties)(
              isNamedNodeMap(collection)
                ? Array.from(collection).reduce((props, attribute) => {
                    props[attribute.name] = attribute.value;
                    return props;
                  }, {})
                : { ...collection },
              config4,
              indentation,
              depth,
              refs,
              printer,
            ) +
            "}"
          : "[" +
            (0, _collections.printListItems)(
              Array.from(collection),
              config4,
              indentation,
              depth,
              refs,
              printer,
            ) +
            "]")
      );
    };
    exports5.serialize = serialize;
    var plugin = {
      serialize,
      test,
    };
    var _default = plugin;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/lib/escapeHTML.js
var require_escapeHTML = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = escapeHTML;
    function escapeHTML(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/lib/markup.js
var require_markup = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/lib/markup.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.printElementAsLeaf =
      exports5.printElement =
      exports5.printComment =
      exports5.printText =
      exports5.printChildren =
      exports5.printProps =
        void 0;
    var _escapeHTML = _interopRequireDefault(require_escapeHTML());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var printProps = (
      keys,
      props,
      config4,
      indentation,
      depth,
      refs,
      printer,
    ) => {
      const indentationNext = indentation + config4.indent;
      const colors = config4.colors;
      return keys
        .map((key) => {
          const value = props[key];
          let printed = printer(value, config4, indentationNext, depth, refs);
          if (typeof value !== "string") {
            if (printed.indexOf("\n") !== -1) {
              printed =
                config4.spacingOuter +
                indentationNext +
                printed +
                config4.spacingOuter +
                indentation;
            }
            printed = "{" + printed + "}";
          }
          return (
            config4.spacingInner +
            indentation +
            colors.prop.open +
            key +
            colors.prop.close +
            "=" +
            colors.value.open +
            printed +
            colors.value.close
          );
        })
        .join("");
    };
    exports5.printProps = printProps;
    var printChildren = (
      children,
      config4,
      indentation,
      depth,
      refs,
      printer,
    ) =>
      children
        .map(
          (child) =>
            config4.spacingOuter +
            indentation +
            (typeof child === "string"
              ? printText(child, config4)
              : printer(child, config4, indentation, depth, refs)),
        )
        .join("");
    exports5.printChildren = printChildren;
    var printText = (text, config4) => {
      const contentColor = config4.colors.content;
      return (
        contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close
      );
    };
    exports5.printText = printText;
    var printComment = (comment, config4) => {
      const commentColor = config4.colors.comment;
      return (
        commentColor.open +
        "<!--" +
        (0, _escapeHTML.default)(comment) +
        "-->" +
        commentColor.close
      );
    };
    exports5.printComment = printComment;
    var printElement = (
      type,
      printedProps,
      printedChildren,
      config4,
      indentation,
    ) => {
      const tagColor = config4.colors.tag;
      return (
        tagColor.open +
        "<" +
        type +
        (printedProps &&
          tagColor.close +
            printedProps +
            config4.spacingOuter +
            indentation +
            tagColor.open) +
        (printedChildren
          ? ">" +
            tagColor.close +
            printedChildren +
            config4.spacingOuter +
            indentation +
            tagColor.open +
            "</" +
            type
          : (printedProps && !config4.min ? "" : " ") + "/") +
        ">" +
        tagColor.close
      );
    };
    exports5.printElement = printElement;
    var printElementAsLeaf = (type, config4) => {
      const tagColor = config4.colors.tag;
      return (
        tagColor.open +
        "<" +
        type +
        tagColor.close +
        " \u2026" +
        tagColor.open +
        " />" +
        tagColor.close
      );
    };
    exports5.printElementAsLeaf = printElementAsLeaf;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/DOMElement.js
var require_DOMElement = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/DOMElement.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = exports5.serialize = exports5.test = void 0;
    var _markup = require_markup();
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var FRAGMENT_NODE = 11;
    var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
    var testNode = (val) => {
      var _val$hasAttribute;
      const constructorName = val.constructor.name;
      const { nodeType, tagName } = val;
      const isCustomElement =
        (typeof tagName === "string" && tagName.includes("-")) ||
        ((_val$hasAttribute = val.hasAttribute) === null ||
        _val$hasAttribute === void 0
          ? void 0
          : _val$hasAttribute.call(val, "is"));
      return (
        (nodeType === ELEMENT_NODE &&
          (ELEMENT_REGEXP.test(constructorName) || isCustomElement)) ||
        (nodeType === TEXT_NODE && constructorName === "Text") ||
        (nodeType === COMMENT_NODE && constructorName === "Comment") ||
        (nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment")
      );
    };
    var test = (val) => {
      var _val$constructor;
      return (
        (val === null || val === void 0
          ? void 0
          : (_val$constructor = val.constructor) === null ||
              _val$constructor === void 0
            ? void 0
            : _val$constructor.name) && testNode(val)
      );
    };
    exports5.test = test;
    function nodeIsText(node) {
      return node.nodeType === TEXT_NODE;
    }
    function nodeIsComment(node) {
      return node.nodeType === COMMENT_NODE;
    }
    function nodeIsFragment(node) {
      return node.nodeType === FRAGMENT_NODE;
    }
    var serialize = (node, config4, indentation, depth, refs, printer) => {
      if (nodeIsText(node)) {
        return (0, _markup.printText)(node.data, config4);
      }
      if (nodeIsComment(node)) {
        return (0, _markup.printComment)(node.data, config4);
      }
      const type = nodeIsFragment(node)
        ? `DocumentFragment`
        : node.tagName.toLowerCase();
      if (++depth > config4.maxDepth) {
        return (0, _markup.printElementAsLeaf)(type, config4);
      }
      return (0, _markup.printElement)(
        type,
        (0, _markup.printProps)(
          nodeIsFragment(node)
            ? []
            : Array.from(node.attributes)
                .map((attr) => attr.name)
                .sort(),
          nodeIsFragment(node)
            ? {}
            : Array.from(node.attributes).reduce((props, attribute) => {
                props[attribute.name] = attribute.value;
                return props;
              }, {}),
          config4,
          indentation + config4.indent,
          depth,
          refs,
          printer,
        ),
        (0, _markup.printChildren)(
          Array.prototype.slice.call(node.childNodes || node.children),
          config4,
          indentation + config4.indent,
          depth,
          refs,
          printer,
        ),
        config4,
        indentation,
      );
    };
    exports5.serialize = serialize;
    var plugin = {
      serialize,
      test,
    };
    var _default = plugin;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/Immutable.js
var require_Immutable = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/Immutable.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = exports5.test = exports5.serialize = void 0;
    var _collections = require_collections();
    var IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
    var IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
    var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
    var IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
    var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
    var IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
    var IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
    var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
    var IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
    var getImmutableName = (name) => "Immutable." + name;
    var printAsLeaf = (name) => "[" + name + "]";
    var SPACE = " ";
    var LAZY = "\u2026";
    var printImmutableEntries = (
      val,
      config4,
      indentation,
      depth,
      refs,
      printer,
      type,
    ) =>
      ++depth > config4.maxDepth
        ? printAsLeaf(getImmutableName(type))
        : getImmutableName(type) +
          SPACE +
          "{" +
          (0, _collections.printIteratorEntries)(
            val.entries(),
            config4,
            indentation,
            depth,
            refs,
            printer,
          ) +
          "}";
    function getRecordEntries(val) {
      let i = 0;
      return {
        next() {
          if (i < val._keys.length) {
            const key = val._keys[i++];
            return {
              done: false,
              value: [key, val.get(key)],
            };
          }
          return {
            done: true,
            value: void 0,
          };
        },
      };
    }
    var printImmutableRecord = (
      val,
      config4,
      indentation,
      depth,
      refs,
      printer,
    ) => {
      const name = getImmutableName(val._name || "Record");
      return ++depth > config4.maxDepth
        ? printAsLeaf(name)
        : name +
            SPACE +
            "{" +
            (0, _collections.printIteratorEntries)(
              getRecordEntries(val),
              config4,
              indentation,
              depth,
              refs,
              printer,
            ) +
            "}";
    };
    var printImmutableSeq = (
      val,
      config4,
      indentation,
      depth,
      refs,
      printer,
    ) => {
      const name = getImmutableName("Seq");
      if (++depth > config4.maxDepth) {
        return printAsLeaf(name);
      }
      if (val[IS_KEYED_SENTINEL]) {
        return (
          name +
          SPACE +
          "{" + // from Immutable collection of entries or from ECMAScript object
          (val._iter || val._object
            ? (0, _collections.printIteratorEntries)(
                val.entries(),
                config4,
                indentation,
                depth,
                refs,
                printer,
              )
            : LAZY) +
          "}"
        );
      }
      return (
        name +
        SPACE +
        "[" +
        (val._iter || // from Immutable collection of values
        val._array || // from ECMAScript array
        val._collection || // from ECMAScript collection in immutable v4
        val._iterable
          ? (0, _collections.printIteratorValues)(
              val.values(),
              config4,
              indentation,
              depth,
              refs,
              printer,
            )
          : LAZY) +
        "]"
      );
    };
    var printImmutableValues = (
      val,
      config4,
      indentation,
      depth,
      refs,
      printer,
      type,
    ) =>
      ++depth > config4.maxDepth
        ? printAsLeaf(getImmutableName(type))
        : getImmutableName(type) +
          SPACE +
          "[" +
          (0, _collections.printIteratorValues)(
            val.values(),
            config4,
            indentation,
            depth,
            refs,
            printer,
          ) +
          "]";
    var serialize = (val, config4, indentation, depth, refs, printer) => {
      if (val[IS_MAP_SENTINEL]) {
        return printImmutableEntries(
          val,
          config4,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map",
        );
      }
      if (val[IS_LIST_SENTINEL]) {
        return printImmutableValues(
          val,
          config4,
          indentation,
          depth,
          refs,
          printer,
          "List",
        );
      }
      if (val[IS_SET_SENTINEL]) {
        return printImmutableValues(
          val,
          config4,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set",
        );
      }
      if (val[IS_STACK_SENTINEL]) {
        return printImmutableValues(
          val,
          config4,
          indentation,
          depth,
          refs,
          printer,
          "Stack",
        );
      }
      if (val[IS_SEQ_SENTINEL]) {
        return printImmutableSeq(
          val,
          config4,
          indentation,
          depth,
          refs,
          printer,
        );
      }
      return printImmutableRecord(
        val,
        config4,
        indentation,
        depth,
        refs,
        printer,
      );
    };
    exports5.serialize = serialize;
    var test = (val) =>
      val &&
      (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
    exports5.test = test;
    var plugin = {
      serialize,
      test,
    };
    var _default = plugin;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/react-is-npm-17.0.2-091bbb8db6-10c0.zip/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/react-is-npm-17.0.2-091bbb8db6-10c0.zip/node_modules/react-is/cjs/react-is.development.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    if (true) {
      (function () {
        "use strict";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (
            type === REACT_FRAGMENT_TYPE ||
            type === REACT_PROFILER_TYPE ||
            type === REACT_DEBUG_TRACING_MODE_TYPE ||
            type === REACT_STRICT_MODE_TYPE ||
            type === REACT_SUSPENSE_TYPE ||
            type === REACT_SUSPENSE_LIST_TYPE ||
            type === REACT_LEGACY_HIDDEN_TYPE ||
            enableScopeAPI
          ) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (
              type.$$typeof === REACT_LAZY_TYPE ||
              type.$$typeof === REACT_MEMO_TYPE ||
              type.$$typeof === REACT_PROVIDER_TYPE ||
              type.$$typeof === REACT_CONTEXT_TYPE ||
              type.$$typeof === REACT_FORWARD_REF_TYPE ||
              type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
              type.$$typeof === REACT_BLOCK_TYPE ||
              type[0] === REACT_SERVER_BLOCK_TYPE
            ) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"](
                "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.",
              );
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"](
                "The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.",
              );
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return (
            typeof object === "object" &&
            object !== null &&
            object.$$typeof === REACT_ELEMENT_TYPE
          );
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports5.ContextConsumer = ContextConsumer;
        exports5.ContextProvider = ContextProvider;
        exports5.Element = Element;
        exports5.ForwardRef = ForwardRef;
        exports5.Fragment = Fragment;
        exports5.Lazy = Lazy;
        exports5.Memo = Memo;
        exports5.Portal = Portal;
        exports5.Profiler = Profiler;
        exports5.StrictMode = StrictMode;
        exports5.Suspense = Suspense;
        exports5.isAsyncMode = isAsyncMode;
        exports5.isConcurrentMode = isConcurrentMode;
        exports5.isContextConsumer = isContextConsumer;
        exports5.isContextProvider = isContextProvider;
        exports5.isElement = isElement;
        exports5.isForwardRef = isForwardRef;
        exports5.isFragment = isFragment;
        exports5.isLazy = isLazy;
        exports5.isMemo = isMemo;
        exports5.isPortal = isPortal;
        exports5.isProfiler = isProfiler;
        exports5.isStrictMode = isStrictMode;
        exports5.isSuspense = isSuspense;
        exports5.isValidElementType = isValidElementType;
        exports5.typeOf = typeOf;
      })();
    }
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/react-is-npm-17.0.2-091bbb8db6-10c0.zip/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/react-is-npm-17.0.2-091bbb8db6-10c0.zip/node_modules/react-is/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/ReactElement.js
var require_ReactElement = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/ReactElement.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = exports5.test = exports5.serialize = void 0;
    var ReactIs = _interopRequireWildcard(require_react_is());
    var _markup = require_markup();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function () {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var getChildren = (arg, children = []) => {
      if (Array.isArray(arg)) {
        arg.forEach((item) => {
          getChildren(item, children);
        });
      } else if (arg != null && arg !== false) {
        children.push(arg);
      }
      return children;
    };
    var getType = (element) => {
      const type = element.type;
      if (typeof type === "string") {
        return type;
      }
      if (typeof type === "function") {
        return type.displayName || type.name || "Unknown";
      }
      if (ReactIs.isFragment(element)) {
        return "React.Fragment";
      }
      if (ReactIs.isSuspense(element)) {
        return "React.Suspense";
      }
      if (typeof type === "object" && type !== null) {
        if (ReactIs.isContextProvider(element)) {
          return "Context.Provider";
        }
        if (ReactIs.isContextConsumer(element)) {
          return "Context.Consumer";
        }
        if (ReactIs.isForwardRef(element)) {
          if (type.displayName) {
            return type.displayName;
          }
          const functionName =
            type.render.displayName || type.render.name || "";
          return functionName !== ""
            ? "ForwardRef(" + functionName + ")"
            : "ForwardRef";
        }
        if (ReactIs.isMemo(element)) {
          const functionName =
            type.displayName || type.type.displayName || type.type.name || "";
          return functionName !== "" ? "Memo(" + functionName + ")" : "Memo";
        }
      }
      return "UNDEFINED";
    };
    var getPropKeys = (element) => {
      const { props } = element;
      return Object.keys(props)
        .filter((key) => key !== "children" && props[key] !== void 0)
        .sort();
    };
    var serialize = (element, config4, indentation, depth, refs, printer) =>
      ++depth > config4.maxDepth
        ? (0, _markup.printElementAsLeaf)(getType(element), config4)
        : (0, _markup.printElement)(
            getType(element),
            (0, _markup.printProps)(
              getPropKeys(element),
              element.props,
              config4,
              indentation + config4.indent,
              depth,
              refs,
              printer,
            ),
            (0, _markup.printChildren)(
              getChildren(element.props.children),
              config4,
              indentation + config4.indent,
              depth,
              refs,
              printer,
            ),
            config4,
            indentation,
          );
    exports5.serialize = serialize;
    var test = (val) => val && ReactIs.isElement(val);
    exports5.test = test;
    var plugin = {
      serialize,
      test,
    };
    var _default = plugin;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/ReactTestComponent.js
var require_ReactTestComponent = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/plugins/ReactTestComponent.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = exports5.test = exports5.serialize = void 0;
    var _markup = require_markup();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var testSymbol =
      typeof Symbol2 === "function" && Symbol2.for
        ? Symbol2.for("react.test.json")
        : 245830487;
    var getPropKeys = (object) => {
      const { props } = object;
      return props
        ? Object.keys(props)
            .filter((key) => props[key] !== void 0)
            .sort()
        : [];
    };
    var serialize = (object, config4, indentation, depth, refs, printer) =>
      ++depth > config4.maxDepth
        ? (0, _markup.printElementAsLeaf)(object.type, config4)
        : (0, _markup.printElement)(
            object.type,
            object.props
              ? (0, _markup.printProps)(
                  getPropKeys(object),
                  object.props,
                  config4,
                  indentation + config4.indent,
                  depth,
                  refs,
                  printer,
                )
              : "",
            object.children
              ? (0, _markup.printChildren)(
                  object.children,
                  config4,
                  indentation + config4.indent,
                  depth,
                  refs,
                  printer,
                )
              : "",
            config4,
            indentation,
          );
    exports5.serialize = serialize;
    var test = (val) => val && val.$$typeof === testSymbol;
    exports5.test = test;
    var plugin = {
      serialize,
      test,
    };
    var _default = plugin;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/index.js
var require_build2 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/pretty-format-npm-26.6.2-6edfcf7149-10c0.zip/node_modules/pretty-format/build/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    var _collections = require_collections();
    var _AsymmetricMatcher = _interopRequireDefault(
      require_AsymmetricMatcher(),
    );
    var _ConvertAnsi = _interopRequireDefault(require_ConvertAnsi());
    var _DOMCollection = _interopRequireDefault(require_DOMCollection());
    var _DOMElement = _interopRequireDefault(require_DOMElement());
    var _Immutable = _interopRequireDefault(require_Immutable());
    var _ReactElement = _interopRequireDefault(require_ReactElement());
    var _ReactTestComponent = _interopRequireDefault(
      require_ReactTestComponent(),
    );
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toString = Object.prototype.toString;
    var toISOString = Date.prototype.toISOString;
    var errorToString = Error.prototype.toString;
    var regExpToString = RegExp.prototype.toString;
    var getConstructorName = (val) =>
      (typeof val.constructor === "function" && val.constructor.name) ||
      "Object";
    var isWindow = (val) => typeof window !== "undefined" && val === window;
    var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
    var NEWLINE_REGEXP = /\n/gi;
    var PrettyFormatPluginError = class extends Error {
      constructor(message, stack) {
        super(message);
        this.stack = stack;
        this.name = this.constructor.name;
      }
    };
    function isToStringedArrayType(toStringed) {
      return (
        toStringed === "[object Array]" ||
        toStringed === "[object ArrayBuffer]" ||
        toStringed === "[object DataView]" ||
        toStringed === "[object Float32Array]" ||
        toStringed === "[object Float64Array]" ||
        toStringed === "[object Int8Array]" ||
        toStringed === "[object Int16Array]" ||
        toStringed === "[object Int32Array]" ||
        toStringed === "[object Uint8Array]" ||
        toStringed === "[object Uint8ClampedArray]" ||
        toStringed === "[object Uint16Array]" ||
        toStringed === "[object Uint32Array]"
      );
    }
    function printNumber(val) {
      return Object.is(val, -0) ? "-0" : String(val);
    }
    function printBigInt(val) {
      return String(`${val}n`);
    }
    function printFunction(val, printFunctionName) {
      if (!printFunctionName) {
        return "[Function]";
      }
      return "[Function " + (val.name || "anonymous") + "]";
    }
    function printSymbol(val) {
      return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
    }
    function printError(val) {
      return "[" + errorToString.call(val) + "]";
    }
    function printBasicValue(
      val,
      printFunctionName,
      escapeRegex,
      escapeString,
    ) {
      if (val === true || val === false) {
        return "" + val;
      }
      if (val === void 0) {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      const typeOf = typeof val;
      if (typeOf === "number") {
        return printNumber(val);
      }
      if (typeOf === "bigint") {
        return printBigInt(val);
      }
      if (typeOf === "string") {
        if (escapeString) {
          return '"' + val.replace(/"|\\/g, "\\$&") + '"';
        }
        return '"' + val + '"';
      }
      if (typeOf === "function") {
        return printFunction(val, printFunctionName);
      }
      if (typeOf === "symbol") {
        return printSymbol(val);
      }
      const toStringed = toString.call(val);
      if (toStringed === "[object WeakMap]") {
        return "WeakMap {}";
      }
      if (toStringed === "[object WeakSet]") {
        return "WeakSet {}";
      }
      if (
        toStringed === "[object Function]" ||
        toStringed === "[object GeneratorFunction]"
      ) {
        return printFunction(val, printFunctionName);
      }
      if (toStringed === "[object Symbol]") {
        return printSymbol(val);
      }
      if (toStringed === "[object Date]") {
        return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
      }
      if (toStringed === "[object Error]") {
        return printError(val);
      }
      if (toStringed === "[object RegExp]") {
        if (escapeRegex) {
          return regExpToString
            .call(val)
            .replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        return regExpToString.call(val);
      }
      if (val instanceof Error) {
        return printError(val);
      }
      return null;
    }
    function printComplexValue(
      val,
      config4,
      indentation,
      depth,
      refs,
      hasCalledToJSON,
    ) {
      if (refs.indexOf(val) !== -1) {
        return "[Circular]";
      }
      refs = refs.slice();
      refs.push(val);
      const hitMaxDepth = ++depth > config4.maxDepth;
      const min = config4.min;
      if (
        config4.callToJSON &&
        !hitMaxDepth &&
        val.toJSON &&
        typeof val.toJSON === "function" &&
        !hasCalledToJSON
      ) {
        return printer(val.toJSON(), config4, indentation, depth, refs, true);
      }
      const toStringed = toString.call(val);
      if (toStringed === "[object Arguments]") {
        return hitMaxDepth
          ? "[Arguments]"
          : (min ? "" : "Arguments ") +
              "[" +
              (0, _collections.printListItems)(
                val,
                config4,
                indentation,
                depth,
                refs,
                printer,
              ) +
              "]";
      }
      if (isToStringedArrayType(toStringed)) {
        return hitMaxDepth
          ? "[" + val.constructor.name + "]"
          : (min ? "" : val.constructor.name + " ") +
              "[" +
              (0, _collections.printListItems)(
                val,
                config4,
                indentation,
                depth,
                refs,
                printer,
              ) +
              "]";
      }
      if (toStringed === "[object Map]") {
        return hitMaxDepth
          ? "[Map]"
          : "Map {" +
              (0, _collections.printIteratorEntries)(
                val.entries(),
                config4,
                indentation,
                depth,
                refs,
                printer,
                " => ",
              ) +
              "}";
      }
      if (toStringed === "[object Set]") {
        return hitMaxDepth
          ? "[Set]"
          : "Set {" +
              (0, _collections.printIteratorValues)(
                val.values(),
                config4,
                indentation,
                depth,
                refs,
                printer,
              ) +
              "}";
      }
      return hitMaxDepth || isWindow(val)
        ? "[" + getConstructorName(val) + "]"
        : (min ? "" : getConstructorName(val) + " ") +
            "{" +
            (0, _collections.printObjectProperties)(
              val,
              config4,
              indentation,
              depth,
              refs,
              printer,
            ) +
            "}";
    }
    function isNewPlugin(plugin) {
      return plugin.serialize != null;
    }
    function printPlugin(plugin, val, config4, indentation, depth, refs) {
      let printed;
      try {
        printed = isNewPlugin(plugin)
          ? plugin.serialize(val, config4, indentation, depth, refs, printer)
          : plugin.print(
              val,
              (valChild) =>
                printer(valChild, config4, indentation, depth, refs),
              (str) => {
                const indentationNext = indentation + config4.indent;
                return (
                  indentationNext +
                  str.replace(NEWLINE_REGEXP, "\n" + indentationNext)
                );
              },
              {
                edgeSpacing: config4.spacingOuter,
                min: config4.min,
                spacing: config4.spacingInner,
              },
              config4.colors,
            );
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }
      if (typeof printed !== "string") {
        throw new Error(
          `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`,
        );
      }
      return printed;
    }
    function findPlugin(plugins, val) {
      for (let p = 0; p < plugins.length; p++) {
        try {
          if (plugins[p].test(val)) {
            return plugins[p];
          }
        } catch (error) {
          throw new PrettyFormatPluginError(error.message, error.stack);
        }
      }
      return null;
    }
    function printer(val, config4, indentation, depth, refs, hasCalledToJSON) {
      const plugin = findPlugin(config4.plugins, val);
      if (plugin !== null) {
        return printPlugin(plugin, val, config4, indentation, depth, refs);
      }
      const basicResult = printBasicValue(
        val,
        config4.printFunctionName,
        config4.escapeRegex,
        config4.escapeString,
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(
        val,
        config4,
        indentation,
        depth,
        refs,
        hasCalledToJSON,
      );
    }
    var DEFAULT_THEME = {
      comment: "gray",
      content: "reset",
      prop: "yellow",
      tag: "cyan",
      value: "green",
    };
    var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
    var DEFAULT_OPTIONS = {
      callToJSON: true,
      escapeRegex: false,
      escapeString: true,
      highlight: false,
      indent: 2,
      maxDepth: Infinity,
      min: false,
      plugins: [],
      printFunctionName: true,
      theme: DEFAULT_THEME,
    };
    function validateOptions(options) {
      Object.keys(options).forEach((key) => {
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          throw new Error(`pretty-format: Unknown option "${key}".`);
        }
      });
      if (options.min && options.indent !== void 0 && options.indent !== 0) {
        throw new Error(
          'pretty-format: Options "min" and "indent" cannot be used together.',
        );
      }
      if (options.theme !== void 0) {
        if (options.theme === null) {
          throw new Error(`pretty-format: Option "theme" must not be null.`);
        }
        if (typeof options.theme !== "object") {
          throw new Error(
            `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`,
          );
        }
      }
    }
    var getColorsHighlight = (options) =>
      DEFAULT_THEME_KEYS.reduce((colors, key) => {
        const value =
          options.theme && options.theme[key] !== void 0
            ? options.theme[key]
            : DEFAULT_THEME[key];
        const color = value && _ansiStyles.default[value];
        if (
          color &&
          typeof color.close === "string" &&
          typeof color.open === "string"
        ) {
          colors[key] = color;
        } else {
          throw new Error(
            `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`,
          );
        }
        return colors;
      }, /* @__PURE__ */ Object.create(null));
    var getColorsEmpty = () =>
      DEFAULT_THEME_KEYS.reduce((colors, key) => {
        colors[key] = {
          close: "",
          open: "",
        };
        return colors;
      }, /* @__PURE__ */ Object.create(null));
    var getPrintFunctionName = (options) =>
      options && options.printFunctionName !== void 0
        ? options.printFunctionName
        : DEFAULT_OPTIONS.printFunctionName;
    var getEscapeRegex = (options) =>
      options && options.escapeRegex !== void 0
        ? options.escapeRegex
        : DEFAULT_OPTIONS.escapeRegex;
    var getEscapeString = (options) =>
      options && options.escapeString !== void 0
        ? options.escapeString
        : DEFAULT_OPTIONS.escapeString;
    var getConfig = (options) => ({
      callToJSON:
        options && options.callToJSON !== void 0
          ? options.callToJSON
          : DEFAULT_OPTIONS.callToJSON,
      colors:
        options && options.highlight
          ? getColorsHighlight(options)
          : getColorsEmpty(),
      escapeRegex: getEscapeRegex(options),
      escapeString: getEscapeString(options),
      indent:
        options && options.min
          ? ""
          : createIndent(
              options && options.indent !== void 0
                ? options.indent
                : DEFAULT_OPTIONS.indent,
            ),
      maxDepth:
        options && options.maxDepth !== void 0
          ? options.maxDepth
          : DEFAULT_OPTIONS.maxDepth,
      min:
        options && options.min !== void 0 ? options.min : DEFAULT_OPTIONS.min,
      plugins:
        options && options.plugins !== void 0
          ? options.plugins
          : DEFAULT_OPTIONS.plugins,
      printFunctionName: getPrintFunctionName(options),
      spacingInner: options && options.min ? " " : "\n",
      spacingOuter: options && options.min ? "" : "\n",
    });
    function createIndent(indent) {
      return new Array(indent + 1).join(" ");
    }
    function prettyFormat(val, options) {
      if (options) {
        validateOptions(options);
        if (options.plugins) {
          const plugin = findPlugin(options.plugins, val);
          if (plugin !== null) {
            return printPlugin(plugin, val, getConfig(options), "", 0, []);
          }
        }
      }
      const basicResult = printBasicValue(
        val,
        getPrintFunctionName(options),
        getEscapeRegex(options),
        getEscapeString(options),
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(val, getConfig(options), "", 0, []);
    }
    prettyFormat.plugins = {
      AsymmetricMatcher: _AsymmetricMatcher.default,
      ConvertAnsi: _ConvertAnsi.default,
      DOMCollection: _DOMCollection.default,
      DOMElement: _DOMElement.default,
      Immutable: _Immutable.default,
      ReactElement: _ReactElement.default,
      ReactTestComponent: _ReactTestComponent.default,
    };
    module.exports = prettyFormat;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/cleanupSemantic.js
var require_cleanupSemantic = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/cleanupSemantic.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.cleanupSemantic =
      exports5.DIFF_INSERT =
      exports5.DIFF_DELETE =
      exports5.DIFF_EQUAL =
      exports5.Diff =
        void 0;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var DIFF_DELETE = -1;
    exports5.DIFF_DELETE = DIFF_DELETE;
    var DIFF_INSERT = 1;
    exports5.DIFF_INSERT = DIFF_INSERT;
    var DIFF_EQUAL = 0;
    exports5.DIFF_EQUAL = DIFF_EQUAL;
    var Diff = class {
      constructor(op, text) {
        _defineProperty(this, 0, void 0);
        _defineProperty(this, 1, void 0);
        this[0] = op;
        this[1] = text;
      }
    };
    exports5.Diff = Diff;
    var diff_commonPrefix = function (text1, text2) {
      if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerstart = 0;
      while (pointermin < pointermid) {
        if (
          text1.substring(pointerstart, pointermid) ==
          text2.substring(pointerstart, pointermid)
        ) {
          pointermin = pointermid;
          pointerstart = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      return pointermid;
    };
    var diff_commonSuffix = function (text1, text2) {
      if (
        !text1 ||
        !text2 ||
        text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)
      ) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerend = 0;
      while (pointermin < pointermid) {
        if (
          text1.substring(
            text1.length - pointermid,
            text1.length - pointerend,
          ) ==
          text2.substring(text2.length - pointermid, text2.length - pointerend)
        ) {
          pointermin = pointermid;
          pointerend = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      return pointermid;
    };
    var diff_commonOverlap_ = function (text1, text2) {
      var text1_length = text1.length;
      var text2_length = text2.length;
      if (text1_length == 0 || text2_length == 0) {
        return 0;
      }
      if (text1_length > text2_length) {
        text1 = text1.substring(text1_length - text2_length);
      } else if (text1_length < text2_length) {
        text2 = text2.substring(0, text1_length);
      }
      var text_length = Math.min(text1_length, text2_length);
      if (text1 == text2) {
        return text_length;
      }
      var best = 0;
      var length = 1;
      while (true) {
        var pattern = text1.substring(text_length - length);
        var found = text2.indexOf(pattern);
        if (found == -1) {
          return best;
        }
        length += found;
        if (
          found == 0 ||
          text1.substring(text_length - length) == text2.substring(0, length)
        ) {
          best = length;
          length++;
        }
      }
    };
    var diff_cleanupSemantic = function (diffs) {
      var changes = false;
      var equalities = [];
      var equalitiesLength = 0;
      var lastEquality = null;
      var pointer = 0;
      var length_insertions1 = 0;
      var length_deletions1 = 0;
      var length_insertions2 = 0;
      var length_deletions2 = 0;
      while (pointer < diffs.length) {
        if (diffs[pointer][0] == DIFF_EQUAL) {
          equalities[equalitiesLength++] = pointer;
          length_insertions1 = length_insertions2;
          length_deletions1 = length_deletions2;
          length_insertions2 = 0;
          length_deletions2 = 0;
          lastEquality = diffs[pointer][1];
        } else {
          if (diffs[pointer][0] == DIFF_INSERT) {
            length_insertions2 += diffs[pointer][1].length;
          } else {
            length_deletions2 += diffs[pointer][1].length;
          }
          if (
            lastEquality &&
            lastEquality.length <=
              Math.max(length_insertions1, length_deletions1) &&
            lastEquality.length <=
              Math.max(length_insertions2, length_deletions2)
          ) {
            diffs.splice(
              equalities[equalitiesLength - 1],
              0,
              new Diff(DIFF_DELETE, lastEquality),
            );
            diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
            equalitiesLength--;
            equalitiesLength--;
            pointer =
              equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
            length_insertions1 = 0;
            length_deletions1 = 0;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastEquality = null;
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        diff_cleanupMerge(diffs);
      }
      diff_cleanupSemanticLossless(diffs);
      pointer = 1;
      while (pointer < diffs.length) {
        if (
          diffs[pointer - 1][0] == DIFF_DELETE &&
          diffs[pointer][0] == DIFF_INSERT
        ) {
          var deletion = diffs[pointer - 1][1];
          var insertion = diffs[pointer][1];
          var overlap_length1 = diff_commonOverlap_(deletion, insertion);
          var overlap_length2 = diff_commonOverlap_(insertion, deletion);
          if (overlap_length1 >= overlap_length2) {
            if (
              overlap_length1 >= deletion.length / 2 ||
              overlap_length1 >= insertion.length / 2
            ) {
              diffs.splice(
                pointer,
                0,
                new Diff(DIFF_EQUAL, insertion.substring(0, overlap_length1)),
              );
              diffs[pointer - 1][1] = deletion.substring(
                0,
                deletion.length - overlap_length1,
              );
              diffs[pointer + 1][1] = insertion.substring(overlap_length1);
              pointer++;
            }
          } else {
            if (
              overlap_length2 >= deletion.length / 2 ||
              overlap_length2 >= insertion.length / 2
            ) {
              diffs.splice(
                pointer,
                0,
                new Diff(DIFF_EQUAL, deletion.substring(0, overlap_length2)),
              );
              diffs[pointer - 1][0] = DIFF_INSERT;
              diffs[pointer - 1][1] = insertion.substring(
                0,
                insertion.length - overlap_length2,
              );
              diffs[pointer + 1][0] = DIFF_DELETE;
              diffs[pointer + 1][1] = deletion.substring(overlap_length2);
              pointer++;
            }
          }
          pointer++;
        }
        pointer++;
      }
    };
    exports5.cleanupSemantic = diff_cleanupSemantic;
    var diff_cleanupSemanticLossless = function (diffs) {
      function diff_cleanupSemanticScore_(one, two) {
        if (!one || !two) {
          return 6;
        }
        var char1 = one.charAt(one.length - 1);
        var char2 = two.charAt(0);
        var nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_);
        var nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_);
        var whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_);
        var whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_);
        var lineBreak1 = whitespace1 && char1.match(linebreakRegex_);
        var lineBreak2 = whitespace2 && char2.match(linebreakRegex_);
        var blankLine1 = lineBreak1 && one.match(blanklineEndRegex_);
        var blankLine2 = lineBreak2 && two.match(blanklineStartRegex_);
        if (blankLine1 || blankLine2) {
          return 5;
        } else if (lineBreak1 || lineBreak2) {
          return 4;
        } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
          return 3;
        } else if (whitespace1 || whitespace2) {
          return 2;
        } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
          return 1;
        }
        return 0;
      }
      var pointer = 1;
      while (pointer < diffs.length - 1) {
        if (
          diffs[pointer - 1][0] == DIFF_EQUAL &&
          diffs[pointer + 1][0] == DIFF_EQUAL
        ) {
          var equality1 = diffs[pointer - 1][1];
          var edit = diffs[pointer][1];
          var equality2 = diffs[pointer + 1][1];
          var commonOffset = diff_commonSuffix(equality1, edit);
          if (commonOffset) {
            var commonString = edit.substring(edit.length - commonOffset);
            equality1 = equality1.substring(0, equality1.length - commonOffset);
            edit = commonString + edit.substring(0, edit.length - commonOffset);
            equality2 = commonString + equality2;
          }
          var bestEquality1 = equality1;
          var bestEdit = edit;
          var bestEquality2 = equality2;
          var bestScore =
            diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2);
          while (edit.charAt(0) === equality2.charAt(0)) {
            equality1 += edit.charAt(0);
            edit = edit.substring(1) + equality2.charAt(0);
            equality2 = equality2.substring(1);
            var score =
              diff_cleanupSemanticScore_(equality1, edit) +
              diff_cleanupSemanticScore_(edit, equality2);
            if (score >= bestScore) {
              bestScore = score;
              bestEquality1 = equality1;
              bestEdit = edit;
              bestEquality2 = equality2;
            }
          }
          if (diffs[pointer - 1][1] != bestEquality1) {
            if (bestEquality1) {
              diffs[pointer - 1][1] = bestEquality1;
            } else {
              diffs.splice(pointer - 1, 1);
              pointer--;
            }
            diffs[pointer][1] = bestEdit;
            if (bestEquality2) {
              diffs[pointer + 1][1] = bestEquality2;
            } else {
              diffs.splice(pointer + 1, 1);
              pointer--;
            }
          }
        }
        pointer++;
      }
    };
    var nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
    var whitespaceRegex_ = /\s/;
    var linebreakRegex_ = /[\r\n]/;
    var blanklineEndRegex_ = /\n\r?\n$/;
    var blanklineStartRegex_ = /^\r?\n\r?\n/;
    var diff_cleanupMerge = function (diffs) {
      diffs.push(new Diff(DIFF_EQUAL, ""));
      var pointer = 0;
      var count_delete = 0;
      var count_insert = 0;
      var text_delete = "";
      var text_insert = "";
      var commonlength;
      while (pointer < diffs.length) {
        switch (diffs[pointer][0]) {
          case DIFF_INSERT:
            count_insert++;
            text_insert += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_DELETE:
            count_delete++;
            text_delete += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_EQUAL:
            if (count_delete + count_insert > 1) {
              if (count_delete !== 0 && count_insert !== 0) {
                commonlength = diff_commonPrefix(text_insert, text_delete);
                if (commonlength !== 0) {
                  if (
                    pointer - count_delete - count_insert > 0 &&
                    diffs[pointer - count_delete - count_insert - 1][0] ==
                      DIFF_EQUAL
                  ) {
                    diffs[pointer - count_delete - count_insert - 1][1] +=
                      text_insert.substring(0, commonlength);
                  } else {
                    diffs.splice(
                      0,
                      0,
                      new Diff(
                        DIFF_EQUAL,
                        text_insert.substring(0, commonlength),
                      ),
                    );
                    pointer++;
                  }
                  text_insert = text_insert.substring(commonlength);
                  text_delete = text_delete.substring(commonlength);
                }
                commonlength = diff_commonSuffix(text_insert, text_delete);
                if (commonlength !== 0) {
                  diffs[pointer][1] =
                    text_insert.substring(text_insert.length - commonlength) +
                    diffs[pointer][1];
                  text_insert = text_insert.substring(
                    0,
                    text_insert.length - commonlength,
                  );
                  text_delete = text_delete.substring(
                    0,
                    text_delete.length - commonlength,
                  );
                }
              }
              pointer -= count_delete + count_insert;
              diffs.splice(pointer, count_delete + count_insert);
              if (text_delete.length) {
                diffs.splice(pointer, 0, new Diff(DIFF_DELETE, text_delete));
                pointer++;
              }
              if (text_insert.length) {
                diffs.splice(pointer, 0, new Diff(DIFF_INSERT, text_insert));
                pointer++;
              }
              pointer++;
            } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
              diffs[pointer - 1][1] += diffs[pointer][1];
              diffs.splice(pointer, 1);
            } else {
              pointer++;
            }
            count_insert = 0;
            count_delete = 0;
            text_delete = "";
            text_insert = "";
            break;
        }
      }
      if (diffs[diffs.length - 1][1] === "") {
        diffs.pop();
      }
      var changes = false;
      pointer = 1;
      while (pointer < diffs.length - 1) {
        if (
          diffs[pointer - 1][0] == DIFF_EQUAL &&
          diffs[pointer + 1][0] == DIFF_EQUAL
        ) {
          if (
            diffs[pointer][1].substring(
              diffs[pointer][1].length - diffs[pointer - 1][1].length,
            ) == diffs[pointer - 1][1]
          ) {
            diffs[pointer][1] =
              diffs[pointer - 1][1] +
              diffs[pointer][1].substring(
                0,
                diffs[pointer][1].length - diffs[pointer - 1][1].length,
              );
            diffs[pointer + 1][1] =
              diffs[pointer - 1][1] + diffs[pointer + 1][1];
            diffs.splice(pointer - 1, 1);
            changes = true;
          } else if (
            diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
            diffs[pointer + 1][1]
          ) {
            diffs[pointer - 1][1] += diffs[pointer + 1][1];
            diffs[pointer][1] =
              diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
              diffs[pointer + 1][1];
            diffs.splice(pointer + 1, 1);
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        diff_cleanupMerge(diffs);
      }
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/constants.js
var require_constants = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/constants.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.SIMILAR_MESSAGE = exports5.NO_DIFF_MESSAGE = void 0;
    var NO_DIFF_MESSAGE = "Compared values have no visual difference.";
    exports5.NO_DIFF_MESSAGE = NO_DIFF_MESSAGE;
    var SIMILAR_MESSAGE =
      "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.";
    exports5.SIMILAR_MESSAGE = SIMILAR_MESSAGE;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/diff-sequences-npm-26.6.2-fbf1967570-10c0.zip/node_modules/diff-sequences/build/index.js
var require_build3 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/diff-sequences-npm-26.6.2-fbf1967570-10c0.zip/node_modules/diff-sequences/build/index.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = void 0;
    var pkg = "diff-sequences";
    var NOT_YET_SET = 0;
    var countCommonItemsF = (aIndex, aEnd, bIndex, bEnd, isCommon) => {
      let nCommon = 0;
      while (aIndex < aEnd && bIndex < bEnd && isCommon(aIndex, bIndex)) {
        aIndex += 1;
        bIndex += 1;
        nCommon += 1;
      }
      return nCommon;
    };
    var countCommonItemsR = (aStart, aIndex, bStart, bIndex, isCommon) => {
      let nCommon = 0;
      while (aStart <= aIndex && bStart <= bIndex && isCommon(aIndex, bIndex)) {
        aIndex -= 1;
        bIndex -= 1;
        nCommon += 1;
      }
      return nCommon;
    };
    var extendPathsF = (d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF) => {
      let iF = 0;
      let kF = -d;
      let aFirst = aIndexesF[iF];
      let aIndexPrev1 = aFirst;
      aIndexesF[iF] += countCommonItemsF(
        aFirst + 1,
        aEnd,
        bF + aFirst - kF + 1,
        bEnd,
        isCommon,
      );
      const nF = d < iMaxF ? d : iMaxF;
      for (iF += 1, kF += 2; iF <= nF; iF += 1, kF += 2) {
        if (iF !== d && aIndexPrev1 < aIndexesF[iF]) {
          aFirst = aIndexesF[iF];
        } else {
          aFirst = aIndexPrev1 + 1;
          if (aEnd <= aFirst) {
            return iF - 1;
          }
        }
        aIndexPrev1 = aIndexesF[iF];
        aIndexesF[iF] =
          aFirst +
          countCommonItemsF(
            aFirst + 1,
            aEnd,
            bF + aFirst - kF + 1,
            bEnd,
            isCommon,
          );
      }
      return iMaxF;
    };
    var extendPathsR = (d, aStart, bStart, bR, isCommon, aIndexesR, iMaxR) => {
      let iR = 0;
      let kR = d;
      let aFirst = aIndexesR[iR];
      let aIndexPrev1 = aFirst;
      aIndexesR[iR] -= countCommonItemsR(
        aStart,
        aFirst - 1,
        bStart,
        bR + aFirst - kR - 1,
        isCommon,
      );
      const nR = d < iMaxR ? d : iMaxR;
      for (iR += 1, kR -= 2; iR <= nR; iR += 1, kR -= 2) {
        if (iR !== d && aIndexesR[iR] < aIndexPrev1) {
          aFirst = aIndexesR[iR];
        } else {
          aFirst = aIndexPrev1 - 1;
          if (aFirst < aStart) {
            return iR - 1;
          }
        }
        aIndexPrev1 = aIndexesR[iR];
        aIndexesR[iR] =
          aFirst -
          countCommonItemsR(
            aStart,
            aFirst - 1,
            bStart,
            bR + aFirst - kR - 1,
            isCommon,
          );
      }
      return iMaxR;
    };
    var extendOverlappablePathsF = (
      d,
      aStart,
      aEnd,
      bStart,
      bEnd,
      isCommon,
      aIndexesF,
      iMaxF,
      aIndexesR,
      iMaxR,
      division,
    ) => {
      const bF = bStart - aStart;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      const kMinOverlapF = -baDeltaLength - (d - 1);
      const kMaxOverlapF = -baDeltaLength + (d - 1);
      let aIndexPrev1 = NOT_YET_SET;
      const nF = d < iMaxF ? d : iMaxF;
      for (let iF = 0, kF = -d; iF <= nF; iF += 1, kF += 2) {
        const insert = iF === 0 || (iF !== d && aIndexPrev1 < aIndexesF[iF]);
        const aLastPrev = insert ? aIndexesF[iF] : aIndexPrev1;
        const aFirst = insert ? aLastPrev : aLastPrev + 1;
        const bFirst = bF + aFirst - kF;
        const nCommonF = countCommonItemsF(
          aFirst + 1,
          aEnd,
          bFirst + 1,
          bEnd,
          isCommon,
        );
        const aLast = aFirst + nCommonF;
        aIndexPrev1 = aIndexesF[iF];
        aIndexesF[iF] = aLast;
        if (kMinOverlapF <= kF && kF <= kMaxOverlapF) {
          const iR = (d - 1 - (kF + baDeltaLength)) / 2;
          if (iR <= iMaxR && aIndexesR[iR] - 1 <= aLast) {
            const bLastPrev = bF + aLastPrev - (insert ? kF + 1 : kF - 1);
            const nCommonR = countCommonItemsR(
              aStart,
              aLastPrev,
              bStart,
              bLastPrev,
              isCommon,
            );
            const aIndexPrevFirst = aLastPrev - nCommonR;
            const bIndexPrevFirst = bLastPrev - nCommonR;
            const aEndPreceding = aIndexPrevFirst + 1;
            const bEndPreceding = bIndexPrevFirst + 1;
            division.nChangePreceding = d - 1;
            if (d - 1 === aEndPreceding + bEndPreceding - aStart - bStart) {
              division.aEndPreceding = aStart;
              division.bEndPreceding = bStart;
            } else {
              division.aEndPreceding = aEndPreceding;
              division.bEndPreceding = bEndPreceding;
            }
            division.nCommonPreceding = nCommonR;
            if (nCommonR !== 0) {
              division.aCommonPreceding = aEndPreceding;
              division.bCommonPreceding = bEndPreceding;
            }
            division.nCommonFollowing = nCommonF;
            if (nCommonF !== 0) {
              division.aCommonFollowing = aFirst + 1;
              division.bCommonFollowing = bFirst + 1;
            }
            const aStartFollowing = aLast + 1;
            const bStartFollowing = bFirst + nCommonF + 1;
            division.nChangeFollowing = d - 1;
            if (d - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
              division.aStartFollowing = aEnd;
              division.bStartFollowing = bEnd;
            } else {
              division.aStartFollowing = aStartFollowing;
              division.bStartFollowing = bStartFollowing;
            }
            return true;
          }
        }
      }
      return false;
    };
    var extendOverlappablePathsR = (
      d,
      aStart,
      aEnd,
      bStart,
      bEnd,
      isCommon,
      aIndexesF,
      iMaxF,
      aIndexesR,
      iMaxR,
      division,
    ) => {
      const bR = bEnd - aEnd;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      const kMinOverlapR = baDeltaLength - d;
      const kMaxOverlapR = baDeltaLength + d;
      let aIndexPrev1 = NOT_YET_SET;
      const nR = d < iMaxR ? d : iMaxR;
      for (let iR = 0, kR = d; iR <= nR; iR += 1, kR -= 2) {
        const insert = iR === 0 || (iR !== d && aIndexesR[iR] < aIndexPrev1);
        const aLastPrev = insert ? aIndexesR[iR] : aIndexPrev1;
        const aFirst = insert ? aLastPrev : aLastPrev - 1;
        const bFirst = bR + aFirst - kR;
        const nCommonR = countCommonItemsR(
          aStart,
          aFirst - 1,
          bStart,
          bFirst - 1,
          isCommon,
        );
        const aLast = aFirst - nCommonR;
        aIndexPrev1 = aIndexesR[iR];
        aIndexesR[iR] = aLast;
        if (kMinOverlapR <= kR && kR <= kMaxOverlapR) {
          const iF = (d + (kR - baDeltaLength)) / 2;
          if (iF <= iMaxF && aLast - 1 <= aIndexesF[iF]) {
            const bLast = bFirst - nCommonR;
            division.nChangePreceding = d;
            if (d === aLast + bLast - aStart - bStart) {
              division.aEndPreceding = aStart;
              division.bEndPreceding = bStart;
            } else {
              division.aEndPreceding = aLast;
              division.bEndPreceding = bLast;
            }
            division.nCommonPreceding = nCommonR;
            if (nCommonR !== 0) {
              division.aCommonPreceding = aLast;
              division.bCommonPreceding = bLast;
            }
            division.nChangeFollowing = d - 1;
            if (d === 1) {
              division.nCommonFollowing = 0;
              division.aStartFollowing = aEnd;
              division.bStartFollowing = bEnd;
            } else {
              const bLastPrev = bR + aLastPrev - (insert ? kR - 1 : kR + 1);
              const nCommonF = countCommonItemsF(
                aLastPrev,
                aEnd,
                bLastPrev,
                bEnd,
                isCommon,
              );
              division.nCommonFollowing = nCommonF;
              if (nCommonF !== 0) {
                division.aCommonFollowing = aLastPrev;
                division.bCommonFollowing = bLastPrev;
              }
              const aStartFollowing = aLastPrev + nCommonF;
              const bStartFollowing = bLastPrev + nCommonF;
              if (d - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
                division.aStartFollowing = aEnd;
                division.bStartFollowing = bEnd;
              } else {
                division.aStartFollowing = aStartFollowing;
                division.bStartFollowing = bStartFollowing;
              }
            }
            return true;
          }
        }
      }
      return false;
    };
    var divide = (
      nChange,
      aStart,
      aEnd,
      bStart,
      bEnd,
      isCommon,
      aIndexesF,
      aIndexesR,
      division,
    ) => {
      const bF = bStart - aStart;
      const bR = bEnd - aEnd;
      const aLength = aEnd - aStart;
      const bLength = bEnd - bStart;
      const baDeltaLength = bLength - aLength;
      let iMaxF = aLength;
      let iMaxR = aLength;
      aIndexesF[0] = aStart - 1;
      aIndexesR[0] = aEnd;
      if (baDeltaLength % 2 === 0) {
        const dMin = (nChange || baDeltaLength) / 2;
        const dMax = (aLength + bLength) / 2;
        for (let d = 1; d <= dMax; d += 1) {
          iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
          if (d < dMin) {
            iMaxR = extendPathsR(
              d,
              aStart,
              bStart,
              bR,
              isCommon,
              aIndexesR,
              iMaxR,
            );
          } else if (
            // If a reverse path overlaps a forward path in the same diagonal,
            // return a division of the index intervals at the middle change.
            extendOverlappablePathsR(
              d,
              aStart,
              aEnd,
              bStart,
              bEnd,
              isCommon,
              aIndexesF,
              iMaxF,
              aIndexesR,
              iMaxR,
              division,
            )
          ) {
            return;
          }
        }
      } else {
        const dMin = ((nChange || baDeltaLength) + 1) / 2;
        const dMax = (aLength + bLength + 1) / 2;
        let d = 1;
        iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
        for (d += 1; d <= dMax; d += 1) {
          iMaxR = extendPathsR(
            d - 1,
            aStart,
            bStart,
            bR,
            isCommon,
            aIndexesR,
            iMaxR,
          );
          if (d < dMin) {
            iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
          } else if (
            // If a forward path overlaps a reverse path in the same diagonal,
            // return a division of the index intervals at the middle change.
            extendOverlappablePathsF(
              d,
              aStart,
              aEnd,
              bStart,
              bEnd,
              isCommon,
              aIndexesF,
              iMaxF,
              aIndexesR,
              iMaxR,
              division,
            )
          ) {
            return;
          }
        }
      }
      throw new Error(
        `${pkg}: no overlap aStart=${aStart} aEnd=${aEnd} bStart=${bStart} bEnd=${bEnd}`,
      );
    };
    var findSubsequences = (
      nChange,
      aStart,
      aEnd,
      bStart,
      bEnd,
      transposed,
      callbacks,
      aIndexesF,
      aIndexesR,
      division,
    ) => {
      if (bEnd - bStart < aEnd - aStart) {
        transposed = !transposed;
        if (transposed && callbacks.length === 1) {
          const { foundSubsequence: foundSubsequence2, isCommon: isCommon2 } =
            callbacks[0];
          callbacks[1] = {
            foundSubsequence: (nCommon, bCommon, aCommon) => {
              foundSubsequence2(nCommon, aCommon, bCommon);
            },
            isCommon: (bIndex, aIndex) => isCommon2(aIndex, bIndex),
          };
        }
        const tStart = aStart;
        const tEnd = aEnd;
        aStart = bStart;
        aEnd = bEnd;
        bStart = tStart;
        bEnd = tEnd;
      }
      const { foundSubsequence, isCommon } = callbacks[transposed ? 1 : 0];
      divide(
        nChange,
        aStart,
        aEnd,
        bStart,
        bEnd,
        isCommon,
        aIndexesF,
        aIndexesR,
        division,
      );
      const {
        nChangePreceding,
        aEndPreceding,
        bEndPreceding,
        nCommonPreceding,
        aCommonPreceding,
        bCommonPreceding,
        nCommonFollowing,
        aCommonFollowing,
        bCommonFollowing,
        nChangeFollowing,
        aStartFollowing,
        bStartFollowing,
      } = division;
      if (aStart < aEndPreceding && bStart < bEndPreceding) {
        findSubsequences(
          nChangePreceding,
          aStart,
          aEndPreceding,
          bStart,
          bEndPreceding,
          transposed,
          callbacks,
          aIndexesF,
          aIndexesR,
          division,
        );
      }
      if (nCommonPreceding !== 0) {
        foundSubsequence(nCommonPreceding, aCommonPreceding, bCommonPreceding);
      }
      if (nCommonFollowing !== 0) {
        foundSubsequence(nCommonFollowing, aCommonFollowing, bCommonFollowing);
      }
      if (aStartFollowing < aEnd && bStartFollowing < bEnd) {
        findSubsequences(
          nChangeFollowing,
          aStartFollowing,
          aEnd,
          bStartFollowing,
          bEnd,
          transposed,
          callbacks,
          aIndexesF,
          aIndexesR,
          division,
        );
      }
    };
    var validateLength = (name, arg) => {
      if (typeof arg !== "number") {
        throw new TypeError(
          `${pkg}: ${name} typeof ${typeof arg} is not a number`,
        );
      }
      if (!Number.isSafeInteger(arg)) {
        throw new RangeError(
          `${pkg}: ${name} value ${arg} is not a safe integer`,
        );
      }
      if (arg < 0) {
        throw new RangeError(
          `${pkg}: ${name} value ${arg} is a negative integer`,
        );
      }
    };
    var validateCallback = (name, arg) => {
      const type = typeof arg;
      if (type !== "function") {
        throw new TypeError(`${pkg}: ${name} typeof ${type} is not a function`);
      }
    };
    var _default = (aLength, bLength, isCommon, foundSubsequence) => {
      validateLength("aLength", aLength);
      validateLength("bLength", bLength);
      validateCallback("isCommon", isCommon);
      validateCallback("foundSubsequence", foundSubsequence);
      const nCommonF = countCommonItemsF(0, aLength, 0, bLength, isCommon);
      if (nCommonF !== 0) {
        foundSubsequence(nCommonF, 0, 0);
      }
      if (aLength !== nCommonF || bLength !== nCommonF) {
        const aStart = nCommonF;
        const bStart = nCommonF;
        const nCommonR = countCommonItemsR(
          aStart,
          aLength - 1,
          bStart,
          bLength - 1,
          isCommon,
        );
        const aEnd = aLength - nCommonR;
        const bEnd = bLength - nCommonR;
        const nCommonFR = nCommonF + nCommonR;
        if (aLength !== nCommonFR && bLength !== nCommonFR) {
          const nChange = 0;
          const transposed = false;
          const callbacks = [
            {
              foundSubsequence,
              isCommon,
            },
          ];
          const aIndexesF = [NOT_YET_SET];
          const aIndexesR = [NOT_YET_SET];
          const division = {
            aCommonFollowing: NOT_YET_SET,
            aCommonPreceding: NOT_YET_SET,
            aEndPreceding: NOT_YET_SET,
            aStartFollowing: NOT_YET_SET,
            bCommonFollowing: NOT_YET_SET,
            bCommonPreceding: NOT_YET_SET,
            bEndPreceding: NOT_YET_SET,
            bStartFollowing: NOT_YET_SET,
            nChangeFollowing: NOT_YET_SET,
            nChangePreceding: NOT_YET_SET,
            nCommonFollowing: NOT_YET_SET,
            nCommonPreceding: NOT_YET_SET,
          };
          findSubsequences(
            nChange,
            aStart,
            aEnd,
            bStart,
            bEnd,
            transposed,
            callbacks,
            aIndexesF,
            aIndexesR,
            division,
          );
        }
        if (nCommonR !== 0) {
          foundSubsequence(nCommonR, aEnd, bEnd);
        }
      }
    };
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/normalizeDiffOptions.js
var require_normalizeDiffOptions = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/normalizeDiffOptions.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.normalizeDiffOptions = exports5.noColor = void 0;
    var _chalk = _interopRequireDefault(require_source());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var noColor = (string) => string;
    exports5.noColor = noColor;
    var DIFF_CONTEXT_DEFAULT = 5;
    var OPTIONS_DEFAULT = {
      aAnnotation: "Expected",
      aColor: _chalk.default.green,
      aIndicator: "-",
      bAnnotation: "Received",
      bColor: _chalk.default.red,
      bIndicator: "+",
      changeColor: _chalk.default.inverse,
      changeLineTrailingSpaceColor: noColor,
      commonColor: _chalk.default.dim,
      commonIndicator: " ",
      commonLineTrailingSpaceColor: noColor,
      contextLines: DIFF_CONTEXT_DEFAULT,
      emptyFirstOrLastLinePlaceholder: "",
      expand: true,
      includeChangeCounts: false,
      omitAnnotationLines: false,
      patchColor: _chalk.default.yellow,
    };
    var getContextLines = (contextLines) =>
      typeof contextLines === "number" &&
      Number.isSafeInteger(contextLines) &&
      contextLines >= 0
        ? contextLines
        : DIFF_CONTEXT_DEFAULT;
    var normalizeDiffOptions = (options = {}) => ({
      ...OPTIONS_DEFAULT,
      ...options,
      contextLines: getContextLines(options.contextLines),
    });
    exports5.normalizeDiffOptions = normalizeDiffOptions;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/diffStrings.js
var require_diffStrings = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/diffStrings.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = void 0;
    var _diffSequences = _interopRequireDefault(require_build3());
    var _cleanupSemantic = require_cleanupSemantic();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var diffStrings = (a, b) => {
      const isCommon = (aIndex2, bIndex2) => a[aIndex2] === b[bIndex2];
      let aIndex = 0;
      let bIndex = 0;
      const diffs = [];
      const foundSubsequence = (nCommon, aCommon, bCommon) => {
        if (aIndex !== aCommon) {
          diffs.push(
            new _cleanupSemantic.Diff(
              _cleanupSemantic.DIFF_DELETE,
              a.slice(aIndex, aCommon),
            ),
          );
        }
        if (bIndex !== bCommon) {
          diffs.push(
            new _cleanupSemantic.Diff(
              _cleanupSemantic.DIFF_INSERT,
              b.slice(bIndex, bCommon),
            ),
          );
        }
        aIndex = aCommon + nCommon;
        bIndex = bCommon + nCommon;
        diffs.push(
          new _cleanupSemantic.Diff(
            _cleanupSemantic.DIFF_EQUAL,
            b.slice(bCommon, bIndex),
          ),
        );
      };
      (0, _diffSequences.default)(
        a.length,
        b.length,
        isCommon,
        foundSubsequence,
      );
      if (aIndex !== a.length) {
        diffs.push(
          new _cleanupSemantic.Diff(
            _cleanupSemantic.DIFF_DELETE,
            a.slice(aIndex),
          ),
        );
      }
      if (bIndex !== b.length) {
        diffs.push(
          new _cleanupSemantic.Diff(
            _cleanupSemantic.DIFF_INSERT,
            b.slice(bIndex),
          ),
        );
      }
      return diffs;
    };
    var _default = diffStrings;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/getAlignedDiffs.js
var require_getAlignedDiffs = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/getAlignedDiffs.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = void 0;
    var _cleanupSemantic = require_cleanupSemantic();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var concatenateRelevantDiffs = (op, diffs, changeColor) =>
      diffs.reduce(
        (reduced, diff) =>
          reduced +
          (diff[0] === _cleanupSemantic.DIFF_EQUAL
            ? diff[1]
            : diff[0] === op && diff[1].length !== 0
              ? changeColor(diff[1])
              : ""),
        "",
      );
    var ChangeBuffer = class {
      // incomplete line
      // complete lines
      constructor(op, changeColor) {
        _defineProperty(this, "op", void 0);
        _defineProperty(this, "line", void 0);
        _defineProperty(this, "lines", void 0);
        _defineProperty(this, "changeColor", void 0);
        this.op = op;
        this.line = [];
        this.lines = [];
        this.changeColor = changeColor;
      }
      pushSubstring(substring) {
        this.pushDiff(new _cleanupSemantic.Diff(this.op, substring));
      }
      pushLine() {
        this.lines.push(
          this.line.length !== 1
            ? new _cleanupSemantic.Diff(
                this.op,
                concatenateRelevantDiffs(this.op, this.line, this.changeColor),
              )
            : this.line[0][0] === this.op
              ? this.line[0]
              : new _cleanupSemantic.Diff(this.op, this.line[0][1]),
          // was common diff
        );
        this.line.length = 0;
      }
      isLineEmpty() {
        return this.line.length === 0;
      }
      // Minor input to buffer.
      pushDiff(diff) {
        this.line.push(diff);
      }
      // Main input to buffer.
      align(diff) {
        const string = diff[1];
        if (string.includes("\n")) {
          const substrings = string.split("\n");
          const iLast = substrings.length - 1;
          substrings.forEach((substring, i) => {
            if (i < iLast) {
              this.pushSubstring(substring);
              this.pushLine();
            } else if (substring.length !== 0) {
              this.pushSubstring(substring);
            }
          });
        } else {
          this.pushDiff(diff);
        }
      }
      // Output from buffer.
      moveLinesTo(lines) {
        if (!this.isLineEmpty()) {
          this.pushLine();
        }
        lines.push(...this.lines);
        this.lines.length = 0;
      }
    };
    var CommonBuffer = class {
      constructor(deleteBuffer, insertBuffer) {
        _defineProperty(this, "deleteBuffer", void 0);
        _defineProperty(this, "insertBuffer", void 0);
        _defineProperty(this, "lines", void 0);
        this.deleteBuffer = deleteBuffer;
        this.insertBuffer = insertBuffer;
        this.lines = [];
      }
      pushDiffCommonLine(diff) {
        this.lines.push(diff);
      }
      pushDiffChangeLines(diff) {
        const isDiffEmpty = diff[1].length === 0;
        if (!isDiffEmpty || this.deleteBuffer.isLineEmpty()) {
          this.deleteBuffer.pushDiff(diff);
        }
        if (!isDiffEmpty || this.insertBuffer.isLineEmpty()) {
          this.insertBuffer.pushDiff(diff);
        }
      }
      flushChangeLines() {
        this.deleteBuffer.moveLinesTo(this.lines);
        this.insertBuffer.moveLinesTo(this.lines);
      }
      // Input to buffer.
      align(diff) {
        const op = diff[0];
        const string = diff[1];
        if (string.includes("\n")) {
          const substrings = string.split("\n");
          const iLast = substrings.length - 1;
          substrings.forEach((substring, i) => {
            if (i === 0) {
              const subdiff = new _cleanupSemantic.Diff(op, substring);
              if (
                this.deleteBuffer.isLineEmpty() &&
                this.insertBuffer.isLineEmpty()
              ) {
                this.flushChangeLines();
                this.pushDiffCommonLine(subdiff);
              } else {
                this.pushDiffChangeLines(subdiff);
                this.flushChangeLines();
              }
            } else if (i < iLast) {
              this.pushDiffCommonLine(new _cleanupSemantic.Diff(op, substring));
            } else if (substring.length !== 0) {
              this.pushDiffChangeLines(
                new _cleanupSemantic.Diff(op, substring),
              );
            }
          });
        } else {
          this.pushDiffChangeLines(diff);
        }
      }
      // Output from buffer.
      getLines() {
        this.flushChangeLines();
        return this.lines;
      }
    };
    var getAlignedDiffs = (diffs, changeColor) => {
      const deleteBuffer = new ChangeBuffer(
        _cleanupSemantic.DIFF_DELETE,
        changeColor,
      );
      const insertBuffer = new ChangeBuffer(
        _cleanupSemantic.DIFF_INSERT,
        changeColor,
      );
      const commonBuffer = new CommonBuffer(deleteBuffer, insertBuffer);
      diffs.forEach((diff) => {
        switch (diff[0]) {
          case _cleanupSemantic.DIFF_DELETE:
            deleteBuffer.align(diff);
            break;
          case _cleanupSemantic.DIFF_INSERT:
            insertBuffer.align(diff);
            break;
          default:
            commonBuffer.align(diff);
        }
      });
      return commonBuffer.getLines();
    };
    var _default = getAlignedDiffs;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/joinAlignedDiffs.js
var require_joinAlignedDiffs = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/joinAlignedDiffs.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.joinAlignedDiffsExpand = exports5.joinAlignedDiffsNoExpand =
      void 0;
    var _cleanupSemantic = require_cleanupSemantic();
    var _printDiffs = require_printDiffs();
    var joinAlignedDiffsNoExpand = (diffs, options) => {
      const iLength = diffs.length;
      const nContextLines = options.contextLines;
      const nContextLines2 = nContextLines + nContextLines;
      let jLength = iLength;
      let hasExcessAtStartOrEnd = false;
      let nExcessesBetweenChanges = 0;
      let i = 0;
      while (i !== iLength) {
        const iStart = i;
        while (i !== iLength && diffs[i][0] === _cleanupSemantic.DIFF_EQUAL) {
          i += 1;
        }
        if (iStart !== i) {
          if (iStart === 0) {
            if (i > nContextLines) {
              jLength -= i - nContextLines;
              hasExcessAtStartOrEnd = true;
            }
          } else if (i === iLength) {
            const n = i - iStart;
            if (n > nContextLines) {
              jLength -= n - nContextLines;
              hasExcessAtStartOrEnd = true;
            }
          } else {
            const n = i - iStart;
            if (n > nContextLines2) {
              jLength -= n - nContextLines2;
              nExcessesBetweenChanges += 1;
            }
          }
        }
        while (i !== iLength && diffs[i][0] !== _cleanupSemantic.DIFF_EQUAL) {
          i += 1;
        }
      }
      const hasPatch = nExcessesBetweenChanges !== 0 || hasExcessAtStartOrEnd;
      if (nExcessesBetweenChanges !== 0) {
        jLength += nExcessesBetweenChanges + 1;
      } else if (hasExcessAtStartOrEnd) {
        jLength += 1;
      }
      const jLast = jLength - 1;
      const lines = [];
      let jPatchMark = 0;
      if (hasPatch) {
        lines.push("");
      }
      let aStart = 0;
      let bStart = 0;
      let aEnd = 0;
      let bEnd = 0;
      const pushCommonLine = (line) => {
        const j = lines.length;
        lines.push(
          (0, _printDiffs.printCommonLine)(
            line,
            j === 0 || j === jLast,
            options,
          ),
        );
        aEnd += 1;
        bEnd += 1;
      };
      const pushDeleteLine = (line) => {
        const j = lines.length;
        lines.push(
          (0, _printDiffs.printDeleteLine)(
            line,
            j === 0 || j === jLast,
            options,
          ),
        );
        aEnd += 1;
      };
      const pushInsertLine = (line) => {
        const j = lines.length;
        lines.push(
          (0, _printDiffs.printInsertLine)(
            line,
            j === 0 || j === jLast,
            options,
          ),
        );
        bEnd += 1;
      };
      i = 0;
      while (i !== iLength) {
        let iStart = i;
        while (i !== iLength && diffs[i][0] === _cleanupSemantic.DIFF_EQUAL) {
          i += 1;
        }
        if (iStart !== i) {
          if (iStart === 0) {
            if (i > nContextLines) {
              iStart = i - nContextLines;
              aStart = iStart;
              bStart = iStart;
              aEnd = aStart;
              bEnd = bStart;
            }
            for (let iCommon = iStart; iCommon !== i; iCommon += 1) {
              pushCommonLine(diffs[iCommon][1]);
            }
          } else if (i === iLength) {
            const iEnd =
              i - iStart > nContextLines ? iStart + nContextLines : i;
            for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1) {
              pushCommonLine(diffs[iCommon][1]);
            }
          } else {
            const nCommon = i - iStart;
            if (nCommon > nContextLines2) {
              const iEnd = iStart + nContextLines;
              for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1) {
                pushCommonLine(diffs[iCommon][1]);
              }
              lines[jPatchMark] = (0, _printDiffs.createPatchMark)(
                aStart,
                aEnd,
                bStart,
                bEnd,
                options,
              );
              jPatchMark = lines.length;
              lines.push("");
              const nOmit = nCommon - nContextLines2;
              aStart = aEnd + nOmit;
              bStart = bEnd + nOmit;
              aEnd = aStart;
              bEnd = bStart;
              for (
                let iCommon = i - nContextLines;
                iCommon !== i;
                iCommon += 1
              ) {
                pushCommonLine(diffs[iCommon][1]);
              }
            } else {
              for (let iCommon = iStart; iCommon !== i; iCommon += 1) {
                pushCommonLine(diffs[iCommon][1]);
              }
            }
          }
        }
        while (i !== iLength && diffs[i][0] === _cleanupSemantic.DIFF_DELETE) {
          pushDeleteLine(diffs[i][1]);
          i += 1;
        }
        while (i !== iLength && diffs[i][0] === _cleanupSemantic.DIFF_INSERT) {
          pushInsertLine(diffs[i][1]);
          i += 1;
        }
      }
      if (hasPatch) {
        lines[jPatchMark] = (0, _printDiffs.createPatchMark)(
          aStart,
          aEnd,
          bStart,
          bEnd,
          options,
        );
      }
      return lines.join("\n");
    };
    exports5.joinAlignedDiffsNoExpand = joinAlignedDiffsNoExpand;
    var joinAlignedDiffsExpand = (diffs, options) =>
      diffs
        .map((diff, i, diffs2) => {
          const line = diff[1];
          const isFirstOrLast = i === 0 || i === diffs2.length - 1;
          switch (diff[0]) {
            case _cleanupSemantic.DIFF_DELETE:
              return (0, _printDiffs.printDeleteLine)(
                line,
                isFirstOrLast,
                options,
              );
            case _cleanupSemantic.DIFF_INSERT:
              return (0, _printDiffs.printInsertLine)(
                line,
                isFirstOrLast,
                options,
              );
            default:
              return (0, _printDiffs.printCommonLine)(
                line,
                isFirstOrLast,
                options,
              );
          }
        })
        .join("\n");
    exports5.joinAlignedDiffsExpand = joinAlignedDiffsExpand;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/printDiffs.js
var require_printDiffs = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/printDiffs.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.diffStringsRaw =
      exports5.diffStringsUnified =
      exports5.createPatchMark =
      exports5.printDiffLines =
      exports5.printAnnotation =
      exports5.countChanges =
      exports5.hasCommonDiff =
      exports5.printCommonLine =
      exports5.printInsertLine =
      exports5.printDeleteLine =
        void 0;
    var _cleanupSemantic = require_cleanupSemantic();
    var _diffLines = require_diffLines();
    var _diffStrings = _interopRequireDefault(require_diffStrings());
    var _getAlignedDiffs = _interopRequireDefault(require_getAlignedDiffs());
    var _joinAlignedDiffs = require_joinAlignedDiffs();
    var _normalizeDiffOptions = require_normalizeDiffOptions();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var formatTrailingSpaces = (line, trailingSpaceFormatter) =>
      line.replace(/\s+$/, (match) => trailingSpaceFormatter(match));
    var printDiffLine = (
      line,
      isFirstOrLast,
      color,
      indicator,
      trailingSpaceFormatter,
      emptyFirstOrLastLinePlaceholder,
    ) =>
      line.length !== 0
        ? color(
            indicator +
              " " +
              formatTrailingSpaces(line, trailingSpaceFormatter),
          )
        : indicator !== " "
          ? color(indicator)
          : isFirstOrLast && emptyFirstOrLastLinePlaceholder.length !== 0
            ? color(indicator + " " + emptyFirstOrLastLinePlaceholder)
            : "";
    var printDeleteLine = (
      line,
      isFirstOrLast,
      {
        aColor,
        aIndicator,
        changeLineTrailingSpaceColor,
        emptyFirstOrLastLinePlaceholder,
      },
    ) =>
      printDiffLine(
        line,
        isFirstOrLast,
        aColor,
        aIndicator,
        changeLineTrailingSpaceColor,
        emptyFirstOrLastLinePlaceholder,
      );
    exports5.printDeleteLine = printDeleteLine;
    var printInsertLine = (
      line,
      isFirstOrLast,
      {
        bColor,
        bIndicator,
        changeLineTrailingSpaceColor,
        emptyFirstOrLastLinePlaceholder,
      },
    ) =>
      printDiffLine(
        line,
        isFirstOrLast,
        bColor,
        bIndicator,
        changeLineTrailingSpaceColor,
        emptyFirstOrLastLinePlaceholder,
      );
    exports5.printInsertLine = printInsertLine;
    var printCommonLine = (
      line,
      isFirstOrLast,
      {
        commonColor,
        commonIndicator,
        commonLineTrailingSpaceColor,
        emptyFirstOrLastLinePlaceholder,
      },
    ) =>
      printDiffLine(
        line,
        isFirstOrLast,
        commonColor,
        commonIndicator,
        commonLineTrailingSpaceColor,
        emptyFirstOrLastLinePlaceholder,
      );
    exports5.printCommonLine = printCommonLine;
    var hasCommonDiff = (diffs, isMultiline) => {
      if (isMultiline) {
        const iLast = diffs.length - 1;
        return diffs.some(
          (diff, i) =>
            diff[0] === _cleanupSemantic.DIFF_EQUAL &&
            (i !== iLast || diff[1] !== "\n"),
        );
      }
      return diffs.some((diff) => diff[0] === _cleanupSemantic.DIFF_EQUAL);
    };
    exports5.hasCommonDiff = hasCommonDiff;
    var countChanges = (diffs) => {
      let a = 0;
      let b = 0;
      diffs.forEach((diff) => {
        switch (diff[0]) {
          case _cleanupSemantic.DIFF_DELETE:
            a += 1;
            break;
          case _cleanupSemantic.DIFF_INSERT:
            b += 1;
            break;
        }
      });
      return {
        a,
        b,
      };
    };
    exports5.countChanges = countChanges;
    var printAnnotation = (
      {
        aAnnotation,
        aColor,
        aIndicator,
        bAnnotation,
        bColor,
        bIndicator,
        includeChangeCounts,
        omitAnnotationLines,
      },
      changeCounts,
    ) => {
      if (omitAnnotationLines) {
        return "";
      }
      let aRest = "";
      let bRest = "";
      if (includeChangeCounts) {
        const aCount = String(changeCounts.a);
        const bCount = String(changeCounts.b);
        const baAnnotationLengthDiff = bAnnotation.length - aAnnotation.length;
        const aAnnotationPadding = " ".repeat(
          Math.max(0, baAnnotationLengthDiff),
        );
        const bAnnotationPadding = " ".repeat(
          Math.max(0, -baAnnotationLengthDiff),
        );
        const baCountLengthDiff = bCount.length - aCount.length;
        const aCountPadding = " ".repeat(Math.max(0, baCountLengthDiff));
        const bCountPadding = " ".repeat(Math.max(0, -baCountLengthDiff));
        aRest =
          aAnnotationPadding + "  " + aIndicator + " " + aCountPadding + aCount;
        bRest =
          bAnnotationPadding + "  " + bIndicator + " " + bCountPadding + bCount;
      }
      return (
        aColor(aIndicator + " " + aAnnotation + aRest) +
        "\n" +
        bColor(bIndicator + " " + bAnnotation + bRest) +
        "\n\n"
      );
    };
    exports5.printAnnotation = printAnnotation;
    var printDiffLines = (diffs, options) =>
      printAnnotation(options, countChanges(diffs)) +
      (options.expand
        ? (0, _joinAlignedDiffs.joinAlignedDiffsExpand)(diffs, options)
        : (0, _joinAlignedDiffs.joinAlignedDiffsNoExpand)(diffs, options));
    exports5.printDiffLines = printDiffLines;
    var createPatchMark = (aStart, aEnd, bStart, bEnd, { patchColor }) =>
      patchColor(
        `@@ -${aStart + 1},${aEnd - aStart} +${bStart + 1},${bEnd - bStart} @@`,
      );
    exports5.createPatchMark = createPatchMark;
    var diffStringsUnified = (a, b, options) => {
      if (a !== b && a.length !== 0 && b.length !== 0) {
        const isMultiline = a.includes("\n") || b.includes("\n");
        const diffs = diffStringsRaw(
          isMultiline ? a + "\n" : a,
          isMultiline ? b + "\n" : b,
          true,
          // cleanupSemantic
        );
        if (hasCommonDiff(diffs, isMultiline)) {
          const optionsNormalized = (0,
          _normalizeDiffOptions.normalizeDiffOptions)(options);
          const lines = (0, _getAlignedDiffs.default)(
            diffs,
            optionsNormalized.changeColor,
          );
          return printDiffLines(lines, optionsNormalized);
        }
      }
      return (0, _diffLines.diffLinesUnified)(
        a.split("\n"),
        b.split("\n"),
        options,
      );
    };
    exports5.diffStringsUnified = diffStringsUnified;
    var diffStringsRaw = (a, b, cleanup) => {
      const diffs = (0, _diffStrings.default)(a, b);
      if (cleanup) {
        (0, _cleanupSemantic.cleanupSemantic)(diffs);
      }
      return diffs;
    };
    exports5.diffStringsRaw = diffStringsRaw;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/diffLines.js
var require_diffLines = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/diffLines.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.diffLinesRaw =
      exports5.diffLinesUnified2 =
      exports5.diffLinesUnified =
        void 0;
    var _diffSequences = _interopRequireDefault(require_build3());
    var _cleanupSemantic = require_cleanupSemantic();
    var _normalizeDiffOptions = require_normalizeDiffOptions();
    var _printDiffs = require_printDiffs();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isEmptyString = (lines) => lines.length === 1 && lines[0].length === 0;
    var diffLinesUnified = (aLines, bLines, options) =>
      (0, _printDiffs.printDiffLines)(
        diffLinesRaw(
          isEmptyString(aLines) ? [] : aLines,
          isEmptyString(bLines) ? [] : bLines,
        ),
        (0, _normalizeDiffOptions.normalizeDiffOptions)(options),
      );
    exports5.diffLinesUnified = diffLinesUnified;
    var diffLinesUnified2 = (
      aLinesDisplay,
      bLinesDisplay,
      aLinesCompare,
      bLinesCompare,
      options,
    ) => {
      if (isEmptyString(aLinesDisplay) && isEmptyString(aLinesCompare)) {
        aLinesDisplay = [];
        aLinesCompare = [];
      }
      if (isEmptyString(bLinesDisplay) && isEmptyString(bLinesCompare)) {
        bLinesDisplay = [];
        bLinesCompare = [];
      }
      if (
        aLinesDisplay.length !== aLinesCompare.length ||
        bLinesDisplay.length !== bLinesCompare.length
      ) {
        return diffLinesUnified(aLinesDisplay, bLinesDisplay, options);
      }
      const diffs = diffLinesRaw(aLinesCompare, bLinesCompare);
      let aIndex = 0;
      let bIndex = 0;
      diffs.forEach((diff) => {
        switch (diff[0]) {
          case _cleanupSemantic.DIFF_DELETE:
            diff[1] = aLinesDisplay[aIndex];
            aIndex += 1;
            break;
          case _cleanupSemantic.DIFF_INSERT:
            diff[1] = bLinesDisplay[bIndex];
            bIndex += 1;
            break;
          default:
            diff[1] = bLinesDisplay[bIndex];
            aIndex += 1;
            bIndex += 1;
        }
      });
      return (0, _printDiffs.printDiffLines)(
        diffs,
        (0, _normalizeDiffOptions.normalizeDiffOptions)(options),
      );
    };
    exports5.diffLinesUnified2 = diffLinesUnified2;
    var diffLinesRaw = (aLines, bLines) => {
      const aLength = aLines.length;
      const bLength = bLines.length;
      const isCommon = (aIndex2, bIndex2) =>
        aLines[aIndex2] === bLines[bIndex2];
      const diffs = [];
      let aIndex = 0;
      let bIndex = 0;
      const foundSubsequence = (nCommon, aCommon, bCommon) => {
        for (; aIndex !== aCommon; aIndex += 1) {
          diffs.push(
            new _cleanupSemantic.Diff(
              _cleanupSemantic.DIFF_DELETE,
              aLines[aIndex],
            ),
          );
        }
        for (; bIndex !== bCommon; bIndex += 1) {
          diffs.push(
            new _cleanupSemantic.Diff(
              _cleanupSemantic.DIFF_INSERT,
              bLines[bIndex],
            ),
          );
        }
        for (; nCommon !== 0; nCommon -= 1, aIndex += 1, bIndex += 1) {
          diffs.push(
            new _cleanupSemantic.Diff(
              _cleanupSemantic.DIFF_EQUAL,
              bLines[bIndex],
            ),
          );
        }
      };
      (0, _diffSequences.default)(aLength, bLength, isCommon, foundSubsequence);
      for (; aIndex !== aLength; aIndex += 1) {
        diffs.push(
          new _cleanupSemantic.Diff(
            _cleanupSemantic.DIFF_DELETE,
            aLines[aIndex],
          ),
        );
      }
      for (; bIndex !== bLength; bIndex += 1) {
        diffs.push(
          new _cleanupSemantic.Diff(
            _cleanupSemantic.DIFF_INSERT,
            bLines[bIndex],
          ),
        );
      }
      return diffs;
    };
    exports5.diffLinesRaw = diffLinesRaw;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/index.js
var require_build4 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-diff-npm-26.6.2-06ca2a96ca-10c0.zip/node_modules/jest-diff/build/index.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports5, "DIFF_DELETE", {
      enumerable: true,
      get: function () {
        return _cleanupSemantic.DIFF_DELETE;
      },
    });
    Object.defineProperty(exports5, "DIFF_EQUAL", {
      enumerable: true,
      get: function () {
        return _cleanupSemantic.DIFF_EQUAL;
      },
    });
    Object.defineProperty(exports5, "DIFF_INSERT", {
      enumerable: true,
      get: function () {
        return _cleanupSemantic.DIFF_INSERT;
      },
    });
    Object.defineProperty(exports5, "Diff", {
      enumerable: true,
      get: function () {
        return _cleanupSemantic.Diff;
      },
    });
    Object.defineProperty(exports5, "diffLinesRaw", {
      enumerable: true,
      get: function () {
        return _diffLines.diffLinesRaw;
      },
    });
    Object.defineProperty(exports5, "diffLinesUnified", {
      enumerable: true,
      get: function () {
        return _diffLines.diffLinesUnified;
      },
    });
    Object.defineProperty(exports5, "diffLinesUnified2", {
      enumerable: true,
      get: function () {
        return _diffLines.diffLinesUnified2;
      },
    });
    Object.defineProperty(exports5, "diffStringsRaw", {
      enumerable: true,
      get: function () {
        return _printDiffs.diffStringsRaw;
      },
    });
    Object.defineProperty(exports5, "diffStringsUnified", {
      enumerable: true,
      get: function () {
        return _printDiffs.diffStringsUnified;
      },
    });
    exports5.default = void 0;
    var _chalk = _interopRequireDefault(require_source());
    var _jestGetType = _interopRequireDefault(require_build());
    var _prettyFormat = _interopRequireDefault(require_build2());
    var _cleanupSemantic = require_cleanupSemantic();
    var _constants = require_constants();
    var _diffLines = require_diffLines();
    var _normalizeDiffOptions = require_normalizeDiffOptions();
    var _printDiffs = require_printDiffs();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var getCommonMessage = (message, options) => {
      const { commonColor } = (0, _normalizeDiffOptions.normalizeDiffOptions)(
        options,
      );
      return commonColor(message);
    };
    var {
      AsymmetricMatcher,
      DOMCollection,
      DOMElement,
      Immutable,
      ReactElement,
      ReactTestComponent,
    } = _prettyFormat.default.plugins;
    var PLUGINS = [
      ReactTestComponent,
      ReactElement,
      DOMElement,
      DOMCollection,
      Immutable,
      AsymmetricMatcher,
    ];
    var FORMAT_OPTIONS = {
      plugins: PLUGINS,
    };
    var FORMAT_OPTIONS_0 = { ...FORMAT_OPTIONS, indent: 0 };
    var FALLBACK_FORMAT_OPTIONS = {
      callToJSON: false,
      maxDepth: 10,
      plugins: PLUGINS,
    };
    var FALLBACK_FORMAT_OPTIONS_0 = { ...FALLBACK_FORMAT_OPTIONS, indent: 0 };
    function diff(a, b, options) {
      if (Object.is(a, b)) {
        return getCommonMessage(_constants.NO_DIFF_MESSAGE, options);
      }
      const aType = (0, _jestGetType.default)(a);
      let expectedType = aType;
      let omitDifference = false;
      if (aType === "object" && typeof a.asymmetricMatch === "function") {
        if (a.$$typeof !== Symbol2.for("jest.asymmetricMatcher")) {
          return null;
        }
        if (typeof a.getExpectedType !== "function") {
          return null;
        }
        expectedType = a.getExpectedType();
        omitDifference = expectedType === "string";
      }
      if (expectedType !== (0, _jestGetType.default)(b)) {
        return `  Comparing two different types of values. Expected ${_chalk.default.green(expectedType)} but received ${_chalk.default.red((0, _jestGetType.default)(b))}.`;
      }
      if (omitDifference) {
        return null;
      }
      switch (aType) {
        case "string":
          return (0, _diffLines.diffLinesUnified)(
            a.split("\n"),
            b.split("\n"),
            options,
          );
        case "boolean":
        case "number":
          return comparePrimitive(a, b, options);
        case "map":
          return compareObjects(sortMap(a), sortMap(b), options);
        case "set":
          return compareObjects(sortSet(a), sortSet(b), options);
        default:
          return compareObjects(a, b, options);
      }
    }
    function comparePrimitive(a, b, options) {
      const aFormat = (0, _prettyFormat.default)(a, FORMAT_OPTIONS);
      const bFormat = (0, _prettyFormat.default)(b, FORMAT_OPTIONS);
      return aFormat === bFormat
        ? getCommonMessage(_constants.NO_DIFF_MESSAGE, options)
        : (0, _diffLines.diffLinesUnified)(
            aFormat.split("\n"),
            bFormat.split("\n"),
            options,
          );
    }
    function sortMap(map) {
      return new Map(Array.from(map.entries()).sort());
    }
    function sortSet(set) {
      return new Set(Array.from(set.values()).sort());
    }
    function compareObjects(a, b, options) {
      let difference;
      let hasThrown = false;
      const noDiffMessage = getCommonMessage(
        _constants.NO_DIFF_MESSAGE,
        options,
      );
      try {
        const aCompare = (0, _prettyFormat.default)(a, FORMAT_OPTIONS_0);
        const bCompare = (0, _prettyFormat.default)(b, FORMAT_OPTIONS_0);
        if (aCompare === bCompare) {
          difference = noDiffMessage;
        } else {
          const aDisplay = (0, _prettyFormat.default)(a, FORMAT_OPTIONS);
          const bDisplay = (0, _prettyFormat.default)(b, FORMAT_OPTIONS);
          difference = (0, _diffLines.diffLinesUnified2)(
            aDisplay.split("\n"),
            bDisplay.split("\n"),
            aCompare.split("\n"),
            bCompare.split("\n"),
            options,
          );
        }
      } catch {
        hasThrown = true;
      }
      if (difference === void 0 || difference === noDiffMessage) {
        const aCompare = (0, _prettyFormat.default)(
          a,
          FALLBACK_FORMAT_OPTIONS_0,
        );
        const bCompare = (0, _prettyFormat.default)(
          b,
          FALLBACK_FORMAT_OPTIONS_0,
        );
        if (aCompare === bCompare) {
          difference = noDiffMessage;
        } else {
          const aDisplay = (0, _prettyFormat.default)(
            a,
            FALLBACK_FORMAT_OPTIONS,
          );
          const bDisplay = (0, _prettyFormat.default)(
            b,
            FALLBACK_FORMAT_OPTIONS,
          );
          difference = (0, _diffLines.diffLinesUnified2)(
            aDisplay.split("\n"),
            bDisplay.split("\n"),
            aCompare.split("\n"),
            bCompare.split("\n"),
            options,
          );
        }
        if (difference !== noDiffMessage && !hasThrown) {
          difference =
            getCommonMessage(_constants.SIMILAR_MESSAGE, options) +
            "\n\n" +
            difference;
        }
      }
      return difference;
    }
    var _default = diff;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-matcher-utils-npm-26.6.2-90bcfd468b-10c0.zip/node_modules/jest-matcher-utils/build/Replaceable.js
var require_Replaceable = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-matcher-utils-npm-26.6.2-90bcfd468b-10c0.zip/node_modules/jest-matcher-utils/build/Replaceable.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = void 0;
    var _jestGetType = _interopRequireDefault(require_build());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var supportTypes = ["map", "array", "object"];
    var Replaceable = class {
      constructor(object) {
        _defineProperty(this, "object", void 0);
        _defineProperty(this, "type", void 0);
        this.object = object;
        this.type = (0, _jestGetType.default)(object);
        if (!supportTypes.includes(this.type)) {
          throw new Error(`Type ${this.type} is not support in Replaceable!`);
        }
      }
      static isReplaceable(obj1, obj2) {
        const obj1Type = (0, _jestGetType.default)(obj1);
        const obj2Type = (0, _jestGetType.default)(obj2);
        return obj1Type === obj2Type && supportTypes.includes(obj1Type);
      }
      forEach(cb) {
        if (this.type === "object") {
          const descriptors = Object.getOwnPropertyDescriptors(this.object);
          [
            ...Object.keys(descriptors),
            ...Object.getOwnPropertySymbols(descriptors),
          ]
            .filter((key) => descriptors[key].enumerable)
            .forEach((key) => {
              cb(this.object[key], key, this.object);
            });
        } else {
          this.object.forEach(cb);
        }
      }
      get(key) {
        if (this.type === "map") {
          return this.object.get(key);
        }
        return this.object[key];
      }
      set(key, value) {
        if (this.type === "map") {
          this.object.set(key, value);
        } else {
          this.object[key] = value;
        }
      }
    };
    exports5.default = Replaceable;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-matcher-utils-npm-26.6.2-90bcfd468b-10c0.zip/node_modules/jest-matcher-utils/build/deepCyclicCopyReplaceable.js
var require_deepCyclicCopyReplaceable = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-matcher-utils-npm-26.6.2-90bcfd468b-10c0.zip/node_modules/jest-matcher-utils/build/deepCyclicCopyReplaceable.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = deepCyclicCopyReplaceable;
    var _prettyFormat = require_build2();
    var builtInObject = [
      Array,
      Buffer2,
      Date,
      Float32Array,
      Float64Array,
      Int16Array,
      Int32Array,
      Int8Array,
      Map,
      Set,
      RegExp,
      Uint16Array,
      Uint32Array,
      Uint8Array,
      Uint8ClampedArray,
    ];
    var isBuiltInObject = (object) =>
      builtInObject.includes(object.constructor);
    var isMap = (value) => value.constructor === Map;
    function deepCyclicCopyReplaceable(
      value,
      cycles = /* @__PURE__ */ new WeakMap(),
    ) {
      if (typeof value !== "object" || value === null) {
        return value;
      } else if (cycles.has(value)) {
        return cycles.get(value);
      } else if (Array.isArray(value)) {
        return deepCyclicCopyArray(value, cycles);
      } else if (isMap(value)) {
        return deepCyclicCopyMap(value, cycles);
      } else if (isBuiltInObject(value)) {
        return value;
      } else if (_prettyFormat.plugins.DOMElement.test(value)) {
        return value.cloneNode(true);
      } else {
        return deepCyclicCopyObject(value, cycles);
      }
    }
    function deepCyclicCopyObject(object, cycles) {
      const newObject = Object.create(Object.getPrototypeOf(object));
      const descriptors = Object.getOwnPropertyDescriptors(object);
      cycles.set(object, newObject);
      const newDescriptors = [
        ...Object.keys(descriptors),
        ...Object.getOwnPropertySymbols(descriptors),
      ].reduce(
        //@ts-expect-error because typescript do not support symbol key in object
        //https://github.com/microsoft/TypeScript/issues/1863
        (newDescriptors2, key) => {
          const enumerable = descriptors[key].enumerable;
          newDescriptors2[key] = {
            configurable: true,
            enumerable,
            value: deepCyclicCopyReplaceable(
              // this accesses the value or getter, depending. We just care about the value anyways, and this allows us to not mess with accessors
              // it has the side effect of invoking the getter here though, rather than copying it over
              object[key],
              cycles,
            ),
            writable: true,
          };
          return newDescriptors2;
        },
        {},
      );
      return Object.defineProperties(newObject, newDescriptors);
    }
    function deepCyclicCopyArray(array, cycles) {
      const newArray = new (Object.getPrototypeOf(array).constructor)(
        array.length,
      );
      const length = array.length;
      cycles.set(array, newArray);
      for (let i = 0; i < length; i++) {
        newArray[i] = deepCyclicCopyReplaceable(array[i], cycles);
      }
      return newArray;
    }
    function deepCyclicCopyMap(map, cycles) {
      const newMap = /* @__PURE__ */ new Map();
      cycles.set(map, newMap);
      map.forEach((value, key) => {
        newMap.set(key, deepCyclicCopyReplaceable(value, cycles));
      });
      return newMap;
    }
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-matcher-utils-npm-26.6.2-90bcfd468b-10c0.zip/node_modules/jest-matcher-utils/build/index.js
var require_build5 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-matcher-utils-npm-26.6.2-90bcfd468b-10c0.zip/node_modules/jest-matcher-utils/build/index.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.matcherHint =
      exports5.matcherErrorMessage =
      exports5.getLabelPrinter =
      exports5.pluralize =
      exports5.diff =
      exports5.printDiffOrStringify =
      exports5.ensureExpectedIsNonNegativeInteger =
      exports5.ensureNumbers =
      exports5.ensureExpectedIsNumber =
      exports5.ensureActualIsNumber =
      exports5.ensureNoExpected =
      exports5.printWithType =
      exports5.printExpected =
      exports5.printReceived =
      exports5.highlightTrailingWhitespace =
      exports5.stringify =
      exports5.SUGGEST_TO_CONTAIN_EQUAL =
      exports5.DIM_COLOR =
      exports5.BOLD_WEIGHT =
      exports5.INVERTED_COLOR =
      exports5.RECEIVED_COLOR =
      exports5.EXPECTED_COLOR =
        void 0;
    var _chalk = _interopRequireDefault(require_source());
    var _jestDiff = _interopRequireWildcard(require_build4());
    var _jestGetType = _interopRequireDefault(require_build());
    var _prettyFormat = _interopRequireDefault(require_build2());
    var _Replaceable = _interopRequireDefault(require_Replaceable());
    var _deepCyclicCopyReplaceable = _interopRequireDefault(
      require_deepCyclicCopyReplaceable(),
    );
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function () {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var {
      AsymmetricMatcher,
      DOMCollection,
      DOMElement,
      Immutable,
      ReactElement,
      ReactTestComponent,
    } = _prettyFormat.default.plugins;
    var PLUGINS = [
      ReactTestComponent,
      ReactElement,
      DOMElement,
      DOMCollection,
      Immutable,
      AsymmetricMatcher,
    ];
    var EXPECTED_COLOR = _chalk.default.green;
    exports5.EXPECTED_COLOR = EXPECTED_COLOR;
    var RECEIVED_COLOR = _chalk.default.red;
    exports5.RECEIVED_COLOR = RECEIVED_COLOR;
    var INVERTED_COLOR = _chalk.default.inverse;
    exports5.INVERTED_COLOR = INVERTED_COLOR;
    var BOLD_WEIGHT = _chalk.default.bold;
    exports5.BOLD_WEIGHT = BOLD_WEIGHT;
    var DIM_COLOR = _chalk.default.dim;
    exports5.DIM_COLOR = DIM_COLOR;
    var MULTILINE_REGEXP = /\n/;
    var SPACE_SYMBOL = "\xB7";
    var NUMBERS = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
    ];
    var SUGGEST_TO_CONTAIN_EQUAL = _chalk.default.dim(
      "Looks like you wanted to test for object/array equality with the stricter `toContain` matcher. You probably need to use `toContainEqual` instead.",
    );
    exports5.SUGGEST_TO_CONTAIN_EQUAL = SUGGEST_TO_CONTAIN_EQUAL;
    var stringify = (object, maxDepth = 10) => {
      const MAX_LENGTH = 1e4;
      let result;
      try {
        result = (0, _prettyFormat.default)(object, {
          maxDepth,
          min: true,
          plugins: PLUGINS,
        });
      } catch {
        result = (0, _prettyFormat.default)(object, {
          callToJSON: false,
          maxDepth,
          min: true,
          plugins: PLUGINS,
        });
      }
      return result.length >= MAX_LENGTH && maxDepth > 1
        ? stringify(object, Math.floor(maxDepth / 2))
        : result;
    };
    exports5.stringify = stringify;
    var highlightTrailingWhitespace = (text) =>
      text.replace(/\s+$/gm, _chalk.default.inverse("$&"));
    exports5.highlightTrailingWhitespace = highlightTrailingWhitespace;
    var replaceTrailingSpaces = (text) =>
      text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL.repeat(spaces.length));
    var printReceived = (object) =>
      RECEIVED_COLOR(replaceTrailingSpaces(stringify(object)));
    exports5.printReceived = printReceived;
    var printExpected = (value) =>
      EXPECTED_COLOR(replaceTrailingSpaces(stringify(value)));
    exports5.printExpected = printExpected;
    var printWithType = (name, value, print) => {
      const type = (0, _jestGetType.default)(value);
      const hasType =
        type !== "null" && type !== "undefined"
          ? `${name} has type:  ${type}
`
          : "";
      const hasValue = `${name} has value: ${print(value)}`;
      return hasType + hasValue;
    };
    exports5.printWithType = printWithType;
    var ensureNoExpected = (expected, matcherName, options) => {
      if (typeof expected !== "undefined") {
        const matcherString = (options ? "" : "[.not]") + matcherName;
        throw new Error(
          matcherErrorMessage(
            matcherHint(matcherString, void 0, "", options),
            // Because expected is omitted in hint above,
            // expected is black instead of green in message below.
            "this matcher must not have an expected argument",
            printWithType("Expected", expected, printExpected),
          ),
        );
      }
    };
    exports5.ensureNoExpected = ensureNoExpected;
    var ensureActualIsNumber = (actual, matcherName, options) => {
      if (typeof actual !== "number" && typeof actual !== "bigint") {
        const matcherString = (options ? "" : "[.not]") + matcherName;
        throw new Error(
          matcherErrorMessage(
            matcherHint(matcherString, void 0, void 0, options),
            `${RECEIVED_COLOR("received")} value must be a number or bigint`,
            printWithType("Received", actual, printReceived),
          ),
        );
      }
    };
    exports5.ensureActualIsNumber = ensureActualIsNumber;
    var ensureExpectedIsNumber = (expected, matcherName, options) => {
      if (typeof expected !== "number" && typeof expected !== "bigint") {
        const matcherString = (options ? "" : "[.not]") + matcherName;
        throw new Error(
          matcherErrorMessage(
            matcherHint(matcherString, void 0, void 0, options),
            `${EXPECTED_COLOR("expected")} value must be a number or bigint`,
            printWithType("Expected", expected, printExpected),
          ),
        );
      }
    };
    exports5.ensureExpectedIsNumber = ensureExpectedIsNumber;
    var ensureNumbers = (actual, expected, matcherName, options) => {
      ensureActualIsNumber(actual, matcherName, options);
      ensureExpectedIsNumber(expected, matcherName, options);
    };
    exports5.ensureNumbers = ensureNumbers;
    var ensureExpectedIsNonNegativeInteger = (
      expected,
      matcherName,
      options,
    ) => {
      if (
        typeof expected !== "number" ||
        !Number.isSafeInteger(expected) ||
        expected < 0
      ) {
        const matcherString = (options ? "" : "[.not]") + matcherName;
        throw new Error(
          matcherErrorMessage(
            matcherHint(matcherString, void 0, void 0, options),
            `${EXPECTED_COLOR("expected")} value must be a non-negative integer`,
            printWithType("Expected", expected, printExpected),
          ),
        );
      }
    };
    exports5.ensureExpectedIsNonNegativeInteger =
      ensureExpectedIsNonNegativeInteger;
    var getCommonAndChangedSubstrings = (diffs, op, hasCommonDiff) =>
      diffs.reduce(
        (reduced, diff2) =>
          reduced +
          (diff2[0] === _jestDiff.DIFF_EQUAL
            ? diff2[1]
            : diff2[0] !== op
              ? ""
              : hasCommonDiff
                ? INVERTED_COLOR(diff2[1])
                : diff2[1]),
        "",
      );
    var isLineDiffable = (expected, received) => {
      const expectedType = (0, _jestGetType.default)(expected);
      const receivedType = (0, _jestGetType.default)(received);
      if (expectedType !== receivedType) {
        return false;
      }
      if (_jestGetType.default.isPrimitive(expected)) {
        return (
          typeof expected === "string" &&
          typeof received === "string" &&
          expected.length !== 0 &&
          received.length !== 0 &&
          (MULTILINE_REGEXP.test(expected) || MULTILINE_REGEXP.test(received))
        );
      }
      if (
        expectedType === "date" ||
        expectedType === "function" ||
        expectedType === "regexp"
      ) {
        return false;
      }
      if (expected instanceof Error && received instanceof Error) {
        return false;
      }
      if (
        expectedType === "object" &&
        typeof expected.asymmetricMatch === "function"
      ) {
        return false;
      }
      if (
        receivedType === "object" &&
        typeof received.asymmetricMatch === "function"
      ) {
        return false;
      }
      return true;
    };
    var MAX_DIFF_STRING_LENGTH = 2e4;
    var printDiffOrStringify = (
      expected,
      received,
      expectedLabel,
      receivedLabel,
      expand,
    ) => {
      if (
        typeof expected === "string" &&
        typeof received === "string" &&
        expected.length !== 0 &&
        received.length !== 0 &&
        expected.length <= MAX_DIFF_STRING_LENGTH &&
        received.length <= MAX_DIFF_STRING_LENGTH &&
        expected !== received
      ) {
        if (expected.includes("\n") || received.includes("\n")) {
          return (0, _jestDiff.diffStringsUnified)(expected, received, {
            aAnnotation: expectedLabel,
            bAnnotation: receivedLabel,
            changeLineTrailingSpaceColor: _chalk.default.bgYellow,
            commonLineTrailingSpaceColor: _chalk.default.bgYellow,
            emptyFirstOrLastLinePlaceholder: "\u21B5",
            // U+21B5
            expand,
            includeChangeCounts: true,
          });
        }
        const diffs = (0, _jestDiff.diffStringsRaw)(expected, received, true);
        const hasCommonDiff = diffs.some(
          (diff2) => diff2[0] === _jestDiff.DIFF_EQUAL,
        );
        const printLabel2 = getLabelPrinter(expectedLabel, receivedLabel);
        const expectedLine2 =
          printLabel2(expectedLabel) +
          printExpected(
            getCommonAndChangedSubstrings(
              diffs,
              _jestDiff.DIFF_DELETE,
              hasCommonDiff,
            ),
          );
        const receivedLine2 =
          printLabel2(receivedLabel) +
          printReceived(
            getCommonAndChangedSubstrings(
              diffs,
              _jestDiff.DIFF_INSERT,
              hasCommonDiff,
            ),
          );
        return expectedLine2 + "\n" + receivedLine2;
      }
      if (isLineDiffable(expected, received)) {
        const { replacedExpected, replacedReceived } =
          replaceMatchedToAsymmetricMatcher(
            (0, _deepCyclicCopyReplaceable.default)(expected),
            (0, _deepCyclicCopyReplaceable.default)(received),
            [],
            [],
          );
        const difference = (0, _jestDiff.default)(
          replacedExpected,
          replacedReceived,
          {
            aAnnotation: expectedLabel,
            bAnnotation: receivedLabel,
            expand,
            includeChangeCounts: true,
          },
        );
        if (
          typeof difference === "string" &&
          difference.includes("- " + expectedLabel) &&
          difference.includes("+ " + receivedLabel)
        ) {
          return difference;
        }
      }
      const printLabel = getLabelPrinter(expectedLabel, receivedLabel);
      const expectedLine = printLabel(expectedLabel) + printExpected(expected);
      const receivedLine =
        printLabel(receivedLabel) +
        (stringify(expected) === stringify(received)
          ? "serializes to the same string"
          : printReceived(received));
      return expectedLine + "\n" + receivedLine;
    };
    exports5.printDiffOrStringify = printDiffOrStringify;
    var shouldPrintDiff = (actual, expected) => {
      if (typeof actual === "number" && typeof expected === "number") {
        return false;
      }
      if (typeof actual === "bigint" && typeof expected === "bigint") {
        return false;
      }
      if (typeof actual === "boolean" && typeof expected === "boolean") {
        return false;
      }
      return true;
    };
    function replaceMatchedToAsymmetricMatcher(
      replacedExpected,
      replacedReceived,
      expectedCycles,
      receivedCycles,
    ) {
      if (
        !_Replaceable.default.isReplaceable(replacedExpected, replacedReceived)
      ) {
        return {
          replacedExpected,
          replacedReceived,
        };
      }
      if (
        expectedCycles.includes(replacedExpected) ||
        receivedCycles.includes(replacedReceived)
      ) {
        return {
          replacedExpected,
          replacedReceived,
        };
      }
      expectedCycles.push(replacedExpected);
      receivedCycles.push(replacedReceived);
      const expectedReplaceable = new _Replaceable.default(replacedExpected);
      const receivedReplaceable = new _Replaceable.default(replacedReceived);
      expectedReplaceable.forEach((expectedValue, key) => {
        const receivedValue = receivedReplaceable.get(key);
        if (isAsymmetricMatcher(expectedValue)) {
          if (expectedValue.asymmetricMatch(receivedValue)) {
            receivedReplaceable.set(key, expectedValue);
          }
        } else if (isAsymmetricMatcher(receivedValue)) {
          if (receivedValue.asymmetricMatch(expectedValue)) {
            expectedReplaceable.set(key, receivedValue);
          }
        } else if (
          _Replaceable.default.isReplaceable(expectedValue, receivedValue)
        ) {
          const replaced = replaceMatchedToAsymmetricMatcher(
            expectedValue,
            receivedValue,
            expectedCycles,
            receivedCycles,
          );
          expectedReplaceable.set(key, replaced.replacedExpected);
          receivedReplaceable.set(key, replaced.replacedReceived);
        }
      });
      return {
        replacedExpected: expectedReplaceable.object,
        replacedReceived: receivedReplaceable.object,
      };
    }
    function isAsymmetricMatcher(data) {
      const type = (0, _jestGetType.default)(data);
      return type === "object" && typeof data.asymmetricMatch === "function";
    }
    var diff = (a, b, options) =>
      shouldPrintDiff(a, b) ? (0, _jestDiff.default)(a, b, options) : null;
    exports5.diff = diff;
    var pluralize = (word, count) =>
      (NUMBERS[count] || count) + " " + word + (count === 1 ? "" : "s");
    exports5.pluralize = pluralize;
    var getLabelPrinter = (...strings) => {
      const maxLength = strings.reduce(
        (max, string) => (string.length > max ? string.length : max),
        0,
      );
      return (string) => `${string}: ${" ".repeat(maxLength - string.length)}`;
    };
    exports5.getLabelPrinter = getLabelPrinter;
    var matcherErrorMessage = (hint, generic, specific) => `${hint}

${_chalk.default.bold("Matcher error")}: ${generic}${typeof specific === "string" ? "\n\n" + specific : ""}`;
    exports5.matcherErrorMessage = matcherErrorMessage;
    var matcherHint = (
      matcherName,
      received = "received",
      expected = "expected",
      options = {},
    ) => {
      const {
        comment = "",
        expectedColor = EXPECTED_COLOR,
        isDirectExpectCall = false,
        // seems redundant with received === ''
        isNot = false,
        promise = "",
        receivedColor = RECEIVED_COLOR,
        secondArgument = "",
        secondArgumentColor = EXPECTED_COLOR,
      } = options;
      let hint = "";
      let dimString = "expect";
      if (!isDirectExpectCall && received !== "") {
        hint += DIM_COLOR(dimString + "(") + receivedColor(received);
        dimString = ")";
      }
      if (promise !== "") {
        hint += DIM_COLOR(dimString + ".") + promise;
        dimString = "";
      }
      if (isNot) {
        hint += DIM_COLOR(dimString + ".") + "not";
        dimString = "";
      }
      if (matcherName.includes(".")) {
        dimString += matcherName;
      } else {
        hint += DIM_COLOR(dimString + ".") + matcherName;
        dimString = "";
      }
      if (expected === "") {
        dimString += "()";
      } else {
        hint += DIM_COLOR(dimString + "(") + expectedColor(expected);
        if (secondArgument) {
          hint += DIM_COLOR(", ") + secondArgumentColor(secondArgument);
        }
        dimString = ")";
      }
      if (comment !== "") {
        dimString += " // " + comment;
      }
      if (dimString !== "") {
        hint += DIM_COLOR(dimString);
      }
      return hint;
    };
    exports5.matcherHint = matcherHint;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/jasmineUtils.js
var require_jasmineUtils = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/jasmineUtils.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.equals = equals;
    exports5.isA = isA;
    exports5.fnNameFor = fnNameFor;
    exports5.isUndefined = isUndefined2;
    exports5.hasProperty = hasProperty;
    exports5.isImmutableUnorderedKeyed = isImmutableUnorderedKeyed;
    exports5.isImmutableUnorderedSet = isImmutableUnorderedSet;
    function equals(a, b, customTesters, strictCheck) {
      customTesters = customTesters || [];
      return eq(
        a,
        b,
        [],
        [],
        customTesters,
        strictCheck ? hasKey : hasDefinedKey,
      );
    }
    var functionToString = Function.prototype.toString;
    function isAsymmetric(obj) {
      return !!obj && isA("Function", obj.asymmetricMatch);
    }
    function asymmetricMatch(a, b) {
      var asymmetricA = isAsymmetric(a),
        asymmetricB = isAsymmetric(b);
      if (asymmetricA && asymmetricB) {
        return void 0;
      }
      if (asymmetricA) {
        return a.asymmetricMatch(b);
      }
      if (asymmetricB) {
        return b.asymmetricMatch(a);
      }
    }
    function eq(a, b, aStack, bStack, customTesters, hasKey2) {
      var result = true;
      var asymmetricResult = asymmetricMatch(a, b);
      if (asymmetricResult !== void 0) {
        return asymmetricResult;
      }
      for (var i = 0; i < customTesters.length; i++) {
        var customTesterResult = customTesters[i](a, b);
        if (customTesterResult !== void 0) {
          return customTesterResult;
        }
      }
      if (a instanceof Error && b instanceof Error) {
        return a.message == b.message;
      }
      if (Object.is(a, b)) {
        return true;
      }
      if (a === null || b === null) {
        return a === b;
      }
      var className = Object.prototype.toString.call(a);
      if (className != Object.prototype.toString.call(b)) {
        return false;
      }
      switch (className) {
        case "[object Boolean]":
        case "[object String]":
        case "[object Number]":
          if (typeof a !== typeof b) {
            return false;
          } else if (typeof a !== "object" && typeof b !== "object") {
            return Object.is(a, b);
          } else {
            return Object.is(a.valueOf(), b.valueOf());
          }
        case "[object Date]":
          return +a == +b;
        // RegExps are compared by their source patterns and flags.
        case "[object RegExp]":
          return a.source === b.source && a.flags === b.flags;
      }
      if (typeof a !== "object" || typeof b !== "object") {
        return false;
      }
      if (isDomNode(a) && isDomNode(b)) {
        return a.isEqualNode(b);
      }
      var length = aStack.length;
      while (length--) {
        if (aStack[length] === a) {
          return bStack[length] === b;
        } else if (bStack[length] === b) {
          return false;
        }
      }
      aStack.push(a);
      bStack.push(b);
      var size = 0;
      if (className == "[object Array]") {
        size = a.length;
        if (size !== b.length) {
          return false;
        }
        while (size--) {
          result = eq(a[size], b[size], aStack, bStack, customTesters, hasKey2);
          if (!result) {
            return false;
          }
        }
      }
      var aKeys = keys(a, className == "[object Array]", hasKey2),
        key;
      size = aKeys.length;
      if (keys(b, className == "[object Array]", hasKey2).length !== size) {
        return false;
      }
      while (size--) {
        key = aKeys[size];
        result =
          hasKey2(b, key) &&
          eq(a[key], b[key], aStack, bStack, customTesters, hasKey2);
        if (!result) {
          return false;
        }
      }
      aStack.pop();
      bStack.pop();
      return result;
    }
    function keys(obj, isArray2, hasKey2) {
      var allKeys = (function (o) {
        var keys2 = [];
        for (var key in o) {
          if (hasKey2(o, key)) {
            keys2.push(key);
          }
        }
        return keys2.concat(
          Object.getOwnPropertySymbols(o).filter(
            (symbol) => Object.getOwnPropertyDescriptor(o, symbol).enumerable,
          ),
        );
      })(obj);
      if (!isArray2) {
        return allKeys;
      }
      var extraKeys = [];
      if (allKeys.length === 0) {
        return allKeys;
      }
      for (var x = 0; x < allKeys.length; x++) {
        if (typeof allKeys[x] === "symbol" || !allKeys[x].match(/^[0-9]+$/)) {
          extraKeys.push(allKeys[x]);
        }
      }
      return extraKeys;
    }
    function hasDefinedKey(obj, key) {
      return hasKey(obj, key) && obj[key] !== void 0;
    }
    function hasKey(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    function isA(typeName, value) {
      return (
        Object.prototype.toString.apply(value) === "[object " + typeName + "]"
      );
    }
    function isDomNode(obj) {
      return (
        obj !== null &&
        typeof obj === "object" &&
        typeof obj.nodeType === "number" &&
        typeof obj.nodeName === "string" &&
        typeof obj.isEqualNode === "function"
      );
    }
    function fnNameFor(func) {
      if (func.name) {
        return func.name;
      }
      const matches = functionToString
        .call(func)
        .match(/^(?:async)?\s*function\s*\*?\s*([\w$]+)\s*\(/);
      return matches ? matches[1] : "<anonymous>";
    }
    function isUndefined2(obj) {
      return obj === void 0;
    }
    function getPrototype(obj) {
      if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(obj);
      }
      if (obj.constructor.prototype == obj) {
        return null;
      }
      return obj.constructor.prototype;
    }
    function hasProperty(obj, property) {
      if (!obj) {
        return false;
      }
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        return true;
      }
      return hasProperty(getPrototype(obj), property);
    }
    var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
    var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
    var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
    function isImmutableUnorderedKeyed(maybeKeyed) {
      return !!(
        maybeKeyed &&
        maybeKeyed[IS_KEYED_SENTINEL] &&
        !maybeKeyed[IS_ORDERED_SENTINEL]
      );
    }
    function isImmutableUnorderedSet(maybeSet) {
      return !!(
        maybeSet &&
        maybeSet[IS_SET_SENTINEL] &&
        !maybeSet[IS_ORDERED_SENTINEL]
      );
    }
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/utils.js
var require_utils = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/utils.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.emptyObject = emptyObject;
    exports5.isOneline =
      exports5.isError =
      exports5.partition =
      exports5.sparseArrayEquality =
      exports5.typeEquality =
      exports5.subsetEquality =
      exports5.iterableEquality =
      exports5.getObjectSubset =
      exports5.getPath =
        void 0;
    var _jestGetType = require_build();
    var _jasmineUtils = require_jasmineUtils();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var hasPropertyInObject = (object, key) => {
      const shouldTerminate =
        !object || typeof object !== "object" || object === Object.prototype;
      if (shouldTerminate) {
        return false;
      }
      return (
        Object.prototype.hasOwnProperty.call(object, key) ||
        hasPropertyInObject(Object.getPrototypeOf(object), key)
      );
    };
    var getPath = (object, propertyPath) => {
      if (!Array.isArray(propertyPath)) {
        propertyPath = propertyPath.split(".");
      }
      if (propertyPath.length) {
        const lastProp = propertyPath.length === 1;
        const prop = propertyPath[0];
        const newObject = object[prop];
        if (!lastProp && (newObject === null || newObject === void 0)) {
          return {
            hasEndProp: false,
            lastTraversedObject: object,
            traversedPath: [],
          };
        }
        const result = getPath(newObject, propertyPath.slice(1));
        if (result.lastTraversedObject === null) {
          result.lastTraversedObject = object;
        }
        result.traversedPath.unshift(prop);
        if (lastProp) {
          result.hasEndProp =
            newObject !== void 0 ||
            (!(0, _jestGetType.isPrimitive)(object) && prop in object);
          if (!result.hasEndProp) {
            result.traversedPath.shift();
          }
        }
        return result;
      }
      return {
        lastTraversedObject: null,
        traversedPath: [],
        value: object,
      };
    };
    exports5.getPath = getPath;
    var getObjectSubset = (
      object,
      subset,
      seenReferences = /* @__PURE__ */ new WeakMap(),
    ) => {
      if (Array.isArray(object)) {
        if (Array.isArray(subset) && subset.length === object.length) {
          return subset.map((sub, i) => getObjectSubset(object[i], sub));
        }
      } else if (object instanceof Date) {
        return object;
      } else if (isObject2(object) && isObject2(subset)) {
        if (
          (0, _jasmineUtils.equals)(object, subset, [
            iterableEquality,
            subsetEquality,
          ])
        ) {
          return subset;
        }
        const trimmed = {};
        seenReferences.set(object, trimmed);
        Object.keys(object)
          .filter((key) => hasPropertyInObject(subset, key))
          .forEach((key) => {
            trimmed[key] = seenReferences.has(object[key])
              ? seenReferences.get(object[key])
              : getObjectSubset(object[key], subset[key], seenReferences);
          });
        if (Object.keys(trimmed).length > 0) {
          return trimmed;
        }
      }
      return object;
    };
    exports5.getObjectSubset = getObjectSubset;
    var IteratorSymbol = Symbol2.iterator;
    var hasIterator = (object) => !!(object != null && object[IteratorSymbol]);
    var iterableEquality = (a, b, aStack = [], bStack = []) => {
      if (
        typeof a !== "object" ||
        typeof b !== "object" ||
        Array.isArray(a) ||
        Array.isArray(b) ||
        !hasIterator(a) ||
        !hasIterator(b)
      ) {
        return void 0;
      }
      if (a.constructor !== b.constructor) {
        return false;
      }
      let length = aStack.length;
      while (length--) {
        if (aStack[length] === a) {
          return bStack[length] === b;
        }
      }
      aStack.push(a);
      bStack.push(b);
      const iterableEqualityWithStack = (a2, b2) =>
        iterableEquality(a2, b2, [...aStack], [...bStack]);
      if (a.size !== void 0) {
        if (a.size !== b.size) {
          return false;
        } else if (
          (0, _jasmineUtils.isA)("Set", a) ||
          (0, _jasmineUtils.isImmutableUnorderedSet)(a)
        ) {
          let allFound = true;
          for (const aValue of a) {
            if (!b.has(aValue)) {
              let has = false;
              for (const bValue of b) {
                const isEqual = (0, _jasmineUtils.equals)(aValue, bValue, [
                  iterableEqualityWithStack,
                ]);
                if (isEqual === true) {
                  has = true;
                }
              }
              if (has === false) {
                allFound = false;
                break;
              }
            }
          }
          aStack.pop();
          bStack.pop();
          return allFound;
        } else if (
          (0, _jasmineUtils.isA)("Map", a) ||
          (0, _jasmineUtils.isImmutableUnorderedKeyed)(a)
        ) {
          let allFound = true;
          for (const aEntry of a) {
            if (
              !b.has(aEntry[0]) ||
              !(0, _jasmineUtils.equals)(aEntry[1], b.get(aEntry[0]), [
                iterableEqualityWithStack,
              ])
            ) {
              let has = false;
              for (const bEntry of b) {
                const matchedKey = (0, _jasmineUtils.equals)(
                  aEntry[0],
                  bEntry[0],
                  [iterableEqualityWithStack],
                );
                let matchedValue = false;
                if (matchedKey === true) {
                  matchedValue = (0, _jasmineUtils.equals)(
                    aEntry[1],
                    bEntry[1],
                    [iterableEqualityWithStack],
                  );
                }
                if (matchedValue === true) {
                  has = true;
                }
              }
              if (has === false) {
                allFound = false;
                break;
              }
            }
          }
          aStack.pop();
          bStack.pop();
          return allFound;
        }
      }
      const bIterator = b[IteratorSymbol]();
      for (const aValue of a) {
        const nextB = bIterator.next();
        if (
          nextB.done ||
          !(0, _jasmineUtils.equals)(aValue, nextB.value, [
            iterableEqualityWithStack,
          ])
        ) {
          return false;
        }
      }
      if (!bIterator.next().done) {
        return false;
      }
      aStack.pop();
      bStack.pop();
      return true;
    };
    exports5.iterableEquality = iterableEquality;
    var isObject2 = (a) => a !== null && typeof a === "object";
    var isObjectWithKeys = (a) =>
      isObject2(a) &&
      !(a instanceof Error) &&
      !(a instanceof Array) &&
      !(a instanceof Date);
    var subsetEquality = (object, subset) => {
      const subsetEqualityWithContext =
        (seenReferences = /* @__PURE__ */ new WeakMap()) =>
        (object2, subset2) => {
          if (!isObjectWithKeys(subset2)) {
            return void 0;
          }
          return Object.keys(subset2).every((key) => {
            if (isObjectWithKeys(subset2[key])) {
              if (seenReferences.has(subset2[key])) {
                return (0, _jasmineUtils.equals)(object2[key], subset2[key], [
                  iterableEquality,
                ]);
              }
              seenReferences.set(subset2[key], true);
            }
            const result =
              object2 != null &&
              hasPropertyInObject(object2, key) &&
              (0, _jasmineUtils.equals)(object2[key], subset2[key], [
                iterableEquality,
                subsetEqualityWithContext(seenReferences),
              ]);
            seenReferences.delete(subset2[key]);
            return result;
          });
        };
      return subsetEqualityWithContext()(object, subset);
    };
    exports5.subsetEquality = subsetEquality;
    var typeEquality = (a, b) => {
      if (a == null || b == null || a.constructor === b.constructor) {
        return void 0;
      }
      return false;
    };
    exports5.typeEquality = typeEquality;
    var sparseArrayEquality = (a, b) => {
      if (!Array.isArray(a) || !Array.isArray(b)) {
        return void 0;
      }
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      return (
        (0, _jasmineUtils.equals)(
          a,
          b,
          [iterableEquality, typeEquality],
          true,
        ) && (0, _jasmineUtils.equals)(aKeys, bKeys)
      );
    };
    exports5.sparseArrayEquality = sparseArrayEquality;
    var partition = (items, predicate) => {
      const result = [[], []];
      items.forEach((item) => result[predicate(item) ? 0 : 1].push(item));
      return result;
    };
    exports5.partition = partition;
    var isError2 = (value) => {
      switch (Object.prototype.toString.call(value)) {
        case "[object Error]":
          return true;
        case "[object Exception]":
          return true;
        case "[object DOMException]":
          return true;
        default:
          return value instanceof Error;
      }
    };
    exports5.isError = isError2;
    function emptyObject(obj) {
      return obj && typeof obj === "object" ? !Object.keys(obj).length : false;
    }
    var MULTILINE_REGEXP = /[\r\n]/;
    var isOneline = (expected, received) =>
      typeof expected === "string" &&
      typeof received === "string" &&
      (!MULTILINE_REGEXP.test(expected) || !MULTILINE_REGEXP.test(received));
    exports5.isOneline = isOneline;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/asymmetricMatchers.js
var require_asymmetricMatchers = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/asymmetricMatchers.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.stringNotMatching =
      exports5.stringMatching =
      exports5.stringNotContaining =
      exports5.stringContaining =
      exports5.objectNotContaining =
      exports5.objectContaining =
      exports5.arrayNotContaining =
      exports5.arrayContaining =
      exports5.anything =
      exports5.any =
      exports5.AsymmetricMatcher =
        void 0;
    var _jasmineUtils = require_jasmineUtils();
    var _utils = require_utils();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var AsymmetricMatcher = class {
      constructor(sample) {
        _defineProperty(this, "sample", void 0);
        _defineProperty(this, "$$typeof", void 0);
        _defineProperty(this, "inverse", void 0);
        this.$$typeof = Symbol2.for("jest.asymmetricMatcher");
        this.sample = sample;
      }
    };
    exports5.AsymmetricMatcher = AsymmetricMatcher;
    var Any = class extends AsymmetricMatcher {
      constructor(sample) {
        if (typeof sample === "undefined") {
          throw new TypeError(
            "any() expects to be passed a constructor function. Please pass one or use anything() to match any object.",
          );
        }
        super(sample);
      }
      asymmetricMatch(other) {
        if (this.sample == String) {
          return typeof other == "string" || other instanceof String;
        }
        if (this.sample == Number) {
          return typeof other == "number" || other instanceof Number;
        }
        if (this.sample == Function) {
          return typeof other == "function" || other instanceof Function;
        }
        if (this.sample == Object) {
          return typeof other == "object";
        }
        if (this.sample == Boolean) {
          return typeof other == "boolean";
        }
        if (this.sample == BigInt) {
          return typeof other == "bigint";
        }
        if (this.sample == Symbol2) {
          return typeof other == "symbol";
        }
        return other instanceof this.sample;
      }
      toString() {
        return "Any";
      }
      getExpectedType() {
        if (this.sample == String) {
          return "string";
        }
        if (this.sample == Number) {
          return "number";
        }
        if (this.sample == Function) {
          return "function";
        }
        if (this.sample == Object) {
          return "object";
        }
        if (this.sample == Boolean) {
          return "boolean";
        }
        return (0, _jasmineUtils.fnNameFor)(this.sample);
      }
      toAsymmetricMatcher() {
        return "Any<" + (0, _jasmineUtils.fnNameFor)(this.sample) + ">";
      }
    };
    var Anything = class extends AsymmetricMatcher {
      asymmetricMatch(other) {
        return !(0, _jasmineUtils.isUndefined)(other) && other !== null;
      }
      toString() {
        return "Anything";
      }
      // No getExpectedType method, because it matches either null or undefined.
      toAsymmetricMatcher() {
        return "Anything";
      }
    };
    var ArrayContaining = class extends AsymmetricMatcher {
      constructor(sample, inverse = false) {
        super(sample);
        this.inverse = inverse;
      }
      asymmetricMatch(other) {
        if (!Array.isArray(this.sample)) {
          throw new Error(
            `You must provide an array to ${this.toString()}, not '` +
              typeof this.sample +
              "'.",
          );
        }
        const result =
          this.sample.length === 0 ||
          (Array.isArray(other) &&
            this.sample.every((item) =>
              other.some((another) => (0, _jasmineUtils.equals)(item, another)),
            ));
        return this.inverse ? !result : result;
      }
      toString() {
        return `Array${this.inverse ? "Not" : ""}Containing`;
      }
      getExpectedType() {
        return "array";
      }
    };
    var ObjectContaining = class extends AsymmetricMatcher {
      constructor(sample, inverse = false) {
        super(sample);
        this.inverse = inverse;
      }
      asymmetricMatch(other) {
        if (typeof this.sample !== "object") {
          throw new Error(
            `You must provide an object to ${this.toString()}, not '` +
              typeof this.sample +
              "'.",
          );
        }
        if (this.inverse) {
          for (const property in this.sample) {
            if (
              (0, _jasmineUtils.hasProperty)(other, property) &&
              (0, _jasmineUtils.equals)(
                this.sample[property],
                other[property],
              ) &&
              !(0, _utils.emptyObject)(this.sample[property]) &&
              !(0, _utils.emptyObject)(other[property])
            ) {
              return false;
            }
          }
          return true;
        } else {
          for (const property in this.sample) {
            if (
              !(0, _jasmineUtils.hasProperty)(other, property) ||
              !(0, _jasmineUtils.equals)(this.sample[property], other[property])
            ) {
              return false;
            }
          }
          return true;
        }
      }
      toString() {
        return `Object${this.inverse ? "Not" : ""}Containing`;
      }
      getExpectedType() {
        return "object";
      }
    };
    var StringContaining = class extends AsymmetricMatcher {
      constructor(sample, inverse = false) {
        if (!(0, _jasmineUtils.isA)("String", sample)) {
          throw new Error("Expected is not a string");
        }
        super(sample);
        this.inverse = inverse;
      }
      asymmetricMatch(other) {
        const result =
          (0, _jasmineUtils.isA)("String", other) &&
          other.includes(this.sample);
        return this.inverse ? !result : result;
      }
      toString() {
        return `String${this.inverse ? "Not" : ""}Containing`;
      }
      getExpectedType() {
        return "string";
      }
    };
    var StringMatching = class extends AsymmetricMatcher {
      constructor(sample, inverse = false) {
        if (
          !(0, _jasmineUtils.isA)("String", sample) &&
          !(0, _jasmineUtils.isA)("RegExp", sample)
        ) {
          throw new Error("Expected is not a String or a RegExp");
        }
        super(new RegExp(sample));
        this.inverse = inverse;
      }
      asymmetricMatch(other) {
        const result =
          (0, _jasmineUtils.isA)("String", other) && this.sample.test(other);
        return this.inverse ? !result : result;
      }
      toString() {
        return `String${this.inverse ? "Not" : ""}Matching`;
      }
      getExpectedType() {
        return "string";
      }
    };
    var any = (expectedObject) => new Any(expectedObject);
    exports5.any = any;
    var anything = () => new Anything();
    exports5.anything = anything;
    var arrayContaining = (sample) => new ArrayContaining(sample);
    exports5.arrayContaining = arrayContaining;
    var arrayNotContaining = (sample) => new ArrayContaining(sample, true);
    exports5.arrayNotContaining = arrayNotContaining;
    var objectContaining = (sample) => new ObjectContaining(sample);
    exports5.objectContaining = objectContaining;
    var objectNotContaining = (sample) => new ObjectContaining(sample, true);
    exports5.objectNotContaining = objectNotContaining;
    var stringContaining = (expected) => new StringContaining(expected);
    exports5.stringContaining = stringContaining;
    var stringNotContaining = (expected) =>
      new StringContaining(expected, true);
    exports5.stringNotContaining = stringNotContaining;
    var stringMatching = (expected) => new StringMatching(expected);
    exports5.stringMatching = stringMatching;
    var stringNotMatching = (expected) => new StringMatching(expected, true);
    exports5.stringNotMatching = stringNotMatching;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/jestMatchersObject.js
var require_jestMatchersObject = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/jestMatchersObject.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.setMatchers =
      exports5.getMatchers =
      exports5.setState =
      exports5.getState =
      exports5.INTERNAL_MATCHER_FLAG =
        void 0;
    var _asymmetricMatchers = require_asymmetricMatchers();
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var JEST_MATCHERS_OBJECT = Symbol2.for("$$jest-matchers-object");
    var INTERNAL_MATCHER_FLAG = Symbol2.for("$$jest-internal-matcher");
    exports5.INTERNAL_MATCHER_FLAG = INTERNAL_MATCHER_FLAG;
    if (!globalThis.hasOwnProperty(JEST_MATCHERS_OBJECT)) {
      const defaultState = {
        assertionCalls: 0,
        expectedAssertionsNumber: null,
        isExpectingAssertions: false,
        suppressedErrors: [],
        // errors that are not thrown immediately.
      };
      Object.defineProperty(globalThis, JEST_MATCHERS_OBJECT, {
        value: {
          matchers: /* @__PURE__ */ Object.create(null),
          state: defaultState,
        },
      });
    }
    var getState = () => globalThis[JEST_MATCHERS_OBJECT].state;
    exports5.getState = getState;
    var setState = (state) => {
      Object.assign(globalThis[JEST_MATCHERS_OBJECT].state, state);
    };
    exports5.setState = setState;
    var getMatchers = () => globalThis[JEST_MATCHERS_OBJECT].matchers;
    exports5.getMatchers = getMatchers;
    var setMatchers = (matchers, isInternal, expect) => {
      Object.keys(matchers).forEach((key) => {
        const matcher = matchers[key];
        Object.defineProperty(matcher, INTERNAL_MATCHER_FLAG, {
          value: isInternal,
        });
        if (!isInternal) {
          class CustomMatcher extends _asymmetricMatchers.AsymmetricMatcher {
            constructor(inverse = false, ...sample) {
              super(sample);
              this.inverse = inverse;
            }
            asymmetricMatch(other) {
              const { pass } = matcher(other, ...this.sample);
              return this.inverse ? !pass : pass;
            }
            toString() {
              return `${this.inverse ? "not." : ""}${key}`;
            }
            getExpectedType() {
              return "any";
            }
            toAsymmetricMatcher() {
              return `${this.toString()}<${this.sample.map(String).join(", ")}>`;
            }
          }
          expect[key] = (...sample) => new CustomMatcher(false, ...sample);
          if (!expect.not) {
            expect.not = {};
          }
          expect.not[key] = (...sample) => new CustomMatcher(true, ...sample);
        }
      });
      Object.assign(globalThis[JEST_MATCHERS_OBJECT].matchers, matchers);
    };
    exports5.setMatchers = setMatchers;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/extractExpectedAssertionsErrors.js
var require_extractExpectedAssertionsErrors = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/extractExpectedAssertionsErrors.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = void 0;
    var _jestMatcherUtils = require_build5();
    var _jestMatchersObject = require_jestMatchersObject();
    var resetAssertionsLocalState = () => {
      (0, _jestMatchersObject.setState)({
        assertionCalls: 0,
        expectedAssertionsNumber: null,
        isExpectingAssertions: false,
      });
    };
    var extractExpectedAssertionsErrors = () => {
      const result = [];
      const {
        assertionCalls,
        expectedAssertionsNumber,
        expectedAssertionsNumberError,
        isExpectingAssertions,
        isExpectingAssertionsError,
      } = (0, _jestMatchersObject.getState)();
      resetAssertionsLocalState();
      if (
        typeof expectedAssertionsNumber === "number" &&
        assertionCalls !== expectedAssertionsNumber
      ) {
        const numOfAssertionsExpected = (0, _jestMatcherUtils.EXPECTED_COLOR)(
          (0, _jestMatcherUtils.pluralize)(
            "assertion",
            expectedAssertionsNumber,
          ),
        );
        expectedAssertionsNumberError.message =
          (0, _jestMatcherUtils.matcherHint)(
            ".assertions",
            "",
            String(expectedAssertionsNumber),
            {
              isDirectExpectCall: true,
            },
          ) +
          `

Expected ${numOfAssertionsExpected} to be called but received ` +
          (0, _jestMatcherUtils.RECEIVED_COLOR)(
            (0, _jestMatcherUtils.pluralize)(
              "assertion call",
              assertionCalls || 0,
            ),
          ) +
          ".";
        result.push({
          actual: assertionCalls.toString(),
          error: expectedAssertionsNumberError,
          expected: expectedAssertionsNumber.toString(),
        });
      }
      if (isExpectingAssertions && assertionCalls === 0) {
        const expected = (0, _jestMatcherUtils.EXPECTED_COLOR)(
          "at least one assertion",
        );
        const received = (0, _jestMatcherUtils.RECEIVED_COLOR)("received none");
        isExpectingAssertionsError.message =
          (0, _jestMatcherUtils.matcherHint)(".hasAssertions", "", "", {
            isDirectExpectCall: true,
          }) +
          `

Expected ${expected} to be called but ${received}.`;
        result.push({
          actual: "none",
          error: isExpectingAssertionsError,
          expected: "at least one",
        });
      }
      return result;
    };
    var _default = extractExpectedAssertionsErrors;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/print.js
var require_print = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/print.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.printReceivedConstructorNameNot =
      exports5.printReceivedConstructorName =
      exports5.printExpectedConstructorNameNot =
      exports5.printExpectedConstructorName =
      exports5.printCloseTo =
      exports5.printReceivedArrayContainExpectedItem =
      exports5.printReceivedStringContainExpectedResult =
      exports5.printReceivedStringContainExpectedSubstring =
        void 0;
    var _jestMatcherUtils = require_build5();
    var printSubstring = (val) => val.replace(/"|\\/g, "\\$&");
    var printReceivedStringContainExpectedSubstring = (
      received,
      start,
      length,
    ) =>
      (0, _jestMatcherUtils.RECEIVED_COLOR)(
        '"' +
          printSubstring(received.slice(0, start)) +
          (0, _jestMatcherUtils.INVERTED_COLOR)(
            printSubstring(received.slice(start, start + length)),
          ) +
          printSubstring(received.slice(start + length)) +
          '"',
      );
    exports5.printReceivedStringContainExpectedSubstring =
      printReceivedStringContainExpectedSubstring;
    var printReceivedStringContainExpectedResult = (received, result) =>
      result === null
        ? (0, _jestMatcherUtils.printReceived)(received)
        : printReceivedStringContainExpectedSubstring(
            received,
            result.index,
            result[0].length,
          );
    exports5.printReceivedStringContainExpectedResult =
      printReceivedStringContainExpectedResult;
    var printReceivedArrayContainExpectedItem = (received, index) =>
      (0, _jestMatcherUtils.RECEIVED_COLOR)(
        "[" +
          received
            .map((item, i) => {
              const stringified = (0, _jestMatcherUtils.stringify)(item);
              return i === index
                ? (0, _jestMatcherUtils.INVERTED_COLOR)(stringified)
                : stringified;
            })
            .join(", ") +
          "]",
      );
    exports5.printReceivedArrayContainExpectedItem =
      printReceivedArrayContainExpectedItem;
    var printCloseTo = (receivedDiff, expectedDiff, precision, isNot) => {
      const receivedDiffString = (0, _jestMatcherUtils.stringify)(receivedDiff);
      const expectedDiffString = receivedDiffString.includes("e")
        ? expectedDiff.toExponential(0)
        : 0 <= precision && precision < 20
          ? // It may be a value between 0 and 20 inclusive.
            // Implementations may optionally support a larger range of values.
            expectedDiff.toFixed(precision + 1)
          : (0, _jestMatcherUtils.stringify)(expectedDiff);
      return `Expected precision:  ${isNot ? "    " : ""}  ${(0, _jestMatcherUtils.stringify)(precision)}
Expected difference: ${isNot ? "not " : ""}< ${(0, _jestMatcherUtils.EXPECTED_COLOR)(expectedDiffString)}
Received difference: ${isNot ? "    " : ""}  ${(0, _jestMatcherUtils.RECEIVED_COLOR)(receivedDiffString)}`;
    };
    exports5.printCloseTo = printCloseTo;
    var printExpectedConstructorName = (label, expected) =>
      printConstructorName(label, expected, false, true) + "\n";
    exports5.printExpectedConstructorName = printExpectedConstructorName;
    var printExpectedConstructorNameNot = (label, expected) =>
      printConstructorName(label, expected, true, true) + "\n";
    exports5.printExpectedConstructorNameNot = printExpectedConstructorNameNot;
    var printReceivedConstructorName = (label, received) =>
      printConstructorName(label, received, false, false) + "\n";
    exports5.printReceivedConstructorName = printReceivedConstructorName;
    var printReceivedConstructorNameNot = (label, received, expected) =>
      typeof expected.name === "string" &&
      expected.name.length !== 0 &&
      typeof received.name === "string" &&
      received.name.length !== 0
        ? printConstructorName(label, received, true, false) +
          ` ${Object.getPrototypeOf(received) === expected ? "extends" : "extends \u2026 extends"} ${(0, _jestMatcherUtils.EXPECTED_COLOR)(expected.name)}
`
        : printConstructorName(label, received, false, false) + "\n";
    exports5.printReceivedConstructorNameNot = printReceivedConstructorNameNot;
    var printConstructorName = (label, constructor, isNot, isExpected) =>
      typeof constructor.name !== "string"
        ? `${label} name is not a string`
        : constructor.name.length === 0
          ? `${label} name is an empty string`
          : `${label}: ${!isNot ? "" : isExpected ? "not " : "    "}${isExpected ? (0, _jestMatcherUtils.EXPECTED_COLOR)(constructor.name) : (0, _jestMatcherUtils.RECEIVED_COLOR)(constructor.name)}`;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/matchers.js
var require_matchers = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/matchers.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = void 0;
    var _jestGetType = _interopRequireDefault(require_build());
    var _jestMatcherUtils = require_build5();
    var _jasmineUtils = require_jasmineUtils();
    var _print = require_print();
    var _utils = require_utils();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var EXPECTED_LABEL = "Expected";
    var RECEIVED_LABEL = "Received";
    var EXPECTED_VALUE_LABEL = "Expected value";
    var RECEIVED_VALUE_LABEL = "Received value";
    var isExpand = (expand) => expand !== false;
    var toStrictEqualTesters = [
      _utils.iterableEquality,
      _utils.typeEquality,
      _utils.sparseArrayEquality,
    ];
    var matchers = {
      toBe(received, expected) {
        const matcherName = "toBe";
        const options = {
          comment: "Object.is equality",
          isNot: this.isNot,
          promise: this.promise,
        };
        const pass = Object.is(received, expected);
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              `

Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}`
          : () => {
              const expectedType = (0, _jestGetType.default)(expected);
              let deepEqualityName = null;
              if (expectedType !== "map" && expectedType !== "set") {
                if (
                  (0, _jasmineUtils.equals)(
                    received,
                    expected,
                    toStrictEqualTesters,
                    true,
                  )
                ) {
                  deepEqualityName = "toStrictEqual";
                } else if (
                  (0, _jasmineUtils.equals)(received, expected, [
                    _utils.iterableEquality,
                  ])
                ) {
                  deepEqualityName = "toEqual";
                }
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  void 0,
                  void 0,
                  options,
                ) +
                "\n\n" +
                (deepEqualityName !== null
                  ? (0, _jestMatcherUtils.DIM_COLOR)(
                      `If it should pass with deep equality, replace "${matcherName}" with "${deepEqualityName}"`,
                    ) + "\n\n"
                  : "") +
                (0, _jestMatcherUtils.printDiffOrStringify)(
                  expected,
                  received,
                  EXPECTED_LABEL,
                  RECEIVED_LABEL,
                  isExpand(this.expand),
                )
              );
            };
        return {
          actual: received,
          expected,
          message,
          name: matcherName,
          pass,
        };
      },
      toBeCloseTo(received, expected, precision = 2) {
        const matcherName = "toBeCloseTo";
        const secondArgument = arguments.length === 3 ? "precision" : void 0;
        const isNot = this.isNot;
        const options = {
          isNot,
          promise: this.promise,
          secondArgument,
          secondArgumentColor: (arg) => arg,
        };
        if (typeof expected !== "number") {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
                "expected",
              )} value must be a number`,
              (0, _jestMatcherUtils.printWithType)(
                "Expected",
                expected,
                _jestMatcherUtils.printExpected,
              ),
            ),
          );
        }
        if (typeof received !== "number") {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                "received",
              )} value must be a number`,
              (0, _jestMatcherUtils.printWithType)(
                "Received",
                received,
                _jestMatcherUtils.printReceived,
              ),
            ),
          );
        }
        let pass = false;
        let expectedDiff = 0;
        let receivedDiff = 0;
        if (received === Infinity && expected === Infinity) {
          pass = true;
        } else if (received === -Infinity && expected === -Infinity) {
          pass = true;
        } else {
          expectedDiff = Math.pow(10, -precision) / 2;
          receivedDiff = Math.abs(expected - received);
          pass = receivedDiff < expectedDiff;
        }
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              `

Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
              (receivedDiff === 0
                ? ""
                : `Received:     ${(0, _jestMatcherUtils.printReceived)(
                    received,
                  )}

` + (0, _print.printCloseTo)(receivedDiff, expectedDiff, precision, isNot))
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              `

Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}
Received: ${(0, _jestMatcherUtils.printReceived)(received)}

` +
              (0, _print.printCloseTo)(
                receivedDiff,
                expectedDiff,
                precision,
                isNot,
              );
        return {
          message,
          pass,
        };
      },
      toBeDefined(received, expected) {
        const matcherName = "toBeDefined";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
        const pass = received !== void 0;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(matcherName, void 0, "", options) +
          `

Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;
        return {
          message,
          pass,
        };
      },
      toBeFalsy(received, expected) {
        const matcherName = "toBeFalsy";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
        const pass = !received;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(matcherName, void 0, "", options) +
          `

Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;
        return {
          message,
          pass,
        };
      },
      toBeGreaterThan(received, expected) {
        const matcherName = "toBeGreaterThan";
        const isNot = this.isNot;
        const options = {
          isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNumbers)(
          received,
          expected,
          matcherName,
          options,
        );
        const pass = received > expected;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            void 0,
            void 0,
            options,
          ) +
          `

Expected:${isNot ? " not" : ""} > ${(0, _jestMatcherUtils.printExpected)(
            expected,
          )}
Received:${isNot ? "    " : ""}   ${(0, _jestMatcherUtils.printReceived)(
            received,
          )}`;
        return {
          message,
          pass,
        };
      },
      toBeGreaterThanOrEqual(received, expected) {
        const matcherName = "toBeGreaterThanOrEqual";
        const isNot = this.isNot;
        const options = {
          isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNumbers)(
          received,
          expected,
          matcherName,
          options,
        );
        const pass = received >= expected;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            void 0,
            void 0,
            options,
          ) +
          `

Expected:${isNot ? " not" : ""} >= ${(0, _jestMatcherUtils.printExpected)(expected)}
Received:${isNot ? "    " : ""}    ${(0, _jestMatcherUtils.printReceived)(received)}`;
        return {
          message,
          pass,
        };
      },
      toBeInstanceOf(received, expected) {
        const matcherName = "toBeInstanceOf";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        if (typeof expected !== "function") {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
                "expected",
              )} value must be a function`,
              (0, _jestMatcherUtils.printWithType)(
                "Expected",
                expected,
                _jestMatcherUtils.printExpected,
              ),
            ),
          );
        }
        const pass = received instanceof expected;
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              "\n\n" +
              (0, _print.printExpectedConstructorNameNot)(
                "Expected constructor",
                expected,
              ) +
              (typeof received.constructor === "function" &&
              received.constructor !== expected
                ? (0, _print.printReceivedConstructorNameNot)(
                    "Received constructor",
                    received.constructor,
                    expected,
                  )
                : "")
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              "\n\n" +
              (0, _print.printExpectedConstructorName)(
                "Expected constructor",
                expected,
              ) +
              (_jestGetType.default.isPrimitive(received) ||
              Object.getPrototypeOf(received) === null
                ? `
Received value has no prototype
Received value: ${(0, _jestMatcherUtils.printReceived)(received)}`
                : typeof received.constructor !== "function"
                  ? `
Received value: ${(0, _jestMatcherUtils.printReceived)(received)}`
                  : (0, _print.printReceivedConstructorName)(
                      "Received constructor",
                      received.constructor,
                    ));
        return {
          message,
          pass,
        };
      },
      toBeLessThan(received, expected) {
        const matcherName = "toBeLessThan";
        const isNot = this.isNot;
        const options = {
          isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNumbers)(
          received,
          expected,
          matcherName,
          options,
        );
        const pass = received < expected;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            void 0,
            void 0,
            options,
          ) +
          `

Expected:${isNot ? " not" : ""} < ${(0, _jestMatcherUtils.printExpected)(
            expected,
          )}
Received:${isNot ? "    " : ""}   ${(0, _jestMatcherUtils.printReceived)(
            received,
          )}`;
        return {
          message,
          pass,
        };
      },
      toBeLessThanOrEqual(received, expected) {
        const matcherName = "toBeLessThanOrEqual";
        const isNot = this.isNot;
        const options = {
          isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNumbers)(
          received,
          expected,
          matcherName,
          options,
        );
        const pass = received <= expected;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            void 0,
            void 0,
            options,
          ) +
          `

Expected:${isNot ? " not" : ""} <= ${(0, _jestMatcherUtils.printExpected)(expected)}
Received:${isNot ? "    " : ""}    ${(0, _jestMatcherUtils.printReceived)(received)}`;
        return {
          message,
          pass,
        };
      },
      toBeNaN(received, expected) {
        const matcherName = "toBeNaN";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
        const pass = Number.isNaN(received);
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(matcherName, void 0, "", options) +
          `

Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;
        return {
          message,
          pass,
        };
      },
      toBeNull(received, expected) {
        const matcherName = "toBeNull";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
        const pass = received === null;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(matcherName, void 0, "", options) +
          `

Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;
        return {
          message,
          pass,
        };
      },
      toBeTruthy(received, expected) {
        const matcherName = "toBeTruthy";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
        const pass = !!received;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(matcherName, void 0, "", options) +
          `

Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;
        return {
          message,
          pass,
        };
      },
      toBeUndefined(received, expected) {
        const matcherName = "toBeUndefined";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
        const pass = received === void 0;
        const message = () =>
          (0, _jestMatcherUtils.matcherHint)(matcherName, void 0, "", options) +
          `

Received: ${(0, _jestMatcherUtils.printReceived)(received)}`;
        return {
          message,
          pass,
        };
      },
      toContain(received, expected) {
        const matcherName = "toContain";
        const isNot = this.isNot;
        const options = {
          comment: "indexOf",
          isNot,
          promise: this.promise,
        };
        if (received == null) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                "received",
              )} value must not be null nor undefined`,
              (0, _jestMatcherUtils.printWithType)(
                "Received",
                received,
                _jestMatcherUtils.printReceived,
              ),
            ),
          );
        }
        if (typeof received === "string") {
          const index2 = received.indexOf(String(expected));
          const pass2 = index2 !== -1;
          const message2 = () => {
            const labelExpected = `Expected ${typeof expected === "string" ? "substring" : "value"}`;
            const labelReceived = "Received string";
            const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
              labelExpected,
              labelReceived,
            );
            return (
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              `

${printLabel(labelExpected)}${isNot ? "not " : ""}${(0, _jestMatcherUtils.printExpected)(expected)}
${printLabel(labelReceived)}${isNot ? "    " : ""}${
                isNot
                  ? (0, _print.printReceivedStringContainExpectedSubstring)(
                      received,
                      index2,
                      String(expected).length,
                    )
                  : (0, _jestMatcherUtils.printReceived)(received)
              }`
            );
          };
          return {
            message: message2,
            pass: pass2,
          };
        }
        const indexable = Array.from(received);
        const index = indexable.indexOf(expected);
        const pass = index !== -1;
        const message = () => {
          const labelExpected = "Expected value";
          const labelReceived = `Received ${(0, _jestGetType.default)(received)}`;
          const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
            labelExpected,
            labelReceived,
          );
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            `

${printLabel(labelExpected)}${isNot ? "not " : ""}${(0, _jestMatcherUtils.printExpected)(expected)}
${printLabel(labelReceived)}${isNot ? "    " : ""}${isNot && Array.isArray(received) ? (0, _print.printReceivedArrayContainExpectedItem)(received, index) : (0, _jestMatcherUtils.printReceived)(received)}` +
            (!isNot &&
            indexable.findIndex((item) =>
              (0, _jasmineUtils.equals)(item, expected, [
                _utils.iterableEquality,
              ]),
            ) !== -1
              ? `

${_jestMatcherUtils.SUGGEST_TO_CONTAIN_EQUAL}`
              : "")
          );
        };
        return {
          message,
          pass,
        };
      },
      toContainEqual(received, expected) {
        const matcherName = "toContainEqual";
        const isNot = this.isNot;
        const options = {
          comment: "deep equality",
          isNot,
          promise: this.promise,
        };
        if (received == null) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                "received",
              )} value must not be null nor undefined`,
              (0, _jestMatcherUtils.printWithType)(
                "Received",
                received,
                _jestMatcherUtils.printReceived,
              ),
            ),
          );
        }
        const index = Array.from(received).findIndex((item) =>
          (0, _jasmineUtils.equals)(item, expected, [_utils.iterableEquality]),
        );
        const pass = index !== -1;
        const message = () => {
          const labelExpected = "Expected value";
          const labelReceived = `Received ${(0, _jestGetType.default)(received)}`;
          const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
            labelExpected,
            labelReceived,
          );
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            `

${printLabel(labelExpected)}${isNot ? "not " : ""}${(0, _jestMatcherUtils.printExpected)(expected)}
${printLabel(labelReceived)}${isNot ? "    " : ""}${isNot && Array.isArray(received) ? (0, _print.printReceivedArrayContainExpectedItem)(received, index) : (0, _jestMatcherUtils.printReceived)(received)}`
          );
        };
        return {
          message,
          pass,
        };
      },
      toEqual(received, expected) {
        const matcherName = "toEqual";
        const options = {
          comment: "deep equality",
          isNot: this.isNot,
          promise: this.promise,
        };
        const pass = (0, _jasmineUtils.equals)(received, expected, [
          _utils.iterableEquality,
        ]);
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              `

Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
              ((0, _jestMatcherUtils.stringify)(expected) !==
              (0, _jestMatcherUtils.stringify)(received)
                ? `Received:     ${(0, _jestMatcherUtils.printReceived)(received)}`
                : "")
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              "\n\n" +
              (0, _jestMatcherUtils.printDiffOrStringify)(
                expected,
                received,
                EXPECTED_LABEL,
                RECEIVED_LABEL,
                isExpand(this.expand),
              );
        return {
          actual: received,
          expected,
          message,
          name: matcherName,
          pass,
        };
      },
      toHaveLength(received, expected) {
        const matcherName = "toHaveLength";
        const isNot = this.isNot;
        const options = {
          isNot,
          promise: this.promise,
        };
        if (
          typeof (received === null || received === void 0
            ? void 0
            : received.length) !== "number"
        ) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                "received",
              )} value must have a length property whose value must be a number`,
              (0, _jestMatcherUtils.printWithType)(
                "Received",
                received,
                _jestMatcherUtils.printReceived,
              ),
            ),
          );
        }
        (0, _jestMatcherUtils.ensureExpectedIsNonNegativeInteger)(
          expected,
          matcherName,
          options,
        );
        const pass = received.length === expected;
        const message = () => {
          const labelExpected = "Expected length";
          const labelReceivedLength = "Received length";
          const labelReceivedValue = `Received ${(0, _jestGetType.default)(
            received,
          )}`;
          const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
            labelExpected,
            labelReceivedLength,
            labelReceivedValue,
          );
          return (
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            `

${printLabel(labelExpected)}${isNot ? "not " : ""}${(0, _jestMatcherUtils.printExpected)(expected)}
` +
            (isNot
              ? ""
              : `${printLabel(labelReceivedLength)}${(0, _jestMatcherUtils.printReceived)(received.length)}
`) +
            `${printLabel(labelReceivedValue)}${isNot ? "    " : ""}${(0, _jestMatcherUtils.printReceived)(received)}`
          );
        };
        return {
          message,
          pass,
        };
      },
      toHaveProperty(received, expectedPath, expectedValue) {
        const matcherName = "toHaveProperty";
        const expectedArgument = "path";
        const hasValue = arguments.length === 3;
        const options = {
          isNot: this.isNot,
          promise: this.promise,
          secondArgument: hasValue ? "value" : "",
        };
        if (received === null || received === void 0) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                expectedArgument,
                options,
              ),
              `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                "received",
              )} value must not be null nor undefined`,
              (0, _jestMatcherUtils.printWithType)(
                "Received",
                received,
                _jestMatcherUtils.printReceived,
              ),
            ),
          );
        }
        const expectedPathType = (0, _jestGetType.default)(expectedPath);
        if (expectedPathType !== "string" && expectedPathType !== "array") {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                expectedArgument,
                options,
              ),
              `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
                "expected",
              )} path must be a string or array`,
              (0, _jestMatcherUtils.printWithType)(
                "Expected",
                expectedPath,
                _jestMatcherUtils.printExpected,
              ),
            ),
          );
        }
        const expectedPathLength =
          typeof expectedPath === "string"
            ? expectedPath.split(".").length
            : expectedPath.length;
        if (expectedPathType === "array" && expectedPathLength === 0) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                expectedArgument,
                options,
              ),
              `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
                "expected",
              )} path must not be an empty array`,
              (0, _jestMatcherUtils.printWithType)(
                "Expected",
                expectedPath,
                _jestMatcherUtils.printExpected,
              ),
            ),
          );
        }
        const result = (0, _utils.getPath)(received, expectedPath);
        const { lastTraversedObject, hasEndProp } = result;
        const receivedPath = result.traversedPath;
        const hasCompletePath = receivedPath.length === expectedPathLength;
        const receivedValue = hasCompletePath
          ? result.value
          : lastTraversedObject;
        const pass = hasValue
          ? (0, _jasmineUtils.equals)(result.value, expectedValue, [
              _utils.iterableEquality,
            ])
          : Boolean(hasEndProp);
        if (pass && !hasCompletePath) {
          const message2 = () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              expectedArgument,
              options,
            ) +
            `

Expected path: ${(0, _jestMatcherUtils.printExpected)(expectedPath)}
Received path: ${(0, _jestMatcherUtils.printReceived)(
              expectedPathType === "array" || receivedPath.length === 0
                ? receivedPath
                : receivedPath.join("."),
            )}

Expected value: not ${(0, _jestMatcherUtils.printExpected)(expectedValue)}
Received value:     ${(0, _jestMatcherUtils.printReceived)(receivedValue)}

` +
            (0, _jestMatcherUtils.DIM_COLOR)(
              "Because a positive assertion passes for expected value undefined if the property does not exist, this negative assertion fails unless the property does exist and has a defined value",
            );
          return {
            message: message2,
            pass,
          };
        }
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                expectedArgument,
                options,
              ) +
              "\n\n" +
              (hasValue
                ? `Expected path: ${(0, _jestMatcherUtils.printExpected)(
                    expectedPath,
                  )}

Expected value: not ${(0, _jestMatcherUtils.printExpected)(expectedValue)}` +
                  ((0, _jestMatcherUtils.stringify)(expectedValue) !==
                  (0, _jestMatcherUtils.stringify)(receivedValue)
                    ? `
Received value:     ${(0, _jestMatcherUtils.printReceived)(receivedValue)}`
                    : "")
                : `Expected path: not ${(0, _jestMatcherUtils.printExpected)(
                    expectedPath,
                  )}

Received value: ${(0, _jestMatcherUtils.printReceived)(receivedValue)}`)
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                expectedArgument,
                options,
              ) +
              `

Expected path: ${(0, _jestMatcherUtils.printExpected)(expectedPath)}
` +
              (hasCompletePath
                ? "\n" +
                  (0, _jestMatcherUtils.printDiffOrStringify)(
                    expectedValue,
                    receivedValue,
                    EXPECTED_VALUE_LABEL,
                    RECEIVED_VALUE_LABEL,
                    isExpand(this.expand),
                  )
                : `Received path: ${(0, _jestMatcherUtils.printReceived)(
                    expectedPathType === "array" || receivedPath.length === 0
                      ? receivedPath
                      : receivedPath.join("."),
                  )}

` +
                  (hasValue
                    ? `Expected value: ${(0, _jestMatcherUtils.printExpected)(
                        expectedValue,
                      )}
`
                    : "") +
                  `Received value: ${(0, _jestMatcherUtils.printReceived)(
                    receivedValue,
                  )}`);
        return {
          message,
          pass,
        };
      },
      toMatch(received, expected) {
        const matcherName = "toMatch";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        if (typeof received !== "string") {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                "received",
              )} value must be a string`,
              (0, _jestMatcherUtils.printWithType)(
                "Received",
                received,
                _jestMatcherUtils.printReceived,
              ),
            ),
          );
        }
        if (
          !(typeof expected === "string") &&
          !(expected && typeof expected.test === "function")
        ) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
                "expected",
              )} value must be a string or regular expression`,
              (0, _jestMatcherUtils.printWithType)(
                "Expected",
                expected,
                _jestMatcherUtils.printExpected,
              ),
            ),
          );
        }
        const pass =
          typeof expected === "string"
            ? received.includes(expected)
            : new RegExp(expected).test(received);
        const message = pass
          ? () =>
              typeof expected === "string"
                ? (0, _jestMatcherUtils.matcherHint)(
                    matcherName,
                    void 0,
                    void 0,
                    options,
                  ) +
                  `

Expected substring: not ${(0, _jestMatcherUtils.printExpected)(expected)}
Received string:        ${(0,
                  _print.printReceivedStringContainExpectedSubstring)(
                    received,
                    received.indexOf(expected),
                    expected.length,
                  )}`
                : (0, _jestMatcherUtils.matcherHint)(
                    matcherName,
                    void 0,
                    void 0,
                    options,
                  ) +
                  `

Expected pattern: not ${(0, _jestMatcherUtils.printExpected)(expected)}
Received string:      ${(0, _print.printReceivedStringContainExpectedResult)(
                    received,
                    typeof expected.exec === "function"
                      ? expected.exec(received)
                      : null,
                  )}`
          : () => {
              const labelExpected = `Expected ${typeof expected === "string" ? "substring" : "pattern"}`;
              const labelReceived = "Received string";
              const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
                labelExpected,
                labelReceived,
              );
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  void 0,
                  void 0,
                  options,
                ) +
                `

${printLabel(labelExpected)}${(0, _jestMatcherUtils.printExpected)(expected)}
${printLabel(labelReceived)}${(0, _jestMatcherUtils.printReceived)(received)}`
              );
            };
        return {
          message,
          pass,
        };
      },
      toMatchObject(received, expected) {
        const matcherName = "toMatchObject";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        if (typeof received !== "object" || received === null) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                "received",
              )} value must be a non-null object`,
              (0, _jestMatcherUtils.printWithType)(
                "Received",
                received,
                _jestMatcherUtils.printReceived,
              ),
            ),
          );
        }
        if (typeof expected !== "object" || expected === null) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
                "expected",
              )} value must be a non-null object`,
              (0, _jestMatcherUtils.printWithType)(
                "Expected",
                expected,
                _jestMatcherUtils.printExpected,
              ),
            ),
          );
        }
        const pass = (0, _jasmineUtils.equals)(received, expected, [
          _utils.iterableEquality,
          _utils.subsetEquality,
        ]);
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              `

Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}` +
              ((0, _jestMatcherUtils.stringify)(expected) !==
              (0, _jestMatcherUtils.stringify)(received)
                ? `
Received:     ${(0, _jestMatcherUtils.printReceived)(received)}`
                : "")
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              "\n\n" +
              (0, _jestMatcherUtils.printDiffOrStringify)(
                expected,
                (0, _utils.getObjectSubset)(received, expected),
                EXPECTED_LABEL,
                RECEIVED_LABEL,
                isExpand(this.expand),
              );
        return {
          message,
          pass,
        };
      },
      toStrictEqual(received, expected) {
        const matcherName = "toStrictEqual";
        const options = {
          comment: "deep equality",
          isNot: this.isNot,
          promise: this.promise,
        };
        const pass = (0, _jasmineUtils.equals)(
          received,
          expected,
          toStrictEqualTesters,
          true,
        );
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              `

Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
              ((0, _jestMatcherUtils.stringify)(expected) !==
              (0, _jestMatcherUtils.stringify)(received)
                ? `Received:     ${(0, _jestMatcherUtils.printReceived)(received)}`
                : "")
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ) +
              "\n\n" +
              (0, _jestMatcherUtils.printDiffOrStringify)(
                expected,
                received,
                EXPECTED_LABEL,
                RECEIVED_LABEL,
                isExpand(this.expand),
              );
        return {
          actual: received,
          expected,
          message,
          name: matcherName,
          pass,
        };
      },
    };
    var _default = matchers;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/spyMatchers.js
var require_spyMatchers = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/spyMatchers.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = void 0;
    var _jestGetType = _interopRequireDefault(require_build());
    var _jestMatcherUtils = require_build5();
    var _jasmineUtils = require_jasmineUtils();
    var _utils = require_utils();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isExpand = (expand) => expand !== false;
    var PRINT_LIMIT = 3;
    var NO_ARGUMENTS = "called with 0 arguments";
    var printExpectedArgs = (expected) =>
      expected.length === 0
        ? NO_ARGUMENTS
        : expected
            .map((arg) => (0, _jestMatcherUtils.printExpected)(arg))
            .join(", ");
    var printReceivedArgs = (received, expected) =>
      received.length === 0
        ? NO_ARGUMENTS
        : received
            .map((arg, i) =>
              Array.isArray(expected) &&
              i < expected.length &&
              isEqualValue(expected[i], arg)
                ? printCommon(arg)
                : (0, _jestMatcherUtils.printReceived)(arg),
            )
            .join(", ");
    var printCommon = (val) =>
      (0, _jestMatcherUtils.DIM_COLOR)((0, _jestMatcherUtils.stringify)(val));
    var isEqualValue = (expected, received) =>
      (0, _jasmineUtils.equals)(expected, received, [_utils.iterableEquality]);
    var isEqualCall = (expected, received) => isEqualValue(expected, received);
    var isEqualReturn = (expected, result) =>
      result.type === "return" && isEqualValue(expected, result.value);
    var countReturns = (results) =>
      results.reduce((n, result) => (result.type === "return" ? n + 1 : n), 0);
    var printNumberOfReturns = (countReturns2, countCalls) =>
      `
Number of returns: ${(0, _jestMatcherUtils.printReceived)(countReturns2)}` +
      (countCalls !== countReturns2
        ? `
Number of calls:   ${(0, _jestMatcherUtils.printReceived)(countCalls)}`
        : "");
    var getRightAlignedPrinter = (label) => {
      const index = label.indexOf(":");
      const suffix = label.slice(index);
      return (string, isExpectedCall) =>
        (isExpectedCall
          ? "->" + " ".repeat(Math.max(0, index - 2 - string.length))
          : " ".repeat(Math.max(index - string.length))) +
        string +
        suffix;
    };
    var printReceivedCallsNegative = (
      expected,
      indexedCalls,
      isOnlyCall,
      iExpectedCall,
    ) => {
      if (indexedCalls.length === 0) {
        return "";
      }
      const label = "Received:     ";
      if (isOnlyCall) {
        return label + printReceivedArgs(indexedCalls[0], expected) + "\n";
      }
      const printAligned = getRightAlignedPrinter(label);
      return (
        "Received\n" +
        indexedCalls.reduce(
          (printed, [i, args]) =>
            printed +
            printAligned(String(i + 1), i === iExpectedCall) +
            printReceivedArgs(args, expected) +
            "\n",
          "",
        )
      );
    };
    var printExpectedReceivedCallsPositive = (
      expected,
      indexedCalls,
      expand,
      isOnlyCall,
      iExpectedCall,
    ) => {
      const expectedLine = `Expected: ${printExpectedArgs(expected)}
`;
      if (indexedCalls.length === 0) {
        return expectedLine;
      }
      const label = "Received: ";
      if (isOnlyCall && (iExpectedCall === 0 || iExpectedCall === void 0)) {
        const received = indexedCalls[0][1];
        if (isLineDiffableCall(expected, received)) {
          const lines = [
            (0, _jestMatcherUtils.EXPECTED_COLOR)("- Expected"),
            (0, _jestMatcherUtils.RECEIVED_COLOR)("+ Received"),
            "",
          ];
          const length = Math.max(expected.length, received.length);
          for (let i = 0; i < length; i += 1) {
            if (i < expected.length && i < received.length) {
              if (isEqualValue(expected[i], received[i])) {
                lines.push(`  ${printCommon(received[i])},`);
                continue;
              }
              if (isLineDiffableArg(expected[i], received[i])) {
                const difference = (0, _jestMatcherUtils.diff)(
                  expected[i],
                  received[i],
                  {
                    expand,
                  },
                );
                if (
                  typeof difference === "string" &&
                  difference.includes("- Expected") &&
                  difference.includes("+ Received")
                ) {
                  lines.push(difference.split("\n").slice(3).join("\n") + ",");
                  continue;
                }
              }
            }
            if (i < expected.length) {
              lines.push(
                (0, _jestMatcherUtils.EXPECTED_COLOR)(
                  "- " + (0, _jestMatcherUtils.stringify)(expected[i]),
                ) + ",",
              );
            }
            if (i < received.length) {
              lines.push(
                (0, _jestMatcherUtils.RECEIVED_COLOR)(
                  "+ " + (0, _jestMatcherUtils.stringify)(received[i]),
                ) + ",",
              );
            }
          }
          return lines.join("\n") + "\n";
        }
        return (
          expectedLine + label + printReceivedArgs(received, expected) + "\n"
        );
      }
      const printAligned = getRightAlignedPrinter(label);
      return (
        expectedLine +
        "Received\n" +
        indexedCalls.reduce((printed, [i, received]) => {
          const aligned = printAligned(String(i + 1), i === iExpectedCall);
          return (
            printed +
            ((i === iExpectedCall || iExpectedCall === void 0) &&
            isLineDiffableCall(expected, received)
              ? aligned.replace(": ", "\n") +
                printDiffCall(expected, received, expand)
              : aligned + printReceivedArgs(received, expected)) +
            "\n"
          );
        }, "")
      );
    };
    var indentation = "Received".replace(/\w/g, " ");
    var printDiffCall = (expected, received, expand) =>
      received
        .map((arg, i) => {
          if (i < expected.length) {
            if (isEqualValue(expected[i], arg)) {
              return indentation + "  " + printCommon(arg) + ",";
            }
            if (isLineDiffableArg(expected[i], arg)) {
              const difference = (0, _jestMatcherUtils.diff)(expected[i], arg, {
                expand,
              });
              if (
                typeof difference === "string" &&
                difference.includes("- Expected") &&
                difference.includes("+ Received")
              ) {
                return (
                  difference
                    .split("\n")
                    .slice(3)
                    .map((line) => indentation + line)
                    .join("\n") + ","
                );
              }
            }
          }
          return (
            indentation +
            (i < expected.length
              ? "  " + (0, _jestMatcherUtils.printReceived)(arg)
              : (0, _jestMatcherUtils.RECEIVED_COLOR)(
                  "+ " + (0, _jestMatcherUtils.stringify)(arg),
                )) +
            ","
          );
        })
        .join("\n");
    var isLineDiffableCall = (expected, received) =>
      expected.some(
        (arg, i) => i < received.length && isLineDiffableArg(arg, received[i]),
      );
    var isLineDiffableArg = (expected, received) => {
      const expectedType = (0, _jestGetType.default)(expected);
      const receivedType = (0, _jestGetType.default)(received);
      if (expectedType !== receivedType) {
        return false;
      }
      if (_jestGetType.default.isPrimitive(expected)) {
        return false;
      }
      if (
        expectedType === "date" ||
        expectedType === "function" ||
        expectedType === "regexp"
      ) {
        return false;
      }
      if (expected instanceof Error && received instanceof Error) {
        return false;
      }
      if (
        expectedType === "object" &&
        typeof expected.asymmetricMatch === "function"
      ) {
        return false;
      }
      if (
        receivedType === "object" &&
        typeof received.asymmetricMatch === "function"
      ) {
        return false;
      }
      return true;
    };
    var printResult = (result, expected) =>
      result.type === "throw"
        ? "function call threw an error"
        : result.type === "incomplete"
          ? "function call has not returned yet"
          : isEqualValue(expected, result.value)
            ? printCommon(result.value)
            : (0, _jestMatcherUtils.printReceived)(result.value);
    var printReceivedResults = (
      label,
      expected,
      indexedResults,
      isOnlyCall,
      iExpectedCall,
    ) => {
      if (indexedResults.length === 0) {
        return "";
      }
      if (isOnlyCall && (iExpectedCall === 0 || iExpectedCall === void 0)) {
        return label + printResult(indexedResults[0][1], expected) + "\n";
      }
      const printAligned = getRightAlignedPrinter(label);
      return (
        label.replace(":", "").trim() +
        "\n" +
        indexedResults.reduce(
          (printed, [i, result]) =>
            printed +
            printAligned(String(i + 1), i === iExpectedCall) +
            printResult(result, expected) +
            "\n",
          "",
        )
      );
    };
    var createToBeCalledMatcher = (matcherName) =>
      function (received, expected) {
        const expectedArgument = "";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
        ensureMockOrSpy(received, matcherName, expectedArgument, options);
        const receivedIsSpy = isSpy(received);
        const receivedName = receivedIsSpy ? "spy" : received.getMockName();
        const count = receivedIsSpy
          ? received.calls.count()
          : received.mock.calls.length;
        const calls = receivedIsSpy
          ? received.calls.all().map((x) => x.args)
          : received.mock.calls;
        const pass = count > 0;
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                receivedName,
                expectedArgument,
                options,
              ) +
              `

Expected number of calls: ${(0, _jestMatcherUtils.printExpected)(0)}
Received number of calls: ${(0, _jestMatcherUtils.printReceived)(count)}

` +
              calls
                .reduce((lines, args, i) => {
                  if (lines.length < PRINT_LIMIT) {
                    lines.push(`${i + 1}: ${printReceivedArgs(args)}`);
                  }
                  return lines;
                }, [])
                .join("\n")
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                receivedName,
                expectedArgument,
                options,
              ) +
              `

Expected number of calls: >= ${(0, _jestMatcherUtils.printExpected)(1)}
Received number of calls:    ${(0, _jestMatcherUtils.printReceived)(count)}`;
        return {
          message,
          pass,
        };
      };
    var createToReturnMatcher = (matcherName) =>
      function (received, expected) {
        const expectedArgument = "";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureNoExpected)(expected, matcherName, options);
        ensureMock(received, matcherName, expectedArgument, options);
        const receivedName = received.getMockName();
        const count = received.mock.results.reduce(
          (n, result) => (result.type === "return" ? n + 1 : n),
          0,
        );
        const pass = count > 0;
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                receivedName,
                expectedArgument,
                options,
              ) +
              `

Expected number of returns: ${(0, _jestMatcherUtils.printExpected)(0)}
Received number of returns: ${(0, _jestMatcherUtils.printReceived)(count)}

` +
              received.mock.results
                .reduce((lines, result, i) => {
                  if (result.type === "return" && lines.length < PRINT_LIMIT) {
                    lines.push(
                      `${i + 1}: ${(0, _jestMatcherUtils.printReceived)(
                        result.value,
                      )}`,
                    );
                  }
                  return lines;
                }, [])
                .join("\n") +
              (received.mock.calls.length !== count
                ? `

Received number of calls:   ${(0, _jestMatcherUtils.printReceived)(received.mock.calls.length)}`
                : "")
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                receivedName,
                expectedArgument,
                options,
              ) +
              `

Expected number of returns: >= ${(0, _jestMatcherUtils.printExpected)(1)}
Received number of returns:    ${(0, _jestMatcherUtils.printReceived)(count)}` +
              (received.mock.calls.length !== count
                ? `
Received number of calls:      ${(0, _jestMatcherUtils.printReceived)(received.mock.calls.length)}`
                : "");
        return {
          message,
          pass,
        };
      };
    var createToBeCalledTimesMatcher = (matcherName) =>
      function (received, expected) {
        const expectedArgument = "expected";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureExpectedIsNonNegativeInteger)(
          expected,
          matcherName,
          options,
        );
        ensureMockOrSpy(received, matcherName, expectedArgument, options);
        const receivedIsSpy = isSpy(received);
        const receivedName = receivedIsSpy ? "spy" : received.getMockName();
        const count = receivedIsSpy
          ? received.calls.count()
          : received.mock.calls.length;
        const pass = count === expected;
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                receivedName,
                expectedArgument,
                options,
              ) +
              `

Expected number of calls: not ${(0, _jestMatcherUtils.printExpected)(expected)}`
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                receivedName,
                expectedArgument,
                options,
              ) +
              `

Expected number of calls: ${(0, _jestMatcherUtils.printExpected)(expected)}
Received number of calls: ${(0, _jestMatcherUtils.printReceived)(count)}`;
        return {
          message,
          pass,
        };
      };
    var createToReturnTimesMatcher = (matcherName) =>
      function (received, expected) {
        const expectedArgument = "expected";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        (0, _jestMatcherUtils.ensureExpectedIsNonNegativeInteger)(
          expected,
          matcherName,
          options,
        );
        ensureMock(received, matcherName, expectedArgument, options);
        const receivedName = received.getMockName();
        const count = received.mock.results.reduce(
          (n, result) => (result.type === "return" ? n + 1 : n),
          0,
        );
        const pass = count === expected;
        const message = pass
          ? () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                receivedName,
                expectedArgument,
                options,
              ) +
              `

Expected number of returns: not ${(0, _jestMatcherUtils.printExpected)(expected)}` +
              (received.mock.calls.length !== count
                ? `

Received number of calls:       ${(0, _jestMatcherUtils.printReceived)(received.mock.calls.length)}`
                : "")
          : () =>
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                receivedName,
                expectedArgument,
                options,
              ) +
              `

Expected number of returns: ${(0, _jestMatcherUtils.printExpected)(expected)}
Received number of returns: ${(0, _jestMatcherUtils.printReceived)(count)}` +
              (received.mock.calls.length !== count
                ? `
Received number of calls:   ${(0, _jestMatcherUtils.printReceived)(received.mock.calls.length)}`
                : "");
        return {
          message,
          pass,
        };
      };
    var createToBeCalledWithMatcher = (matcherName) =>
      function (received, ...expected) {
        const expectedArgument = "...expected";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        ensureMockOrSpy(received, matcherName, expectedArgument, options);
        const receivedIsSpy = isSpy(received);
        const receivedName = receivedIsSpy ? "spy" : received.getMockName();
        const calls = receivedIsSpy
          ? received.calls.all().map((x) => x.args)
          : received.mock.calls;
        const pass = calls.some((call) => isEqualCall(expected, call));
        const message = pass
          ? () => {
              const indexedCalls = [];
              let i = 0;
              while (i < calls.length && indexedCalls.length < PRINT_LIMIT) {
                if (isEqualCall(expected, calls[i])) {
                  indexedCalls.push([i, calls[i]]);
                }
                i += 1;
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

Expected: not ${printExpectedArgs(expected)}
` +
                (calls.length === 1 &&
                (0, _jestMatcherUtils.stringify)(calls[0]) ===
                  (0, _jestMatcherUtils.stringify)(expected)
                  ? ""
                  : printReceivedCallsNegative(
                      expected,
                      indexedCalls,
                      calls.length === 1,
                    )) +
                `
Number of calls: ${(0, _jestMatcherUtils.printReceived)(calls.length)}`
              );
            }
          : () => {
              const indexedCalls = [];
              let i = 0;
              while (i < calls.length && indexedCalls.length < PRINT_LIMIT) {
                indexedCalls.push([i, calls[i]]);
                i += 1;
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                "\n\n" +
                printExpectedReceivedCallsPositive(
                  expected,
                  indexedCalls,
                  isExpand(this.expand),
                  calls.length === 1,
                ) +
                `
Number of calls: ${(0, _jestMatcherUtils.printReceived)(calls.length)}`
              );
            };
        return {
          message,
          pass,
        };
      };
    var createToReturnWithMatcher = (matcherName) =>
      function (received, expected) {
        const expectedArgument = "expected";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        ensureMock(received, matcherName, expectedArgument, options);
        const receivedName = received.getMockName();
        const { calls, results } = received.mock;
        const pass = results.some((result) => isEqualReturn(expected, result));
        const message = pass
          ? () => {
              const indexedResults = [];
              let i = 0;
              while (
                i < results.length &&
                indexedResults.length < PRINT_LIMIT
              ) {
                if (isEqualReturn(expected, results[i])) {
                  indexedResults.push([i, results[i]]);
                }
                i += 1;
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
                (results.length === 1 &&
                results[0].type === "return" &&
                (0, _jestMatcherUtils.stringify)(results[0].value) ===
                  (0, _jestMatcherUtils.stringify)(expected)
                  ? ""
                  : printReceivedResults(
                      "Received:     ",
                      expected,
                      indexedResults,
                      results.length === 1,
                    )) +
                printNumberOfReturns(countReturns(results), calls.length)
              );
            }
          : () => {
              const indexedResults = [];
              let i = 0;
              while (
                i < results.length &&
                indexedResults.length < PRINT_LIMIT
              ) {
                indexedResults.push([i, results[i]]);
                i += 1;
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
                printReceivedResults(
                  "Received: ",
                  expected,
                  indexedResults,
                  results.length === 1,
                ) +
                printNumberOfReturns(countReturns(results), calls.length)
              );
            };
        return {
          message,
          pass,
        };
      };
    var createLastCalledWithMatcher = (matcherName) =>
      function (received, ...expected) {
        const expectedArgument = "...expected";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        ensureMockOrSpy(received, matcherName, expectedArgument, options);
        const receivedIsSpy = isSpy(received);
        const receivedName = receivedIsSpy ? "spy" : received.getMockName();
        const calls = receivedIsSpy
          ? received.calls.all().map((x) => x.args)
          : received.mock.calls;
        const iLast = calls.length - 1;
        const pass = iLast >= 0 && isEqualCall(expected, calls[iLast]);
        const message = pass
          ? () => {
              const indexedCalls = [];
              if (iLast > 0) {
                indexedCalls.push([iLast - 1, calls[iLast - 1]]);
              }
              indexedCalls.push([iLast, calls[iLast]]);
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

Expected: not ${printExpectedArgs(expected)}
` +
                (calls.length === 1 &&
                (0, _jestMatcherUtils.stringify)(calls[0]) ===
                  (0, _jestMatcherUtils.stringify)(expected)
                  ? ""
                  : printReceivedCallsNegative(
                      expected,
                      indexedCalls,
                      calls.length === 1,
                      iLast,
                    )) +
                `
Number of calls: ${(0, _jestMatcherUtils.printReceived)(calls.length)}`
              );
            }
          : () => {
              const indexedCalls = [];
              if (iLast >= 0) {
                if (iLast > 0) {
                  let i = iLast - 1;
                  while (i >= 0 && !isEqualCall(expected, calls[i])) {
                    i -= 1;
                  }
                  if (i < 0) {
                    i = iLast - 1;
                  }
                  indexedCalls.push([i, calls[i]]);
                }
                indexedCalls.push([iLast, calls[iLast]]);
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                "\n\n" +
                printExpectedReceivedCallsPositive(
                  expected,
                  indexedCalls,
                  isExpand(this.expand),
                  calls.length === 1,
                  iLast,
                ) +
                `
Number of calls: ${(0, _jestMatcherUtils.printReceived)(calls.length)}`
              );
            };
        return {
          message,
          pass,
        };
      };
    var createLastReturnedMatcher = (matcherName) =>
      function (received, expected) {
        const expectedArgument = "expected";
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        ensureMock(received, matcherName, expectedArgument, options);
        const receivedName = received.getMockName();
        const { calls, results } = received.mock;
        const iLast = results.length - 1;
        const pass = iLast >= 0 && isEqualReturn(expected, results[iLast]);
        const message = pass
          ? () => {
              const indexedResults = [];
              if (iLast > 0) {
                indexedResults.push([iLast - 1, results[iLast - 1]]);
              }
              indexedResults.push([iLast, results[iLast]]);
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
                (results.length === 1 &&
                results[0].type === "return" &&
                (0, _jestMatcherUtils.stringify)(results[0].value) ===
                  (0, _jestMatcherUtils.stringify)(expected)
                  ? ""
                  : printReceivedResults(
                      "Received:     ",
                      expected,
                      indexedResults,
                      results.length === 1,
                      iLast,
                    )) +
                printNumberOfReturns(countReturns(results), calls.length)
              );
            }
          : () => {
              const indexedResults = [];
              if (iLast >= 0) {
                if (iLast > 0) {
                  let i = iLast - 1;
                  while (i >= 0 && !isEqualReturn(expected, results[i])) {
                    i -= 1;
                  }
                  if (i < 0) {
                    i = iLast - 1;
                  }
                  indexedResults.push([i, results[i]]);
                }
                indexedResults.push([iLast, results[iLast]]);
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
                printReceivedResults(
                  "Received: ",
                  expected,
                  indexedResults,
                  results.length === 1,
                  iLast,
                ) +
                printNumberOfReturns(countReturns(results), calls.length)
              );
            };
        return {
          message,
          pass,
        };
      };
    var createNthCalledWithMatcher = (matcherName) =>
      function (received, nth, ...expected) {
        const expectedArgument = "n";
        const options = {
          expectedColor: (arg) => arg,
          isNot: this.isNot,
          promise: this.promise,
          secondArgument: "...expected",
        };
        ensureMockOrSpy(received, matcherName, expectedArgument, options);
        if (!Number.isSafeInteger(nth) || nth < 1) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                expectedArgument,
                options,
              ),
              `${expectedArgument} must be a positive integer`,
              (0, _jestMatcherUtils.printWithType)(
                expectedArgument,
                nth,
                _jestMatcherUtils.stringify,
              ),
            ),
          );
        }
        const receivedIsSpy = isSpy(received);
        const receivedName = receivedIsSpy ? "spy" : received.getMockName();
        const calls = receivedIsSpy
          ? received.calls.all().map((x) => x.args)
          : received.mock.calls;
        const length = calls.length;
        const iNth = nth - 1;
        const pass = iNth < length && isEqualCall(expected, calls[iNth]);
        const message = pass
          ? () => {
              const indexedCalls = [];
              if (iNth - 1 >= 0) {
                indexedCalls.push([iNth - 1, calls[iNth - 1]]);
              }
              indexedCalls.push([iNth, calls[iNth]]);
              if (iNth + 1 < length) {
                indexedCalls.push([iNth + 1, calls[iNth + 1]]);
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

n: ${nth}
Expected: not ${printExpectedArgs(expected)}
` +
                (calls.length === 1 &&
                (0, _jestMatcherUtils.stringify)(calls[0]) ===
                  (0, _jestMatcherUtils.stringify)(expected)
                  ? ""
                  : printReceivedCallsNegative(
                      expected,
                      indexedCalls,
                      calls.length === 1,
                      iNth,
                    )) +
                `
Number of calls: ${(0, _jestMatcherUtils.printReceived)(calls.length)}`
              );
            }
          : () => {
              const indexedCalls = [];
              if (iNth < length) {
                if (iNth - 1 >= 0) {
                  let i = iNth - 1;
                  while (i >= 0 && !isEqualCall(expected, calls[i])) {
                    i -= 1;
                  }
                  if (i < 0) {
                    i = iNth - 1;
                  }
                  indexedCalls.push([i, calls[i]]);
                }
                indexedCalls.push([iNth, calls[iNth]]);
                if (iNth + 1 < length) {
                  let i = iNth + 1;
                  while (i < length && !isEqualCall(expected, calls[i])) {
                    i += 1;
                  }
                  if (i >= length) {
                    i = iNth + 1;
                  }
                  indexedCalls.push([i, calls[i]]);
                }
              } else if (length > 0) {
                let i = length - 1;
                while (i >= 0 && !isEqualCall(expected, calls[i])) {
                  i -= 1;
                }
                if (i < 0) {
                  i = length - 1;
                }
                indexedCalls.push([i, calls[i]]);
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

n: ${nth}
` +
                printExpectedReceivedCallsPositive(
                  expected,
                  indexedCalls,
                  isExpand(this.expand),
                  calls.length === 1,
                  iNth,
                ) +
                `
Number of calls: ${(0, _jestMatcherUtils.printReceived)(calls.length)}`
              );
            };
        return {
          message,
          pass,
        };
      };
    var createNthReturnedWithMatcher = (matcherName) =>
      function (received, nth, expected) {
        const expectedArgument = "n";
        const options = {
          expectedColor: (arg) => arg,
          isNot: this.isNot,
          promise: this.promise,
          secondArgument: "expected",
        };
        ensureMock(received, matcherName, expectedArgument, options);
        if (!Number.isSafeInteger(nth) || nth < 1) {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                expectedArgument,
                options,
              ),
              `${expectedArgument} must be a positive integer`,
              (0, _jestMatcherUtils.printWithType)(
                expectedArgument,
                nth,
                _jestMatcherUtils.stringify,
              ),
            ),
          );
        }
        const receivedName = received.getMockName();
        const { calls, results } = received.mock;
        const length = results.length;
        const iNth = nth - 1;
        const pass = iNth < length && isEqualReturn(expected, results[iNth]);
        const message = pass
          ? () => {
              const indexedResults = [];
              if (iNth - 1 >= 0) {
                indexedResults.push([iNth - 1, results[iNth - 1]]);
              }
              indexedResults.push([iNth, results[iNth]]);
              if (iNth + 1 < length) {
                indexedResults.push([iNth + 1, results[iNth + 1]]);
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

n: ${nth}
Expected: not ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
                (results.length === 1 &&
                results[0].type === "return" &&
                (0, _jestMatcherUtils.stringify)(results[0].value) ===
                  (0, _jestMatcherUtils.stringify)(expected)
                  ? ""
                  : printReceivedResults(
                      "Received:     ",
                      expected,
                      indexedResults,
                      results.length === 1,
                      iNth,
                    )) +
                printNumberOfReturns(countReturns(results), calls.length)
              );
            }
          : () => {
              const indexedResults = [];
              if (iNth < length) {
                if (iNth - 1 >= 0) {
                  let i = iNth - 1;
                  while (i >= 0 && !isEqualReturn(expected, results[i])) {
                    i -= 1;
                  }
                  if (i < 0) {
                    i = iNth - 1;
                  }
                  indexedResults.push([i, results[i]]);
                }
                indexedResults.push([iNth, results[iNth]]);
                if (iNth + 1 < length) {
                  let i = iNth + 1;
                  while (i < length && !isEqualReturn(expected, results[i])) {
                    i += 1;
                  }
                  if (i >= length) {
                    i = iNth + 1;
                  }
                  indexedResults.push([i, results[i]]);
                }
              } else if (length > 0) {
                let i = length - 1;
                while (i >= 0 && !isEqualReturn(expected, results[i])) {
                  i -= 1;
                }
                if (i < 0) {
                  i = length - 1;
                }
                indexedResults.push([i, results[i]]);
              }
              return (
                (0, _jestMatcherUtils.matcherHint)(
                  matcherName,
                  receivedName,
                  expectedArgument,
                  options,
                ) +
                `

n: ${nth}
Expected: ${(0, _jestMatcherUtils.printExpected)(expected)}
` +
                printReceivedResults(
                  "Received: ",
                  expected,
                  indexedResults,
                  results.length === 1,
                  iNth,
                ) +
                printNumberOfReturns(countReturns(results), calls.length)
              );
            };
        return {
          message,
          pass,
        };
      };
    var spyMatchers = {
      lastCalledWith: createLastCalledWithMatcher("lastCalledWith"),
      lastReturnedWith: createLastReturnedMatcher("lastReturnedWith"),
      nthCalledWith: createNthCalledWithMatcher("nthCalledWith"),
      nthReturnedWith: createNthReturnedWithMatcher("nthReturnedWith"),
      toBeCalled: createToBeCalledMatcher("toBeCalled"),
      toBeCalledTimes: createToBeCalledTimesMatcher("toBeCalledTimes"),
      toBeCalledWith: createToBeCalledWithMatcher("toBeCalledWith"),
      toHaveBeenCalled: createToBeCalledMatcher("toHaveBeenCalled"),
      toHaveBeenCalledTimes: createToBeCalledTimesMatcher(
        "toHaveBeenCalledTimes",
      ),
      toHaveBeenCalledWith: createToBeCalledWithMatcher("toHaveBeenCalledWith"),
      toHaveBeenLastCalledWith: createLastCalledWithMatcher(
        "toHaveBeenLastCalledWith",
      ),
      toHaveBeenNthCalledWith: createNthCalledWithMatcher(
        "toHaveBeenNthCalledWith",
      ),
      toHaveLastReturnedWith: createLastReturnedMatcher(
        "toHaveLastReturnedWith",
      ),
      toHaveNthReturnedWith: createNthReturnedWithMatcher(
        "toHaveNthReturnedWith",
      ),
      toHaveReturned: createToReturnMatcher("toHaveReturned"),
      toHaveReturnedTimes: createToReturnTimesMatcher("toHaveReturnedTimes"),
      toHaveReturnedWith: createToReturnWithMatcher("toHaveReturnedWith"),
      toReturn: createToReturnMatcher("toReturn"),
      toReturnTimes: createToReturnTimesMatcher("toReturnTimes"),
      toReturnWith: createToReturnWithMatcher("toReturnWith"),
    };
    var isMock = (received) =>
      received != null && received._isMockFunction === true;
    var isSpy = (received) =>
      received != null &&
      received.calls != null &&
      typeof received.calls.all === "function" &&
      typeof received.calls.count === "function";
    var ensureMockOrSpy = (
      received,
      matcherName,
      expectedArgument,
      options,
    ) => {
      if (!isMock(received) && !isSpy(received)) {
        throw new Error(
          (0, _jestMatcherUtils.matcherErrorMessage)(
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              expectedArgument,
              options,
            ),
            `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
              "received",
            )} value must be a mock or spy function`,
            (0, _jestMatcherUtils.printWithType)(
              "Received",
              received,
              _jestMatcherUtils.printReceived,
            ),
          ),
        );
      }
    };
    var ensureMock = (received, matcherName, expectedArgument, options) => {
      if (!isMock(received)) {
        throw new Error(
          (0, _jestMatcherUtils.matcherErrorMessage)(
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              expectedArgument,
              options,
            ),
            `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
              "received",
            )} value must be a mock function`,
            (0, _jestMatcherUtils.printWithType)(
              "Received",
              received,
              _jestMatcherUtils.printReceived,
            ),
          ),
        );
      }
    };
    var _default = spyMatchers;
    exports5.default = _default;
  },
});

// node-modules-polyfills:path
function unimplemented2(name) {
  throw new Error(
    "Node.js process " +
      name +
      " is not supported by JSPM core outside of Node.js",
  );
}
function cleanUpNextTick2() {
  if (!draining2 || !currentQueue2) return;
  draining2 = false;
  if (currentQueue2.length) {
    queue2 = currentQueue2.concat(queue2);
  } else {
    queueIndex2 = -1;
  }
  if (queue2.length) drainQueue2();
}
function drainQueue2() {
  if (draining2) return;
  var timeout = setTimeout(cleanUpNextTick2, 0);
  draining2 = true;
  var len = queue2.length;
  while (len) {
    currentQueue2 = queue2;
    queue2 = [];
    while (++queueIndex2 < len) {
      if (currentQueue2) currentQueue2[queueIndex2].run();
    }
    queueIndex2 = -1;
    len = queue2.length;
  }
  currentQueue2 = null;
  draining2 = false;
  clearTimeout(timeout);
}
function nextTick2(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
  }
  queue2.push(new Item2(fun, args));
  if (queue2.length === 1 && !draining2) setTimeout(drainQueue2, 0);
}
function Item2(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop2() {}
function _linkedBinding2(name) {
  unimplemented2("_linkedBinding");
}
function dlopen2(name) {
  unimplemented2("dlopen");
}
function _getActiveRequests2() {
  return [];
}
function _getActiveHandles2() {
  return [];
}
function assert2(condition, message) {
  if (!condition) throw new Error(message || "assertion error");
}
function hasUncaughtExceptionCaptureCallback2() {
  return false;
}
function uptime2() {
  return _performance2.now() / 1e3;
}
function hrtime2(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance2.now()) * 1e-3);
  var clocktime = _performance2.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor((clocktime % 1) * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec2;
    }
  }
  return [seconds, nanoseconds];
}
function on2() {
  return process3;
}
function listeners2(name) {
  return [];
}
function dew2() {
  if (_dewExec2) return exports$12;
  _dewExec2 = true;
  var process$1 = process3;
  function assertPath(path) {
    if (typeof path !== "string") {
      throw new TypeError(
        "Path must be a string. Received " + JSON.stringify(path),
      );
    }
  }
  function normalizeStringPosix(path, allowAboveRoot) {
    var res = "";
    var lastSegmentLength = 0;
    var lastSlash = -1;
    var dots = 0;
    var code;
    for (var i = 0; i <= path.length; ++i) {
      if (i < path.length) code = path.charCodeAt(i);
      else if (code === 47) break;
      else code = 47;
      if (code === 47) {
        if (lastSlash === i - 1 || dots === 1);
        else if (lastSlash !== i - 1 && dots === 2) {
          if (
            res.length < 2 ||
            lastSegmentLength !== 2 ||
            res.charCodeAt(res.length - 1) !== 46 ||
            res.charCodeAt(res.length - 2) !== 46
          ) {
            if (res.length > 2) {
              var lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = i;
                dots = 0;
                continue;
              }
            } else if (res.length === 2 || res.length === 1) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            if (res.length > 0) res += "/..";
            else res = "..";
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
          else res = path.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === 46 && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  function _format(sep2, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base =
      pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) {
      return base;
    }
    if (dir === pathObject.root) {
      return dir + base;
    }
    return dir + sep2 + base;
  }
  var posix2 = {
    // path.resolve([from ...], to)
    resolve: function resolve2() {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd22;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path;
        if (i >= 0) path = arguments[i];
        else {
          if (cwd22 === void 0) cwd22 = process$1.cwd();
          path = cwd22;
        }
        assertPath(path);
        if (path.length === 0) {
          continue;
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = path.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return "/" + resolvedPath;
        else return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    },
    normalize: function normalize2(path) {
      assertPath(path);
      if (path.length === 0) return ".";
      var isAbsolute2 = path.charCodeAt(0) === 47;
      var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
      path = normalizeStringPosix(path, !isAbsolute2);
      if (path.length === 0 && !isAbsolute2) path = ".";
      if (path.length > 0 && trailingSeparator) path += "/";
      if (isAbsolute2) return "/" + path;
      return path;
    },
    isAbsolute: function isAbsolute2(path) {
      assertPath(path);
      return path.length > 0 && path.charCodeAt(0) === 47;
    },
    join: function join2() {
      if (arguments.length === 0) return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0) joined = arg;
          else joined += "/" + arg;
        }
      }
      if (joined === void 0) return ".";
      return posix2.normalize(joined);
    },
    relative: function relative2(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to) return "";
      from = posix2.resolve(from);
      to = posix2.resolve(to);
      if (from === to) return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47) break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47) break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0) out += "..";
          else out += "/..";
        }
      }
      if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
      }
    },
    _makeLong: function _makeLong2(path) {
      return path;
    },
    dirname: function dirname2(path) {
      assertPath(path);
      if (path.length === 0) return ".";
      var code = path.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path.length - 1; i >= 1; --i) {
        code = path.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) return "//";
      return path.slice(0, end);
    },
    basename: function basename2(path, ext) {
      if (ext !== void 0 && typeof ext !== "string")
        throw new TypeError('"ext" argument must be a string');
      assertPath(path);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
      } else {
        for (i = path.length - 1; i >= 0; --i) {
          if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) return "";
        return path.slice(start, end);
      }
    },
    extname: function extname2(path) {
      assertPath(path);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (
        startDot === -1 ||
        end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
          startDot === end - 1 &&
          startDot === startPart + 1)
      ) {
        return "";
      }
      return path.slice(startDot, end);
    },
    format: function format22(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(
          'The "pathObject" argument must be of type Object. Received type ' +
            typeof pathObject,
        );
      }
      return _format("/", pathObject);
    },
    parse: function parse2(path) {
      assertPath(path);
      var ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: "",
      };
      if (path.length === 0) return ret;
      var code = path.charCodeAt(0);
      var isAbsolute2 = code === 47;
      var start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code = path.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (
        startDot === -1 ||
        end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
          startDot === end - 1 &&
          startDot === startPart + 1)
      ) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute2)
            ret.base = ret.name = path.slice(1, end);
          else ret.base = ret.name = path.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute2) {
          ret.name = path.slice(1, startDot);
          ret.base = path.slice(1, end);
        } else {
          ret.name = path.slice(startPart, startDot);
          ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
      }
      if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
      else if (isAbsolute2) ret.dir = "/";
      return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null,
  };
  posix2.posix = posix2;
  exports$12 = posix2;
  return exports$12;
}
var queue2,
  draining2,
  currentQueue2,
  queueIndex2,
  title2,
  arch2,
  platform2,
  env2,
  argv2,
  execArgv2,
  version2,
  versions2,
  emitWarning2,
  binding2,
  umask2,
  cwd2,
  chdir2,
  release2,
  _rawDebug2,
  moduleLoadList2,
  domain2,
  _exiting2,
  config2,
  reallyExit2,
  _kill2,
  cpuUsage2,
  resourceUsage2,
  memoryUsage2,
  kill2,
  exit2,
  openStdin2,
  allowedNodeEnvironmentFlags2,
  features2,
  _fatalExceptions2,
  setUncaughtExceptionCaptureCallback2,
  _tickCallback2,
  _debugProcess2,
  _debugEnd2,
  _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier2,
  stdout2,
  stderr2,
  stdin2,
  abort2,
  pid2,
  ppid2,
  execPath2,
  debugPort2,
  argv02,
  _preload_modules2,
  setSourceMapsEnabled2,
  _performance2,
  nowOffset2,
  nanoPerSec2,
  _maxListeners2,
  _events2,
  _eventsCount2,
  addListener2,
  once2,
  off2,
  removeListener2,
  removeAllListeners2,
  emit2,
  prependListener2,
  prependOnceListener2,
  process3,
  exports$12,
  _dewExec2,
  exports3,
  _makeLong,
  basename,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  parse,
  posix,
  relative,
  resolve,
  sep,
  win32;
var init_path = __esm({
  "node-modules-polyfills:path"() {
    init_process_shim();
    init_Buffer();
    init_process();
    queue2 = [];
    draining2 = false;
    queueIndex2 = -1;
    Item2.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    title2 = "browser";
    arch2 = "x64";
    platform2 = "browser";
    env2 = {
      PATH: "/usr/bin",
      LANG: navigator.language + ".UTF-8",
      PWD: "/",
      HOME: "/home",
      TMP: "/tmp",
    };
    argv2 = ["/usr/bin/node"];
    execArgv2 = [];
    version2 = "v16.8.0";
    versions2 = {};
    emitWarning2 = function (message, type) {
      console.warn((type ? type + ": " : "") + message);
    };
    binding2 = function (name) {
      unimplemented2("binding");
    };
    umask2 = function (mask) {
      return 0;
    };
    cwd2 = function () {
      return "/";
    };
    chdir2 = function (dir) {};
    release2 = {
      name: "node",
      sourceUrl: "",
      headersUrl: "",
      libUrl: "",
    };
    _rawDebug2 = noop2;
    moduleLoadList2 = [];
    domain2 = {};
    _exiting2 = false;
    config2 = {};
    reallyExit2 = noop2;
    _kill2 = noop2;
    cpuUsage2 = function () {
      return {};
    };
    resourceUsage2 = cpuUsage2;
    memoryUsage2 = cpuUsage2;
    kill2 = noop2;
    exit2 = noop2;
    openStdin2 = noop2;
    allowedNodeEnvironmentFlags2 = {};
    features2 = {
      inspector: false,
      debug: false,
      uv: false,
      ipv6: false,
      tls_alpn: false,
      tls_sni: false,
      tls_ocsp: false,
      tls: false,
      cached_builtins: true,
    };
    _fatalExceptions2 = noop2;
    setUncaughtExceptionCaptureCallback2 = noop2;
    _tickCallback2 = noop2;
    _debugProcess2 = noop2;
    _debugEnd2 = noop2;
    _startProfilerIdleNotifier2 = noop2;
    _stopProfilerIdleNotifier2 = noop2;
    stdout2 = void 0;
    stderr2 = void 0;
    stdin2 = void 0;
    abort2 = noop2;
    pid2 = 2;
    ppid2 = 1;
    execPath2 = "/bin/usr/node";
    debugPort2 = 9229;
    argv02 = "node";
    _preload_modules2 = [];
    setSourceMapsEnabled2 = noop2;
    _performance2 = {
      now:
        typeof performance !== "undefined"
          ? performance.now.bind(performance)
          : void 0,
      timing: typeof performance !== "undefined" ? performance.timing : void 0,
    };
    if (_performance2.now === void 0) {
      nowOffset2 = Date.now();
      if (_performance2.timing && _performance2.timing.navigationStart) {
        nowOffset2 = _performance2.timing.navigationStart;
      }
      _performance2.now = () => Date.now() - nowOffset2;
    }
    nanoPerSec2 = 1e9;
    hrtime2.bigint = function (time) {
      var diff = hrtime2(time);
      if (typeof BigInt === "undefined") {
        return diff[0] * nanoPerSec2 + diff[1];
      }
      return BigInt(diff[0] * nanoPerSec2) + BigInt(diff[1]);
    };
    _maxListeners2 = 10;
    _events2 = {};
    _eventsCount2 = 0;
    addListener2 = on2;
    once2 = on2;
    off2 = on2;
    removeListener2 = on2;
    removeAllListeners2 = on2;
    emit2 = noop2;
    prependListener2 = on2;
    prependOnceListener2 = on2;
    process3 = {
      version: version2,
      versions: versions2,
      arch: arch2,
      platform: platform2,
      release: release2,
      _rawDebug: _rawDebug2,
      moduleLoadList: moduleLoadList2,
      binding: binding2,
      _linkedBinding: _linkedBinding2,
      _events: _events2,
      _eventsCount: _eventsCount2,
      _maxListeners: _maxListeners2,
      on: on2,
      addListener: addListener2,
      once: once2,
      off: off2,
      removeListener: removeListener2,
      removeAllListeners: removeAllListeners2,
      emit: emit2,
      prependListener: prependListener2,
      prependOnceListener: prependOnceListener2,
      listeners: listeners2,
      domain: domain2,
      _exiting: _exiting2,
      config: config2,
      dlopen: dlopen2,
      uptime: uptime2,
      _getActiveRequests: _getActiveRequests2,
      _getActiveHandles: _getActiveHandles2,
      reallyExit: reallyExit2,
      _kill: _kill2,
      cpuUsage: cpuUsage2,
      resourceUsage: resourceUsage2,
      memoryUsage: memoryUsage2,
      kill: kill2,
      exit: exit2,
      openStdin: openStdin2,
      allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
      assert: assert2,
      features: features2,
      _fatalExceptions: _fatalExceptions2,
      setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
      hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
      emitWarning: emitWarning2,
      nextTick: nextTick2,
      _tickCallback: _tickCallback2,
      _debugProcess: _debugProcess2,
      _debugEnd: _debugEnd2,
      _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
      _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
      stdout: stdout2,
      stdin: stdin2,
      stderr: stderr2,
      abort: abort2,
      umask: umask2,
      chdir: chdir2,
      cwd: cwd2,
      env: env2,
      title: title2,
      argv: argv2,
      execArgv: execArgv2,
      pid: pid2,
      ppid: ppid2,
      execPath: execPath2,
      debugPort: debugPort2,
      hrtime: hrtime2,
      argv0: argv02,
      _preload_modules: _preload_modules2,
      setSourceMapsEnabled: setSourceMapsEnabled2,
    };
    exports$12 = {};
    _dewExec2 = false;
    exports3 = dew2();
    _makeLong = exports3._makeLong;
    basename = exports3.basename;
    delimiter = exports3.delimiter;
    dirname = exports3.dirname;
    extname = exports3.extname;
    format = exports3.format;
    isAbsolute = exports3.isAbsolute;
    join = exports3.join;
    normalize = exports3.normalize;
    parse = exports3.parse;
    posix = exports3.posix;
    relative = exports3.relative;
    resolve = exports3.resolve;
    sep = exports3.sep;
    win32 = exports3.win32;
  },
});

// node-modules-polyfills-commonjs:path
var path_exports = {};
__export(path_exports, {
  _makeLong: () => _makeLong,
  basename: () => basename,
  delimiter: () => delimiter,
  dirname: () => dirname,
  extname: () => extname,
  format: () => format,
  isAbsolute: () => isAbsolute,
  join: () => join,
  normalize: () => normalize,
  parse: () => parse,
  posix: () => posix,
  relative: () => relative,
  resolve: () => resolve,
  sep: () => sep,
  win32: () => win32,
});
var init_path2 = __esm({
  "node-modules-polyfills-commonjs:path"() {
    init_process_shim();
    init_Buffer();
    init_process();
    init_path();
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/picocolors-npm-1.1.1-4fede47cf1-10c0.zip/node_modules/picocolors/picocolors.browser.js
var require_picocolors_browser = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/picocolors-npm-1.1.1-4fede47cf1-10c0.zip/node_modules/picocolors/picocolors.browser.js"(
    exports5,
    module,
  ) {
    init_process_shim();
    init_Buffer();
    init_process();
    var x = String;
    var create = function () {
      return {
        isColorSupported: false,
        reset: x,
        bold: x,
        dim: x,
        italic: x,
        underline: x,
        inverse: x,
        hidden: x,
        strikethrough: x,
        black: x,
        red: x,
        green: x,
        yellow: x,
        blue: x,
        magenta: x,
        cyan: x,
        white: x,
        gray: x,
        bgBlack: x,
        bgRed: x,
        bgGreen: x,
        bgYellow: x,
        bgBlue: x,
        bgMagenta: x,
        bgCyan: x,
        bgWhite: x,
        blackBright: x,
        redBright: x,
        greenBright: x,
        yellowBright: x,
        blueBright: x,
        magentaBright: x,
        cyanBright: x,
        whiteBright: x,
        bgBlackBright: x,
        bgRedBright: x,
        bgGreenBright: x,
        bgYellowBright: x,
        bgBlueBright: x,
        bgMagentaBright: x,
        bgCyanBright: x,
        bgWhiteBright: x,
      };
    };
    module.exports = create();
    module.exports.createColors = create;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/js-tokens-npm-4.0.0-0ac852e9e2-10c0.zip/node_modules/js-tokens/index.js
var require_js_tokens = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/js-tokens-npm-4.0.0-0ac852e9e2-10c0.zip/node_modules/js-tokens/index.js"(
    exports5,
  ) {
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default =
      /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g;
    exports5.matchToToken = function (match) {
      var token = { type: "invalid", value: match[0], closed: void 0 };
      if (match[1])
        (token.type = "string"), (token.closed = !!(match[3] || match[4]));
      else if (match[5]) token.type = "comment";
      else if (match[6]) (token.type = "comment"), (token.closed = !!match[7]);
      else if (match[8]) token.type = "regex";
      else if (match[9]) token.type = "number";
      else if (match[10]) token.type = "name";
      else if (match[11]) token.type = "punctuator";
      else if (match[12]) token.type = "whitespace";
      return token;
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/@babel-helper-validator-identifier-npm-7.27.1-2c3cefd5dc-10c0.zip/node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/@babel-helper-validator-identifier-npm-7.27.1-2c3cefd5dc-10c0.zip/node_modules/@babel/helper-validator-identifier/lib/identifier.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.isIdentifierChar = isIdentifierChar;
    exports5.isIdentifierName = isIdentifierName;
    exports5.isIdentifierStart = isIdentifierStart;
    var nonASCIIidentifierStartChars =
      "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars =
      "\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
    var nonASCIIidentifierStart = new RegExp(
      "[" + nonASCIIidentifierStartChars + "]",
    );
    var nonASCIIidentifier = new RegExp(
      "[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]",
    );
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    var astralIdentifierStartCodes = [
      0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48,
      48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35,
      5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51,
      13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4,
      0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65,
      0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11,
      18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7,
      1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3,
      0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0,
      2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7,
      3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2,
      37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46,
      42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32,
      7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0,
      11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0,
      50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18,
      16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16,
      1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29,
      19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65,
      1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30,
      2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2,
      1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2,
      3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2,
      30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6,
      17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14,
      2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0,
      2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2,
      0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2,
      16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541,
      1507, 4938, 6, 4191,
    ];
    var astralIdentifierCodes = [
      509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1,
      574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14,
      32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0,
      13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56,
      1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2,
      4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1,
      83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5,
      2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9,
      0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4,
      0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0,
      49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60,
      6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9,
      519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513,
      54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4,
      101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110,
      6, 6, 9, 4759, 9, 787719, 239,
    ];
    function isInAstralSet(code, set) {
      let pos = 65536;
      for (let i = 0, length = set.length; i < length; i += 2) {
        pos += set[i];
        if (pos > code) return false;
        pos += set[i + 1];
        if (pos >= code) return true;
      }
      return false;
    }
    function isIdentifierStart(code) {
      if (code < 65) return code === 36;
      if (code <= 90) return true;
      if (code < 97) return code === 95;
      if (code <= 122) return true;
      if (code <= 65535) {
        return (
          code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code))
        );
      }
      return isInAstralSet(code, astralIdentifierStartCodes);
    }
    function isIdentifierChar(code) {
      if (code < 48) return code === 36;
      if (code < 58) return true;
      if (code < 65) return false;
      if (code <= 90) return true;
      if (code < 97) return code === 95;
      if (code <= 122) return true;
      if (code <= 65535) {
        return (
          code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code))
        );
      }
      return (
        isInAstralSet(code, astralIdentifierStartCodes) ||
        isInAstralSet(code, astralIdentifierCodes)
      );
    }
    function isIdentifierName(name) {
      let isFirst = true;
      for (let i = 0; i < name.length; i++) {
        let cp = name.charCodeAt(i);
        if ((cp & 64512) === 55296 && i + 1 < name.length) {
          const trail = name.charCodeAt(++i);
          if ((trail & 64512) === 56320) {
            cp = 65536 + ((cp & 1023) << 10) + (trail & 1023);
          }
        }
        if (isFirst) {
          isFirst = false;
          if (!isIdentifierStart(cp)) {
            return false;
          }
        } else if (!isIdentifierChar(cp)) {
          return false;
        }
      }
      return !isFirst;
    }
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/@babel-helper-validator-identifier-npm-7.27.1-2c3cefd5dc-10c0.zip/node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/@babel-helper-validator-identifier-npm-7.27.1-2c3cefd5dc-10c0.zip/node_modules/@babel/helper-validator-identifier/lib/keyword.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.isKeyword = isKeyword;
    exports5.isReservedWord = isReservedWord;
    exports5.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
    exports5.isStrictBindReservedWord = isStrictBindReservedWord;
    exports5.isStrictReservedWord = isStrictReservedWord;
    var reservedWords = {
      keyword: [
        "break",
        "case",
        "catch",
        "continue",
        "debugger",
        "default",
        "do",
        "else",
        "finally",
        "for",
        "function",
        "if",
        "return",
        "switch",
        "throw",
        "try",
        "var",
        "const",
        "while",
        "with",
        "new",
        "this",
        "super",
        "class",
        "extends",
        "export",
        "import",
        "null",
        "true",
        "false",
        "in",
        "instanceof",
        "typeof",
        "void",
        "delete",
      ],
      strict: [
        "implements",
        "interface",
        "let",
        "package",
        "private",
        "protected",
        "public",
        "static",
        "yield",
      ],
      strictBind: ["eval", "arguments"],
    };
    var keywords = new Set(reservedWords.keyword);
    var reservedWordsStrictSet = new Set(reservedWords.strict);
    var reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
    function isReservedWord(word, inModule) {
      return (inModule && word === "await") || word === "enum";
    }
    function isStrictReservedWord(word, inModule) {
      return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
    }
    function isStrictBindOnlyReservedWord(word) {
      return reservedWordsStrictBindSet.has(word);
    }
    function isStrictBindReservedWord(word, inModule) {
      return (
        isStrictReservedWord(word, inModule) ||
        isStrictBindOnlyReservedWord(word)
      );
    }
    function isKeyword(word) {
      return keywords.has(word);
    }
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/@babel-helper-validator-identifier-npm-7.27.1-2c3cefd5dc-10c0.zip/node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/@babel-helper-validator-identifier-npm-7.27.1-2c3cefd5dc-10c0.zip/node_modules/@babel/helper-validator-identifier/lib/index.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports5, "isIdentifierChar", {
      enumerable: true,
      get: function () {
        return _identifier.isIdentifierChar;
      },
    });
    Object.defineProperty(exports5, "isIdentifierName", {
      enumerable: true,
      get: function () {
        return _identifier.isIdentifierName;
      },
    });
    Object.defineProperty(exports5, "isIdentifierStart", {
      enumerable: true,
      get: function () {
        return _identifier.isIdentifierStart;
      },
    });
    Object.defineProperty(exports5, "isKeyword", {
      enumerable: true,
      get: function () {
        return _keyword.isKeyword;
      },
    });
    Object.defineProperty(exports5, "isReservedWord", {
      enumerable: true,
      get: function () {
        return _keyword.isReservedWord;
      },
    });
    Object.defineProperty(exports5, "isStrictBindOnlyReservedWord", {
      enumerable: true,
      get: function () {
        return _keyword.isStrictBindOnlyReservedWord;
      },
    });
    Object.defineProperty(exports5, "isStrictBindReservedWord", {
      enumerable: true,
      get: function () {
        return _keyword.isStrictBindReservedWord;
      },
    });
    Object.defineProperty(exports5, "isStrictReservedWord", {
      enumerable: true,
      get: function () {
        return _keyword.isStrictReservedWord;
      },
    });
    var _identifier = require_identifier();
    var _keyword = require_keyword();
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/@babel-code-frame-npm-7.27.1-4dbcabb137-10c0.zip/node_modules/@babel/code-frame/lib/index.js
var require_lib2 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/@babel-code-frame-npm-7.27.1-4dbcabb137-10c0.zip/node_modules/@babel/code-frame/lib/index.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", { value: true });
    var picocolors = require_picocolors_browser();
    var jsTokens = require_js_tokens();
    var helperValidatorIdentifier = require_lib();
    function isColorSupported() {
      return typeof process2 === "object" &&
        (process2.env.FORCE_COLOR === "0" ||
          process2.env.FORCE_COLOR === "false")
        ? false
        : picocolors.isColorSupported;
    }
    var compose = (f, g) => (v) => f(g(v));
    function buildDefs(colors) {
      return {
        keyword: colors.cyan,
        capitalized: colors.yellow,
        jsxIdentifier: colors.yellow,
        punctuator: colors.yellow,
        number: colors.magenta,
        string: colors.green,
        regex: colors.magenta,
        comment: colors.gray,
        invalid: compose(compose(colors.white, colors.bgRed), colors.bold),
        gutter: colors.gray,
        marker: compose(colors.red, colors.bold),
        message: compose(colors.red, colors.bold),
        reset: colors.reset,
      };
    }
    var defsOn = buildDefs(picocolors.createColors(true));
    var defsOff = buildDefs(picocolors.createColors(false));
    function getDefs(enabled) {
      return enabled ? defsOn : defsOff;
    }
    var sometimesKeywords = /* @__PURE__ */ new Set([
      "as",
      "async",
      "from",
      "get",
      "of",
      "set",
    ]);
    var NEWLINE$1 = /\r\n|[\n\r\u2028\u2029]/;
    var BRACKET = /^[()[\]{}]$/;
    var tokenize;
    {
      const JSX_TAG = /^[a-z][\w-]*$/i;
      const getTokenType = function (token, offset, text) {
        if (token.type === "name") {
          if (
            helperValidatorIdentifier.isKeyword(token.value) ||
            helperValidatorIdentifier.isStrictReservedWord(token.value, true) ||
            sometimesKeywords.has(token.value)
          ) {
            return "keyword";
          }
          if (
            JSX_TAG.test(token.value) &&
            (text[offset - 1] === "<" ||
              text.slice(offset - 2, offset) === "</")
          ) {
            return "jsxIdentifier";
          }
          if (token.value[0] !== token.value[0].toLowerCase()) {
            return "capitalized";
          }
        }
        if (token.type === "punctuator" && BRACKET.test(token.value)) {
          return "bracket";
        }
        if (
          token.type === "invalid" &&
          (token.value === "@" || token.value === "#")
        ) {
          return "punctuator";
        }
        return token.type;
      };
      tokenize = function* (text) {
        let match;
        while ((match = jsTokens.default.exec(text))) {
          const token = jsTokens.matchToToken(match);
          yield {
            type: getTokenType(token, match.index, text),
            value: token.value,
          };
        }
      };
    }
    function highlight(text) {
      if (text === "") return "";
      const defs = getDefs(true);
      let highlighted = "";
      for (const { type, value } of tokenize(text)) {
        if (type in defs) {
          highlighted += value
            .split(NEWLINE$1)
            .map((str) => defs[type](str))
            .join("\n");
        } else {
          highlighted += value;
        }
      }
      return highlighted;
    }
    var deprecationWarningShown = false;
    var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
    function getMarkerLines(loc, source, opts) {
      const startLoc = Object.assign(
        {
          column: 0,
          line: -1,
        },
        loc.start,
      );
      const endLoc = Object.assign({}, startLoc, loc.end);
      const { linesAbove = 2, linesBelow = 3 } = opts || {};
      const startLine = startLoc.line;
      const startColumn = startLoc.column;
      const endLine = endLoc.line;
      const endColumn = endLoc.column;
      let start = Math.max(startLine - (linesAbove + 1), 0);
      let end = Math.min(source.length, endLine + linesBelow);
      if (startLine === -1) {
        start = 0;
      }
      if (endLine === -1) {
        end = source.length;
      }
      const lineDiff = endLine - startLine;
      const markerLines = {};
      if (lineDiff) {
        for (let i = 0; i <= lineDiff; i++) {
          const lineNumber = i + startLine;
          if (!startColumn) {
            markerLines[lineNumber] = true;
          } else if (i === 0) {
            const sourceLength = source[lineNumber - 1].length;
            markerLines[lineNumber] = [
              startColumn,
              sourceLength - startColumn + 1,
            ];
          } else if (i === lineDiff) {
            markerLines[lineNumber] = [0, endColumn];
          } else {
            const sourceLength = source[lineNumber - i].length;
            markerLines[lineNumber] = [0, sourceLength];
          }
        }
      } else {
        if (startColumn === endColumn) {
          if (startColumn) {
            markerLines[startLine] = [startColumn, 0];
          } else {
            markerLines[startLine] = true;
          }
        } else {
          markerLines[startLine] = [startColumn, endColumn - startColumn];
        }
      }
      return {
        start,
        end,
        markerLines,
      };
    }
    function codeFrameColumns(rawLines, loc, opts = {}) {
      const shouldHighlight =
        opts.forceColor || (isColorSupported() && opts.highlightCode);
      const defs = getDefs(shouldHighlight);
      const lines = rawLines.split(NEWLINE);
      const { start, end, markerLines } = getMarkerLines(loc, lines, opts);
      const hasColumns = loc.start && typeof loc.start.column === "number";
      const numberMaxWidth = String(end).length;
      const highlightedLines = shouldHighlight ? highlight(rawLines) : rawLines;
      let frame = highlightedLines
        .split(NEWLINE, end)
        .slice(start, end)
        .map((line, index2) => {
          const number = start + 1 + index2;
          const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
          const gutter = ` ${paddedNumber} |`;
          const hasMarker = markerLines[number];
          const lastMarkerLine = !markerLines[number + 1];
          if (hasMarker) {
            let markerLine = "";
            if (Array.isArray(hasMarker)) {
              const markerSpacing = line
                .slice(0, Math.max(hasMarker[0] - 1, 0))
                .replace(/[^\t]/g, " ");
              const numberOfMarkers = hasMarker[1] || 1;
              markerLine = [
                "\n ",
                defs.gutter(gutter.replace(/\d/g, " ")),
                " ",
                markerSpacing,
                defs.marker("^").repeat(numberOfMarkers),
              ].join("");
              if (lastMarkerLine && opts.message) {
                markerLine += " " + defs.message(opts.message);
              }
            }
            return [
              defs.marker(">"),
              defs.gutter(gutter),
              line.length > 0 ? ` ${line}` : "",
              markerLine,
            ].join("");
          } else {
            return ` ${defs.gutter(gutter)}${line.length > 0 ? ` ${line}` : ""}`;
          }
        })
        .join("\n");
      if (opts.message && !hasColumns) {
        frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}
${frame}`;
      }
      if (shouldHighlight) {
        return defs.reset(frame);
      } else {
        return frame;
      }
    }
    function index(rawLines, lineNumber, colNumber, opts = {}) {
      if (!deprecationWarningShown) {
        deprecationWarningShown = true;
        const message =
          "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
        if (process2.emitWarning) {
          process2.emitWarning(message, "DeprecationWarning");
        } else {
          const deprecationError = new Error(message);
          deprecationError.name = "DeprecationWarning";
          console.warn(new Error(message));
        }
      }
      colNumber = Math.max(colNumber, 0);
      const location = {
        start: {
          column: colNumber,
          line: lineNumber,
        },
      };
      return codeFrameColumns(rawLines, location, opts);
    }
    exports5.codeFrameColumns = codeFrameColumns;
    exports5.default = index;
    exports5.highlight = highlight;
  },
});

// mock-module:graceful-fs
var require_graceful_fs = __commonJS({
  "mock-module:graceful-fs"(exports5, module) {
    init_process_shim();
    init_Buffer();
    init_process();
    var fs = {
      readFileSync: () => "",
      writeFileSync: () => {},
      existsSync: () => false,
      close: function () {},
      open: function () {},
    };
    Object.defineProperties(fs, {
      close: {
        value: function () {},
        writable: true,
        configurable: true,
      },
    });
    module.exports = fs;
  },
});

// node-modules-polyfills:util
function dew$k() {
  if (_dewExec$k) return exports$k;
  _dewExec$k = true;
  exports$k = function hasSymbols() {
    if (
      typeof Symbol !== "function" ||
      typeof Object.getOwnPropertySymbols !== "function"
    ) {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (sym in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (
      typeof Object.getOwnPropertyNames === "function" &&
      Object.getOwnPropertyNames(obj).length !== 0
    ) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  return exports$k;
}
function dew$j() {
  if (_dewExec$j) return exports$j;
  _dewExec$j = true;
  exports$j = Error;
  return exports$j;
}
function dew$i() {
  if (_dewExec$i) return exports$i;
  _dewExec$i = true;
  exports$i = EvalError;
  return exports$i;
}
function dew$h() {
  if (_dewExec$h) return exports$h;
  _dewExec$h = true;
  exports$h = RangeError;
  return exports$h;
}
function dew$g() {
  if (_dewExec$g) return exports$g;
  _dewExec$g = true;
  exports$g = ReferenceError;
  return exports$g;
}
function dew$f() {
  if (_dewExec$f) return exports$f;
  _dewExec$f = true;
  exports$f = SyntaxError;
  return exports$f;
}
function dew$e() {
  if (_dewExec$e) return exports$e;
  _dewExec$e = true;
  exports$e = TypeError;
  return exports$e;
}
function dew$d() {
  if (_dewExec$d) return exports$d;
  _dewExec$d = true;
  exports$d = URIError;
  return exports$d;
}
function dew$c() {
  if (_dewExec$c) return exports$c;
  _dewExec$c = true;
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = dew$k();
  exports$c = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  return exports$c;
}
function dew$b() {
  if (_dewExec$b) return exports$b;
  _dewExec$b = true;
  var test = {
    __proto__: null,
    foo: {},
  };
  var $Object = Object;
  exports$b = function hasProto() {
    return (
      {
        __proto__: test,
      }.foo === test.foo && !(test instanceof $Object)
    );
  };
  return exports$b;
}
function dew$a() {
  if (_dewExec$a) return exports$a;
  _dewExec$a = true;
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var toStr = Object.prototype.toString;
  var max = Math.max;
  var funcType = "[object Function]";
  var concatty = function concatty2(a, b) {
    var arr = [];
    for (var i = 0; i < a.length; i += 1) {
      arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
      arr[j + a.length] = b[j];
    }
    return arr;
  };
  var slicy = function slicy2(arrLike, offset) {
    var arr = [];
    for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
      arr[j] = arrLike[i];
    }
    return arr;
  };
  var joiny = function (arr, joiner) {
    var str = "";
    for (var i = 0; i < arr.length; i += 1) {
      str += arr[i];
      if (i + 1 < arr.length) {
        str += joiner;
      }
    }
    return str;
  };
  exports$a = function bind(that) {
    var target = this;
    if (typeof target !== "function" || toStr.apply(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function () {
      if (this instanceof bound) {
        var result = target.apply(this, concatty(args, arguments));
        if (Object(result) === result) {
          return result;
        }
        return this;
      }
      return target.apply(that, concatty(args, arguments));
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
      boundArgs[i] = "$" + i;
    }
    bound = Function(
      "binder",
      "return function (" +
        joiny(boundArgs, ",") +
        "){ return binder.apply(this,arguments); }",
    )(binder);
    if (target.prototype) {
      var Empty = function Empty2() {};
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
  return exports$a;
}
function dew$9() {
  if (_dewExec$9) return exports$9;
  _dewExec$9 = true;
  var implementation = dew$a();
  exports$9 = Function.prototype.bind || implementation;
  return exports$9;
}
function dew$8() {
  if (_dewExec$8) return exports$8;
  _dewExec$8 = true;
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  var bind = dew$9();
  exports$8 = bind.call(call, $hasOwn);
  return exports$8;
}
function dew$7() {
  if (_dewExec$7) return exports$7;
  _dewExec$7 = true;
  var undefined$1;
  var $Error = dew$j();
  var $EvalError = dew$i();
  var $RangeError = dew$h();
  var $ReferenceError = dew$g();
  var $SyntaxError = dew$f();
  var $TypeError = dew$e();
  var $URIError = dew$d();
  var $Function = Function;
  var getEvalledConstructor = function (expressionSyntax) {
    try {
      return $Function(
        '"use strict"; return (' + expressionSyntax + ").constructor;",
      )();
    } catch (e) {}
  };
  var $gOPD = Object.getOwnPropertyDescriptor;
  if ($gOPD) {
    try {
      $gOPD({}, "");
    } catch (e) {
      $gOPD = null;
    }
  }
  var throwTypeError = function () {
    throw new $TypeError();
  };
  var ThrowTypeError = $gOPD
    ? (function () {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      })()
    : throwTypeError;
  var hasSymbols = dew$c()();
  var hasProto = dew$b()();
  var getProto =
    Object.getPrototypeOf ||
    (hasProto
      ? function (x) {
          return x.__proto__;
        }
      : null);
  var needsEval = {};
  var TypedArray =
    typeof Uint8Array === "undefined" || !getProto
      ? undefined$1
      : getProto(Uint8Array);
  var INTRINSICS = {
    __proto__: null,
    "%AggregateError%":
      typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%":
      typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
    "%ArrayIteratorPrototype%":
      hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
    "%AsyncFromSyncIteratorPrototype%": undefined$1,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
    "%BigInt64Array%":
      typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
    "%BigUint64Array%":
      typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": $Error,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": $EvalError,
    "%Float32Array%":
      typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
    "%Float64Array%":
      typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
    "%FinalizationRegistry%":
      typeof FinalizationRegistry === "undefined"
        ? undefined$1
        : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
    "%Int16Array%":
      typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
    "%Int32Array%":
      typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%":
      hasSymbols && getProto
        ? getProto(getProto([][Symbol.iterator]()))
        : undefined$1,
    "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
    "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
    "%MapIteratorPrototype%":
      typeof Map === "undefined" || !hasSymbols || !getProto
        ? undefined$1
        : getProto(/* @__PURE__ */ new Map()[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
    "%RangeError%": $RangeError,
    "%ReferenceError%": $ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
    "%SetIteratorPrototype%":
      typeof Set === "undefined" || !hasSymbols || !getProto
        ? undefined$1
        : getProto(/* @__PURE__ */ new Set()[Symbol.iterator]()),
    "%SharedArrayBuffer%":
      typeof SharedArrayBuffer === "undefined"
        ? undefined$1
        : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%":
      hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined$1,
    "%Symbol%": hasSymbols ? Symbol : undefined$1,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError,
    "%Uint8Array%":
      typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
    "%Uint8ClampedArray%":
      typeof Uint8ClampedArray === "undefined"
        ? undefined$1
        : Uint8ClampedArray,
    "%Uint16Array%":
      typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
    "%Uint32Array%":
      typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
    "%URIError%": $URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
  };
  if (getProto) {
    try {
      null.error;
    } catch (e) {
      var errorProto = getProto(getProto(e));
      INTRINSICS["%Error.prototype%"] = errorProto;
    }
  }
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto) {
        value = getProto(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": [
      "AsyncGeneratorFunction",
      "prototype",
      "prototype",
    ],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"],
  };
  var bind = dew$9();
  var hasOwn = dew$8();
  var $concat = bind.call(Function.call, Array.prototype.concat);
  var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
  var $replace = bind.call(Function.call, String.prototype.replace);
  var $strSlice = bind.call(Function.call, String.prototype.slice);
  var $exec = bind.call(Function.call, RegExp.prototype.exec);
  var rePropName =
    /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace(string, rePropName, function (match, number, quote, subString) {
      result[result.length] = quote
        ? $replace(subString, reEscapeChar, "$1")
        : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError(
          "intrinsic " +
            name +
            " exists, but is not available. Please file an issue!",
        );
      }
      return {
        alias,
        name: intrinsicName,
        value,
      };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  exports$7 = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
      throw new $SyntaxError(
        "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
      );
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic(
      "%" + intrinsicBaseName + "%",
      allowMissing,
    );
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i = 1, isOwn = true; i < parts.length; i += 1) {
      var part = parts[i];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if (
        (first === '"' ||
          first === "'" ||
          first === "`" ||
          last === '"' ||
          last === "'" ||
          last === "`") &&
        first !== last
      ) {
        throw new $SyntaxError(
          "property names with quotes must have matching quotes",
        );
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError(
              "base intrinsic for " +
                name +
                " exists, but the property is not available.",
            );
          }
          return void undefined$1;
        }
        if ($gOPD && i + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
  return exports$7;
}
function dew$6() {
  if (_dewExec$6) return exports$6;
  _dewExec$6 = true;
  var GetIntrinsic = dew$7();
  var $defineProperty = GetIntrinsic("%Object.defineProperty%", true) || false;
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", {
        value: 1,
      });
    } catch (e) {
      $defineProperty = false;
    }
  }
  exports$6 = $defineProperty;
  return exports$6;
}
function dew$5() {
  if (_dewExec$5) return exports$5;
  _dewExec$5 = true;
  var GetIntrinsic = dew$7();
  var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
  if ($gOPD) {
    try {
      $gOPD([], "length");
    } catch (e) {
      $gOPD = null;
    }
  }
  exports$5 = $gOPD;
  return exports$5;
}
function dew$4() {
  if (_dewExec$4) return exports$4;
  _dewExec$4 = true;
  var $defineProperty = dew$6();
  var $SyntaxError = dew$f();
  var $TypeError = dew$e();
  var gopd = dew$5();
  exports$4 = function defineDataProperty(obj, property, value) {
    if (!obj || (typeof obj !== "object" && typeof obj !== "function")) {
      throw new $TypeError("`obj` must be an object or a function`");
    }
    if (typeof property !== "string" && typeof property !== "symbol") {
      throw new $TypeError("`property` must be a string or a symbol`");
    }
    if (
      arguments.length > 3 &&
      typeof arguments[3] !== "boolean" &&
      arguments[3] !== null
    ) {
      throw new $TypeError(
        "`nonEnumerable`, if provided, must be a boolean or null",
      );
    }
    if (
      arguments.length > 4 &&
      typeof arguments[4] !== "boolean" &&
      arguments[4] !== null
    ) {
      throw new $TypeError(
        "`nonWritable`, if provided, must be a boolean or null",
      );
    }
    if (
      arguments.length > 5 &&
      typeof arguments[5] !== "boolean" &&
      arguments[5] !== null
    ) {
      throw new $TypeError(
        "`nonConfigurable`, if provided, must be a boolean or null",
      );
    }
    if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
      throw new $TypeError("`loose`, if provided, must be a boolean");
    }
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    var desc = !!gopd && gopd(obj, property);
    if ($defineProperty) {
      $defineProperty(obj, property, {
        configurable:
          nonConfigurable === null && desc
            ? desc.configurable
            : !nonConfigurable,
        enumerable:
          nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
        value,
        writable: nonWritable === null && desc ? desc.writable : !nonWritable,
      });
    } else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
      obj[property] = value;
    } else {
      throw new $SyntaxError(
        "This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.",
      );
    }
  };
  return exports$4;
}
function dew$3() {
  if (_dewExec$3) return exports$3;
  _dewExec$3 = true;
  var $defineProperty = dew$6();
  var hasPropertyDescriptors = function hasPropertyDescriptors2() {
    return !!$defineProperty;
  };
  hasPropertyDescriptors.hasArrayLengthDefineBug =
    function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return (
          $defineProperty([], "length", {
            value: 1,
          }).length !== 1
        );
      } catch (e) {
        return true;
      }
    };
  exports$3 = hasPropertyDescriptors;
  return exports$3;
}
function dew$22() {
  if (_dewExec$22) return exports$22;
  _dewExec$22 = true;
  var GetIntrinsic = dew$7();
  var define2 = dew$4();
  var hasDescriptors = dew$3()();
  var gOPD = dew$5();
  var $TypeError = dew$e();
  var $floor = GetIntrinsic("%Math.floor%");
  exports$22 = function setFunctionLength(fn, length) {
    if (typeof fn !== "function") {
      throw new $TypeError("`fn` is not a function");
    }
    if (
      typeof length !== "number" ||
      length < 0 ||
      length > 4294967295 ||
      $floor(length) !== length
    ) {
      throw new $TypeError("`length` must be a positive 32-bit integer");
    }
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ("length" in fn && gOPD) {
      var desc = gOPD(fn, "length");
      if (desc && !desc.configurable) {
        functionLengthIsConfigurable = false;
      }
      if (desc && !desc.writable) {
        functionLengthIsWritable = false;
      }
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
      if (hasDescriptors) {
        define2(
          /** @type {Parameters<define>[0]} */
          fn,
          "length",
          length,
          true,
          true,
        );
      } else {
        define2(
          /** @type {Parameters<define>[0]} */
          fn,
          "length",
          length,
        );
      }
    }
    return fn;
  };
  return exports$22;
}
function dew$12() {
  if (_dewExec$12) return exports$13;
  _dewExec$12 = true;
  var bind = dew$9();
  var GetIntrinsic = dew$7();
  var setFunctionLength = dew$22();
  var $TypeError = dew$e();
  var $apply = GetIntrinsic("%Function.prototype.apply%");
  var $call = GetIntrinsic("%Function.prototype.call%");
  var $reflectApply =
    GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
  var $defineProperty = dew$6();
  var $max = GetIntrinsic("%Math.max%");
  exports$13 = function callBind(originalFunction) {
    if (typeof originalFunction !== "function") {
      throw new $TypeError("a function is required");
    }
    var func = $reflectApply(bind, $call, arguments);
    return setFunctionLength(
      func,
      1 + $max(0, originalFunction.length - (arguments.length - 1)),
      true,
    );
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind, $apply, arguments);
  };
  if ($defineProperty) {
    $defineProperty(exports$13, "apply", {
      value: applyBind,
    });
  } else {
    exports$13.apply = applyBind;
  }
  return exports$13;
}
function dew3() {
  if (_dewExec3) return exports4;
  _dewExec3 = true;
  var GetIntrinsic = dew$7();
  var callBind = dew$12();
  var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
  exports4 = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
      return callBind(intrinsic);
    }
    return intrinsic;
  };
  return exports4;
}
function dew22() {
  if (_dewExec22) return exports22;
  _dewExec22 = true;
  if (typeof Object.create === "function") {
    exports22 = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
      }
    };
  } else {
    exports22 = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  return exports22;
}
function unimplemented3(name) {
  throw new Error(
    "Node.js process " +
      name +
      " is not supported by JSPM core outside of Node.js",
  );
}
function cleanUpNextTick3() {
  if (!draining3 || !currentQueue3) return;
  draining3 = false;
  if (currentQueue3.length) {
    queue3 = currentQueue3.concat(queue3);
  } else {
    queueIndex3 = -1;
  }
  if (queue3.length) drainQueue3();
}
function drainQueue3() {
  if (draining3) return;
  var timeout = setTimeout(cleanUpNextTick3, 0);
  draining3 = true;
  var len = queue3.length;
  while (len) {
    currentQueue3 = queue3;
    queue3 = [];
    while (++queueIndex3 < len) {
      if (currentQueue3) currentQueue3[queueIndex3].run();
    }
    queueIndex3 = -1;
    len = queue3.length;
  }
  currentQueue3 = null;
  draining3 = false;
  clearTimeout(timeout);
}
function nextTick3(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
  }
  queue3.push(new Item3(fun, args));
  if (queue3.length === 1 && !draining3) setTimeout(drainQueue3, 0);
}
function Item3(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop3() {}
function _linkedBinding3(name) {
  unimplemented3("_linkedBinding");
}
function dlopen3(name) {
  unimplemented3("dlopen");
}
function _getActiveRequests3() {
  return [];
}
function _getActiveHandles3() {
  return [];
}
function assert3(condition, message) {
  if (!condition) throw new Error(message || "assertion error");
}
function hasUncaughtExceptionCaptureCallback3() {
  return false;
}
function uptime3() {
  return _performance3.now() / 1e3;
}
function hrtime3(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance3.now()) * 1e-3);
  var clocktime = _performance3.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor((clocktime % 1) * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec3;
    }
  }
  return [seconds, nanoseconds];
}
function on3() {
  return process4;
}
function listeners3(name) {
  return [];
}
function dew$b2() {
  if (_dewExec$b2) return exports$c2;
  _dewExec$b2 = true;
  var hasSymbols = dew$k();
  exports$c2 = function hasToStringTagShams() {
    return hasSymbols() && !!Symbol.toStringTag;
  };
  return exports$c2;
}
function dew$a2() {
  if (_dewExec$a2) return exports$b2;
  _dewExec$a2 = true;
  var hasToStringTag = dew$b2()();
  var callBound = dew3();
  var $toString = callBound("Object.prototype.toString");
  var isStandardArguments = function isArguments(value) {
    if (
      hasToStringTag &&
      value &&
      typeof value === "object" &&
      Symbol.toStringTag in value
    ) {
      return false;
    }
    return $toString(value) === "[object Arguments]";
  };
  var isLegacyArguments = function isArguments(value) {
    if (isStandardArguments(value)) {
      return true;
    }
    return (
      value !== null &&
      typeof value === "object" &&
      typeof value.length === "number" &&
      value.length >= 0 &&
      $toString(value) !== "[object Array]" &&
      $toString(value.callee) === "[object Function]"
    );
  };
  var supportsStandardArguments = (function () {
    return isStandardArguments(arguments);
  })();
  isStandardArguments.isLegacyArguments = isLegacyArguments;
  exports$b2 = supportsStandardArguments
    ? isStandardArguments
    : isLegacyArguments;
  return exports$b2;
}
function dew$92() {
  if (_dewExec$92) return exports$a2;
  _dewExec$92 = true;
  var toStr = Object.prototype.toString;
  var fnToStr = Function.prototype.toString;
  var isFnRegex = /^\s*(?:function)?\*/;
  var hasToStringTag = dew$b2()();
  var getProto = Object.getPrototypeOf;
  var getGeneratorFunc = function () {
    if (!hasToStringTag) {
      return false;
    }
    try {
      return Function("return function*() {}")();
    } catch (e) {}
  };
  var GeneratorFunction;
  exports$a2 = function isGeneratorFunction(fn) {
    if (typeof fn !== "function") {
      return false;
    }
    if (isFnRegex.test(fnToStr.call(fn))) {
      return true;
    }
    if (!hasToStringTag) {
      var str = toStr.call(fn);
      return str === "[object GeneratorFunction]";
    }
    if (!getProto) {
      return false;
    }
    if (typeof GeneratorFunction === "undefined") {
      var generatorFunc = getGeneratorFunc();
      GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
    }
    return getProto(fn) === GeneratorFunction;
  };
  return exports$a2;
}
function dew$82() {
  if (_dewExec$82) return exports$92;
  _dewExec$82 = true;
  var fnToStr = Function.prototype.toString;
  var reflectApply =
    typeof Reflect === "object" && Reflect !== null && Reflect.apply;
  var badArrayLike;
  var isCallableMarker;
  if (
    typeof reflectApply === "function" &&
    typeof Object.defineProperty === "function"
  ) {
    try {
      badArrayLike = Object.defineProperty({}, "length", {
        get: function () {
          throw isCallableMarker;
        },
      });
      isCallableMarker = {};
      reflectApply(
        function () {
          throw 42;
        },
        null,
        badArrayLike,
      );
    } catch (_) {
      if (_ !== isCallableMarker) {
        reflectApply = null;
      }
    }
  } else {
    reflectApply = null;
  }
  var constructorRegex = /^\s*class\b/;
  var isES6ClassFn = function isES6ClassFunction(value) {
    try {
      var fnStr = fnToStr.call(value);
      return constructorRegex.test(fnStr);
    } catch (e) {
      return false;
    }
  };
  var tryFunctionObject = function tryFunctionToStr(value) {
    try {
      if (isES6ClassFn(value)) {
        return false;
      }
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr = Object.prototype.toString;
  var objectClass = "[object Object]";
  var fnClass = "[object Function]";
  var genClass = "[object GeneratorFunction]";
  var ddaClass = "[object HTMLAllCollection]";
  var ddaClass2 = "[object HTML document.all class]";
  var ddaClass3 = "[object HTMLCollection]";
  var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
  var isIE68 = !(0 in [,]);
  var isDDA = function isDocumentDotAll() {
    return false;
  };
  if (typeof document === "object") {
    var all = document.all;
    if (toStr.call(all) === toStr.call(document.all)) {
      isDDA = function isDocumentDotAll(value) {
        if (
          (isIE68 || !value) &&
          (typeof value === "undefined" || typeof value === "object")
        ) {
          try {
            var str = toStr.call(value);
            return (
              (str === ddaClass ||
                str === ddaClass2 ||
                str === ddaClass3 ||
                str === objectClass) &&
              value("") == null
            );
          } catch (e) {}
        }
        return false;
      };
    }
  }
  exports$92 = reflectApply
    ? function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        try {
          reflectApply(value, null, badArrayLike);
        } catch (e) {
          if (e !== isCallableMarker) {
            return false;
          }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value);
      }
    : function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        if (hasToStringTag) {
          return tryFunctionObject(value);
        }
        if (isES6ClassFn(value)) {
          return false;
        }
        var strClass = toStr.call(value);
        if (
          strClass !== fnClass &&
          strClass !== genClass &&
          !/^\[object HTML/.test(strClass)
        ) {
          return false;
        }
        return tryFunctionObject(value);
      };
  return exports$92;
}
function dew$72() {
  if (_dewExec$72) return exports$82;
  _dewExec$72 = true;
  var isCallable = dew$82();
  var toStr = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var forEachArray = function forEachArray2(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (hasOwnProperty.call(array, i)) {
        if (receiver == null) {
          iterator(array[i], i, array);
        } else {
          iterator.call(receiver, array[i], i, array);
        }
      }
    }
  };
  var forEachString = function forEachString2(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
      if (receiver == null) {
        iterator(string.charAt(i), i, string);
      } else {
        iterator.call(receiver, string.charAt(i), i, string);
      }
    }
  };
  var forEachObject = function forEachObject2(object, iterator, receiver) {
    for (var k in object) {
      if (hasOwnProperty.call(object, k)) {
        if (receiver == null) {
          iterator(object[k], k, object);
        } else {
          iterator.call(receiver, object[k], k, object);
        }
      }
    }
  };
  var forEach = function forEach2(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
      throw new TypeError("iterator must be a function");
    }
    var receiver;
    if (arguments.length >= 3) {
      receiver = thisArg;
    }
    if (toStr.call(list) === "[object Array]") {
      forEachArray(list, iterator, receiver);
    } else if (typeof list === "string") {
      forEachString(list, iterator, receiver);
    } else {
      forEachObject(list, iterator, receiver);
    }
  };
  exports$82 = forEach;
  return exports$82;
}
function dew$62() {
  if (_dewExec$62) return exports$72;
  _dewExec$62 = true;
  exports$72 = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
  ];
  return exports$72;
}
function dew$52() {
  if (_dewExec$52) return exports$62;
  _dewExec$52 = true;
  var possibleNames = dew$62();
  var g = typeof globalThis === "undefined" ? _global$2 : globalThis;
  exports$62 = function availableTypedArrays() {
    var out = [];
    for (var i = 0; i < possibleNames.length; i++) {
      if (typeof g[possibleNames[i]] === "function") {
        out[out.length] = possibleNames[i];
      }
    }
    return out;
  };
  return exports$62;
}
function dew$42() {
  if (_dewExec$42) return exports$52;
  _dewExec$42 = true;
  var forEach = dew$72();
  var availableTypedArrays = dew$52();
  var callBind = dew$12();
  var callBound = dew3();
  var gOPD = dew$5();
  var $toString = callBound("Object.prototype.toString");
  var hasToStringTag = dew$b2()();
  var g = typeof globalThis === "undefined" ? _global$1 : globalThis;
  var typedArrays = availableTypedArrays();
  var $slice = callBound("String.prototype.slice");
  var getPrototypeOf = Object.getPrototypeOf;
  var $indexOf =
    callBound("Array.prototype.indexOf", true) ||
    function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
  var cache = {
    __proto__: null,
  };
  if (hasToStringTag && gOPD && getPrototypeOf) {
    forEach(typedArrays, function (typedArray) {
      var arr = new g[typedArray]();
      if (Symbol.toStringTag in arr) {
        var proto = getPrototypeOf(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor) {
          var superProto = getPrototypeOf(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        cache["$" + typedArray] = callBind(descriptor.get);
      }
    });
  } else {
    forEach(typedArrays, function (typedArray) {
      var arr = new g[typedArray]();
      var fn = arr.slice || arr.set;
      if (fn) {
        cache["$" + typedArray] = callBind(fn);
      }
    });
  }
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var found = false;
    forEach(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      cache,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function (getter, typedArray) {
        if (!found) {
          try {
            if ("$" + getter(value) === typedArray) {
              found = $slice(typedArray, 1);
            }
          } catch (e) {}
        }
      },
    );
    return found;
  };
  var trySlices = function tryAllSlices(value) {
    var found = false;
    forEach(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      cache,
      /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
      function (getter, name) {
        if (!found) {
          try {
            getter(value);
            found = $slice(name, 1);
          } catch (e) {}
        }
      },
    );
    return found;
  };
  exports$52 = function whichTypedArray(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (!hasToStringTag) {
      var tag = $slice($toString(value), 8, -1);
      if ($indexOf(typedArrays, tag) > -1) {
        return tag;
      }
      if (tag !== "Object") {
        return false;
      }
      return trySlices(value);
    }
    if (!gOPD) {
      return null;
    }
    return tryTypedArrays(value);
  };
  return exports$52;
}
function dew$32() {
  if (_dewExec$32) return exports$42;
  _dewExec$32 = true;
  var whichTypedArray = dew$42();
  exports$42 = function isTypedArray(value) {
    return !!whichTypedArray(value);
  };
  return exports$42;
}
function dew$222() {
  if (_dewExec$222) return exports$32;
  _dewExec$222 = true;
  var isArgumentsObject = dew$a2();
  var isGeneratorFunction = dew$92();
  var whichTypedArray = dew$42();
  var isTypedArray = dew$32();
  function uncurryThis(f) {
    return f.call.bind(f);
  }
  var BigIntSupported = typeof BigInt !== "undefined";
  var SymbolSupported = typeof Symbol !== "undefined";
  var ObjectToString = uncurryThis(Object.prototype.toString);
  var numberValue = uncurryThis(Number.prototype.valueOf);
  var stringValue = uncurryThis(String.prototype.valueOf);
  var booleanValue = uncurryThis(Boolean.prototype.valueOf);
  if (BigIntSupported) {
    var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
  }
  if (SymbolSupported) {
    var symbolValue = uncurryThis(Symbol.prototype.valueOf);
  }
  function checkBoxedPrimitive(value, prototypeValueOf) {
    if (typeof value !== "object") {
      return false;
    }
    try {
      prototypeValueOf(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  exports$32.isArgumentsObject = isArgumentsObject;
  exports$32.isGeneratorFunction = isGeneratorFunction;
  exports$32.isTypedArray = isTypedArray;
  function isPromise(input) {
    return (
      (typeof Promise !== "undefined" && input instanceof Promise) ||
      (input !== null &&
        typeof input === "object" &&
        typeof input.then === "function" &&
        typeof input.catch === "function")
    );
  }
  exports$32.isPromise = isPromise;
  function isArrayBufferView(value) {
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      return ArrayBuffer.isView(value);
    }
    return isTypedArray(value) || isDataView(value);
  }
  exports$32.isArrayBufferView = isArrayBufferView;
  function isUint8Array(value) {
    return whichTypedArray(value) === "Uint8Array";
  }
  exports$32.isUint8Array = isUint8Array;
  function isUint8ClampedArray(value) {
    return whichTypedArray(value) === "Uint8ClampedArray";
  }
  exports$32.isUint8ClampedArray = isUint8ClampedArray;
  function isUint16Array(value) {
    return whichTypedArray(value) === "Uint16Array";
  }
  exports$32.isUint16Array = isUint16Array;
  function isUint32Array(value) {
    return whichTypedArray(value) === "Uint32Array";
  }
  exports$32.isUint32Array = isUint32Array;
  function isInt8Array(value) {
    return whichTypedArray(value) === "Int8Array";
  }
  exports$32.isInt8Array = isInt8Array;
  function isInt16Array(value) {
    return whichTypedArray(value) === "Int16Array";
  }
  exports$32.isInt16Array = isInt16Array;
  function isInt32Array(value) {
    return whichTypedArray(value) === "Int32Array";
  }
  exports$32.isInt32Array = isInt32Array;
  function isFloat32Array(value) {
    return whichTypedArray(value) === "Float32Array";
  }
  exports$32.isFloat32Array = isFloat32Array;
  function isFloat64Array(value) {
    return whichTypedArray(value) === "Float64Array";
  }
  exports$32.isFloat64Array = isFloat64Array;
  function isBigInt64Array(value) {
    return whichTypedArray(value) === "BigInt64Array";
  }
  exports$32.isBigInt64Array = isBigInt64Array;
  function isBigUint64Array(value) {
    return whichTypedArray(value) === "BigUint64Array";
  }
  exports$32.isBigUint64Array = isBigUint64Array;
  function isMapToString(value) {
    return ObjectToString(value) === "[object Map]";
  }
  isMapToString.working =
    typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
  function isMap(value) {
    if (typeof Map === "undefined") {
      return false;
    }
    return isMapToString.working ? isMapToString(value) : value instanceof Map;
  }
  exports$32.isMap = isMap;
  function isSetToString(value) {
    return ObjectToString(value) === "[object Set]";
  }
  isSetToString.working =
    typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
  function isSet(value) {
    if (typeof Set === "undefined") {
      return false;
    }
    return isSetToString.working ? isSetToString(value) : value instanceof Set;
  }
  exports$32.isSet = isSet;
  function isWeakMapToString(value) {
    return ObjectToString(value) === "[object WeakMap]";
  }
  isWeakMapToString.working =
    typeof WeakMap !== "undefined" &&
    isWeakMapToString(/* @__PURE__ */ new WeakMap());
  function isWeakMap(value) {
    if (typeof WeakMap === "undefined") {
      return false;
    }
    return isWeakMapToString.working
      ? isWeakMapToString(value)
      : value instanceof WeakMap;
  }
  exports$32.isWeakMap = isWeakMap;
  function isWeakSetToString(value) {
    return ObjectToString(value) === "[object WeakSet]";
  }
  isWeakSetToString.working =
    typeof WeakSet !== "undefined" &&
    isWeakSetToString(/* @__PURE__ */ new WeakSet());
  function isWeakSet(value) {
    return isWeakSetToString(value);
  }
  exports$32.isWeakSet = isWeakSet;
  function isArrayBufferToString(value) {
    return ObjectToString(value) === "[object ArrayBuffer]";
  }
  isArrayBufferToString.working =
    typeof ArrayBuffer !== "undefined" &&
    isArrayBufferToString(new ArrayBuffer());
  function isArrayBuffer(value) {
    if (typeof ArrayBuffer === "undefined") {
      return false;
    }
    return isArrayBufferToString.working
      ? isArrayBufferToString(value)
      : value instanceof ArrayBuffer;
  }
  exports$32.isArrayBuffer = isArrayBuffer;
  function isDataViewToString(value) {
    return ObjectToString(value) === "[object DataView]";
  }
  isDataViewToString.working =
    typeof ArrayBuffer !== "undefined" &&
    typeof DataView !== "undefined" &&
    isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
  function isDataView(value) {
    if (typeof DataView === "undefined") {
      return false;
    }
    return isDataViewToString.working
      ? isDataViewToString(value)
      : value instanceof DataView;
  }
  exports$32.isDataView = isDataView;
  var SharedArrayBufferCopy =
    typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
  function isSharedArrayBufferToString(value) {
    return ObjectToString(value) === "[object SharedArrayBuffer]";
  }
  function isSharedArrayBuffer(value) {
    if (typeof SharedArrayBufferCopy === "undefined") {
      return false;
    }
    if (typeof isSharedArrayBufferToString.working === "undefined") {
      isSharedArrayBufferToString.working = isSharedArrayBufferToString(
        new SharedArrayBufferCopy(),
      );
    }
    return isSharedArrayBufferToString.working
      ? isSharedArrayBufferToString(value)
      : value instanceof SharedArrayBufferCopy;
  }
  exports$32.isSharedArrayBuffer = isSharedArrayBuffer;
  function isAsyncFunction(value) {
    return ObjectToString(value) === "[object AsyncFunction]";
  }
  exports$32.isAsyncFunction = isAsyncFunction;
  function isMapIterator(value) {
    return ObjectToString(value) === "[object Map Iterator]";
  }
  exports$32.isMapIterator = isMapIterator;
  function isSetIterator(value) {
    return ObjectToString(value) === "[object Set Iterator]";
  }
  exports$32.isSetIterator = isSetIterator;
  function isGeneratorObject(value) {
    return ObjectToString(value) === "[object Generator]";
  }
  exports$32.isGeneratorObject = isGeneratorObject;
  function isWebAssemblyCompiledModule(value) {
    return ObjectToString(value) === "[object WebAssembly.Module]";
  }
  exports$32.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
  function isNumberObject(value) {
    return checkBoxedPrimitive(value, numberValue);
  }
  exports$32.isNumberObject = isNumberObject;
  function isStringObject(value) {
    return checkBoxedPrimitive(value, stringValue);
  }
  exports$32.isStringObject = isStringObject;
  function isBooleanObject(value) {
    return checkBoxedPrimitive(value, booleanValue);
  }
  exports$32.isBooleanObject = isBooleanObject;
  function isBigIntObject(value) {
    return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
  }
  exports$32.isBigIntObject = isBigIntObject;
  function isSymbolObject(value) {
    return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
  }
  exports$32.isSymbolObject = isSymbolObject;
  function isBoxedPrimitive(value) {
    return (
      isNumberObject(value) ||
      isStringObject(value) ||
      isBooleanObject(value) ||
      isBigIntObject(value) ||
      isSymbolObject(value)
    );
  }
  exports$32.isBoxedPrimitive = isBoxedPrimitive;
  function isAnyArrayBuffer(value) {
    return (
      typeof Uint8Array !== "undefined" &&
      (isArrayBuffer(value) || isSharedArrayBuffer(value))
    );
  }
  exports$32.isAnyArrayBuffer = isAnyArrayBuffer;
  ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(
    function (method) {
      Object.defineProperty(exports$32, method, {
        enumerable: false,
        value: function () {
          throw new Error(method + " is not supported in userland");
        },
      });
    },
  );
  return exports$32;
}
function dew$122() {
  if (_dewExec$122) return exports$222;
  _dewExec$122 = true;
  exports$222 = function isBuffer2(arg) {
    return (
      arg &&
      typeof arg === "object" &&
      typeof arg.copy === "function" &&
      typeof arg.fill === "function" &&
      typeof arg.readUInt8 === "function"
    );
  };
  return exports$222;
}
function dew32() {
  if (_dewExec32) return exports$122;
  _dewExec32 = true;
  var process$1 = process4;
  var getOwnPropertyDescriptors =
    Object.getOwnPropertyDescriptors ||
    function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
  var formatRegExp = /%[sdj%]/g;
  exports$122.format = function (f) {
    if (!isString2(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect2(arguments[i]));
      }
      return objects.join(" ");
    }
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function (x2) {
      if (x2 === "%%") return "%";
      if (i >= len) return x2;
      switch (x2) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
        default:
          return x2;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull2(x) || !isObject2(x)) {
        str += " " + x;
      } else {
        str += " " + inspect2(x);
      }
    }
    return str;
  };
  exports$122.deprecate = function (fn, msg) {
    if (typeof process$1 !== "undefined" && process$1.noDeprecation === true) {
      return fn;
    }
    if (typeof process$1 === "undefined") {
      return function () {
        return exports$122.deprecate(fn, msg).apply(this || _global, arguments);
      };
    }
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process$1.throwDeprecation) {
          throw new Error(msg);
        } else if (process$1.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this || _global, arguments);
    }
    return deprecated;
  };
  var debugs = {};
  var debugEnvRegex = /^$/;
  if (process$1.env.NODE_DEBUG) {
    var debugEnv = process$1.env.NODE_DEBUG;
    debugEnv = debugEnv
      .replace(/[|\\{}()[\]^$+?.]/g, "\\$&")
      .replace(/\*/g, ".*")
      .replace(/,/g, "$|^")
      .toUpperCase();
    debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
  }
  exports$122.debuglog = function (set) {
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (debugEnvRegex.test(set)) {
        var pid22 = process$1.pid;
        debugs[set] = function () {
          var msg = exports$122.format.apply(exports$122, arguments);
          console.error("%s %d: %s", set, pid22, msg);
        };
      } else {
        debugs[set] = function () {};
      }
    }
    return debugs[set];
  };
  function inspect2(obj, opts) {
    var ctx = {
      seen: [],
      stylize: stylizeNoColor,
    };
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean2(opts)) {
      ctx.showHidden = opts;
    } else if (opts) {
      exports$122._extend(ctx, opts);
    }
    if (isUndefined2(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined2(ctx.depth)) ctx.depth = 2;
    if (isUndefined2(ctx.colors)) ctx.colors = false;
    if (isUndefined2(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  exports$122.inspect = inspect2;
  inspect2.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39],
  };
  inspect2.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    // "name": intentionally not styling
    regexp: "red",
  };
  function stylizeWithColor(str, styleType) {
    var style = inspect2.styles[styleType];
    if (style) {
      return (
        "\x1B[" +
        inspect2.colors[style][0] +
        "m" +
        str +
        "\x1B[" +
        inspect2.colors[style][1] +
        "m"
      );
    } else {
      return str;
    }
  }
  function stylizeNoColor(str, styleType) {
    return str;
  }
  function arrayToHash(array) {
    var hash = {};
    array.forEach(function (val, idx) {
      hash[val] = true;
    });
    return hash;
  }
  function formatValue(ctx, value, recurseTimes) {
    if (
      ctx.customInspect &&
      value &&
      isFunction2(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== exports$122.inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)
    ) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString2(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }
    if (
      isError2(value) &&
      (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)
    ) {
      return formatError(value);
    }
    if (keys.length === 0) {
      if (isFunction2(value)) {
        var name = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name + "]", "special");
      }
      if (isRegExp2(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate2(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date");
      }
      if (isError2(value)) {
        return formatError(value);
      }
    }
    var base = "",
      array = false,
      braces = ["{", "}"];
    if (isArray2(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (isFunction2(value)) {
      var n = value.name ? ": " + value.name : "";
      base = " [Function" + n + "]";
    }
    if (isRegExp2(value)) {
      base = " " + RegExp.prototype.toString.call(value);
    }
    if (isDate2(value)) {
      base = " " + Date.prototype.toUTCString.call(value);
    }
    if (isError2(value)) {
      base = " " + formatError(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }
    if (recurseTimes < 0) {
      if (isRegExp2(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      } else {
        return ctx.stylize("[Object]", "special");
      }
    }
    ctx.seen.push(value);
    var output2;
    if (array) {
      output2 = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output2 = keys.map(function (key) {
        return formatProperty(
          ctx,
          value,
          recurseTimes,
          visibleKeys,
          key,
          array,
        );
      });
    }
    ctx.seen.pop();
    return reduceToSingleString(output2, base, braces);
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined2(value)) return ctx.stylize("undefined", "undefined");
    if (isString2(value)) {
      var simple =
        "'" +
        JSON.stringify(value)
          .replace(/^"|"$/g, "")
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"') +
        "'";
      return ctx.stylize(simple, "string");
    }
    if (isNumber2(value)) return ctx.stylize("" + value, "number");
    if (isBoolean2(value)) return ctx.stylize("" + value, "boolean");
    if (isNull2(value)) return ctx.stylize("null", "null");
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output2 = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output2.push(
          formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true,
          ),
        );
      } else {
        output2.push("");
      }
    }
    keys.forEach(function (key) {
      if (!key.match(/^\d+$/)) {
        output2.push(
          formatProperty(ctx, value, recurseTimes, visibleKeys, key, true),
        );
      }
    });
    return output2;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || {
      value: value[key],
    };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize("[Getter/Setter]", "special");
      } else {
        str = ctx.stylize("[Getter]", "special");
      }
    } else {
      if (desc.set) {
        str = ctx.stylize("[Setter]", "special");
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = "[" + key + "]";
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull2(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str
              .split("\n")
              .map(function (line) {
                return "  " + line;
              })
              .join("\n")
              .slice(2);
          } else {
            str =
              "\n" +
              str
                .split("\n")
                .map(function (line) {
                  return "   " + line;
                })
                .join("\n");
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special");
      }
    }
    if (isUndefined2(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify("" + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.slice(1, -1);
        name = ctx.stylize(name, "name");
      } else {
        name = name
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"')
          .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, "string");
      }
    }
    return name + ": " + str;
  }
  function reduceToSingleString(output2, base, braces) {
    var length = output2.reduce(function (prev, cur) {
      if (cur.indexOf("\n") >= 0);
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) {
      return (
        braces[0] +
        (base === "" ? "" : base + "\n ") +
        " " +
        output2.join(",\n  ") +
        " " +
        braces[1]
      );
    }
    return braces[0] + base + " " + output2.join(", ") + " " + braces[1];
  }
  exports$122.types = dew$222();
  function isArray2(ar) {
    return Array.isArray(ar);
  }
  exports$122.isArray = isArray2;
  function isBoolean2(arg) {
    return typeof arg === "boolean";
  }
  exports$122.isBoolean = isBoolean2;
  function isNull2(arg) {
    return arg === null;
  }
  exports$122.isNull = isNull2;
  function isNullOrUndefined2(arg) {
    return arg == null;
  }
  exports$122.isNullOrUndefined = isNullOrUndefined2;
  function isNumber2(arg) {
    return typeof arg === "number";
  }
  exports$122.isNumber = isNumber2;
  function isString2(arg) {
    return typeof arg === "string";
  }
  exports$122.isString = isString2;
  function isSymbol2(arg) {
    return typeof arg === "symbol";
  }
  exports$122.isSymbol = isSymbol2;
  function isUndefined2(arg) {
    return arg === void 0;
  }
  exports$122.isUndefined = isUndefined2;
  function isRegExp2(re) {
    return isObject2(re) && objectToString(re) === "[object RegExp]";
  }
  exports$122.isRegExp = isRegExp2;
  exports$122.types.isRegExp = isRegExp2;
  function isObject2(arg) {
    return typeof arg === "object" && arg !== null;
  }
  exports$122.isObject = isObject2;
  function isDate2(d) {
    return isObject2(d) && objectToString(d) === "[object Date]";
  }
  exports$122.isDate = isDate2;
  exports$122.types.isDate = isDate2;
  function isError2(e) {
    return (
      isObject2(e) &&
      (objectToString(e) === "[object Error]" || e instanceof Error)
    );
  }
  exports$122.isError = isError2;
  exports$122.types.isNativeError = isError2;
  function isFunction2(arg) {
    return typeof arg === "function";
  }
  exports$122.isFunction = isFunction2;
  function isPrimitive2(arg) {
    return (
      arg === null ||
      typeof arg === "boolean" ||
      typeof arg === "number" ||
      typeof arg === "string" ||
      typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined"
    );
  }
  exports$122.isPrimitive = isPrimitive2;
  exports$122.isBuffer = dew$122();
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  function pad(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
  }
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function timestamp() {
    var d = /* @__PURE__ */ new Date();
    var time = [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds()),
    ].join(":");
    return [d.getDate(), months[d.getMonth()], time].join(" ");
  }
  exports$122.log = function () {
    console.log(
      "%s - %s",
      timestamp(),
      exports$122.format.apply(exports$122, arguments),
    );
  };
  exports$122.inherits = dew22();
  exports$122._extend = function (origin, add) {
    if (!add || !isObject2(add)) return origin;
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  };
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var kCustomPromisifiedSymbol =
    typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
  exports$122.promisify = function promisify2(original) {
    if (typeof original !== "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
      fn = original[kCustomPromisifiedSymbol];
      if (typeof fn !== "function") {
        throw new TypeError(
          'The "util.promisify.custom" argument must be of type Function',
        );
      }
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true,
      });
      return fn;
    }
    function fn() {
      var promiseResolve, promiseReject;
      var promise = new Promise(function (resolve2, reject) {
        promiseResolve = resolve2;
        promiseReject = reject;
      });
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      args.push(function (err, value) {
        if (err) {
          promiseReject(err);
        } else {
          promiseResolve(value);
        }
      });
      try {
        original.apply(this || _global, args);
      } catch (err) {
        promiseReject(err);
      }
      return promise;
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol)
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true,
      });
    return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
  };
  exports$122.promisify.custom = kCustomPromisifiedSymbol;
  function callbackifyOnRejected(reason, cb) {
    if (!reason) {
      var newReason = new Error("Promise was rejected with a falsy value");
      newReason.reason = reason;
      reason = newReason;
    }
    return cb(reason);
  }
  function callbackify2(original) {
    if (typeof original !== "function") {
      throw new TypeError('The "original" argument must be of type Function');
    }
    function callbackified() {
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      var maybeCb = args.pop();
      if (typeof maybeCb !== "function") {
        throw new TypeError("The last argument must be of type Function");
      }
      var self2 = this || _global;
      var cb = function () {
        return maybeCb.apply(self2, arguments);
      };
      original.apply(this || _global, args).then(
        function (ret) {
          process$1.nextTick(cb.bind(null, null, ret));
        },
        function (rej) {
          process$1.nextTick(callbackifyOnRejected.bind(null, rej, cb));
        },
      );
    }
    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
    return callbackified;
  }
  exports$122.callbackify = callbackify2;
  return exports$122;
}
var exports$k,
  _dewExec$k,
  exports$j,
  _dewExec$j,
  exports$i,
  _dewExec$i,
  exports$h,
  _dewExec$h,
  exports$g,
  _dewExec$g,
  exports$f,
  _dewExec$f,
  exports$e,
  _dewExec$e,
  exports$d,
  _dewExec$d,
  exports$c,
  _dewExec$c,
  exports$b,
  _dewExec$b,
  exports$a,
  _dewExec$a,
  exports$9,
  _dewExec$9,
  exports$8,
  _dewExec$8,
  exports$7,
  _dewExec$7,
  exports$6,
  _dewExec$6,
  exports$5,
  _dewExec$5,
  exports$4,
  _dewExec$4,
  exports$3,
  _dewExec$3,
  exports$22,
  _dewExec$22,
  exports$13,
  _dewExec$12,
  exports4,
  _dewExec3,
  exports22,
  _dewExec22,
  queue3,
  draining3,
  currentQueue3,
  queueIndex3,
  title3,
  arch3,
  platform3,
  env3,
  argv3,
  execArgv3,
  version3,
  versions3,
  emitWarning3,
  binding3,
  umask3,
  cwd3,
  chdir3,
  release3,
  _rawDebug3,
  moduleLoadList3,
  domain3,
  _exiting3,
  config3,
  reallyExit3,
  _kill3,
  cpuUsage3,
  resourceUsage3,
  memoryUsage3,
  kill3,
  exit3,
  openStdin3,
  allowedNodeEnvironmentFlags3,
  features3,
  _fatalExceptions3,
  setUncaughtExceptionCaptureCallback3,
  _tickCallback3,
  _debugProcess3,
  _debugEnd3,
  _startProfilerIdleNotifier3,
  _stopProfilerIdleNotifier3,
  stdout3,
  stderr3,
  stdin3,
  abort3,
  pid3,
  ppid3,
  execPath3,
  debugPort3,
  argv03,
  _preload_modules3,
  setSourceMapsEnabled3,
  _performance3,
  nowOffset3,
  nanoPerSec3,
  _maxListeners3,
  _events3,
  _eventsCount3,
  addListener3,
  once3,
  off3,
  removeListener3,
  removeAllListeners3,
  emit3,
  prependListener3,
  prependOnceListener3,
  process4,
  exports$c2,
  _dewExec$b2,
  exports$b2,
  _dewExec$a2,
  exports$a2,
  _dewExec$92,
  exports$92,
  _dewExec$82,
  exports$82,
  _dewExec$72,
  exports$72,
  _dewExec$62,
  exports$62,
  _dewExec$52,
  _global$2,
  exports$52,
  _dewExec$42,
  _global$1,
  exports$42,
  _dewExec$32,
  exports$32,
  _dewExec$222,
  exports$222,
  _dewExec$122,
  exports$122,
  _dewExec32,
  _global,
  exports32,
  _extend,
  callbackify,
  debuglog,
  deprecate,
  format2,
  inherits,
  inspect,
  isArray,
  isBoolean,
  isBuffer,
  isDate,
  isError,
  isFunction,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPrimitive,
  isRegExp,
  isString,
  isSymbol,
  isUndefined,
  log,
  promisify,
  types,
  TextEncoder,
  TextDecoder;
var init_util = __esm({
  "node-modules-polyfills:util"() {
    init_process_shim();
    init_Buffer();
    init_process();
    exports$k = {};
    _dewExec$k = false;
    exports$j = {};
    _dewExec$j = false;
    exports$i = {};
    _dewExec$i = false;
    exports$h = {};
    _dewExec$h = false;
    exports$g = {};
    _dewExec$g = false;
    exports$f = {};
    _dewExec$f = false;
    exports$e = {};
    _dewExec$e = false;
    exports$d = {};
    _dewExec$d = false;
    exports$c = {};
    _dewExec$c = false;
    exports$b = {};
    _dewExec$b = false;
    exports$a = {};
    _dewExec$a = false;
    exports$9 = {};
    _dewExec$9 = false;
    exports$8 = {};
    _dewExec$8 = false;
    exports$7 = {};
    _dewExec$7 = false;
    exports$6 = {};
    _dewExec$6 = false;
    exports$5 = {};
    _dewExec$5 = false;
    exports$4 = {};
    _dewExec$4 = false;
    exports$3 = {};
    _dewExec$3 = false;
    exports$22 = {};
    _dewExec$22 = false;
    exports$13 = {};
    _dewExec$12 = false;
    exports4 = {};
    _dewExec3 = false;
    exports22 = {};
    _dewExec22 = false;
    queue3 = [];
    draining3 = false;
    queueIndex3 = -1;
    Item3.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    title3 = "browser";
    arch3 = "x64";
    platform3 = "browser";
    env3 = {
      PATH: "/usr/bin",
      LANG: navigator.language + ".UTF-8",
      PWD: "/",
      HOME: "/home",
      TMP: "/tmp",
    };
    argv3 = ["/usr/bin/node"];
    execArgv3 = [];
    version3 = "v16.8.0";
    versions3 = {};
    emitWarning3 = function (message, type) {
      console.warn((type ? type + ": " : "") + message);
    };
    binding3 = function (name) {
      unimplemented3("binding");
    };
    umask3 = function (mask) {
      return 0;
    };
    cwd3 = function () {
      return "/";
    };
    chdir3 = function (dir) {};
    release3 = {
      name: "node",
      sourceUrl: "",
      headersUrl: "",
      libUrl: "",
    };
    _rawDebug3 = noop3;
    moduleLoadList3 = [];
    domain3 = {};
    _exiting3 = false;
    config3 = {};
    reallyExit3 = noop3;
    _kill3 = noop3;
    cpuUsage3 = function () {
      return {};
    };
    resourceUsage3 = cpuUsage3;
    memoryUsage3 = cpuUsage3;
    kill3 = noop3;
    exit3 = noop3;
    openStdin3 = noop3;
    allowedNodeEnvironmentFlags3 = {};
    features3 = {
      inspector: false,
      debug: false,
      uv: false,
      ipv6: false,
      tls_alpn: false,
      tls_sni: false,
      tls_ocsp: false,
      tls: false,
      cached_builtins: true,
    };
    _fatalExceptions3 = noop3;
    setUncaughtExceptionCaptureCallback3 = noop3;
    _tickCallback3 = noop3;
    _debugProcess3 = noop3;
    _debugEnd3 = noop3;
    _startProfilerIdleNotifier3 = noop3;
    _stopProfilerIdleNotifier3 = noop3;
    stdout3 = void 0;
    stderr3 = void 0;
    stdin3 = void 0;
    abort3 = noop3;
    pid3 = 2;
    ppid3 = 1;
    execPath3 = "/bin/usr/node";
    debugPort3 = 9229;
    argv03 = "node";
    _preload_modules3 = [];
    setSourceMapsEnabled3 = noop3;
    _performance3 = {
      now:
        typeof performance !== "undefined"
          ? performance.now.bind(performance)
          : void 0,
      timing: typeof performance !== "undefined" ? performance.timing : void 0,
    };
    if (_performance3.now === void 0) {
      nowOffset3 = Date.now();
      if (_performance3.timing && _performance3.timing.navigationStart) {
        nowOffset3 = _performance3.timing.navigationStart;
      }
      _performance3.now = () => Date.now() - nowOffset3;
    }
    nanoPerSec3 = 1e9;
    hrtime3.bigint = function (time) {
      var diff = hrtime3(time);
      if (typeof BigInt === "undefined") {
        return diff[0] * nanoPerSec3 + diff[1];
      }
      return BigInt(diff[0] * nanoPerSec3) + BigInt(diff[1]);
    };
    _maxListeners3 = 10;
    _events3 = {};
    _eventsCount3 = 0;
    addListener3 = on3;
    once3 = on3;
    off3 = on3;
    removeListener3 = on3;
    removeAllListeners3 = on3;
    emit3 = noop3;
    prependListener3 = on3;
    prependOnceListener3 = on3;
    process4 = {
      version: version3,
      versions: versions3,
      arch: arch3,
      platform: platform3,
      release: release3,
      _rawDebug: _rawDebug3,
      moduleLoadList: moduleLoadList3,
      binding: binding3,
      _linkedBinding: _linkedBinding3,
      _events: _events3,
      _eventsCount: _eventsCount3,
      _maxListeners: _maxListeners3,
      on: on3,
      addListener: addListener3,
      once: once3,
      off: off3,
      removeListener: removeListener3,
      removeAllListeners: removeAllListeners3,
      emit: emit3,
      prependListener: prependListener3,
      prependOnceListener: prependOnceListener3,
      listeners: listeners3,
      domain: domain3,
      _exiting: _exiting3,
      config: config3,
      dlopen: dlopen3,
      uptime: uptime3,
      _getActiveRequests: _getActiveRequests3,
      _getActiveHandles: _getActiveHandles3,
      reallyExit: reallyExit3,
      _kill: _kill3,
      cpuUsage: cpuUsage3,
      resourceUsage: resourceUsage3,
      memoryUsage: memoryUsage3,
      kill: kill3,
      exit: exit3,
      openStdin: openStdin3,
      allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags3,
      assert: assert3,
      features: features3,
      _fatalExceptions: _fatalExceptions3,
      setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback3,
      hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback3,
      emitWarning: emitWarning3,
      nextTick: nextTick3,
      _tickCallback: _tickCallback3,
      _debugProcess: _debugProcess3,
      _debugEnd: _debugEnd3,
      _startProfilerIdleNotifier: _startProfilerIdleNotifier3,
      _stopProfilerIdleNotifier: _stopProfilerIdleNotifier3,
      stdout: stdout3,
      stdin: stdin3,
      stderr: stderr3,
      abort: abort3,
      umask: umask3,
      chdir: chdir3,
      cwd: cwd3,
      env: env3,
      title: title3,
      argv: argv3,
      execArgv: execArgv3,
      pid: pid3,
      ppid: ppid3,
      execPath: execPath3,
      debugPort: debugPort3,
      hrtime: hrtime3,
      argv0: argv03,
      _preload_modules: _preload_modules3,
      setSourceMapsEnabled: setSourceMapsEnabled3,
    };
    exports$c2 = {};
    _dewExec$b2 = false;
    exports$b2 = {};
    _dewExec$a2 = false;
    exports$a2 = {};
    _dewExec$92 = false;
    exports$92 = {};
    _dewExec$82 = false;
    exports$82 = {};
    _dewExec$72 = false;
    exports$72 = {};
    _dewExec$62 = false;
    exports$62 = {};
    _dewExec$52 = false;
    _global$2 =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
          ? self
          : globalThis;
    exports$52 = {};
    _dewExec$42 = false;
    _global$1 =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
          ? self
          : globalThis;
    exports$42 = {};
    _dewExec$32 = false;
    exports$32 = {};
    _dewExec$222 = false;
    exports$222 = {};
    _dewExec$122 = false;
    exports$122 = {};
    _dewExec32 = false;
    _global =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
          ? self
          : globalThis;
    exports32 = dew32();
    exports32["format"];
    exports32["deprecate"];
    exports32["debuglog"];
    exports32["inspect"];
    exports32["types"];
    exports32["isArray"];
    exports32["isBoolean"];
    exports32["isNull"];
    exports32["isNullOrUndefined"];
    exports32["isNumber"];
    exports32["isString"];
    exports32["isSymbol"];
    exports32["isUndefined"];
    exports32["isRegExp"];
    exports32["isObject"];
    exports32["isDate"];
    exports32["isError"];
    exports32["isFunction"];
    exports32["isPrimitive"];
    exports32["isBuffer"];
    exports32["log"];
    exports32["inherits"];
    exports32["_extend"];
    exports32["promisify"];
    exports32["callbackify"];
    _extend = exports32._extend;
    callbackify = exports32.callbackify;
    debuglog = exports32.debuglog;
    deprecate = exports32.deprecate;
    format2 = exports32.format;
    inherits = exports32.inherits;
    inspect = exports32.inspect;
    isArray = exports32.isArray;
    isBoolean = exports32.isBoolean;
    isBuffer = exports32.isBuffer;
    isDate = exports32.isDate;
    isError = exports32.isError;
    isFunction = exports32.isFunction;
    isNull = exports32.isNull;
    isNullOrUndefined = exports32.isNullOrUndefined;
    isNumber = exports32.isNumber;
    isObject = exports32.isObject;
    isPrimitive = exports32.isPrimitive;
    isRegExp = exports32.isRegExp;
    isString = exports32.isString;
    isSymbol = exports32.isSymbol;
    isUndefined = exports32.isUndefined;
    log = exports32.log;
    promisify = exports32.promisify;
    types = exports32.types;
    TextEncoder = exports32.TextEncoder = globalThis.TextEncoder;
    TextDecoder = exports32.TextDecoder = globalThis.TextDecoder;
  },
});

// node-modules-polyfills-commonjs:util
var util_exports = {};
__export(util_exports, {
  TextDecoder: () => TextDecoder,
  TextEncoder: () => TextEncoder,
  _extend: () => _extend,
  callbackify: () => callbackify,
  debuglog: () => debuglog,
  deprecate: () => deprecate,
  format: () => format2,
  inherits: () => inherits,
  inspect: () => inspect,
  isArray: () => isArray,
  isBoolean: () => isBoolean,
  isBuffer: () => isBuffer,
  isDate: () => isDate,
  isError: () => isError,
  isFunction: () => isFunction,
  isNull: () => isNull,
  isNullOrUndefined: () => isNullOrUndefined,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isPrimitive: () => isPrimitive,
  isRegExp: () => isRegExp,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isUndefined: () => isUndefined,
  log: () => log,
  promisify: () => promisify,
  types: () => types,
});
var init_util2 = __esm({
  "node-modules-polyfills-commonjs:util"() {
    init_process_shim();
    init_Buffer();
    init_process();
    init_util();
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/utils.js
var require_utils2 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/utils.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    exports5.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports5.find = (node, type) =>
      node.nodes.find((node2) => node2.type === type);
    exports5.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false) return false;
      if (!exports5.isInteger(min) || !exports5.isInteger(max)) return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports5.escapeNode = (block, n = 0, type) => {
      const node = block.nodes[n];
      if (!node) return;
      if (
        (type && node.type === type) ||
        node.type === "open" ||
        node.type === "close"
      ) {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports5.encloseBrace = (node) => {
      if (node.type !== "brace") return false;
      if ((node.commas >> (0 + node.ranges)) >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports5.isInvalidBrace = (block) => {
      if (block.type !== "brace") return false;
      if (block.invalid === true || block.dollar) return true;
      if ((block.commas >> (0 + block.ranges)) >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports5.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports5.reduce = (nodes) =>
      nodes.reduce((acc, node) => {
        if (node.type === "text") acc.push(node.value);
        if (node.type === "range") node.type = "text";
        return acc;
      }, []);
    exports5.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const ele = arr[i];
          if (Array.isArray(ele)) {
            flat(ele);
            continue;
          }
          if (ele !== void 0) {
            result.push(ele);
          }
        }
        return result;
      };
      flat(args);
      return result;
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/stringify.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var utils = require_utils2();
    module.exports = (ast, options = {}) => {
      const stringify = (node, parent = {}) => {
        const invalidBlock =
          options.escapeInvalid && utils.isInvalidBrace(parent);
        const invalidNode =
          node.invalid === true && options.escapeInvalid === true;
        let output2 = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output2 += stringify(child);
          }
        }
        return output2;
      };
      return stringify(ast);
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/is-number-npm-7.0.0-060086935c-10c0.zip/node_modules/is-number/index.js
var require_is_number = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/is-number-npm-7.0.0-060086935c-10c0.zip/node_modules/is-number/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    module.exports = function (num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/to-regex-range-npm-5.0.1-f1e8263b00-10c0.zip/node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/to-regex-range-npm-5.0.1-f1e8263b00-10c0.zip/node_modules/to-regex-range/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var isNumber2 = require_is_number();
    var toRegexRange = (min, max, options) => {
      if (isNumber2(min) === false) {
        throw new TypeError(
          "toRegexRange: expected the first argument to be a number",
        );
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber2(max) === false) {
        throw new TypeError(
          "toRegexRange: expected the second argument to be a number.",
        );
      }
      let opts = { relaxZeros: true, ...options };
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a = Math.min(min, max);
      let b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        let result = min + "|" + max;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max);
      let state = { min, max, a, b };
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (
        opts.wrap !== false &&
        positives.length + negatives.length > 1
      ) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min, nines);
      let stops = /* @__PURE__ */ new Set([max]);
      while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
      }
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
      }
      let zipped = zip(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return { pattern, count: [count], digits };
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max);
      let tokens = [];
      let start = min;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i];
        let obj = rangeToPattern(String(start), String(max2), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max2 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max2 + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string } = ele;
        if (!intersection && !contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
        if (intersection && contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
      }
      return result;
    }
    function zip(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - (integer % Math.pow(10, zeros));
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => (toRegexRange.cache = {});
    module.exports = toRegexRange;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/fill-range-npm-7.1.1-bf491486db-10c0.zip/node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/fill-range-npm-7.1.1-bf491486db-10c0.zip/node_modules/fill-range/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var util = (init_util2(), __toCommonJS(util_exports));
    var toRegexRange = require_to_regex_range();
    var isObject2 = (val) =>
      val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => (toNumber === true ? Number(value) : String(value));
    };
    var isValidValue = (value) => {
      return (
        typeof value === "number" || (typeof value === "string" && value !== "")
      );
    };
    var isNumber2 = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-") value = value.slice(1);
      if (value === "0") return false;
      while (value[++index] === "0");
      return index > 0;
    };
    var stringify = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash) input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength) input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options, maxLen) => {
      parts.negatives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
      parts.positives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts.positives.length) {
        positives = parts.positives
          .map((v) => toMaxLen(String(v), maxLen))
          .join("|");
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a);
      if (a === b) return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    var rangeError = (...args) => {
      return new RangeError(
        "Invalid range arguments: " + util.inspect(...args),
      );
    };
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true) throw rangeError([start, end]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start);
      let b = Number(end);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true) throw rangeError([start, end]);
        return [];
      }
      if (a === 0) a = 0;
      if (b === 0) b = 0;
      let descending = a > b;
      let startString = String(start);
      let endString = String(end);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded
        ? Math.max(startString.length, endString.length, stepString.length)
        : 0;
      let toNumber =
        padded === false && stringify(start, end, options) === false;
      let format3 = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(
          toMaxLen(start, maxLen),
          toMaxLen(end, maxLen),
          true,
          options,
        );
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) =>
        parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range.push(pad(format3(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1
          ? toSequence(parts, options, maxLen)
          : toRegex(range, null, { wrap: false, ...options });
      }
      return range;
    };
    var fillLetters = (start, end, step = 1, options = {}) => {
      if (
        (!isNumber2(start) && start.length > 1) ||
        (!isNumber2(end) && end.length > 1)
      ) {
        return invalidRange(start, end, options);
      }
      let format3 = options.transform || ((val) => String.fromCharCode(val));
      let a = `${start}`.charCodeAt(0);
      let b = `${end}`.charCodeAt(0);
      let descending = a > b;
      let min = Math.min(a, b);
      let max = Math.max(a, b);
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
      }
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range.push(format3(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
      }
      return range;
    };
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
      }
      if (typeof step === "function") {
        return fill(start, end, 1, { transform: step });
      }
      if (isObject2(step)) {
        return fill(start, end, 0, step);
      }
      let opts = { ...options };
      if (opts.capture === true) opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber2(step)) {
        if (step != null && !isObject2(step)) return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber2(start) && isNumber2(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module.exports = fill;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/compile.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var fill = require_fill_range();
    var utils = require_utils2();
    var compile = (ast, options = {}) => {
      const walk = (node, parent = {}) => {
        const invalidBlock = utils.isInvalidBrace(parent);
        const invalidNode =
          node.invalid === true && options.escapeInvalid === true;
        const invalid = invalidBlock === true || invalidNode === true;
        const prefix = options.escapeInvalid === true ? "\\" : "";
        let output2 = "";
        if (node.isOpen === true) {
          return prefix + node.value;
        }
        if (node.isClose === true) {
          console.log("node.isClose", prefix, node.value);
          return prefix + node.value;
        }
        if (node.type === "open") {
          return invalid ? prefix + node.value : "(";
        }
        if (node.type === "close") {
          return invalid ? prefix + node.value : ")";
        }
        if (node.type === "comma") {
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          const range = fill(...args, {
            ...options,
            wrap: false,
            toRegex: true,
            strictZeros: true,
          });
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output2 += walk(child, node);
          }
        }
        return output2;
      };
      return walk(ast);
    };
    module.exports = compile;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/expand.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var fill = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils2();
    var append = (queue4 = "", stash = "", enclose = false) => {
      const result = [];
      queue4 = [].concat(queue4);
      stash = [].concat(stash);
      if (!stash.length) return queue4;
      if (!queue4.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (const item of queue4) {
        if (Array.isArray(item)) {
          for (const value of item) {
            result.push(append(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
            result.push(
              Array.isArray(ele) ? append(item, ele, enclose) : item + ele,
            );
          }
        }
      }
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
      const rangeLimit =
        options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      const walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (
          node.type === "brace" &&
          node.invalid !== true &&
          node.nodes.length === 2
        ) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError(
              "expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.",
            );
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify(node, options);
          }
          q.push(append(q.pop(), range));
          node.nodes = [];
          return;
        }
        const enclose = utils.encloseBrace(node);
        let queue4 = node.queue;
        let block = node;
        while (
          block.type !== "brace" &&
          block.type !== "root" &&
          block.parent
        ) {
          block = block.parent;
          queue4 = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
          const child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            if (i === 1) queue4.push("");
            queue4.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue4, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue4.push(append(queue4.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node);
          }
        }
        return queue4;
      };
      return utils.flatten(walk(ast));
    };
    module.exports = expand;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/constants.js
var require_constants2 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/constants.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    module.exports = {
      MAX_LENGTH: 1e4,
      // Digits
      CHAR_0: "0",
      /* 0 */
      CHAR_9: "9",
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: "A",
      /* A */
      CHAR_LOWERCASE_A: "a",
      /* a */
      CHAR_UPPERCASE_Z: "Z",
      /* Z */
      CHAR_LOWERCASE_Z: "z",
      /* z */
      CHAR_LEFT_PARENTHESES: "(",
      /* ( */
      CHAR_RIGHT_PARENTHESES: ")",
      /* ) */
      CHAR_ASTERISK: "*",
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: "&",
      /* & */
      CHAR_AT: "@",
      /* @ */
      CHAR_BACKSLASH: "\\",
      /* \ */
      CHAR_BACKTICK: "`",
      /* ` */
      CHAR_CARRIAGE_RETURN: "\r",
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: "^",
      /* ^ */
      CHAR_COLON: ":",
      /* : */
      CHAR_COMMA: ",",
      /* , */
      CHAR_DOLLAR: "$",
      /* . */
      CHAR_DOT: ".",
      /* . */
      CHAR_DOUBLE_QUOTE: '"',
      /* " */
      CHAR_EQUAL: "=",
      /* = */
      CHAR_EXCLAMATION_MARK: "!",
      /* ! */
      CHAR_FORM_FEED: "\f",
      /* \f */
      CHAR_FORWARD_SLASH: "/",
      /* / */
      CHAR_HASH: "#",
      /* # */
      CHAR_HYPHEN_MINUS: "-",
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: "<",
      /* < */
      CHAR_LEFT_CURLY_BRACE: "{",
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: "[",
      /* [ */
      CHAR_LINE_FEED: "\n",
      /* \n */
      CHAR_NO_BREAK_SPACE: "\xA0",
      /* \u00A0 */
      CHAR_PERCENT: "%",
      /* % */
      CHAR_PLUS: "+",
      /* + */
      CHAR_QUESTION_MARK: "?",
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      /* > */
      CHAR_RIGHT_CURLY_BRACE: "}",
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      /* ] */
      CHAR_SEMICOLON: ";",
      /* ; */
      CHAR_SINGLE_QUOTE: "'",
      /* ' */
      CHAR_SPACE: " ",
      /*   */
      CHAR_TAB: "	",
      /* \t */
      CHAR_UNDERSCORE: "_",
      /* _ */
      CHAR_VERTICAL_LINE: "|",
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF",
      /* \uFEFF */
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/parse.js
var require_parse = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/lib/parse.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var stringify = require_stringify();
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      /* \ */
      CHAR_BACKTICK,
      /* ` */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_RIGHT_SQUARE_BRACKET,
      /* ] */
      CHAR_DOUBLE_QUOTE,
      /* " */
      CHAR_SINGLE_QUOTE,
      /* ' */
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE,
    } = require_constants2();
    var parse2 = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      const opts = options || {};
      const max =
        typeof opts.maxLength === "number"
          ? Math.min(MAX_LENGTH, opts.maxLength)
          : MAX_LENGTH;
      if (input.length > max) {
        throw new SyntaxError(
          `Input length (${input.length}), exceeds max characters (${max})`,
        );
      }
      const ast = { type: "root", input, nodes: [] };
      const stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      const length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      const advance = () => input[index++];
      const push = (node) => {
        if (node.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
      };
      push({ type: "bos" });
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (
          value === CHAR_ZERO_WIDTH_NOBREAK_SPACE ||
          value === CHAR_NO_BREAK_SPACE
        ) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({
            type: "text",
            value: (options.keepEscaping ? value : "") + advance(),
          });
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: "text", value: "\\" + value });
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: "paren", nodes: [] });
          stack.push(block);
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({ type: "text", value });
            continue;
          }
          block = stack.pop();
          push({ type: "text", value });
          block = stack[stack.length - 1];
          continue;
        }
        if (
          value === CHAR_DOUBLE_QUOTE ||
          value === CHAR_SINGLE_QUOTE ||
          value === CHAR_BACKTICK
        ) {
          const open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true) value += next;
              break;
            }
            value += next;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          const dollar =
            (prev.value && prev.value.slice(-1) === "$") ||
            block.dollar === true;
          const brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: [],
          };
          block = push(brace);
          stack.push(block);
          push({ type: "open", value });
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({ type: "text", value });
            continue;
          }
          const type = "close";
          block = stack.pop();
          block.close = true;
          push({ type, value });
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            const open = block.nodes.shift();
            block.nodes = [open, { type: "text", value: stringify(block) }];
          }
          push({ type: "comma", value });
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          const siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({ type: "text", value });
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            const before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({ type: "dot", value });
          continue;
        }
        push({ type: "text", value });
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === "open") node.isOpen = true;
              if (node.type === "close") node.isClose = true;
              if (!node.nodes) node.type = "text";
              node.invalid = true;
            }
          });
          const parent = stack[stack.length - 1];
          const index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module.exports = parse2;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/index.js
var require_braces = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/braces-npm-3.0.3-582c14023c-10c0.zip/node_modules/braces/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var stringify = require_stringify();
    var compile = require_compile();
    var expand = require_expand();
    var parse2 = require_parse();
    var braces = (input, options = {}) => {
      let output2 = [];
      if (Array.isArray(input)) {
        for (const pattern of input) {
          const result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output2.push(...result);
          } else {
            output2.push(result);
          }
        }
      } else {
        output2 = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output2 = [...new Set(output2)];
      }
      return output2;
    };
    braces.parse = (input, options = {}) => parse2(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true
        ? braces.compile(input, options)
        : braces.expand(input, options);
    };
    module.exports = braces;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/constants.js
var require_constants3 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/constants.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var path = (init_path2(), __toCommonJS(path_exports));
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9",
    };
    module.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**",
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" },
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win322) {
        return win322 === true ? WINDOWS_CHARS : POSIX_CHARS;
      },
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/utils.js
var require_utils3 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/utils.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var path = (init_path2(), __toCommonJS(path_exports));
    var win322 = process2.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL,
    } = require_constants3();
    exports5.isObject = (val) =>
      val !== null && typeof val === "object" && !Array.isArray(val);
    exports5.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports5.isRegexChar = (str) =>
      str.length === 1 && exports5.hasRegexChars(str);
    exports5.escapeRegex = (str) =>
      str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports5.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports5.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports5.supportsLookbehinds = () => {
      const segs = process2.version.slice(1).split(".").map(Number);
      if (
        (segs.length === 3 && segs[0] >= 9) ||
        (segs[0] === 8 && segs[1] >= 10)
      ) {
        return true;
      }
      return false;
    };
    exports5.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win322 === true || path.sep === "\\";
    };
    exports5.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\")
        return exports5.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports5.removePrefix = (input, state = {}) => {
      let output2 = input;
      if (output2.startsWith("./")) {
        output2 = output2.slice(2);
        state.prefix = "./";
      }
      return output2;
    };
    exports5.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output2 = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output2 = `(?:^(?!${output2}).*$)`;
      }
      return output2;
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/scan.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var utils = require_utils3();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET,
      /* ] */
    } = require_constants3();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (
              braceEscaped !== true &&
              code === CHAR_DOT &&
              (code = advance()) === CHAR_DOT
            ) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar =
            code === CHAR_PLUS ||
            code === CHAR_AT ||
            code === CHAR_ASTERISK ||
            code === CHAR_QUESTION_MARK ||
            code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (
          opts.nonegate !== true &&
          code === CHAR_EXCLAMATION_MARK &&
          index === start
        ) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob,
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/parse.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var constants = require_constants3();
    var utils = require_utils3();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS,
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse2 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max =
        typeof opts.maxLength === "number"
          ? Math.min(MAX_LENGTH, opts.maxLength)
          : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(
          `Input length: ${len}, exceeds maximum allowed length: ${max}`,
        );
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win322 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win322);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR,
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens,
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = (state.peek = (n = 1) => input[state.index + n]);
      const advance = (state.advance = () => input[++state.index] || "");
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace =
            state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob =
            tok.extglob === true ||
            (extglobs.length && (tok.type === "pipe" || tok.type === "paren"));
          if (
            tok.type !== "slash" &&
            tok.type !== "paren" &&
            !isBrace &&
            !isExtglob
          ) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output2 = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({
          type: "paren",
          extglob: true,
          value: advance(),
          output: output2,
        });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output2 = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (
            token.inner &&
            token.inner.length > 1 &&
            token.inner.includes("/")
          ) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output2 = token.close = `)$))${extglobStar}`;
          }
          if (
            token.inner.includes("*") &&
            (rest = remaining()) &&
            /^\.[^\\/.]+$/.test(rest)
          ) {
            const expression = parse2(rest, {
              ...options,
              fastpaths: false,
            }).output;
            output2 = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output: output2 });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output2 = input.replace(
          REGEX_SPECIAL_CHARS_BACKREF,
          (m, esc, chars, first, rest, index) => {
            if (first === "\\") {
              backslashes = true;
              return m;
            }
            if (first === "?") {
              if (esc) {
                return esc + first + (rest ? QMARK.repeat(rest.length) : "");
              }
              if (index === 0) {
                return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
              }
              return QMARK.repeat(chars.length);
            }
            if (first === ".") {
              return DOT_LITERAL.repeat(chars.length);
            }
            if (first === "*") {
              if (esc) {
                return esc + first + (rest ? star : "");
              }
              return star;
            }
            return esc ? m : `\\${m}`;
          },
        );
        if (backslashes === true) {
          if (opts.unescape === true) {
            output2 = output2.replace(/\\/g, "");
          } else {
            output2 = output2.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output2 === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output2, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (
          state.brackets > 0 &&
          (value !== "]" || prev.value === "[" || prev.value === "[^")
        ) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix2 = POSIX_REGEX_SOURCE[rest2];
                if (posix2) {
                  prev.value = pre + posix2;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (
            (value === "[" && peek() !== ":") ||
            (value === "-" && peek() === "]")
          ) {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (
            opts.nobracket === true ||
            (prev && prev.type === "bracket" && prev.value.length === 1)
          ) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (
            prev.posix !== true &&
            prevValue[0] === "^" &&
            !prevValue.includes("/")
          ) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (
            opts.literalBrackets === false ||
            utils.hasRegexChars(prevValue)
          ) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length,
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output2 = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output2 = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output2 = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output: output2 });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output2 = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output2 = "|";
          }
          push({ type: "comma", value, output: output2 });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (
            state.braces + state.parens === 0 &&
            prev.type !== "bos" &&
            prev.type !== "slash"
          ) {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (
            !isGroup &&
            opts.noextglob !== true &&
            peek() === "(" &&
            peek(2) !== "?"
          ) {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output2 = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error(
                "Node.js v10 or higher is required for regex lookbehinds",
              );
            }
            if (
              (prev.value === "(" && !/[!=<:]/.test(next)) ||
              (next === "<" && !/<([!=]|\w+>)/.test(remaining()))
            ) {
              output2 = `\\${value}`;
            }
            push({ type: "text", value, output: output2 });
            continue;
          }
          if (
            opts.dot !== true &&
            (prev.type === "slash" || prev.type === "bos")
          ) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if ((prev && prev.value === "(") || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (
            (prev &&
              (prev.type === "bracket" ||
                prev.type === "paren" ||
                prev.type === "brace")) ||
            state.parens > 0
          ) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar =
            before && (before.type === "star" || before.type === "globstar");
          if (
            opts.bash === true &&
            (!isStart || (rest[0] && rest[0] !== "/"))
          ) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace =
            state.braces > 0 &&
            (prior.type === "comma" || prior.type === "brace");
          const isExtglob =
            extglobs.length &&
            (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (
            prior.type === "slash" &&
            prior.prev.type !== "bos" &&
            !afterStar &&
            eos()
          ) {
            state.output = state.output.slice(
              0,
              -(prior.output + prev.output).length,
            );
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (
            prior.type === "slash" &&
            prior.prev.type !== "bos" &&
            rest[0] === "/"
          ) {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(
              0,
              -(prior.output + prev.output).length,
            );
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (
          prev &&
          (prev.type === "bracket" || prev.type === "paren") &&
          opts.regex === true
        ) {
          token.output = value;
          push(token);
          continue;
        }
        if (
          state.index === state.start ||
          prev.type === "slash" ||
          prev.type === "dot"
        ) {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (
        opts.strictSlashes !== true &&
        (prev.type === "star" || prev.type === "bracket")
      ) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse2.fastpaths = (input, options) => {
      const opts = { ...options };
      const max =
        typeof opts.maxLength === "number"
          ? Math.min(MAX_LENGTH, opts.maxLength)
          : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(
          `Input length: ${len}, exceeds maximum allowed length: ${max}`,
        );
      }
      input = REPLACEMENTS[input] || input;
      const win322 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR,
      } = constants.globChars(win322);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output2 = utils.removePrefix(input, state);
      let source = create(output2);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse2;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/lib/picomatch.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var path = (init_path2(), __toCommonJS(path_exports));
    var scan = require_scan();
    var parse2 = require_parse2();
    var utils = require_utils3();
    var constants = require_constants3();
    var isObject2 = (val) =>
      val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject2(glob) && glob.tokens && glob.input;
      if (glob === "" || (typeof glob !== "string" && !isState)) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix2 = utils.isWindows(options);
      const regex = isState
        ? picomatch.compileRe(glob, options)
        : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = {
          ...options,
          ignore: null,
          onMatch: null,
          onResult: null,
        };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const {
          isMatch,
          match,
          output: output2,
        } = picomatch.test(input, regex, options, { glob, posix: posix2 });
        const result = {
          glob,
          state,
          regex,
          posix: posix2,
          input,
          output: output2,
          match,
          isMatch,
        };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix: posix2 } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format3 = opts.format || (posix2 ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output2 = match && format3 ? format3(input) : input;
      if (match === false) {
        output2 = format3 ? format3(input) : input;
        match = output2 === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix2);
        } else {
          match = regex.exec(output2);
        }
      }
      return { isMatch: Boolean(match), match, output: output2 };
    };
    picomatch.matchBase = (
      input,
      glob,
      options,
      posix2 = utils.isWindows(options),
    ) => {
      const regex =
        glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) =>
      picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse2(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (
      state,
      options,
      returnOutput = false,
      returnState = false,
    ) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (
      input,
      options = {},
      returnOutput = false,
      returnState = false,
    ) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (
        options.fastpaths !== false &&
        (input[0] === "." || input[0] === "*")
      ) {
        parsed.output = parse2.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse2(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module.exports = picomatch;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/picomatch-npm-2.3.1-c782cfd986-10c0.zip/node_modules/picomatch/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    module.exports = require_picomatch();
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/micromatch-npm-4.0.8-c9570e4aca-10c0.zip/node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/micromatch-npm-4.0.8-c9570e4aca-10c0.zip/node_modules/micromatch/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var util = (init_util2(), __toCommonJS(util_exports));
    var braces = require_braces();
    var picomatch = require_picomatch2();
    var utils = require_utils3();
    var isEmptyString = (v) => v === "" || v === "./";
    var hasBraces = (v) => {
      const index = v.indexOf("{");
      return index > -1 && v.indexOf("}", index) > -1;
    };
    var micromatch = (list, patterns, options) => {
      patterns = [].concat(patterns);
      list = [].concat(list);
      let omit = /* @__PURE__ */ new Set();
      let keep = /* @__PURE__ */ new Set();
      let items = /* @__PURE__ */ new Set();
      let negatives = 0;
      let onResult = (state) => {
        items.add(state.output);
        if (options && options.onResult) {
          options.onResult(state);
        }
      };
      for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch(
          String(patterns[i]),
          { ...options, onResult },
          true,
        );
        let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
        if (negated) negatives++;
        for (let item of list) {
          let matched = isMatch(item, true);
          let match = negated ? !matched.isMatch : matched.isMatch;
          if (!match) continue;
          if (negated) {
            omit.add(matched.output);
          } else {
            omit.delete(matched.output);
            keep.add(matched.output);
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep];
      let matches = result.filter((item) => !omit.has(item));
      if (options && matches.length === 0) {
        if (options.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(", ")}"`);
        }
        if (options.nonull === true || options.nullglob === true) {
          return options.unescape
            ? patterns.map((p) => p.replace(/\\/g, ""))
            : patterns;
        }
      }
      return matches;
    };
    micromatch.match = micromatch;
    micromatch.matcher = (pattern, options) => picomatch(pattern, options);
    micromatch.isMatch = (str, patterns, options) =>
      picomatch(patterns, options)(str);
    micromatch.any = micromatch.isMatch;
    micromatch.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String);
      let result = /* @__PURE__ */ new Set();
      let items = [];
      let onResult = (state) => {
        if (options.onResult) options.onResult(state);
        items.push(state.output);
      };
      let matches = new Set(
        micromatch(list, patterns, { ...options, onResult }),
      );
      for (let item of items) {
        if (!matches.has(item)) {
          result.add(item);
        }
      }
      return [...result];
    };
    micromatch.contains = (str, pattern, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch.contains(str, p, options));
      }
      if (typeof pattern === "string") {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false;
        }
        if (
          str.includes(pattern) ||
          (str.startsWith("./") && str.slice(2).includes(pattern))
        ) {
          return true;
        }
      }
      return micromatch.isMatch(str, pattern, { ...options, contains: true });
    };
    micromatch.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj)) {
        throw new TypeError("Expected the first argument to be an object");
      }
      let keys = micromatch(Object.keys(obj), patterns, options);
      let res = {};
      for (let key of keys) res[key] = obj[key];
      return res;
    };
    micromatch.some = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (items.some((item) => isMatch(item))) {
          return true;
        }
      }
      return false;
    };
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (!items.every((item) => isMatch(item))) {
          return false;
        }
      }
      return true;
    };
    micromatch.all = (str, patterns, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      return [].concat(patterns).every((p) => picomatch(p, options)(str));
    };
    micromatch.capture = (glob, input, options) => {
      let posix2 = utils.isWindows(options);
      let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
      let match = regex.exec(posix2 ? utils.toPosixSlashes(input) : input);
      if (match) {
        return match.slice(1).map((v) => (v === void 0 ? "" : v));
      }
    };
    micromatch.makeRe = (...args) => picomatch.makeRe(...args);
    micromatch.scan = (...args) => picomatch.scan(...args);
    micromatch.parse = (patterns, options) => {
      let res = [];
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options));
        }
      }
      return res;
    };
    micromatch.braces = (pattern, options) => {
      if (typeof pattern !== "string") throw new TypeError("Expected a string");
      if ((options && options.nobrace === true) || !hasBraces(pattern)) {
        return [pattern];
      }
      return braces(pattern, options);
    };
    micromatch.braceExpand = (pattern, options) => {
      if (typeof pattern !== "string") throw new TypeError("Expected a string");
      return micromatch.braces(pattern, { ...options, expand: true });
    };
    micromatch.hasBraces = hasBraces;
    module.exports = micromatch;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/slash-npm-3.0.0-b87de2279a-10c0.zip/node_modules/slash/index.js
var require_slash = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/slash-npm-3.0.0-b87de2279a-10c0.zip/node_modules/slash/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    module.exports = (path) => {
      const isExtendedLengthPath = /^\\\\\?\\/.test(path);
      const hasNonAscii = /[^\u0000-\u0080]+/.test(path);
      if (isExtendedLengthPath || hasNonAscii) {
        return path;
      }
      return path.replace(/\\/g, "/");
    };
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/escape-string-regexp-npm-2.0.0-aef69d2a25-10c0.zip/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/escape-string-regexp-npm-2.0.0-aef69d2a25-10c0.zip/node_modules/escape-string-regexp/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;
    module.exports = (string) => {
      if (typeof string !== "string") {
        throw new TypeError("Expected a string");
      }
      return string.replace(matchOperatorsRegex, "\\$&");
    };
  },
});

// node-modules-polyfills:module
function unimplemented4() {
  throw new Error(
    "Node.js module module is not supported by JSPM core in the browser",
  );
}
var builtinModules, _cache, _pathCache, _extensions, globalPaths;
var init_module = __esm({
  "node-modules-polyfills:module"() {
    init_process_shim();
    init_Buffer();
    init_process();
    builtinModules = [
      "_http_agent",
      "_http_client",
      "_http_common",
      "_http_incoming",
      "_http_outgoing",
      "_http_server",
      "_stream_duplex",
      "_stream_passthrough",
      "_stream_readable",
      "_stream_transform",
      "_stream_wrap",
      "_stream_writable",
      "_tls_common",
      "_tls_wrap",
      "assert",
      "assert/strict",
      "async_hooks",
      "buffer",
      "child_process",
      "cluster",
      "console",
      "constants",
      "crypto",
      "dgram",
      "diagnostics_channel",
      "dns",
      "dns/promises",
      "domain",
      "events",
      "fs",
      "fs/promises",
      "http",
      "http2",
      "https",
      "inspector",
      "module",
      "net",
      "os",
      "path",
      "path/posix",
      "path/win32",
      "perf_hooks",
      "process",
      "punycode",
      "querystring",
      "readline",
      "repl",
      "stream",
      "stream/consumers",
      "stream/promises",
      "stream/web",
      "string_decoder",
      "sys",
      "timers",
      "timers/promises",
      "tls",
      "trace_events",
      "tty",
      "url",
      "util",
      "util/types",
      "v8",
      "vm",
      "worker_threads",
      "zlib",
    ];
    _cache = null;
    _pathCache = null;
    _extensions = null;
    globalPaths = null;
  },
});

// node-modules-polyfills-commonjs:module
var module_exports = {};
__export(module_exports, {
  Module: () => unimplemented4,
  SourceMap: () => unimplemented4,
  _cache: () => _cache,
  _debug: () => unimplemented4,
  _extensions: () => _extensions,
  _findPath: () => unimplemented4,
  _initPaths: () => unimplemented4,
  _load: () => unimplemented4,
  _nodeModulePaths: () => unimplemented4,
  _pathCache: () => _pathCache,
  _preloadModules: () => unimplemented4,
  _resolveFilename: () => unimplemented4,
  _resolveLookupPaths: () => unimplemented4,
  builtinModules: () => builtinModules,
  createRequire: () => unimplemented4,
  createRequireFromPath: () => unimplemented4,
  findSourceMap: () => unimplemented4,
  globalPaths: () => globalPaths,
  runMain: () => unimplemented4,
  syncBuiltinESMExports: () => unimplemented4,
});
var init_module2 = __esm({
  "node-modules-polyfills-commonjs:module"() {
    init_process_shim();
    init_Buffer();
    init_process();
    init_module();
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/stack-utils-npm-2.0.6-2be1099696-10c0.zip/node_modules/stack-utils/index.js
var require_stack_utils = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/stack-utils-npm-2.0.6-2be1099696-10c0.zip/node_modules/stack-utils/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var escapeStringRegexp = require_escape_string_regexp();
    var cwd4 =
      typeof process2 === "object" &&
      process2 &&
      typeof process2.cwd === "function"
        ? process2.cwd()
        : ".";
    var natives = []
      .concat(
        (init_module2(), __toCommonJS(module_exports)).builtinModules,
        "bootstrap_node",
        "node",
      )
      .map(
        (n) =>
          new RegExp(
            `(?:\\((?:node:)?${n}(?:\\.js)?:\\d+:\\d+\\)$|^\\s*at (?:node:)?${n}(?:\\.js)?:\\d+:\\d+$)`,
          ),
      );
    natives.push(
      /\((?:node:)?internal\/[^:]+:\d+:\d+\)$/,
      /\s*at (?:node:)?internal\/[^:]+:\d+:\d+$/,
      /\/\.node-spawn-wrap-\w+-\w+\/node:\d+:\d+\)?$/,
    );
    var StackUtils = class _StackUtils {
      constructor(opts) {
        opts = {
          ignoredPackages: [],
          ...opts,
        };
        if ("internals" in opts === false) {
          opts.internals = _StackUtils.nodeInternals();
        }
        if ("cwd" in opts === false) {
          opts.cwd = cwd4;
        }
        this._cwd = opts.cwd.replace(/\\/g, "/");
        this._internals = [].concat(
          opts.internals,
          ignoredPackagesRegExp(opts.ignoredPackages),
        );
        this._wrapCallSite = opts.wrapCallSite || false;
      }
      static nodeInternals() {
        return [...natives];
      }
      clean(stack, indent = 0) {
        indent = " ".repeat(indent);
        if (!Array.isArray(stack)) {
          stack = stack.split("\n");
        }
        if (!/^\s*at /.test(stack[0]) && /^\s*at /.test(stack[1])) {
          stack = stack.slice(1);
        }
        let outdent = false;
        let lastNonAtLine = null;
        const result = [];
        stack.forEach((st) => {
          st = st.replace(/\\/g, "/");
          if (this._internals.some((internal) => internal.test(st))) {
            return;
          }
          const isAtLine = /^\s*at /.test(st);
          if (outdent) {
            st = st.trimEnd().replace(/^(\s+)at /, "$1");
          } else {
            st = st.trim();
            if (isAtLine) {
              st = st.slice(3);
            }
          }
          st = st.replace(`${this._cwd}/`, "");
          if (st) {
            if (isAtLine) {
              if (lastNonAtLine) {
                result.push(lastNonAtLine);
                lastNonAtLine = null;
              }
              result.push(st);
            } else {
              outdent = true;
              lastNonAtLine = st;
            }
          }
        });
        return result
          .map(
            (line) => `${indent}${line}
`,
          )
          .join("");
      }
      captureString(limit, fn = this.captureString) {
        if (typeof limit === "function") {
          fn = limit;
          limit = Infinity;
        }
        const { stackTraceLimit } = Error;
        if (limit) {
          Error.stackTraceLimit = limit;
        }
        const obj = {};
        Error.captureStackTrace(obj, fn);
        const { stack } = obj;
        Error.stackTraceLimit = stackTraceLimit;
        return this.clean(stack);
      }
      capture(limit, fn = this.capture) {
        if (typeof limit === "function") {
          fn = limit;
          limit = Infinity;
        }
        const { prepareStackTrace, stackTraceLimit } = Error;
        Error.prepareStackTrace = (obj2, site) => {
          if (this._wrapCallSite) {
            return site.map(this._wrapCallSite);
          }
          return site;
        };
        if (limit) {
          Error.stackTraceLimit = limit;
        }
        const obj = {};
        Error.captureStackTrace(obj, fn);
        const { stack } = obj;
        Object.assign(Error, { prepareStackTrace, stackTraceLimit });
        return stack;
      }
      at(fn = this.at) {
        const [site] = this.capture(1, fn);
        if (!site) {
          return {};
        }
        const res = {
          line: site.getLineNumber(),
          column: site.getColumnNumber(),
        };
        setFile(res, site.getFileName(), this._cwd);
        if (site.isConstructor()) {
          Object.defineProperty(res, "constructor", {
            value: true,
            configurable: true,
          });
        }
        if (site.isEval()) {
          res.evalOrigin = site.getEvalOrigin();
        }
        if (site.isNative()) {
          res.native = true;
        }
        let typename;
        try {
          typename = site.getTypeName();
        } catch (_) {}
        if (
          typename &&
          typename !== "Object" &&
          typename !== "[object Object]"
        ) {
          res.type = typename;
        }
        const fname = site.getFunctionName();
        if (fname) {
          res.function = fname;
        }
        const meth = site.getMethodName();
        if (meth && fname !== meth) {
          res.method = meth;
        }
        return res;
      }
      parseLine(line) {
        const match = line && line.match(re);
        if (!match) {
          return null;
        }
        const ctor = match[1] === "new";
        let fname = match[2];
        const evalOrigin = match[3];
        const evalFile = match[4];
        const evalLine = Number(match[5]);
        const evalCol = Number(match[6]);
        let file = match[7];
        const lnum = match[8];
        const col = match[9];
        const native = match[10] === "native";
        const closeParen = match[11] === ")";
        let method;
        const res = {};
        if (lnum) {
          res.line = Number(lnum);
        }
        if (col) {
          res.column = Number(col);
        }
        if (closeParen && file) {
          let closes = 0;
          for (let i = file.length - 1; i > 0; i--) {
            if (file.charAt(i) === ")") {
              closes++;
            } else if (file.charAt(i) === "(" && file.charAt(i - 1) === " ") {
              closes--;
              if (closes === -1 && file.charAt(i - 1) === " ") {
                const before = file.slice(0, i - 1);
                const after = file.slice(i + 1);
                file = after;
                fname += ` (${before}`;
                break;
              }
            }
          }
        }
        if (fname) {
          const methodMatch = fname.match(methodRe);
          if (methodMatch) {
            fname = methodMatch[1];
            method = methodMatch[2];
          }
        }
        setFile(res, file, this._cwd);
        if (ctor) {
          Object.defineProperty(res, "constructor", {
            value: true,
            configurable: true,
          });
        }
        if (evalOrigin) {
          res.evalOrigin = evalOrigin;
          res.evalLine = evalLine;
          res.evalColumn = evalCol;
          res.evalFile = evalFile && evalFile.replace(/\\/g, "/");
        }
        if (native) {
          res.native = true;
        }
        if (fname) {
          res.function = fname;
        }
        if (method && fname !== method) {
          res.method = method;
        }
        return res;
      }
    };
    function setFile(result, filename, cwd5) {
      if (filename) {
        filename = filename.replace(/\\/g, "/");
        if (filename.startsWith(`${cwd5}/`)) {
          filename = filename.slice(cwd5.length + 1);
        }
        result.file = filename;
      }
    }
    function ignoredPackagesRegExp(ignoredPackages) {
      if (ignoredPackages.length === 0) {
        return [];
      }
      const packages = ignoredPackages.map((mod) => escapeStringRegexp(mod));
      return new RegExp(
        `[/\\\\]node_modules[/\\\\](?:${packages.join("|")})[/\\\\][^:]+:\\d+:\\d+`,
      );
    }
    var re = new RegExp(
      "^(?:\\s*at )?(?:(new) )?(?:(.*?) \\()?(?:eval at ([^ ]+) \\((.+?):(\\d+):(\\d+)\\), )?(?:(.+?):(\\d+):(\\d+)|(native))(\\)?)$",
    );
    var methodRe = /^(.*?) \[as (.*?)\]$/;
    module.exports = StackUtils;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-message-util-npm-26.6.2-2dd6f71234-10c0.zip/node_modules/jest-message-util/build/index.js
var require_build6 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-message-util-npm-26.6.2-2dd6f71234-10c0.zip/node_modules/jest-message-util/build/index.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.separateMessageFromStack =
      exports5.formatResultsErrors =
      exports5.formatStackTrace =
      exports5.getTopFrame =
      exports5.getStackTraceLines =
      exports5.formatExecError =
        void 0;
    var path = _interopRequireWildcard(
      (init_path2(), __toCommonJS(path_exports)),
    );
    var _codeFrame = require_lib2();
    var _chalk = _interopRequireDefault(require_source());
    var fs = _interopRequireWildcard(require_graceful_fs());
    var _micromatch = _interopRequireDefault(require_micromatch());
    var _slash = _interopRequireDefault(require_slash());
    var _stackUtils = _interopRequireDefault(require_stack_utils());
    var _prettyFormat = _interopRequireDefault(require_build2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function () {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var jestReadFile =
      globalThis[Symbol2.for("jest-native-read-file")] || fs.readFileSync;
    var stackUtils = new _stackUtils.default({
      cwd: "something which does not exist",
    });
    var nodeInternals = [];
    try {
      nodeInternals = _stackUtils.default.nodeInternals().concat(/\s*\(node:/);
    } catch {}
    var PATH_NODE_MODULES = `${path.sep}node_modules${path.sep}`;
    var PATH_JEST_PACKAGES = `${path.sep}jest${path.sep}packages${path.sep}`;
    var JASMINE_IGNORE =
      /^\s+at(?:(?:.jasmine\-)|\s+jasmine\.buildExpectationResult)/;
    var JEST_INTERNALS_IGNORE =
      /^\s+at.*?jest(-.*?)?(\/|\\)(build|node_modules|packages)(\/|\\)/;
    var ANONYMOUS_FN_IGNORE = /^\s+at <anonymous>.*$/;
    var ANONYMOUS_PROMISE_IGNORE = /^\s+at (new )?Promise \(<anonymous>\).*$/;
    var ANONYMOUS_GENERATOR_IGNORE = /^\s+at Generator.next \(<anonymous>\).*$/;
    var NATIVE_NEXT_IGNORE = /^\s+at next \(native\).*$/;
    var TITLE_INDENT = "  ";
    var MESSAGE_INDENT = "    ";
    var STACK_INDENT = "      ";
    var ANCESTRY_SEPARATOR = " \u203A ";
    var TITLE_BULLET = _chalk.default.bold("\u25CF ");
    var STACK_TRACE_COLOR = _chalk.default.dim;
    var STACK_PATH_REGEXP = /\s*at.*\(?(\:\d*\:\d*|native)\)?/;
    var EXEC_ERROR_MESSAGE = "Test suite failed to run";
    var NOT_EMPTY_LINE_REGEXP = /^(?!$)/gm;
    var indentAllLines = (lines, indent) =>
      lines.replace(NOT_EMPTY_LINE_REGEXP, indent);
    var trim = (string) => (string || "").trim();
    var trimPaths = (string) =>
      string.match(STACK_PATH_REGEXP) ? trim(string) : string;
    var getRenderedCallsite = (fileContent, line, column) => {
      let renderedCallsite = (0, _codeFrame.codeFrameColumns)(
        fileContent,
        {
          start: {
            column,
            line,
          },
        },
        {
          highlightCode: true,
        },
      );
      renderedCallsite = indentAllLines(renderedCallsite, MESSAGE_INDENT);
      renderedCallsite = `
${renderedCallsite}
`;
      return renderedCallsite;
    };
    var blankStringRegexp = /^\s*$/;
    function checkForCommonEnvironmentErrors(error) {
      if (
        error.includes("ReferenceError: document is not defined") ||
        error.includes("ReferenceError: window is not defined") ||
        error.includes("ReferenceError: navigator is not defined")
      ) {
        return warnAboutWrongTestEnvironment(error, "jsdom");
      } else if (error.includes(".unref is not a function")) {
        return warnAboutWrongTestEnvironment(error, "node");
      }
      return error;
    }
    function warnAboutWrongTestEnvironment(error, env4) {
      return (
        _chalk.default.bold.red(
          `The error below may be caused by using the wrong test environment, see ${_chalk.default.dim.underline(
            "https://jestjs.io/docs/en/configuration#testenvironment-string",
          )}.
Consider using the "${env4}" test environment.

`,
        ) + error
      );
    }
    var formatExecError = (error, config4, options, testPath, reuseMessage) => {
      if (!error || typeof error === "number") {
        error = new Error(
          `Expected an Error, but "${String(error)}" was thrown`,
        );
        error.stack = "";
      }
      let message, stack;
      if (typeof error === "string" || !error) {
        error || (error = "EMPTY ERROR");
        message = "";
        stack = error;
      } else {
        message = error.message;
        stack =
          typeof error.stack === "string"
            ? error.stack
            : `thrown: ${(0, _prettyFormat.default)(error, {
                maxDepth: 3,
              })}`;
      }
      const separated = separateMessageFromStack(stack || "");
      stack = separated.stack;
      if (separated.message.includes(trim(message))) {
        message = separated.message;
      }
      message = checkForCommonEnvironmentErrors(message);
      message = indentAllLines(message, MESSAGE_INDENT);
      stack =
        stack && !options.noStackTrace
          ? "\n" + formatStackTrace(stack, config4, options, testPath)
          : "";
      if (
        typeof stack !== "string" ||
        (blankStringRegexp.test(message) && blankStringRegexp.test(stack))
      ) {
        message = `thrown: ${(0, _prettyFormat.default)(error, {
          maxDepth: 3,
        })}`;
      }
      let messageToUse;
      if (reuseMessage) {
        messageToUse = ` ${message.trim()}`;
      } else {
        messageToUse = `${EXEC_ERROR_MESSAGE}

${message}`;
      }
      return TITLE_INDENT + TITLE_BULLET + messageToUse + stack + "\n";
    };
    exports5.formatExecError = formatExecError;
    var removeInternalStackEntries = (lines, options) => {
      let pathCounter = 0;
      return lines.filter((line) => {
        if (ANONYMOUS_FN_IGNORE.test(line)) {
          return false;
        }
        if (ANONYMOUS_PROMISE_IGNORE.test(line)) {
          return false;
        }
        if (ANONYMOUS_GENERATOR_IGNORE.test(line)) {
          return false;
        }
        if (NATIVE_NEXT_IGNORE.test(line)) {
          return false;
        }
        if (nodeInternals.some((internal) => internal.test(line))) {
          return false;
        }
        if (!STACK_PATH_REGEXP.test(line)) {
          return true;
        }
        if (JASMINE_IGNORE.test(line)) {
          return false;
        }
        if (++pathCounter === 1) {
          return true;
        }
        if (options.noStackTrace) {
          return false;
        }
        if (JEST_INTERNALS_IGNORE.test(line)) {
          return false;
        }
        return true;
      });
    };
    var formatPaths = (config4, relativeTestPath, line) => {
      const match = line.match(/(^\s*at .*?\(?)([^()]+)(:[0-9]+:[0-9]+\)?.*$)/);
      if (!match) {
        return line;
      }
      let filePath = (0, _slash.default)(
        path.relative(config4.rootDir, match[2]),
      );
      if (
        (config4.testMatch &&
          config4.testMatch.length &&
          (0, _micromatch.default)([filePath], config4.testMatch).length > 0) ||
        filePath === relativeTestPath
      ) {
        filePath = _chalk.default.reset.cyan(filePath);
      }
      return (
        STACK_TRACE_COLOR(match[1]) + filePath + STACK_TRACE_COLOR(match[3])
      );
    };
    var getStackTraceLines = (
      stack,
      options = {
        noCodeFrame: false,
        noStackTrace: false,
      },
    ) => removeInternalStackEntries(stack.split(/\n/), options);
    exports5.getStackTraceLines = getStackTraceLines;
    var getTopFrame = (lines) => {
      for (const line of lines) {
        if (
          line.includes(PATH_NODE_MODULES) ||
          line.includes(PATH_JEST_PACKAGES)
        ) {
          continue;
        }
        const parsedFrame = stackUtils.parseLine(line.trim());
        if (parsedFrame && parsedFrame.file) {
          return parsedFrame;
        }
      }
      return null;
    };
    exports5.getTopFrame = getTopFrame;
    var formatStackTrace = (stack, config4, options, testPath) => {
      const lines = getStackTraceLines(stack, options);
      let renderedCallsite = "";
      const relativeTestPath = testPath
        ? (0, _slash.default)(path.relative(config4.rootDir, testPath))
        : null;
      if (!options.noStackTrace && !options.noCodeFrame) {
        const topFrame = getTopFrame(lines);
        if (topFrame) {
          const { column, file: filename, line } = topFrame;
          if (line && filename && path.isAbsolute(filename)) {
            let fileContent;
            try {
              fileContent = jestReadFile(filename, "utf8");
              renderedCallsite = getRenderedCallsite(fileContent, line, column);
            } catch {}
          }
        }
      }
      const stacktrace = lines
        .filter(Boolean)
        .map(
          (line) =>
            STACK_INDENT +
            formatPaths(config4, relativeTestPath, trimPaths(line)),
        )
        .join("\n");
      return renderedCallsite
        ? `${renderedCallsite}
${stacktrace}`
        : `
${stacktrace}`;
    };
    exports5.formatStackTrace = formatStackTrace;
    var formatResultsErrors = (testResults, config4, options, testPath) => {
      const failedResults = testResults.reduce((errors, result) => {
        result.failureMessages
          .map(checkForCommonEnvironmentErrors)
          .forEach((content) =>
            errors.push({
              content,
              result,
            }),
          );
        return errors;
      }, []);
      if (!failedResults.length) {
        return null;
      }
      return failedResults
        .map(({ result, content }) => {
          let { message, stack } = separateMessageFromStack(content);
          stack = options.noStackTrace
            ? ""
            : STACK_TRACE_COLOR(
                formatStackTrace(stack, config4, options, testPath),
              ) + "\n";
          message = indentAllLines(message, MESSAGE_INDENT);
          const title4 =
            _chalk.default.bold.red(
              TITLE_INDENT +
                TITLE_BULLET +
                result.ancestorTitles.join(ANCESTRY_SEPARATOR) +
                (result.ancestorTitles.length ? ANCESTRY_SEPARATOR : "") +
                result.title,
            ) + "\n";
          return title4 + "\n" + message + "\n" + stack;
        })
        .join("\n");
    };
    exports5.formatResultsErrors = formatResultsErrors;
    var errorRegexp = /^Error:?\s*$/;
    var removeBlankErrorLine = (str) =>
      str
        .split("\n")
        .filter((line) => !errorRegexp.test(line))
        .join("\n")
        .trimRight();
    var separateMessageFromStack = (content) => {
      if (!content) {
        return {
          message: "",
          stack: "",
        };
      }
      const messageMatch = content.match(
        /^(?:Error: )?([\s\S]*?(?=\n\s*at\s.*:\d*:\d*)|\s*.*)([\s\S]*)$/,
      );
      if (!messageMatch) {
        throw new Error("If you hit this error, the regex above is buggy.");
      }
      const message = removeBlankErrorLine(messageMatch[1]);
      const stack = removeBlankErrorLine(messageMatch[2]);
      return {
        message,
        stack,
      };
    };
    exports5.separateMessageFromStack = separateMessageFromStack;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/toThrowMatchers.js
var require_toThrowMatchers = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/toThrowMatchers.js"(
    exports5,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    Object.defineProperty(exports5, "__esModule", {
      value: true,
    });
    exports5.default = exports5.createMatcher = void 0;
    var _jestMatcherUtils = require_build5();
    var _jestMessageUtil = require_build6();
    var _print = require_print();
    var _utils = require_utils();
    var DID_NOT_THROW = "Received function did not throw";
    var getThrown = (e) => {
      const hasMessage =
        e !== null && e !== void 0 && typeof e.message === "string";
      if (
        hasMessage &&
        typeof e.name === "string" &&
        typeof e.stack === "string"
      ) {
        return {
          hasMessage,
          isError: true,
          message: e.message,
          value: e,
        };
      }
      return {
        hasMessage,
        isError: false,
        message: hasMessage ? e.message : String(e),
        value: e,
      };
    };
    var createMatcher = (matcherName, fromPromise) =>
      function (received, expected) {
        const options = {
          isNot: this.isNot,
          promise: this.promise,
        };
        let thrown = null;
        if (fromPromise && (0, _utils.isError)(received)) {
          thrown = getThrown(received);
        } else {
          if (typeof received !== "function") {
            if (!fromPromise) {
              const placeholder = expected === void 0 ? "" : "expected";
              throw new Error(
                (0, _jestMatcherUtils.matcherErrorMessage)(
                  (0, _jestMatcherUtils.matcherHint)(
                    matcherName,
                    void 0,
                    placeholder,
                    options,
                  ),
                  `${(0, _jestMatcherUtils.RECEIVED_COLOR)(
                    "received",
                  )} value must be a function`,
                  (0, _jestMatcherUtils.printWithType)(
                    "Received",
                    received,
                    _jestMatcherUtils.printReceived,
                  ),
                ),
              );
            }
          } else {
            try {
              received();
            } catch (e) {
              thrown = getThrown(e);
            }
          }
        }
        if (expected === void 0) {
          return toThrow(matcherName, options, thrown);
        } else if (typeof expected === "function") {
          return toThrowExpectedClass(matcherName, options, thrown, expected);
        } else if (typeof expected === "string") {
          return toThrowExpectedString(matcherName, options, thrown, expected);
        } else if (expected !== null && typeof expected.test === "function") {
          return toThrowExpectedRegExp(matcherName, options, thrown, expected);
        } else if (
          expected !== null &&
          typeof expected.asymmetricMatch === "function"
        ) {
          return toThrowExpectedAsymmetric(
            matcherName,
            options,
            thrown,
            expected,
          );
        } else if (expected !== null && typeof expected === "object") {
          return toThrowExpectedObject(matcherName, options, thrown, expected);
        } else {
          throw new Error(
            (0, _jestMatcherUtils.matcherErrorMessage)(
              (0, _jestMatcherUtils.matcherHint)(
                matcherName,
                void 0,
                void 0,
                options,
              ),
              `${(0, _jestMatcherUtils.EXPECTED_COLOR)(
                "expected",
              )} value must be a string or regular expression or class or error`,
              (0, _jestMatcherUtils.printWithType)(
                "Expected",
                expected,
                _jestMatcherUtils.printExpected,
              ),
            ),
          );
        }
      };
    exports5.createMatcher = createMatcher;
    var matchers = {
      toThrow: createMatcher("toThrow"),
      toThrowError: createMatcher("toThrowError"),
    };
    var toThrowExpectedRegExp = (matcherName, options, thrown, expected) => {
      const pass = thrown !== null && expected.test(thrown.message);
      const message = pass
        ? () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            formatExpected("Expected pattern: not ", expected) +
            (thrown !== null && thrown.hasMessage
              ? formatReceived(
                  "Received message:     ",
                  thrown,
                  "message",
                  expected,
                ) + formatStack(thrown)
              : formatReceived("Received value:       ", thrown, "value"))
        : () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            formatExpected("Expected pattern: ", expected) +
            (thrown === null
              ? "\n" + DID_NOT_THROW
              : thrown.hasMessage
                ? formatReceived("Received message: ", thrown, "message") +
                  formatStack(thrown)
                : formatReceived("Received value:   ", thrown, "value"));
      return {
        message,
        pass,
      };
    };
    var toThrowExpectedAsymmetric = (
      matcherName,
      options,
      thrown,
      expected,
    ) => {
      const pass = thrown !== null && expected.asymmetricMatch(thrown.value);
      const message = pass
        ? () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            formatExpected("Expected asymmetric matcher: not ", expected) +
            "\n" +
            (thrown !== null && thrown.hasMessage
              ? formatReceived("Received name:    ", thrown, "name") +
                formatReceived("Received message: ", thrown, "message") +
                formatStack(thrown)
              : formatReceived("Thrown value: ", thrown, "value"))
        : () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            formatExpected("Expected asymmetric matcher: ", expected) +
            "\n" +
            (thrown === null
              ? DID_NOT_THROW
              : thrown.hasMessage
                ? formatReceived("Received name:    ", thrown, "name") +
                  formatReceived("Received message: ", thrown, "message") +
                  formatStack(thrown)
                : formatReceived("Thrown value: ", thrown, "value"));
      return {
        message,
        pass,
      };
    };
    var toThrowExpectedObject = (matcherName, options, thrown, expected) => {
      const pass = thrown !== null && thrown.message === expected.message;
      const message = pass
        ? () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            formatExpected("Expected message: not ", expected.message) +
            (thrown !== null && thrown.hasMessage
              ? formatStack(thrown)
              : formatReceived("Received value:       ", thrown, "value"))
        : () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            (thrown === null
              ? formatExpected("Expected message: ", expected.message) +
                "\n" +
                DID_NOT_THROW
              : thrown.hasMessage
                ? (0, _jestMatcherUtils.printDiffOrStringify)(
                    expected.message,
                    thrown.message,
                    "Expected message",
                    "Received message",
                    true,
                  ) +
                  "\n" +
                  formatStack(thrown)
                : formatExpected("Expected message: ", expected.message) +
                  formatReceived("Received value:   ", thrown, "value"));
      return {
        message,
        pass,
      };
    };
    var toThrowExpectedClass = (matcherName, options, thrown, expected) => {
      const pass = thrown !== null && thrown.value instanceof expected;
      const message = pass
        ? () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            (0, _print.printExpectedConstructorNameNot)(
              "Expected constructor",
              expected,
            ) +
            (thrown !== null &&
            thrown.value != null &&
            typeof thrown.value.constructor === "function" &&
            thrown.value.constructor !== expected
              ? (0, _print.printReceivedConstructorNameNot)(
                  "Received constructor",
                  thrown.value.constructor,
                  expected,
                )
              : "") +
            "\n" +
            (thrown !== null && thrown.hasMessage
              ? formatReceived("Received message: ", thrown, "message") +
                formatStack(thrown)
              : formatReceived("Received value: ", thrown, "value"))
        : () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            (0, _print.printExpectedConstructorName)(
              "Expected constructor",
              expected,
            ) +
            (thrown === null
              ? "\n" + DID_NOT_THROW
              : (thrown.value != null &&
                typeof thrown.value.constructor === "function"
                  ? (0, _print.printReceivedConstructorName)(
                      "Received constructor",
                      thrown.value.constructor,
                    )
                  : "") +
                "\n" +
                (thrown.hasMessage
                  ? formatReceived("Received message: ", thrown, "message") +
                    formatStack(thrown)
                  : formatReceived("Received value: ", thrown, "value")));
      return {
        message,
        pass,
      };
    };
    var toThrowExpectedString = (matcherName, options, thrown, expected) => {
      const pass = thrown !== null && thrown.message.includes(expected);
      const message = pass
        ? () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            formatExpected("Expected substring: not ", expected) +
            (thrown !== null && thrown.hasMessage
              ? formatReceived(
                  "Received message:       ",
                  thrown,
                  "message",
                  expected,
                ) + formatStack(thrown)
              : formatReceived("Received value:         ", thrown, "value"))
        : () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              void 0,
              options,
            ) +
            "\n\n" +
            formatExpected("Expected substring: ", expected) +
            (thrown === null
              ? "\n" + DID_NOT_THROW
              : thrown.hasMessage
                ? formatReceived("Received message:   ", thrown, "message") +
                  formatStack(thrown)
                : formatReceived("Received value:     ", thrown, "value"));
      return {
        message,
        pass,
      };
    };
    var toThrow = (matcherName, options, thrown) => {
      const pass = thrown !== null;
      const message = pass
        ? () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              "",
              options,
            ) +
            "\n\n" +
            (thrown !== null && thrown.hasMessage
              ? formatReceived("Error name:    ", thrown, "name") +
                formatReceived("Error message: ", thrown, "message") +
                formatStack(thrown)
              : formatReceived("Thrown value: ", thrown, "value"))
        : () =>
            (0, _jestMatcherUtils.matcherHint)(
              matcherName,
              void 0,
              "",
              options,
            ) +
            "\n\n" +
            DID_NOT_THROW;
      return {
        message,
        pass,
      };
    };
    var formatExpected = (label, expected) =>
      label + (0, _jestMatcherUtils.printExpected)(expected) + "\n";
    var formatReceived = (label, thrown, key, expected) => {
      if (thrown === null) {
        return "";
      }
      if (key === "message") {
        const message = thrown.message;
        if (typeof expected === "string") {
          const index = message.indexOf(expected);
          if (index !== -1) {
            return (
              label +
              (0, _print.printReceivedStringContainExpectedSubstring)(
                message,
                index,
                expected.length,
              ) +
              "\n"
            );
          }
        } else if (expected instanceof RegExp) {
          return (
            label +
            (0, _print.printReceivedStringContainExpectedResult)(
              message,
              typeof expected.exec === "function"
                ? expected.exec(message)
                : null,
            ) +
            "\n"
          );
        }
        return label + (0, _jestMatcherUtils.printReceived)(message) + "\n";
      }
      if (key === "name") {
        return thrown.isError
          ? label +
              (0, _jestMatcherUtils.printReceived)(thrown.value.name) +
              "\n"
          : "";
      }
      if (key === "value") {
        return thrown.isError
          ? ""
          : label + (0, _jestMatcherUtils.printReceived)(thrown.value) + "\n";
      }
      return "";
    };
    var formatStack = (thrown) =>
      thrown === null || !thrown.isError
        ? ""
        : (0, _jestMessageUtil.formatStackTrace)(
            (0, _jestMessageUtil.separateMessageFromStack)(thrown.value.stack)
              .stack,
            {
              rootDir: process2.cwd(),
              testMatch: [],
            },
            {
              noStackTrace: false,
            },
          );
    var _default = matchers;
    exports5.default = _default;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/index.js
var require_build7 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/expect-npm-26.6.2-256ea90344-10c0.zip/node_modules/expect/build/index.js"(
    exports5,
    module,
  ) {
    "use strict";
    init_process_shim();
    init_Buffer();
    init_process();
    var matcherUtils = _interopRequireWildcard(require_build5());
    var _asymmetricMatchers = require_asymmetricMatchers();
    var _extractExpectedAssertionsErrors = _interopRequireDefault(
      require_extractExpectedAssertionsErrors(),
    );
    var _jasmineUtils = require_jasmineUtils();
    var _jestMatchersObject = require_jestMatchersObject();
    var _matchers = _interopRequireDefault(require_matchers());
    var _spyMatchers = _interopRequireDefault(require_spyMatchers());
    var _toThrowMatchers = _interopRequireWildcard(require_toThrowMatchers());
    var _utils = require_utils();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function () {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var Symbol2 = globalThis["jest-symbol-do-not-touch"] || globalThis.Symbol;
    var Promise2 =
      globalThis[Symbol2.for("jest-native-promise")] || globalThis.Promise;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var JestAssertionError = class extends Error {
      constructor(...args) {
        super(...args);
        _defineProperty(this, "matcherResult", void 0);
      }
    };
    var isPromise = (obj) =>
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function";
    var createToThrowErrorMatchingSnapshotMatcher = function (matcher) {
      return function (received, testNameOrInlineSnapshot) {
        return matcher.apply(this, [received, testNameOrInlineSnapshot, true]);
      };
    };
    var getPromiseMatcher = (name, matcher) => {
      if (name === "toThrow" || name === "toThrowError") {
        return (0, _toThrowMatchers.createMatcher)(name, true);
      } else if (
        name === "toThrowErrorMatchingSnapshot" ||
        name === "toThrowErrorMatchingInlineSnapshot"
      ) {
        return createToThrowErrorMatchingSnapshotMatcher(matcher);
      }
      return null;
    };
    var expect = (actual, ...rest) => {
      if (rest.length !== 0) {
        throw new Error("Expect takes at most one argument.");
      }
      const allMatchers = (0, _jestMatchersObject.getMatchers)();
      const expectation = {
        not: {},
        rejects: {
          not: {},
        },
        resolves: {
          not: {},
        },
      };
      const err = new JestAssertionError();
      Object.keys(allMatchers).forEach((name) => {
        const matcher = allMatchers[name];
        const promiseMatcher = getPromiseMatcher(name, matcher) || matcher;
        expectation[name] = makeThrowingMatcher(matcher, false, "", actual);
        expectation.not[name] = makeThrowingMatcher(matcher, true, "", actual);
        expectation.resolves[name] = makeResolveMatcher(
          name,
          promiseMatcher,
          false,
          actual,
          err,
        );
        expectation.resolves.not[name] = makeResolveMatcher(
          name,
          promiseMatcher,
          true,
          actual,
          err,
        );
        expectation.rejects[name] = makeRejectMatcher(
          name,
          promiseMatcher,
          false,
          actual,
          err,
        );
        expectation.rejects.not[name] = makeRejectMatcher(
          name,
          promiseMatcher,
          true,
          actual,
          err,
        );
      });
      return expectation;
    };
    var getMessage = (message) =>
      (message && message()) ||
      matcherUtils.RECEIVED_COLOR("No message was specified for this matcher.");
    var makeResolveMatcher =
      (matcherName, matcher, isNot, actual, outerErr) =>
      (...args) => {
        const options = {
          isNot,
          promise: "resolves",
        };
        if (!isPromise(actual)) {
          throw new JestAssertionError(
            matcherUtils.matcherErrorMessage(
              matcherUtils.matcherHint(matcherName, void 0, "", options),
              `${matcherUtils.RECEIVED_COLOR("received")} value must be a promise`,
              matcherUtils.printWithType(
                "Received",
                actual,
                matcherUtils.printReceived,
              ),
            ),
          );
        }
        const innerErr = new JestAssertionError();
        return actual.then(
          (result) =>
            makeThrowingMatcher(
              matcher,
              isNot,
              "resolves",
              result,
              innerErr,
            ).apply(null, args),
          (reason) => {
            outerErr.message =
              matcherUtils.matcherHint(matcherName, void 0, "", options) +
              `

Received promise rejected instead of resolved
Rejected to value: ${matcherUtils.printReceived(reason)}`;
            return Promise2.reject(outerErr);
          },
        );
      };
    var makeRejectMatcher =
      (matcherName, matcher, isNot, actual, outerErr) =>
      (...args) => {
        const options = {
          isNot,
          promise: "rejects",
        };
        const actualWrapper = typeof actual === "function" ? actual() : actual;
        if (!isPromise(actualWrapper)) {
          throw new JestAssertionError(
            matcherUtils.matcherErrorMessage(
              matcherUtils.matcherHint(matcherName, void 0, "", options),
              `${matcherUtils.RECEIVED_COLOR(
                "received",
              )} value must be a promise or a function returning a promise`,
              matcherUtils.printWithType(
                "Received",
                actual,
                matcherUtils.printReceived,
              ),
            ),
          );
        }
        const innerErr = new JestAssertionError();
        return actualWrapper.then(
          (result) => {
            outerErr.message =
              matcherUtils.matcherHint(matcherName, void 0, "", options) +
              `

Received promise resolved instead of rejected
Resolved to value: ${matcherUtils.printReceived(result)}`;
            return Promise2.reject(outerErr);
          },
          (reason) =>
            makeThrowingMatcher(
              matcher,
              isNot,
              "rejects",
              reason,
              innerErr,
            ).apply(null, args),
        );
      };
    var makeThrowingMatcher = (matcher, isNot, promise, actual, err) =>
      function throwingMatcher(...args) {
        let throws = true;
        const utils = {
          ...matcherUtils,
          iterableEquality: _utils.iterableEquality,
          subsetEquality: _utils.subsetEquality,
        };
        const matcherContext = {
          // When throws is disabled, the matcher will not throw errors during test
          // execution but instead add them to the global matcher state. If a
          // matcher throws, test execution is normally stopped immediately. The
          // snapshot matcher uses it because we want to log all snapshot
          // failures in a test.
          dontThrow: () => (throws = false),
          ...(0, _jestMatchersObject.getState)(),
          equals: _jasmineUtils.equals,
          error: err,
          isNot,
          promise,
          utils,
        };
        const processResult = (result, asyncError) => {
          _validateResult(result);
          (0, _jestMatchersObject.getState)().assertionCalls++;
          if ((result.pass && isNot) || (!result.pass && !isNot)) {
            const message = getMessage(result.message);
            let error;
            if (err) {
              error = err;
              error.message = message;
            } else if (asyncError) {
              error = asyncError;
              error.message = message;
            } else {
              error = new JestAssertionError(message);
              if (Error.captureStackTrace) {
                Error.captureStackTrace(error, throwingMatcher);
              }
            }
            error.matcherResult = result;
            if (throws) {
              throw error;
            } else {
              (0, _jestMatchersObject.getState)().suppressedErrors.push(error);
            }
          }
        };
        const handleError = (error) => {
          if (
            matcher[_jestMatchersObject.INTERNAL_MATCHER_FLAG] === true &&
            !(error instanceof JestAssertionError) &&
            error.name !== "PrettyFormatPluginError" && // Guard for some environments (browsers) that do not support this feature.
            Error.captureStackTrace
          ) {
            Error.captureStackTrace(error, throwingMatcher);
          }
          throw error;
        };
        let potentialResult;
        try {
          potentialResult =
            matcher[_jestMatchersObject.INTERNAL_MATCHER_FLAG] === true
              ? matcher.call(matcherContext, actual, ...args)
              : // in the stack trace, so that it can correctly get the custom matcher
                // function call.
                (function __EXTERNAL_MATCHER_TRAP__() {
                  return matcher.call(matcherContext, actual, ...args);
                })();
          if (isPromise(potentialResult)) {
            const asyncResult = potentialResult;
            const asyncError = new JestAssertionError();
            if (Error.captureStackTrace) {
              Error.captureStackTrace(asyncError, throwingMatcher);
            }
            return asyncResult
              .then((aResult) => processResult(aResult, asyncError))
              .catch(handleError);
          } else {
            const syncResult = potentialResult;
            return processResult(syncResult);
          }
        } catch (error) {
          return handleError(error);
        }
      };
    expect.extend = (matchers) =>
      (0, _jestMatchersObject.setMatchers)(matchers, false, expect);
    expect.anything = _asymmetricMatchers.anything;
    expect.any = _asymmetricMatchers.any;
    expect.not = {
      arrayContaining: _asymmetricMatchers.arrayNotContaining,
      objectContaining: _asymmetricMatchers.objectNotContaining,
      stringContaining: _asymmetricMatchers.stringNotContaining,
      stringMatching: _asymmetricMatchers.stringNotMatching,
    };
    expect.objectContaining = _asymmetricMatchers.objectContaining;
    expect.arrayContaining = _asymmetricMatchers.arrayContaining;
    expect.stringContaining = _asymmetricMatchers.stringContaining;
    expect.stringMatching = _asymmetricMatchers.stringMatching;
    var _validateResult = (result) => {
      if (
        typeof result !== "object" ||
        typeof result.pass !== "boolean" ||
        (result.message &&
          typeof result.message !== "string" &&
          typeof result.message !== "function")
      ) {
        throw new Error(
          `Unexpected return from a matcher function.
Matcher functions should return an object in the following format:
  {message?: string | function, pass: boolean}
'${matcherUtils.stringify(result)}' was returned`,
        );
      }
    };
    function assertions(expected) {
      const error = new Error();
      if (Error.captureStackTrace) {
        Error.captureStackTrace(error, assertions);
      }
      (0, _jestMatchersObject.getState)().expectedAssertionsNumber = expected;
      (0, _jestMatchersObject.getState)().expectedAssertionsNumberError = error;
    }
    function hasAssertions(...args) {
      const error = new Error();
      if (Error.captureStackTrace) {
        Error.captureStackTrace(error, hasAssertions);
      }
      matcherUtils.ensureNoExpected(args[0], ".hasAssertions");
      (0, _jestMatchersObject.getState)().isExpectingAssertions = true;
      (0, _jestMatchersObject.getState)().isExpectingAssertionsError = error;
    }
    (0, _jestMatchersObject.setMatchers)(_matchers.default, true, expect);
    (0, _jestMatchersObject.setMatchers)(_spyMatchers.default, true, expect);
    (0, _jestMatchersObject.setMatchers)(
      _toThrowMatchers.default,
      true,
      expect,
    );
    expect.addSnapshotSerializer = () => void 0;
    expect.assertions = assertions;
    expect.hasAssertions = hasAssertions;
    expect.getState = _jestMatchersObject.getState;
    expect.setState = _jestMatchersObject.setState;
    expect.extractExpectedAssertionsErrors =
      _extractExpectedAssertionsErrors.default;
    var expectExport = expect;
    module.exports = expectExport;
  },
});

// ../../../../AppData/Local/Yarn/Berry/cache/jest-mock-npm-24.9.0-22e61bf7ca-10c0.zip/node_modules/jest-mock/build-es5/index.js
var require_build_es5 = __commonJS({
  "../../../../AppData/Local/Yarn/Berry/cache/jest-mock-npm-24.9.0-22e61bf7ca-10c0.zip/node_modules/jest-mock/build-es5/index.js"(
    exports5,
    module,
  ) {
    init_process_shim();
    init_Buffer();
    init_process();
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports5 === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd) define([], factory);
      else if (typeof exports5 === "object") exports5["jestMock"] = factory();
      else root["jestMock"] = factory();
    })(window, function () {
      return (
        /******/
        (function (modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = (installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {},
              /******/
            });
            modules[moduleId].call(
              module2.exports,
              module2,
              module2.exports,
              __webpack_require__,
            );
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function (exports6, name, getter) {
            if (!__webpack_require__.o(exports6, name)) {
              Object.defineProperty(exports6, name, {
                enumerable: true,
                get: getter,
              });
            }
          };
          __webpack_require__.r = function (exports6) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports6, Symbol.toStringTag, {
                value: "Module",
              });
            }
            Object.defineProperty(exports6, "__esModule", { value: true });
          };
          __webpack_require__.t = function (value, mode) {
            if (mode & 1) value = __webpack_require__(value);
            if (mode & 8) return value;
            if (
              mode & 4 &&
              typeof value === "object" &&
              value &&
              value.__esModule
            )
              return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string")
              for (var key in value)
                __webpack_require__.d(
                  ns,
                  key,
                  function (key2) {
                    return value[key2];
                  }.bind(null, key),
                );
            return ns;
          };
          __webpack_require__.n = function (module2) {
            var getter =
              module2 && module2.__esModule
                ? /******/
                  function getDefault() {
                    return module2["default"];
                  }
                : /******/
                  function getModuleExports() {
                    return module2;
                  };
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(
            (__webpack_require__.s = "./packages/jest-mock/src/index.ts"),
          );
        })({
          /***/
          "./node_modules/webpack/buildin/global.js":
            /*!***********************************!*\
              !*** (webpack)/buildin/global.js ***!
              \***********************************/
            /*! no static exports found */
            /***/
            function (module2, exports6, __webpack_require__) {
              "use strict";
              function _typeof(obj) {
                if (
                  typeof Symbol === "function" &&
                  typeof Symbol.iterator === "symbol"
                ) {
                  _typeof = function _typeof2(obj2) {
                    return typeof obj2;
                  };
                } else {
                  _typeof = function _typeof2(obj2) {
                    return obj2 &&
                      typeof Symbol === "function" &&
                      obj2.constructor === Symbol &&
                      obj2 !== Symbol.prototype
                      ? "symbol"
                      : typeof obj2;
                  };
                }
                return _typeof(obj);
              }
              var g;
              g = /* @__PURE__ */ (function () {
                return this;
              })();
              try {
                g = g || new Function("return this")();
              } catch (e) {
                if (
                  (typeof window === "undefined"
                    ? "undefined"
                    : _typeof(window)) === "object"
                )
                  g = window;
              }
              module2.exports = g;
            },
          /***/
          "./packages/jest-mock/src/index.ts":
            /*!*****************************************!*\
              !*** ./packages/jest-mock/src/index.ts ***!
              \*****************************************/
            /*! no static exports found */
            /***/
            function (module2, exports6, __webpack_require__) {
              "use strict";
              (function (global2) {
                function _typeof(obj) {
                  if (
                    typeof Symbol === "function" &&
                    typeof Symbol.iterator === "symbol"
                  ) {
                    _typeof = function _typeof2(obj2) {
                      return typeof obj2;
                    };
                  } else {
                    _typeof = function _typeof2(obj2) {
                      return obj2 &&
                        typeof Symbol === "function" &&
                        obj2.constructor === Symbol &&
                        obj2 !== Symbol.prototype
                        ? "symbol"
                        : typeof obj2;
                    };
                  }
                  return _typeof(obj);
                }
                function _classCallCheck(instance, Constructor) {
                  if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                  }
                }
                function _defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                  if (protoProps)
                    _defineProperties(Constructor.prototype, protoProps);
                  if (staticProps) _defineProperties(Constructor, staticProps);
                  return Constructor;
                }
                var MOCK_CONSTRUCTOR_NAME = "mockConstructor";
                var FUNCTION_NAME_RESERVED_PATTERN = /[\s!-\/:-@\[-`{-~]/;
                var FUNCTION_NAME_RESERVED_REPLACE = new RegExp(
                  FUNCTION_NAME_RESERVED_PATTERN.source,
                  "g",
                );
                var RESERVED_KEYWORDS = /* @__PURE__ */ new Set([
                  "arguments",
                  "await",
                  "break",
                  "case",
                  "catch",
                  "class",
                  "const",
                  "continue",
                  "debugger",
                  "default",
                  "delete",
                  "do",
                  "else",
                  "enum",
                  "eval",
                  "export",
                  "extends",
                  "false",
                  "finally",
                  "for",
                  "function",
                  "if",
                  "implements",
                  "import",
                  "in",
                  "instanceof",
                  "interface",
                  "let",
                  "new",
                  "null",
                  "package",
                  "private",
                  "protected",
                  "public",
                  "return",
                  "static",
                  "super",
                  "switch",
                  "this",
                  "throw",
                  "true",
                  "try",
                  "typeof",
                  "var",
                  "void",
                  "while",
                  "with",
                  "yield",
                ]);
                function matchArity(fn, length) {
                  var mockConstructor;
                  switch (length) {
                    case 1:
                      mockConstructor = function mockConstructor2(_a) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    case 2:
                      mockConstructor = function mockConstructor2(_a, _b) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    case 3:
                      mockConstructor = function mockConstructor2(_a, _b, _c) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    case 4:
                      mockConstructor = function mockConstructor2(
                        _a,
                        _b,
                        _c,
                        _d,
                      ) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    case 5:
                      mockConstructor = function mockConstructor2(
                        _a,
                        _b,
                        _c,
                        _d,
                        _e,
                      ) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    case 6:
                      mockConstructor = function mockConstructor2(
                        _a,
                        _b,
                        _c,
                        _d,
                        _e,
                        _f,
                      ) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    case 7:
                      mockConstructor = function mockConstructor2(
                        _a,
                        _b,
                        _c,
                        _d,
                        _e,
                        _f,
                        _g,
                      ) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    case 8:
                      mockConstructor = function mockConstructor2(
                        _a,
                        _b,
                        _c,
                        _d,
                        _e,
                        _f,
                        _g,
                        _h,
                      ) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    case 9:
                      mockConstructor = function mockConstructor2(
                        _a,
                        _b,
                        _c,
                        _d,
                        _e,
                        _f,
                        _g,
                        _h,
                        _i,
                      ) {
                        return fn.apply(this, arguments);
                      };
                      break;
                    default:
                      mockConstructor = function mockConstructor2() {
                        return fn.apply(this, arguments);
                      };
                      break;
                  }
                  return mockConstructor;
                }
                function getObjectType(value) {
                  return Object.prototype.toString.apply(value).slice(8, -1);
                }
                function getType(ref) {
                  var typeName = getObjectType(ref);
                  if (
                    typeName === "Function" ||
                    typeName === "AsyncFunction" ||
                    typeName === "GeneratorFunction"
                  ) {
                    return "function";
                  } else if (Array.isArray(ref)) {
                    return "array";
                  } else if (typeName === "Object") {
                    return "object";
                  } else if (
                    typeName === "Number" ||
                    typeName === "String" ||
                    typeName === "Boolean" ||
                    typeName === "Symbol"
                  ) {
                    return "constant";
                  } else if (
                    typeName === "Map" ||
                    typeName === "WeakMap" ||
                    typeName === "Set"
                  ) {
                    return "collection";
                  } else if (typeName === "RegExp") {
                    return "regexp";
                  } else if (ref === void 0) {
                    return "undefined";
                  } else if (ref === null) {
                    return "null";
                  } else {
                    return null;
                  }
                }
                function isReadonlyProp(object, prop) {
                  if (
                    prop === "arguments" ||
                    prop === "caller" ||
                    prop === "callee" ||
                    prop === "name" ||
                    prop === "length"
                  ) {
                    var typeName = getObjectType(object);
                    return (
                      typeName === "Function" ||
                      typeName === "AsyncFunction" ||
                      typeName === "GeneratorFunction"
                    );
                  }
                  if (
                    prop === "source" ||
                    prop === "global" ||
                    prop === "ignoreCase" ||
                    prop === "multiline"
                  ) {
                    return getObjectType(object) === "RegExp";
                  }
                  return false;
                }
                var ModuleMockerClass = /* @__PURE__ */ (function () {
                  function ModuleMockerClass2(global3) {
                    _classCallCheck(this, ModuleMockerClass2);
                    this._environmentGlobal = global3;
                    this._mockState = /* @__PURE__ */ new WeakMap();
                    this._mockConfigRegistry = /* @__PURE__ */ new WeakMap();
                    this._spyState = /* @__PURE__ */ new Set();
                    this.ModuleMocker = ModuleMockerClass2;
                    this._invocationCallCounter = 1;
                  }
                  _createClass(ModuleMockerClass2, [
                    {
                      key: "_getSlots",
                      value: function _getSlots(object) {
                        if (!object) {
                          return [];
                        }
                        var slots = /* @__PURE__ */ new Set();
                        var EnvObjectProto =
                          this._environmentGlobal.Object.prototype;
                        var EnvFunctionProto =
                          this._environmentGlobal.Function.prototype;
                        var EnvRegExpProto =
                          this._environmentGlobal.RegExp.prototype;
                        var ObjectProto = Object.prototype;
                        var FunctionProto = Function.prototype;
                        var RegExpProto = RegExp.prototype;
                        while (
                          object != null &&
                          object !== EnvObjectProto &&
                          object !== EnvFunctionProto &&
                          object !== EnvRegExpProto &&
                          object !== ObjectProto &&
                          object !== FunctionProto &&
                          object !== RegExpProto
                        ) {
                          var ownNames = Object.getOwnPropertyNames(object);
                          for (var i = 0; i < ownNames.length; i++) {
                            var prop = ownNames[i];
                            if (!isReadonlyProp(object, prop)) {
                              var propDesc = Object.getOwnPropertyDescriptor(
                                object,
                                prop,
                              );
                              if (
                                (propDesc !== void 0 && !propDesc.get) ||
                                object.__esModule
                              ) {
                                slots.add(prop);
                              }
                            }
                          }
                          object = Object.getPrototypeOf(object);
                        }
                        return Array.from(slots);
                      },
                    },
                    {
                      key: "_ensureMockConfig",
                      value: function _ensureMockConfig(f) {
                        var config4 = this._mockConfigRegistry.get(f);
                        if (!config4) {
                          config4 = this._defaultMockConfig();
                          this._mockConfigRegistry.set(f, config4);
                        }
                        return config4;
                      },
                    },
                    {
                      key: "_ensureMockState",
                      value: function _ensureMockState(f) {
                        var state = this._mockState.get(f);
                        if (!state) {
                          state = this._defaultMockState();
                          this._mockState.set(f, state);
                        }
                        return state;
                      },
                    },
                    {
                      key: "_defaultMockConfig",
                      value: function _defaultMockConfig() {
                        return {
                          defaultReturnValue: void 0,
                          isReturnValueLastSet: false,
                          mockImpl: void 0,
                          mockName: "jest.fn()",
                          specificMockImpls: [],
                          specificReturnValues: [],
                        };
                      },
                    },
                    {
                      key: "_defaultMockState",
                      value: function _defaultMockState() {
                        return {
                          calls: [],
                          instances: [],
                          invocationCallOrder: [],
                          results: [],
                        };
                      },
                    },
                    {
                      key: "_makeComponent",
                      value: function _makeComponent(metadata, restore) {
                        var _this2 = this;
                        if (metadata.type === "object") {
                          return new this._environmentGlobal.Object();
                        } else if (metadata.type === "array") {
                          return new this._environmentGlobal.Array();
                        } else if (metadata.type === "regexp") {
                          return new this._environmentGlobal.RegExp("");
                        } else if (
                          metadata.type === "constant" ||
                          metadata.type === "collection" ||
                          metadata.type === "null" ||
                          metadata.type === "undefined"
                        ) {
                          return metadata.value;
                        } else if (metadata.type === "function") {
                          var prototype =
                            (metadata.members &&
                              metadata.members.prototype &&
                              metadata.members.prototype.members) ||
                            {};
                          var prototypeSlots = this._getSlots(prototype);
                          var mocker = this;
                          var mockConstructor = matchArity(function () {
                            var _this = this,
                              _arguments = arguments;
                            for (
                              var _len = arguments.length,
                                args = new Array(_len),
                                _key = 0;
                              _key < _len;
                              _key++
                            ) {
                              args[_key] = arguments[_key];
                            }
                            var mockState = mocker._ensureMockState(f);
                            var mockConfig = mocker._ensureMockConfig(f);
                            mockState.instances.push(this);
                            mockState.calls.push(args);
                            var mockResult = {
                              type: "incomplete",
                              value: void 0,
                            };
                            mockState.results.push(mockResult);
                            mockState.invocationCallOrder.push(
                              mocker._invocationCallCounter++,
                            );
                            var finalReturnValue;
                            var thrownError;
                            var callDidThrowError = false;
                            try {
                              finalReturnValue = (function () {
                                if (_this instanceof f) {
                                  prototypeSlots.forEach(function (slot) {
                                    if (prototype[slot].type === "function") {
                                      var protoImpl = _this[slot];
                                      _this[slot] = mocker.generateFromMetadata(
                                        prototype[slot],
                                      );
                                      _this[slot]._protoImpl = protoImpl;
                                    }
                                  });
                                  var _mockImpl = mockConfig.specificMockImpls
                                    .length
                                    ? mockConfig.specificMockImpls.shift()
                                    : mockConfig.mockImpl;
                                  return (
                                    _mockImpl &&
                                    _mockImpl.apply(_this, _arguments)
                                  );
                                }
                                var returnValue = mockConfig.defaultReturnValue;
                                if (mockConfig.specificReturnValues.length) {
                                  return mockConfig.specificReturnValues.shift();
                                }
                                if (mockConfig.isReturnValueLastSet) {
                                  return mockConfig.defaultReturnValue;
                                }
                                var specificMockImpl;
                                if (returnValue === void 0) {
                                  specificMockImpl =
                                    mockConfig.specificMockImpls.shift();
                                  if (specificMockImpl === void 0) {
                                    specificMockImpl = mockConfig.mockImpl;
                                  }
                                  if (specificMockImpl) {
                                    return specificMockImpl.apply(
                                      _this,
                                      _arguments,
                                    );
                                  }
                                }
                                if (returnValue === void 0 && f._protoImpl) {
                                  return f._protoImpl.apply(_this, _arguments);
                                }
                                return returnValue;
                              })();
                            } catch (error) {
                              thrownError = error;
                              callDidThrowError = true;
                              throw error;
                            } finally {
                              mockResult.type = callDidThrowError
                                ? "throw"
                                : "return";
                              mockResult.value = callDidThrowError
                                ? thrownError
                                : finalReturnValue;
                            }
                            return finalReturnValue;
                          }, metadata.length || 0);
                          var f = this._createMockFunction(
                            metadata,
                            mockConstructor,
                          );
                          f._isMockFunction = true;
                          f.getMockImplementation = function () {
                            return _this2._ensureMockConfig(f).mockImpl;
                          };
                          if (typeof restore === "function") {
                            this._spyState.add(restore);
                          }
                          this._mockState.set(f, this._defaultMockState());
                          this._mockConfigRegistry.set(
                            f,
                            this._defaultMockConfig(),
                          );
                          Object.defineProperty(f, "mock", {
                            configurable: false,
                            enumerable: true,
                            get: function get() {
                              return _this2._ensureMockState(f);
                            },
                            set: function set(val) {
                              return _this2._mockState.set(f, val);
                            },
                          });
                          f.mockClear = function () {
                            _this2._mockState.delete(f);
                            return f;
                          };
                          f.mockReset = function () {
                            f.mockClear();
                            _this2._mockConfigRegistry.delete(f);
                            return f;
                          };
                          f.mockRestore = function () {
                            f.mockReset();
                            return restore ? restore() : void 0;
                          };
                          f.mockReturnValueOnce = function (value) {
                            var mockConfig = _this2._ensureMockConfig(f);
                            mockConfig.specificReturnValues.push(value);
                            return f;
                          };
                          f.mockResolvedValueOnce = function (value) {
                            return f.mockImplementationOnce(function () {
                              return Promise.resolve(value);
                            });
                          };
                          f.mockRejectedValueOnce = function (value) {
                            return f.mockImplementationOnce(function () {
                              return Promise.reject(value);
                            });
                          };
                          f.mockReturnValue = function (value) {
                            var mockConfig = _this2._ensureMockConfig(f);
                            mockConfig.isReturnValueLastSet = true;
                            mockConfig.defaultReturnValue = value;
                            return f;
                          };
                          f.mockResolvedValue = function (value) {
                            return f.mockImplementation(function () {
                              return Promise.resolve(value);
                            });
                          };
                          f.mockRejectedValue = function (value) {
                            return f.mockImplementation(function () {
                              return Promise.reject(value);
                            });
                          };
                          f.mockImplementationOnce = function (fn) {
                            var mockConfig = _this2._ensureMockConfig(f);
                            mockConfig.isReturnValueLastSet = false;
                            mockConfig.specificMockImpls.push(fn);
                            return f;
                          };
                          f.mockImplementation = function (fn) {
                            var mockConfig = _this2._ensureMockConfig(f);
                            mockConfig.isReturnValueLastSet = false;
                            mockConfig.defaultReturnValue = void 0;
                            mockConfig.mockImpl = fn;
                            return f;
                          };
                          f.mockReturnThis = function () {
                            return f.mockImplementation(function () {
                              return this;
                            });
                          };
                          f.mockName = function (name) {
                            if (name) {
                              var mockConfig = _this2._ensureMockConfig(f);
                              mockConfig.mockName = name;
                            }
                            return f;
                          };
                          f.getMockName = function () {
                            var mockConfig = _this2._ensureMockConfig(f);
                            return mockConfig.mockName || "jest.fn()";
                          };
                          if (metadata.mockImpl) {
                            f.mockImplementation(metadata.mockImpl);
                          }
                          return f;
                        } else {
                          var unknownType = metadata.type || "undefined type";
                          throw new Error("Unrecognized type " + unknownType);
                        }
                      },
                    },
                    {
                      key: "_createMockFunction",
                      value: function _createMockFunction(
                        metadata,
                        mockConstructor,
                      ) {
                        var name = metadata.name;
                        if (!name) {
                          return mockConstructor;
                        }
                        var boundFunctionPrefix = "bound ";
                        var bindCall = "";
                        if (name && name.startsWith(boundFunctionPrefix)) {
                          do {
                            name = name.substring(boundFunctionPrefix.length);
                            bindCall = ".bind(null)";
                          } while (
                            name &&
                            name.startsWith(boundFunctionPrefix)
                          );
                        }
                        if (name === MOCK_CONSTRUCTOR_NAME) {
                          return mockConstructor;
                        }
                        if (
                          // It's a syntax error to define functions with a reserved keyword
                          // as name.
                          RESERVED_KEYWORDS.has(name) || // It's also a syntax error to define functions with a name that starts with a number
                          /^\d/.test(name)
                        ) {
                          name = "$" + name;
                        }
                        if (FUNCTION_NAME_RESERVED_PATTERN.test(name)) {
                          name = name.replace(
                            FUNCTION_NAME_RESERVED_REPLACE,
                            "$",
                          );
                        }
                        var body =
                          "return function " +
                          name +
                          "() {return " +
                          MOCK_CONSTRUCTOR_NAME +
                          ".apply(this,arguments);}" +
                          bindCall;
                        var createConstructor =
                          new this._environmentGlobal.Function(
                            MOCK_CONSTRUCTOR_NAME,
                            body,
                          );
                        return createConstructor(mockConstructor);
                      },
                    },
                    {
                      key: "_generateMock",
                      value: function _generateMock(metadata, callbacks, refs) {
                        var _this3 = this;
                        var mock = this._makeComponent(metadata);
                        if (metadata.refID != null) {
                          refs[metadata.refID] = mock;
                        }
                        this._getSlots(metadata.members).forEach(
                          function (slot) {
                            var slotMetadata =
                              (metadata.members && metadata.members[slot]) ||
                              {};
                            if (slotMetadata.ref != null) {
                              callbacks.push(
                                /* @__PURE__ */ (function (ref) {
                                  return function () {
                                    return (mock[slot] = refs[ref]);
                                  };
                                })(slotMetadata.ref),
                              );
                            } else {
                              mock[slot] = _this3._generateMock(
                                slotMetadata,
                                callbacks,
                                refs,
                              );
                            }
                          },
                        );
                        if (
                          metadata.type !== "undefined" &&
                          metadata.type !== "null" &&
                          mock.prototype &&
                          _typeof(mock.prototype) === "object"
                        ) {
                          mock.prototype.constructor = mock;
                        }
                        return mock;
                      },
                      /**
                       * @see README.md
                       * @param _metadata Metadata for the mock in the schema returned by the
                       * getMetadata method of this module.
                       */
                    },
                    {
                      key: "generateFromMetadata",
                      value: function generateFromMetadata(_metadata) {
                        var callbacks = [];
                        var refs = {};
                        var mock = this._generateMock(
                          _metadata,
                          callbacks,
                          refs,
                        );
                        callbacks.forEach(function (setter) {
                          return setter();
                        });
                        return mock;
                      },
                      /**
                       * @see README.md
                       * @param component The component for which to retrieve metadata.
                       */
                    },
                    {
                      key: "getMetadata",
                      value: function getMetadata(component, _refs) {
                        var _this4 = this;
                        var refs = _refs || /* @__PURE__ */ new Map();
                        var ref = refs.get(component);
                        if (ref != null) {
                          return {
                            ref,
                          };
                        }
                        var type = getType(component);
                        if (!type) {
                          return null;
                        }
                        var metadata = {
                          type,
                        };
                        if (
                          type === "constant" ||
                          type === "collection" ||
                          type === "undefined" ||
                          type === "null"
                        ) {
                          metadata.value = component;
                          return metadata;
                        } else if (type === "function") {
                          metadata.name = component.name;
                          if (component._isMockFunction === true) {
                            metadata.mockImpl =
                              component.getMockImplementation();
                          }
                        }
                        metadata.refID = refs.size;
                        refs.set(component, metadata.refID);
                        var members = null;
                        if (type !== "array") {
                          this._getSlots(component).forEach(function (slot) {
                            if (
                              type === "function" && // @ts-ignore may be a mock
                              component._isMockFunction === true &&
                              slot.match(/^mock/)
                            ) {
                              return;
                            }
                            var slotMetadata = _this4.getMetadata(
                              component[slot],
                              refs,
                            );
                            if (slotMetadata) {
                              if (!members) {
                                members = {};
                              }
                              members[slot] = slotMetadata;
                            }
                          });
                        }
                        if (members) {
                          metadata.members = members;
                        }
                        return metadata;
                      },
                    },
                    {
                      key: "isMockFunction",
                      value: function isMockFunction(fn) {
                        return !!fn && fn._isMockFunction === true;
                      },
                    },
                    {
                      key: "fn",
                      value: function fn(implementation) {
                        var length = implementation ? implementation.length : 0;
                        var fn2 = this._makeComponent({
                          length,
                          type: "function",
                        });
                        if (implementation) {
                          fn2.mockImplementation(implementation);
                        }
                        return fn2;
                      },
                    },
                    {
                      key: "spyOn",
                      value: function spyOn(object, methodName, accessType) {
                        if (accessType) {
                          return this._spyOnProperty(
                            object,
                            methodName,
                            accessType,
                          );
                        }
                        if (
                          _typeof(object) !== "object" &&
                          typeof object !== "function"
                        ) {
                          throw new Error(
                            "Cannot spyOn on a primitive value; " +
                              this._typeOf(object) +
                              " given",
                          );
                        }
                        var original = object[methodName];
                        if (!this.isMockFunction(original)) {
                          if (typeof original !== "function") {
                            throw new Error(
                              "Cannot spy the " +
                                methodName +
                                " property because it is not a function; " +
                                this._typeOf(original) +
                                " given instead",
                            );
                          }
                          var isMethodOwner = object.hasOwnProperty(methodName);
                          object[methodName] = this._makeComponent(
                            {
                              type: "function",
                            },
                            function () {
                              if (isMethodOwner) {
                                object[methodName] = original;
                              } else {
                                delete object[methodName];
                              }
                            },
                          );
                          object[methodName].mockImplementation(function () {
                            return original.apply(this, arguments);
                          });
                        }
                        return object[methodName];
                      },
                    },
                    {
                      key: "_spyOnProperty",
                      value: function _spyOnProperty(obj, propertyName) {
                        var accessType =
                          arguments.length > 2 && arguments[2] !== void 0
                            ? arguments[2]
                            : "get";
                        if (
                          _typeof(obj) !== "object" &&
                          typeof obj !== "function"
                        ) {
                          throw new Error(
                            "Cannot spyOn on a primitive value; " +
                              this._typeOf(obj) +
                              " given",
                          );
                        }
                        if (!obj) {
                          throw new Error(
                            "spyOn could not find an object to spy upon for " +
                              propertyName,
                          );
                        }
                        if (!propertyName) {
                          throw new Error("No property name supplied");
                        }
                        var descriptor = Object.getOwnPropertyDescriptor(
                          obj,
                          propertyName,
                        );
                        var proto = Object.getPrototypeOf(obj);
                        while (!descriptor && proto !== null) {
                          descriptor = Object.getOwnPropertyDescriptor(
                            proto,
                            propertyName,
                          );
                          proto = Object.getPrototypeOf(proto);
                        }
                        if (!descriptor) {
                          throw new Error(
                            propertyName + " property does not exist",
                          );
                        }
                        if (!descriptor.configurable) {
                          throw new Error(
                            propertyName + " is not declared configurable",
                          );
                        }
                        if (!descriptor[accessType]) {
                          throw new Error(
                            "Property " +
                              propertyName +
                              " does not have access type " +
                              accessType,
                          );
                        }
                        var original = descriptor[accessType];
                        if (!this.isMockFunction(original)) {
                          if (typeof original !== "function") {
                            throw new Error(
                              "Cannot spy the " +
                                propertyName +
                                " property because it is not a function; " +
                                this._typeOf(original) +
                                " given instead",
                            );
                          }
                          descriptor[accessType] = this._makeComponent(
                            {
                              type: "function",
                            },
                            function () {
                              descriptor[accessType] = original;
                              Object.defineProperty(
                                obj,
                                propertyName,
                                descriptor,
                              );
                            },
                          );
                          descriptor[accessType].mockImplementation(
                            function () {
                              return original.apply(this, arguments);
                            },
                          );
                        }
                        Object.defineProperty(obj, propertyName, descriptor);
                        return descriptor[accessType];
                      },
                    },
                    {
                      key: "clearAllMocks",
                      value: function clearAllMocks() {
                        this._mockState = /* @__PURE__ */ new WeakMap();
                      },
                    },
                    {
                      key: "resetAllMocks",
                      value: function resetAllMocks() {
                        this._mockConfigRegistry =
                          /* @__PURE__ */ new WeakMap();
                        this._mockState = /* @__PURE__ */ new WeakMap();
                      },
                    },
                    {
                      key: "restoreAllMocks",
                      value: function restoreAllMocks() {
                        this._spyState.forEach(function (restore) {
                          return restore();
                        });
                        this._spyState = /* @__PURE__ */ new Set();
                      },
                    },
                    {
                      key: "_typeOf",
                      value: function _typeOf(value) {
                        return value == null ? "" + value : _typeof(value);
                      },
                    },
                  ]);
                  return ModuleMockerClass2;
                })();
                var JestMock = new ModuleMockerClass(global2);
                module2.exports = JestMock;
              }).call(
                this,
                __webpack_require__(
                  /*! ./../../../node_modules/webpack/buildin/global.js */
                  "./node_modules/webpack/buildin/global.js",
                ),
              );
            },
          /******/
        })
      );
    });
  },
});

// src/index.ts
init_process_shim();
init_Buffer();
init_process();

// src/output.ts
init_process_shim();
init_Buffer();
init_process();
function generateOutput(testRun, options) {
  if (!("completed" in testRun)) {
    return {
      status: "error",
      message: testRun.message,
      tests: [],
      version: 1,
    };
  }
  const status = testRun.failed === 0 ? "pass" : "fail";
  if (status === "pass" && testRun.passed === 0) {
    return {
      status: "fail",
      message:
        "Expected to run at least one test, but none were found. This can happen if the test file(s) (.spec.js) are missing or empty. These files are normally not empty. Revert any changes or report an issue if the problem persists.",
      tests: [],
      version: 1,
    };
  }
  if (status === "pass" && testRun.skipped !== 0) {
    if (options && !options["flag.tests.includes-optional"]) {
      return {
        status: "fail",
        message:
          "Expected to see 0 skipped tests and 0 skipped test suites. None of the tests in this exercise are optional. The skipped tests will not show up, but were found during the last run.",
        tests: [],
        version: 1,
      };
    }
  }
  const testResults = [];
  for (let taskId = 1; taskId < testRun.messages.length; taskId++) {
    if (taskId === 0) {
      continue;
    }
    const messages = testRun.messages[taskId] || [];
    messages.forEach((testResult) => {
      const message = (testResult.details || "").split("\n");
      const testCode = message[0].startsWith("expect(")
        ? message.shift() || ""
        : "";
      testResults.push({
        name: testResult.test,
        status: testResult.status === "passed" ? "pass" : "fail",
        message: output(message),
        output: output(testRun.logs[taskId]),
        test_code: testCode,
        task_id:
          options && options["flag.tests.task-per-describe"] ? taskId : void 0,
      });
    });
  }
  return {
    status,
    message: output(testRun.logs[0]),
    tests: testResults,
    version: 3,
  };
}
function output(raw) {
  const message = ((raw || []).join("\n") || "").trim();
  if (message.length <= 500) {
    return message;
  } else {
    return message
      .slice(0, 500 - "... (500 chars max)".length)
      .concat("... (500 chars max)");
  }
}

// src/utils.ts
init_process_shim();
init_Buffer();
init_process();
function readConfig(solutionFiles) {
  const configJson = solutionFiles[".meta/config.json"];
  if (!configJson) {
    throw new Error(
      `Expected '.meta/config.json' to exist. Actual: ${Object.keys(solutionFiles)}`,
    );
  }
  const { files, ...parsed } = JSON.parse(configJson);
  const config4 = { ...parsed, files: {} };
  Object.keys(files).forEach((key) => {
    config4.files[key] = files[key].map(globToMatcher);
  });
  return config4;
}
function globToMatcher(glob) {
  return new RegExp(
    glob
      .replaceAll(".", "\\.")
      .replaceAll(/(?<!\*)\*(?!\*)/g, "[^/]*")
      .replaceAll("**", ".*?")
      .concat("$"),
  );
}
function findUserCode(config4, files, userPaths) {
  userPaths = userPaths.filter((path) =>
    config4.files.solution.some((pattern) => pattern.test(path)),
  );
  if (userPaths.length === 0) {
    throw new Error(
      `Expected at least one solution file to be submitted (${config4.files.solution}). Actual: ${Object.keys(files)}`,
    );
  }
  return userPaths.map((path) => files[path]).filter(Boolean);
}
function findTestCode(config4, files, userPaths) {
  let testPaths = Object.keys(files).filter((path) =>
    config4.files.test.some((pattern) => pattern.test(path)),
  );
  if (userPaths) {
    testPaths = testPaths.filter((path) => !userPaths?.includes(path));
  }
  if (testPaths.length === 0) {
    throw new Error(
      `Expected at least one test file to be included (${config4.files.test}). Actual: ${Object.keys(files)}`,
    );
  }
  return testPaths.map((path) => files[path]).filter(Boolean);
}

// src/index.ts
var import_expect = __toESM(require_build7());
var import_jest_mock = __toESM(require_build_es5());
async function runTests(slug, files, userPaths, transpile = (code) => code) {
  const config4 = readConfig(files);
  const userCodes = findUserCode(config4, files, userPaths)
    .map((code) => transpile(code, "code"))
    .join("\n\n\n");
  const testCodes = findTestCode(config4, files, userPaths)
    .map((code) => transpile(code, "test"))
    .join("\n\n\n");
  const runOptions = {
    enableTaskIds: Boolean(config4.custom["flag.tests.task-per-describe"]),
  };
  const { tests, object } = prepareTest(testCodes, userCodes, slug, runOptions);
  const globals = globalThis;
  globals["expect"] = import_expect.default;
  globals["jest"] = import_jest_mock.default;
  let timer;
  let interval;
  function cleanup() {
    console.debug("[suite] cleaning up run", tests, object);
    URL.revokeObjectURL(tests);
    URL.revokeObjectURL(object);
    clearInterval(interval);
    clearTimeout(timer);
    delete globals["expect"];
    delete globals["jest"];
  }
  const result = await import(
    /* webpackIgnore: true */
    `${tests}`
  )
    .then((result2) => {
      if (result2.run.completed) {
        return result2.run;
      }
      return new Promise((resolve2, reject) => {
        timer = setTimeout(
          () => {
            clearInterval(interval);
            reject("Did not finish the tests within reasonable time");
          },
          100 * 10 * 30,
        );
        interval = setInterval(() => {
          if (result2.run.completed) {
            clearTimeout(timer);
            clearInterval(interval);
            resolve2(result2.run);
          }
        }, 100);
      });
    })
    .catch((error) => {
      console.error("[suite] failed to run the tests \n", error);
      return { ...{ message: error.message } };
    });
  cleanup();
  await new Promise((resolve2) => requestAnimationFrame(resolve2));
  return generateOutput(result, config4.custom);
}
function prepareTest(tests, code, slug, options = { enableTaskIds: false }) {
  const globalLogger = esm`
    const listeners = []
    const originalConsoleLog = console.log.bind(console)

    export function log(...args) {
      args.forEach((arg) => {
        const message = JSON.stringify(arg, null, 2)
        listeners.forEach((listener) => listener(message))
      })

      originalConsoleLog(...args)
    }

    console.log = log

    export function addListener(listener) {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    }
  `;
  code = `
import { log } from '${globalLogger}'

${code}
  `;
  const importableCode = esm`${code}`;
  const regexp = new RegExp(
    `\\./${slug}(?:\\.(?:ts|js|mjs|cjs|mts|cts|tsx|jsx))?`,
  );
  const lines = tests.replace(regexp, `${importableCode}`).split("\n");
  lines.splice(
    lines.findIndex(
      (l) => l.indexOf("import ") !== -1 && l.indexOf("from '@jest/globals'"),
    ),
    1,
    "// import { ... } from '@jest/globals'",
  );
  lines.splice(
    lines.findIndex((l) => l.indexOf("from ") !== -1) + 1,
    0,
    TEST_HELPER,
  );
  lines.splice(
    lines.findIndex((l) => l.indexOf("from ") !== -1) + 1,
    0,
    `import { addListener as addLogListener } from '${globalLogger}'`,
  );
  return { tests: esm`${lines.join("\n")}`, object: importableCode };
}
var esm = ({ raw }, ...vals) =>
  URL.createObjectURL(
    new Blob([String.raw({ raw }, ...vals)], {
      type: "text/javascript",
    }),
  );
var TEST_HELPER = `
const run = {
  taskId: 0,
  failed: 0,
  skipped: 0,
  passed: 0,
  messages: [],
  logs: [],
  promises: [],
  result: null,
  completed: null
}

function log(logMessage) {
  // TODO track task id when logging, somehow
  run.logs[0] ||= []
  run.logs[0].push(logMessage)
}

const removeLogListener = addLogListener(log)

let failFast = true
let awaiting = 0

function startTest(taskId, name) {
  awaiting += 1
  console.debug("[test] "+ name)

  run.messages[taskId] ||= []
}

function passTest(taskId, name) {
  awaiting -= 1
  run.passed += 1

  run.messages[taskId] ||= []
  run.messages[taskId].push({ test: name, status: 'passed' })
}

function failTest(taskId, name, err) {
  awaiting -= 1
  run.failed += 1

  run.messages[taskId] ||= []
  run.messages[taskId].push({ test: name, status: 'failed', details: err.message, err: err })

  window.lastErr = err

  if (err.constructor.name === 'JestAssertionError') {
    console.error(\`[test] failed assertion of \${name}.\\n\`, err.message)
  } else if (err instanceof SyntaxError) {
    failFast = true
    console.error(\`[test] syntax is not valid JavaScript \\n\`, err)
  } else {
    console.error(\`[test] failed to run \${name} \\n\`, err)
  }
}

function skipTest() {
  run.skipped += 1
}

function runSuite(name) {
  console.debug("[suite] " + name)
  awaiting += 1
  run.taskId += 1
}

function finishSuite() {
  awaiting -= 1
  if (awaiting > 0) {
    return console.debug(\`[suite] still running, awaiting \${awaiting}\`)
  }

  run.result = run.failed === 0 ? 'passed' : 'failed'
  run.completed = true

  removeLogListener();
}

async function test(name, c) {
  const taskId = run.taskId

  if (failFast && run.failed > 0) {
    skipTest()
    return
  }

  startTest(taskId, name)

  try {
    await c()
    passTest(taskId, name)
  } catch (err) {
    failTest(taskId, name, err)
  }
}

const xtest = test
const it = test
const xit = test

async function describe(name, c) {
  runSuite(name)

  const taskId = run.taskId

  try {
    await c()
    await Promise.all(run.promises)
  } catch (err) {
    run.messages[taskId].push({ test: name, status: 'failed', details: err.message, err: err })
  }

  finishSuite()
}

const xdescribe = describe

function promise(p) {
  run.promises.push(p)
  return p
}

export { run }
`;
export { runTests };
/*! Bundled license information:

@jspm/core/nodelibs/browser/chunk-DtuTasat.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=imported.mjs.map
