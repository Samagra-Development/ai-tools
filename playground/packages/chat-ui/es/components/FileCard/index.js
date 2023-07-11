import React from 'react';
import clsx from 'clsx';
import { Card } from '../Card';
import { Flex, FlexItem } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import getExtName from '../../utils/getExtName';
import prettyBytes from '../../utils/prettyBytes';
export var FileCard = function FileCard(props) {
  var className = props.className,
    file = props.file,
    extension = props.extension,
    children = props.children;
  var name = file.name,
    size = file.size;
  var ext = extension || getExtName(name);
  return /*#__PURE__*/React.createElement(Card, {
    className: clsx('FileCard', className),
    size: "xl"
  }, /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement("div", {
    className: "FileCard-icon",
    "data-type": ext
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "file"
  }), /*#__PURE__*/React.createElement(Text, {
    truncate: true,
    as: "span",
    className: "FileCard-ext"
  }, ext)), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(Text, {
    truncate: 2,
    breakWord: true,
    className: "FileCard-name"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "FileCard-meta"
  }, size != null && /*#__PURE__*/React.createElement("span", {
    className: "FileCard-size"
  }, prettyBytes(size)), children))));
};