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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NewsList = __webpack_require__(12);

var _NewsList2 = _interopRequireDefault(_NewsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
    loadData: _NewsList.loadData,
    path: "/",
    component: _NewsList2.default,
    exact: true
}];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchNews = exports.FETCH_NEWS = undefined;

var _axios = __webpack_require__(14);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var FETCH_NEWS = exports.FETCH_NEWS = 'fetch-news';

var fetchNews = exports.fetchNews = function fetchNews(page) {
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
            var res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _axios2.default)({
                                method: 'get',
                                url: 'http://hn.algolia.com/api/v1/search',
                                params: {
                                    //   tags: 'front_page',
                                    page: page
                                }
                            });

                        case 2:
                            res = _context.sent;

                            dispatch({
                                type: FETCH_NEWS,
                                payload: res,
                                pages: res.nbPages
                            });

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _renderer = __webpack_require__(9);

var _renderer2 = _interopRequireDefault(_renderer);

var _createStore = __webpack_require__(16);

var _createStore2 = _interopRequireDefault(_createStore);

var _reactRouterConfig = __webpack_require__(4);

var _Routes = __webpack_require__(1);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;

var app = (0, _express2.default)();

app.use(_express2.default.static('public'));
app.get('*', function (req, res) {

  var store = (0, _createStore2.default)();

  var promises = (0, _reactRouterConfig.matchRoutes)(_Routes2.default, req.path).map(function (_ref) {
    var route = _ref.route;

    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(function () {
    res.send((0, _renderer2.default)(req, store));
  });
});

app.listen(port, function () {
  console.log('Listening on port 3000');
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(10);

var _reactRouterDom = __webpack_require__(11);

var _Routes = __webpack_require__(1);

var _Routes2 = _interopRequireDefault(_Routes);

var _reactRedux = __webpack_require__(2);

var _reactRouterConfig = __webpack_require__(4);

var _serializeJavascript = __webpack_require__(15);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, store) {

    var content = (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _reactRouterDom.StaticRouter,
            { location: req.path, context: {} },
            _react2.default.createElement(
                'div',
                null,
                (0, _reactRouterConfig.renderRoutes)(_Routes2.default)
            )
        )
    ));

    return '\n        <html>\n            <head>\n            <meta name="viewport" content="width=device-width, initial-scale=1.0">\n            </head>\n              <body>\n                <div id="root">' + content + '</div>\n                <script>\n                    window.INITIAL_STATE = ' + (0, _serializeJavascript2.default)(store.getState()) + ';\n                </script>\n                <script src="bundle.js"></script>\n            </body>\n        </html>\n        ';
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _moment = __webpack_require__(13);

var _moment2 = _interopRequireDefault(_moment);

var _actions = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewsList = function (_Component) {
  _inherits(NewsList, _Component);

  function NewsList(props) {
    _classCallCheck(this, NewsList);

    var _this = _possibleConstructorReturn(this, (NewsList.__proto__ || Object.getPrototypeOf(NewsList)).call(this, props));

    _this.state = {
      upvotedItems: [],
      hiddenItems: [],
      page: 1
    };
    _this.handlePaginationNext = _this.handlePaginationNext.bind(_this);
    _this.handlePaginationPrev = _this.handlePaginationPrev.bind(_this);

    return _this;
  }

  _createClass(NewsList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchNews();
      //check if any items exist in localStorage
      this.setState({
        upvotedItems: Object.keys(window.localStorage),
        hiddenItems: JSON.parse(window.localStorage.getItem('hidden')) || []
      });
    }

    //set upvotes items in local storage

  }, {
    key: "upvote",
    value: function upvote(item) {
      if (window !== undefined) {
        var keys = this.state.upvotedItems;
        if (!keys.includes(item.objectID)) {
          window.localStorage.setItem(item.objectID, item.title);
          this.setState({
            upvotedItems: [].concat(_toConsumableArray(this.state.upvotedItems), [item.objectID])
          });
        } else {
          var newState = this.state.upvotedItems.filter(function (state) {
            return state !== item.objectID;
          });
          this.setState({
            upvotedItems: newState
          });
          window.localStorage.removeItem(item.objectID);
        }
      }
    }

    //hide upvotedItems

  }, {
    key: "hideItems",
    value: function hideItems(item) {
      if (window !== undefined) {
        var keys = this.state.hiddenItems;
        if (!keys.includes(item.objectID)) {
          this.setState({
            hiddenItems: [].concat(_toConsumableArray(this.state.hiddenItems), [item.objectID])
          });
          window.localStorage.setItem('hidden', JSON.stringify([].concat(_toConsumableArray(this.state.hiddenItems), [item.objectID])));
        }
      }
    }

    //populate domain name 

  }, {
    key: "getDomain",
    value: function getDomain(url) {
      var domain = '';
      if (typeof url === 'string') {
        return domain = url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
      }
    }
  }, {
    key: "handlePaginationNext",
    value: function handlePaginationNext() {
      var _this2 = this;

      var totalPages = this.props.pages;
      this.setState({
        page: this.state.page++ < totalPages ? this.state.page++ : 1
      }, function () {
        return _this2.props.fetchNews(_this2.state.page);
      });
    }
  }, {
    key: "handlePaginationPrev",
    value: function handlePaginationPrev() {
      var _this3 = this;

      var totalPages = this.props.pages;
      this.setState({
        page: this.state.page-- > 0 ? this.state.page-- : 1
      }, function () {
        return _this3.props.fetchNews(_this3.state.page);
      });
    }
  }, {
    key: "renderNews",
    value: function renderNews() {
      var _this4 = this;

      return this.props.news.hits.filter(function (item) {
        return item.title !== null && item.url !== null && item.title !== '';
      }).filter(function (item) {
        return !_this4.state.hiddenItems.includes(item.objectID);
      }).map(function (item) {
        return _react2.default.createElement(
          "li",
          { key: item.objectID },
          _react2.default.createElement(
            "p",
            null,
            _react2.default.createElement(
              "span",
              { className: "color-dark" },
              item.num_comments !== null ? item.num_comments : 0
            ),
            _react2.default.createElement(
              "span",
              { className: "color-dark" },
              item.points
            )
          ),
          _react2.default.createElement(
            "p",
            null,
            _react2.default.createElement("span", {
              style: {
                borderBottomColor: _this4.state.upvotedItems !== undefined && _this4.state.upvotedItems.includes(item.objectID) ? "#ff6600" : "rgb(202, 202, 201)"
              },
              onClick: function onClick() {
                return _this4.upvote(item);
              },
              className: "hn-upvote-btn" }),
            _react2.default.createElement(
              "a",
              { className: "color-dark", href: item.url },
              item.title,
              _react2.default.createElement(
                "span",
                null,
                "(",
                _this4.getDomain(item.url),
                ")"
              )
            )
          ),
          _react2.default.createElement(
            "p",
            null,
            _react2.default.createElement(
              "span",
              { className: "color-light" },
              "by"
            ),
            _react2.default.createElement(
              "span",
              { className: "color-dark" },
              item._highlightResult.author.value
            ),
            (0, _moment2.default)(Date.now()).diff((0, _moment2.default)(item.created_at), 'days'),
            ' ',
            "days ago",
            _react2.default.createElement(
              "span",
              {
                className: "hn-hide-btn color-dark",
                onClick: function onClick() {
                  return _this4.hideItems(item);
                }
              },
              "[ hide ]"
            )
          )
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "main",
        null,
        _react2.default.createElement(
          "ul",
          null,
          this.renderNews()
        ),
        _react2.default.createElement(
          "button",
          { className: "hn-pagination", onClick: this.handlePaginationPrev },
          "Prev"
        ),
        _react2.default.createElement(
          "button",
          { className: "hn-pagination", onClick: this.handlePaginationNext },
          "Next"
        ),
        _react2.default.createElement(
          "span",
          { className: "color-light" },
          "page ",
          this.state.page,
          " / ",
          this.props.pages
        )
      );
    }
  }]);

  return NewsList;
}(_react.Component);

function mapStateToProps(state) {
  return {
    news: state.news,
    pages: state.news.nbPages
  };
}

function loadData(store) {
  return store.dispatch((0, _actions.fetchNews)());
}

exports.loadData = loadData;
exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchNews: _actions.fetchNews })(NewsList);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(5);

var _reduxThunk = __webpack_require__(17);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(18);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default));

    return store;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(5);

var _newsReducers = __webpack_require__(19);

var _newsReducers2 = _interopRequireDefault(_newsReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    news: _newsReducers2.default,
    pages: _newsReducers2.default.nbPages
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = __webpack_require__(3);

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _actions.FETCH_NEWS:
            return action.payload.data;
        default:
            return state;

    }
};

/***/ })
/******/ ]);