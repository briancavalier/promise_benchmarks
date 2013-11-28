"use strict";
var Promise = require("./promise").Promise;
var isFunction = require("./utils").isFunction;

var keysOf = Object.keys || function(object) {
  var result = [];

  for (var prop in object) {
    result.push(prop);
  }

  return result;
};

function hash(object, label) {
  var results = {},
      keys = keysOf(object),
      remaining = keys.length;

  return new Promise(function(resolve, reject){
    var promise, prop;

    if (remaining === 0) {
      resolve({});
      return;
    }

    var resolver = function(prop) {
      return function(value) {
        resolveAll(prop, value);
      };
    };

    var resolveAll = function(prop, value) {
      results[prop] = value;
      if (--remaining === 0) {
        resolve(results);
      }
    };


    for (var i = 0, l = keys.length; i < l; i ++) {
      prop = keys[i];
      promise = object[prop];

      if (promise && isFunction(promise.then)) {
        promise.then(resolver(prop), reject, "RSVP: RSVP#hash");
      } else {
        resolveAll(prop, promise);
      }
    }
  });
}

exports.hash = hash;