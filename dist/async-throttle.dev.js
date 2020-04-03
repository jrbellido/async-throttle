/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var range = __webpack_require__(1);

module.exports = {
  parallel: function parallel(tasks, maxConcurrency, delay) {
    var taskQueue = tasks.reverse();
    var current = 0;
    return new Promise(function (resolveAll, rejectAll) {
      (function resolveTasks() {
        //console.log('queue:', taskQueue.length, 'current:', current);
        var toTake = Math.min(maxConcurrency - current, taskQueue.length);

        for (var i = 0; i < toTake; i++) {
          current++;
          var task = taskQueue.pop();
          task.call(this, function () {
            current--;
          });
        }

        if (taskQueue.length === 0 && current === 0) {
          resolveAll();
          return;
        } else {
          setTimeout(resolveTasks, delay);
        }
      })();
      /*
      (function resolveTasks() {
      console.log('queue:', taskQueue.length, 'finished:', finished, 'current:', current);
       if (finished) {
      return resolvePromise(5); 
      }
      if (taskQueue.length > 0) {
      if (current < maxConcurrency) {
      var toTake = Math.min(maxConcurrency - current, taskQueue.length);
      for (let i of range(1, toTake)) {
      var task = taskQueue.pop();
      current++;
      task.apply(this, [
      function resolveFn() {
      current--;
      }
      ]);
      setTimeout(resolveTasks, delay);
      }
      } else {
      setTimeout(resolveTasks, delay);
      }
      } else {
      if (current === 0 && !finished) {
      finished = true;
      } else {
      setTimeout(resolveTasks, delay);
      }
      }
      })();
      */

    });
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = /*#__PURE__*/regeneratorRuntime.mark(function range(begin, end) {
  var interval,
      i,
      _args = arguments;
  return regeneratorRuntime.wrap(function range$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          interval = _args.length > 2 && _args[2] !== undefined ? _args[2] : 1;
          i = begin;

        case 2:
          if (!(i < end)) {
            _context.next = 8;
            break;
          }

          _context.next = 5;
          return i;

        case 5:
          i += interval;
          _context.next = 2;
          break;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, range);
});

/***/ })
/******/ ]);