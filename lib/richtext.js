'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uid = require('./uid');

var _uid2 = _interopRequireDefault(_uid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UEDITOR_LOADED_KEY = '__BEE_UEDITOR_LOADED_STATUS__';

// ueditor 默认值
var initConfig = {
  autoClearinitialContent: false,
  autoFloatEnabled: true, // 是否保持 toolbar 滚动时不动
  focus: false,
  wordCount: true,
  elementPathEnabled: false,
  pasteplain: false, // 是否默认为纯文本粘贴。false为不使用纯文本粘贴，true为使用纯文本粘贴
  initialFrameWidth: 640, // 初始化编辑器宽度
  initialFrameHeight: 200,
  maximumWords: 10000
};

var RichText = function (_React$Component) {
  (0, _inherits3.default)(RichText, _React$Component);

  function RichText(props) {
    (0, _classCallCheck3.default)(this, RichText);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RichText.__proto__ || (0, _getPrototypeOf2.default)(RichText)).call(this, props));

    _this.initRichText = function () {
      var UE = window.UE;
      var target = document.getElementById(_this.uuid);

      if (!UE || !target) {
        return false;
      }

      var _this$props = _this.props,
          value = _this$props.value,
          editorConfig = _this$props.editorConfig;

      var conf = (0, _extends3.default)({}, initConfig, editorConfig);
      var editor = new UE.ui.Editor(conf);
      _this.editor = editor;

      editor.addListener('blur contentChange', function () {
        _this.onChange();
      });
      editor.render(target);
      editor.ready(function () {
        editor.setContent(value);
      });
    };

    _this.onChange = function () {
      var value = _this.editor.getContent();
      _this.props.onChange && _this.props.onChange(value);
    };

    _this.uuid = 'bee-' + (0, _uid2.default)();
    return _this;
  }

  (0, _createClass3.default)(RichText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var timer = null;

      if (window.UE) {
        this.initRichText();
      } else {
        timer = setInterval(function () {
          var status = window[UEDITOR_LOADED_KEY];
          if (status === 2) {
            clearInterval(timer);
            _this2.initRichText();
          } else if (status !== 1) {
            _this2.loadUEditorScript();
          }
        }, 50);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.editor) return;
      this.editor.destroy();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value;

      if (value !== this.props.value && this.editor) {
        this.editor.setContent(value);
      }
    }
  }, {
    key: 'loadUEditorScript',
    value: function loadUEditorScript() {
      var _this3 = this;

      if (window[UEDITOR_LOADED_KEY] !== undefined) {
        return;
      }
      window[UEDITOR_LOADED_KEY] = 1; // 加载中
      var _props = this.props,
          ueditorHomeUrl = _props.ueditorHomeUrl,
          ueditorIframeUrl = _props.ueditorIframeUrl,
          ueditorUrl = _props.ueditorUrl,
          ueditorConfigUrl = _props.ueditorConfigUrl;


      window.UEDITOR_HOME_URL = ueditorHomeUrl;
      window.UEDITOR_IFRAME_URL = ueditorIframeUrl;

      this.createScriptDom(ueditorConfigUrl, function () {
        _this3.createScriptDom(ueditorUrl, function () {
          window[UEDITOR_LOADED_KEY] = 2; // 加载完成
        });
      });
    }
  }, {
    key: 'createScriptDom',
    value: function createScriptDom(url, callback) {
      var scriptDom = document.createElement('script');
      scriptDom.type = 'text/javascript';
      scriptDom.async = true;
      scriptDom.src = url;

      scriptDom.onload = function () {
        callback();
      };
      document.body.appendChild(scriptDom);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          prefix = _props2.prefix,
          className = _props2.className;

      return _react2.default.createElement(
        'div',
        { className: prefix + '-richtext ' + className },
        _react2.default.createElement('div', { id: this.uuid })
      );
    }
  }]);
  return RichText;
}(_react2.default.Component);

RichText.defaultProps = {
  value: '',
  onChange: function onChange() {},
  ueditorUrl: 'https://uso.oschina.io/react-ueditor-demo/ueditor.all.js',
  ueditorConfigUrl: 'https://uso.oschina.io/react-ueditor-demo/ueditor.config.js',
  ueditorHomeUrl: '',
  ueditorIframeUrl: '',
  editorConfig: {}, // ueditor 默认值
  className: '',
  prefix: 'bee'
};
exports.default = RichText;