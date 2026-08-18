var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/core/estimation/utils.js
var buildModelViewProjectionTransform, applyModelViewProjectionTransform, computeScreenCoordiate;
var init_utils = __esm({
  "src/core/estimation/utils.js"() {
    "use strict";
    buildModelViewProjectionTransform = (projectionTransform, modelViewTransform) => {
      const modelViewProjectionTransform = [
        [
          projectionTransform[0][0] * modelViewTransform[0][0] + projectionTransform[0][2] * modelViewTransform[2][0],
          projectionTransform[0][0] * modelViewTransform[0][1] + projectionTransform[0][2] * modelViewTransform[2][1],
          projectionTransform[0][0] * modelViewTransform[0][2] + projectionTransform[0][2] * modelViewTransform[2][2],
          projectionTransform[0][0] * modelViewTransform[0][3] + projectionTransform[0][2] * modelViewTransform[2][3]
        ],
        [
          projectionTransform[1][1] * modelViewTransform[1][0] + projectionTransform[1][2] * modelViewTransform[2][0],
          projectionTransform[1][1] * modelViewTransform[1][1] + projectionTransform[1][2] * modelViewTransform[2][1],
          projectionTransform[1][1] * modelViewTransform[1][2] + projectionTransform[1][2] * modelViewTransform[2][2],
          projectionTransform[1][1] * modelViewTransform[1][3] + projectionTransform[1][2] * modelViewTransform[2][3]
        ],
        [
          modelViewTransform[2][0],
          modelViewTransform[2][1],
          modelViewTransform[2][2],
          modelViewTransform[2][3]
        ]
      ];
      return modelViewProjectionTransform;
    };
    applyModelViewProjectionTransform = (modelViewProjectionTransform, x, y, _z) => {
      const ux = modelViewProjectionTransform[0][0] * x + modelViewProjectionTransform[0][1] * y + modelViewProjectionTransform[0][3];
      const uy = modelViewProjectionTransform[1][0] * x + modelViewProjectionTransform[1][1] * y + modelViewProjectionTransform[1][3];
      const uz = modelViewProjectionTransform[2][0] * x + modelViewProjectionTransform[2][1] * y + modelViewProjectionTransform[2][3];
      return { x: ux, y: uy, z: uz };
    };
    computeScreenCoordiate = (modelViewProjectionTransform, x, y, z) => {
      const {
        x: ux,
        y: uy,
        z: uz
      } = applyModelViewProjectionTransform(modelViewProjectionTransform, x, y, z);
      return { x: ux / uz, y: uy / uz };
    };
  }
});

// src/core/constants.ts
var AR_CONFIG;
var init_constants = __esm({
  "src/core/constants.ts"() {
    "use strict";
    AR_CONFIG = {
      // Camera settings
      VIEWPORT_WIDTH: 640,
      VIEWPORT_HEIGHT: 480,
      DEFAULT_FOVY: 60,
      DEFAULT_NEAR: 1,
      DEFAULT_FAR: 1e4,
      // Detection settings
      MAX_FEATURES_PER_BUCKET: 24,
      USE_LSH: true,
      // Matching settings
      HAMMING_THRESHOLD: 0.85,
      HDC_RATIO_THRESHOLD: 0.85,
      INLIER_THRESHOLD: 15,
      MIN_NUM_INLIERS: 6,
      MAX_MATCH_QUERY_POINTS: 800,
      CLUSTER_MAX_POP: 25,
      // Tracker / NCC settings
      TRACKER_TEMPLATE_SIZE: 6,
      TRACKER_SEARCH_SIZE: 12,
      TRACKER_SIMILARITY_THRESHOLD: 0.65,
      // Image processing / Scale list
      MIN_IMAGE_PIXEL_SIZE: 32,
      SCALE_STEP_EXPONENT: 1,
      // Optimized: was 0.6, now 1.0 (reduces scales from ~7 to ~4)
      TRACKING_DOWNSCALE_LEVEL_1: 256,
      TRACKING_DOWNSCALE_LEVEL_2: 128,
      // Tracker settings
      WARMUP_TOLERANCE: 2,
      MISS_TOLERANCE: 1,
      ONE_EURO_FILTER_CUTOFF: 0.5,
      ONE_EURO_FILTER_BETA: 0.1,
      // TAAR Size Optimization
      USE_COMPACT_DESCRIPTORS: true,
      // 32-bit XOR folded descriptors vs 64-bit raw
      COMPACT_HAMMING_THRESHOLD: 8,
      // Threshold for 32-bit descriptors (vs 15 for 64-bit)
      FEATURES_PER_OCTAVE: 150
      // Max features per octave scale (reduced from 300 for size optimization)
    };
  }
});

// node_modules/fflate/esm/browser.js
var browser_exports = {};
__export(browser_exports, {
  AsyncCompress: () => AsyncGzip,
  AsyncDecompress: () => AsyncDecompress,
  AsyncDeflate: () => AsyncDeflate,
  AsyncGunzip: () => AsyncGunzip,
  AsyncGzip: () => AsyncGzip,
  AsyncInflate: () => AsyncInflate,
  AsyncUnzipInflate: () => AsyncUnzipInflate,
  AsyncUnzlib: () => AsyncUnzlib,
  AsyncZipDeflate: () => AsyncZipDeflate,
  AsyncZlib: () => AsyncZlib,
  Compress: () => Gzip,
  DecodeUTF8: () => DecodeUTF8,
  Decompress: () => Decompress,
  Deflate: () => Deflate,
  EncodeUTF8: () => EncodeUTF8,
  FlateErrorCode: () => FlateErrorCode,
  Gunzip: () => Gunzip,
  Gzip: () => Gzip,
  Inflate: () => Inflate,
  Unzip: () => Unzip,
  UnzipInflate: () => UnzipInflate,
  UnzipPassThrough: () => UnzipPassThrough,
  Unzlib: () => Unzlib,
  Zip: () => Zip,
  ZipDeflate: () => ZipDeflate,
  ZipPassThrough: () => ZipPassThrough,
  Zlib: () => Zlib,
  compress: () => gzip,
  compressSync: () => gzipSync,
  decompress: () => decompress,
  decompressSync: () => decompressSync,
  deflate: () => deflate,
  deflateSync: () => deflateSync,
  gunzip: () => gunzip,
  gunzipSync: () => gunzipSync,
  gzip: () => gzip,
  gzipSync: () => gzipSync,
  inflate: () => inflate,
  inflateSync: () => inflateSync,
  strFromU8: () => strFromU8,
  strToU8: () => strToU8,
  unzip: () => unzip,
  unzipSync: () => unzipSync,
  unzlib: () => unzlib,
  unzlibSync: () => unzlibSync,
  zip: () => zip,
  zipSync: () => zipSync,
  zlib: () => zlib,
  zlibSync: () => zlibSync
});
function StrmOpt(opts, cb) {
  if (typeof opts == "function")
    cb = opts, opts = {};
  this.ondata = cb;
  return opts;
}
function deflate(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bDflt
  ], function(ev) {
    return pbf(deflateSync(ev.data[0], ev.data[1]));
  }, 0, cb);
}
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
function inflate(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bInflt
  ], function(ev) {
    return pbf(inflateSync(ev.data[0], gopt(ev.data[1])));
  }, 1, cb);
}
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
function gzip(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bDflt,
    gze,
    function() {
      return [gzipSync];
    }
  ], function(ev) {
    return pbf(gzipSync(ev.data[0], ev.data[1]));
  }, 2, cb);
}
function gzipSync(data, opts) {
  if (!opts)
    opts = {};
  var c = crc(), l = data.length;
  c.p(data);
  var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
  return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
function gunzip(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bInflt,
    guze,
    function() {
      return [gunzipSync];
    }
  ], function(ev) {
    return pbf(gunzipSync(ev.data[0], ev.data[1]));
  }, 3, cb);
}
function gunzipSync(data, opts) {
  var st = gzs(data);
  if (st + 8 > data.length)
    err(6, "invalid gzip data");
  return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
}
function zlib(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bDflt,
    zle,
    function() {
      return [zlibSync];
    }
  ], function(ev) {
    return pbf(zlibSync(ev.data[0], ev.data[1]));
  }, 4, cb);
}
function zlibSync(data, opts) {
  if (!opts)
    opts = {};
  var a = adler();
  a.p(data);
  var d = dopt(data, opts, opts.dictionary ? 6 : 2, 4);
  return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
function unzlib(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bInflt,
    zule,
    function() {
      return [unzlibSync];
    }
  ], function(ev) {
    return pbf(unzlibSync(ev.data[0], gopt(ev.data[1])));
  }, 5, cb);
}
function unzlibSync(data, opts) {
  return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
function decompress(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzip(data, opts, cb) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflate(data, opts, cb) : unzlib(data, opts, cb);
}
function decompressSync(data, opts) {
  return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, opts) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, opts) : unzlibSync(data, opts);
}
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td) {
    return td.decode(dat);
  } else {
    var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
    if (r.length)
      err(8);
    return s;
  }
}
function zip(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  var r = {};
  fltn(data, "", r, opts);
  var k = Object.keys(r);
  var lft = k.length, o = 0, tot = 0;
  var slft = lft, files = new Array(lft);
  var term = [];
  var tAll = function() {
    for (var i2 = 0; i2 < term.length; ++i2)
      term[i2]();
  };
  var cbd = function(a, b) {
    mt(function() {
      cb(a, b);
    });
  };
  mt(function() {
    cbd = cb;
  });
  var cbf = function() {
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    tot = 0;
    for (var i2 = 0; i2 < slft; ++i2) {
      var f = files[i2];
      try {
        var l = f.c.length;
        wzh(out, tot, f, f.f, f.u, l);
        var badd = 30 + f.f.length + exfl(f.extra);
        var loc = tot + badd;
        out.set(f.c, loc);
        wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
      } catch (e) {
        return cbd(e, null);
      }
    }
    wzf(out, o, files.length, cdl, oe);
    cbd(null, out);
  };
  if (!lft)
    cbf();
  var _loop_1 = function(i2) {
    var fn = k[i2];
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var c = crc(), size = file.length;
    c.p(file);
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    var compression = p.level == 0 ? 0 : 8;
    var cbl = function(e, d) {
      if (e) {
        tAll();
        cbd(e, null);
      } else {
        var l = d.length;
        files[i2] = mrg(p, {
          size,
          crc: c.d(),
          c: d,
          f,
          m,
          u: s != fn.length || m && com.length != ms,
          compression
        });
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
        if (!--lft)
          cbf();
      }
    };
    if (s > 65535)
      cbl(err(11, 0, 1), null);
    if (!compression)
      cbl(null, file);
    else if (size < 16e4) {
      try {
        cbl(null, deflateSync(file, p));
      } catch (e) {
        cbl(e, null);
      }
    } else
      term.push(deflate(file, p, cbl));
  };
  for (var i = 0; i < slft; ++i) {
    _loop_1(i);
  }
  return tAll;
}
function zipSync(data, opts) {
  if (!opts)
    opts = {};
  var r = {};
  var files = [];
  fltn(data, "", r, opts);
  var o = 0;
  var tot = 0;
  for (var fn in r) {
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var compression = p.level == 0 ? 0 : 8;
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    if (s > 65535)
      err(11);
    var d = compression ? deflateSync(file, p) : file, l = d.length;
    var c = crc();
    c.p(file);
    files.push(mrg(p, {
      size: file.length,
      crc: c.d(),
      c: d,
      f,
      m,
      u: s != fn.length || m && com.length != ms,
      o,
      compression
    }));
    o += 30 + s + exl + l;
    tot += 76 + 2 * (s + exl) + (ms || 0) + l;
  }
  var out = new u8(tot + 22), oe = o, cdl = tot - o;
  for (var i = 0; i < files.length; ++i) {
    var f = files[i];
    wzh(out, f.o, f, f.f, f.u, f.c.length);
    var badd = 30 + f.f.length + exfl(f.extra);
    out.set(f.c, f.o + badd);
    wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
  }
  wzf(out, o, files.length, cdl, oe);
  return out;
}
function unzip(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  var term = [];
  var tAll = function() {
    for (var i2 = 0; i2 < term.length; ++i2)
      term[i2]();
  };
  var files = {};
  var cbd = function(a, b) {
    mt(function() {
      cb(a, b);
    });
  };
  mt(function() {
    cbd = cb;
  });
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558) {
      cbd(err(13, 0, 1), null);
      return tAll;
    }
  }
  ;
  var lft = b2(data, e + 8);
  if (lft) {
    var c = lft;
    var o = b4(data, e + 16);
    var z = b4(data, e - 20) == 117853008;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = lft = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    var _loop_3 = function(i2) {
      var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      var cbl = function(e2, d) {
        if (e2) {
          tAll();
          cbd(e2, null);
        } else {
          if (d)
            files[fn] = d;
          if (!--lft)
            cbd(null, files);
        }
      };
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_1
      })) {
        if (!c_1)
          cbl(null, slc(data, b, b + sc));
        else if (c_1 == 8) {
          var infl = data.subarray(b, b + sc);
          if (su < 524288 || sc > 0.8 * su) {
            try {
              cbl(null, inflateSync(infl, { out: new u8(su) }));
            } catch (e2) {
              cbl(e2, null);
            }
          } else
            term.push(inflate(infl, { size: su }, cbl));
        } else
          cbl(err(14, "unknown compression type " + c_1, 1), null);
      } else
        cbl(null, null);
    };
    for (var i = 0; i < c; ++i) {
      _loop_3(i);
    }
  } else
    cbd(null, {});
  return tAll;
}
function unzipSync(data, opts) {
  var files = {};
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558)
      err(13);
  }
  ;
  var c = b2(data, e + 8);
  if (!c)
    return {};
  var o = b4(data, e + 16);
  var z = b4(data, e - 20) == 117853008;
  if (z) {
    var ze = b4(data, e - 12);
    z = b4(data, ze) == 101075792;
    if (z) {
      c = b4(data, ze + 32);
      o = b4(data, ze + 48);
    }
  }
  var fltr = opts && opts.filter;
  for (var i = 0; i < c; ++i) {
    var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
    o = no;
    if (!fltr || fltr({
      name: fn,
      size: sc,
      originalSize: su,
      compression: c_2
    })) {
      if (!c_2)
        files[fn] = slc(data, b, b + sc);
      else if (c_2 == 8)
        files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
      else
        err(14, "unknown compression type " + c_2);
    }
  }
  return files;
}
var ch2, wk, u8, u16, i32, fleb, fdeb, clim, freb, _a, fl, revfl, _b, fd, revfd, rev, x, i, hMap, flt, i, i, i, i, fdt, i, flm, flrm, fdm, fdrm, max, bits, bits16, shft, slc, FlateErrorCode, ec, err, inflt, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, deo, et, dflt, crct, crc, adler, dopt, mrg, wcln, ch, cbfs, wrkr, bInflt, bDflt, gze, guze, zle, zule, pbf, gopt, cbify, astrm, astrmify, b2, b4, b8, wbytes, gzh, gzs, gzl, gzhl, zlh, zls, Deflate, AsyncDeflate, Inflate, AsyncInflate, Gzip, AsyncGzip, Gunzip, AsyncGunzip, Zlib, AsyncZlib, Unzlib, AsyncUnzlib, Decompress, AsyncDecompress, fltn, te, td, tds, dutf8, DecodeUTF8, EncodeUTF8, dbf, slzh, zh, z64hs, exfl, wzh, wzf, ZipPassThrough, ZipDeflate, AsyncZipDeflate, Zip, UnzipPassThrough, UnzipInflate, AsyncUnzipInflate, Unzip, mt;
var init_browser = __esm({
  "node_modules/fflate/esm/browser.js"() {
    ch2 = {};
    wk = (function(c, id, msg, transfer, cb) {
      var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
      ], { type: "text/javascript" }))));
      w.onmessage = function(e) {
        var d = e.data, ed = d.$e$;
        if (ed) {
          var err2 = new Error(ed[0]);
          err2["code"] = ed[1];
          err2.stack = ed[2];
          cb(err2, null);
        } else
          cb(null, d);
      };
      w.postMessage(msg, transfer);
      return w;
    });
    u8 = Uint8Array;
    u16 = Uint16Array;
    i32 = Int32Array;
    fleb = new u8([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      0,
      /* unused */
      0,
      0,
      /* impossible */
      0
    ]);
    fdeb = new u8([
      0,
      0,
      0,
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      /* unused */
      0,
      0
    ]);
    clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    freb = function(eb, start) {
      var b = new u16(31);
      for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
      }
      var r = new i32(b[30]);
      for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
          r[j] = j - b[i] << 5 | i;
        }
      }
      return { b, r };
    };
    _a = freb(fleb, 2);
    fl = _a.b;
    revfl = _a.r;
    fl[28] = 258, revfl[258] = 28;
    _b = freb(fdeb, 0);
    fd = _b.b;
    revfd = _b.r;
    rev = new u16(32768);
    for (i = 0; i < 32768; ++i) {
      x = (i & 43690) >> 1 | (i & 21845) << 1;
      x = (x & 52428) >> 2 | (x & 13107) << 2;
      x = (x & 61680) >> 4 | (x & 3855) << 4;
      rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
    }
    hMap = (function(cd, mb, r) {
      var s = cd.length;
      var i = 0;
      var l = new u16(mb);
      for (; i < s; ++i) {
        if (cd[i])
          ++l[cd[i] - 1];
      }
      var le = new u16(mb);
      for (i = 1; i < mb; ++i) {
        le[i] = le[i - 1] + l[i - 1] << 1;
      }
      var co;
      if (r) {
        co = new u16(1 << mb);
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
          if (cd[i]) {
            var sv = i << 4 | cd[i];
            var r_1 = mb - cd[i];
            var v = le[cd[i] - 1]++ << r_1;
            for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
              co[rev[v] >> rvb] = sv;
            }
          }
        }
      } else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
          if (cd[i]) {
            co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
          }
        }
      }
      return co;
    });
    flt = new u8(288);
    for (i = 0; i < 144; ++i)
      flt[i] = 8;
    for (i = 144; i < 256; ++i)
      flt[i] = 9;
    for (i = 256; i < 280; ++i)
      flt[i] = 7;
    for (i = 280; i < 288; ++i)
      flt[i] = 8;
    fdt = new u8(32);
    for (i = 0; i < 32; ++i)
      fdt[i] = 5;
    flm = /* @__PURE__ */ hMap(flt, 9, 0);
    flrm = /* @__PURE__ */ hMap(flt, 9, 1);
    fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
    fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
    max = function(a) {
      var m = a[0];
      for (var i = 1; i < a.length; ++i) {
        if (a[i] > m)
          m = a[i];
      }
      return m;
    };
    bits = function(d, p, m) {
      var o = p / 8 | 0;
      return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
    };
    bits16 = function(d, p) {
      var o = p / 8 | 0;
      return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
    };
    shft = function(p) {
      return (p + 7) / 8 | 0;
    };
    slc = function(v, s, e) {
      if (s == null || s < 0)
        s = 0;
      if (e == null || e > v.length)
        e = v.length;
      return new u8(v.subarray(s, e));
    };
    FlateErrorCode = {
      UnexpectedEOF: 0,
      InvalidBlockType: 1,
      InvalidLengthLiteral: 2,
      InvalidDistance: 3,
      StreamFinished: 4,
      NoStreamHandler: 5,
      InvalidHeader: 6,
      NoCallback: 7,
      InvalidUTF8: 8,
      ExtraFieldTooLong: 9,
      InvalidDate: 10,
      FilenameTooLong: 11,
      StreamFinishing: 12,
      InvalidZipData: 13,
      UnknownCompressionMethod: 14
    };
    ec = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      // determined by compression function
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data"
      // determined by unknown compression method
    ];
    err = function(ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      e.code = ind;
      if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
      if (!nt)
        throw e;
      return e;
    };
    inflt = function(dat, st, buf, dict) {
      var sl = dat.length, dl = dict ? dict.length : 0;
      if (!sl || st.f && !st.l)
        return buf || new u8(0);
      var noBuf = !buf;
      var resize2 = noBuf || st.i != 2;
      var noSt = st.i;
      if (noBuf)
        buf = new u8(sl * 3);
      var cbuf = function(l2) {
        var bl = buf.length;
        if (l2 > bl) {
          var nbuf = new u8(Math.max(bl * 2, l2));
          nbuf.set(buf);
          buf = nbuf;
        }
      };
      var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
      var tbts = sl * 8;
      do {
        if (!lm) {
          final = bits(dat, pos, 1);
          var type = bits(dat, pos + 1, 3);
          pos += 3;
          if (!type) {
            var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
            if (t > sl) {
              if (noSt)
                err(0);
              break;
            }
            if (resize2)
              cbuf(bt + l);
            buf.set(dat.subarray(s, t), bt);
            st.b = bt += l, st.p = pos = t * 8, st.f = final;
            continue;
          } else if (type == 1)
            lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
          else if (type == 2) {
            var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
            var tl = hLit + bits(dat, pos + 5, 31) + 1;
            pos += 14;
            var ldt = new u8(tl);
            var clt = new u8(19);
            for (var i = 0; i < hcLen; ++i) {
              clt[clim[i]] = bits(dat, pos + i * 3, 7);
            }
            pos += hcLen * 3;
            var clb = max(clt), clbmsk = (1 << clb) - 1;
            var clm = hMap(clt, clb, 1);
            for (var i = 0; i < tl; ) {
              var r = clm[bits(dat, pos, clbmsk)];
              pos += r & 15;
              var s = r >> 4;
              if (s < 16) {
                ldt[i++] = s;
              } else {
                var c = 0, n = 0;
                if (s == 16)
                  n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                else if (s == 17)
                  n = 3 + bits(dat, pos, 7), pos += 3;
                else if (s == 18)
                  n = 11 + bits(dat, pos, 127), pos += 7;
                while (n--)
                  ldt[i++] = c;
              }
            }
            var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
            lbt = max(lt);
            dbt = max(dt);
            lm = hMap(lt, lbt, 1);
            dm = hMap(dt, dbt, 1);
          } else
            err(1);
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
        }
        if (resize2)
          cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (; ; lpos = pos) {
          var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
          pos += c & 15;
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (!c)
            err(2);
          if (sym < 256)
            buf[bt++] = sym;
          else if (sym == 256) {
            lpos = pos, lm = null;
            break;
          } else {
            var add = sym - 254;
            if (sym > 264) {
              var i = sym - 257, b = fleb[i];
              add = bits(dat, pos, (1 << b) - 1) + fl[i];
              pos += b;
            }
            var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
            if (!d)
              err(3);
            pos += d & 15;
            var dt = fd[dsym];
            if (dsym > 3) {
              var b = fdeb[dsym];
              dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
            }
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
            if (resize2)
              cbuf(bt + 131072);
            var end = bt + add;
            if (bt < dt) {
              var shift = dl - dt, dend = Math.min(dt, end);
              if (shift + bt < 0)
                err(3);
              for (; bt < dend; ++bt)
                buf[bt] = dict[shift + bt];
            }
            for (; bt < end; ++bt)
              buf[bt] = buf[bt - dt];
          }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm)
          final = 1, st.m = lbt, st.d = dm, st.n = dbt;
      } while (!final);
      return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
    };
    wbits = function(d, p, v) {
      v <<= p & 7;
      var o = p / 8 | 0;
      d[o] |= v;
      d[o + 1] |= v >> 8;
    };
    wbits16 = function(d, p, v) {
      v <<= p & 7;
      var o = p / 8 | 0;
      d[o] |= v;
      d[o + 1] |= v >> 8;
      d[o + 2] |= v >> 16;
    };
    hTree = function(d, mb) {
      var t = [];
      for (var i = 0; i < d.length; ++i) {
        if (d[i])
          t.push({ s: i, f: d[i] });
      }
      var s = t.length;
      var t2 = t.slice();
      if (!s)
        return { t: et, l: 0 };
      if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return { t: v, l: 1 };
      }
      t.sort(function(a, b) {
        return a.f - b.f;
      });
      t.push({ s: -1, f: 25001 });
      var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
      t[0] = { s: -1, f: l.f + r.f, l, r };
      while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = { s: -1, f: l.f + r.f, l, r };
      }
      var maxSym = t2[0].s;
      for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym)
          maxSym = t2[i].s;
      }
      var tr = new u16(maxSym + 1);
      var mbt = ln(t[i1 - 1], tr, 0);
      if (mbt > mb) {
        var i = 0, dt = 0;
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function(a, b) {
          return tr[b.s] - tr[a.s] || a.f - b.f;
        });
        for (; i < s; ++i) {
          var i2_1 = t2[i].s;
          if (tr[i2_1] > mb) {
            dt += cst - (1 << mbt - tr[i2_1]);
            tr[i2_1] = mb;
          } else
            break;
        }
        dt >>= lft;
        while (dt > 0) {
          var i2_2 = t2[i].s;
          if (tr[i2_2] < mb)
            dt -= 1 << mb - tr[i2_2]++ - 1;
          else
            ++i;
        }
        for (; i >= 0 && dt; --i) {
          var i2_3 = t2[i].s;
          if (tr[i2_3] == mb) {
            --tr[i2_3];
            ++dt;
          }
        }
        mbt = mb;
      }
      return { t: new u8(tr), l: mbt };
    };
    ln = function(n, l, d) {
      return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
    };
    lc = function(c) {
      var s = c.length;
      while (s && !c[--s])
        ;
      var cl = new u16(++s);
      var cli = 0, cln = c[0], cls = 1;
      var w = function(v) {
        cl[cli++] = v;
      };
      for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
          ++cls;
        else {
          if (!cln && cls > 2) {
            for (; cls > 138; cls -= 138)
              w(32754);
            if (cls > 2) {
              w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
              cls = 0;
            }
          } else if (cls > 3) {
            w(cln), --cls;
            for (; cls > 6; cls -= 6)
              w(8304);
            if (cls > 2)
              w(cls - 3 << 5 | 8208), cls = 0;
          }
          while (cls--)
            w(cln);
          cls = 1;
          cln = c[i];
        }
      }
      return { c: cl.subarray(0, cli), n: s };
    };
    clen = function(cf, cl) {
      var l = 0;
      for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
      return l;
    };
    wfblk = function(out, pos, dat) {
      var s = dat.length;
      var o = shft(pos + 2);
      out[o] = s & 255;
      out[o + 1] = s >> 8;
      out[o + 2] = out[o] ^ 255;
      out[o + 3] = out[o + 1] ^ 255;
      for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
      return (o + 4 + s) * 8;
    };
    wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final);
      ++lf[256];
      var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
      var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
      var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
      var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
      var lcfreq = new u16(19);
      for (var i = 0; i < lclt.length; ++i)
        ++lcfreq[lclt[i] & 31];
      for (var i = 0; i < lcdt.length; ++i)
        ++lcfreq[lcdt[i] & 31];
      var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
      var nlcc = 19;
      for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
      var flen = bl + 5 << 3;
      var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
      var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
      if (bs >= 0 && flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
      var lm, ll, dm, dl;
      wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
      if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
          wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
          var clct = lcts[it];
          for (var i = 0; i < clct.length; ++i) {
            var len = clct[i] & 31;
            wbits(out, p, llm[len]), p += lct[len];
            if (len > 15)
              wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
          }
        }
      } else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
      }
      for (var i = 0; i < li; ++i) {
        var sym = syms[i];
        if (sym > 255) {
          var len = sym >> 18 & 31;
          wbits16(out, p, lm[len + 257]), p += ll[len + 257];
          if (len > 7)
            wbits(out, p, sym >> 23 & 31), p += fleb[len];
          var dst = sym & 31;
          wbits16(out, p, dm[dst]), p += dl[dst];
          if (dst > 3)
            wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
        } else {
          wbits16(out, p, lm[sym]), p += ll[sym];
        }
      }
      wbits16(out, p, lm[256]);
      return p + ll[256];
    };
    deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
    et = /* @__PURE__ */ new u8(0);
    dflt = function(dat, lvl, plvl, pre, post, st) {
      var s = st.z || dat.length;
      var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
      var w = o.subarray(pre, o.length - post);
      var lst = st.l;
      var pos = (st.r || 0) & 7;
      if (lvl) {
        if (pos)
          w[0] = st.r >> 3;
        var opt = deo[lvl - 1];
        var n = opt >> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function(i2) {
          return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
        };
        var syms = new i32(25e3);
        var lf = new u16(288), df = new u16(32);
        var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
        for (; i + 2 < s; ++i) {
          var hv = hsh(i);
          var imod = i & 32767, pimod = head[hv];
          prev[imod] = pimod;
          head[hv] = imod;
          if (wi <= i) {
            var rem = s - i;
            if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
              pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
              li = lc_1 = eb = 0, bs = i;
              for (var j = 0; j < 286; ++j)
                lf[j] = 0;
              for (var j = 0; j < 30; ++j)
                df[j] = 0;
            }
            var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
            if (rem > 2 && hv == hsh(i - dif)) {
              var maxn = Math.min(n, rem) - 1;
              var maxd = Math.min(32767, i);
              var ml = Math.min(258, rem);
              while (dif <= maxd && --ch_1 && imod != pimod) {
                if (dat[i + l] == dat[i + l - dif]) {
                  var nl = 0;
                  for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                    ;
                  if (nl > l) {
                    l = nl, d = dif;
                    if (nl > maxn)
                      break;
                    var mmd = Math.min(dif, nl - 2);
                    var md = 0;
                    for (var j = 0; j < mmd; ++j) {
                      var ti = i - dif + j & 32767;
                      var pti = prev[ti];
                      var cd = ti - pti & 32767;
                      if (cd > md)
                        md = cd, pimod = ti;
                    }
                  }
                }
                imod = pimod, pimod = prev[imod];
                dif += imod - pimod & 32767;
              }
            }
            if (d) {
              syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
              var lin = revfl[l] & 31, din = revfd[d] & 31;
              eb += fleb[lin] + fdeb[din];
              ++lf[257 + lin];
              ++df[din];
              wi = i + l;
              ++lc_1;
            } else {
              syms[li++] = dat[i];
              ++lf[dat[i]];
            }
          }
        }
        for (i = Math.max(i, wi); i < s; ++i) {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        if (!lst) {
          st.r = pos & 7 | w[pos / 8 | 0] << 3;
          pos -= 7;
          st.h = head, st.p = prev, st.i = i, st.w = wi;
        }
      } else {
        for (var i = st.w || 0; i < s + lst; i += 65535) {
          var e = i + 65535;
          if (e >= s) {
            w[pos / 8 | 0] = lst;
            e = s;
          }
          pos = wfblk(w, pos + 1, dat.subarray(i, e));
        }
        st.i = s;
      }
      return slc(o, 0, pre + shft(pos) + post);
    };
    crct = /* @__PURE__ */ (function() {
      var t = new Int32Array(256);
      for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
          c = (c & 1 && -306674912) ^ c >>> 1;
        t[i] = c;
      }
      return t;
    })();
    crc = function() {
      var c = -1;
      return {
        p: function(d) {
          var cr = c;
          for (var i = 0; i < d.length; ++i)
            cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
          c = cr;
        },
        d: function() {
          return ~c;
        }
      };
    };
    adler = function() {
      var a = 1, b = 0;
      return {
        p: function(d) {
          var n = a, m = b;
          var l = d.length | 0;
          for (var i = 0; i != l; ) {
            var e = Math.min(i + 2655, l);
            for (; i < e; ++i)
              m += n += d[i];
            n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
          }
          a = n, b = m;
        },
        d: function() {
          a %= 65521, b %= 65521;
          return (a & 255) << 24 | (a & 65280) << 8 | (b & 255) << 8 | b >> 8;
        }
      };
    };
    dopt = function(dat, opt, pre, post, st) {
      if (!st) {
        st = { l: 1 };
        if (opt.dictionary) {
          var dict = opt.dictionary.subarray(-32768);
          var newDat = new u8(dict.length + dat.length);
          newDat.set(dict);
          newDat.set(dat, dict.length);
          dat = newDat;
          st.w = dict.length;
        }
      }
      return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
    };
    mrg = function(a, b) {
      var o = {};
      for (var k in a)
        o[k] = a[k];
      for (var k in b)
        o[k] = b[k];
      return o;
    };
    wcln = function(fn, fnStr, td2) {
      var dt = fn();
      var st = fn.toString();
      var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
      for (var i = 0; i < dt.length; ++i) {
        var v = dt[i], k = ks[i];
        if (typeof v == "function") {
          fnStr += ";" + k + "=";
          var st_1 = v.toString();
          if (v.prototype) {
            if (st_1.indexOf("[native code]") != -1) {
              var spInd = st_1.indexOf(" ", 8) + 1;
              fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
            } else {
              fnStr += st_1;
              for (var t in v.prototype)
                fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
            }
          } else
            fnStr += st_1;
        } else
          td2[k] = v;
      }
      return fnStr;
    };
    ch = [];
    cbfs = function(v) {
      var tl = [];
      for (var k in v) {
        if (v[k].buffer) {
          tl.push((v[k] = new v[k].constructor(v[k])).buffer);
        }
      }
      return tl;
    };
    wrkr = function(fns, init, id, cb) {
      if (!ch[id]) {
        var fnStr = "", td_1 = {}, m = fns.length - 1;
        for (var i = 0; i < m; ++i)
          fnStr = wcln(fns[i], fnStr, td_1);
        ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };
      }
      var td2 = mrg({}, ch[id].e);
      return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
    };
    bInflt = function() {
      return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];
    };
    bDflt = function() {
      return [u8, u16, i32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
    };
    gze = function() {
      return [gzh, gzhl, wbytes, crc, crct];
    };
    guze = function() {
      return [gzs, gzl];
    };
    zle = function() {
      return [zlh, wbytes, adler];
    };
    zule = function() {
      return [zls];
    };
    pbf = function(msg) {
      return postMessage(msg, [msg.buffer]);
    };
    gopt = function(o) {
      return o && {
        out: o.size && new u8(o.size),
        dictionary: o.dictionary
      };
    };
    cbify = function(dat, opts, fns, init, id, cb) {
      var w = wrkr(fns, init, id, function(err2, dat2) {
        w.terminate();
        cb(err2, dat2);
      });
      w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
      return function() {
        w.terminate();
      };
    };
    astrm = function(strm) {
      strm.ondata = function(dat, final) {
        return postMessage([dat, final], [dat.buffer]);
      };
      return function(ev) {
        if (ev.data[0]) {
          strm.push(ev.data[0], ev.data[1]);
          postMessage([ev.data[0].length]);
        } else
          strm.flush(ev.data[1]);
      };
    };
    astrmify = function(fns, strm, opts, init, id, flush, ext) {
      var t;
      var w = wrkr(fns, init, id, function(err2, dat) {
        if (err2)
          w.terminate(), strm.ondata.call(strm, err2);
        else if (!Array.isArray(dat))
          ext(dat);
        else if (dat.length == 1) {
          strm.queuedSize -= dat[0];
          if (strm.ondrain)
            strm.ondrain(dat[0]);
        } else {
          if (dat[1])
            w.terminate();
          strm.ondata.call(strm, err2, dat[0], dat[1]);
        }
      });
      w.postMessage(opts);
      strm.queuedSize = 0;
      strm.push = function(d, f) {
        if (!strm.ondata)
          err(5);
        if (t)
          strm.ondata(err(4, 0, 1), null, !!f);
        strm.queuedSize += d.length;
        w.postMessage([d, t = f], d.buffer instanceof ArrayBuffer ? [d.buffer] : []);
      };
      strm.terminate = function() {
        w.terminate();
      };
      if (flush) {
        strm.flush = function(sync) {
          w.postMessage([0, sync]);
        };
      }
    };
    b2 = function(d, b) {
      return d[b] | d[b + 1] << 8;
    };
    b4 = function(d, b) {
      return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
    };
    b8 = function(d, b) {
      return b4(d, b) + b4(d, b + 4) * 4294967296;
    };
    wbytes = function(d, b, v) {
      for (; v; ++b)
        d[b] = v, v >>>= 8;
    };
    gzh = function(c, o) {
      var fn = o.filename;
      c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3;
      if (o.mtime != 0)
        wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3));
      if (fn) {
        c[3] = 8;
        for (var i = 0; i <= fn.length; ++i)
          c[i + 10] = fn.charCodeAt(i);
      }
    };
    gzs = function(d) {
      if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        err(6, "invalid gzip data");
      var flg = d[3];
      var st = 10;
      if (flg & 4)
        st += (d[10] | d[11] << 8) + 2;
      for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
      return st + (flg & 2);
    };
    gzl = function(d) {
      var l = d.length;
      return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
    };
    gzhl = function(o) {
      return 10 + (o.filename ? o.filename.length + 1 : 0);
    };
    zlh = function(c, o) {
      var lv = o.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
      c[0] = 120, c[1] = fl2 << 6 | (o.dictionary && 32);
      c[1] |= 31 - (c[0] << 8 | c[1]) % 31;
      if (o.dictionary) {
        var h = adler();
        h.p(o.dictionary);
        wbytes(c, 2, h.d());
      }
    };
    zls = function(d, dict) {
      if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31)
        err(6, "invalid zlib data");
      if ((d[1] >> 5 & 1) == +!dict)
        err(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
      return (d[1] >> 3 & 4) + 2;
    };
    Deflate = /* @__PURE__ */ (function() {
      function Deflate2(opts, cb) {
        if (typeof opts == "function")
          cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
        this.s = { l: 0, i: 32768, w: 32768, z: 32768 };
        this.b = new u8(98304);
        if (this.o.dictionary) {
          var dict = this.o.dictionary.subarray(-32768);
          this.b.set(dict, 32768 - dict.length);
          this.s.i = 32768 - dict.length;
        }
      }
      Deflate2.prototype.p = function(c, f) {
        this.ondata(dopt(c, this.o, 0, 0, this.s), f);
      };
      Deflate2.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        if (this.s.l)
          err(4);
        var endLen = chunk.length + this.s.z;
        if (endLen > this.b.length) {
          if (endLen > 2 * this.b.length - 32768) {
            var newBuf = new u8(endLen & -32768);
            newBuf.set(this.b.subarray(0, this.s.z));
            this.b = newBuf;
          }
          var split = this.b.length - this.s.z;
          this.b.set(chunk.subarray(0, split), this.s.z);
          this.s.z = this.b.length;
          this.p(this.b, false);
          this.b.set(this.b.subarray(-32768));
          this.b.set(chunk.subarray(split), 32768);
          this.s.z = chunk.length - split + 32768;
          this.s.i = 32766, this.s.w = 32768;
        } else {
          this.b.set(chunk, this.s.z);
          this.s.z += chunk.length;
        }
        this.s.l = final & 1;
        if (this.s.z > this.s.w + 8191 || final) {
          this.p(this.b, final || false);
          this.s.w = this.s.i, this.s.i -= 2;
        }
        if (final) {
          this.s = this.o = {};
          this.b = et;
        }
      };
      Deflate2.prototype.flush = function(sync) {
        if (!this.ondata)
          err(5);
        if (this.s.l)
          err(4);
        this.p(this.b, false);
        this.s.w = this.s.i, this.s.i -= 2;
        if (sync) {
          var c = new u8(6);
          c[0] = this.s.r >> 3;
          var ep = wfblk(c, this.s.r, et);
          this.s.r = 0;
          this.ondata(c.subarray(0, ep >> 3), false);
        }
      };
      return Deflate2;
    })();
    AsyncDeflate = /* @__PURE__ */ (function() {
      function AsyncDeflate2(opts, cb) {
        astrmify([
          bDflt,
          function() {
            return [astrm, Deflate];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Deflate(ev.data);
          onmessage = astrm(strm);
        }, 6, 1);
      }
      return AsyncDeflate2;
    })();
    Inflate = /* @__PURE__ */ (function() {
      function Inflate2(opts, cb) {
        if (typeof opts == "function")
          cb = opts, opts = {};
        this.ondata = cb;
        var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
        this.s = { i: 0, b: dict ? dict.length : 0 };
        this.o = new u8(32768);
        this.p = new u8(0);
        if (dict)
          this.o.set(dict);
      }
      Inflate2.prototype.e = function(c) {
        if (!this.ondata)
          err(5);
        if (this.d)
          err(4);
        if (!this.p.length)
          this.p = c;
        else if (c.length) {
          var n = new u8(this.p.length + c.length);
          n.set(this.p), n.set(c, this.p.length), this.p = n;
        }
      };
      Inflate2.prototype.c = function(final) {
        this.s.i = +(this.d = final || false);
        var bts = this.s.b;
        var dt = inflt(this.p, this.s, this.o);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
      };
      Inflate2.prototype.push = function(chunk, final) {
        this.e(chunk), this.c(final);
      };
      return Inflate2;
    })();
    AsyncInflate = /* @__PURE__ */ (function() {
      function AsyncInflate2(opts, cb) {
        astrmify([
          bInflt,
          function() {
            return [astrm, Inflate];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Inflate(ev.data);
          onmessage = astrm(strm);
        }, 7, 0);
      }
      return AsyncInflate2;
    })();
    Gzip = /* @__PURE__ */ (function() {
      function Gzip2(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
      }
      Gzip2.prototype.push = function(chunk, final) {
        this.c.p(chunk);
        this.l += chunk.length;
        Deflate.prototype.push.call(this, chunk, final);
      };
      Gzip2.prototype.p = function(c, f) {
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, this.s);
        if (this.v)
          gzh(raw, this.o), this.v = 0;
        if (f)
          wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
      };
      Gzip2.prototype.flush = function(sync) {
        Deflate.prototype.flush.call(this, sync);
      };
      return Gzip2;
    })();
    AsyncGzip = /* @__PURE__ */ (function() {
      function AsyncGzip2(opts, cb) {
        astrmify([
          bDflt,
          gze,
          function() {
            return [astrm, Deflate, Gzip];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Gzip(ev.data);
          onmessage = astrm(strm);
        }, 8, 1);
      }
      return AsyncGzip2;
    })();
    Gunzip = /* @__PURE__ */ (function() {
      function Gunzip2(opts, cb) {
        this.v = 1;
        this.r = 0;
        Inflate.call(this, opts, cb);
      }
      Gunzip2.prototype.push = function(chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        this.r += chunk.length;
        if (this.v) {
          var p = this.p.subarray(this.v - 1);
          var s = p.length > 3 ? gzs(p) : 4;
          if (s > p.length) {
            if (!final)
              return;
          } else if (this.v > 1 && this.onmember) {
            this.onmember(this.r - p.length);
          }
          this.p = p.subarray(s), this.v = 0;
        }
        Inflate.prototype.c.call(this, 0);
        if (this.s.f && !this.s.l) {
          this.v = shft(this.s.p) + 9;
          this.s = { i: 0 };
          this.o = new u8(0);
          this.push(new u8(0), final);
        } else if (final) {
          Inflate.prototype.c.call(this, final);
        }
      };
      return Gunzip2;
    })();
    AsyncGunzip = /* @__PURE__ */ (function() {
      function AsyncGunzip2(opts, cb) {
        var _this = this;
        astrmify([
          bInflt,
          guze,
          function() {
            return [astrm, Inflate, Gunzip];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Gunzip(ev.data);
          strm.onmember = function(offset) {
            return postMessage(offset);
          };
          onmessage = astrm(strm);
        }, 9, 0, function(offset) {
          return _this.onmember && _this.onmember(offset);
        });
      }
      return AsyncGunzip2;
    })();
    Zlib = /* @__PURE__ */ (function() {
      function Zlib2(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
      }
      Zlib2.prototype.push = function(chunk, final) {
        this.c.p(chunk);
        Deflate.prototype.push.call(this, chunk, final);
      };
      Zlib2.prototype.p = function(c, f) {
        var raw = dopt(c, this.o, this.v && (this.o.dictionary ? 6 : 2), f && 4, this.s);
        if (this.v)
          zlh(raw, this.o), this.v = 0;
        if (f)
          wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
      };
      Zlib2.prototype.flush = function(sync) {
        Deflate.prototype.flush.call(this, sync);
      };
      return Zlib2;
    })();
    AsyncZlib = /* @__PURE__ */ (function() {
      function AsyncZlib2(opts, cb) {
        astrmify([
          bDflt,
          zle,
          function() {
            return [astrm, Deflate, Zlib];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Zlib(ev.data);
          onmessage = astrm(strm);
        }, 10, 1);
      }
      return AsyncZlib2;
    })();
    Unzlib = /* @__PURE__ */ (function() {
      function Unzlib2(opts, cb) {
        Inflate.call(this, opts, cb);
        this.v = opts && opts.dictionary ? 2 : 1;
      }
      Unzlib2.prototype.push = function(chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
          if (this.p.length < 6 && !final)
            return;
          this.p = this.p.subarray(zls(this.p, this.v - 1)), this.v = 0;
        }
        if (final) {
          if (this.p.length < 4)
            err(6, "invalid zlib data");
          this.p = this.p.subarray(0, -4);
        }
        Inflate.prototype.c.call(this, final);
      };
      return Unzlib2;
    })();
    AsyncUnzlib = /* @__PURE__ */ (function() {
      function AsyncUnzlib2(opts, cb) {
        astrmify([
          bInflt,
          zule,
          function() {
            return [astrm, Inflate, Unzlib];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Unzlib(ev.data);
          onmessage = astrm(strm);
        }, 11, 0);
      }
      return AsyncUnzlib2;
    })();
    Decompress = /* @__PURE__ */ (function() {
      function Decompress2(opts, cb) {
        this.o = StrmOpt.call(this, opts, cb) || {};
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
      }
      Decompress2.prototype.i = function() {
        var _this = this;
        this.s.ondata = function(dat, final) {
          _this.ondata(dat, final);
        };
      };
      Decompress2.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        if (!this.s) {
          if (this.p && this.p.length) {
            var n = new u8(this.p.length + chunk.length);
            n.set(this.p), n.set(chunk, this.p.length);
          } else
            this.p = chunk;
          if (this.p.length > 2) {
            this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(this.o) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(this.o) : new this.Z(this.o);
            this.i();
            this.s.push(this.p, final);
            this.p = null;
          }
        } else
          this.s.push(chunk, final);
      };
      return Decompress2;
    })();
    AsyncDecompress = /* @__PURE__ */ (function() {
      function AsyncDecompress2(opts, cb) {
        Decompress.call(this, opts, cb);
        this.queuedSize = 0;
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
      }
      AsyncDecompress2.prototype.i = function() {
        var _this = this;
        this.s.ondata = function(err2, dat, final) {
          _this.ondata(err2, dat, final);
        };
        this.s.ondrain = function(size) {
          _this.queuedSize -= size;
          if (_this.ondrain)
            _this.ondrain(size);
        };
      };
      AsyncDecompress2.prototype.push = function(chunk, final) {
        this.queuedSize += chunk.length;
        Decompress.prototype.push.call(this, chunk, final);
      };
      return AsyncDecompress2;
    })();
    fltn = function(d, p, t, o) {
      for (var k in d) {
        var val = d[k], n = p + k, op = o;
        if (Array.isArray(val))
          op = mrg(o, val[1]), val = val[0];
        if (ArrayBuffer.isView(val))
          t[n] = [val, op];
        else {
          t[n += "/"] = [new u8(0), op];
          fltn(val, n, t, o);
        }
      }
    };
    te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
    td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
    tds = 0;
    try {
      td.decode(et, { stream: true });
      tds = 1;
    } catch (e) {
    }
    dutf8 = function(d) {
      for (var r = "", i = 0; ; ) {
        var c = d[i++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length)
          return { s: r, r: slc(d, i - 1) };
        if (!eb)
          r += String.fromCharCode(c);
        else if (eb == 3) {
          c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
        } else if (eb & 1)
          r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
        else
          r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
      }
    };
    DecodeUTF8 = /* @__PURE__ */ (function() {
      function DecodeUTF82(cb) {
        this.ondata = cb;
        if (tds)
          this.t = new TextDecoder();
        else
          this.p = et;
      }
      DecodeUTF82.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        final = !!final;
        if (this.t) {
          this.ondata(this.t.decode(chunk, { stream: true }), final);
          if (final) {
            if (this.t.decode().length)
              err(8);
            this.t = null;
          }
          return;
        }
        if (!this.p)
          err(4);
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p);
        dat.set(chunk, this.p.length);
        var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
        if (final) {
          if (r.length)
            err(8);
          this.p = null;
        } else
          this.p = r;
        this.ondata(s, final);
      };
      return DecodeUTF82;
    })();
    EncodeUTF8 = /* @__PURE__ */ (function() {
      function EncodeUTF82(cb) {
        this.ondata = cb;
      }
      EncodeUTF82.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        if (this.d)
          err(4);
        this.ondata(strToU8(chunk), this.d = final || false);
      };
      return EncodeUTF82;
    })();
    dbf = function(l) {
      return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0;
    };
    slzh = function(d, b) {
      return b + 30 + b2(d, b + 26) + b2(d, b + 28);
    };
    zh = function(d, b, z) {
      var fnl = b2(d, b + 28), efl = b2(d, b + 30), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl;
      var _a2 = z64hs(d, es, efl, z, b4(d, b + 20), b4(d, b + 24), b4(d, b + 42)), sc = _a2[0], su = _a2[1], off = _a2[2];
      return [b2(d, b + 10), sc, su, fn, es + efl + b2(d, b + 32), off];
    };
    z64hs = function(d, b, l, z, sc, su, off) {
      var nsc = sc == 4294967295, nsu = su == 4294967295, noff = off == 4294967295, e = b + l;
      var nf = nsc + nsu + noff;
      if (z && nf) {
        for (; b + 4 < e; b += 4 + b2(d, b + 2)) {
          if (b2(d, b) == 1) {
            return [
              nsc ? b8(d, b + 4 + 8 * nsu) : sc,
              nsu ? b8(d, b + 4) : su,
              noff ? b8(d, b + 4 + 8 * (nsu + nsc)) : off,
              1
            ];
          }
        }
        if (z < 2)
          err(13);
      }
      return [sc, su, off, 0];
    };
    exfl = function(ex) {
      var le = 0;
      if (ex) {
        for (var k in ex) {
          var l = ex[k].length;
          if (l > 65535)
            err(9);
          le += l + 4;
        }
      }
      return le;
    };
    wzh = function(d, b, f, fn, u, c, ce, co) {
      var fl2 = fn.length, ex = f.extra, col = co && co.length;
      var exl = exfl(ex);
      wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
      if (ce != null)
        d[b++] = 20, d[b++] = f.os;
      d[b] = 20, b += 2;
      d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
      d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
      var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if (y < 0 || y > 119)
        err(10);
      wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
      if (c != -1) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c < 0 ? -c - 2 : c);
        wbytes(d, b + 8, f.size);
      }
      wbytes(d, b + 12, fl2);
      wbytes(d, b + 14, exl), b += 16;
      if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
      }
      d.set(fn, b);
      b += fl2;
      if (exl) {
        for (var k in ex) {
          var exf = ex[k], l = exf.length;
          wbytes(d, b, +k);
          wbytes(d, b + 2, l);
          d.set(exf, b + 4), b += 4 + l;
        }
      }
      if (col)
        d.set(co, b), b += col;
      return b;
    };
    wzf = function(o, b, c, d, e) {
      wbytes(o, b, 101010256);
      wbytes(o, b + 8, c);
      wbytes(o, b + 10, c);
      wbytes(o, b + 12, d);
      wbytes(o, b + 16, e);
    };
    ZipPassThrough = /* @__PURE__ */ (function() {
      function ZipPassThrough2(filename) {
        this.filename = filename;
        this.c = crc();
        this.size = 0;
        this.compression = 0;
      }
      ZipPassThrough2.prototype.process = function(chunk, final) {
        this.ondata(null, chunk, final);
      };
      ZipPassThrough2.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        this.c.p(chunk);
        this.size += chunk.length;
        if (final)
          this.crc = this.c.d();
        this.process(chunk, final || false);
      };
      return ZipPassThrough2;
    })();
    ZipDeflate = /* @__PURE__ */ (function() {
      function ZipDeflate2(filename, opts) {
        var _this = this;
        if (!opts)
          opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new Deflate(opts, function(dat, final) {
          _this.ondata(null, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
      }
      ZipDeflate2.prototype.process = function(chunk, final) {
        try {
          this.d.push(chunk, final);
        } catch (e) {
          this.ondata(e, null, final);
        }
      };
      ZipDeflate2.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return ZipDeflate2;
    })();
    AsyncZipDeflate = /* @__PURE__ */ (function() {
      function AsyncZipDeflate2(filename, opts) {
        var _this = this;
        if (!opts)
          opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new AsyncDeflate(opts, function(err2, dat, final) {
          _this.ondata(err2, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
        this.terminate = this.d.terminate;
      }
      AsyncZipDeflate2.prototype.process = function(chunk, final) {
        this.d.push(chunk, final);
      };
      AsyncZipDeflate2.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return AsyncZipDeflate2;
    })();
    Zip = /* @__PURE__ */ (function() {
      function Zip2(cb) {
        this.ondata = cb;
        this.u = [];
        this.d = 1;
      }
      Zip2.prototype.add = function(file) {
        var _this = this;
        if (!this.ondata)
          err(5);
        if (this.d & 2)
          this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
        else {
          var f = strToU8(file.filename), fl_1 = f.length;
          var com = file.comment, o = com && strToU8(com);
          var u = fl_1 != file.filename.length || o && com.length != o.length;
          var hl_1 = fl_1 + exfl(file.extra) + 30;
          if (fl_1 > 65535)
            this.ondata(err(11, 0, 1), null, false);
          var header = new u8(hl_1);
          wzh(header, 0, file, f, u, -1);
          var chks_1 = [header];
          var pAll_1 = function() {
            for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
              var chk = chks_2[_i];
              _this.ondata(null, chk, false);
            }
            chks_1 = [];
          };
          var tr_1 = this.d;
          this.d = 0;
          var ind_1 = this.u.length;
          var uf_1 = mrg(file, {
            f,
            u,
            o,
            t: function() {
              if (file.terminate)
                file.terminate();
            },
            r: function() {
              pAll_1();
              if (tr_1) {
                var nxt = _this.u[ind_1 + 1];
                if (nxt)
                  nxt.r();
                else
                  _this.d = 1;
              }
              tr_1 = 1;
            }
          });
          var cl_1 = 0;
          file.ondata = function(err2, dat, final) {
            if (err2) {
              _this.ondata(err2, dat, final);
              _this.terminate();
            } else {
              cl_1 += dat.length;
              chks_1.push(dat);
              if (final) {
                var dd = new u8(16);
                wbytes(dd, 0, 134695760);
                wbytes(dd, 4, file.crc);
                wbytes(dd, 8, cl_1);
                wbytes(dd, 12, file.size);
                chks_1.push(dd);
                uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                if (tr_1)
                  uf_1.r();
                tr_1 = 1;
              } else if (tr_1)
                pAll_1();
            }
          };
          this.u.push(uf_1);
        }
      };
      Zip2.prototype.end = function() {
        var _this = this;
        if (this.d & 2) {
          this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
          return;
        }
        if (this.d)
          this.e();
        else
          this.u.push({
            r: function() {
              if (!(_this.d & 1))
                return;
              _this.u.splice(-1, 1);
              _this.e();
            },
            t: function() {
            }
          });
        this.d = 3;
      };
      Zip2.prototype.e = function() {
        var bt = 0, l = 0, tl = 0;
        for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
          var f = _a2[_i];
          tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        var out = new u8(tl + 22);
        for (var _b2 = 0, _c = this.u; _b2 < _c.length; _b2++) {
          var f = _c[_b2];
          wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
          bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l);
        this.ondata(null, out, true);
        this.d = 2;
      };
      Zip2.prototype.terminate = function() {
        for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
          var f = _a2[_i];
          f.t();
        }
        this.d = 2;
      };
      return Zip2;
    })();
    UnzipPassThrough = /* @__PURE__ */ (function() {
      function UnzipPassThrough2() {
      }
      UnzipPassThrough2.prototype.push = function(chunk, final) {
        this.ondata(null, chunk, final);
      };
      UnzipPassThrough2.compression = 0;
      return UnzipPassThrough2;
    })();
    UnzipInflate = /* @__PURE__ */ (function() {
      function UnzipInflate2() {
        var _this = this;
        this.i = new Inflate(function(dat, final) {
          _this.ondata(null, dat, final);
        });
      }
      UnzipInflate2.prototype.push = function(chunk, final) {
        try {
          this.i.push(chunk, final);
        } catch (e) {
          this.ondata(e, null, final);
        }
      };
      UnzipInflate2.compression = 8;
      return UnzipInflate2;
    })();
    AsyncUnzipInflate = /* @__PURE__ */ (function() {
      function AsyncUnzipInflate2(_, sz) {
        var _this = this;
        if (sz < 32e4) {
          this.i = new Inflate(function(dat, final) {
            _this.ondata(null, dat, final);
          });
        } else {
          this.i = new AsyncInflate(function(err2, dat, final) {
            _this.ondata(err2, dat, final);
          });
          this.terminate = this.i.terminate;
        }
      }
      AsyncUnzipInflate2.prototype.push = function(chunk, final) {
        if (this.i.terminate)
          chunk = slc(chunk, 0);
        this.i.push(chunk, final);
      };
      AsyncUnzipInflate2.compression = 8;
      return AsyncUnzipInflate2;
    })();
    Unzip = /* @__PURE__ */ (function() {
      function Unzip2(cb) {
        this.onfile = cb;
        this.k = [];
        this.o = {
          0: UnzipPassThrough
        };
        this.p = et;
      }
      Unzip2.prototype.push = function(chunk, final) {
        var _this = this;
        if (!this.onfile)
          err(5);
        if (!this.p)
          err(4);
        if (this.c > 0) {
          var len = Math.min(this.c, chunk.length);
          var toAdd = chunk.subarray(0, len);
          this.c -= len;
          if (this.d)
            this.d.push(toAdd, !this.c);
          else
            this.k[0].push(toAdd);
          chunk = chunk.subarray(len);
          if (chunk.length)
            return this.push(chunk, final);
        } else {
          var f = 0, i = 0, is = void 0, buf = void 0;
          if (!this.p.length)
            buf = chunk;
          else if (!chunk.length)
            buf = this.p;
          else {
            buf = new u8(this.p.length + chunk.length);
            buf.set(this.p), buf.set(chunk, this.p.length);
          }
          var l = buf.length, oc = this.c, add = oc && this.d;
          var _loop_2 = function() {
            var sig = b4(buf, i);
            if (sig == 67324752) {
              f = 1, is = i;
              this_1.d = null;
              this_1.c = 0;
              var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
              if (l > i + 30 + fnl + es) {
                var chks_3 = [];
                this_1.k.unshift(chks_3);
                f = 2;
                var lsc = b4(buf, i + 18), lsu = b4(buf, i + 22);
                var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                var _a2 = z64hs(buf, i, es, 2, lsc, lsu, 0), sc_1 = _a2[0], su_1 = _a2[1], z64 = _a2[3];
                if (dd)
                  sc_1 = -1 - z64;
                i += es;
                this_1.c = sc_1;
                var d_1;
                var file_1 = {
                  name: fn_1,
                  compression: cmp_1,
                  start: function() {
                    if (!file_1.ondata)
                      err(5);
                    if (!sc_1)
                      file_1.ondata(null, et, true);
                    else {
                      var ctr = _this.o[cmp_1];
                      if (!ctr)
                        file_1.ondata(err(14, "unknown compression type " + cmp_1, 1), null, false);
                      d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                      d_1.ondata = function(err2, dat3, final2) {
                        file_1.ondata(err2, dat3, final2);
                      };
                      for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                        var dat2 = chks_4[_i];
                        d_1.push(dat2, false);
                      }
                      if (_this.k[0] == chks_3 && _this.c)
                        _this.d = d_1;
                      else
                        d_1.push(et, true);
                    }
                  },
                  terminate: function() {
                    if (d_1 && d_1.terminate)
                      d_1.terminate();
                  }
                };
                if (sc_1 >= 0)
                  file_1.size = sc_1, file_1.originalSize = su_1;
                this_1.onfile(file_1);
              }
              return "break";
            } else if (oc) {
              if (sig == 134695760) {
                is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                return "break";
              } else if (sig == 33639248) {
                is = i -= 4, f = 3, this_1.c = 0;
                return "break";
              }
            }
          };
          var this_1 = this;
          for (; i < l - 4; ++i) {
            var state_1 = _loop_2();
            if (state_1 === "break")
              break;
          }
          this.p = et;
          if (oc < 0) {
            var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 134695760 && 4)) : buf.subarray(0, i);
            if (add)
              add.push(dat, !!f);
            else
              this.k[+(f == 2)].push(dat);
          }
          if (f & 2)
            return this.push(buf.subarray(i), final);
          this.p = buf.subarray(i);
        }
        if (final) {
          if (this.c)
            err(13);
          this.p = null;
        }
      };
      Unzip2.prototype.register = function(decoder) {
        this.o[decoder.compression] = decoder;
      };
      return Unzip2;
    })();
    mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
      fn();
    };
  }
});

// node_modules/tinyqueue/index.js
function defaultCompare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
var TinyQueue;
var init_tinyqueue = __esm({
  "node_modules/tinyqueue/index.js"() {
    TinyQueue = class {
      constructor(data = [], compare = defaultCompare) {
        this.data = data;
        this.length = this.data.length;
        this.compare = compare;
        if (this.length > 0) {
          for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
        }
      }
      push(item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
      }
      pop() {
        if (this.length === 0) return void 0;
        const top = this.data[0];
        const bottom = this.data.pop();
        this.length--;
        if (this.length > 0) {
          this.data[0] = bottom;
          this._down(0);
        }
        return top;
      }
      peek() {
        return this.data[0];
      }
      _up(pos) {
        const { data, compare } = this;
        const item = data[pos];
        while (pos > 0) {
          const parent = pos - 1 >> 1;
          const current = data[parent];
          if (compare(item, current) >= 0) break;
          data[pos] = current;
          pos = parent;
        }
        data[pos] = item;
      }
      _down(pos) {
        const { data, compare } = this;
        const halfLength = this.length >> 1;
        const item = data[pos];
        while (pos < halfLength) {
          let left = (pos << 1) + 1;
          let best = data[left];
          const right = left + 1;
          if (right < this.length && compare(data[right], best) < 0) {
            left = right;
            best = data[right];
          }
          if (compare(best, item) >= 0) break;
          data[pos] = best;
          pos = left;
        }
        data[pos] = item;
      }
    };
  }
});

// src/core/matching/hamming-distance.js
function popcount32(n) {
  n = n >>> 0;
  n -= n >>> 1 & 1431655765;
  n = (n & 858993459) + (n >>> 2 & 858993459);
  return (n + (n >>> 4) & 252645135) * 16843009 >>> 24;
}
var BIT_COUNT_8, compute64, compute;
var init_hamming_distance = __esm({
  "src/core/matching/hamming-distance.js"() {
    "use strict";
    BIT_COUNT_8 = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      let c = 0, n = i;
      while (n > 0) {
        n &= n - 1;
        c++;
      }
      BIT_COUNT_8[i] = c;
    }
    compute64 = (v1, v1Idx, v2, v2Idx) => {
      let x1 = (v1[v1Idx] ^ v2[v2Idx]) >>> 0;
      let x2 = (v1[v1Idx + 1] ^ v2[v2Idx + 1]) >>> 0;
      x1 -= x1 >>> 1 & 1431655765;
      x1 = (x1 & 858993459) + (x1 >>> 2 & 858993459);
      const count1 = (x1 + (x1 >>> 4) & 252645135) * 16843009 >>> 24;
      x2 -= x2 >>> 1 & 1431655765;
      x2 = (x2 & 858993459) + (x2 >>> 2 & 858993459);
      const count2 = (x2 + (x2 >>> 4) & 252645135) * 16843009 >>> 24;
      return count1 + count2;
    };
    compute = (options) => {
      const { v1, v2, v1Offset = 0, v2Offset = 0 } = options;
      const v2Len = v2.length - v2Offset;
      if (v2Len === 2) {
        return compute64(v1, v1Offset, v2, v2Offset);
      }
      if (v2Len === 84) {
        let d = 0;
        for (let i = 0; i < 84; i++) {
          d += BIT_COUNT_8[v1[v1Offset + i] ^ v2[v2Offset + i]];
        }
        return d;
      }
      if (v2Len === 4) {
        return popcount32(v1[v1Offset] ^ v2[v2Offset]) + popcount32(v1[v1Offset + 1] ^ v2[v2Offset + 1]) + popcount32(v1[v1Offset + 2] ^ v2[v2Offset + 2]) + popcount32(v1[v1Offset + 3] ^ v2[v2Offset + 3]);
      }
      return popcount32(v1[v1Offset] ^ v2[v2Offset]) + popcount32(v1[v1Offset + 1] ^ v2[v2Offset + 1]);
    };
  }
});

// src/core/matching/hough.js
var computeHoughMatches, _mapCorrespondence;
var init_hough = __esm({
  "src/core/matching/hough.js"() {
    "use strict";
    computeHoughMatches = (options) => {
      const { keywidth, keyheight, querywidth, queryheight, matches } = options;
      const maxX = querywidth * 1.2;
      const minX = -maxX;
      const maxY = queryheight * 1.2;
      const minY = -maxY;
      const numAngleBins = 12;
      const numScaleBins = 12;
      const minScale = -2;
      const maxScale = 1;
      const scaleK = 10;
      const scaleOneOverLogK = 1 / Math.log(scaleK);
      const maxDim = Math.max(keywidth, keyheight);
      const keycenterX = Math.floor(keywidth / 2);
      const keycenterY = Math.floor(keyheight / 2);
      const projectedDims = [];
      for (let i = 0; i < matches.length; i++) {
        const queryscale = matches[i].querypoint.scale;
        const keyscale = matches[i].keypoint.scale;
        if (keyscale == 0) {
          console.log("ERROR divide zero");
          continue;
        }
        const scale = queryscale / keyscale;
        projectedDims.push(scale * maxDim);
      }
      projectedDims.sort((a1, a2) => {
        return a1 - a2;
      });
      const medianProjectedDim = projectedDims[Math.floor((projectedDims.length - 1) / 2)];
      const binSize = Math.max(20, 0.25 * medianProjectedDim);
      const numXBins = Math.max(5, Math.min(40, Math.ceil((maxX - minX) / binSize)));
      const numYBins = Math.max(5, Math.min(40, Math.ceil((maxY - minY) / binSize)));
      const numXYBins = numXBins * numYBins;
      const numXYAngleBins = numXYBins * numAngleBins;
      const querypointValids = [];
      const querypointBinLocations = [];
      const votes = {};
      for (let i = 0; i < matches.length; i++) {
        const querypoint = matches[i].querypoint;
        const keypoint = matches[i].keypoint;
        const { x, y, scale, angle } = _mapCorrespondence({
          querypoint,
          keypoint,
          keycenterX,
          keycenterY,
          scaleOneOverLogK
        });
        if (x < minX || x >= maxX || y < minY || y >= maxY || angle <= -Math.PI || angle > Math.PI || scale < minScale || scale >= maxScale) {
          querypointValids[i] = false;
          continue;
        }
        let fbinX = numXBins * (x - minX) / (maxX - minX);
        let fbinY = numYBins * (y - minY) / (maxY - minY);
        let fbinAngle = numAngleBins * (angle + Math.PI) / (2 * Math.PI);
        let fbinScale = numScaleBins * (scale - minScale) / (maxScale - minScale);
        querypointBinLocations[i] = {
          binX: fbinX,
          binY: fbinY,
          binAngle: fbinAngle,
          binScale: fbinScale
        };
        let binX2 = Math.floor(fbinX - 0.5);
        let binY2 = Math.floor(fbinY - 0.5);
        let binScale2 = Math.floor(fbinScale - 0.5);
        let binAngle2 = (Math.floor(fbinAngle - 0.5) + numAngleBins) % numAngleBins;
        if (binX2 < 0 || binX2 + 1 >= numXBins || binY2 < 0 || binY2 + 1 >= numYBins || binScale2 < 0 || binScale2 + 1 >= numScaleBins) {
          querypointValids[i] = false;
          continue;
        }
        for (let dx = 0; dx < 2; dx++) {
          let binX22 = binX2 + dx;
          for (let dy = 0; dy < 2; dy++) {
            let binY22 = binY2 + dy;
            for (let dangle = 0; dangle < 2; dangle++) {
              let binAngle22 = (binAngle2 + dangle) % numAngleBins;
              for (let dscale = 0; dscale < 2; dscale++) {
                let binScale22 = binScale2 + dscale;
                const binIndex = binX22 + binY22 * numXBins + binAngle22 * numXYBins + binScale22 * numXYAngleBins;
                if (votes[binIndex] === void 0) votes[binIndex] = 0;
                votes[binIndex] += 1;
              }
            }
          }
        }
        querypointValids[i] = true;
      }
      let maxVotes = 0;
      let maxVoteIndex = -1;
      Object.keys(votes).forEach((index) => {
        if (votes[index] > maxVotes) {
          maxVotes = votes[index];
          maxVoteIndex = index;
        }
      });
      if (maxVotes < 3) return [];
      const binX = Math.floor(maxVoteIndex % numXYAngleBins % numXYBins % numXBins);
      const binY = Math.floor((maxVoteIndex - binX) % numXYAngleBins % numXYBins / numXBins);
      const binAngle = Math.floor(
        (maxVoteIndex - binX - binY * numXBins) % numXYAngleBins / numXYBins
      );
      const binScale = Math.floor(
        (maxVoteIndex - binX - binY * numXBins - binAngle * numXYBins) / numXYAngleBins
      );
      const houghMatches = [];
      const relaxedDelta = 2;
      for (let i = 0; i < matches.length; i++) {
        if (!querypointValids[i]) continue;
        const queryBins = querypointBinLocations[i];
        const distBinX = Math.abs(queryBins.binX - (binX + 0.5));
        if (distBinX >= relaxedDelta) continue;
        const distBinY = Math.abs(queryBins.binY - (binY + 0.5));
        if (distBinY >= relaxedDelta) continue;
        const distBinScale = Math.abs(queryBins.binScale - (binScale + 0.5));
        if (distBinScale >= relaxedDelta) continue;
        const temp = Math.abs(queryBins.binAngle - (binAngle + 0.5));
        const distBinAngle = Math.min(temp, numAngleBins - temp);
        if (distBinAngle >= relaxedDelta) continue;
        houghMatches.push(matches[i]);
      }
      return houghMatches;
    };
    _mapCorrespondence = ({ querypoint, keypoint, keycenterX, keycenterY, scaleOneOverLogK }) => {
      let angle = querypoint.angle - keypoint.angle;
      if (angle <= -Math.PI) angle += 2 * Math.PI;
      else if (angle > Math.PI) angle -= 2 * Math.PI;
      const scale = querypoint.scale / keypoint.scale;
      const cos = scale * Math.cos(angle);
      const sin = scale * Math.sin(angle);
      const S = [cos, -sin, sin, cos];
      const tp = [S[0] * keypoint.x + S[1] * keypoint.y, S[2] * keypoint.x + S[3] * keypoint.y];
      const tx = querypoint.x - tp[0];
      const ty = querypoint.y - tp[1];
      return {
        x: S[0] * keycenterX + S[1] * keycenterY + tx,
        y: S[2] * keycenterX + S[3] * keycenterY + ty,
        angle,
        scale: Math.log(scale) * scaleOneOverLogK
      };
    };
  }
});

// src/core/utils/randomizer.js
var mRandSeed, createRandomizer;
var init_randomizer = __esm({
  "src/core/utils/randomizer.js"() {
    "use strict";
    mRandSeed = 1234;
    createRandomizer = () => {
      const randomizer = {
        seed: mRandSeed,
        arrayShuffle(options) {
          const { arr, sampleSize } = options;
          for (let i = 0; i < sampleSize; i++) {
            this.seed = (214013 * this.seed + 2531011) % (1 << 31);
            let k = this.seed >> 16 & 32767;
            k = k % arr.length;
            let tmp = arr[i];
            arr[i] = arr[k];
            arr[k] = tmp;
          }
        },
        nextInt(maxValue) {
          this.seed = (214013 * this.seed + 2531011) % (1 << 31);
          let k = this.seed >> 16 & 32767;
          k = k % maxValue;
          return k;
        }
      };
      return randomizer;
    };
  }
});

// src/core/utils/geometry.js
var linePointSide, checkFourPointsConsistent, checkThreePointsConsistent, determinant, matrixInverse33, multiplyPointHomographyInhomogenous, smallestTriangleArea, quadrilateralConvex, _vector, _areaOfTriangle;
var init_geometry = __esm({
  "src/core/utils/geometry.js"() {
    "use strict";
    linePointSide = (A, B, C) => {
      return (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]);
    };
    checkFourPointsConsistent = (x1, x2, x3, x4, x1p, x2p, x3p, x4p) => {
      if (linePointSide(x1, x2, x3) > 0 !== linePointSide(x1p, x2p, x3p) > 0) return false;
      if (linePointSide(x2, x3, x4) > 0 !== linePointSide(x2p, x3p, x4p) > 0) return false;
      if (linePointSide(x3, x4, x1) > 0 !== linePointSide(x3p, x4p, x1p) > 0) return false;
      if (linePointSide(x4, x1, x2) > 0 !== linePointSide(x4p, x1p, x2p) > 0) return false;
      return true;
    };
    checkThreePointsConsistent = (x1, x2, x3, x1p, x2p, x3p) => {
      if (linePointSide(x1, x2, x3) > 0 !== linePointSide(x1p, x2p, x3p) > 0) return false;
      return true;
    };
    determinant = (A) => {
      const C1 = A[4] * A[8] - A[5] * A[7];
      const C2 = A[3] * A[8] - A[5] * A[6];
      const C3 = A[3] * A[7] - A[4] * A[6];
      return A[0] * C1 - A[1] * C2 + A[2] * C3;
    };
    matrixInverse33 = (A, threshold) => {
      const det = determinant(A);
      if (Math.abs(det) <= threshold) return null;
      const oneOver = 1 / det;
      const B = [
        (A[4] * A[8] - A[5] * A[7]) * oneOver,
        (A[2] * A[7] - A[1] * A[8]) * oneOver,
        (A[1] * A[5] - A[2] * A[4]) * oneOver,
        (A[5] * A[6] - A[3] * A[8]) * oneOver,
        (A[0] * A[8] - A[2] * A[6]) * oneOver,
        (A[2] * A[3] - A[0] * A[5]) * oneOver,
        (A[3] * A[7] - A[4] * A[6]) * oneOver,
        (A[1] * A[6] - A[0] * A[7]) * oneOver,
        (A[0] * A[4] - A[1] * A[3]) * oneOver
      ];
      return B;
    };
    multiplyPointHomographyInhomogenous = (x, H) => {
      const w = H[6] * x[0] + H[7] * x[1] + H[8];
      const xp = [];
      xp[0] = (H[0] * x[0] + H[1] * x[1] + H[2]) / w;
      xp[1] = (H[3] * x[0] + H[4] * x[1] + H[5]) / w;
      return xp;
    };
    smallestTriangleArea = (x1, x2, x3, x4) => {
      const v12 = _vector(x2, x1);
      const v13 = _vector(x3, x1);
      const v14 = _vector(x4, x1);
      const v32 = _vector(x2, x3);
      const v34 = _vector(x4, x3);
      const a1 = _areaOfTriangle(v12, v13);
      const a2 = _areaOfTriangle(v13, v14);
      const a3 = _areaOfTriangle(v12, v14);
      const a4 = _areaOfTriangle(v32, v34);
      return Math.min(Math.min(Math.min(a1, a2), a3), a4);
    };
    quadrilateralConvex = (x1, x2, x3, x4) => {
      const first = linePointSide(x1, x2, x3) <= 0;
      if (linePointSide(x2, x3, x4) <= 0 !== first) return false;
      if (linePointSide(x3, x4, x1) <= 0 !== first) return false;
      if (linePointSide(x4, x1, x2) <= 0 !== first) return false;
      return true;
    };
    _vector = (a, b) => {
      return [a[0] - b[0], a[1] - b[1]];
    };
    _areaOfTriangle = (u, v) => {
      const a = u[0] * v[1] - u[1] * v[0];
      return Math.abs(a) * 0.5;
    };
  }
});

// node_modules/ml-matrix/matrix.js
var require_matrix = __commonJS({
  "node_modules/ml-matrix/matrix.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString = Object.prototype.toString;
    function isAnyArray(value) {
      const tag = toString.call(value);
      return tag.endsWith("Array]") && !tag.includes("Big");
    }
    function max2(input, options = {}) {
      if (!isAnyArray(input)) {
        throw new TypeError("input must be an array");
      }
      if (input.length === 0) {
        throw new TypeError("input must not be empty");
      }
      const { fromIndex = 0, toIndex = input.length } = options;
      if (fromIndex < 0 || fromIndex >= input.length || !Number.isInteger(fromIndex)) {
        throw new Error("fromIndex must be a positive integer smaller than length");
      }
      if (toIndex <= fromIndex || toIndex > input.length || !Number.isInteger(toIndex)) {
        throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
      }
      let maxValue = input[fromIndex];
      for (let i = fromIndex + 1; i < toIndex; i++) {
        if (input[i] > maxValue)
          maxValue = input[i];
      }
      return maxValue;
    }
    function min(input, options = {}) {
      if (!isAnyArray(input)) {
        throw new TypeError("input must be an array");
      }
      if (input.length === 0) {
        throw new TypeError("input must not be empty");
      }
      const { fromIndex = 0, toIndex = input.length } = options;
      if (fromIndex < 0 || fromIndex >= input.length || !Number.isInteger(fromIndex)) {
        throw new Error("fromIndex must be a positive integer smaller than length");
      }
      if (toIndex <= fromIndex || toIndex > input.length || !Number.isInteger(toIndex)) {
        throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
      }
      let minValue = input[fromIndex];
      for (let i = fromIndex + 1; i < toIndex; i++) {
        if (input[i] < minValue)
          minValue = input[i];
      }
      return minValue;
    }
    function rescale(input, options = {}) {
      if (!isAnyArray(input)) {
        throw new TypeError("input must be an array");
      } else if (input.length === 0) {
        throw new TypeError("input must not be empty");
      }
      let output;
      if (options.output !== void 0) {
        if (!isAnyArray(options.output)) {
          throw new TypeError("output option must be an array if specified");
        }
        output = options.output;
      } else {
        output = new Array(input.length);
      }
      const currentMin = min(input);
      const currentMax = max2(input);
      if (currentMin === currentMax) {
        throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
      }
      const { min: minValue = options.autoMinMax ? currentMin : 0, max: maxValue = options.autoMinMax ? currentMax : 1 } = options;
      if (minValue >= maxValue) {
        throw new RangeError("min option must be smaller than max option");
      }
      const factor = (maxValue - minValue) / (currentMax - currentMin);
      for (let i = 0; i < input.length; i++) {
        output[i] = (input[i] - currentMin) * factor + minValue;
      }
      return output;
    }
    var indent = " ".repeat(2);
    var indentData = " ".repeat(4);
    function inspectMatrix() {
      return inspectMatrixWithOptions(this);
    }
    function inspectMatrixWithOptions(matrix2, options = {}) {
      const {
        maxRows = 15,
        maxColumns = 10,
        maxNumSize = 8,
        padMinus = "auto"
      } = options;
      return `${matrix2.constructor.name} {
${indent}[
${indentData}${inspectData(matrix2, maxRows, maxColumns, maxNumSize, padMinus)}
${indent}]
${indent}rows: ${matrix2.rows}
${indent}columns: ${matrix2.columns}
}`;
    }
    function inspectData(matrix2, maxRows, maxColumns, maxNumSize, padMinus) {
      const { rows, columns } = matrix2;
      const maxI = Math.min(rows, maxRows);
      const maxJ = Math.min(columns, maxColumns);
      const result = [];
      if (padMinus === "auto") {
        padMinus = false;
        loop: for (let i = 0; i < maxI; i++) {
          for (let j = 0; j < maxJ; j++) {
            if (matrix2.get(i, j) < 0) {
              padMinus = true;
              break loop;
            }
          }
        }
      }
      for (let i = 0; i < maxI; i++) {
        let line = [];
        for (let j = 0; j < maxJ; j++) {
          line.push(formatNumber(matrix2.get(i, j), maxNumSize, padMinus));
        }
        result.push(`${line.join(" ")}`);
      }
      if (maxJ !== columns) {
        result[result.length - 1] += ` ... ${columns - maxColumns} more columns`;
      }
      if (maxI !== rows) {
        result.push(`... ${rows - maxRows} more rows`);
      }
      return result.join(`
${indentData}`);
    }
    function formatNumber(num, maxNumSize, padMinus) {
      return (num >= 0 && padMinus ? ` ${formatNumber2(num, maxNumSize - 1)}` : formatNumber2(num, maxNumSize)).padEnd(maxNumSize);
    }
    function formatNumber2(num, len) {
      let str = num.toString();
      if (str.length <= len) return str;
      let fix = num.toFixed(len);
      if (fix.length > len) {
        fix = num.toFixed(Math.max(0, len - (fix.length - len)));
      }
      if (fix.length <= len && !fix.startsWith("0.000") && !fix.startsWith("-0.000")) {
        return fix;
      }
      let exp = num.toExponential(len);
      if (exp.length > len) {
        exp = num.toExponential(Math.max(0, len - (exp.length - len)));
      }
      return exp.slice(0);
    }
    function installMathOperations(AbstractMatrix3, Matrix4) {
      AbstractMatrix3.prototype.add = function add(value) {
        if (typeof value === "number") return this.addS(value);
        return this.addM(value);
      };
      AbstractMatrix3.prototype.addS = function addS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) + value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.addM = function addM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) + matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.add = function add(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.add(value);
      };
      AbstractMatrix3.prototype.sub = function sub(value) {
        if (typeof value === "number") return this.subS(value);
        return this.subM(value);
      };
      AbstractMatrix3.prototype.subS = function subS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) - value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.subM = function subM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) - matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.sub = function sub(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.sub(value);
      };
      AbstractMatrix3.prototype.subtract = AbstractMatrix3.prototype.sub;
      AbstractMatrix3.prototype.subtractS = AbstractMatrix3.prototype.subS;
      AbstractMatrix3.prototype.subtractM = AbstractMatrix3.prototype.subM;
      AbstractMatrix3.subtract = AbstractMatrix3.sub;
      AbstractMatrix3.prototype.mul = function mul(value) {
        if (typeof value === "number") return this.mulS(value);
        return this.mulM(value);
      };
      AbstractMatrix3.prototype.mulS = function mulS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) * value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.mulM = function mulM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) * matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.mul = function mul(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.mul(value);
      };
      AbstractMatrix3.prototype.multiply = AbstractMatrix3.prototype.mul;
      AbstractMatrix3.prototype.multiplyS = AbstractMatrix3.prototype.mulS;
      AbstractMatrix3.prototype.multiplyM = AbstractMatrix3.prototype.mulM;
      AbstractMatrix3.multiply = AbstractMatrix3.mul;
      AbstractMatrix3.prototype.div = function div(value) {
        if (typeof value === "number") return this.divS(value);
        return this.divM(value);
      };
      AbstractMatrix3.prototype.divS = function divS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) / value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.divM = function divM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) / matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.div = function div(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.div(value);
      };
      AbstractMatrix3.prototype.divide = AbstractMatrix3.prototype.div;
      AbstractMatrix3.prototype.divideS = AbstractMatrix3.prototype.divS;
      AbstractMatrix3.prototype.divideM = AbstractMatrix3.prototype.divM;
      AbstractMatrix3.divide = AbstractMatrix3.div;
      AbstractMatrix3.prototype.mod = function mod(value) {
        if (typeof value === "number") return this.modS(value);
        return this.modM(value);
      };
      AbstractMatrix3.prototype.modS = function modS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) % value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.modM = function modM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) % matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.mod = function mod(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.mod(value);
      };
      AbstractMatrix3.prototype.modulus = AbstractMatrix3.prototype.mod;
      AbstractMatrix3.prototype.modulusS = AbstractMatrix3.prototype.modS;
      AbstractMatrix3.prototype.modulusM = AbstractMatrix3.prototype.modM;
      AbstractMatrix3.modulus = AbstractMatrix3.mod;
      AbstractMatrix3.prototype.and = function and(value) {
        if (typeof value === "number") return this.andS(value);
        return this.andM(value);
      };
      AbstractMatrix3.prototype.andS = function andS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) & value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.andM = function andM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) & matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.and = function and(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.and(value);
      };
      AbstractMatrix3.prototype.or = function or(value) {
        if (typeof value === "number") return this.orS(value);
        return this.orM(value);
      };
      AbstractMatrix3.prototype.orS = function orS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) | value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.orM = function orM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) | matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.or = function or(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.or(value);
      };
      AbstractMatrix3.prototype.xor = function xor(value) {
        if (typeof value === "number") return this.xorS(value);
        return this.xorM(value);
      };
      AbstractMatrix3.prototype.xorS = function xorS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) ^ value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.xorM = function xorM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) ^ matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.xor = function xor(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.xor(value);
      };
      AbstractMatrix3.prototype.leftShift = function leftShift(value) {
        if (typeof value === "number") return this.leftShiftS(value);
        return this.leftShiftM(value);
      };
      AbstractMatrix3.prototype.leftShiftS = function leftShiftS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) << value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.leftShiftM = function leftShiftM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) << matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.leftShift = function leftShift(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.leftShift(value);
      };
      AbstractMatrix3.prototype.signPropagatingRightShift = function signPropagatingRightShift(value) {
        if (typeof value === "number") return this.signPropagatingRightShiftS(value);
        return this.signPropagatingRightShiftM(value);
      };
      AbstractMatrix3.prototype.signPropagatingRightShiftS = function signPropagatingRightShiftS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) >> value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.signPropagatingRightShiftM = function signPropagatingRightShiftM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) >> matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.signPropagatingRightShift = function signPropagatingRightShift(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.signPropagatingRightShift(value);
      };
      AbstractMatrix3.prototype.rightShift = function rightShift(value) {
        if (typeof value === "number") return this.rightShiftS(value);
        return this.rightShiftM(value);
      };
      AbstractMatrix3.prototype.rightShiftS = function rightShiftS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) >>> value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.rightShiftM = function rightShiftM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) >>> matrix2.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.rightShift = function rightShift(matrix2, value) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.rightShift(value);
      };
      AbstractMatrix3.prototype.zeroFillRightShift = AbstractMatrix3.prototype.rightShift;
      AbstractMatrix3.prototype.zeroFillRightShiftS = AbstractMatrix3.prototype.rightShiftS;
      AbstractMatrix3.prototype.zeroFillRightShiftM = AbstractMatrix3.prototype.rightShiftM;
      AbstractMatrix3.zeroFillRightShift = AbstractMatrix3.rightShift;
      AbstractMatrix3.prototype.not = function not() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, ~this.get(i, j));
          }
        }
        return this;
      };
      AbstractMatrix3.not = function not(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.not();
      };
      AbstractMatrix3.prototype.abs = function abs() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.abs(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.abs = function abs(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.abs();
      };
      AbstractMatrix3.prototype.acos = function acos() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.acos(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.acos = function acos(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.acos();
      };
      AbstractMatrix3.prototype.acosh = function acosh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.acosh(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.acosh = function acosh(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.acosh();
      };
      AbstractMatrix3.prototype.asin = function asin() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.asin(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.asin = function asin(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.asin();
      };
      AbstractMatrix3.prototype.asinh = function asinh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.asinh(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.asinh = function asinh(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.asinh();
      };
      AbstractMatrix3.prototype.atan = function atan() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.atan(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.atan = function atan(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.atan();
      };
      AbstractMatrix3.prototype.atanh = function atanh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.atanh(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.atanh = function atanh(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.atanh();
      };
      AbstractMatrix3.prototype.cbrt = function cbrt() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.cbrt(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.cbrt = function cbrt(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.cbrt();
      };
      AbstractMatrix3.prototype.ceil = function ceil() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.ceil(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.ceil = function ceil(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.ceil();
      };
      AbstractMatrix3.prototype.clz32 = function clz32() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.clz32(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.clz32 = function clz32(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.clz32();
      };
      AbstractMatrix3.prototype.cos = function cos() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.cos(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.cos = function cos(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.cos();
      };
      AbstractMatrix3.prototype.cosh = function cosh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.cosh(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.cosh = function cosh(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.cosh();
      };
      AbstractMatrix3.prototype.exp = function exp() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.exp(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.exp = function exp(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.exp();
      };
      AbstractMatrix3.prototype.expm1 = function expm1() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.expm1(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.expm1 = function expm1(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.expm1();
      };
      AbstractMatrix3.prototype.floor = function floor() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.floor(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.floor = function floor(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.floor();
      };
      AbstractMatrix3.prototype.fround = function fround() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.fround(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.fround = function fround(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.fround();
      };
      AbstractMatrix3.prototype.log = function log() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.log(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.log = function log(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.log();
      };
      AbstractMatrix3.prototype.log1p = function log1p() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.log1p(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.log1p = function log1p(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.log1p();
      };
      AbstractMatrix3.prototype.log10 = function log10() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.log10(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.log10 = function log10(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.log10();
      };
      AbstractMatrix3.prototype.log2 = function log2() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.log2(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.log2 = function log2(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.log2();
      };
      AbstractMatrix3.prototype.round = function round() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.round(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.round = function round(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.round();
      };
      AbstractMatrix3.prototype.sign = function sign() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.sign(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.sign = function sign(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.sign();
      };
      AbstractMatrix3.prototype.sin = function sin() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.sin(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.sin = function sin(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.sin();
      };
      AbstractMatrix3.prototype.sinh = function sinh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.sinh(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.sinh = function sinh(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.sinh();
      };
      AbstractMatrix3.prototype.sqrt = function sqrt() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.sqrt(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.sqrt = function sqrt(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.sqrt();
      };
      AbstractMatrix3.prototype.tan = function tan() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.tan(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.tan = function tan(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.tan();
      };
      AbstractMatrix3.prototype.tanh = function tanh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.tanh(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.tanh = function tanh(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.tanh();
      };
      AbstractMatrix3.prototype.trunc = function trunc() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.trunc(this.get(i, j)));
          }
        }
        return this;
      };
      AbstractMatrix3.trunc = function trunc(matrix2) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.trunc();
      };
      AbstractMatrix3.pow = function pow(matrix2, arg0) {
        const newMatrix = new Matrix4(matrix2);
        return newMatrix.pow(arg0);
      };
      AbstractMatrix3.prototype.pow = function pow(value) {
        if (typeof value === "number") return this.powS(value);
        return this.powM(value);
      };
      AbstractMatrix3.prototype.powS = function powS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) ** value);
          }
        }
        return this;
      };
      AbstractMatrix3.prototype.powM = function powM(matrix2) {
        matrix2 = Matrix4.checkMatrix(matrix2);
        if (this.rows !== matrix2.rows || this.columns !== matrix2.columns) {
          throw new RangeError("Matrices dimensions must be equal");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) ** matrix2.get(i, j));
          }
        }
        return this;
      };
    }
    function checkRowIndex(matrix2, index, outer) {
      let max3 = outer ? matrix2.rows : matrix2.rows - 1;
      if (index < 0 || index > max3) {
        throw new RangeError("Row index out of range");
      }
    }
    function checkColumnIndex(matrix2, index, outer) {
      let max3 = outer ? matrix2.columns : matrix2.columns - 1;
      if (index < 0 || index > max3) {
        throw new RangeError("Column index out of range");
      }
    }
    function checkRowVector(matrix2, vector) {
      if (vector.to1DArray) {
        vector = vector.to1DArray();
      }
      if (vector.length !== matrix2.columns) {
        throw new RangeError(
          "vector size must be the same as the number of columns"
        );
      }
      return vector;
    }
    function checkColumnVector(matrix2, vector) {
      if (vector.to1DArray) {
        vector = vector.to1DArray();
      }
      if (vector.length !== matrix2.rows) {
        throw new RangeError("vector size must be the same as the number of rows");
      }
      return vector;
    }
    function checkRowIndices(matrix2, rowIndices) {
      if (!isAnyArray(rowIndices)) {
        throw new TypeError("row indices must be an array");
      }
      for (let i = 0; i < rowIndices.length; i++) {
        if (rowIndices[i] < 0 || rowIndices[i] >= matrix2.rows) {
          throw new RangeError("row indices are out of range");
        }
      }
    }
    function checkColumnIndices(matrix2, columnIndices) {
      if (!isAnyArray(columnIndices)) {
        throw new TypeError("column indices must be an array");
      }
      for (let i = 0; i < columnIndices.length; i++) {
        if (columnIndices[i] < 0 || columnIndices[i] >= matrix2.columns) {
          throw new RangeError("column indices are out of range");
        }
      }
    }
    function checkRange(matrix2, startRow, endRow, startColumn, endColumn) {
      if (arguments.length !== 5) {
        throw new RangeError("expected 4 arguments");
      }
      checkNumber("startRow", startRow);
      checkNumber("endRow", endRow);
      checkNumber("startColumn", startColumn);
      checkNumber("endColumn", endColumn);
      if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix2.rows || endRow < 0 || endRow >= matrix2.rows || startColumn < 0 || startColumn >= matrix2.columns || endColumn < 0 || endColumn >= matrix2.columns) {
        throw new RangeError("Submatrix indices are out of range");
      }
    }
    function newArray(length, value = 0) {
      let array = [];
      for (let i = 0; i < length; i++) {
        array.push(value);
      }
      return array;
    }
    function checkNumber(name, value) {
      if (typeof value !== "number") {
        throw new TypeError(`${name} must be a number`);
      }
    }
    function checkNonEmpty(matrix2) {
      if (matrix2.isEmpty()) {
        throw new Error("Empty matrix has no elements to index");
      }
    }
    function sumByRow(matrix2) {
      let sum = newArray(matrix2.rows);
      for (let i = 0; i < matrix2.rows; ++i) {
        for (let j = 0; j < matrix2.columns; ++j) {
          sum[i] += matrix2.get(i, j);
        }
      }
      return sum;
    }
    function sumByColumn(matrix2) {
      let sum = newArray(matrix2.columns);
      for (let i = 0; i < matrix2.rows; ++i) {
        for (let j = 0; j < matrix2.columns; ++j) {
          sum[j] += matrix2.get(i, j);
        }
      }
      return sum;
    }
    function sumAll(matrix2) {
      let v = 0;
      for (let i = 0; i < matrix2.rows; i++) {
        for (let j = 0; j < matrix2.columns; j++) {
          v += matrix2.get(i, j);
        }
      }
      return v;
    }
    function productByRow(matrix2) {
      let sum = newArray(matrix2.rows, 1);
      for (let i = 0; i < matrix2.rows; ++i) {
        for (let j = 0; j < matrix2.columns; ++j) {
          sum[i] *= matrix2.get(i, j);
        }
      }
      return sum;
    }
    function productByColumn(matrix2) {
      let sum = newArray(matrix2.columns, 1);
      for (let i = 0; i < matrix2.rows; ++i) {
        for (let j = 0; j < matrix2.columns; ++j) {
          sum[j] *= matrix2.get(i, j);
        }
      }
      return sum;
    }
    function productAll(matrix2) {
      let v = 1;
      for (let i = 0; i < matrix2.rows; i++) {
        for (let j = 0; j < matrix2.columns; j++) {
          v *= matrix2.get(i, j);
        }
      }
      return v;
    }
    function varianceByRow(matrix2, unbiased, mean) {
      const rows = matrix2.rows;
      const cols = matrix2.columns;
      const variance = [];
      for (let i = 0; i < rows; i++) {
        let sum1 = 0;
        let sum2 = 0;
        let x = 0;
        for (let j = 0; j < cols; j++) {
          x = matrix2.get(i, j) - mean[i];
          sum1 += x;
          sum2 += x * x;
        }
        if (unbiased) {
          variance.push((sum2 - sum1 * sum1 / cols) / (cols - 1));
        } else {
          variance.push((sum2 - sum1 * sum1 / cols) / cols);
        }
      }
      return variance;
    }
    function varianceByColumn(matrix2, unbiased, mean) {
      const rows = matrix2.rows;
      const cols = matrix2.columns;
      const variance = [];
      for (let j = 0; j < cols; j++) {
        let sum1 = 0;
        let sum2 = 0;
        let x = 0;
        for (let i = 0; i < rows; i++) {
          x = matrix2.get(i, j) - mean[j];
          sum1 += x;
          sum2 += x * x;
        }
        if (unbiased) {
          variance.push((sum2 - sum1 * sum1 / rows) / (rows - 1));
        } else {
          variance.push((sum2 - sum1 * sum1 / rows) / rows);
        }
      }
      return variance;
    }
    function varianceAll(matrix2, unbiased, mean) {
      const rows = matrix2.rows;
      const cols = matrix2.columns;
      const size = rows * cols;
      let sum1 = 0;
      let sum2 = 0;
      let x = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          x = matrix2.get(i, j) - mean;
          sum1 += x;
          sum2 += x * x;
        }
      }
      if (unbiased) {
        return (sum2 - sum1 * sum1 / size) / (size - 1);
      } else {
        return (sum2 - sum1 * sum1 / size) / size;
      }
    }
    function centerByRow(matrix2, mean) {
      for (let i = 0; i < matrix2.rows; i++) {
        for (let j = 0; j < matrix2.columns; j++) {
          matrix2.set(i, j, matrix2.get(i, j) - mean[i]);
        }
      }
    }
    function centerByColumn(matrix2, mean) {
      for (let i = 0; i < matrix2.rows; i++) {
        for (let j = 0; j < matrix2.columns; j++) {
          matrix2.set(i, j, matrix2.get(i, j) - mean[j]);
        }
      }
    }
    function centerAll(matrix2, mean) {
      for (let i = 0; i < matrix2.rows; i++) {
        for (let j = 0; j < matrix2.columns; j++) {
          matrix2.set(i, j, matrix2.get(i, j) - mean);
        }
      }
    }
    function getScaleByRow(matrix2) {
      const scale = [];
      for (let i = 0; i < matrix2.rows; i++) {
        let sum = 0;
        for (let j = 0; j < matrix2.columns; j++) {
          sum += matrix2.get(i, j) ** 2 / (matrix2.columns - 1);
        }
        scale.push(Math.sqrt(sum));
      }
      return scale;
    }
    function scaleByRow(matrix2, scale) {
      for (let i = 0; i < matrix2.rows; i++) {
        for (let j = 0; j < matrix2.columns; j++) {
          matrix2.set(i, j, matrix2.get(i, j) / scale[i]);
        }
      }
    }
    function getScaleByColumn(matrix2) {
      const scale = [];
      for (let j = 0; j < matrix2.columns; j++) {
        let sum = 0;
        for (let i = 0; i < matrix2.rows; i++) {
          sum += matrix2.get(i, j) ** 2 / (matrix2.rows - 1);
        }
        scale.push(Math.sqrt(sum));
      }
      return scale;
    }
    function scaleByColumn(matrix2, scale) {
      for (let i = 0; i < matrix2.rows; i++) {
        for (let j = 0; j < matrix2.columns; j++) {
          matrix2.set(i, j, matrix2.get(i, j) / scale[j]);
        }
      }
    }
    function getScaleAll(matrix2) {
      const divider = matrix2.size - 1;
      let sum = 0;
      for (let j = 0; j < matrix2.columns; j++) {
        for (let i = 0; i < matrix2.rows; i++) {
          sum += matrix2.get(i, j) ** 2 / divider;
        }
      }
      return Math.sqrt(sum);
    }
    function scaleAll(matrix2, scale) {
      for (let i = 0; i < matrix2.rows; i++) {
        for (let j = 0; j < matrix2.columns; j++) {
          matrix2.set(i, j, matrix2.get(i, j) / scale);
        }
      }
    }
    var AbstractMatrix2 = class _AbstractMatrix {
      static from1DArray(newRows, newColumns, newData) {
        let length = newRows * newColumns;
        if (length !== newData.length) {
          throw new RangeError("data length does not match given dimensions");
        }
        let newMatrix = new Matrix3(newRows, newColumns);
        for (let row = 0; row < newRows; row++) {
          for (let column = 0; column < newColumns; column++) {
            newMatrix.set(row, column, newData[row * newColumns + column]);
          }
        }
        return newMatrix;
      }
      static rowVector(newData) {
        let vector = new Matrix3(1, newData.length);
        for (let i = 0; i < newData.length; i++) {
          vector.set(0, i, newData[i]);
        }
        return vector;
      }
      static columnVector(newData) {
        let vector = new Matrix3(newData.length, 1);
        for (let i = 0; i < newData.length; i++) {
          vector.set(i, 0, newData[i]);
        }
        return vector;
      }
      static zeros(rows, columns) {
        return new Matrix3(rows, columns);
      }
      static ones(rows, columns) {
        return new Matrix3(rows, columns).fill(1);
      }
      static rand(rows, columns, options = {}) {
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        const { random = Math.random } = options;
        let matrix2 = new Matrix3(rows, columns);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            matrix2.set(i, j, random());
          }
        }
        return matrix2;
      }
      static randInt(rows, columns, options = {}) {
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        const { min: min2 = 0, max: max3 = 1e3, random = Math.random } = options;
        if (!Number.isInteger(min2)) throw new TypeError("min must be an integer");
        if (!Number.isInteger(max3)) throw new TypeError("max must be an integer");
        if (min2 >= max3) throw new RangeError("min must be smaller than max");
        let interval = max3 - min2;
        let matrix2 = new Matrix3(rows, columns);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            let value = min2 + Math.round(random() * interval);
            matrix2.set(i, j, value);
          }
        }
        return matrix2;
      }
      static eye(rows, columns, value) {
        if (columns === void 0) columns = rows;
        if (value === void 0) value = 1;
        let min2 = Math.min(rows, columns);
        let matrix2 = this.zeros(rows, columns);
        for (let i = 0; i < min2; i++) {
          matrix2.set(i, i, value);
        }
        return matrix2;
      }
      static diag(data, rows, columns) {
        let l = data.length;
        if (rows === void 0) rows = l;
        if (columns === void 0) columns = rows;
        let min2 = Math.min(l, rows, columns);
        let matrix2 = this.zeros(rows, columns);
        for (let i = 0; i < min2; i++) {
          matrix2.set(i, i, data[i]);
        }
        return matrix2;
      }
      static min(matrix1, matrix2) {
        matrix1 = this.checkMatrix(matrix1);
        matrix2 = this.checkMatrix(matrix2);
        let rows = matrix1.rows;
        let columns = matrix1.columns;
        let result = new Matrix3(rows, columns);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
          }
        }
        return result;
      }
      static max(matrix1, matrix2) {
        matrix1 = this.checkMatrix(matrix1);
        matrix2 = this.checkMatrix(matrix2);
        let rows = matrix1.rows;
        let columns = matrix1.columns;
        let result = new this(rows, columns);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
          }
        }
        return result;
      }
      static checkMatrix(value) {
        return _AbstractMatrix.isMatrix(value) ? value : new Matrix3(value);
      }
      static isMatrix(value) {
        return value != null && value.klass === "Matrix";
      }
      get size() {
        return this.rows * this.columns;
      }
      apply(callback) {
        if (typeof callback !== "function") {
          throw new TypeError("callback must be a function");
        }
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            callback.call(this, i, j);
          }
        }
        return this;
      }
      to1DArray() {
        let array = [];
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            array.push(this.get(i, j));
          }
        }
        return array;
      }
      to2DArray() {
        let copy = [];
        for (let i = 0; i < this.rows; i++) {
          copy.push([]);
          for (let j = 0; j < this.columns; j++) {
            copy[i].push(this.get(i, j));
          }
        }
        return copy;
      }
      toJSON() {
        return this.to2DArray();
      }
      isRowVector() {
        return this.rows === 1;
      }
      isColumnVector() {
        return this.columns === 1;
      }
      isVector() {
        return this.rows === 1 || this.columns === 1;
      }
      isSquare() {
        return this.rows === this.columns;
      }
      isEmpty() {
        return this.rows === 0 || this.columns === 0;
      }
      isSymmetric() {
        if (this.isSquare()) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j <= i; j++) {
              if (this.get(i, j) !== this.get(j, i)) {
                return false;
              }
            }
          }
          return true;
        }
        return false;
      }
      isDistance() {
        if (!this.isSymmetric()) return false;
        for (let i = 0; i < this.rows; i++) {
          if (this.get(i, i) !== 0) return false;
        }
        return true;
      }
      isEchelonForm() {
        let i = 0;
        let j = 0;
        let previousColumn = -1;
        let isEchelonForm = true;
        let checked = false;
        while (i < this.rows && isEchelonForm) {
          j = 0;
          checked = false;
          while (j < this.columns && checked === false) {
            if (this.get(i, j) === 0) {
              j++;
            } else if (this.get(i, j) === 1 && j > previousColumn) {
              checked = true;
              previousColumn = j;
            } else {
              isEchelonForm = false;
              checked = true;
            }
          }
          i++;
        }
        return isEchelonForm;
      }
      isReducedEchelonForm() {
        let i = 0;
        let j = 0;
        let previousColumn = -1;
        let isReducedEchelonForm = true;
        let checked = false;
        while (i < this.rows && isReducedEchelonForm) {
          j = 0;
          checked = false;
          while (j < this.columns && checked === false) {
            if (this.get(i, j) === 0) {
              j++;
            } else if (this.get(i, j) === 1 && j > previousColumn) {
              checked = true;
              previousColumn = j;
            } else {
              isReducedEchelonForm = false;
              checked = true;
            }
          }
          for (let k = j + 1; k < this.rows; k++) {
            if (this.get(i, k) !== 0) {
              isReducedEchelonForm = false;
            }
          }
          i++;
        }
        return isReducedEchelonForm;
      }
      echelonForm() {
        let result = this.clone();
        let h = 0;
        let k = 0;
        while (h < result.rows && k < result.columns) {
          let iMax = h;
          for (let i = h; i < result.rows; i++) {
            if (result.get(i, k) > result.get(iMax, k)) {
              iMax = i;
            }
          }
          if (result.get(iMax, k) === 0) {
            k++;
          } else {
            result.swapRows(h, iMax);
            let tmp = result.get(h, k);
            for (let j = k; j < result.columns; j++) {
              result.set(h, j, result.get(h, j) / tmp);
            }
            for (let i = h + 1; i < result.rows; i++) {
              let factor = result.get(i, k) / result.get(h, k);
              result.set(i, k, 0);
              for (let j = k + 1; j < result.columns; j++) {
                result.set(i, j, result.get(i, j) - result.get(h, j) * factor);
              }
            }
            h++;
            k++;
          }
        }
        return result;
      }
      reducedEchelonForm() {
        let result = this.echelonForm();
        let m = result.columns;
        let n = result.rows;
        let h = n - 1;
        while (h >= 0) {
          if (result.maxRow(h) === 0) {
            h--;
          } else {
            let p = 0;
            let pivot = false;
            while (p < n && pivot === false) {
              if (result.get(h, p) === 1) {
                pivot = true;
              } else {
                p++;
              }
            }
            for (let i = 0; i < h; i++) {
              let factor = result.get(i, p);
              for (let j = p; j < m; j++) {
                let tmp = result.get(i, j) - factor * result.get(h, j);
                result.set(i, j, tmp);
              }
            }
            h--;
          }
        }
        return result;
      }
      set() {
        throw new Error("set method is unimplemented");
      }
      get() {
        throw new Error("get method is unimplemented");
      }
      repeat(options = {}) {
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        const { rows = 1, columns = 1 } = options;
        if (!Number.isInteger(rows) || rows <= 0) {
          throw new TypeError("rows must be a positive integer");
        }
        if (!Number.isInteger(columns) || columns <= 0) {
          throw new TypeError("columns must be a positive integer");
        }
        let matrix2 = new Matrix3(this.rows * rows, this.columns * columns);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            matrix2.setSubMatrix(this, this.rows * i, this.columns * j);
          }
        }
        return matrix2;
      }
      fill(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, value);
          }
        }
        return this;
      }
      neg() {
        return this.mulS(-1);
      }
      getRow(index) {
        checkRowIndex(this, index);
        let row = [];
        for (let i = 0; i < this.columns; i++) {
          row.push(this.get(index, i));
        }
        return row;
      }
      getRowVector(index) {
        return Matrix3.rowVector(this.getRow(index));
      }
      setRow(index, array) {
        checkRowIndex(this, index);
        array = checkRowVector(this, array);
        for (let i = 0; i < this.columns; i++) {
          this.set(index, i, array[i]);
        }
        return this;
      }
      swapRows(row1, row2) {
        checkRowIndex(this, row1);
        checkRowIndex(this, row2);
        for (let i = 0; i < this.columns; i++) {
          let temp = this.get(row1, i);
          this.set(row1, i, this.get(row2, i));
          this.set(row2, i, temp);
        }
        return this;
      }
      getColumn(index) {
        checkColumnIndex(this, index);
        let column = [];
        for (let i = 0; i < this.rows; i++) {
          column.push(this.get(i, index));
        }
        return column;
      }
      getColumnVector(index) {
        return Matrix3.columnVector(this.getColumn(index));
      }
      setColumn(index, array) {
        checkColumnIndex(this, index);
        array = checkColumnVector(this, array);
        for (let i = 0; i < this.rows; i++) {
          this.set(i, index, array[i]);
        }
        return this;
      }
      swapColumns(column1, column2) {
        checkColumnIndex(this, column1);
        checkColumnIndex(this, column2);
        for (let i = 0; i < this.rows; i++) {
          let temp = this.get(i, column1);
          this.set(i, column1, this.get(i, column2));
          this.set(i, column2, temp);
        }
        return this;
      }
      addRowVector(vector) {
        vector = checkRowVector(this, vector);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) + vector[j]);
          }
        }
        return this;
      }
      subRowVector(vector) {
        vector = checkRowVector(this, vector);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) - vector[j]);
          }
        }
        return this;
      }
      mulRowVector(vector) {
        vector = checkRowVector(this, vector);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) * vector[j]);
          }
        }
        return this;
      }
      divRowVector(vector) {
        vector = checkRowVector(this, vector);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) / vector[j]);
          }
        }
        return this;
      }
      addColumnVector(vector) {
        vector = checkColumnVector(this, vector);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) + vector[i]);
          }
        }
        return this;
      }
      subColumnVector(vector) {
        vector = checkColumnVector(this, vector);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) - vector[i]);
          }
        }
        return this;
      }
      mulColumnVector(vector) {
        vector = checkColumnVector(this, vector);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) * vector[i]);
          }
        }
        return this;
      }
      divColumnVector(vector) {
        vector = checkColumnVector(this, vector);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) / vector[i]);
          }
        }
        return this;
      }
      mulRow(index, value) {
        checkRowIndex(this, index);
        for (let i = 0; i < this.columns; i++) {
          this.set(index, i, this.get(index, i) * value);
        }
        return this;
      }
      mulColumn(index, value) {
        checkColumnIndex(this, index);
        for (let i = 0; i < this.rows; i++) {
          this.set(i, index, this.get(i, index) * value);
        }
        return this;
      }
      max(by) {
        if (this.isEmpty()) {
          return NaN;
        }
        switch (by) {
          case "row": {
            const max3 = new Array(this.rows).fill(Number.NEGATIVE_INFINITY);
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                if (this.get(row, column) > max3[row]) {
                  max3[row] = this.get(row, column);
                }
              }
            }
            return max3;
          }
          case "column": {
            const max3 = new Array(this.columns).fill(Number.NEGATIVE_INFINITY);
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                if (this.get(row, column) > max3[column]) {
                  max3[column] = this.get(row, column);
                }
              }
            }
            return max3;
          }
          case void 0: {
            let max3 = this.get(0, 0);
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                if (this.get(row, column) > max3) {
                  max3 = this.get(row, column);
                }
              }
            }
            return max3;
          }
          default:
            throw new Error(`invalid option: ${by}`);
        }
      }
      maxIndex() {
        checkNonEmpty(this);
        let v = this.get(0, 0);
        let idx = [0, 0];
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            if (this.get(i, j) > v) {
              v = this.get(i, j);
              idx[0] = i;
              idx[1] = j;
            }
          }
        }
        return idx;
      }
      min(by) {
        if (this.isEmpty()) {
          return NaN;
        }
        switch (by) {
          case "row": {
            const min2 = new Array(this.rows).fill(Number.POSITIVE_INFINITY);
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                if (this.get(row, column) < min2[row]) {
                  min2[row] = this.get(row, column);
                }
              }
            }
            return min2;
          }
          case "column": {
            const min2 = new Array(this.columns).fill(Number.POSITIVE_INFINITY);
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                if (this.get(row, column) < min2[column]) {
                  min2[column] = this.get(row, column);
                }
              }
            }
            return min2;
          }
          case void 0: {
            let min2 = this.get(0, 0);
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                if (this.get(row, column) < min2) {
                  min2 = this.get(row, column);
                }
              }
            }
            return min2;
          }
          default:
            throw new Error(`invalid option: ${by}`);
        }
      }
      minIndex() {
        checkNonEmpty(this);
        let v = this.get(0, 0);
        let idx = [0, 0];
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            if (this.get(i, j) < v) {
              v = this.get(i, j);
              idx[0] = i;
              idx[1] = j;
            }
          }
        }
        return idx;
      }
      maxRow(row) {
        checkRowIndex(this, row);
        if (this.isEmpty()) {
          return NaN;
        }
        let v = this.get(row, 0);
        for (let i = 1; i < this.columns; i++) {
          if (this.get(row, i) > v) {
            v = this.get(row, i);
          }
        }
        return v;
      }
      maxRowIndex(row) {
        checkRowIndex(this, row);
        checkNonEmpty(this);
        let v = this.get(row, 0);
        let idx = [row, 0];
        for (let i = 1; i < this.columns; i++) {
          if (this.get(row, i) > v) {
            v = this.get(row, i);
            idx[1] = i;
          }
        }
        return idx;
      }
      minRow(row) {
        checkRowIndex(this, row);
        if (this.isEmpty()) {
          return NaN;
        }
        let v = this.get(row, 0);
        for (let i = 1; i < this.columns; i++) {
          if (this.get(row, i) < v) {
            v = this.get(row, i);
          }
        }
        return v;
      }
      minRowIndex(row) {
        checkRowIndex(this, row);
        checkNonEmpty(this);
        let v = this.get(row, 0);
        let idx = [row, 0];
        for (let i = 1; i < this.columns; i++) {
          if (this.get(row, i) < v) {
            v = this.get(row, i);
            idx[1] = i;
          }
        }
        return idx;
      }
      maxColumn(column) {
        checkColumnIndex(this, column);
        if (this.isEmpty()) {
          return NaN;
        }
        let v = this.get(0, column);
        for (let i = 1; i < this.rows; i++) {
          if (this.get(i, column) > v) {
            v = this.get(i, column);
          }
        }
        return v;
      }
      maxColumnIndex(column) {
        checkColumnIndex(this, column);
        checkNonEmpty(this);
        let v = this.get(0, column);
        let idx = [0, column];
        for (let i = 1; i < this.rows; i++) {
          if (this.get(i, column) > v) {
            v = this.get(i, column);
            idx[0] = i;
          }
        }
        return idx;
      }
      minColumn(column) {
        checkColumnIndex(this, column);
        if (this.isEmpty()) {
          return NaN;
        }
        let v = this.get(0, column);
        for (let i = 1; i < this.rows; i++) {
          if (this.get(i, column) < v) {
            v = this.get(i, column);
          }
        }
        return v;
      }
      minColumnIndex(column) {
        checkColumnIndex(this, column);
        checkNonEmpty(this);
        let v = this.get(0, column);
        let idx = [0, column];
        for (let i = 1; i < this.rows; i++) {
          if (this.get(i, column) < v) {
            v = this.get(i, column);
            idx[0] = i;
          }
        }
        return idx;
      }
      diag() {
        let min2 = Math.min(this.rows, this.columns);
        let diag = [];
        for (let i = 0; i < min2; i++) {
          diag.push(this.get(i, i));
        }
        return diag;
      }
      norm(type = "frobenius") {
        switch (type) {
          case "max":
            return this.max();
          case "frobenius":
            return Math.sqrt(this.dot(this));
          default:
            throw new RangeError(`unknown norm type: ${type}`);
        }
      }
      cumulativeSum() {
        let sum = 0;
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            sum += this.get(i, j);
            this.set(i, j, sum);
          }
        }
        return this;
      }
      dot(vector2) {
        if (_AbstractMatrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
        let vector1 = this.to1DArray();
        if (vector1.length !== vector2.length) {
          throw new RangeError("vectors do not have the same size");
        }
        let dot = 0;
        for (let i = 0; i < vector1.length; i++) {
          dot += vector1[i] * vector2[i];
        }
        return dot;
      }
      mmul(other) {
        other = Matrix3.checkMatrix(other);
        let m = this.rows;
        let n = this.columns;
        let p = other.columns;
        let result = new Matrix3(m, p);
        let Bcolj = new Float64Array(n);
        for (let j = 0; j < p; j++) {
          for (let k = 0; k < n; k++) {
            Bcolj[k] = other.get(k, j);
          }
          for (let i = 0; i < m; i++) {
            let s = 0;
            for (let k = 0; k < n; k++) {
              s += this.get(i, k) * Bcolj[k];
            }
            result.set(i, j, s);
          }
        }
        return result;
      }
      mpow(scalar) {
        if (!this.isSquare()) {
          throw new RangeError("Matrix must be square");
        }
        if (!Number.isInteger(scalar) || scalar < 0) {
          throw new RangeError("Exponent must be a non-negative integer");
        }
        let result = Matrix3.eye(this.rows);
        let bb = this;
        for (let e = scalar; e >= 1; e /= 2) {
          if ((e & 1) !== 0) {
            result = result.mmul(bb);
          }
          bb = bb.mmul(bb);
        }
        return result;
      }
      strassen2x2(other) {
        other = Matrix3.checkMatrix(other);
        let result = new Matrix3(2, 2);
        const a11 = this.get(0, 0);
        const b11 = other.get(0, 0);
        const a12 = this.get(0, 1);
        const b12 = other.get(0, 1);
        const a21 = this.get(1, 0);
        const b21 = other.get(1, 0);
        const a22 = this.get(1, 1);
        const b22 = other.get(1, 1);
        const m1 = (a11 + a22) * (b11 + b22);
        const m2 = (a21 + a22) * b11;
        const m3 = a11 * (b12 - b22);
        const m4 = a22 * (b21 - b11);
        const m5 = (a11 + a12) * b22;
        const m6 = (a21 - a11) * (b11 + b12);
        const m7 = (a12 - a22) * (b21 + b22);
        const c00 = m1 + m4 - m5 + m7;
        const c01 = m3 + m5;
        const c10 = m2 + m4;
        const c11 = m1 - m2 + m3 + m6;
        result.set(0, 0, c00);
        result.set(0, 1, c01);
        result.set(1, 0, c10);
        result.set(1, 1, c11);
        return result;
      }
      strassen3x3(other) {
        other = Matrix3.checkMatrix(other);
        let result = new Matrix3(3, 3);
        const a00 = this.get(0, 0);
        const a01 = this.get(0, 1);
        const a02 = this.get(0, 2);
        const a10 = this.get(1, 0);
        const a11 = this.get(1, 1);
        const a12 = this.get(1, 2);
        const a20 = this.get(2, 0);
        const a21 = this.get(2, 1);
        const a22 = this.get(2, 2);
        const b00 = other.get(0, 0);
        const b01 = other.get(0, 1);
        const b02 = other.get(0, 2);
        const b10 = other.get(1, 0);
        const b11 = other.get(1, 1);
        const b12 = other.get(1, 2);
        const b20 = other.get(2, 0);
        const b21 = other.get(2, 1);
        const b22 = other.get(2, 2);
        const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
        const m2 = (a00 - a10) * (-b01 + b11);
        const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
        const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
        const m5 = (a10 + a11) * (-b00 + b01);
        const m6 = a00 * b00;
        const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
        const m8 = (-a00 + a20) * (b02 - b12);
        const m9 = (a20 + a21) * (-b00 + b02);
        const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
        const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
        const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
        const m13 = (a02 - a22) * (b11 - b21);
        const m14 = a02 * b20;
        const m15 = (a21 + a22) * (-b20 + b21);
        const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
        const m17 = (a02 - a12) * (b12 - b22);
        const m18 = (a11 + a12) * (-b20 + b22);
        const m19 = a01 * b10;
        const m20 = a12 * b21;
        const m21 = a10 * b02;
        const m22 = a20 * b01;
        const m23 = a22 * b22;
        const c00 = m6 + m14 + m19;
        const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
        const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
        const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
        const c11 = m2 + m4 + m5 + m6 + m20;
        const c12 = m14 + m16 + m17 + m18 + m21;
        const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
        const c21 = m12 + m13 + m14 + m15 + m22;
        const c22 = m6 + m7 + m8 + m9 + m23;
        result.set(0, 0, c00);
        result.set(0, 1, c01);
        result.set(0, 2, c02);
        result.set(1, 0, c10);
        result.set(1, 1, c11);
        result.set(1, 2, c12);
        result.set(2, 0, c20);
        result.set(2, 1, c21);
        result.set(2, 2, c22);
        return result;
      }
      mmulStrassen(y) {
        y = Matrix3.checkMatrix(y);
        let x = this.clone();
        let r1 = x.rows;
        let c1 = x.columns;
        let r2 = y.rows;
        let c2 = y.columns;
        if (c1 !== r2) {
          console.warn(
            `Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`
          );
        }
        function embed(mat2, rows, cols) {
          let r3 = mat2.rows;
          let c3 = mat2.columns;
          if (r3 === rows && c3 === cols) {
            return mat2;
          } else {
            let resultat = _AbstractMatrix.zeros(rows, cols);
            resultat = resultat.setSubMatrix(mat2, 0, 0);
            return resultat;
          }
        }
        let r = Math.max(r1, r2);
        let c = Math.max(c1, c2);
        x = embed(x, r, c);
        y = embed(y, r, c);
        function blockMult(a, b, rows, cols) {
          if (rows <= 512 || cols <= 512) {
            return a.mmul(b);
          }
          if (rows % 2 === 1 && cols % 2 === 1) {
            a = embed(a, rows + 1, cols + 1);
            b = embed(b, rows + 1, cols + 1);
          } else if (rows % 2 === 1) {
            a = embed(a, rows + 1, cols);
            b = embed(b, rows + 1, cols);
          } else if (cols % 2 === 1) {
            a = embed(a, rows, cols + 1);
            b = embed(b, rows, cols + 1);
          }
          let halfRows = parseInt(a.rows / 2, 10);
          let halfCols = parseInt(a.columns / 2, 10);
          let a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
          let b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
          let a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
          let b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
          let a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
          let b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
          let a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
          let b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1);
          let m1 = blockMult(
            _AbstractMatrix.add(a11, a22),
            _AbstractMatrix.add(b11, b22),
            halfRows,
            halfCols
          );
          let m2 = blockMult(_AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
          let m3 = blockMult(a11, _AbstractMatrix.sub(b12, b22), halfRows, halfCols);
          let m4 = blockMult(a22, _AbstractMatrix.sub(b21, b11), halfRows, halfCols);
          let m5 = blockMult(_AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
          let m6 = blockMult(
            _AbstractMatrix.sub(a21, a11),
            _AbstractMatrix.add(b11, b12),
            halfRows,
            halfCols
          );
          let m7 = blockMult(
            _AbstractMatrix.sub(a12, a22),
            _AbstractMatrix.add(b21, b22),
            halfRows,
            halfCols
          );
          let c11 = _AbstractMatrix.add(m1, m4);
          c11.sub(m5);
          c11.add(m7);
          let c12 = _AbstractMatrix.add(m3, m5);
          let c21 = _AbstractMatrix.add(m2, m4);
          let c22 = _AbstractMatrix.sub(m1, m2);
          c22.add(m3);
          c22.add(m6);
          let result = _AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
          result = result.setSubMatrix(c11, 0, 0);
          result = result.setSubMatrix(c12, c11.rows, 0);
          result = result.setSubMatrix(c21, 0, c11.columns);
          result = result.setSubMatrix(c22, c11.rows, c11.columns);
          return result.subMatrix(0, rows - 1, 0, cols - 1);
        }
        return blockMult(x, y, r, c);
      }
      scaleRows(options = {}) {
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        const { min: min2 = 0, max: max3 = 1 } = options;
        if (!Number.isFinite(min2)) throw new TypeError("min must be a number");
        if (!Number.isFinite(max3)) throw new TypeError("max must be a number");
        if (min2 >= max3) throw new RangeError("min must be smaller than max");
        let newMatrix = new Matrix3(this.rows, this.columns);
        for (let i = 0; i < this.rows; i++) {
          const row = this.getRow(i);
          if (row.length > 0) {
            rescale(row, { min: min2, max: max3, output: row });
          }
          newMatrix.setRow(i, row);
        }
        return newMatrix;
      }
      scaleColumns(options = {}) {
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        const { min: min2 = 0, max: max3 = 1 } = options;
        if (!Number.isFinite(min2)) throw new TypeError("min must be a number");
        if (!Number.isFinite(max3)) throw new TypeError("max must be a number");
        if (min2 >= max3) throw new RangeError("min must be smaller than max");
        let newMatrix = new Matrix3(this.rows, this.columns);
        for (let i = 0; i < this.columns; i++) {
          const column = this.getColumn(i);
          if (column.length) {
            rescale(column, {
              min: min2,
              max: max3,
              output: column
            });
          }
          newMatrix.setColumn(i, column);
        }
        return newMatrix;
      }
      flipRows() {
        const middle = Math.ceil(this.columns / 2);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < middle; j++) {
            let first = this.get(i, j);
            let last = this.get(i, this.columns - 1 - j);
            this.set(i, j, last);
            this.set(i, this.columns - 1 - j, first);
          }
        }
        return this;
      }
      flipColumns() {
        const middle = Math.ceil(this.rows / 2);
        for (let j = 0; j < this.columns; j++) {
          for (let i = 0; i < middle; i++) {
            let first = this.get(i, j);
            let last = this.get(this.rows - 1 - i, j);
            this.set(i, j, last);
            this.set(this.rows - 1 - i, j, first);
          }
        }
        return this;
      }
      kroneckerProduct(other) {
        other = Matrix3.checkMatrix(other);
        let m = this.rows;
        let n = this.columns;
        let p = other.rows;
        let q = other.columns;
        let result = new Matrix3(m * p, n * q);
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
            for (let k = 0; k < p; k++) {
              for (let l = 0; l < q; l++) {
                result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
              }
            }
          }
        }
        return result;
      }
      kroneckerSum(other) {
        other = Matrix3.checkMatrix(other);
        if (!this.isSquare() || !other.isSquare()) {
          throw new Error("Kronecker Sum needs two Square Matrices");
        }
        let m = this.rows;
        let n = other.rows;
        let AxI = this.kroneckerProduct(Matrix3.eye(n, n));
        let IxB = Matrix3.eye(m, m).kroneckerProduct(other);
        return AxI.add(IxB);
      }
      transpose() {
        let result = new Matrix3(this.columns, this.rows);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            result.set(j, i, this.get(i, j));
          }
        }
        return result;
      }
      sortRows(compareFunction = compareNumbers) {
        for (let i = 0; i < this.rows; i++) {
          this.setRow(i, this.getRow(i).sort(compareFunction));
        }
        return this;
      }
      sortColumns(compareFunction = compareNumbers) {
        for (let i = 0; i < this.columns; i++) {
          this.setColumn(i, this.getColumn(i).sort(compareFunction));
        }
        return this;
      }
      subMatrix(startRow, endRow, startColumn, endColumn) {
        checkRange(this, startRow, endRow, startColumn, endColumn);
        let newMatrix = new Matrix3(
          endRow - startRow + 1,
          endColumn - startColumn + 1
        );
        for (let i = startRow; i <= endRow; i++) {
          for (let j = startColumn; j <= endColumn; j++) {
            newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
          }
        }
        return newMatrix;
      }
      subMatrixRow(indices, startColumn, endColumn) {
        if (startColumn === void 0) startColumn = 0;
        if (endColumn === void 0) endColumn = this.columns - 1;
        if (startColumn > endColumn || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
          throw new RangeError("Argument out of range");
        }
        let newMatrix = new Matrix3(indices.length, endColumn - startColumn + 1);
        for (let i = 0; i < indices.length; i++) {
          for (let j = startColumn; j <= endColumn; j++) {
            if (indices[i] < 0 || indices[i] >= this.rows) {
              throw new RangeError(`Row index out of range: ${indices[i]}`);
            }
            newMatrix.set(i, j - startColumn, this.get(indices[i], j));
          }
        }
        return newMatrix;
      }
      subMatrixColumn(indices, startRow, endRow) {
        if (startRow === void 0) startRow = 0;
        if (endRow === void 0) endRow = this.rows - 1;
        if (startRow > endRow || startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows) {
          throw new RangeError("Argument out of range");
        }
        let newMatrix = new Matrix3(endRow - startRow + 1, indices.length);
        for (let i = 0; i < indices.length; i++) {
          for (let j = startRow; j <= endRow; j++) {
            if (indices[i] < 0 || indices[i] >= this.columns) {
              throw new RangeError(`Column index out of range: ${indices[i]}`);
            }
            newMatrix.set(j - startRow, i, this.get(j, indices[i]));
          }
        }
        return newMatrix;
      }
      setSubMatrix(matrix2, startRow, startColumn) {
        matrix2 = Matrix3.checkMatrix(matrix2);
        if (matrix2.isEmpty()) {
          return this;
        }
        let endRow = startRow + matrix2.rows - 1;
        let endColumn = startColumn + matrix2.columns - 1;
        checkRange(this, startRow, endRow, startColumn, endColumn);
        for (let i = 0; i < matrix2.rows; i++) {
          for (let j = 0; j < matrix2.columns; j++) {
            this.set(startRow + i, startColumn + j, matrix2.get(i, j));
          }
        }
        return this;
      }
      selection(rowIndices, columnIndices) {
        checkRowIndices(this, rowIndices);
        checkColumnIndices(this, columnIndices);
        let newMatrix = new Matrix3(rowIndices.length, columnIndices.length);
        for (let i = 0; i < rowIndices.length; i++) {
          let rowIndex = rowIndices[i];
          for (let j = 0; j < columnIndices.length; j++) {
            let columnIndex = columnIndices[j];
            newMatrix.set(i, j, this.get(rowIndex, columnIndex));
          }
        }
        return newMatrix;
      }
      trace() {
        let min2 = Math.min(this.rows, this.columns);
        let trace = 0;
        for (let i = 0; i < min2; i++) {
          trace += this.get(i, i);
        }
        return trace;
      }
      clone() {
        return this.constructor.copy(this, new Matrix3(this.rows, this.columns));
      }
      /**
       * @template {AbstractMatrix} M
       * @param {AbstractMatrix} from
       * @param {M} to
       * @return {M}
       */
      static copy(from, to) {
        for (const [row, column, value] of from.entries()) {
          to.set(row, column, value);
        }
        return to;
      }
      sum(by) {
        switch (by) {
          case "row":
            return sumByRow(this);
          case "column":
            return sumByColumn(this);
          case void 0:
            return sumAll(this);
          default:
            throw new Error(`invalid option: ${by}`);
        }
      }
      product(by) {
        switch (by) {
          case "row":
            return productByRow(this);
          case "column":
            return productByColumn(this);
          case void 0:
            return productAll(this);
          default:
            throw new Error(`invalid option: ${by}`);
        }
      }
      mean(by) {
        const sum = this.sum(by);
        switch (by) {
          case "row": {
            for (let i = 0; i < this.rows; i++) {
              sum[i] /= this.columns;
            }
            return sum;
          }
          case "column": {
            for (let i = 0; i < this.columns; i++) {
              sum[i] /= this.rows;
            }
            return sum;
          }
          case void 0:
            return sum / this.size;
          default:
            throw new Error(`invalid option: ${by}`);
        }
      }
      variance(by, options = {}) {
        if (typeof by === "object") {
          options = by;
          by = void 0;
        }
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        const { unbiased = true, mean = this.mean(by) } = options;
        if (typeof unbiased !== "boolean") {
          throw new TypeError("unbiased must be a boolean");
        }
        switch (by) {
          case "row": {
            if (!isAnyArray(mean)) {
              throw new TypeError("mean must be an array");
            }
            return varianceByRow(this, unbiased, mean);
          }
          case "column": {
            if (!isAnyArray(mean)) {
              throw new TypeError("mean must be an array");
            }
            return varianceByColumn(this, unbiased, mean);
          }
          case void 0: {
            if (typeof mean !== "number") {
              throw new TypeError("mean must be a number");
            }
            return varianceAll(this, unbiased, mean);
          }
          default:
            throw new Error(`invalid option: ${by}`);
        }
      }
      standardDeviation(by, options) {
        if (typeof by === "object") {
          options = by;
          by = void 0;
        }
        const variance = this.variance(by, options);
        if (by === void 0) {
          return Math.sqrt(variance);
        } else {
          for (let i = 0; i < variance.length; i++) {
            variance[i] = Math.sqrt(variance[i]);
          }
          return variance;
        }
      }
      center(by, options = {}) {
        if (typeof by === "object") {
          options = by;
          by = void 0;
        }
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        const { center = this.mean(by) } = options;
        switch (by) {
          case "row": {
            if (!isAnyArray(center)) {
              throw new TypeError("center must be an array");
            }
            centerByRow(this, center);
            return this;
          }
          case "column": {
            if (!isAnyArray(center)) {
              throw new TypeError("center must be an array");
            }
            centerByColumn(this, center);
            return this;
          }
          case void 0: {
            if (typeof center !== "number") {
              throw new TypeError("center must be a number");
            }
            centerAll(this, center);
            return this;
          }
          default:
            throw new Error(`invalid option: ${by}`);
        }
      }
      scale(by, options = {}) {
        if (typeof by === "object") {
          options = by;
          by = void 0;
        }
        if (typeof options !== "object") {
          throw new TypeError("options must be an object");
        }
        let scale = options.scale;
        switch (by) {
          case "row": {
            if (scale === void 0) {
              scale = getScaleByRow(this);
            } else if (!isAnyArray(scale)) {
              throw new TypeError("scale must be an array");
            }
            scaleByRow(this, scale);
            return this;
          }
          case "column": {
            if (scale === void 0) {
              scale = getScaleByColumn(this);
            } else if (!isAnyArray(scale)) {
              throw new TypeError("scale must be an array");
            }
            scaleByColumn(this, scale);
            return this;
          }
          case void 0: {
            if (scale === void 0) {
              scale = getScaleAll(this);
            } else if (typeof scale !== "number") {
              throw new TypeError("scale must be a number");
            }
            scaleAll(this, scale);
            return this;
          }
          default:
            throw new Error(`invalid option: ${by}`);
        }
      }
      toString(options) {
        return inspectMatrixWithOptions(this, options);
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * iterator from left to right, from top to bottom
       * yield [row, column, value]
       * @returns {Generator<[number, number, number], void, void>}
       */
      *entries() {
        for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.columns; col++) {
            yield [row, col, this.get(row, col)];
          }
        }
      }
      /**
       * iterator from left to right, from top to bottom
       * yield value
       * @returns {Generator<number, void, void>}
       */
      *values() {
        for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.columns; col++) {
            yield this.get(row, col);
          }
        }
      }
    };
    AbstractMatrix2.prototype.klass = "Matrix";
    if (typeof Symbol !== "undefined") {
      AbstractMatrix2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = inspectMatrix;
    }
    function compareNumbers(a, b) {
      return a - b;
    }
    function isArrayOfNumbers(array) {
      return array.every((element) => {
        return typeof element === "number";
      });
    }
    AbstractMatrix2.random = AbstractMatrix2.rand;
    AbstractMatrix2.randomInt = AbstractMatrix2.randInt;
    AbstractMatrix2.diagonal = AbstractMatrix2.diag;
    AbstractMatrix2.prototype.diagonal = AbstractMatrix2.prototype.diag;
    AbstractMatrix2.identity = AbstractMatrix2.eye;
    AbstractMatrix2.prototype.negate = AbstractMatrix2.prototype.neg;
    AbstractMatrix2.prototype.tensorProduct = AbstractMatrix2.prototype.kroneckerProduct;
    var Matrix3 = class _Matrix extends AbstractMatrix2 {
      /**
       * @type {Float64Array[]}
       */
      data;
      /**
       * Init an empty matrix
       * @param {number} nRows
       * @param {number} nColumns
       */
      #initData(nRows, nColumns) {
        this.data = [];
        if (Number.isInteger(nColumns) && nColumns >= 0) {
          for (let i = 0; i < nRows; i++) {
            this.data.push(new Float64Array(nColumns));
          }
        } else {
          throw new TypeError("nColumns must be a positive integer");
        }
        this.rows = nRows;
        this.columns = nColumns;
      }
      constructor(nRows, nColumns) {
        super();
        if (_Matrix.isMatrix(nRows)) {
          this.#initData(nRows.rows, nRows.columns);
          _Matrix.copy(nRows, this);
        } else if (Number.isInteger(nRows) && nRows >= 0) {
          this.#initData(nRows, nColumns);
        } else if (isAnyArray(nRows)) {
          const arrayData = nRows;
          nRows = arrayData.length;
          nColumns = nRows ? arrayData[0].length : 0;
          if (typeof nColumns !== "number") {
            throw new TypeError(
              "Data must be a 2D array with at least one element"
            );
          }
          this.data = [];
          for (let i = 0; i < nRows; i++) {
            if (arrayData[i].length !== nColumns) {
              throw new RangeError("Inconsistent array dimensions");
            }
            if (!isArrayOfNumbers(arrayData[i])) {
              throw new TypeError("Input data contains non-numeric values");
            }
            this.data.push(Float64Array.from(arrayData[i]));
          }
          this.rows = nRows;
          this.columns = nColumns;
        } else {
          throw new TypeError(
            "First argument must be a positive number or an array"
          );
        }
      }
      set(rowIndex, columnIndex, value) {
        this.data[rowIndex][columnIndex] = value;
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.data[rowIndex][columnIndex];
      }
      removeRow(index) {
        checkRowIndex(this, index);
        this.data.splice(index, 1);
        this.rows -= 1;
        return this;
      }
      addRow(index, array) {
        if (array === void 0) {
          array = index;
          index = this.rows;
        }
        checkRowIndex(this, index, true);
        array = Float64Array.from(checkRowVector(this, array));
        this.data.splice(index, 0, array);
        this.rows += 1;
        return this;
      }
      removeColumn(index) {
        checkColumnIndex(this, index);
        for (let i = 0; i < this.rows; i++) {
          const newRow = new Float64Array(this.columns - 1);
          for (let j = 0; j < index; j++) {
            newRow[j] = this.data[i][j];
          }
          for (let j = index + 1; j < this.columns; j++) {
            newRow[j - 1] = this.data[i][j];
          }
          this.data[i] = newRow;
        }
        this.columns -= 1;
        return this;
      }
      addColumn(index, array) {
        if (typeof array === "undefined") {
          array = index;
          index = this.columns;
        }
        checkColumnIndex(this, index, true);
        array = checkColumnVector(this, array);
        for (let i = 0; i < this.rows; i++) {
          const newRow = new Float64Array(this.columns + 1);
          let j = 0;
          for (; j < index; j++) {
            newRow[j] = this.data[i][j];
          }
          newRow[j++] = array[i];
          for (; j < this.columns + 1; j++) {
            newRow[j] = this.data[i][j - 1];
          }
          this.data[i] = newRow;
        }
        this.columns += 1;
        return this;
      }
    };
    installMathOperations(AbstractMatrix2, Matrix3);
    var SymmetricMatrix2 = class _SymmetricMatrix extends AbstractMatrix2 {
      /** @type {Matrix} */
      #matrix;
      get size() {
        return this.#matrix.size;
      }
      get rows() {
        return this.#matrix.rows;
      }
      get columns() {
        return this.#matrix.columns;
      }
      get diagonalSize() {
        return this.rows;
      }
      /**
       * not the same as matrix.isSymmetric()
       * Here is to check if it's instanceof SymmetricMatrix without bundling issues
       *
       * @param value
       * @returns {boolean}
       */
      static isSymmetricMatrix(value) {
        return Matrix3.isMatrix(value) && value.klassType === "SymmetricMatrix";
      }
      /**
       * @param diagonalSize
       * @return {SymmetricMatrix}
       */
      static zeros(diagonalSize) {
        return new this(diagonalSize);
      }
      /**
       * @param diagonalSize
       * @return {SymmetricMatrix}
       */
      static ones(diagonalSize) {
        return new this(diagonalSize).fill(1);
      }
      /**
       * @param {number | AbstractMatrix | ArrayLike<ArrayLike<number>>} diagonalSize
       * @return {this}
       */
      constructor(diagonalSize) {
        super();
        if (Matrix3.isMatrix(diagonalSize)) {
          if (!diagonalSize.isSymmetric()) {
            throw new TypeError("not symmetric data");
          }
          this.#matrix = Matrix3.copy(
            diagonalSize,
            new Matrix3(diagonalSize.rows, diagonalSize.rows)
          );
        } else if (Number.isInteger(diagonalSize) && diagonalSize >= 0) {
          this.#matrix = new Matrix3(diagonalSize, diagonalSize);
        } else {
          this.#matrix = new Matrix3(diagonalSize);
          if (!this.isSymmetric()) {
            throw new TypeError("not symmetric data");
          }
        }
      }
      clone() {
        const matrix2 = new _SymmetricMatrix(this.diagonalSize);
        for (const [row, col, value] of this.upperRightEntries()) {
          matrix2.set(row, col, value);
        }
        return matrix2;
      }
      toMatrix() {
        return new Matrix3(this);
      }
      get(rowIndex, columnIndex) {
        return this.#matrix.get(rowIndex, columnIndex);
      }
      set(rowIndex, columnIndex, value) {
        this.#matrix.set(rowIndex, columnIndex, value);
        this.#matrix.set(columnIndex, rowIndex, value);
        return this;
      }
      removeCross(index) {
        this.#matrix.removeRow(index);
        this.#matrix.removeColumn(index);
        return this;
      }
      addCross(index, array) {
        if (array === void 0) {
          array = index;
          index = this.diagonalSize;
        }
        const row = array.slice();
        row.splice(index, 1);
        this.#matrix.addRow(index, row);
        this.#matrix.addColumn(index, array);
        return this;
      }
      /**
       * @param {Mask[]} mask
       */
      applyMask(mask) {
        if (mask.length !== this.diagonalSize) {
          throw new RangeError("Mask size do not match with matrix size");
        }
        const sidesToRemove = [];
        for (const [index, passthroughs] of mask.entries()) {
          if (passthroughs) continue;
          sidesToRemove.push(index);
        }
        sidesToRemove.reverse();
        for (const sideIndex of sidesToRemove) {
          this.removeCross(sideIndex);
        }
        return this;
      }
      /**
       * Compact format upper-right corner of matrix
       * iterate from left to right, from top to bottom.
       *
       * ```
       *   A B C D
       * A 1 2 3 4
       * B 2 5 6 7
       * C 3 6 8 9
       * D 4 7 9 10
       * ```
       *
       * will return compact 1D array `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
       *
       * length is S(i=0, n=sideSize) => 10 for a 4 sideSized matrix
       *
       * @returns {number[]}
       */
      toCompact() {
        const { diagonalSize } = this;
        const compact = new Array(diagonalSize * (diagonalSize + 1) / 2);
        for (let col = 0, row = 0, index = 0; index < compact.length; index++) {
          compact[index] = this.get(row, col);
          if (++col >= diagonalSize) col = ++row;
        }
        return compact;
      }
      /**
       * @param {number[]} compact
       * @return {SymmetricMatrix}
       */
      static fromCompact(compact) {
        const compactSize = compact.length;
        const diagonalSize = (Math.sqrt(8 * compactSize + 1) - 1) / 2;
        if (!Number.isInteger(diagonalSize)) {
          throw new TypeError(
            `This array is not a compact representation of a Symmetric Matrix, ${JSON.stringify(
              compact
            )}`
          );
        }
        const matrix2 = new _SymmetricMatrix(diagonalSize);
        for (let col = 0, row = 0, index = 0; index < compactSize; index++) {
          matrix2.set(col, row, compact[index]);
          if (++col >= diagonalSize) col = ++row;
        }
        return matrix2;
      }
      /**
       * half iterator upper-right-corner from left to right, from top to bottom
       * yield [row, column, value]
       *
       * @returns {Generator<[number, number, number], void, void>}
       */
      *upperRightEntries() {
        for (let row = 0, col = 0; row < this.diagonalSize; void 0) {
          const value = this.get(row, col);
          yield [row, col, value];
          if (++col >= this.diagonalSize) col = ++row;
        }
      }
      /**
       * half iterator upper-right-corner from left to right, from top to bottom
       * yield value
       *
       * @returns {Generator<[number, number, number], void, void>}
       */
      *upperRightValues() {
        for (let row = 0, col = 0; row < this.diagonalSize; void 0) {
          const value = this.get(row, col);
          yield value;
          if (++col >= this.diagonalSize) col = ++row;
        }
      }
    };
    SymmetricMatrix2.prototype.klassType = "SymmetricMatrix";
    var DistanceMatrix2 = class _DistanceMatrix extends SymmetricMatrix2 {
      /**
       * not the same as matrix.isSymmetric()
       * Here is to check if it's instanceof SymmetricMatrix without bundling issues
       *
       * @param value
       * @returns {boolean}
       */
      static isDistanceMatrix(value) {
        return SymmetricMatrix2.isSymmetricMatrix(value) && value.klassSubType === "DistanceMatrix";
      }
      constructor(sideSize) {
        super(sideSize);
        if (!this.isDistance()) {
          throw new TypeError("Provided arguments do no produce a distance matrix");
        }
      }
      set(rowIndex, columnIndex, value) {
        if (rowIndex === columnIndex) value = 0;
        return super.set(rowIndex, columnIndex, value);
      }
      addCross(index, array) {
        if (array === void 0) {
          array = index;
          index = this.diagonalSize;
        }
        array = array.slice();
        array[index] = 0;
        return super.addCross(index, array);
      }
      toSymmetricMatrix() {
        return new SymmetricMatrix2(this);
      }
      clone() {
        const matrix2 = new _DistanceMatrix(this.diagonalSize);
        for (const [row, col, value] of this.upperRightEntries()) {
          if (row === col) continue;
          matrix2.set(row, col, value);
        }
        return matrix2;
      }
      /**
       * Compact format upper-right corner of matrix
       * no diagonal (only zeros)
       * iterable from left to right, from top to bottom.
       *
       * ```
       *   A B C D
       * A 0 1 2 3
       * B 1 0 4 5
       * C 2 4 0 6
       * D 3 5 6 0
       * ```
       *
       * will return compact 1D array `[1, 2, 3, 4, 5, 6]`
       *
       * length is S(i=0, n=sideSize-1) => 6 for a 4 side sized matrix
       *
       * @returns {number[]}
       */
      toCompact() {
        const { diagonalSize } = this;
        const compactLength = (diagonalSize - 1) * diagonalSize / 2;
        const compact = new Array(compactLength);
        for (let col = 1, row = 0, index = 0; index < compact.length; index++) {
          compact[index] = this.get(row, col);
          if (++col >= diagonalSize) col = ++row + 1;
        }
        return compact;
      }
      /**
       * @param {number[]} compact
       */
      static fromCompact(compact) {
        const compactSize = compact.length;
        if (compactSize === 0) {
          return new this(0);
        }
        const diagonalSize = (Math.sqrt(8 * compactSize + 1) + 1) / 2;
        if (!Number.isInteger(diagonalSize)) {
          throw new TypeError(
            `This array is not a compact representation of a DistanceMatrix, ${JSON.stringify(
              compact
            )}`
          );
        }
        const matrix2 = new this(diagonalSize);
        for (let col = 1, row = 0, index = 0; index < compactSize; index++) {
          matrix2.set(col, row, compact[index]);
          if (++col >= diagonalSize) col = ++row + 1;
        }
        return matrix2;
      }
    };
    DistanceMatrix2.prototype.klassSubType = "DistanceMatrix";
    var BaseView = class extends AbstractMatrix2 {
      constructor(matrix2, rows, columns) {
        super();
        this.matrix = matrix2;
        this.rows = rows;
        this.columns = columns;
      }
    };
    var MatrixColumnView2 = class extends BaseView {
      constructor(matrix2, column) {
        checkColumnIndex(matrix2, column);
        super(matrix2, matrix2.rows, 1);
        this.column = column;
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(rowIndex, this.column, value);
        return this;
      }
      get(rowIndex) {
        return this.matrix.get(rowIndex, this.column);
      }
    };
    var MatrixColumnSelectionView2 = class extends BaseView {
      constructor(matrix2, columnIndices) {
        checkColumnIndices(matrix2, columnIndices);
        super(matrix2, matrix2.rows, columnIndices.length);
        this.columnIndices = columnIndices;
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(rowIndex, this.columnIndices[columnIndex], value);
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.matrix.get(rowIndex, this.columnIndices[columnIndex]);
      }
    };
    var MatrixFlipColumnView2 = class extends BaseView {
      constructor(matrix2) {
        super(matrix2, matrix2.rows, matrix2.columns);
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(rowIndex, this.columns - columnIndex - 1, value);
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.matrix.get(rowIndex, this.columns - columnIndex - 1);
      }
    };
    var MatrixFlipRowView2 = class extends BaseView {
      constructor(matrix2) {
        super(matrix2, matrix2.rows, matrix2.columns);
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(this.rows - rowIndex - 1, columnIndex, value);
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.matrix.get(this.rows - rowIndex - 1, columnIndex);
      }
    };
    var MatrixRowView2 = class extends BaseView {
      constructor(matrix2, row) {
        checkRowIndex(matrix2, row);
        super(matrix2, 1, matrix2.columns);
        this.row = row;
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(this.row, columnIndex, value);
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.matrix.get(this.row, columnIndex);
      }
    };
    var MatrixRowSelectionView2 = class extends BaseView {
      constructor(matrix2, rowIndices) {
        checkRowIndices(matrix2, rowIndices);
        super(matrix2, rowIndices.length, matrix2.columns);
        this.rowIndices = rowIndices;
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(this.rowIndices[rowIndex], columnIndex, value);
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.matrix.get(this.rowIndices[rowIndex], columnIndex);
      }
    };
    var MatrixSelectionView2 = class extends BaseView {
      constructor(matrix2, rowIndices, columnIndices) {
        checkRowIndices(matrix2, rowIndices);
        checkColumnIndices(matrix2, columnIndices);
        super(matrix2, rowIndices.length, columnIndices.length);
        this.rowIndices = rowIndices;
        this.columnIndices = columnIndices;
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(
          this.rowIndices[rowIndex],
          this.columnIndices[columnIndex],
          value
        );
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.matrix.get(
          this.rowIndices[rowIndex],
          this.columnIndices[columnIndex]
        );
      }
    };
    var MatrixSubView2 = class extends BaseView {
      constructor(matrix2, startRow, endRow, startColumn, endColumn) {
        checkRange(matrix2, startRow, endRow, startColumn, endColumn);
        super(matrix2, endRow - startRow + 1, endColumn - startColumn + 1);
        this.startRow = startRow;
        this.startColumn = startColumn;
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(
          this.startRow + rowIndex,
          this.startColumn + columnIndex,
          value
        );
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.matrix.get(
          this.startRow + rowIndex,
          this.startColumn + columnIndex
        );
      }
    };
    var MatrixTransposeView2 = class extends BaseView {
      constructor(matrix2) {
        super(matrix2, matrix2.columns, matrix2.rows);
      }
      set(rowIndex, columnIndex, value) {
        this.matrix.set(columnIndex, rowIndex, value);
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.matrix.get(columnIndex, rowIndex);
      }
    };
    var WrapperMatrix1D2 = class extends AbstractMatrix2 {
      constructor(data, options = {}) {
        const { rows = 1 } = options;
        if (data.length % rows !== 0) {
          throw new Error("the data length is not divisible by the number of rows");
        }
        super();
        this.rows = rows;
        this.columns = data.length / rows;
        this.data = data;
      }
      set(rowIndex, columnIndex, value) {
        let index = this._calculateIndex(rowIndex, columnIndex);
        this.data[index] = value;
        return this;
      }
      get(rowIndex, columnIndex) {
        let index = this._calculateIndex(rowIndex, columnIndex);
        return this.data[index];
      }
      _calculateIndex(row, column) {
        return row * this.columns + column;
      }
    };
    var WrapperMatrix2D2 = class extends AbstractMatrix2 {
      constructor(data) {
        super();
        this.data = data;
        this.rows = data.length;
        this.columns = data[0].length;
      }
      set(rowIndex, columnIndex, value) {
        this.data[rowIndex][columnIndex] = value;
        return this;
      }
      get(rowIndex, columnIndex) {
        return this.data[rowIndex][columnIndex];
      }
    };
    function wrap2(array, options) {
      if (isAnyArray(array)) {
        if (array[0] && isAnyArray(array[0])) {
          return new WrapperMatrix2D2(array);
        } else {
          return new WrapperMatrix1D2(array, options);
        }
      } else {
        throw new Error("the argument is not an array");
      }
    }
    var LuDecomposition2 = class {
      constructor(matrix2) {
        matrix2 = WrapperMatrix2D2.checkMatrix(matrix2);
        let lu = matrix2.clone();
        let rows = lu.rows;
        let columns = lu.columns;
        let pivotVector = new Float64Array(rows);
        let pivotSign = 1;
        let i, j, k, p, s, t, v;
        let LUcolj, kmax;
        for (i = 0; i < rows; i++) {
          pivotVector[i] = i;
        }
        LUcolj = new Float64Array(rows);
        for (j = 0; j < columns; j++) {
          for (i = 0; i < rows; i++) {
            LUcolj[i] = lu.get(i, j);
          }
          for (i = 0; i < rows; i++) {
            kmax = Math.min(i, j);
            s = 0;
            for (k = 0; k < kmax; k++) {
              s += lu.get(i, k) * LUcolj[k];
            }
            LUcolj[i] -= s;
            lu.set(i, j, LUcolj[i]);
          }
          p = j;
          for (i = j + 1; i < rows; i++) {
            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
              p = i;
            }
          }
          if (p !== j) {
            for (k = 0; k < columns; k++) {
              t = lu.get(p, k);
              lu.set(p, k, lu.get(j, k));
              lu.set(j, k, t);
            }
            v = pivotVector[p];
            pivotVector[p] = pivotVector[j];
            pivotVector[j] = v;
            pivotSign = -pivotSign;
          }
          if (j < rows && lu.get(j, j) !== 0) {
            for (i = j + 1; i < rows; i++) {
              lu.set(i, j, lu.get(i, j) / lu.get(j, j));
            }
          }
        }
        this.LU = lu;
        this.pivotVector = pivotVector;
        this.pivotSign = pivotSign;
      }
      isSingular() {
        let data = this.LU;
        let col = data.columns;
        for (let j = 0; j < col; j++) {
          if (data.get(j, j) === 0) {
            return true;
          }
        }
        return false;
      }
      solve(value) {
        value = Matrix3.checkMatrix(value);
        let lu = this.LU;
        let rows = lu.rows;
        if (rows !== value.rows) {
          throw new Error("Invalid matrix dimensions");
        }
        if (this.isSingular()) {
          throw new Error("LU matrix is singular");
        }
        let count = value.columns;
        let X = value.subMatrixRow(this.pivotVector, 0, count - 1);
        let columns = lu.columns;
        let i, j, k;
        for (k = 0; k < columns; k++) {
          for (i = k + 1; i < columns; i++) {
            for (j = 0; j < count; j++) {
              X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
            }
          }
        }
        for (k = columns - 1; k >= 0; k--) {
          for (j = 0; j < count; j++) {
            X.set(k, j, X.get(k, j) / lu.get(k, k));
          }
          for (i = 0; i < k; i++) {
            for (j = 0; j < count; j++) {
              X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
            }
          }
        }
        return X;
      }
      get determinant() {
        let data = this.LU;
        if (!data.isSquare()) {
          throw new Error("Matrix must be square");
        }
        let determinant4 = this.pivotSign;
        let col = data.columns;
        for (let j = 0; j < col; j++) {
          determinant4 *= data.get(j, j);
        }
        return determinant4;
      }
      get lowerTriangularMatrix() {
        let data = this.LU;
        let rows = data.rows;
        let columns = data.columns;
        let X = new Matrix3(rows, columns);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            if (i > j) {
              X.set(i, j, data.get(i, j));
            } else if (i === j) {
              X.set(i, j, 1);
            } else {
              X.set(i, j, 0);
            }
          }
        }
        return X;
      }
      get upperTriangularMatrix() {
        let data = this.LU;
        let rows = data.rows;
        let columns = data.columns;
        let X = new Matrix3(rows, columns);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            if (i <= j) {
              X.set(i, j, data.get(i, j));
            } else {
              X.set(i, j, 0);
            }
          }
        }
        return X;
      }
      get pivotPermutationVector() {
        return Array.from(this.pivotVector);
      }
    };
    function hypotenuse(a, b) {
      let r = 0;
      if (Math.abs(a) > Math.abs(b)) {
        r = b / a;
        return Math.abs(a) * Math.sqrt(1 + r * r);
      }
      if (b !== 0) {
        r = a / b;
        return Math.abs(b) * Math.sqrt(1 + r * r);
      }
      return 0;
    }
    var QrDecomposition2 = class {
      constructor(value) {
        value = WrapperMatrix2D2.checkMatrix(value);
        let qr = value.clone();
        let m = value.rows;
        let n = value.columns;
        let rdiag = new Float64Array(n);
        let i, j, k, s;
        for (k = 0; k < n; k++) {
          let nrm = 0;
          for (i = k; i < m; i++) {
            nrm = hypotenuse(nrm, qr.get(i, k));
          }
          if (nrm !== 0) {
            if (qr.get(k, k) < 0) {
              nrm = -nrm;
            }
            for (i = k; i < m; i++) {
              qr.set(i, k, qr.get(i, k) / nrm);
            }
            qr.set(k, k, qr.get(k, k) + 1);
            for (j = k + 1; j < n; j++) {
              s = 0;
              for (i = k; i < m; i++) {
                s += qr.get(i, k) * qr.get(i, j);
              }
              s = -s / qr.get(k, k);
              for (i = k; i < m; i++) {
                qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
              }
            }
          }
          rdiag[k] = -nrm;
        }
        this.QR = qr;
        this.Rdiag = rdiag;
      }
      solve(value) {
        value = Matrix3.checkMatrix(value);
        let qr = this.QR;
        let m = qr.rows;
        if (value.rows !== m) {
          throw new Error("Matrix row dimensions must agree");
        }
        if (!this.isFullRank()) {
          throw new Error("Matrix is rank deficient");
        }
        let count = value.columns;
        let X = value.clone();
        let n = qr.columns;
        let i, j, k, s;
        for (k = 0; k < n; k++) {
          for (j = 0; j < count; j++) {
            s = 0;
            for (i = k; i < m; i++) {
              s += qr.get(i, k) * X.get(i, j);
            }
            s = -s / qr.get(k, k);
            for (i = k; i < m; i++) {
              X.set(i, j, X.get(i, j) + s * qr.get(i, k));
            }
          }
        }
        for (k = n - 1; k >= 0; k--) {
          for (j = 0; j < count; j++) {
            X.set(k, j, X.get(k, j) / this.Rdiag[k]);
          }
          for (i = 0; i < k; i++) {
            for (j = 0; j < count; j++) {
              X.set(i, j, X.get(i, j) - X.get(k, j) * qr.get(i, k));
            }
          }
        }
        return X.subMatrix(0, n - 1, 0, count - 1);
      }
      isFullRank() {
        let columns = this.QR.columns;
        for (let i = 0; i < columns; i++) {
          if (this.Rdiag[i] === 0) {
            return false;
          }
        }
        return true;
      }
      get upperTriangularMatrix() {
        let qr = this.QR;
        let n = qr.columns;
        let X = new Matrix3(n, n);
        let i, j;
        for (i = 0; i < n; i++) {
          for (j = 0; j < n; j++) {
            if (i < j) {
              X.set(i, j, qr.get(i, j));
            } else if (i === j) {
              X.set(i, j, this.Rdiag[i]);
            } else {
              X.set(i, j, 0);
            }
          }
        }
        return X;
      }
      get orthogonalMatrix() {
        let qr = this.QR;
        let rows = qr.rows;
        let columns = qr.columns;
        let X = new Matrix3(rows, columns);
        let i, j, k, s;
        for (k = columns - 1; k >= 0; k--) {
          for (i = 0; i < rows; i++) {
            X.set(i, k, 0);
          }
          X.set(k, k, 1);
          for (j = k; j < columns; j++) {
            if (qr.get(k, k) !== 0) {
              s = 0;
              for (i = k; i < rows; i++) {
                s += qr.get(i, k) * X.get(i, j);
              }
              s = -s / qr.get(k, k);
              for (i = k; i < rows; i++) {
                X.set(i, j, X.get(i, j) + s * qr.get(i, k));
              }
            }
          }
        }
        return X;
      }
    };
    var SingularValueDecomposition3 = class {
      constructor(value, options = {}) {
        value = WrapperMatrix2D2.checkMatrix(value);
        if (value.isEmpty()) {
          throw new Error("Matrix must be non-empty");
        }
        let m = value.rows;
        let n = value.columns;
        const {
          computeLeftSingularVectors = true,
          computeRightSingularVectors = true,
          autoTranspose = false
        } = options;
        let wantu = Boolean(computeLeftSingularVectors);
        let wantv = Boolean(computeRightSingularVectors);
        let swapped = false;
        let a;
        if (m < n) {
          if (!autoTranspose) {
            a = value.clone();
            console.warn(
              "Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose"
            );
          } else {
            a = value.transpose();
            m = a.rows;
            n = a.columns;
            swapped = true;
            let aux = wantu;
            wantu = wantv;
            wantv = aux;
          }
        } else {
          a = value.clone();
        }
        let nu = Math.min(m, n);
        let ni = Math.min(m + 1, n);
        let s = new Float64Array(ni);
        let U = new Matrix3(m, nu);
        let V = new Matrix3(n, n);
        let e = new Float64Array(n);
        let work = new Float64Array(m);
        let si = new Float64Array(ni);
        for (let i = 0; i < ni; i++) si[i] = i;
        let nct = Math.min(m - 1, n);
        let nrt = Math.max(0, Math.min(n - 2, m));
        let mrc = Math.max(nct, nrt);
        for (let k = 0; k < mrc; k++) {
          if (k < nct) {
            s[k] = 0;
            for (let i = k; i < m; i++) {
              s[k] = hypotenuse(s[k], a.get(i, k));
            }
            if (s[k] !== 0) {
              if (a.get(k, k) < 0) {
                s[k] = -s[k];
              }
              for (let i = k; i < m; i++) {
                a.set(i, k, a.get(i, k) / s[k]);
              }
              a.set(k, k, a.get(k, k) + 1);
            }
            s[k] = -s[k];
          }
          for (let j = k + 1; j < n; j++) {
            if (k < nct && s[k] !== 0) {
              let t = 0;
              for (let i = k; i < m; i++) {
                t += a.get(i, k) * a.get(i, j);
              }
              t = -t / a.get(k, k);
              for (let i = k; i < m; i++) {
                a.set(i, j, a.get(i, j) + t * a.get(i, k));
              }
            }
            e[j] = a.get(k, j);
          }
          if (wantu && k < nct) {
            for (let i = k; i < m; i++) {
              U.set(i, k, a.get(i, k));
            }
          }
          if (k < nrt) {
            e[k] = 0;
            for (let i = k + 1; i < n; i++) {
              e[k] = hypotenuse(e[k], e[i]);
            }
            if (e[k] !== 0) {
              if (e[k + 1] < 0) {
                e[k] = 0 - e[k];
              }
              for (let i = k + 1; i < n; i++) {
                e[i] /= e[k];
              }
              e[k + 1] += 1;
            }
            e[k] = -e[k];
            if (k + 1 < m && e[k] !== 0) {
              for (let i = k + 1; i < m; i++) {
                work[i] = 0;
              }
              for (let i = k + 1; i < m; i++) {
                for (let j = k + 1; j < n; j++) {
                  work[i] += e[j] * a.get(i, j);
                }
              }
              for (let j = k + 1; j < n; j++) {
                let t = -e[j] / e[k + 1];
                for (let i = k + 1; i < m; i++) {
                  a.set(i, j, a.get(i, j) + t * work[i]);
                }
              }
            }
            if (wantv) {
              for (let i = k + 1; i < n; i++) {
                V.set(i, k, e[i]);
              }
            }
          }
        }
        let p = Math.min(n, m + 1);
        if (nct < n) {
          s[nct] = a.get(nct, nct);
        }
        if (m < p) {
          s[p - 1] = 0;
        }
        if (nrt + 1 < p) {
          e[nrt] = a.get(nrt, p - 1);
        }
        e[p - 1] = 0;
        if (wantu) {
          for (let j = nct; j < nu; j++) {
            for (let i = 0; i < m; i++) {
              U.set(i, j, 0);
            }
            U.set(j, j, 1);
          }
          for (let k = nct - 1; k >= 0; k--) {
            if (s[k] !== 0) {
              for (let j = k + 1; j < nu; j++) {
                let t = 0;
                for (let i = k; i < m; i++) {
                  t += U.get(i, k) * U.get(i, j);
                }
                t = -t / U.get(k, k);
                for (let i = k; i < m; i++) {
                  U.set(i, j, U.get(i, j) + t * U.get(i, k));
                }
              }
              for (let i = k; i < m; i++) {
                U.set(i, k, -U.get(i, k));
              }
              U.set(k, k, 1 + U.get(k, k));
              for (let i = 0; i < k - 1; i++) {
                U.set(i, k, 0);
              }
            } else {
              for (let i = 0; i < m; i++) {
                U.set(i, k, 0);
              }
              U.set(k, k, 1);
            }
          }
        }
        if (wantv) {
          for (let k = n - 1; k >= 0; k--) {
            if (k < nrt && e[k] !== 0) {
              for (let j = k + 1; j < n; j++) {
                let t = 0;
                for (let i = k + 1; i < n; i++) {
                  t += V.get(i, k) * V.get(i, j);
                }
                t = -t / V.get(k + 1, k);
                for (let i = k + 1; i < n; i++) {
                  V.set(i, j, V.get(i, j) + t * V.get(i, k));
                }
              }
            }
            for (let i = 0; i < n; i++) {
              V.set(i, k, 0);
            }
            V.set(k, k, 1);
          }
        }
        let pp = p - 1;
        let eps = Number.EPSILON;
        while (p > 0) {
          let k, kase;
          for (k = p - 2; k >= -1; k--) {
            if (k === -1) {
              break;
            }
            const alpha = Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));
            if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
              e[k] = 0;
              break;
            }
          }
          if (k === p - 2) {
            kase = 4;
          } else {
            let ks;
            for (ks = p - 1; ks >= k; ks--) {
              if (ks === k) {
                break;
              }
              let t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
              if (Math.abs(s[ks]) <= eps * t) {
                s[ks] = 0;
                break;
              }
            }
            if (ks === k) {
              kase = 3;
            } else if (ks === p - 1) {
              kase = 1;
            } else {
              kase = 2;
              k = ks;
            }
          }
          k++;
          switch (kase) {
            case 1: {
              let f = e[p - 2];
              e[p - 2] = 0;
              for (let j = p - 2; j >= k; j--) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;
                if (j !== k) {
                  f = -sn * e[j - 1];
                  e[j - 1] = cs * e[j - 1];
                }
                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, p - 1);
                    V.set(i, p - 1, -sn * V.get(i, j) + cs * V.get(i, p - 1));
                    V.set(i, j, t);
                  }
                }
              }
              break;
            }
            case 2: {
              let f = e[k - 1];
              e[k - 1] = 0;
              for (let j = k; j < p; j++) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;
                f = -sn * e[j];
                e[j] = cs * e[j];
                if (wantu) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                    U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                    U.set(i, j, t);
                  }
                }
              }
              break;
            }
            case 3: {
              const scale = Math.max(
                Math.abs(s[p - 1]),
                Math.abs(s[p - 2]),
                Math.abs(e[p - 2]),
                Math.abs(s[k]),
                Math.abs(e[k])
              );
              const sp = s[p - 1] / scale;
              const spm1 = s[p - 2] / scale;
              const epm1 = e[p - 2] / scale;
              const sk = s[k] / scale;
              const ek = e[k] / scale;
              const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
              const c = sp * epm1 * (sp * epm1);
              let shift = 0;
              if (b !== 0 || c !== 0) {
                if (b < 0) {
                  shift = 0 - Math.sqrt(b * b + c);
                } else {
                  shift = Math.sqrt(b * b + c);
                }
                shift = c / (b + shift);
              }
              let f = (sk + sp) * (sk - sp) + shift;
              let g = sk * ek;
              for (let j = k; j < p - 1; j++) {
                let t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                let cs = f / t;
                let sn = g / t;
                if (j !== k) {
                  e[j - 1] = t;
                }
                f = cs * s[j] + sn * e[j];
                e[j] = cs * e[j] - sn * s[j];
                g = sn * s[j + 1];
                s[j + 1] = cs * s[j + 1];
                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, j + 1);
                    V.set(i, j + 1, -sn * V.get(i, j) + cs * V.get(i, j + 1));
                    V.set(i, j, t);
                  }
                }
                t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                cs = f / t;
                sn = g / t;
                s[j] = t;
                f = cs * e[j] + sn * s[j + 1];
                s[j + 1] = -sn * e[j] + cs * s[j + 1];
                g = sn * e[j + 1];
                e[j + 1] = cs * e[j + 1];
                if (wantu && j < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, j + 1);
                    U.set(i, j + 1, -sn * U.get(i, j) + cs * U.get(i, j + 1));
                    U.set(i, j, t);
                  }
                }
              }
              e[p - 2] = f;
              break;
            }
            case 4: {
              if (s[k] <= 0) {
                s[k] = s[k] < 0 ? -s[k] : 0;
                if (wantv) {
                  for (let i = 0; i <= pp; i++) {
                    V.set(i, k, -V.get(i, k));
                  }
                }
              }
              while (k < pp) {
                if (s[k] >= s[k + 1]) {
                  break;
                }
                let t = s[k];
                s[k] = s[k + 1];
                s[k + 1] = t;
                if (wantv && k < n - 1) {
                  for (let i = 0; i < n; i++) {
                    t = V.get(i, k + 1);
                    V.set(i, k + 1, V.get(i, k));
                    V.set(i, k, t);
                  }
                }
                if (wantu && k < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = U.get(i, k + 1);
                    U.set(i, k + 1, U.get(i, k));
                    U.set(i, k, t);
                  }
                }
                k++;
              }
              p--;
              break;
            }
          }
        }
        if (swapped) {
          let tmp = V;
          V = U;
          U = tmp;
        }
        this.m = m;
        this.n = n;
        this.s = s;
        this.U = U;
        this.V = V;
      }
      solve(value) {
        let Y = value;
        let e = this.threshold;
        let scols = this.s.length;
        let Ls = Matrix3.zeros(scols, scols);
        for (let i = 0; i < scols; i++) {
          if (Math.abs(this.s[i]) <= e) {
            Ls.set(i, i, 0);
          } else {
            Ls.set(i, i, 1 / this.s[i]);
          }
        }
        let U = this.U;
        let V = this.rightSingularVectors;
        let VL = V.mmul(Ls);
        let vrows = V.rows;
        let urows = U.rows;
        let VLU = Matrix3.zeros(vrows, urows);
        for (let i = 0; i < vrows; i++) {
          for (let j = 0; j < urows; j++) {
            let sum = 0;
            for (let k = 0; k < scols; k++) {
              sum += VL.get(i, k) * U.get(j, k);
            }
            VLU.set(i, j, sum);
          }
        }
        return VLU.mmul(Y);
      }
      solveForDiagonal(value) {
        return this.solve(Matrix3.diag(value));
      }
      inverse() {
        let V = this.V;
        let e = this.threshold;
        let vrows = V.rows;
        let vcols = V.columns;
        let X = new Matrix3(vrows, this.s.length);
        for (let i = 0; i < vrows; i++) {
          for (let j = 0; j < vcols; j++) {
            if (Math.abs(this.s[j]) > e) {
              X.set(i, j, V.get(i, j) / this.s[j]);
            }
          }
        }
        let U = this.U;
        let urows = U.rows;
        let ucols = U.columns;
        let Y = new Matrix3(vrows, urows);
        for (let i = 0; i < vrows; i++) {
          for (let j = 0; j < urows; j++) {
            let sum = 0;
            for (let k = 0; k < ucols; k++) {
              sum += X.get(i, k) * U.get(j, k);
            }
            Y.set(i, j, sum);
          }
        }
        return Y;
      }
      get condition() {
        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
      }
      get norm2() {
        return this.s[0];
      }
      get rank() {
        let tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
        let r = 0;
        let s = this.s;
        for (let i = 0, ii = s.length; i < ii; i++) {
          if (s[i] > tol) {
            r++;
          }
        }
        return r;
      }
      get diagonal() {
        return Array.from(this.s);
      }
      get threshold() {
        return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
      }
      get leftSingularVectors() {
        return this.U;
      }
      get rightSingularVectors() {
        return this.V;
      }
      get diagonalMatrix() {
        return Matrix3.diag(this.s);
      }
    };
    function inverse3(matrix2, useSVD = false) {
      matrix2 = WrapperMatrix2D2.checkMatrix(matrix2);
      if (useSVD) {
        return new SingularValueDecomposition3(matrix2).inverse();
      } else {
        return solve2(matrix2, Matrix3.eye(matrix2.rows));
      }
    }
    function solve2(leftHandSide, rightHandSide, useSVD = false) {
      leftHandSide = WrapperMatrix2D2.checkMatrix(leftHandSide);
      rightHandSide = WrapperMatrix2D2.checkMatrix(rightHandSide);
      if (useSVD) {
        return new SingularValueDecomposition3(leftHandSide).solve(rightHandSide);
      } else {
        return leftHandSide.isSquare() ? new LuDecomposition2(leftHandSide).solve(rightHandSide) : new QrDecomposition2(leftHandSide).solve(rightHandSide);
      }
    }
    function determinant3(matrix2) {
      matrix2 = Matrix3.checkMatrix(matrix2);
      if (matrix2.isSquare()) {
        if (matrix2.columns === 0) {
          return 1;
        }
        let a, b, c, d;
        if (matrix2.columns === 2) {
          a = matrix2.get(0, 0);
          b = matrix2.get(0, 1);
          c = matrix2.get(1, 0);
          d = matrix2.get(1, 1);
          return a * d - b * c;
        } else if (matrix2.columns === 3) {
          let subMatrix0, subMatrix1, subMatrix2;
          subMatrix0 = new MatrixSelectionView2(matrix2, [1, 2], [1, 2]);
          subMatrix1 = new MatrixSelectionView2(matrix2, [1, 2], [0, 2]);
          subMatrix2 = new MatrixSelectionView2(matrix2, [1, 2], [0, 1]);
          a = matrix2.get(0, 0);
          b = matrix2.get(0, 1);
          c = matrix2.get(0, 2);
          return a * determinant3(subMatrix0) - b * determinant3(subMatrix1) + c * determinant3(subMatrix2);
        } else {
          return new LuDecomposition2(matrix2).determinant;
        }
      } else {
        throw Error("determinant can only be calculated for a square matrix");
      }
    }
    function xrange(n, exception) {
      let range = [];
      for (let i = 0; i < n; i++) {
        if (i !== exception) {
          range.push(i);
        }
      }
      return range;
    }
    function dependenciesOneRow(error, matrix2, index, thresholdValue = 1e-9, thresholdError = 1e-9) {
      if (error > thresholdError) {
        return new Array(matrix2.rows + 1).fill(0);
      } else {
        let returnArray = matrix2.addRow(index, [0]);
        for (let i = 0; i < returnArray.rows; i++) {
          if (Math.abs(returnArray.get(i, 0)) < thresholdValue) {
            returnArray.set(i, 0, 0);
          }
        }
        return returnArray.to1DArray();
      }
    }
    function linearDependencies2(matrix2, options = {}) {
      const { thresholdValue = 1e-9, thresholdError = 1e-9 } = options;
      matrix2 = Matrix3.checkMatrix(matrix2);
      let n = matrix2.rows;
      let results = new Matrix3(n, n);
      for (let i = 0; i < n; i++) {
        let b = Matrix3.columnVector(matrix2.getRow(i));
        let Abis = matrix2.subMatrixRow(xrange(n, i)).transpose();
        let svd = new SingularValueDecomposition3(Abis);
        let x = svd.solve(b);
        let error = Matrix3.sub(b, Abis.mmul(x)).abs().max();
        results.setRow(
          i,
          dependenciesOneRow(error, x, i, thresholdValue, thresholdError)
        );
      }
      return results;
    }
    function pseudoInverse2(matrix2, threshold = Number.EPSILON) {
      matrix2 = Matrix3.checkMatrix(matrix2);
      if (matrix2.isEmpty()) {
        return matrix2.transpose();
      }
      let svdSolution = new SingularValueDecomposition3(matrix2, { autoTranspose: true });
      let U = svdSolution.leftSingularVectors;
      let V = svdSolution.rightSingularVectors;
      let s = svdSolution.diagonal;
      for (let i = 0; i < s.length; i++) {
        if (Math.abs(s[i]) > threshold) {
          s[i] = 1 / s[i];
        } else {
          s[i] = 0;
        }
      }
      return V.mmul(Matrix3.diag(s).mmul(U.transpose()));
    }
    function covariance2(xMatrix, yMatrix = xMatrix, options = {}) {
      xMatrix = new Matrix3(xMatrix);
      let yIsSame = false;
      if (typeof yMatrix === "object" && !Matrix3.isMatrix(yMatrix) && !isAnyArray(yMatrix)) {
        options = yMatrix;
        yMatrix = xMatrix;
        yIsSame = true;
      } else {
        yMatrix = new Matrix3(yMatrix);
      }
      if (xMatrix.rows !== yMatrix.rows) {
        throw new TypeError("Both matrices must have the same number of rows");
      }
      const { center = true } = options;
      if (center) {
        xMatrix = xMatrix.center("column");
        if (!yIsSame) {
          yMatrix = yMatrix.center("column");
        }
      }
      const cov = xMatrix.transpose().mmul(yMatrix);
      for (let i = 0; i < cov.rows; i++) {
        for (let j = 0; j < cov.columns; j++) {
          cov.set(i, j, cov.get(i, j) * (1 / (xMatrix.rows - 1)));
        }
      }
      return cov;
    }
    function correlation2(xMatrix, yMatrix = xMatrix, options = {}) {
      xMatrix = new Matrix3(xMatrix);
      let yIsSame = false;
      if (typeof yMatrix === "object" && !Matrix3.isMatrix(yMatrix) && !isAnyArray(yMatrix)) {
        options = yMatrix;
        yMatrix = xMatrix;
        yIsSame = true;
      } else {
        yMatrix = new Matrix3(yMatrix);
      }
      if (xMatrix.rows !== yMatrix.rows) {
        throw new TypeError("Both matrices must have the same number of rows");
      }
      const { center = true, scale = true } = options;
      if (center) {
        xMatrix.center("column");
        if (!yIsSame) {
          yMatrix.center("column");
        }
      }
      if (scale) {
        xMatrix.scale("column");
        if (!yIsSame) {
          yMatrix.scale("column");
        }
      }
      const sdx = xMatrix.standardDeviation("column", { unbiased: true });
      const sdy = yIsSame ? sdx : yMatrix.standardDeviation("column", { unbiased: true });
      const corr = xMatrix.transpose().mmul(yMatrix);
      for (let i = 0; i < corr.rows; i++) {
        for (let j = 0; j < corr.columns; j++) {
          corr.set(
            i,
            j,
            corr.get(i, j) * (1 / (sdx[i] * sdy[j])) * (1 / (xMatrix.rows - 1))
          );
        }
      }
      return corr;
    }
    var EigenvalueDecomposition2 = class {
      constructor(matrix2, options = {}) {
        const { assumeSymmetric = false } = options;
        matrix2 = WrapperMatrix2D2.checkMatrix(matrix2);
        if (!matrix2.isSquare()) {
          throw new Error("Matrix is not a square matrix");
        }
        if (matrix2.isEmpty()) {
          throw new Error("Matrix must be non-empty");
        }
        let n = matrix2.columns;
        let V = new Matrix3(n, n);
        let d = new Float64Array(n);
        let e = new Float64Array(n);
        let value = matrix2;
        let i, j;
        let isSymmetric = false;
        if (assumeSymmetric) {
          isSymmetric = true;
        } else {
          isSymmetric = matrix2.isSymmetric();
        }
        if (isSymmetric) {
          for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
              V.set(i, j, value.get(i, j));
            }
          }
          tred2(n, e, d, V);
          tql2(n, e, d, V);
        } else {
          let H = new Matrix3(n, n);
          let ort = new Float64Array(n);
          for (j = 0; j < n; j++) {
            for (i = 0; i < n; i++) {
              H.set(i, j, value.get(i, j));
            }
          }
          orthes(n, H, ort, V);
          hqr2(n, e, d, V, H);
        }
        this.n = n;
        this.e = e;
        this.d = d;
        this.V = V;
      }
      get realEigenvalues() {
        return Array.from(this.d);
      }
      get imaginaryEigenvalues() {
        return Array.from(this.e);
      }
      get eigenvectorMatrix() {
        return this.V;
      }
      get diagonalMatrix() {
        let n = this.n;
        let e = this.e;
        let d = this.d;
        let X = new Matrix3(n, n);
        let i, j;
        for (i = 0; i < n; i++) {
          for (j = 0; j < n; j++) {
            X.set(i, j, 0);
          }
          X.set(i, i, d[i]);
          if (e[i] > 0) {
            X.set(i, i + 1, e[i]);
          } else if (e[i] < 0) {
            X.set(i, i - 1, e[i]);
          }
        }
        return X;
      }
    };
    function tred2(n, e, d, V) {
      let f, g, h, i, j, k, hh, scale;
      for (j = 0; j < n; j++) {
        d[j] = V.get(n - 1, j);
      }
      for (i = n - 1; i > 0; i--) {
        scale = 0;
        h = 0;
        for (k = 0; k < i; k++) {
          scale = scale + Math.abs(d[k]);
        }
        if (scale === 0) {
          e[i] = d[i - 1];
          for (j = 0; j < i; j++) {
            d[j] = V.get(i - 1, j);
            V.set(i, j, 0);
            V.set(j, i, 0);
          }
        } else {
          for (k = 0; k < i; k++) {
            d[k] /= scale;
            h += d[k] * d[k];
          }
          f = d[i - 1];
          g = Math.sqrt(h);
          if (f > 0) {
            g = -g;
          }
          e[i] = scale * g;
          h = h - f * g;
          d[i - 1] = f - g;
          for (j = 0; j < i; j++) {
            e[j] = 0;
          }
          for (j = 0; j < i; j++) {
            f = d[j];
            V.set(j, i, f);
            g = e[j] + V.get(j, j) * f;
            for (k = j + 1; k <= i - 1; k++) {
              g += V.get(k, j) * d[k];
              e[k] += V.get(k, j) * f;
            }
            e[j] = g;
          }
          f = 0;
          for (j = 0; j < i; j++) {
            e[j] /= h;
            f += e[j] * d[j];
          }
          hh = f / (h + h);
          for (j = 0; j < i; j++) {
            e[j] -= hh * d[j];
          }
          for (j = 0; j < i; j++) {
            f = d[j];
            g = e[j];
            for (k = j; k <= i - 1; k++) {
              V.set(k, j, V.get(k, j) - (f * e[k] + g * d[k]));
            }
            d[j] = V.get(i - 1, j);
            V.set(i, j, 0);
          }
        }
        d[i] = h;
      }
      for (i = 0; i < n - 1; i++) {
        V.set(n - 1, i, V.get(i, i));
        V.set(i, i, 1);
        h = d[i + 1];
        if (h !== 0) {
          for (k = 0; k <= i; k++) {
            d[k] = V.get(k, i + 1) / h;
          }
          for (j = 0; j <= i; j++) {
            g = 0;
            for (k = 0; k <= i; k++) {
              g += V.get(k, i + 1) * V.get(k, j);
            }
            for (k = 0; k <= i; k++) {
              V.set(k, j, V.get(k, j) - g * d[k]);
            }
          }
        }
        for (k = 0; k <= i; k++) {
          V.set(k, i + 1, 0);
        }
      }
      for (j = 0; j < n; j++) {
        d[j] = V.get(n - 1, j);
        V.set(n - 1, j, 0);
      }
      V.set(n - 1, n - 1, 1);
      e[0] = 0;
    }
    function tql2(n, e, d, V) {
      let g, h, i, j, k, l, m, p, r, dl1, c, c2, c3, el1, s, s2;
      for (i = 1; i < n; i++) {
        e[i - 1] = e[i];
      }
      e[n - 1] = 0;
      let f = 0;
      let tst1 = 0;
      let eps = Number.EPSILON;
      for (l = 0; l < n; l++) {
        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
        m = l;
        while (m < n) {
          if (Math.abs(e[m]) <= eps * tst1) {
            break;
          }
          m++;
        }
        if (m > l) {
          do {
            g = d[l];
            p = (d[l + 1] - g) / (2 * e[l]);
            r = hypotenuse(p, 1);
            if (p < 0) {
              r = -r;
            }
            d[l] = e[l] / (p + r);
            d[l + 1] = e[l] * (p + r);
            dl1 = d[l + 1];
            h = g - d[l];
            for (i = l + 2; i < n; i++) {
              d[i] -= h;
            }
            f = f + h;
            p = d[m];
            c = 1;
            c2 = c;
            c3 = c;
            el1 = e[l + 1];
            s = 0;
            s2 = 0;
            for (i = m - 1; i >= l; i--) {
              c3 = c2;
              c2 = c;
              s2 = s;
              g = c * e[i];
              h = c * p;
              r = hypotenuse(p, e[i]);
              e[i + 1] = s * r;
              s = e[i] / r;
              c = p / r;
              p = c * d[i] - s * g;
              d[i + 1] = h + s * (c * g + s * d[i]);
              for (k = 0; k < n; k++) {
                h = V.get(k, i + 1);
                V.set(k, i + 1, s * V.get(k, i) + c * h);
                V.set(k, i, c * V.get(k, i) - s * h);
              }
            }
            p = -s * s2 * c3 * el1 * e[l] / dl1;
            e[l] = s * p;
            d[l] = c * p;
          } while (Math.abs(e[l]) > eps * tst1);
        }
        d[l] = d[l] + f;
        e[l] = 0;
      }
      for (i = 0; i < n - 1; i++) {
        k = i;
        p = d[i];
        for (j = i + 1; j < n; j++) {
          if (d[j] < p) {
            k = j;
            p = d[j];
          }
        }
        if (k !== i) {
          d[k] = d[i];
          d[i] = p;
          for (j = 0; j < n; j++) {
            p = V.get(j, i);
            V.set(j, i, V.get(j, k));
            V.set(j, k, p);
          }
        }
      }
    }
    function orthes(n, H, ort, V) {
      let low = 0;
      let high = n - 1;
      let f, g, h, i, j, m;
      let scale;
      for (m = low + 1; m <= high - 1; m++) {
        scale = 0;
        for (i = m; i <= high; i++) {
          scale = scale + Math.abs(H.get(i, m - 1));
        }
        if (scale !== 0) {
          h = 0;
          for (i = high; i >= m; i--) {
            ort[i] = H.get(i, m - 1) / scale;
            h += ort[i] * ort[i];
          }
          g = Math.sqrt(h);
          if (ort[m] > 0) {
            g = -g;
          }
          h = h - ort[m] * g;
          ort[m] = ort[m] - g;
          for (j = m; j < n; j++) {
            f = 0;
            for (i = high; i >= m; i--) {
              f += ort[i] * H.get(i, j);
            }
            f = f / h;
            for (i = m; i <= high; i++) {
              H.set(i, j, H.get(i, j) - f * ort[i]);
            }
          }
          for (i = 0; i <= high; i++) {
            f = 0;
            for (j = high; j >= m; j--) {
              f += ort[j] * H.get(i, j);
            }
            f = f / h;
            for (j = m; j <= high; j++) {
              H.set(i, j, H.get(i, j) - f * ort[j]);
            }
          }
          ort[m] = scale * ort[m];
          H.set(m, m - 1, scale * g);
        }
      }
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          V.set(i, j, i === j ? 1 : 0);
        }
      }
      for (m = high - 1; m >= low + 1; m--) {
        if (H.get(m, m - 1) !== 0) {
          for (i = m + 1; i <= high; i++) {
            ort[i] = H.get(i, m - 1);
          }
          for (j = m; j <= high; j++) {
            g = 0;
            for (i = m; i <= high; i++) {
              g += ort[i] * V.get(i, j);
            }
            g = g / ort[m] / H.get(m, m - 1);
            for (i = m; i <= high; i++) {
              V.set(i, j, V.get(i, j) + g * ort[i]);
            }
          }
        }
      }
    }
    function hqr2(nn, e, d, V, H) {
      let n = nn - 1;
      let low = 0;
      let high = nn - 1;
      let eps = Number.EPSILON;
      let exshift = 0;
      let norm = 0;
      let p = 0;
      let q = 0;
      let r = 0;
      let s = 0;
      let z = 0;
      let iter = 0;
      let i, j, k, l, m, t, w, x, y;
      let ra, sa, vr, vi;
      let notlast, cdivres;
      for (i = 0; i < nn; i++) {
        if (i < low || i > high) {
          d[i] = H.get(i, i);
          e[i] = 0;
        }
        for (j = Math.max(i - 1, 0); j < nn; j++) {
          norm = norm + Math.abs(H.get(i, j));
        }
      }
      while (n >= low) {
        l = n;
        while (l > low) {
          s = Math.abs(H.get(l - 1, l - 1)) + Math.abs(H.get(l, l));
          if (s === 0) {
            s = norm;
          }
          if (Math.abs(H.get(l, l - 1)) < eps * s) {
            break;
          }
          l--;
        }
        if (l === n) {
          H.set(n, n, H.get(n, n) + exshift);
          d[n] = H.get(n, n);
          e[n] = 0;
          n--;
          iter = 0;
        } else if (l === n - 1) {
          w = H.get(n, n - 1) * H.get(n - 1, n);
          p = (H.get(n - 1, n - 1) - H.get(n, n)) / 2;
          q = p * p + w;
          z = Math.sqrt(Math.abs(q));
          H.set(n, n, H.get(n, n) + exshift);
          H.set(n - 1, n - 1, H.get(n - 1, n - 1) + exshift);
          x = H.get(n, n);
          if (q >= 0) {
            z = p >= 0 ? p + z : p - z;
            d[n - 1] = x + z;
            d[n] = d[n - 1];
            if (z !== 0) {
              d[n] = x - w / z;
            }
            e[n - 1] = 0;
            e[n] = 0;
            x = H.get(n, n - 1);
            s = Math.abs(x) + Math.abs(z);
            p = x / s;
            q = z / s;
            r = Math.sqrt(p * p + q * q);
            p = p / r;
            q = q / r;
            for (j = n - 1; j < nn; j++) {
              z = H.get(n - 1, j);
              H.set(n - 1, j, q * z + p * H.get(n, j));
              H.set(n, j, q * H.get(n, j) - p * z);
            }
            for (i = 0; i <= n; i++) {
              z = H.get(i, n - 1);
              H.set(i, n - 1, q * z + p * H.get(i, n));
              H.set(i, n, q * H.get(i, n) - p * z);
            }
            for (i = low; i <= high; i++) {
              z = V.get(i, n - 1);
              V.set(i, n - 1, q * z + p * V.get(i, n));
              V.set(i, n, q * V.get(i, n) - p * z);
            }
          } else {
            d[n - 1] = x + p;
            d[n] = x + p;
            e[n - 1] = z;
            e[n] = -z;
          }
          n = n - 2;
          iter = 0;
        } else {
          x = H.get(n, n);
          y = 0;
          w = 0;
          if (l < n) {
            y = H.get(n - 1, n - 1);
            w = H.get(n, n - 1) * H.get(n - 1, n);
          }
          if (iter === 10) {
            exshift += x;
            for (i = low; i <= n; i++) {
              H.set(i, i, H.get(i, i) - x);
            }
            s = Math.abs(H.get(n, n - 1)) + Math.abs(H.get(n - 1, n - 2));
            x = y = 0.75 * s;
            w = -0.4375 * s * s;
          }
          if (iter === 30) {
            s = (y - x) / 2;
            s = s * s + w;
            if (s > 0) {
              s = Math.sqrt(s);
              if (y < x) {
                s = -s;
              }
              s = x - w / ((y - x) / 2 + s);
              for (i = low; i <= n; i++) {
                H.set(i, i, H.get(i, i) - s);
              }
              exshift += s;
              x = y = w = 0.964;
            }
          }
          iter = iter + 1;
          m = n - 2;
          while (m >= l) {
            z = H.get(m, m);
            r = x - z;
            s = y - z;
            p = (r * s - w) / H.get(m + 1, m) + H.get(m, m + 1);
            q = H.get(m + 1, m + 1) - z - r - s;
            r = H.get(m + 2, m + 1);
            s = Math.abs(p) + Math.abs(q) + Math.abs(r);
            p = p / s;
            q = q / s;
            r = r / s;
            if (m === l) {
              break;
            }
            if (Math.abs(H.get(m, m - 1)) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H.get(m - 1, m - 1)) + Math.abs(z) + Math.abs(H.get(m + 1, m + 1))))) {
              break;
            }
            m--;
          }
          for (i = m + 2; i <= n; i++) {
            H.set(i, i - 2, 0);
            if (i > m + 2) {
              H.set(i, i - 3, 0);
            }
          }
          for (k = m; k <= n - 1; k++) {
            notlast = k !== n - 1;
            if (k !== m) {
              p = H.get(k, k - 1);
              q = H.get(k + 1, k - 1);
              r = notlast ? H.get(k + 2, k - 1) : 0;
              x = Math.abs(p) + Math.abs(q) + Math.abs(r);
              if (x !== 0) {
                p = p / x;
                q = q / x;
                r = r / x;
              }
            }
            if (x === 0) {
              break;
            }
            s = Math.sqrt(p * p + q * q + r * r);
            if (p < 0) {
              s = -s;
            }
            if (s !== 0) {
              if (k !== m) {
                H.set(k, k - 1, -s * x);
              } else if (l !== m) {
                H.set(k, k - 1, -H.get(k, k - 1));
              }
              p = p + s;
              x = p / s;
              y = q / s;
              z = r / s;
              q = q / p;
              r = r / p;
              for (j = k; j < nn; j++) {
                p = H.get(k, j) + q * H.get(k + 1, j);
                if (notlast) {
                  p = p + r * H.get(k + 2, j);
                  H.set(k + 2, j, H.get(k + 2, j) - p * z);
                }
                H.set(k, j, H.get(k, j) - p * x);
                H.set(k + 1, j, H.get(k + 1, j) - p * y);
              }
              for (i = 0; i <= Math.min(n, k + 3); i++) {
                p = x * H.get(i, k) + y * H.get(i, k + 1);
                if (notlast) {
                  p = p + z * H.get(i, k + 2);
                  H.set(i, k + 2, H.get(i, k + 2) - p * r);
                }
                H.set(i, k, H.get(i, k) - p);
                H.set(i, k + 1, H.get(i, k + 1) - p * q);
              }
              for (i = low; i <= high; i++) {
                p = x * V.get(i, k) + y * V.get(i, k + 1);
                if (notlast) {
                  p = p + z * V.get(i, k + 2);
                  V.set(i, k + 2, V.get(i, k + 2) - p * r);
                }
                V.set(i, k, V.get(i, k) - p);
                V.set(i, k + 1, V.get(i, k + 1) - p * q);
              }
            }
          }
        }
      }
      if (norm === 0) {
        return;
      }
      for (n = nn - 1; n >= 0; n--) {
        p = d[n];
        q = e[n];
        if (q === 0) {
          l = n;
          H.set(n, n, 1);
          for (i = n - 1; i >= 0; i--) {
            w = H.get(i, i) - p;
            r = 0;
            for (j = l; j <= n; j++) {
              r = r + H.get(i, j) * H.get(j, n);
            }
            if (e[i] < 0) {
              z = w;
              s = r;
            } else {
              l = i;
              if (e[i] === 0) {
                H.set(i, n, w !== 0 ? -r / w : -r / (eps * norm));
              } else {
                x = H.get(i, i + 1);
                y = H.get(i + 1, i);
                q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
                t = (x * s - z * r) / q;
                H.set(i, n, t);
                H.set(
                  i + 1,
                  n,
                  Math.abs(x) > Math.abs(z) ? (-r - w * t) / x : (-s - y * t) / z
                );
              }
              t = Math.abs(H.get(i, n));
              if (eps * t * t > 1) {
                for (j = i; j <= n; j++) {
                  H.set(j, n, H.get(j, n) / t);
                }
              }
            }
          }
        } else if (q < 0) {
          l = n - 1;
          if (Math.abs(H.get(n, n - 1)) > Math.abs(H.get(n - 1, n))) {
            H.set(n - 1, n - 1, q / H.get(n, n - 1));
            H.set(n - 1, n, -(H.get(n, n) - p) / H.get(n, n - 1));
          } else {
            cdivres = cdiv(0, -H.get(n - 1, n), H.get(n - 1, n - 1) - p, q);
            H.set(n - 1, n - 1, cdivres[0]);
            H.set(n - 1, n, cdivres[1]);
          }
          H.set(n, n - 1, 0);
          H.set(n, n, 1);
          for (i = n - 2; i >= 0; i--) {
            ra = 0;
            sa = 0;
            for (j = l; j <= n; j++) {
              ra = ra + H.get(i, j) * H.get(j, n - 1);
              sa = sa + H.get(i, j) * H.get(j, n);
            }
            w = H.get(i, i) - p;
            if (e[i] < 0) {
              z = w;
              r = ra;
              s = sa;
            } else {
              l = i;
              if (e[i] === 0) {
                cdivres = cdiv(-ra, -sa, w, q);
                H.set(i, n - 1, cdivres[0]);
                H.set(i, n, cdivres[1]);
              } else {
                x = H.get(i, i + 1);
                y = H.get(i + 1, i);
                vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
                vi = (d[i] - p) * 2 * q;
                if (vr === 0 && vi === 0) {
                  vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
                }
                cdivres = cdiv(
                  x * r - z * ra + q * sa,
                  x * s - z * sa - q * ra,
                  vr,
                  vi
                );
                H.set(i, n - 1, cdivres[0]);
                H.set(i, n, cdivres[1]);
                if (Math.abs(x) > Math.abs(z) + Math.abs(q)) {
                  H.set(
                    i + 1,
                    n - 1,
                    (-ra - w * H.get(i, n - 1) + q * H.get(i, n)) / x
                  );
                  H.set(
                    i + 1,
                    n,
                    (-sa - w * H.get(i, n) - q * H.get(i, n - 1)) / x
                  );
                } else {
                  cdivres = cdiv(
                    -r - y * H.get(i, n - 1),
                    -s - y * H.get(i, n),
                    z,
                    q
                  );
                  H.set(i + 1, n - 1, cdivres[0]);
                  H.set(i + 1, n, cdivres[1]);
                }
              }
              t = Math.max(Math.abs(H.get(i, n - 1)), Math.abs(H.get(i, n)));
              if (eps * t * t > 1) {
                for (j = i; j <= n; j++) {
                  H.set(j, n - 1, H.get(j, n - 1) / t);
                  H.set(j, n, H.get(j, n) / t);
                }
              }
            }
          }
        }
      }
      for (i = 0; i < nn; i++) {
        if (i < low || i > high) {
          for (j = i; j < nn; j++) {
            V.set(i, j, H.get(i, j));
          }
        }
      }
      for (j = nn - 1; j >= low; j--) {
        for (i = low; i <= high; i++) {
          z = 0;
          for (k = low; k <= Math.min(j, high); k++) {
            z = z + V.get(i, k) * H.get(k, j);
          }
          V.set(i, j, z);
        }
      }
    }
    function cdiv(xr, xi, yr, yi) {
      let r, d;
      if (Math.abs(yr) > Math.abs(yi)) {
        r = yi / yr;
        d = yr + r * yi;
        return [(xr + r * xi) / d, (xi - r * xr) / d];
      } else {
        r = yr / yi;
        d = yi + r * yr;
        return [(r * xr + xi) / d, (r * xi - xr) / d];
      }
    }
    var CholeskyDecomposition2 = class {
      constructor(value) {
        value = WrapperMatrix2D2.checkMatrix(value);
        if (!value.isSymmetric()) {
          throw new Error("Matrix is not symmetric");
        }
        let a = value;
        let dimension = a.rows;
        let l = new Matrix3(dimension, dimension);
        let positiveDefinite = true;
        let i, j, k;
        for (j = 0; j < dimension; j++) {
          let d = 0;
          for (k = 0; k < j; k++) {
            let s = 0;
            for (i = 0; i < k; i++) {
              s += l.get(k, i) * l.get(j, i);
            }
            s = (a.get(j, k) - s) / l.get(k, k);
            l.set(j, k, s);
            d = d + s * s;
          }
          d = a.get(j, j) - d;
          positiveDefinite &&= d > 0;
          l.set(j, j, Math.sqrt(Math.max(d, 0)));
          for (k = j + 1; k < dimension; k++) {
            l.set(j, k, 0);
          }
        }
        this.L = l;
        this.positiveDefinite = positiveDefinite;
      }
      isPositiveDefinite() {
        return this.positiveDefinite;
      }
      solve(value) {
        value = WrapperMatrix2D2.checkMatrix(value);
        let l = this.L;
        let dimension = l.rows;
        if (value.rows !== dimension) {
          throw new Error("Matrix dimensions do not match");
        }
        if (this.isPositiveDefinite() === false) {
          throw new Error("Matrix is not positive definite");
        }
        let count = value.columns;
        let B = value.clone();
        let i, j, k;
        for (k = 0; k < dimension; k++) {
          for (j = 0; j < count; j++) {
            for (i = 0; i < k; i++) {
              B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(k, i));
            }
            B.set(k, j, B.get(k, j) / l.get(k, k));
          }
        }
        for (k = dimension - 1; k >= 0; k--) {
          for (j = 0; j < count; j++) {
            for (i = k + 1; i < dimension; i++) {
              B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(i, k));
            }
            B.set(k, j, B.get(k, j) / l.get(k, k));
          }
        }
        return B;
      }
      get lowerTriangularMatrix() {
        return this.L;
      }
    };
    var nipals = class {
      constructor(X, options = {}) {
        X = WrapperMatrix2D2.checkMatrix(X);
        let { Y } = options;
        const {
          scaleScores = false,
          maxIterations = 1e3,
          terminationCriteria = 1e-10
        } = options;
        let u;
        if (Y) {
          if (isAnyArray(Y) && typeof Y[0] === "number") {
            Y = Matrix3.columnVector(Y);
          } else {
            Y = WrapperMatrix2D2.checkMatrix(Y);
          }
          if (Y.rows !== X.rows) {
            throw new Error("Y should have the same number of rows as X");
          }
          u = Y.getColumnVector(0);
        } else {
          u = X.getColumnVector(0);
        }
        let diff = 1;
        let t, q, w, tOld;
        for (let counter = 0; counter < maxIterations && diff > terminationCriteria; counter++) {
          w = X.transpose().mmul(u).div(u.transpose().mmul(u).get(0, 0));
          w = w.div(w.norm());
          t = X.mmul(w).div(w.transpose().mmul(w).get(0, 0));
          if (counter > 0) {
            diff = t.clone().sub(tOld).pow(2).sum();
          }
          tOld = t.clone();
          if (Y) {
            q = Y.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
            q = q.div(q.norm());
            u = Y.mmul(q).div(q.transpose().mmul(q).get(0, 0));
          } else {
            u = t;
          }
        }
        if (Y) {
          let p = X.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
          p = p.div(p.norm());
          let xResidual = X.clone().sub(t.clone().mmul(p.transpose()));
          let residual = u.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
          let yResidual = Y.clone().sub(
            t.clone().mulS(residual.get(0, 0)).mmul(q.transpose())
          );
          this.t = t;
          this.p = p.transpose();
          this.w = w.transpose();
          this.q = q;
          this.u = u;
          this.s = t.transpose().mmul(t);
          this.xResidual = xResidual;
          this.yResidual = yResidual;
          this.betas = residual;
        } else {
          this.w = w.transpose();
          this.s = t.transpose().mmul(t).sqrt();
          if (scaleScores) {
            this.t = t.clone().div(this.s.get(0, 0));
          } else {
            this.t = t;
          }
          this.xResidual = X.sub(t.mmul(w.transpose()));
        }
      }
    };
    exports.AbstractMatrix = AbstractMatrix2;
    exports.CHO = CholeskyDecomposition2;
    exports.CholeskyDecomposition = CholeskyDecomposition2;
    exports.DistanceMatrix = DistanceMatrix2;
    exports.EVD = EigenvalueDecomposition2;
    exports.EigenvalueDecomposition = EigenvalueDecomposition2;
    exports.LU = LuDecomposition2;
    exports.LuDecomposition = LuDecomposition2;
    exports.Matrix = Matrix3;
    exports.MatrixColumnSelectionView = MatrixColumnSelectionView2;
    exports.MatrixColumnView = MatrixColumnView2;
    exports.MatrixFlipColumnView = MatrixFlipColumnView2;
    exports.MatrixFlipRowView = MatrixFlipRowView2;
    exports.MatrixRowSelectionView = MatrixRowSelectionView2;
    exports.MatrixRowView = MatrixRowView2;
    exports.MatrixSelectionView = MatrixSelectionView2;
    exports.MatrixSubView = MatrixSubView2;
    exports.MatrixTransposeView = MatrixTransposeView2;
    exports.NIPALS = nipals;
    exports.Nipals = nipals;
    exports.QR = QrDecomposition2;
    exports.QrDecomposition = QrDecomposition2;
    exports.SVD = SingularValueDecomposition3;
    exports.SingularValueDecomposition = SingularValueDecomposition3;
    exports.SymmetricMatrix = SymmetricMatrix2;
    exports.WrapperMatrix1D = WrapperMatrix1D2;
    exports.WrapperMatrix2D = WrapperMatrix2D2;
    exports.correlation = correlation2;
    exports.covariance = covariance2;
    exports.default = Matrix3;
    exports.determinant = determinant3;
    exports.inverse = inverse3;
    exports.linearDependencies = linearDependencies2;
    exports.pseudoInverse = pseudoInverse2;
    exports.solve = solve2;
    exports.wrap = wrap2;
  }
});

// node_modules/ml-matrix/matrix.mjs
var matrix, Matrix2, SingularValueDecomposition2, matrix_default, inverse2;
var init_matrix = __esm({
  "node_modules/ml-matrix/matrix.mjs"() {
    matrix = __toESM(require_matrix(), 1);
    Matrix2 = matrix.Matrix;
    SingularValueDecomposition2 = matrix.SingularValueDecomposition;
    matrix_default = matrix.default.Matrix ? matrix.default.Matrix : matrix.Matrix;
    inverse2 = matrix.inverse;
  }
});

// src/core/utils/homography.js
var solveHomography, _normalizePoints, _denormalizeHomography;
var init_homography = __esm({
  "src/core/utils/homography.js"() {
    "use strict";
    init_matrix();
    solveHomography = (srcPoints, dstPoints) => {
      const { normPoints: normSrcPoints, param: srcParam } = _normalizePoints(srcPoints);
      const { normPoints: normDstPoints, param: dstParam } = _normalizePoints(dstPoints);
      const num = normDstPoints.length;
      const AData = [];
      const BData = [];
      for (let j = 0; j < num; j++) {
        const row1 = [
          normSrcPoints[j][0],
          normSrcPoints[j][1],
          1,
          0,
          0,
          0,
          -(normSrcPoints[j][0] * normDstPoints[j][0]),
          -(normSrcPoints[j][1] * normDstPoints[j][0])
        ];
        const row2 = [
          0,
          0,
          0,
          normSrcPoints[j][0],
          normSrcPoints[j][1],
          1,
          -(normSrcPoints[j][0] * normDstPoints[j][1]),
          -(normSrcPoints[j][1] * normDstPoints[j][1])
        ];
        AData.push(row1);
        AData.push(row2);
        BData.push([normDstPoints[j][0]]);
        BData.push([normDstPoints[j][1]]);
      }
      try {
        const A = new Matrix2(AData);
        const B = new Matrix2(BData);
        const AT = A.transpose();
        const ATA = AT.mmul(A);
        const ATB = AT.mmul(B);
        const ATAInv = inverse2(ATA);
        const C = ATAInv.mmul(ATB).to1DArray();
        const H = _denormalizeHomography(C, srcParam, dstParam);
        return H;
      } catch (e) {
        return null;
      }
    };
    _normalizePoints = (coords) => {
      let sumX = 0;
      let sumY = 0;
      for (let i = 0; i < coords.length; i++) {
        sumX += coords[i][0];
        sumY += coords[i][1];
      }
      let meanX = sumX / coords.length;
      let meanY = sumY / coords.length;
      let sumDiff = 0;
      for (let i = 0; i < coords.length; i++) {
        const diffX = coords[i][0] - meanX;
        const diffY = coords[i][1] - meanY;
        sumDiff += Math.sqrt(diffX * diffX + diffY * diffY);
      }
      let s = Math.sqrt(2) * coords.length / sumDiff;
      const normPoints = [];
      for (let i = 0; i < coords.length; i++) {
        normPoints.push([(coords[i][0] - meanX) * s, (coords[i][1] - meanY) * s]);
      }
      return { normPoints, param: { meanX, meanY, s } };
    };
    _denormalizeHomography = (nH, srcParam, dstParam) => {
      const sMeanX = dstParam.s * dstParam.meanX;
      const sMeanY = dstParam.s * dstParam.meanY;
      const H = [
        nH[0] + sMeanX * nH[6],
        nH[1] + sMeanX * nH[7],
        (nH[0] + sMeanX * nH[6]) * -srcParam.meanX + (nH[1] + sMeanX * nH[7]) * -srcParam.meanY + (nH[2] + sMeanX) / srcParam.s,
        nH[3] + sMeanY * nH[6],
        nH[4] + sMeanY * nH[7],
        (nH[3] + sMeanY * nH[6]) * -srcParam.meanX + (nH[4] + sMeanY * nH[7]) * -srcParam.meanY + (nH[5] + sMeanY) / srcParam.s,
        dstParam.s * nH[6],
        dstParam.s * nH[7],
        dstParam.s * nH[6] * -srcParam.meanX + dstParam.s * nH[7] * -srcParam.meanY + dstParam.s / srcParam.s
      ];
      for (let i = 0; i < 9; i++) {
        H[i] = H[i] / H[8];
      }
      return H;
    };
  }
});

// src/core/matching/ransacHomography.js
var CAUCHY_SCALE, CHUNK_SIZE2, NUM_HYPOTHESES, NUM_HYPOTHESES_QUICK, computeHomography, _checkHeuristics, _normalizeHomography, _cauchyProjectiveReprojectionCost, _checkHomographyPointsGeometricallyConsistent;
var init_ransacHomography = __esm({
  "src/core/matching/ransacHomography.js"() {
    "use strict";
    init_randomizer();
    init_geometry();
    init_homography();
    CAUCHY_SCALE = 0.01;
    CHUNK_SIZE2 = 10;
    NUM_HYPOTHESES = 100;
    NUM_HYPOTHESES_QUICK = 50;
    computeHomography = (options) => {
      const { srcPoints, dstPoints, keyframe, quickMode } = options;
      const testPoints = [
        [0, 0],
        [keyframe.width, 0],
        [keyframe.width, keyframe.height],
        [0, keyframe.height]
      ];
      const sampleSize = 4;
      if (srcPoints.length < sampleSize) return null;
      const scale = CAUCHY_SCALE;
      const oneOverScale2 = 1 / (scale * scale);
      const chuckSize = Math.min(CHUNK_SIZE2, srcPoints.length);
      const randomizer = createRandomizer();
      const perm = [];
      for (let i = 0; i < srcPoints.length; i++) {
        perm[i] = i;
      }
      randomizer.arrayShuffle({ arr: perm, sampleSize: perm.length });
      const numHypothesis = quickMode ? NUM_HYPOTHESES_QUICK : NUM_HYPOTHESES;
      const maxTrials = numHypothesis * 2;
      let trial = 0;
      const Hs = [];
      while (trial < maxTrials && Hs.length < numHypothesis) {
        trial += 1;
        randomizer.arrayShuffle({ arr: perm, sampleSize });
        if (!checkFourPointsConsistent(
          srcPoints[perm[0]],
          srcPoints[perm[1]],
          srcPoints[perm[2]],
          srcPoints[perm[3]],
          dstPoints[perm[0]],
          dstPoints[perm[1]],
          dstPoints[perm[2]],
          dstPoints[perm[3]]
        )) {
          continue;
        }
        const H = solveHomography(
          [srcPoints[perm[0]], srcPoints[perm[1]], srcPoints[perm[2]], srcPoints[perm[3]]],
          [dstPoints[perm[0]], dstPoints[perm[1]], dstPoints[perm[2]], dstPoints[perm[3]]]
        );
        if (H === null) continue;
        if (!_checkHomographyPointsGeometricallyConsistent({ H, testPoints })) {
          continue;
        }
        Hs.push(H);
      }
      if (Hs.length === 0) return null;
      const hypotheses = [];
      for (let i = 0; i < Hs.length; i++) {
        hypotheses.push({
          H: Hs[i],
          cost: 0
        });
      }
      let curChuckSize = chuckSize;
      for (let i = 0; i < srcPoints.length && hypotheses.length > 2; i += curChuckSize) {
        curChuckSize = Math.min(chuckSize, srcPoints.length - i);
        let chuckEnd = i + curChuckSize;
        for (let j = 0; j < hypotheses.length; j++) {
          for (let k = i; k < chuckEnd; k++) {
            const cost = _cauchyProjectiveReprojectionCost({
              H: hypotheses[j].H,
              srcPoint: srcPoints[k],
              dstPoint: dstPoints[k],
              oneOverScale2
            });
            hypotheses[j].cost += cost;
          }
        }
        hypotheses.sort((h1, h2) => {
          return h1.cost - h2.cost;
        });
        hypotheses.splice(-Math.floor((hypotheses.length + 1) / 2));
      }
      let finalH = null;
      for (let i = 0; i < hypotheses.length; i++) {
        const H = _normalizeHomography({ inH: hypotheses[i].H });
        if (_checkHeuristics({ H, testPoints, keyframe })) {
          finalH = H;
          break;
        }
      }
      return finalH;
    };
    _checkHeuristics = ({ H, testPoints, keyframe }) => {
      const mp = [];
      for (let i = 0; i < testPoints.length; i++) {
        mp.push(multiplyPointHomographyInhomogenous(testPoints[i], H));
      }
      const smallArea = smallestTriangleArea(mp[0], mp[1], mp[2], mp[3]);
      if (smallArea < keyframe.width * keyframe.height * 1e-4) return false;
      if (!quadrilateralConvex(mp[0], mp[1], mp[2], mp[3])) return false;
      return true;
    };
    _normalizeHomography = ({ inH }) => {
      if (inH[8] === 0 || !isFinite(inH[8])) return null;
      const oneOver = 1 / inH[8];
      const H = [];
      for (let i = 0; i < 8; i++) {
        H[i] = inH[i] * oneOver;
      }
      H[8] = 1;
      return H;
    };
    _cauchyProjectiveReprojectionCost = ({ H, srcPoint, dstPoint, oneOverScale2 }) => {
      const x = multiplyPointHomographyInhomogenous(srcPoint, H);
      const f = [x[0] - dstPoint[0], x[1] - dstPoint[1]];
      return Math.log(1 + (f[0] * f[0] + f[1] * f[1]) * oneOverScale2);
    };
    _checkHomographyPointsGeometricallyConsistent = ({ H, testPoints }) => {
      const mappedPoints = [];
      for (let i = 0; i < testPoints.length; i++) {
        mappedPoints[i] = multiplyPointHomographyInhomogenous(testPoints[i], H);
      }
      for (let i = 0; i < testPoints.length; i++) {
        const i1 = i;
        const i2 = (i + 1) % testPoints.length;
        const i3 = (i + 2) % testPoints.length;
        if (!checkThreePointsConsistent(
          testPoints[i1],
          testPoints[i2],
          testPoints[i3],
          mappedPoints[i1],
          mappedPoints[i2],
          mappedPoints[i3]
        ))
          return false;
      }
      return true;
    };
  }
});

// src/core/estimation/morph-refinement.js
function refineWithMorphology({
  imageData,
  width,
  height,
  targetData,
  initialH,
  iterations = 3
}) {
  let currentH = [...initialH];
  const boundaryPoints = [];
  const step = 0.05;
  for (let i = 0; i <= 1; i += step) {
    boundaryPoints.push({ x: i * targetData.w, y: 0 });
    boundaryPoints.push({ x: i * targetData.w, y: targetData.h });
    boundaryPoints.push({ x: 0, y: i * targetData.h });
    boundaryPoints.push({ x: targetData.w, y: i * targetData.h });
  }
  for (let iter = 0; iter < iterations; iter++) {
    const correspondences = [];
    for (const pt of boundaryPoints) {
      const w = currentH[6] * pt.x + currentH[7] * pt.y + currentH[8];
      const sx = (currentH[0] * pt.x + currentH[1] * pt.y + currentH[2]) / w;
      const sy = (currentH[3] * pt.x + currentH[4] * pt.y + currentH[5]) / w;
      if (sx < 2 || sx >= width - 2 || sy < 2 || sy >= height - 2) continue;
      const searchDist = 10;
      let bestX = sx;
      let bestY = sy;
      let maxGrad = -1;
      for (let dy = -searchDist; dy <= searchDist; dy += 2) {
        for (let dx = -searchDist; dx <= searchDist; dx += 2) {
          const nx = Math.max(1, Math.min(width - 2, Math.floor(sx + dx)));
          const ny = Math.max(1, Math.min(height - 2, Math.floor(sy + dy)));
          const idx = ny * width + nx;
          const gx = imageData[idx + 1] - imageData[idx - 1];
          const gy = imageData[idx + width] - imageData[idx - width];
          const grad = gx * gx + gy * gy;
          if (grad > maxGrad) {
            maxGrad = grad;
            bestX = nx;
            bestY = ny;
          }
        }
      }
      if (maxGrad > 500) {
        correspondences.push({
          src: pt,
          dst: { x: bestX, y: bestY },
          weight: Math.min(1, maxGrad / 15e3)
        });
      }
    }
    if (correspondences.length < 10) break;
    const nextH = solveDLTWeight(correspondences);
    if (nextH) {
      for (let i = 0; i < 9; i++) {
        currentH[i] = currentH[i] * 0.5 + nextH[i] * 0.5;
      }
    }
  }
  return currentH;
}
function solveDLTWeight(pairs) {
  const n = pairs.length;
  const A = new Matrix2(n * 2, 9);
  for (let i = 0; i < n; i++) {
    const { src, dst, weight: w } = pairs[i];
    const x = src.x;
    const y = src.y;
    const xp = dst.x;
    const yp = dst.y;
    A.set(i * 2, 0, 0);
    A.set(i * 2, 1, 0);
    A.set(i * 2, 2, 0);
    A.set(i * 2, 3, -x * w);
    A.set(i * 2, 4, -y * w);
    A.set(i * 2, 5, -w);
    A.set(i * 2, 6, yp * x * w);
    A.set(i * 2, 7, yp * y * w);
    A.set(i * 2, 8, yp * w);
    A.set(i * 2 + 1, 0, x * w);
    A.set(i * 2 + 1, 1, y * w);
    A.set(i * 2 + 1, 2, w);
    A.set(i * 2 + 1, 3, 0);
    A.set(i * 2 + 1, 4, 0);
    A.set(i * 2 + 1, 5, 0);
    A.set(i * 2 + 1, 6, -xp * x * w);
    A.set(i * 2 + 1, 7, -xp * y * w);
    A.set(i * 2 + 1, 8, -xp * w);
  }
  try {
    const svd = new SingularValueDecomposition2(A);
    const V = svd.rightSingularVectors;
    const h = V.getColumn(8);
    const scale = 1 / h[8];
    return h.map((v) => v * scale);
  } catch (e) {
    return null;
  }
}
var init_morph_refinement = __esm({
  "src/core/estimation/morph-refinement.js"() {
    "use strict";
    init_matrix();
  }
});

// src/core/matching/hierarchical-clustering.js
function popcount322(n) {
  n = n >>> 0;
  n = n - (n >>> 1 & 1431655765);
  n = (n & 858993459) + (n >>> 2 & 858993459);
  return (n + (n >>> 4) & 252645135) * 16843009 >>> 24;
}
var MIN_FEATURE_PER_NODE, NUM_ASSIGNMENT_HYPOTHESES, NUM_CENTERS, _computeKMedoids, build, _build;
var init_hierarchical_clustering = __esm({
  "src/core/matching/hierarchical-clustering.js"() {
    "use strict";
    init_hamming_distance();
    init_randomizer();
    MIN_FEATURE_PER_NODE = 32;
    NUM_ASSIGNMENT_HYPOTHESES = 12;
    NUM_CENTERS = 8;
    _computeKMedoids = (options) => {
      const { descriptors, pointIndexes, randomizer, useHDC } = options;
      const numPointIndexes = pointIndexes.length;
      const randomPointIndexes = new Int32Array(numPointIndexes);
      for (let i = 0; i < numPointIndexes; i++) {
        randomPointIndexes[i] = i;
      }
      let bestSumD = Number.MAX_SAFE_INTEGER;
      let bestAssignment = null;
      const centerPointIndices = new Int32Array(NUM_CENTERS);
      for (let i = 0; i < NUM_ASSIGNMENT_HYPOTHESES; i++) {
        randomizer.arrayShuffle({ arr: randomPointIndexes, sampleSize: NUM_CENTERS });
        for (let k = 0; k < NUM_CENTERS; k++) {
          centerPointIndices[k] = pointIndexes[randomPointIndexes[k]];
        }
        let sumD = 0;
        const currentAssignment = new Int32Array(numPointIndexes);
        for (let j = 0; j < numPointIndexes; j++) {
          const pIdx = pointIndexes[j];
          let bestD = 255;
          let bestCenterIdx = -1;
          for (let k = 0; k < NUM_CENTERS; k++) {
            const cIdx = centerPointIndices[k];
            let d;
            if (useHDC) {
              d = popcount322(descriptors[pIdx] ^ descriptors[cIdx]);
            } else {
              d = compute64(descriptors, pIdx * 2, descriptors, cIdx * 2);
            }
            if (d < bestD) {
              bestCenterIdx = randomPointIndexes[k];
              bestD = d;
            }
          }
          currentAssignment[j] = bestCenterIdx;
          sumD += bestD;
        }
        if (sumD < bestSumD) {
          bestSumD = sumD;
          bestAssignment = currentAssignment;
        }
      }
      return bestAssignment;
    };
    build = ({ points }) => {
      const numPoints = points.length;
      if (numPoints === 0) return { rootNode: { leaf: true, pointIndexes: [], centerPointIndex: null } };
      const useHDC = points[0] && points[0].hdcSignature !== void 0;
      const descriptors = new Uint32Array(useHDC ? numPoints : numPoints * 2);
      for (let i = 0; i < numPoints; i++) {
        if (useHDC) {
          descriptors[i] = points[i].hdcSignature;
        } else {
          const d = points[i].descriptors;
          descriptors[i * 2] = d[0];
          descriptors[i * 2 + 1] = d[1];
        }
      }
      const pointIndexes = new Int32Array(numPoints);
      for (let i = 0; i < numPoints; i++) {
        pointIndexes[i] = i;
      }
      const randomizer = createRandomizer();
      const rootNode = _build({
        descriptors,
        pointIndexes,
        centerPointIndex: null,
        randomizer,
        useHDC
      });
      return { rootNode };
    };
    _build = (options) => {
      const { descriptors, pointIndexes, centerPointIndex, randomizer, useHDC } = options;
      const numPoints = pointIndexes.length;
      let isLeaf = false;
      if (numPoints <= NUM_CENTERS || numPoints <= MIN_FEATURE_PER_NODE) {
        isLeaf = true;
      }
      const clusters = /* @__PURE__ */ new Map();
      if (!isLeaf) {
        const assignment = _computeKMedoids({ descriptors, pointIndexes, randomizer, useHDC });
        for (let i = 0; i < assignment.length; i++) {
          const centerIdx = pointIndexes[assignment[i]];
          let cluster = clusters.get(centerIdx);
          if (cluster === void 0) {
            cluster = [];
            clusters.set(centerIdx, cluster);
          }
          cluster.push(pointIndexes[i]);
        }
        if (clusters.size === 1) {
          isLeaf = true;
        }
      }
      const node = {
        centerPointIndex
      };
      if (isLeaf) {
        node.leaf = true;
        node.pointIndexes = new Int32Array(pointIndexes);
        return node;
      }
      node.leaf = false;
      node.children = [];
      for (const [cIdx, clusterPoints] of clusters) {
        node.children.push(
          _build({
            descriptors,
            pointIndexes: new Int32Array(clusterPoints),
            centerPointIndex: cIdx,
            randomizer,
            useHDC
          })
        );
      }
      return node;
    };
  }
});

// src/core/utils/delaunay.js
function triangulate(points) {
  if (points.length < 3) return [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const dx = maxX - minX;
  const dy = maxY - minY;
  const deltaMax = Math.max(dx, dy);
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const p1 = { x: midX - 20 * deltaMax, y: midY - deltaMax };
  const p2 = { x: midX, y: midY + 20 * deltaMax };
  const p3 = { x: midX + 20 * deltaMax, y: midY - deltaMax };
  let triangles = [
    { p1, p2, p3, indices: [-1, -2, -3] }
  ];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const badTriangles = [];
    for (const t of triangles) {
      if (isInCircumcircle(p, t)) {
        badTriangles.push(t);
      }
    }
    const polygon = [];
    for (const t of badTriangles) {
      const edges = [
        { a: t.p1, b: t.p2, i1: t.indices[0], i2: t.indices[1] },
        { a: t.p2, b: t.p3, i1: t.indices[1], i2: t.indices[2] },
        { a: t.p3, b: t.p1, i1: t.indices[2], i2: t.indices[0] }
      ];
      for (const edge of edges) {
        let isShared = false;
        for (const t2 of badTriangles) {
          if (t === t2) continue;
          if (isSameEdge(edge, t2)) {
            isShared = true;
            break;
          }
        }
        if (!isShared) {
          polygon.push(edge);
        }
      }
    }
    triangles = triangles.filter((t) => !badTriangles.includes(t));
    for (const edge of polygon) {
      triangles.push({
        p1: edge.a,
        p2: edge.b,
        p3: p,
        indices: [edge.i1, edge.i2, i]
      });
    }
  }
  return triangles.filter((t) => {
    return t.indices[0] >= 0 && t.indices[1] >= 0 && t.indices[2] >= 0;
  }).map((t) => t.indices);
}
function isInCircumcircle(p, t) {
  const x1 = t.p1.x, y1 = t.p1.y;
  const x2 = t.p2.x, y2 = t.p2.y;
  const x3 = t.p3.x, y3 = t.p3.y;
  const D = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
  const centerX = ((x1 * x1 + y1 * y1) * (y2 - y3) + (x2 * x2 + y2 * y2) * (y3 - y1) + (x3 * x3 + y3 * y3) * (y1 - y2)) / D;
  const centerY = ((x1 * x1 + y1 * y1) * (x3 - x2) + (x2 * x2 + y2 * y2) * (x1 - x3) + (x3 * x3 + y3 * y3) * (x2 - x1)) / D;
  const radiusSq = (x1 - centerX) * (x1 - centerX) + (y1 - centerY) * (y1 - centerY);
  const distSq = (p.x - centerX) * (p.x - centerX) + (p.y - centerY) * (p.y - centerY);
  return distSq <= radiusSq;
}
function isSameEdge(edge, triangle) {
  const tEdges = [
    [triangle.indices[0], triangle.indices[1]],
    [triangle.indices[1], triangle.indices[2]],
    [triangle.indices[2], triangle.indices[0]]
  ];
  for (const te2 of tEdges) {
    if (edge.i1 === te2[0] && edge.i2 === te2[1] || edge.i1 === te2[1] && edge.i2 === te2[0]) {
      return true;
    }
  }
  return false;
}
function getEdges(triangles) {
  const edgeSet = /* @__PURE__ */ new Set();
  const edges = [];
  for (const t of triangles) {
    const pairs = [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]];
    for (const pair of pairs) {
      const low = Math.min(pair[0], pair[1]);
      const high = Math.max(pair[0], pair[1]);
      const key = `${low}-${high}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([low, high]);
      }
    }
  }
  return edges;
}
var init_delaunay = __esm({
  "src/core/utils/delaunay.js"() {
    "use strict";
  }
});

// src/core/matching/spectralDeformableMatcher.js
function validateDeformableMatches({ matches, thresholdPx = 15, minInliers = 6 }) {
  if (matches.length < minInliers) return null;
  const n = matches.length;
  const threshold2 = thresholdPx * thresholdPx;
  let bestInliers = [];
  let bestModel = null;
  const NUM_TRIALS = 50;
  for (let trial = 0; trial < NUM_TRIALS; trial++) {
    const idx1 = Math.floor(Math.random() * n);
    let idx2 = Math.floor(Math.random() * n);
    while (idx2 === idx1) idx2 = Math.floor(Math.random() * n);
    let idx3 = Math.floor(Math.random() * n);
    while (idx3 === idx1 || idx3 === idx2) idx3 = Math.floor(Math.random() * n);
    const m1 = matches[idx1];
    const m2 = matches[idx2];
    const m3 = matches[idx3];
    if (m1.keypoint.sx === void 0 || m2.keypoint.sx === void 0 || m3.keypoint.sx === void 0) {
      continue;
    }
    const s1x = m1.keypoint.sx, s1y = m1.keypoint.sy;
    const s2x = m2.keypoint.sx, s2y = m2.keypoint.sy;
    const s3x = m3.keypoint.sx, s3y = m3.keypoint.sy;
    const q1x = m1.querypoint.x, q1y = m1.querypoint.y;
    const q2x = m2.querypoint.x, q2y = m2.querypoint.y;
    const q3x = m3.querypoint.x, q3y = m3.querypoint.y;
    const det = s1x * (s2y - s3y) + s2x * (s3y - s1y) + s3x * (s1y - s2y);
    if (Math.abs(det) < 1e-7) continue;
    const invDet = 1 / det;
    const m00 = (s2y - s3y) * invDet;
    const m01 = (s3y - s1y) * invDet;
    const m02 = (s1y - s2y) * invDet;
    const m10 = (s3x - s2x) * invDet;
    const m11 = (s1x - s3x) * invDet;
    const m12 = (s2x - s1x) * invDet;
    const m20 = (s2x * s3y - s3x * s2y) * invDet;
    const m21 = (s3x * s1y - s1x * s3y) * invDet;
    const m22 = (s1x * s2y - s2x * s1y) * invDet;
    const a = m00 * q1x + m01 * q2x + m02 * q3x;
    const b = m10 * q1x + m11 * q2x + m12 * q3x;
    const tx = m20 * q1x + m21 * q2x + m22 * q3x;
    const c = m00 * q1y + m01 * q2y + m02 * q3y;
    const d = m10 * q1y + m11 * q2y + m12 * q3y;
    const ty = m20 * q1y + m21 * q2y + m22 * q3y;
    const detA = a * d - b * c;
    if (Math.abs(detA) < 1e-4) continue;
    const inliers = [];
    for (let i = 0; i < n; i++) {
      const m = matches[i];
      if (m.keypoint.sx === void 0) continue;
      const sx = m.keypoint.sx;
      const sy = m.keypoint.sy;
      const px = a * sx + b * sy + tx;
      const py = c * sx + d * sy + ty;
      const dx = px - m.querypoint.x;
      const dy = py - m.querypoint.y;
      const err2 = dx * dx + dy * dy;
      if (err2 < threshold2) {
        inliers.push(m);
      }
    }
    if (inliers.length > bestInliers.length) {
      bestInliers = inliers;
      bestModel = { a, b, tx, c, d, ty };
    }
  }
  if (bestInliers.length < minInliers) {
    return null;
  }
  return {
    inliers: bestInliers,
    model: bestModel,
    isDeformable: true
  };
}
var init_spectralDeformableMatcher = __esm({
  "src/core/matching/spectralDeformableMatcher.js"() {
    "use strict";
    init_delaunay();
  }
});

// src/core/matching/matching.js
var INLIER_THRESHOLD, MIN_NUM_INLIERS, CLUSTER_MAX_POP, HAMMING_THRESHOLD, HDC_RATIO_THRESHOLD, MAX_MATCH_QUERY_POINTS, match, _query, _findInlierMatches;
var init_matching = __esm({
  "src/core/matching/matching.js"() {
    "use strict";
    init_tinyqueue();
    init_hamming_distance();
    init_hough();
    init_ransacHomography();
    init_geometry();
    init_morph_refinement();
    init_hierarchical_clustering();
    init_constants();
    init_spectralDeformableMatcher();
    INLIER_THRESHOLD = AR_CONFIG.INLIER_THRESHOLD;
    MIN_NUM_INLIERS = AR_CONFIG.MIN_NUM_INLIERS;
    CLUSTER_MAX_POP = AR_CONFIG.CLUSTER_MAX_POP;
    HAMMING_THRESHOLD = AR_CONFIG.HAMMING_THRESHOLD;
    HDC_RATIO_THRESHOLD = AR_CONFIG.HDC_RATIO_THRESHOLD;
    MAX_MATCH_QUERY_POINTS = AR_CONFIG.MAX_MATCH_QUERY_POINTS;
    match = ({ keyframe, querypoints: rawQuerypoints, querywidth, queryheight, debugMode, expectedScale }) => {
      let debugExtra = {};
      const querypoints = rawQuerypoints.length > MAX_MATCH_QUERY_POINTS ? [...rawQuerypoints].sort((a, b) => (b.score || b.response || 0) - (a.score || a.response || 0)).slice(0, MAX_MATCH_QUERY_POINTS) : rawQuerypoints;
      const matches = [];
      const qlen = querypoints.length;
      const kmax = keyframe.max;
      const kmin = keyframe.min;
      const isHDC = keyframe.hdc === true || kmax && kmax.hdc === 1;
      const isCompact = kmax && kmax.compact === 1 || kmin && kmin.compact === 1;
      const descSize = isHDC || isCompact ? 1 : 2;
      const currentRatioThreshold = isHDC ? HDC_RATIO_THRESHOLD : HAMMING_THRESHOLD;
      for (let j = 0; j < qlen; j++) {
        const querypoint = querypoints[j];
        const col = querypoint.maxima ? kmax : kmin;
        if (!col || col.x.length === 0) continue;
        const rootNode = col.t;
        const keypointIndexes = [];
        const queue = new TinyQueue([], (a1, a2) => a1.d - a2.d);
        _query({
          node: rootNode,
          descriptors: col.d,
          querypoint,
          queue,
          keypointIndexes,
          numPop: 0,
          isHDC,
          descSize,
          isCompact
        });
        let bestIndex = -1;
        let bestD1 = Number.MAX_SAFE_INTEGER;
        let bestD2 = Number.MAX_SAFE_INTEGER;
        const qDesc = querypoint.descriptors;
        const cDesc = col.d;
        const qDescCompact = isCompact && qDesc && qDesc.length >= 2 ? (qDesc[0] ^ qDesc[1]) >>> 0 : 0;
        for (let k = 0; k < keypointIndexes.length; k++) {
          const idx = keypointIndexes[k];
          if (expectedScale !== void 0 && col.s) {
            const featureScale = col.s[idx];
            const idealKeyScale = (querypoint.scale || 1) / expectedScale;
            if (featureScale < idealKeyScale * 0.4 || featureScale > idealKeyScale * 2.5) {
              continue;
            }
          }
          let d;
          if (isHDC) {
            d = popcount322(cDesc[idx] ^ querypoint.hdcSignature);
          } else if (isCompact) {
            d = popcount322(cDesc[idx] ^ qDescCompact);
          } else {
            if (!qDesc || qDesc.length < descSize) continue;
            d = compute({ v1: cDesc, v1Offset: idx * descSize, v2: qDesc });
          }
          if (d < bestD1) {
            bestD2 = bestD1;
            bestD1 = d;
            bestIndex = idx;
          } else if (d < bestD2) {
            bestD2 = d;
          }
        }
        if (bestIndex !== -1) {
          if (bestD2 === Number.MAX_SAFE_INTEGER || bestD1 / bestD2 < currentRatioThreshold) {
            matches.push({
              querypoint,
              keypoint: {
                x: col.x[bestIndex],
                y: col.y[bestIndex],
                angle: col.a[bestIndex],
                scale: col.s ? col.s[bestIndex] : keyframe.s,
                sx: col.sx ? col.sx[bestIndex] : void 0,
                sy: col.sy ? col.sy[bestIndex] : void 0
              },
              d: bestD1
            });
          }
        }
      }
      if (matches.length < MIN_NUM_INLIERS) {
        return { debugExtra };
      }
      const constellationMatches = matches;
      if (debugMode) debugExtra.constellationMatches = constellationMatches;
      const houghMatches = computeHoughMatches({
        keywidth: keyframe.w || keyframe.width,
        keyheight: keyframe.h || keyframe.height,
        querywidth,
        queryheight,
        matches: constellationMatches
      });
      if (debugMode) {
        debugExtra.houghMatches = houghMatches;
      }
      if (houghMatches.length < MIN_NUM_INLIERS) {
        return { debugExtra };
      }
      const H = computeHomography({
        srcPoints: houghMatches.map((m) => [m.keypoint.x, m.keypoint.y]),
        dstPoints: houghMatches.map((m) => [m.querypoint.x, m.querypoint.y]),
        keyframe: { width: keyframe.w || keyframe.width, height: keyframe.h || keyframe.height }
      });
      if (H === null) {
        const deformableResult = validateDeformableMatches({
          matches: houghMatches,
          minInliers: MIN_NUM_INLIERS
        });
        if (deformableResult) {
          if (debugMode) debugExtra.deformableResult = deformableResult;
          return {
            isDeformable: true,
            inliers: deformableResult.inliers,
            model: deformableResult.model,
            matches: deformableResult.inliers,
            debugExtra
          };
        }
        return { debugExtra };
      }
      const inlierMatches = _findInlierMatches({
        H,
        matches: houghMatches,
        threshold: INLIER_THRESHOLD
      });
      if (debugMode) debugExtra.inlierMatches = inlierMatches;
      if (inlierMatches.length < MIN_NUM_INLIERS) {
        return { debugExtra };
      }
      if (debugMode && Math.random() < 0.02) {
        console.log(`MATCH: Homography success with ${inlierMatches.length} inliers`);
      }
      const HInv = matrixInverse33(H, 1e-5);
      if (!HInv) return { debugExtra };
      const dThreshold2 = 100;
      const matches2 = [];
      const hi00 = HInv[0], hi01 = HInv[1], hi02 = HInv[2];
      const hi10 = HInv[3], hi11 = HInv[4], hi12 = HInv[5];
      const hi20 = HInv[6], hi21 = HInv[7], hi22 = HInv[8];
      for (let j = 0; j < qlen; j++) {
        const querypoint = querypoints[j];
        const qx = querypoint.x, qy = querypoint.y;
        const uz = qx * hi20 + qy * hi21 + hi22;
        const invZ = 1 / uz;
        const mapX = (qx * hi00 + qy * hi01 + hi02) * invZ;
        const mapY = (qx * hi10 + qy * hi11 + hi12) * invZ;
        let bestIndex = -1;
        let bestD1 = Number.MAX_SAFE_INTEGER;
        let bestD2 = Number.MAX_SAFE_INTEGER;
        const col = querypoint.maxima ? kmax : kmin;
        if (!col) continue;
        const cx = col.x, cy = col.y, cd = col.d;
        const qDesc = querypoint.descriptors;
        const qDescCompact = isCompact && qDesc && qDesc.length >= 2 ? (qDesc[0] ^ qDesc[1]) >>> 0 : 0;
        for (let k = 0, clen2 = cx.length; k < clen2; k++) {
          const dx = cx[k] - mapX;
          const dy = cy[k] - mapY;
          const d2 = dx * dx + dy * dy;
          if (d2 > dThreshold2) continue;
          let d;
          if (isHDC) {
            d = popcount322(cd[k] ^ querypoint.hdcSignature);
          } else if (isCompact) {
            d = popcount322(cd[k] ^ qDescCompact);
          } else {
            if (!qDesc || qDesc.length < descSize) continue;
            d = compute({ v1: cd, v1Offset: k * descSize, v2: qDesc });
          }
          if (d < bestD1) {
            bestD2 = bestD1;
            bestD1 = d;
            bestIndex = k;
          } else if (d < bestD2) {
            bestD2 = d;
          }
        }
        if (bestIndex !== -1 && (bestD2 === Number.MAX_SAFE_INTEGER || bestD1 / bestD2 < currentRatioThreshold)) {
          matches2.push({
            querypoint,
            keypoint: {
              x: col.x[bestIndex],
              y: col.y[bestIndex],
              angle: col.a[bestIndex],
              scale: col.s ? col.s[bestIndex] : keyframe.s,
              sx: col.sx ? col.sx[bestIndex] : void 0,
              sy: col.sy ? col.sy[bestIndex] : void 0
            }
          });
        }
      }
      if (debugMode) debugExtra.matches2 = matches2;
      const houghMatches2 = computeHoughMatches({
        keywidth: keyframe.w || keyframe.width,
        keyheight: keyframe.h || keyframe.height,
        querywidth,
        queryheight,
        matches: matches2
      });
      if (debugMode) debugExtra.houghMatches2 = houghMatches2;
      const H2 = computeHomography({
        srcPoints: houghMatches2.map((m) => [m.keypoint.x, m.keypoint.y]),
        dstPoints: houghMatches2.map((m) => [m.querypoint.x, m.querypoint.y]),
        keyframe: { width: keyframe.w || keyframe.width, height: keyframe.h || keyframe.height }
      });
      if (H2 === null) return { debugExtra };
      const inlierMatches2 = _findInlierMatches({
        H: H2,
        matches: houghMatches2,
        threshold: INLIER_THRESHOLD
      });
      if (debugMode) debugExtra.inlierMatches2 = inlierMatches2;
      const refinedH = refineWithMorphology({
        imageData: rawQuerypoints[0].imageData,
        width: querywidth,
        height: queryheight,
        targetData: { w: keyframe.w || keyframe.width, h: keyframe.h || keyframe.height },
        initialH: H2,
        iterations: 3
      });
      return { H: refinedH || H2, matches: inlierMatches2, debugExtra };
    };
    _query = ({ node, descriptors, querypoint, queue, keypointIndexes, numPop, isHDC, descSize, isCompact }) => {
      const isLeaf = node[0] === 1;
      const childrenOrIndices = node[2];
      if (isLeaf) {
        for (let i = 0; i < childrenOrIndices.length; i++) {
          keypointIndexes.push(childrenOrIndices[i]);
        }
        return;
      }
      const qDesc = querypoint.descriptors;
      const qDescCompact = isCompact && qDesc && qDesc.length >= 2 ? (qDesc[0] ^ qDesc[1]) >>> 0 : 0;
      let minD = Number.MAX_SAFE_INTEGER;
      const clen2 = childrenOrIndices.length;
      const distances = new Int32Array(clen2);
      for (let i = 0; i < clen2; i++) {
        const childNode = childrenOrIndices[i];
        const cIdx = childNode[1];
        let d;
        if (isHDC) {
          d = popcount322(descriptors[cIdx] ^ querypoint.hdcSignature);
        } else if (isCompact) {
          d = popcount322(descriptors[cIdx] ^ qDescCompact);
        } else {
          d = compute({
            v1: descriptors,
            v1Offset: cIdx * descSize,
            v2: qDesc
          });
        }
        distances[i] = d;
        if (d < minD) minD = d;
      }
      for (let i = 0; i < clen2; i++) {
        const dist = distances[i];
        if (dist <= minD) {
          _query({ node: childrenOrIndices[i], descriptors, querypoint, queue, keypointIndexes, numPop: numPop + 1, isHDC, descSize, isCompact });
        } else {
          queue.push({ node: childrenOrIndices[i], d: dist });
        }
      }
      if (numPop < CLUSTER_MAX_POP && queue.length > 0) {
        const { node: node2 } = queue.pop();
        _query({ node: node2, descriptors, querypoint, queue, keypointIndexes, numPop: numPop + 1, isHDC, descSize, isCompact });
      }
    };
    _findInlierMatches = (options) => {
      const { H, matches, threshold } = options;
      const threshold2 = threshold * threshold;
      const h00 = H[0], h01 = H[1], h02 = H[2];
      const h10 = H[3], h11 = H[4], h12 = H[5];
      const h20 = H[6], h21 = H[7], h22 = H[8];
      const goodMatches = [];
      for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        const qp = m.querypoint;
        const kp = m.keypoint;
        const uz = kp.x * h20 + kp.y * h21 + h22;
        const invZ = 1 / uz;
        const mx = (kp.x * h00 + kp.y * h01 + h02) * invZ;
        const my = (kp.x * h10 + kp.y * h11 + h12) * invZ;
        const dx = mx - qp.x;
        const dy = my - qp.y;
        if (dx * dx + dy * dy <= threshold2) {
          goodMatches.push(m);
        }
      }
      return goodMatches;
    };
  }
});

// src/core/matching/matcher.js
var matcher_exports = {};
__export(matcher_exports, {
  Matcher: () => Matcher
});
var Matcher;
var init_matcher = __esm({
  "src/core/matching/matcher.js"() {
    "use strict";
    init_matching();
    Matcher = class {
      constructor(queryWidth, queryHeight, debugMode = false) {
        this.queryWidth = queryWidth;
        this.queryHeight = queryHeight;
        this.debugMode = debugMode;
      }
      matchDetection(keyframes, featurePoints, expectedScale) {
        let debugExtra = { frames: [] };
        let bestResult = null;
        if (!keyframes || !Array.isArray(keyframes)) {
          return { targetIndex: -1, keyframeIndex: -1, debugExtra };
        }
        for (let j = 0; j < keyframes.length; j++) {
          const {
            H,
            matches,
            debugExtra: frameDebugExtra
          } = match({
            keyframe: keyframes[j],
            querypoints: featurePoints,
            querywidth: this.queryWidth,
            queryheight: this.queryHeight,
            debugMode: this.debugMode,
            expectedScale
          });
          if (frameDebugExtra) {
            frameDebugExtra.keyframeIndex = j;
            debugExtra.frames.push(frameDebugExtra);
          }
          if (H) {
            if (bestResult === null || bestResult.matches.length < matches.length) {
              bestResult = { keyframeIndex: j, H, matches };
            }
          }
        }
        if (bestResult === null) {
          return { targetIndex: -1, keyframeIndex: -1, debugExtra };
        }
        const screenCoords = [];
        const worldCoords = [];
        const keyframe = keyframes[bestResult.keyframeIndex];
        const kfScale = keyframe.s || keyframe.scale || 1;
        for (let i = 0; i < bestResult.matches.length; i++) {
          const querypoint = bestResult.matches[i].querypoint;
          const keypoint = bestResult.matches[i].keypoint;
          const pointScale = keypoint.scale || kfScale;
          screenCoords.push({
            x: querypoint.x,
            y: querypoint.y
          });
          worldCoords.push({
            x: (keypoint.x + 0.5) / kfScale,
            y: (keypoint.y + 0.5) / kfScale,
            z: 0
          });
        }
        return {
          screenCoords,
          worldCoords,
          targetIndex: -1,
          // Caller knows the targetIndex
          keyframeIndex: bestResult.keyframeIndex,
          H: bestResult.H,
          debugExtra
        };
      }
    };
  }
});

// src/core/estimation/pnp-solver.js
function solvePosePnP({
  screenCoords,
  worldCoords,
  projectionTransform
}) {
  const K = new Matrix2(projectionTransform);
  const n = screenCoords.length;
  const KI = Inverse3x3(projectionTransform);
  const A = new Matrix2(n * 2, 9);
  for (let i = 0; i < n; i++) {
    const sci = screenCoords[i];
    const wci = worldCoords[i];
    const nx = KI[0] * sci.x + KI[1] * sci.y + KI[2];
    const ny = KI[3] * sci.x + KI[4] * sci.y + KI[5];
    const nz = KI[6] * sci.x + KI[7] * sci.y + KI[8];
    const unx = nx / nz;
    const uny = ny / nz;
    const X = wci.x;
    const Y = wci.y;
    A.set(i * 2, 0, X);
    A.set(i * 2, 1, Y);
    A.set(i * 2, 2, 1);
    A.set(i * 2, 3, 0);
    A.set(i * 2, 4, 0);
    A.set(i * 2, 5, 0);
    A.set(i * 2, 6, -unx * X);
    A.set(i * 2, 7, -unx * Y);
    A.set(i * 2, 8, -unx);
    A.set(i * 2 + 1, 0, 0);
    A.set(i * 2 + 1, 1, 0);
    A.set(i * 2 + 1, 2, 0);
    A.set(i * 2 + 1, 3, X);
    A.set(i * 2 + 1, 4, Y);
    A.set(i * 2 + 1, 5, 1);
    A.set(i * 2 + 1, 6, -uny * X);
    A.set(i * 2 + 1, 7, -uny * Y);
    A.set(i * 2 + 1, 8, -uny);
  }
  const svd = new SingularValueDecomposition2(A);
  const V = svd.rightSingularVectors;
  const sol = V.getColumn(8);
  if (sol[8] < 0) {
    for (let i = 0; i < 9; i++) sol[i] = -sol[i];
  }
  const r1_raw = [sol[0], sol[3], sol[6]];
  const r2_raw = [sol[1], sol[4], sol[7]];
  const t_raw = [sol[2], sol[5], sol[8]];
  const scale1 = Math.sqrt(r1_raw[0] ** 2 + r1_raw[1] ** 2 + r1_raw[2] ** 2);
  const scale2 = Math.sqrt(r2_raw[0] ** 2 + r2_raw[1] ** 2 + r2_raw[2] ** 2);
  const scale = (scale1 + scale2) / 2;
  const R_approx = new Matrix2([
    [r1_raw[0] / scale1, r2_raw[0] / scale2, 0],
    [r1_raw[1] / scale1, r2_raw[1] / scale2, 0],
    [r1_raw[2] / scale1, r2_raw[2] / scale2, 0]
  ]);
  R_approx.set(0, 2, R_approx.get(1, 0) * R_approx.get(2, 1) - R_approx.get(2, 0) * R_approx.get(1, 1));
  R_approx.set(1, 2, R_approx.get(2, 0) * R_approx.get(0, 1) - R_approx.get(0, 0) * R_approx.get(2, 1));
  R_approx.set(2, 2, R_approx.get(0, 0) * R_approx.get(1, 1) - R_approx.get(1, 0) * R_approx.get(0, 1));
  const svdRot = new SingularValueDecomposition2(R_approx);
  const U = svdRot.leftSingularVectors;
  const Vrot = svdRot.rightSingularVectors;
  let R = U.mmul(Vrot.transpose());
  const getDet3 = (m) => {
    return m.get(0, 0) * (m.get(1, 1) * m.get(2, 2) - m.get(1, 2) * m.get(2, 1)) - m.get(0, 1) * (m.get(1, 0) * m.get(2, 2) - m.get(1, 2) * m.get(2, 0)) + m.get(0, 2) * (m.get(1, 0) * m.get(2, 1) - m.get(1, 1) * m.get(2, 0));
  };
  if (getDet3(R) < 0) {
    const U_mat = U.clone();
    for (let i = 0; i < 3; i++) U_mat.set(i, 2, -U_mat.get(i, 2));
    R = U_mat.mmul(Vrot.transpose());
  }
  return [
    [R.get(0, 0), R.get(0, 1), R.get(0, 2), t_raw[0] / scale],
    [R.get(1, 0), R.get(1, 1), R.get(1, 2), t_raw[1] / scale],
    [R.get(2, 0), R.get(2, 1), R.get(2, 2), t_raw[2] / scale]
  ];
}
function Inverse3x3(m) {
  const k00 = m[0][0], k01 = m[0][1], k02 = m[0][2];
  const k10 = m[1][0], k11 = m[1][1], k12 = m[1][2];
  const k20 = m[2][0], k21 = m[2][1], k22 = m[2][2];
  const det = k00 * (k11 * k22 - k21 * k12) - k01 * (k10 * k22 - k12 * k20) + k02 * (k10 * k21 - k11 * k20);
  const invDet = 1 / det;
  return [
    (k11 * k22 - k12 * k21) * invDet,
    (k02 * k21 - k01 * k22) * invDet,
    (k01 * k12 - k02 * k11) * invDet,
    (k12 * k20 - k10 * k22) * invDet,
    (k00 * k22 - k02 * k20) * invDet,
    (k10 * k02 - k00 * k12) * invDet,
    (k10 * k21 - k11 * k20) * invDet,
    (k20 * k01 - k21 * k00) * invDet,
    (k00 * k11 - k10 * k01) * invDet
  ];
}
var init_pnp_solver = __esm({
  "src/core/estimation/pnp-solver.js"() {
    "use strict";
    init_matrix();
  }
});

// src/core/estimation/estimate.js
var estimate;
var init_estimate = __esm({
  "src/core/estimation/estimate.js"() {
    "use strict";
    init_pnp_solver();
    estimate = ({ screenCoords, worldCoords, projectionTransform }) => {
      return solvePosePnP({
        screenCoords,
        worldCoords,
        projectionTransform
      });
    };
  }
});

// src/core/estimation/refine-estimate.js
var TRACKING_THRESH, K2_FACTOR, ICP_MAX_LOOP, ICP_BREAK_LOOP_ERROR_THRESH, ICP_BREAK_LOOP_ERROR_RATIO_THRESH, mat, J_U_Xc, J_Xc_S, refineEstimate, _doICP, _updateModelViewTransform, _getDeltaS, _getJ_U_S;
var init_refine_estimate = __esm({
  "src/core/estimation/refine-estimate.js"() {
    "use strict";
    init_matrix();
    init_utils();
    TRACKING_THRESH = 5;
    K2_FACTOR = 4;
    ICP_MAX_LOOP = 10;
    ICP_BREAK_LOOP_ERROR_THRESH = 0.1;
    ICP_BREAK_LOOP_ERROR_RATIO_THRESH = 0.99;
    mat = [[], [], []];
    J_U_Xc = [[], []];
    J_Xc_S = [[], [], []];
    refineEstimate = ({
      initialModelViewTransform,
      projectionTransform,
      worldCoords,
      screenCoords,
      stabilities
      // Stability-based weighting
    }) => {
      let dx = 0;
      let dy = 0;
      for (let i = 0; i < worldCoords.length; i++) {
        dx += worldCoords[i].x;
        dy += worldCoords[i].y;
      }
      dx /= worldCoords.length;
      dy /= worldCoords.length;
      const normalizedWorldCoords = [];
      for (let i = 0; i < worldCoords.length; i++) {
        normalizedWorldCoords.push({
          x: worldCoords[i].x - dx,
          y: worldCoords[i].y - dy,
          z: worldCoords[i].z
        });
      }
      const diffModelViewTransform = [[], [], []];
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
          diffModelViewTransform[j][i] = initialModelViewTransform[j][i];
        }
      }
      diffModelViewTransform[0][3] = initialModelViewTransform[0][0] * dx + initialModelViewTransform[0][1] * dy + initialModelViewTransform[0][3];
      diffModelViewTransform[1][3] = initialModelViewTransform[1][0] * dx + initialModelViewTransform[1][1] * dy + initialModelViewTransform[1][3];
      diffModelViewTransform[2][3] = initialModelViewTransform[2][0] * dx + initialModelViewTransform[2][1] * dy + initialModelViewTransform[2][3];
      const inlierProbs = [1, 0.8, 0.6, 0.4, 0];
      let updatedModelViewTransform = diffModelViewTransform;
      let finalModelViewTransform = null;
      for (let i = 0; i < inlierProbs.length; i++) {
        const ret = _doICP({
          initialModelViewTransform: updatedModelViewTransform,
          projectionTransform,
          worldCoords: normalizedWorldCoords,
          screenCoords,
          stabilities,
          // Pass weights to ICP
          inlierProb: inlierProbs[i]
        });
        updatedModelViewTransform = ret.modelViewTransform;
        if (ret.err < TRACKING_THRESH) {
          finalModelViewTransform = updatedModelViewTransform;
          break;
        }
      }
      if (finalModelViewTransform === null) return null;
      finalModelViewTransform[0][3] = finalModelViewTransform[0][3] - finalModelViewTransform[0][0] * dx - finalModelViewTransform[0][1] * dy;
      finalModelViewTransform[1][3] = finalModelViewTransform[1][3] - finalModelViewTransform[1][0] * dx - finalModelViewTransform[1][1] * dy;
      finalModelViewTransform[2][3] = finalModelViewTransform[2][3] - finalModelViewTransform[2][0] * dx - finalModelViewTransform[2][1] * dy;
      return finalModelViewTransform;
    };
    _doICP = ({
      initialModelViewTransform,
      projectionTransform,
      worldCoords,
      screenCoords,
      stabilities,
      inlierProb
    }) => {
      const isRobustMode = inlierProb < 1;
      let modelViewTransform = initialModelViewTransform;
      let err0 = 0;
      let err1 = 0;
      let E = new Array(worldCoords.length);
      let E2 = new Array(worldCoords.length);
      let dxs = new Array(worldCoords.length);
      let dys = new Array(worldCoords.length);
      for (let l = 0; l <= ICP_MAX_LOOP; l++) {
        const modelViewProjectionTransform = buildModelViewProjectionTransform(
          projectionTransform,
          modelViewTransform
        );
        for (let n = 0; n < worldCoords.length; n++) {
          const u = computeScreenCoordiate(
            modelViewProjectionTransform,
            worldCoords[n].x,
            worldCoords[n].y,
            worldCoords[n].z
          );
          const dx = screenCoords[n].x - u.x;
          const dy = screenCoords[n].y - u.y;
          dxs[n] = dx;
          dys[n] = dy;
          E[n] = dx * dx + dy * dy;
        }
        let K2;
        err1 = 0;
        if (isRobustMode) {
          const inlierNum = Math.max(3, Math.floor(worldCoords.length * inlierProb) - 1);
          for (let n = 0; n < worldCoords.length; n++) {
            E2[n] = E[n];
          }
          E2.sort((a, b) => {
            return a - b;
          });
          K2 = Math.max(E2[inlierNum] * K2_FACTOR, 16);
          for (let n = 0; n < worldCoords.length; n++) {
            if (E2[n] > K2) err1 += K2 / 6;
            else
              err1 += K2 / 6 * (1 - (1 - E2[n] / K2) * (1 - E2[n] / K2) * (1 - E2[n] / K2));
          }
        } else {
          for (let n = 0; n < worldCoords.length; n++) {
            err1 += E[n];
          }
        }
        err1 /= worldCoords.length;
        if (err1 < ICP_BREAK_LOOP_ERROR_THRESH) break;
        if (l > 0 && err1 / err0 > ICP_BREAK_LOOP_ERROR_RATIO_THRESH) break;
        if (l === ICP_MAX_LOOP) break;
        err0 = err1;
        const dU = [];
        const allJ_U_S = [];
        for (let n = 0; n < worldCoords.length; n++) {
          if (isRobustMode && E[n] > K2) {
            continue;
          }
          const J_U_S = _getJ_U_S({
            modelViewProjectionTransform,
            modelViewTransform,
            projectionTransform,
            worldCoord: worldCoords[n]
          });
          if (isRobustMode) {
            const robustW = (1 - E[n] / K2) * (1 - E[n] / K2);
            const s = stabilities ? stabilities[n] : 1;
            const stabilityW = s * Math.log10(9 * s + 1);
            const W = robustW * stabilityW;
            for (let j = 0; j < 2; j++) {
              for (let i = 0; i < 6; i++) {
                J_U_S[j][i] *= W;
              }
            }
            dU.push([dxs[n] * W]);
            dU.push([dys[n] * W]);
          } else {
            const s = stabilities ? stabilities[n] : 1;
            const W = s * Math.log10(9 * s + 1);
            for (let j = 0; j < 2; j++) {
              for (let i = 0; i < 6; i++) {
                J_U_S[j][i] *= W;
              }
            }
            dU.push([dxs[n] * W]);
            dU.push([dys[n] * W]);
          }
          for (let i = 0; i < J_U_S.length; i++) {
            allJ_U_S.push(J_U_S[i]);
          }
        }
        const dS = _getDeltaS({ dU, J_U_S: allJ_U_S });
        if (dS === null) break;
        modelViewTransform = _updateModelViewTransform({ modelViewTransform, dS });
      }
      return { modelViewTransform, err: err1 };
    };
    _updateModelViewTransform = ({ modelViewTransform, dS }) => {
      let ra = dS[0] * dS[0] + dS[1] * dS[1] + dS[2] * dS[2];
      let q0, q1, q2;
      if (ra < 1e-6) {
        q0 = 1;
        q1 = 0;
        q2 = 0;
        ra = 0;
      } else {
        ra = Math.sqrt(ra);
        q0 = dS[0] / ra;
        q1 = dS[1] / ra;
        q2 = dS[2] / ra;
      }
      const cra = Math.cos(ra);
      const sra = Math.sin(ra);
      const one_cra = 1 - cra;
      mat[0][0] = q0 * q0 * one_cra + cra;
      mat[0][1] = q0 * q1 * one_cra - q2 * sra;
      mat[0][2] = q0 * q2 * one_cra + q1 * sra;
      mat[0][3] = dS[3];
      mat[1][0] = q1 * q0 * one_cra + q2 * sra;
      mat[1][1] = q1 * q1 * one_cra + cra;
      mat[1][2] = q1 * q2 * one_cra - q0 * sra;
      mat[1][3] = dS[4];
      mat[2][0] = q2 * q0 * one_cra - q1 * sra;
      mat[2][1] = q2 * q1 * one_cra + q0 * sra;
      mat[2][2] = q2 * q2 * one_cra + cra;
      mat[2][3] = dS[5];
      const mat2 = [[], [], []];
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 4; i++) {
          mat2[j][i] = modelViewTransform[j][0] * mat[0][i] + modelViewTransform[j][1] * mat[1][i] + modelViewTransform[j][2] * mat[2][i];
        }
        mat2[j][3] += modelViewTransform[j][3];
      }
      return mat2;
    };
    _getDeltaS = ({ dU, J_U_S }) => {
      const J = new Matrix2(J_U_S);
      const U = new Matrix2(dU);
      const JT = J.transpose();
      const JTJ = JT.mmul(J);
      const JTU = JT.mmul(U);
      let JTJInv;
      try {
        JTJInv = inverse2(JTJ);
      } catch (e) {
        return null;
      }
      const S = JTJInv.mmul(JTU);
      return S.to1DArray();
    };
    _getJ_U_S = ({
      modelViewProjectionTransform,
      modelViewTransform,
      projectionTransform,
      worldCoord
    }) => {
      const T = modelViewTransform;
      const { x, y, z } = worldCoord;
      const u = applyModelViewProjectionTransform(modelViewProjectionTransform, x, y, z);
      const z2 = u.z * u.z;
      J_U_Xc[0][0] = projectionTransform[0][0] * u.z / z2;
      J_U_Xc[0][1] = projectionTransform[0][1] * u.z / z2;
      J_U_Xc[0][2] = (projectionTransform[0][2] * u.z - projectionTransform[2][2] * u.x) / z2;
      J_U_Xc[1][0] = projectionTransform[1][0] * u.z / z2;
      J_U_Xc[1][1] = projectionTransform[1][1] * u.z / z2;
      J_U_Xc[1][2] = (projectionTransform[1][2] * u.z - projectionTransform[2][2] * u.y) / z2;
      J_Xc_S[0][0] = T[0][2] * y;
      J_Xc_S[0][1] = -T[0][2] * x;
      J_Xc_S[0][2] = T[0][1] * x - T[0][0] * y;
      J_Xc_S[0][3] = T[0][0];
      J_Xc_S[0][4] = T[0][1];
      J_Xc_S[0][5] = T[0][2];
      J_Xc_S[1][0] = T[1][2] * y;
      J_Xc_S[1][1] = -T[1][2] * x;
      J_Xc_S[1][2] = T[1][1] * x - T[1][0] * y;
      J_Xc_S[1][3] = T[1][0];
      J_Xc_S[1][4] = T[1][1];
      J_Xc_S[1][5] = T[1][2];
      J_Xc_S[2][0] = T[2][2] * y;
      J_Xc_S[2][1] = -T[2][2] * x;
      J_Xc_S[2][2] = T[2][1] * x - T[2][0] * y;
      J_Xc_S[2][3] = T[2][0];
      J_Xc_S[2][4] = T[2][1];
      J_Xc_S[2][5] = T[2][2];
      const J_U_S = [[], []];
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 6; i++) {
          J_U_S[j][i] = 0;
          for (let k = 0; k < 3; k++) {
            J_U_S[j][i] += J_U_Xc[j][k] * J_Xc_S[k][i];
          }
        }
      }
      return J_U_S;
    };
  }
});

// src/core/estimation/estimator.js
var estimator_exports = {};
__export(estimator_exports, {
  Estimator: () => Estimator
});
var Estimator;
var init_estimator = __esm({
  "src/core/estimation/estimator.js"() {
    "use strict";
    init_estimate();
    init_refine_estimate();
    Estimator = class {
      constructor(projectionTransform) {
        this.projectionTransform = projectionTransform;
      }
      // Solve homography between screen points and world points using Direct Linear Transformation
      // then decompose homography into rotation and translation matrix (i.e. modelViewTransform)
      estimate({ screenCoords, worldCoords }) {
        const modelViewTransform = estimate({
          screenCoords,
          worldCoords,
          projectionTransform: this.projectionTransform
        });
        return modelViewTransform;
      }
      // Given an initial guess of the modelViewTransform and new pairs of screen-world coordinates,
      // use Iterative Closest Point to refine the transformation
      //refineEstimate({initialModelViewTransform, screenCoords, worldCoords}) {
      refineEstimate({ initialModelViewTransform, worldCoords, screenCoords }) {
        const updatedModelViewTransform = refineEstimate({
          initialModelViewTransform,
          worldCoords,
          screenCoords,
          projectionTransform: this.projectionTransform
        });
        return updatedModelViewTransform;
      }
    };
  }
});

// src/core/tracker/tracker.js
init_utils();

// src/core/estimation/non-rigid-refine.js
function refineNonRigid({ mesh, trackedPoints, currentVertices, iterations = 5 }) {
  const { e: edges, rl: restLengths } = mesh;
  const numVertices = currentVertices.length / 2;
  const vertices = new Float32Array(currentVertices);
  const stiffness = 0.8;
  const dataFidelity = 0.5;
  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < restLengths.length; i++) {
      const idx1 = edges[i * 2];
      const idx2 = edges[i * 2 + 1];
      const restL = restLengths[i];
      const vx1 = vertices[idx1 * 2];
      const vy1 = vertices[idx1 * 2 + 1];
      const vx2 = vertices[idx2 * 2];
      const vy2 = vertices[idx2 * 2 + 1];
      const dx = vx2 - vx1;
      const dy = vy2 - vy1;
      const currentL = Math.sqrt(dx * dx + dy * dy);
      if (currentL < 1e-4) continue;
      const diff = (currentL - restL) / currentL;
      const moveX = dx * 0.5 * diff * stiffness;
      const moveY = dy * 0.5 * diff * stiffness;
      vertices[idx1 * 2] += moveX;
      vertices[idx1 * 2 + 1] += moveY;
      vertices[idx2 * 2] -= moveX;
      vertices[idx2 * 2 + 1] -= moveY;
    }
    for (const tp of trackedPoints) {
      const idx = tp.meshIndex;
      if (idx === void 0) continue;
      const targetX = tp.x;
      const targetY = tp.y;
      vertices[idx * 2] += (targetX - vertices[idx * 2]) * dataFidelity;
      vertices[idx * 2 + 1] += (targetY - vertices[idx * 2 + 1]) * dataFidelity;
    }
  }
  return vertices;
}

// src/core/tracker/tracker.js
init_constants();
var AR2_DEFAULT_TS = AR_CONFIG.TRACKER_TEMPLATE_SIZE;
var AR2_SEARCH_SIZE = AR_CONFIG.TRACKER_SEARCH_SIZE;
var AR2_SEARCH_GAP = 1;
var AR2_SIM_THRESH = AR_CONFIG.TRACKER_SIMILARITY_THRESHOLD;
var Tracker = class {
  constructor(markerDimensions, trackingDataList, projectionTransform, inputWidth, inputHeight, debugMode = false) {
    this.markerDimensions = markerDimensions;
    this.trackingDataList = trackingDataList;
    this.projectionTransform = projectionTransform;
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    this.debugMode = debugMode;
    this.trackingKeyframeList = [];
    this.prebuiltData = [];
    for (let i = 0; i < trackingDataList.length; i++) {
      const targetOctaves = trackingDataList[i];
      this.trackingKeyframeList[i] = targetOctaves;
      this.prebuiltData[i] = targetOctaves.map((keyframe) => ({
        px: new Float32Array(keyframe.px),
        py: new Float32Array(keyframe.py),
        data: new Uint8Array(keyframe.d),
        width: keyframe.w,
        height: keyframe.h,
        scale: keyframe.s,
        mesh: keyframe.mesh,
        // Recyclable projected image buffer
        projectedImage: new Float32Array(keyframe.w * keyframe.h)
      }));
    }
    this.meshVerticesState = [];
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    this.templateBuffer = new Float32Array(templateSize * templateSize);
  }
  dummyRun(inputData) {
    let transform = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0]
    ];
    for (let targetIndex = 0; targetIndex < this.trackingKeyframeList.length; targetIndex++) {
      this.track(inputData, transform, targetIndex);
    }
  }
  track(inputData, lastModelViewTransform, targetIndex) {
    let debugExtra = {};
    const modelViewProjectionTransform = buildModelViewProjectionTransform(
      this.projectionTransform,
      lastModelViewTransform
    );
    const [mW, mH] = this.markerDimensions[targetIndex];
    const p0 = computeScreenCoordiate(modelViewProjectionTransform, 0, 0);
    const p1 = computeScreenCoordiate(modelViewProjectionTransform, mW, 0);
    const screenW = Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2);
    if (!this.lastOctaveIndex) this.lastOctaveIndex = [];
    let octaveIndex = this.lastOctaveIndex[targetIndex] !== void 0 ? this.lastOctaveIndex[targetIndex] : 0;
    let minDiff = Math.abs(this.prebuiltData[targetIndex][octaveIndex].width - screenW);
    const switchThreshold = 0.8;
    for (let i = 0; i < this.prebuiltData[targetIndex].length; i++) {
      const diff = Math.abs(this.prebuiltData[targetIndex][i].width - screenW);
      if (diff < minDiff * switchThreshold) {
        minDiff = diff;
        octaveIndex = i;
      }
    }
    this.lastOctaveIndex[targetIndex] = octaveIndex;
    const prebuilt = this.prebuiltData[targetIndex][octaveIndex];
    this._computeProjection(
      modelViewProjectionTransform,
      inputData,
      prebuilt
    );
    const projectedImage = prebuilt.projectedImage;
    const { matchingPoints, sim } = this._computeMatching(
      prebuilt,
      projectedImage
    );
    const trackingFrame = this.trackingKeyframeList[targetIndex][octaveIndex];
    const worldCoords = [];
    const screenCoords = [];
    const goodTrack = [];
    const { px, py, s: scale } = trackingFrame;
    const reliabilities = [];
    for (let i = 0; i < matchingPoints.length; i++) {
      const reliability = sim[i];
      if (reliability > AR2_SIM_THRESH && i < px.length) {
        goodTrack.push(i);
        const point = computeScreenCoordiate(
          modelViewProjectionTransform,
          matchingPoints[i][0],
          matchingPoints[i][1]
        );
        screenCoords.push(point);
        worldCoords.push({
          x: px[i] / scale,
          y: py[i] / scale,
          z: 0
        });
        reliabilities.push(reliability);
      }
    }
    let deformedMesh = null;
    if (prebuilt.mesh && goodTrack.length >= 4) {
      if (!this.meshVerticesState[targetIndex]) this.meshVerticesState[targetIndex] = [];
      let currentOctaveVertices = this.meshVerticesState[targetIndex][octaveIndex];
      if (!currentOctaveVertices) {
        currentOctaveVertices = new Float32Array(px.length * 2);
        for (let i = 0; i < px.length; i++) {
          currentOctaveVertices[i * 2] = px[i];
          currentOctaveVertices[i * 2 + 1] = py[i];
        }
      }
      const trackedTargets = [];
      for (let j = 0; j < goodTrack.length; j++) {
        const idx = goodTrack[j];
        trackedTargets.push({
          meshIndex: idx,
          x: matchingPoints[idx][0] * scale,
          // Convert back to octave space pixels
          y: matchingPoints[idx][1] * scale
        });
      }
      const refinedOctaveVertices = refineNonRigid({
        mesh: prebuilt.mesh,
        trackedPoints: trackedTargets,
        currentVertices: currentOctaveVertices,
        iterations: 5
      });
      this.meshVerticesState[targetIndex][octaveIndex] = refinedOctaveVertices;
      const screenMeshVertices = new Float32Array(refinedOctaveVertices.length);
      for (let i = 0; i < refinedOctaveVertices.length; i += 2) {
        const p = computeScreenCoordiate(
          modelViewProjectionTransform,
          refinedOctaveVertices[i] / scale,
          refinedOctaveVertices[i + 1] / scale
        );
        screenMeshVertices[i] = p.x;
        screenMeshVertices[i + 1] = p.y;
      }
      deformedMesh = {
        vertices: screenMeshVertices,
        triangles: prebuilt.mesh.t
      };
    }
    if (screenCoords.length >= 8) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of screenCoords) {
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
      }
      const detectedDiagonal = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);
      if (detectedDiagonal < screenW * 0.15) {
        return { worldCoords: [], screenCoords: [], reliabilities: [], debugExtra };
      }
    }
    if (this.debugMode) {
      debugExtra = {
        octaveIndex,
        // Remove Array.from to avoid massive GC pressure
        projectedImage,
        matchingPoints,
        goodTrack,
        trackedPoints: screenCoords
      };
    }
    return { worldCoords, screenCoords, reliabilities, indices: goodTrack, octaveIndex, deformedMesh, debugExtra };
  }
  /**
   * Pure JS implementation of NCC matching
   */
  _computeMatching(prebuilt, projectedImage) {
    const { px, py, scale, data: markerPixels, width: markerWidth, height: markerHeight } = prebuilt;
    const featureCount = px.length;
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    const nPixels = templateSize * templateSize;
    const oneOverNPixels = 1 / nPixels;
    const searchOneSize = AR2_SEARCH_SIZE;
    const searchGap = AR2_SEARCH_GAP;
    const matchingPoints = [];
    const sims = new Float32Array(featureCount);
    const templateData = this.templateBuffer;
    for (let f = 0; f < featureCount; f++) {
      const sCenterX = px[f] + 0.5 | 0;
      const sCenterY = py[f] + 0.5 | 0;
      let bestSim = -1;
      let bestX = px[f] / scale;
      let bestY = py[f] / scale;
      let sumT = 0;
      let sumT2 = 0;
      let tidx = 0;
      for (let ty = -templateOneSize; ty <= templateOneSize; ty++) {
        const fyOffset = (sCenterY + ty) * markerWidth;
        for (let tx = -templateOneSize; tx <= templateOneSize; tx++) {
          const val = markerPixels[fyOffset + sCenterX + tx];
          templateData[tidx++] = val;
          sumT += val;
          sumT2 += val * val;
        }
      }
      const varT = Math.sqrt(Math.max(0, sumT2 - sumT * sumT * oneOverNPixels));
      if (varT < 1e-4) {
        sims[f] = -1;
        matchingPoints.push([bestX, bestY]);
        continue;
      }
      const coarseGap = 4;
      for (let sy = -searchOneSize; sy <= searchOneSize; sy += coarseGap) {
        const cy = sCenterY + sy;
        if (cy < templateOneSize || cy >= markerHeight - templateOneSize) continue;
        for (let sx = -searchOneSize; sx <= searchOneSize; sx += coarseGap) {
          const cx = sCenterX + sx;
          if (cx < templateOneSize || cx >= markerWidth - templateOneSize) continue;
          let sumI = 0, sumI2 = 0, sumIT = 0;
          for (let ty = -templateOneSize; ty <= templateOneSize; ty++) {
            const rowOffset = (cy + ty) * markerWidth;
            const tRowOffset = (ty + templateOneSize) * templateSize;
            for (let tx = -templateOneSize; tx <= templateOneSize; tx++) {
              const valI = projectedImage[rowOffset + (cx + tx)];
              const valT = templateData[tRowOffset + (tx + templateOneSize)];
              sumI += valI;
              sumI2 += valI * valI;
              sumIT += valI * valT;
            }
          }
          const varI = Math.sqrt(Math.max(0, sumI2 - sumI * sumI * oneOverNPixels));
          if (varI < 1e-4) continue;
          const sim = (sumIT - sumI * sumT * oneOverNPixels) / (varI * varT);
          if (sim > bestSim) {
            bestSim = sim;
            bestX = cx / scale;
            bestY = cy / scale;
          }
        }
      }
      if (bestSim > AR2_SIM_THRESH) {
        const fineCenterX = bestX * scale | 0;
        const fineCenterY = bestY * scale | 0;
        const fineSearch = coarseGap;
        for (let sy = -fineSearch; sy <= fineSearch; sy++) {
          const cy = fineCenterY + sy;
          if (cy < templateOneSize || cy >= markerHeight - templateOneSize) continue;
          for (let sx = -fineSearch; sx <= fineSearch; sx++) {
            const cx = fineCenterX + sx;
            if (cx < templateOneSize || cx >= markerWidth - templateOneSize) continue;
            let sumI = 0, sumI2 = 0, sumIT = 0;
            for (let ty = -templateOneSize; ty <= templateOneSize; ty++) {
              const rowOffset = (cy + ty) * markerWidth;
              const tRowOffset = (ty + templateOneSize) * templateSize;
              for (let tx = -templateOneSize; tx <= templateOneSize; tx++) {
                const valI = projectedImage[rowOffset + (cx + tx)];
                const valT = templateData[tRowOffset + (tx + templateOneSize)];
                sumI += valI;
                sumI2 += valI * valI;
                sumIT += valI * valT;
              }
            }
            const varI = Math.sqrt(Math.max(0, sumI2 - sumI * sumI * oneOverNPixels));
            if (varI < 1e-4) continue;
            const sim = (sumIT - sumI * sumT * oneOverNPixels) / (varI * varT);
            if (sim > bestSim) {
              bestSim = sim;
              bestX = cx / scale;
              bestY = cy / scale;
            }
          }
        }
      }
      sims[f] = bestSim;
      matchingPoints.push([bestX, bestY]);
    }
    return { matchingPoints, sim: sims };
  }
  /**
   * Pure JS implementation of Bilinear Warping
   */
  _computeProjection(M, inputData, prebuilt) {
    const { width: markerWidth, height: markerHeight, scale: markerScale, projectedImage } = prebuilt;
    const invScale = 1 / markerScale;
    const inputW = this.inputWidth;
    const inputH = this.inputHeight;
    const m00 = M[0][0];
    const m01 = M[0][1];
    const m03 = M[0][3];
    const m10 = M[1][0];
    const m11 = M[1][1];
    const m13 = M[1][3];
    const m20 = M[2][0];
    const m21 = M[2][1];
    const m23 = M[2][3];
    for (let j = 0; j < markerHeight; j++) {
      const y = j * invScale;
      const jOffset = j * markerWidth;
      for (let i = 0; i < markerWidth; i++) {
        const x = i * invScale;
        const uz = x * m20 + y * m21 + m23;
        const invZ = 1 / uz;
        const ux = (x * m00 + y * m01 + m03) * invZ;
        const uy = (x * m10 + y * m11 + m13) * invZ;
        const x0 = ux | 0;
        const y0 = uy | 0;
        const x1 = x0 + 1;
        const y1 = y0 + 1;
        if (x0 >= 0 && x1 < inputW && y0 >= 0 && y1 < inputH) {
          const dx = ux - x0;
          const dy = uy - y0;
          const omDx = 1 - dx;
          const omDy = 1 - dy;
          const y0Offset = y0 * inputW;
          const y1Offset = y1 * inputW;
          const v00 = inputData[y0Offset + x0];
          const v10 = inputData[y0Offset + x1];
          const v01 = inputData[y1Offset + x0];
          const v11 = inputData[y1Offset + x1];
          projectedImage[jOffset + i] = v00 * omDx * omDy + v10 * dx * omDy + v01 * omDx * dy + v11 * dx * dy;
        } else {
          projectedImage[jOffset + i] = 0;
        }
      }
    }
  }
};

// src/core/input-loader.js
var InputLoader = class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grayscaleBuffer = new Uint8Array(width * height);
    if (typeof document !== "undefined") {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      this.context = canvas.getContext("2d", { willReadFrequently: true, alpha: false });
    }
  }
  /**
   * Carga una imagen o video y devuelve los datos en escala de grises
   * @param {HTMLVideoElement|HTMLImageElement|ImageData|Uint8Array} input - La fuente de entrada
   * @returns {Uint8Array} Datos de imagen en escala de grises (width * height)
   */
  loadInput(input) {
    if (input instanceof Uint8Array && input.length === this.width * this.height) {
      return input;
    }
    if (typeof ImageData !== "undefined" && input instanceof ImageData) {
      this._convertToGrayscale(input.data, input.width, input.height);
      return this.grayscaleBuffer;
    }
    if (this.context) {
      this.context.clearRect(0, 0, this.width, this.height);
      const isInputRotated = input.width === this.height && input.height === this.width;
      const inputW = isInputRotated ? input.height : input.width;
      const inputH = isInputRotated ? input.width : input.height;
      const inputAspect = inputW / inputH;
      const canvasAspect = this.width / this.height;
      let sx = 0, sy = 0, sw = inputW, sh = inputH;
      if (inputAspect > canvasAspect) {
        sw = inputH * canvasAspect;
        sx = (inputW - sw) / 2;
      } else if (inputAspect < canvasAspect) {
        sh = inputW / canvasAspect;
        sy = (inputH - sh) / 2;
      }
      if (isInputRotated) {
        this.context.save();
        this.context.translate(this.width / 2, this.height / 2);
        this.context.rotate(Math.PI / 2);
        this.context.drawImage(input, sx, sy, sw, sh, -this.height / 2, -this.width / 2, this.height, this.width);
        this.context.restore();
      } else {
        this.context.drawImage(input, sx, sy, sw, sh, 0, 0, this.width, this.height);
      }
      const imageData = this.context.getImageData(0, 0, this.width, this.height);
      this._convertToGrayscale(imageData.data, this.width, this.height);
      return this.grayscaleBuffer;
    }
    if (input.data && input.data instanceof Uint8Array) {
      this._convertToGrayscale(input.data, input.width || this.width, input.height || this.height);
      return this.grayscaleBuffer;
    }
    throw new Error("Input no soportado o entorno sin Canvas");
  }
  /**
   * Convierte datos RGBA a escala de grises optimizada (reutilizando buffer)
   */
  _convertToGrayscale(rgbaData, width, height) {
    const grayscale = this.grayscaleBuffer;
    const len = width * height;
    for (let i = 0; i < len; i++) {
      const offset = i << 2;
      grayscale[i] = rgbaData[offset] * 77 + rgbaData[offset + 1] * 150 + rgbaData[offset + 2] * 29 >> 8;
    }
  }
};

// src/core/features/feature-manager.ts
var FeatureManager = class {
  features = [];
  addFeature(feature) {
    this.features.push(feature);
  }
  getFeature(id) {
    return this.features.find((f) => f.id === id);
  }
  init(context) {
    for (const feature of this.features) {
      if (feature.enabled && feature.init) {
        feature.init(context);
      }
    }
  }
  beforeProcess(inputData) {
    for (const feature of this.features) {
      if (feature.enabled && feature.beforeProcess) {
        feature.beforeProcess(inputData);
      }
    }
  }
  applyWorldMatrixFilters(targetIndex, worldMatrix, context) {
    let result = worldMatrix;
    for (const feature of this.features) {
      if (feature.enabled && feature.filterWorldMatrix) {
        result = feature.filterWorldMatrix(targetIndex, result, context);
      }
    }
    return result;
  }
  shouldShow(targetIndex, isTracking) {
    let show = isTracking;
    for (const feature of this.features) {
      if (feature.enabled && feature.shouldShow) {
        show = feature.shouldShow(targetIndex, show);
      }
    }
    return show;
  }
  notifyUpdate(data) {
    for (const feature of this.features) {
      if (feature.enabled && feature.onUpdate) {
        feature.onUpdate(data);
      }
    }
  }
  dispose() {
    for (const feature of this.features) {
      if (feature.dispose) {
        feature.dispose();
      }
    }
  }
};

// src/libs/one-euro-filter.js
var LowPassFilter = class {
  constructor(alpha, initval = 0) {
    this.y = initval;
    this.s = initval;
    this.alpha = alpha;
  }
  setAlpha(alpha) {
    if (alpha <= 0 || alpha > 1) {
      return;
    }
    this.alpha = alpha;
  }
  filter(value) {
    this.s = this.alpha * value + (1 - this.alpha) * this.s;
    this.y = this.s;
    return this.s;
  }
  filterWithAlpha(value, alpha) {
    this.setAlpha(alpha);
    return this.filter(value);
  }
  lastValue() {
    return this.y;
  }
};
var OneEuroFilter = class {
  constructor({ minCutOff = 1, beta = 0, dCutOff = 1 }) {
    this.minCutOff = minCutOff;
    this.beta = beta;
    this.dCutOff = dCutOff;
    this.x = null;
    this.dx = null;
    this.lastTime = null;
  }
  _alpha(cutoff, te2) {
    const tau = 1 / (2 * Math.PI * cutoff);
    return 1 / (1 + tau / te2);
  }
  reset() {
    this.lastTime = null;
    this.x = null;
    this.dx = null;
  }
  filter(time, value) {
    if (this.lastTime === null || this.x === null) {
      this.lastTime = time;
      this.x = value.map((v) => new LowPassFilter(this._alpha(this.minCutOff, 1), v));
      this.dx = value.map((v) => new LowPassFilter(this._alpha(this.dCutOff, 1), 0));
      return value;
    }
    const te2 = (time - this.lastTime) / 1e3;
    if (te2 <= 0) return value;
    this.lastTime = time;
    const filteredValue = [];
    for (let i = 0; i < value.length; i++) {
      const edvalue = (value[i] - this.x[i].lastValue()) / te2;
      const alpha_d = this._alpha(this.dCutOff, te2);
      const edvalue_filtered = this.dx[i].filterWithAlpha(edvalue, alpha_d);
      const cutoff = this.minCutOff + this.beta * Math.abs(edvalue_filtered);
      const alpha = this._alpha(cutoff, te2);
      filteredValue[i] = this.x[i].filterWithAlpha(value[i], alpha);
    }
    return filteredValue;
  }
};

// src/core/features/one-euro-filter-feature.ts
var OneEuroFilterFeature = class {
  id = "one-euro-filter";
  name = "One Euro Filter";
  description = "Smooths the tracking matrix to reduce jitter using a One Euro Filter.";
  enabled = true;
  filters = [];
  minCutOff;
  beta;
  constructor(minCutOff = 0.5, beta = 0.1) {
    this.minCutOff = minCutOff;
    this.beta = beta;
  }
  init(context) {
  }
  getFilter(targetIndex) {
    if (!this.filters[targetIndex]) {
      this.filters[targetIndex] = new OneEuroFilter({
        minCutOff: this.minCutOff,
        beta: this.beta
      });
    }
    return this.filters[targetIndex];
  }
  filterWorldMatrix(targetIndex, worldMatrix, context) {
    if (!this.enabled) return worldMatrix;
    const filter = this.getFilter(targetIndex);
    const stability = context?.stability ?? 1;
    const dynamicMinCutOff = this.minCutOff * (0.05 + Math.pow(stability, 2) * 0.95);
    filter.minCutOff = dynamicMinCutOff;
    filter.beta = this.beta;
    return filter.filter(Date.now(), worldMatrix);
  }
  onUpdate(data) {
    if (data.type === "reset" && data.targetIndex !== void 0) {
      this.filters[data.targetIndex]?.reset();
    }
  }
};

// src/core/features/temporal-filter-feature.ts
var TemporalFilterFeature = class {
  id = "temporal-filter";
  name = "Temporal Filter";
  description = "Provides warmup tolerance (to avoid false positives) and miss tolerance (to maintain tracking during brief occlusions).";
  enabled = true;
  states = [];
  warmupTolerance;
  missTolerance;
  onToggleShowing;
  constructor(warmup = 2, miss = 5, onToggleShowing) {
    this.warmupTolerance = warmup;
    this.missTolerance = miss;
    this.onToggleShowing = onToggleShowing;
  }
  getState(targetIndex) {
    if (!this.states[targetIndex]) {
      this.states[targetIndex] = {
        showing: false,
        trackCount: 0,
        trackMiss: 0
      };
    }
    return this.states[targetIndex];
  }
  shouldShow(targetIndex, isTracking) {
    if (!this.enabled) return isTracking;
    const state = this.getState(targetIndex);
    if (!state.showing) {
      if (isTracking) {
        state.trackMiss = 0;
        state.trackCount += 1;
        if (state.trackCount >= this.warmupTolerance) {
          state.showing = true;
          this.onToggleShowing?.(targetIndex, true);
        }
      } else {
        state.trackCount = 0;
      }
    } else {
      if (!isTracking) {
        state.trackCount = 0;
        state.trackMiss += 1;
        if (state.trackMiss >= this.missTolerance) {
          state.showing = false;
          this.onToggleShowing?.(targetIndex, false);
        }
      } else {
        state.trackMiss = 0;
      }
    }
    return state.showing;
  }
};

// src/core/features/auto-rotation-feature.ts
var AutoRotationFeature = class {
  id = "auto-rotation";
  name = "Auto Rotation Matrix";
  description = "Automatically adjusts the world matrix if the input video is rotated (e.g. portrait mode).";
  enabled = true;
  inputWidth = 0;
  inputHeight = 0;
  init(context) {
    this.inputWidth = context.inputWidth;
    this.inputHeight = context.inputHeight;
  }
  filterWorldMatrix(targetIndex, worldMatrix) {
    if (!this.enabled) return worldMatrix;
    return worldMatrix;
  }
  // We might need a way to pass the 'currentInput' to the feature.
  // Actually, the controller can just call this if it detects rotation.
  rotate(m) {
    return [
      -m[1],
      m[0],
      m[2],
      m[3],
      -m[5],
      m[4],
      m[6],
      m[7],
      -m[9],
      m[8],
      m[10],
      m[11],
      -m[13],
      m[12],
      m[14],
      m[15]
    ];
  }
};

// src/core/detector/freak.js
var FREAK_RINGS = [
  // ring 5
  {
    sigma: 0.55,
    points: [
      [-1, 0],
      [-0.5, -0.866025],
      [0.5, -0.866025],
      [1, -0],
      [0.5, 0.866025],
      [-0.5, 0.866025]
    ]
  },
  // ring 4
  {
    sigma: 0.475,
    points: [
      [0, 0.930969],
      [-0.806243, 0.465485],
      [-0.806243, -0.465485],
      [-0, -0.930969],
      [0.806243, -0.465485],
      [0.806243, 0.465485]
    ]
  },
  // ring 3
  {
    sigma: 0.4,
    points: [
      [0.847306, -0],
      [0.423653, 0.733789],
      [-0.423653, 0.733789],
      [-0.847306, 0],
      [-0.423653, -0.733789],
      [0.423653, -0.733789]
    ]
  },
  // ring 2
  {
    sigma: 0.325,
    points: [
      [-0, -0.741094],
      [0.641806, -0.370547],
      [0.641806, 0.370547],
      [0, 0.741094],
      [-0.641806, 0.370547],
      [-0.641806, -0.370547]
    ]
  },
  // ring 1
  {
    sigma: 0.25,
    points: [
      [-0.595502, 0],
      [-0.297751, -0.51572],
      [0.297751, -0.51572],
      [0.595502, -0],
      [0.297751, 0.51572],
      [-0.297751, 0.51572]
    ]
  },
  // ring 0
  {
    sigma: 0.175,
    points: [
      [0, 0.362783],
      [-0.314179, 0.181391],
      [-0.314179, -0.181391],
      [-0, -0.362783],
      [0.314179, -0.181391],
      [0.314179, 0.181391]
    ]
  },
  // center
  {
    sigma: 0.1,
    points: [[0, 0]]
  }
];
var FREAKPOINTS = [];
for (let r = 0; r < FREAK_RINGS.length; r++) {
  const sigma = FREAK_RINGS[r].sigma;
  for (let i = 0; i < FREAK_RINGS[r].points.length; i++) {
    const point = FREAK_RINGS[r].points[i];
    FREAKPOINTS.push([sigma, point[0], point[1]]);
  }
}

// src/core/utils/gpu-compute.js
var tryInitGPU = () => {
  return null;
};
var computeGradientsJS = (imageData, width, height) => {
  const dValue = new Float32Array(width * height);
  for (let j = 1; j < height - 1; j++) {
    const rowOffset = j * width;
    const prevRowOffset = (j - 1) * width;
    const nextRowOffset = (j + 1) * width;
    for (let i = 1; i < width - 1; i++) {
      const pos = rowOffset + i;
      const dx = (imageData[prevRowOffset + i + 1] - imageData[prevRowOffset + i - 1] + imageData[rowOffset + i + 1] - imageData[rowOffset + i - 1] + imageData[nextRowOffset + i + 1] - imageData[nextRowOffset + i - 1]) / 768;
      const dy = (imageData[nextRowOffset + i - 1] - imageData[prevRowOffset + i - 1] + imageData[nextRowOffset + i] - imageData[prevRowOffset + i] + imageData[nextRowOffset + i + 1] - imageData[prevRowOffset + i + 1]) / 768;
      dValue[pos] = Math.sqrt((dx * dx + dy * dy) / 2);
    }
  }
  return dValue;
};
var findLocalMaximaJS = (gradients, width, height) => {
  const isCandidate = new Uint8Array(width * height);
  for (let j = 1; j < height - 1; j++) {
    const rowOffset = j * width;
    for (let i = 1; i < width - 1; i++) {
      const pos = rowOffset + i;
      const val = gradients[pos];
      if (val > 0 && val >= gradients[pos - 1] && val >= gradients[pos + 1] && val >= gradients[pos - width] && val >= gradients[pos + width]) {
        isCandidate[pos] = 1;
      }
    }
  }
  return isCandidate;
};
var gaussianBlurJS = (data, width, height) => {
  const output = new Float32Array(width * height);
  const temp = new Float32Array(width * height);
  const k0 = 1 / 16, k1 = 4 / 16, k2 = 6 / 16;
  const w1 = width - 1;
  const h1 = height - 1;
  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    for (let x = 0; x < width; x++) {
      const x0 = x < 2 ? 0 : x - 2;
      const x1 = x < 1 ? 0 : x - 1;
      const x3 = x > w1 - 1 ? w1 : x + 1;
      const x4 = x > w1 - 2 ? w1 : x + 2;
      temp[rowOffset + x] = data[rowOffset + x0] * k0 + data[rowOffset + x1] * k1 + data[rowOffset + x] * k2 + data[rowOffset + x3] * k1 + data[rowOffset + x4] * k0;
    }
  }
  for (let y = 0; y < height; y++) {
    const y0 = (y < 2 ? 0 : y - 2) * width;
    const y1 = (y < 1 ? 0 : y - 1) * width;
    const y2 = y * width;
    const y3 = (y > h1 - 1 ? h1 : y + 1) * width;
    const y4 = (y > h1 - 2 ? h1 : y + 2) * width;
    for (let x = 0; x < width; x++) {
      output[y2 + x] = temp[y0 + x] * k0 + temp[y1 + x] * k1 + temp[y2 + x] * k2 + temp[y3 + x] * k1 + temp[y4 + x] * k0;
    }
  }
  return output;
};
var downsampleJS = (data, width, height) => {
  const newWidth = Math.floor(width / 2);
  const newHeight = Math.floor(height / 2);
  const output = new Float32Array(newWidth * newHeight);
  for (let y = 0; y < newHeight; y++) {
    const sy = y * 2;
    for (let x = 0; x < newWidth; x++) {
      const sx = x * 2;
      const pos = sy * width + sx;
      output[y * newWidth + x] = (data[pos] + data[pos + 1] + data[pos + width] + data[pos + width + 1]) / 4;
    }
  }
  return { data: output, width: newWidth, height: newHeight };
};
var GPUCompute = class {
  constructor() {
    this.gpu = null;
    this.kernelCache = /* @__PURE__ */ new Map();
    this.initialized = false;
  }
  /**
   * Initialize (tries GPU in browser, uses JS in Node)
   */
  init() {
    if (this.initialized) return;
    this.gpu = tryInitGPU();
    this.initialized = true;
  }
  /**
   * Compute edge gradients
   */
  computeGradients(imageData, width, height) {
    this.init();
    return computeGradientsJS(imageData, width, height);
  }
  /**
   * Find local maxima
   */
  findLocalMaxima(gradients, width, height) {
    this.init();
    return findLocalMaximaJS(gradients, width, height);
  }
  /**
   * Combined edge detection
   */
  edgeDetection(imageData, width, height) {
    const dValue = this.computeGradients(imageData, width, height);
    const isCandidate = this.findLocalMaxima(dValue, width, height);
    return { dValue, isCandidate };
  }
  /**
   * Gaussian blur
   */
  gaussianBlur(imageData, width, height) {
    this.init();
    return gaussianBlurJS(imageData, width, height);
  }
  /**
   * Downsample by factor of 2
   */
  downsample(imageData, width, height) {
    this.init();
    return downsampleJS(imageData, width, height);
  }
  /**
   * Build Gaussian pyramid
   */
  buildPyramid(imageData, width, height, numLevels = 5) {
    this.init();
    const pyramid = [];
    let currentData = imageData instanceof Float32Array ? imageData : Float32Array.from(imageData);
    let currentWidth = width;
    let currentHeight = height;
    for (let level = 0; level < numLevels; level++) {
      const blurred = this.gaussianBlur(currentData, currentWidth, currentHeight);
      pyramid.push({
        data: blurred,
        width: currentWidth,
        height: currentHeight,
        scale: Math.pow(2, level)
      });
      if (currentWidth > 8 && currentHeight > 8) {
        const downsampled = this.downsample(blurred, currentWidth, currentHeight);
        currentData = downsampled.data;
        currentWidth = downsampled.width;
        currentHeight = downsampled.height;
      } else {
        break;
      }
    }
    return pyramid;
  }
  /**
   * Check if GPU is available
   */
  isGPUAvailable() {
    this.init();
    return this.gpu !== null;
  }
  /**
   * Cleanup resources
   */
  destroy() {
    this.kernelCache.clear();
    if (this.gpu && this.gpu.destroy) {
      this.gpu.destroy();
    }
    this.gpu = null;
    this.initialized = false;
  }
};
var gpuCompute = new GPUCompute();

// src/core/utils/lsh-direct.js
var LSH_PAIRS = new Int32Array(64 * 2);
var SAMPLING_INDICES = new Int32Array(64);
for (let i = 0; i < 64; i++) {
  SAMPLING_INDICES[i] = Math.floor(i * (672 / 64));
}
var currentBit = 0;
var samplingIdx = 0;
for (let i = 0; i < FREAKPOINTS.length; i++) {
  for (let j = i + 1; j < FREAKPOINTS.length; j++) {
    if (samplingIdx < 64 && currentBit === SAMPLING_INDICES[samplingIdx]) {
      LSH_PAIRS[samplingIdx * 2] = i;
      LSH_PAIRS[samplingIdx * 2 + 1] = j;
      samplingIdx++;
    }
    currentBit++;
  }
}
function computeLSH64(samples) {
  const result = new Uint32Array(2);
  for (let i = 0; i < 64; i++) {
    const p1 = LSH_PAIRS[i * 2];
    const p2 = LSH_PAIRS[i * 2 + 1];
    if (samples[p1] < samples[p2]) {
      const uintIdx = i >> 5;
      const uintBitIdx = i & 31;
      result[uintIdx] |= 1 << uintBitIdx;
    }
  }
  return result;
}
function computeFullFREAK(samples) {
  const descriptor = new Uint8Array(84);
  let bitCount = 0;
  let byteIdx = 0;
  for (let i = 0; i < FREAKPOINTS.length; i++) {
    for (let j = i + 1; j < FREAKPOINTS.length; j++) {
      if (samples[i] < samples[j]) {
        descriptor[byteIdx] |= 1 << 7 - bitCount;
      }
      bitCount++;
      if (bitCount === 8) {
        byteIdx++;
        bitCount = 0;
      }
    }
  }
  return descriptor;
}
function packLSHIntoDescriptor(lsh) {
  const desc = new Uint8Array(8);
  const view = new DataView(desc.buffer);
  view.setUint32(0, lsh[0], true);
  view.setUint32(4, lsh[1], true);
  return desc;
}

// node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function utf8Count(str) {
  const strLength = str.length;
  let byteLength = 0;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      byteLength++;
      continue;
    } else if ((value & 4294965248) === 0) {
      byteLength += 2;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        byteLength += 3;
      } else {
        byteLength += 4;
      }
    }
  }
  return byteLength;
}
function utf8EncodeJs(str, output, outputOffset) {
  const strLength = str.length;
  let offset = outputOffset;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      output[offset++] = value;
      continue;
    } else if ((value & 4294965248) === 0) {
      output[offset++] = value >> 6 & 31 | 192;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        output[offset++] = value >> 12 & 15 | 224;
        output[offset++] = value >> 6 & 63 | 128;
      } else {
        output[offset++] = value >> 18 & 7 | 240;
        output[offset++] = value >> 12 & 63 | 128;
        output[offset++] = value >> 6 & 63 | 128;
      }
    }
    output[offset++] = value & 63 | 128;
  }
}
var sharedTextEncoder = new TextEncoder();
var TEXT_ENCODER_THRESHOLD = 50;
function utf8EncodeTE(str, output, outputOffset) {
  sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
}
function utf8Encode(str, output, outputOffset) {
  if (str.length > TEXT_ENCODER_THRESHOLD) {
    utf8EncodeTE(str, output, outputOffset);
  } else {
    utf8EncodeJs(str, output, outputOffset);
  }
}
var CHUNK_SIZE = 4096;
function utf8DecodeJs(bytes, inputOffset, byteLength) {
  let offset = inputOffset;
  const end = offset + byteLength;
  const units = [];
  let result = "";
  while (offset < end) {
    const byte1 = bytes[offset++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      const byte4 = bytes[offset++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= CHUNK_SIZE) {
      result += String.fromCharCode(...units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += String.fromCharCode(...units);
  }
  return result;
}
var sharedTextDecoder = new TextDecoder();
var TEXT_DECODER_THRESHOLD = 200;
function utf8DecodeTD(bytes, inputOffset, byteLength) {
  const stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
  return sharedTextDecoder.decode(stringBytes);
}
function utf8Decode(bytes, inputOffset, byteLength) {
  if (byteLength > TEXT_DECODER_THRESHOLD) {
    return utf8DecodeTD(bytes, inputOffset, byteLength);
  } else {
    return utf8DecodeJs(bytes, inputOffset, byteLength);
  }
}

// node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var ExtData = class {
  type;
  data;
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/DecodeError.mjs
var DecodeError = class _DecodeError extends Error {
  constructor(message) {
    super(message);
    const proto = Object.create(_DecodeError.prototype);
    Object.setPrototypeOf(this, proto);
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: _DecodeError.name
    });
  }
};

// node_modules/@msgpack/msgpack/dist.esm/utils/int.mjs
var UINT32_MAX = 4294967295;
function setUint64(view, offset, value) {
  const high = value / 4294967296;
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function setInt64(view, offset, value) {
  const high = Math.floor(value / 4294967296);
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function getInt64(view, offset) {
  const high = view.getInt32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}
function getUint64(view, offset) {
  const high = view.getUint32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}

// node_modules/@msgpack/msgpack/dist.esm/timestamp.mjs
var EXT_TIMESTAMP = -1;
var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
function encodeTimeSpecToTimestamp({ sec, nsec }) {
  if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
    if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
      const rv = new Uint8Array(4);
      const view = new DataView(rv.buffer);
      view.setUint32(0, sec);
      return rv;
    } else {
      const secHigh = sec / 4294967296;
      const secLow = sec & 4294967295;
      const rv = new Uint8Array(8);
      const view = new DataView(rv.buffer);
      view.setUint32(0, nsec << 2 | secHigh & 3);
      view.setUint32(4, secLow);
      return rv;
    }
  } else {
    const rv = new Uint8Array(12);
    const view = new DataView(rv.buffer);
    view.setUint32(0, nsec);
    setInt64(view, 4, sec);
    return rv;
  }
}
function encodeDateToTimeSpec(date) {
  const msec = date.getTime();
  const sec = Math.floor(msec / 1e3);
  const nsec = (msec - sec * 1e3) * 1e6;
  const nsecInSec = Math.floor(nsec / 1e9);
  return {
    sec: sec + nsecInSec,
    nsec: nsec - nsecInSec * 1e9
  };
}
function encodeTimestampExtension(object) {
  if (object instanceof Date) {
    const timeSpec = encodeDateToTimeSpec(object);
    return encodeTimeSpecToTimestamp(timeSpec);
  } else {
    return null;
  }
}
function decodeTimestampToTimeSpec(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  switch (data.byteLength) {
    case 4: {
      const sec = view.getUint32(0);
      const nsec = 0;
      return { sec, nsec };
    }
    case 8: {
      const nsec30AndSecHigh2 = view.getUint32(0);
      const secLow32 = view.getUint32(4);
      const sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
      const nsec = nsec30AndSecHigh2 >>> 2;
      return { sec, nsec };
    }
    case 12: {
      const sec = getInt64(view, 4);
      const nsec = view.getUint32(0);
      return { sec, nsec };
    }
    default:
      throw new DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${data.length}`);
  }
}
function decodeTimestampExtension(data) {
  const timeSpec = decodeTimestampToTimeSpec(data);
  return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
}
var timestampExtension = {
  type: EXT_TIMESTAMP,
  encode: encodeTimestampExtension,
  decode: decodeTimestampExtension
};

// node_modules/@msgpack/msgpack/dist.esm/ExtensionCodec.mjs
var ExtensionCodec = class _ExtensionCodec {
  static defaultCodec = new _ExtensionCodec();
  // ensures ExtensionCodecType<X> matches ExtensionCodec<X>
  // this will make type errors a lot more clear
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __brand;
  // built-in extensions
  builtInEncoders = [];
  builtInDecoders = [];
  // custom extensions
  encoders = [];
  decoders = [];
  constructor() {
    this.register(timestampExtension);
  }
  register({ type, encode: encode2, decode: decode2 }) {
    if (type >= 0) {
      this.encoders[type] = encode2;
      this.decoders[type] = decode2;
    } else {
      const index = -1 - type;
      this.builtInEncoders[index] = encode2;
      this.builtInDecoders[index] = decode2;
    }
  }
  tryToEncode(object, context) {
    for (let i = 0; i < this.builtInEncoders.length; i++) {
      const encodeExt = this.builtInEncoders[i];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = -1 - i;
          return new ExtData(type, data);
        }
      }
    }
    for (let i = 0; i < this.encoders.length; i++) {
      const encodeExt = this.encoders[i];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = i;
          return new ExtData(type, data);
        }
      }
    }
    if (object instanceof ExtData) {
      return object;
    }
    return null;
  }
  decode(data, type, context) {
    const decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
    if (decodeExt) {
      return decodeExt(data, type, context);
    } else {
      return new ExtData(type, data);
    }
  }
};

// node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function isArrayBufferLike(buffer) {
  return buffer instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && buffer instanceof SharedArrayBuffer;
}
function ensureUint8Array(buffer) {
  if (buffer instanceof Uint8Array) {
    return buffer;
  } else if (ArrayBuffer.isView(buffer)) {
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (isArrayBufferLike(buffer)) {
    return new Uint8Array(buffer);
  } else {
    return Uint8Array.from(buffer);
  }
}

// node_modules/@msgpack/msgpack/dist.esm/Encoder.mjs
var DEFAULT_MAX_DEPTH = 100;
var DEFAULT_INITIAL_BUFFER_SIZE = 2048;
var Encoder = class _Encoder {
  extensionCodec;
  context;
  useBigInt64;
  maxDepth;
  initialBufferSize;
  sortKeys;
  forceFloat32;
  ignoreUndefined;
  forceIntegerToFloat;
  pos;
  view;
  bytes;
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.maxDepth = options?.maxDepth ?? DEFAULT_MAX_DEPTH;
    this.initialBufferSize = options?.initialBufferSize ?? DEFAULT_INITIAL_BUFFER_SIZE;
    this.sortKeys = options?.sortKeys ?? false;
    this.forceFloat32 = options?.forceFloat32 ?? false;
    this.ignoreUndefined = options?.ignoreUndefined ?? false;
    this.forceIntegerToFloat = options?.forceIntegerToFloat ?? false;
    this.pos = 0;
    this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
    this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new _Encoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      maxDepth: this.maxDepth,
      initialBufferSize: this.initialBufferSize,
      sortKeys: this.sortKeys,
      forceFloat32: this.forceFloat32,
      ignoreUndefined: this.ignoreUndefined,
      forceIntegerToFloat: this.forceIntegerToFloat
    });
  }
  reinitializeState() {
    this.pos = 0;
  }
  /**
   * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
   *
   * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
   */
  encodeSharedRef(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encodeSharedRef(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  /**
   * @returns Encodes the object and returns a copy of the encoder's internal buffer.
   */
  encode(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encode(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.slice(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  doEncode(object, depth) {
    if (depth > this.maxDepth) {
      throw new Error(`Too deep objects in depth ${depth}`);
    }
    if (object == null) {
      this.encodeNil();
    } else if (typeof object === "boolean") {
      this.encodeBoolean(object);
    } else if (typeof object === "number") {
      if (!this.forceIntegerToFloat) {
        this.encodeNumber(object);
      } else {
        this.encodeNumberAsFloat(object);
      }
    } else if (typeof object === "string") {
      this.encodeString(object);
    } else if (this.useBigInt64 && typeof object === "bigint") {
      this.encodeBigInt64(object);
    } else {
      this.encodeObject(object, depth);
    }
  }
  ensureBufferSizeToWrite(sizeToWrite) {
    const requiredSize = this.pos + sizeToWrite;
    if (this.view.byteLength < requiredSize) {
      this.resizeBuffer(requiredSize * 2);
    }
  }
  resizeBuffer(newSize) {
    const newBuffer = new ArrayBuffer(newSize);
    const newBytes = new Uint8Array(newBuffer);
    const newView = new DataView(newBuffer);
    newBytes.set(this.bytes);
    this.view = newView;
    this.bytes = newBytes;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(object) {
    if (object === false) {
      this.writeU8(194);
    } else {
      this.writeU8(195);
    }
  }
  encodeNumber(object) {
    if (!this.forceIntegerToFloat && Number.isSafeInteger(object)) {
      if (object >= 0) {
        if (object < 128) {
          this.writeU8(object);
        } else if (object < 256) {
          this.writeU8(204);
          this.writeU8(object);
        } else if (object < 65536) {
          this.writeU8(205);
          this.writeU16(object);
        } else if (object < 4294967296) {
          this.writeU8(206);
          this.writeU32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(207);
          this.writeU64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      } else {
        if (object >= -32) {
          this.writeU8(224 | object + 32);
        } else if (object >= -128) {
          this.writeU8(208);
          this.writeI8(object);
        } else if (object >= -32768) {
          this.writeU8(209);
          this.writeI16(object);
        } else if (object >= -2147483648) {
          this.writeU8(210);
          this.writeI32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(211);
          this.writeI64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      }
    } else {
      this.encodeNumberAsFloat(object);
    }
  }
  encodeNumberAsFloat(object) {
    if (this.forceFloat32) {
      this.writeU8(202);
      this.writeF32(object);
    } else {
      this.writeU8(203);
      this.writeF64(object);
    }
  }
  encodeBigInt64(object) {
    if (object >= BigInt(0)) {
      this.writeU8(207);
      this.writeBigUint64(object);
    } else {
      this.writeU8(211);
      this.writeBigInt64(object);
    }
  }
  writeStringHeader(byteLength) {
    if (byteLength < 32) {
      this.writeU8(160 + byteLength);
    } else if (byteLength < 256) {
      this.writeU8(217);
      this.writeU8(byteLength);
    } else if (byteLength < 65536) {
      this.writeU8(218);
      this.writeU16(byteLength);
    } else if (byteLength < 4294967296) {
      this.writeU8(219);
      this.writeU32(byteLength);
    } else {
      throw new Error(`Too long string: ${byteLength} bytes in UTF-8`);
    }
  }
  encodeString(object) {
    const maxHeaderSize = 1 + 4;
    const byteLength = utf8Count(object);
    this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
    this.writeStringHeader(byteLength);
    utf8Encode(object, this.bytes, this.pos);
    this.pos += byteLength;
  }
  encodeObject(object, depth) {
    const ext = this.extensionCodec.tryToEncode(object, this.context);
    if (ext != null) {
      this.encodeExtension(ext);
    } else if (Array.isArray(object)) {
      this.encodeArray(object, depth);
    } else if (ArrayBuffer.isView(object)) {
      this.encodeBinary(object);
    } else if (typeof object === "object") {
      this.encodeMap(object, depth);
    } else {
      throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(object)}`);
    }
  }
  encodeBinary(object) {
    const size = object.byteLength;
    if (size < 256) {
      this.writeU8(196);
      this.writeU8(size);
    } else if (size < 65536) {
      this.writeU8(197);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(198);
      this.writeU32(size);
    } else {
      throw new Error(`Too large binary: ${size}`);
    }
    const bytes = ensureUint8Array(object);
    this.writeU8a(bytes);
  }
  encodeArray(object, depth) {
    const size = object.length;
    if (size < 16) {
      this.writeU8(144 + size);
    } else if (size < 65536) {
      this.writeU8(220);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(221);
      this.writeU32(size);
    } else {
      throw new Error(`Too large array: ${size}`);
    }
    for (const item of object) {
      this.doEncode(item, depth + 1);
    }
  }
  countWithoutUndefined(object, keys) {
    let count = 0;
    for (const key of keys) {
      if (object[key] !== void 0) {
        count++;
      }
    }
    return count;
  }
  encodeMap(object, depth) {
    const keys = Object.keys(object);
    if (this.sortKeys) {
      keys.sort();
    }
    const size = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
    if (size < 16) {
      this.writeU8(128 + size);
    } else if (size < 65536) {
      this.writeU8(222);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(223);
      this.writeU32(size);
    } else {
      throw new Error(`Too large map object: ${size}`);
    }
    for (const key of keys) {
      const value = object[key];
      if (!(this.ignoreUndefined && value === void 0)) {
        this.encodeString(key);
        this.doEncode(value, depth + 1);
      }
    }
  }
  encodeExtension(ext) {
    if (typeof ext.data === "function") {
      const data = ext.data(this.pos + 6);
      const size2 = data.length;
      if (size2 >= 4294967296) {
        throw new Error(`Too large extension object: ${size2}`);
      }
      this.writeU8(201);
      this.writeU32(size2);
      this.writeI8(ext.type);
      this.writeU8a(data);
      return;
    }
    const size = ext.data.length;
    if (size === 1) {
      this.writeU8(212);
    } else if (size === 2) {
      this.writeU8(213);
    } else if (size === 4) {
      this.writeU8(214);
    } else if (size === 8) {
      this.writeU8(215);
    } else if (size === 16) {
      this.writeU8(216);
    } else if (size < 256) {
      this.writeU8(199);
      this.writeU8(size);
    } else if (size < 65536) {
      this.writeU8(200);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(201);
      this.writeU32(size);
    } else {
      throw new Error(`Too large extension object: ${size}`);
    }
    this.writeI8(ext.type);
    this.writeU8a(ext.data);
  }
  writeU8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setUint8(this.pos, value);
    this.pos++;
  }
  writeU8a(values) {
    const size = values.length;
    this.ensureBufferSizeToWrite(size);
    this.bytes.set(values, this.pos);
    this.pos += size;
  }
  writeI8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setInt8(this.pos, value);
    this.pos++;
  }
  writeU16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  writeI16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setInt16(this.pos, value);
    this.pos += 2;
  }
  writeU32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setUint32(this.pos, value);
    this.pos += 4;
  }
  writeI32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setInt32(this.pos, value);
    this.pos += 4;
  }
  writeF32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setFloat32(this.pos, value);
    this.pos += 4;
  }
  writeF64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setFloat64(this.pos, value);
    this.pos += 8;
  }
  writeU64(value) {
    this.ensureBufferSizeToWrite(8);
    setUint64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeI64(value) {
    this.ensureBufferSizeToWrite(8);
    setInt64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeBigUint64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigUint64(this.pos, value);
    this.pos += 8;
  }
  writeBigInt64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigInt64(this.pos, value);
    this.pos += 8;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/encode.mjs
function encode(value, options) {
  const encoder = new Encoder(options);
  return encoder.encodeSharedRef(value);
}

// node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function prettyByte(byte) {
  return `${byte < 0 ? "-" : ""}0x${Math.abs(byte).toString(16).padStart(2, "0")}`;
}

// node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var DEFAULT_MAX_KEY_LENGTH = 16;
var DEFAULT_MAX_LENGTH_PER_KEY = 16;
var CachedKeyDecoder = class {
  hit = 0;
  miss = 0;
  caches;
  maxKeyLength;
  maxLengthPerKey;
  constructor(maxKeyLength = DEFAULT_MAX_KEY_LENGTH, maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY) {
    this.maxKeyLength = maxKeyLength;
    this.maxLengthPerKey = maxLengthPerKey;
    this.caches = [];
    for (let i = 0; i < this.maxKeyLength; i++) {
      this.caches.push([]);
    }
  }
  canBeCached(byteLength) {
    return byteLength > 0 && byteLength <= this.maxKeyLength;
  }
  find(bytes, inputOffset, byteLength) {
    const records = this.caches[byteLength - 1];
    FIND_CHUNK: for (const record of records) {
      const recordBytes = record.bytes;
      for (let j = 0; j < byteLength; j++) {
        if (recordBytes[j] !== bytes[inputOffset + j]) {
          continue FIND_CHUNK;
        }
      }
      return record.str;
    }
    return null;
  }
  store(bytes, value) {
    const records = this.caches[bytes.length - 1];
    const record = { bytes, str: value };
    if (records.length >= this.maxLengthPerKey) {
      records[Math.random() * records.length | 0] = record;
    } else {
      records.push(record);
    }
  }
  decode(bytes, inputOffset, byteLength) {
    const cachedValue = this.find(bytes, inputOffset, byteLength);
    if (cachedValue != null) {
      this.hit++;
      return cachedValue;
    }
    this.miss++;
    const str = utf8DecodeJs(bytes, inputOffset, byteLength);
    const slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
    this.store(slicedCopyOfBytes, str);
    return str;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/Decoder.mjs
var STATE_ARRAY = "array";
var STATE_MAP_KEY = "map_key";
var STATE_MAP_VALUE = "map_value";
var mapKeyConverter = (key) => {
  if (typeof key === "string" || typeof key === "number") {
    return key;
  }
  throw new DecodeError("The type of key must be string or number but " + typeof key);
};
var StackPool = class {
  stack = [];
  stackHeadPosition = -1;
  get length() {
    return this.stackHeadPosition + 1;
  }
  top() {
    return this.stack[this.stackHeadPosition];
  }
  pushArrayState(size) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_ARRAY;
    state.position = 0;
    state.size = size;
    state.array = new Array(size);
  }
  pushMapState(size) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_MAP_KEY;
    state.readCount = 0;
    state.size = size;
    state.map = {};
  }
  getUninitializedStateFromPool() {
    this.stackHeadPosition++;
    if (this.stackHeadPosition === this.stack.length) {
      const partialState = {
        type: void 0,
        size: 0,
        array: void 0,
        position: 0,
        readCount: 0,
        map: void 0,
        key: null
      };
      this.stack.push(partialState);
    }
    return this.stack[this.stackHeadPosition];
  }
  release(state) {
    const topStackState = this.stack[this.stackHeadPosition];
    if (topStackState !== state) {
      throw new Error("Invalid stack state. Released state is not on top of the stack.");
    }
    if (state.type === STATE_ARRAY) {
      const partialState = state;
      partialState.size = 0;
      partialState.array = void 0;
      partialState.position = 0;
      partialState.type = void 0;
    }
    if (state.type === STATE_MAP_KEY || state.type === STATE_MAP_VALUE) {
      const partialState = state;
      partialState.size = 0;
      partialState.map = void 0;
      partialState.readCount = 0;
      partialState.type = void 0;
    }
    this.stackHeadPosition--;
  }
  reset() {
    this.stack.length = 0;
    this.stackHeadPosition = -1;
  }
};
var HEAD_BYTE_REQUIRED = -1;
var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
try {
  EMPTY_VIEW.getInt8(0);
} catch (e) {
  if (!(e instanceof RangeError)) {
    throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
  }
}
var MORE_DATA = new RangeError("Insufficient data");
var sharedCachedKeyDecoder = new CachedKeyDecoder();
var Decoder = class _Decoder {
  extensionCodec;
  context;
  useBigInt64;
  rawStrings;
  maxStrLength;
  maxBinLength;
  maxArrayLength;
  maxMapLength;
  maxExtLength;
  keyDecoder;
  mapKeyConverter;
  totalPos = 0;
  pos = 0;
  view = EMPTY_VIEW;
  bytes = EMPTY_BYTES;
  headByte = HEAD_BYTE_REQUIRED;
  stack = new StackPool();
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.rawStrings = options?.rawStrings ?? false;
    this.maxStrLength = options?.maxStrLength ?? UINT32_MAX;
    this.maxBinLength = options?.maxBinLength ?? UINT32_MAX;
    this.maxArrayLength = options?.maxArrayLength ?? UINT32_MAX;
    this.maxMapLength = options?.maxMapLength ?? UINT32_MAX;
    this.maxExtLength = options?.maxExtLength ?? UINT32_MAX;
    this.keyDecoder = options?.keyDecoder !== void 0 ? options.keyDecoder : sharedCachedKeyDecoder;
    this.mapKeyConverter = options?.mapKeyConverter ?? mapKeyConverter;
  }
  clone() {
    return new _Decoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      rawStrings: this.rawStrings,
      maxStrLength: this.maxStrLength,
      maxBinLength: this.maxBinLength,
      maxArrayLength: this.maxArrayLength,
      maxMapLength: this.maxMapLength,
      maxExtLength: this.maxExtLength,
      keyDecoder: this.keyDecoder
    });
  }
  reinitializeState() {
    this.totalPos = 0;
    this.headByte = HEAD_BYTE_REQUIRED;
    this.stack.reset();
  }
  setBuffer(buffer) {
    const bytes = ensureUint8Array(buffer);
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.pos = 0;
  }
  appendBuffer(buffer) {
    if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
      this.setBuffer(buffer);
    } else {
      const remainingData = this.bytes.subarray(this.pos);
      const newData = ensureUint8Array(buffer);
      const newBuffer = new Uint8Array(remainingData.length + newData.length);
      newBuffer.set(remainingData);
      newBuffer.set(newData, remainingData.length);
      this.setBuffer(newBuffer);
    }
  }
  hasRemaining(size) {
    return this.view.byteLength - this.pos >= size;
  }
  createExtraByteError(posToShow) {
    const { view, pos } = this;
    return new RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${posToShow}]`);
  }
  /**
   * @throws {@link DecodeError}
   * @throws {@link RangeError}
   */
  decode(buffer) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decode(buffer);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      const object = this.doDecodeSync();
      if (this.hasRemaining(1)) {
        throw this.createExtraByteError(this.pos);
      }
      return object;
    } finally {
      this.entered = false;
    }
  }
  *decodeMulti(buffer) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMulti(buffer);
      return;
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      while (this.hasRemaining(1)) {
        yield this.doDecodeSync();
      }
    } finally {
      this.entered = false;
    }
  }
  async decodeAsync(stream) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decodeAsync(stream);
    }
    try {
      this.entered = true;
      let decoded = false;
      let object;
      for await (const buffer of stream) {
        if (decoded) {
          this.entered = false;
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        try {
          object = this.doDecodeSync();
          decoded = true;
        } catch (e) {
          if (!(e instanceof RangeError)) {
            throw e;
          }
        }
        this.totalPos += this.pos;
      }
      if (decoded) {
        if (this.hasRemaining(1)) {
          throw this.createExtraByteError(this.totalPos);
        }
        return object;
      }
      const { headByte, pos, totalPos } = this;
      throw new RangeError(`Insufficient data in parsing ${prettyByte(headByte)} at ${totalPos} (${pos} in the current buffer)`);
    } finally {
      this.entered = false;
    }
  }
  decodeArrayStream(stream) {
    return this.decodeMultiAsync(stream, true);
  }
  decodeStream(stream) {
    return this.decodeMultiAsync(stream, false);
  }
  async *decodeMultiAsync(stream, isArray) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMultiAsync(stream, isArray);
      return;
    }
    try {
      this.entered = true;
      let isArrayHeaderRequired = isArray;
      let arrayItemsLeft = -1;
      for await (const buffer of stream) {
        if (isArray && arrayItemsLeft === 0) {
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        if (isArrayHeaderRequired) {
          arrayItemsLeft = this.readArraySize();
          isArrayHeaderRequired = false;
          this.complete();
        }
        try {
          while (true) {
            yield this.doDecodeSync();
            if (--arrayItemsLeft === 0) {
              break;
            }
          }
        } catch (e) {
          if (!(e instanceof RangeError)) {
            throw e;
          }
        }
        this.totalPos += this.pos;
      }
    } finally {
      this.entered = false;
    }
  }
  doDecodeSync() {
    DECODE: while (true) {
      const headByte = this.readHeadByte();
      let object;
      if (headByte >= 224) {
        object = headByte - 256;
      } else if (headByte < 192) {
        if (headByte < 128) {
          object = headByte;
        } else if (headByte < 144) {
          const size = headByte - 128;
          if (size !== 0) {
            this.pushMapState(size);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte < 160) {
          const size = headByte - 144;
          if (size !== 0) {
            this.pushArrayState(size);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else {
          const byteLength = headByte - 160;
          object = this.decodeString(byteLength, 0);
        }
      } else if (headByte === 192) {
        object = null;
      } else if (headByte === 194) {
        object = false;
      } else if (headByte === 195) {
        object = true;
      } else if (headByte === 202) {
        object = this.readF32();
      } else if (headByte === 203) {
        object = this.readF64();
      } else if (headByte === 204) {
        object = this.readU8();
      } else if (headByte === 205) {
        object = this.readU16();
      } else if (headByte === 206) {
        object = this.readU32();
      } else if (headByte === 207) {
        if (this.useBigInt64) {
          object = this.readU64AsBigInt();
        } else {
          object = this.readU64();
        }
      } else if (headByte === 208) {
        object = this.readI8();
      } else if (headByte === 209) {
        object = this.readI16();
      } else if (headByte === 210) {
        object = this.readI32();
      } else if (headByte === 211) {
        if (this.useBigInt64) {
          object = this.readI64AsBigInt();
        } else {
          object = this.readI64();
        }
      } else if (headByte === 217) {
        const byteLength = this.lookU8();
        object = this.decodeString(byteLength, 1);
      } else if (headByte === 218) {
        const byteLength = this.lookU16();
        object = this.decodeString(byteLength, 2);
      } else if (headByte === 219) {
        const byteLength = this.lookU32();
        object = this.decodeString(byteLength, 4);
      } else if (headByte === 220) {
        const size = this.readU16();
        if (size !== 0) {
          this.pushArrayState(size);
          this.complete();
          continue DECODE;
        } else {
          object = [];
        }
      } else if (headByte === 221) {
        const size = this.readU32();
        if (size !== 0) {
          this.pushArrayState(size);
          this.complete();
          continue DECODE;
        } else {
          object = [];
        }
      } else if (headByte === 222) {
        const size = this.readU16();
        if (size !== 0) {
          this.pushMapState(size);
          this.complete();
          continue DECODE;
        } else {
          object = {};
        }
      } else if (headByte === 223) {
        const size = this.readU32();
        if (size !== 0) {
          this.pushMapState(size);
          this.complete();
          continue DECODE;
        } else {
          object = {};
        }
      } else if (headByte === 196) {
        const size = this.lookU8();
        object = this.decodeBinary(size, 1);
      } else if (headByte === 197) {
        const size = this.lookU16();
        object = this.decodeBinary(size, 2);
      } else if (headByte === 198) {
        const size = this.lookU32();
        object = this.decodeBinary(size, 4);
      } else if (headByte === 212) {
        object = this.decodeExtension(1, 0);
      } else if (headByte === 213) {
        object = this.decodeExtension(2, 0);
      } else if (headByte === 214) {
        object = this.decodeExtension(4, 0);
      } else if (headByte === 215) {
        object = this.decodeExtension(8, 0);
      } else if (headByte === 216) {
        object = this.decodeExtension(16, 0);
      } else if (headByte === 199) {
        const size = this.lookU8();
        object = this.decodeExtension(size, 1);
      } else if (headByte === 200) {
        const size = this.lookU16();
        object = this.decodeExtension(size, 2);
      } else if (headByte === 201) {
        const size = this.lookU32();
        object = this.decodeExtension(size, 4);
      } else {
        throw new DecodeError(`Unrecognized type byte: ${prettyByte(headByte)}`);
      }
      this.complete();
      const stack = this.stack;
      while (stack.length > 0) {
        const state = stack.top();
        if (state.type === STATE_ARRAY) {
          state.array[state.position] = object;
          state.position++;
          if (state.position === state.size) {
            object = state.array;
            stack.release(state);
          } else {
            continue DECODE;
          }
        } else if (state.type === STATE_MAP_KEY) {
          if (object === "__proto__") {
            throw new DecodeError("The key __proto__ is not allowed");
          }
          state.key = this.mapKeyConverter(object);
          state.type = STATE_MAP_VALUE;
          continue DECODE;
        } else {
          state.map[state.key] = object;
          state.readCount++;
          if (state.readCount === state.size) {
            object = state.map;
            stack.release(state);
          } else {
            state.key = null;
            state.type = STATE_MAP_KEY;
            continue DECODE;
          }
        }
      }
      return object;
    }
  }
  readHeadByte() {
    if (this.headByte === HEAD_BYTE_REQUIRED) {
      this.headByte = this.readU8();
    }
    return this.headByte;
  }
  complete() {
    this.headByte = HEAD_BYTE_REQUIRED;
  }
  readArraySize() {
    const headByte = this.readHeadByte();
    switch (headByte) {
      case 220:
        return this.readU16();
      case 221:
        return this.readU32();
      default: {
        if (headByte < 160) {
          return headByte - 144;
        } else {
          throw new DecodeError(`Unrecognized array type byte: ${prettyByte(headByte)}`);
        }
      }
    }
  }
  pushMapState(size) {
    if (size > this.maxMapLength) {
      throw new DecodeError(`Max length exceeded: map length (${size}) > maxMapLengthLength (${this.maxMapLength})`);
    }
    this.stack.pushMapState(size);
  }
  pushArrayState(size) {
    if (size > this.maxArrayLength) {
      throw new DecodeError(`Max length exceeded: array length (${size}) > maxArrayLength (${this.maxArrayLength})`);
    }
    this.stack.pushArrayState(size);
  }
  decodeString(byteLength, headerOffset) {
    if (!this.rawStrings || this.stateIsMapKey()) {
      return this.decodeUtf8String(byteLength, headerOffset);
    }
    return this.decodeBinary(byteLength, headerOffset);
  }
  /**
   * @throws {@link RangeError}
   */
  decodeUtf8String(byteLength, headerOffset) {
    if (byteLength > this.maxStrLength) {
      throw new DecodeError(`Max length exceeded: UTF-8 byte length (${byteLength}) > maxStrLength (${this.maxStrLength})`);
    }
    if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
      throw MORE_DATA;
    }
    const offset = this.pos + headerOffset;
    let object;
    if (this.stateIsMapKey() && this.keyDecoder?.canBeCached(byteLength)) {
      object = this.keyDecoder.decode(this.bytes, offset, byteLength);
    } else {
      object = utf8Decode(this.bytes, offset, byteLength);
    }
    this.pos += headerOffset + byteLength;
    return object;
  }
  stateIsMapKey() {
    if (this.stack.length > 0) {
      const state = this.stack.top();
      return state.type === STATE_MAP_KEY;
    }
    return false;
  }
  /**
   * @throws {@link RangeError}
   */
  decodeBinary(byteLength, headOffset) {
    if (byteLength > this.maxBinLength) {
      throw new DecodeError(`Max length exceeded: bin length (${byteLength}) > maxBinLength (${this.maxBinLength})`);
    }
    if (!this.hasRemaining(byteLength + headOffset)) {
      throw MORE_DATA;
    }
    const offset = this.pos + headOffset;
    const object = this.bytes.subarray(offset, offset + byteLength);
    this.pos += headOffset + byteLength;
    return object;
  }
  decodeExtension(size, headOffset) {
    if (size > this.maxExtLength) {
      throw new DecodeError(`Max length exceeded: ext length (${size}) > maxExtLength (${this.maxExtLength})`);
    }
    const extType = this.view.getInt8(this.pos + headOffset);
    const data = this.decodeBinary(
      size,
      headOffset + 1
      /* extType */
    );
    return this.extensionCodec.decode(data, extType, this.context);
  }
  lookU8() {
    return this.view.getUint8(this.pos);
  }
  lookU16() {
    return this.view.getUint16(this.pos);
  }
  lookU32() {
    return this.view.getUint32(this.pos);
  }
  readU8() {
    const value = this.view.getUint8(this.pos);
    this.pos++;
    return value;
  }
  readI8() {
    const value = this.view.getInt8(this.pos);
    this.pos++;
    return value;
  }
  readU16() {
    const value = this.view.getUint16(this.pos);
    this.pos += 2;
    return value;
  }
  readI16() {
    const value = this.view.getInt16(this.pos);
    this.pos += 2;
    return value;
  }
  readU32() {
    const value = this.view.getUint32(this.pos);
    this.pos += 4;
    return value;
  }
  readI32() {
    const value = this.view.getInt32(this.pos);
    this.pos += 4;
    return value;
  }
  readU64() {
    const value = getUint64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readI64() {
    const value = getInt64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readU64AsBigInt() {
    const value = this.view.getBigUint64(this.pos);
    this.pos += 8;
    return value;
  }
  readI64AsBigInt() {
    const value = this.view.getBigInt64(this.pos);
    this.pos += 8;
    return value;
  }
  readF32() {
    const value = this.view.getFloat32(this.pos);
    this.pos += 4;
    return value;
  }
  readF64() {
    const value = this.view.getFloat64(this.pos);
    this.pos += 8;
    return value;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function decode(buffer, options) {
  const decoder = new Decoder(options);
  return decoder.decode(buffer);
}

// src/core/protocol.ts
var CURRENT_VERSION = 11;
function unpack4Bit(packed, width, height) {
  const length = width * height;
  const data = new Uint8Array(length);
  for (let i = 0; i < packed.length; i++) {
    const byte = packed[i];
    const p1 = byte & 240;
    const p2 = (byte & 15) << 4;
    data[i * 2] = p1;
    data[i * 2 + 1] = p2;
  }
  return data;
}
function columnarize(points, tree, width, height, useHDC = false) {
  const count = points.length;
  const x = new Uint16Array(count);
  const y = new Uint16Array(count);
  const angle = new Int16Array(count);
  const scale = new Uint8Array(count);
  let descriptors;
  if (useHDC) {
    descriptors = new Uint32Array(count);
  } else {
    descriptors = new Uint32Array(count * 2);
  }
  for (let i = 0; i < count; i++) {
    x[i] = Math.round(points[i].x / width * 65535);
    y[i] = Math.round(points[i].y / height * 65535);
    angle[i] = Math.round(points[i].angle / Math.PI * 32767);
    scale[i] = Math.round(Math.log2(points[i].scale || 1));
    if (points[i].descriptors && points[i].descriptors.length >= 2) {
      if (useHDC) {
        descriptors[i] = points[i].hdcSignature || 0;
      } else {
        descriptors[i * 2] = points[i].descriptors[0];
        descriptors[i * 2 + 1] = points[i].descriptors[1];
      }
    }
  }
  return {
    x,
    y,
    a: angle,
    s: scale,
    d: descriptors,
    hdc: useHDC ? 1 : 0,
    t: compactTree(tree.rootNode)
  };
}
function columnarizeCompact(points, tree, width, height) {
  const count = points.length;
  const x = new Uint16Array(count);
  const y = new Uint16Array(count);
  const angle = new Int16Array(count);
  const scale = new Uint8Array(count);
  const descriptors = new Uint32Array(count);
  for (let i = 0; i < count; i++) {
    x[i] = Math.round(points[i].x / width * 65535);
    y[i] = Math.round(points[i].y / height * 65535);
    angle[i] = Math.round(points[i].angle / Math.PI * 32767);
    scale[i] = Math.round(Math.log2(points[i].scale || 1));
    if (points[i].descriptors && points[i].descriptors.length >= 2) {
      descriptors[i] = (points[i].descriptors[0] ^ points[i].descriptors[1]) >>> 0;
    }
  }
  return {
    x,
    y,
    a: angle,
    s: scale,
    d: descriptors,
    compact: 1,
    t: compactTree(tree.rootNode)
  };
}
function compactTree(node) {
  if (node.leaf) {
    return [1, node.centerPointIndex || 0, node.pointIndexes];
  }
  return [0, node.centerPointIndex || 0, node.children.map((c) => compactTree(c))];
}
function decodeTaar(buffer) {
  const content = decode(new Uint8Array(buffer));
  const version = content.v || 0;
  if (version < 5 || version > CURRENT_VERSION) {
    console.warn(`Potential incompatible .taar version: ${version}. Standard is ${CURRENT_VERSION}.`);
  }
  const normalizeBuffer = (arr, Type) => {
    if (arr instanceof Uint8Array && Type !== Uint8Array) {
      return new Type(arr.buffer.slice(arr.byteOffset, arr.byteOffset + arr.byteLength));
    }
    return arr;
  };
  const dataList = content.dataList;
  for (let i = 0; i < dataList.length; i++) {
    const item = dataList[i];
    for (const td2 of item.trackingData) {
      td2.px = normalizeBuffer(td2.px, Float32Array);
      td2.py = normalizeBuffer(td2.py, Float32Array);
      const rawData = td2.data || td2.d;
      const w = td2.width || td2.w;
      const h = td2.height || td2.h;
      if (rawData && rawData.length === w * h / 2) {
        const unpacked = unpack4Bit(rawData, w, h);
        if (td2.data) td2.data = unpacked;
        if (td2.d) td2.d = unpacked;
      }
      if (td2.mesh) {
        td2.mesh.t = normalizeBuffer(td2.mesh.t, Uint16Array);
        td2.mesh.e = normalizeBuffer(td2.mesh.e, Uint16Array);
        td2.mesh.rl = normalizeBuffer(td2.mesh.rl, Float32Array);
      }
    }
    for (const kf of item.matchingData) {
      for (const col of [kf.max, kf.min]) {
        if (!col) continue;
        let xRaw = col.x;
        let yRaw = col.y;
        if (xRaw instanceof Uint8Array) {
          xRaw = new Uint16Array(xRaw.buffer.slice(xRaw.byteOffset, xRaw.byteOffset + xRaw.byteLength));
        }
        if (yRaw instanceof Uint8Array) {
          yRaw = new Uint16Array(yRaw.buffer.slice(yRaw.byteOffset, yRaw.byteOffset + yRaw.byteLength));
        }
        const count = xRaw.length;
        const x = new Float32Array(count);
        const y = new Float32Array(count);
        for (let k = 0; k < count; k++) {
          x[k] = xRaw[k] / 65535 * kf.w;
          y[k] = yRaw[k] / 65535 * kf.h;
        }
        col.x = x;
        col.y = y;
        if (col.a instanceof Uint8Array) {
          const aRaw = new Int16Array(col.a.buffer.slice(col.a.byteOffset, col.a.byteOffset + col.a.byteLength));
          const a = new Float32Array(count);
          for (let k = 0; k < count; k++) {
            a[k] = aRaw[k] / 32767 * Math.PI;
          }
          col.a = a;
        }
        if (col.s instanceof Uint8Array) {
          const sRaw = col.s;
          const s = new Float32Array(count);
          for (let k = 0; k < count; k++) {
            s[k] = Math.pow(2, sRaw[k]);
          }
          col.s = s;
        }
        if (col.d instanceof Uint8Array) {
          if (col.hdc === 1) {
            col.d = new Uint32Array(col.d.buffer.slice(col.d.byteOffset, col.d.byteOffset + col.d.byteLength));
          } else {
            col.d = new Uint32Array(col.d.buffer.slice(col.d.byteOffset, col.d.byteOffset + col.d.byteLength));
          }
        }
        if (col.sx && col.sy) {
          col.sx = normalizeBuffer(col.sx, Float32Array);
          col.sy = normalizeBuffer(col.sy, Float32Array);
        } else {
          const sxArr = new Float32Array(count);
          const syArr = new Float32Array(count);
          const fw = kf.w, fh = kf.h;
          for (let k = 0; k < count; k++) {
            const nx = col.x[k] / fw * 2 - 1;
            const ny = col.y[k] / fh * 2 - 1;
            const scaleNorm = Math.log2(col.s[k] || 1) / 10;
            sxArr[k] = nx + scaleNorm * 0.1;
            syArr[k] = ny + scaleNorm * 0.1;
          }
          col.sx = sxArr;
          col.sy = syArr;
        }
      }
    }
  }
  return { version, dataList };
}
function encodeTaar(dataList) {
  return encode({
    v: CURRENT_VERSION,
    dataList
  });
}

// src/core/detector/detector-lite.js
var PYRAMID_MIN_SIZE = 4;
var NUM_BUCKETS_PER_DIMENSION = 15;
var DEFAULT_MAX_FEATURES_PER_BUCKET = 12;
var ORIENTATION_NUM_BINS = 36;
var FREAK_EXPANSION_FACTOR = 7;
var globalUseGPU = true;
var DetectorLite = class {
  constructor(width, height, options = {}) {
    this.width = width;
    this.height = height;
    this.useGPU = options.useGPU !== void 0 ? options.useGPU : globalUseGPU;
    this.useLSH = options.useLSH !== void 0 ? options.useLSH : true;
    this.useHDC = options.useHDC !== void 0 ? options.useHDC : true;
    this.maxFeaturesPerBucket = options.maxFeaturesPerBucket !== void 0 ? options.maxFeaturesPerBucket : DEFAULT_MAX_FEATURES_PER_BUCKET;
    let numOctaves = 0;
    let w = width, h = height;
    while (w >= PYRAMID_MIN_SIZE && h >= PYRAMID_MIN_SIZE) {
      w = Math.floor(w / 2);
      h = Math.floor(h / 2);
      numOctaves++;
      if (numOctaves === 10) break;
    }
    this.numOctaves = options.maxOctaves !== void 0 ? Math.min(numOctaves, options.maxOctaves) : numOctaves;
  }
  /**
   * Detecta características en una imagen en escala de grises
   * @param {Float32Array|Uint8Array} imageData - Datos de imagen (width * height)
   * @param {Object} options - Opciones de detección (ej. octavesToProcess)
   * @returns {{featurePoints: Array}} Puntos de características detectados
   */
  detect(imageData, options = {}) {
    const octavesToProcess = options.octavesToProcess || Array.from({ length: this.numOctaves }, (_, i) => i);
    let data;
    if (imageData instanceof Float32Array) {
      data = imageData;
    } else {
      data = new Float32Array(imageData.length);
      for (let i = 0; i < imageData.length; i++) {
        data[i] = imageData[i];
      }
    }
    const pyramidImages = this._buildGaussianPyramid(data, this.width, this.height, octavesToProcess);
    const dogPyramid = this._buildDogPyramid(pyramidImages, octavesToProcess);
    const extremas = this._findExtremas(dogPyramid, pyramidImages);
    const prunedExtremas = this._applyPrune(extremas);
    this._computeOrientations(prunedExtremas, pyramidImages);
    this._computeFreakDescriptors(prunedExtremas, pyramidImages);
    const featurePoints = prunedExtremas.map((ext) => {
      const scale = Math.pow(2, ext.octave);
      return {
        maxima: ext.score > 0,
        x: ext.x * scale + scale * 0.5 - 0.5,
        y: ext.y * scale + scale * 0.5 - 0.5,
        scale,
        angle: ext.angle || 0,
        score: ext.absScore,
        // Pass through score for sorting in Matcher
        descriptors: this.useLSH && ext.lsh ? ext.lsh : ext.descriptors || [],
        imageData: data
        // Pass source image for refinement
      };
    });
    return { featurePoints, pyramid: pyramidImages };
  }
  /**
   * Construye una pirámide gaussiana
   */
  _buildGaussianPyramid(data, width, height, octavesToProcess = null) {
    if (this.useGPU) {
      try {
        const gpuPyramid = gpuCompute.buildPyramid(data, width, height, this.numOctaves);
        const pyramid2 = [];
        for (let i = 0; i < gpuPyramid.length && i < this.numOctaves; i++) {
          if (octavesToProcess && !octavesToProcess.includes(i)) {
            pyramid2.push(null);
            continue;
          }
          const level = gpuPyramid[i];
          const img2 = this._applyGaussianFilter(level.data, level.width, level.height);
          pyramid2.push([
            { data: level.data, width: level.width, height: level.height },
            { data: img2.data, width: level.width, height: level.height }
          ]);
        }
        return pyramid2;
      } catch (e) {
        console.warn("GPU pyramid failed, falling back to CPU:", e.message);
      }
    }
    if (!this._pyramidBuffers || this._pyramidBuffers.width !== width || this._pyramidBuffers.height !== height) {
      this._pyramidBuffers = { width, height, temp: new Float32Array(width * height) };
    }
    const pyramid = [];
    let currentData = data;
    let currentWidth = width;
    let currentHeight = height;
    for (let i = 0; i < this.numOctaves; i++) {
      const shouldProcess = !octavesToProcess || octavesToProcess.includes(i);
      if (shouldProcess) {
        const img1 = this._applyGaussianFilter(currentData, currentWidth, currentHeight);
        const img2 = this._applyGaussianFilter(img1.data, currentWidth, currentHeight);
        pyramid.push([
          { data: img1.data, width: currentWidth, height: currentHeight },
          { data: img2.data, width: currentWidth, height: currentHeight }
        ]);
      } else {
        pyramid.push(null);
      }
      if (i < this.numOctaves - 1) {
        const needsDownsample = !octavesToProcess || octavesToProcess.some((o) => o > i);
        if (needsDownsample) {
          const sourceData = shouldProcess ? pyramid[i][0].data : currentData;
          const downsampled = this._downsample(sourceData, currentWidth, currentHeight);
          currentData = downsampled.data;
          currentWidth = downsampled.width;
          currentHeight = downsampled.height;
        } else {
          break;
        }
      }
    }
    return pyramid;
  }
  /**
   * Aplica un filtro gaussiano binomial [1,4,6,4,1] - Optimizado
   * Acceso secuencial por filas para máximo aprovechamiento de caché.
   */
  _applyGaussianFilter(data, width, height) {
    const output = new Float32Array(width * height);
    const temp = this._pyramidBuffers?.temp || new Float32Array(width * height);
    const k0 = 0.0625, k1 = 0.25, k2 = 0.375;
    for (let y = 0; y < height; y++) {
      const rowOffset = y * width;
      temp[rowOffset] = data[rowOffset] * (k0 + k1 + k2) + data[rowOffset + 1] * k1 + data[rowOffset + 2] * k0;
      temp[rowOffset + 1] = (data[rowOffset] * k1 + data[rowOffset + 1] * k2 + data[rowOffset + 2] * k1 + data[rowOffset + 3] * k0) * (1 / (k1 + k2 + k1 + k0));
      for (let x = 2; x < width - 2; x++) {
        const pos = rowOffset + x;
        temp[pos] = data[pos - 2] * k0 + data[pos - 1] * k1 + data[pos] * k2 + data[pos + 1] * k1 + data[pos + 2] * k0;
      }
      const r2 = rowOffset + width - 2;
      const r1 = rowOffset + width - 1;
      temp[r2] = (data[r2 - 2] * k0 + data[r2 - 1] * k1 + data[r2] * k2 + data[r1] * k1) * (1 / (k0 + k1 + k2 + k1));
      temp[r1] = data[r1 - 2] * k0 + data[r1 - 1] * k1 + data[r1] * (k2 + k1 + k0);
    }
    for (let x = 0; x < width; x++) {
      output[x] = temp[x] * (k0 + k1 + k2) + temp[x + width] * k1 + temp[x + width * 2] * k0;
      output[x + width] = (temp[x] * k1 + temp[x + width] * k2 + temp[x + width * 2] * k1 + temp[x + width * 3] * k0) * (1 / (k1 + k2 + k1 + k0));
      for (let y = 2; y < height - 2; y++) {
        const p = y * width + x;
        output[p] = temp[p - width * 2] * k0 + temp[p - width] * k1 + temp[p] * k2 + temp[p + width] * k1 + temp[p + width * 2] * k0;
      }
      const b22 = (height - 2) * width + x;
      const b1 = (height - 1) * width + x;
      output[b22] = (temp[b22 - width * 2] * k0 + temp[b22 - width] * k1 + temp[b22] * k2 + temp[b1] * k1) * (1 / (k0 + k1 + k2 + k1));
      output[b1] = temp[b1 - width * 2] * k0 + temp[b1 - width] * k1 + temp[b1] * (k2 + k1 + k0);
    }
    return { data: output, width, height };
  }
  /**
   * Downsample imagen por factor de 2
   */
  _downsample(data, width, height) {
    const newWidth = width >> 1;
    const newHeight = height >> 1;
    const output = new Float32Array(newWidth * newHeight);
    for (let y = 0; y < newHeight; y++) {
      const r0 = y * 2 * width;
      const r1 = r0 + width;
      const dr = y * newWidth;
      for (let x = 0; x < newWidth; x++) {
        const i2 = x * 2;
        output[dr + x] = (data[r0 + i2] + data[r0 + i2 + 1] + data[r1 + i2] + data[r1 + i2 + 1]) * 0.25;
      }
    }
    return { data: output, width: newWidth, height: newHeight };
  }
  /**
   * Construye pirámide de diferencia de gaussianas
   */
  _buildDogPyramid(pyramidImages, octavesToProcess = null) {
    const dogPyramid = [];
    for (let i = 0; i < pyramidImages.length; i++) {
      if (!pyramidImages[i]) {
        dogPyramid.push(null);
        continue;
      }
      const img1 = pyramidImages[i][0];
      const img2 = pyramidImages[i][1];
      const width = img1.width;
      const height = img1.height;
      const dog = new Float32Array(width * height);
      for (let j = 0; j < dog.length; j++) {
        dog[j] = img2.data[j] - img1.data[j];
      }
      dogPyramid.push({ data: dog, width, height });
    }
    return dogPyramid;
  }
  /**
   * Encuentra extremos locales en la pirámide DoG
   */
  _findExtremas(dogPyramid, pyramidImages) {
    const extremas = [];
    for (let octave = 0; octave < dogPyramid.length; octave++) {
      const curr = dogPyramid[octave];
      if (!curr) continue;
      const prev = octave > 0 ? dogPyramid[octave - 1] : null;
      const next = octave < dogPyramid.length - 1 ? dogPyramid[octave + 1] : null;
      const width = curr.width;
      const height = curr.height;
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const val = curr.data[y * width + x];
          if (Math.abs(val) < 3e-3) continue;
          let isMaxima = true;
          let isMinima = true;
          for (let dy = -1; dy <= 1 && (isMaxima || isMinima); dy++) {
            for (let dx = -1; dx <= 1 && (isMaxima || isMinima); dx++) {
              if (dx === 0 && dy === 0) continue;
              const neighbor = curr.data[(y + dy) * width + (x + dx)];
              if (neighbor >= val) isMaxima = false;
              if (neighbor <= val) isMinima = false;
            }
          }
          if ((isMaxima || isMinima) && prev) {
            const px = x << 1;
            const py = y << 1;
            const prevWidth = prev.width;
            for (let dy = -1; dy <= 1 && (isMaxima || isMinima); dy++) {
              for (let dx = -1; dx <= 1 && (isMaxima || isMinima); dx++) {
                const xx = Math.max(0, Math.min(prevWidth - 1, px + dx));
                const yy = Math.max(0, Math.min(prev.height - 1, py + dy));
                const neighbor = prev.data[yy * prevWidth + xx];
                if (neighbor >= val) isMaxima = false;
                if (neighbor <= val) isMinima = false;
              }
            }
          }
          if ((isMaxima || isMinima) && next) {
            const nx = x >> 1;
            const ny = y >> 1;
            const nextWidth = next.width;
            for (let dy = -1; dy <= 1 && (isMaxima || isMinima); dy++) {
              for (let dx = -1; dx <= 1 && (isMaxima || isMinima); dx++) {
                const xx = Math.max(0, Math.min(nextWidth - 1, nx + dx));
                const yy = Math.max(0, Math.min(next.height - 1, ny + dy));
                const neighbor = next.data[yy * nextWidth + xx];
                if (neighbor >= val) isMaxima = false;
                if (neighbor <= val) isMinima = false;
              }
            }
          }
          if (isMaxima || isMinima) {
            extremas.push({
              score: isMaxima ? Math.abs(val) : -Math.abs(val),
              octave,
              x,
              y,
              absScore: Math.abs(val)
            });
          }
        }
      }
    }
    return extremas;
  }
  /**
   * Aplica pruning para mantener solo los mejores features por bucket
   */
  _applyPrune(extremas) {
    const nBuckets = NUM_BUCKETS_PER_DIMENSION;
    const nFeatures = this.maxFeaturesPerBucket;
    const buckets = [];
    for (let i = 0; i < nBuckets * nBuckets; i++) {
      buckets.push([]);
    }
    for (const ext of extremas) {
      const bucketX = Math.min(nBuckets - 1, Math.floor(ext.x / (this.width / Math.pow(2, ext.octave)) * nBuckets));
      const bucketY = Math.min(nBuckets - 1, Math.floor(ext.y / (this.height / Math.pow(2, ext.octave)) * nBuckets));
      const bucketIdx = bucketY * nBuckets + bucketX;
      if (bucketIdx >= 0 && bucketIdx < buckets.length) {
        buckets[bucketIdx].push(ext);
      }
    }
    const result = [];
    for (const bucket of buckets) {
      bucket.sort((a, b) => b.absScore - a.absScore);
      for (let i = 0; i < Math.min(nFeatures, bucket.length); i++) {
        result.push(bucket[i]);
      }
    }
    return result;
  }
  /**
   * Calcula la orientación de cada feature
   */
  _computeOrientations(extremas, pyramidImages) {
    for (const ext of extremas) {
      if (ext.octave < 0 || ext.octave >= pyramidImages.length) {
        ext.angle = 0;
        continue;
      }
      const img = pyramidImages[ext.octave][1];
      const width = img.width;
      const height = img.height;
      const data = img.data;
      const x = Math.floor(ext.x);
      const y = Math.floor(ext.y);
      const histogram = new Float32Array(ORIENTATION_NUM_BINS);
      const radius = 4;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const yy = y + dy;
          const xx = x + dx;
          if (yy <= 0 || yy >= height - 1 || xx <= 0 || xx >= width - 1) continue;
          const gradY = data[(yy + 1) * width + xx] - data[(yy - 1) * width + xx];
          const gradX = data[yy * width + xx + 1] - data[yy * width + xx - 1];
          const mag = Math.sqrt(gradX * gradX + gradY * gradY);
          const angle = Math.atan2(gradY, gradX) + Math.PI;
          const bin = Math.floor(angle / (2 * Math.PI) * ORIENTATION_NUM_BINS) % ORIENTATION_NUM_BINS;
          const weight = Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius));
          histogram[bin] += mag * weight;
        }
      }
      let maxBin = 0;
      for (let i = 1; i < ORIENTATION_NUM_BINS; i++) {
        if (histogram[i] > histogram[maxBin]) {
          maxBin = i;
        }
      }
      ext.angle = (maxBin + 0.5) * 2 * Math.PI / ORIENTATION_NUM_BINS - Math.PI;
    }
  }
  /**
   * Calcula descriptores FREAK
   */
  _computeFreakDescriptors(extremas, pyramidImages) {
    for (const ext of extremas) {
      if (ext.octave < 0 || ext.octave >= pyramidImages.length) {
        ext.descriptors = new Uint8Array(8);
        continue;
      }
      const img = pyramidImages[ext.octave][1];
      const width = img.width;
      const height = img.height;
      const data = img.data;
      const cos = Math.cos(ext.angle || 0) * FREAK_EXPANSION_FACTOR;
      const sin = Math.sin(ext.angle || 0) * FREAK_EXPANSION_FACTOR;
      const samples = new Float32Array(FREAKPOINTS.length);
      for (let i = 0; i < FREAKPOINTS.length; i++) {
        const [, fx, fy] = FREAKPOINTS[i];
        const xp = ext.x + fx * cos - fy * sin;
        const yp = ext.y + fx * sin + fy * cos;
        const x0 = Math.max(0, Math.min(width - 2, Math.floor(xp)));
        const y0 = Math.max(0, Math.min(height - 2, Math.floor(yp)));
        const x1 = x0 + 1;
        const y1 = y0 + 1;
        const fracX = xp - x0;
        const fracY = yp - y0;
        samples[i] = data[y0 * width + x0] * (1 - fracX) * (1 - fracY) + data[y0 * width + x1] * fracX * (1 - fracY) + data[y1 * width + x0] * (1 - fracX) * fracY + data[y1 * width + x1] * fracX * fracY;
      }
      if (this.useLSH) {
        ext.lsh = computeLSH64(samples);
        ext.descriptors = packLSHIntoDescriptor(ext.lsh);
      } else {
        ext.descriptors = computeFullFREAK(samples);
      }
    }
  }
};

// src/runtime/controller.ts
init_constants();

// src/runtime/worker-blob.ts
var WORKER_CODE = '"use strict";(()=>{var ps=Object.create;var Re=Object.defineProperty;var ws=Object.getOwnPropertyDescriptor;var ds=Object.getOwnPropertyNames;var ys=Object.getPrototypeOf,Ms=Object.prototype.hasOwnProperty;var xs=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);var bs=(r,e,s,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ds(e))!Ms.call(r,n)&&n!==s&&Re(r,n,{get:()=>e[n],enumerable:!(t=ws(e,n))||t.enumerable});return r};var Ss=(r,e,s)=>(s=r!=null?ps(ys(r)):{},bs(e||!r||!r.__esModule?Re(s,"default",{value:r,enumerable:!0}):s,r));var ze=xs(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});var Rs=Object.prototype.toString;function et(r){let e=Rs.call(r);return e.endsWith("Array]")&&!e.includes("Big")}function _s(r,e={}){if(!et(r))throw new TypeError("input must be an array");if(r.length===0)throw new TypeError("input must not be empty");let{fromIndex:s=0,toIndex:t=r.length}=e;if(s<0||s>=r.length||!Number.isInteger(s))throw new Error("fromIndex must be a positive integer smaller than length");if(t<=s||t>r.length||!Number.isInteger(t))throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");let n=r[s];for(let o=s+1;o<t;o++)r[o]>n&&(n=r[o]);return n}function vs(r,e={}){if(!et(r))throw new TypeError("input must be an array");if(r.length===0)throw new TypeError("input must not be empty");let{fromIndex:s=0,toIndex:t=r.length}=e;if(s<0||s>=r.length||!Number.isInteger(s))throw new Error("fromIndex must be a positive integer smaller than length");if(t<=s||t>r.length||!Number.isInteger(t))throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");let n=r[s];for(let o=s+1;o<t;o++)r[o]<n&&(n=r[o]);return n}function Pe(r,e={}){if(et(r)){if(r.length===0)throw new TypeError("input must not be empty")}else throw new TypeError("input must be an array");let s;if(e.output!==void 0){if(!et(e.output))throw new TypeError("output option must be an array if specified");s=e.output}else s=new Array(r.length);let t=vs(r),n=_s(r);if(t===n)throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");let{min:o=e.autoMinMax?t:0,max:i=e.autoMinMax?n:1}=e;if(o>=i)throw new RangeError("min option must be smaller than max option");let l=(i-o)/(n-t);for(let c=0;c<r.length;c++)s[c]=(r[c]-t)*l+o;return s}var zt=" ".repeat(2),Ce=" ".repeat(4);function js(){return Le(this)}function Le(r,e={}){let{maxRows:s=15,maxColumns:t=10,maxNumSize:n=8,padMinus:o="auto"}=e;return`${r.constructor.name} {\n${zt}[\n${Ce}${Ts(r,s,t,n,o)}\n${zt}]\n${zt}rows: ${r.rows}\n${zt}columns: ${r.columns}\n}`}function Ts(r,e,s,t,n){let{rows:o,columns:i}=r,l=Math.min(o,e),c=Math.min(i,s),h=[];if(n==="auto"){n=!1;t:for(let f=0;f<l;f++)for(let u=0;u<c;u++)if(r.get(f,u)<0){n=!0;break t}}for(let f=0;f<l;f++){let u=[];for(let a=0;a<c;a++)u.push(Fs(r.get(f,a),t,n));h.push(`${u.join(" ")}`)}return c!==i&&(h[h.length-1]+=` ... ${i-s} more columns`),l!==o&&h.push(`... ${o-e} more rows`),h.join(`\n${Ce}`)}function Fs(r,e,s){return(r>=0&&s?` ${Oe(r,e-1)}`:Oe(r,e)).padEnd(e)}function Oe(r,e){let s=r.toString();if(s.length<=e)return s;let t=r.toFixed(e);if(t.length>e&&(t=r.toFixed(Math.max(0,e-(t.length-e)))),t.length<=e&&!t.startsWith("0.000")&&!t.startsWith("-0.000"))return t;let n=r.toExponential(e);return n.length>e&&(n=r.toExponential(Math.max(0,e-(n.length-e)))),n.slice(0)}function Ns(r,e){r.prototype.add=function(t){return typeof t=="number"?this.addS(t):this.addM(t)},r.prototype.addS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)+t);return this},r.prototype.addM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)+t.get(n,o));return this},r.add=function(t,n){return new e(t).add(n)},r.prototype.sub=function(t){return typeof t=="number"?this.subS(t):this.subM(t)},r.prototype.subS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)-t);return this},r.prototype.subM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)-t.get(n,o));return this},r.sub=function(t,n){return new e(t).sub(n)},r.prototype.subtract=r.prototype.sub,r.prototype.subtractS=r.prototype.subS,r.prototype.subtractM=r.prototype.subM,r.subtract=r.sub,r.prototype.mul=function(t){return typeof t=="number"?this.mulS(t):this.mulM(t)},r.prototype.mulS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)*t);return this},r.prototype.mulM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)*t.get(n,o));return this},r.mul=function(t,n){return new e(t).mul(n)},r.prototype.multiply=r.prototype.mul,r.prototype.multiplyS=r.prototype.mulS,r.prototype.multiplyM=r.prototype.mulM,r.multiply=r.mul,r.prototype.div=function(t){return typeof t=="number"?this.divS(t):this.divM(t)},r.prototype.divS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)/t);return this},r.prototype.divM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)/t.get(n,o));return this},r.div=function(t,n){return new e(t).div(n)},r.prototype.divide=r.prototype.div,r.prototype.divideS=r.prototype.divS,r.prototype.divideM=r.prototype.divM,r.divide=r.div,r.prototype.mod=function(t){return typeof t=="number"?this.modS(t):this.modM(t)},r.prototype.modS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)%t);return this},r.prototype.modM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)%t.get(n,o));return this},r.mod=function(t,n){return new e(t).mod(n)},r.prototype.modulus=r.prototype.mod,r.prototype.modulusS=r.prototype.modS,r.prototype.modulusM=r.prototype.modM,r.modulus=r.mod,r.prototype.and=function(t){return typeof t=="number"?this.andS(t):this.andM(t)},r.prototype.andS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)&t);return this},r.prototype.andM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)&t.get(n,o));return this},r.and=function(t,n){return new e(t).and(n)},r.prototype.or=function(t){return typeof t=="number"?this.orS(t):this.orM(t)},r.prototype.orS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)|t);return this},r.prototype.orM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)|t.get(n,o));return this},r.or=function(t,n){return new e(t).or(n)},r.prototype.xor=function(t){return typeof t=="number"?this.xorS(t):this.xorM(t)},r.prototype.xorS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)^t);return this},r.prototype.xorM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)^t.get(n,o));return this},r.xor=function(t,n){return new e(t).xor(n)},r.prototype.leftShift=function(t){return typeof t=="number"?this.leftShiftS(t):this.leftShiftM(t)},r.prototype.leftShiftS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)<<t);return this},r.prototype.leftShiftM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)<<t.get(n,o));return this},r.leftShift=function(t,n){return new e(t).leftShift(n)},r.prototype.signPropagatingRightShift=function(t){return typeof t=="number"?this.signPropagatingRightShiftS(t):this.signPropagatingRightShiftM(t)},r.prototype.signPropagatingRightShiftS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)>>t);return this},r.prototype.signPropagatingRightShiftM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)>>t.get(n,o));return this},r.signPropagatingRightShift=function(t,n){return new e(t).signPropagatingRightShift(n)},r.prototype.rightShift=function(t){return typeof t=="number"?this.rightShiftS(t):this.rightShiftM(t)},r.prototype.rightShiftS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)>>>t);return this},r.prototype.rightShiftM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)>>>t.get(n,o));return this},r.rightShift=function(t,n){return new e(t).rightShift(n)},r.prototype.zeroFillRightShift=r.prototype.rightShift,r.prototype.zeroFillRightShiftS=r.prototype.rightShiftS,r.prototype.zeroFillRightShiftM=r.prototype.rightShiftM,r.zeroFillRightShift=r.rightShift,r.prototype.not=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,~this.get(t,n));return this},r.not=function(t){return new e(t).not()},r.prototype.abs=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.abs(this.get(t,n)));return this},r.abs=function(t){return new e(t).abs()},r.prototype.acos=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.acos(this.get(t,n)));return this},r.acos=function(t){return new e(t).acos()},r.prototype.acosh=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.acosh(this.get(t,n)));return this},r.acosh=function(t){return new e(t).acosh()},r.prototype.asin=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.asin(this.get(t,n)));return this},r.asin=function(t){return new e(t).asin()},r.prototype.asinh=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.asinh(this.get(t,n)));return this},r.asinh=function(t){return new e(t).asinh()},r.prototype.atan=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.atan(this.get(t,n)));return this},r.atan=function(t){return new e(t).atan()},r.prototype.atanh=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.atanh(this.get(t,n)));return this},r.atanh=function(t){return new e(t).atanh()},r.prototype.cbrt=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.cbrt(this.get(t,n)));return this},r.cbrt=function(t){return new e(t).cbrt()},r.prototype.ceil=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.ceil(this.get(t,n)));return this},r.ceil=function(t){return new e(t).ceil()},r.prototype.clz32=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.clz32(this.get(t,n)));return this},r.clz32=function(t){return new e(t).clz32()},r.prototype.cos=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.cos(this.get(t,n)));return this},r.cos=function(t){return new e(t).cos()},r.prototype.cosh=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.cosh(this.get(t,n)));return this},r.cosh=function(t){return new e(t).cosh()},r.prototype.exp=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.exp(this.get(t,n)));return this},r.exp=function(t){return new e(t).exp()},r.prototype.expm1=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.expm1(this.get(t,n)));return this},r.expm1=function(t){return new e(t).expm1()},r.prototype.floor=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.floor(this.get(t,n)));return this},r.floor=function(t){return new e(t).floor()},r.prototype.fround=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.fround(this.get(t,n)));return this},r.fround=function(t){return new e(t).fround()},r.prototype.log=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.log(this.get(t,n)));return this},r.log=function(t){return new e(t).log()},r.prototype.log1p=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.log1p(this.get(t,n)));return this},r.log1p=function(t){return new e(t).log1p()},r.prototype.log10=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.log10(this.get(t,n)));return this},r.log10=function(t){return new e(t).log10()},r.prototype.log2=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.log2(this.get(t,n)));return this},r.log2=function(t){return new e(t).log2()},r.prototype.round=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.round(this.get(t,n)));return this},r.round=function(t){return new e(t).round()},r.prototype.sign=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.sign(this.get(t,n)));return this},r.sign=function(t){return new e(t).sign()},r.prototype.sin=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.sin(this.get(t,n)));return this},r.sin=function(t){return new e(t).sin()},r.prototype.sinh=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.sinh(this.get(t,n)));return this},r.sinh=function(t){return new e(t).sinh()},r.prototype.sqrt=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.sqrt(this.get(t,n)));return this},r.sqrt=function(t){return new e(t).sqrt()},r.prototype.tan=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.tan(this.get(t,n)));return this},r.tan=function(t){return new e(t).tan()},r.prototype.tanh=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.tanh(this.get(t,n)));return this},r.tanh=function(t){return new e(t).tanh()},r.prototype.trunc=function(){for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.set(t,n,Math.trunc(this.get(t,n)));return this},r.trunc=function(t){return new e(t).trunc()},r.pow=function(t,n){return new e(t).pow(n)},r.prototype.pow=function(t){return typeof t=="number"?this.powS(t):this.powM(t)},r.prototype.powS=function(t){for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)**t);return this},r.prototype.powM=function(t){if(t=e.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let n=0;n<this.rows;n++)for(let o=0;o<this.columns;o++)this.set(n,o,this.get(n,o)**t.get(n,o));return this}}function ht(r,e,s){let t=s?r.rows:r.rows-1;if(e<0||e>t)throw new RangeError("Row index out of range")}function ut(r,e,s){let t=s?r.columns:r.columns-1;if(e<0||e>t)throw new RangeError("Column index out of range")}function Rt(r,e){if(e.to1DArray&&(e=e.to1DArray()),e.length!==r.columns)throw new RangeError("vector size must be the same as the number of columns");return e}function _t(r,e){if(e.to1DArray&&(e=e.to1DArray()),e.length!==r.rows)throw new RangeError("vector size must be the same as the number of rows");return e}function de(r,e){if(!et(e))throw new TypeError("row indices must be an array");for(let s=0;s<e.length;s++)if(e[s]<0||e[s]>=r.rows)throw new RangeError("row indices are out of range")}function ye(r,e){if(!et(e))throw new TypeError("column indices must be an array");for(let s=0;s<e.length;s++)if(e[s]<0||e[s]>=r.columns)throw new RangeError("column indices are out of range")}function ce(r,e,s,t,n){if(arguments.length!==5)throw new RangeError("expected 4 arguments");if(At("startRow",e),At("endRow",s),At("startColumn",t),At("endColumn",n),e>s||t>n||e<0||e>=r.rows||s<0||s>=r.rows||t<0||t>=r.columns||n<0||n>=r.columns)throw new RangeError("Submatrix indices are out of range")}function Wt(r,e=0){let s=[];for(let t=0;t<r;t++)s.push(e);return s}function At(r,e){if(typeof e!="number")throw new TypeError(`${r} must be a number`)}function kt(r){if(r.isEmpty())throw new Error("Empty matrix has no elements to index")}function Ds(r){let e=Wt(r.rows);for(let s=0;s<r.rows;++s)for(let t=0;t<r.columns;++t)e[s]+=r.get(s,t);return e}function Ps(r){let e=Wt(r.columns);for(let s=0;s<r.rows;++s)for(let t=0;t<r.columns;++t)e[t]+=r.get(s,t);return e}function Os(r){let e=0;for(let s=0;s<r.rows;s++)for(let t=0;t<r.columns;t++)e+=r.get(s,t);return e}function qs(r){let e=Wt(r.rows,1);for(let s=0;s<r.rows;++s)for(let t=0;t<r.columns;++t)e[s]*=r.get(s,t);return e}function Cs(r){let e=Wt(r.columns,1);for(let s=0;s<r.rows;++s)for(let t=0;t<r.columns;++t)e[t]*=r.get(s,t);return e}function Ls(r){let e=1;for(let s=0;s<r.rows;s++)for(let t=0;t<r.columns;t++)e*=r.get(s,t);return e}function Us(r,e,s){let t=r.rows,n=r.columns,o=[];for(let i=0;i<t;i++){let l=0,c=0,h=0;for(let f=0;f<n;f++)h=r.get(i,f)-s[i],l+=h,c+=h*h;e?o.push((c-l*l/n)/(n-1)):o.push((c-l*l/n)/n)}return o}function zs(r,e,s){let t=r.rows,n=r.columns,o=[];for(let i=0;i<n;i++){let l=0,c=0,h=0;for(let f=0;f<t;f++)h=r.get(f,i)-s[i],l+=h,c+=h*h;e?o.push((c-l*l/t)/(t-1)):o.push((c-l*l/t)/t)}return o}function As(r,e,s){let t=r.rows,n=r.columns,o=t*n,i=0,l=0,c=0;for(let h=0;h<t;h++)for(let f=0;f<n;f++)c=r.get(h,f)-s,i+=c,l+=c*c;return e?(l-i*i/o)/(o-1):(l-i*i/o)/o}function Xs(r,e){for(let s=0;s<r.rows;s++)for(let t=0;t<r.columns;t++)r.set(s,t,r.get(s,t)-e[s])}function Vs(r,e){for(let s=0;s<r.rows;s++)for(let t=0;t<r.columns;t++)r.set(s,t,r.get(s,t)-e[t])}function Ys(r,e){for(let s=0;s<r.rows;s++)for(let t=0;t<r.columns;t++)r.set(s,t,r.get(s,t)-e)}function Gs(r){let e=[];for(let s=0;s<r.rows;s++){let t=0;for(let n=0;n<r.columns;n++)t+=r.get(s,n)**2/(r.columns-1);e.push(Math.sqrt(t))}return e}function Bs(r,e){for(let s=0;s<r.rows;s++)for(let t=0;t<r.columns;t++)r.set(s,t,r.get(s,t)/e[s])}function Ks(r){let e=[];for(let s=0;s<r.columns;s++){let t=0;for(let n=0;n<r.rows;n++)t+=r.get(n,s)**2/(r.rows-1);e.push(Math.sqrt(t))}return e}function $s(r,e){for(let s=0;s<r.rows;s++)for(let t=0;t<r.columns;t++)r.set(s,t,r.get(s,t)/e[t])}function Ws(r){let e=r.size-1,s=0;for(let t=0;t<r.columns;t++)for(let n=0;n<r.rows;n++)s+=r.get(n,t)**2/e;return Math.sqrt(s)}function Js(r,e){for(let s=0;s<r.rows;s++)for(let t=0;t<r.columns;t++)r.set(s,t,r.get(s,t)/e)}var J=class r{static from1DArray(e,s,t){if(e*s!==t.length)throw new RangeError("data length does not match given dimensions");let o=new j(e,s);for(let i=0;i<e;i++)for(let l=0;l<s;l++)o.set(i,l,t[i*s+l]);return o}static rowVector(e){let s=new j(1,e.length);for(let t=0;t<e.length;t++)s.set(0,t,e[t]);return s}static columnVector(e){let s=new j(e.length,1);for(let t=0;t<e.length;t++)s.set(t,0,e[t]);return s}static zeros(e,s){return new j(e,s)}static ones(e,s){return new j(e,s).fill(1)}static rand(e,s,t={}){if(typeof t!="object")throw new TypeError("options must be an object");let{random:n=Math.random}=t,o=new j(e,s);for(let i=0;i<e;i++)for(let l=0;l<s;l++)o.set(i,l,n());return o}static randInt(e,s,t={}){if(typeof t!="object")throw new TypeError("options must be an object");let{min:n=0,max:o=1e3,random:i=Math.random}=t;if(!Number.isInteger(n))throw new TypeError("min must be an integer");if(!Number.isInteger(o))throw new TypeError("max must be an integer");if(n>=o)throw new RangeError("min must be smaller than max");let l=o-n,c=new j(e,s);for(let h=0;h<e;h++)for(let f=0;f<s;f++){let u=n+Math.round(i()*l);c.set(h,f,u)}return c}static eye(e,s,t){s===void 0&&(s=e),t===void 0&&(t=1);let n=Math.min(e,s),o=this.zeros(e,s);for(let i=0;i<n;i++)o.set(i,i,t);return o}static diag(e,s,t){let n=e.length;s===void 0&&(s=n),t===void 0&&(t=s);let o=Math.min(n,s,t),i=this.zeros(s,t);for(let l=0;l<o;l++)i.set(l,l,e[l]);return i}static min(e,s){e=this.checkMatrix(e),s=this.checkMatrix(s);let t=e.rows,n=e.columns,o=new j(t,n);for(let i=0;i<t;i++)for(let l=0;l<n;l++)o.set(i,l,Math.min(e.get(i,l),s.get(i,l)));return o}static max(e,s){e=this.checkMatrix(e),s=this.checkMatrix(s);let t=e.rows,n=e.columns,o=new this(t,n);for(let i=0;i<t;i++)for(let l=0;l<n;l++)o.set(i,l,Math.max(e.get(i,l),s.get(i,l)));return o}static checkMatrix(e){return r.isMatrix(e)?e:new j(e)}static isMatrix(e){return e!=null&&e.klass==="Matrix"}get size(){return this.rows*this.columns}apply(e){if(typeof e!="function")throw new TypeError("callback must be a function");for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)e.call(this,s,t);return this}to1DArray(){let e=[];for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)e.push(this.get(s,t));return e}to2DArray(){let e=[];for(let s=0;s<this.rows;s++){e.push([]);for(let t=0;t<this.columns;t++)e[s].push(this.get(s,t))}return e}toJSON(){return this.to2DArray()}isRowVector(){return this.rows===1}isColumnVector(){return this.columns===1}isVector(){return this.rows===1||this.columns===1}isSquare(){return this.rows===this.columns}isEmpty(){return this.rows===0||this.columns===0}isSymmetric(){if(this.isSquare()){for(let e=0;e<this.rows;e++)for(let s=0;s<=e;s++)if(this.get(e,s)!==this.get(s,e))return!1;return!0}return!1}isDistance(){if(!this.isSymmetric())return!1;for(let e=0;e<this.rows;e++)if(this.get(e,e)!==0)return!1;return!0}isEchelonForm(){let e=0,s=0,t=-1,n=!0,o=!1;for(;e<this.rows&&n;){for(s=0,o=!1;s<this.columns&&o===!1;)this.get(e,s)===0?s++:this.get(e,s)===1&&s>t?(o=!0,t=s):(n=!1,o=!0);e++}return n}isReducedEchelonForm(){let e=0,s=0,t=-1,n=!0,o=!1;for(;e<this.rows&&n;){for(s=0,o=!1;s<this.columns&&o===!1;)this.get(e,s)===0?s++:this.get(e,s)===1&&s>t?(o=!0,t=s):(n=!1,o=!0);for(let i=s+1;i<this.rows;i++)this.get(e,i)!==0&&(n=!1);e++}return n}echelonForm(){let e=this.clone(),s=0,t=0;for(;s<e.rows&&t<e.columns;){let n=s;for(let o=s;o<e.rows;o++)e.get(o,t)>e.get(n,t)&&(n=o);if(e.get(n,t)===0)t++;else{e.swapRows(s,n);let o=e.get(s,t);for(let i=t;i<e.columns;i++)e.set(s,i,e.get(s,i)/o);for(let i=s+1;i<e.rows;i++){let l=e.get(i,t)/e.get(s,t);e.set(i,t,0);for(let c=t+1;c<e.columns;c++)e.set(i,c,e.get(i,c)-e.get(s,c)*l)}s++,t++}}return e}reducedEchelonForm(){let e=this.echelonForm(),s=e.columns,t=e.rows,n=t-1;for(;n>=0;)if(e.maxRow(n)===0)n--;else{let o=0,i=!1;for(;o<t&&i===!1;)e.get(n,o)===1?i=!0:o++;for(let l=0;l<n;l++){let c=e.get(l,o);for(let h=o;h<s;h++){let f=e.get(l,h)-c*e.get(n,h);e.set(l,h,f)}}n--}return e}set(){throw new Error("set method is unimplemented")}get(){throw new Error("get method is unimplemented")}repeat(e={}){if(typeof e!="object")throw new TypeError("options must be an object");let{rows:s=1,columns:t=1}=e;if(!Number.isInteger(s)||s<=0)throw new TypeError("rows must be a positive integer");if(!Number.isInteger(t)||t<=0)throw new TypeError("columns must be a positive integer");let n=new j(this.rows*s,this.columns*t);for(let o=0;o<s;o++)for(let i=0;i<t;i++)n.setSubMatrix(this,this.rows*o,this.columns*i);return n}fill(e){for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,e);return this}neg(){return this.mulS(-1)}getRow(e){ht(this,e);let s=[];for(let t=0;t<this.columns;t++)s.push(this.get(e,t));return s}getRowVector(e){return j.rowVector(this.getRow(e))}setRow(e,s){ht(this,e),s=Rt(this,s);for(let t=0;t<this.columns;t++)this.set(e,t,s[t]);return this}swapRows(e,s){ht(this,e),ht(this,s);for(let t=0;t<this.columns;t++){let n=this.get(e,t);this.set(e,t,this.get(s,t)),this.set(s,t,n)}return this}getColumn(e){ut(this,e);let s=[];for(let t=0;t<this.rows;t++)s.push(this.get(t,e));return s}getColumnVector(e){return j.columnVector(this.getColumn(e))}setColumn(e,s){ut(this,e),s=_t(this,s);for(let t=0;t<this.rows;t++)this.set(t,e,s[t]);return this}swapColumns(e,s){ut(this,e),ut(this,s);for(let t=0;t<this.rows;t++){let n=this.get(t,e);this.set(t,e,this.get(t,s)),this.set(t,s,n)}return this}addRowVector(e){e=Rt(this,e);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,this.get(s,t)+e[t]);return this}subRowVector(e){e=Rt(this,e);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,this.get(s,t)-e[t]);return this}mulRowVector(e){e=Rt(this,e);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,this.get(s,t)*e[t]);return this}divRowVector(e){e=Rt(this,e);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,this.get(s,t)/e[t]);return this}addColumnVector(e){e=_t(this,e);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,this.get(s,t)+e[s]);return this}subColumnVector(e){e=_t(this,e);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,this.get(s,t)-e[s]);return this}mulColumnVector(e){e=_t(this,e);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,this.get(s,t)*e[s]);return this}divColumnVector(e){e=_t(this,e);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)this.set(s,t,this.get(s,t)/e[s]);return this}mulRow(e,s){ht(this,e);for(let t=0;t<this.columns;t++)this.set(e,t,this.get(e,t)*s);return this}mulColumn(e,s){ut(this,e);for(let t=0;t<this.rows;t++)this.set(t,e,this.get(t,e)*s);return this}max(e){if(this.isEmpty())return NaN;switch(e){case"row":{let s=new Array(this.rows).fill(Number.NEGATIVE_INFINITY);for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.get(t,n)>s[t]&&(s[t]=this.get(t,n));return s}case"column":{let s=new Array(this.columns).fill(Number.NEGATIVE_INFINITY);for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.get(t,n)>s[n]&&(s[n]=this.get(t,n));return s}case void 0:{let s=this.get(0,0);for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.get(t,n)>s&&(s=this.get(t,n));return s}default:throw new Error(`invalid option: ${e}`)}}maxIndex(){kt(this);let e=this.get(0,0),s=[0,0];for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.get(t,n)>e&&(e=this.get(t,n),s[0]=t,s[1]=n);return s}min(e){if(this.isEmpty())return NaN;switch(e){case"row":{let s=new Array(this.rows).fill(Number.POSITIVE_INFINITY);for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.get(t,n)<s[t]&&(s[t]=this.get(t,n));return s}case"column":{let s=new Array(this.columns).fill(Number.POSITIVE_INFINITY);for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.get(t,n)<s[n]&&(s[n]=this.get(t,n));return s}case void 0:{let s=this.get(0,0);for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.get(t,n)<s&&(s=this.get(t,n));return s}default:throw new Error(`invalid option: ${e}`)}}minIndex(){kt(this);let e=this.get(0,0),s=[0,0];for(let t=0;t<this.rows;t++)for(let n=0;n<this.columns;n++)this.get(t,n)<e&&(e=this.get(t,n),s[0]=t,s[1]=n);return s}maxRow(e){if(ht(this,e),this.isEmpty())return NaN;let s=this.get(e,0);for(let t=1;t<this.columns;t++)this.get(e,t)>s&&(s=this.get(e,t));return s}maxRowIndex(e){ht(this,e),kt(this);let s=this.get(e,0),t=[e,0];for(let n=1;n<this.columns;n++)this.get(e,n)>s&&(s=this.get(e,n),t[1]=n);return t}minRow(e){if(ht(this,e),this.isEmpty())return NaN;let s=this.get(e,0);for(let t=1;t<this.columns;t++)this.get(e,t)<s&&(s=this.get(e,t));return s}minRowIndex(e){ht(this,e),kt(this);let s=this.get(e,0),t=[e,0];for(let n=1;n<this.columns;n++)this.get(e,n)<s&&(s=this.get(e,n),t[1]=n);return t}maxColumn(e){if(ut(this,e),this.isEmpty())return NaN;let s=this.get(0,e);for(let t=1;t<this.rows;t++)this.get(t,e)>s&&(s=this.get(t,e));return s}maxColumnIndex(e){ut(this,e),kt(this);let s=this.get(0,e),t=[0,e];for(let n=1;n<this.rows;n++)this.get(n,e)>s&&(s=this.get(n,e),t[0]=n);return t}minColumn(e){if(ut(this,e),this.isEmpty())return NaN;let s=this.get(0,e);for(let t=1;t<this.rows;t++)this.get(t,e)<s&&(s=this.get(t,e));return s}minColumnIndex(e){ut(this,e),kt(this);let s=this.get(0,e),t=[0,e];for(let n=1;n<this.rows;n++)this.get(n,e)<s&&(s=this.get(n,e),t[0]=n);return t}diag(){let e=Math.min(this.rows,this.columns),s=[];for(let t=0;t<e;t++)s.push(this.get(t,t));return s}norm(e="frobenius"){switch(e){case"max":return this.max();case"frobenius":return Math.sqrt(this.dot(this));default:throw new RangeError(`unknown norm type: ${e}`)}}cumulativeSum(){let e=0;for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)e+=this.get(s,t),this.set(s,t,e);return this}dot(e){r.isMatrix(e)&&(e=e.to1DArray());let s=this.to1DArray();if(s.length!==e.length)throw new RangeError("vectors do not have the same size");let t=0;for(let n=0;n<s.length;n++)t+=s[n]*e[n];return t}mmul(e){e=j.checkMatrix(e);let s=this.rows,t=this.columns,n=e.columns,o=new j(s,n),i=new Float64Array(t);for(let l=0;l<n;l++){for(let c=0;c<t;c++)i[c]=e.get(c,l);for(let c=0;c<s;c++){let h=0;for(let f=0;f<t;f++)h+=this.get(c,f)*i[f];o.set(c,l,h)}}return o}mpow(e){if(!this.isSquare())throw new RangeError("Matrix must be square");if(!Number.isInteger(e)||e<0)throw new RangeError("Exponent must be a non-negative integer");let s=j.eye(this.rows),t=this;for(let n=e;n>=1;n/=2)(n&1)!==0&&(s=s.mmul(t)),t=t.mmul(t);return s}strassen2x2(e){e=j.checkMatrix(e);let s=new j(2,2),t=this.get(0,0),n=e.get(0,0),o=this.get(0,1),i=e.get(0,1),l=this.get(1,0),c=e.get(1,0),h=this.get(1,1),f=e.get(1,1),u=(t+h)*(n+f),a=(l+h)*n,w=t*(i-f),m=h*(c-n),y=(t+o)*f,d=(l-t)*(n+i),g=(o-h)*(c+f),b=u+m-y+g,x=w+y,M=a+m,k=u-a+w+d;return s.set(0,0,b),s.set(0,1,x),s.set(1,0,M),s.set(1,1,k),s}strassen3x3(e){e=j.checkMatrix(e);let s=new j(3,3),t=this.get(0,0),n=this.get(0,1),o=this.get(0,2),i=this.get(1,0),l=this.get(1,1),c=this.get(1,2),h=this.get(2,0),f=this.get(2,1),u=this.get(2,2),a=e.get(0,0),w=e.get(0,1),m=e.get(0,2),y=e.get(1,0),d=e.get(1,1),g=e.get(1,2),b=e.get(2,0),x=e.get(2,1),M=e.get(2,2),k=(t+n+o-i-l-f-u)*d,E=(t-i)*(-w+d),R=l*(-a+w+y-d-g-b+M),v=(-t+i+l)*(a-w+d),O=(i+l)*(-a+w),p=t*a,S=(-t+h+f)*(a-m+g),_=(-t+h)*(m-g),I=(h+f)*(-a+m),P=(t+n+o-l-c-h-f)*g,T=f*(-a+m+y-d-g-b+x),F=(-o+f+u)*(d+b-x),L=(o-u)*(d-x),X=o*b,K=(f+u)*(-b+x),N=(-o+l+c)*(g+b-M),D=(o-c)*(g-M),C=(l+c)*(-b+M),q=n*y,V=c*x,G=i*m,U=h*w,z=u*M,W=p+X+q,$=k+v+O+p+F+X+K,Q=p+S+I+P+X+N+C,B=E+R+v+p+X+N+D,st=E+v+O+p+V,tt=X+N+D+C+G,Z=p+S+_+T+F+L+X,nt=F+L+X+K+U,lt=p+S+_+I+z;return s.set(0,0,W),s.set(0,1,$),s.set(0,2,Q),s.set(1,0,B),s.set(1,1,st),s.set(1,2,tt),s.set(2,0,Z),s.set(2,1,nt),s.set(2,2,lt),s}mmulStrassen(e){e=j.checkMatrix(e);let s=this.clone(),t=s.rows,n=s.columns,o=e.rows,i=e.columns;n!==o&&console.warn(`Multiplying ${t} x ${n} and ${o} x ${i} matrix: dimensions do not match.`);function l(u,a,w){let m=u.rows,y=u.columns;if(m===a&&y===w)return u;{let d=r.zeros(a,w);return d=d.setSubMatrix(u,0,0),d}}let c=Math.max(t,o),h=Math.max(n,i);s=l(s,c,h),e=l(e,c,h);function f(u,a,w,m){if(w<=512||m<=512)return u.mmul(a);w%2===1&&m%2===1?(u=l(u,w+1,m+1),a=l(a,w+1,m+1)):w%2===1?(u=l(u,w+1,m),a=l(a,w+1,m)):m%2===1&&(u=l(u,w,m+1),a=l(a,w,m+1));let y=parseInt(u.rows/2,10),d=parseInt(u.columns/2,10),g=u.subMatrix(0,y-1,0,d-1),b=a.subMatrix(0,y-1,0,d-1),x=u.subMatrix(0,y-1,d,u.columns-1),M=a.subMatrix(0,y-1,d,a.columns-1),k=u.subMatrix(y,u.rows-1,0,d-1),E=a.subMatrix(y,a.rows-1,0,d-1),R=u.subMatrix(y,u.rows-1,d,u.columns-1),v=a.subMatrix(y,a.rows-1,d,a.columns-1),O=f(r.add(g,R),r.add(b,v),y,d),p=f(r.add(k,R),b,y,d),S=f(g,r.sub(M,v),y,d),_=f(R,r.sub(E,b),y,d),I=f(r.add(g,x),v,y,d),P=f(r.sub(k,g),r.add(b,M),y,d),T=f(r.sub(x,R),r.add(E,v),y,d),F=r.add(O,_);F.sub(I),F.add(T);let L=r.add(S,I),X=r.add(p,_),K=r.sub(O,p);K.add(S),K.add(P);let N=r.zeros(2*F.rows,2*F.columns);return N=N.setSubMatrix(F,0,0),N=N.setSubMatrix(L,F.rows,0),N=N.setSubMatrix(X,0,F.columns),N=N.setSubMatrix(K,F.rows,F.columns),N.subMatrix(0,w-1,0,m-1)}return f(s,e,c,h)}scaleRows(e={}){if(typeof e!="object")throw new TypeError("options must be an object");let{min:s=0,max:t=1}=e;if(!Number.isFinite(s))throw new TypeError("min must be a number");if(!Number.isFinite(t))throw new TypeError("max must be a number");if(s>=t)throw new RangeError("min must be smaller than max");let n=new j(this.rows,this.columns);for(let o=0;o<this.rows;o++){let i=this.getRow(o);i.length>0&&Pe(i,{min:s,max:t,output:i}),n.setRow(o,i)}return n}scaleColumns(e={}){if(typeof e!="object")throw new TypeError("options must be an object");let{min:s=0,max:t=1}=e;if(!Number.isFinite(s))throw new TypeError("min must be a number");if(!Number.isFinite(t))throw new TypeError("max must be a number");if(s>=t)throw new RangeError("min must be smaller than max");let n=new j(this.rows,this.columns);for(let o=0;o<this.columns;o++){let i=this.getColumn(o);i.length&&Pe(i,{min:s,max:t,output:i}),n.setColumn(o,i)}return n}flipRows(){let e=Math.ceil(this.columns/2);for(let s=0;s<this.rows;s++)for(let t=0;t<e;t++){let n=this.get(s,t),o=this.get(s,this.columns-1-t);this.set(s,t,o),this.set(s,this.columns-1-t,n)}return this}flipColumns(){let e=Math.ceil(this.rows/2);for(let s=0;s<this.columns;s++)for(let t=0;t<e;t++){let n=this.get(t,s),o=this.get(this.rows-1-t,s);this.set(t,s,o),this.set(this.rows-1-t,s,n)}return this}kroneckerProduct(e){e=j.checkMatrix(e);let s=this.rows,t=this.columns,n=e.rows,o=e.columns,i=new j(s*n,t*o);for(let l=0;l<s;l++)for(let c=0;c<t;c++)for(let h=0;h<n;h++)for(let f=0;f<o;f++)i.set(n*l+h,o*c+f,this.get(l,c)*e.get(h,f));return i}kroneckerSum(e){if(e=j.checkMatrix(e),!this.isSquare()||!e.isSquare())throw new Error("Kronecker Sum needs two Square Matrices");let s=this.rows,t=e.rows,n=this.kroneckerProduct(j.eye(t,t)),o=j.eye(s,s).kroneckerProduct(e);return n.add(o)}transpose(){let e=new j(this.columns,this.rows);for(let s=0;s<this.rows;s++)for(let t=0;t<this.columns;t++)e.set(t,s,this.get(s,t));return e}sortRows(e=qe){for(let s=0;s<this.rows;s++)this.setRow(s,this.getRow(s).sort(e));return this}sortColumns(e=qe){for(let s=0;s<this.columns;s++)this.setColumn(s,this.getColumn(s).sort(e));return this}subMatrix(e,s,t,n){ce(this,e,s,t,n);let o=new j(s-e+1,n-t+1);for(let i=e;i<=s;i++)for(let l=t;l<=n;l++)o.set(i-e,l-t,this.get(i,l));return o}subMatrixRow(e,s,t){if(s===void 0&&(s=0),t===void 0&&(t=this.columns-1),s>t||s<0||s>=this.columns||t<0||t>=this.columns)throw new RangeError("Argument out of range");let n=new j(e.length,t-s+1);for(let o=0;o<e.length;o++)for(let i=s;i<=t;i++){if(e[o]<0||e[o]>=this.rows)throw new RangeError(`Row index out of range: ${e[o]}`);n.set(o,i-s,this.get(e[o],i))}return n}subMatrixColumn(e,s,t){if(s===void 0&&(s=0),t===void 0&&(t=this.rows-1),s>t||s<0||s>=this.rows||t<0||t>=this.rows)throw new RangeError("Argument out of range");let n=new j(t-s+1,e.length);for(let o=0;o<e.length;o++)for(let i=s;i<=t;i++){if(e[o]<0||e[o]>=this.columns)throw new RangeError(`Column index out of range: ${e[o]}`);n.set(i-s,o,this.get(i,e[o]))}return n}setSubMatrix(e,s,t){if(e=j.checkMatrix(e),e.isEmpty())return this;let n=s+e.rows-1,o=t+e.columns-1;ce(this,s,n,t,o);for(let i=0;i<e.rows;i++)for(let l=0;l<e.columns;l++)this.set(s+i,t+l,e.get(i,l));return this}selection(e,s){de(this,e),ye(this,s);let t=new j(e.length,s.length);for(let n=0;n<e.length;n++){let o=e[n];for(let i=0;i<s.length;i++){let l=s[i];t.set(n,i,this.get(o,l))}}return t}trace(){let e=Math.min(this.rows,this.columns),s=0;for(let t=0;t<e;t++)s+=this.get(t,t);return s}clone(){return this.constructor.copy(this,new j(this.rows,this.columns))}static copy(e,s){for(let[t,n,o]of e.entries())s.set(t,n,o);return s}sum(e){switch(e){case"row":return Ds(this);case"column":return Ps(this);case void 0:return Os(this);default:throw new Error(`invalid option: ${e}`)}}product(e){switch(e){case"row":return qs(this);case"column":return Cs(this);case void 0:return Ls(this);default:throw new Error(`invalid option: ${e}`)}}mean(e){let s=this.sum(e);switch(e){case"row":{for(let t=0;t<this.rows;t++)s[t]/=this.columns;return s}case"column":{for(let t=0;t<this.columns;t++)s[t]/=this.rows;return s}case void 0:return s/this.size;default:throw new Error(`invalid option: ${e}`)}}variance(e,s={}){if(typeof e=="object"&&(s=e,e=void 0),typeof s!="object")throw new TypeError("options must be an object");let{unbiased:t=!0,mean:n=this.mean(e)}=s;if(typeof t!="boolean")throw new TypeError("unbiased must be a boolean");switch(e){case"row":{if(!et(n))throw new TypeError("mean must be an array");return Us(this,t,n)}case"column":{if(!et(n))throw new TypeError("mean must be an array");return zs(this,t,n)}case void 0:{if(typeof n!="number")throw new TypeError("mean must be a number");return As(this,t,n)}default:throw new Error(`invalid option: ${e}`)}}standardDeviation(e,s){typeof e=="object"&&(s=e,e=void 0);let t=this.variance(e,s);if(e===void 0)return Math.sqrt(t);for(let n=0;n<t.length;n++)t[n]=Math.sqrt(t[n]);return t}center(e,s={}){if(typeof e=="object"&&(s=e,e=void 0),typeof s!="object")throw new TypeError("options must be an object");let{center:t=this.mean(e)}=s;switch(e){case"row":{if(!et(t))throw new TypeError("center must be an array");return Xs(this,t),this}case"column":{if(!et(t))throw new TypeError("center must be an array");return Vs(this,t),this}case void 0:{if(typeof t!="number")throw new TypeError("center must be a number");return Ys(this,t),this}default:throw new Error(`invalid option: ${e}`)}}scale(e,s={}){if(typeof e=="object"&&(s=e,e=void 0),typeof s!="object")throw new TypeError("options must be an object");let t=s.scale;switch(e){case"row":{if(t===void 0)t=Gs(this);else if(!et(t))throw new TypeError("scale must be an array");return Bs(this,t),this}case"column":{if(t===void 0)t=Ks(this);else if(!et(t))throw new TypeError("scale must be an array");return $s(this,t),this}case void 0:{if(t===void 0)t=Ws(this);else if(typeof t!="number")throw new TypeError("scale must be a number");return Js(this,t),this}default:throw new Error(`invalid option: ${e}`)}}toString(e){return Le(this,e)}[Symbol.iterator](){return this.entries()}*entries(){for(let e=0;e<this.rows;e++)for(let s=0;s<this.columns;s++)yield[e,s,this.get(e,s)]}*values(){for(let e=0;e<this.rows;e++)for(let s=0;s<this.columns;s++)yield this.get(e,s)}};J.prototype.klass="Matrix";typeof Symbol<"u"&&(J.prototype[Symbol.for("nodejs.util.inspect.custom")]=js);function qe(r,e){return r-e}function Qs(r){return r.every(e=>typeof e=="number")}J.random=J.rand;J.randomInt=J.randInt;J.diagonal=J.diag;J.prototype.diagonal=J.prototype.diag;J.identity=J.eye;J.prototype.negate=J.prototype.neg;J.prototype.tensorProduct=J.prototype.kroneckerProduct;var j=class r extends J{data;#t(e,s){if(this.data=[],Number.isInteger(s)&&s>=0)for(let t=0;t<e;t++)this.data.push(new Float64Array(s));else throw new TypeError("nColumns must be a positive integer");this.rows=e,this.columns=s}constructor(e,s){if(super(),r.isMatrix(e))this.#t(e.rows,e.columns),r.copy(e,this);else if(Number.isInteger(e)&&e>=0)this.#t(e,s);else if(et(e)){let t=e;if(e=t.length,s=e?t[0].length:0,typeof s!="number")throw new TypeError("Data must be a 2D array with at least one element");this.data=[];for(let n=0;n<e;n++){if(t[n].length!==s)throw new RangeError("Inconsistent array dimensions");if(!Qs(t[n]))throw new TypeError("Input data contains non-numeric values");this.data.push(Float64Array.from(t[n]))}this.rows=e,this.columns=s}else throw new TypeError("First argument must be a positive number or an array")}set(e,s,t){return this.data[e][s]=t,this}get(e,s){return this.data[e][s]}removeRow(e){return ht(this,e),this.data.splice(e,1),this.rows-=1,this}addRow(e,s){return s===void 0&&(s=e,e=this.rows),ht(this,e,!0),s=Float64Array.from(Rt(this,s)),this.data.splice(e,0,s),this.rows+=1,this}removeColumn(e){ut(this,e);for(let s=0;s<this.rows;s++){let t=new Float64Array(this.columns-1);for(let n=0;n<e;n++)t[n]=this.data[s][n];for(let n=e+1;n<this.columns;n++)t[n-1]=this.data[s][n];this.data[s]=t}return this.columns-=1,this}addColumn(e,s){typeof s>"u"&&(s=e,e=this.columns),ut(this,e,!0),s=_t(this,s);for(let t=0;t<this.rows;t++){let n=new Float64Array(this.columns+1),o=0;for(;o<e;o++)n[o]=this.data[t][o];for(n[o++]=s[t];o<this.columns+1;o++)n[o]=this.data[t][o-1];this.data[t]=n}return this.columns+=1,this}};Ns(J,j);var yt=class r extends J{#t;get size(){return this.#t.size}get rows(){return this.#t.rows}get columns(){return this.#t.columns}get diagonalSize(){return this.rows}static isSymmetricMatrix(e){return j.isMatrix(e)&&e.klassType==="SymmetricMatrix"}static zeros(e){return new this(e)}static ones(e){return new this(e).fill(1)}constructor(e){if(super(),j.isMatrix(e)){if(!e.isSymmetric())throw new TypeError("not symmetric data");this.#t=j.copy(e,new j(e.rows,e.rows))}else if(Number.isInteger(e)&&e>=0)this.#t=new j(e,e);else if(this.#t=new j(e),!this.isSymmetric())throw new TypeError("not symmetric data")}clone(){let e=new r(this.diagonalSize);for(let[s,t,n]of this.upperRightEntries())e.set(s,t,n);return e}toMatrix(){return new j(this)}get(e,s){return this.#t.get(e,s)}set(e,s,t){return this.#t.set(e,s,t),this.#t.set(s,e,t),this}removeCross(e){return this.#t.removeRow(e),this.#t.removeColumn(e),this}addCross(e,s){s===void 0&&(s=e,e=this.diagonalSize);let t=s.slice();return t.splice(e,1),this.#t.addRow(e,t),this.#t.addColumn(e,s),this}applyMask(e){if(e.length!==this.diagonalSize)throw new RangeError("Mask size do not match with matrix size");let s=[];for(let[t,n]of e.entries())n||s.push(t);s.reverse();for(let t of s)this.removeCross(t);return this}toCompact(){let{diagonalSize:e}=this,s=new Array(e*(e+1)/2);for(let t=0,n=0,o=0;o<s.length;o++)s[o]=this.get(n,t),++t>=e&&(t=++n);return s}static fromCompact(e){let s=e.length,t=(Math.sqrt(8*s+1)-1)/2;if(!Number.isInteger(t))throw new TypeError(`This array is not a compact representation of a Symmetric Matrix, ${JSON.stringify(e)}`);let n=new r(t);for(let o=0,i=0,l=0;l<s;l++)n.set(o,i,e[l]),++o>=t&&(o=++i);return n}*upperRightEntries(){for(let e=0,s=0;e<this.diagonalSize;void 0){let t=this.get(e,s);yield[e,s,t],++s>=this.diagonalSize&&(s=++e)}}*upperRightValues(){for(let e=0,s=0;e<this.diagonalSize;void 0)yield this.get(e,s),++s>=this.diagonalSize&&(s=++e)}};yt.prototype.klassType="SymmetricMatrix";var Yt=class r extends yt{static isDistanceMatrix(e){return yt.isSymmetricMatrix(e)&&e.klassSubType==="DistanceMatrix"}constructor(e){if(super(e),!this.isDistance())throw new TypeError("Provided arguments do no produce a distance matrix")}set(e,s,t){return e===s&&(t=0),super.set(e,s,t)}addCross(e,s){return s===void 0&&(s=e,e=this.diagonalSize),s=s.slice(),s[e]=0,super.addCross(e,s)}toSymmetricMatrix(){return new yt(this)}clone(){let e=new r(this.diagonalSize);for(let[s,t,n]of this.upperRightEntries())s!==t&&e.set(s,t,n);return e}toCompact(){let{diagonalSize:e}=this,s=(e-1)*e/2,t=new Array(s);for(let n=1,o=0,i=0;i<t.length;i++)t[i]=this.get(o,n),++n>=e&&(n=++o+1);return t}static fromCompact(e){let s=e.length;if(s===0)return new this(0);let t=(Math.sqrt(8*s+1)+1)/2;if(!Number.isInteger(t))throw new TypeError(`This array is not a compact representation of a DistanceMatrix, ${JSON.stringify(e)}`);let n=new this(t);for(let o=1,i=0,l=0;l<s;l++)n.set(o,i,e[l]),++o>=t&&(o=++i+1);return n}};Yt.prototype.klassSubType="DistanceMatrix";var gt=class extends J{constructor(e,s,t){super(),this.matrix=e,this.rows=s,this.columns=t}},he=class extends gt{constructor(e,s){ut(e,s),super(e,e.rows,1),this.column=s}set(e,s,t){return this.matrix.set(e,this.column,t),this}get(e){return this.matrix.get(e,this.column)}},ue=class extends gt{constructor(e,s){ye(e,s),super(e,e.rows,s.length),this.columnIndices=s}set(e,s,t){return this.matrix.set(e,this.columnIndices[s],t),this}get(e,s){return this.matrix.get(e,this.columnIndices[s])}},fe=class extends gt{constructor(e){super(e,e.rows,e.columns)}set(e,s,t){return this.matrix.set(e,this.columns-s-1,t),this}get(e,s){return this.matrix.get(e,this.columns-s-1)}},ae=class extends gt{constructor(e){super(e,e.rows,e.columns)}set(e,s,t){return this.matrix.set(this.rows-e-1,s,t),this}get(e,s){return this.matrix.get(this.rows-e-1,s)}},ge=class extends gt{constructor(e,s){ht(e,s),super(e,1,e.columns),this.row=s}set(e,s,t){return this.matrix.set(this.row,s,t),this}get(e,s){return this.matrix.get(this.row,s)}},me=class extends gt{constructor(e,s){de(e,s),super(e,s.length,e.columns),this.rowIndices=s}set(e,s,t){return this.matrix.set(this.rowIndices[e],s,t),this}get(e,s){return this.matrix.get(this.rowIndices[e],s)}},vt=class extends gt{constructor(e,s,t){de(e,s),ye(e,t),super(e,s.length,t.length),this.rowIndices=s,this.columnIndices=t}set(e,s,t){return this.matrix.set(this.rowIndices[e],this.columnIndices[s],t),this}get(e,s){return this.matrix.get(this.rowIndices[e],this.columnIndices[s])}},pe=class extends gt{constructor(e,s,t,n,o){ce(e,s,t,n,o),super(e,t-s+1,o-n+1),this.startRow=s,this.startColumn=n}set(e,s,t){return this.matrix.set(this.startRow+e,this.startColumn+s,t),this}get(e,s){return this.matrix.get(this.startRow+e,this.startColumn+s)}},we=class extends gt{constructor(e){super(e,e.columns,e.rows)}set(e,s,t){return this.matrix.set(s,e,t),this}get(e,s){return this.matrix.get(s,e)}},Gt=class extends J{constructor(e,s={}){let{rows:t=1}=s;if(e.length%t!==0)throw new Error("the data length is not divisible by the number of rows");super(),this.rows=t,this.columns=e.length/t,this.data=e}set(e,s,t){let n=this._calculateIndex(e,s);return this.data[n]=t,this}get(e,s){let t=this._calculateIndex(e,s);return this.data[t]}_calculateIndex(e,s){return e*this.columns+s}},ot=class extends J{constructor(e){super(),this.data=e,this.rows=e.length,this.columns=e[0].length}set(e,s,t){return this.data[e][s]=t,this}get(e,s){return this.data[e][s]}};function Zs(r,e){if(et(r))return r[0]&&et(r[0])?new ot(r):new Gt(r,e);throw new Error("the argument is not an array")}var jt=class{constructor(e){e=ot.checkMatrix(e);let s=e.clone(),t=s.rows,n=s.columns,o=new Float64Array(t),i=1,l,c,h,f,u,a,w,m,y;for(l=0;l<t;l++)o[l]=l;for(m=new Float64Array(t),c=0;c<n;c++){for(l=0;l<t;l++)m[l]=s.get(l,c);for(l=0;l<t;l++){for(y=Math.min(l,c),u=0,h=0;h<y;h++)u+=s.get(l,h)*m[h];m[l]-=u,s.set(l,c,m[l])}for(f=c,l=c+1;l<t;l++)Math.abs(m[l])>Math.abs(m[f])&&(f=l);if(f!==c){for(h=0;h<n;h++)a=s.get(f,h),s.set(f,h,s.get(c,h)),s.set(c,h,a);w=o[f],o[f]=o[c],o[c]=w,i=-i}if(c<t&&s.get(c,c)!==0)for(l=c+1;l<t;l++)s.set(l,c,s.get(l,c)/s.get(c,c))}this.LU=s,this.pivotVector=o,this.pivotSign=i}isSingular(){let e=this.LU,s=e.columns;for(let t=0;t<s;t++)if(e.get(t,t)===0)return!0;return!1}solve(e){e=j.checkMatrix(e);let s=this.LU;if(s.rows!==e.rows)throw new Error("Invalid matrix dimensions");if(this.isSingular())throw new Error("LU matrix is singular");let n=e.columns,o=e.subMatrixRow(this.pivotVector,0,n-1),i=s.columns,l,c,h;for(h=0;h<i;h++)for(l=h+1;l<i;l++)for(c=0;c<n;c++)o.set(l,c,o.get(l,c)-o.get(h,c)*s.get(l,h));for(h=i-1;h>=0;h--){for(c=0;c<n;c++)o.set(h,c,o.get(h,c)/s.get(h,h));for(l=0;l<h;l++)for(c=0;c<n;c++)o.set(l,c,o.get(l,c)-o.get(h,c)*s.get(l,h))}return o}get determinant(){let e=this.LU;if(!e.isSquare())throw new Error("Matrix must be square");let s=this.pivotSign,t=e.columns;for(let n=0;n<t;n++)s*=e.get(n,n);return s}get lowerTriangularMatrix(){let e=this.LU,s=e.rows,t=e.columns,n=new j(s,t);for(let o=0;o<s;o++)for(let i=0;i<t;i++)o>i?n.set(o,i,e.get(o,i)):o===i?n.set(o,i,1):n.set(o,i,0);return n}get upperTriangularMatrix(){let e=this.LU,s=e.rows,t=e.columns,n=new j(s,t);for(let o=0;o<s;o++)for(let i=0;i<t;i++)o<=i?n.set(o,i,e.get(o,i)):n.set(o,i,0);return n}get pivotPermutationVector(){return Array.from(this.pivotVector)}};function wt(r,e){let s=0;return Math.abs(r)>Math.abs(e)?(s=e/r,Math.abs(r)*Math.sqrt(1+s*s)):e!==0?(s=r/e,Math.abs(e)*Math.sqrt(1+s*s)):0}var Nt=class{constructor(e){e=ot.checkMatrix(e);let s=e.clone(),t=e.rows,n=e.columns,o=new Float64Array(n),i,l,c,h;for(c=0;c<n;c++){let f=0;for(i=c;i<t;i++)f=wt(f,s.get(i,c));if(f!==0){for(s.get(c,c)<0&&(f=-f),i=c;i<t;i++)s.set(i,c,s.get(i,c)/f);for(s.set(c,c,s.get(c,c)+1),l=c+1;l<n;l++){for(h=0,i=c;i<t;i++)h+=s.get(i,c)*s.get(i,l);for(h=-h/s.get(c,c),i=c;i<t;i++)s.set(i,l,s.get(i,l)+h*s.get(i,c))}}o[c]=-f}this.QR=s,this.Rdiag=o}solve(e){e=j.checkMatrix(e);let s=this.QR,t=s.rows;if(e.rows!==t)throw new Error("Matrix row dimensions must agree");if(!this.isFullRank())throw new Error("Matrix is rank deficient");let n=e.columns,o=e.clone(),i=s.columns,l,c,h,f;for(h=0;h<i;h++)for(c=0;c<n;c++){for(f=0,l=h;l<t;l++)f+=s.get(l,h)*o.get(l,c);for(f=-f/s.get(h,h),l=h;l<t;l++)o.set(l,c,o.get(l,c)+f*s.get(l,h))}for(h=i-1;h>=0;h--){for(c=0;c<n;c++)o.set(h,c,o.get(h,c)/this.Rdiag[h]);for(l=0;l<h;l++)for(c=0;c<n;c++)o.set(l,c,o.get(l,c)-o.get(h,c)*s.get(l,h))}return o.subMatrix(0,i-1,0,n-1)}isFullRank(){let e=this.QR.columns;for(let s=0;s<e;s++)if(this.Rdiag[s]===0)return!1;return!0}get upperTriangularMatrix(){let e=this.QR,s=e.columns,t=new j(s,s),n,o;for(n=0;n<s;n++)for(o=0;o<s;o++)n<o?t.set(n,o,e.get(n,o)):n===o?t.set(n,o,this.Rdiag[n]):t.set(n,o,0);return t}get orthogonalMatrix(){let e=this.QR,s=e.rows,t=e.columns,n=new j(s,t),o,i,l,c;for(l=t-1;l>=0;l--){for(o=0;o<s;o++)n.set(o,l,0);for(n.set(l,l,1),i=l;i<t;i++)if(e.get(l,l)!==0){for(c=0,o=l;o<s;o++)c+=e.get(o,l)*n.get(o,i);for(c=-c/e.get(l,l),o=l;o<s;o++)n.set(o,i,n.get(o,i)+c*e.get(o,l))}}return n}},dt=class{constructor(e,s={}){if(e=ot.checkMatrix(e),e.isEmpty())throw new Error("Matrix must be non-empty");let t=e.rows,n=e.columns,{computeLeftSingularVectors:o=!0,computeRightSingularVectors:i=!0,autoTranspose:l=!1}=s,c=!!o,h=!!i,f=!1,u;if(t<n)if(!l)u=e.clone(),console.warn("Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose");else{u=e.transpose(),t=u.rows,n=u.columns,f=!0;let p=c;c=h,h=p}else u=e.clone();let a=Math.min(t,n),w=Math.min(t+1,n),m=new Float64Array(w),y=new j(t,a),d=new j(n,n),g=new Float64Array(n),b=new Float64Array(t),x=new Float64Array(w);for(let p=0;p<w;p++)x[p]=p;let M=Math.min(t-1,n),k=Math.max(0,Math.min(n-2,t)),E=Math.max(M,k);for(let p=0;p<E;p++){if(p<M){m[p]=0;for(let S=p;S<t;S++)m[p]=wt(m[p],u.get(S,p));if(m[p]!==0){u.get(p,p)<0&&(m[p]=-m[p]);for(let S=p;S<t;S++)u.set(S,p,u.get(S,p)/m[p]);u.set(p,p,u.get(p,p)+1)}m[p]=-m[p]}for(let S=p+1;S<n;S++){if(p<M&&m[p]!==0){let _=0;for(let I=p;I<t;I++)_+=u.get(I,p)*u.get(I,S);_=-_/u.get(p,p);for(let I=p;I<t;I++)u.set(I,S,u.get(I,S)+_*u.get(I,p))}g[S]=u.get(p,S)}if(c&&p<M)for(let S=p;S<t;S++)y.set(S,p,u.get(S,p));if(p<k){g[p]=0;for(let S=p+1;S<n;S++)g[p]=wt(g[p],g[S]);if(g[p]!==0){g[p+1]<0&&(g[p]=0-g[p]);for(let S=p+1;S<n;S++)g[S]/=g[p];g[p+1]+=1}if(g[p]=-g[p],p+1<t&&g[p]!==0){for(let S=p+1;S<t;S++)b[S]=0;for(let S=p+1;S<t;S++)for(let _=p+1;_<n;_++)b[S]+=g[_]*u.get(S,_);for(let S=p+1;S<n;S++){let _=-g[S]/g[p+1];for(let I=p+1;I<t;I++)u.set(I,S,u.get(I,S)+_*b[I])}}if(h)for(let S=p+1;S<n;S++)d.set(S,p,g[S])}}let R=Math.min(n,t+1);if(M<n&&(m[M]=u.get(M,M)),t<R&&(m[R-1]=0),k+1<R&&(g[k]=u.get(k,R-1)),g[R-1]=0,c){for(let p=M;p<a;p++){for(let S=0;S<t;S++)y.set(S,p,0);y.set(p,p,1)}for(let p=M-1;p>=0;p--)if(m[p]!==0){for(let S=p+1;S<a;S++){let _=0;for(let I=p;I<t;I++)_+=y.get(I,p)*y.get(I,S);_=-_/y.get(p,p);for(let I=p;I<t;I++)y.set(I,S,y.get(I,S)+_*y.get(I,p))}for(let S=p;S<t;S++)y.set(S,p,-y.get(S,p));y.set(p,p,1+y.get(p,p));for(let S=0;S<p-1;S++)y.set(S,p,0)}else{for(let S=0;S<t;S++)y.set(S,p,0);y.set(p,p,1)}}if(h)for(let p=n-1;p>=0;p--){if(p<k&&g[p]!==0)for(let S=p+1;S<n;S++){let _=0;for(let I=p+1;I<n;I++)_+=d.get(I,p)*d.get(I,S);_=-_/d.get(p+1,p);for(let I=p+1;I<n;I++)d.set(I,S,d.get(I,S)+_*d.get(I,p))}for(let S=0;S<n;S++)d.set(S,p,0);d.set(p,p,1)}let v=R-1,O=Number.EPSILON;for(;R>0;){let p,S;for(p=R-2;p>=-1&&p!==-1;p--){let _=Number.MIN_VALUE+O*Math.abs(m[p]+Math.abs(m[p+1]));if(Math.abs(g[p])<=_||Number.isNaN(g[p])){g[p]=0;break}}if(p===R-2)S=4;else{let _;for(_=R-1;_>=p&&_!==p;_--){let I=(_!==R?Math.abs(g[_]):0)+(_!==p+1?Math.abs(g[_-1]):0);if(Math.abs(m[_])<=O*I){m[_]=0;break}}_===p?S=3:_===R-1?S=1:(S=2,p=_)}switch(p++,S){case 1:{let _=g[R-2];g[R-2]=0;for(let I=R-2;I>=p;I--){let P=wt(m[I],_),T=m[I]/P,F=_/P;if(m[I]=P,I!==p&&(_=-F*g[I-1],g[I-1]=T*g[I-1]),h)for(let L=0;L<n;L++)P=T*d.get(L,I)+F*d.get(L,R-1),d.set(L,R-1,-F*d.get(L,I)+T*d.get(L,R-1)),d.set(L,I,P)}break}case 2:{let _=g[p-1];g[p-1]=0;for(let I=p;I<R;I++){let P=wt(m[I],_),T=m[I]/P,F=_/P;if(m[I]=P,_=-F*g[I],g[I]=T*g[I],c)for(let L=0;L<t;L++)P=T*y.get(L,I)+F*y.get(L,p-1),y.set(L,p-1,-F*y.get(L,I)+T*y.get(L,p-1)),y.set(L,I,P)}break}case 3:{let _=Math.max(Math.abs(m[R-1]),Math.abs(m[R-2]),Math.abs(g[R-2]),Math.abs(m[p]),Math.abs(g[p])),I=m[R-1]/_,P=m[R-2]/_,T=g[R-2]/_,F=m[p]/_,L=g[p]/_,X=((P+I)*(P-I)+T*T)/2,K=I*T*(I*T),N=0;(X!==0||K!==0)&&(X<0?N=0-Math.sqrt(X*X+K):N=Math.sqrt(X*X+K),N=K/(X+N));let D=(F+I)*(F-I)+N,C=F*L;for(let q=p;q<R-1;q++){let V=wt(D,C);V===0&&(V=Number.MIN_VALUE);let G=D/V,U=C/V;if(q!==p&&(g[q-1]=V),D=G*m[q]+U*g[q],g[q]=G*g[q]-U*m[q],C=U*m[q+1],m[q+1]=G*m[q+1],h)for(let z=0;z<n;z++)V=G*d.get(z,q)+U*d.get(z,q+1),d.set(z,q+1,-U*d.get(z,q)+G*d.get(z,q+1)),d.set(z,q,V);if(V=wt(D,C),V===0&&(V=Number.MIN_VALUE),G=D/V,U=C/V,m[q]=V,D=G*g[q]+U*m[q+1],m[q+1]=-U*g[q]+G*m[q+1],C=U*g[q+1],g[q+1]=G*g[q+1],c&&q<t-1)for(let z=0;z<t;z++)V=G*y.get(z,q)+U*y.get(z,q+1),y.set(z,q+1,-U*y.get(z,q)+G*y.get(z,q+1)),y.set(z,q,V)}g[R-2]=D;break}case 4:{if(m[p]<=0&&(m[p]=m[p]<0?-m[p]:0,h))for(let _=0;_<=v;_++)d.set(_,p,-d.get(_,p));for(;p<v&&!(m[p]>=m[p+1]);){let _=m[p];if(m[p]=m[p+1],m[p+1]=_,h&&p<n-1)for(let I=0;I<n;I++)_=d.get(I,p+1),d.set(I,p+1,d.get(I,p)),d.set(I,p,_);if(c&&p<t-1)for(let I=0;I<t;I++)_=y.get(I,p+1),y.set(I,p+1,y.get(I,p)),y.set(I,p,_);p++}R--;break}}}if(f){let p=d;d=y,y=p}this.m=t,this.n=n,this.s=m,this.U=y,this.V=d}solve(e){let s=e,t=this.threshold,n=this.s.length,o=j.zeros(n,n);for(let a=0;a<n;a++)Math.abs(this.s[a])<=t?o.set(a,a,0):o.set(a,a,1/this.s[a]);let i=this.U,l=this.rightSingularVectors,c=l.mmul(o),h=l.rows,f=i.rows,u=j.zeros(h,f);for(let a=0;a<h;a++)for(let w=0;w<f;w++){let m=0;for(let y=0;y<n;y++)m+=c.get(a,y)*i.get(w,y);u.set(a,w,m)}return u.mmul(s)}solveForDiagonal(e){return this.solve(j.diag(e))}inverse(){let e=this.V,s=this.threshold,t=e.rows,n=e.columns,o=new j(t,this.s.length);for(let f=0;f<t;f++)for(let u=0;u<n;u++)Math.abs(this.s[u])>s&&o.set(f,u,e.get(f,u)/this.s[u]);let i=this.U,l=i.rows,c=i.columns,h=new j(t,l);for(let f=0;f<t;f++)for(let u=0;u<l;u++){let a=0;for(let w=0;w<c;w++)a+=o.get(f,w)*i.get(u,w);h.set(f,u,a)}return h}get condition(){return this.s[0]/this.s[Math.min(this.m,this.n)-1]}get norm2(){return this.s[0]}get rank(){let e=Math.max(this.m,this.n)*this.s[0]*Number.EPSILON,s=0,t=this.s;for(let n=0,o=t.length;n<o;n++)t[n]>e&&s++;return s}get diagonal(){return Array.from(this.s)}get threshold(){return Number.EPSILON/2*Math.max(this.m,this.n)*this.s[0]}get leftSingularVectors(){return this.U}get rightSingularVectors(){return this.V}get diagonalMatrix(){return j.diag(this.s)}};function Hs(r,e=!1){return r=ot.checkMatrix(r),e?new dt(r).inverse():Ue(r,j.eye(r.rows))}function Ue(r,e,s=!1){return r=ot.checkMatrix(r),e=ot.checkMatrix(e),s?new dt(r).solve(e):r.isSquare()?new jt(r).solve(e):new Nt(r).solve(e)}function Vt(r){if(r=j.checkMatrix(r),r.isSquare()){if(r.columns===0)return 1;let e,s,t,n;if(r.columns===2)return e=r.get(0,0),s=r.get(0,1),t=r.get(1,0),n=r.get(1,1),e*n-s*t;if(r.columns===3){let o,i,l;return o=new vt(r,[1,2],[1,2]),i=new vt(r,[1,2],[0,2]),l=new vt(r,[1,2],[0,1]),e=r.get(0,0),s=r.get(0,1),t=r.get(0,2),e*Vt(o)-s*Vt(i)+t*Vt(l)}else return new jt(r).determinant}else throw Error("determinant can only be calculated for a square matrix")}function tn(r,e){let s=[];for(let t=0;t<r;t++)t!==e&&s.push(t);return s}function en(r,e,s,t=1e-9,n=1e-9){if(r>n)return new Array(e.rows+1).fill(0);{let o=e.addRow(s,[0]);for(let i=0;i<o.rows;i++)Math.abs(o.get(i,0))<t&&o.set(i,0,0);return o.to1DArray()}}function sn(r,e={}){let{thresholdValue:s=1e-9,thresholdError:t=1e-9}=e;r=j.checkMatrix(r);let n=r.rows,o=new j(n,n);for(let i=0;i<n;i++){let l=j.columnVector(r.getRow(i)),c=r.subMatrixRow(tn(n,i)).transpose(),f=new dt(c).solve(l),u=j.sub(l,c.mmul(f)).abs().max();o.setRow(i,en(u,f,i,s,t))}return o}function nn(r,e=Number.EPSILON){if(r=j.checkMatrix(r),r.isEmpty())return r.transpose();let s=new dt(r,{autoTranspose:!0}),t=s.leftSingularVectors,n=s.rightSingularVectors,o=s.diagonal;for(let i=0;i<o.length;i++)Math.abs(o[i])>e?o[i]=1/o[i]:o[i]=0;return n.mmul(j.diag(o).mmul(t.transpose()))}function on(r,e=r,s={}){r=new j(r);let t=!1;if(typeof e=="object"&&!j.isMatrix(e)&&!et(e)?(s=e,e=r,t=!0):e=new j(e),r.rows!==e.rows)throw new TypeError("Both matrices must have the same number of rows");let{center:n=!0}=s;n&&(r=r.center("column"),t||(e=e.center("column")));let o=r.transpose().mmul(e);for(let i=0;i<o.rows;i++)for(let l=0;l<o.columns;l++)o.set(i,l,o.get(i,l)*(1/(r.rows-1)));return o}function rn(r,e=r,s={}){r=new j(r);let t=!1;if(typeof e=="object"&&!j.isMatrix(e)&&!et(e)?(s=e,e=r,t=!0):e=new j(e),r.rows!==e.rows)throw new TypeError("Both matrices must have the same number of rows");let{center:n=!0,scale:o=!0}=s;n&&(r.center("column"),t||e.center("column")),o&&(r.scale("column"),t||e.scale("column"));let i=r.standardDeviation("column",{unbiased:!0}),l=t?i:e.standardDeviation("column",{unbiased:!0}),c=r.transpose().mmul(e);for(let h=0;h<c.rows;h++)for(let f=0;f<c.columns;f++)c.set(h,f,c.get(h,f)*(1/(i[h]*l[f]))*(1/(r.rows-1)));return c}var Bt=class{constructor(e,s={}){let{assumeSymmetric:t=!1}=s;if(e=ot.checkMatrix(e),!e.isSquare())throw new Error("Matrix is not a square matrix");if(e.isEmpty())throw new Error("Matrix must be non-empty");let n=e.columns,o=new j(n,n),i=new Float64Array(n),l=new Float64Array(n),c=e,h,f,u=!1;if(t?u=!0:u=e.isSymmetric(),u){for(h=0;h<n;h++)for(f=0;f<n;f++)o.set(h,f,c.get(h,f));ln(n,l,i,o),cn(n,l,i,o)}else{let a=new j(n,n),w=new Float64Array(n);for(f=0;f<n;f++)for(h=0;h<n;h++)a.set(h,f,c.get(h,f));hn(n,a,w,o),un(n,l,i,o,a)}this.n=n,this.e=l,this.d=i,this.V=o}get realEigenvalues(){return Array.from(this.d)}get imaginaryEigenvalues(){return Array.from(this.e)}get eigenvectorMatrix(){return this.V}get diagonalMatrix(){let e=this.n,s=this.e,t=this.d,n=new j(e,e),o,i;for(o=0;o<e;o++){for(i=0;i<e;i++)n.set(o,i,0);n.set(o,o,t[o]),s[o]>0?n.set(o,o+1,s[o]):s[o]<0&&n.set(o,o-1,s[o])}return n}};function ln(r,e,s,t){let n,o,i,l,c,h,f,u;for(c=0;c<r;c++)s[c]=t.get(r-1,c);for(l=r-1;l>0;l--){for(u=0,i=0,h=0;h<l;h++)u=u+Math.abs(s[h]);if(u===0)for(e[l]=s[l-1],c=0;c<l;c++)s[c]=t.get(l-1,c),t.set(l,c,0),t.set(c,l,0);else{for(h=0;h<l;h++)s[h]/=u,i+=s[h]*s[h];for(n=s[l-1],o=Math.sqrt(i),n>0&&(o=-o),e[l]=u*o,i=i-n*o,s[l-1]=n-o,c=0;c<l;c++)e[c]=0;for(c=0;c<l;c++){for(n=s[c],t.set(c,l,n),o=e[c]+t.get(c,c)*n,h=c+1;h<=l-1;h++)o+=t.get(h,c)*s[h],e[h]+=t.get(h,c)*n;e[c]=o}for(n=0,c=0;c<l;c++)e[c]/=i,n+=e[c]*s[c];for(f=n/(i+i),c=0;c<l;c++)e[c]-=f*s[c];for(c=0;c<l;c++){for(n=s[c],o=e[c],h=c;h<=l-1;h++)t.set(h,c,t.get(h,c)-(n*e[h]+o*s[h]));s[c]=t.get(l-1,c),t.set(l,c,0)}}s[l]=i}for(l=0;l<r-1;l++){if(t.set(r-1,l,t.get(l,l)),t.set(l,l,1),i=s[l+1],i!==0){for(h=0;h<=l;h++)s[h]=t.get(h,l+1)/i;for(c=0;c<=l;c++){for(o=0,h=0;h<=l;h++)o+=t.get(h,l+1)*t.get(h,c);for(h=0;h<=l;h++)t.set(h,c,t.get(h,c)-o*s[h])}}for(h=0;h<=l;h++)t.set(h,l+1,0)}for(c=0;c<r;c++)s[c]=t.get(r-1,c),t.set(r-1,c,0);t.set(r-1,r-1,1),e[0]=0}function cn(r,e,s,t){let n,o,i,l,c,h,f,u,a,w,m,y,d,g,b,x;for(i=1;i<r;i++)e[i-1]=e[i];e[r-1]=0;let M=0,k=0,E=Number.EPSILON;for(h=0;h<r;h++){for(k=Math.max(k,Math.abs(s[h])+Math.abs(e[h])),f=h;f<r&&!(Math.abs(e[f])<=E*k);)f++;if(f>h)do{for(n=s[h],u=(s[h+1]-n)/(2*e[h]),a=wt(u,1),u<0&&(a=-a),s[h]=e[h]/(u+a),s[h+1]=e[h]*(u+a),w=s[h+1],o=n-s[h],i=h+2;i<r;i++)s[i]-=o;for(M=M+o,u=s[f],m=1,y=m,d=m,g=e[h+1],b=0,x=0,i=f-1;i>=h;i--)for(d=y,y=m,x=b,n=m*e[i],o=m*u,a=wt(u,e[i]),e[i+1]=b*a,b=e[i]/a,m=u/a,u=m*s[i]-b*n,s[i+1]=o+b*(m*n+b*s[i]),c=0;c<r;c++)o=t.get(c,i+1),t.set(c,i+1,b*t.get(c,i)+m*o),t.set(c,i,m*t.get(c,i)-b*o);u=-b*x*d*g*e[h]/w,e[h]=b*u,s[h]=m*u}while(Math.abs(e[h])>E*k);s[h]=s[h]+M,e[h]=0}for(i=0;i<r-1;i++){for(c=i,u=s[i],l=i+1;l<r;l++)s[l]<u&&(c=l,u=s[l]);if(c!==i)for(s[c]=s[i],s[i]=u,l=0;l<r;l++)u=t.get(l,i),t.set(l,i,t.get(l,c)),t.set(l,c,u)}}function hn(r,e,s,t){let n=0,o=r-1,i,l,c,h,f,u,a;for(u=n+1;u<=o-1;u++){for(a=0,h=u;h<=o;h++)a=a+Math.abs(e.get(h,u-1));if(a!==0){for(c=0,h=o;h>=u;h--)s[h]=e.get(h,u-1)/a,c+=s[h]*s[h];for(l=Math.sqrt(c),s[u]>0&&(l=-l),c=c-s[u]*l,s[u]=s[u]-l,f=u;f<r;f++){for(i=0,h=o;h>=u;h--)i+=s[h]*e.get(h,f);for(i=i/c,h=u;h<=o;h++)e.set(h,f,e.get(h,f)-i*s[h])}for(h=0;h<=o;h++){for(i=0,f=o;f>=u;f--)i+=s[f]*e.get(h,f);for(i=i/c,f=u;f<=o;f++)e.set(h,f,e.get(h,f)-i*s[f])}s[u]=a*s[u],e.set(u,u-1,a*l)}}for(h=0;h<r;h++)for(f=0;f<r;f++)t.set(h,f,h===f?1:0);for(u=o-1;u>=n+1;u--)if(e.get(u,u-1)!==0){for(h=u+1;h<=o;h++)s[h]=e.get(h,u-1);for(f=u;f<=o;f++){for(l=0,h=u;h<=o;h++)l+=s[h]*t.get(h,f);for(l=l/s[u]/e.get(u,u-1),h=u;h<=o;h++)t.set(h,f,t.get(h,f)+l*s[h])}}}function un(r,e,s,t,n){let o=r-1,i=0,l=r-1,c=Number.EPSILON,h=0,f=0,u=0,a=0,w=0,m=0,y=0,d=0,g,b,x,M,k,E,R,v,O,p,S,_,I,P,T;for(g=0;g<r;g++)for((g<i||g>l)&&(s[g]=n.get(g,g),e[g]=0),b=Math.max(g-1,0);b<r;b++)f=f+Math.abs(n.get(g,b));for(;o>=i;){for(M=o;M>i&&(m=Math.abs(n.get(M-1,M-1))+Math.abs(n.get(M,M)),m===0&&(m=f),!(Math.abs(n.get(M,M-1))<c*m));)M--;if(M===o)n.set(o,o,n.get(o,o)+h),s[o]=n.get(o,o),e[o]=0,o--,d=0;else if(M===o-1){if(R=n.get(o,o-1)*n.get(o-1,o),u=(n.get(o-1,o-1)-n.get(o,o))/2,a=u*u+R,y=Math.sqrt(Math.abs(a)),n.set(o,o,n.get(o,o)+h),n.set(o-1,o-1,n.get(o-1,o-1)+h),v=n.get(o,o),a>=0){for(y=u>=0?u+y:u-y,s[o-1]=v+y,s[o]=s[o-1],y!==0&&(s[o]=v-R/y),e[o-1]=0,e[o]=0,v=n.get(o,o-1),m=Math.abs(v)+Math.abs(y),u=v/m,a=y/m,w=Math.sqrt(u*u+a*a),u=u/w,a=a/w,b=o-1;b<r;b++)y=n.get(o-1,b),n.set(o-1,b,a*y+u*n.get(o,b)),n.set(o,b,a*n.get(o,b)-u*y);for(g=0;g<=o;g++)y=n.get(g,o-1),n.set(g,o-1,a*y+u*n.get(g,o)),n.set(g,o,a*n.get(g,o)-u*y);for(g=i;g<=l;g++)y=t.get(g,o-1),t.set(g,o-1,a*y+u*t.get(g,o)),t.set(g,o,a*t.get(g,o)-u*y)}else s[o-1]=v+u,s[o]=v+u,e[o-1]=y,e[o]=-y;o=o-2,d=0}else{if(v=n.get(o,o),O=0,R=0,M<o&&(O=n.get(o-1,o-1),R=n.get(o,o-1)*n.get(o-1,o)),d===10){for(h+=v,g=i;g<=o;g++)n.set(g,g,n.get(g,g)-v);m=Math.abs(n.get(o,o-1))+Math.abs(n.get(o-1,o-2)),v=O=.75*m,R=-.4375*m*m}if(d===30&&(m=(O-v)/2,m=m*m+R,m>0)){for(m=Math.sqrt(m),O<v&&(m=-m),m=v-R/((O-v)/2+m),g=i;g<=o;g++)n.set(g,g,n.get(g,g)-m);h+=m,v=O=R=.964}for(d=d+1,k=o-2;k>=M&&(y=n.get(k,k),w=v-y,m=O-y,u=(w*m-R)/n.get(k+1,k)+n.get(k,k+1),a=n.get(k+1,k+1)-y-w-m,w=n.get(k+2,k+1),m=Math.abs(u)+Math.abs(a)+Math.abs(w),u=u/m,a=a/m,w=w/m,!(k===M||Math.abs(n.get(k,k-1))*(Math.abs(a)+Math.abs(w))<c*(Math.abs(u)*(Math.abs(n.get(k-1,k-1))+Math.abs(y)+Math.abs(n.get(k+1,k+1))))));)k--;for(g=k+2;g<=o;g++)n.set(g,g-2,0),g>k+2&&n.set(g,g-3,0);for(x=k;x<=o-1&&(P=x!==o-1,x!==k&&(u=n.get(x,x-1),a=n.get(x+1,x-1),w=P?n.get(x+2,x-1):0,v=Math.abs(u)+Math.abs(a)+Math.abs(w),v!==0&&(u=u/v,a=a/v,w=w/v)),v!==0);x++)if(m=Math.sqrt(u*u+a*a+w*w),u<0&&(m=-m),m!==0){for(x!==k?n.set(x,x-1,-m*v):M!==k&&n.set(x,x-1,-n.get(x,x-1)),u=u+m,v=u/m,O=a/m,y=w/m,a=a/u,w=w/u,b=x;b<r;b++)u=n.get(x,b)+a*n.get(x+1,b),P&&(u=u+w*n.get(x+2,b),n.set(x+2,b,n.get(x+2,b)-u*y)),n.set(x,b,n.get(x,b)-u*v),n.set(x+1,b,n.get(x+1,b)-u*O);for(g=0;g<=Math.min(o,x+3);g++)u=v*n.get(g,x)+O*n.get(g,x+1),P&&(u=u+y*n.get(g,x+2),n.set(g,x+2,n.get(g,x+2)-u*w)),n.set(g,x,n.get(g,x)-u),n.set(g,x+1,n.get(g,x+1)-u*a);for(g=i;g<=l;g++)u=v*t.get(g,x)+O*t.get(g,x+1),P&&(u=u+y*t.get(g,x+2),t.set(g,x+2,t.get(g,x+2)-u*w)),t.set(g,x,t.get(g,x)-u),t.set(g,x+1,t.get(g,x+1)-u*a)}}}if(f!==0){for(o=r-1;o>=0;o--)if(u=s[o],a=e[o],a===0)for(M=o,n.set(o,o,1),g=o-1;g>=0;g--){for(R=n.get(g,g)-u,w=0,b=M;b<=o;b++)w=w+n.get(g,b)*n.get(b,o);if(e[g]<0)y=R,m=w;else if(M=g,e[g]===0?n.set(g,o,R!==0?-w/R:-w/(c*f)):(v=n.get(g,g+1),O=n.get(g+1,g),a=(s[g]-u)*(s[g]-u)+e[g]*e[g],E=(v*m-y*w)/a,n.set(g,o,E),n.set(g+1,o,Math.abs(v)>Math.abs(y)?(-w-R*E)/v:(-m-O*E)/y)),E=Math.abs(n.get(g,o)),c*E*E>1)for(b=g;b<=o;b++)n.set(b,o,n.get(b,o)/E)}else if(a<0)for(M=o-1,Math.abs(n.get(o,o-1))>Math.abs(n.get(o-1,o))?(n.set(o-1,o-1,a/n.get(o,o-1)),n.set(o-1,o,-(n.get(o,o)-u)/n.get(o,o-1))):(T=Xt(0,-n.get(o-1,o),n.get(o-1,o-1)-u,a),n.set(o-1,o-1,T[0]),n.set(o-1,o,T[1])),n.set(o,o-1,0),n.set(o,o,1),g=o-2;g>=0;g--){for(p=0,S=0,b=M;b<=o;b++)p=p+n.get(g,b)*n.get(b,o-1),S=S+n.get(g,b)*n.get(b,o);if(R=n.get(g,g)-u,e[g]<0)y=R,w=p,m=S;else if(M=g,e[g]===0?(T=Xt(-p,-S,R,a),n.set(g,o-1,T[0]),n.set(g,o,T[1])):(v=n.get(g,g+1),O=n.get(g+1,g),_=(s[g]-u)*(s[g]-u)+e[g]*e[g]-a*a,I=(s[g]-u)*2*a,_===0&&I===0&&(_=c*f*(Math.abs(R)+Math.abs(a)+Math.abs(v)+Math.abs(O)+Math.abs(y))),T=Xt(v*w-y*p+a*S,v*m-y*S-a*p,_,I),n.set(g,o-1,T[0]),n.set(g,o,T[1]),Math.abs(v)>Math.abs(y)+Math.abs(a)?(n.set(g+1,o-1,(-p-R*n.get(g,o-1)+a*n.get(g,o))/v),n.set(g+1,o,(-S-R*n.get(g,o)-a*n.get(g,o-1))/v)):(T=Xt(-w-O*n.get(g,o-1),-m-O*n.get(g,o),y,a),n.set(g+1,o-1,T[0]),n.set(g+1,o,T[1]))),E=Math.max(Math.abs(n.get(g,o-1)),Math.abs(n.get(g,o))),c*E*E>1)for(b=g;b<=o;b++)n.set(b,o-1,n.get(b,o-1)/E),n.set(b,o,n.get(b,o)/E)}for(g=0;g<r;g++)if(g<i||g>l)for(b=g;b<r;b++)t.set(g,b,n.get(g,b));for(b=r-1;b>=i;b--)for(g=i;g<=l;g++){for(y=0,x=i;x<=Math.min(b,l);x++)y=y+t.get(g,x)*n.get(x,b);t.set(g,b,y)}}}function Xt(r,e,s,t){let n,o;return Math.abs(s)>Math.abs(t)?(n=t/s,o=s+n*t,[(r+n*e)/o,(e-n*r)/o]):(n=s/t,o=t+n*s,[(n*r+e)/o,(n*e-r)/o])}var Kt=class{constructor(e){if(e=ot.checkMatrix(e),!e.isSymmetric())throw new Error("Matrix is not symmetric");let s=e,t=s.rows,n=new j(t,t),o=!0,i,l,c;for(l=0;l<t;l++){let h=0;for(c=0;c<l;c++){let f=0;for(i=0;i<c;i++)f+=n.get(c,i)*n.get(l,i);f=(s.get(l,c)-f)/n.get(c,c),n.set(l,c,f),h=h+f*f}for(h=s.get(l,l)-h,o&&=h>0,n.set(l,l,Math.sqrt(Math.max(h,0))),c=l+1;c<t;c++)n.set(l,c,0)}this.L=n,this.positiveDefinite=o}isPositiveDefinite(){return this.positiveDefinite}solve(e){e=ot.checkMatrix(e);let s=this.L,t=s.rows;if(e.rows!==t)throw new Error("Matrix dimensions do not match");if(this.isPositiveDefinite()===!1)throw new Error("Matrix is not positive definite");let n=e.columns,o=e.clone(),i,l,c;for(c=0;c<t;c++)for(l=0;l<n;l++){for(i=0;i<c;i++)o.set(c,l,o.get(c,l)-o.get(i,l)*s.get(c,i));o.set(c,l,o.get(c,l)/s.get(c,c))}for(c=t-1;c>=0;c--)for(l=0;l<n;l++){for(i=c+1;i<t;i++)o.set(c,l,o.get(c,l)-o.get(i,l)*s.get(i,c));o.set(c,l,o.get(c,l)/s.get(c,c))}return o}get lowerTriangularMatrix(){return this.L}},$t=class{constructor(e,s={}){e=ot.checkMatrix(e);let{Y:t}=s,{scaleScores:n=!1,maxIterations:o=1e3,terminationCriteria:i=1e-10}=s,l;if(t){if(et(t)&&typeof t[0]=="number"?t=j.columnVector(t):t=ot.checkMatrix(t),t.rows!==e.rows)throw new Error("Y should have the same number of rows as X");l=t.getColumnVector(0)}else l=e.getColumnVector(0);let c=1,h,f,u,a;for(let w=0;w<o&&c>i;w++)u=e.transpose().mmul(l).div(l.transpose().mmul(l).get(0,0)),u=u.div(u.norm()),h=e.mmul(u).div(u.transpose().mmul(u).get(0,0)),w>0&&(c=h.clone().sub(a).pow(2).sum()),a=h.clone(),t?(f=t.transpose().mmul(h).div(h.transpose().mmul(h).get(0,0)),f=f.div(f.norm()),l=t.mmul(f).div(f.transpose().mmul(f).get(0,0))):l=h;if(t){let w=e.transpose().mmul(h).div(h.transpose().mmul(h).get(0,0));w=w.div(w.norm());let m=e.clone().sub(h.clone().mmul(w.transpose())),y=l.transpose().mmul(h).div(h.transpose().mmul(h).get(0,0)),d=t.clone().sub(h.clone().mulS(y.get(0,0)).mmul(f.transpose()));this.t=h,this.p=w.transpose(),this.w=u.transpose(),this.q=f,this.u=l,this.s=h.transpose().mmul(h),this.xResidual=m,this.yResidual=d,this.betas=y}else this.w=u.transpose(),this.s=h.transpose().mmul(h).sqrt(),n?this.t=h.clone().div(this.s.get(0,0)):this.t=h,this.xResidual=e.sub(h.mmul(u.transpose()))}};Y.AbstractMatrix=J;Y.CHO=Kt;Y.CholeskyDecomposition=Kt;Y.DistanceMatrix=Yt;Y.EVD=Bt;Y.EigenvalueDecomposition=Bt;Y.LU=jt;Y.LuDecomposition=jt;Y.Matrix=j;Y.MatrixColumnSelectionView=ue;Y.MatrixColumnView=he;Y.MatrixFlipColumnView=fe;Y.MatrixFlipRowView=ae;Y.MatrixRowSelectionView=me;Y.MatrixRowView=ge;Y.MatrixSelectionView=vt;Y.MatrixSubView=pe;Y.MatrixTransposeView=we;Y.NIPALS=$t;Y.Nipals=$t;Y.QR=Nt;Y.QrDecomposition=Nt;Y.SVD=dt;Y.SingularValueDecomposition=dt;Y.SymmetricMatrix=yt;Y.WrapperMatrix1D=Gt;Y.WrapperMatrix2D=ot;Y.correlation=rn;Y.covariance=on;Y.default=j;Y.determinant=Vt;Y.inverse=Hs;Y.linearDependencies=sn;Y.pseudoInverse=nn;Y.solve=Ue;Y.wrap=Zs});var Tt=class{constructor(e=[],s=Es){if(this.data=e,this.length=this.data.length,this.compare=s,this.length>0)for(let t=(this.length>>1)-1;t>=0;t--)this._down(t)}push(e){this.data.push(e),this.length++,this._up(this.length-1)}pop(){if(this.length===0)return;let e=this.data[0],s=this.data.pop();return this.length--,this.length>0&&(this.data[0]=s,this._down(0)),e}peek(){return this.data[0]}_up(e){let{data:s,compare:t}=this,n=s[e];for(;e>0;){let o=e-1>>1,i=s[o];if(t(n,i)>=0)break;s[e]=i,e=o}s[e]=n}_down(e){let{data:s,compare:t}=this,n=this.length>>1,o=s[e];for(;e<n;){let i=(e<<1)+1,l=s[i],c=i+1;if(c<this.length&&t(s[c],l)<0&&(i=c,l=s[c]),t(l,o)>=0)break;s[e]=l,e=i}s[e]=o}};function Es(r,e){return r<e?-1:r>e?1:0}var _e=new Uint8Array(256);for(let r=0;r<256;r++){let e=0,s=r;for(;s>0;)s&=s-1,e++;_e[r]=e}function It(r){return r=r>>>0,r-=r>>>1&1431655765,r=(r&858993459)+(r>>>2&858993459),(r+(r>>>4)&252645135)*16843009>>>24}var ve=(r,e,s,t)=>{let n=(r[e]^s[t])>>>0,o=(r[e+1]^s[t+1])>>>0;n-=n>>>1&1431655765,n=(n&858993459)+(n>>>2&858993459);let i=(n+(n>>>4)&252645135)*16843009>>>24;o-=o>>>1&1431655765,o=(o&858993459)+(o>>>2&858993459);let l=(o+(o>>>4)&252645135)*16843009>>>24;return i+l},Ct=r=>{let{v1:e,v2:s,v1Offset:t=0,v2Offset:n=0}=r,o=s.length-n;if(o===2)return ve(e,t,s,n);if(o===84){let i=0;for(let l=0;l<84;l++)i+=_e[e[t+l]^s[n+l]];return i}return o===4?It(e[t]^s[n])+It(e[t+1]^s[n+1])+It(e[t+2]^s[n+2])+It(e[t+3]^s[n+3]):It(e[t]^s[n])+It(e[t+1]^s[n+1])};var ie=r=>{let{keywidth:e,keyheight:s,querywidth:t,queryheight:n,matches:o}=r,i=t*1.2,l=-i,c=n*1.2,h=-c,f=12,u=12,a=-2,w=1,y=1/Math.log(10),d=Math.max(e,s),g=Math.floor(e/2),b=Math.floor(s/2),x=[];for(let D=0;D<o.length;D++){let C=o[D].querypoint.scale,q=o[D].keypoint.scale;if(q==0){console.log("ERROR divide zero");continue}let V=C/q;x.push(V*d)}x.sort((D,C)=>D-C);let M=x[Math.floor((x.length-1)/2)],k=Math.max(20,.25*M),E=Math.max(5,Math.min(40,Math.ceil((i-l)/k))),R=Math.max(5,Math.min(40,Math.ceil((c-h)/k))),v=E*R,O=v*f,p=[],S=[],_={};for(let D=0;D<o.length;D++){let C=o[D].querypoint,q=o[D].keypoint,{x:V,y:G,scale:U,angle:z}=Is({querypoint:C,keypoint:q,keycenterX:g,keycenterY:b,scaleOneOverLogK:y});if(V<l||V>=i||G<h||G>=c||z<=-Math.PI||z>Math.PI||U<a||U>=w){p[D]=!1;continue}let W=E*(V-l)/(i-l),$=R*(G-h)/(c-h),Q=f*(z+Math.PI)/(2*Math.PI),B=u*(U-a)/(w-a);S[D]={binX:W,binY:$,binAngle:Q,binScale:B};let st=Math.floor(W-.5),tt=Math.floor($-.5),Z=Math.floor(B-.5),nt=(Math.floor(Q-.5)+f)%f;if(st<0||st+1>=E||tt<0||tt+1>=R||Z<0||Z+1>=u){p[D]=!1;continue}for(let lt=0;lt<2;lt++){let ct=st+lt;for(let St=0;St<2;St++){let qt=tt+St;for(let Et=0;Et<2;Et++){let ke=(nt+Et)%f;for(let at=0;at<2;at++){let ms=Z+at,re=ct+qt*E+ke*v+ms*O;_[re]===void 0&&(_[re]=0),_[re]+=1}}}}p[D]=!0}let I=0,P=-1;if(Object.keys(_).forEach(D=>{_[D]>I&&(I=_[D],P=D)}),I<3)return[];let T=Math.floor(P%O%v%E),F=Math.floor((P-T)%O%v/E),L=Math.floor((P-T-F*E)%O/v),X=Math.floor((P-T-F*E-L*v)/O),K=[],N=2;for(let D=0;D<o.length;D++){if(!p[D])continue;let C=S[D];if(Math.abs(C.binX-(T+.5))>=N||Math.abs(C.binY-(F+.5))>=N||Math.abs(C.binScale-(X+.5))>=N)continue;let U=Math.abs(C.binAngle-(L+.5));Math.min(U,f-U)>=N||K.push(o[D])}return K},Is=({querypoint:r,keypoint:e,keycenterX:s,keycenterY:t,scaleOneOverLogK:n})=>{let o=r.angle-e.angle;o<=-Math.PI?o+=2*Math.PI:o>Math.PI&&(o-=2*Math.PI);let i=r.scale/e.scale,l=i*Math.cos(o),c=i*Math.sin(o),h=[l,-c,c,l],f=[h[0]*e.x+h[1]*e.y,h[2]*e.x+h[3]*e.y],u=r.x-f[0],a=r.y-f[1];return{x:h[0]*s+h[1]*t+u,y:h[2]*s+h[3]*t+a,angle:o,scale:Math.log(i)*n}};var le=()=>({seed:1234,arrayShuffle(e){let{arr:s,sampleSize:t}=e;for(let n=0;n<t;n++){this.seed=(214013*this.seed+2531011)%-2147483648;let o=this.seed>>16&32767;o=o%s.length;let i=s[n];s[n]=s[o],s[o]=i}},nextInt(e){this.seed=(214013*this.seed+2531011)%-2147483648;let s=this.seed>>16&32767;return s=s%e,s}});var it=(r,e,s)=>(e[0]-r[0])*(s[1]-r[1])-(e[1]-r[1])*(s[0]-r[0]),je=(r,e,s,t,n,o,i,l)=>!(it(r,e,s)>0!=it(n,o,i)>0||it(e,s,t)>0!=it(o,i,l)>0||it(s,t,r)>0!=it(i,l,n)>0||it(t,r,e)>0!=it(l,n,o)>0),Te=(r,e,s,t,n,o)=>it(r,e,s)>0==it(t,n,o)>0,ks=r=>{let e=r[4]*r[8]-r[5]*r[7],s=r[3]*r[8]-r[5]*r[6],t=r[3]*r[7]-r[4]*r[6];return r[0]*e-r[1]*s+r[2]*t},Fe=(r,e)=>{let s=ks(r);if(Math.abs(s)<=e)return null;let t=1/s;return[(r[4]*r[8]-r[5]*r[7])*t,(r[2]*r[7]-r[1]*r[8])*t,(r[1]*r[5]-r[2]*r[4])*t,(r[5]*r[6]-r[3]*r[8])*t,(r[0]*r[8]-r[2]*r[6])*t,(r[2]*r[3]-r[0]*r[5])*t,(r[3]*r[7]-r[4]*r[6])*t,(r[1]*r[6]-r[0]*r[7])*t,(r[0]*r[4]-r[1]*r[3])*t]};var Ut=(r,e)=>{let s=e[6]*r[0]+e[7]*r[1]+e[8],t=[];return t[0]=(e[0]*r[0]+e[1]*r[1]+e[2])/s,t[1]=(e[3]*r[0]+e[4]*r[1]+e[5])/s,t},Ne=(r,e,s,t)=>{let n=Ft(e,r),o=Ft(s,r),i=Ft(t,r),l=Ft(e,s),c=Ft(t,s),h=Lt(n,o),f=Lt(o,i),u=Lt(n,i),a=Lt(l,c);return Math.min(Math.min(Math.min(h,f),u),a)},De=(r,e,s,t)=>{let n=it(r,e,s)<=0;return!(it(e,s,t)<=0!==n||it(s,t,r)<=0!==n||it(t,r,e)<=0!==n)},Ft=(r,e)=>[r[0]-e[0],r[1]-e[1]],Lt=(r,e)=>{let s=r[0]*e[1]-r[1]*e[0];return Math.abs(s)*.5};var A=Ss(ze(),1);var ft=A.Matrix;var Dt=A.SingularValueDecomposition;var Jn=A.default.Matrix?A.default.Matrix:A.Matrix;var Jt=A.inverse;var Xe=(r,e)=>{let{normPoints:s,param:t}=Ae(r),{normPoints:n,param:o}=Ae(e),i=n.length,l=[],c=[];for(let h=0;h<i;h++){let f=[s[h][0],s[h][1],1,0,0,0,-(s[h][0]*n[h][0]),-(s[h][1]*n[h][0])],u=[0,0,0,s[h][0],s[h][1],1,-(s[h][0]*n[h][1]),-(s[h][1]*n[h][1])];l.push(f),l.push(u),c.push([n[h][0]]),c.push([n[h][1]])}try{let h=new ft(l),f=new ft(c),u=h.transpose(),a=u.mmul(h),w=u.mmul(f),y=Jt(a).mmul(w).to1DArray();return fn(y,t,o)}catch{return null}},Ae=r=>{let e=0,s=0;for(let c=0;c<r.length;c++)e+=r[c][0],s+=r[c][1];let t=e/r.length,n=s/r.length,o=0;for(let c=0;c<r.length;c++){let h=r[c][0]-t,f=r[c][1]-n;o+=Math.sqrt(h*h+f*f)}let i=Math.sqrt(2)*r.length/o,l=[];for(let c=0;c<r.length;c++)l.push([(r[c][0]-t)*i,(r[c][1]-n)*i]);return{normPoints:l,param:{meanX:t,meanY:n,s:i}}},fn=(r,e,s)=>{let t=s.s*s.meanX,n=s.s*s.meanY,o=[r[0]+t*r[6],r[1]+t*r[7],(r[0]+t*r[6])*-e.meanX+(r[1]+t*r[7])*-e.meanY+(r[2]+t)/e.s,r[3]+n*r[6],r[4]+n*r[7],(r[3]+n*r[6])*-e.meanX+(r[4]+n*r[7])*-e.meanY+(r[5]+n)/e.s,s.s*r[6],s.s*r[7],s.s*r[6]*-e.meanX+s.s*r[7]*-e.meanY+s.s/e.s];for(let i=0;i<9;i++)o[i]=o[i]/o[8];return o};var an=.01,gn=10,mn=100,pn=50,Me=r=>{let{srcPoints:e,dstPoints:s,keyframe:t,quickMode:n}=r,o=[[0,0],[t.width,0],[t.width,t.height],[0,t.height]],i=4;if(e.length<i)return null;let l=an,c=1/(l*l),h=Math.min(gn,e.length),f=le(),u=[];for(let x=0;x<e.length;x++)u[x]=x;f.arrayShuffle({arr:u,sampleSize:u.length});let a=n?pn:mn,w=a*2,m=0,y=[];for(;m<w&&y.length<a;){if(m+=1,f.arrayShuffle({arr:u,sampleSize:i}),!je(e[u[0]],e[u[1]],e[u[2]],e[u[3]],s[u[0]],s[u[1]],s[u[2]],s[u[3]]))continue;let x=Xe([e[u[0]],e[u[1]],e[u[2]],e[u[3]]],[s[u[0]],s[u[1]],s[u[2]],s[u[3]]]);x!==null&&Mn({H:x,testPoints:o})&&y.push(x)}if(y.length===0)return null;let d=[];for(let x=0;x<y.length;x++)d.push({H:y[x],cost:0});let g=h;for(let x=0;x<e.length&&d.length>2;x+=g){g=Math.min(h,e.length-x);let M=x+g;for(let k=0;k<d.length;k++)for(let E=x;E<M;E++){let R=yn({H:d[k].H,srcPoint:e[E],dstPoint:s[E],oneOverScale2:c});d[k].cost+=R}d.sort((k,E)=>k.cost-E.cost),d.splice(-Math.floor((d.length+1)/2))}let b=null;for(let x=0;x<d.length;x++){let M=dn({inH:d[x].H});if(wn({H:M,testPoints:o,keyframe:t})){b=M;break}}return b},wn=({H:r,testPoints:e,keyframe:s})=>{let t=[];for(let o=0;o<e.length;o++)t.push(Ut(e[o],r));return!(Ne(t[0],t[1],t[2],t[3])<s.width*s.height*1e-4||!De(t[0],t[1],t[2],t[3]))},dn=({inH:r})=>{if(r[8]===0||!isFinite(r[8]))return null;let e=1/r[8],s=[];for(let t=0;t<8;t++)s[t]=r[t]*e;return s[8]=1,s},yn=({H:r,srcPoint:e,dstPoint:s,oneOverScale2:t})=>{let n=Ut(e,r),o=[n[0]-s[0],n[1]-s[1]];return Math.log(1+(o[0]*o[0]+o[1]*o[1])*t)},Mn=({H:r,testPoints:e})=>{let s=[];for(let t=0;t<e.length;t++)s[t]=Ut(e[t],r);for(let t=0;t<e.length;t++){let n=t,o=(t+1)%e.length,i=(t+2)%e.length;if(!Te(e[n],e[o],e[i],s[n],s[o],s[i]))return!1}return!0};function Ve({imageData:r,width:e,height:s,targetData:t,initialH:n,iterations:o=3}){let i=[...n],l=[],c=.05;for(let h=0;h<=1;h+=c)l.push({x:h*t.w,y:0}),l.push({x:h*t.w,y:t.h}),l.push({x:0,y:h*t.h}),l.push({x:t.w,y:h*t.h});for(let h=0;h<o;h++){let f=[];for(let a of l){let w=i[6]*a.x+i[7]*a.y+i[8],m=(i[0]*a.x+i[1]*a.y+i[2])/w,y=(i[3]*a.x+i[4]*a.y+i[5])/w;if(m<2||m>=e-2||y<2||y>=s-2)continue;let d=10,g=m,b=y,x=-1;for(let M=-d;M<=d;M+=2)for(let k=-d;k<=d;k+=2){let E=Math.max(1,Math.min(e-2,Math.floor(m+k))),R=Math.max(1,Math.min(s-2,Math.floor(y+M))),v=R*e+E,O=r[v+1]-r[v-1],p=r[v+e]-r[v-e],S=O*O+p*p;S>x&&(x=S,g=E,b=R)}x>500&&f.push({src:a,dst:{x:g,y:b},weight:Math.min(1,x/15e3)})}if(f.length<10)break;let u=xn(f);if(u)for(let a=0;a<9;a++)i[a]=i[a]*.5+u[a]*.5}return i}function xn(r){let e=r.length,s=new ft(e*2,9);for(let t=0;t<e;t++){let{src:n,dst:o,weight:i}=r[t],l=n.x,c=n.y,h=o.x,f=o.y;s.set(t*2,0,0),s.set(t*2,1,0),s.set(t*2,2,0),s.set(t*2,3,-l*i),s.set(t*2,4,-c*i),s.set(t*2,5,-i),s.set(t*2,6,f*l*i),s.set(t*2,7,f*c*i),s.set(t*2,8,f*i),s.set(t*2+1,0,l*i),s.set(t*2+1,1,c*i),s.set(t*2+1,2,i),s.set(t*2+1,3,0),s.set(t*2+1,4,0),s.set(t*2+1,5,0),s.set(t*2+1,6,-h*l*i),s.set(t*2+1,7,-h*c*i),s.set(t*2+1,8,-h*i)}try{let o=new Dt(s).rightSingularVectors.getColumn(8),i=1/o[8];return o.map(l=>l*i)}catch{return null}}function Mt(r){return r=r>>>0,r=r-(r>>>1&1431655765),r=(r&858993459)+(r>>>2&858993459),(r+(r>>>4)&252645135)*16843009>>>24}var mt={VIEWPORT_WIDTH:640,VIEWPORT_HEIGHT:480,DEFAULT_FOVY:60,DEFAULT_NEAR:1,DEFAULT_FAR:1e4,MAX_FEATURES_PER_BUCKET:24,USE_LSH:!0,HAMMING_THRESHOLD:.85,HDC_RATIO_THRESHOLD:.85,INLIER_THRESHOLD:15,MIN_NUM_INLIERS:6,MAX_MATCH_QUERY_POINTS:800,CLUSTER_MAX_POP:25,TRACKER_TEMPLATE_SIZE:6,TRACKER_SEARCH_SIZE:12,TRACKER_SIMILARITY_THRESHOLD:.65,MIN_IMAGE_PIXEL_SIZE:32,SCALE_STEP_EXPONENT:1,TRACKING_DOWNSCALE_LEVEL_1:256,TRACKING_DOWNSCALE_LEVEL_2:128,WARMUP_TOLERANCE:2,MISS_TOLERANCE:1,ONE_EURO_FILTER_CUTOFF:.5,ONE_EURO_FILTER_BETA:.1,USE_COMPACT_DESCRIPTORS:!0,COMPACT_HAMMING_THRESHOLD:8,FEATURES_PER_OCTAVE:150};function Ye({matches:r,thresholdPx:e=15,minInliers:s=6}){if(r.length<s)return null;let t=r.length,n=e*e,o=[],i=null,l=50;for(let c=0;c<l;c++){let h=Math.floor(Math.random()*t),f=Math.floor(Math.random()*t);for(;f===h;)f=Math.floor(Math.random()*t);let u=Math.floor(Math.random()*t);for(;u===h||u===f;)u=Math.floor(Math.random()*t);let a=r[h],w=r[f],m=r[u];if(a.keypoint.sx===void 0||w.keypoint.sx===void 0||m.keypoint.sx===void 0)continue;let y=a.keypoint.sx,d=a.keypoint.sy,g=w.keypoint.sx,b=w.keypoint.sy,x=m.keypoint.sx,M=m.keypoint.sy,k=a.querypoint.x,E=a.querypoint.y,R=w.querypoint.x,v=w.querypoint.y,O=m.querypoint.x,p=m.querypoint.y,S=y*(b-M)+g*(M-d)+x*(d-b);if(Math.abs(S)<1e-7)continue;let _=1/S,I=(b-M)*_,P=(M-d)*_,T=(d-b)*_,F=(x-g)*_,L=(y-x)*_,X=(g-y)*_,K=(g*M-x*b)*_,N=(x*d-y*M)*_,D=(y*b-g*d)*_,C=I*k+P*R+T*O,q=F*k+L*R+X*O,V=K*k+N*R+D*O,G=I*E+P*v+T*p,U=F*E+L*v+X*p,z=K*E+N*v+D*p,W=C*U-q*G;if(Math.abs(W)<1e-4)continue;let $=[];for(let Q=0;Q<t;Q++){let B=r[Q];if(B.keypoint.sx===void 0)continue;let st=B.keypoint.sx,tt=B.keypoint.sy,Z=C*st+q*tt+V,nt=G*st+U*tt+z,lt=Z-B.querypoint.x,ct=nt-B.querypoint.y;lt*lt+ct*ct<n&&$.push(B)}$.length>o.length&&(o=$,i={a:C,b:q,tx:V,c:G,d:U,ty:z})}return o.length<s?null:{inliers:o,model:i,isDeformable:!0}}var Ge=mt.INLIER_THRESHOLD,Qt=mt.MIN_NUM_INLIERS,bn=mt.CLUSTER_MAX_POP,Sn=mt.HAMMING_THRESHOLD,En=mt.HDC_RATIO_THRESHOLD,Be=mt.MAX_MATCH_QUERY_POINTS,$e=({keyframe:r,querypoints:e,querywidth:s,queryheight:t,debugMode:n,expectedScale:o})=>{let i={},l=e.length>Be?[...e].sort((N,D)=>(D.score||D.response||0)-(N.score||N.response||0)).slice(0,Be):e,c=[],h=l.length,f=r.max,u=r.min,a=r.hdc===!0||f&&f.hdc===1,w=f&&f.compact===1||u&&u.compact===1,m=a||w?1:2,y=a?En:Sn;for(let N=0;N<h;N++){let D=l[N],C=D.maxima?f:u;if(!C||C.x.length===0)continue;let q=C.t,V=[],G=new Tt([],(st,tt)=>st.d-tt.d);xe({node:q,descriptors:C.d,querypoint:D,queue:G,keypointIndexes:V,numPop:0,isHDC:a,descSize:m,isCompact:w});let U=-1,z=Number.MAX_SAFE_INTEGER,W=Number.MAX_SAFE_INTEGER,$=D.descriptors,Q=C.d,B=w&&$&&$.length>=2?($[0]^$[1])>>>0:0;for(let st=0;st<V.length;st++){let tt=V[st];if(o!==void 0&&C.s){let nt=C.s[tt],lt=(D.scale||1)/o;if(nt<lt*.4||nt>lt*2.5)continue}let Z;if(a)Z=Mt(Q[tt]^D.hdcSignature);else if(w)Z=Mt(Q[tt]^B);else{if(!$||$.length<m)continue;Z=Ct({v1:Q,v1Offset:tt*m,v2:$})}Z<z?(W=z,z=Z,U=tt):Z<W&&(W=Z)}U!==-1&&(W===Number.MAX_SAFE_INTEGER||z/W<y)&&c.push({querypoint:D,keypoint:{x:C.x[U],y:C.y[U],angle:C.a[U],scale:C.s?C.s[U]:r.s,sx:C.sx?C.sx[U]:void 0,sy:C.sy?C.sy[U]:void 0},d:z})}if(c.length<Qt)return{debugExtra:i};let d=c;n&&(i.constellationMatches=d);let g=ie({keywidth:r.w||r.width,keyheight:r.h||r.height,querywidth:s,queryheight:t,matches:d});if(n&&(i.houghMatches=g),g.length<Qt)return{debugExtra:i};let b=Me({srcPoints:g.map(N=>[N.keypoint.x,N.keypoint.y]),dstPoints:g.map(N=>[N.querypoint.x,N.querypoint.y]),keyframe:{width:r.w||r.width,height:r.h||r.height}});if(b===null){let N=Ye({matches:g,minInliers:Qt});return N?(n&&(i.deformableResult=N),{isDeformable:!0,inliers:N.inliers,model:N.model,matches:N.inliers,debugExtra:i}):{debugExtra:i}}let x=Ke({H:b,matches:g,threshold:Ge});if(n&&(i.inlierMatches=x),x.length<Qt)return{debugExtra:i};n&&Math.random()<.02&&console.log(`MATCH: Homography success with ${x.length} inliers`);let M=Fe(b,1e-5);if(!M)return{debugExtra:i};let k=100,E=[],R=M[0],v=M[1],O=M[2],p=M[3],S=M[4],_=M[5],I=M[6],P=M[7],T=M[8];for(let N=0;N<h;N++){let D=l[N],C=D.x,q=D.y,G=1/(C*I+q*P+T),U=(C*R+q*v+O)*G,z=(C*p+q*S+_)*G,W=-1,$=Number.MAX_SAFE_INTEGER,Q=Number.MAX_SAFE_INTEGER,B=D.maxima?f:u;if(!B)continue;let st=B.x,tt=B.y,Z=B.d,nt=D.descriptors,lt=w&&nt&&nt.length>=2?(nt[0]^nt[1])>>>0:0;for(let ct=0,St=st.length;ct<St;ct++){let qt=st[ct]-U,Et=tt[ct]-z;if(qt*qt+Et*Et>k)continue;let at;if(a)at=Mt(Z[ct]^D.hdcSignature);else if(w)at=Mt(Z[ct]^lt);else{if(!nt||nt.length<m)continue;at=Ct({v1:Z,v1Offset:ct*m,v2:nt})}at<$?(Q=$,$=at,W=ct):at<Q&&(Q=at)}W!==-1&&(Q===Number.MAX_SAFE_INTEGER||$/Q<y)&&E.push({querypoint:D,keypoint:{x:B.x[W],y:B.y[W],angle:B.a[W],scale:B.s?B.s[W]:r.s,sx:B.sx?B.sx[W]:void 0,sy:B.sy?B.sy[W]:void 0}})}n&&(i.matches2=E);let F=ie({keywidth:r.w||r.width,keyheight:r.h||r.height,querywidth:s,queryheight:t,matches:E});n&&(i.houghMatches2=F);let L=Me({srcPoints:F.map(N=>[N.keypoint.x,N.keypoint.y]),dstPoints:F.map(N=>[N.querypoint.x,N.querypoint.y]),keyframe:{width:r.w||r.width,height:r.h||r.height}});if(L===null)return{debugExtra:i};let X=Ke({H:L,matches:F,threshold:Ge});return n&&(i.inlierMatches2=X),{H:Ve({imageData:e[0].imageData,width:s,height:t,targetData:{w:r.w||r.width,h:r.h||r.height},initialH:L,iterations:3})||L,matches:X,debugExtra:i}},xe=({node:r,descriptors:e,querypoint:s,queue:t,keypointIndexes:n,numPop:o,isHDC:i,descSize:l,isCompact:c})=>{let h=r[0]===1,f=r[2];if(h){for(let d=0;d<f.length;d++)n.push(f[d]);return}let u=s.descriptors,a=c&&u&&u.length>=2?(u[0]^u[1])>>>0:0,w=Number.MAX_SAFE_INTEGER,m=f.length,y=new Int32Array(m);for(let d=0;d<m;d++){let b=f[d][1],x;i?x=Mt(e[b]^s.hdcSignature):c?x=Mt(e[b]^a):x=Ct({v1:e,v1Offset:b*l,v2:u}),y[d]=x,x<w&&(w=x)}for(let d=0;d<m;d++){let g=y[d];g<=w?xe({node:f[d],descriptors:e,querypoint:s,queue:t,keypointIndexes:n,numPop:o+1,isHDC:i,descSize:l,isCompact:c}):t.push({node:f[d],d:g})}if(o<bn&&t.length>0){let{node:d}=t.pop();xe({node:d,descriptors:e,querypoint:s,queue:t,keypointIndexes:n,numPop:o+1,isHDC:i,descSize:l,isCompact:c})}},Ke=r=>{let{H:e,matches:s,threshold:t}=r,n=t*t,o=e[0],i=e[1],l=e[2],c=e[3],h=e[4],f=e[5],u=e[6],a=e[7],w=e[8],m=[];for(let y=0;y<s.length;y++){let d=s[y],g=d.querypoint,b=d.keypoint,M=1/(b.x*u+b.y*a+w),k=(b.x*o+b.y*i+l)*M,E=(b.x*c+b.y*h+f)*M,R=k-g.x,v=E-g.y;R*R+v*v<=n&&m.push(d)}return m};var Zt=class{constructor(e,s,t=!1){this.queryWidth=e,this.queryHeight=s,this.debugMode=t}matchDetection(e,s,t){let n={frames:[]},o=null;if(!e||!Array.isArray(e))return{targetIndex:-1,keyframeIndex:-1,debugExtra:n};for(let f=0;f<e.length;f++){let{H:u,matches:a,debugExtra:w}=$e({keyframe:e[f],querypoints:s,querywidth:this.queryWidth,queryheight:this.queryHeight,debugMode:this.debugMode,expectedScale:t});w&&(w.keyframeIndex=f,n.frames.push(w)),u&&(o===null||o.matches.length<a.length)&&(o={keyframeIndex:f,H:u,matches:a})}if(o===null)return{targetIndex:-1,keyframeIndex:-1,debugExtra:n};let i=[],l=[],c=e[o.keyframeIndex],h=c.s||c.scale||1;for(let f=0;f<o.matches.length;f++){let u=o.matches[f].querypoint,a=o.matches[f].keypoint,w=a.scale||h;i.push({x:u.x,y:u.y}),l.push({x:(a.x+.5)/h,y:(a.y+.5)/h,z:0})}return{screenCoords:i,worldCoords:l,targetIndex:-1,keyframeIndex:o.keyframeIndex,H:o.H,debugExtra:n}}};function We({screenCoords:r,worldCoords:e,projectionTransform:s}){let t=new ft(s),n=r.length,o=In(s),i=new ft(n*2,9);for(let E=0;E<n;E++){let R=r[E],v=e[E],O=o[0]*R.x+o[1]*R.y+o[2],p=o[3]*R.x+o[4]*R.y+o[5],S=o[6]*R.x+o[7]*R.y+o[8],_=O/S,I=p/S,P=v.x,T=v.y;i.set(E*2,0,P),i.set(E*2,1,T),i.set(E*2,2,1),i.set(E*2,3,0),i.set(E*2,4,0),i.set(E*2,5,0),i.set(E*2,6,-_*P),i.set(E*2,7,-_*T),i.set(E*2,8,-_),i.set(E*2+1,0,0),i.set(E*2+1,1,0),i.set(E*2+1,2,0),i.set(E*2+1,3,P),i.set(E*2+1,4,T),i.set(E*2+1,5,1),i.set(E*2+1,6,-I*P),i.set(E*2+1,7,-I*T),i.set(E*2+1,8,-I)}let h=new Dt(i).rightSingularVectors.getColumn(8);if(h[8]<0)for(let E=0;E<9;E++)h[E]=-h[E];let f=[h[0],h[3],h[6]],u=[h[1],h[4],h[7]],a=[h[2],h[5],h[8]],w=Math.sqrt(f[0]**2+f[1]**2+f[2]**2),m=Math.sqrt(u[0]**2+u[1]**2+u[2]**2),y=(w+m)/2,d=new ft([[f[0]/w,u[0]/m,0],[f[1]/w,u[1]/m,0],[f[2]/w,u[2]/m,0]]);d.set(0,2,d.get(1,0)*d.get(2,1)-d.get(2,0)*d.get(1,1)),d.set(1,2,d.get(2,0)*d.get(0,1)-d.get(0,0)*d.get(2,1)),d.set(2,2,d.get(0,0)*d.get(1,1)-d.get(1,0)*d.get(0,1));let g=new Dt(d),b=g.leftSingularVectors,x=g.rightSingularVectors,M=b.mmul(x.transpose());if((E=>E.get(0,0)*(E.get(1,1)*E.get(2,2)-E.get(1,2)*E.get(2,1))-E.get(0,1)*(E.get(1,0)*E.get(2,2)-E.get(1,2)*E.get(2,0))+E.get(0,2)*(E.get(1,0)*E.get(2,1)-E.get(1,1)*E.get(2,0)))(M)<0){let E=b.clone();for(let R=0;R<3;R++)E.set(R,2,-E.get(R,2));M=E.mmul(x.transpose())}return[[M.get(0,0),M.get(0,1),M.get(0,2),a[0]/y],[M.get(1,0),M.get(1,1),M.get(1,2),a[1]/y],[M.get(2,0),M.get(2,1),M.get(2,2),a[2]/y]]}function In(r){let e=r[0][0],s=r[0][1],t=r[0][2],n=r[1][0],o=r[1][1],i=r[1][2],l=r[2][0],c=r[2][1],h=r[2][2],u=1/(e*(o*h-c*i)-s*(n*h-i*l)+t*(n*c-o*l));return[(o*h-i*c)*u,(t*c-s*h)*u,(s*i-t*o)*u,(i*l-n*h)*u,(e*h-t*l)*u,(n*t-e*i)*u,(n*c-o*l)*u,(l*s-c*e)*u,(e*o-n*s)*u]}var Je=({screenCoords:r,worldCoords:e,projectionTransform:s})=>We({screenCoords:r,worldCoords:e,projectionTransform:s});var Ht=(r,e)=>[[r[0][0]*e[0][0]+r[0][2]*e[2][0],r[0][0]*e[0][1]+r[0][2]*e[2][1],r[0][0]*e[0][2]+r[0][2]*e[2][2],r[0][0]*e[0][3]+r[0][2]*e[2][3]],[r[1][1]*e[1][0]+r[1][2]*e[2][0],r[1][1]*e[1][1]+r[1][2]*e[2][1],r[1][1]*e[1][2]+r[1][2]*e[2][2],r[1][1]*e[1][3]+r[1][2]*e[2][3]],[e[2][0],e[2][1],e[2][2],e[2][3]]],be=(r,e,s,t)=>{let n=r[0][0]*e+r[0][1]*s+r[0][3],o=r[1][0]*e+r[1][1]*s+r[1][3],i=r[2][0]*e+r[2][1]*s+r[2][3];return{x:n,y:o,z:i}},xt=(r,e,s,t)=>{let{x:n,y:o,z:i}=be(r,e,s,t);return{x:n/i,y:o/i}};var kn=5,Rn=4,Qe=10,_n=.1,vn=.99,rt=[[],[],[]],bt=[[],[]],H=[[],[],[]],Ze=({initialModelViewTransform:r,projectionTransform:e,worldCoords:s,screenCoords:t,stabilities:n})=>{let o=0,i=0;for(let a=0;a<s.length;a++)o+=s[a].x,i+=s[a].y;o/=s.length,i/=s.length;let l=[];for(let a=0;a<s.length;a++)l.push({x:s[a].x-o,y:s[a].y-i,z:s[a].z});let c=[[],[],[]];for(let a=0;a<3;a++)for(let w=0;w<3;w++)c[a][w]=r[a][w];c[0][3]=r[0][0]*o+r[0][1]*i+r[0][3],c[1][3]=r[1][0]*o+r[1][1]*i+r[1][3],c[2][3]=r[2][0]*o+r[2][1]*i+r[2][3];let h=[1,.8,.6,.4,0],f=c,u=null;for(let a=0;a<h.length;a++){let w=jn({initialModelViewTransform:f,projectionTransform:e,worldCoords:l,screenCoords:t,stabilities:n,inlierProb:h[a]});if(f=w.modelViewTransform,w.err<kn){u=f;break}}return u===null?null:(u[0][3]=u[0][3]-u[0][0]*o-u[0][1]*i,u[1][3]=u[1][3]-u[1][0]*o-u[1][1]*i,u[2][3]=u[2][3]-u[2][0]*o-u[2][1]*i,u)},jn=({initialModelViewTransform:r,projectionTransform:e,worldCoords:s,screenCoords:t,stabilities:n,inlierProb:o})=>{let i=o<1,l=r,c=0,h=0,f=new Array(s.length),u=new Array(s.length),a=new Array(s.length),w=new Array(s.length);for(let m=0;m<=Qe;m++){let y=Ht(e,l);for(let M=0;M<s.length;M++){let k=xt(y,s[M].x,s[M].y,s[M].z),E=t[M].x-k.x,R=t[M].y-k.y;a[M]=E,w[M]=R,f[M]=E*E+R*R}let d;if(h=0,i){let M=Math.max(3,Math.floor(s.length*o)-1);for(let k=0;k<s.length;k++)u[k]=f[k];u.sort((k,E)=>k-E),d=Math.max(u[M]*Rn,16);for(let k=0;k<s.length;k++)u[k]>d?h+=d/6:h+=d/6*(1-(1-u[k]/d)*(1-u[k]/d)*(1-u[k]/d))}else for(let M=0;M<s.length;M++)h+=f[M];if(h/=s.length,h<_n||m>0&&h/c>vn||m===Qe)break;c=h;let g=[],b=[];for(let M=0;M<s.length;M++){if(i&&f[M]>d)continue;let k=Nn({modelViewProjectionTransform:y,modelViewTransform:l,projectionTransform:e,worldCoord:s[M]});if(i){let E=(1-f[M]/d)*(1-f[M]/d),R=n?n[M]:1,v=R*Math.log10(9*R+1),O=E*v;for(let p=0;p<2;p++)for(let S=0;S<6;S++)k[p][S]*=O;g.push([a[M]*O]),g.push([w[M]*O])}else{let E=n?n[M]:1,R=E*Math.log10(9*E+1);for(let v=0;v<2;v++)for(let O=0;O<6;O++)k[v][O]*=R;g.push([a[M]*R]),g.push([w[M]*R])}for(let E=0;E<k.length;E++)b.push(k[E])}let x=Fn({dU:g,J_U_S:b});if(x===null)break;l=Tn({modelViewTransform:l,dS:x})}return{modelViewTransform:l,err:h}},Tn=({modelViewTransform:r,dS:e})=>{let s=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],t,n,o;s<1e-6?(t=1,n=0,o=0,s=0):(s=Math.sqrt(s),t=e[0]/s,n=e[1]/s,o=e[2]/s);let i=Math.cos(s),l=Math.sin(s),c=1-i;rt[0][0]=t*t*c+i,rt[0][1]=t*n*c-o*l,rt[0][2]=t*o*c+n*l,rt[0][3]=e[3],rt[1][0]=n*t*c+o*l,rt[1][1]=n*n*c+i,rt[1][2]=n*o*c-t*l,rt[1][3]=e[4],rt[2][0]=o*t*c-n*l,rt[2][1]=o*n*c+t*l,rt[2][2]=o*o*c+i,rt[2][3]=e[5];let h=[[],[],[]];for(let f=0;f<3;f++){for(let u=0;u<4;u++)h[f][u]=r[f][0]*rt[0][u]+r[f][1]*rt[1][u]+r[f][2]*rt[2][u];h[f][3]+=r[f][3]}return h},Fn=({dU:r,J_U_S:e})=>{let s=new ft(e),t=new ft(r),n=s.transpose(),o=n.mmul(s),i=n.mmul(t),l;try{l=Jt(o)}catch{return null}return l.mmul(i).to1DArray()},Nn=({modelViewProjectionTransform:r,modelViewTransform:e,projectionTransform:s,worldCoord:t})=>{let n=e,{x:o,y:i,z:l}=t,c=be(r,o,i,l),h=c.z*c.z;bt[0][0]=s[0][0]*c.z/h,bt[0][1]=s[0][1]*c.z/h,bt[0][2]=(s[0][2]*c.z-s[2][2]*c.x)/h,bt[1][0]=s[1][0]*c.z/h,bt[1][1]=s[1][1]*c.z/h,bt[1][2]=(s[1][2]*c.z-s[2][2]*c.y)/h,H[0][0]=n[0][2]*i,H[0][1]=-n[0][2]*o,H[0][2]=n[0][1]*o-n[0][0]*i,H[0][3]=n[0][0],H[0][4]=n[0][1],H[0][5]=n[0][2],H[1][0]=n[1][2]*i,H[1][1]=-n[1][2]*o,H[1][2]=n[1][1]*o-n[1][0]*i,H[1][3]=n[1][0],H[1][4]=n[1][1],H[1][5]=n[1][2],H[2][0]=n[2][2]*i,H[2][1]=-n[2][2]*o,H[2][2]=n[2][1]*o-n[2][0]*i,H[2][3]=n[2][0],H[2][4]=n[2][1],H[2][5]=n[2][2];let f=[[],[]];for(let u=0;u<2;u++)for(let a=0;a<6;a++){f[u][a]=0;for(let w=0;w<3;w++)f[u][a]+=bt[u][w]*H[w][a]}return f};var te=class{constructor(e){this.projectionTransform=e}estimate({screenCoords:e,worldCoords:s}){return Je({screenCoords:e,worldCoords:s,projectionTransform:this.projectionTransform})}refineEstimate({initialModelViewTransform:e,worldCoords:s,screenCoords:t}){return Ze({initialModelViewTransform:e,worldCoords:s,screenCoords:t,projectionTransform:this.projectionTransform})}};function He({mesh:r,trackedPoints:e,currentVertices:s,iterations:t=5}){let{e:n,rl:o}=r,i=s.length/2,l=new Float32Array(s),c=.8,h=.5;for(let f=0;f<t;f++){for(let u=0;u<o.length;u++){let a=n[u*2],w=n[u*2+1],m=o[u],y=l[a*2],d=l[a*2+1],g=l[w*2],b=l[w*2+1],x=g-y,M=b-d,k=Math.sqrt(x*x+M*M);if(k<1e-4)continue;let E=(k-m)/k,R=x*.5*E*c,v=M*.5*E*c;l[a*2]+=R,l[a*2+1]+=v,l[w*2]-=R,l[w*2+1]-=v}for(let u of e){let a=u.meshIndex;if(a===void 0)continue;let w=u.x,m=u.y;l[a*2]+=(w-l[a*2])*h,l[a*2+1]+=(m-l[a*2+1])*h}}return l}var ts=mt.TRACKER_TEMPLATE_SIZE;var Dn=mt.TRACKER_SEARCH_SIZE,Pn=1,es=mt.TRACKER_SIMILARITY_THRESHOLD;var ee=class{constructor(e,s,t,n,o,i=!1){this.markerDimensions=e,this.trackingDataList=s,this.projectionTransform=t,this.inputWidth=n,this.inputHeight=o,this.debugMode=i,this.trackingKeyframeList=[],this.prebuiltData=[];for(let h=0;h<s.length;h++){let f=s[h];this.trackingKeyframeList[h]=f,this.prebuiltData[h]=f.map(u=>({px:new Float32Array(u.px),py:new Float32Array(u.py),data:new Uint8Array(u.d),width:u.w,height:u.h,scale:u.s,mesh:u.mesh,projectedImage:new Float32Array(u.w*u.h)}))}this.meshVerticesState=[];let c=ts*2+1;this.templateBuffer=new Float32Array(c*c)}dummyRun(e){let s=[[1,0,0,0],[0,1,0,0],[0,0,1,0]];for(let t=0;t<this.trackingKeyframeList.length;t++)this.track(e,s,t)}track(e,s,t){let n={},o=Ht(this.projectionTransform,s),[i,l]=this.markerDimensions[t],c=xt(o,0,0),h=xt(o,i,0),f=Math.sqrt((h.x-c.x)**2+(h.y-c.y)**2);this.lastOctaveIndex||(this.lastOctaveIndex=[]);let u=this.lastOctaveIndex[t]!==void 0?this.lastOctaveIndex[t]:0,a=Math.abs(this.prebuiltData[t][u].width-f),w=.8;for(let S=0;S<this.prebuiltData[t].length;S++){let _=Math.abs(this.prebuiltData[t][S].width-f);_<a*w&&(a=_,u=S)}this.lastOctaveIndex[t]=u;let m=this.prebuiltData[t][u];this._computeProjection(o,e,m);let y=m.projectedImage,{matchingPoints:d,sim:g}=this._computeMatching(m,y),b=this.trackingKeyframeList[t][u],x=[],M=[],k=[],{px:E,py:R,s:v}=b,O=[];for(let S=0;S<d.length;S++){let _=g[S];if(_>es&&S<E.length){k.push(S);let I=xt(o,d[S][0],d[S][1]);M.push(I),x.push({x:E[S]/v,y:R[S]/v,z:0}),O.push(_)}}let p=null;if(m.mesh&&k.length>=4){this.meshVerticesState[t]||(this.meshVerticesState[t]=[]);let S=this.meshVerticesState[t][u];if(!S){S=new Float32Array(E.length*2);for(let T=0;T<E.length;T++)S[T*2]=E[T],S[T*2+1]=R[T]}let _=[];for(let T=0;T<k.length;T++){let F=k[T];_.push({meshIndex:F,x:d[F][0]*v,y:d[F][1]*v})}let I=He({mesh:m.mesh,trackedPoints:_,currentVertices:S,iterations:5});this.meshVerticesState[t][u]=I;let P=new Float32Array(I.length);for(let T=0;T<I.length;T+=2){let F=xt(o,I[T]/v,I[T+1]/v);P[T]=F.x,P[T+1]=F.y}p={vertices:P,triangles:m.mesh.t}}if(M.length>=8){let S=1/0,_=1/0,I=-1/0,P=-1/0;for(let F of M)F.x<S&&(S=F.x),F.y<_&&(_=F.y),F.x>I&&(I=F.x),F.y>P&&(P=F.y);if(Math.sqrt((I-S)**2+(P-_)**2)<f*.15)return{worldCoords:[],screenCoords:[],reliabilities:[],debugExtra:n}}return this.debugMode&&(n={octaveIndex:u,projectedImage:y,matchingPoints:d,goodTrack:k,trackedPoints:M}),{worldCoords:x,screenCoords:M,reliabilities:O,indices:k,octaveIndex:u,deformedMesh:p,debugExtra:n}}_computeMatching(e,s){let{px:t,py:n,scale:o,data:i,width:l,height:c}=e,h=t.length,f=ts,u=f*2+1,w=1/(u*u),m=Dn,y=Pn,d=[],g=new Float32Array(h),b=this.templateBuffer;for(let x=0;x<h;x++){let M=t[x]+.5|0,k=n[x]+.5|0,E=-1,R=t[x]/o,v=n[x]/o,O=0,p=0,S=0;for(let P=-f;P<=f;P++){let T=(k+P)*l;for(let F=-f;F<=f;F++){let L=i[T+M+F];b[S++]=L,O+=L,p+=L*L}}let _=Math.sqrt(Math.max(0,p-O*O*w));if(_<1e-4){g[x]=-1,d.push([R,v]);continue}let I=4;for(let P=-m;P<=m;P+=I){let T=k+P;if(!(T<f||T>=c-f))for(let F=-m;F<=m;F+=I){let L=M+F;if(L<f||L>=l-f)continue;let X=0,K=0,N=0;for(let q=-f;q<=f;q++){let V=(T+q)*l,G=(q+f)*u;for(let U=-f;U<=f;U++){let z=s[V+(L+U)],W=b[G+(U+f)];X+=z,K+=z*z,N+=z*W}}let D=Math.sqrt(Math.max(0,K-X*X*w));if(D<1e-4)continue;let C=(N-X*O*w)/(D*_);C>E&&(E=C,R=L/o,v=T/o)}}if(E>es){let P=R*o|0,T=v*o|0,F=I;for(let L=-F;L<=F;L++){let X=T+L;if(!(X<f||X>=c-f))for(let K=-F;K<=F;K++){let N=P+K;if(N<f||N>=l-f)continue;let D=0,C=0,q=0;for(let U=-f;U<=f;U++){let z=(X+U)*l,W=(U+f)*u;for(let $=-f;$<=f;$++){let Q=s[z+(N+$)],B=b[W+($+f)];D+=Q,C+=Q*Q,q+=Q*B}}let V=Math.sqrt(Math.max(0,C-D*D*w));if(V<1e-4)continue;let G=(q-D*O*w)/(V*_);G>E&&(E=G,R=N/o,v=X/o)}}}g[x]=E,d.push([R,v])}return{matchingPoints:d,sim:g}}_computeProjection(e,s,t){let{width:n,height:o,scale:i,projectedImage:l}=t,c=1/i,h=this.inputWidth,f=this.inputHeight,u=e[0][0],a=e[0][1],w=e[0][3],m=e[1][0],y=e[1][1],d=e[1][3],g=e[2][0],b=e[2][1],x=e[2][3];for(let M=0;M<o;M++){let k=M*c,E=M*n;for(let R=0;R<n;R++){let v=R*c,p=1/(v*g+k*b+x),S=(v*u+k*a+w)*p,_=(v*m+k*y+d)*p,I=S|0,P=_|0,T=I+1,F=P+1;if(I>=0&&T<h&&P>=0&&F<f){let L=S-I,X=_-P,K=1-L,N=1-X,D=P*h,C=F*h,q=s[D+I],V=s[D+T],G=s[C+I],U=s[C+T];l[E+R]=q*K*N+V*L*N+G*K*X+U*L*X}else l[E+R]=0}}}};var se=[{sigma:.55,points:[[-1,0],[-.5,-.866025],[.5,-.866025],[1,-0],[.5,.866025],[-.5,.866025]]},{sigma:.475,points:[[0,.930969],[-.806243,.465485],[-.806243,-.465485],[-0,-.930969],[.806243,-.465485],[.806243,.465485]]},{sigma:.4,points:[[.847306,-0],[.423653,.733789],[-.423653,.733789],[-.847306,0],[-.423653,-.733789],[.423653,-.733789]]},{sigma:.325,points:[[-0,-.741094],[.641806,-.370547],[.641806,.370547],[0,.741094],[-.641806,.370547],[-.641806,-.370547]]},{sigma:.25,points:[[-.595502,0],[-.297751,-.51572],[.297751,-.51572],[.595502,-0],[.297751,.51572],[-.297751,.51572]]},{sigma:.175,points:[[0,.362783],[-.314179,.181391],[-.314179,-.181391],[-0,-.362783],[.314179,-.181391],[.314179,.181391]]},{sigma:.1,points:[[0,0]]}],pt=[];for(let r=0;r<se.length;r++){let e=se[r].sigma;for(let s=0;s<se[r].points.length;s++){let t=se[r].points[s];pt.push([e,t[0],t[1]])}}var On=()=>null,qn=(r,e,s)=>{let t=new Float32Array(e*s);for(let n=1;n<s-1;n++){let o=n*e,i=(n-1)*e,l=(n+1)*e;for(let c=1;c<e-1;c++){let h=o+c,f=(r[i+c+1]-r[i+c-1]+r[o+c+1]-r[o+c-1]+r[l+c+1]-r[l+c-1])/768,u=(r[l+c-1]-r[i+c-1]+r[l+c]-r[i+c]+r[l+c+1]-r[i+c+1])/768;t[h]=Math.sqrt((f*f+u*u)/2)}}return t},Cn=(r,e,s)=>{let t=new Uint8Array(e*s);for(let n=1;n<s-1;n++){let o=n*e;for(let i=1;i<e-1;i++){let l=o+i,c=r[l];c>0&&c>=r[l-1]&&c>=r[l+1]&&c>=r[l-e]&&c>=r[l+e]&&(t[l]=1)}}return t},Ln=(r,e,s)=>{let t=new Float32Array(e*s),n=new Float32Array(e*s),o=1/16,i=4/16,l=6/16,c=e-1,h=s-1;for(let f=0;f<s;f++){let u=f*e;for(let a=0;a<e;a++){let w=a<2?0:a-2,m=a<1?0:a-1,y=a>c-1?c:a+1,d=a>c-2?c:a+2;n[u+a]=r[u+w]*o+r[u+m]*i+r[u+a]*l+r[u+y]*i+r[u+d]*o}}for(let f=0;f<s;f++){let u=(f<2?0:f-2)*e,a=(f<1?0:f-1)*e,w=f*e,m=(f>h-1?h:f+1)*e,y=(f>h-2?h:f+2)*e;for(let d=0;d<e;d++)t[w+d]=n[u+d]*o+n[a+d]*i+n[w+d]*l+n[m+d]*i+n[y+d]*o}return t},Un=(r,e,s)=>{let t=Math.floor(e/2),n=Math.floor(s/2),o=new Float32Array(t*n);for(let i=0;i<n;i++){let l=i*2;for(let c=0;c<t;c++){let h=c*2,f=l*e+h;o[i*t+c]=(r[f]+r[f+1]+r[f+e]+r[f+e+1])/4}}return{data:o,width:t,height:n}},Se=class{constructor(){this.gpu=null,this.kernelCache=new Map,this.initialized=!1}init(){this.initialized||(this.gpu=On(),this.initialized=!0)}computeGradients(e,s,t){return this.init(),qn(e,s,t)}findLocalMaxima(e,s,t){return this.init(),Cn(e,s,t)}edgeDetection(e,s,t){let n=this.computeGradients(e,s,t),o=this.findLocalMaxima(n,s,t);return{dValue:n,isCandidate:o}}gaussianBlur(e,s,t){return this.init(),Ln(e,s,t)}downsample(e,s,t){return this.init(),Un(e,s,t)}buildPyramid(e,s,t,n=5){this.init();let o=[],i=e instanceof Float32Array?e:Float32Array.from(e),l=s,c=t;for(let h=0;h<n;h++){let f=this.gaussianBlur(i,l,c);if(o.push({data:f,width:l,height:c,scale:Math.pow(2,h)}),l>8&&c>8){let u=this.downsample(f,l,c);i=u.data,l=u.width,c=u.height}else break}return o}isGPUAvailable(){return this.init(),this.gpu!==null}destroy(){this.kernelCache.clear(),this.gpu&&this.gpu.destroy&&this.gpu.destroy(),this.gpu=null,this.initialized=!1}},ss=new Se;var ne=new Int32Array(128),os=new Int32Array(64);for(let r=0;r<64;r++)os[r]=Math.floor(r*(672/64));var ns=0,Pt=0;for(let r=0;r<pt.length;r++)for(let e=r+1;e<pt.length;e++)Pt<64&&ns===os[Pt]&&(ne[Pt*2]=r,ne[Pt*2+1]=e,Pt++),ns++;function rs(r){let e=new Uint32Array(2);for(let s=0;s<64;s++){let t=ne[s*2],n=ne[s*2+1];if(r[t]<r[n]){let o=s>>5,i=s&31;e[o]|=1<<i}}return e}function is(r){let e=new Uint8Array(84),s=0,t=0;for(let n=0;n<pt.length;n++)for(let o=n+1;o<pt.length;o++)r[n]<r[o]&&(e[t]|=1<<7-s),s++,s===8&&(t++,s=0);return e}function ls(r){let e=new Uint8Array(8),s=new DataView(e.buffer);return s.setUint32(0,r[0],!0),s.setUint32(4,r[1],!0),e}var cs=4,zn=15,An=12,Ot=36,hs=7,Xn=!0;var oe=class{constructor(e,s,t={}){this.width=e,this.height=s,this.useGPU=t.useGPU!==void 0?t.useGPU:Xn,this.useLSH=t.useLSH!==void 0?t.useLSH:!0,this.useHDC=t.useHDC!==void 0?t.useHDC:!0,this.maxFeaturesPerBucket=t.maxFeaturesPerBucket!==void 0?t.maxFeaturesPerBucket:An;let n=0,o=e,i=s;for(;o>=cs&&i>=cs&&(o=Math.floor(o/2),i=Math.floor(i/2),n++,n!==10););this.numOctaves=t.maxOctaves!==void 0?Math.min(n,t.maxOctaves):n}detect(e,s={}){let t=s.octavesToProcess||Array.from({length:this.numOctaves},(f,u)=>u),n;if(e instanceof Float32Array)n=e;else{n=new Float32Array(e.length);for(let f=0;f<e.length;f++)n[f]=e[f]}let o=this._buildGaussianPyramid(n,this.width,this.height,t),i=this._buildDogPyramid(o,t),l=this._findExtremas(i,o),c=this._applyPrune(l);return this._computeOrientations(c,o),this._computeFreakDescriptors(c,o),{featurePoints:c.map(f=>{let u=Math.pow(2,f.octave);return{maxima:f.score>0,x:f.x*u+u*.5-.5,y:f.y*u+u*.5-.5,scale:u,angle:f.angle||0,score:f.absScore,descriptors:this.useLSH&&f.lsh?f.lsh:f.descriptors||[],imageData:n}}),pyramid:o}}_buildGaussianPyramid(e,s,t,n=null){if(this.useGPU)try{let h=ss.buildPyramid(e,s,t,this.numOctaves),f=[];for(let u=0;u<h.length&&u<this.numOctaves;u++){if(n&&!n.includes(u)){f.push(null);continue}let a=h[u],w=this._applyGaussianFilter(a.data,a.width,a.height);f.push([{data:a.data,width:a.width,height:a.height},{data:w.data,width:a.width,height:a.height}])}return f}catch(h){console.warn("GPU pyramid failed, falling back to CPU:",h.message)}(!this._pyramidBuffers||this._pyramidBuffers.width!==s||this._pyramidBuffers.height!==t)&&(this._pyramidBuffers={width:s,height:t,temp:new Float32Array(s*t)});let o=[],i=e,l=s,c=t;for(let h=0;h<this.numOctaves;h++){let f=!n||n.includes(h);if(f){let u=this._applyGaussianFilter(i,l,c),a=this._applyGaussianFilter(u.data,l,c);o.push([{data:u.data,width:l,height:c},{data:a.data,width:l,height:c}])}else o.push(null);if(h<this.numOctaves-1)if(!n||n.some(a=>a>h)){let a=f?o[h][0].data:i,w=this._downsample(a,l,c);i=w.data,l=w.width,c=w.height}else break}return o}_applyGaussianFilter(e,s,t){let n=new Float32Array(s*t),o=this._pyramidBuffers?.temp||new Float32Array(s*t),i=.0625,l=.25,c=.375;for(let h=0;h<t;h++){let f=h*s;o[f]=e[f]*(i+l+c)+e[f+1]*l+e[f+2]*i,o[f+1]=(e[f]*l+e[f+1]*c+e[f+2]*l+e[f+3]*i)*(1/(l+c+l+i));for(let w=2;w<s-2;w++){let m=f+w;o[m]=e[m-2]*i+e[m-1]*l+e[m]*c+e[m+1]*l+e[m+2]*i}let u=f+s-2,a=f+s-1;o[u]=(e[u-2]*i+e[u-1]*l+e[u]*c+e[a]*l)*(1/(i+l+c+l)),o[a]=e[a-2]*i+e[a-1]*l+e[a]*(c+l+i)}for(let h=0;h<s;h++){n[h]=o[h]*(i+l+c)+o[h+s]*l+o[h+s*2]*i,n[h+s]=(o[h]*l+o[h+s]*c+o[h+s*2]*l+o[h+s*3]*i)*(1/(l+c+l+i));for(let a=2;a<t-2;a++){let w=a*s+h;n[w]=o[w-s*2]*i+o[w-s]*l+o[w]*c+o[w+s]*l+o[w+s*2]*i}let f=(t-2)*s+h,u=(t-1)*s+h;n[f]=(o[f-s*2]*i+o[f-s]*l+o[f]*c+o[u]*l)*(1/(i+l+c+l)),n[u]=o[u-s*2]*i+o[u-s]*l+o[u]*(c+l+i)}return{data:n,width:s,height:t}}_downsample(e,s,t){let n=s>>1,o=t>>1,i=new Float32Array(n*o);for(let l=0;l<o;l++){let c=l*2*s,h=c+s,f=l*n;for(let u=0;u<n;u++){let a=u*2;i[f+u]=(e[c+a]+e[c+a+1]+e[h+a]+e[h+a+1])*.25}}return{data:i,width:n,height:o}}_buildDogPyramid(e,s=null){let t=[];for(let n=0;n<e.length;n++){if(!e[n]){t.push(null);continue}let o=e[n][0],i=e[n][1],l=o.width,c=o.height,h=new Float32Array(l*c);for(let f=0;f<h.length;f++)h[f]=i.data[f]-o.data[f];t.push({data:h,width:l,height:c})}return t}_findExtremas(e,s){let t=[];for(let n=0;n<e.length;n++){let o=e[n];if(!o)continue;let i=n>0?e[n-1]:null,l=n<e.length-1?e[n+1]:null,c=o.width,h=o.height;for(let f=1;f<h-1;f++)for(let u=1;u<c-1;u++){let a=o.data[f*c+u];if(Math.abs(a)<.003)continue;let w=!0,m=!0;for(let y=-1;y<=1&&(w||m);y++)for(let d=-1;d<=1&&(w||m);d++){if(d===0&&y===0)continue;let g=o.data[(f+y)*c+(u+d)];g>=a&&(w=!1),g<=a&&(m=!1)}if((w||m)&&i){let y=u<<1,d=f<<1,g=i.width;for(let b=-1;b<=1&&(w||m);b++)for(let x=-1;x<=1&&(w||m);x++){let M=Math.max(0,Math.min(g-1,y+x)),k=Math.max(0,Math.min(i.height-1,d+b)),E=i.data[k*g+M];E>=a&&(w=!1),E<=a&&(m=!1)}}if((w||m)&&l){let y=u>>1,d=f>>1,g=l.width;for(let b=-1;b<=1&&(w||m);b++)for(let x=-1;x<=1&&(w||m);x++){let M=Math.max(0,Math.min(g-1,y+x)),k=Math.max(0,Math.min(l.height-1,d+b)),E=l.data[k*g+M];E>=a&&(w=!1),E<=a&&(m=!1)}}(w||m)&&t.push({score:w?Math.abs(a):-Math.abs(a),octave:n,x:u,y:f,absScore:Math.abs(a)})}}return t}_applyPrune(e){let s=zn,t=this.maxFeaturesPerBucket,n=[];for(let i=0;i<s*s;i++)n.push([]);for(let i of e){let l=Math.min(s-1,Math.floor(i.x/(this.width/Math.pow(2,i.octave))*s)),h=Math.min(s-1,Math.floor(i.y/(this.height/Math.pow(2,i.octave))*s))*s+l;h>=0&&h<n.length&&n[h].push(i)}let o=[];for(let i of n){i.sort((l,c)=>c.absScore-l.absScore);for(let l=0;l<Math.min(t,i.length);l++)o.push(i[l])}return o}_computeOrientations(e,s){for(let t of e){if(t.octave<0||t.octave>=s.length){t.angle=0;continue}let n=s[t.octave][1],o=n.width,i=n.height,l=n.data,c=Math.floor(t.x),h=Math.floor(t.y),f=new Float32Array(Ot),u=4;for(let w=-u;w<=u;w++)for(let m=-u;m<=u;m++){let y=h+w,d=c+m;if(y<=0||y>=i-1||d<=0||d>=o-1)continue;let g=l[(y+1)*o+d]-l[(y-1)*o+d],b=l[y*o+d+1]-l[y*o+d-1],x=Math.sqrt(b*b+g*g),M=Math.atan2(g,b)+Math.PI,k=Math.floor(M/(2*Math.PI)*Ot)%Ot,E=Math.exp(-(m*m+w*w)/(2*u*u));f[k]+=x*E}let a=0;for(let w=1;w<Ot;w++)f[w]>f[a]&&(a=w);t.angle=(a+.5)*2*Math.PI/Ot-Math.PI}}_computeFreakDescriptors(e,s){for(let t of e){if(t.octave<0||t.octave>=s.length){t.descriptors=new Uint8Array(8);continue}let n=s[t.octave][1],o=n.width,i=n.height,l=n.data,c=Math.cos(t.angle||0)*hs,h=Math.sin(t.angle||0)*hs,f=new Float32Array(pt.length);for(let u=0;u<pt.length;u++){let[,a,w]=pt[u],m=t.x+a*c-w*h,y=t.y+a*h+w*c,d=Math.max(0,Math.min(o-2,Math.floor(m))),g=Math.max(0,Math.min(i-2,Math.floor(y))),b=d+1,x=g+1,M=m-d,k=y-g;f[u]=l[g*o+d]*(1-M)*(1-k)+l[g*o+b]*M*(1-k)+l[x*o+d]*(1-M)*k+l[x*o+b]*M*k}this.useLSH?(t.lsh=rs(f),t.descriptors=ls(t.lsh)):t.descriptors=is(f)}}};var us=null,Ee=!1,fs=null,Ie=null,as=null,gs=null;onmessage=r=>{let{data:e}=r;switch(e.type){case"setup":us=e.matchingDataList,Ee=e.debugMode,fs=new Zt(e.inputWidth,e.inputHeight,Ee),Ie=new te(e.projectionTransform),e.trackingDataList&&e.markerDimensions&&(as=new ee(e.markerDimensions,e.trackingDataList,e.projectionTransform,e.inputWidth,e.inputHeight,Ee)),gs=new oe(e.inputWidth,e.inputHeight,{useLSH:!0,maxFeaturesPerBucket:24});break;case"match":let s=e.targetIndexes,t=-1,n=null,o=null,i=null,l=null,c=e.featurePoints;e.inputData&&(c=gs.detect(e.inputData,{octavesToProcess:e.octavesToProcess}).featurePoints);for(let b=0;b<s.length;b++){let x=s[b],M=fs.matchDetection(us[x],c,e.expectedScale);if(l=M.debugExtra||{},M.keyframeIndex!==-1||M.isDeformable){let k=M.isDeformable?M.inliers.map(v=>v.querypoint):M.screenCoords,E=M.isDeformable?M.inliers.map(v=>v.keypoint):M.worldCoords,R=Ie.estimate({screenCoords:k,worldCoords:E});if(R)t=x,n=R,o=k,i=E,M.isDeformable&&(l.isDeformable=!0,l.deformableModel=M.model);else{t=-1;continue}break}}postMessage({type:"matchDone",targetIndex:t,modelViewTransform:n,screenCoords:o,worldCoords:i,featurePoints:c,debugExtra:l});break;case"track":let{inputData:h,lastModelViewTransform:f,targetIndex:u}=e,a=as.track(h,f,u);postMessage({type:"trackDone",targetIndex:u,...a});break;case"trackUpdate":let{modelViewTransform:w,worldCoords:m,screenCoords:y,stabilities:d}=e,g=Ie.refineEstimate({initialModelViewTransform:w,worldCoords:m,screenCoords:y,stabilities:d});postMessage({type:"trackUpdateDone",modelViewTransform:g});break;case"dispose":close();break;default:postMessage({type:"error",error:`Invalid message type \'${e.type}\'`})}};})();\n';

// src/runtime/controller.ts
function createDefaultWorker() {
  if (typeof window === "undefined" || typeof Worker === "undefined" || typeof Blob === "undefined" || typeof URL === "undefined") {
    return null;
  }
  if (!WORKER_CODE) return null;
  try {
    const blob = new Blob([WORKER_CODE], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
  } catch {
    return null;
  }
}
var DEFAULT_FILTER_CUTOFF = AR_CONFIG.ONE_EURO_FILTER_CUTOFF;
var DEFAULT_FILTER_BETA = AR_CONFIG.ONE_EURO_FILTER_BETA;
var DEFAULT_WARMUP_TOLERANCE = AR_CONFIG.WARMUP_TOLERANCE;
var DEFAULT_MISS_TOLERANCE = AR_CONFIG.MISS_TOLERANCE;
var WORKER_TIMEOUT_MS = 1e3;
var loopIdCounter = 0;
var Controller = class {
  inputWidth;
  inputHeight;
  maxTrack = 1;
  inputLoader;
  markerDimensions = null;
  onUpdate;
  debugMode;
  processingVideo = false;
  interestedTargetIndex = -1;
  trackingStates = [];
  worker;
  projectionTransform;
  projectionMatrix;
  tracker = null;
  matchingDataList;
  workerMatchDone = null;
  workerTrackDone = null;
  workerFullTrackDone = null;
  mainThreadMatcher;
  mainThreadEstimator;
  featureManager;
  fullDetector = null;
  constructor({
    inputWidth,
    inputHeight,
    onUpdate = null,
    debugMode = false,
    maxTrack,
    warmupTolerance = null,
    missTolerance = null,
    filterMinCF = null,
    filterBeta = null,
    worker = null
  }) {
    this.inputWidth = inputWidth;
    this.inputHeight = inputHeight;
    if (maxTrack !== void 0) {
      this.maxTrack = maxTrack;
    }
    this.featureManager = new FeatureManager();
    this.featureManager.addFeature(new OneEuroFilterFeature(
      filterMinCF === null ? DEFAULT_FILTER_CUTOFF : filterMinCF,
      filterBeta === null ? DEFAULT_FILTER_BETA : filterBeta
    ));
    this.featureManager.addFeature(new TemporalFilterFeature(
      warmupTolerance === null ? DEFAULT_WARMUP_TOLERANCE : warmupTolerance,
      missTolerance === null ? DEFAULT_MISS_TOLERANCE : missTolerance
    ));
    this.featureManager.addFeature(new AutoRotationFeature());
    this.inputLoader = new InputLoader(this.inputWidth, this.inputHeight);
    this.onUpdate = onUpdate;
    this.debugMode = debugMode;
    this.worker = worker;
    if (this.worker) this._setupWorkerListener();
    this.fullDetector = new DetectorLite(this.inputWidth, this.inputHeight, {
      useLSH: AR_CONFIG.USE_LSH,
      maxFeaturesPerBucket: AR_CONFIG.MAX_FEATURES_PER_BUCKET
    });
    const near = AR_CONFIG.DEFAULT_NEAR;
    const far = AR_CONFIG.DEFAULT_FAR;
    const fovy = AR_CONFIG.DEFAULT_FOVY * Math.PI / 180;
    const f = this.inputHeight / 2 / Math.tan(fovy / 2);
    this.projectionTransform = [
      [f, 0, this.inputWidth / 2],
      [0, f, this.inputHeight / 2],
      [0, 0, 1]
    ];
    this.featureManager.init({
      inputWidth: this.inputWidth,
      inputHeight: this.inputHeight,
      projectionTransform: this.projectionTransform,
      debugMode: this.debugMode
    });
    this.projectionMatrix = this._glProjectionMatrix({
      projectionTransform: this.projectionTransform,
      width: this.inputWidth,
      height: this.inputHeight,
      near,
      far
    });
  }
  _setupWorkerListener() {
    if (!this.worker) return;
    this.worker.onmessage = (e) => {
      if (e.data.type === "matchDone" && this.workerMatchDone !== null) {
        this.workerMatchDone(e.data);
      }
      if (e.data.type === "trackDone" && this.workerFullTrackDone !== null) {
        this.workerFullTrackDone(e.data);
      }
      if (e.data.type === "trackUpdateDone" && this.workerTrackDone !== null) {
        this.workerTrackDone(e.data);
      }
    };
  }
  _ensureWorker() {
    if (this.worker) return;
    this.worker = createDefaultWorker();
    if (this.worker) {
      this._setupWorkerListener();
    }
  }
  async addImageTargets(fileURLs) {
    const urls = Array.isArray(fileURLs) ? fileURLs : [fileURLs];
    const buffers = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        return response.arrayBuffer();
      })
    );
    return await this.addImageTargetsFromBuffers(buffers);
  }
  async addImageTargetsFromBuffers(buffers) {
    const allTrackingData = [];
    const allMatchingData = [];
    const allDimensions = [];
    const MAGIC2 = new Uint8Array([84, 65, 82, 90]);
    for (const buffer of buffers) {
      let data = new Uint8Array(buffer);
      if (data.length >= 4 && data[0] === MAGIC2[0] && data[1] === MAGIC2[1] && data[2] === MAGIC2[2] && data[3] === MAGIC2[3]) {
        try {
          if (typeof DecompressionStream !== "undefined" && typeof Response !== "undefined") {
            const ds = new DecompressionStream("deflate");
            const writer = ds.writable.getWriter();
            writer.write(data.subarray(MAGIC2.length));
            writer.close();
            const decompressedBuffer = await new Response(ds.readable).arrayBuffer();
            data = new Uint8Array(decompressedBuffer);
          } else {
            const { unzlibSync: unzlibSync2 } = await Promise.resolve().then(() => (init_browser(), browser_exports));
            data = unzlibSync2(data.subarray(MAGIC2.length));
          }
        } catch {
          const { unzlibSync: unzlibSync2 } = await Promise.resolve().then(() => (init_browser(), browser_exports));
          data = unzlibSync2(data.subarray(MAGIC2.length));
        }
      }
      const alignedBuffer = new Uint8Array(
        data.buffer,
        data.byteOffset,
        data.byteLength
      );
      const result = decodeTaar(alignedBuffer);
      const dataList = result.dataList || [];
      for (const item of dataList) {
        allMatchingData.push(item.matchingData);
        allTrackingData.push(item.trackingData);
        allDimensions.push([item.targetImage.width, item.targetImage.height]);
      }
    }
    this.tracker = new Tracker(
      allDimensions,
      allTrackingData,
      this.projectionTransform,
      this.inputWidth,
      this.inputHeight,
      this.debugMode
    );
    this._ensureWorker();
    if (this.worker) {
      this.worker.postMessage({
        type: "setup",
        inputWidth: this.inputWidth,
        inputHeight: this.inputHeight,
        projectionTransform: this.projectionTransform,
        debugMode: this.debugMode,
        matchingDataList: allMatchingData,
        trackingDataList: allTrackingData,
        markerDimensions: allDimensions
      });
    }
    this.markerDimensions = allDimensions;
    this.matchingDataList = allMatchingData;
    this.maxTrack = allDimensions.length;
    return { dimensions: allDimensions, matchingDataList: allMatchingData, trackingDataList: allTrackingData };
  }
  async addImageTargetsFromBuffer(buffer) {
    return await this.addImageTargetsFromBuffers([buffer]);
  }
  dispose() {
    this.stopProcessVideo();
    if (this.worker) {
      this.worker.postMessage({ type: "dispose" });
      this.worker = null;
    }
  }
  dummyRun(input) {
    const inputData = this.inputLoader.loadInput(input);
    this.fullDetector?.detect(inputData);
    if (this.tracker) this.tracker.dummyRun(inputData);
  }
  getProjectionMatrix() {
    return this.projectionMatrix;
  }
  getRotatedZ90Matrix(m) {
    return [
      -m[1],
      m[0],
      m[2],
      m[3],
      -m[5],
      m[4],
      m[6],
      m[7],
      -m[9],
      m[8],
      m[10],
      m[11],
      -m[13],
      m[12],
      m[14],
      m[15]
    ];
  }
  getWorldMatrix(modelViewTransform, targetIndex) {
    return this._glModelViewMatrix(modelViewTransform, targetIndex);
  }
  async _detectAndMatch(inputData, targetIndexes) {
    let predictedScale = void 0;
    for (const state of this.trackingStates) {
      if (state.isTracking && state.currentModelViewTransform) {
        const m = state.currentModelViewTransform;
        predictedScale = Math.sqrt(m[0][0] ** 2 + m[1][0] ** 2 + m[2][0] ** 2);
        break;
      }
    }
    let coarseOctave = 0;
    let w = this.inputWidth;
    const maxOctaves = this.fullDetector?.numOctaves || 1;
    while (w > 320 && coarseOctave < maxOctaves - 1) {
      w = w >> 1;
      coarseOctave++;
    }
    const { targetIndex, modelViewTransform, screenCoords, worldCoords, featurePoints, debugExtra } = await this._workerMatch(
      null,
      // No feature points, worker will detect from inputData
      targetIndexes,
      inputData,
      predictedScale,
      [coarseOctave]
    );
    return { targetIndex, modelViewTransform, screenCoords, worldCoords, featurePoints, debugExtra };
  }
  async _trackAndUpdate(inputData, lastModelViewTransform, targetIndex) {
    const { worldCoords, screenCoords, reliabilities, indices = [], octaveIndex = 0, deformedMesh } = await this._workerTrack(
      inputData,
      lastModelViewTransform,
      targetIndex
    );
    if (!worldCoords || worldCoords.length === 0) {
      return { modelViewTransform: null, screenCoords: [], reliabilities: [], stabilities: [], deformedMesh: null };
    }
    const state = this.trackingStates[targetIndex];
    if (!state.pointStabilities) state.pointStabilities = [];
    if (!state.lastScreenCoords) state.lastScreenCoords = [];
    if (!state.pointStabilities[octaveIndex]) {
      const octaveData = this.tracker?.prebuiltData?.[targetIndex]?.[octaveIndex];
      if (!octaveData) return { modelViewTransform: null, screenCoords: [], worldCoords: [], reliabilities: [], debugExtra: {} };
      const numPoints = octaveData.px.length;
      state.pointStabilities[octaveIndex] = new Float32Array(numPoints).fill(0);
      state.lastScreenCoords[octaveIndex] = new Array(numPoints).fill(null);
    }
    const stabilities = state.pointStabilities[octaveIndex];
    const lastCoords = state.lastScreenCoords[octaveIndex];
    for (let i = 0; i < stabilities.length; i++) {
      const isCurrentlyTracked = indices.includes(i);
      if (isCurrentlyTracked) {
        const idxInResult = indices.indexOf(i);
        stabilities[i] = Math.min(1, stabilities[i] + 0.4);
        lastCoords[i] = screenCoords[idxInResult];
      } else {
        stabilities[i] = Math.max(0, stabilities[i] - 0.08);
      }
    }
    const finalScreenCoords = [];
    const finalReliabilities = [];
    const finalStabilities = [];
    const finalWorldCoords = [];
    const trackedGlobalIndices = [];
    for (let i = 0; i < stabilities.length; i++) {
      if (stabilities[i] > 0) {
        const isCurrentlyTracked = indices.includes(i);
        finalScreenCoords.push({
          x: lastCoords[i].x,
          y: lastCoords[i].y,
          id: i
          // Unique index from tracker
        });
        finalStabilities.push(stabilities[i]);
        if (isCurrentlyTracked) {
          const idxInResult = indices.indexOf(i);
          finalReliabilities.push(reliabilities[idxInResult]);
          finalWorldCoords.push(worldCoords[idxInResult]);
          trackedGlobalIndices.push(i);
        } else {
          finalReliabilities.push(0);
        }
      }
    }
    const isWarmup = state.trackCount < 15;
    const numTracked = finalWorldCoords.length;
    const minPoints = isWarmup ? 4 : 5;
    if (numTracked < minPoints) {
      return {
        modelViewTransform: null,
        screenCoords: finalScreenCoords,
        reliabilities: finalReliabilities,
        stabilities: finalStabilities
      };
    }
    state.trackCount++;
    const modelViewTransform = await this._workerTrackUpdate(lastModelViewTransform, {
      worldCoords: finalWorldCoords,
      screenCoords: trackedGlobalIndices.map((globalIdx) => lastCoords[globalIdx]),
      stabilities: trackedGlobalIndices.map((globalIdx) => stabilities[globalIdx]),
      deformedMesh
    });
    return {
      modelViewTransform,
      screenCoords: finalScreenCoords,
      reliabilities: finalReliabilities,
      stabilities: finalStabilities,
      deformedMesh,
      octaveIndex
      // Pass this up for the orchestrator
    };
  }
  processVideo(input) {
    if (this.processingVideo) return;
    this.processingVideo = true;
    const currentLoopId = ++loopIdCounter;
    this.trackingStates = [];
    for (let i = 0; i < (this.markerDimensions?.length || 0); i++) {
      this.trackingStates.push({
        showing: false,
        isTracking: false,
        currentModelViewTransform: null,
        trackCount: 0,
        trackMiss: 0
      });
    }
    const startProcessing = async () => {
      while (true) {
        if (!this.processingVideo || currentLoopId !== loopIdCounter) break;
        const inputData = this.inputLoader.loadInput(input);
        const nTracking = this.trackingStates.reduce((acc, s) => acc + (!!s.isTracking ? 1 : 0), 0);
        if (nTracking < this.maxTrack) {
          const matchingIndexes = [];
          for (let i = 0; i < this.trackingStates.length; i++) {
            const trackingState = this.trackingStates[i];
            if (trackingState.isTracking === true) continue;
            if (this.interestedTargetIndex !== -1 && this.interestedTargetIndex !== i) continue;
            matchingIndexes.push(i);
          }
          const { targetIndex: matchedTargetIndex, modelViewTransform, featurePoints, debugExtra } = await this._detectAndMatch(inputData, matchingIndexes);
          if (matchedTargetIndex !== -1) {
            this.trackingStates[matchedTargetIndex].isTracking = true;
            this.trackingStates[matchedTargetIndex].currentModelViewTransform = modelViewTransform;
            if (debugExtra && debugExtra.isDeformable) {
              this.trackingStates[matchedTargetIndex].isDeformable = true;
              this.trackingStates[matchedTargetIndex].deformableModel = debugExtra.deformableModel;
            } else {
              this.trackingStates[matchedTargetIndex].isDeformable = false;
              this.trackingStates[matchedTargetIndex].deformableModel = null;
            }
          }
          this.onUpdate && this.onUpdate({ type: "featurePoints", featurePoints });
        }
        for (let i = 0; i < this.trackingStates.length; i++) {
          const trackingState = this.trackingStates[i];
          if (trackingState.isTracking) {
            const result = await this._trackAndUpdate(
              inputData,
              trackingState.currentModelViewTransform,
              i
            );
            if (result === null || result.modelViewTransform === null) {
              trackingState.isTracking = false;
              trackingState.screenCoords = result?.screenCoords || [];
              trackingState.reliabilities = result?.reliabilities || [];
              trackingState.stabilities = result?.stabilities || [];
            } else {
              trackingState.currentModelViewTransform = result.modelViewTransform;
              trackingState.screenCoords = result.screenCoords;
              trackingState.reliabilities = result.reliabilities;
              trackingState.stabilities = result.stabilities;
              trackingState.deformedMesh = result.deformedMesh;
            }
          }
          const wasShowing = trackingState.showing;
          trackingState.showing = this.featureManager.shouldShow(i, trackingState.isTracking);
          if (wasShowing && !trackingState.showing) {
            trackingState.trackingMatrix = null;
            this.featureManager.notifyUpdate({ type: "reset", targetIndex: i });
          }
          if (trackingState.showing || trackingState.screenCoords && trackingState.screenCoords.length > 0 || wasShowing && !trackingState.showing) {
            const worldMatrix = trackingState.showing && trackingState.currentModelViewTransform ? this._glModelViewMatrix(trackingState.currentModelViewTransform, i) : null;
            let finalMatrix = null;
            if (worldMatrix) {
              const stabilities = trackingState.stabilities || [];
              const avgStability = stabilities.length > 0 ? stabilities.reduce((a, b) => a + b, 0) / stabilities.length : 0;
              const filteredMatrix = this.featureManager.applyWorldMatrixFilters(i, worldMatrix, { stability: avgStability });
              trackingState.trackingMatrix = filteredMatrix;
              finalMatrix = [...filteredMatrix];
              const isInputRotated = input.width === this.inputHeight && input.height === this.inputWidth;
              if (isInputRotated) {
                const rotationFeature = this.featureManager.getFeature("auto-rotation");
                if (rotationFeature) {
                  finalMatrix = rotationFeature.rotate(finalMatrix);
                }
              }
            }
            this.onUpdate && this.onUpdate({
              type: "updateMatrix",
              targetIndex: i,
              worldMatrix: finalMatrix,
              modelViewTransform: trackingState.currentModelViewTransform,
              screenCoords: trackingState.screenCoords,
              reliabilities: trackingState.reliabilities,
              stabilities: trackingState.stabilities,
              deformedMesh: trackingState.deformedMesh
            });
          }
        }
        this.onUpdate && this.onUpdate({ type: "processDone" });
        if (typeof requestAnimationFrame !== "undefined") {
          await new Promise(requestAnimationFrame);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 16));
        }
      }
    };
    startProcessing();
  }
  stopProcessVideo() {
    this.processingVideo = false;
  }
  async detect(input) {
    const inputData = this.inputLoader.loadInput(input);
    const { featurePoints } = this.fullDetector.detect(inputData);
    return { featurePoints, debugExtra: {} };
  }
  async match(featurePoints, targetIndex) {
    const { targetIndex: matchedTargetIndex, modelViewTransform, screenCoords, worldCoords, debugExtra } = await this._workerMatch(featurePoints, [
      targetIndex
    ]);
    return { targetIndex: matchedTargetIndex, modelViewTransform, screenCoords, worldCoords, debugExtra };
  }
  async track(input, modelViewTransform, targetIndex) {
    const inputData = this.inputLoader.loadInput(input);
    return this.tracker.track(inputData, modelViewTransform, targetIndex);
  }
  async trackUpdate(modelViewTransform, trackFeatures) {
    if (trackFeatures.worldCoords.length < 4) return null;
    return this._workerTrackUpdate(modelViewTransform, trackFeatures);
  }
  _workerMatch(featurePoints, targetIndexes, inputData = null, expectedScale, octavesToProcess) {
    return new Promise((resolve) => {
      if (!this.worker) {
        let fpPromise;
        if (!featurePoints && inputData) {
          fpPromise = Promise.resolve(this.fullDetector.detect(inputData, { octavesToProcess }).featurePoints);
        } else {
          fpPromise = Promise.resolve(featurePoints);
        }
        fpPromise.then((fp) => {
          this._matchOnMainThread(fp, targetIndexes, expectedScale).then(resolve);
        }).catch(() => resolve({ targetIndex: -1 }));
        return;
      }
      const timeout = setTimeout(() => {
        this.workerMatchDone = null;
        resolve({ targetIndex: -1 });
      }, WORKER_TIMEOUT_MS);
      this.workerMatchDone = (data) => {
        clearTimeout(timeout);
        this.workerMatchDone = null;
        resolve({
          targetIndex: data.targetIndex,
          modelViewTransform: data.modelViewTransform,
          screenCoords: data.screenCoords,
          worldCoords: data.worldCoords,
          featurePoints: data.featurePoints,
          debugExtra: data.debugExtra
        });
      };
      if (inputData) {
        this.worker.postMessage({ type: "match", inputData, targetIndexes, expectedScale, octavesToProcess });
      } else {
        this.worker.postMessage({ type: "match", featurePoints, targetIndexes, expectedScale, octavesToProcess });
      }
    });
  }
  _workerTrack(inputData, lastModelViewTransform, targetIndex) {
    return new Promise((resolve) => {
      if (!this.worker) {
        resolve(this.tracker.track(inputData, lastModelViewTransform, targetIndex));
        return;
      }
      const timeout = setTimeout(() => {
        this.workerFullTrackDone = null;
        resolve({ worldCoords: [], screenCoords: [], reliabilities: [] });
      }, WORKER_TIMEOUT_MS);
      this.workerFullTrackDone = (data) => {
        clearTimeout(timeout);
        this.workerFullTrackDone = null;
        resolve(data);
      };
      this.worker.postMessage({
        type: "track",
        inputData,
        lastModelViewTransform,
        targetIndex
      });
    });
  }
  async _matchOnMainThread(featurePoints, targetIndexes, expectedScale) {
    if (!this.mainThreadMatcher) {
      const { Matcher: Matcher2 } = await Promise.resolve().then(() => (init_matcher(), matcher_exports));
      const { Estimator: Estimator2 } = await Promise.resolve().then(() => (init_estimator(), estimator_exports));
      this.mainThreadMatcher = new Matcher2(this.inputWidth, this.inputHeight, this.debugMode);
      this.mainThreadEstimator = new Estimator2(this.projectionTransform);
    }
    let matchedTargetIndex = -1;
    let matchedModelViewTransform = null;
    let matchedScreenCoords = null;
    let matchedWorldCoords = null;
    let matchedDebugExtra = null;
    for (let i = 0; i < targetIndexes.length; i++) {
      const matchingIndex = targetIndexes[i];
      const result = this.mainThreadMatcher.matchDetection(
        this.matchingDataList[matchingIndex],
        featurePoints,
        expectedScale
      );
      matchedDebugExtra = result.debugExtra || {};
      if (result.keyframeIndex !== -1 || result.isDeformable) {
        const screenCoords = result.isDeformable ? result.inliers.map((m) => m.querypoint) : result.screenCoords;
        const worldCoords = result.isDeformable ? result.inliers.map((m) => m.keypoint) : result.worldCoords;
        const modelViewTransform = this.mainThreadEstimator.estimate({ screenCoords, worldCoords });
        if (modelViewTransform) {
          matchedTargetIndex = matchingIndex;
          matchedModelViewTransform = modelViewTransform;
          matchedScreenCoords = screenCoords;
          matchedWorldCoords = worldCoords;
          if (result.isDeformable) {
            matchedDebugExtra.isDeformable = true;
            matchedDebugExtra.deformableModel = result.model;
          }
        } else {
          matchedTargetIndex = -1;
          continue;
        }
        break;
      }
    }
    return {
      targetIndex: matchedTargetIndex,
      modelViewTransform: matchedModelViewTransform,
      screenCoords: matchedScreenCoords,
      worldCoords: matchedWorldCoords,
      debugExtra: matchedDebugExtra
    };
  }
  _workerTrackUpdate(modelViewTransform, trackingFeatures) {
    return new Promise((resolve) => {
      if (!this.worker) {
        this._trackUpdateOnMainThread(modelViewTransform, trackingFeatures).then(resolve).catch(() => resolve(null));
        return;
      }
      const timeout = setTimeout(() => {
        this.workerTrackDone = null;
        resolve(null);
      }, WORKER_TIMEOUT_MS);
      this.workerTrackDone = (data) => {
        clearTimeout(timeout);
        this.workerTrackDone = null;
        resolve(data.modelViewTransform);
      };
      const { worldCoords, screenCoords, stabilities } = trackingFeatures;
      this.worker.postMessage({
        type: "trackUpdate",
        modelViewTransform,
        worldCoords,
        screenCoords,
        stabilities
      });
    });
  }
  async _trackUpdateOnMainThread(modelViewTransform, trackingFeatures) {
    if (!this.mainThreadEstimator) {
      const { Estimator: Estimator2 } = await Promise.resolve().then(() => (init_estimator(), estimator_exports));
      this.mainThreadEstimator = new Estimator2(this.projectionTransform);
    }
    const { worldCoords, screenCoords, stabilities } = trackingFeatures;
    return this.mainThreadEstimator.refineEstimate({
      initialModelViewTransform: modelViewTransform,
      worldCoords,
      screenCoords,
      stabilities
    });
  }
  _glModelViewMatrix(modelViewTransform, targetIndex) {
    return [
      modelViewTransform[0][0],
      -modelViewTransform[1][0],
      -modelViewTransform[2][0],
      0,
      modelViewTransform[0][1],
      -modelViewTransform[1][1],
      -modelViewTransform[2][1],
      0,
      modelViewTransform[0][2],
      -modelViewTransform[1][2],
      -modelViewTransform[2][2],
      0,
      modelViewTransform[0][3],
      -modelViewTransform[1][3],
      -modelViewTransform[2][3],
      1
    ];
  }
  _glProjectionMatrix({ projectionTransform, width, height, near, far }) {
    const proj = [
      [2 * projectionTransform[0][0] / width, 0, -(2 * projectionTransform[0][2] / width - 1), 0],
      [0, 2 * projectionTransform[1][1] / height, -(2 * projectionTransform[1][2] / height - 1), 0],
      [0, 0, -(far + near) / (far - near), -2 * far * near / (far - near)],
      [0, 0, -1, 0]
    ];
    const projMatrix = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        projMatrix.push(proj[j][i]);
      }
    }
    return projMatrix;
  }
};

// src/core/perception/foveal-attention.js
var FovealAttention = class {
  /**
   * @param {number} width - Input image width
   * @param {number} height - Input image height
   * @param {Object} config - Configuration
   */
  constructor(width, height, config) {
    this.width = width;
    this.height = height;
    this.config = config;
    this.minDim = Math.min(width, height);
    this.foveaRadius = Math.floor(this.minDim * config.FOVEA_RADIUS_RATIO);
    this.parafoveaRadius = Math.floor(this.minDim * config.PARAFOVEA_RADIUS_RATIO);
    this._initBuffers();
  }
  /**
   * Initialize pre-allocated extraction buffers
   * @private
   */
  _initBuffers() {
    const foveaDiam = this.foveaRadius * 2;
    this.foveaBuffer = new Uint8Array(foveaDiam * foveaDiam);
    const parafoveaDiam = this.parafoveaRadius * 2;
    const parafoveaScaled = Math.ceil(parafoveaDiam * this.config.PARAFOVEA_RESOLUTION);
    this.parafoveaBuffer = new Uint8Array(parafoveaScaled * parafoveaScaled);
    const periphW = Math.ceil(this.width * this.config.PERIPHERY_RESOLUTION);
    const periphH = Math.ceil(this.height * this.config.PERIPHERY_RESOLUTION);
    this.peripheryBuffer = new Uint8Array(periphW * periphH);
    this.peripheryDims = { width: periphW, height: periphH };
    this._buildCircularMask();
  }
  /**
   * Build a circular mask for foveal extraction
   * @private
   */
  _buildCircularMask() {
    const r = this.foveaRadius;
    const size = r * 2;
    this.circularMask = new Uint8Array(size * size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - r;
        const dy = y - r;
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.circularMask[y * size + x] = dist <= r ? 1 : 0;
      }
    }
  }
  /**
   * Extract attention region at specified center
   * 
   * @param {Uint8Array} inputData - Grayscale input image
   * @param {number} centerX - X coordinate of attention center
   * @param {number} centerY - Y coordinate of attention center
   * @param {number} priority - Priority level (0=highest)
   * @returns {AttentionRegion} Extracted region
   */
  extract(inputData, centerX, centerY, priority = 0) {
    centerX = Math.max(this.foveaRadius, Math.min(this.width - this.foveaRadius - 1, centerX));
    centerY = Math.max(this.foveaRadius, Math.min(this.height - this.foveaRadius - 1, centerY));
    if (priority === 0) {
      return this._extractFovea(inputData, centerX, centerY);
    } else if (priority === 1) {
      return this._extractParafovea(inputData, centerX, centerY);
    } else {
      return this._extractPeriphery(inputData);
    }
  }
  /**
   * Extract foveal region at full resolution
   * @private
   */
  _extractFovea(inputData, cx, cy) {
    const r = this.foveaRadius;
    const diam = r * 2;
    const buffer = this.foveaBuffer;
    let idx = 0;
    let validPixels = 0;
    for (let dy = -r; dy < r; dy++) {
      const y = cy + dy;
      const rowStart = y * this.width;
      for (let dx = -r; dx < r; dx++) {
        const maskIdx = (dy + r) * diam + (dx + r);
        if (this.circularMask[maskIdx]) {
          const x = cx + dx;
          buffer[idx] = inputData[rowStart + x];
          validPixels++;
        } else {
          buffer[idx] = 0;
        }
        idx++;
      }
    }
    return {
      x: cx,
      y: cy,
      radius: r,
      resolution: this.config.FOVEA_RESOLUTION,
      data: buffer,
      width: diam,
      height: diam,
      pixelCount: validPixels,
      type: "fovea",
      // Transform helpers
      toOriginalCoord: (localX, localY) => ({
        x: cx - r + localX,
        y: cy - r + localY
      }),
      toLocalCoord: (origX, origY) => ({
        x: origX - (cx - r),
        y: origY - (cy - r)
      })
    };
  }
  /**
   * Extract parafoveal region at half resolution
   * @private
   */
  _extractParafovea(inputData, cx, cy) {
    const r = this.parafoveaRadius;
    const res = this.config.PARAFOVEA_RESOLUTION;
    const scaledR = Math.ceil(r * res);
    const scaledDiam = scaledR * 2;
    const buffer = this.parafoveaBuffer;
    const step = Math.round(1 / res);
    let idx = 0;
    let validPixels = 0;
    for (let sy = 0; sy < scaledDiam; sy++) {
      const y = cy - r + Math.floor(sy / res);
      if (y < 0 || y >= this.height) {
        idx += scaledDiam;
        continue;
      }
      const rowStart = y * this.width;
      for (let sx = 0; sx < scaledDiam; sx++) {
        const x = cx - r + Math.floor(sx / res);
        if (x < 0 || x >= this.width) {
          buffer[idx++] = 0;
          continue;
        }
        buffer[idx++] = inputData[rowStart + x];
        validPixels++;
      }
    }
    return {
      x: cx,
      y: cy,
      radius: r,
      resolution: res,
      data: buffer,
      width: scaledDiam,
      height: scaledDiam,
      pixelCount: validPixels,
      type: "parafovea",
      toOriginalCoord: (localX, localY) => ({
        x: cx - r + localX / res,
        y: cy - r + localY / res
      }),
      toLocalCoord: (origX, origY) => ({
        x: (origX - (cx - r)) * res,
        y: (origY - (cy - r)) * res
      })
    };
  }
  /**
   * Extract periphery at quarter resolution (motion detection only)
   * @private
   */
  _extractPeriphery(inputData) {
    const res = this.config.PERIPHERY_RESOLUTION;
    const outW = this.peripheryDims.width;
    const outH = this.peripheryDims.height;
    const buffer = this.peripheryBuffer;
    const step = Math.round(1 / res);
    let idx = 0;
    for (let y = 0; y < this.height; y += step) {
      const rowStart = y * this.width;
      for (let x = 0; x < this.width; x += step) {
        if (idx < buffer.length) {
          buffer[idx++] = inputData[rowStart + x];
        }
      }
    }
    return {
      x: this.width / 2,
      y: this.height / 2,
      radius: Math.max(this.width, this.height) / 2,
      resolution: res,
      data: buffer,
      width: outW,
      height: outH,
      pixelCount: outW * outH,
      type: "periphery",
      toOriginalCoord: (localX, localY) => ({
        x: localX / res,
        y: localY / res
      }),
      toLocalCoord: (origX, origY) => ({
        x: origX * res,
        y: origY * res
      })
    };
  }
  /**
   * Get combined multi-resolution representation
   * Uses fovea at center, parafovea around it, periphery for the rest
   * 
   * @param {Uint8Array} inputData - Input image
   * @param {number} cx - Fovea center X
   * @param {number} cy - Fovea center Y
   * @returns {Object} Multi-resolution representation
   */
  extractMultiResolution(inputData, cx, cy) {
    return {
      fovea: this._extractFovea(inputData, cx, cy),
      parafovea: this._extractParafovea(inputData, cx, cy),
      periphery: this._extractPeriphery(inputData),
      center: { x: cx, y: cy },
      totalPixels: this._computeTotalPixels(),
      originalPixels: this.width * this.height
    };
  }
  /**
   * Compute total pixels in multi-resolution representation
   * @private
   */
  _computeTotalPixels() {
    const foveaPixels = Math.PI * this.foveaRadius ** 2;
    const parafoveaPixels = Math.PI * this.parafoveaRadius ** 2 * this.config.PARAFOVEA_RESOLUTION ** 2;
    const peripheryPixels = this.peripheryDims.width * this.peripheryDims.height;
    return Math.ceil(foveaPixels + parafoveaPixels + peripheryPixels);
  }
  /**
   * Update configuration
   * @param {Object} config - New configuration
   */
  configure(config) {
    this.config = { ...this.config, ...config };
    this.foveaRadius = Math.floor(this.minDim * config.FOVEA_RADIUS_RATIO);
    this.parafoveaRadius = Math.floor(this.minDim * config.PARAFOVEA_RADIUS_RATIO);
    this._initBuffers();
  }
};

// src/core/perception/saccadic-controller.js
var SaccadicController = class {
  /**
   * @param {number} width - Image width
   * @param {number} height - Image height
   * @param {Object} config - Configuration
   */
  constructor(width, height, config) {
    this.width = width;
    this.height = height;
    this.config = config;
    this.recentTargets = [];
    this.inhibitionRadius = Math.min(width, height) * 0.1;
    this.velocityHistory = [];
    this.lastCenter = { x: width / 2, y: height / 2 };
    this.gridCells = this._buildCoverageGrid(3, 3);
    this.lastVisitedCell = 4;
    this.lastSaccadeTime = 0;
    this.saccadeCount = 0;
  }
  /**
   * Build a grid for systematic coverage during tracking loss
   * @private
   */
  _buildCoverageGrid(rows, cols) {
    const cells = [];
    const cellW = this.width / cols;
    const cellH = this.height / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({
          x: cellW * (c + 0.5),
          y: cellH * (r + 0.5),
          index: r * cols + c,
          lastVisit: 0
        });
      }
    }
    return cells;
  }
  /**
   * Compute saccade targets based on current state
   * 
   * @param {Object} saliency - Saliency map result
   * @param {Object} currentFovea - Current fovea center {x, y}
   * @param {Object} trackingState - Current tracking state (optional)
   * @returns {SaccadeTarget[]} Priority-ordered list of targets
   */
  computeTargets(saliency, currentFovea, trackingState = null) {
    const targets2 = [];
    const maxTargets = this.config.MAX_SACCADES_PER_FRAME;
    if (trackingState && trackingState.isTracking) {
      const predicted = this._predictTrackingCenter(trackingState);
      if (predicted) {
        targets2.push({
          x: predicted.x,
          y: predicted.y,
          priority: 0,
          reason: "tracking_prediction",
          saliency: 1
        });
      }
    }
    if (saliency && saliency.peaks) {
      for (const peak of saliency.peaks) {
        if (targets2.length >= maxTargets) break;
        if (this._isInhibited(peak.x, peak.y, targets2)) continue;
        if (peak.value > this.config.SALIENCY_THRESHOLD) {
          targets2.push({
            x: peak.x,
            y: peak.y,
            priority: targets2.length,
            reason: "saliency_peak",
            saliency: peak.value
          });
        }
      }
    }
    if (!trackingState?.isTracking && targets2.length < maxTargets) {
      const gridTarget = this._getNextGridCell();
      if (gridTarget && !this._isInhibited(gridTarget.x, gridTarget.y, targets2)) {
        targets2.push({
          x: gridTarget.x,
          y: gridTarget.y,
          priority: targets2.length,
          reason: "grid_search",
          saliency: 0.5
        });
      }
    }
    if (targets2.length === 0) {
      targets2.push({
        x: currentFovea.x,
        y: currentFovea.y,
        priority: 0,
        reason: "maintain_position",
        saliency: 0.3
      });
    }
    this._updateHistory(targets2);
    return targets2;
  }
  /**
   * Predict center of tracking based on current state and velocity
   * @private
   */
  _predictTrackingCenter(trackingState) {
    if (!trackingState.worldMatrix) return null;
    const matrix2 = trackingState.worldMatrix;
    const cx = matrix2[12] ?? this.width / 2;
    const cy = matrix2[13] ?? this.height / 2;
    if (this.velocityHistory.length >= 2) {
      const vx = this._computeAverageVelocity("x");
      const vy = this._computeAverageVelocity("y");
      return {
        x: Math.max(0, Math.min(this.width - 1, cx + vx)),
        y: Math.max(0, Math.min(this.height - 1, cy + vy))
      };
    }
    return { x: cx, y: cy };
  }
  /**
   * Compute average velocity from history
   * @private
   */
  _computeAverageVelocity(axis) {
    if (this.velocityHistory.length < 2) return 0;
    let sum = 0;
    for (let i = 1; i < this.velocityHistory.length; i++) {
      sum += this.velocityHistory[i][axis] - this.velocityHistory[i - 1][axis];
    }
    return sum / (this.velocityHistory.length - 1);
  }
  /**
   * Check if a location is inhibited (too close to recent targets)
   * @private
   */
  _isInhibited(x, y, currentTargets) {
    const r2 = this.inhibitionRadius ** 2;
    for (const t of currentTargets) {
      const dx = x - t.x;
      const dy = y - t.y;
      if (dx * dx + dy * dy < r2) return true;
    }
    for (const t of this.recentTargets) {
      const dx = x - t.x;
      const dy = y - t.y;
      if (dx * dx + dy * dy < r2) return true;
    }
    return false;
  }
  /**
   * Get next grid cell for systematic search
   * @private
   */
  _getNextGridCell() {
    let oldest = this.gridCells[0];
    let oldestTime = Infinity;
    for (const cell of this.gridCells) {
      if (cell.lastVisit < oldestTime) {
        oldestTime = cell.lastVisit;
        oldest = cell;
      }
    }
    oldest.lastVisit = Date.now();
    return oldest;
  }
  /**
   * Update history with new targets
   * @private
   */
  _updateHistory(targets2) {
    this.recentTargets.push(...targets2);
    const maxHistory = this.config.MOTION_HISTORY_FRAMES * this.config.MAX_SACCADES_PER_FRAME;
    while (this.recentTargets.length > maxHistory) {
      this.recentTargets.shift();
    }
    if (targets2.length > 0) {
      this.velocityHistory.push({ x: targets2[0].x, y: targets2[0].y });
      while (this.velocityHistory.length > this.config.MOTION_HISTORY_FRAMES) {
        this.velocityHistory.shift();
      }
      this.lastCenter = { x: targets2[0].x, y: targets2[0].y };
    }
    this.saccadeCount += targets2.length;
    this.lastSaccadeTime = Date.now();
  }
  /**
   * Get the most likely location of interest based on history
   * @returns {Object} {x, y} of predicted location
   */
  getPredictedLocation() {
    if (this.velocityHistory.length >= 2) {
      const vx = this._computeAverageVelocity("x");
      const vy = this._computeAverageVelocity("y");
      return {
        x: Math.max(0, Math.min(this.width - 1, this.lastCenter.x + vx)),
        y: Math.max(0, Math.min(this.height - 1, this.lastCenter.y + vy))
      };
    }
    return this.lastCenter;
  }
  /**
   * Reset controller state
   */
  reset() {
    this.recentTargets = [];
    this.velocityHistory = [];
    this.lastCenter = { x: this.width / 2, y: this.height / 2 };
    this.saccadeCount = 0;
    for (const cell of this.gridCells) {
      cell.lastVisit = 0;
    }
  }
  /**
   * Update configuration
   */
  configure(config) {
    const oldWidth = this.width;
    const oldHeight = this.height;
    this.config = { ...this.config, ...config };
    if (config.width !== void 0) this.width = config.width;
    if (config.height !== void 0) this.height = config.height;
    this.inhibitionRadius = Math.min(this.width, this.height) * 0.1;
    if (this.width !== oldWidth || this.height !== oldHeight) {
      this.gridCells = this._buildCoverageGrid(3, 3);
    }
  }
};

// src/core/perception/predictive-coding.js
var PredictiveCoding = class {
  /**
   * @param {number} width - Image width
   * @param {number} height - Image height  
   * @param {Object} config - Configuration
   */
  constructor(width, height, config) {
    this.width = width;
    this.height = height;
    this.config = config;
    this.frameHistory = [];
    this.stateHistory = [];
    this.motionModel = {
      vx: 0,
      // Velocity X
      vy: 0,
      // Velocity Y
      vtheta: 0,
      // Angular velocity
      vscale: 0,
      // Scale velocity
      confidence: 0
      // Model confidence
    };
    this.blockSize = 8;
    this.blocksX = Math.ceil(width / this.blockSize);
    this.blocksY = Math.ceil(height / this.blockSize);
    this.blockMeans = new Float32Array(this.blocksX * this.blocksY);
    this.prevBlockMeans = new Float32Array(this.blocksX * this.blocksY);
    this.consecutiveSkips = 0;
    this.maxConsecutiveSkips = 10;
  }
  /**
   * Predict whether current frame can be skipped
   * 
   * @param {Uint8Array} inputData - Current frame grayscale data
   * @param {Object} trackingState - Current tracking state
   * @returns {Object} Prediction result
   */
  predict(inputData, trackingState) {
    if (this.frameHistory.length < 2) {
      return { canSkip: false, confidence: 0, reason: "insufficient_history" };
    }
    if (this.consecutiveSkips >= this.maxConsecutiveSkips) {
      return { canSkip: false, confidence: 0, reason: "forced_refresh" };
    }
    const changeLevel = this.getChangeLevel(inputData);
    const threshold = trackingState?.isTracking ? this.config.CHANGE_THRESHOLD : this.config.CHANGE_THRESHOLD * 0.5;
    const canSkip = changeLevel < threshold;
    const confidence = canSkip ? Math.min(1, (threshold - changeLevel) / threshold) : 0;
    let predictedState = null;
    if (canSkip && trackingState) {
      predictedState = this._predictState(trackingState);
    }
    if (canSkip) {
      this.consecutiveSkips++;
    }
    return {
      canSkip,
      confidence,
      changeLevel,
      predictedState,
      reason: canSkip ? "low_change" : "significant_change"
    };
  }
  /**
   * Compute change level between current and previous frame
   * Uses block-based comparison for efficiency
   * 
   * @param {Uint8Array} inputData - Current frame
   * @returns {number} Change level (0-1)
   */
  getChangeLevel(inputData) {
    if (this.frameHistory.length === 0) {
      return 1;
    }
    for (let i = 0; i < this.blockMeans.length; i++) {
      this.prevBlockMeans[i] = this.blockMeans[i];
    }
    this._computeBlockMeans(inputData, this.blockMeans);
    let totalDiff = 0;
    let maxDiff = 0;
    const numBlocks = this.blocksX * this.blocksY;
    for (let i = 0; i < numBlocks; i++) {
      const diff = Math.abs(this.blockMeans[i] - this.prevBlockMeans[i]) / 255;
      totalDiff += diff;
      maxDiff = Math.max(maxDiff, diff);
    }
    const avgDiff = totalDiff / numBlocks;
    const changeLevel = avgDiff * 0.7 + maxDiff * 0.3;
    return Math.min(1, changeLevel);
  }
  /**
   * Compute mean intensity for each block
   * @private
   */
  _computeBlockMeans(data, output) {
    const bs = this.blockSize;
    const w = this.width;
    for (let by = 0; by < this.blocksY; by++) {
      const yStart = by * bs;
      const yEnd = Math.min(yStart + bs, this.height);
      for (let bx = 0; bx < this.blocksX; bx++) {
        const xStart = bx * bs;
        const xEnd = Math.min(xStart + bs, this.width);
        let sum = 0;
        let count = 0;
        for (let y = yStart; y < yEnd; y++) {
          const rowOffset = y * w;
          for (let x = xStart; x < xEnd; x++) {
            sum += data[rowOffset + x];
            count++;
          }
        }
        output[by * this.blocksX + bx] = sum / count;
      }
    }
  }
  /**
   * Predict next tracking state based on motion model
   * @private
   */
  _predictState(currentState) {
    if (!currentState.worldMatrix) return null;
    const matrix2 = currentState.worldMatrix;
    const predictedMatrix = new Float32Array(16);
    for (let i = 0; i < 16; i++) {
      predictedMatrix[i] = matrix2[i];
    }
    predictedMatrix[12] += this.motionModel.vx;
    predictedMatrix[13] += this.motionModel.vy;
    const scaleFactor = 1 + this.motionModel.vscale;
    predictedMatrix[0] *= scaleFactor;
    predictedMatrix[5] *= scaleFactor;
    predictedMatrix[10] *= scaleFactor;
    return {
      worldMatrix: predictedMatrix,
      isTracking: true,
      isPredicted: true,
      predictionConfidence: this.motionModel.confidence
    };
  }
  /**
   * Store frame for future prediction
   * 
   * @param {Uint8Array} inputData - Frame data
   * @param {Object} trackingState - Tracking state
   */
  storeFrame(inputData, trackingState) {
    for (let i = 0; i < this.blockMeans.length; i++) {
      this.prevBlockMeans[i] = this.blockMeans[i];
    }
    this._computeBlockMeans(inputData, this.blockMeans);
    if (trackingState?.worldMatrix) {
      this.stateHistory.push({
        timestamp: Date.now(),
        matrix: new Float32Array(trackingState.worldMatrix)
      });
      this._updateMotionModel();
      while (this.stateHistory.length > this.config.MOTION_HISTORY_FRAMES) {
        this.stateHistory.shift();
      }
    }
    this.consecutiveSkips = 0;
    this.frameHistory.push(Date.now());
    while (this.frameHistory.length > this.config.MOTION_HISTORY_FRAMES) {
      this.frameHistory.shift();
    }
  }
  /**
   * Update motion model from state history
   * @private
   */
  _updateMotionModel() {
    const history = this.stateHistory;
    if (history.length < 2) {
      this.motionModel.confidence = 0;
      return;
    }
    const n = history.length;
    const latest = history[n - 1].matrix;
    const prev = history[n - 2].matrix;
    const dt = (history[n - 1].timestamp - history[n - 2].timestamp) / 1e3;
    if (dt > 0) {
      this.motionModel.vx = latest[12] - prev[12];
      this.motionModel.vy = latest[13] - prev[13];
      const prevScale = (Math.abs(prev[0]) + Math.abs(prev[5])) / 2;
      const currScale = (Math.abs(latest[0]) + Math.abs(latest[5])) / 2;
      this.motionModel.vscale = (currScale - prevScale) / prevScale / dt * 0.016;
      if (history.length >= 3) {
        const older = history[n - 3].matrix;
        const expectedVx = (prev[12] - older[12]) / dt * 0.016;
        const expectedVy = (prev[13] - older[13]) / dt * 0.016;
        const errorX = Math.abs(this.motionModel.vx - expectedVx);
        const errorY = Math.abs(this.motionModel.vy - expectedVy);
        const error = Math.sqrt(errorX * errorX + errorY * errorY);
        this.motionModel.confidence = Math.max(0, 1 - error / 10);
      } else {
        this.motionModel.confidence = 0.5;
      }
    }
  }
  /**
   * Check if we're in a static scene (good candidate for aggressive skipping)
   * @returns {boolean} True if scene appears static
   */
  isStaticScene() {
    if (this.stateHistory.length < 3) return false;
    const velocity = Math.sqrt(
      this.motionModel.vx ** 2 + this.motionModel.vy ** 2
    );
    return velocity < 0.5 && Math.abs(this.motionModel.vscale) < 0.01;
  }
  /**
   * Reset prediction state
   */
  reset() {
    this.frameHistory = [];
    this.stateHistory = [];
    this.consecutiveSkips = 0;
    this.motionModel = {
      vx: 0,
      vy: 0,
      vtheta: 0,
      vscale: 0,
      confidence: 0
    };
    this.blockMeans.fill(0);
    this.prevBlockMeans.fill(0);
  }
  /**
   * Update configuration
   */
  configure(config) {
    this.config = { ...this.config, ...config };
  }
};

// src/core/perception/saliency-map.js
var SaliencyMap = class {
  /**
   * @param {number} width - Image width
   * @param {number} height - Image height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.scale = 8;
    this.scaledW = Math.ceil(width / this.scale);
    this.scaledH = Math.ceil(height / this.scale);
    this.intensityMap = new Float32Array(this.scaledW * this.scaledH);
    this.contrastMap = new Float32Array(this.scaledW * this.scaledH);
    this.edgeMap = new Float32Array(this.scaledW * this.scaledH);
    this.saliencyBuffer = new Float32Array(this.scaledW * this.scaledH);
    this.maxPeaks = 5;
    this.suppressionRadius = Math.max(this.scaledW, this.scaledH) * 0.15;
  }
  /**
   * Compute saliency map for input image
   * 
   * @param {Uint8Array} inputData - Grayscale input image
   * @returns {Object} Saliency result with peaks
   */
  compute(inputData) {
    this._downsample(inputData);
    this._computeContrast();
    this._computeEdges();
    this._combineSaliency();
    const peaks = this._findPeaks();
    return {
      map: this.saliencyBuffer,
      width: this.scaledW,
      height: this.scaledH,
      peaks,
      maxSaliency: peaks.length > 0 ? peaks[0].value : 0
    };
  }
  /**
   * Downsample input to working resolution
   * @private
   */
  _downsample(inputData) {
    const s = this.scale;
    const w = this.width;
    for (let sy = 0; sy < this.scaledH; sy++) {
      const yStart = sy * s;
      const yEnd = Math.min(yStart + s, this.height);
      for (let sx = 0; sx < this.scaledW; sx++) {
        const xStart = sx * s;
        const xEnd = Math.min(xStart + s, this.width);
        let sum = 0;
        let count = 0;
        for (let y = yStart; y < yEnd; y++) {
          const rowOffset = y * w;
          for (let x = xStart; x < xEnd; x++) {
            sum += inputData[rowOffset + x];
            count++;
          }
        }
        this.intensityMap[sy * this.scaledW + sx] = sum / count / 255;
      }
    }
  }
  /**
   * Compute local contrast map
   * @private
   */
  _computeContrast() {
    const w = this.scaledW;
    const h = this.scaledH;
    const intensity = this.intensityMap;
    const contrast = this.contrastMap;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        const center = intensity[idx];
        let surround = 0;
        surround += intensity[(y - 1) * w + (x - 1)];
        surround += intensity[(y - 1) * w + x];
        surround += intensity[(y - 1) * w + (x + 1)];
        surround += intensity[y * w + (x - 1)];
        surround += intensity[y * w + (x + 1)];
        surround += intensity[(y + 1) * w + (x - 1)];
        surround += intensity[(y + 1) * w + x];
        surround += intensity[(y + 1) * w + (x + 1)];
        surround /= 8;
        contrast[idx] = Math.abs(center - surround);
      }
    }
    for (let y = 0; y < h; y++) {
      contrast[y * w] = 0;
      contrast[y * w + w - 1] = 0;
    }
    for (let x = 0; x < w; x++) {
      contrast[x] = 0;
      contrast[(h - 1) * w + x] = 0;
    }
  }
  /**
   * Compute edge density map using Sobel-like operator
   * @private
   */
  _computeEdges() {
    const w = this.scaledW;
    const h = this.scaledH;
    const intensity = this.intensityMap;
    const edges = this.edgeMap;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const gx = -intensity[(y - 1) * w + (x - 1)] + intensity[(y - 1) * w + (x + 1)] + -2 * intensity[y * w + (x - 1)] + 2 * intensity[y * w + (x + 1)] + -intensity[(y + 1) * w + (x - 1)] + intensity[(y + 1) * w + (x + 1)];
        const gy = -intensity[(y - 1) * w + (x - 1)] - 2 * intensity[(y - 1) * w + x] - intensity[(y - 1) * w + (x + 1)] + intensity[(y + 1) * w + (x - 1)] + 2 * intensity[(y + 1) * w + x] + intensity[(y + 1) * w + (x + 1)];
        edges[y * w + x] = Math.sqrt(gx * gx + gy * gy) / 4;
      }
    }
    for (let y = 0; y < h; y++) {
      edges[y * w] = 0;
      edges[y * w + w - 1] = 0;
    }
    for (let x = 0; x < w; x++) {
      edges[x] = 0;
      edges[(h - 1) * w + x] = 0;
    }
  }
  /**
   * Combine features into final saliency map
   * @private
   */
  _combineSaliency() {
    const n = this.saliencyBuffer.length;
    const contrast = this.contrastMap;
    const edges = this.edgeMap;
    const saliency = this.saliencyBuffer;
    for (let i = 0; i < n; i++) {
      saliency[i] = contrast[i] * 0.6 + edges[i] * 0.4;
    }
    let max2 = 0;
    for (let i = 0; i < n; i++) {
      max2 = Math.max(max2, saliency[i]);
    }
    if (max2 > 0) {
      for (let i = 0; i < n; i++) {
        saliency[i] /= max2;
      }
    }
  }
  /**
   * Find peaks in saliency map using non-maximum suppression
   * @private
   */
  _findPeaks() {
    const w = this.scaledW;
    const h = this.scaledH;
    const saliency = this.saliencyBuffer;
    const peaks = [];
    const r = this.suppressionRadius;
    const r2 = r * r;
    const candidates = [];
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        const val = saliency[idx];
        if (val > saliency[(y - 1) * w + (x - 1)] && val > saliency[(y - 1) * w + x] && val > saliency[(y - 1) * w + (x + 1)] && val > saliency[y * w + (x - 1)] && val > saliency[y * w + (x + 1)] && val > saliency[(y + 1) * w + (x - 1)] && val > saliency[(y + 1) * w + x] && val > saliency[(y + 1) * w + (x + 1)]) {
          candidates.push({ x, y, value: val });
        }
      }
    }
    candidates.sort((a, b) => b.value - a.value);
    for (const cand of candidates) {
      if (peaks.length >= this.maxPeaks) break;
      let suppress = false;
      for (const peak of peaks) {
        const dx = cand.x - peak.x;
        const dy = cand.y - peak.y;
        if (dx * dx + dy * dy < r2) {
          suppress = true;
          break;
        }
      }
      if (!suppress) {
        peaks.push({
          x: (cand.x + 0.5) * this.scale,
          y: (cand.y + 0.5) * this.scale,
          value: cand.value
        });
      }
    }
    return peaks;
  }
  /**
   * Get saliency value at a specific location
   * 
   * @param {number} x - X coordinate in original image
   * @param {number} y - Y coordinate in original image
   * @returns {number} Saliency value (0-1)
   */
  getSaliencyAt(x, y) {
    const sx = Math.floor(x / this.scale);
    const sy = Math.floor(y / this.scale);
    if (sx < 0 || sx >= this.scaledW || sy < 0 || sy >= this.scaledH) {
      return 0;
    }
    return this.saliencyBuffer[sy * this.scaledW + sx];
  }
};

// src/core/perception/scale-orchestrator.js
var ScaleOrchestrator = class {
  constructor(numOctaves, options = {}) {
    this.numOctaves = numOctaves;
    this.options = {
      interleaveInterval: 10,
      hysteresis: 1,
      // Number of adjacent octaves to keep
      ...options
    };
    this.frameCount = 0;
    this.lastActiveOctave = -1;
    this.interleaveOctave = 0;
  }
  /**
   * Determine which octaves should be processed in the current frame
   * 
   * @param {Object} trackingState - Current state of tracking
   * @returns {number[]} Array of octave indices to process
   */
  getOctavesToProcess(trackingState = null) {
    this.frameCount++;
    if (!trackingState || !trackingState.isTracking || trackingState.activeOctave === void 0) {
      this.lastActiveOctave = -1;
      return Array.from({ length: this.numOctaves }, (_, i) => i);
    }
    const activeScale = trackingState.activeOctave;
    this.lastActiveOctave = activeScale;
    const octaves = /* @__PURE__ */ new Set();
    for (let i = -this.options.hysteresis; i <= this.options.hysteresis; i++) {
      const octave = activeScale + i;
      if (octave >= 0 && octave < this.numOctaves) {
        octaves.add(octave);
      }
    }
    if (this.frameCount % this.options.interleaveInterval === 0) {
      this.interleaveOctave = (this.interleaveOctave + 1) % this.numOctaves;
      if (octaves.has(this.interleaveOctave)) {
        this.interleaveOctave = (this.interleaveOctave + 1) % this.numOctaves;
      }
      octaves.add(this.interleaveOctave);
      if (this.options.debug) {
        console.log(`[ScaleOrchestrator] Interleave check on octave ${this.interleaveOctave}`);
      }
    }
    const result = Array.from(octaves).sort((a, b) => a - b);
    if (this.options.debug) {
      console.log(`[ScaleOrchestrator] Active: ${activeScale}, Processing: [${result.join(", ")}]`);
    }
    return result;
  }
  /**
   * Reset orchestrator state
   */
  reset() {
    this.frameCount = 0;
    this.lastActiveOctave = -1;
  }
};

// src/core/perception/bio-inspired-engine.js
var BIO_CONFIG = {
  // Foveal region (high resolution center)
  FOVEA_RADIUS_RATIO: 0.15,
  // 15% of image dimension
  PARAFOVEA_RADIUS_RATIO: 0.3,
  // 30% of image dimension
  // Resolution multipliers
  FOVEA_RESOLUTION: 1,
  // Full resolution
  PARAFOVEA_RESOLUTION: 0.5,
  // Half resolution
  PERIPHERY_RESOLUTION: 0.25,
  // Quarter resolution
  // Saccadic behavior
  MAX_SACCADES_PER_FRAME: 3,
  // Maximum "glances" per frame
  SACCADE_COOLDOWN_MS: 50,
  // Minimum time between saccades
  SALIENCY_THRESHOLD: 0.3,
  // Threshold for triggering saccade
  // Predictive coding
  CHANGE_THRESHOLD: 0.05,
  // 5% pixel difference to trigger processing
  PREDICTION_CONFIDENCE: 0.8,
  // Confidence to skip processing
  MOTION_HISTORY_FRAMES: 3,
  // Frames to consider for motion prediction
  // Performance
  ENABLE_SKIP_FRAMES: true,
  // Skip processing if nothing changed
  MIN_PROCESSING_INTERVAL_MS: 8,
  // Minimum 8ms (~120fps cap)
  NUM_OCTAVES: 5
  // Default number of octaves
};
var BioInspiredEngine = class {
  /**
   * @param {number} width - Input image width
   * @param {number} height - Input image height
   * @param {Object} options - Configuration options
   */
  constructor(width, height, options = {}) {
    this.width = width;
    this.height = height;
    this.config = { ...BIO_CONFIG, ...options };
    this.fovealAttention = new FovealAttention(width, height, this.config);
    this.saccadicController = new SaccadicController(width, height, this.config);
    this.predictiveCoding = new PredictiveCoding(width, height, this.config);
    this.saliencyMap = new SaliencyMap(width, height);
    this.scaleOrchestrator = new ScaleOrchestrator(this.config.NUM_OCTAVES, {
      debug: options.debugMode
    });
    this.currentFoveaCenter = { x: width / 2, y: height / 2 };
    this.frameCount = 0;
    this.lastProcessTime = 0;
    this.skipCount = 0;
    this.metrics = {
      totalFrames: 0,
      skippedFrames: 0,
      avgPixelsProcessed: 0,
      avgLatency: 0,
      saccadeCount: 0
    };
    this._initBuffers();
  }
  /**
   * Initialize pre-allocated buffers for efficient processing
   * @private
   */
  _initBuffers() {
    const fullSize = this.width * this.height;
    const foveaSize = Math.ceil(fullSize * this.config.FOVEA_RADIUS_RATIO ** 2 * Math.PI);
    this.changeBuffer = new Float32Array(Math.ceil(fullSize / 64));
  }
  /**
   * Process an input frame using bio-inspired techniques
   * 
   * @param {Uint8Array} inputData - Grayscale input image
   * @param {Object} trackingState - Current tracking state (optional)
   * @returns {Object} Processed result with attention regions
   */
  process(inputData, trackingState = null) {
    const startTime = performance.now();
    this.frameCount++;
    this.metrics.totalFrames++;
    const prediction = this.predictiveCoding.predict(inputData, trackingState);
    if (prediction.canSkip && this.config.ENABLE_SKIP_FRAMES) {
      this.metrics.skippedFrames++;
      this.skipCount++;
      return {
        skipped: true,
        prediction: prediction.predictedState,
        confidence: prediction.confidence,
        pixelsProcessed: 0,
        latency: performance.now() - startTime
      };
    }
    this.skipCount = 0;
    const saliency = this.saliencyMap.compute(inputData);
    const saccadeTargets = this.saccadicController.computeTargets(
      saliency,
      this.currentFoveaCenter,
      trackingState
    );
    const attentionRegions = [];
    let totalPixelsProcessed = 0;
    for (const target of saccadeTargets) {
      const region = this.fovealAttention.extract(
        inputData,
        target.x,
        target.y,
        target.priority
      );
      attentionRegions.push(region);
      totalPixelsProcessed += region.pixelCount;
      this.metrics.saccadeCount++;
    }
    if (saccadeTargets.length > 0) {
      const primary = saccadeTargets[0];
      this.currentFoveaCenter = { x: primary.x, y: primary.y };
    }
    const octavesToProcess = this.scaleOrchestrator.getOctavesToProcess(trackingState);
    this.predictiveCoding.storeFrame(inputData, trackingState);
    const latency = performance.now() - startTime;
    this._updateMetrics(totalPixelsProcessed, latency);
    return {
      skipped: false,
      attentionRegions,
      foveaCenter: this.currentFoveaCenter,
      saliencyPeaks: saliency.peaks,
      octavesToProcess,
      pixelsProcessed: totalPixelsProcessed,
      pixelsSaved: this.width * this.height - totalPixelsProcessed,
      savingsPercent: ((1 - totalPixelsProcessed / (this.width * this.height)) * 100).toFixed(1),
      latency
    };
  }
  /**
   * Get the primary attention region (highest resolution)
   * This is the region that should be used for feature detection
   * 
   * @param {Object} processResult - Result from process()
   * @returns {Object} Primary attention region with data
   */
  getPrimaryRegion(processResult) {
    if (processResult.skipped || !processResult.attentionRegions?.length) {
      return null;
    }
    return processResult.attentionRegions[0];
  }
  /**
   * Suggest optimal processing based on change detection
   * 
   * @param {Uint8Array} inputData - Current frame
   * @returns {Object} Processing suggestion
   */
  suggestProcessing(inputData) {
    const changeLevel = this.predictiveCoding.getChangeLevel(inputData);
    return {
      shouldProcessFull: changeLevel > 0.3,
      shouldProcessPartial: changeLevel > 0.05,
      canSkip: changeLevel < 0.02,
      changeLevel,
      recommendedSaccades: Math.ceil(changeLevel * this.config.MAX_SACCADES_PER_FRAME)
    };
  }
  /**
   * Update performance metrics
   * @private
   */
  _updateMetrics(pixelsProcessed, latency) {
    const alpha = 0.1;
    this.metrics.avgPixelsProcessed = this.metrics.avgPixelsProcessed * (1 - alpha) + pixelsProcessed * alpha;
    this.metrics.avgLatency = this.metrics.avgLatency * (1 - alpha) + latency * alpha;
  }
  /**
   * Get current performance metrics
   * @returns {Object} Performance metrics
   */
  getMetrics() {
    return {
      ...this.metrics,
      skipRate: (this.metrics.skippedFrames / this.metrics.totalFrames * 100).toFixed(1) + "%",
      avgSavings: ((1 - this.metrics.avgPixelsProcessed / (this.width * this.height)) * 100).toFixed(1) + "%",
      currentFovea: this.currentFoveaCenter
    };
  }
  /**
   * Reset engine state (e.g., when target changes)
   */
  reset() {
    this.currentFoveaCenter = { x: this.width / 2, y: this.height / 2 };
    this.frameCount = 0;
    this.skipCount = 0;
    this.predictiveCoding.reset();
    this.saccadicController.reset();
  }
  /**
   * Configure engine at runtime
   * @param {Object} options - Configuration options to update
   */
  configure(options) {
    this.config = { ...this.config, ...options };
    this.fovealAttention.configure(this.config);
    this.saccadicController.configure(this.config);
    this.predictiveCoding.configure(this.config);
  }
};

// src/runtime/bio-inspired-controller.ts
var BioInspiredController = class extends Controller {
  bioEngine = null;
  bioEnabled = true;
  bioMetricsInterval = null;
  lastBioResult = null;
  loopIdCounter = 0;
  constructor(options) {
    super(options);
    const bioOptions = options.bioInspired || {};
    this.bioEnabled = bioOptions.enabled !== false;
    if (this.bioEnabled) {
      const bioConfig = {};
      if (bioOptions.foveaRadiusRatio !== void 0) {
        bioConfig.FOVEA_RADIUS_RATIO = bioOptions.foveaRadiusRatio;
      }
      if (bioOptions.maxSaccades !== void 0) {
        bioConfig.MAX_SACCADES_PER_FRAME = bioOptions.maxSaccades;
      }
      if (bioOptions.aggressiveSkipping !== void 0) {
        bioConfig.ENABLE_SKIP_FRAMES = bioOptions.aggressiveSkipping;
        if (bioOptions.aggressiveSkipping) {
          bioConfig.CHANGE_THRESHOLD = 0.03;
        }
      }
      this.bioEngine = new BioInspiredEngine(
        options.inputWidth,
        options.inputHeight,
        bioConfig
      );
    }
  }
  /**
   * Override processVideo to add bio-inspired perception
   */
  processVideo(input) {
    if (!this.bioEnabled || !this.bioEngine) {
      return super.processVideo(input);
    }
    if (this.processingVideo) return;
    this.processingVideo = true;
    const currentLoopId = ++this.loopIdCounter;
    this.trackingStates = [];
    for (let i = 0; i < (this.markerDimensions?.length || 0); i++) {
      this.trackingStates.push({
        showing: false,
        isTracking: false,
        currentModelViewTransform: null,
        trackCount: 0,
        trackMiss: 0
      });
    }
    const startProcessing = async () => {
      while (true) {
        if (!this.processingVideo || currentLoopId !== this.loopIdCounter) break;
        const inputData = this.inputLoader.loadInput(input);
        const activeTrackings = this.trackingStates.filter((s) => s.isTracking);
        const trackingState = activeTrackings.length === 1 ? {
          isTracking: true,
          activeOctave: activeTrackings[0].lastOctaveIndex,
          // Tracked octave index
          worldMatrix: activeTrackings[0].currentModelViewTransform ? this._flattenMatrix(activeTrackings[0].currentModelViewTransform) : null
        } : null;
        const bioResult = this.bioEngine.process(inputData, trackingState || void 0);
        this.lastBioResult = bioResult;
        if (bioResult.skipped && activeTrackings.length > 0) {
          this._handleSkippedFrame(activeTrackings, bioResult);
        } else {
          await this._processWithAttention(input, inputData, bioResult);
        }
        if (typeof requestAnimationFrame !== "undefined") {
          await new Promise(requestAnimationFrame);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 16));
        }
      }
    };
    startProcessing();
  }
  /**
   * Handle a skipped frame using prediction
   * @private
   */
  _handleSkippedFrame(trackingStates, bioResult) {
    const hasPrediction = bioResult.prediction && bioResult.prediction.worldMatrix;
    for (const state of trackingStates) {
      if (hasPrediction && trackingStates.length === 1) {
        state.currentModelViewTransform = this._unflattenMatrix(bioResult.prediction.worldMatrix);
      }
      const targetIndex = this.trackingStates.indexOf(state);
      if (targetIndex !== -1) {
        const worldMatrix = state.currentModelViewTransform ? this._glModelViewMatrix(state.currentModelViewTransform, targetIndex) : null;
        this.onUpdate?.({
          type: "updateMatrix",
          targetIndex,
          worldMatrix: worldMatrix ? this.featureManager.applyWorldMatrixFilters(targetIndex, worldMatrix, { stability: 0.9 }) : null,
          skipped: true,
          bioMetrics: this.bioEngine?.getMetrics()
        });
      }
    }
    this.onUpdate?.({ type: "processDone" });
  }
  /**
   * Process frame using bio-inspired attention regions
   * @private
   */
  async _processWithAttention(input, inputData, bioResult) {
    const nTracking = this.trackingStates.reduce((acc, s) => acc + (s.isTracking ? 1 : 0), 0);
    if (nTracking < this.maxTrack) {
      const matchingIndexes = this.trackingStates.map((s, i) => ({ state: s, index: i })).filter(
        ({ state, index }) => !state.isTracking && (this.interestedTargetIndex === -1 || this.interestedTargetIndex === index)
      ).map(({ index }) => index);
      if (matchingIndexes.length > 0) {
        const { targetIndex: matchedTargetIndex, modelViewTransform, featurePoints, debugExtra } = await this._detectAndMatch(inputData, matchingIndexes, bioResult.octavesToProcess || null);
        if (matchedTargetIndex !== -1) {
          this.trackingStates[matchedTargetIndex].isTracking = true;
          this.trackingStates[matchedTargetIndex].currentModelViewTransform = modelViewTransform;
          if (debugExtra && debugExtra.isDeformable) {
            this.trackingStates[matchedTargetIndex].isDeformable = true;
            this.trackingStates[matchedTargetIndex].deformableModel = debugExtra.deformableModel;
          } else {
            this.trackingStates[matchedTargetIndex].isDeformable = false;
            this.trackingStates[matchedTargetIndex].deformableModel = null;
          }
          if (bioResult.attentionRegions?.[0]) {
            this.bioEngine?.reset();
          }
        }
        this.onUpdate?.({ type: "featurePoints", featurePoints });
      }
    }
    for (let i = 0; i < this.trackingStates.length; i++) {
      const trackingState = this.trackingStates[i];
      if (trackingState.isTracking) {
        const result = await this._trackAndUpdate(
          inputData,
          trackingState.currentModelViewTransform,
          i
        );
        if (!result || !result.modelViewTransform) {
          trackingState.isTracking = false;
          trackingState.screenCoords = result?.screenCoords || [];
          trackingState.reliabilities = result?.reliabilities || [];
          trackingState.stabilities = result?.stabilities || [];
        } else {
          trackingState.currentModelViewTransform = result.modelViewTransform;
          trackingState.screenCoords = result.screenCoords;
          trackingState.reliabilities = result.reliabilities;
          trackingState.stabilities = result.stabilities;
          trackingState.deformedMesh = result.deformedMesh;
        }
      }
      const wasShowing = trackingState.showing;
      trackingState.showing = this.featureManager.shouldShow(i, trackingState.isTracking);
      if (wasShowing && !trackingState.showing) {
        trackingState.trackingMatrix = null;
        this.featureManager.notifyUpdate({ type: "reset", targetIndex: i });
      }
      if (trackingState.showing || trackingState.screenCoords?.length > 0 || wasShowing && !trackingState.showing) {
        const worldMatrix = trackingState.showing ? this._glModelViewMatrix(trackingState.currentModelViewTransform, i) : null;
        let finalMatrix = null;
        if (worldMatrix) {
          const stabilities = trackingState.stabilities || [];
          const avgStability = stabilities.length > 0 ? stabilities.reduce((a, b) => a + b, 0) / stabilities.length : 0;
          finalMatrix = this.featureManager.applyWorldMatrixFilters(i, worldMatrix, { stability: avgStability });
          trackingState.trackingMatrix = finalMatrix;
          const isInputRotated = input.width === this.inputHeight && input.height === this.inputWidth;
          if (isInputRotated) {
            const rotationFeature = this.featureManager.getFeature("auto-rotation");
            if (rotationFeature) {
              finalMatrix = rotationFeature.rotate(finalMatrix);
            }
          }
        }
        this.onUpdate?.({
          type: "updateMatrix",
          targetIndex: i,
          worldMatrix: finalMatrix,
          modelViewTransform: trackingState.currentModelViewTransform,
          screenCoords: trackingState.screenCoords,
          reliabilities: trackingState.reliabilities,
          stabilities: trackingState.stabilities,
          deformedMesh: trackingState.deformedMesh,
          bioMetrics: this.bioEngine?.getMetrics(),
          foveaCenter: bioResult.foveaCenter,
          pixelsSaved: bioResult.pixelsSaved
        });
      }
    }
    this.onUpdate?.({ type: "processDone" });
  }
  /**
   * Detect and match features, optionally limited to specific octaves
   */
  async _detectAndMatch(inputData, targetIndexes, octavesToProcess = null) {
    let predictedScale = void 0;
    for (const state of this.trackingStates) {
      if (state.isTracking && state.currentModelViewTransform) {
        const m = state.currentModelViewTransform;
        predictedScale = Math.sqrt(m[0][0] ** 2 + m[1][0] ** 2 + m[2][0] ** 2);
        break;
      }
    }
    const { targetIndex, modelViewTransform, screenCoords, worldCoords, featurePoints, debugExtra } = await this._workerMatch(
      null,
      // No feature points, worker will detect from inputData
      targetIndexes,
      inputData,
      predictedScale,
      octavesToProcess
    );
    return { targetIndex, modelViewTransform, screenCoords, worldCoords, featurePoints, debugExtra };
  }
  /**
   * Communicate with worker for matching phase
   */
  _workerMatch(featurePoints, targetIndexes, inputData = null, expectedScale, octavesToProcess = null) {
    return new Promise((resolve) => {
      if (!this.worker) {
        let fpPromise;
        if (!featurePoints && inputData) {
          fpPromise = Promise.resolve(this.fullDetector.detect(inputData, { octavesToProcess }).featurePoints);
        } else {
          fpPromise = Promise.resolve(featurePoints);
        }
        fpPromise.then((fp) => {
          this._matchOnMainThread(fp, targetIndexes, expectedScale).then(resolve);
        }).catch(() => resolve({ targetIndex: -1 }));
        return;
      }
      const timeout = setTimeout(() => {
        this.workerMatchDone = null;
        resolve({ targetIndex: -1 });
      }, 1e3);
      this.workerMatchDone = (data) => {
        clearTimeout(timeout);
        this.workerMatchDone = null;
        resolve(data);
      };
      if (inputData) {
        this.worker.postMessage({ type: "match", inputData, targetIndexes, octavesToProcess, expectedScale });
      } else {
        this.worker.postMessage({ type: "match", featurePoints, targetIndexes, expectedScale });
      }
    });
  }
  /**
   * Override _trackAndUpdate to capture active octave for the next frame's orchestration
   */
  async _trackAndUpdate(inputData, lastModelViewTransform, targetIndex) {
    const result = await super._trackAndUpdate(inputData, lastModelViewTransform, targetIndex);
    if (result && result.octaveIndex !== void 0) {
      this.trackingStates[targetIndex].lastOctaveIndex = result.octaveIndex;
    }
    return result;
  }
  /**
   * Flatten a 3x4 matrix to Float32Array
   * @private
   */
  _flattenMatrix(matrix2) {
    const result = new Float32Array(16);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        result[i * 4 + j] = matrix2[i][j];
      }
    }
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    return result;
  }
  /**
   * Unflatten Float32Array to 3x4 matrix
   * @private
   */
  _unflattenMatrix(flat) {
    return [
      [flat[0], flat[1], flat[2], flat[3]],
      [flat[4], flat[5], flat[6], flat[7]],
      [flat[8], flat[9], flat[10], flat[11]]
    ];
  }
  /**
   * Get bio-inspired engine metrics
   */
  getBioMetrics() {
    return this.bioEngine?.getMetrics() || null;
  }
  /**
   * Get last bio processing result
   */
  getLastBioResult() {
    return this.lastBioResult;
  }
  /**
   * Enable/disable bio-inspired processing dynamically
   */
  setBioEnabled(enabled) {
    this.bioEnabled = enabled;
    if (enabled && !this.bioEngine) {
      this.bioEngine = new BioInspiredEngine(this.inputWidth, this.inputHeight);
    }
  }
  /**
   * Configure bio-inspired engine at runtime
   */
  configureBio(options) {
    this.bioEngine?.configure(options);
  }
  /**
   * Override dispose to clean up bio engine
   */
  dispose() {
    super.dispose();
    this.bioEngine = null;
    if (this.bioMetricsInterval) {
      clearInterval(this.bioMetricsInterval);
    }
  }
};

// src/core/utils/images.js
var downsampleBilinear = ({ image }) => {
  const { data, width, height } = image;
  const dstWidth = width >>> 1;
  const dstHeight = height >>> 1;
  const temp = new Uint8Array(dstWidth * dstHeight);
  for (let j = 0; j < dstHeight; j++) {
    const row0 = j * 2 * width;
    const row1 = row0 + width;
    const dstRow = j * dstWidth;
    for (let i = 0; i < dstWidth; i++) {
      const i2 = i * 2;
      const val = data[row0 + i2] + data[row0 + i2 + 1] + data[row1 + i2] + data[row1 + i2 + 1] >> 2;
      temp[dstRow + i] = val & 255;
    }
  }
  return { data: temp, width: dstWidth, height: dstHeight };
};
var resize = ({ image, ratio }) => {
  if (ratio === 1) {
    return {
      data: new Uint8Array(image.data),
      // Copy to be safe/consistent
      width: image.width,
      height: image.height
    };
  }
  if (ratio <= 0.5) {
    return resize({
      image: downsampleBilinear({ image }),
      ratio: ratio * 2
    });
  }
  const width = Math.round(image.width * ratio) | 0;
  const height = Math.round(image.height * ratio) | 0;
  const imageData = new Uint8Array(width * height);
  const srcData = image.data;
  const srcW = image.width | 0;
  const srcH = image.height | 0;
  const srcW_1 = srcW - 1 | 0;
  const srcH_1 = srcH - 1 | 0;
  let dstIndex = 0;
  for (let j = 0; j < height; j++) {
    const srcY = j / ratio;
    const y0 = srcY | 0;
    const y1 = (y0 < srcH_1 ? y0 + 1 : srcH_1) | 0;
    const fy = srcY - y0;
    const ify = 1 - fy;
    const row0 = y0 * srcW | 0;
    const row1 = y1 * srcW | 0;
    for (let i = 0; i < width; i++) {
      const srcX = i / ratio;
      const x0 = srcX | 0;
      const x1 = (x0 < srcW_1 ? x0 + 1 : srcW_1) | 0;
      const fx = srcX - x0;
      const ifx = 1 - fx;
      const val0 = srcData[row0 + x0] * ifx + srcData[row0 + x1] * fx;
      const val1 = srcData[row1 + x0] * ifx + srcData[row1 + x1] * fx;
      const value = val0 * ify + val1 * fy;
      imageData[dstIndex++] = value | 0;
    }
  }
  return { data: imageData, width, height };
};

// src/core/image-list.js
init_constants();
var MIN_IMAGE_PIXEL_SIZE = AR_CONFIG.MIN_IMAGE_PIXEL_SIZE;
var buildTrackingImageList = (inputImage) => {
  const minDimension = Math.min(inputImage.width, inputImage.height);
  const scaleList = [];
  const imageList = [];
  scaleList.push(AR_CONFIG.TRACKING_DOWNSCALE_LEVEL_1 / minDimension);
  scaleList.push(AR_CONFIG.TRACKING_DOWNSCALE_LEVEL_2 / minDimension);
  for (let i = 0; i < scaleList.length; i++) {
    imageList.push(
      Object.assign(resize({ image: inputImage, ratio: scaleList[i] }), { scale: scaleList[i] })
    );
  }
  return imageList;
};

// src/core/utils/cumsum.js
var Cumsum = class {
  constructor(data, width, height) {
    this.width = width;
    this.height = height;
    this.cumsum = new Int32Array(width * height);
    this.cumsum[0] = data[0];
    for (let i = 1; i < width; i++) {
      this.cumsum[i] = this.cumsum[i - 1] + data[i];
    }
    for (let j = 1; j < height; j++) {
      this.cumsum[j * width] = this.cumsum[(j - 1) * width] + data[j * width];
    }
    for (let j = 1; j < height; j++) {
      for (let i = 1; i < width; i++) {
        const pos = j * width + i;
        this.cumsum[pos] = data[pos] + this.cumsum[(j - 1) * width + i] + this.cumsum[j * width + i - 1] - this.cumsum[(j - 1) * width + i - 1];
      }
    }
  }
  query(x1, y1, x2, y2) {
    const { width } = this;
    let ret = this.cumsum[y2 * width + x2];
    if (y1 > 0) ret -= this.cumsum[(y1 - 1) * width + x2];
    if (x1 > 0) ret -= this.cumsum[y2 * width + x1 - 1];
    if (x1 > 0 && y1 > 0) ret += this.cumsum[(y1 - 1) * width + x1 - 1];
    return ret;
  }
};

// src/core/tracker/extract.js
var SEARCH_SIZE1 = 10;
var SEARCH_SIZE2 = 2;
var TEMPLATE_SIZE = 6;
var TEMPLATE_SD_THRESH = 4;
var MAX_THRESH = 0.9;
var MIN_THRESH = 0.2;
var OCCUPANCY_SIZE = 8;
var useGPU = true;
var extract = (image) => {
  const { data: imageData, width, height } = image;
  let dValue, isCandidate;
  if (useGPU) {
    const result = gpuCompute.edgeDetection(imageData, width, height);
    dValue = result.dValue;
    isCandidate = result.isCandidate;
  } else {
    dValue = new Float32Array(imageData.length);
    isCandidate = new Uint8Array(imageData.length);
    for (let j = 1; j < height - 1; j++) {
      const rowOffset = j * width;
      const prevRowOffset = (j - 1) * width;
      const nextRowOffset = (j + 1) * width;
      for (let i = 1; i < width - 1; i++) {
        const pos = rowOffset + i;
        let dx = (imageData[prevRowOffset + i + 1] - imageData[prevRowOffset + i - 1] + imageData[rowOffset + i + 1] - imageData[rowOffset + i - 1] + imageData[nextRowOffset + i + 1] - imageData[nextRowOffset + i - 1]) / 768;
        let dy = (imageData[nextRowOffset + i - 1] - imageData[prevRowOffset + i - 1] + imageData[nextRowOffset + i] - imageData[prevRowOffset + i] + imageData[nextRowOffset + i + 1] - imageData[prevRowOffset + i + 1]) / 768;
        dValue[pos] = Math.sqrt((dx * dx + dy * dy) / 2);
      }
    }
    for (let j = 1; j < height - 1; j++) {
      const rowOffset = j * width;
      for (let i = 1; i < width - 1; i++) {
        const pos = rowOffset + i;
        const val = dValue[pos];
        if (val > 0 && val >= dValue[pos - 1] && val >= dValue[pos + 1] && val >= dValue[pos - width] && val >= dValue[pos + width]) {
          isCandidate[pos] = 1;
        }
      }
    }
  }
  const dValueHist = new Uint32Array(1e3);
  let allCount = 0;
  for (let j = 1; j < height - 1; j++) {
    const rowOffset = j * width;
    for (let i = 1; i < width - 1; i++) {
      const pos = rowOffset + i;
      if (isCandidate[pos]) {
        const val = dValue[pos];
        let k = Math.floor(val * 1e3);
        if (k > 999) k = 999;
        dValueHist[k]++;
        allCount++;
      }
    }
  }
  const maxPoints = 0.1 * width * height;
  let kThresh = 999;
  let filteredCount = 0;
  while (kThresh >= 0) {
    filteredCount += dValueHist[kThresh];
    if (filteredCount > maxPoints) break;
    kThresh--;
  }
  const minDValue = kThresh / 1e3;
  const imageDataSqr = new Float32Array(imageData.length);
  for (let i = 0; i < imageData.length; i++) {
    imageDataSqr[i] = imageData[i] * imageData[i];
  }
  const imageDataCumsum = new Cumsum(imageData, width, height);
  const imageDataSqrCumsum = new Cumsum(imageDataSqr, width, height);
  const candidates = [];
  for (let i = 0; i < imageData.length; i++) {
    if (isCandidate[i] && dValue[i] >= minDValue) {
      candidates.push({
        pos: i,
        dval: dValue[i],
        x: i % width,
        y: Math.floor(i / width)
      });
    }
  }
  candidates.sort((a, b) => b.dval - a.dval);
  const divSize = (TEMPLATE_SIZE * 2 + 1) * 3;
  const maxFeatureNum = Math.floor(width / OCCUPANCY_SIZE) * Math.floor(height / OCCUPANCY_SIZE) + Math.floor(width / divSize) * Math.floor(height / divSize);
  const coords = [];
  const invalidated = new Uint8Array(width * height);
  const templateWidth = 2 * TEMPLATE_SIZE + 1;
  const nPixels = templateWidth * templateWidth;
  const actualOccSize = Math.floor(Math.min(width, height) / 12);
  for (let i = 0; i < candidates.length; i++) {
    const { x, y, pos } = candidates[i];
    if (invalidated[pos]) continue;
    if (x < TEMPLATE_SIZE + SEARCH_SIZE1 || x >= width - TEMPLATE_SIZE - SEARCH_SIZE1 || y < TEMPLATE_SIZE + SEARCH_SIZE1 || y >= height - TEMPLATE_SIZE - SEARCH_SIZE1) {
      continue;
    }
    const vlen = _templateVar({
      image,
      cx: x,
      cy: y,
      sdThresh: TEMPLATE_SD_THRESH,
      imageDataCumsum,
      imageDataSqrCumsum
    });
    if (vlen === null) continue;
    const templateAvg = imageDataCumsum.query(
      x - TEMPLATE_SIZE,
      y - TEMPLATE_SIZE,
      x + TEMPLATE_SIZE,
      y + TEMPLATE_SIZE
    ) / nPixels;
    const templateData = new Uint8Array(templateWidth * templateWidth);
    let tidx = 0;
    const tStart = (y - TEMPLATE_SIZE) * width + (x - TEMPLATE_SIZE);
    for (let tj = 0; tj < templateWidth; tj++) {
      const rowOffset = tStart + tj * width;
      for (let ti = 0; ti < templateWidth; ti++) {
        templateData[tidx++] = imageData[rowOffset + ti];
      }
    }
    let max2 = -1;
    for (let jj = -SEARCH_SIZE1; jj <= SEARCH_SIZE1; jj++) {
      for (let ii = -SEARCH_SIZE1; ii <= SEARCH_SIZE1; ii++) {
        if (ii * ii + jj * jj <= SEARCH_SIZE2 * SEARCH_SIZE2) continue;
        const sim = _getSimilarityOptimized({
          image,
          cx: x + ii,
          cy: y + jj,
          vlen,
          templateData,
          templateAvg,
          templateWidth,
          imageDataCumsum,
          imageDataSqrCumsum,
          width,
          height
        });
        if (sim !== null && sim > max2) {
          max2 = sim;
          if (max2 > MAX_THRESH) break;
        }
      }
      if (max2 > MAX_THRESH) break;
    }
    if (max2 < MAX_THRESH) {
      let minUnique = 1;
      let maxUnique = -1;
      let failedUnique = false;
      for (let jj = -SEARCH_SIZE2; jj <= SEARCH_SIZE2; jj++) {
        for (let ii = -SEARCH_SIZE2; ii <= SEARCH_SIZE2; ii++) {
          if (ii * ii + jj * jj > SEARCH_SIZE2 * SEARCH_SIZE2) continue;
          if (ii === 0 && jj === 0) continue;
          const sim = _getSimilarityOptimized({
            image,
            vlen,
            cx: x + ii,
            cy: y + jj,
            templateData,
            templateAvg,
            templateWidth,
            imageDataCumsum,
            imageDataSqrCumsum,
            width,
            height
          });
          if (sim === null) continue;
          if (sim < minUnique) minUnique = sim;
          if (sim > maxUnique) maxUnique = sim;
          if (minUnique < MIN_THRESH || maxUnique > 0.99) {
            failedUnique = true;
            break;
          }
        }
        if (failedUnique) break;
      }
      if (!failedUnique) {
        coords.push({ x, y });
        for (let jj = -actualOccSize; jj <= actualOccSize; jj++) {
          const yy = y + jj;
          if (yy < 0 || yy >= height) continue;
          const rowStart = yy * width;
          for (let ii = -actualOccSize; ii <= actualOccSize; ii++) {
            const xx = x + ii;
            if (xx < 0 || xx >= width) continue;
            invalidated[rowStart + xx] = 1;
          }
        }
      }
    }
    if (coords.length >= maxFeatureNum) break;
  }
  return coords;
};
var _templateVar = ({ image, cx, cy, sdThresh, imageDataCumsum, imageDataSqrCumsum }) => {
  if (cx - TEMPLATE_SIZE < 0 || cx + TEMPLATE_SIZE >= image.width) return null;
  if (cy - TEMPLATE_SIZE < 0 || cy + TEMPLATE_SIZE >= image.height) return null;
  const templateWidth = 2 * TEMPLATE_SIZE + 1;
  const nPixels = templateWidth * templateWidth;
  let average = imageDataCumsum.query(
    cx - TEMPLATE_SIZE,
    cy - TEMPLATE_SIZE,
    cx + TEMPLATE_SIZE,
    cy + TEMPLATE_SIZE
  );
  average /= nPixels;
  let vlen = imageDataSqrCumsum.query(
    cx - TEMPLATE_SIZE,
    cy - TEMPLATE_SIZE,
    cx + TEMPLATE_SIZE,
    cy + TEMPLATE_SIZE
  );
  vlen -= 2 * average * imageDataCumsum.query(
    cx - TEMPLATE_SIZE,
    cy - TEMPLATE_SIZE,
    cx + TEMPLATE_SIZE,
    cy + TEMPLATE_SIZE
  );
  vlen += nPixels * average * average;
  if (vlen / nPixels < sdThresh * sdThresh) return null;
  vlen = Math.sqrt(vlen);
  return vlen;
};
var _getSimilarityOptimized = (options) => {
  const { cx, cy, vlen, templateData, templateAvg, templateWidth, imageDataCumsum, imageDataSqrCumsum, width, height } = options;
  const imageData = options.image.data;
  const templateSize = (templateWidth - 1) / 2;
  if (cx - templateSize < 0 || cx + templateSize >= width) return null;
  if (cy - templateSize < 0 || cy + templateSize >= height) return null;
  const nP = templateWidth * templateWidth;
  const sx = imageDataCumsum.query(
    cx - templateSize,
    cy - templateSize,
    cx + templateSize,
    cy + templateSize
  );
  const sxx = imageDataSqrCumsum.query(
    cx - templateSize,
    cy - templateSize,
    cx + templateSize,
    cy + templateSize
  );
  let vlen2 = sxx - sx * sx / nP;
  if (vlen2 <= 0) return null;
  vlen2 = Math.sqrt(vlen2);
  let sxy = 0;
  const p1_start = (cy - templateSize) * width + (cx - templateSize);
  for (let j = 0; j < templateWidth; j++) {
    const rowOffset1 = p1_start + j * width;
    const rowOffset2 = j * templateWidth;
    for (let i = 0; i < templateWidth; i++) {
      sxy += imageData[rowOffset1 + i] * templateData[rowOffset2 + i];
    }
  }
  const sampledCount = templateWidth * templateWidth;
  const totalCount = templateWidth * templateWidth;
  sxy *= totalCount / sampledCount;
  const sxy_final = sxy - templateAvg * sx;
  return 1 * sxy_final / (vlen * vlen2);
};

// src/core/tracker/extract-utils.js
var extractTrackingFeatures = (imageList, doneCallback) => {
  const featureSets = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const points = extract(image);
    const featureSet = {
      data: image.data,
      scale: image.scale,
      width: image.width,
      height: image.height,
      points
    };
    featureSets.push(featureSet);
    doneCallback(i);
  }
  return featureSets;
};

// src/compiler/offline-compiler.ts
init_hierarchical_clustering();
init_delaunay();
init_constants();
init_browser();
var MAGIC = new Uint8Array([84, 65, 82, 90]);
function isCompressed(data) {
  return data.length >= 4 && data[0] === MAGIC[0] && data[1] === MAGIC[1] && data[2] === MAGIC[2] && data[3] === MAGIC[3];
}
function reconstruct128from256(d256) {
  return downsampleBilinear({ image: { data: d256, width: 256, height: 256 } }).data;
}
function approximateSpectralCoords(points, imageWidth, imageHeight) {
  const n = points.length;
  const sx = new Float32Array(n);
  const sy = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const nx = p.x / imageWidth * 2 - 1;
    const ny = p.y / imageHeight * 2 - 1;
    const scaleNorm = Math.log2(p.scale || 1) / 10;
    sx[i] = nx + scaleNorm * 0.1;
    sy[i] = ny + scaleNorm * 0.1;
  }
  return { sx, sy };
}
var OfflineCompiler = class {
  data = null;
  constructor() {
    console.log("\u26A1 OfflineCompiler: Optimized mode (no Eigenmaps, compressed output)");
  }
  async compileImageTargets(images, progressCallback) {
    console.time("\u23F1\uFE0F Compilaci\xF3n total");
    const targetImages = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (!img || !img.width || !img.height || !img.data) {
        throw new Error(
          `Imagen inv\xE1lida en posici\xF3n ${i}. Debe tener propiedades width, height y data.`
        );
      }
      const greyImageData = new Uint8Array(img.width * img.height);
      if (img.data.length === img.width * img.height) {
        greyImageData.set(img.data);
      } else if (img.data.length === img.width * img.height * 4) {
        for (let j = 0; j < greyImageData.length; j++) {
          const offset = j * 4;
          greyImageData[j] = Math.floor(
            (img.data[offset] + img.data[offset + 1] + img.data[offset + 2]) / 3
          );
        }
      } else {
        throw new Error(`Formato de datos de imagen no soportado en posici\xF3n ${i}`);
      }
      targetImages.push({
        data: greyImageData,
        width: img.width,
        height: img.height
      });
    }
    const results = await this._compileTarget(targetImages, progressCallback);
    this.data = targetImages.map((img, i) => ({
      targetImage: img,
      matchingData: results[i].matchingData,
      trackingData: results[i].trackingData
    }));
    console.timeEnd("\u23F1\uFE0F Compilaci\xF3n total");
    return this.data;
  }
  async _compileTarget(targetImages, progressCallback) {
    const matchingResults = await this._compileMatch(targetImages, (p) => progressCallback(p * 0.5));
    const trackingResults = await this._compileTrack(targetImages, (p) => progressCallback(50 + p * 0.5));
    return targetImages.map((_, i) => ({
      matchingData: matchingResults[i],
      trackingData: trackingResults[i]
    }));
  }
  async _compileMatch(targetImages, progressCallback) {
    const percentPerImage = 100 / targetImages.length;
    let currentPercent = 0;
    const results = [];
    for (let i = 0; i < targetImages.length; i++) {
      const targetImage = targetImages[i];
      const detector = new DetectorLite(targetImage.width, targetImage.height, {
        useLSH: AR_CONFIG.USE_LSH,
        maxFeaturesPerBucket: AR_CONFIG.MAX_FEATURES_PER_BUCKET
      });
      const { featurePoints: rawPs } = detector.detect(targetImage.data);
      const octaves = [0, 1, 2, 3, 4, 5];
      const ps = [];
      const featuresPerOctave = AR_CONFIG.FEATURES_PER_OCTAVE || 150;
      for (const oct of octaves) {
        const octScale = Math.pow(2, oct);
        const octFeatures = rawPs.filter((p) => Math.abs(p.scale - octScale) < 0.1).sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, featuresPerOctave);
        ps.push(...octFeatures);
      }
      const maximaPoints = ps.filter((p) => p.maxima);
      const minimaPoints = ps.filter((p) => !p.maxima);
      const maxMaps = approximateSpectralCoords(maximaPoints, targetImage.width, targetImage.height);
      const minMaps = approximateSpectralCoords(minimaPoints, targetImage.width, targetImage.height);
      for (let k = 0; k < maximaPoints.length; k++) {
        maximaPoints[k].sx = maxMaps.sx[k];
        maximaPoints[k].sy = maxMaps.sy[k];
      }
      for (let k = 0; k < minimaPoints.length; k++) {
        minimaPoints[k].sx = minMaps.sx[k];
        minimaPoints[k].sy = minMaps.sy[k];
      }
      const maximaPointsCluster = build({ points: maximaPoints });
      const minimaPointsCluster = build({ points: minimaPoints });
      const keyframe = {
        maximaPoints,
        minimaPoints,
        maximaPointsCluster,
        minimaPointsCluster,
        width: targetImage.width,
        height: targetImage.height,
        scale: 1
      };
      results.push([keyframe]);
      currentPercent += percentPerImage;
      progressCallback(currentPercent);
    }
    return results;
  }
  async _compileTrack(targetImages, progressCallback) {
    const percentPerImage = 100 / targetImages.length;
    let currentPercent = 0;
    const results = [];
    for (let i = 0; i < targetImages.length; i++) {
      const targetImage = targetImages[i];
      const imageList = buildTrackingImageList(targetImage);
      const percentPerScale = percentPerImage / imageList.length;
      const trackingData = extractTrackingFeatures(imageList, () => {
        currentPercent += percentPerScale;
        progressCallback(currentPercent);
      });
      results.push(trackingData);
    }
    return results;
  }
  async compileTrack({ progressCallback, targetImages, basePercent = 0 }) {
    return this._compileTrack(targetImages, (percent) => {
      progressCallback(basePercent + percent * (100 - basePercent) / 100);
    });
  }
  async compileMatch({ progressCallback, targetImages, basePercent = 0 }) {
    return this._compileMatch(targetImages, (percent) => {
      progressCallback(basePercent + percent * (50 - basePercent) / 100);
    });
  }
  exportData() {
    if (!this.data) {
      throw new Error("No hay datos compilados para exportar");
    }
    const dataList = this.data.map((item) => {
      return {
        targetImage: {
          width: item.targetImage.width,
          height: item.targetImage.height
        },
        trackingData: item.trackingData.map((td2, tdIdx) => {
          const count = td2.points.length;
          const px = new Float32Array(count);
          const py = new Float32Array(count);
          for (let i = 0; i < count; i++) {
            px[i] = td2.points[i].x;
            py[i] = td2.points[i].y;
          }
          const triangles = triangulate(td2.points);
          const edges = getEdges(triangles);
          const restLengths = new Float32Array(edges.length);
          for (let j = 0; j < edges.length; j++) {
            const p1 = td2.points[edges[j][0]];
            const p2 = td2.points[edges[j][1]];
            restLengths[j] = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          }
          return {
            w: td2.width,
            h: td2.height,
            s: td2.scale,
            px,
            py,
            // ⚡ OPTIMIZACIÓN: escala 128×128 se omite del archivo y se reconstruye
            // en importData() usando downsampleBilinear — bit-idéntico al original.
            // Ahorra 16KB por target.
            d: tdIdx === 0 ? td2.data : new Uint8Array(0),
            mesh: {
              t: new Uint16Array(triangles.flat()),
              e: new Uint16Array(edges.flat()),
              rl: restLengths
            }
          };
        }),
        matchingData: item.matchingData.map((kf) => {
          const useCompact = AR_CONFIG.USE_COMPACT_DESCRIPTORS;
          const columnarizeFn = useCompact ? columnarizeCompact : columnarize;
          return {
            w: kf.width,
            h: kf.height,
            s: kf.scale,
            hdc: false,
            max: columnarizeFn(kf.maximaPoints, kf.maximaPointsCluster, kf.width, kf.height),
            min: columnarizeFn(kf.minimaPoints, kf.minimaPointsCluster, kf.width, kf.height)
          };
        })
      };
    });
    const msgpack = encodeTaar(dataList);
    const compressed = zlibSync(msgpack, { level: 9 });
    const result = new Uint8Array(MAGIC.length + compressed.length);
    result.set(MAGIC, 0);
    result.set(compressed, MAGIC.length);
    return result;
  }
  importData(buffer) {
    let data = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    if (isCompressed(data)) {
      data = unzlibSync(data.subarray(MAGIC.length));
    }
    const alignedBuffer = new Uint8Array(
      data.buffer,
      data.byteOffset,
      data.byteLength
    );
    const result = decodeTaar(alignedBuffer);
    for (const item of result.dataList) {
      const trackingData = item.trackingData;
      for (let i = 1; i < trackingData.length; i++) {
        const td2 = trackingData[i];
        const prev = trackingData[i - 1];
        if ((!td2.d || td2.d.length === 0) && prev.d && prev.d.length > 0 && prev.w === td2.w * 2 && prev.h === td2.h * 2) {
          td2.d = reconstruct128from256(prev.d);
        }
      }
    }
    this.data = result.dataList;
    return result;
  }
  async destroy() {
  }
};

// tests/demo4-app.ts
init_constants();
var setupPanel = document.getElementById("setup-panel");
var arContainer = document.getElementById("ar-container");
var captureVideoContainer = document.getElementById("capture-video-container");
var captureVideo = document.getElementById("capture-video");
var targetList = document.getElementById("targetList");
var btnCaptureTarget = document.getElementById("btnCaptureTarget");
var btnStart = document.getElementById("btnStart");
var btnStop = document.getElementById("btnStop");
var controlsPanel = document.getElementById("controls-panel");
var statusLog = document.getElementById("statusLog");
var detectedMsg = document.getElementById("detectedMsg");
var video = document.getElementById("video");
var arCanvas = document.getElementById("arCanvas");
var debugCanvas = document.getElementById("debugCanvas");
var debugCtx = debugCanvas.getContext("2d");
var arCtx = arCanvas.getContext("2d");
var emptyMsg = document.getElementById("empty-msg");
var persistentText = document.getElementById("persistent-text");
var textModal = document.getElementById("text-modal");
var modalPreview = document.getElementById("modal-preview");
var modalInput = document.getElementById("modal-input");
var modalSave = document.getElementById("modal-save");
var modalCancel = document.getElementById("modal-cancel");
var targets = [];
var controller = null;
var isRunning = false;
var lastSpokenText = "";
var lastSpeakTime = 0;
var targetDetectionTimes = {};
var targetLastSpokenText = {};
var targetLastSeenTime = {};
var targetLastScreenCoords = {};
var LOST_GRACE_PERIOD = 300;
var tempCaptureData = null;
var tempCaptureUrl = null;
var WIDTH = AR_CONFIG.VIEWPORT_WIDTH;
var HEIGHT = AR_CONFIG.VIEWPORT_HEIGHT;
arCanvas.width = WIDTH;
arCanvas.height = HEIGHT;
async function initSetupCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    captureVideo.srcObject = stream;
  } catch (err2) {
    console.error("Camera error:", err2);
    alert("Error accediendo a la c\xE1mara. Aseg\xFArate de dar permisos.");
  }
}
initSetupCamera();
loadTargets();
btnCaptureTarget.addEventListener("click", () => {
  const cvs = document.createElement("canvas");
  cvs.width = WIDTH;
  cvs.height = HEIGHT;
  const ctx = cvs.getContext("2d");
  drawVideoToCanvas(ctx, captureVideo, WIDTH, HEIGHT);
  tempCaptureData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
  tempCaptureUrl = cvs.toDataURL("image/jpeg", 0.8);
  modalPreview.src = tempCaptureUrl;
  modalInput.value = "";
  textModal.style.display = "flex";
  modalInput.focus();
});
modalCancel.addEventListener("click", () => {
  textModal.style.display = "none";
  tempCaptureData = null;
  tempCaptureUrl = null;
});
modalSave.addEventListener("click", () => {
  const text = modalInput.value.trim();
  if (!text) {
    alert("Por favor escribe un texto para el TTS.");
    return;
  }
  if (tempCaptureData && tempCaptureUrl) {
    addTarget(tempCaptureData, tempCaptureUrl, text);
    textModal.style.display = "none";
    tempCaptureData = null;
    tempCaptureUrl = null;
  }
});
function addTarget(imageData, dataUrl, text, shouldSave = true) {
  emptyMsg.style.display = "none";
  btnStart.disabled = false;
  const id = Date.now().toString() + Math.random().toString().slice(2);
  const div = document.createElement("div");
  div.className = "target-item";
  div.innerHTML = `
        <img class="target-preview" src="${dataUrl}">
        <div class="target-inputs">
            <div style="font-weight: bold; color: white;">Target #${targets.length + 1}</div>
            <div style="color: var(--locus-gray); font-size: 0.9rem;">TTS: "${text}"</div>
        </div>
        <button class="remove-btn" data-id="${id}">\u{1F5D1}\uFE0F</button>
    `;
  targetList.appendChild(div);
  const item = {
    id,
    imageData,
    dataUrl,
    text,
    element: div
  };
  targets.push(item);
  if (shouldSave) {
    saveTargets();
  }
  div.querySelector(".remove-btn")?.addEventListener("click", () => {
    const idx = targets.findIndex((t) => t.id === id);
    if (idx > -1) {
      targets.splice(idx, 1);
      div.remove();
      if (targets.length === 0) {
        emptyMsg.style.display = "block";
        btnStart.disabled = true;
      }
      saveTargets();
    }
  });
}
function saveTargets() {
  const data = targets.map((t) => ({
    dataUrl: t.dataUrl,
    text: t.text
  }));
  localStorage.setItem("taptapp_demo4_targets", JSON.stringify(data));
}
async function loadTargets() {
  const json = localStorage.getItem("taptapp_demo4_targets");
  if (!json) return;
  try {
    const stored = JSON.parse(json);
    if (!Array.isArray(stored)) return;
    for (const item of stored) {
      if (item.dataUrl && item.text) {
        const img = new Image();
        img.src = item.dataUrl;
        await new Promise((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        const cvs = document.createElement("canvas");
        cvs.width = img.width;
        cvs.height = img.height;
        const ctx = cvs.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          addTarget(imageData, item.dataUrl, item.text, false);
        }
      }
    }
  } catch (e) {
    console.error("Error loading targets", e);
  }
}
btnStart.addEventListener("click", async () => {
  if (targets.length === 0) return;
  const unlockUtterance = new SpeechSynthesisUtterance("");
  window.speechSynthesis.speak(unlockUtterance);
  btnStart.disabled = true;
  btnStart.textContent = "\u23F3 Compilando...";
  const stream = captureVideo.srcObject;
  if (stream) stream.getTracks().forEach((t) => t.stop());
  try {
    await startExperience(targets);
  } catch (err2) {
    console.error(err2);
    alert("Error al iniciar: " + err2);
    btnStart.disabled = false;
    btnStart.textContent = "\u{1F680} Iniciar Experiencia AR";
    initSetupCamera();
  }
});
btnStop.addEventListener("click", () => {
  stopExperience();
});
async function startExperience(validTargets) {
  const compiler = new OfflineCompiler();
  const imagesToCompile = [];
  const texts = [];
  for (const t of validTargets) {
    imagesToCompile.push({
      data: new Uint8Array(t.imageData.data.buffer),
      width: t.imageData.width,
      height: t.imageData.height
    });
    texts.push(t.text);
  }
  const compiledDataList = await compiler.compileImageTargets(imagesToCompile, (p) => {
    btnStart.textContent = `\u23F3 Compilando ${Math.round(p)}%...`;
  });
  const buffer = compiler.exportData();
  const cleanBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  controller = new BioInspiredController({
    inputWidth: WIDTH,
    inputHeight: HEIGHT,
    debugMode: true,
    maxTrack: 5,
    bioInspired: { enabled: true },
    onUpdate: (data) => handleARUpdate(data, texts)
  });
  await controller.addImageTargetsFromBuffer(cleanBuffer);
  await startCamera();
  setupPanel.style.display = "none";
  arContainer.style.display = "block";
  controlsPanel.style.display = "block";
  captureVideoContainer.style.display = "none";
  const rect = arContainer.getBoundingClientRect();
  debugCanvas.width = rect.width;
  debugCanvas.height = rect.height;
  isRunning = true;
  startLoop();
}
function stopExperience() {
  isRunning = false;
  if (controller) {
    controller = null;
  }
  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
  }
  video.srcObject = null;
  arContainer.style.display = "none";
  controlsPanel.style.display = "none";
  setupPanel.style.display = "block";
  captureVideoContainer.style.display = "block";
  btnStart.disabled = false;
  btnStart.textContent = "\u{1F680} Iniciar Experiencia AR";
  initSetupCamera();
}
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => resolve();
  });
}
function startLoop() {
  if (!isRunning) return;
  drawVideoToCanvas(arCtx, video, WIDTH, HEIGHT);
  debugCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
  if (controller) {
    controller.processVideo(arCanvas);
  }
  requestAnimationFrame(startLoop);
}
function handleARUpdate(data, texts) {
  if (!isRunning) return;
  const scaleX = debugCanvas.width / WIDTH;
  const scaleY = debugCanvas.height / HEIGHT;
  if (data.type === "processDone") {
    const now = Date.now();
    let activeFound = false;
    let bestStatus = "Buscando...";
    let maxPriority = -1;
    for (const key in targetLastSeenTime) {
      const idx = parseInt(key);
      const timeSinceSeen = now - targetLastSeenTime[idx];
      if (timeSinceSeen < 200) {
        if (maxPriority < 2) {
          bestStatus = `Target ${idx + 1} Detectado`;
          maxPriority = 2;
        }
        activeFound = true;
      } else if (timeSinceSeen < LOST_GRACE_PERIOD) {
        if (maxPriority < 1) {
          bestStatus = `Target ${idx + 1} (Holding...)`;
          maxPriority = 1;
        }
        activeFound = true;
      }
    }
    statusLog.textContent = bestStatus;
    if (!activeFound) {
      detectedMsg.classList.remove("visible");
      if (persistentText) {
        persistentText.textContent = "Esperando detecci\xF3n...";
        persistentText.style.borderColor = "rgba(255, 255, 255, 0.1)";
        persistentText.style.background = "rgba(255, 255, 255, 0.05)";
      }
    }
    return;
  }
  if (data.type === "updateMatrix") {
    const { targetIndex, worldMatrix, screenCoords } = data;
    const now = Date.now();
    if (targetIndex !== void 0 && targetIndex >= 0 && worldMatrix) {
      targetLastSeenTime[targetIndex] = now;
      targetLastScreenCoords[targetIndex] = screenCoords;
      drawTrackingPoints(screenCoords, scaleX, scaleY);
      if (targetDetectionTimes[targetIndex] === void 0) {
        targetDetectionTimes[targetIndex] = now;
        targetLastSpokenText[targetIndex] = texts[targetIndex];
      }
      if (persistentText) {
        persistentText.textContent = texts[targetIndex];
        persistentText.style.borderColor = "var(--locus-success)";
        persistentText.style.background = "rgba(16, 185, 129, 0.1)";
      }
      if (now - targetDetectionTimes[targetIndex] >= 1e3 && targetLastSpokenText[targetIndex] === texts[targetIndex]) {
        const textToSpeak = texts[targetIndex];
        console.log(`[Demo4] Triggering TTS for target ${targetIndex}: "${textToSpeak}"`);
        triggerTTS(textToSpeak);
        targetDetectionTimes[targetIndex] = void 0;
        detectedMsg.textContent = textToSpeak;
        detectedMsg.classList.add("visible");
        setTimeout(() => detectedMsg.classList.remove("visible"), 2e3);
      }
      return;
    }
    if (targetIndex !== void 0 && targetIndex >= 0) {
      if (now - targetLastSeenTime[targetIndex] < LOST_GRACE_PERIOD) {
        const lastCoords = targetLastScreenCoords[targetIndex];
        if (lastCoords) {
          drawTrackingPoints(lastCoords, scaleX, scaleY, true);
        }
      }
    }
  }
}
function triggerTTS(text) {
  if (!text) return;
  const now = Date.now();
  if (text === lastSpokenText && now - lastSpeakTime < 5e3) {
    console.log("[Demo4] TTS ignored (debounce same text)");
    return;
  }
  if (now - lastSpeakTime < 2e3) {
    console.log("[Demo4] TTS ignored (debounce fast switch)");
    return;
  }
  console.log("[Demo4] Speaking:", text);
  lastSpokenText = text;
  lastSpeakTime = now;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const esVoice = voices.find((v) => v.lang.startsWith("es"));
  if (esVoice) {
    utterance.voice = esVoice;
    utterance.lang = esVoice.lang;
  } else {
    utterance.lang = "es-ES";
  }
  utterance.onend = () => console.log("[Demo4] TTS finished");
  utterance.onerror = (e) => console.error("[Demo4] TTS error:", e);
  window.speechSynthesis.speak(utterance);
}
function drawVideoToCanvas(ctx, videoElement, targetWidth, targetHeight) {
  const videoWidth = videoElement.videoWidth;
  const videoHeight = videoElement.videoHeight;
  const videoRatio = videoWidth / videoHeight;
  const targetRatio = targetWidth / targetHeight;
  let sx, sy, sw, sh;
  if (videoRatio > targetRatio) {
    sh = videoHeight;
    sw = sh * targetRatio;
    sx = (videoWidth - sw) / 2;
    sy = 0;
  } else {
    sw = videoWidth;
    sh = sw / targetRatio;
    sx = 0;
    sy = (videoHeight - sh) / 2;
  }
  ctx.drawImage(videoElement, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
}
function drawTrackingPoints(coords, sx, sy, isHolding = false) {
  if (!coords) return;
  debugCtx.fillStyle = isHolding ? "rgba(255, 165, 0, 0.5)" : "rgba(0, 255, 0, 0.8)";
  debugCtx.strokeStyle = isHolding ? "rgba(255, 165, 0, 0.8)" : "rgba(0, 255, 0, 0.8)";
  debugCtx.lineWidth = 2;
  if (isHolding) {
    debugCtx.setLineDash([5, 5]);
  } else {
    debugCtx.setLineDash([]);
  }
  if (coords.length >= 4) {
    debugCtx.beginPath();
    debugCtx.moveTo(coords[0].x * sx, coords[0].y * sy);
    debugCtx.lineTo(coords[1].x * sx, coords[1].y * sy);
    debugCtx.lineTo(coords[3].x * sx, coords[3].y * sy);
    debugCtx.lineTo(coords[2].x * sx, coords[2].y * sy);
    debugCtx.closePath();
    debugCtx.stroke();
  }
}
