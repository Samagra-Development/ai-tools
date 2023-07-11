import React, { useEffect } from 'react';
import { LocaleProvider } from '../LocaleProvider';
import { Navbar } from '../Navbar';
import { MessageContainer } from '../MessageContainer';
import { QuickReplies } from '../QuickReplies';
import { Composer as DComposer } from '../Composer';
import { isSafari, getIOSMajorVersion } from '../../utils/ua';
export var Chat = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    Composer = _props$Composer === void 0 ? DComposer : _props$Composer;
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
  useEffect(function () {
    var rootEl = document.documentElement;
    if (isSafari()) {
      rootEl.dataset.safari = '';
    }
    var v = getIOSMajorVersion();
    // iOS 9、10 不支持按钮使用 flex
    if (v && v < 11) {
      rootEl.dataset.oldIos = '';
    }
  }, []);
  return /*#__PURE__*/React.createElement(LocaleProvider, {
    locale: locale,
    locales: locales
  }, /*#__PURE__*/React.createElement("div", {
    className: "ChatApp",
    ref: ref,
    style: {
      background: background ? background : ''
    }
  }, renderNavbar ? renderNavbar() : navbar && /*#__PURE__*/React.createElement(Navbar, navbar), /*#__PURE__*/React.createElement(MessageContainer, {
    ref: messagesRef,
    loadMoreText: loadMoreText,
    messages: messages,
    renderBeforeMessageList: renderBeforeMessageList,
    renderMessageContent: renderMessageContent,
    onRefresh: onRefresh,
    onScroll: onScroll,
    onBackBottomShow: onBackBottomShow,
    onBackBottomClick: onBackBottomClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "ChatFooter",
    style: {
      background: background ? background : ''
    }
  }, renderQuickReplies ? renderQuickReplies() : /*#__PURE__*/React.createElement(QuickReplies, {
    items: quickReplies,
    visible: quickRepliesVisible,
    onClick: onQuickReplyClick,
    onScroll: onQuickReplyScroll
  }), /*#__PURE__*/React.createElement(Composer, {
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