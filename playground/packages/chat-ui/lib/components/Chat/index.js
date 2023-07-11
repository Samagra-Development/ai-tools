"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;
var _react = _interopRequireWildcard(require("react"));
var _LocaleProvider = require("../LocaleProvider");
var _Navbar = require("../Navbar");
var _MessageContainer = require("../MessageContainer");
var _QuickReplies = require("../QuickReplies");
var _Composer = require("../Composer");
var _ua = require("../../utils/ua");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Chat = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var wideBreakpoint = props.wideBreakpoint,
    _props$locale = props.locale,
    locale = _props$locale === void 0 ? 'zh-CN' : _props$locale,
    locales = props.locales,
    navbar = props.navbar,
    renderNavbar = props.renderNavbar,
    voiceToText = props.voiceToText,
    voiceToTextProps = props.voiceToTextProps,
    loadMoreText = props.loadMoreText,
    renderBeforeMessageList = props.renderBeforeMessageList,
    messagesRef = props.messagesRef,
    onRefresh = props.onRefresh,
    onScroll = props.onScroll,
    _props$messages = props.messages,
    messages = _props$messages === void 0 ? [] : _props$messages,
    renderMessageContent = props.renderMessageContent,
    onBackBottomShow = props.onBackBottomShow,
    onBackBottomClick = props.onBackBottomClick,
    _props$quickReplies = props.quickReplies,
    quickReplies = _props$quickReplies === void 0 ? [] : _props$quickReplies,
    quickRepliesVisible = props.quickRepliesVisible,
    _props$onQuickReplyCl = props.onQuickReplyClick,
    onQuickReplyClick = _props$onQuickReplyCl === void 0 ? function () {} : _props$onQuickReplyCl,
    onQuickReplyScroll = props.onQuickReplyScroll,
    renderQuickReplies = props.renderQuickReplies,
    text = props.text,
    textOnce = props.textOnce,
    placeholder = props.placeholder,
    onInputFocus = props.onInputFocus,
    onInputChange = props.onInputChange,
    onInputBlur = props.onInputBlur,
    onSend = props.onSend,
    disableSend = props.disableSend,
    btnColor = props.btnColor,
    background = props.background,
    onImageSend = props.onImageSend,
    inputOptions = props.inputOptions,
    composerRef = props.composerRef,
    inputType = props.inputType,
    onInputTypeChange = props.onInputTypeChange,
    recorder = props.recorder,
    toolbar = props.toolbar,
    onToolbarClick = props.onToolbarClick,
    onAccessoryToggle = props.onAccessoryToggle,
    rightAction = props.rightAction,
    _props$Composer = props.Composer,
    Composer = _props$Composer === void 0 ? _Composer.Composer : _props$Composer;
  function handleInputFocus(e) {
    if (messagesRef && messagesRef.current) {
      messagesRef.current.scrollToEnd({
        animated: false,
        force: true
      });
    }
    if (onInputFocus) {
      onInputFocus(e);
    }
  }
  (0, _react.useEffect)(function () {
    var rootEl = document.documentElement;
    if ((0, _ua.isSafari)()) {
      rootEl.dataset.safari = '';
    }
    var v = (0, _ua.getIOSMajorVersion)();
    // iOS 9、10 不支持按钮使用 flex
    if (v && v < 11) {
      rootEl.dataset.oldIos = '';
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(_LocaleProvider.LocaleProvider, {
    locale: locale,
    locales: locales
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ChatApp",
    ref: ref,
    style: {
      background: background ? background : ''
    }
  }, renderNavbar ? renderNavbar() : navbar && /*#__PURE__*/_react.default.createElement(_Navbar.Navbar, navbar), /*#__PURE__*/_react.default.createElement(_MessageContainer.MessageContainer, {
    ref: messagesRef,
    loadMoreText: loadMoreText,
    messages: messages,
    renderBeforeMessageList: renderBeforeMessageList,
    renderMessageContent: renderMessageContent,
    onRefresh: onRefresh,
    onScroll: onScroll,
    onBackBottomShow: onBackBottomShow,
    onBackBottomClick: onBackBottomClick
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "ChatFooter",
    style: {
      background: background ? background : ''
    }
  }, renderQuickReplies ? renderQuickReplies() : /*#__PURE__*/_react.default.createElement(_QuickReplies.QuickReplies, {
    items: quickReplies,
    visible: quickRepliesVisible,
    onClick: onQuickReplyClick,
    onScroll: onQuickReplyScroll
  }), /*#__PURE__*/_react.default.createElement(Composer, {
    wideBreakpoint: wideBreakpoint,
    ref: composerRef,
    voiceToText: voiceToText,
    voiceToTextProps: voiceToTextProps,
    inputType: inputType,
    text: text,
    textOnce: textOnce,
    inputOptions: inputOptions,
    placeholder: placeholder,
    onAccessoryToggle: onAccessoryToggle,
    recorder: recorder,
    toolbar: toolbar,
    onToolbarClick: onToolbarClick,
    onInputTypeChange: onInputTypeChange,
    onFocus: handleInputFocus,
    onChange: onInputChange,
    onBlur: onInputBlur,
    onSend: onSend,
    disableSend: disableSend,
    btnColor: btnColor,
    onImageSend: onImageSend,
    rightAction: rightAction
  }))));
});
exports.Chat = Chat;